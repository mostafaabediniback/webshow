import Videos from '../../../src/pages/Videos'
import { useRequireAdminRole, useRequireAuth } from '../../../src/next/guards'

export default function VideosPage() {
  const auth = useRequireAuth()
  const role = useRequireAdminRole()
  if (!auth || !role) return null
  return <Videos />
}
