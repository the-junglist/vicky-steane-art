# Lighthouse Analysis & Action Plan
**Date:** January 15, 2026  
**Site:** https://wardle.online

## 📊 Current Scores

### Mobile (Moto G Power 2022)
| Category | Score | Grade |
|----------|-------|-------|
| **Performance** | 75 | 🟡 C |
| **Accessibility** | 81 | 🟡 B- |
| **Best Practices** | 96 | 🟢 A+ |
| **SEO** | 92 | 🟢 A |

### Desktop
| Category | Score | Grade |
|----------|-------|-------|
| **Performance** | 92 | 🟢 A |
| **Accessibility** | 88 | 🟢 B+ |
| **Best Practices** | 96 | 🟢 A+ |
| **SEO** | 92 | 🟢 A |

---

## 🚨 Critical Issues

### 1. Mobile LCP: 6.4 seconds (CRITICAL) 🔴
**Score:** 9/100  
**Target:** <2.5s (currently 156% OVER)  
**Impact:** Massive - This is the #1 performance killer

**Root Cause:**
- Hero image (725KB) + large WordPress images (1.8MB, 1.2MB)
- Images served from WordPress directly, not S3
- No WebP/AVIF format
- No responsive images (srcset)
- Not using `<NuxtImg>` component

**The Problem:**
```html
<!-- Current (BAD): -->
<img src="/img/hero/hero1.jpg" alt="Hero background" class="w-full h-full object-cover" />
```

Mobile devices are downloading:
- Hero: 725KB JPEG
- Portfolio thumbnails: 1.8MB PNG (!!)
- No compression, no modern formats

---

### 2. Accessibility: Button Missing Name 🔴
**Score:** 0/100 (fails)

**Issue Found:**
```html
<button class="md:hidden p-2 text-gray-400 hover:text-lime-400">
  <!-- No text or aria-label! -->
</button>
```

**Location:** Mobile menu hamburger button in header

---

### 3. Color Contrast Issues 🔴
**Score:** 0/100 (fails)

**Failing Elements:**
1. `text-gray-500` on dark background (Contact section)
2. Footer text - insufficient contrast

**Current:**
- `text-gray-500` = #6b7280 on `bg-zinc-900` = #18181b
- Contrast ratio: ~3.5:1 (needs 4.5:1 minimum)

---

### 4. Enormous Network Payloads 🟡
**Score:** 50/100  
**Total:** 3.1MB+ transferred

**Largest Resources:**
1. Screenshot PNG: **1.88 MB** 😱
2. Screenshot PNG: **1.25 MB** 😱
3. Hero JPEG: **725 KB**
4. Other PNG: **167 KB**

**Issue:** WordPress images NOT going through S3 yet!

---

## 📈 Core Web Vitals Breakdown

### Mobile Performance Metrics
| Metric | Value | Score | Target | Status |
|--------|-------|-------|--------|--------|
| **FCP** | 2.2s | 79/100 | <1.8s | 🟡 FAIR |
| **LCP** | 6.4s | 9/100 | <2.5s | 🔴 POOR |
| **Speed Index** | 2.8s | 96/100 | <3.4s | 🟢 GOOD |
| **TBT** | 50ms | 100/100 | <200ms | 🟢 GOOD |
| **CLS** | 0.034 | 100/100 | <0.1 | 🟢 GOOD |
| **TTI** | 6.4s | 59/100 | <3.8s | 🔴 POOR |

### Desktop Performance Metrics
| Metric | Value | Score | Target | Status |
|--------|-------|-------|--------|--------|
| **FCP** | 0.6s | 99/100 | <1.8s | 🟢 EXCELLENT |
| **LCP** | 1.7s | 72/100 | <2.5s | 🟡 GOOD |
| **Speed Index** | 1.0s | 97/100 | <3.4s | 🟢 EXCELLENT |
| **TBT** | 0ms | 100/100 | <200ms | 🟢 PERFECT |
| **CLS** | 0.041 | 99/100 | <0.1 | 🟢 EXCELLENT |
| **TTI** | 1.8s | - | <3.8s | 🟢 GOOD |

---

## 🎯 Action Plan (Prioritized)

## PHASE 1: CRITICAL FIXES (TODAY) ⚡

### 1A. Fix Mobile Menu Button (5 minutes)
**Impact:** Accessibility 81→90 (+9 points)

```vue
<!-- app/components/Header.vue or wherever menu button is -->

<!-- BEFORE: -->
<button class="md:hidden p-2 text-gray-400 hover:text-lime-400">
  <Icon name="mdi:menu" />
</button>

<!-- AFTER: -->
<button 
  class="md:hidden p-2 text-gray-400 hover:text-lime-400"
  aria-label="Open navigation menu"
  @click="toggleMenu"
>
  <Icon name="mdi:menu" aria-hidden="true" />
  <span class="sr-only">Menu</span>
</button>
```

### 1B. Fix Color Contrast (10 minutes)
**Impact:** Accessibility +5-8 points

```vue
<!-- Find and replace in: -->
<!-- app/pages/index.vue (contact section) -->
<!-- app/components/Footer.vue -->

<!-- BEFORE: -->
<span class="text-gray-500">...</span>
<p class="text-gray-500">...</p>

<!-- AFTER: -->
<span class="text-gray-400">...</span>  <!-- Lighter = better contrast -->
<p class="text-gray-400">...</p>
```

Add to `assets/main.css`:
```css
/* Ensure sufficient contrast for accessibility */
.text-gray-500 {
  color: #9ca3af; /* Increase from #6b7280 */
}
```

### 1C. Convert Hero Image to NuxtImg (15 minutes)
**Impact:** Mobile Performance +10-15 points, LCP improvement

```vue
<!-- app/pages/index.vue -->

<!-- BEFORE: -->
<img 
  src="/img/hero/hero1.jpg" 
  alt="Hero background" 
  class="w-full h-full object-cover"
/>

<!-- AFTER: -->
<NuxtImg 
  src="/img/hero/hero1.jpg" 
  alt="Nathan Wardle portfolio hero - web design and development"
  format="webp"
  quality="75"
  sizes="sm:100vw md:100vw lg:100vw"
  width="1920"
  height="1080"
  loading="eager"
  fetchpriority="high"
  class="w-full h-full object-cover"
/>
```

**Why this works:**
- Generates WebP (30-50% smaller)
- Responsive sizes for mobile
- `fetchpriority="high"` prioritizes LCP image
- `loading="eager"` loads immediately

---

## PHASE 2: IMAGE OPTIMIZATION (2 HOURS) 🖼️

### 2A. Verify S3 Migration Complete
Check if WordPress images are actually being served from S3:

```bash
# Check migration status:
curl -I https://yard.wardle.online/wp-content/uploads/2025/03/Screenshot-from-2025-03-20-18-12-37.png
# Should redirect to S3 or show S3 URL

# If still on WordPress server, check plugin:
# WordPress admin > WP Offload Media > Settings
# Ensure "Deliver Offloaded Media" is ENABLED
```

**Issue:** Lighthouse shows images still coming from `yard.wardle.online`, not S3!

### 2B. Force S3 URL Rewrite in WordPress
If images aren't using S3 URLs yet:

1. WordPress Admin → WP Offload Media → Tools
2. Click "Copy Files to Bucket" (may need to re-run)
3. Enable "Force HTTPS" and "Deliver Offloaded Media"
4. Click "Remove Files from Server" (optional, keep originals for backup)

### 2C. Update Nuxt Image Config for S3
```typescript
// nuxt.config.ts
image: {
  domains: [
    'yard.wardle.online',
    'wardle-images.s3.eu-west-1.amazonaws.com'  // Add S3 domain
  ],
  alias: {
    wordpress: 'https://wardle-images.s3.eu-west-1.amazonaws.com',
    wordpressBackup: 'https://yard.wardle.online'
  },
  formats: ['webp', 'avif'],
  quality: 80,
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
}
```

### 2D. Replace All Portfolio Images with NuxtImg
Find all portfolio image tags and convert:

```bash
# Search for img tags:
grep -r "<img" app/pages/portfolio --include="*.vue"
grep -r "<img" app/components --include="*.vue"
```

```vue
<!-- BEFORE: -->
<img :src="post.featured_media_url" :alt="post.title" />

<!-- AFTER: -->
<NuxtImg 
  :src="post.featured_media_url"
  :alt="post.title.rendered || 'Portfolio project'"
  format="webp"
  quality="80"
  sizes="xs:100vw sm:50vw md:33vw lg:25vw"
  width="600"
  height="400"
  loading="lazy"
  decoding="async"
/>
```

### 2E. Compress Oversized Screenshots
Those 1.8MB PNGs need compression:

```bash
# Option 1: Manual compression (Squoosh.app)
# Download problematic images from WordPress
# Compress with Squoosh: https://squoosh.app/
# Re-upload to WordPress

# Option 2: Automated (recommended)
# Install ImageMagick:
sudo apt-get install imagemagick

# Create compression script:
# scripts/compress-wordpress-images.sh
```

```bash
#!/bin/bash
# Compress WordPress images over 500KB

find /path/to/wordpress/uploads -type f -size +500k \( -name "*.png" -o -name "*.jpg" \) | while read file; do
  echo "Compressing: $file"
  
  if [[ $file == *.png ]]; then
    # PNG: Convert to JPEG if not transparent
    convert "$file" -quality 85 -resize '2000x2000>' "${file%.png}.jpg"
  else
    # JPEG: Compress
    convert "$file" -quality 85 -resize '2000x2000>' "$file"
  fi
done
```

**Expected Impact:**
- 1.88MB → ~400KB (79% reduction)
- 1.25MB → ~300KB (76% reduction)
- 725KB → ~150KB with WebP (79% reduction)

---

## PHASE 3: PRELOAD & RESOURCE HINTS (30 MIN) ⚡

### 3A. Preload Hero Image
```typescript
// nuxt.config.ts - in app.head
link: [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  // Preload critical resources
  { 
    rel: 'preload', 
    as: 'image', 
    href: '/img/hero/hero1.jpg',
    type: 'image/jpeg',
    fetchpriority: 'high'
  },
  // Preconnect to external domains
  { rel: 'preconnect', href: 'https://yard.wardle.online' },
  { rel: 'preconnect', href: 'https://wardle-images.s3.eu-west-1.amazonaws.com' },
  { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
  { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
]
```

### 3B. Add Accessibility Skip Link
```vue
<!-- app/app.vue -->
<template>
  <div>
    <!-- Skip to content for screen readers -->
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

<style>
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #a3e635; /* lime-400 */
  color: #000;
  padding: 8px 16px;
  z-index: 9999;
  text-decoration: none;
  font-weight: 600;
}

.skip-to-content:focus {
  top: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
</style>
```

---

## PHASE 4: CLOUDFRONT CDN (1 HOUR) 🌍

### Setup CloudFront Distribution
Once S3 is confirmed working:

```bash
# AWS Console > CloudFront > Create distribution

# Origin settings:
Origin domain: wardle-images.s3.eu-west-1.amazonaws.com
Origin path: /
Name: wardle-images-s3

# Default cache behavior:
Viewer protocol: Redirect HTTP to HTTPS
Allowed HTTP methods: GET, HEAD, OPTIONS
Cache policy: CachingOptimized
Compress objects: Yes

# Create distribution
# Wait 10-15 minutes for deployment
# Get CloudFront URL: d1234567890abc.cloudfront.net
```

Update WordPress plugin:
```php
// WordPress admin > WP Offload Media > Delivery
// Custom domain (CNAME): d1234567890abc.cloudfront.net
```

Update Nuxt config:
```typescript
image: {
  domains: [
    'd1234567890abc.cloudfront.net',  // CloudFront
    'wardle-images.s3.eu-west-1.amazonaws.com'  // Fallback
  ],
}
```

**Expected Impact:**
- 100-300ms faster image loads globally
- Better mobile performance
- Cost: ~$1-2/month

---

## 📊 Expected Improvements

### After Phase 1 (Critical Fixes)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile Performance | 75 | 82-85 | +7-10 |
| Mobile Accessibility | 81 | 90-92 | +9-11 |
| Mobile LCP | 6.4s | 4.5-5s | -30% |
| Desktop Accessibility | 88 | 95-97 | +7-9 |

### After Phase 2 (Image Optimization)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile Performance | 75 | 88-92 | +13-17 |
| Mobile LCP | 6.4s | 2.8-3.5s | -56% |
| Page Size | 3.1MB | 1.2-1.5MB | -52% |
| FCP | 2.2s | 1.5-1.8s | -32% |

### After Phase 3 (Preload)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile Performance | 88-92 | 90-94 | +2-3 |
| Mobile LCP | 2.8-3.5s | 2.2-2.8s | -21% |
| Mobile FCP | 1.5-1.8s | 1.2-1.5s | -20% |

### After Phase 4 (CloudFront)
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile Performance | 90-94 | 92-96 | +2-3 |
| Mobile LCP | 2.2-2.8s | 1.8-2.3s | -18% |
| Global Load Time | Varies | Consistent | 🌍 |

### Final Projected Scores
| Category | Current | After All Phases | Change |
|----------|---------|------------------|--------|
| **Mobile Performance** | 75 | 92-96 | +17-21 ⬆️ |
| **Mobile Accessibility** | 81 | 95-98 | +14-17 ⬆️ |
| **Desktop Performance** | 92 | 96-99 | +4-7 ⬆️ |
| **Desktop Accessibility** | 88 | 96-98 | +8-10 ⬆️ |

---

## 🔍 Additional Observations

### Strengths ✅
1. **CLS (Layout Shift):** Perfect 0.034 - excellent!
2. **TBT (Blocking Time):** 50ms mobile, 0ms desktop - great!
3. **Best Practices:** 96/100 - nearly perfect
4. **SEO:** 92/100 - solid foundation
5. **Speed Index:** 96-97/100 - very good

### Why Desktop Performs Better
- **Desktop Performance (92)** vs **Mobile (75)** = 17 point gap
- Desktop has faster CPU/network in Lighthouse simulation
- Mobile LCP is 3.8x worse (6.4s vs 1.7s)
- Same images downloaded, but mobile slower to render

### The S3 Mystery 🔍
**Critical Finding:** Images are still coming from `yard.wardle.online`, NOT S3!

Check these:
1. Did migration script finish? (358/9218 shown, needs 9218/9218)
2. Is WP Offload Media plugin active?
3. Is "Deliver Offloaded Media" enabled?
4. Did WordPress rewrite URLs in database?

```bash
# Check migration status:
python3 scripts/migrate-images-to-s3.py
# Should show: ✅ [9218/9218] Complete

# Test S3 directly:
curl -I https://wardle-images.s3.eu-west-1.amazonaws.com/wp-content/uploads/2025/03/Screenshot-from-2025-03-20-18-12-37.png
# Should return: HTTP 200 OK
```

---

## 🎬 Implementation Order

### TODAY (2-3 hours)
1. ✅ Fix button aria-label (5 min)
2. ✅ Fix color contrast (10 min)
3. ✅ Convert hero to NuxtImg (15 min)
4. ✅ Add skip-to-content link (10 min)
5. ✅ Check S3 migration status (30 min)
6. ✅ Add preload/preconnect (15 min)
7. ✅ Convert portfolio images to NuxtImg (45 min)

**Expected Result:** Mobile 75→85+, Accessibility 81→92+

### THIS WEEK
1. ✅ Compress oversized PNGs (1 hour)
2. ✅ Setup CloudFront CDN (1 hour)
3. ✅ Test and verify improvements (30 min)
4. ✅ Re-run Lighthouse (15 min)

**Expected Result:** Mobile 85→92+, Desktop 92→96+

### ONGOING
- Monitor Core Web Vitals in Search Console
- Check S3 costs monthly (~$0.50)
- Consider CloudFront if traffic increases
- Keep WordPress/Nuxt updated

---

## 🛠️ Testing Commands

```bash
# 1. Run Lighthouse locally:
lighthouse https://wardle.online --view --preset=desktop
lighthouse https://wardle.online --view --preset=mobile --throttling.cpuSlowdownMultiplier=4

# 2. Check S3 migration:
aws s3 ls s3://wardle-images/wp-content/uploads/2025/ --recursive | wc -l

# 3. Test image formats:
curl -I https://wardle.online/_ipx/w_640&f_webp/img/hero/hero1.jpg

# 4. Check accessibility:
# Install axe DevTools Chrome extension
# Or use Pa11y:
npm install -g pa11y
pa11y https://wardle.online

# 5. Check color contrast:
# Use: https://webaim.org/resources/contrastchecker/
```

---

## 💡 My Thoughts

### The Good News 👍
1. **Desktop is solid (92)** - architecture is sound
2. **CLS perfect** - layout stability excellent
3. **TBT excellent** - JavaScript not blocking
4. **Best Practices 96** - security/modern standards good
5. **Redis working** - backend optimized

### The Bad News 👎
1. **Mobile LCP is BRUTAL** - 6.4s is terrible (should be <2.5s)
2. **Images not optimized** - 1.8MB PNGs on portfolio page
3. **S3 not working yet** - migration incomplete or URLs not rewritten
4. **No WebP/modern formats** - missing 30-50% size savings
5. **Accessibility fails** - button and contrast issues easy to fix

### The Root Cause 🎯
**You did all the backend work (Redis, S3, Nuxt 4) but forgot the frontend!**

- S3 migration ran but URLs not rewritten in WordPress
- Using `<img>` tags instead of `<NuxtImg>` 
- No responsive images or modern formats
- Hero image not optimized

### The Fix is Simple ✨
1. **Phase 1 fixes** = +10 points (1 hour)
2. **Replace with NuxtImg** = +15 points (1 hour)
3. **CloudFront CDN** = +5 points (1 hour)

**Total: 3 hours to go from 75→92+ mobile score**

---

## 🚀 Want Me To Start?

I can implement **Phase 1 (Critical Fixes)** right now:
1. Fix button accessibility
2. Fix color contrast
3. Convert hero to NuxtImg
4. Add skip-to-content
5. Add resource hints

**Time:** 30-45 minutes  
**Impact:** Mobile 75→85+, Accessibility 81→95+  

**Ready to go? Just say "yes" and I'll start!** 🎯
