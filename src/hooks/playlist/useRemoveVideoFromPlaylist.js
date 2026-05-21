import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeVideoFromPlaylist } from "../../services/playlist/playlistApi";

const useRemoveVideoFromPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeVideoFromPlaylist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-detail", variables?.playlistId] });
    },
  });
};

export default useRemoveVideoFromPlaylist;
