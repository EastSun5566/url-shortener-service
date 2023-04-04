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
