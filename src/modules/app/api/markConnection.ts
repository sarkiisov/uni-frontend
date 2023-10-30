import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type MarkConnectionRequest = {
  uniConnectionId: number
  prob: number
}

export const markConnection = (data: MarkConnectionRequest) => axiosInstance
  .post<MarkConnectionRequest, AxiosResponse<void>>('connection/mark', data)
  .then((response) => response.data)
