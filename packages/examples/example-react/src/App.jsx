/**
 * To showcase the usage of the dnb-ui-lib in React
 *
 */

import React, { PureComponent } from 'react'

// With this we get 100kb more in bundle size
// import { Button, Input, Icon } from 'dnb-ui-lib/components'
// import { H1, H2, P, Section } from 'dnb-ui-lib/elements'
// import { bell_medium as Bell } from 'dnb-ui-lib/icons'

// Better for Tree Shaking as webpack treeshaking only works with ES6 module syntax
import Icon from 'dnb-ui-lib/es/components/icon/Icon'
import Input from 'dnb-ui-lib/es/components/input/Input'
import Button from 'dnb-ui-lib/es/components/button/Button'
import H1 from 'dnb-ui-lib/es/elements/H1'
import H2 from 'dnb-ui-lib/es/elements/H2'
import P from 'dnb-ui-lib/es/elements/P'
import Section from 'dnb-ui-lib/es/elements/Section'
import Bell from 'dnb-ui-lib/icons/bell_medium'

export default class App extends PureComponent {
  state = { inputValue: null }
  handleClick = e => {
    console.log('handleClick', e)
  }
  handleValueChange = e => {
    const inputValue = e.value || (e.detail && e.detail.value) || ''
    console.log('handleValueChange', inputValue)
    this.setState({ inputValue })
  }
  render() {
    const { inputValue } = this.state
    return (
      <>
        <div className="dnb-core-style">
          <Section className="dnb-spacing" useSpacing>
            <H1>React Components</H1>
            <P>
              This is not for real world usage. But only to show the
              functionality of the dnb-ui-lib
            </P>
            <Input
              placeholder="Type someting ..."
              value={inputValue}
              on_change={this.handleValueChange}
            />
            <Button
              text="Custom Element with icon"
              icon="chevron_right"
              on_click={this.handleClick}
            />
          </Section>
          <Section className="dnb-spacing" useSpacing>
            <H2>H2</H2>
            <P>
              Show me an Icon <Icon icon={Bell} size="medium" />
            </P>
          </Section>
        </div>
      </>
    )
  }
}
