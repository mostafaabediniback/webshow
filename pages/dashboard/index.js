import Dashboard from '../../src/pages/Dashboard'
import { useRequireAuth } from '../../src/next/guards'

export default function DashboardPage() {
  const ok = useRequireAuth()
  if (!ok) return null
  return <Dashboard />
}
