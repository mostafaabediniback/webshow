import { useMutation } from "@tanstack/react-query";
import { removeVideoFromPlaylist } from "../../services/playlist/playlistApi";

const useRemoveVideoFromPlaylist = () => {
  return useMutation({ mutationFn: removeVideoFromPlaylist });
};

export default useRemoveVideoFromPlaylist;
