import Upload from '../../src/pages/Upload'
import { useRequireAdminRole, useRequireAuth } from '../../src/next/guards'

export default function UploadPage() {
  const auth = useRequireAuth()
  const role = useRequireAdminRole()
  if (!auth || !role) return null
  return <Upload />
}
