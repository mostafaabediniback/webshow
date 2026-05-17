import { useQuery } from "@tanstack/react-query";
import { getChannelPlaylists } from "../../services/playlist/playlistApi";

const useChannelPlaylists = ({ channelId, enabled = true } = {}) => {
  return useQuery({
    queryKey: ["playlists", channelId || "self"],
    queryFn: () => getChannelPlaylists({ channelId }),
    enabled,
  });
};

export default useChannelPlaylists;
