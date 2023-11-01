export type User = {
  id: number
  name: string
  showMale: boolean
  showFemale: boolean
  description: string
  tgAccount: string
  birthday: string
  female: boolean
  imageLinks: {
    id: number
    link: string
  }[]
}

export type UserStatus = {
  hasInfo: boolean
  hasTest: boolean
}

export type AuthUser = {
  id: number
  userName: string
}
