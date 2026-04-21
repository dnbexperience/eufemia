---
title: 'PaymentCard'
description: 'The Payment Card component is used to display payment card information in a standardized format.'
---

# PaymentCard

## Import

```tsx
import '@dnb/eufemia/extensions/payment-card/style' // use "/style/isolated" for isolated styles
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/extensions/payment-card'

render(<PaymentCard productCode="..." />)
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

render(<PaymentCard productCode="..." />)
```

Resources:

- [Figma design](https://www.figma.com/file/461cAN5Qc3Nks4ztZ9pjtM)
- [Confluence specifications](https://confluence.tech.dnb.no/pages/viewpage.action?spaceKey=PMDT&title=Cards+mapping)
- [Kortprodukter med egenskaper](http://team.erf01.net/sites/8974/Shared%20Documents/Kortprodukter_med_egenskaper.pdf)

## Demos

<ChangeLocale label="Locale used in the demos:" />

### Basic example

Basic card using productCode.

```tsx
render(<PaymentCard productCode="VL4" cardNumber="••••••••••••1337" />)
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
    productCode="UNDEFINED"
    rawData={customData}
    cardNumber="••••••••••••1337"
  />
)
```

### Basic card using a status

```tsx
render(
  <PaymentCard
    productCode="VX5"
    cardStatus="blocked"
    cardNumber="••••••••••••1337"
  />
)
```

Basic card using product code and status.

### Basic card in compact variant

```tsx
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

## Card Properties

```json
{
  "props": {
    "productCode": {
      "doc": "If product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.",
      "type": "string",
      "status": "required"
    },
    "cardNumber": {
      "doc": "Masked card number.",
      "type": "string",
      "status": "required"
    },
    "rawData": {
      "doc": "Useful if you want to create custom cards. See Card data properties.",
      "type": "Various",
      "status": "optional"
    },
    "cardStatus": {
      "doc": "Use one of these: `active`, `notActive`, `newOrder`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `orderInProcess`, `unknown`. Defaults to `active`.",
      "type": [
        "\"active\"",
        "\"notActive\"",
        "\"newOrder\"",
        "\"new\"",
        "\"blocked\"",
        "\"expired\"",
        "\"renewed\"",
        "\"replaced\"",
        "\"orderInProcess\"",
        "\"unknown\""
      ],
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.",
      "type": ["\"normal\"", "\"compact\""],
      "status": "optional"
    },
    "digits": {
      "doc": "Will use 8 digits if none are specified.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "locale": {
      "doc": "Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Card Data

```json
{
  "props": {
    "productCode": {
      "doc": "Product code for the given card.",
      "type": "string",
      "status": "required"
    },
    "productName": {
      "doc": "Product name. Can be blank.",
      "type": "string",
      "status": "required"
    },
    "displayName": {
      "doc": "The visible product name. Can be empty.",
      "type": "string",
      "status": "required"
    },
    "cardDesign": {
      "doc": "Object that describes the style properties of the card. `import { Designs } from '@dnb/eufemia/extensions/payment-card'` (see available designs below) or a custom one can be created.",
      "type": "object",
      "status": "required"
    },
    "cardType": {
      "doc": "`import { CardType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `CardType.Visa`, `CardType.Mastercard` or `CardType.None`.",
      "type": "CardType",
      "status": "required"
    },
    "productType": {
      "doc": "`import { ProductType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `ProductType.Saga`, `ProductType.Pluss`, `ProductType.Intro`, `ProductType.Business`, `ProductType.Bedrift`, `ProductType.PrivateBanking`, `ProductType.Corporate`, `ProductType.WorldElite` or `ProductType.None`.",
      "type": "ProductType",
      "status": "required"
    },
    "bankAxept": {
      "doc": "`import { BankAxeptType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `BankAxeptType.BankAxept`, `BankAxeptType.Credit` or `BankAxeptType.None`.",
      "type": "BankAxeptType",
      "status": "required"
    }
  }
}
```

## Card Design

```json
{
  "props": {
    "name": {
      "doc": "String Name of design.",
      "type": "string",
      "status": "required"
    },
    "cardStyle": {
      "doc": "CSS class. Mainly to set background and color.",
      "type": "string",
      "status": "required"
    },
    "bankLogo": {
      "doc": "Discriminated union with `tag` property. `import { DNB } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `DNB.Colored('HexValue')` or `DNB.Sbanken('HexValue')`.",
      "type": "DNB",
      "status": "required"
    },
    "visa": {
      "doc": "Discriminated union with `tag` property. `import { Visa } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `Visa.Colored('HexValue')` or `Visa.Platinum`.",
      "type": "Visa",
      "status": "required"
    },
    "mastercard": {
      "doc": "Discriminated union with `tag` property. `import { Mastercard } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `Mastercard.Default` or `Mastercard.Dark`.",
      "type": "Mastercard",
      "status": "required"
    },
    "bankAxept": {
      "doc": "Discriminated union with `tag` property. `import { BankAxept } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `BankAxept.White`, `BankAxept.Black`, `BankAxept.Gold`, `BankAxept.Black20` or `BankAxept.Gray`.",
      "type": "BankAxept",
      "status": "required"
    },
    "saga": {
      "doc": "Discriminated union with `tag` property. `import { Saga } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `Saga.Gold`, `Saga.Platinum` or `Saga.None`.",
      "type": "Saga",
      "status": "required"
    },
    "privateBanking": {
      "doc": "Discriminated union with `tag` property. `import { PB } from '@dnb/eufemia/extensions/payment-card/utils/Types'`. Can be `PB.Default` or `PB.None`.",
      "type": "PB",
      "status": "required"
    }
  }
}
```

## List of designs

```json
{
  "props": {
    "defaultDesign": {
      "doc": "Default",
      "type": "object",
      "status": "optional"
    },
    "pluss": {
      "doc": "Pluss",
      "type": "object",
      "status": "optional"
    },
    "young": {
      "doc": "Ung",
      "type": "object",
      "status": "optional"
    },
    "myFirst": {
      "doc": "My first",
      "type": "object",
      "status": "optional"
    },
    "youth": {
      "doc": "Youth",
      "type": "object",
      "status": "optional"
    },
    "gold": {
      "doc": "Gold",
      "type": "object",
      "status": "optional"
    },
    "saga": {
      "doc": "Saga",
      "type": "object",
      "status": "optional"
    },
    "sagaPlatinum": {
      "doc": "Saga Platinum",
      "type": "object",
      "status": "optional"
    },
    "privateBanking": {
      "doc": "Private Banking",
      "type": "object",
      "status": "optional"
    },
    "mcBlack": {
      "doc": "Mastercard Black",
      "type": "object",
      "status": "optional"
    },
    "businessNoVisa": {
      "doc": "Bedriftskort BankAxept",
      "type": "object",
      "status": "optional"
    },
    "businessWithVisa": {
      "doc": "Bedriftskort Visa",
      "type": "object",
      "status": "optional"
    },
    "sbankenVisa": {
      "doc": "Sbanken Visa",
      "type": "object",
      "status": "optional"
    },
    "sbankenMastercard": {
      "doc": "Sbanken Mastercard",
      "type": "object",
      "status": "optional"
    }
  }
}
```

## Types

| Type             |
| ---------------- |
| **DNB**          |
| `Colored`        |
| `Sbanken`        |
| **Saga**         |
| `Gold`           |
| `Platinum`       |
| `None`           |
| **PB**           |
| `Default`        |
| `None`           |
| **Mastercard**   |
| `Default`        |
| `Dark`           |
| **ProductType**  |
| `Saga`           |
| `Pluss`          |
| `Intro`          |
| `Bedrift`        |
| `Business`       |
| `PrivateBanking` |
| `Corporate`      |
| `WorldElite`     |
| `None`           |
| **CardType**     |
| `Visa`           |
| `Mastercard`     |
| `None`           |
| **BankAxept**    |
| `White`          |
| `Black`          |
| `Gold`           |
| `Black20`        |
| `Gray`           |
| `GrayDark`       |
| **Visa**         |
| `Colored`        |
| `Platinum`       |
| **Status**       |
| `Expired`        |
| `Blocked`        |
| `Active`         |

## Card Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "PaymentCard.textBlocked": {
      "nb-NO": "Sperret",
      "en-GB": "Blocked",
      "sv-SE": "Spärrat",
      "da-DK": "Spærret"
    },
    "PaymentCard.textExpired": {
      "nb-NO": "Utløpt",
      "en-GB": "Expired",
      "sv-SE": "Utgånget",
      "da-DK": "Udløbet"
    },
    "PaymentCard.textNew": {
      "nb-NO": "Nytt",
      "en-GB": "New",
      "sv-SE": "Ny",
      "da-DK": "Nyt"
    },
    "PaymentCard.textNewOrder": {
      "nb-NO": "Bestilt",
      "en-GB": "Ordered",
      "sv-SE": "Beställd",
      "da-DK": "Bestilt"
    },
    "PaymentCard.textNotActive": {
      "nb-NO": "Inaktivt",
      "en-GB": "Inactive",
      "sv-SE": "Inaktiv",
      "da-DK": "Inaktivt"
    },
    "PaymentCard.textOrderInProcess": {
      "nb-NO": "På vei",
      "en-GB": "On the way",
      "sv-SE": "På väg",
      "da-DK": "På vej"
    },
    "PaymentCard.textRenewed": {
      "nb-NO": "Fornyes",
      "en-GB": "Renewed",
      "sv-SE": "Förnyat",
      "da-DK": "Fornyet"
    },
    "PaymentCard.textReplaced": {
      "nb-NO": "Erstattet",
      "en-GB": "Replaced",
      "sv-SE": "Ersatt",
      "da-DK": "Erstattet"
    },
    "PaymentCard.textUnknown": {
      "nb-NO": "Ukjent",
      "en-GB": "Unknown",
      "sv-SE": "Okänt",
      "da-DK": "Ukendt"
    }
  }
}
```
