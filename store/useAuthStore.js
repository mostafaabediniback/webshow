import { useSyncExternalStore } from 'react'
import {
  buildAuthState,
  clearAuthSession,
  dispatchAuthChanged,
  readAuthSession,
  writeAuthSession,
} from '../utils/auth'

const serverSnapshot = { ...buildAuthState({ token: null, userId: null, role: '', channelId: null, name: '' }), hydrated: false }
let authState = serverSnapshot
const listeners = new Set()

const emit = () => {
  listeners.forEach((listener) => listener())
}

const updateSnapshot = (nextSession = readAuthSession(), shouldBroadcast = true) => {
  authState = { ...buildAuthState(nextSession), hydrated: true }

  if (shouldBroadcast) {
    dispatchAuthChanged(authState)
  }

  emit()
  return authState
}

export const subscribeToAuthStore = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getAuthSnapshot = () => authState

export const hydrateAuthStore = () => updateSnapshot(readAuthSession(), false)

export const setAuthSession = (session) => updateSnapshot(writeAuthSession(session))

export const clearAuthStore = () => updateSnapshot(clearAuthSession())

export default function useAuthStore(selector = (state) => state) {
  const snapshot = useSyncExternalStore(
    subscribeToAuthStore,
    getAuthSnapshot,
    () => serverSnapshot,
  )

  return selector(snapshot)
}
