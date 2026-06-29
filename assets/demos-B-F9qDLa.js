import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{N as n,P as r}from"./Anchor-BPx9fjvj.js";import{t as i}from"./Icon-C5IFEhlK.js";import{s as a}from"./ToggleButton-DfKpi57X.js";import{t as o}from"./newspaper-9Yv2Ouaz.js";import{pt as s}from"./forms-D54jfDKN.js";import{t as c}from"./P-CVKBz4XO.js";import{t as l}from"./Link-DsLLxgOh.js";import{t as u}from"./NumberFormatExport-DbB5PsBC.js";import{U as d,w as f}from"./index-BsJ3GLEw.js";import{t as p}from"./ComponentBox-sLMgHvLi.js";var m=e(t()),h=f.div`
  [data-visual-test='dropdown-list'] .dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`,g=[{selectedKey:`key_0`,selectedValue:`Item 1 Value`,content:`Item 1 Content`},{selectedKey:`key_1`,content:[`Item 2 Value`,`Item 2 Content`]},{selectedKey:`key_2`,selectedValue:`Item 3 Value`,content:[`Item 3 Content A`,`Item 3 Content B`]},{selectedKey:`key_3`,selectedValue:`Item 4 Value`,content:[`Item 4 Content A`,(0,m.jsx)(m.Fragment,{children:`Custom Component`})]}],_=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{stableName:`DropdownFind`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{NumberFormat:u,Dropdown:s},noInline:!0,children:`const scrollableData = [
  {
    content: 'A',
  },
  {
    content: 'B',
  },
  {
    selectedValue: (
      <NumberFormat.BankAccountNumber alwaysSelectAll>
        11345678962
      </NumberFormat.BankAccountNumber>
    ),
    content: [
      <NumberFormat.BankAccountNumber key="ban-1" alwaysSelectAll>
        11345678962
      </NumberFormat.BankAccountNumber>,
      'C',
    ],
  },
  {
    selectedValue: (
      <NumberFormat.BankAccountNumber alwaysSelectAll>
        15349648901
      </NumberFormat.BankAccountNumber>
    ),
    content: [
      <NumberFormat.BankAccountNumber key="ban-2" alwaysSelectAll>
        15349648901
      </NumberFormat.BankAccountNumber>,
      'D',
    ],
  },
  {
    content: 'E',
  },
  {
    selectedKey: 'key_1',
    selectedValue: 'Find me by keypress',
    content: ['F', 'F', 'F', 'F'],
  },
  {
    content: 'G',
  },
  {
    content: 'H',
  },
]
render(
  <Dropdown
    data={scrollableData}
    value="key_1" // use either index (5) or selectedKey: 'key_1'
    label="Label"
  />
)
`})}),v=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-closed`,stableName:`DropdownNoValue`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{NumberFormat:u,Dropdown:s},noInline:!0,children:`const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selectedKey: 'key_0',
    // (optional) is show instead of "content", once selected
    selectedValue: 'Item 1 Value',
    // Item content as a string or array
    content: 'Item 1 Content',
  },
  {
    selectedKey: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selectedValue: (
      <NumberFormat.BankAccountNumber alwaysSelectAll>
        11345678962
      </NumberFormat.BankAccountNumber>
    ),
    content: [
      <NumberFormat.BankAccountNumber key="ban" alwaysSelectAll>
        11345678962
      </NumberFormat.BankAccountNumber>,
      'Bank account number',
    ],
  },
  {
    selectedKey: 'key_2',
    selectedValue: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selectedKey: 'key_3',
    selectedValue: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]
render(
  <Dropdown
    data={data}
    label="Label"
    title="Please select a value"
    onChange={({ data }) => {
      console.log('onChange', data)
    }}
  />
)
`})}),y=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-ellipsis`,stableName:`DropdownEllipsisOverflow`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  data={['Long text that will overflow with CSS ellipsis']}
  value={0}
  label="Label"
/>
`})}),b=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{visualTestProps:e=>e?{direction:`top`}:{}},"data-visual-test":`dropdown-item-directions`,stableName:`DropdownDirections`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s,P:c},children:`<Dropdown
  label="Label"
  data={[
    ['Vertical', 'alignment'],
    <>
      <P weight="medium">Vertical</P>
      <P>alignment</P>
    </>,
    <Dropdown.HorizontalItem key="item-1">
      <P weight="medium" right="x-small">
        Horizontal
      </P>
      <P>alignment</P>
    </Dropdown.HorizontalItem>,
  ]}
  {...visualTestProps(globalThis.IS_TEST)}
/>
`})}),x=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{data:g},"data-visual-test":`dropdown-left-icon`,stableName:`DropdownIconLeft`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  label="Label"
  iconPosition="left"
  data={data}
  value={3}
  skipPortal={true}
  onChange={({ data: selectedDataItem }) => {
    console.log('onChange', selectedDataItem)
  }}
  onOpen={() => {
    console.log('onOpen')
  }}
/>
`})}),S=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{data:g},"data-visual-test":`dropdown-tertiary`,stableName:`DropdownTertiary`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  variant="tertiary"
  direction="bottom"
  independentWidth={true}
  iconPosition="left"
  align="left"
  data={data}
/>
`})}),C=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{data:g},"data-visual-test":`dropdown-tertiary-right`,stableName:`DropdownTertiaryRight`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  variant="tertiary"
  direction="bottom"
  independentWidth={true}
  iconPosition="right"
  align="right"
  data={data}
/>
`})}),w=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-independent_width_left`,stableName:`DropdownIndependentWidthLeft`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s,Link:l},children:`<Dropdown
  independentWidth={true}
  iconPosition="left"
  direction="top"
  title="Choose an item"
  data={() => [
    <Link href="/" key="item-1">
      Go to this Link
    </Link>,
    'Or press on me',
    <>Custom component</>,
  ]}
  right="small"
/>
`})}),T=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-independent_width_right`,stableName:`DropdownIndependentWidthRight`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s,Link:l},children:`<Dropdown
  independentWidth={true}
  iconPosition="right"
  direction="top"
  title="Choose an item"
  data={() => [
    <Link href="/" key="item-1">
      Go to this Link
    </Link>,
    'Or press on me',
    <>Custom component</>,
  ]}
  right="small"
/>
`})}),E=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{data:g},"data-visual-test":`dropdown-disabled`,stableName:`DropdownDisabled`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown disabled data={['Disabled Dropdown']} label="Label" />
`})}),D=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-disabled-options`,stableName:`DropdownDisabledOptions`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  data={[
    {
      content: 'Item 1 Content',
    },
    {
      content: 'Item 2 Content',
      disabled: true,
    },
    {
      content: 'Item 3 Content',
      disabled: true,
    },
    {
      content: 'Item 4 Content A',
    },
  ]}
  label="Label"
/>
`})}),O=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-disabled-tertiary`,stableName:`DropdownDisabledTertiary`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  disabled
  variant="tertiary"
  data={['Disabled Dropdown']}
  label="Disabled tertiary dropdown"
/>
`})}),k=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-sizes`,scope:{data:g},stableName:`DropdownSizes`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Flex:a,Dropdown:s},children:`<Flex.Vertical>
  <Dropdown label="Label" size="default" data={() => data} />
  <Dropdown label="Label" size="medium" data={() => data} />
  <Dropdown label="Label" size="large" data={() => data} />
</Flex.Vertical>
`})}),A=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{data:g},stableName:`DropdownCustomWidth`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s,Flex:a},noInline:!0,children:`const CustomWidthOne = styled(Dropdown)\`
  .dnb-dropdown__shell {
    width: 10rem;
  }
\`
const CustomWidthTwo = styled(Dropdown)\`
  &.dnb-dropdown--is-popup .dnb-drawer-list__root {
    width: 12rem;
  }
\`
const CustomWidthThree = styled(Dropdown)\`
  /** Change the "__shell" width */
  .dnb-dropdown__shell {
    width: 10rem;
  }

  /** Change the "__list" width */
  .dnb-drawer-list__root {
    width: 20rem;
  }
\`
const CustomWidthFour = styled(Dropdown)\`
  width: 60%;
  min-width: 224px; /** 14rem (please use pixels on min-width!) */
  max-width: 25rem;

  /** In case we have a label */
  .dnb-form-label + .dnb-dropdown__inner {
    width: 100%;
  }
\`
render(
  <Flex.Vertical>
    <CustomWidthOne
      label="Label"
      size="default"
      iconPosition="left"
      data={data}
    />
    <CustomWidthTwo
      label="Label"
      size="small"
      preventSelection
      title={null}
      data={data}
    />
    <CustomWidthThree
      label="Label"
      size="large"
      align="right"
      data={data}
    />
    <CustomWidthFour
      title="Min and max width"
      stretch={true}
      data={data}
    />
  </Flex.Vertical>
)
`})}),j=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-status-error`,scope:{data:g},stableName:`DropdownStatusVertical`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown data={data} label="Label" status="Message to the user" />
`})}),M=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-list`,scope:{data:g},hideCode:!0,stableName:`DropdownListOpened`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{NumberFormat:u},children:`<span className="dnb-drawer-list dnb-drawer-list--open">
  <span className="dnb-drawer-list__list">
    <ul className="dnb-drawer-list__options">
      <li className="dnb-drawer-list__option first-of-type">
        <span className="dnb-drawer-list__option__inner">
          Brukskonto - Kari Nordmann
        </span>
      </li>
      <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
        <span className="dnb-drawer-list__option__inner">
          <span className="dnb-drawer-list__option__item item-nr-1">
            <NumberFormat.BankAccountNumber alwaysSelectAll key="n-1">
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
            <NumberFormat.BankAccountNumber alwaysSelectAll key="n-2">
              11345678962
            </NumberFormat.BankAccountNumber>
          </span>
          <span className="dnb-drawer-list__option__item">
            Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
          </span>
        </span>
      </li>
      <li className="dnb-drawer-list__option last-of-type">
        <span className="dnb-drawer-list__option__inner">
          <span className="dnb-drawer-list__option__item item-nr-1">
            <NumberFormat.BankAccountNumber alwaysSelectAll key="n-3">
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
</span>
`})}),N=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{scope:{chevron_right:n,newspaper:o,chevron_down:r},stableName:`DropdownCustomizedLook`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Icon:i,Dropdown:s},noInline:!0,children:`const styles = {
  customTrigger: {
    backgroundColor: '#d4ecc5',
    color: '#14555a',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontWeight: 600,
  },
  customMenuItem: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customMenuItemTitle: {
    display: 'flex',
    flexFlow: 'column',
    gap: '0.5rem',
  },
}
const MenuItem = ({ title, content, key }) => (
  <span style={styles.customMenuItem} key="item-1">
    <span style={styles.customMenuItemTitle}>
      {title}
      <span>{content}</span>
    </span>
    <Icon icon={chevron_right} />
  </span>
)
const data = {
  accounts: (
    <MenuItem key="item-1" title="Accounts" content={'Bills, Savings'} />
  ),
  loans: <MenuItem key="item-2" title="Loans" content={'Mortgage, Car'} />,
  cards: (
    <MenuItem key="item-3" title="Cards" content={'Visa, Mastercard'} />
  ),
  stocks: (
    <MenuItem key="item-4" title="Stocks" content={'Nvidia, Apple'} />
  ),
}
render(
  <Dropdown
    data={data}
    preventSelection
    triggerElement={(props) => (
      <button {...props} style={styles.customTrigger}>
        <Icon icon={newspaper} /> Custom trigger{' '}
        <Icon icon={chevron_down} />
      </button>
    )}
  />
)
`})}),P=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{"data-visual-test":`dropdown-groups`,stableName:`DropdownGroups`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  groups={[undefined, 'Pets', 'Cars']}
  data={[
    {
      groupIndex: 0,
      content: 'Default 2',
    },
    {
      groupIndex: 0,
      content: 'Default 1',
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
      content: 'Jeep',
    },
    {
      groupIndex: 2,
      content: 'Van',
    },
  ]}
/>
`})}),F=()=>(0,m.jsx)(h,{children:(0,m.jsx)(p,{stableName:`DropdownNoDivider`,sourceImports:[`import styled from '@emotion/styled'`,`import { Dropdown, NumberFormat, Icon, Link, P, Flex } from '@dnb/eufemia'`,`import { chevron_down, chevron_right, newspaper } from '@dnb/eufemia/icons'`,`import { DropdownAllProps } from '@dnb/eufemia/components/dropdown/Dropdown'`],__buildScope:{Dropdown:s},children:`<Dropdown
  noDivider
  data={['Cat', 'Dog', 'Canary', 'Hamster', 'Piglet']}
/>
`})});function I(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...d(),...e.components},{VisibleWhenVisualTest:n}=t;return n||R(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Default dropdown`}),`
`,(0,m.jsxs)(t.p,{children:[`No `,(0,m.jsx)(t.code,{children:`value`}),` is defined, but a `,(0,m.jsx)(t.code,{children:`title`}),` is given.`]}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Dropdown with different item content directions`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`Icon on left side`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Dropdown as tertiary variant`}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(C,{})}),`
`,(0,m.jsx)(t.h3,{children:`Dropdown in different sizes`}),`
`,(0,m.jsxs)(t.p,{children:[`Four sizes are available: `,(0,m.jsx)(t.code,{children:`small`}),`, `,(0,m.jsx)(t.code,{children:`default`}),`, `,(0,m.jsx)(t.code,{children:`medium`}),` and `,(0,m.jsx)(t.code,{children:`large`})]}),`
`,(0,m.jsx)(k,{}),`
`,(0,m.jsx)(t.h3,{children:`Custom width`}),`
`,(0,m.jsx)(A,{}),`
`,(0,m.jsx)(t.h3,{children:`Dropdown with status`}),`
`,(0,m.jsx)(t.p,{children:`And vertical label layout.`}),`
`,(0,m.jsx)(j,{}),`
`,(0,m.jsx)(t.h3,{children:`Findable list`}),`
`,(0,m.jsx)(t.p,{children:`With long list to make it scrollable and searchable`}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Disabled dropdown`}),`
`,(0,m.jsx)(E,{}),`
`,(0,m.jsx)(t.p,{children:`Individual options can also be disabled.`}),`
`,(0,m.jsx)(D,{}),`
`,(0,m.jsx)(t.h3,{children:`Disabled tertiary dropdown`}),`
`,(0,m.jsx)(O,{}),`
`,(0,m.jsx)(t.h3,{children:`Customized Dropdown`}),`
`,(0,m.jsxs)(t.p,{children:[`An example of how you can customize the look of your `,(0,m.jsx)(t.code,{children:`Dropdown`})]}),`
`,(0,m.jsx)(N,{}),`
`,(0,m.jsx)(t.h3,{children:`DrawerList opened`}),`
`,(0,m.jsx)(t.p,{children:`Only to visualize and used for visual testing`}),`
`,(0,m.jsx)(M,{}),`
`,(0,m.jsxs)(n,{children:[(0,m.jsx)(y,{}),(0,m.jsx)(w,{}),(0,m.jsx)(T,{})]}),`
`,(0,m.jsx)(t.h3,{children:`Groups`}),`
`,(0,m.jsxs)(t.p,{children:[`If an item has a `,(0,m.jsx)(t.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,m.jsx)(t.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,m.jsx)(P,{}),`
`,(0,m.jsx)(t.h2,{children:`No divider`}),`
`,(0,m.jsxs)(t.p,{children:[`We can remove the divider between items with the `,(0,m.jsx)(t.code,{children:`noDivider`}),` prop. Beware that this can make information dense lists difficult to parse.`]}),`
`,(0,m.jsx)(F,{})]})}function L(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(I,{...e})}):I(e)}function R(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{L as default};