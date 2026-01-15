# Vicky Steane Art - Portfolio Website

Static portfolio website showcasing artwork by Vicky Steane - an established London artist specializing in murals, collages, paintings, and illustrations.

**Live Site**: TBD (Cloudflare Pages)

## 🚀 Tech Stack

- **Frontend**: Nuxt 3.17.3, Vue 3, TypeScript
- **Styling**: Tailwind CSS (dark theme with lime/emerald accents)
- **Images**: Nuxt Image with WebP/AVIF optimization
- **Deployment**: Cloudflare Pages (static generation)
- **Node Version**: 20.19.6
- **Package Manager**: Yarn 1.22.22

## ✨ Features

- 🌑 **Dark Theme**: Zinc/slate backgrounds with lime/emerald accent colors
- 📱 **Fully Responsive**: Mobile-first design
- 🖼️ **Portfolio Galleries**: Paintings, Collages, Murals, Illustrations
- 💼 **Services Pages**: Murals, Framing (Tyler Studios), Commissions, Classes
- 📜 **Hide-on-Scroll Header**: Header hides when scrolling down
- ⬆️ **Scroll-to-Top Button**: Floating button for easy navigation
- 🚀 **Static Site**: No backend required, lightning fast
- ⚡ **Optimized Images**: WebP/AVIF formats, lazy loading

## 🛠️ Local Development

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:3000)
yarn dev

# Build for production
yarn build

# Generate static site
yarn generate

# Preview production build
yarn preview
```

## �� Project Structure

```
app/
  ├── components/
  │   ├── Base/          # Header, Navigation, ScrollToTop
  │   └── Gallery/       # Image gallery components
  ├── layouts/
  │   └── default.vue    # Default layout
  ├── pages/
  │   ├── index.vue      # Homepage
  │   ├── about.vue      # About page
  │   ├── contact.vue    # Contact page
  │   ├── faqs.vue       # FAQs
  │   ├── portfolio/     # Portfolio galleries
  │   │   ├── index.vue
  │   │   ├── paintings.vue
  │   │   ├── collages.vue
  │   │   ├── murals.vue
  │   │   └── illustrations.vue
  │   └── services/      # Service pages
  │       ├── index.vue
  │       ├── murals.vue
  │       ├── framing.vue
  │       ├── commissions.vue
  │       └── classes.vue
  └── assets/            # Global styles
public/
  └── img/
      └── portfolio/     # Portfolio images (291 images)
```

## 🎨 Design System

**Colors:**
- Background: `zinc-950` (almost black)
- Cards: `zinc-900` (dark gray)
- Primary accent: `lime-400/500` (bright lime)
- Secondary accent: `emerald-400` (green)
- Text: `gray-200/300/400` (light grays)

**Typography:**
- Font: Montserrat (400, 600, 700 weights)
- Headings: Lime-400, Bold

## 🌐 Deployment

### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `yarn generate`
3. Build output: `.output/public`
4. Set Node version: 20.x
5. Deploy!

## 📝 Content Source

Content sourced from original site: https://www.vickysteane.com/

- About: Artist bio, Tyler Studios, storytelling
- Portfolio: 4 categories with image galleries
- Services: Murals, framing, commissions, classes
- Contact: Email (info@vickysteane.co.uk), Phone (+44 117 463 9993)

## 👤 About the Artist

Vicky Steane is an established London artist and illustrator based in the South West of England and London. She uses a wide range of materials to create diverse artwork - from intricate collages using old maps, to large-scale painted wall murals, mixed media acrylic paintings, and biro illustrations.

**Tyler Studios**: Ran picture framing gallery on Eel Pie Island, Twickenham for 16+ years. Clients include Damien Hirst, Tracy Emin, Tate Gallery, and The London Museum.

## 📄 License

Private project - All rights reserved.
