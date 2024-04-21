import { BankAxeptOrCreditType, CardType, ProductType } from '../types'
import { defaultDesign } from './CardDesigns'
import cardProducts from './cardProducts'

export const getCardData = (productCode: string) => {
  const card = cardProducts.find(
    (item) => item.productCode === productCode
  )
  return card || defaultCard(productCode)
}

const defaultCard = (productCode: string) => ({
  productCode,
  productName: '',
  displayName: '',
  cardDesign: defaultDesign,
  cardType: CardType.None,
  productType: ProductType.None,
  bankAxept: BankAxeptOrCreditType.None,
})
