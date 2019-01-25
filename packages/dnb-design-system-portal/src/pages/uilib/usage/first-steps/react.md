---
title: 'React'
draft: false
order: 5
---

import ComponentBox from 'Tags/ComponentBox'
import { Button, IconPrimary } from 'dnb-ui-lib/src'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons'

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

## Extended example

<ComponentBox scope={{hamburgerIcon}} noInline={true}>
{`
// import { Button, Icon } from 'dnb-ui-lib'
// import { hamburger as hamburgerIcon } from 'dnb-ui-lib/icons/secondary_icons'
const Wrapper = styled.div\`
  .dnb-button {
    --button-width: 4rem;
    --button-height: 4rem;
    --button-border-radius: 2rem;
    svg {
      color: fuchsia;
    }
  }
\`
const myHandler = () => alert('Hello')
render(
  <Wrapper>
    <Button
      variant="secondary"
      icon={hamburgerIcon}
      size="default"
      on_click={myHandler}
    />
    <Button
      variant="secondary"
      size="default"
      on_click={myHandler}
    >
      <Icon icon={hamburgerIcon} />
    </Button>
  </Wrapper>
)
`}
</ComponentBox>
