---
showTabs: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import PaymentCard, { getCardData, Designs, ProductType, CardType } from '@dnb/eufemia/src/extensions/payment-card'
import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'
import {
PaymentCardAllCards
} from './Examples'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Basic example

Basic card using productCode.

<ComponentBox scope={{PaymentCard}} data-visual-test="payment-card-basic">
	{() => /* jsx */ `
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
  CardType,
} from '@dnb/eufemia/extensions/PaymentCard'
```

<ComponentBox scope={{PaymentCard,Designs,ProductType,CardType}} useRender>
  {() => /* jsx */ `
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
	{() => /* jsx */ `
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
	{() => /* jsx */ `
<PaymentCard
  variant="compact"
  product_code="VG1"
  card_number="************1337"
/>
	`}
</ComponentBox>

### Demo cards

A few selected cards to showcase all the different PaymentCard designs.

<PaymentCardAllCards />
