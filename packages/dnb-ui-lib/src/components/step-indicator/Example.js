/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import StepIndicator from './StepIndicator'
import createHistory from 'history/createBrowserHistory'

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
      this.history = createHistory()
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
    return (
      <Fragment>
        <div className="example-box">
          <StepIndicator
            data-dnb-test="step-indicator"
            active_item="2"
            active_url={this.state.active_url}
            data={dataBlob}
            on_change={this.onChangeHandler}
          />
          <p className="example-caption">
            StepIndicator with urls, for visited steps only
          </p>
        </div>
        <div className="example-box">
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
          <p className="example-caption">StepIndicator with no urls</p>
        </div>
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
