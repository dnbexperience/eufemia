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
import { Table } from '../../../components'

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

      <Table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Card Display Name</th>
            {/* <th>Background</th> */}
            <th>Bank Logo Properties</th>
            <th>Product Logo Variant</th>
            <th>Product Type Variants</th>
            <th>Card Provider Variants</th>
            <th>Payment type variants</th>
            <th>className</th>
            <th>background image</th>
          </tr>
        </thead>
        <tbody>
          {cardData.map((card) => {
            return (
              <tr key={card.productCode}>
                <td>{card?.productCode}</td>
                <td>{card?.displayName}</td>
                {/* <td>{card?.background}</td> */}
                <td>{`${card?.bankLogo?.type} (${card?.bankLogo?.color})`}</td>
                <td>{`${card?.productType?.type} (${card?.productType?.color})`}</td>
                <td>{`${card?.cardProvider?.type} (${card?.cardProvider?.color})`}</td>
                <td>{`${card?.paymentType?.type} (${card?.paymentType?.color})`}</td>
                <td>{card?.cardClassName}</td>
                <td>{card?.backgroundImage}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

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
