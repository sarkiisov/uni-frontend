import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type AttachUserFileRequest = {
  link: string
}

export const attachUserFile = (data: AttachUserFileRequest) => axiosInstance
  .post<AttachUserFileRequest, AxiosResponse<void>>('/image', data)
  .then((response) => response.data)
