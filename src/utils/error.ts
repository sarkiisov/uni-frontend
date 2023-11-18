const FALLBACK_ERROR_MESSAGE = 'Произошла неизвестная ошибка'

export const getErrorMessage = (error: Error, errorMap?: Record<string, string>) => {
  const { message } = error
  return errorMap?.[message] ?? FALLBACK_ERROR_MESSAGE
}
