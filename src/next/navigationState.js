const state = {
  homeChannelId: null,
}

export function setHomeNavigationState(channelId) {
  state.homeChannelId = channelId ?? null
}

export function getHomeNavigationState() {
  return state.homeChannelId
}
