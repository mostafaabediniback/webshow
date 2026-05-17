import { useMutation } from "@tanstack/react-query";
import { addVideoToPlaylist } from "../../services/playlist/playlistApi";

const useAddVideoToPlaylist = () => {
  return useMutation({ mutationFn: addVideoToPlaylist });
};

export default useAddVideoToPlaylist;
