/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'
import { createBrowserHistory } from 'history'

class Example extends PureComponent {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h4>Data Structure</h4>
        <CodeRenderer language="json">{dataBlob}</CodeRenderer>
      </Fragment>
    )
  }
  state = {
    active_url: null
  }
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.history = createBrowserHistory()
      this.state = {
        active_url: this.history.location.search
      }
    }
  }
  componentDidMount() {
    this.unlisten =
      this.history &&
      this.history.listen(({ search: active_url }) => {
        this.setState({
          active_url
        })
      })
  }
  componentWillUnmount() {
    if (this.unlisten) this.unlisten()
  }
  onChangeHandler = e => {
    e.event.preventDefault()
    this.history && this.history.push(e.item.url)
  }
  render() {
    const { active_url } = this.state
    const onChangeHandler = this.onChangeHandler
    return (
      <Fragment>
        <ComponentBox
          caption="StepIndicator with urls, for visited steps only"
          data-dnb-test="step-indicator"
          scope={{ onChangeHandler, active_url }}
          useRender
          hideSyntaxButton
        >
          {/* @jsx */ `
const data = [
  {
    title: 'Om din nye bolig',
    url: '?a'
  },
  {
    title: 'Ditt lån og egenkapital',
    url: '?b'
  },
  {
    title: 'Oppsummering',
    url: '?c',
    url_future: ''
  }
]
render(
  <StepIndicator
    active_item="2"
    active_url={active_url}
    data={data}
    on_change={onChangeHandler}
  />
)
          `}
        </ComponentBox>
        <ComponentBox caption="StepIndicator with no urls">
          {/* @jsx */ `
<StepIndicator
  active_item="3"
  data={[
    {
      title: 'Om din nye bolig'
    },
    {
      title: 'Ditt lån og egenkapital'
    },
    {
      title: 'Oppsummering'
    }
  ]}
/>
            `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const data = [
  {
    title: 'Om din nye bolig',
    url: '?a'
  },
  {
    title: 'Ditt lån og egenkapital',
    url: '?b'
  },
  {
    title: 'Oppsummering',
    url: '?c',
    url_future: ''
  }
]
const dataBlob = JSON.stringify(data, null, 2)

export { Example }
export default () => <Example />
