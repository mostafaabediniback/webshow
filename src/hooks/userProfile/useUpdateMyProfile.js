import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { QueryKeys } from '../../enums'
import { updateMyProfile } from '../../services/userProfileApi'

function useUpdateMyProfile(options = {}) {
    const queryClient = useQueryClient()
    const { onSuccess } = options

    const mutation = useMutation({
        mutationFn: updateMyProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.myProfile] })
            toast.success('اطلاعات با موفقیت بروزرسانی شد')
            onSuccess?.()
        },
    })

    return {
        updateMyProfile: mutation.mutateAsync,
        isUpdatingMyProfile: mutation.isPending,
    }
}

export default useUpdateMyProfile