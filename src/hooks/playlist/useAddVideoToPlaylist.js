import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVideoToPlaylist } from "../../services/playlist/playlistApi";

const useAddVideoToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVideoToPlaylist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist-detail", variables?.playlistId] });
    },
  });
};

export default useAddVideoToPlaylist;
