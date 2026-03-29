import VideoEdit from '../../../src/pages/VideoEdit'
import { useRequireAdminRole, useRequireAuth } from '../../../src/next/guards'

export default function VideoEditPage() {
  const auth = useRequireAuth()
  const role = useRequireAdminRole()
  if (!auth || !role) return null
  return <VideoEdit />
}
