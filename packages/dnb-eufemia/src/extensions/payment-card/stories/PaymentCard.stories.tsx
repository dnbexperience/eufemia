/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

// import { H3 } from '../../..'

import '../style'
import '../style/themes/ui'
import PaymentCard, { getCardData } from './../PaymentCard'
import H3 from '../../../elements/H3'
import cardData from '../utils/cardProducts'
import { PaymentCardRawData } from '../types'
import { H2 } from '../../../elements'

export default {
  title: 'Eufemia/Extensions/PaymentCard',
}

const CustomWrapper = styled(Wrapper)`
  /* empty */
`

const customData: PaymentCardRawData = {
  productCode: 'UNDEFINED',
  productName: 'DNB Custom Card',
  displayName: 'Custom card', // Only showed in compact variant
  // cardDesign: 'gold',
  cardDesign: { cardDesign: 'SagaGold' },
  cardType: 'VisaColored',
  productType: 'Business',
  bankAxept: 'BankAxeptBlack',
}

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <H3>Test</H3>

      <PaymentCard
        product_code={null}
        card_number={'123123123'}
        raw_data={{
          productCode: 'UNDEFINED',
          productName: ' ',
          displayName: ' ',
          cardDesign: {},
          cardType: 'None',
          productType: 'None',
          bankAxept: 'None',
        }}
      />
    </Box>

    {/* <Box>
      <PaymentCard
        product_code={'NK1'}
        card_number={'123123123123'}
        card_status="active"
      />
      <PaymentCard
        product_code={'NK2'}
        card_number={'123123123123'}
        card_status="blocked"
      />
    </Box>

    <Box>
      <PaymentCard
        // locale="en-GB"
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
    </Box> */}

    <Box>
      <H2>All Cards</H2>

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
              <PaymentCard
                variant="compact"
                product_code={product_code}
                card_number="************1337"
              />
            </div>
          </div>
        )
      })}
    </Box>
  </CustomWrapper>
)
const cards = cardData.map((card) => card.productCode)
