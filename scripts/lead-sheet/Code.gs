/**
 * MF Project Solutions: website lead logger.
 *
 * Google Apps Script web app bound to the Master Control spreadsheet. The website POSTs each
 * enquiry and snagging booking here as JSON (text/plain, no-cors). The script appends a row to
 * the LEADS sheet and emails the person who owns the lead route. Setup: see README.md.
 */

// ---- Settings: change these if a person or inbox changes -------------------------------

var SHEET_NAME = 'LEADS';

/** Who gets the notification email for each route. */
var ROUTE_EMAILS = {
  property: 'wcorrea@mfeng.ie', // Wanessa: snagging and property inspections
  small: 'info@mfeng.ie',       // Rosana: smaller construction
  major: 'aferreira@mfeng.ie'   // Alex: extensions, renovations, larger projects
};

/** Always copied on every lead email. Leave empty for none. */
var CC_EMAIL = '';

var HEADERS = [
  'Received', 'Lead No', 'Name', 'Phone', 'Email', 'Service', 'Page code', 'Route', 'Owner',
  'Source', 'Campaign', 'gclid', 'Landing page', 'Area', 'Timing', 'Budget', 'Message',
  'Qualified', 'Quote sent', 'Quote value', 'Won', 'Contract value', 'Est. gross profit', 'Notes'
];

// ---- Web app entry points -----------------------------------------------------------------

/** Health check: open the web app URL in a browser and you should see {"ok":true,...}. */
function doGet() {
  return json_({ ok: true, service: 'MFPS lead logger', sheet: SHEET_NAME, time: new Date().toISOString() });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = parseBody_(e);
    if (!data || (!data.name && !data.phone && !data.email)) return json_({ ok: false, error: 'empty' });
    if (data.botcheck) return json_({ ok: true, skipped: 'bot' });

    lock.waitLock(20000);
    var sheet = getSheet_();
    var leadNo = nextLeadNo_(sheet);
    var route = String(data.route || '').toLowerCase();
    var source = inferSource_(data);
    var notes = buildNotes_(data);

    var row = [
      new Date(),
      leadNo,
      str_(data.name),
      str_(data.phone),
      str_(data.email),
      str_(data.service),
      str_(data.page_code),
      route,
      str_(data.route_owner),
      source,
      str_(data.utm_campaign),
      str_(data.gclid || data.gbraid || data.wbraid),
      str_(data.landing_page || data.first_landing_page || data.page),
      str_(data.area),
      str_(data.timing),
      str_(data.budget),
      str_(data.message),
      '', '', '', '', '', '',
      notes
    ];
    // Prefix values that start with = + - @ so the sheet never treats visitor text as a formula.
    row = row.map(function (v) { return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v; });
    sheet.appendRow(row);
    lock.releaseLock();

    notify_(route, leadNo, data, source);
    return json_({ ok: true, lead: leadNo });
  } catch (err) {
    try { lock.releaseLock(); } catch (ignore) {}
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

// ---- Helpers ------------------------------------------------------------------------------

function parseBody_(e) {
  if (!e) return null;
  if (e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (ignore) {}
  }
  return e.parameter || null;
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

/** Lead numbers run MF-L0001, MF-L0002, ... based on the highest number already in column B. */
function nextLeadNo_(sheet) {
  var last = sheet.getLastRow();
  var max = 0;
  if (last > 1) {
    var values = sheet.getRange(2, 2, last - 1, 1).getValues();
    for (var i = 0; i < values.length; i++) {
      var m = String(values[i][0]).match(/(\d+)$/);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
  }
  return 'MF-L' + ('000' + (max + 1)).slice(-4);
}

/**
 * Source: ad click ids win (they prove the click), then UTM tags, then what the visitor said.
 *   gclid / gbraid / wbraid => Google Ads,  fbclid => Meta
 */
function inferSource_(d) {
  var said = str_(d.heard_about);
  var auto = '';
  if (d.gclid || d.gbraid || d.wbraid) auto = 'Google Ads';
  else if (d.fbclid) auto = 'Meta';
  else if (d.utm_source) {
    var s = String(d.utm_source).toLowerCase();
    var med = String(d.utm_medium || '').toLowerCase();
    if (/(facebook|instagram|meta|fb|ig)/.test(s)) auto = /(cpc|paid|ads?)/.test(med) ? 'Meta' : 'Meta organic';
    else if (s.indexOf('google') > -1) auto = /(cpc|ppc|paid)/.test(med) ? 'Google Ads' : 'Google';
    else auto = d.utm_source + (d.utm_medium ? ' / ' + d.utm_medium : '');
  } else if (d.referrer) {
    var r = String(d.referrer).toLowerCase();
    if (r.indexOf('google.') > -1) auto = 'Google search';
    else if (/(facebook|instagram)\./.test(r)) auto = 'Meta organic';
  }
  if (auto && said && auto.toLowerCase() !== said.toLowerCase()) return auto + ' (said: ' + said + ')';
  return auto || said || 'Direct or unknown';
}

/** Extra snagging fields and attribution that have no column of their own. */
function buildNotes_(d) {
  var parts = [];
  var extra = {
    'Form': d.form,
    'Property': d.property_type,
    'Bedrooms': d.bedrooms,
    'Inspection': d.inspection_type,
    'Keys': d.key_date,
    'Preferred dates': [d.preferred_date_1, d.preferred_date_2].filter(Boolean).join(', '),
    'Attending': d.attending,
    'Heard about us': d.heard_about,
    'UTM': [d.utm_source, d.utm_medium, d.utm_term, d.utm_content].filter(Boolean).join(' / '),
    'fbclid': d.fbclid,
    'Referrer': d.referrer,
    'Page': d.page
  };
  for (var k in extra) if (extra[k]) parts.push(k + ': ' + extra[k]);
  return parts.join('\n');
}

function notify_(route, leadNo, d, source) {
  var to = ROUTE_EMAILS[route] || ROUTE_EMAILS.small;
  if (!to) return;
  var subject = 'New website lead ' + leadNo + ': ' + (d.service || 'enquiry') + ', ' + (d.name || '');
  var lines = [
    'Lead ' + leadNo + ' for ' + (d.route_owner || route),
    '',
    'Name: ' + str_(d.name),
    'Phone: ' + str_(d.phone),
    'Email: ' + str_(d.email),
    'Service: ' + str_(d.service),
    'Area: ' + str_(d.area),
    'Timing: ' + str_(d.timing),
    d.budget ? 'Budget: ' + d.budget : '',
    'Source: ' + source,
    'Page: ' + str_(d.page_code) + ' ' + str_(d.page),
    '',
    str_(d.message),
    '',
    buildNotes_(d),
    '',
    'Logged in the ' + SHEET_NAME + ' sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ].filter(function (l, i, arr) { return l !== '' || (arr[i - 1] !== ''); });
  var opts = { name: 'MF Project Solutions website' };
  if (d.email) opts.replyTo = String(d.email);
  if (CC_EMAIL) opts.cc = CC_EMAIL;
  try {
    MailApp.sendEmail(to, subject, lines.join('\n'), opts);
  } catch (err) {
    console.error('Email failed: ' + err);
  }
}

function str_(v) {
  return v === undefined || v === null ? '' : String(v).slice(0, 5000);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once from the editor to create the sheet and grant permissions (Run > setup). */
function setup() {
  getSheet_();
  MailApp.getRemainingDailyQuota();
}
