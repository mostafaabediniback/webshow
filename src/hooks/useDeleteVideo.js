import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "../services/videoApi";
import { toast } from "react-toastify";

function useDeleteVideo() {
  const queryClient = useQueryClient();

  const deleteVideoMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      toast.success("ویدیو با موفقیت حذف شد");
      queryClient.invalidateQueries(["channelVideos"]);
    },
    onError: (error) => {
      toast.error("خطا در حذف ویدیو");
      console.error(error);
    },
  });

  return {
    deleteVideo: deleteVideoMutation.mutate,
    deleteVideoAsync: deleteVideoMutation.mutateAsync,
    isDeleting: deleteVideoMutation.isPending,
    isError: deleteVideoMutation.isError,
  };
}

export default useDeleteVideo;

