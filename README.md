# cpa-sred-site

Custom CSS and JavaScript for the joint accounting, tax and SR&ED website (Webflow).
Webflow loads these files from GitHub through the free jsDelivr CDN, so the code lives here
instead of being pasted into Webflow's custom-code boxes.

| File | What it does | Where it loads |
|---|---|---|
| `src/site.css` | Header tweaks, logo marquee, testimonial rail, FAQ accordion, rotating-word underline | Every page (site `<head>`) |
| `src/site.js` | FAQ accordion, auto-advancing testimonial rail and its arrows | Every page (site footer) |
| `src/accounting.js` | Rotating hero word, pre-flight checklist, booking check before Cal.com | Accounting & tax page only |

Search data (JSON-LD), SEO titles and descriptions stay in Webflow: they are page content, not code.

## Webflow embeds

Replace `v1.0.0` with the release you want live.

**Site settings → Custom code → Head code**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vshanks/cpa-sred-site@v1.0.0/src/site.min.css">
```

**Site settings → Custom code → Footer code**

```html
<script src="https://cdn.jsdelivr.net/gh/vshanks/cpa-sred-site@v1.0.0/src/site.min.js" defer></script>
```

**Accounting & tax page → Page settings → Custom code → Before `</body>` tag**

```html
<script src="https://cdn.jsdelivr.net/gh/vshanks/cpa-sred-site@v1.0.0/src/accounting.min.js" defer></script>
```

jsDelivr makes the `.min` versions automatically; you only edit the plain files here.

## Making a change

1. Edit the file in `src/` and commit to `main`.
2. Create a release with the next version tag (`v1.0.1` for fixes, `v1.1.0` for new features):
   GitHub → Releases → Draft a new release → choose a new tag → Publish.
3. In Webflow, change the version in the embed line(s) above to the new tag, then publish the site.
4. To roll back, change the version back and publish.

Always point Webflow at a tag, never at `main`: jsDelivr caches branch files for up to a day,
while a new tag is live immediately.

## Rules for the code

- Public repo: anything here is visible to anyone, as all website code is. No keys, tokens or client data.
- Scripts find elements by Webflow class name (`book-gate`, `gate-yes`, `faq-item`, `quote-rail`…).
  Renaming those classes in Webflow breaks the matching script, so change both together.
- Custom code doesn't run inside the Webflow Designer. Test on the published site.

## Booking check (accounting.js)

On the Accounting & tax page, every link to `cal.com/vipulj` opens a one-question check first:
"Do you own or run a business?" **Yes** unlocks the Cal.com link; **No** keeps it disabled and
points to CRA's free tax clinics. It needs the hidden `book-gate` section on that page.
