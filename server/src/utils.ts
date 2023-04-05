export function toBase62 (number: number) {
  if (number === 0) {
    return '0'
  }
  const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  while (number > 0) {
    result = digits[number % digits.length] + result
    number = parseInt(`${number / digits.length}`, 10)
  }

  return result
}

export function isValidUrl (url: string) {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function isValidEmail (email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
