# Additional Optimization Opportunities

**Analysis Date:** January 15, 2026  
**Current Status:** Redis ✅ | S3 Images ✅ | Nuxt 4 ✅

## Current Performance Baseline
- **API Response:** ~150ms (with cache)
- **Image Load:** From S3 (9,218 images migrated)
- **Lighthouse Score:** TBD (needs testing)
- **Cache Strategy:** Upstash Redis (free tier)

---

## 🚀 Speed Optimizations

### 1. CloudFront CDN for S3 Images ⭐ HIGH IMPACT
**Current:** Direct S3 access from eu-west-1  
**Improvement:** Edge caching in 400+ global locations

```bash
# Setup CloudFront distribution:
# 1. AWS Console > CloudFront > Create distribution
# 2. Origin: wardle-images.s3.eu-west-1.amazonaws.com
# 3. Cache policy: CachingOptimized
# 4. Compress objects: Yes
# 5. Supported HTTP versions: HTTP/2, HTTP/3

# Update nuxt.config.ts:
image: {
  domains: [
    'yard.wardle.online',
    'd1234567890abc.cloudfront.net'  // CloudFront domain
  ],
}
```

**Benefits:**
- ~100-200ms faster for international users
- Automatic image compression (gzip/brotli)
- HTTP/3 support
- Cost: ~$1-2/month for 50GB transfer

**Estimated Improvement:** 40-50% faster image loads globally

---

### 2. Font Optimization ⭐ MEDIUM IMPACT
**Current:** Google Fonts loading 4 families  
**Issue:** Blocks rendering, external DNS lookup

```typescript
// Option A: Self-host fonts (fastest)
// Download fonts, place in public/fonts/
// nuxt.config.ts:
css: [
  '@/assets/main.css',
  '@/assets/fonts.css'  // Local font faces
],

// Remove Google Fonts module
// modules: [
//   ['@nuxtjs/google-fonts', { ... }],  // REMOVE
// ],

// Option B: Optimize Google Fonts (easier)
modules: [
  ['@nuxtjs/google-fonts', {
    families: {
      Montserrat: [400, 600, 700],  // Specify weights
      'Permanent Marker': [400],
      'Rock Salt': [400],
      'Teko': [400, 500],
    },
    display: 'swap',  // Prevents invisible text
    preload: true,    // Preload critical fonts
    prefetch: true,
    preconnect: true,
    download: true,   // Download and self-host
    base64: false
  }],
]
```

**Benefits:**
- Eliminate external DNS lookup
- Reduce FOUT (Flash of Unstyled Text)
- Better Core Web Vitals (LCP)

**Estimated Improvement:** 200-400ms faster First Contentful Paint

---

### 3. Resource Hints ⭐ LOW EFFORT
**Add preconnect/dns-prefetch for critical domains**

```typescript
// nuxt.config.ts
app: {
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Preconnect to critical domains
      { rel: 'preconnect', href: 'https://yard.wardle.online' },
      { rel: 'preconnect', href: 'https://wardle-images.s3.eu-west-1.amazonaws.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    ]
  }
}
```

**Benefits:**
- Earlier connection to API/image servers
- ~50-100ms faster first request

---

### 4. Lazy Load Components ⭐ MEDIUM IMPACT
**Current:** All components load on page load  
**Better:** Lazy load below-the-fold content

```vue
<!-- app/pages/index.vue -->
<script setup>
// Lazy load heavy components
const PortfolioGrid = defineAsyncComponent(() => 
  import('~/components/PortfolioGrid.vue')
)
const ContactForm = defineAsyncComponent(() => 
  import('~/components/ContactForm.vue')
)
</script>

<template>
  <!-- Above the fold - loads immediately -->
  <HeroSection />
  
  <!-- Below the fold - lazy loads -->
  <ClientOnly>
    <PortfolioGrid />
    <ContactForm />
  </ClientOnly>
</template>
```

**Benefits:**
- Smaller initial bundle
- Faster Time to Interactive (TTI)
- Better mobile performance

**Estimated Improvement:** 30-40% smaller initial bundle

---

### 5. Image Preload for Hero ⭐ HIGH IMPACT
**Current:** Hero image loads after CSS  
**Better:** Preload LCP image

```typescript
// nuxt.config.ts - Add to app.head:
link: [
  { 
    rel: 'preload', 
    as: 'image', 
    href: '/img/hero/hero1.jpg',
    type: 'image/jpeg',
    fetchpriority: 'high'  // Prioritize LCP image
  },
]
```

**Benefits:**
- Faster Largest Contentful Paint (LCP)
- Better Core Web Vitals score
- Hero appears 200-500ms faster

---

## 🖼️ Image Optimizations

### 6. Modern Image Formats (WebP/AVIF) ⭐ HIGH IMPACT
**Current:** S3 serves original formats (JPG/PNG)  
**Better:** Use @nuxt/image to serve WebP/AVIF

```vue
<!-- BEFORE: Direct img tag -->
<img :src="post.featured_media_url" :alt="post.title" />

<!-- AFTER: Nuxt Image with formats -->
<NuxtImg 
  :src="post.featured_media_url"
  :alt="post.title"
  format="webp"
  quality="80"
  sizes="sm:640px md:768px lg:1024px"
  loading="lazy"
  decoding="async"
/>
```

**Already configured in nuxt.config.ts:**
```typescript
image: {
  formats: ['webp', 'avif'],  // ✅ Already enabled!
  quality: 80,
}
```

**But need to ensure all images use NuxtImg component!**

**Benefits:**
- 30-50% smaller file sizes
- Faster load times
- Better mobile performance

**Action:** Audit all `<img>` tags and replace with `<NuxtImg>`

---

### 7. Responsive Images with Srcset ⭐ MEDIUM IMPACT
**Don't serve desktop-size images to mobile**

```vue
<NuxtImg 
  :src="post.featured_media_url"
  :alt="post.title"
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  :width="800"
  :height="600"
  format="webp"
  loading="lazy"
/>
```

**Benefits:**
- Mobile users get smaller images
- Saves bandwidth and load time
- 50-70% reduction for mobile

---

### 8. Blur Placeholder (LQIP) ⭐ VISUAL IMPROVEMENT
**Better UX while images load**

```vue
<NuxtImg 
  :src="post.featured_media_url"
  :alt="post.title"
  placeholder="/img/placeholder-blur.jpg"
  placeholder-class="blur-xl"
  loading="lazy"
/>
```

Or use blurhash:
```typescript
// nuxt.config.ts
image: {
  providers: {
    customProvider: {
      provider: '~/providers/blurhash.ts',
      options: {
        baseURL: 'https://wardle-images.s3.eu-west-1.amazonaws.com'
      }
    }
  }
}
```

**Benefits:**
- Better perceived performance
- No layout shift
- Professional look

---

### 9. Image Compression Pipeline ⭐ ONE-TIME SETUP
**Compress images BEFORE S3 upload**

```python
# scripts/compress-and-upload.py
from PIL import Image
import boto3
from io import BytesIO

def compress_image(image_path, quality=85):
    """Compress image before uploading to S3"""
    img = Image.open(image_path)
    
    # Convert RGBA to RGB if needed
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    # Resize if too large
    max_dimension = 2000
    if max(img.size) > max_dimension:
        img.thumbnail((max_dimension, max_dimension), Image.LANCZOS)
    
    # Compress
    output = BytesIO()
    img.save(output, format='JPEG', quality=quality, optimize=True)
    output.seek(0)
    
    return output

# Use in WordPress upload flow or batch process
```

**Benefits:**
- 40-60% smaller file sizes
- Faster uploads and downloads
- Lower S3 costs

---

## 🔍 SEO Optimizations

### 10. Enhanced Meta Tags ⭐ HIGH IMPACT
**Current:** Basic meta tags exist  
**Better:** Complete Open Graph + Twitter Cards

```vue
<!-- app/pages/portfolio/[slug].vue -->
<script setup>
const post = await fetchPost()

useSeoMeta({
  // Basic meta
  title: `${post.title} - Wardle Online`,
  description: post.excerpt.substring(0, 160),
  
  // Open Graph
  ogTitle: post.title,
  ogDescription: post.excerpt.substring(0, 200),
  ogImage: post.featured_image_url,
  ogUrl: `https://wardle.online/portfolio/${post.slug}`,
  ogType: 'article',
  articlePublishedTime: post.date,
  articleModifiedTime: post.modified,
  articleAuthor: 'Nathan Wardle',
  
  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterTitle: post.title,
  twitterDescription: post.excerpt.substring(0, 200),
  twitterImage: post.featured_image_url,
  twitterSite: '@wardleonline',  // Your Twitter handle
  
  // Additional
  robots: 'index, follow',
  canonical: `https://wardle.online/portfolio/${post.slug}`,
})
</script>
```

**Benefits:**
- Better social media sharing previews
- Improved click-through rates
- Professional appearance on LinkedIn/Twitter

---

### 11. Structured Data (JSON-LD) ⭐ HIGH IMPACT
**Help search engines understand your content**

```vue
<!-- app/pages/portfolio/[slug].vue -->
<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        headline: post.title,
        description: post.excerpt,
        image: post.featured_image_url,
        datePublished: post.date,
        dateModified: post.modified,
        author: {
          '@type': 'Person',
          name: 'Nathan Wardle',
          url: 'https://wardle.online'
        },
        publisher: {
          '@type': 'Person',
          name: 'Nathan Wardle',
          url: 'https://wardle.online'
        }
      })
    }
  ]
})
</script>
```

**For homepage (Person schema):**
```vue
<!-- app/pages/index.vue -->
<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nathan Wardle',
        url: 'https://wardle.online',
        jobTitle: 'Web Designer & Developer',
        description: '20 years of designing and building websites, intranets and apps',
        sameAs: [
          'https://linkedin.com/in/nathanwardle',  // Your LinkedIn
          'https://github.com/the-junglist',
          'https://twitter.com/wardleonline'  // If you have Twitter
        ],
        knowsAbout: [
          'Web Design',
          'UI/UX Design',
          'Nuxt.js',
          'WordPress',
          'WooCommerce',
          'Laravel',
          'React'
        ]
      })
    }
  ]
})
</script>
```

**Benefits:**
- Rich snippets in search results
- Better CTR from Google
- Enhanced Knowledge Graph presence

---

### 12. XML Sitemap Enhancement ⭐ MEDIUM IMPACT
**Current:** nuxt-simple-sitemap disabled (Nuxt 4 incompatible)  
**Solution:** Use @nuxtjs/sitemap (Nuxt 4 compatible)

```bash
yarn add @nuxtjs/sitemap
```

```typescript
// nuxt.config.ts
modules: [
  '@nuxtjs/sitemap'  // Replace nuxt-simple-sitemap
],

sitemap: {
  hostname: 'https://wardle.online',
  gzip: true,
  routes: async () => {
    // Dynamically fetch all portfolio posts
    const posts = await $fetch('https://yard.wardle.online/wp-json/wp/v2/posts?per_page=100')
    return posts.map(post => ({
      url: `/portfolio/${post.slug}`,
      lastmod: post.modified,
      changefreq: 'monthly',
      priority: 0.8
    }))
  }
}
```

**Benefits:**
- All pages indexed by Google
- Better crawl efficiency
- Faster new content discovery

---

### 13. Robots.txt Optimization ⭐ LOW EFFORT

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_nuxt/

# Sitemap
Sitemap: https://wardle.online/sitemap.xml

# Crawl delay for bots (optional)
User-agent: GPTBot
Crawl-delay: 10
```

**Benefits:**
- Prevent API route indexing
- Guide search engine crawlers
- Save server resources

---

### 14. Canonical URLs ⭐ CRITICAL
**Prevent duplicate content issues**

```vue
<!-- Already partially done, enhance: -->
<script setup>
const route = useRoute()
const canonicalUrl = `https://wardle.online${route.path}`

useSeoMeta({
  canonical: canonicalUrl,
  ogUrl: canonicalUrl
})
</script>
```

**Benefits:**
- No duplicate content penalties
- Consolidate link equity
- Better search rankings

---

## ♿ Accessibility Optimizations

### 15. Alt Text Audit ⭐ CRITICAL
**Every image needs descriptive alt text**

```vue
<!-- BAD -->
<img :src="post.image" alt="image" />
<img :src="post.image" alt="" />  <!-- Only for decorative -->

<!-- GOOD -->
<NuxtImg 
  :src="post.featured_media_url"
  :alt="post.title.rendered || 'Portfolio project thumbnail'"
  loading="lazy"
/>
```

**Action Items:**
1. Audit all `<img>` and `<NuxtImg>` tags
2. Ensure WordPress media library has alt text
3. Fallback to post title if no alt text
4. Empty alt (`alt=""`) ONLY for decorative images

---

### 16. Keyboard Navigation ⭐ HIGH IMPACT
**Ensure all interactive elements are keyboard accessible**

```vue
<!-- Add focus styles globally -->
<!-- assets/main.css -->
```css
/* Focus visible (modern browsers) */
*:focus-visible {
  outline: 2px solid theme('colors.lime.400');
  outline-offset: 2px;
}

/* Skip to content link for screen readers */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: theme('colors.lime.400');
  color: theme('colors.black');
  padding: 8px 16px;
  z-index: 9999;
  text-decoration: none;
}

.skip-to-content:focus {
  top: 0;
}
```

```vue
<!-- app/app.vue -->
<template>
  <div>
    <a href="#main-content" class="skip-to-content">
      Skip to main content
    </a>
    <NuxtLayout>
      <main id="main-content" tabindex="-1">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>
```

**Benefits:**
- Keyboard-only users can navigate
- Better screen reader experience
- WCAG 2.1 Level AA compliance

---

### 17. ARIA Labels & Semantic HTML ⭐ MEDIUM IMPACT

```vue
<!-- BAD -->
<div @click="switchView('grid')">Grid</div>

<!-- GOOD -->
<button 
  @click="switchView('grid')"
  :aria-pressed="viewMode === 'grid'"
  aria-label="Switch to grid view"
>
  <Icon name="grid" aria-hidden="true" />
  <span>Grid</span>
</button>

<!-- Navigation with proper roles -->
<nav aria-label="Main navigation">
  <ul>
    <li><NuxtLink to="/">Home</NuxtLink></li>
    <li><NuxtLink to="/portfolio">Portfolio</NuxtLink></li>
  </ul>
</nav>

<!-- Article with proper structure -->
<article aria-labelledby="post-title">
  <h2 id="post-title">{{ post.title }}</h2>
  <p>{{ post.excerpt }}</p>
</article>
```

**Benefits:**
- Screen readers understand content structure
- Better assistive technology support
- WCAG compliance

---

### 18. Color Contrast ⭐ CRITICAL
**Ensure text meets WCAG AA/AAA standards**

**Current colors to check:**
- `text-gray-300` on `bg-zinc-900` - Need 4.5:1 ratio
- `text-lime-400` on `bg-black` - Check contrast

```bash
# Use online checker:
# https://webaim.org/resources/contrastchecker/

# Or add to CI/CD:
yarn add -D axe-core @axe-core/playwright
```

**Action:** Audit all text colors, adjust if needed:
```css
/* Example fixes */
.text-gray-300 { color: #d1d5db; } /* Current */
.text-gray-200 { color: #e5e7eb; } /* Better contrast */
```

---

### 19. Focus Trap for Modals ⭐ MEDIUM IMPACT
**If you have modals, trap focus inside**

```vue
<!-- composables/useFocusTrap.ts -->
export function useFocusTrap() {
  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
      
      if (e.key === 'Escape') {
        // Close modal
      }
    }
    
    element.addEventListener('keydown', handleTab)
    firstElement?.focus()
    
    return () => element.removeEventListener('keydown', handleTab)
  }
  
  return { trapFocus }
}
```

---

## 🎯 Implementation Priority

### Phase 1: Quick Wins (1-2 hours)
1. ✅ Add resource hints (preconnect/dns-prefetch)
2. ✅ Preload hero image
3. ✅ Add robots.txt
4. ✅ Audit and fix alt text
5. ✅ Add skip-to-content link
6. ✅ Enhanced meta tags on key pages

**Expected Impact:** +10-15 Lighthouse score

---

### Phase 2: Image Optimization (2-4 hours)
1. ✅ Replace all `<img>` with `<NuxtImg>`
2. ✅ Add proper sizes/srcset
3. ✅ Implement blur placeholders
4. ✅ Setup CloudFront CDN for S3

**Expected Impact:** +15-20 Lighthouse score, 40% faster images

---

### Phase 3: SEO & Structured Data (3-5 hours)
1. ✅ Add JSON-LD structured data
2. ✅ Fix sitemap (replace with Nuxt 4 compatible)
3. ✅ Enhanced meta tags all pages
4. ✅ Canonical URLs everywhere
5. ✅ Social media meta tags

**Expected Impact:** Better search rankings, rich snippets

---

### Phase 4: Advanced Performance (4-6 hours)
1. ✅ Self-host Google Fonts
2. ✅ Lazy load components
3. ✅ Code splitting optimization
4. ✅ Service Worker / PWA (optional)

**Expected Impact:** +5-10 Lighthouse score, faster TTI

---

### Phase 5: Accessibility Audit (2-3 hours)
1. ✅ Color contrast fixes
2. ✅ ARIA labels
3. ✅ Keyboard navigation
4. ✅ Focus management
5. ✅ Screen reader testing

**Expected Impact:** WCAG 2.1 AA compliance

---

## 📊 Expected Results

| Metric | Current | After Phase 1-2 | After Phase 3-5 |
|--------|---------|-----------------|-----------------|
| **Lighthouse Performance** | ~85 | 90-95 | 95-100 |
| **Lighthouse SEO** | ~80 | 90-95 | 95-100 |
| **Lighthouse Accessibility** | ~75 | 85-90 | 95-100 |
| **First Contentful Paint** | ~1.5s | ~0.8s | ~0.6s |
| **Largest Contentful Paint** | ~2.5s | ~1.5s | ~1.2s |
| **Time to Interactive** | ~3.0s | ~2.0s | ~1.5s |
| **Total Blocking Time** | ~300ms | ~150ms | ~100ms |

---

## 🛠️ Tools for Testing

### Performance Testing
- **Lighthouse** (Chrome DevTools) - F12 > Lighthouse
- **WebPageTest** - https://www.webpagetest.org/
- **PageSpeed Insights** - https://pagespeed.web.dev/
- **GTmetrix** - https://gtmetrix.com/

### SEO Testing
- **Google Search Console** - https://search.google.com/search-console
- **Schema Markup Validator** - https://validator.schema.org/
- **Rich Results Test** - https://search.google.com/test/rich-results
- **Screaming Frog** - Site crawl analysis

### Accessibility Testing
- **axe DevTools** (Chrome extension)
- **WAVE** - https://wave.webaim.org/
- **Color Contrast Checker** - https://webaim.org/resources/contrastchecker/
- **NVDA Screen Reader** (Windows) - https://www.nvaccess.org/
- **VoiceOver** (Mac) - Built-in

### Image Optimization
- **Squoosh** - https://squoosh.app/ (compression testing)
- **TinyPNG** - https://tinypng.com/ (batch compression)
- **ImageOptim** (Mac) - https://imageoptim.com/

---

## 💡 Next Steps

1. **Immediate:** Run Lighthouse audit to get baseline
2. **This week:** Implement Phase 1 (quick wins)
3. **Next week:** Phase 2 (image optimization + CloudFront)
4. **Ongoing:** Monitor performance, adjust as needed

---

**Want me to implement any of these? Just say which phase! 🚀**
