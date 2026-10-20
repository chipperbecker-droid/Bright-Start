# Bright Start Medical Training website

## Preview it on GitHub Pages

1. On github.com, click **New repository**. Name it `Bright-Start`. Leave it **Public**, since the free GitHub plan only offers Pages on public repositories. Click **Create repository**.
2. On the new repository's page, click **uploading an existing file**. Drag in **everything inside this folder**, not the folder itself, so `index.html` sits at the top level. On a Mac, press Cmd+Shift+. in Finder to show the hidden `.nojekyll` file so it gets uploaded too. Click **Commit changes**.
3. Go to **Settings > Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, set Branch to **main**, and set the folder to **/ (root)**. Click **Save**.
4. After a minute or two, the site is live at `https://<your-username>.github.io/Bright-Start/`. Every new upload updates it.

Later, to use the real domain, go to Settings > Pages > Custom domain, enter `brightstart-training.com`, then follow GitHub's DNS steps at the domain registrar.


Plain HTML, CSS and a little JavaScript. There's no framework and no build step. Open `index.html` in a browser to click through it.

## What's in the folder

| File | Page | Squarespace slug |
| --- | --- | --- |
| `index.html` | Home | `/` |
| `hha.html` | Home Health Aide program | `/hha` |
| `apply.html` | Apply (Jotform goes here) | `/apply` |
| `cpr.html` | CPR, First Aid & BLS | `/cpr` |
| `cna.html` | CNA (Coming Soon) waitlist | `/cna` |
| `tuition.html` | Tuition & Funding | `/tuition` |
| `about.html` | About & Team | `/about` |
| `faq.html` | FAQ | `/faq` |
| `contact.html` | Contact | `/contact` |
| `policies.html` | Policies & Privacy | `/policies` |
| `404.html` | Page not found | |
| `assets/css/styles.css` | All styling (colors are at the top) | |
| `assets/js/main.js` | Class dates, mobile menu, forms | |
| `assets/img/` | Logo (horizontal, white, stacked), favicons, social share image | |
| `assets/docs/` | 2026–2027 School Catalogue (PDF) and the paper HHA application (Word) | |
| `assets/img/brand/` | Original logo file from George | |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are | |

## Things to finish

1. **Jotform application**: in `apply.html`, replace everything between `<!-- JOTFORM-START -->` and `<!-- JOTFORM-END -->` with the embed code from Jotform (Publish > Embed > iFrame). Until then the page tells people to call or email to apply.
2. **CPR booking**: in `cpr.html`, replace the block between `SCHEDULING-START` and `SCHEDULING-END` with the Squarespace Scheduling (Acuity) embed.
3. **Forms** (contact, CNA waitlist, group CPR request): each `<form>` has `data-endpoint=""`. Put a Formspree or Jotform form URL there to receive submissions. Until you do, the form says it isn't connected yet and offers a ready-made email instead, so no message gets lost silently.
4. **Photos**: every teal box marked "Photo: ..." is a placeholder. Swap each `<div class="ph ...">` for `<img src="assets/img/your-photo.jpg" alt="what the photo shows">`.
5. **Text in [brackets]**: the details only George can give you are highlighted in yellow on the page:
   - CPR courses: length, price, AHA or Red Cross, how long cards are valid (`cpr.html`)
   - Office hours (`contact.html`)
   - Founder story, plus one line each from George and Lisa (`about.html`)
6. **Hidden until ready**: the reviews section (`index.html`) and the WIOA funding note (`tuition.html`) are HTML comments. Uncomment them once there are real Google reviews, and once the school is on the Delaware training provider list.

## Updating class dates

The site lists the HHA dates from one list at the top of `assets/js/main.js` (`COHORTS`). Each class disappears from the site on the day it starts, and the "Next class starts" banner moves on by itself. You only touch this list when the catalogue gets new dates.

## Getting it onto the web

Squarespace can't import a whole custom-coded site, so you have three realistic routes:

- **A. Host these files directly (closest to this design).** Upload the folder to Netlify, Cloudflare Pages or GitHub Pages (all free for a site this size), then point brightstart-training.com at it in the domain settings. Jotform and Acuity scheduling both work here as embeds. George would cancel the Squarespace website plan, but can keep the domain wherever it's registered.
- **B. Stay on Squarespace and rebuild with its blocks.** Use the copy from these pages (it matches the Build Guide), paste the contents of `styles.css` into Design > Custom CSS for the fonts and colors, and use Code blocks for any section you want exactly as coded. Code blocks that run scripts need one of the higher Squarespace plans, so check George's plan first.
- **C. Mix the two.** Keep Squarespace for the main pages and Scheduling, and use this code for one or two pages where the design matters most (Home, HHA), pasted into a Code block on a blank page.

If anything other than the Home page changes address, add 301 redirects so old links and Google results still work.
