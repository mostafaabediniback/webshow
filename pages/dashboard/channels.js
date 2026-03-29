import Channels from '../../src/pages/Channels'
import { useRequireAdminRole, useRequireAuth } from '../../src/next/guards'

export default function ChannelsPage() {
  const auth = useRequireAuth()
  const role = useRequireAdminRole()
  if (!auth || !role) return null
  return <Channels />
}
