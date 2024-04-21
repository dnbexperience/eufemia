export const formatCardNumber = (cardNumber, digits = 8) => {
  const formatCardNumberRegex = /(?=(?:....)*$)/g

  if (!cardNumber) {
    return cardNumber
  }

  if (digits && digits <= cardNumber.length) {
    return cardNumber
      .slice(cardNumber.length - digits, cardNumber.length)
      .replace(formatCardNumberRegex, ' ')
      .trim()
  }
  return cardNumber.replace(formatCardNumberRegex, ' ').trim()
}
