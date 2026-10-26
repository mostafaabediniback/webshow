import Search from '@/features/Search';
import QueryHydration from '@/lib/QueryHydration';
import { publicRequest } from '@/lib/public-api';
import { pageMetadata } from '@/lib/seo';
import { decodeRouteParam } from '@/lib/route-params';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { q } = await params;
  return pageMetadata(`جستجوی ${q}`, `نتایج جستجوی ویدیو برای «${q}» در اربعین تی وی.`, `/search/${encodeURIComponent(q)}`, { noindex: true });
}
export default async function SearchPage({ params }) {
  const q = decodeRouteParam((await params).q);
  const payload = await publicRequest(`/search/${encodeURIComponent(q)}`);
  return <QueryHydration entries={[[['search', q], payload]]}><Search query={q} /></QueryHydration>;
}
