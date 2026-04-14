export const AUTH_STORAGE_KEYS = {
  token: 'token',
  userId: 'user_id',
  role: 'role',
  channelId: 'channel_id',
}

const hasWindow = () => typeof window !== 'undefined'

const getStorage = () => {
  if (!hasWindow()) return null

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export const normalizeRole = (role) => {
  if (Array.isArray(role)) {
    const firstRole = role[0]
    if (typeof firstRole === 'string') return firstRole.toLowerCase()
    if (firstRole?.name) return String(firstRole.name).toLowerCase()
    return ''
  }

  return role ? String(role).toLowerCase() : ''
}

export const readAuthSession = () => {
  const storage = getStorage()

  if (!storage) {
    return {
      token: null,
      userId: null,
      role: '',
      channelId: null,
    }
  }

  return {
    token: storage.getItem(AUTH_STORAGE_KEYS.token),
    userId: storage.getItem(AUTH_STORAGE_KEYS.userId),
    role: normalizeRole(storage.getItem(AUTH_STORAGE_KEYS.role)),
    channelId: storage.getItem(AUTH_STORAGE_KEYS.channelId),
  }
}

export const writeAuthSession = ({ token, userId, role, channelId } = {}) => {
  const storage = getStorage()
  if (!storage) return readAuthSession()

  const pairs = [
    [AUTH_STORAGE_KEYS.token, token],
    [AUTH_STORAGE_KEYS.userId, userId],
    [AUTH_STORAGE_KEYS.role, normalizeRole(role)],
    [AUTH_STORAGE_KEYS.channelId, channelId],
  ]

  pairs.forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      storage.removeItem(key)
      return
    }

    storage.setItem(key, String(value))
  })

  return readAuthSession()
}

export const clearAuthSession = () => {
  const storage = getStorage()
  if (!storage) return readAuthSession()

  Object.values(AUTH_STORAGE_KEYS).forEach((key) => storage.removeItem(key))
  return readAuthSession()
}

export const isChannelAdminRole = (role) => normalizeRole(role) === 'admin'

export const getDefaultDashboardRoute = (role) => (
  isChannelAdminRole(role) ? '/dashboard/user-videos' : '/dashboard/channels'
)

export const buildAuthState = (session = readAuthSession()) => ({
  ...session,
  isAuthenticated: Boolean(session.token),
  isChannelAdmin: isChannelAdminRole(session.role),
  defaultDashboardRoute: getDefaultDashboardRoute(session.role),
})

export const dispatchAuthChanged = (detail) => {
  if (!hasWindow()) return
  window.dispatchEvent(new CustomEvent('auth:changed', { detail }))
}

export const dispatchUnauthorized = (detail) => {
  if (!hasWindow()) return
  window.dispatchEvent(new CustomEvent('auth:unauthorized', { detail }))
}
