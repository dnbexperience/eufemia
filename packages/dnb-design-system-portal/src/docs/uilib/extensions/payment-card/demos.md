---
showTabs: true
---

import PaymentCard, { getCardData, Designs, ProductType, CardType } from '@dnb/eufemia/src/extensions/payment-card'
import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'
import {
PaymentCardBasicExample,
PaymentCardCustomExample,
PaymentCardStatusExample,
PaymentCardCompactExample,
PaymentCardAllCardsExample,
} from './Examples'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" />

### Basic example

Basic card using productCode.

<PaymentCardBasicExample />

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

<PaymentCardCustomExample />

### Basic card using a status

<PaymentCardStatusExample />

Basic card using product code and status.

### Basic card in compact variant

**NB:** The compact variant have to be aligned to a not yet defined SSOT style.

<PaymentCardCompactExample />

### Demo cards

A few selected cards to showcase all the different PaymentCard designs.

<PaymentCardAllCardsExample />
