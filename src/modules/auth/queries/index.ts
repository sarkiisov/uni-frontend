export const refreshQuery = () => ({
  queryKey: ['auth/refresh'],
  retry: 0
})

export const authUserQuery = () => ({
  queryKey: ['auth/user']
})

export const userQuery = () => ({
  queryKey: ['user']
})

export const userStatusQuery = () => ({
  queryKey: ['user/status']
})
