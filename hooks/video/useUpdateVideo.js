import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateVideo } from "../../services/videoApi";

function useUpdateVideo() {
  const queryClient = useQueryClient();

  const updateVideoMutation = useMutation({
    mutationFn: ({ videoId, title, description, coverFile, public_show, play_lists = [] }) =>
      updateVideo(videoId, { title, description, coverFile, public_show, play_lists }),
    onSuccess: () => {
      toast.success("ویدیو با موفقیت بروزرسانی شد");
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
      queryClient.invalidateQueries({ queryKey: ["video"] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در بروزرسانی ویدیو");
      console.error(error);
    },
  });

  return {
    updateVideo: updateVideoMutation.mutate,
    updateVideoAsync: updateVideoMutation.mutateAsync,
    isUpdating: updateVideoMutation.isPending,
    isError: updateVideoMutation.isError,
  };
}

export default useUpdateVideo;
