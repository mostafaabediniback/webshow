import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPlaylist } from "../../services/playlist/playlistApi";

const useCreatePlaylist = (channelId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPlaylist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["playlists", channelId || "self"] });
      toast.success("پلی‌لیست ساخته شد", { theme: "colored" });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || "خطا در ساخت پلی‌لیست", { theme: "colored" });
    },
  });
};

export default useCreatePlaylist;

