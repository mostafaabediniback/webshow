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
  });



  // [06] - Change profile channel image
  const changeProfileChannelImageMutation = useMutation({
    mutationFn: ({ id, file }) => changeProfileChannelImage(id, file),
  });

  // [07] - Update channel info (🔥 اصلاح‌شده)
  const updateChannelInfoMutation = useMutation({
    mutationFn: ({ id, payload }) =>
      updateChannelInfo(id, payload),
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
    changeChannelImage: (file, id, options = {}) =>
      changeChannelImageMutation.mutate(
        { id, file },
        options
      ),

    changeProfileChannelImage: (file, id, options = {}) =>
      changeProfileChannelImageMutation.mutate(
        { id, file },
        options
      ),

    isChangingChannelImage: changeChannelImageMutation.isPending,
    isChangingProfileImage: changeProfileChannelImageMutation.isPending,

    updateChannelInfo: ({ id, ...payload }, options = {}) =>
      updateChannelInfoMutation.mutate(
        {
          id: id || null,
          payload,
        },
        options
      ),

    isUpdatingChannelInfo: updateChannelInfoMutation.isPending,
  };
}

export default useChannel;
