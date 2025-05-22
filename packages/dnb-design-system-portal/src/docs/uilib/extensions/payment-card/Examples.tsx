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
          '043',
          '044',
          '052',
          '053',
          '062',
          '069',
          '074',
          '080',
          '084',
          '085',
          '086',
          '096',
          '098',
          '101',
          'BK1',
          'BP1',
          'VB5',
          'VG4',
          'VL1',
          'VL4',
          'VL6',
          'VP4',
          'VP5',
          'VO1',
          'VX1',
          'VX4',
          'VX5',
          '087',
          '103',
          'VS8',
        ]

        return (
          <>
            {demoCards.map((product_code) => {
              const cardData = getCardData(product_code)
              return (
                <article key={product_code}>
                  <H4>
                    {cardData.cardDesign.name} ({product_code})
                  </H4>
                  <PaymentCard
                    product_code={product_code}
                    card_number="••••••••••••1337"
                  />
                </article>
              )
            })}
          </>
        )
      }}
    </ComponentBox>
  )
}

export const PaymentCardBasicExample = () => (
  <ComponentBox
    scope={{ PaymentCard }}
    data-visual-test="payment-card-basic"
  >
    <PaymentCard product_code="VL4" card_number="••••••••••••1337" />
  </ComponentBox>
)

export const PaymentCardCustomExample = () => (
  <ComponentBox
    scope={{ PaymentCard, Designs, ProductType, CardType, BankAxeptType }}
  >
    {() => {
      const customData = {
        productName: 'DNB Custom Card',
        displayName: 'Custom card',
        cardDesign: Designs.gold,
        cardType: CardType.Visa,
        productType: ProductType.Corporate,
        bankAxept: BankAxeptType.BankAxept,
      }
      return (
        <PaymentCard
          product_code="UNDEFINED"
          raw_data={customData}
          card_number="••••••••••••1337"
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
      product_code="VX5"
      card_status="blocked"
      card_number="••••••••••••1337"
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
      product_code="BK1"
      card_number="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      product_code="VP5"
      card_number="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      product_code="052"
      card_number="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      product_code="101"
      card_number="••••••••••••1337"
    />
  </ComponentBox>
)
