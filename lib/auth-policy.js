export function authRedirect(auth, access = 'authenticated') {
  if (access === 'public') return auth.isAuthenticated ? auth.defaultDashboardRoute : null;
  if (!auth.isAuthenticated) return '/login';
  if (access === 'user') {
    if (auth.isUser) return null;
    return auth.isChannelAdmin ? '/dashboard/user-videos' : '/dashboard';
  }
  if (access === 'platform') {
    if (auth.isUser) return '/user-dashboard';
    if (auth.isChannelAdmin) return '/dashboard/user-videos';
  }
  if (access === 'channel') {
    if (auth.isUser) return '/user-dashboard';
    if (!auth.isChannelAdmin) return '/dashboard';
  }
  return null;
}
