/**
 * dnb-ui-lib Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { H3 } from '../../src/elements'
import PaymentCard, { getCardData } from '../../src/patterns/payment-card'

import '../../src/style/patterns'

const CustomWrapper = styled(Wrapper)`
  /* empty */
`

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <PaymentCard
        // skeleton
        // text_card_number="xxx"
        locale="en-US"
        product_code="DNB"
        card_number="************1337"
        card_status="expired" // 👈 can be expired, blocked or active
      />
    </Box>
    <Box>
      {demoCards.map((product_code) => {
        const cardData = getCardData(product_code)
        return (
          <div key={product_code}>
            <H3>{cardData.cardDesign.name}</H3>
            <PaymentCard
              product_code={product_code}
              card_number="************1337"
            />
          </div>
        )
      })}
    </Box>
  </CustomWrapper>
)

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
