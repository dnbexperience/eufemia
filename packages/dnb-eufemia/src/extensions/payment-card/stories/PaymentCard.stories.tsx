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
  CardType,
  ProductType,
  BankAxeptOrCreditType,
} from '../../../extensions/payment-card'
import cardData from '../utils/cardProducts'
import DesignObjectTemplates from '../utils/CardDesigns'

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
  cardDesign: DesignObjectTemplates.gold,
  cardType: CardType.Visa,
  productType: ProductType.Business,
  bankAxept: BankAxeptOrCreditType.BankAxept,
}

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <PaymentCard
        locale="en-GB"
        product_code="DNB"
        card_number="************1337"
        card_status="expired"
        variant="compact"
      />
    </Box>
    <Box>
      <PaymentCard
        variant="compact"
        product_code="VG1"
        card_number="************1337"
      />
    </Box>
    <Box>
      <PaymentCard
        product_code="UNDEFINED"
        raw_data={customData}
        variant="compact"
        card_number="************1337"
      />
    </Box>
    <Box>
      {cards.map((product_code) => {
        const cardData = getCardData(product_code)
        return (
          <div key={product_code}>
            <H3>
              {cardData.cardDesign.name}({product_code})
            </H3>
            <div
              key={product_code}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <PaymentCard
                product_code={product_code}
                card_number="************1337"
              />
              {/* <PaymentCard
                variant="compact"
                product_code={product_code}
                card_number="************1337"
              /> */}
            </div>
          </div>
        )
      })}
    </Box>
  </CustomWrapper>
)
const cards = cardData.map((card) => card.productCode)
