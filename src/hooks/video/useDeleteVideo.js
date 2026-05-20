import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "../services/videoApi";
import { toast } from "react-toastify";

function useDeleteVideo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteVideo,

    onSuccess: () => {
      toast.success("ویدیو با موفقیت حذف شد");

      queryClient.invalidateQueries({
        queryKey: ["channelVideos"],
        exact: false,
      });
    },

    onError: (error) => {
      toast.error("خطا در حذف ویدیو");
      console.error(error);
    },
  });

  return {
    deleteVideo: mutation.mutate,
    deleteVideoAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    isError: mutation.isError,
  };
}

export default useDeleteVideo;