import Search from '../../../screens/Search'
import { getSearchServer } from '../../../services/server/videoServerApi'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { q } = await params
  return {
    title: `جستجو: ${q}`,
    description: `نتایج جستجو برای ${q}`,
  }
}

export default async function SearchPage({ params }) {
  const { q } = await params
  await getSearchServer(q)
  return <Search />
}
