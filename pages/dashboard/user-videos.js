import UploadedVideos from '../../src/pages/UploadedVideos'
import { useRequireAuth, useRequireUserRole } from '../../src/next/guards'

export default function UserVideosPage() {
  const auth = useRequireAuth()
  const role = useRequireUserRole()
  if (!auth || !role) return null
  return <UploadedVideos />
}
