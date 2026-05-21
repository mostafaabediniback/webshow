import { useQuery } from "@tanstack/react-query";
import { getPlaylistDetail } from "../../services/playlist/playlistApi";

const usePlaylistDetail = (playlistId, { page = 1, perPage = 25, enabled = true } = {}) => {
  return useQuery({
    queryKey: ["playlist-detail", playlistId, page, perPage],
    queryFn: () => getPlaylistDetail(playlistId, { page, per_page: perPage }),
    enabled: enabled && !!playlistId,
  });
};

export default usePlaylistDetail;
