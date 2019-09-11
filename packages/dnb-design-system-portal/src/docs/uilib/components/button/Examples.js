/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { bell_medium as Bell, question } from 'dnb-ui-lib/src/icons'

class Example extends PureComponent {
  clickHandler = () => {
    alert('You clicked a button with a click function attached to it')
  }
  render() {
    return (
      <Fragment>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Primary button with text only"
  on_click={() => {
    console.log('on_click')
  }}
  data-dnb-test="button-primary"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Secondary button with text only"
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-dnb-test="button-secondary"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Disabled primary button"
  disabled
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Disabled secondary button"
  variant="secondary"
  disabled
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Primary button with icon"
  icon="chevron_right"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Primary button with icon on left"
  icon_position="left"
  icon="chevron_left"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  icon_position="left"
  icon="chevron_left"
  data-dnb-test="button-tertiary"
/>
<Button
  variant="tertiary"
  text="With medium icon"
  icon="chevron_right"
  icon_size="medium"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Primary button with href"
  href="?no-cache=1"
  title="This is a link"
  icon_position="right"
  icon="chevron_right"
  data-dnb-test="button-anchor"
/>
<Button
  variant="secondary"
  text="Secondary button with href"
  href="?no-cache=1"
  title="This is a link"
  icon_position="left"
  icon="chevron_left"
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ Bell }}
          caption="Medium is equalent to 24, but responsive. To import custom icons, use: `import { bell_medium as Bell } from 'dnb-ui-lib/icons'`"
        >
          {/* @jsx */ `
<Button
  variant="signal"
  text="Signal Button"
  icon={Bell}
  data-dnb-test="button-signal"
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ Bell }}
          caption="Large Signal button with medium sized icon. To import custom icons, use: `import { bell_medium as Bell } from 'dnb-ui-lib/icons'`"
        >
          {/* @jsx */ `
<Button
  variant="signal"
  text="Large Signal Button"
  icon={<Bell />}
  size="large"
  icon_size="medium"
/>
          `}
        </ComponentBox>
        <ComponentBox scope={{ question }} caption="Button with Icon only">
          {/* @jsx */ `
<Button
  title="Disabled Icon only Button"
  icon="calendar"
  disabled
/>
<Button title="Button with Icon only" icon="calendar" />
<Button
  title="Small sized button with default Icon"
  icon="add"
  icon_size="default"
  size="small"
/>
<Button
  title="Default sized Button with medium Icon"
  icon="calendar"
  icon_size="medium"
  size="default"
/>
<Button
  title="Button with custom, Secondary Icon only"
  icon={question}
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
