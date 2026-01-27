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
    "product_code": {
      "doc": "If product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.",
      "type": "string",
      "status": "required"
    },
    "card_number": {
      "doc": "Masked card number.",
      "type": "string",
      "status": "required"
    },
    "raw_data": {
      "doc": "Useful if you want to create custom cards. See Card data properties.",
      "type": "Various",
      "status": "optional"
    },
    "card_status": {
      "doc": "Use one of these: `active`, `not_active`, `new_order`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `order_in_process`, `unknown`. Defaults to `active`.",
      "type": [
        "active",
        "not_active",
        "blocked",
        "expired",
        "renewed",
        "replaced",
        "order_in_process",
        "unknown"
      ],
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.",
      "type": ["normal", "compact"],
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
      "type": "Union Type",
      "status": "required"
    },
    "productType": {
      "doc": "`import { ProductType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `ProductType.Saga`, `ProductType.Pluss`, `ProductType.Intro`, `ProductType.Business`, `ProductType.Bedrift`, `ProductType.PrivateBanking`, `ProductType.Corporate`, `ProductType.WorldElite` or `ProductType.None`.",
      "type": "Union Type",
      "status": "required"
    },
    "bankAxept": {
      "doc": "`import { BankAxeptType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `BankAxeptType.BankAxept`, `BankAxeptType.Credit` or `BankAxeptType.None`.",
      "type": "Union Type",
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
      "doc": "Css class. mainly to set background and color.",
      "type": "string",
      "status": "required"
    },
    "bankLogo": {
      "doc": "Union Type. import DNB from ./card/utils/Types to use. Can be `DNB.Colored('HexValue')`.",
      "type": "Union Type",
      "status": "required"
    },
    "visa": {
      "doc": "Union Type. import Visa from ./card/utils/Types to use. Can be `Visa.Colored('HexValue')` or `Visa.Platinum`.",
      "type": "Union Type",
      "status": "required"
    },
    "mastercard": {
      "doc": "Union Type. import Mastercard from ./card/utils/Types to use. Can be `Mastercard.Default` or `Mastercard.Dark`.",
      "type": "Union Type",
      "status": "required"
    },
    "bankAxept": {
      "doc": "Union Type. import BankAxept from ./card/utils/Types to use. Can be `BankAxept.White`, `BankAxept.Black`, `BankAxept.Gold`, `BankAxept.Black20` or `BankAxept.Gray`.",
      "type": "Union Type",
      "status": "required"
    },
    "saga": {
      "doc": "Union Type. import Saga from ./card/utils/Types to use. Can be `Saga.Gold`, `Saga.Platinum` or `Saga.None`.",
      "type": "Union Type",
      "status": "required"
    },
    "privateBanking": {
      "doc": "Union Type. import PB from ./card/utils/Types to use. Can be `PB.Default` or `PB.None`.",
      "type": "Union Type",
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
    "PaymentCard.text_blocked": {
      "nb-NO": "Sperret",
      "en-GB": "Blocked",
      "sv-SE": "Spärrat",
      "da-DK": "Spærret"
    },
    "PaymentCard.text_card_number": {
      "nb-NO": "Kortnummer",
      "en-GB": "Card number",
      "sv-SE": "Kortnummer",
      "da-DK": "Kortnummer"
    },
    "PaymentCard.text_expired": {
      "nb-NO": "Utløpt",
      "en-GB": "Expired",
      "sv-SE": "Utgånget",
      "da-DK": "Udløbet"
    },
    "PaymentCard.text_new": {
      "nb-NO": "Nytt",
      "en-GB": "New",
      "sv-SE": "Ny",
      "da-DK": "Nyt"
    },
    "PaymentCard.text_new_order": {
      "nb-NO": "Bestilt",
      "en-GB": "Ordered",
      "sv-SE": "Beställd",
      "da-DK": "Bestilt"
    },
    "PaymentCard.text_not_active": {
      "nb-NO": "Inaktivt",
      "en-GB": "Inactive",
      "sv-SE": "Inaktiv",
      "da-DK": "Inaktivt"
    },
    "PaymentCard.text_order_in_process": {
      "nb-NO": "På vei",
      "en-GB": "On the way",
      "sv-SE": "På väg",
      "da-DK": "På vej"
    },
    "PaymentCard.text_renewed": {
      "nb-NO": "Fornyes",
      "en-GB": "Renewed",
      "sv-SE": "Förnyat",
      "da-DK": "Fornyet"
    },
    "PaymentCard.text_replaced": {
      "nb-NO": "Erstattet",
      "en-GB": "Replaced",
      "sv-SE": "Ersatt",
      "da-DK": "Erstattet"
    },
    "PaymentCard.text_unknown": {
      "nb-NO": "Ukjent",
      "en-GB": "Unknown",
      "sv-SE": "Okänt",
      "da-DK": "Ukendt"
    }
  }
}
```
