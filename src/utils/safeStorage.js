const isBrowser = typeof window !== 'undefined'

export const safeSessionStorage = {
  get: (key) => (isBrowser ? window.sessionStorage.getItem(key) : null),
  set: (key, value) => {
    if (!isBrowser) return null
    window.sessionStorage.setItem(key, value)
    return value
  },
  remove: (key) => {
    if (!isBrowser) return null
    window.sessionStorage.removeItem(key)
    return null
  },
}

export const safeLocalStorage = {
  get: (key) => (isBrowser ? window.localStorage.getItem(key) : null),
  set: (key, value) => {
    if (!isBrowser) return null
    window.localStorage.setItem(key, value)
    return value
  },
  remove: (key) => {
    if (!isBrowser) return null
    window.localStorage.removeItem(key)
    return null
  },
}

export default safeSessionStorage
