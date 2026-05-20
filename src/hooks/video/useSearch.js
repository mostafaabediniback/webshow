import { useQuery } from '@tanstack/react-query'
import { getSearch } from '../services/videoApi'

const useSearch = (q) => {
  return useQuery({
    queryKey: ['search', q],
    queryFn: () => getSearch(q),
    enabled: !!q,
    select: (data) => {
      const payload = data?.data || data;
      if (!payload) return [];

      let videos = [];

      // Case 1: Direct array
      if (Array.isArray(payload)) {
        videos = payload;
      }
      // Case 2: payload.videos exists
      else if (payload?.videos && Array.isArray(payload.videos)) {
        const sample = payload.videos[0];
        if (sample && Array.isArray(sample.videos)) {
          // Nested structure
          videos = payload.videos.flatMap((v) =>
            Array.isArray(v.videos) ? v.videos.flat() : []
          );
        } else {
          // Flat videos
          videos = payload.videos;
        }
      }

      // Merge channels.image → videos.channel_image
      if (payload.channels && Array.isArray(payload.channels) && videos.length > 0) {
        payload.channels.forEach((channel) => {
          if (channel.id && channel.image && channel.name) {
            videos.forEach((video) => {
              if (video.channel_name === channel.name) {
                video.channel_image = channel.image;
              }
            });
          }
        });
      }
      return videos;
    }
  })
}

export default useSearch
