import Home from '../screens/Home'
import { getLandingChannelsServer } from '../services/server/videoServerApi'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: 'خانه',
    description: 'صفحه اصلی نمایش ویدیوها',
  }
}

export default async function RootPage() {
  await getLandingChannelsServer()
  return <Home />
}
