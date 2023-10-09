import { atomWithStorage } from 'jotai/utils'

const STORAGE_TOKEN_KEY = 'token'

export const tokenAtom = atomWithStorage(STORAGE_TOKEN_KEY, '')

export const getToken = () => JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY) ?? '')
