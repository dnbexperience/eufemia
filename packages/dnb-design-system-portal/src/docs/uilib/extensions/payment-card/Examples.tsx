/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import PaymentCard, {
  getCardDesign,
  CustomCard,
} from '@dnb/eufemia/src/extensions/payment-card'
import { H4 } from '@dnb/eufemia/src'

export function PaymentCardAllCardsExample() {
  return (
    <ComponentBox
      scope={{ PaymentCard, getCardDesign }}
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
          'P103',
          'VS8',
          'VO3',
        ]

        const Cards = () => (
          <>
            {demoCards.map((productCode) => {
              const cardData = getCardDesign(productCode)
              return (
                <article key={productCode}>
                  <H4>
                    {cardData.displayName}({productCode})
                  </H4>
                  <PaymentCard
                    productCode={productCode}
                    cardNumber="************1337"
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
    <PaymentCard productCode="NK1" cardNumber="************1337" />
  </ComponentBox>
)

export const PaymentCardCustomExample = () => (
  <ComponentBox
    scope={{
      PaymentCard,
    }}
  >
    {() => {
      const customData: CustomCard = {
        displayName: 'custom card',
        bankLogo: { type: 'DNB' },
        cardProvider: { type: 'Mastercard' },
        paymentType: { type: 'BankAxept' },
        background: 'gold',
      }
      return (
        <PaymentCard
          productCode=""
          customCard={customData}
          cardNumber="************1337"
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
      productCode="VG2"
      cardStatus="blocked"
      cardNumber="************1337"
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
      productCode="VG1"
      cardNumber="************1337"
    />
  </ComponentBox>
)
