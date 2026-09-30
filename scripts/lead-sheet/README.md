# Website lead logger (Google Sheets)

Every enquiry and snagging booking sent from the website is also posted to a small Google Apps
Script. The script adds a row to the **LEADS** sheet in the Master Control spreadsheet and emails
the person who owns that lead route. If the script is down, the website form still works: the
Web3Forms email is what the visitor's success depends on.

| Route | Owner | Notification email |
|---|---|---|
| property | Wanessa | wcorrea@mfeng.ie |
| small | Rosana | info@mfeng.ie |
| major | Alex | aferreira@mfeng.ie |

Web3Forms sends its own copy of every lead to the inbox the access key was created with
(info@mfeng.ie). The script's email goes to the route owner, so small route leads reach
info@mfeng.ie twice. Set `ROUTE_EMAILS.small` to `''` in Code.gs if that is unwanted.

## Setup (about 10 minutes)

1. Open the **MFPS Master Control** Google Sheet.
2. Go to **Extensions > Apps Script**. A new script project opens, bound to that spreadsheet.
3. Delete the sample code in `Code.gs` and paste in the whole of `scripts/lead-sheet/Code.gs`.
4. Check the emails in `ROUTE_EMAILS` at the top. Save (disk icon).
5. Choose the `setup` function in the toolbar and press **Run**. Approve the permissions
   (spreadsheet and send email as you). This creates the LEADS sheet with its headers.
6. Press **Deploy > New deployment**. Click the gear next to "Select type" and pick **Web app**.
   - Description: `Website leads`
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Press **Deploy** and copy the **Web app URL** (ends in `/exec`).
8. Open the URL in a browser. You should see `{"ok":true,...}`: that is the health check.
9. Paste the URL into `content/settings.json` as `"leadSheetUrl": "https://script.google.com/macros/s/.../exec"`
   (or through Pages CMS, Settings). Publish the site.
10. Send a test enquiry from the live site and check the new row and the email.

When you change the script later, use **Deploy > Manage deployments > Edit (pencil) > Version: New version**
so the URL stays the same. A brand new deployment gets a new URL.

## Columns

Received, Lead No (MF-L0001 upwards), Name, Phone, Email, Service, Page code, Route, Owner, Source,
Campaign, gclid, Landing page, Area, Timing, Budget, Message, then the columns the team fills in:
**Qualified, Quote sent, Quote value, Won, Contract value, Est. gross profit, Notes**.
The script writes extra details (snagging property type, bedrooms, dates, UTM tags, referrer) into Notes.

**Source** uses the click ids first (gclid, gbraid or wbraid = Google Ads, fbclid = Meta), then UTM tags,
then the referrer, and adds what the visitor said in "How did you hear about us?" when it differs,
e.g. `Google Ads (said: Recommendation)`.

Keep the column order: add new columns only to the right of Notes.

## Monthly: send results back to Google Ads (offline conversions)

Once a month, filter LEADS for rows that have a **gclid** and are marked **Qualified** or **Won**.
Upload them in Google Ads (**Goals > Conversions > Uploads**) using the Google Ads offline
conversion template: Google Click ID = gclid, Conversion Name = `Qualified lead` or `Won job`,
Conversion Time = the Received date (format `yyyy-MM-dd HH:mm:ss+01:00`), Conversion Value =
Quote value (qualified) or Contract value (won). Only click ids from the last 90 days are accepted.
This teaches Google Ads which searches bring real jobs, not only form fills. Meta leads (fbclid in
Notes) can be uploaded the same way through Events Manager offline events.

## Troubleshooting

- No rows appear: open the `/exec` URL. If it asks you to sign in, "Who has access" is not set to Anyone.
- Rows appear but no email: check Apps Script **Executions** for errors; MailApp allows about 100 emails a day on a normal Google account.
- The website only sends to the script when `leadSheetUrl` is set in settings.
