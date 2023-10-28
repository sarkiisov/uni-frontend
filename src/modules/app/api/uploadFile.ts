import { AxiosResponse } from 'axios'
import { axiosInstance } from '@/core'

export type UploadFileRequest = File

export type UploadFileResponse = {
  fileName: string
  fileUrl: string
}

export const uploadFile = (data: UploadFileRequest) => {
  const formData = new FormData()
  formData.append('file', data)

  return axiosInstance
    .post<UploadFileRequest, AxiosResponse<UploadFileResponse>>(
    '/uploadfile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
