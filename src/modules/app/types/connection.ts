import { User } from '@/modules/auth/types'

export type Connection = {
  id: number
  prob: number | null
  probPredicted: number
  user2: User
}
