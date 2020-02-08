/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { createBrowserHistory } from 'history'

class Example extends PureComponent {
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
          title="StepIndicator with navigation. Every visited step can be clicked."
          data-dnb-test="step-indicator-buttons"
          scope={{ onChangeHandler, active_url }}
          hideSyntaxButton
        >
          {`
<StepIndicator
  use_navigation="true"
  active_item={1}
  on_change={({ currentItem }) => {
    console.log('on_change', currentItem)
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ currentItem }) =>
        console.log(currentItem)
    },
    {
      title: 'Oppsummering',
    }
  ]}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="StepIndicator with urls, for visited steps only"
          data-dnb-test="step-indicator-urls"
          scope={{ onChangeHandler, active_url }}
          hideSyntaxButton
        >
          {`
<StepIndicator
  active_item="0"
  active_url={active_url}
  data={[
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
  ]}
  on_change={onChangeHandler}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Default StepIndicator with no navigation"
          data-dnb-test="step-indicator-default"
        >
          {/* @jsx */ `
<StepIndicator
  data={[
    {
      title: 'Om din nye bolig'
    },
    {
      title: 'Ditt lån og egenkapital'
    },
    {
      title: 'Oppsummering',
      is_current: true
    }
  ]}
/>
            `}
        </ComponentBox>
        <ComponentBox title="Default StepIndicator with strings only">
          {/* @jsx */ `
<StepIndicator
  active_item="1"
  data={[
    'Om din nye bolig',
    'Ditt lån og egenkapital',
    'Oppsummering'
  ]}
/>
            `}
        </ComponentBox>
        <ComponentBox
          title="StepIndicator with custom renderer."
          scope={{ onChangeHandler, active_url }}
          hideSyntaxButton
        >
          {`
<StepIndicator
  use_navigation
  active_item={1}
  on_change={({ currentItem }) => {
    console.log('on_change', currentItem)
  }}
  on_item_render={({ StepItem }) => {
    return (
      <StepItem
        onClick={e => console.log(e)}
      />
    )
  }}
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
      on_click: ({ currentItem }) =>
        console.log(currentItem),
      on_render: ({ StepItem, props, params }) => (
        <StepItem
          onClick={e => console.log(e)}
        />
      )
    },
    {
      title: 'Oppsummering',
      /*
        We can also overwrite the states
        is_active: true
        is_current: true
      */
    }
  ]}
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
