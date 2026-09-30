# Updating the website: a guide for the MF team

Everything on the site (projects, service pages, reviews, the team, guides and company details) lives in small files in the `content` folder. You edit them through **Pages CMS**, a simple editor that works in the browser. You never need to touch code.

## Getting in

1. Go to **app.pagescms.org** and sign in with the GitHub account that has access to the website.
2. Open the **mf-project-solutions** repository.
3. The menu on the left shows **Projects, Service pages, Reviews, Team, Guides, Site settings**, plus **Photos** and **Videos and posters** for uploading files.

## How publishing works

- Every time you press **Save**, the change is stored and the site rebuilds by itself. That takes about two to four minutes.
- If you are editing the working branch, you see the result on the **preview site** (the vercel.app address). Google does not see the preview.
- The live site (mfprojectsolutions.ie) updates when the preview is approved and merged into the main branch.
- Anything with **Awaiting confirmation** filled in (for example "Client to approve photos") shows only on the preview, with a marker. Clear that box when it is confirmed and it goes live on the next publish.
- Prices marked as not confirmed never show on the live site.
- If something looks wrong after saving, nothing is lost: every save is kept in the history and can be put back.

## Photos: the rules

- Upload the best quality photo you have (a normal phone photo is fine). Aim for under 5 MB. The site makes small, fast copies automatically for phones, tablets and desktops.
- Name files so you can find them later, in lower case with dashes, for example `phibsborough-kitchen-island.jpg`.
- Fill in **Alt text** (what the photo shows, in plain words). It helps Google and people using screen readers.
- Set **Kind of image** correctly. Anything that is not a real photograph (a 3D render, a drawing, an AI enhanced image) is labelled on the page.
- Never show a client's address. Project locations are the area only, for example "Phibsborough, Dublin 7".
- To replace a photo, upload the new one and pick it in the field. The old copies stop being used on the next publish.

## Add a project

1. **Projects** then **Add an entry**.
2. **Web address**: lower case with dashes, for example `kitchen-extension-ratoath`. The page will be at mfprojectsolutions.ie/projects/kitchen-extension-ratoath. Do not change it after the project is live.
3. Fill in **Title**, **Location** (area only), **Sector**, **Our role** (use one of the approved phrases, exactly as written) and a one or two sentence **Summary**.
4. **Categories** decide which service pages show the project, for example `extension`, `kitchen`, `bathroom`, `garden-room`, `joinery`, `landscaping`.
5. Pick a **Hero image** (the big photo at the top). Optionally add a portrait **Hero image for phones**.
6. Add photos to the **Gallery**.
7. Leave **Published** off while you work. Turn it on when the project is ready, then **Save**.

**Order** controls where it appears in the list (lower numbers first). **Flagship** gives the project the full story layout and puts it first.

## Replace a hero image

Open the project or service page, go to **Hero image** (on service pages: **Hero** then **Image**), click the photo, choose a new one from **Photos** or upload one, and **Save**. If the important part of the photo gets cut off on phones, fill in **Focal point**, for example `50% 30%` keeps the area 50% across and 30% down in view.

## Reorder a gallery

Open the project, go to **Gallery**, and drag photos up or down by the handle on the left. The first photos appear first on the page. **Save** when done. To remove a photo from the gallery, use the delete button on that item (the file itself stays in Photos).

## Add a review

1. **Reviews** then **Add an entry**.
2. **Id**: the reviewer's name and the date, lower case with dashes, for example `mary-byrne-2026-09-14`.
3. Copy the **Review text** exactly as written on Google. If you translated it, paste the English and tick **Translated**.
4. Pick the **Category** and the **Service tags** (for example `bathroom`, `garden-room`).
5. **Highlight** is the short line shown on cards. It must be copied word for word from the review.
6. Tick **Show on the website** and **Save**.

To put the review on a particular service page or project, add its **Id** to that page's **Review ids** list, in the order you want them shown.

## Add a video

There are two kinds.

**Short clips (silent loops, up to about 20 seconds)**

1. Export the clip as MP4 (H.264), no sound, 1080 pixels wide or less, ideally under 8 MB.
2. Upload it in **Videos and posters** into the `video` folder, for example `media/video/kitchen-loop.mp4`.
3. Upload a still from the clip as the poster image (JPG) in the same place.
4. On the project or service page, add a video: **Video** is `/media/video/kitchen-loop.mp4`, pick the **Poster image**, and switch on **Silent loop**.

**Walkthroughs and longer videos**

Upload these to the MF YouTube channel, then add a video on the page with the YouTube link in **Video**, a **Poster image**, and **Silent loop** off. YouTube handles the streaming, so the site stays fast.

## Company details, phone numbers and who gets leads

**Site settings** holds the company details, the phone numbers, WhatsApp links and email addresses for each type of enquiry (property services, smaller works, major projects), the service area and the social links. Change a number there and it changes everywhere on the site.

## Things to avoid

- Changing a **Web address** (projects, service pages, guides) after it is live. Google Ads and search results point to these addresses. If one must change, ask the developer to add a redirect.
- Uploading screenshots of WhatsApp chats or photos that show house numbers, car registrations or people's faces without permission.
- Editing review text. It must match Google.
