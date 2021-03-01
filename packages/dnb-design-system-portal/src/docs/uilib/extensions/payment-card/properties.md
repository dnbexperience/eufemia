---
showTabs: true
---

## Card Properties

| Properties                                  | Description                                                                                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product_code`                              | _(mandatory)_ if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used. |
| `raw_data`                                  | _(optional)_ useful if you want to create custom cards. See Card data properties.                                                                   |
| `card_status`                               | _(optional)_ use one of these: `active`, `blocked`, `expired`. Defaults to `active`.                                                                |
| `variant`                                   | _(optional)_ defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.                                                 |
| `digits`                                    | _(optional)_ will use 8 digits if none are specified.                                                                                               |
| `card_number`                               | _(optional)_ masked card number.                                                                                                                    |
| `locale`                                    | _(optional)_ use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.                                                                              |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                               |

## Card Data

| Properties    | Type         | Description                                                                                                                                                                                                       |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productCode` | `string`     | _(mandatory)_ product code for the given card.                                                                                                                                                                    |
| `productName` | `string`     | _(mandatory)_ product name. Can be blank.                                                                                                                                                                         |
| `displayName` | `string`     | _(mandatory)_ the visible product name. Can be empty.                                                                                                                                                             |
| `cardDesign`  | `object`     | _(mandatory)_ object that describes the style properties of the card. can be imported from `@dnb/eufemia/extensions/payment-card/utils/CardDesigns` (see available designs below) or a custom one can be created. |
| `cardType`    | `Union Type` | _(mandatory)_ import CardType from `@dnb/eufemia/extensions/payment-card/utils/Types` to use. Can be CardType.Visa, CardType.Mastercard or CardType.None                                                          |
| `productType` | `Union Type` | _(mandatory)_ import ProductType from `@dnb/eufemia/extensions/payment-card/utils/Types` to use. Can be ProductType.BankAxept, ProductType.Saga, ProductType.PrivateBanking or ProductType.None                   |

## Card Design

| Properties       | Type         | Description                                                                                                                                                                  |
| ---------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | `string`     | _(mandatory)_ string Name of design                                                                                                                                          |
| `cardStyle`      | `string`     | _(mandatory)_ css class. mainly to set background and color                                                                                                                  |
| `bankLogo`       | `Union Type` | _(mandatory)_ Union Type. import DNB from ./card/utils/Types to use. Can be DNB.Colored('HexValue') or DNB.Metalic                                                           |
| `visa`           | `Union Type` | _(mandatory)_ Union Type. import Visa from ./card/utils/Types to use. Can be Visa.Colored('HexValue') or Visa.Metalic                                                        |
| `mastercard`     | `Union Type` | _(mandatory)_ Union Type. import Mastercard from ./card/utils/Types to use. Can be Mastercard.Default, Mastercard.DefaultWhite Mastercard.Metalic or Mastercard.MetalicBlack |
| `bankAxept`      | `Union Type` | _(mandatory)_ Union Type. import BankAxept from ./card/utils/Types to use. Can be BankAxept.White or BankAxept.Black                                                         |
| `saga`           | `Union Type` | _(mandatory)_ Union Type. import Saga from ./card/utils/Types to use. Can be Saga.Gold, Saga.Platinum, Saga.VisaPlatinum, or Saga.None                                       |
| `privateBanking` | `Union Type` | _(mandatory)_ Union Type. import PB from ./card/utils/Types to use. Can be PB.Default, PB.Platinum or PB.None                                                                |

## List of designs

| Properties         | Type     | Description            |
| ------------------ | -------- | ---------------------- |
| `defaultDesign`    | `object` | Default                |
| `white`            | `object` | White                  |
| `myFirst`          | `object` | My first               |
| `youth`            | `object` | Youth                  |
| `silver`           | `object` | Silver                 |
| `gold`             | `object` | Gold                   |
| `saga`             | `object` | Saga                   |
| `sagaPlatinum`     | `object` | Saga platinum          |
| `privateBanking`   | `object` | Private Banking        |
| `mcBlack`          | `object` | Mastercard Black       |
| `businessNoVisa`   | `object` | Bedriftskort BankAxept |
| `businessWithVisa` | `object` | Bedriftskort Visa      |

## Types

| Type             |
| ---------------- |
| **DNB**          |
| `Colored`        |
| `Metalic`        |
| **Saga**         |
| `Gold`           |
| `Platinum`       |
| `VisaPlatinum`   |
| `None`           |
| **PB**           |
| `Default`        |
| `Platinum`       |
| `None`           |
| **Mastercard**   |
| `Default`        |
| `DefaultWhite`   |
| `Metalic`        |
| `BlackMetalic`   |
| **ProductType**  |
| `BankAxept`      |
| `Saga`           |
| `PrivateBanking` |
| `None`           |
| **CardType**     |
| `Visa`           |
| `Mastercard`     |
| `None`           |
| **BankAxept**    |
| `White`          |
| `Black`          |
| **Visa**         |
| `Colored`        |
| `Metalic`        |
| **Status**       |
| `Expired`        |
| `Blocked`        |
| `Active`         |
