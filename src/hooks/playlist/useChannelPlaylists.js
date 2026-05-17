import { useQuery } from "@tanstack/react-query";
import { getChannelPlaylists } from "../../services/playlist/playlistApi";

const useChannelPlaylists = (channelId) => {
  return useQuery({
    queryKey: ["playlists", channelId || "self"],
    queryFn: () => getChannelPlaylists(channelId),
    enabled: true,
  });
};

export default useChannelPlaylists;

