import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../enums'
import {
  changeChannelImage,
  changeProfileChannelImage,
  createChannel,
  deleteChannel,
  getChannels,
  updateChannel,
  updateChannelInfo,
} from '../services/channelApi'

function useChannel(pageNumber = 1, pageSize = 10, filters = {}, options = {}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const queryClient = useQueryClient()
=======
  const queryClient = useQueryClient();
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
  const queryClient = useQueryClient()
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

  const {
    data: channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
    refetch: refetchChannels,
  } = useQuery({
    queryKey: [QueryKeys.channel, pageNumber, pageSize, filters],
    queryFn: () => getChannels(pageNumber, pageSize, filters),
    enabled: options.enabled ?? true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af
  })

  const invalidateChannelQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [QueryKeys.channel] }),
      queryClient.invalidateQueries({ queryKey: [QueryKeys.channelDetail] }),
      queryClient.invalidateQueries({ queryKey: [QueryKeys.dashboard] }),
    ])
  }
<<<<<<< HEAD
=======
  });
>>>>>>> d0d46aa4d63b99af16f230b0b9a0bdca29f11fad
=======
>>>>>>> 160b87080763d99c61e00cab1c10c5b9c69269af

  const createChannelMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: async () => {
      await invalidateChannelQueries()
      toast.success('کانال با موفقیت ثبت شد', {
        position: 'top-right',
        theme: 'colored',
      })
    },
  })

  const updateChannelMutation = useMutation({
    mutationFn: ({ id, payload }) => updateChannel(id, payload),
    onSuccess: invalidateChannelQueries,
  })

  const deleteChannelMutation = useMutation({
    mutationFn: deleteChannel,
    onSuccess: invalidateChannelQueries,
  })

  const changeChannelImageMutation = useMutation({
    mutationFn: ({ id, file }) => changeChannelImage(id, file),
    onSuccess: invalidateChannelQueries,
  })

  const changeProfileChannelImageMutation = useMutation({
    mutationFn: ({ id, file }) => changeProfileChannelImage(id, file),
    onSuccess: invalidateChannelQueries,
  })

  const updateChannelInfoMutation = useMutation({
    mutationFn: ({ id, payload }) => updateChannelInfo(id, payload),
    onSuccess: invalidateChannelQueries,
  })

  return {
    channels,
    isLoadingChannels,
    isErrorChannels,
    refetchChannels,
    createChannel: (payload, mutationOptions = {}) => createChannelMutation.mutateAsync(payload, mutationOptions),
    updateChannel: (id, payload, mutationOptions = {}) => updateChannelMutation.mutateAsync({ id, payload }, mutationOptions),
    deleteChannel: (id, mutationOptions = {}) => deleteChannelMutation.mutateAsync(id, mutationOptions),
    changeChannelImage: (file, id, mutationOptions = {}) => changeChannelImageMutation.mutateAsync({ id, file }, mutationOptions),
    changeProfileChannelImage: (file, id, mutationOptions = {}) => changeProfileChannelImageMutation.mutateAsync({ id, file }, mutationOptions),
    isChangingChannelImage: changeChannelImageMutation.isPending,
    isChangingProfileImage: changeProfileChannelImageMutation.isPending,
    updateChannelInfo: ({ id = null, ...payload }, mutationOptions = {}) => (
      updateChannelInfoMutation.mutateAsync({ id, payload }, mutationOptions)
    ),
    isUpdatingChannelInfo: updateChannelInfoMutation.isPending,
  }
}

export default useChannel
