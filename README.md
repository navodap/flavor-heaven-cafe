# Flavor Heaven Café Website

A responsive React + Vite café website with:

- Cinematic intro video screen
- Premium brown, black, yellow and white theme
- Sticky navigation
- Hero landing section
- Filterable menu categories
- Responsive product grid
- Product detail modal
- About/story section
- Contact form and WhatsApp ordering
- Mobile navigation

## Run locally

```bash
npm install
npm run dev
```

## Add your AI intro video

Place your exported video here:

`public/videos/flavor-heaven-intro.mp4`

Recommended desktop video: 1920×1080, MP4 H.264, 8–12 seconds.

The site includes an SVG poster fallback, so it still works before adding the video.

## Customize before delivery

Search and replace these placeholders in `src/main.jsx`:

- `+94 77 000 0000`
- `94770000000`
- `123 Café Street, Colombo, Sri Lanka`
- `hello@flavorheaven.lk`
- Social media `href="#"` links
- Opening hours
- Product names, prices and descriptions

## Build for deployment

```bash
npm run build
```

Upload the project to GitHub and deploy on Vercel.
