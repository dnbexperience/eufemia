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

const LabelComponent = (): JSX.Element => {
  return <>my label</>
}

export const ComponentAsLabel = () => {
  const [status, setStatus] = React.useState(null)

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
            label={<LabelComponent />}
            status={status ? status + '1' : undefined}
          />
        </Flex.Horizontal>
        <Input
          label={<LabelComponent />}
          status={status ? status + '2' : undefined}
        />
        <Autocomplete
          label={<LabelComponent />}
          status={status ? status + '3' : undefined}
        />
        <DatePicker
          label={<LabelComponent />}
          showInput
          status={status ? status + '4' : undefined}
        />
      </Provider>
    </>
  )
}

export const CustomGlobalStatusMessage = () => {
  const [showStatus, setShowStatus] = React.useState<boolean>(false)

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
            label={<LabelComponent />}
            status={showStatus ? 'Input status' : ''}
            globalStatus={{
              message: showStatus ? 'Input global status' : '',
            }}
          />
        </Flex.Horizontal>
        <Input
          label={<LabelComponent />}
          status={showStatus ? 'Input status withough global' : ''}
        />
        <Autocomplete
          label={<LabelComponent />}
          status={showStatus ? 'Autocomplete status' : ''}
          globalStatus={{
            message: showStatus ? 'Autocomplete global status' : '',
          }}
        />
        <DatePicker
          label={<LabelComponent />}
          showInput
          status={showStatus ? 'DatePicker status' : ''}
          globalStatus={{
            message: showStatus ? 'DatePicker global status' : '',
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
        on_close={(props) => {
          console.log('on_close', props)
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
            statusId="custom-id-1"
            title="New title"
            text="First long info text ..."
            item="Item from status #1"
            on_close={({ statusId }) => {
              console.log('on_close 1', statusId)
            }}
          />
          <GlobalStatus.Add
            id="custom-status"
            statusId="custom-id-2"
            text="Second long info text ..."
            item="Item from status #2"
            on_close={({ statusId }) => {
              console.log('on_close 2', statusId)
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
        on_close={(props) => {
          console.log('on_close', props)
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

export const GlobalStatusExample = () => (
  <Wrapper>
    <GlobalStatus
      title="Custom Title"
      text="Failure text"
      items={[
        {
          text: 'List item',
          status_anchor_url: '/uilib/components/global-status',
          status_anchor_label: 'eksempel',
        },
        {
          text: 'List item2',
          status_anchor_url: '/uilib/components/global-status',
          status_anchor_label: 'eksempel',
        },
      ]}
      show={true}
      autoscroll={false}
      noAnimation={true}
      omitSetFocus={true}
      id="demo-1"
    />
  </Wrapper>
)
