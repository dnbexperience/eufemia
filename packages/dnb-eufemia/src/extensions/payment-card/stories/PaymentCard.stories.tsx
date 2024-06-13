/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import '../style'
import '../style/themes/ui'
import H3 from '../../../elements/H3'
import cardData from '../utils/cardProducts'
import { H2 } from '../../../elements'

import PaymentCard, { getCardDesign, Designs } from '../'

export default {
  title: 'Eufemia/Extensions/PaymentCard',
}

const CustomWrapper = styled(Wrapper)`
  /* empty */
`

export const PaymentCards = () => (
  <CustomWrapper className="dnb-spacing">
    <Box>
      <Box>
        <H3>Custom Card</H3>
        <PaymentCard
          cardNumber="123123123"
          customCard={{
            backgroundImage:
              'data:image/jpeg;base64,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',
            bankLogo: { type: 'DNB', color: 'black' },
            cardProvider: { type: 'Visa', color: 'black' },
            paymentType: { type: 'BankAxept', color: 'black' },
          }}
        />
        <PaymentCard cardNumber="123123123" customCard={Designs.saga} />
        <PaymentCard
          cardNumber="123123123"
          customCard={{
            ...Designs.gold,
            paymentType: { type: 'BankAxept', color: 'red' },
            cardProvider: { type: 'Mastercard' },
            bankLogo: { type: 'DNB', color: 'green' },
          }}
        />
      </Box>

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
