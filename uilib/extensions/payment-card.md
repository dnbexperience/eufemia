---
title: 'Payment Card'
description: 'The Payment Card component is used to display payment card information in a standardized format.'
metadata: https://eufemia.dnb.no/uilib/extensions/payment-card/metadata.json
---

## Import

```tsx
import '@dnb/eufemia/extensions/payment-card/style'
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/extensions/payment-card'

render(<PaymentCard product_code="..." />)
```

## Description

The PaymentCard component is a dynamic defined visual component imitate a physical payment card. It exists as an independent extension to Eufemia.

## Relevant links

- [Figma](https://www.figma.com/file/461cAN5Qc3Nks4ztZ9pjtM)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/payment-card)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/payment-card)

How to use it:

1. First, define your desired look and design.
2. And import and include it in your application:

```jsx
import '@dnb/eufemia/extensions/payment-card/style'
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/extensions/payment-card'

render(<PaymentCard product_code="..." />)
```

Resources:

- [Figma design](https://www.figma.com/file/461cAN5Qc3Nks4ztZ9pjtM)
- [Confluence specifications](https://confluence.tech.dnb.no/pages/viewpage.action?spaceKey=PMDT&title=Cards+mapping)
- [Kortprodukter med egenskaper](http://team.erf01.net/sites/8974/Shared%20Documents/Kortprodukter_med_egenskaper.pdf)

## Demos

<ChangeLocale
  label="Locale used in the demos:"
  label_direction="vertical"
/>

### Basic example

Basic card using productCode.

```tsx
render(<PaymentCard product_code="VL4" card_number="••••••••••••1337" />)
```

### Custom card using rawData

You may have to import the extra named exports:

```
import PaymentCard, {
  getCardData,
  Designs,
  ProductType,
  CardType,
  BankAxeptType,
} from '@dnb/eufemia/extensions/PaymentCard'
```

```tsx
const customData = {
  productCode: 'CUSTOM',
  productName: 'DNB Custom Card',
  displayName: 'Custom card',
  cardDesign: Designs.gold,
  cardType: CardType.Visa,
  productType: ProductType.Corporate,
  bankAxept: BankAxeptType.BankAxept,
}
render(
  <PaymentCard
    product_code="UNDEFINED"
    raw_data={customData}
    card_number="••••••••••••1337"
  />,
)
```

### Basic card using a status

```tsx
render(
  <PaymentCard
    product_code="VX5"
    card_status="blocked"
    card_number="••••••••••••1337"
  />,
)
```

Basic card using product code and status.

### Basic card in compact variant

```tsx
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
```

### Demo cards

All the different card products and PaymentCard designs.

```tsx
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
render(
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
  </>,
)
```

#### Decommissioned Cards

Decommissioned product codes that are still in circulation:

```
  'NK1', 'NK4', 'NK5',
  'P101',
  'VB1', 'VB2',
  'VE1', 'VE2', 'VG1',
  'VK2', 'VK4',
  'VL2', 'VL3', 'VO3',
  'VP2', 'VP3', 'VX3'
```
