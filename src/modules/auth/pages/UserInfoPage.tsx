import { useMutation } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { InfoForm } from '../components/InfoForm'
import { Gender, InfoFormFields } from '../components/InfoForm/types'
import { SaveUserInfoRequest, saveUserInfo } from '../api/userInfo'
import { queryClient } from '@/core'
import { userStatusQuery } from '../queries'
import { getErrorMessage } from '@/utils/error'
import { USER_INFO_ERRORS } from '../utils'

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
    const payload: SaveUserInfoRequest = {
      name: data.name,
      description: data.description,
      tgAccount: data.tgAccount,
      birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
      female: Boolean(data.gender === Gender.FEMALE),
      showMale: Boolean(data.showGenders.includes(Gender.MALE)),
      showFemale: Boolean(data.showGenders.includes(Gender.FEMALE))
    }
    await saveUserInfoMutation.mutateAsync(payload)
  }

  return (
    <InfoForm onSubmit={handleSubmit} />
  )
}
