import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/playlist/playlistApi";

const usePlaylists = (channelId, options = {}) => {
  return useQuery({
    queryKey: ["playlists", channelId ?? "all"],
    queryFn: () => getPlaylists(channelId),

    // 👇 پیش‌فرض همیشه true هست، مگر اینکه از بیرون override بشه
    enabled: options.enabled ?? true,

    ...options, // 👈 اجازه override کامل (staleTime, cacheTime, etc.)
  });
};

export default usePlaylists;