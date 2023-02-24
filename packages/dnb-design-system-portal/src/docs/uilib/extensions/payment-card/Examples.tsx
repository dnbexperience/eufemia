/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import PaymentCard, {
  getCardData,
  Designs,
  ProductType,
  CardType,
} from '@dnb/eufemia/src/extensions/payment-card'
import { H4 } from '@dnb/eufemia/src'

export function PaymentCardAllCardsExample() {
  return (
    <ComponentBox
      scope={{ PaymentCard, getCardData }}
      data-visual-test="all-cards"
    >
      {() => {
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
          'VB2',
        ]

        const Cards = () => (
          <>
            {demoCards.map((product_code) => {
              const cardData = getCardData(product_code)
              return (
                <article key={product_code}>
                  <H4>{cardData.cardDesign.name}</H4>
                  <PaymentCard
                    product_code={product_code}
                    card_number="************1337"
                  />
                </article>
              )
            })}
          </>
        )

        return <Cards />
      }}
    </ComponentBox>
  )
}

export const PaymentCardBasicExample = () => (
  <ComponentBox
    scope={{ PaymentCard }}
    data-visual-test="payment-card-basic"
  >
    <PaymentCard product_code="NK1" card_number="************1337" />
  </ComponentBox>
)

export const PaymentCardCustomExample = () => (
  <ComponentBox scope={{ PaymentCard, Designs, ProductType, CardType }}>
    {() => {
      const customData = {
        productCode: 'UNDEFINED',
        productName: 'DNB Custom Card',
        displayName: 'Custom card',
        cardDesign: Designs.gold,
        cardType: CardType.Visa,
        productType: ProductType.BankAxept,
      }
      return (
        <PaymentCard
          product_code="UNDEFINED"
          raw_data={customData}
          card_number="************1337"
        />
      )
    }}
  </ComponentBox>
)

export const PaymentCardStatusExample = () => (
  <ComponentBox
    scope={{ PaymentCard }}
    data-visual-test="payment-card-status"
  >
    <PaymentCard
      product_code="VG2"
      card_status="blocked"
      card_number="************1337"
    />
  </ComponentBox>
)

export const PaymentCardCompactExample = () => (
  <ComponentBox
    scope={{ PaymentCard }}
    data-visual-test="payment-card-compact"
  >
    <PaymentCard
      variant="compact"
      product_code="VG1"
      card_number="************1337"
    />
  </ComponentBox>
)
