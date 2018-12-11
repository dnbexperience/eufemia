/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Button from './Button'
import styled from 'react-emotion'
import { bell_medium as Bell, question } from '../../../icons'

class Example extends PureComponent {
  clickHandler = () => {
    alert('You clicked a button with a click function attached to it')
  }
  render() {
    return (
      <Fragment>
        <Button
          text="Primary button with text only"
          title="This is a button title"
          on_click={this.clickHandler}
          attributes={{
            'data-fake:on_click': 'clickme()'
          }}
        />
        <Button
          text="Secondary button with text only"
          variant="secondary"
          title="This is a button title"
        />
        <Button
          text="Disabled primary button"
          title="This is a button title"
          disabled
        />
        <Button
          text="Disabled secondary button"
          variant="secondary"
          title="This is a button title"
          disabled
        />
        <Button
          text="Primary button with icon"
          title="This is a button title"
          icon="chevron-right"
        />
        <Button
          text="Primary button with icon on left"
          title="This is a button title"
          icon_position="left"
          icon="chevron-left"
        />
        <Button
          variant="tertiary"
          text="Tertiary button with icon on left"
          title="This is a button title"
          icon_position="left"
          icon="chevron-left"
        />
        <Button
          variant="tertiary"
          text="Tertiary button with icon on left"
          title="This is a button title"
          icon_position="left"
          icon="chevron-left"
          disabled
        />
        <Button
          text="Primary button with href"
          href="?no-cache=1"
          title="This is a link"
          icon_position="right"
          icon="chevron-right"
        />
        <Button title="Button with Icon only" icon={question} />
        <Button title="Button with Icon only" icon="calendar" />
        <Button
          variant="signal"
          text="Signal Button (large size)"
          size="large"
          icon={Bell}
          icon_size="medium"
          // icon_size="24" // medium is equalent to 24px, but responsive
        />
        <Button
          variant="signal"
          text="Disabled Signal Button"
          icon={<Bell width="16" />} // Do not hardcode the size like here!
          icon_size="default" // Rather use the "icon_size" prop
          disabled
        />
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-button {
    margin: 1rem 0.2rem;
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)
