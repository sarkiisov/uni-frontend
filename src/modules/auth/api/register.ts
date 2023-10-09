import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type RegisterRequest = {}

export type RegisterResponse = {}

export const register =
  (data: RegisterRequest) => axiosInstance
    .post<RegisterRequest, AxiosResponse<RegisterResponse>>('/api/auth/register', data)
    .then((response) => response.data)
