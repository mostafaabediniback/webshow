export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
export const brand = 'اربعین تی وی';
export function pageMetadata(title, description, pathname, { noindex = false, image } = {}) {
  const url = new URL(pathname, siteUrl).href;
  return {
    title, description,
    alternates: { canonical: url },
    robots: { index: !noindex, follow: !noindex },
    openGraph: { title: `${title} | ${brand}`, description, url, siteName: brand, locale: 'fa_IR', type: 'website', ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image ? { images: [image] } : {}) },
  };
}
export function plainText(value, max = 160) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}
export function serializeJsonLd(data) { return JSON.stringify(data).replace(/</g, '\\u003c'); }
