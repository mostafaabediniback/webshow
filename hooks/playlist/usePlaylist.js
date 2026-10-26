import { useQuery } from "@tanstack/react-query";
import { getPlaylistDetail, playlistQueryKeys } from "../../services/playlist/playlistApi";

const usePlaylist = (playlistId, { page = 1, perPage = 25, enabled = true, ...options } = {}) => {
  return useQuery({
    queryKey: playlistQueryKeys.detail(playlistId, page, perPage),
    queryFn: () => getPlaylistDetail(playlistId, { page, per_page: perPage }),
    enabled: enabled && !!playlistId,
    ...options,
  });
};

export default usePlaylist;
