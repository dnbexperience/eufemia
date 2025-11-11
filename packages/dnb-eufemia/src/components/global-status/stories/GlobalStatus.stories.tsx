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
import { Flex, H2, Link } from '../../..'
import { Provider } from '../../../shared'
import { FieldBlock, Form } from '../../../extensions/forms'
import type { GlobalStatusState } from '../GlobalStatus'

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
          labelDirection: 'vertical',
          globalStatus: { id: 'test' },
        }}
      >
        <ToggleButton
          bottom
          onChange={() => setStatus((s) => (!s ? 'min status' : null))}
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
          showInput
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
          labelDirection: 'vertical',
          globalStatus: { id: 'test-test', message: 'Hva skjer nå' },
        }}
      >
        <ToggleButton bottom onChange={() => setShowStatus((s) => !s)}>
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
          showInput
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
    <GlobalStatus id="demo-1" />
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
        noAnimation
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
        innerRef={scrollto_element}
        text="Scroll To"
        on_click={() => {
          GlobalStatus.Update({
            id: 'demo-1',
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
          onClose={(props) => {
            console.log('onClose', props)
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
          />
          <Input
            placeholder="Enter #2 ..."
            status={haveAnErrorMessage2 ? 'Error Message #2' : null}
            on_change={({ value }) => {
              setErrorMessage2(value.length >= 3)
            }}
            right="small"
          />
          <Provider formElement={{ labelDirection: 'vertical' }}>
            <Flex.Vertical>
              <Switch
                status={haveAnErrorMessage3 ? 'Error Message #3' : null}
                onChange={({ checked }) => {
                  setErrorMessage3(checked)
                }}
                bottom="small"
              />
              <Switch
                status={haveAnErrorMessage4 ? 'Error Message #4' : null}
                onChange={({ checked }) => {
                  setErrorMessage4(checked)
                }}
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
    triggerAttributes={{ text: 'Open Modal' }}
    title="Modal Title"
    onOpen={() => {
      setTimeout(() => {
        const status = GlobalStatus.Update({
          id: 'modal',
          text: 'Second Text',
        })
        setTimeout(() => {
          status.remove()
        }, 2e3)
      }, 1)
    }}
  >
    <div className="dnb-core-style">
      <GlobalStatus
        id="modal"
        autoscroll={false}
        onClose={(props) => {
          console.log('onClose', props)
        }}
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
        onOpen={() => {
          console.log('onOpen')
        }}
        onClose={() => {
          console.log('onClose')
          toggleUpdateStatus(0)
        }}
        onHide={() => {
          console.log('onHide')
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
            statusId="custom-id-1"
            title="New title"
            text="First long info text ..."
            item="Item from status #1"
            onClose={({ statusId }) => {
              console.log('onClose 1', statusId)
            }}
          />
          <GlobalStatus.Add
            id="custom-status"
            statusId="custom-id-2"
            text="Second long info text ..."
            item="Item from status #2"
            onClose={({ statusId }) => {
              console.log('onClose 2', statusId)
            }}
          />
        </>
      )}
      {count === 2 && (
        <GlobalStatus.Remove id="custom-status" statusId="custom-id-2" />
      )}
      {count === 3 && (
        <GlobalStatus.Remove id="custom-status" statusId="custom-id-1" />
      )}
    </>
  )
}

const NestedSections = () => (
  <Section spacing>
    Content 1
    <Section spacing style_type="mint-green">
      Content 2
      <GlobalStatus
        id="default-1"
        show
        noAnimation
        autoscroll={false}
        onClose={(props) => {
          console.log('onClose', props)
        }}
        items={[
          { id: 1, text: 'Error message', statusAnchorUrl: '#link' },
          { id: 2, text: 'Error message', statusAnchorUrl: '#link' },
          { id: 3, text: 'Error message', statusAnchorUrl: '#link' },
          { id: 4, text: 'Error message', statusAnchorUrl: '#link' },
        ]}
      >
        Default Text
      </GlobalStatus>
      {/* <GlobalStatus.Add
        id="default-1"
        statusId="custom-id-1"
        text="Second Text"
        items={[{ text: 'Second Item 2', statusAnchorUrl: '#link' }]}
      /> */}
      {/* <GlobalStatus.Add
        id="default-1"
        statusId="custom-id-2"
        items={[{ text: 'Item 3', statusAnchorUrl: '#link' }]}
      /> */}
      {/* <GlobalStatus.Add
      id="default-1"
      statusId="custom-id-2"
      text="Third Text"
      item="Third Item"
    />
    <GlobalStatus.Add
      id="default-1"
      statusId="custom-id-2"
      text="Third Text bøø"
      item={{ text: 'Third Item bøø', statusAnchorUrl: '/' }}
    /> */}
      {/* <GlobalStatus.Remove statusId="custom-id-1" /> */}
      {/* <GlobalStatus.Remove statusId="custom-id-2" /> */}
    </Section>
  </Section>
)
const DemoAnimation = () => {
  const [showDemo, toggleShowDemo] = React.useState(false)
  return (
    <>
      <ToggleButton
        text={showDemo ? 'Stop Demo' : 'Show animation Demo'}
        checked={showDemo}
        variant="checkbox"
        onChange={({ checked }) => toggleShowDemo(checked)}
        bottom="small"
      />
      <GlobalStatus
        title="Demo Animation"
        text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
        items={['Status text 1', 'Status text 2']}
        show={showDemo}
        autoscroll={false}
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
        omitSetFocusOnUpdate
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
  const inst = React.useRef(null)
  React.useEffect(() => {
    if (!inst.current) {
      inst.current = GlobalStatus.create({
        id: 'demo-2',
        title: 'New Title',
        text: 'New Text',
        statusId: 'custom-item',
        show: true,
      })

      inst.current.update({
        onShow: () => {
          console.log('onShow')
          if (!isVisible) {
            setVisibility(true)
          }
        },
        onHide: () => {
          console.log('onHide')
          setVisibility('auto')
        },
        onClose: () => {
          console.log('onClose')
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
        onChange={({ checked }) => {
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
          noAnimation={true}
          omitSetFocus={true}
          id="demo-1"
        />
      </Box>
      <Box>
        <GlobalStatus
          title="Custom Title"
          show={true}
          autoscroll={false}
          noAnimation={true}
          omitSetFocus={true}
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
          noAnimation={true}
          omitSetFocus={true}
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
              statusAnchorUrl: '/uilib/components/global-status',
              statusAnchorLabel: 'eksempel',
            },
          ]}
          show={true}
          autoscroll={false}
          noAnimation={true}
          omitSetFocus={true}
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

export function GlobalStatusEvents() {
  return (
    <GlobalStatus
      id="test"
      onAdjust={() => {
        console.log('onAdjust')
      }}
      onOpen={() => {
        console.log('onOpen')
      }}
      onShow={() => {
        console.log('onShow')
      }}
      onHide={() => {
        console.log('onHide')
      }}
      onClose={() => {
        console.log('onClose')
      }}
    />
  )
}

export function DelayedInteractions() {
  const FormField1 = () => {
    const [status, setStatus] = React.useState(null)
    return (
      <Switch
        id="switch-1"
        status={status}
        statusNoAnimation={true}
        onChange={({ checked }) => {
          setStatus(checked ? 'error-message-1' : null)
        }}
      />
    )
  }

  const FormField2 = () => {
    const [status, setStatus] = React.useState(null)
    return (
      <Switch
        id="switch-2"
        status={status}
        statusNoAnimation={true}
        onChange={({ checked }) => {
          setStatus(checked ? 'error-message-2' : null)
        }}
      />
    )
  }

  const FormField3 = () => {
    const [status, setStatus] = React.useState(null)
    return (
      <Autocomplete
        id="autocomplete-3"
        status={status}
        statusNoAnimation={true}
        onFocus={() => {
          setStatus('error-message-3')
        }}
        onBlur={() => {
          setStatus(null)
        }}
      />
    )
  }

  return (
    <Section spacing>
      <GlobalStatus id="my-form" autoscroll={false} />
      <Form.Handler globalStatusId="my-form">
        <FormField1 />
        <FormField2 />
        <FormField3 />
      </Form.Handler>
    </Section>
  )
}
