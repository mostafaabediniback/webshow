import Search from '@/features/Search';
import QueryHydration from '@/lib/QueryHydration';
import { BackendError, publicRequest } from '@/lib/public-api';
import { pageMetadata } from '@/lib/seo';
import { decodeRouteParam } from '@/lib/route-params';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const { q } = await params;
  return pageMetadata(`جستجوی ${q}`, `نتایج جستجوی ویدیو برای «${q}» در اربعین تی وی.`, `/search/${encodeURIComponent(q)}`, { noindex: true });
}
export default async function SearchPage({ params }) {
  const q = decodeRouteParam((await params).q);
  let payload;
  try {
    payload = await publicRequest(`/search/${encodeURIComponent(q)}`, false);
  } catch (error) {
    // A missing search endpoint/result is a query error, not a missing page.
    // Let the existing client query show its retry UI, as in the React version.
    if (error instanceof BackendError && error.status === 404) return <Search query={q} />;
    throw error;
  }
  return <QueryHydration entries={[[['search', q], payload]]}><Search query={q} /></QueryHydration>;
}
