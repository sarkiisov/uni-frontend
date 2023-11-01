import { useMutation } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { InfoForm } from '../components/InfoForm'
import { InfoFormFields } from '../components/InfoForm/types'
import { saveUserInfo } from '../api/userInfo'
import { queryClient } from '@/core'
import { userStatusQuery } from '../queries'
import { getErrorMessage } from '@/utils/error'
import { USER_INFO_ERRORS, prepareInfoRequest } from '../utils'

export const UserInfoPage = () => {
  const navigate = useNavigate()

  const saveUserInfoMutation = useMutation({
    mutationFn: saveUserInfo,
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(USER_INFO_ERRORS, error)
      })
    },
    onSuccess: () => {
      showNotification({
        message: 'Персональные данные сохранены'
      })

      queryClient.removeQueries({
        queryKey: userStatusQuery().queryKey
      })

      navigate('/quiz')
    }
  })

  const handleSubmit = async (data: InfoFormFields) => {
    await saveUserInfoMutation.mutateAsync(prepareInfoRequest(data))
  }

  return (
    <InfoForm onSubmit={handleSubmit} />
  )
}
