/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
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
  data-dnb-test="button-primary"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Secondary button with text only"
  variant="secondary"
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
  disabled
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
        <ComponentBox
          scope={{ Bell }}
          caption="Medium is equalent to 24, but responsive"
        >
          {/* @jsx */ `
<Button
  variant="signal"
  text="Signal Button (large size)"
  size="large"
  icon={Bell}
  icon_size="medium"
/>
          `}
        </ComponentBox>
        <ComponentBox scope={{ Bell }}>
          {/* @jsx */ `
<Button
  variant="signal"
  text="Disabled Signal Button"
  icon={<Bell />}
  icon_size="medium"
  disabled
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
