import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPlaylist, playlistQueryKeys } from "../../services/playlist/playlistApi";

const useCreatePlaylist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPlaylist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: playlistQueryKeys.all });
      toast.success("پلی‌لیست ایجاد شد", { theme: "colored" });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "ایجاد پلی‌لیست با خطا مواجه شد";
      toast.error(message, { theme: "colored" });
    },
  });
};

export default useCreatePlaylist;
