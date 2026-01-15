# Infrastructure Documentation - Wardle Online

Last updated: January 15, 2026

## Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   CloudFlare    │────────▶│  Cloudflare Pages│────────▶│  WordPress      │
│   DNS           │         │  (Nuxt 4 SSR)    │         │  (SiteGround)   │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                     │                            │
                                     ▼                            ▼
                            ┌──────────────────┐         ┌─────────────────┐
                            │  Upstash Redis   │         │   SiteGround    │
                            │  (Cache Layer)   │         │   MySQL         │
                            └──────────────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  AWS S3          │
                            │  (Image Storage) │
                            └──────────────────┘
```

## Project Purpose

Wardle Online serves as a **portfolio showcase site** demonstrating:
1. Headless WordPress architecture patterns
2. Performance optimization with Redis caching
3. Modern JAMstack deployment (Nuxt 3 + Cloudflare Pages)
4. Image optimization strategies (AWS S3 + CloudFront)

**Sister Project:** [abodehomeandgifts](../../../ABODE/abodehomeandgifts-test)  
- Uses same architecture: Nuxt + WordPress + Upstash Redis
- WooCommerce headless e-commerce site
- AWS Amplify deployment (vs Cloudflare Pages)

Together, these projects provide **two reference implementations** of headless WordPress:
- **wardle.online:** Simple portfolio/blog
- **abodehomeandgifts.co.uk:** Full e-commerce with WooCommerce

## Components

### 1. Frontend - Cloudflare Pages

**Service:** Cloudflare Pages  
**Repository:** `github.com/the-junglist/wardle-online`  
**Branch:** `main`  
**Framework:** Nuxt 3.17.3 with Nitro (cloudflare-pages preset)  
**Deployment:** Automatic on push to main  

**Environment Variables:**
```bash
NUXT_PUBLIC_WORDPRESS_API_URL=https://yard.wardle.online/wp-json/wp/v2
NUXT_PUBLIC_SITE_URL=https://wardle.online
UPSTASH_REDIS_REST_URL=https://[your-instance].upstash.io
UPSTASH_REDIS_REST_TOKEN=Av***
```

**Build Settings:**
- Build command: `yarn build`
- Build output: `.output/public`
- Node version: 20.x
- Compatibility flag: `nodejs_compat_populate_process_env`

### 2. Backend - WordPress

**Hosting:** SiteGround  
**URL:** https://yard.wardle.online  
**Database:** MySQL on SiteGround  
**API:** WordPress REST API v2  

**Key Endpoints Used:**
- `/wp-json/wp/v2/posts` - Portfolio post listings
- `/wp-json/wp/v2/posts/{id}` - Single portfolio post
- `/wp-json/wp/v2/tags` - Year tags for timeline grouping

**Security:**
- Server-level captcha (IP 2a06:98c0:3600::103 whitelisted)
- Mail server: 35.213.148.73
- DNS: Managed via Cloudflare

### 3. Cache Layer - Upstash Redis

**Service:** Upstash Redis REST API  
**Plan:** Free tier (10MB max request size, 10K commands/day)  
**URL:** [To be configured]  
**Instance:** [To be created]  

**Cache Strategy:**
| Data Type | TTL | Key Pattern | Notes |
|-----------|-----|-------------|-------|
| Tags | 6 hours | `tags:all` | Rarely change (year tags) |
| Post listings | 2 hours | `posts:{query}` | Portfolio grid/timeline |
| Single posts | 10 minutes | `post:{slug}` | Individual portfolio items |

**Cache Optimization:**
- Graceful degradation if Redis unavailable
- Automatic fallback to direct WordPress API
- Console logging for cache hits/misses

## Setup Instructions

### 1. Create Upstash Redis Instance

```bash
# 1. Visit https://console.upstash.com/
# 2. Sign up (free tier sufficient)
# 3. Create new Redis database:
#    - Name: wardle-redis
#    - Region: Choose closest to users
#    - Type: Regional (free)
# 4. Copy credentials from Details tab:
#    - UPSTASH_REDIS_REST_URL
#    - UPSTASH_REDIS_REST_TOKEN
```

### 2. Configure Local Environment

```bash
# Edit .env file:
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### 3. Configure Cloudflare Pages

```bash
# In Cloudflare Pages dashboard:
# Settings > Environment variables > Add variables:
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# Important: Add to both "Production" and "Preview" environments
```

### 4. Deploy and Test

```bash
# Local test first:
yarn dev
# Visit http://localhost:3000 and check console for cache logs

# Deploy to production:
git add -A
git commit -m "Add Redis caching"
git push origin main

# Wait 2-3 minutes for build
# Test production:
curl -I https://wardle.online/api/wordpress/posts
# Look for Cache-Control headers
```

## AWS S3 Image Storage Setup

### Overview
WordPress media (9,212 images) are offloaded to AWS S3 for faster delivery, reduced server load, and better scalability. Images are delivered directly from S3 with public access.

### Infrastructure Details
- **Bucket Name:** wardle-images
- **Region:** eu-west-1 (Ireland)
- **Total Images:** 9,212 files
- **Storage Size:** ~2GB
- **URL Pattern:** `https://wardle-images.s3.eu-west-1.amazonaws.com/wp-content/uploads/{year}/{month}/{filename}`
- **Access:** Public read via bucket policy (ACLs disabled)

### 1. Create IAM User

```bash
# In AWS Console:
# 1. Navigate to IAM > Users > Create user
# 2. User name: nathan (or your preferred name)
# 3. Attach policy: AmazonS3FullAccess
# 4. Create user

# 5. Security credentials > Create access key
# 6. Use case: Application running outside AWS
# 7. Save credentials:
#    - Access Key ID: AKIASLAS36SVA7XVT776
#    - Secret Access Key: [SECURE - stored in password manager]
```

### 2. Create S3 Bucket

```bash
# In AWS Console:
# 1. Navigate to S3 > Create bucket
# 2. Bucket name: wardle-images (must be globally unique)
# 3. Region: eu-west-1 (Ireland)
# 4. Object Ownership: Bucket owner enforced (ACLs disabled)
# 5. Block Public Access: UNCHECK "Block all public access"
# 6. Create bucket
```

### 3. Configure Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::wardle-images/*"
    }
  ]
}
```

Apply in AWS Console:
1. S3 > wardle-images > Permissions > Bucket policy
2. Paste JSON above
3. Save changes

### 4. Configure WordPress Plugin

Install WP Offload Media plugin and configure in `wp-config.php`:

```php
// Add to yard.wardle.online wp-config.php
define( 'AS3CF_SETTINGS', serialize( array(
    'provider' => 'aws',
    'access-key-id' => 'AKIASLAS36SVA7XVT776',
    'secret-access-key' => 'YOUR_SECRET_KEY_HERE',
) ) );
```

Plugin settings:
- **Bucket:** wardle-images
- **Region:** EU (Ireland) eu-west-1
- **Offload Media:** ✅ Enabled
- **Deliver Offloaded Media:** ✅ Enabled (URL rewriting)
- **Force HTTPS:** ✅ Enabled
- **Remove Local Media:** ❌ Disabled (keep originals as backup)

### 5. Migrate Existing Images

Use the Python migration script to transfer existing WordPress media:

```bash
# Install dependencies:
pip3 install boto3

# Edit scripts/migrate-images-to-s3.py with credentials:
# - FTP_HOST: gsgp5.siteground.asia
# - FTP_USER: mandrilla@wardle.online
# - FTP_PASS: [from SiteGround]
# - AWS_ACCESS_KEY_ID: AKIASLAS36SVA7XVT776
# - AWS_SECRET_ACCESS_KEY: [from IAM]
# - S3_BUCKET: wardle-images
# - S3_REGION: eu-west-1

# Run migration:
python3 scripts/migrate-images-to-s3.py

# Output:
# ✅ Found 9212 images to migrate
# 🔄 Migrating files...
# [Progress bars for each file]
```

**Migration Script Features:**
- Connects to WordPress FTP server
- Recursively scans `wp-content/uploads/` directory
- Transfers images in-memory (no temp files)
- Detects content-type (image/jpeg, image/png, etc.)
- Maintains directory structure
- Progress reporting with file sizes
- Error handling and retry logic

### 6. Verify S3 Delivery

```bash
# Test image URL:
curl -I https://wardle-images.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/01/example.jpg

# Should return:
# HTTP/1.1 200 OK
# Content-Type: image/jpeg
# Content-Length: 123456

# Check WordPress admin:
# Media Library should show S3 URLs instead of local paths
```

### URL Structure Comparison

**Before (WordPress server):**
```
https://yard.wardle.online/wp-content/uploads/2024/01/image.jpg
```

**After (S3):**
```
https://wardle-images.s3.eu-west-1.amazonaws.com/wp-content/uploads/2024/01/image.jpg
```

### Nuxt Image Configuration

No changes needed! `@nuxt/image` works automatically with S3 URLs:

```vue
<!-- Still works the same: -->
<NuxtImg 
  :src="post._embedded['wp:featuredmedia'][0].source_url"
  :alt="post.title.rendered"
  loading="lazy"
/>
```

### Troubleshooting

**Issue: Images not loading (403 Forbidden)**
- Check bucket policy is applied correctly
- Verify Block Public Access is disabled
- Ensure Object Ownership is "Bucket owner enforced"

**Issue: Migration script fails with ACL error**
- Remove any `ACL='public-read'` parameters
- Rely on bucket policy instead (newer AWS requirement)

**Issue: WordPress still serving local URLs**
- Check WP Offload Media plugin is active
- Verify "Deliver Offloaded Media" is enabled
- Clear WordPress cache (if using caching plugin)

**Issue: Large images taking long to load**
- Consider adding CloudFront CDN distribution
- Enable image optimization in WordPress
- Use @nuxt/image with appropriate sizes/formats

### Performance Benefits

**Before S3:**
- WordPress server handles all image requests
- Limited bandwidth on shared hosting
- Slower for international visitors
- Server CPU used for image delivery

**After S3:**
- Images served from AWS global network
- Unlimited bandwidth (pay per GB)
- ~50-200ms faster for most users
- WordPress CPU freed for content management

### Cost Analysis

**S3 Storage:**
- 9,212 images = ~2GB
- $0.023 per GB/month = **$0.046/month**

**S3 Data Transfer:**
- First 100GB/month = FREE
- Assuming 5GB traffic = **$0/month**

**Total: ~$0.05/month** (negligible cost)

### Optional: CloudFront CDN

For even faster delivery, add CloudFront:

```bash
# In AWS Console:
# 1. CloudFront > Create distribution
# 2. Origin: wardle-images.s3.eu-west-1.amazonaws.com
# 3. Viewer protocol: Redirect HTTP to HTTPS
# 4. Allowed HTTP methods: GET, HEAD
# 5. Cache policy: CachingOptimized
# 6. Create distribution

# Update WordPress plugin:
# Settings > Custom Domain: d1234567890abc.cloudfront.net
```

**CloudFront Benefits:**
- Edge caching in 400+ locations worldwide
- ~100ms faster for international users
- Additional $1-2/month for 50GB transfer
- Custom domain support (images.wardle.online)



## Comparison with Abode Architecture

### Similarities ✅
- Upstash Redis for caching (same utility pattern)
- Same cache TTL strategy (2hr listings, 10min details, 6hr tags)
- Graceful fallback if Redis fails
- Similar API structure and error handling
- Environment variable patterns
- Cache key naming convention: `resource:identifier`

### Differences 🔄
| Aspect | Wardle | Abode |
|--------|--------|-------|
| **Hosting** | Cloudflare Pages | AWS Amplify |
| **WordPress** | Simple blog | WooCommerce |
| **Use Case** | Portfolio showcase | E-commerce store |
| **Images** | AWS S3 (wardle-images) | Direct from WordPress |
| **DNS** | Cloudflare | Route 53 |
| **Cache Warmer** | Optional | AWS Lambda (daily) |

### Lessons from Abode Applied
1. ✅ Redis free tier sufficient for portfolio sites (10K commands/day)
2. ✅ 2-hour TTL for listings prevents stale content
3. ✅ Server-side cache headers improve CDN performance
4. ✅ Graceful degradation prevents site failure if Redis down
5. ✅ Console logging helps debug cache behavior
6. ✅ Auto-import server utils (no explicit imports needed)

## Next Steps

### Immediate Actions
- [x] Complete Redis caching setup
- [x] Complete AWS S3 image migration
- [x] Update infrastructure documentation
- [ ] Monitor S3 costs and traffic
- [ ] Consider CloudFront CDN if needed

### Future Enhancements
- [ ] CloudFront CDN distribution for faster global delivery
- [ ] Custom domain for images (images.wardle.online)
- [ ] S3 lifecycle policies for cost optimization
- [ ] Image optimization script (compress before upload)
- [ ] Backup strategy documentation
- [ ] Lambda cache warmer (if cache miss rate high)
- [ ] CloudWatch monitoring/alerting
- [ ] Performance metrics dashboard

## Reusable Architecture Guide

This setup is designed to be reused for future portfolio/blog sites with WordPress backends. Follow this pattern for consistent, scalable architecture.

### Architecture Pattern Summary

```
┌─────────────────────────────────────────────────────────────┐
│ Headless WordPress Portfolio Site - Reference Architecture │
└─────────────────────────────────────────────────────────────┘

Frontend (Nuxt 4):                  Backend (WordPress):
├── Cloudflare Pages                ├── SiteGround (or any host)
├── Server-Side Rendering           ├── WP REST API
├── @nuxt/image optimization        ├── WP Offload Media plugin
└── Git-based deployment            └── Simple admin interface

Caching Layer (Upstash):            Image Storage (AWS S3):
├── Redis free tier                 ├── wardle-images bucket
├── 10K commands/day                ├── Public read access
├── Graceful fallback               ├── ~$0.05/month
└── Auto-invalidation               └── Serves 9,212+ images

Total Monthly Cost: ~$0.50          Performance: 50-200ms faster
```

### Step-by-Step Setup for New Project

#### 1. WordPress Backend Setup (30 minutes)

```bash
# 1. Install WordPress on any hosting
# 2. Install required plugins:
#    - WP Offload Media Lite (for S3)
#    - Advanced Custom Fields (if needed)
# 3. Configure permalinks: Settings > Permalinks > Post name
# 4. Enable REST API (usually enabled by default)
# 5. Test API: https://your-site.com/wp-json/wp/v2/posts
```

#### 2. AWS S3 Setup (20 minutes)

```bash
# 1. Create IAM user with AmazonS3FullAccess
# 2. Create S3 bucket (project-name-images, eu-west-1)
# 3. Disable "Block Public Access"
# 4. Add bucket policy (see above JSON)
# 5. Configure WordPress WP Offload Media plugin
# 6. Run migration script if existing images
```

#### 3. Upstash Redis Setup (10 minutes)

```bash
# 1. Sign up at https://console.upstash.com/
# 2. Create Redis database (Regional, free tier)
# 3. Copy UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
# 4. Add to .env locally
# 5. Add to hosting environment variables
```

#### 4. Nuxt Frontend Setup (30 minutes)

```bash
# 1. Clone this repo as template:
git clone https://github.com/your-org/wardle-online.git new-project

# 2. Update environment variables:
cp .env.example .env
# Edit .env with WordPress URL, Upstash credentials, etc.

# 3. Update nuxt.config.ts:
# - Change site name, description
# - Update NUXT_PUBLIC_SITE_URL
# - Update NUXT_PUBLIC_WORDPRESS_API_URL

# 4. Test locally:
yarn install
yarn dev
# Visit http://localhost:3000

# 5. Deploy to Cloudflare Pages:
# - Connect GitHub repo
# - Build command: yarn build
# - Output directory: .output/public
# - Add environment variables
```

#### 5. Post-Deployment Testing (15 minutes)

```bash
# 1. Test WordPress API:
curl https://your-site.com/api/wordpress/posts

# 2. Test Redis caching:
# Check console logs for "Cache HIT" / "Cache MISS"

# 3. Test S3 images:
curl -I https://your-bucket.s3.region.amazonaws.com/wp-content/uploads/2024/01/test.jpg

# 4. Performance testing:
# - Lighthouse score should be 90+
# - Time to First Byte < 300ms
# - Largest Contentful Paint < 2.5s
```

### Copy-Paste Files for New Project

**Essential files to copy:**
1. `server/utils/redis.ts` - Redis caching utility
2. `server/api/wordpress/**` - All WordPress API routes
3. `scripts/migrate-images-to-s3.py` - S3 migration script
4. `.env.example` - Environment variable template
5. `nuxt.config.ts` - Base configuration (adapt as needed)

**Configuration updates needed:**
- Update `NUXT_PUBLIC_SITE_URL` in .env
- Update `NUXT_PUBLIC_WORDPRESS_API_URL` in .env
- Update S3 bucket name in migration script
- Update AWS credentials (unique per project)
- Update Upstash credentials (unique per project)

### Architecture Variations

**Hosting Options:**
- **Cloudflare Pages** (this project): Free, fast, global CDN
- **AWS Amplify** (Abode project): Free tier, tight AWS integration
- **Vercel**: Easy deployment, generous free tier
- **Netlify**: Similar to Cloudflare, good DX

**WordPress Hosting Options:**
- **SiteGround** (this project): Reliable, good support
- **WP Engine**: Premium, optimized for WordPress
- **Kinsta**: Fast, developer-friendly
- **Self-hosted AWS EC2**: Full control, more complex

**Image Storage Options:**
- **AWS S3** (this project): Cheap, reliable, global
- **Cloudflare R2**: Zero egress fees (may be better for high traffic)
- **DigitalOcean Spaces**: S3-compatible, simpler pricing
- **Backblaze B2**: Cheapest storage option

### Key Learnings & Best Practices

1. **Nuxt 4 Import System:**
   - Use `#imports` for auto-imported server utils
   - Don't use `~/server/utils/` paths (causes build errors)

2. **Redis Cache Sizing:**
   - Upstash free tier has 10MB storage limit
   - Set 1MB size threshold to skip large responses
   - Grid view (20 posts) cacheable, timeline (100 posts) skips cache

3. **S3 ACL Changes:**
   - AWS now requires bucket policies instead of object ACLs
   - Don't use `ACL='public-read'` in boto3 uploads
   - Set "Bucket owner enforced" for Object Ownership

4. **Cloudflare Pages Limits:**
   - 1MB max bundle size per route
   - Remove unused dependencies (e.g., uuid)
   - Use lazy loading for heavy components

5. **WordPress API Performance:**
   - Always use `_embed=true` to get featured images
   - Cache tags separately (6hr TTL) - rarely change
   - Cache post listings (2hr TTL) - balance freshness/performance
   - Cache single posts (10min TTL) - frequent updates

6. **Image Migration Strategy:**
   - Use in-memory transfer (BytesIO) for speed
   - Maintain original directory structure
   - Keep local copies initially (safety net)
   - Run migration during low-traffic hours

### Monitoring & Maintenance

**Weekly:**
- Check Upstash dashboard for cache hit rate
- Review AWS billing for S3 costs
- Monitor Cloudflare Pages build success rate

**Monthly:**
- Review S3 storage size (should grow slowly)
- Check for WordPress plugin updates
- Review performance metrics (Lighthouse)

**Quarterly:**
- Consider CloudFront if traffic grows
- Review cache TTL settings based on usage
- Optimize S3 lifecycle policies if needed



## Cost Breakdown

### Current Monthly Costs
- **Cloudflare Pages:** $0 (Free tier)
- **Cloudflare DNS:** $0 (Free)
- **SiteGround:** Existing cost (shared hosting)
- **Upstash Redis:** $0 (Free tier - 10K commands/day)
- **AWS S3:** ~$0.50/month (2GB storage, 9,212 images)

**Total: ~$0.50/month** 🎉

### With CloudFront (Optional)
- **CloudFront:** ~$1-2/month (50GB data transfer)

**Total: $2-3/month** (still very affordable)

## Documentation References

- [Optimization Plan](./OPTIMIZATION_PLAN.md) - Performance improvement roadmap
- [Abode Infrastructure](../../../ABODE/abodehomeandgifts-test/infrastructure/INFRASTRUCTURE.md) - Sister project architecture
- [Old Infrastructure Doc](./INFRASTRUCTURE_OLD.md) - Original setup notes
