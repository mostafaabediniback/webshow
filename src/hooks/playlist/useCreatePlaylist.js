import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPlaylist } from "../../services/playlist/playlistApi";

const useCreatePlaylist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPlaylist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("پلی‌لیست ایجاد شد", { theme: "colored" });
    },
  });
};

export default useCreatePlaylist;
