export function formatCardNumber(cardNumber: string, digits = 8) {
  const formatCardNumberRegex = /(?=(?:....)*$)/g

  if (!cardNumber) {
    return cardNumber
  }
  if (digits <= cardNumber.length && digits > 0) {
    return cardNumber
      .slice(cardNumber.length - digits, cardNumber.length)
      .replace(formatCardNumberRegex, ' ')
      .trim()
  }
  return cardNumber.replace(formatCardNumberRegex, ' ').trim()
}
