/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import {
  Modal,
  Input,
  Switch,
  GlobalStatus,
  ToggleButton,
  Section,
  Button,
  Autocomplete,
  DatePicker,
  Space,
  Radio,
} from '../..'
import {
  Flex,
  H2,
  // P,
  Link,
} from '../../..'
import { Provider } from '../../../shared'
import { FieldBlock, Form } from '../../../extensions/forms'
import type { GlobalStatusState } from '../GlobalStatus'
// import { GlobalStatusProvider } from '../../global-status/GlobalStatusContext'

export default {
  title: 'Eufemia/Components/GlobalStatus',
}

export const ComponentAsLabel = () => {
  const [status, setStatus] = React.useState(null)

  const Component = (): JSX.Element => {
    return <>my label</>
  }

  return (
    <>
      <GlobalStatus id="test" />

      <Provider
        formElement={{
          label_direction: 'vertical',
          globalStatus: { id: 'test' },
        }}
      >
        <ToggleButton
          bottom
          on_change={() => setStatus((s) => (!s ? 'min status' : null))}
        >
          set status
        </ToggleButton>

        <Flex.Horizontal align="baseline">
          <Input
            label={<Component />}
            status={status ? status + '1' : undefined}
          />
        </Flex.Horizontal>
        <Input
          label={<Component />}
          status={status ? status + '2' : undefined}
        />
        <Autocomplete
          label={<Component />}
          status={status ? status + '3' : undefined}
        />
        <DatePicker
          label={<Component />}
          show_input
          status={status ? status + '4' : undefined}
        />
      </Provider>
    </>
  )
}

export const CustomGlobalStatusMessage = () => {
  const [showStatus, setShowStatus] = React.useState<boolean>(false)

  const Component = (): JSX.Element => {
    return <>my label</>
  }

  return (
    <>
      <GlobalStatus id="test-test" />

      <Provider
        formElement={{
          label_direction: 'vertical',
          globalStatus: { id: 'test-test', message: 'Hva skjer nå' },
        }}
      >
        <ToggleButton bottom on_change={() => setShowStatus((s) => !s)}>
          set status
        </ToggleButton>

        <Flex.Horizontal align="baseline">
          <Input
            label={<Component />}
            status={showStatus ? 'Input status' : ''}
            globalStatus={{
              message: showStatus ? 'Input global status' : '',
            }}
          />
        </Flex.Horizontal>
        <Input
          label={<Component />}
          status={showStatus ? 'Input status withough global' : ''}
        />
        <Autocomplete
          label={<Component />}
          status={showStatus ? 'Autocomplete status' : ''}
          globalStatus={{
            message: showStatus ? 'Autocomplete global status' : '',
          }}
        />
        <DatePicker
          label={<Component />}
          show_input
          status={showStatus ? 'Datepicekr status' : ''}
          globalStatus={{
            message: showStatus ? 'Datepicker global status' : '',
          }}
        />
      </Provider>
    </>
  )
}

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text
  </>
)

export const GlobalStatuseSandbox = () => (
  <Wrapper>
    <GlobalStatus />
    <GlobalStatus
      // title="Custom Title"
      // text="Failure text"
      // items={[
      //   {
      //     text: 'List item',
      //     status_anchor_url: '/uilib/components/global-status'
      //   }
      // ]}
      // show={true}
      // no_animation={true}
      // autoscroll={false}
      id="demo-1"
    />
    <Box>
      <UpdateDemo />
    </Box>
    <Box>
      <DemoAnimation />
    </Box>
    <Box>
      <NestedSections />
    </Box>
    <Box>
      <ModalExample />
    </Box>
    <Box>
      <SimulateSteps />
    </Box>
    <Box>
      <InputWithError />
    </Box>
    <Box>
      <GlobalStatus
        show
        no_animation
        autoscroll={false}
        state="info"
        title="Custom Title"
        id="custom-id"
      >
        <CustomStatus />
      </GlobalStatus>
    </Box>
    <Box>
      <Button
        inner_ref={scrollto_element}
        text="Scroll To"
        on_click={() => {
          GlobalStatus.Update({
            id: 'demo-1',
            // id: 'custom-status',
            text: 'This is aDui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
          })
        }}
        top="small"
      />
    </Box>
    {/* <Box>
      {false && <UpdateGlobalStatus />}
      {true && (
        <GlobalStatus.Add
          title="New title"
          on_close={(props) => {
            console.log('on_close', props)
          }}
        >
          Long info text Ipsum habitant enim ullamcorper elit sit elementum
          platea rutrum eu condimentum erat risus lacinia viverra magnis
          lobortis nibh mollis suspendisse
        </GlobalStatus.Add>
      )}
    </Box> */}
  </Wrapper>
)

const scrollto_element = React.createRef()

const InputWithError = () => {
  const [haveAnErrorMessage1, setErrorMessage1] = React.useState(false)
  const [haveAnErrorMessage2, setErrorMessage2] = React.useState(false)
  const [haveAnErrorMessage3, setErrorMessage3] = React.useState(false)
  const [haveAnErrorMessage4, setErrorMessage4] = React.useState(false)
  return (
    <Provider
      formElement={{
        globalStatus: { id: 'form-status' },
      }}
    >
      <Form.Handler>
        <FieldBlock label="Caption:">
          <Input
            placeholder="Enter #1 ..."
            status={haveAnErrorMessage1 ? 'Error Message #1' : null}
            on_change={({ value }) => {
              setErrorMessage1(value.length >= 3)
            }}
            right="small"
            // status_no_animation
          />
          <Input
            placeholder="Enter #2 ..."
            status={haveAnErrorMessage2 ? 'Error Message #2' : null}
            on_change={({ value }) => {
              setErrorMessage2(value.length >= 3)
            }}
            right="small"
            // status_no_animation
          />
          <Provider formElement={{ label_direction: 'vertical' }}>
            <Flex.Vertical>
              <Switch
                status={haveAnErrorMessage3 ? 'Error Message #3' : null}
                on_change={({ checked }) => {
                  setErrorMessage3(checked)
                }}
                bottom="small"
                // status_no_animation
              />
              <Switch
                status={haveAnErrorMessage4 ? 'Error Message #4' : null}
                on_change={({ checked }) => {
                  setErrorMessage4(checked)
                }}
                // status_no_animation
              />
            </Flex.Vertical>
          </Provider>
        </FieldBlock>
      </Form.Handler>
      <GlobalStatus id="form-status" autoscroll={false} top="small" />
    </Provider>
  )
}

const ModalExample = () => (
  <Modal
    trigger_attributes={{ text: 'Open Modal' }}
    title="Modal Title"
    // width="80vw"
    on_open={() => {
      setTimeout(() => {
        const status = GlobalStatus.Update({
          id: 'modal',
          text: 'Second Text',
        })
        setTimeout(() => {
          status.remove()
        }, 2e3)
        // const status = new GlobalStatus.Add({
        //   status_id: 'custom-id-1',
        //   text: 'Second Text',
        //   item: 'Second Item'
        // })
        // new GlobalStatus.Remove({
        //   status_id: 'custom-id-1'
        // })
      }, 1)
    }}
  >
    <div className="dnb-core-style">
      <GlobalStatus
        id="modal"
        // title={'Title 1'}
        // demo
        // show
        // no_animation
        // autoclose={false}
        autoscroll={false}
        // id="default-1"
        // delay={300}
        on_close={(props) => {
          console.log('on_close', props)
        }}
        // items={['123']}
      >
        Default Text
      </GlobalStatus>
    </div>
  </Modal>
)

export const SimulateSteps = () => {
  const [count, toggleUpdateStatus] = React.useState(0)
  return (
    <>
      <GlobalStatus
        id="custom-status"
        // autoscroll={false}
        // show={count === 1}
        // autoclose={false}
        on_open={() => {
          console.log('on_open')
        }}
        on_close={() => {
          console.log('on_close')
          toggleUpdateStatus(0)
        }}
        on_hide={() => {
          console.log('on_hide')
          toggleUpdateStatus(0)
        }}
      />
      <Button
        text={`Step #${count}`}
        on_click={() => {
          toggleUpdateStatus(count + 1)
          if (count > 2) {
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

// const UpdateGlobalStatus = () => {
//   const [count, setCount] = React.useState(0)
//
//     setTimeout(() => {
//       setCount(1)
//     }, 1e3)
//     setTimeout(() => {
//       setCount(2)
//     }, 2e3)
//     setTimeout(() => {
//       setCount(3)
//     }, 3e3)
//   }, [])
//
//   return (
//     <>
//       {count === 1 && (
//         <>
//           <GlobalStatus.Add
//             key="a"
//             title="Title 2"
//             item="List item 2"
//             persist_unmount={false}
//           >
//             Sem 2 montes dictum suscipit eget aliquam a ante curabitur diam
//           </GlobalStatus.Add>
//           <GlobalStatus.Add
//             key="b"
//             title="Title 3"
//             item="List item 3"
//           />
//           <GlobalStatus.Add
//             key="c"
//             title="Title 4"
//             item="List item 4"
//           />
//         </>
//       )}
//       {(count === 2 || count === 3) && (
//         <>
//           <GlobalStatus.Add
//             key="e"
//             // title="Title 5"
//             item="List item 5"
//             status_id="123"
//           />
//           <GlobalStatus.Add key="f" item="List item 5" id="other-id" />
//         </>
//       )}
//       {count === 3 && (
//         <>
//           <GlobalStatus.Remove key="z" status_id="123" />
//           {/* <GlobalStatus.Remove key="z" status_id="123" id="other-id" /> */}
//         </>
//       )}
//     </>
//   )
// }

const NestedSections = () => (
  <Section spacing>
    Content 1
    <Section spacing style_type="mint-green">
      Content 2
      <GlobalStatus
        id="default-1"
        // title={'Title 1'}
        // demo
        show
        no_animation
        // autoclose={false}
        autoscroll={false}
        // delay={300}
        on_close={(props) => {
          console.log('on_close', props)
        }}
        items={[
          { id: 1, text: 'Error message', status_anchor_url: '#link' },
          { id: 2, text: 'Error message', status_anchor_url: '#link' },
          { id: 3, text: 'Error message', status_anchor_url: '#link' },
          { id: 4, text: 'Error message', status_anchor_url: '#link' },
        ]}
      >
        Default Text
      </GlobalStatus>
      {/* <GlobalStatus.Add
        id="default-1"
        status_id="custom-id-1"
        text="Second Text"
        items={[{ text: 'Second Item 2', status_anchor_url: '#link' }]}
        // item="Second Item"
        // status_anchor_url="http://"
      /> */}
      {/* <GlobalStatus.Add
        id="default-1"
        status_id="custom-id-2"
        items={[{ text: 'Item 3', status_anchor_url: '#link' }]}
        // item="Second Item"
        // status_anchor_url="http://"
      /> */}
      {/* <GlobalStatus.Add
      id="default-1"
      status_id="custom-id-2"
      text="Third Text"
      item="Third Item"
    />
    <GlobalStatus.Add
      id="default-1"
      status_id="custom-id-2"
      text="Third Text bøø"
      item={{ text: 'Third Item bøø', status_anchor_url: '/' }}
    /> */}
      {/* <GlobalStatus.Remove status_id="custom-id-1" /> */}
      {/* <GlobalStatus.Remove status_id="custom-id-2" /> */}
    </Section>
  </Section>
)

// const items = ['Status text 1', 'Status text 2']
const DemoAnimation = () => {
  const [showDemo, toggleShowDemo] = React.useState(false)
  // setTimeout(() => {
  //   // toggleShowDemo(true)
  // }, 30)
  return (
    <>
      <ToggleButton
        text={showDemo ? 'Stop Demo' : 'Show animation Demo'}
        checked={showDemo}
        variant="checkbox"
        on_change={({ checked }) => toggleShowDemo(checked)}
        bottom="small"
      />
      <GlobalStatus
        title="Demo Animation"
        text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
        items={['Status text 1', 'Status text 2']}
        // items={['Status text 1', 'Status text 2']}
        // items={items}
        // demo={showDemo}
        show={showDemo}
        autoscroll={false}
        // no_animation={true}
        // delay={0}
        id="demo-3"
      />
    </>
  )
}

const Context = React.createContext(null)

const UpdateDemo = () => {
  const [errorA, setErrorA] = React.useState()
  const [errorB, setErrorB] = React.useState()

  const [isVisible, setVisibility] = React.useState('auto')

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
        // no_animation
        // omit_set_focus
        omit_set_focus_on_update
      />
      <Input
        top
        right
        label="Label A:"
        placeholder="Placeholder A"
        status={errorA}
        globalStatus={{ id: 'demo-2' }}
        on_change={({ value }) => {
          setErrorA(value)
        }}
      />
      <Input
        top
        label="Label B:"
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
        show: true,
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
          setVisibility('auto')
        },
        on_close: () => {
          console.log('on_close')
          setVisibility('auto')
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
          setVisibility(checked ? true : 'auto')
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

export const AsFigmaGlobalStatus = () => {
  return (
    <Wrapper>
      <Box>
        <GlobalStatus
          state="info"
          title="Kortet vil bli sendt til adresse: Osloveien 68b, 1234 Oslo"
          show={true}
          autoscroll={false}
          no_animation={true}
          omit_set_focus={true}
          id="demo-1"
        />
      </Box>
      <Box>
        <GlobalStatus
          title="Custom Title"
          show={true}
          autoscroll={false}
          no_animation={true}
          omit_set_focus={true}
          id="demo-1"
        />
      </Box>
      <Box>
        <GlobalStatus
          state="info"
          title="Kortet vil bli sendt til adresse: Osloveien 68b, 1234 Oslo"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          items={[
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper at elit quisque maecenas turpis gravida nisl tellus.',
            },
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus cursus turpis massased senectus consequat nec in. Quam in egestas sed commodo fames commodo ornare erat.',
            },
          ]}
          show={true}
          autoscroll={false}
          no_animation={true}
          omit_set_focus={true}
          id="demo-1"
        />
      </Box>
      <Box>
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
      </Box>
    </Wrapper>
  )
}

export function GlobalStatusSelector() {
  const [pickerState, setPickerState] =
    useState<GlobalStatusState>('warning')

  return (
    <Section spacing>
      <Space left>
        <GlobalStatus
          show={true}
          state={pickerState}
          title={pickerState}
          text={`You have chosen: ${pickerState}`}
        />
      </Space>
      <Space top="large" left>
        <Radio.Group label="Status states">
          <Radio
            label="warning"
            value="warning"
            onChange={setGlobalStatus}
          />
          <Radio label="info" value="info" onChange={setGlobalStatus} />
          <Radio
            label="success"
            value="success"
            onChange={setGlobalStatus}
          />
          <Radio label="error" value="error" onChange={setGlobalStatus} />
        </Radio.Group>
      </Space>
    </Section>
  )

  function setGlobalStatus(event) {
    const input = event.target as HTMLInputElement
    const value = input.value as GlobalStatusState

    setPickerState(value)
  }
}
