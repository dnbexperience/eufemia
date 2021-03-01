---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import PaymentCard, { getCardData, Designs, ProductType, CardType } from '@dnb/eufemia/src/patterns/payment-card'
import ChangeLocale from 'Src/core/ChangeLocale'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Basic example

Basic card using productCode.

<ComponentBox scope={{PaymentCard}} data-visual-test="payment-card-basic">
	{/* @jsx */ `
<PaymentCard
  product_code="NK1"
  card_number="************1337"
/>
	`}
</ComponentBox>

### Custom card using rawData

You may have to import the extra named exports:

```js
import PaymentCard, {
  getCardData,
  Designs,
  ProductType,
  CardType
} from '@dnb/eufemia/patterns/PaymentCard'
```

<ComponentBox scope={{PaymentCard,Designs,ProductType,CardType}} useRender>
  {/* @jsx */ `
const customData = {
  productCode: 'UNDEFINED',
  productName: 'DNB Custom Card',
  displayName: 'Custom card',
  cardDesign: Designs.gold,
  cardType: CardType.Visa,
  productType: ProductType.BankAxept
}
render(
  <PaymentCard 
    product_code="UNDEFINED"
    raw_data={customData}
    card_number="************1337"
  />
)
	`}
</ComponentBox>

### Basic card using a status

Basic card using product code and status.

<ComponentBox scope={{PaymentCard}} data-visual-test="payment-card-status">
	{/* @jsx */ `
<PaymentCard
  product_code="VG2"
  card_status="blocked"
  card_number="************1337"
/>
	`}
</ComponentBox>

### Basic card in compact variant

**NB:** The compact variant have to be aligned to a not yet defined SSOT style.

<ComponentBox scope={{PaymentCard}} data-visual-test="payment-card-compact">
	{/* @jsx */ `
<PaymentCard
  variant="compact"
  product_code="VG1"
  card_number="************1337"
/>
	`}
</ComponentBox>

### Demo cards

A few selected cards to showcase all the different PaymentCard designs.

<ComponentBox scope={{PaymentCard,getCardData}} data-visual-test="all-cards" useRender>
	{/* @jsx */ `
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
render(demoCards.map(product_code => {
	const cardData = getCardData(product_code);
	return (
    <article key={product_code}>
      <H4>{cardData.cardDesign.name}</H4>
      <PaymentCard product_code={product_code} card_number="************1337" />
    </article>
	)
}))
	`}
</ComponentBox>
