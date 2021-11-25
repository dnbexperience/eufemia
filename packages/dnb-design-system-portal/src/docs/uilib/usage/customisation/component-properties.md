---
title: 'Component Properties'
order: 1
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons/secondary_icons'

# Component Properties

Every [Component](/uilib/components) has its own `properties` to make them work for a variety of cases. You may have a look at the table describing all the possibilities. Check out for example the [Button Properties](/uilib/components/button/properties).

## Naming

Both the properties- and event names are using **snake case** to support a universal [naming convention](/contribute/naming), with a background and requirement on supporting [Web Components](/uilib/usage/first-steps/web-components).

## Large Buttons & Icons

Below are some examples. You can even modify them right away in the Browser.

<ComponentBox>
{`
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
`}
</ComponentBox>

## Extended example

<ComponentBox scope={{hamburgerIcon}} useRender>
{`
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

## Web Components and properties

> What if a property has to change at runtime?

Changing a property (`props`) at runtime is a common thing in React. But also `@dnb/eufemia` web components support `prop` changes.
Keep in mind that not all components are tested to the last detail.
So, if you come over some special use cases, please contribute back and make a pull request.

<ComponentBox useRender>
{`
const Component = () => {
  const time = new Date().toLocaleTimeString()
  React.useEffect(() => {
    Button.enableWebComponent()
  }, [])
  return (
    <dnb-input
      label="Web Component property updates:"
      value={time}
    ></dnb-input>
  )
}
const RenderHelper = () => {
  React.useEffect(() => {
    const timer = setInterval(() => render(<RenderHelper />), 1e3)
    return () => clearInterval(timer)
  }, [])
  return <Component />
}
render(<RenderHelper />)
`}
</ComponentBox>
