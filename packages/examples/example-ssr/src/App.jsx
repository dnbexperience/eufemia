/**
 * To showcase the usage of the dnb-ui-lib in React SSR
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PrerenderedComponent } from 'react-prerendered-component'

// With this we get 100kb more in bundle size
import { Button, Input, Icon, Section } from 'dnb-ui-lib/components'
import { H1, H2, P } from 'dnb-ui-lib/elements'
import { bell_medium as Bell } from 'dnb-ui-lib/icons'

export default class App extends PureComponent {
  static propTypes = {
    count: PropTypes.number
  }
  static defaultProps = {
    count: 1
  }
  state = { inputValue: null, count: 0, restored: false }
  constructor(props) {
    super(props)
    this.state.count = props.count
  }
  handleClick = e => {
    console.log('handleClick', e)
  }
  handleValueChange = e => {
    const inputValue = e.value || (e.detail && e.detail.value) || ''
    console.log('handleValueChange', inputValue)
    this.setState({ inputValue })
  }
  restore = (element, state) => {
    this.setState({ ...state, restored: true })
  }
  render() {
    const { inputValue } = this.state
    return (
      <PrerenderedComponent
        store={this.props}
        restore={this.restore}
        live={this.state.restored}
      >
        <div className="dnb-core-style">
          <Section className="dnb-spacing" spacing="true">
            <H1>React Components {this.state.count}</H1>
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
          <Section className="dnb-spacing" spacing="true">
            <H2>H2</H2>
            <P>
              Show me an Icon <Icon icon={Bell} size="medium" />
            </P>
          </Section>
        </div>
      </PrerenderedComponent>
    )
  }
}
