import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/playlist/playlistApi";

const usePlaylists = (channelId) => {
  return useQuery({
    queryKey: ["playlists", channelId],
    queryFn: () => getPlaylists(channelId),
    enabled: Boolean(channelId),
  });
};

export default usePlaylists;
