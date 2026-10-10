import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeVideoFromPlaylist } from "../../services/playlist/playlistApi";
import { playlistQueryKeys } from "../../services/playlist/playlistApi";

const useRemoveVideoFromPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeVideoFromPlaylist,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [playlistQueryKeys.detail(variables?.playlistId)[0], variables?.playlistId],
      });

      const previousQueries = queryClient.getQueriesData({
        queryKey: [playlistQueryKeys.detail(variables?.playlistId)[0], variables?.playlistId],
      });

      previousQueries.forEach(([queryKey, snapshot]) => {
        if (!snapshot?.items) return;

        queryClient.setQueryData(queryKey, {
          ...snapshot,
          items: snapshot.items.filter((item) => String(item?.id) !== String(variables?.videoId)),
          totalItems: Math.max(0, Number(snapshot.totalItems || 0) - 1),
        });
      });

      return { previousQueries };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: playlistQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: [playlistQueryKeys.detail(variables?.playlistId)[0], variables?.playlistId],
      });
      toast.success("ویدیو از پلی‌لیست حذف شد", { theme: "colored" });
    },
    onError: (error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "حذف ویدیو از پلی‌لیست با خطا مواجه شد";
      toast.error(message, { theme: "colored" });
    },
  });
};

export default useRemoveVideoFromPlaylist;
