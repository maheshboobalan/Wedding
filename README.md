# Wedding Invitation (static HTML/CSS/JS)
No build tools needed. All paths are relative, so you can double-click `index.html` to preview it.

## Files
`index.html`, `style.css`, `main.js`, `images/` (cropped from your storyboard), `audio/`.

## Edit
- `main.js` CONFIG: venue query (replace with the exact address once confirmed), date.
- Photos: replace the `.ph` blocks in `index.html` with `<img loading="lazy">` from `images/`.
- Music: add your licensed track as `audio/nadaswaram.mp3`. None is included; the site works without it.
- Calendar end time: ICS uses a 2-hour placeholder (`PT2H` in `main.js`).

## Deploy to Vercel
1. Create a GitHub repo and push this folder (`git init && git add . && git commit -m invite && git remote add origin <url> && git push -u origin main`).
2. vercel.com > Add New > Project > import the repo. Framework preset: Other. `vercel.json` sets build `npm run build` and output `dist`.
3. Deploy, then share the https://<name>.vercel.app link with the WhatsApp button.
