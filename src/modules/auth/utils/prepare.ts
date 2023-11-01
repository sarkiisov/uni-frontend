import dayjs from 'dayjs'
import { SaveUserInfoRequest } from '../api/userInfo'
import { Gender, InfoFormFields } from '../components/InfoForm/types'

export const prepareInfoRequest = (data: InfoFormFields): SaveUserInfoRequest => ({
  name: data.name,
  description: data.description,
  tgAccount: data.tgAccount,
  birthday: dayjs(data.birthday).format('YYYY-MM-DD'),
  female: Boolean(data.gender === Gender.FEMALE),
  showMale: Boolean(data.showGenders.includes(Gender.MALE)),
  showFemale: Boolean(data.showGenders.includes(Gender.FEMALE))
})

export const prepareInfoResponse = (data?: SaveUserInfoRequest): InfoFormFields | undefined => {
  if (!data) return undefined

  return {
    name: data.name,
    description: data.description,
    tgAccount: data.tgAccount,
    birthday: dayjs(data.birthday).toDate(),
    gender: data.female ? Gender.FEMALE : Gender.MALE,
    showGenders: [
      ...(data.showMale ? [Gender.MALE] : []),
      ...(data.showFemale ? [Gender.FEMALE] : [])
    ]
  }
}
