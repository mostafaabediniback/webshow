import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../services/channelApi";
import { QueryKeys } from "../enums";

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
    },
  });

  // [03] - Update channel
  const updateChannelMutation = useMutation({
    mutationFn: updateChannel,
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

  // [05] - Get channel detail
  const getChannelDetail = (id) => {
    return useQuery({
      queryKey: [QueryKeys.channel, id],
      queryFn: () => getChannels(id), // اگر endpoint detail جدا داری، باید تابع جدا بسازی
      enabled: !!id,
    });
  };

  return {
    channels,
    isLoadingChannels,
    isErrorChannels,
    refetchChannels,
    createChannel: createChannelMutation.mutate,
    updateChannel: updateChannelMutation.mutate,
    deleteChannel: deleteChannelMutation.mutate,
    getChannelDetail,
  };
}

export default useChannel;
