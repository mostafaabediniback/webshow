import UserVideos from '../../src/pages/UserVideos'
import { useRequireAuth, useRequireUserRole } from '../../src/next/guards'

export default function UserUploadPage() {
  const auth = useRequireAuth()
  const role = useRequireUserRole()
  if (!auth || !role) return null
  return <UserVideos />
}
