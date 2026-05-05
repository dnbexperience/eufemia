---

---

## Helpers

### formatCardNumber

Formats card number.
Will by default limit the number of characters in the card number to be of 8 characters.
Can be specified by using the `digits` param.

```js
import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card'
// or import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card/PaymentCard'

formatCardNumber(cardNumber: string, digits*: number) // returns string

formatCardNumber('************1337') // returns **** 1337
formatCardNumber('************1337', 5) // returns * 1337
```

#### \* Optional values (defaults)

- length = _8_

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
      "type": [
        "\"normal\"",
        "\"compact\""
      ],
      "status": "optional"
    },
    "digits": {
      "doc": "Will use 8 digits if none are specified.",
      "type": [
        "string",
        "number"
      ],
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
      "type": [
        "string",
        "object"
      ],
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
      "doc": "Discriminated union with `tag` property. `import { DNB } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `DNB.Colored('HexValue')` or `DNB.Sbanken('HexValue')`.",
      "type": "DNB",
      "status": "required"
    },
    "visa": {
      "doc": "Discriminated union with `tag` property. `import { Visa } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `Visa.Colored('HexValue')` or `Visa.Platinum`.",
      "type": "Visa",
      "status": "required"
    },
    "mastercard": {
      "doc": "Discriminated union with `tag` property. `import { Mastercard } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `Mastercard.Default` or `Mastercard.Dark`.",
      "type": "Mastercard",
      "status": "required"
    },
    "bankAxept": {
      "doc": "Discriminated union with `tag` property. `import { BankAxept } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `BankAxept.White`, `BankAxept.Black`, `BankAxept.Gold`, `BankAxept.Black20` or `BankAxept.Gray`.",
      "type": "BankAxept",
      "status": "required"
    },
    "saga": {
      "doc": "Discriminated union with `tag` property. `import { Saga } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `Saga.Gold`, `Saga.Platinum` or `Saga.None`.",
      "type": "Saga",
      "status": "required"
    },
    "privateBanking": {
      "doc": "Discriminated union with `tag` property. `import { PB } from '@dnb/eufemia/extensions/payment-card/utils/types'`. Can be `PB.Default` or `PB.None`.",
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
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
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
