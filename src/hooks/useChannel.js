import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
  changeChannelImage,
  changeProfileChannelImage,
  updateChannelInfo,
} from "../services/channelApi";
import { QueryKeys } from "../enums";
import { toast } from "react-toastify";

function useChannel(pageNumber = 1, pageSize = 10, filters = {}, options = {}) {
  const queryClient = useQueryClient();

  // [01] - Get channels list
  const {
    data: channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
    refetch: refetchChannels,
  } = useQuery({
    queryKey: [QueryKeys.channel, pageNumber, pageSize, filters],
    queryFn: () => getChannels(pageNumber, pageSize, filters),
    // enabled: options.enabled ?? true,
    enabled: false,
  });

  // [02] - Create channel
  const createChannelMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
      toast.success("کانال با موفقیت ثبت شد", {
        position: "top-right",
        theme: "colored",
      });
    },
  });

  // [03] - Update channel
  const updateChannelMutation = useMutation({
    mutationFn: ({ id, payload }) => updateChannel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
    },
  });

  // [04] - Delete channel
  const deleteChannelMutation = useMutation({
    mutationFn: deleteChannel,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
    },
  });

  // [05] - Change channel image
  const changeChannelImageMutation = useMutation({
    mutationFn: ({ id, file }) => changeChannelImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
      toast.success("تصویر کاور با موفقیت تغییر کرد");

    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "خطا در تغییر تصویر کاور"
      );
    },

  });

  // [06] - Change profile channel image
  const changeProfileChannelImageMutation = useMutation({
    mutationFn: ({ id, file }) => changeProfileChannelImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
      toast.success("تصویر پروفایل با موفقیت تغییر کرد");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "خطا در تغییر تصویر پروفایل"
      );
    },
  });

  const updateChannelInfoMutation = useMutation({
    mutationFn: ({ id, payload }) =>
      updateChannelInfo(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.channel]);
      toast.success("اطلاعات شبکه‌های اجتماعی با موفقیت ذخیره شد");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "خطا در ذخیره اطلاعات کانال"
      );
    },
  });

  return {
    channels,
    isLoadingChannels,
    isErrorChannels,
    refetchChannels,
    createChannel: createChannelMutation.mutate,
    updateChannel: (id, payload) =>
      updateChannelMutation.mutate({ id, payload }),
    deleteChannel: deleteChannelMutation.mutate,
    changeChannelImage: (file, id = null) =>
      changeChannelImageMutation.mutate({ id, file }),

    changeProfileChannelImage: (file, id = null) =>
      changeProfileChannelImageMutation.mutate({ id, file }),

    isChangingChannelImage: changeChannelImageMutation.isPending,
    isChangingProfileImage: changeProfileChannelImageMutation.isPending,

    updateChannelInfo: (payload, id = null) =>
      updateChannelInfoMutation.mutate({ id, payload }),

    isUpdatingChannelInfo: updateChannelInfoMutation.isPending,
  };
}

export default useChannel;
