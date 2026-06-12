import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{$ as n}from"./Anchor-BqZ7Pm7_.js";import{t as r}from"./Icon-HRQtcCxf.js";import{t as i}from"./confetti_medium-CNWbDi-u.js";import{t as a}from"./Button-DbtiL1rf.js";import{M as o}from"./Autocomplete-6fC_p2_U.js";import{t as s}from"./Section-BV74bciL.js";import{t as c}from"./ToggleButton-T4E3Coih.js";import{A as l}from"./index-CsG353ar.js";import{t as u}from"./ComponentBox-Cb1rLw_D.js";var d=e(t()),f=()=>(0,d.jsx)(u,{"data-visual-test":`global-status`,stableName:`GlobalInfoOverlayError`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`<GlobalStatus
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
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-1"
/>
`}),p=()=>(0,d.jsx)(u,{"data-visual-test":`global-status-information`,stableName:`GlobalStatusInfo`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`<GlobalStatus
  state="information"
  title="Custom info title ..."
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  items={['Status text 1', 'Status text 2']}
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-4"
/>
`}),m=()=>(0,d.jsx)(u,{stableName:`GlobalStatusWarning`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`<GlobalStatus
  state="warning"
  title="Custom warning title ..."
  text="A string of text providing a warning or semi-urgent message of some kind to the user"
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-5"
/>
`}),h=()=>(0,d.jsx)(u,{"data-visual-test":`global-status-success`,stableName:`GlobalInfoOverlaySuccess`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`<GlobalStatus
  state="success"
  title="Custom success title ..."
  text="A string of text providing a success message of some kind to the user"
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-6"
/>
`}),g=()=>(0,d.jsx)(u,{scope:{confetti_medium:i},"data-visual-test":`global-status-icon`,stableName:`GlobalInfoCustomIcon`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l,Icon:r},children:`<GlobalStatus
  icon={<Icon icon={confetti_medium} />}
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-icon"
/>
`}),_=()=>(0,d.jsx)(u,{stableName:`GlobalStatusCoupling`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Input:o},noInline:!0,children:`const InputWithError = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  return (
    <Input
      label="Input"
      placeholder="Write less than 5 chars and dismiss the focus to show the GlobalStatus ..."
      stretch
      status={errorMessage}
      onBlur={({ value }) => {
        setErrorMessage(value.length <= 4 ? 'With a message shown' : null)
      }}
      globalStatus={{
        id: 'main-status',
      }}
    />
  )
}
render(<InputWithError />)
`}),v=()=>(0,d.jsx)(u,{hideCode:!0,stableName:`GlobalStatusAddRemoveItems`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l,Button:a},noInline:!0,children:`function AddRemoveItems() {
  const [count, toggleUpdateStatus] = useState(0)
  return (
    <>
      <GlobalStatus
        id="custom-status"
        autoScroll={false}
        onClose={() => toggleUpdateStatus(0)}
        onHide={() => toggleUpdateStatus(0)}
      />
      <Button
        text={\`Show step #\${count}\`}
        onClick={() => {
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
render(<AddRemoveItems />)
`}),y=()=>(0,d.jsx)(u,{hideCode:!0,stableName:`GlobalStatusScrolling`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Button:a,GlobalStatus:l},children:`<Button
  text="Scroll to main GlobalStatus"
  onClick={() => {
    GlobalStatus.Update({
      id: 'main-status',
      text: 'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
    })
  }}
/>
`}),b=()=>(0,d.jsx)(u,{hideCode:!0,stableName:`GlobalStatusUpdate`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l,Input:o,Section:s,ToggleButton:c,Button:a},noInline:!0,children:`const Context = createContext(null)
const UpdateDemo = () => {
  const [errorA, setErrorA] = useState(false)
  const [errorB, setErrorB] = useState(false)
  const [isVisible, setVisibility] = useState(false)
  return (
    <Context
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
    </Context>
  )
}
const UpdateDemoStatus = () => {
  const { errorA, errorB, setErrorA, setErrorB } = useContext(Context)
  return (
    <>
      <GlobalStatus title="Custom Title" text="Failure text" id="demo-2" />
      <Input
        top
        right
        label="Label A"
        placeholder="Placeholder A"
        status={errorA}
        globalStatus={{
          id: 'demo-2',
        }}
        onChange={({ value }) => {
          setErrorA(value)
        }}
      />
      <Input
        top
        label="Label B"
        placeholder="Placeholder B"
        status={errorB}
        globalStatus={{
          id: 'demo-2',
        }}
        onChange={({ value }) => {
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
  } = useContext(Context)

  // Only to demonstrate the usage of an interceptor situation
  const inst = useRef(null)
  useEffect(() => {
    if (!inst.current) {
      inst.current = GlobalStatus.create({
        id: 'demo-2',
        title: 'New Title',
        text: 'New Text',
        statusId: 'custom-item',
        show: false,
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
          setVisibility(false)
        },
        onClose: () => {
          console.log('onClose')
          setVisibility(false)
        },
      })
    }
    inst.current.update({
      show: isVisible,
    })
  }, [isVisible])
  useEffect(() => () => inst.current.remove(), [])
  return (
    <Section
      top
      innerSpace={{
        block: 'large',
      }}
      variant="divider"
    >
      <ToggleButton
        text="Toggle"
        variant="checkbox"
        right
        checked={isVisible}
        onChange={({ checked }) => {
          setVisibility(checked)
        }}
      />
      <Button
        text="Reset"
        variant="tertiary"
        icon="reset"
        disabled={!(errorA || errorB)}
        onClick={() => {
          setErrorA(null)
          setErrorB(null)
        }}
      />
    </Section>
  )
}
render(<UpdateDemo />)
`}),x=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExample1`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`<GlobalStatus id="other-global-status" />
`}),S=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExample2`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l,Input:o},children:`
<GlobalStatus id="other-global-status" />
<Input
  globalStatus={{
    id: 'other-global-status',
  }}
/>

`}),C=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExample3`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l,Provider:n,Input:o},children:`
<GlobalStatus id="other-global-status" />
<Provider
  formElement={{
    globalStatus: {
      id: 'other-global-status',
    },
  }}
>
  <Input status="Message" />
</Provider>

`}),w=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExampleManipulate1`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},noInline:!0,children:`// 1. Update / extend the status like so:

const statusOne = GlobalStatus.create({
  id: 'other-global-status',
  // or main
  statusId: 'custom-id-1',
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
render(<GlobalStatus id="other-global-status" />)
`}),T=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExampleManipulate2`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`
{/* 1. Place it under the header bar */}
<GlobalStatus text="Optional default text" />
{/* 2. later on, you can show a message */}
<GlobalStatus.Add
  id="custom-id"
  statusId="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
  onClose={({ statusId }) => {
    console.log('onClose', statusId)
  }}
/>
{/* 3. and remove it again */}
<GlobalStatus.Remove id="custom-id" statusId="custom-id-1" />

`}),E=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusInfoExampleManipulate3`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`
{/* 1. Place it somewhere in your application */}
<GlobalStatus id="custom-status" />
{/* 2. later on, you can show a message */}
<GlobalStatus.Add
  id="custom-status"
  statusId="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
  onClose={({ statusId }) => {
    console.log('onClose', statusId)
  }}
/>
{/* 3. and remove it again */}
<GlobalStatus.Remove id="custom-status" statusId="custom-id-1" />

`}),D=()=>(0,d.jsx)(u,{hidePreview:!0,hideToolbar:!0,stableName:`GlobalStatusExampleControllers`,sourceImports:[`import { createContext, useContext, useEffect, useRef, useState } from 'react'`,`import { GlobalStatus, Button, Input, Section, ToggleButton, Icon } from '@dnb/eufemia'`,`import { confetti_medium } from '@dnb/eufemia/icons'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{GlobalStatus:l},children:`
{/* Place the status wherever you have to.*/}
<GlobalStatus id="custom-id" />
{/* Manipulate the status later on. Every property is optional.*/}
<GlobalStatus.Add
  id="custom-id"
  statusId="status-1"
  item="Item #1"
  text="New Text"
  onClose={({ statusId }) => {
    console.log('onClose', statusId)
  }}
/>
<GlobalStatus.Add
  id="custom-id"
  statusId="status-2"
  item="Item #2"
  text="New Text"
  title="New Title"
  onClose={({ statusId }) => {
    console.log('onClose', statusId)
  }}
/>
<GlobalStatus.Add
  id="custom-id"
  statusId="status-3"
  item="Item #3"
  text="Text #3"
  onClose={({ statusId }) => {
    console.log('onClose', statusId)
  }}
/>
{/* or update the status.*/}
<GlobalStatus.Update id="custom-id" text="text" />
{/* Later you can remove a resolved item.*/}
<GlobalStatus.Remove id="custom-id" statusId="status-3" />

`});export{_ as a,x as c,w as d,T as f,m as g,b as h,v as i,S as l,y as m,f as n,D as o,E as p,h as r,p as s,g as t,C as u};