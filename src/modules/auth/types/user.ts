export type User = {
  name: string
  showMale: boolean
  showFemale: boolean
  description: string
  tgAccount: string
  birthday: string
  female: boolean
}

export type UserStatus = {
  hasInfo: boolean
  hasTest: boolean
}

export type AuthUser = {
  id: number
  userName: string
}
