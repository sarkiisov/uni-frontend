export type Question = {
  id: number
  text: string
  text2: string
  type: string
}

export enum QuestionType {
  SINGLE = 'SINGLE',
  TWO_TRACK = 'TWO_TRACK'
}
