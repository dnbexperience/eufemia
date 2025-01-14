/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  GlobalStatus,
  Button,
  Input,
  Section,
  ToggleButton,
  Icon,
} from '@dnb/eufemia/src'
import { confetti_medium } from '@dnb/eufemia/src/icons'

import { Provider } from '@dnb/eufemia/src/shared'

export const GlobalInfoOverlayError = () => (
  <ComponentBox data-visual-test="global-status">
    <GlobalStatus
      title="Custom Title"
      text="Failure text"
      items={[
        {
          text: 'List item',
          status_anchor_url: '/uilib/components/global-status',
          status_anchor_label: 'eksempel',
        },
      ]}
      show={true}
      autoscroll={false}
      no_animation={true}
      omit_set_focus={true}
      id="demo-1"
    />
  </ComponentBox>
)

export const GlobalStatusInfo = () => (
  <ComponentBox data-visual-test="global-status-info">
    <GlobalStatus
      state="info"
      title="Custom info title ..."
      text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
      items={['Status text 1', 'Status text 2']}
      show={true}
      autoscroll={false}
      no_animation={true}
      omit_set_focus={true}
      id="demo-4"
    />
  </ComponentBox>
)

export const GlobalStatusWarning = () => (
  <ComponentBox>
    <GlobalStatus
      state="warning"
      title="Custom warning title ..."
      text="A string of text providing a warning or semi-urgent message of some kind to the user"
      show={true}
      autoscroll={false}
      no_animation={true}
      omit_set_focus={true}
      id="demo-5"
    />
  </ComponentBox>
)

export const GlobalInfoOverlaySuccess = () => (
  <ComponentBox>
    <GlobalStatus
      state="success"
      title="Custom success title ..."
      text="A string of text providing a success message of some kind to the user"
      show={true}
      autoscroll={false}
      no_animation={true}
      omit_set_focus={true}
      id="demo-6"
    />
  </ComponentBox>
)

export const GlobalInfoCustomIcon = () => (
  <ComponentBox
    scope={{ confetti_medium }}
    data-visual-test="global-status-icon"
  >
    <GlobalStatus
      icon={<Icon icon={confetti_medium} />}
      show={true}
      autoscroll={false}
      no_animation={true}
      omit_set_focus={true}
      id="demo-icon"
    />
  </ComponentBox>
)

export const GlobalStatusCoupling = () => (
  <ComponentBox>
    {() => {
      const InputWithError = () => {
        const [errorMessage, setErrorMessage] = React.useState(null)
        return (
          <Input
            label="Input"
            placeholder="Write less than 5 chars and dismiss the focus to show the GlobalStatus ..."
            stretch
            status={errorMessage}
            on_blur={({ value }) => {
              setErrorMessage(
                value.length <= 4 ? 'With a message shown' : null,
              )
            }}
            globalStatus={{ id: 'main-status' }}
          />
        )
      }
      return <InputWithError />
    }}
  </ComponentBox>
)

export const GlobalStatusAddRemoveItems = () => (
  <ComponentBox hideCode>
    {() => {
      function AddRemoveItems() {
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
              <GlobalStatus.Remove
                id="custom-status"
                status_id="custom-id-2"
              />
            )}
            {count === 3 && (
              <GlobalStatus.Remove
                id="custom-status"
                status_id="custom-id-1"
              />
            )}
          </>
        )
      }
      return <AddRemoveItems />
    }}
  </ComponentBox>
)

export const GlobalStatusScrolling = () => (
  <ComponentBox hideCode>
    <Button
      text="Scroll to main GlobalStatus"
      on_click={() => {
        GlobalStatus.Update({
          id: 'main-status',
          text: 'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
        })
      }}
    />
  </ComponentBox>
)

export const GlobalStatusUpdate = () => (
  <ComponentBox hideCode>
    {() => {
      const Context = React.createContext(null)

      const UpdateDemo = () => {
        const [errorA, setErrorA] = React.useState(false)
        const [errorB, setErrorB] = React.useState(false)

        const [isVisible, setVisibility] = React.useState(false)

        return (
          <Context.Provider
            value={{
              errorA,
              errorB,
              setErrorA,
              setErrorB,
              isVisible,
              setVisibility,
            }}
          >
            <UpdateDemoStatus />
            <UpdateDemoTools />
          </Context.Provider>
        )
      }

      const UpdateDemoStatus = () => {
        const { errorA, errorB, setErrorA, setErrorB } =
          React.useContext(Context)

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
              label="Label A"
              placeholder="Placeholder A"
              status={errorA}
              globalStatus={{ id: 'demo-2' }}
              on_change={({ value }) => {
                setErrorA(value)
              }}
            />
            <Input
              top
              label="Label B"
              placeholder="Placeholder B"
              status={errorB}
              globalStatus={{ id: 'demo-2' }}
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
          setVisibility,
        } = React.useContext(Context)

        // Only to demonstrate the usage of an interceptor situation
        const inst = React.useRef(null)
        React.useEffect(() => {
          if (!inst.current) {
            inst.current = GlobalStatus.create({
              id: 'demo-2',
              title: 'New Title',
              text: 'New Text',
              status_id: 'custom-item',
              show: false,
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
              },
            })
          }

          inst.current.update({
            show: isVisible,
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

      return <UpdateDemo />
    }}
  </ComponentBox>
)

export const GlobalStatusInfoExample1 = () => (
  <ComponentBox hidePreview hideToolbar>
    <GlobalStatus id="other-global-status" />
  </ComponentBox>
)

export const GlobalStatusInfoExample2 = () => (
  <ComponentBox hidePreview hideToolbar>
    <GlobalStatus id="other-global-status" />
    <Input globalStatus={{ id: 'other-global-status' }} />
  </ComponentBox>
)

export const GlobalStatusInfoExample3 = () => (
  <ComponentBox hidePreview hideToolbar>
    <GlobalStatus id="other-global-status" />
    <Provider
      formElement={{ globalStatus: { id: 'other-global-status' } }}
    >
      <Input status="Message" />
    </Provider>
  </ComponentBox>
)

export const GlobalStatusInfoExampleManipulate1 = () => (
  <ComponentBox hidePreview hideToolbar>
    {() => {
      // 1. Update / extend the status like so:

      const statusOne = GlobalStatus.create({
        id: 'other-global-status', // or main
        status_id: 'custom-id-1',
        text: 'New Text',
        item: 'Item from status #1',
        title: 'New Title',
        show: true,
      })

      // 2. and removes "custom-id-1" again if needed

      statusOne.update({
        text: 'Updated Text',
      })

      // 3. and removes "custom-id-1" again if needed
      statusOne.remove()

      return <GlobalStatus id="other-global-status" />
    }}
  </ComponentBox>
)

export const GlobalStatusInfoExampleManipulate2 = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* 1. Place it under the header bar */}
    <GlobalStatus text="Optional default text" />
    {/* 2. later on, you can show a message */}
    <GlobalStatus.Add
      id="custom-id"
      status_id="custom-id-1"
      title="New title"
      text="First long info text ..."
      item="Item from status #1"
      on_close={({ status_id }) => {
        console.log('on_close', status_id)
      }}
    />
    {/* 3. and remove it again */}
    <GlobalStatus.Remove id="custom-id" status_id="custom-id-1" />
  </ComponentBox>
)

export const GlobalStatusInfoExampleManipulate3 = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* 1. Place it somewhere in your application */}
    <GlobalStatus id="custom-status" />
    {/* 2. later on, you can show a message */}
    <GlobalStatus.Add
      id="custom-status"
      status_id="custom-id-1"
      title="New title"
      text="First long info text ..."
      item="Item from status #1"
      on_close={({ status_id }) => {
        console.log('on_close', status_id)
      }}
    />
    {/* 3. and remove it again */}
    <GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />
  </ComponentBox>
)

export const GlobalStatusExampleControllers = () => (
  <ComponentBox hidePreview hideToolbar>
    {/* Place the status wherever you have to.*/}
    <GlobalStatus id="custom-id" />
    {/* Manipulate the status later on. Every property is optional.*/}
    <GlobalStatus.Add
      id="custom-id"
      status_id="status-1"
      item="Item #1"
      text="New Text"
      on_close={({ status_id }) => {
        console.log('on_close', status_id)
      }}
    />
    <GlobalStatus.Add
      id="custom-id"
      status_id="status-2"
      item="Item #2"
      text="New Text"
      title="New Title"
      on_close={({ status_id }) => {
        console.log('on_close', status_id)
      }}
    />
    <GlobalStatus.Add
      id="custom-id"
      status_id="status-3"
      item="Item #3"
      text="Text #3"
      on_close={({ status_id }) => {
        console.log('on_close', status_id)
      }}
    />
    {/* or update the status.*/}
    <GlobalStatus.Update id="custom-id" text="text" />
    {/* Later you can remove a resolved item.*/}
    <GlobalStatus.Remove id="custom-id" status_id="status-3" />
  </ComponentBox>
)
