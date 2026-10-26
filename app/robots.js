import { siteUrl } from '@/lib/seo';
export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/user-dashboard', '/login', '/search/'] }, sitemap: new URL('/sitemap.xml', siteUrl).href };
}
