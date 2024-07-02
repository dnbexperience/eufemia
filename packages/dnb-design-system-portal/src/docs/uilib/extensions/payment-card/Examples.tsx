/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import PaymentCard, {
  getCardData,
  Designs,
  ProductType,
  CardType,
  BankAxeptType,
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
          'NK1',
          'NK4',
          'NK5',
          'VE1',
          'VE2',
          'VG1',
          'VG4',
          '053',
          'VK2',
          'VK4',
          '084',
          'VL1',
          'VL2',
          'VL3',
          'VL4',
          'VL6',
          '085',
          'VO1',
          'VP2',
          'VP3',
          'VP4',
          '069',
          'VP5',
          '080',
          'VX1',
          'VX3',
          'VX4',
          'VX5',
          '096',
          '044',
          '043',
          '098',
          '074',
          '062',
          'BK1',
          'BP1',
          'VB1',
          'VB2',
          'VB5',
          'P101',
          '103',
          'VS8',
          'VO3',
        ]

        const Cards = () => (
          <>
            {demoCards.map((product_code) => {
              const cardData = getCardData(product_code)
              return (
                <article key={product_code}>
                  <H4>
                    {cardData.cardDesign.name}({product_code})
                  </H4>
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
  <ComponentBox
    scope={{ PaymentCard, Designs, ProductType, CardType, BankAxeptType }}
  >
    {() => {
      const customData = {
        productCode: 'UNDEFINED',
        productName: 'DNB Custom Card',
        displayName: 'Custom card',
        cardDesign: Designs.gold,
        cardType: CardType.Visa,
        productType: ProductType.None,
        bankAxept: BankAxeptType.BankAxept,
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
