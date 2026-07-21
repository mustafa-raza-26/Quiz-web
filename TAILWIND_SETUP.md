# Tailwind CSS – Production Build Setup

Is project mein pehle Tailwind CDN script (`cdn.tailwindcss.com`) use ho raha tha,
jo sirf development/demo ke liye theek hai, production ke liye nahi (warning isi
liye aa rahi thi). Ab is folder mein ek proper Tailwind CLI build set up kar diya
gaya hai.

## Kya badla hai

- Har HTML file (`index.html`, `categories.html`, `dashboard.html`,
  `leaderboard.html`, `signup.html`, `test.html`) se ye do cheezein hata di gayi hain:
  - `<script src="https://cdn.tailwindcss.com?...">`
  - `<script id="tailwind-config">...</script>` (inline config)
- Inki jagah ek compiled CSS file link ki gayi hai:
  - `dashboard.html` → `dist/dashboard.css` (isme font **Poppins** hai, jaisa
    pehle tha)
  - Baaki 5 files → `dist/output.css` (font **Plus Jakarta Sans**)
- Naye config files add kiye gaye hain:
  - `tailwind.config.js` — shared config (colors, spacing, radius, font sizes)
  - `tailwind.dashboard.config.js` — same config, bas Poppins font ke saath
  - `src/input.css` — Tailwind ke 3 directives (`@tailwind base/components/utilities`)
  - `package.json` — build scripts

**Note:** Is sandbox mein internet access nahi hai, is liye main khud
`npm install` / build run nahi kar saka. Neeche diye gaye commands aapko apne
computer (jahan internet ho) par chalane honge — ek baar chalane ke baad
`dist/output.css` aur `dist/dashboard.css` ban jayengi, aur phir aap HTML files
ko seedha kisi bhi server ya static hosting (Vercel wagera) par deploy kar
sakte hain.

## Commands (apne computer par, project folder ke andar)

```bash
# 1. Dependencies install karo (ek hi baar)
npm install

# 2. Production CSS build karo (dist/output.css + dist/dashboard.css banega)
npm run build
```

Agar aap development ke doraan changes karte rehte hain aur CSS ko auto-rebuild
karwana chahte hain:

```bash
npm run watch
```

## Deploy karte waqt

`dist/output.css` aur `dist/dashboard.css` ko baaki files ke saath deploy
karna na bhoolein — ye files HTML se link ki gayi hain, is liye zaroori hain.

Agar future mein aap koi naya Tailwind class kisi HTML ya JS file mein add
karte hain, to `npm run build` dobara chalana hoga taake wo naya class CSS mein
shamil ho jaye.
