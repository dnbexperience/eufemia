/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/inlineTags/ComponentBox'
import { bell_medium as Bell, question } from 'dnb-ui-lib/src/icons'

class Example extends PureComponent {
  clickHandler = () => {
    alert('You clicked a button with a click function attached to it')
  }
  render() {
    return (
      <Fragment>
        <ComponentBox>
          {`
<Button
  text="Primary button with text only"
  title="This is a button title"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  text="Secondary button with text only"
  variant="secondary"
  title="This is a button title"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  text="Disabled primary button"
  title="This is a button title"
  disabled
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  text="Disabled secondary button"
  variant="secondary"
  title="This is a button title"
  disabled
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  text="Primary button with icon"
  title="This is a button title"
  icon="chevron_right"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  text="Primary button with icon on left"
  title="This is a button title"
  icon_position="left"
  icon="chevron_left"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  title="This is a button title"
  icon_position="left"
  icon="chevron_left"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  title="This is a button title"
  icon_position="left"
  icon="chevron_left"
  disabled
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {`
<>
<Button
  text="Primary button with href"
  href="?no-cache=1"
  title="This is a link"
  icon_position="right"
  icon="chevron_right"
/>
<Button
  variant="secondary"
  text="Secondary button with href"
  href="?no-cache=1"
  title="This is a link"
  icon_position="left"
  icon="chevron_left"
/>
</>
          `}
        </ComponentBox>
        <ComponentBox scope={{ question }}>
          {`
<>
  <Button
    title="Disabled Icon only Button"
    icon="calendar"
    disabled
  />
  <Button title="Button with Icon only" icon="calendar" />
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
  <p className="example-caption">Button with Icon only</p>
</>
          `}
        </ComponentBox>
        <ComponentBox scope={{ Bell }}>
          {`
<Button
  variant="signal"
  text="Signal Button (large size)"
  size="large"
  icon={Bell}
  icon_size="medium" // medium is equalent to 24, but responsive
/>
          `}
        </ComponentBox>
        <ComponentBox scope={{ Bell }}>
          {`
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
