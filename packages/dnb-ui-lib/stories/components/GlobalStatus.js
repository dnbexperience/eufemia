/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Modal,
  Input,
  Switch,
  GlobalStatus,
  Section,
  Button,
  FormRow,
  FormSet
} from '../../src/components'
import { H2, Link } from '../../src/elements'
// import { GlobalStatusProvider } from '../../src/components/global-status/GlobalStatusContext'

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <Link href="/">Goto</Link> more text
  </>
)

// setTimeout(() => {
// const status = GlobalStatus.Set({
//   status_id: 'custom-id-1',
//   text: 'Second Text',
//   item: 'Second Item'
// })
// status.remove()
// const status = new GlobalStatus.Add({
//   status_id: 'custom-id-1',
//   text: 'Second Text',
//   item: 'Second Item'
// })
// new GlobalStatus.Remove({
//   status_id: 'custom-id-1'
// })
// }, 1e3)

export default [
  'GlobalStatus',
  () => (
    <Wrapper>
      <Box>
        <Section spacing>
          Content 1
          <Section spacing style_type="mint-green">
            Content 2
            <GlobalStatus
              // title={'Title 1'}
              // demo
              show
              no_animation
              autoclose={false}
              autoscroll="false"
              // id="default-1"
              // delay={300}
              on_close={props => {
                console.log('on_close', props)
              }}
              items={['123']}
            >
              Defualt Text
            </GlobalStatus>
            <GlobalStatus.Add
              status_id="custom-id-1"
              text="Second Text"
              // items={['xxx']}
              item="Second Item"
            />
            {/* <GlobalStatus.Add
              status_id="custom-id-2"
              text="Third Text"
              item="Third Item"
            />
            <GlobalStatus.Add
              status_id="custom-id-2"
              text="Third Text bøø"
              item={{ text: 'Third Item bøø', status_anchor_url: '/' }}
            /> */}
            {/* <GlobalStatus.Remove status_id="custom-id-1" /> */}
            {/* <GlobalStatus.Remove status_id="custom-id-2" /> */}
          </Section>
        </Section>
      </Box>
      <Box>
        <Modal
          trigger_text="Open Modal"
          title="Modal Title"
          // width="80vw"
          on_open={() => {
            const status = GlobalStatus.Set({
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
              on_close={props => {
                console.log('on_close', props)
              }}
              // items={['123']}
            >
              Defualt Text
            </GlobalStatus>
          </div>
        </Modal>
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
      <Box>
        <ToggleGlobalStatus />
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
    </Wrapper>
  )
]

const InputWithError = () => {
  const [haveAnErrorMessage1, setErrorMessage1] = useState(false)
  const [haveAnErrorMessage2, setErrorMessage2] = useState(false)
  const [haveAnErrorMessage3, setErrorMessage3] = useState(false)
  const [haveAnErrorMessage4, setErrorMessage4] = useState(false)
  return (
    <>
      <FormSet global_status_id="form-status">
        <FormRow label="Caption:" global_status_id="form-status">
          <Input
            placeholder="Enter #1 ..."
            status={haveAnErrorMessage1 ? 'Error Message #1' : null}
            on_change={({ value }) => {
              setErrorMessage1(value.length >= 3)
            }}
            // global_status_id="form-status"
            right="small"
            status_animation="fade-in"
          />
          <Input
            placeholder="Enter #2 ..."
            status={haveAnErrorMessage2 ? 'Error Message #2' : null}
            on_change={({ value }) => {
              setErrorMessage2(value.length >= 3)
            }}
            right="small"
            // global_status_id="form-status"
            status_animation="fade-in"
          />
          <FormRow vertical>
            <Switch
              status={haveAnErrorMessage3 ? 'Error Message #3' : null}
              on_change={({ checked }) => {
                setErrorMessage3(checked)
              }}
              bottom="small"
              // global_status_id="form-status"
              status_animation="fade-in"
            />
            <Switch
              status={haveAnErrorMessage4 ? 'Error Message #4' : null}
              on_change={({ checked }) => {
                setErrorMessage4(checked)
              }}
              // global_status_id="form-status"
              status_animation="fade-in"
            />
          </FormRow>
        </FormRow>
      </FormSet>
      <GlobalStatus id="form-status" autoscroll="false" top="small" />
    </>
  )
}

const ToggleGlobalStatus = () => {
  const [count, toggleUpdateStatus] = useState(0)
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
        autoscroll="false"
        // show={count === 1}
        // autoclose="false"
        on_close={() => toggleUpdateStatus(0)}
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
//   const [count, setCount] = useState(0)
//
//   useEffect(() => {
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
