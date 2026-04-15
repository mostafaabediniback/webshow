import Home from '../../screens/Home'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { username } = await params
  return {
    title: `${username} | پروفایل`,
    description: `ویدیوهای کانال ${username}`,
  }
}

export default function UsernamePage() {
  return <Home />
}
