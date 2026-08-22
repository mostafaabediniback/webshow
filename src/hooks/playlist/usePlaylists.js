import { useQuery } from "@tanstack/react-query";
import { getPlaylists, playlistQueryKeys } from "../../services/playlist/playlistApi";

const usePlaylists = (channelId, options = {}) => {
  const {
    page = 1,
    perPage = 25,
    withPagination = true,
    enabled = true,
    ...queryOptions
  } = options;

  return useQuery({
    queryKey: [
      ...playlistQueryKeys.list(channelId),
      withPagination ? page : "all",
      withPagination ? perPage : "all",
    ],
    queryFn: () =>
      getPlaylists(
        channelId,
        withPagination ? { page, per_page: perPage } : undefined,
      ),
    enabled,
    ...queryOptions,
  });
};

export default usePlaylists;
