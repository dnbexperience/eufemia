---
title: 'React'
draft: false
order: 5
---

import ComponentBox from 'Tags/ComponentBox'
import { Button, IconPrimary } from 'dnb-ui-lib/src'
import { ButtonEventExample } from 'Pages/uilib/usage/first-steps/examples/react-examples'

# React JS for the web

The most basic way to use the `dnb-ui-lib` is like this:

### Basic Buttons

<ComponentBox>
{`
<Button text="Basic Button" />
`}
</ComponentBox>

### Large Buttons & Icons

<ComponentBox>
{`
<>
  <Button
    variant="secondary"
    text="Secondary Button"
    icon="chevron_right_medium"
    size="large"
  />
  <Button
    icon="chevron_right"
    icon_size="medium"
    size="large"
  />
</>
`}
</ComponentBox>

<div className="example-box">
  <Button variant="secondary" text="Secondary Button" icon="chevron_right_medium" size="large"  />
  <Button icon="chevron_right" icon_size="medium" size="large" />
</div>

## Extended example

```js
import { Button } from 'dnb-ui-lib'

const MyComponent = props => (
  <Button text="Custom Element" variant="tertiary" {...props} />
)
```

## Event example

```js
import React from 'react'
import { Button, Icon } from 'dnb-ui-lib'
import { hamburger_medium as hamburgerIcon } from 'dnb-ui-lib/icons/secondary_icons_medium'

const onClickHandler = event => {
  console.log('onClickHandler', event)
}

export const MyComponent = () => {
  return (
    <Button on_click={onClickHandler}>
      <Icon icon={hamburgerIcon} />
    </Button>
  )
}
```

<div className="example-box">
  <ButtonEventExample />
</div>
