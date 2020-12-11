---
showTabs: true
---

## Description

The PaymentCard component is a dynamic defined visual component imitate a physical payment card. It exists as an independent extension to Eufmeia.

How to use it:

1. First, define your desired look and design.
2. And import and include it in your application:

```jsx
import 'dnb-ui-lib/patterns/payment-card/style'
import PaymentCard, { getCardData } from 'dnb-ui-lib/patterns/payment-card'

render(<PaymentCard product_code="..." />)
```

Resources:

- [Figma design](https://www.figma.com/file/j0ASRTZKfbAt0uSD4milex/Cards?node-id=0%3A1)
- [Confluence specifications](https://confluence.tech.dnb.no/pages/viewpage.action?spaceKey=PMDT&title=Cards+mapping)
- [Kortprodukter med egenskaper](http://team.erf01.net/sites/8974/Shared%20Documents/Kortprodukter_med_egenskaper.pdf)

Initial development by _Sindre M. Teigland_.
