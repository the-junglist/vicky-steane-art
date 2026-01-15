# Performance Optimization Plan - Wardle Online

## Issues Identified
1. ✅ **FIXED**: Images not loading from WordPress (yard.wardle.online)
2. ✅ **FIXED**: Page opening at 200% zoom (missing viewport meta tag)
3. ⏳ **TODO**: Speed optimization
4. ⏳ **TODO**: Image offloading to Cloudflare R2 / S3
5. ⏳ **TODO**: Redis/Upstash caching

## Completed Fixes

### 1. Viewport Meta Tag
Added proper viewport configuration to prevent zoom issues:
```typescript
meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'format-detection', content: 'telephone=no' }
]
```

### 2. Image Domain Configuration
Configured @nuxt/image to properly handle WordPress images:
```typescript
image: {
  domains: ['yard.wardle.online'],
  alias: {
    wordpress: 'https://yard.wardle.online'
  }
}
```

## Optimization Roadmap

### Phase 1: Quick Wins (Immediate)

#### A. Enable Cloudflare Image Resizing
- Cloudflare automatically resizes and optimizes images
- Already proxied through Cloudflare
- Configure Polish (Lossless or Lossy) in Cloudflare dashboard

#### B. Implement Loading Strategy
- Use `loading="lazy"` for images (already done)
- Add `priority` for above-the-fold images
- Implement blur placeholders

#### C. API Response Caching
Current: Every request hits WordPress API
Solution: Cache with `stale-while-revalidate`

```typescript
// server/api/wordpress/posts/index.ts
const cached = await useStorage().getItem(`posts:${key}`)
if (cached) return cached

// Fetch from WordPress
const data = await $fetch(...)

// Cache for 5 minutes
await useStorage().setItem(`posts:${key}`, data, {
  ttl: 300
})
```

### Phase 2: Cloudflare R2 / S3 (Medium Priority)

#### Why Move Images?
1. Reduce load on SiteGround hosting
2. Better image optimization pipeline
3. Cheaper bandwidth costs
4. CDN distribution

#### Implementation Options:

**Option A: Cloudflare R2 (Recommended)**
- No egress fees
- Native Cloudflare integration
- Image Transformations built-in
- Cost: $0.015/GB storage, $0 egress

**Option B: AWS S3 + CloudFront**
- More mature
- Better tools
- Cost: ~$0.023/GB storage + egress fees

#### Migration Strategy:
1. Create R2 bucket: `wardle-images`
2. Setup custom domain: `images.wardle.online`
3. Write migration script to copy WordPress media
4. Update WordPress to upload directly to R2
5. Update image URLs in content

### Phase 3: Redis/Upstash (Long-term)

#### Current Architecture:
```
User → Cloudflare Pages → WordPress REST API
```

#### With Redis:
```
User → Cloudflare Pages → Redis Cache → WordPress REST API
```

#### Upstash Redis Setup:
1. Create Upstash account
2. Create Redis database (free tier: 10k commands/day)
3. Install `@upstash/redis`:
```bash
yarn add @upstash/redis
```

4. Configure in nuxt.config.ts:
```typescript
runtimeConfig: {
  upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN
}
```

5. Create caching layer:
```typescript
// server/utils/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: useRuntimeConfig().upstashRedisRestUrl,
  token: useRuntimeConfig().upstashRedisRestToken
})

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 300
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key)
  if (cached) return cached as T

  // Fetch fresh data
  const data = await fetcher()
  
  // Cache it
  await redis.setex(key, ttl, JSON.stringify(data))
  
  return data
}
```

6. Use in API routes:
```typescript
// server/api/wordpress/posts/index.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cacheKey = `posts:${JSON.stringify(query)}`
  
  return await getCached(cacheKey, async () => {
    return await $fetch('https://yard.wardle.online/wp-json/wp/v2/posts', {
      params: query
    })
  }, 300) // 5 minutes
})
```

### Phase 4: Advanced Optimizations

#### A. Prerender Static Routes
- Generate static HTML for all portfolio posts at build time
- Update on content changes via webhook

#### B. Bundle Size Reduction
- Remove unused dependencies
- Lazy load heavy components
- Code splitting

#### C. Database Query Optimization (WordPress)
- Add indexes to WordPress DB
- Use WP Query optimization plugins
- Consider WP-Redis plugin

## Implementation Priority

### Week 1: Critical Fixes ✅
- [x] Fix image loading
- [x] Fix viewport zoom

### Week 2: Quick Wins
- [ ] Enable Cloudflare Polish
- [ ] Implement API caching (localStorage/sessionStorage)
- [ ] Add image blur placeholders
- [ ] Optimize bundle size

### Week 3: R2 Migration
- [ ] Setup Cloudflare R2 bucket
- [ ] Configure custom domain
- [ ] Write migration script
- [ ] Test image delivery
- [ ] Update WordPress

### Week 4: Redis/Upstash
- [ ] Setup Upstash account
- [ ] Implement caching layer
- [ ] Test performance
- [ ] Monitor cache hit rates

## Expected Performance Gains

### Before:
- Page Load: ~2-3s
- First Contentful Paint: ~1.5s
- Largest Contentful Paint: ~3s
- Images: Direct from WordPress (slow)

### After Phase 2:
- Page Load: ~1-1.5s (50% improvement)
- First Contentful Paint: ~0.8s
- Largest Contentful Paint: ~1.5s
- Images: Via R2 + Cloudflare CDN

### After Phase 4:
- Page Load: ~0.5-1s (70% improvement)
- First Contentful Paint: ~0.3s
- Largest Contentful Paint: ~0.8s
- Lighthouse Score: 95+

## Monitoring

### Metrics to Track:
1. **Core Web Vitals**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

2. **Custom Metrics**
   - API response times
   - Cache hit rate
   - Image load times

3. **Tools**
   - Cloudflare Analytics (built-in)
   - Google Lighthouse
   - WebPageTest.org

## Cost Estimate

### Current: ~$0/month
- Cloudflare Pages: Free
- SiteGround: Existing hosting cost

### With Optimizations: ~$5-10/month
- Cloudflare R2: ~$3/month (20GB storage)
- Upstash Redis: Free tier (10k commands/day)
- Or paid: $0.20/100k commands (~$2/month)

### ROI:
- Faster site = better SEO rankings
- Better UX = more engagement
- Reduced SiteGround load = stability
- Total cost: < $10/month for professional performance
