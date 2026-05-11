import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./confetti_medium-2-pte0Hk.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";var r=e(),i=()=>(0,r.jsx)(n,{"data-visual-test":`global-status`,children:`<GlobalStatus
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
`}),a=()=>(0,r.jsx)(n,{"data-visual-test":`global-status-information`,children:`<GlobalStatus
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
`}),o=()=>(0,r.jsx)(n,{children:`<GlobalStatus
  state="warning"
  title="Custom warning title ..."
  text="A string of text providing a warning or semi-urgent message of some kind to the user"
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-5"
/>
`}),s=()=>(0,r.jsx)(n,{"data-visual-test":`global-status-success`,children:`<GlobalStatus
  state="success"
  title="Custom success title ..."
  text="A string of text providing a success message of some kind to the user"
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-6"
/>
`}),c=()=>(0,r.jsx)(n,{scope:{confetti_medium:t},"data-visual-test":`global-status-icon`,children:`<GlobalStatus
  icon={<Icon icon={confetti_medium} />}
  show={true}
  autoScroll={false}
  noAnimation={true}
  omitSetFocus={true}
  id="demo-icon"
/>
`}),l=()=>(0,r.jsx)(n,{noInline:!0,children:`const InputWithError = () => {
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
`}),u=()=>(0,r.jsx)(n,{hideCode:!0,noInline:!0,children:`function AddRemoveItems() {
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
`}),d=()=>(0,r.jsx)(n,{hideCode:!0,children:`<Button
  text="Scroll to main GlobalStatus"
  onClick={() => {
    GlobalStatus.Update({
      id: 'main-status',
      text: 'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
    })
  }}
/>
`}),f=()=>(0,r.jsx)(n,{hideCode:!0,noInline:!0,children:`const Context = createContext(null)
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
`}),p=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`<GlobalStatus id="other-global-status" />
`}),m=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`
<GlobalStatus id="other-global-status" />
<Input
  globalStatus={{
    id: 'other-global-status',
  }}
/>

`}),h=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`
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

`}),g=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,noInline:!0,children:`// 1. Update / extend the status like so:

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
`}),_=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`
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

`}),v=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`
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

`}),y=()=>(0,r.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`
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

`});export{l as a,p as c,g as d,_ as f,o as g,f as h,u as i,m as l,d as m,i as n,y as o,v as p,s as r,a as s,c as t,h as u};