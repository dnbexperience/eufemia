/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import PaymentCard, {
  getCardData,
  Designs,
  ProductType,
  CardType,
  BankAxeptType,
  BankAxeptLogo,
  VisaLogo,
} from '@dnb/eufemia/src/extensions/payment-card'
import { Avatar, Badge, H4, List } from '@dnb/eufemia/src'

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
            {demoCards.map((productCode) => {
              const cardData = getCardData(productCode)
              return (
                <article key={productCode}>
                  <H4>
                    {cardData.cardDesign.name} ({productCode})
                  </H4>
                  <PaymentCard
                    productCode={productCode}
                    cardNumber="••••••••••••1337"
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
    <PaymentCard productCode="VL4" cardNumber="••••••••••••1337" />
  </ComponentBox>
)

export const PaymentCardCustomExample = () => (
  <ComponentBox
    scope={{ PaymentCard, Designs, ProductType, CardType, BankAxeptType }}
  >
    {() => {
      const customData = {
        productCode: 'CUSTOM',
        productName: 'DNB Custom Card',
        displayName: 'Custom card',
        cardDesign: Designs.gold,
        cardType: CardType.Visa,
        productType: ProductType.Corporate,
        bankAxept: BankAxeptType.BankAxept,
      }
      return (
        <PaymentCard
          productCode="UNDEFINED"
          rawData={customData}
          cardNumber="••••••••••••1337"
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
      productCode="VX5"
      cardStatus="blocked"
      cardNumber="••••••••••••1337"
    />
  </ComponentBox>
)

export const PaymentCardBrandLogosListExample = () => (
  <ComponentBox scope={{ BankAxeptLogo, VisaLogo }}>
    <List.Container>
      <List.Item.Action onClick={() => {}}>
        <List.Cell.Start>
          <Avatar size="medium" backgroundColor="white" hasLabel>
            <BankAxeptLogo
              fill="#561488"
              width="24"
              height="14"
              aria-hidden
            />
          </Avatar>
        </List.Cell.Start>
        <List.Cell.Title>
          DNB Bedrift BankAxept •••• 1234
          <List.Cell.Title.Subline variant="description">
            Bedriftskonto (1234 12 12345)
          </List.Cell.Title.Subline>
        </List.Cell.Title>
        <List.Cell.End>
          <Badge status="neutral" content="Linn Synnøve Ingebrigtsen" />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action onClick={() => {}}>
        <List.Cell.Start>
          <Avatar size="medium" backgroundColor="#2639C3" hasLabel>
            <VisaLogo fill="white" width="25" height="9" aria-hidden />
          </Avatar>
        </List.Cell.Start>
        <List.Cell.Title>
          <Badge status="warning" content="Sperret" right="x-small" />
          DNB Business Visa •••• 1234
          <List.Cell.Title.Subline variant="description">
            Bedriftskonto (1234 12 12345)
          </List.Cell.Title.Subline>
        </List.Cell.Title>
        <List.Cell.End>
          <Badge status="neutral" content="Linn Synnøve Ingebrigtsen" />
        </List.Cell.End>
      </List.Item.Action>
    </List.Container>
  </ComponentBox>
)

export const PaymentCardCompactExample = () => (
  <ComponentBox
    scope={{ PaymentCard }}
    data-visual-test="payment-card-compact"
  >
    <PaymentCard
      variant="compact"
      productCode="BK1"
      cardNumber="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      productCode="VP5"
      cardNumber="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      productCode="052"
      cardNumber="••••••••••••1337"
    />
    <PaymentCard
      variant="compact"
      productCode="101"
      cardNumber="••••••••••••1337"
    />
  </ComponentBox>
)
