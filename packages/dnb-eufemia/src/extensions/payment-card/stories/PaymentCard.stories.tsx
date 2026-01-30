/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { H3 } from '../../..'

import '../style'
import '../style/themes/ui'
import PaymentCard, {
  getCardData,
  Designs,
  CardType,
  ProductType,
  BankAxeptType,
} from '../../../extensions/payment-card'
import cardData from '../utils/cardProducts'

export default {
  title: 'Eufemia/Extensions/PaymentCard',
}

const CustomWrapper = styled(Wrapper)`
  /* empty */
`

const customData = {
  productCode: 'UNDEFINED',
  productName: 'DNB Custom Card',
  displayName: 'Custom card', // Only showed in compact variant
  cardDesign: Designs.gold,
  cardType: CardType.Visa,
  productType: ProductType.Business,
  bankAxept: BankAxeptType.BankAxept,
}

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <PaymentCard
        locale="en-GB"
        productCode="DNB"
        cardNumber="••••••••••••1337"
        cardStatus="expired"
        variant="compact"
      />
    </Box>
    <Box>
      <PaymentCard
        variant="compact"
        productCode="VG1"
        cardNumber="••••••••••••1337"
      />
    </Box>
    <Box>
      <PaymentCard
        productCode="UNDEFINED"
        rawData={customData}
        variant="compact"
        cardNumber="••••••••••••1337"
      />
    </Box>
    <Box>
      {cards.map((productCode) => {
        const cardData = getCardData(productCode)
        return (
          <div key={productCode}>
            <H3>
              {cardData.cardDesign.name}({productCode})
            </H3>
            <div
              key={productCode}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <PaymentCard
                productCode={productCode}
                cardNumber="••••••••••••1337"
              />
              {/* <PaymentCard
                variant="compact"
                productCode={productCode}
                cardNumber="••••••••••••1337"
              /> */}
            </div>
          </div>
        )
      })}
    </Box>
  </CustomWrapper>
)
const cards = cardData.map((card) => card.productCode)
