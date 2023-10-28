import { axiosInstance } from '@/core'

export type DeleteUserFileRequest = {
  id: number
}

export const deleteUserFile = (data: DeleteUserFileRequest) => axiosInstance
  .delete(`/image/${data.id}`)
  .then((response) => response.data)
