import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type LoginRequest = {}

export type LoginResponse = {}

export const login =
  (data: LoginRequest) => axiosInstance
    .post<LoginRequest, AxiosResponse<LoginResponse>>('/api/auth/login', data)
    .then((response) => response.data)
