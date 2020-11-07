---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import PaymentCard, { getCardData } from 'dnb-ui-lib/src/patterns/payment-card'

## Demos

### Basic example

<ComponentBox scope={{PaymentCard}} data-visual-test="payment-card-basic">
	{/* @jsx */ `
<PaymentCard product_code="DNB" card_number="************1337" />
	`}
</ComponentBox>

### Demo cards

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
];
render(demoCards.map(product_code => {
	const cardData = getCardData(product_code);
	return (
	<div key={product_code}>
		<h3>{cardData.cardDesign.name}</h3>
		<PaymentCard product_code={product_code} card_number="************1337" />
	</div>
	);
}))
	`}
</ComponentBox>
