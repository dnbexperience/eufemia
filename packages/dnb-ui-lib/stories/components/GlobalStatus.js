/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Modal,
  Input,
  Switch,
  GlobalStatus,
  ToggleButton,
  Section,
  Button,
  FormRow,
  FormSet
} from '../../src/components'
import {
  H2,
  // P,
  Link
} from '../../src/elements'
// import { GlobalStatusProvider } from '../../src/components/global-status/GlobalStatusContext'

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text
  </>
)

export const GlobalStatuses = () => (
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
      // show="true"
      // no_animation="true"
      // autoscroll="false"
      id="demo-1"
    />
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
        autoscroll="false"
        state="info"
        title="Custom Title"
        id="custom-id"
      >
        <CustomStatus />
      </GlobalStatus>
    </Box>
    <Box>
      <Button
        ref={scrollto_element}
        text="Scroll To"
        on_click={() => {
          GlobalStatus.AddStatus({
            id: 'demo-1',
            // id: 'custom-status',
            text:
              'This is aDui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
            scrollto_element
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
        on_close={props => {
        console.log('on_close', props)
      }}
      >
      Long info text Ipsum habitant enim ullamcorper elit sit
      elementum platea rutrum eu condimentum erat risus lacinia
      viverra magnis lobortis nibh mollis suspendisse
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
    <>
      <FormSet
      // global_status_id="form-status"
      >
        <FormRow label="Caption:">
          <Input
            placeholder="Enter #1 ..."
            status={haveAnErrorMessage1 ? 'Error Message #1' : null}
            on_change={({ value }) => {
              setErrorMessage1(value.length >= 3)
            }}
            right="small"
            // status_animation="fade-in"
          />
          <Input
            placeholder="Enter #2 ..."
            status={haveAnErrorMessage2 ? 'Error Message #2' : null}
            on_change={({ value }) => {
              setErrorMessage2(value.length >= 3)
            }}
            right="small"
            // status_animation="fade-in"
          />
          <FormRow vertical>
            <Switch
              status={haveAnErrorMessage3 ? 'Error Message #3' : null}
              on_change={({ checked }) => {
                setErrorMessage3(checked)
              }}
              bottom="small"
              // status_animation="fade-in"
            />
            <Switch
              status={haveAnErrorMessage4 ? 'Error Message #4' : null}
              on_change={({ checked }) => {
                setErrorMessage4(checked)
              }}
              // status_animation="fade-in"
            />
          </FormRow>
        </FormRow>
      </FormSet>
      <GlobalStatus id="form-status" autoscroll="false" top="small" />
    </>
  )
}

const ModalExample = () => (
  <Modal
    trigger_text="Open Modal"
    title="Modal Title"
    // width="80vw"
    on_open={() => {
      setTimeout(() => {
        const status = GlobalStatus.AddStatus({
          id: 'modal',
          status_id: 'custom-id-1',
          text: 'Second Text',
          item: 'Second Item'
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
        autoscroll="false"
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

const SimulateSteps = () => {
  const [count, toggleUpdateStatus] = React.useState(0)
  return (
    <>
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
      <GlobalStatus
        id="custom-status"
        // autoscroll="false"
        // show={count === 1}
        // autoclose="false"
        on_open={() => {
          console.log('on_open')
        }}
        on_close={() => {
          console.log('on_close')
        }}
        on_hide={() => {
          console.log('on_hide')
          toggleUpdateStatus(0)
        }}
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
        autoscroll="false"
        // delay={300}
        on_close={(props) => {
          console.log('on_close', props)
        }}
        items={[
          { id: 1, text: 'Error message', status_anchor_url: '#link' },
          { id: 2, text: 'Error message', status_anchor_url: '#link' },
          { id: 3, text: 'Error message', status_anchor_url: '#link' },
          { id: 4, text: 'Error message', status_anchor_url: '#link' }
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
        items='["Status text 1", "Status text 2"]'
        // items={['Status text 1', 'Status text 2']}
        // items={items}
        demo={showDemo}
        show={showDemo}
        autoscroll={false}
        // no_animation={true}
        // delay={0}
        id="demo-3"
        // on_close={() => {
        //   toggleShowDemo(false)
        // }}
      />
    </>
  )
}
