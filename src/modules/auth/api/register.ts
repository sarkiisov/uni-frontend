import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type RegisterRequest = {
  login: string
  password: string
}

export type RegisterResponse = {
  login: string
  token: string
}

export const register =
  (data: RegisterRequest) => axiosInstance
    .post<RegisterRequest, AxiosResponse<RegisterResponse>>('auth/register', data)
    .then((response) => response.data)
