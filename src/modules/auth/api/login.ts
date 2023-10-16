import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type LoginRequest = {
  login: string
  password: string
}

export type LoginResponse = {
  login: string
  token: string
}

export const login =
  (data: LoginRequest) => axiosInstance
    .post<LoginRequest, AxiosResponse<LoginResponse>>('auth/login', data)
    .then((response) => response.data)
