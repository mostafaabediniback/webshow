import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../services/channelApi";
import { QueryKeys } from "../enums";
import { toast } from "react-toastify";

function useChannel(pageNumber = 1, pageSize = 10, filters = {}) {
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
    enabled: true,
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

  return {
    channels,
    isLoadingChannels,
    isErrorChannels,
    refetchChannels,
    createChannel: createChannelMutation.mutate,
    updateChannel: (id, payload) =>
      updateChannelMutation.mutate({ id, payload }),
    deleteChannel: deleteChannelMutation.mutate,
  };
}

export default useChannel;
