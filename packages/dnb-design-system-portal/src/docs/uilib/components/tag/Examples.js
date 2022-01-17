/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  funds as Funds,
  stocks as Stocks,
  equities_and_mutual_funds as Equities,
  cat as Cat,
  horse as Horse,
  dog as Dog,
  send as Send,
} from '@dnb/eufemia/src/icons'

export const TagDefault = () => (
  <ComponentBox data-visual-test="tag-default">
    {() => /* jsx */ `
<Tag.Group label="Payments:">
  <Tag>Payment</Tag>
</Tag.Group>
`}
  </ComponentBox>
)

export const TagWithIcon = () => (
  <ComponentBox data-visual-test="tag-icon">
    {() => /* jsx */ `
<Tag.Group label="Agreements:">
  <Tag icon="calendar" text="Savings agreement"/>
</Tag.Group>
`}
  </ComponentBox>
)

export const TagWithSecondaryIcon = () => (
  <ComponentBox
    data-visual-test="tag-secondary-icon"
    scope={{ Funds, Stocks, Equities }}
  >
    {() => /* jsx */ `
<Tag.Group label="Investments:">
  <Tag icon={Funds} text="Funds" right/>
  <Tag icon={Stocks} text="Stocks" right/>
  <Tag icon={Equities} text="Equities" right/>
</Tag.Group>
`}
  </ComponentBox>
)

export const TagClickable = () => (
  <ComponentBox data-visual-test="tag-clickable" scope={{ Send }}>
    {() => /* jsx */ `
<Tag icon={Send} text="Send" onClick={() => { console.log("I was sent!") }}/>
`}
  </ComponentBox>
)

export const TagGroupWithData = () => (
  <ComponentBox
    data-visual-test="tag-group-with-data"
    scope={{ Cat, Horse, Dog }}
  >
    {() => /* jsx */ `
<Tag.Group label="Animals:" data={[
  {
    icon: Cat,
    text: 'Cat',
  },
  {
    icon: Horse,
    text: 'Horse',
  },
  {
    icon: Dog,
    text: 'Dog',
  },
]}/>
`}
  </ComponentBox>
)
