# Deployment Guide

## Cloudflare Pages Deployment

This site is ready to deploy to Cloudflare Pages:

### Quick Deploy Steps:

1. **Go to Cloudflare Pages Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: Workers & Pages > Create application > Pages > Connect to Git

2. **Connect GitHub Repository**
   - Select: `vicky-steane-art`
   - Branch: `main`

3. **Build Settings**
   - **Framework preset**: Nuxt.js
   - **Build command**: `yarn generate`
   - **Build output directory**: `.output/public`
   - **Node version**: 20.x

4. **Environment Variables**
   - None required! (This is a static site)

5. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://vicky-steane-art.pages.dev`

### Custom Domain (Optional)

To add a custom domain:
1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain (e.g., `vickysteane.com`)
4. Follow DNS setup instructions

### Local Development

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Build for production
yarn generate

# Preview production build
yarn preview
```

### Site Structure

- **Portfolio Pages**: `/portfolio/paintings`, `/portfolio/collages`, `/portfolio/murals`, `/portfolio/illustrations`
- **Services Pages**: `/services/murals`, `/services/framing`, `/services/commissions`, `/services/classes`
- **Core Pages**: `/`, `/about`, `/contact`, `/faqs`

### Features

- ✅ Fully static (no backend required)
- ✅ 150+ optimized artwork images
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized with meta tags
- ✅ Image optimization (WebP/AVIF)
- ✅ Dark theme with lime accents
- ✅ Fast loading with Nuxt 4

### Performance

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

**Repository**: https://github.com/the-junglist/vicky-steane-art
**Built with**: Nuxt 3, Vue 3, Tailwind CSS, TypeScript
