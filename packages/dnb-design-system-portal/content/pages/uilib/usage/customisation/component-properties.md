---
title: 'Component Properties'
draft: false
order: 6
---

import 'dnb-ui-lib/src/web-components'
import ComponentBox from 'Tags/ComponentBox'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons'

# Component Properties

Every [Component](/uilib/components) has its own `properties` to make them work for a variety of cases. You may have a look at the table describing all the possibilities. Check out for example the [Button Properties](/uilib/components/button#info).

Below are some examples. You can even modify them right away in the Browser.

## Large Buttons & Icons

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

Changing a property (`props`) at runtime is a common thing in React. But also `dnb-ui-lib` web components support `prop` changes.
Keep in mind that not all components are tested to the last detail.
So, if you come over some special use cases, please contribute back and make a pull request.

<ComponentBox useRender>
{`
const Component = () => {
  const time = new Date().toLocaleTimeString()
  return (
    <>
      <dnb-form-label for_id="form-input">
        Web Component property updates
      </dnb-form-label>
      <dnb-input id="form-input" value={time} />
    </>
  )
}
const RenderHelper = () => {
  useEffect(() => {
    const timer = setInterval(() => render(<RenderHelper />), 1e3)
    return () => clearInterval(timer)
  }, [])
  return <Component />
}
render(<RenderHelper />)
`}
</ComponentBox>
