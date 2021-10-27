/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export const GlobalStatusError = () => (
  <ComponentBox data-visual-test="global-status">
    {() => /* jsx */ `
<GlobalStatus
  title="Custom Title"
  text="Failure text"
  items={[
      {
        text:'List item',
        status_anchor_url: '/uilib/components/global-status',
        status_anchor_label: 'eksempel',
      }
  ]}
  show="true"
  autoscroll="false"
  no_animation="true"
  omit_set_focus="true"
  id="demo-1"
/>
`}
  </ComponentBox>
)

export const GlobalStatusInfo = () => (
  <ComponentBox data-visual-test="global-status-info">
    {() => /* jsx */ `
<GlobalStatus
  state="info"
  title="Custom info title ..."
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  items={['Status text 1', 'Status text 2']}
  show="true"
  autoscroll="false"
  no_animation="true"
  omit_set_focus="true"
  id="demo-4"
/>
`}
  </ComponentBox>
)

export const GlobalStatusCoupling = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
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
)

export const GlobalStatusAddRemoveItems = () => (
  <ComponentBox noFragments={false} hideCode>
    {() => /* jsx */ `
() => {
  const [count, toggleUpdateStatus] = React.useState(0)
  return (
    <>
      <GlobalStatus
        id="custom-status"
        autoscroll={false}
        on_close={() => toggleUpdateStatus(0)}
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
)

export const GlobalStatusScrolling = () => (
  <ComponentBox hideCode>
    {() => /* jsx */ `
<Button
  text="Scroll to main GlobalStatus"
  on_click={() => {
    GlobalStatus.Update({
      id: 'main-status',
      text:
        'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
    })
  }}
/>
`}
  </ComponentBox>
)

export const GlobalStatusUpdate = () => (
  <ComponentBox useRender hideCode>
    {() => /* jsx */ `
const Context = React.createContext()

const UpdateDemo = () => {
  const [errorA, setErrorA] = React.useState()
  const [errorB, setErrorB] = React.useState()

  const [isVisible, setVisibility] = React.useState(false)

  return (
    <Context.Provider
      value={{
        errorA,
        errorB,
        setErrorA,
        setErrorB,
        isVisible,
        setVisibility
      }}
    >
      <UpdateDemoStatus />
      <UpdateDemoTools />
    </Context.Provider>
  )
}

const UpdateDemoStatus = () => {
  const { errorA, errorB, setErrorA, setErrorB } = React.useContext(
    Context
  )

  return (
    <>
      <GlobalStatus
        title="Custom Title"
        text="Failure text"
        id="demo-2"
      />
      <Input
        top
        right
        label="Label A:"
        placeholder="Placeholder A"
        status={errorA}
        global_status_id="demo-2"
        on_change={({ value }) => {
          setErrorA(value)
        }}
      />
      <Input
        top
        label="Label B:"
        placeholder="Placeholder B"
        status={errorB}
        global_status_id="demo-2"
        on_change={({ value }) => {
          setErrorB(value)
        }}
      />
    </>
  )
}

const UpdateDemoTools = () => {
  const {
    errorA,
    errorB,
    setErrorA,
    setErrorB,
    isVisible,
    setVisibility
  } = React.useContext(Context)

// Only to demonstrate the usage of an interceptor situation
  const inst = React.useRef()
  React.useEffect(() => {
    if (!inst.current) {
      inst.current = GlobalStatus.create({
        id: 'demo-2',
        title: 'New Title',
        text: 'New Text',
        status_id: 'custom-item',
        show: false
      })

      inst.current.update({
        on_show: () => {
          console.log('on_show')
          if (!isVisible) {
            setVisibility(true)
          }
        },
        on_hide: () => {
          console.log('on_hide')
          setVisibility(false)
        },
        on_close: () => {
          console.log('on_close')
          setVisibility(false)
        }
      })
    }

    inst.current.update({
      show: isVisible
    })

  }, [isVisible])
  React.useEffect(() => () => inst.current.remove(), [])

  return (
    <Section top spacing style_type="divider">
      <ToggleButton
        text="Toggle"
        variant="checkbox"
        right
        checked={isVisible}
        on_change={({ checked }) => {
          setVisibility(checked)
        }}
      />
      <Button
        text="Reset"
        variant="tertiary"
        icon="reset"
        disabled={!(errorA || errorB)}
        on_click={() => {
          setErrorA(null)
          setErrorB(null)
        }}
      />
    </Section>
  )
}

render(<UpdateDemo />)
`}
  </ComponentBox>
)
