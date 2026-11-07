# Seerat Welfare Trust website

Static HTML site for Seerat Welfare Trust, published with GitHub Pages at
**https://seerat.org.in**.

## Pages and files

| File | What it is |
| --- | --- |
| `index.html` | Home page (includes the Contact section and enquiry form) |
| `about.html` | About Us |
| `focus-areas.html` | Our Focus Areas |
| `leadership.html` | Our Leadership |
| `privacy.html` | Privacy notice (draft, for review) |
| `404.html` | "Page not found" page |
| `assets/js/config.js` | Site settings, including the Formspree form ID |
| `assets/js/contact.js` | Enquiry form and "Volunteer / Partner / Support" buttons |
| `assets/icons/` | Favicons and app icons |
| `assets/og-image.jpg` | 1200×630 image shown in WhatsApp / LinkedIn / Facebook / X link previews |
| `images/` | Logos and local photos |
| `site.webmanifest`, `robots.txt`, `sitemap.xml` | Browser and search-engine files |
| `CNAME` | Custom domain for GitHub Pages (managed by GitHub; do not delete) |

There is no build step: each page is a self-contained HTML file with its
styles in a `<style>` block in the `<head>`.

## Editing text

1. Open the page on GitHub (for example `about.html`) and click the pencil icon.
2. Use the browser's find (Ctrl/Cmd + F) to locate the sentence you want to change.
3. Change only the words between the tags, for example
   `<p>Old text</p>` → `<p>New text</p>`. Keep `&amp;` for "&" and `&rsquo;`
   for curly apostrophes if they are already used nearby.
4. The header, navigation and footer are repeated in every page. If you change
   them (for example a phone number), change them in **all** pages:
   `index.html`, `about.html`, `focus-areas.html`, `leadership.html`,
   `privacy.html` and `404.html`.
5. If you change a page's title or summary, also update its `<title>`,
   `<meta name="description">` and matching `og:`/`twitter:` tags in the `<head>`.

## Enquiry form (Formspree)

- The form is in the Contact section of `index.html`. Submissions are sent to
  Formspree, which emails them to the address set up in your Formspree account.
- **The Formspree form ID lives in one place only:** `assets/js/config.js`
  (currently `xeaawjnw`, the "Seerat Website form final" form). To switch
  forms, replace the ID after `/f/` in the `endpoint` line.
- If Formspree can't be reached, pressing "Send" opens the visitor's email
  app with a message to `swt@seerat.org.in` instead.
- Buttons that open the form use `href="index.html#contact"` with a
  `data-topic` attribute: `volunteer`, `partner`, `support` or `general`.
  The form scrolls into view with that option selected. No form data ever goes
  in the URL.
- In Formspree, add `seerat.org.in` to the form's allowed domains, and send a
  test message after publishing.

## Publishing (PR → merge)

The live site is published automatically from the `main` branch.

1. Make changes on a separate branch (GitHub offers this when you edit a file:
   choose "Create a new branch … and start a pull request").
2. Open a pull request into `main` and review the changes.
3. Click **Merge pull request**. GitHub Pages republishes the site, usually
   within a minute or two (see the repository's **Actions** tab, "pages build
   and deployment").
4. Hard-refresh the site (Ctrl+Shift+R, or Cmd+Shift+R on Mac) to see changes.

## Domain and DNS notes

- The site is served at `https://seerat.org.in`; `www.seerat.org.in` should
  redirect to it.
- GitHub Pages settings → **Custom domain**: `seerat.org.in`. GitHub stores
  this in the `CNAME` file; don't edit or delete that file by hand.
- At your DNS provider:
  - `seerat.org.in` (apex): four `A` records to GitHub Pages:
    `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
    (optionally the matching `AAAA` records:
    `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
    `2606:50c0:8003::153`).
  - `www.seerat.org.in`: a `CNAME` record pointing to `rishab12086.github.io`.
    With both set up, GitHub redirects `www` to the apex domain.
- After DNS has propagated and the certificate is issued, tick
  **Enforce HTTPS** in GitHub Pages settings.
- Canonical links, the sitemap, `robots.txt` and link-preview tags all use
  `https://seerat.org.in`, so check previews and search results after the
  domain is live (for example with the LinkedIn Post Inspector or Facebook
  Sharing Debugger).
- `404.html` resolves its links from the site root, so it is correct on the
  custom domain but not on the old `github.io/Seerat-2.0/` address.
