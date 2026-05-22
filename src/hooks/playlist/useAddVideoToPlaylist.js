import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addVideoToPlaylist } from "../../services/playlist/playlistApi";
import { playlistQueryKeys } from "../../services/playlist/playlistApi";

const useAddVideoToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVideoToPlaylist,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: playlistQueryKeys.all });
      const previousQueries = queryClient.getQueriesData({
        queryKey: [playlistQueryKeys.detail(variables?.playlistId)[0], variables?.playlistId],
      });

      return { previousQueries };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: playlistQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: [playlistQueryKeys.detail(variables?.playlistId)[0], variables?.playlistId],
      });
      toast.success("ویدیو به پلی‌لیست اضافه شد", { theme: "colored" });
    },
    onError: (error, variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "افزودن ویدیو به پلی‌لیست با خطا مواجه شد";
      toast.error(message, { theme: "colored" });
    },
  });
};

export default useAddVideoToPlaylist;
