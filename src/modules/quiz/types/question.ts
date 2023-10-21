export type Question = {
  id: number
  text: string
  text2: string
  type: string
}

export enum QuestionType {
  SINGLE = 'SINGLE',
  SINGLE1 = 'SINGLE1',
  SINGLE2 = 'SINGLE2',
  SIGNLE3 = 'SINGLE3',
  TWO_TRACK = 'TWO_TRACK'
}
