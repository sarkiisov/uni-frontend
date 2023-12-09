import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'
import { Connection } from '../types'

export type LikeConnectionRequest = {
  uniConnectionId: number
  like: boolean
}

export const likeConnection = (data: LikeConnectionRequest) => axiosInstance
  .post<LikeConnectionRequest, AxiosResponse<Connection>>('connection/like', data)
  .then((response) => response.data)
