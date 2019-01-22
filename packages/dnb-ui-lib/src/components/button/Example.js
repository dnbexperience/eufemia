/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Button from './Button'
import styled from '@emotion/styled'
import { bell_medium as Bell, question } from '../../../icons'

class Example extends PureComponent {
  clickHandler = () => {
    alert('You clicked a button with a click function attached to it')
  }
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <Button
            text="Primary button with text only"
            title="This is a button title"
            on_click={this.clickHandler}
            attributes={{
              'data-fake:on_click': 'clickme()'
            }}
          />
        </div>
        <div className="example-box">
          <Button
            text="Secondary button with text only"
            variant="secondary"
            title="This is a button title"
          />
        </div>
        <div className="example-box">
          <Button
            text="Disabled primary button"
            title="This is a button title"
            disabled
          />
        </div>
        <div className="example-box">
          <Button
            text="Disabled secondary button"
            variant="secondary"
            title="This is a button title"
            disabled
          />
        </div>
        <div className="example-box">
          <Button
            text="Primary button with icon"
            title="This is a button title"
            icon="chevron-right"
          />
        </div>
        <div className="example-box">
          <Button
            text="Primary button with icon on left"
            title="This is a button title"
            icon_position="left"
            icon="chevron-left"
          />
        </div>
        <div className="example-box">
          <Button
            variant="tertiary"
            text="Tertiary button with icon on left"
            title="This is a button title"
            icon_position="left"
            icon="chevron-left"
          />
        </div>
        <div className="example-box">
          <Button
            variant="tertiary"
            text="Tertiary button with icon on left"
            title="This is a button title"
            icon_position="left"
            icon="chevron-left"
            disabled
          />
        </div>
        <div className="example-box">
          <Button
            text="Primary button with href"
            href="?no-cache=1"
            title="This is a link"
            icon_position="right"
            icon="chevron-right"
          />
        </div>
        <div className="example-box">
          <Button
            title="Disabled Icon only Button"
            icon="calendar"
            disabled
          />
          <Button title="Button with Icon only" icon="calendar" />
          <Button
            title="Medium Button with Icon only"
            icon="calendar"
            icon_size="medium"
            size="medium"
          />
          <Button
            title="Button with custom, Secondary Icon only"
            icon={question}
          />
          <p className="example-caption">Button with Icon only</p>
        </div>
        <div className="example-box">
          <Button
            variant="signal"
            text="Signal Button (large size)"
            size="large"
            icon={Bell}
            icon_size="medium" // medium is equalent to 24, but responsive
          />
        </div>
        <div className="example-box">
          <Button
            variant="signal"
            text="Disabled Signal Button"
            icon={<Bell />}
            icon_size="medium"
            disabled
          />
        </div>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)
