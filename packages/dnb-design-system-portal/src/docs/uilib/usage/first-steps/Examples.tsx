import React from 'react'

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Button } from '@dnb/eufemia/src'

export const BasicButtonsExample = () => (
  <ComponentBox>
    <Button text="Basic Button" />
  </ComponentBox>
)

export const EventsExample = () => (
  <ComponentBox>
    <Button text="Button" onClick={() => console.log('click')} />
  </ComponentBox>
)

export const PrimaryButtonExample = () => (
  <ComponentBox hideCode hideToolbar>
    <Button text="Primary Button" />
  </ComponentBox>
)
