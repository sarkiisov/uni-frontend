import { DefaultValues } from 'react-hook-form'
import { Gender, InfoFormFields } from '../types'

export const fallbackDefaultValues: DefaultValues<InfoFormFields> = {
  name: '',
  description: '',
  tgAccount: '',
  birthday: undefined,
  gender: Gender.FEMALE,
  showGenders: [Gender.FEMALE, Gender.MALE]
}
