import Users from '../../src/pages/Users'
import { useRequireAdminRole, useRequireAuth } from '../../src/next/guards'

export default function UsersPage() {
  const auth = useRequireAuth()
  const role = useRequireAdminRole()
  if (!auth || !role) return null
  return <Users />
}
