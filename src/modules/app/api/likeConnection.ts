import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type LikeConnectionRequest = {
  uniConnectionId: number
  like: boolean
}

export const likeConnection = (data: LikeConnectionRequest) => axiosInstance
  .post<LikeConnectionRequest, AxiosResponse<void>>('connection/like', data)
  .then((response) => response.data)
