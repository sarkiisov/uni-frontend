import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type SaveUserInfoRequest = {
  name: string
  description: string
  tgAccount: string
  birthday: string
  female: boolean
  showMale: boolean
  showFemale: boolean
}

export const saveUserInfo =
  (data: SaveUserInfoRequest) => axiosInstance
    .post<SaveUserInfoRequest, AxiosResponse<void>>('user/info', data)
