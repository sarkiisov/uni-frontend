import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type SaveQuizRequest = Record<string, number>

export const saveQuiz =
  (data: SaveQuizRequest) => axiosInstance
    .post<SaveQuizRequest, AxiosResponse<void>>('user/test', data)
