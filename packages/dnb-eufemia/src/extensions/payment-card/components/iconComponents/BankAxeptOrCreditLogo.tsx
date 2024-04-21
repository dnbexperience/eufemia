import { BankAxept as BankAxeptIcon, Credit } from '../../icons'
import { BankAxeptOrCreditType, BankAxept } from '../../types'

const BankAxeptOrCreditLogo = ({ bankAxept, cardDesign }) => {
  const bankAxeptId = 'dnb-payment-card__card__bank-axept'
  const creditId = 'dnb-payment-card__card__credit'

  if (bankAxept === BankAxeptOrCreditType.None) {
    return null
  }
  if (bankAxept === BankAxeptOrCreditType.Credit) {
    return <Credit className={creditId} fill="#fff" />
  }

  switch (cardDesign.bankAxept) {
    case BankAxept.White:
      return <BankAxeptIcon className={bankAxeptId} fill="#ffffff" />
    case BankAxept.Black20:
      return <BankAxeptIcon className={bankAxeptId} fill="#cccccc" />
    case BankAxept.Gray:
      return <BankAxeptIcon className={bankAxeptId} fill="#b2b4b3" />
    case BankAxept.GrayDark:
      return <BankAxeptIcon className={bankAxeptId} fill="#55565a" />
    case BankAxept.Black:
      return <BankAxeptIcon className={bankAxeptId} fill="#333333" />
    case BankAxept.Gold:
      return <BankAxeptIcon className={bankAxeptId} fill="#BFA970" />
  }
}

export default BankAxeptOrCreditLogo
