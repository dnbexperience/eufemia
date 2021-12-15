/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { car_1 as Car } from '@dnb/eufemia/src/icons'

export const TagDefault = () => (
  <ComponentBox data-visual-test="tag-default">
    {() => /* jsx */ `
      <Tag>Payment</Tag>
    `}
  </ComponentBox>
)

export const TagWithIcon = () => (
  <ComponentBox data-visual-test="tag-icon">
      {() => /* jsx */ `
        <Tag icon="calendar" text="Savings agreement"/>
      `}
  </ComponentBox>
)

export const TagWithSecondaryIcon = () => (
  <ComponentBox data-visual-test="tag-secondary-icon" scope={{ Car }}>
      {() => /* jsx */ `
        <Tag icon={Car} text="Vehicle"/>
      `}
  </ComponentBox>
)

