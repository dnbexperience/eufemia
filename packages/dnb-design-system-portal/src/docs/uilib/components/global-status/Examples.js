/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="GlobalStatus displaying error status"
          data-dnb-test="global-status"
        >
          {/* @jsx */ `
<GlobalStatus
  title="Custom Title"
  text="Failure text"
  items={[
      {
        text:'List item',
        status_anchor_url: '/uilib/components/global-status',
      }
  ]}
  show="true"
  no_animation="true"
  autoscroll="false"
  id="demo-1"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="To showcase the automated coupling between **FormStatus** and **GlobalStatus**"
          useRender
        >
          {/* @jsx */ `
const InputWithError = () => {
  const [errorMessage, setErrorMessage] = React.useState(null)
  return (
    <Input
      label="Input:"
      placeholder="Write less than 5 chars and dismiss the focus to show the GlobalStatus ..."
      stretch
      status={errorMessage}
      on_blur={({ value }) => {
        setErrorMessage(value.length <= 4 ? 'With a message shown' : null)
      }}
      global_status_id="main-status"
    />
  )
}
render(
  <InputWithError />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="To showcase the custom **Update** and **Remove** posibility"
          noFragments={false}
        >
          {/* @jsx */ `
() => {
  const [count, toggleUpdateStatus] = React.useState(0)
  return (
    <>
      <GlobalStatus
        id="custom-status"
        autoscroll={false}
        on_hide={() => toggleUpdateStatus(0)}
      />
      <Button
        text={'Show step #' + count}
        on_click={() => {
          toggleUpdateStatus(count + 1)
          if (count >= 3) {
            toggleUpdateStatus(0)
          }
        }}
        top="small"
      />
      {count === 1 && (
        <>
          <GlobalStatus.Add
            id="custom-status"
            status_id="custom-id-1"
            title="New title"
            text="First long info text ..."
            item="Item from status #1"
            on_close={({ status_id }) => {
              console.log('on_close 1', status_id)
            }}
          />
          <GlobalStatus.Add
            id="custom-status"
            status_id="custom-id-2"
            text="Second long info text ..."
            item="Item from status #2"
            on_close={({ status_id }) => {
              console.log('on_close 2', status_id)
            }}
          />
        </>
      )}
      {count === 2 && (
        <GlobalStatus.Remove id="custom-status" status_id="custom-id-2" />
      )}
      {count === 3 && (
        <GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />
      )}
    </>
  )
}
          `}
        </ComponentBox>
        <ComponentBox
          caption="To showcase the grow and shrink (height) animation"
          noFragments={false}
        >
          {/* @jsx */ `
() => {
  const [showDemo, toggleShowDemo] = React.useState(false)
  return (
    <>
      <ToggleButton
        text={showDemo? 'Stop Demo': 'Show animation Demo'}
        checked={showDemo}
        variant="checkbox"
        on_change={({ checked }) => toggleShowDemo(checked)}
        bottom="small"
      />
      <GlobalStatus
        id="demo-3"
        title="Demo Animation"
        text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
        items={['Status text 1', 'Status text 2']}
        demo={showDemo}
        show={showDemo}
        autoscroll={false}
        delay={0}
        on_close={() => {
          toggleShowDemo(false)
        }}
      />
    </>
  )
}
          `}
        </ComponentBox>
        <ComponentBox caption="To showcase the scrolling. Some browsers (Safari, Edge) will need a polyfill like `smoothscroll-polyfill`">
          {/* @jsx */ `
<Button
  text="Scroll to main GlobalStatus"
  on_click={() => {
    GlobalStatus.Set({
      id: 'main-status',
      text:
        'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
    })
  }}
/>
           `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />

// <ComponentBox
//   caption="GlobalStatus displaying info status"
//   data-dnb-test="global-status-info"
// >
//   {`
// <GlobalStatus
// title="Custom Title"
// text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
// items={[
// 'Item text #1',
// <>Item text #2</>,
// {
// text:'Item text #3',
// status_id: '123',
// // status_anchor_text: ...,
// // status_anchor_url: ...,
// }
// ]}
// state="info"
// show="true"
// no_animation="true"
// autoscroll="false"
// id="demo-2"
// />
//   `}
// </ComponentBox>
