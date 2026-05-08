import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{Lr as n,Mt as r}from"./index--zEB_f_m.js";var i=e(),a=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{scope:{data:m},noInline:!0,children:`const DrawerListWithState = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ToggleButton
        id="state-toggle-button"
        text="Toggle"
        checked={open}
        icon={\`chevron_\${open ? 'up' : 'down'}\`}
        iconPosition="left"
        onChange={({ checked }) => setOpen(checked)}
      />
      <DrawerList
        wrapperElement="#state-toggle-button"
        skipPortal
        data={data}
        open={open}
        onClose={() => setOpen(false)}
        {...props}
      />
    </>
  )
}
render(<DrawerListWithState />)
`})}),o=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{"data-visual-test":`drawer-list`,scope:{data:m},hideCode:!0,children:`<span className="dnb-drawer-list__list">
  <ul className="dnb-drawer-list__options">
    <li className="dnb-drawer-list__option first-of-type">
      <span className="dnb-drawer-list__option__inner">
        Brukskonto - Kari Nordmann
      </span>
    </li>
    <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item item-nr-1">
          <NumberFormat.BankAccountNumber>
            12345678902
          </NumberFormat.BankAccountNumber>
        </span>
        <span className="dnb-drawer-list__option__item">
          Sparekonto - Ole Nordmann
        </span>
      </span>
    </li>
    <li className="dnb-drawer-list__option">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item item-nr-1">
          <NumberFormat.BankAccountNumber>
            11345678962
          </NumberFormat.BankAccountNumber>
        </span>
        <span className="dnb-drawer-list__option__item item-nr-2">
          <a
            className="dnb-anchor dnb-anchor--has-icon"
            href="/uilib/components/fragments/drawer-list/"
          >
            Long link that will wrap over several lines
          </a>
        </span>
        <span className="dnb-drawer-list__option__item">
          Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
        </span>
      </span>
    </li>
    <li className="dnb-drawer-list__option last-of-type">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item item-nr-1">
          <NumberFormat.BankAccountNumber>
            15349648901
          </NumberFormat.BankAccountNumber>
        </span>
        <span className="dnb-drawer-list__option__item">
          Oppussing - Ole Nordmann
        </span>
      </span>
    </li>
    <li className="dnb-drawer-list__arrow" />
  </ul>
</span>
`})}),s=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{scope:{data:m},children:`<DrawerList
  skipPortal
  open
  preventClose
  arrowPosition="left"
  data={data}
  value={3}
  onChange={({ data: selectedDataItem }) => {
    console.log('onChange', selectedDataItem)
  }}
  onOpen={() => {
    console.log('onOpen')
  }}
  observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
/>
`})}),c=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{"data-visual-test":`drawer-list-disabled`,children:`<DrawerList
  skipPortal
  open
  preventClose
  data={[
    {
      content: 'Item 1',
    },
    {
      content: 'Item 2, disabled',
      disabled: true,
    },
    {
      content: 'Item 3',
    },
  ]}
  observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
/>
`})}),l=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{children:`<DrawerList
  skipPortal
  open
  preventClose
  observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
>
  <DrawerList.Options>
    <DrawerList.Item
      style={{
        color: 'red',
      }}
      key="A"
      selected={false}
      value="A"
      onClick={() => {
        console.log('onClick')
      }}
    >
      Item 1
    </DrawerList.Item>
    <DrawerList.HorizontalItem
      style={{
        color: 'green',
      }}
      key="B"
      selected={false}
      value="B"
    >
      Item 2
    </DrawerList.HorizontalItem>
  </DrawerList.Options>
</DrawerList>
`})}),u=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{"data-visual-test":`drawer-list-inline-style`,children:`<DrawerList
  skipPortal
  open
  preventClose
  data={[
    {
      content:
        'They may be very large, like pneumonoultramicroscopicsilicovolcanoconiosis, a 45-letter hippopotomonstrosesquipedalian word for black lung disease.',
      style: {
        hyphens: 'auto',
        color: 'red',
      },
    },
    {
      content:
        'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease.',
      style: {
        hyphens: 'none',
        color: 'green',
      },
    },
    {
      content:
        'According to the Oxford English Dictionary the longest word in the language is pneumonoultramicroscopicsilicovolcanoconiosis, with 45 letters.',
      style: {
        hyphens: 'manual',
        color: 'blue',
      },
    },
  ]}
  observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
/>
`})}),d=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{scope:{data:m},noInline:!0,children:`const CustomComponent = () => (
  <CustomComponentInner
    onTouchStart={preventDefault}
    onClick={(e) => {
      console.log('Do something different')
      preventDefault(e)
    }}
  >
    Custom event handler
  </CustomComponentInner>
)
const CustomComponentInner = styled.span\`
  display: block;
  width: 100%;
  margin: -1rem -2rem -1rem -1rem;
  padding: 1rem 2rem 1rem 1rem;
\`
const preventDefault = (e) => {
  e.stopPropagation()
  e.preventDefault()
}
const CustomWidth = styled(DrawerList)\`
  .dnb-drawer-list__list {
    width: var(--drawer-list-width);
  }
\`
render(
  <CustomWidth
    skipPortal
    open
    preventClose
    right
    title="Choose an item"
    data={() => [
      <Link key="link" href="/">
        Go to this Link
      </Link>,
      'Or press on me',
      <CustomComponent key="custom" />,
    ]}
    onChange={({ value }) => {
      console.log('More menu:', value)
    }}
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
  />
)
`})}),f=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{noInline:!0,children:`const list = [
  {
    value: 'A',
  },
  {
    value: 'B',
  },
  {
    value: 'C',
  },
]
const CustomWidth = styled(DrawerList)\`
  .dnb-drawer-list__list {
    width: var(--drawer-list-width);
  }
\`
const DrawerListWithState = () => {
  const [selected, setSelected] = useState('C')
  return (
    <CustomWidth skipPortal open preventClose>
      <DrawerList.Options>
        {list.map(({ value, ...props }, i) => (
          <DrawerList.Item
            key={i}
            selected={value === selected}
            value={value}
            onClick={({ value }) => setSelected(value)}
            {...props}
          >
            {value}
          </DrawerList.Item>
        ))}
      </DrawerList.Options>
    </CustomWidth>
  )
}
render(<DrawerListWithState />)
`})}),p=r.div`
  [data-visual-test] {
    .dnb-drawer-list__list {
      position: relative;
    }
  }
  [data-visual-test='drawer-list'] .dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--drawer-list-width);
  }
`,m=[{selectedKey:`key_0`,content:`Item 1 Content`},{selectedKey:`key_1`,content:[`Item 2 Value`,`Item 2 Content`]},{selectedKey:`key_2`,content:[`Item 3 Content A`,`Item 3 Content B`]},{selectedKey:`key_3`,content:[`Item 4 Content A`,(0,i.jsx)(i.Fragment,{children:`Custom Component`})]}],h=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{scope:{data:m},hidePreview:!0,hideToolbar:!0,children:`<DrawerList
  optionsRender={({ Items, Item, data }) => (
    <>
      <Items />
      <Item>Addition</Item>
      {data.length > 1 && <li>Addition</li>}
    </>
  )}
/>
`})}),g=()=>(0,i.jsx)(p,{children:(0,i.jsx)(t,{"data-visual-test":`drawer-list-groups`,children:`<DrawerList
  skipPortal
  open
  preventClose
  observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
  groups={[undefined, 'Pets', undefined, 'Cars']}
  data={[
    {
      groupIndex: 0,
      content: 'Default 1',
    },
    {
      groupIndex: 0,
      content: 'Default 2',
    },
    {
      groupIndex: 1,
      content: 'Cat',
    },
    {
      groupIndex: 1,
      content: 'Dog',
    },
    {
      groupIndex: 2,
      content: 'Something',
    },
    {
      groupIndex: 3,
      content: 'Jeep',
    },
    {
      groupIndex: 3,
      content: 'Van',
    },
    {
      content: 'No group',
    },
  ]}
/>
`})});function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Default DrawerList, triggered by a ToggleButton`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`DrawerList list - only to visualize`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Default DrawerList`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Disabled`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`Custom event and link on single item`}),`
`,(0,i.jsx)(d,{}),`
`,(0,i.jsx)(t.h3,{children:`Using List and Items markup`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` By using this method you lose currently a lot of the core functionality like keyboard support and other accessibility features.`]}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsx)(t.h3,{children:`Inline styling using JSX`}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsxs)(t.h3,{children:[`Inline styling using `,(0,i.jsx)(t.code,{children:`data`})]}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(t.h3,{children:`Groups`}),`
`,(0,i.jsxs)(t.p,{children:[`If an item has a `,(0,i.jsx)(t.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,i.jsx)(t.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,i.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(_,{...e})}):_(e)}export{v as default,h as t};