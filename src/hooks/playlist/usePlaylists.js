import { useQuery } from "@tanstack/react-query";
import { getPlaylists, playlistQueryKeys } from "../../services/playlist/playlistApi";

const usePlaylists = (channelId, options = {}) => {
  const { page = 1, perPage = 25, enabled = true, ...queryOptions } = options;

  return useQuery({
    queryKey: [...playlistQueryKeys.list(channelId), page, perPage],
    queryFn: () => getPlaylists(channelId, { page, per_page: perPage }),
    enabled,
    ...queryOptions,
  });
};

export default usePlaylists;
