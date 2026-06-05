const BUSINESS_ID_PATTERN = /^\d{7}-\d$/
const MIN_LENGTH = 2
const MAX_LENGTH = 100

export type ValidationError = 'tooShort' | 'tooLong' | 'invalidBusinessId'

export const sanitize = (input: string): string =>
  input.trim().slice(0, MAX_LENGTH)

export const isBusinessId = (input: string): boolean =>
  BUSINESS_ID_PATTERN.test(input)

export const validate = (input: string): ValidationError | null => {
  if (input.length < MIN_LENGTH) return 'tooShort'
  if (input.length > MAX_LENGTH) return 'tooLong'
  if (input.includes('-') && !BUSINESS_ID_PATTERN.test(input)) return 'invalidBusinessId'
  return null
}
