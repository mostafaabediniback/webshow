import { useQuery } from "@tanstack/react-query";
import {
  getAllPlaylists,
  getPlaylists,
  playlistQueryKeys,
} from "../../services/playlist/playlistApi";

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
    queryFn: async () =>
      withPagination
        ? getPlaylists(channelId, { page, per_page: perPage })
        : { items: await getAllPlaylists(channelId) },
    enabled,
    ...queryOptions,
  });
};

export default usePlaylists;
