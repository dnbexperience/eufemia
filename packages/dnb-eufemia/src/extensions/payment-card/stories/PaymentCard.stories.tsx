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
import H3 from '../../../elements/H3'
import cardData from '../utils/cardProducts'
import { PaymentCardRawData } from '../types'
import { H2 } from '../../../elements'

import PaymentCard, { getCardDesign, Designs } from '../'

export default {
  title: 'Eufemia/Extensions/PaymentCard',
}

const CustomWrapper = styled(Wrapper)`
  /* empty */
`

// const customData: PaymentCardRawData = {
//   productCode: 'UNDEFINED',
//   productName: 'DNB Custom Card',
//   displayName: 'Custom card', // Only showed in compact variant
//   // cardDesign: 'gold',
//   cardDesign: Designs.gold,
//   cardType: 'MastercardDefault',
//   productType: 'Saga',
//   bankAxept: 'BankAxeptWhite',
// }

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <H3>Test</H3>

      <PaymentCard
        // rawData={customData}
        productCode=""
        cardNumber={'123123123123'}
      />

      <PaymentCard productCode={null} cardNumber={'123123123'} />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="blocked"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="expired"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="not_active"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="order_in_process"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="renewed"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="replaced"
      />
      <PaymentCard
        productCode={null}
        cardNumber={'123123123'}
        cardStatus="unknown"
      />
    </Box>

    <Box>
      <PaymentCard
        productCode={undefined}
        cardNumber={'123123123'}
        skeleton
      />

      <PaymentCard
        productCode={undefined}
        cardNumber={'123123123'}
        // rawData={{
        //   productCode: 'string',
        //   productName: 'string',
        //   displayName: '',
        //   cardDesign: {
        //     cardStyle: '',
        //     bankLogo: 'DNB',
        //     bankLogoColors: 'red',
        //     cardDesign: 'None',
        //     backgroundImage: '',
        //     visaColors: '',
        //   },
        //   cardType: 'VisaColored',
        //   productType: 'None',
        //   bankAxept: 'BankAxeptBlack',
        // }}
        skeleton
      />
    </Box>

    <Box>
      <H2>All Cards</H2>

      {cards.map((productCode) => {
        const cardData = getCardDesign(productCode)
        return (
          <div key={productCode}>
            <H3>
              {cardData.displayName}({productCode})
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
                cardNumber="************1337"
              />
              <PaymentCard
                variant="compact"
                productCode={productCode}
                cardNumber="************1337"
              />
            </div>
          </div>
        )
      })}
    </Box>
  </CustomWrapper>
)
const cards = cardData.map((card) => card.productCode)
