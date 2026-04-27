import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import defaultCover from "../assets/img/cover.jpg";
import { storeVideo } from "../services/videoApi";

const fileFromUrl = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], "cover.jpg", { type: blob.type || "image/jpeg" });
};

const useVideoUpload = () => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      channelId,
      title,
      description,
      temp_path,
      url,
      coverFile,
      public_show,
    }) => {
      // 👇 اینجا شرط اصلی
      if (!temp_path && !url) {
        throw new Error("لطفا ویدیو آپلود کنید یا لینک وارد کنید");
      }

      let finalCover = coverFile;

      if (!finalCover) finalCover = defaultCover;

      if (typeof finalCover === "string") {
        finalCover = await fileFromUrl(finalCover);
      }

      return storeVideo(channelId, {
        path: temp_path,
        url,
        title,
        description,
        cover: finalCover,
        public_show,
      });
    },

    onSuccess: (_, vars) => {
      toast.success("ویدیو با موفقیت آپلود شد", { theme: "colored" });

      qc.invalidateQueries({
        queryKey: ["channelVideos", vars?.channelId || "all"],
      });

      qc.invalidateQueries({
        queryKey: ["channelVideos", "all"],
      });
    },

    onError: (e) => {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "خطا در آپلود ویدیو";

      toast.error(msg, { theme: "colored" });
    },
  });

  return {
    uploadAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};

export default useVideoUpload;