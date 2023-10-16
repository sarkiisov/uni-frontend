const FALLBACK_ERROR_MESSAGE = 'Произошла неизвестная ошибка'

export const getErrorMessage = (errorMap: Record<string, string>, error: Error) => {
  const { message } = error
  return errorMap[message] ?? FALLBACK_ERROR_MESSAGE
}
