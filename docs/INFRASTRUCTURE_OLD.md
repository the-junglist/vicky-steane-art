# Infrastructure Setup & Configuration

Complete documentation of the infrastructure setup for wardle.online, including DNS migration, hosting configuration, and deployment pipeline.

## Table of Contents

- [Domain & DNS](#domain--dns)
- [WordPress Backend](#wordpress-backend)
- [Cloudflare Pages](#cloudflare-pages)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## Domain & DNS

### Domain Registrar: UK2

- **Domain**: wardle.online
- **Registered**: 2000s (legacy domain)
- **Management**: UK2 control panel
- **Nameservers**: Migrated to Cloudflare (Jan 2026)

### DNS Migration to Cloudflare

**Previous Setup** (UK2 nameservers):
- All DNS managed at registrar
- No CDN or caching
- Limited DDoS protection

**Current Setup** (Cloudflare nameservers):
```
elly.ns.cloudflare.com
vick.ns.cloudflare.com
```

**Migration Steps**:
1. Created Cloudflare account and added wardle.online
2. Imported existing DNS records from UK2
3. Updated nameservers at UK2 control panel:
   - Removed UK2 nameservers
   - Added Cloudflare nameservers
4. Waited for DNS propagation (~24-48 hours)
5. Verified with `dig wardle.online NS`

### DNS Records (Cloudflare)

#### Root Domain
```
Type: CNAME
Name: @ (root)
Target: wardle-online.pages.dev
Proxy: Enabled (orange cloud)
TTL: Auto
```

#### WordPress Backend
```
Type: A
Name: yard
Target: [SiteGround IP]
Proxy: Disabled (gray cloud)
TTL: Auto
```

**Note**: yard.wardle.online must NOT be proxied through Cloudflare to avoid SSL issues with SiteGround

## WordPress Backend

### Hosting: SiteGround

- **Plan**: Shared Hosting
- **Server**: US-based (specific datacenter TBD)
- **PHP Version**: 8.x
- **WordPress Version**: Latest
- **URL**: https://yard.wardle.online

### WordPress Configuration

**Plugins**:
- None required for headless operation
- Standard WordPress installation
- REST API enabled by default

**Theme**:
- Default WordPress theme (not used for frontend)
- Admin only

**Permalink Structure**:
```
Post name: /%postname%/
```

**API Endpoints**:
```
Posts: https://yard.wardle.online/wp-json/wp/v2/posts
Single Post: https://yard.wardle.online/wp-json/wp/v2/posts/{slug}
Tags: https://yard.wardle.online/wp-json/wp/v2/tags
```

### SiteGround Security Configuration

**Issue**: Server-level captcha blocking Cloudflare Pages IP

**Solution**: IP Whitelisting

1. **Contact Method**: SiteGround live chat support
2. **Support Ticket**: #4875555
3. **Support Agent**: Miroslav (resolved issue)
4. **Cloudflare IP**: `2a06:98c0:3600::103` (IPv6)
5. **Whitelist Location**: Server-level firewall (not .htaccess)

**Process**:
```
1. Identified failing Cloudflare Pages IP from build logs
2. Contacted SiteGround support via live chat
3. Provided:
   - Domain: yard.wardle.online
   - Cloudflare IP: 2a06:98c0:3600::103
   - Error: 500/403 responses on API calls
4. Support whitelisted IP at server level
5. Verified with curl from Cloudflare Pages
6. Production site working within minutes
```

**Previous Attempts** (Failed):
- ❌ .htaccess rules (bypassed by server-level security)
- ❌ mu-plugin to disable captcha (insufficient permissions)
- ❌ User-Agent spoofing (caused additional 403 errors)

**Successful Solution**:
- ✅ SiteGround support IP whitelist

### SSL Certificate

- **Provider**: SiteGround AutoSSL (Let's Encrypt)
- **Type**: Domain Validated (DV)
- **Renewal**: Automatic
- **Validity**: 90 days (auto-renews)

## Cloudflare Pages

### Project Configuration

**Project Name**: wardle-online  
**Repository**: github.com/the-junglist/wardle-online  
**Branch**: main  
**Framework Preset**: Nuxt.js

### Build Settings

```yaml
Build command: yarn build
Build output directory: .output/public
Root directory: / (project root)
Environment variables:
  NUXT_PUBLIC_WORDPRESS_API_URL: https://yard.wardle.online/wp-json/wp/v2
  NUXT_PUBLIC_SITE_URL: https://wardle.online
  NODE_VERSION: 20
```

### Build Configuration

**Node.js**:
- Version: 20.19.6 (auto-detected from .nvmrc or package.json)
- Package Manager: Yarn 1.22.22

**Build Process**:
1. Clone repository from GitHub
2. Install dependencies: `yarn install`
3. Run nuxt prepare: `nuxt prepare`
4. Build for production: `yarn build`
5. Deploy .output/public to Cloudflare Edge

**Build Time**: ~40-50 seconds (average)

### Custom Domain Setup

1. Navigate to Cloudflare Pages → wardle-online → Custom domains
2. Click "Set up a custom domain"
3. Enter: `wardle.online`
4. Cloudflare automatically creates CNAME record
5. SSL provisioned within minutes
6. Domain status: Active ✓

**Deployment URLs**:
- **Production**: https://wardle.online (custom domain)
- **Staging**: https://wardle-online.pages.dev (pages.dev subdomain)
- **PR Previews**: https://[hash].wardle-online.pages.dev

### Environment Variables

Set in Cloudflare Pages dashboard under Settings → Environment variables:

| Variable | Value | Production | Preview |
|----------|-------|------------|---------|
| `NUXT_PUBLIC_WORDPRESS_API_URL` | `https://yard.wardle.online/wp-json/wp/v2` | ✓ | ✓ |
| `NUXT_PUBLIC_SITE_URL` | `https://wardle.online` | ✓ | - |
| `NUXT_PUBLIC_SITE_URL` | `https://wardle-online.pages.dev` | - | ✓ |
| `NODE_VERSION` | `20` | ✓ | ✓ |

**Note**: Separate values for production and preview environments

### Deployment Pipeline

**Automatic Deployments**:
```
git push origin main
  ↓
GitHub webhook triggers Cloudflare Pages
  ↓
Clone repository (main branch)
  ↓
Install dependencies (yarn install)
  ↓
Build application (yarn build)
  ↓
Deploy to Cloudflare Edge Network
  ↓
Site live at wardle.online
```

**Manual Deployments**:
- Cloudflare Pages dashboard → Deployments → "Retry deployment"
- Re-deploys last successful commit

### Cloudflare Edge Network

**Global CDN**:
- 275+ data centers worldwide
- Automatic caching of static assets
- DDoS protection (Cloudflare Shield)
- HTTP/2 and HTTP/3 support

**Performance**:
- TTFB: <100ms (average)
- Global latency: <50ms (95th percentile)
- 100% uptime SLA (Cloudflare Pages)

## Troubleshooting

### Build Failures

#### Issue: "Rollup failed to resolve import"
**Symptoms**:
```
[vite]: Rollup failed to resolve import "/img/divider-bricktop.webp"
```

**Cause**: Component references deleted image file

**Solution**:
1. Search for component using image: `grep -r "divider-bricktop" app/`
2. Check if component is actually used: `grep -r "BrickTop" app/`
3. Remove unused component: `rm app/components/Ui/BrickTop.vue`
4. Commit and push to trigger new build

#### Issue: "Failed to fetch from WordPress API"
**Symptoms**:
- Build succeeds but pages show no content
- Console errors: `Failed to fetch posts`

**Cause**: WordPress API not accessible from Cloudflare Pages

**Solution**:
1. Verify API endpoint: `curl https://yard.wardle.online/wp-json/wp/v2/posts`
2. Check SiteGround IP whitelist (see Security section)
3. Verify environment variables in Cloudflare dashboard
4. Re-deploy to pick up env var changes

### DNS Issues

#### Issue: Desktop shows old site, mobile shows new site
**Symptoms**:
- Mobile browsers show new site correctly
- Desktop browsers show old/cached content

**Cause**: Local DNS cache holding stale records

**Solution**:

**Windows**:
```bash
ipconfig /flushdns
```

**macOS**:
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Linux**:
```bash
sudo resolvectl flush-caches
# or
sudo systemd-resolve --flush-caches
```

**Verify**:
```bash
dig wardle.online
nslookup wardle.online
```

#### Issue: "This site can't be reached"
**Symptoms**:
- Domain not resolving at all
- DNS lookup fails

**Cause**: Nameserver propagation still pending

**Solution**:
1. Check nameserver status:
```bash
dig wardle.online NS +trace
```

2. Verify Cloudflare nameservers:
```bash
dig wardle.online NS @8.8.8.8
```

3. Wait 24-48 hours for full global propagation
4. Use https://dnschecker.org to check propagation status

### SSL Certificate Issues

#### Issue: "Your connection is not private"
**Symptoms**:
- SSL warning in browser
- Certificate mismatch error

**Cause**: SSL certificate not yet provisioned

**Solution**:
1. Wait 10-15 minutes after domain setup
2. Check Cloudflare Pages → Custom domains → SSL status
3. Force SSL renewal (if needed): Disable/re-enable domain
4. Verify certificate: `curl -vI https://wardle.online`

#### Issue: "Mixed content warnings"
**Symptoms**:
- Images not loading
- Console warnings about mixed content

**Cause**: HTTP resources loaded on HTTPS page

**Solution**:
1. Update WordPress site URL to HTTPS: `https://yard.wardle.online`
2. Regenerate WordPress permalinks
3. Force HTTPS in image URLs: Use `https://` explicitly
4. Enable Cloudflare SSL/TLS mode: Full (strict)

## Security

### Cloudflare Security Features

**Enabled**:
- ✓ DDoS protection (automatic)
- ✓ Web Application Firewall (WAF) - Free tier
- ✓ SSL/TLS encryption (Full)
- ✓ HSTS (HTTP Strict Transport Security)
- ✓ Always Use HTTPS (enabled)

**Security Headers** (automatic):
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```

### SiteGround Security

**Features**:
- Server-level captcha (requires IP whitelist for API access)
- ModSecurity firewall
- Daily backups (retained 30 days)
- Automatic WordPress updates
- Free SSL via Let's Encrypt

**WordPress Hardening**:
- Admin area not publicly accessible (no headless admin)
- REST API whitelisted for Cloudflare IPs only
- File permissions locked down
- No FTP access (SFTP only)

### Access Control

**WordPress Admin**:
- URL: https://yard.wardle.online/wp-admin
- Two-factor authentication: Recommended (not currently enabled)
- Strong password requirements: Enforced by SiteGround

**Cloudflare Pages**:
- GitHub OAuth for deployments
- No direct server access
- Read-only filesystem (serverless)

**GitHub Repository**:
- Private repository (or public - TBD)
- Protected main branch
- Require pull request reviews (optional)

### Backup Strategy

**WordPress Content** (SiteGround):
- Daily automatic backups
- 30-day retention
- Restore via SiteGround control panel

**Frontend Code** (GitHub):
- Full git history
- All commits preserved
- GitHub automatic backups

**Disaster Recovery**:
1. WordPress content: Restore from SiteGround backup
2. Frontend: Revert git commit or redeploy previous build
3. DNS: Export Cloudflare zone file (Settings → Advanced → Export)

## Maintenance

### Regular Tasks

**Weekly**:
- [ ] Check WordPress for updates
- [ ] Review Cloudflare analytics
- [ ] Monitor build success rate

**Monthly**:
- [ ] Update Node.js dependencies: `yarn upgrade-interactive`
- [ ] Review Cloudflare security events
- [ ] Verify SSL certificate renewal

**Quarterly**:
- [ ] Full WordPress backup download
- [ ] Review and update DNS records
- [ ] Performance audit (Lighthouse)

### Monitoring

**Uptime Monitoring**:
- Cloudflare Analytics (free)
- Consider: UptimeRobot or Pingdom for external monitoring

**Performance Monitoring**:
- Cloudflare Web Analytics (privacy-first, no cookies)
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/

**Error Tracking**:
- Cloudflare Pages build logs
- Browser console for client errors
- WordPress error logs (wp-content/debug.log)

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| Domain (UK2) | Renewal | ~$15/year ($1.25/mo) |
| SiteGround Hosting | StartUp | ~$3-15/mo (promo → renewal) |
| Cloudflare Pages | Free | $0 |
| Cloudflare DNS | Free | $0 |
| GitHub Repository | Free | $0 |
| **Total** | | **~$4-16/month** |

**Notes**:
- SiteGround pricing increases after first year
- Cloudflare Pages free tier includes unlimited bandwidth
- No additional costs for SSL certificates
- Domain renewal due annually

## Support Contacts

**SiteGround**:
- Live Chat: https://www.siteground.com/
- Ticket System: SiteGround control panel
- Response Time: <5 minutes (live chat), <1 hour (tickets)
- Previous Helpful Agent: Miroslav

**Cloudflare**:
- Community Forum: https://community.cloudflare.com/
- Docs: https://developers.cloudflare.com/pages/
- Email Support: Enterprise plan only (not applicable)

**UK2**:
- Control Panel: https://www.uk2.net/
- Domain Management: UK2 control panel
- Support: Ticket-based

---

**Last Updated**: January 12, 2026  
**Maintained By**: Nathan Wardle  
**Infrastructure Version**: 1.0
