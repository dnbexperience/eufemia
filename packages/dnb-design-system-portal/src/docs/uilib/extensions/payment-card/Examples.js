/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/src/extensions/payment-card'

// TODO: Move over all other examples as well
// import PaymentCard, {
// Designs,
// ProductType,
// CardType,
// } from '@dnb/eufemia/src/extensions/payment-card'
// import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'

export function PaymentCardAllCards() {
  return (
    <ComponentBox
      scope={{ PaymentCard, getCardData }}
      data-visual-test="all-cards"
      useRender
    >
      {() => /* jsx */ `
const demoCards = [
  'VE1',
  'VL2',
  'VX1',
  'VX3',
  'VL1',
  '096',
  'VG1',
  'VP2',
  'VP3',
  'P101',
  'BK1',
  'VB2'
]
const Cards = ()=>demoCards.map((product_code) => {
	const cardData = getCardData(product_code);
	return (
    <article key={product_code}>
      <H4>{cardData.cardDesign.name}</H4>
      <PaymentCard product_code={product_code} card_number="************1337" />
    </article>
	)
})
render(<Cards />)
	`}
    </ComponentBox>
  )
}
