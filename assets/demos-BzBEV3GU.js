import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{Q as r,t as i}from"./Anchor-9saPtqqX.js";import{t as a}from"./fish_medium-CF1gHfUZ.js";import{t as o}from"./Button-B0t-0slw.js";import{f as s}from"./Autocomplete-D_rgJ8Uh.js";import{t as c}from"./Avatar-C1b2Vlj5.js";import{t as l}from"./P-BqMs-VnB.js";import{i as u}from"./HelpButton-BpexiOO0.js";import{t as d}from"./Link-DiFl42-p.js";import{t as ee}from"./Span-ChxJQplG.js";import{c as f}from"./ToggleButton-BMi2PwcS.js";import{t as p}from"./Card-ClZNWqpG.js";import{t as m}from"./DateFormat-BiUyu80W.js";import{t as h}from"./export-avtDz_zM.js";import{t as g}from"./ListExport-D75QHdxY.js";import{t as _}from"./NumberFormatExport-lvr8n9zZ.js";import{t as v}from"./Form-C8lTzZqR.js";import{t as y}from"./Field-neGd0eKd.js";import{t as b}from"./Value-Cjs3mKU7.js";import{G as x,K as S,M as C,W as w}from"./index-Bx3ttow-.js";import{t as T}from"./ComponentBox-CG7uqrFy.js";var E=e({Accordion:()=>H,BackgroundColor:()=>L,FooterWithButtons:()=>A,GridColumns:()=>q,InsideCard:()=>J,InsideCardWithoutScrollView:()=>Y,ListSubline:()=>W,NavigableItem:()=>j,NavigableItemWithCustomElement:()=>N,NavigableItemWithHref:()=>M,PendingState:()=>z,ProgressIndicatorRow:()=>B,RowsWithSlots:()=>k,SelectedState:()=>I,SeparatedLists:()=>V,SimpleRows:()=>O,SkeletonState:()=>R,WithAnchor:()=>P,WithAvatar:()=>F,WithBadge:()=>G,WithDateFormat:()=>U,WithFormElements:()=>K,WithShowMoreButton:()=>X}),D=t(n()),O=()=>(0,D.jsx)(T,{stableName:`SimpleRows`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Value:b},noInline:!0,children:`const myList = [
  {
    name: 'List item 1',
    amount: 10000,
  },
  {
    name: 'List item 2',
    amount: 5000,
  },
  {
    name: 'List item 3',
    amount: 7500,
  },
]
render(
  <List.Container>
    {myList.map((account) => (
      <List.Item.Basic key={account.name} title={account.name}>
        <List.Cell.End>
          <Value.Currency value={account.amount} />
        </List.Cell.End>
      </List.Item.Basic>
    ))}
  </List.Container>
)
`}),k=()=>(0,D.jsx)(T,{"data-visual-test":`list-slots`,scope:{fish_medium:a},stableName:`RowsWithSlots`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,P:l},children:`<List.Container>
  <List.Item.Basic>
    <List.Cell.Start>Start</List.Cell.Start>
    <List.Cell.Center>Center</List.Cell.Center>
    <List.Cell.End>End</List.Cell.End>
  </List.Item.Basic>

  <List.Item.Basic title="Title" icon={fish_medium}>
    <List.Cell.End>End</List.Cell.End>
  </List.Item.Basic>

  <List.Item.Basic>
    <List.Cell.Title>
      <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
      Title
      <List.Cell.Title.Subline variant="description">
        Subline
      </List.Cell.Title.Subline>
    </List.Cell.Title>
    <List.Cell.End>End</List.Cell.End>
    <List.Cell.Footer
      style={{
        background: 'var(--token-color-background-neutral-subtle)',
      }}
    >
      <P>Footer</P>
    </List.Cell.Footer>
  </List.Item.Basic>
</List.Container>
`}),A=()=>(0,D.jsx)(T,{"data-visual-test":`list-footer`,scope:{fish_medium:a},stableName:`FooterWithButtons`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_,Flex:f,Button:o,Value:b,Span:ee,Accordion:x,P:l},children:`<List.Container>
  <List.Item.Basic title="Item with actions" icon={fish_medium}>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
    <List.Cell.Footer>
      <Flex.Horizontal>
        <Button text="Save" />
        <Button variant="tertiary" text="Delete" />
      </Flex.Horizontal>
    </List.Cell.Footer>
  </List.Item.Basic>

  <List.Item.Action icon={fish_medium} title="Action item with footer">
    <List.Cell.End>
      <Value.Currency value={5678} />
    </List.Cell.End>
    <List.Cell.Footer>
      <Span>
        Do not put interactive elements (e.g. Button) inside a footer when
        using List.Item.Action.
      </Span>
    </List.Cell.Footer>
  </List.Item.Action>

  <List.Item.Accordion chevronPosition="left" title="Accordion title">
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <NumberFormat.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Cell.Footer
      style={{
        background: 'var(--token-color-background-neutral-subtle)',
      }}
    >
      <P>
        Do not put interactive elements (e.g. Button) inside a footer when
        using List.Item.Accordion.
      </P>
    </List.Cell.Footer>

    <List.Item.Accordion.Content innerSpace>
      <P>Accordion content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),j=()=>(0,D.jsx)(T,{"data-visual-test":`list-action`,scope:{fish_medium:a},stableName:`NavigableItem`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_},children:`<List.Container>
  <List.Item.Action
    icon={fish_medium}
    title="Navigate to details"
    onClick={() => console.log('Clicked')}
  >
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Action
    chevronPosition="left"
    title="Left aligned chevron"
    onClick={() => console.log('Clicked')}
  >
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),M=()=>(0,D.jsx)(T,{"data-visual-test":`list-action-href`,scope:{fish_medium:a},stableName:`NavigableItemWithHref`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_},children:`<List.Container>
  <List.Item.Action
    icon={fish_medium}
    title="Link to details"
    href="#details"
  >
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Action
    icon={fish_medium}
    title="External link (opens in new tab)"
    href="https://eufemia.dnb.no/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <List.Cell.End>
      <NumberFormat.Currency value={5678} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),N=()=>(0,D.jsx)(T,{scope:{fish_medium:a},stableName:`NavigableItemWithCustomElement`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_},noInline:!0,children:`// Example using a custom link component (e.g. React Router's Link).
// Pass the component via the \`element\` prop and the route via \`to\`.
function MyLink({ to, children, ...rest }) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  )
}
render(
  <List.Container>
    <List.Item.Action
      element={MyLink}
      to="#custom-route"
      icon={fish_medium}
      title="Navigate with custom element"
    >
      <List.Cell.End>
        <NumberFormat.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
`}),P=()=>(0,D.jsx)(T,{scope:{fish_medium:a},stableName:`WithAnchor`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Anchor:i,Link:d,NumberFormat:_},children:`<List.Container>
  <List.Item.Basic title={<Anchor href="#">Link to page one</Anchor>} />

  <List.Item.Basic
    icon={fish_medium}
    title={<Anchor href="#">Link with icon and end value</Anchor>}
  >
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Basic>
</List.Container>
`}),F=()=>(0,D.jsx)(T,{"data-visual-test":`list-avatar`,stableName:`WithAvatar`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Avatar:c,NumberFormat:_,Value:b,Accordion:x,P:l},children:`<List.Container>
  <List.Item.Basic title="Alice Andersen">
    <List.Cell.Start>
      <Avatar size="medium" hasLabel>
        A
      </Avatar>
    </List.Cell.Start>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Basic>

  <List.Item.Action title="Bob Berg" onClick={() => {}}>
    <List.Cell.Start>
      <Avatar size="medium" hasLabel>
        B
      </Avatar>
    </List.Cell.Start>
    <List.Cell.End>
      <Value.Currency value={5678} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Accordion title="Carol with image">
    <List.Item.Accordion.Header>
      <List.Cell.Start>
        <Avatar size="medium" hasLabel>
          C
        </Avatar>
      </List.Cell.Start>
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),I=()=>(0,D.jsx)(T,{stableName:`SelectedState`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g},children:`<List.Container>
  <List.Item.Basic>Normal row</List.Item.Basic>

  <List.Item.Basic selected>Selected row</List.Item.Basic>

  <List.Item.Basic>Another normal row</List.Item.Basic>
</List.Container>
`}),L=()=>(0,D.jsx)(T,{stableName:`BackgroundColor`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g},children:`<List.Container>
  <List.Item.Basic>Normal row</List.Item.Basic>

  <List.Item.Basic
    style={{
      ['--list-item-background-color' as string]:
        'var(--color-mint-green-12)',
    }}
  >
    Custom background color (not selected)
  </List.Item.Basic>

  <List.Item.Basic>Another normal row</List.Item.Basic>
</List.Container>
`}),R=()=>(0,D.jsx)(T,{scope:{fish_medium:a},background:`plain`,stableName:`SkeletonState`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_},children:`<List.Container>
  <List.Item.Action icon={fish_medium} title="Loading item…" skeleton>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),z=()=>(0,D.jsx)(T,{"data-visual-test":`list-pending`,scope:{fish_medium:a},stableName:`PendingState`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,NumberFormat:_},children:`<List.Container>
  <List.Item.Action icon={fish_medium} title="Pending item ..." pending>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),B=()=>(0,D.jsx)(T,{stableName:`ProgressIndicatorRow`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,ProgressIndicator:s},children:`<List.Container>
  <List.Item.Basic>
    <List.Cell.Start>
      <ProgressIndicator
        size="medium"
        showDefaultLabel
        labelDirection="horizontal"
      />
    </List.Cell.Start>
  </List.Item.Basic>
</List.Container>
`}),V=()=>(0,D.jsx)(T,{"data-visual-test":`list-separated`,scope:{fish_medium:a},stableName:`SeparatedLists`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Value:b},children:`<List.Container separated>
  <List.Item.Basic icon={fish_medium} title="Title 1">
    <List.Cell.End>
      <Value.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Basic>

  <List.Item.Basic icon={fish_medium} title="Title 2">
    <List.Cell.End>
      <Value.Currency value={4567} />
    </List.Cell.End>
  </List.Item.Basic>
</List.Container>
`}),H=()=>(0,D.jsx)(T,{"data-visual-test":`list-accordion`,scope:{fish_medium:a},stableName:`Accordion`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Accordion:x,NumberFormat:_,P:l,Code:r},children:`<List.Container>
  <List.Item.Accordion icon={fish_medium} title="Accordion title">
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <NumberFormat.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Accordion.Header>

    <List.Item.Accordion.Content innerSpace>
      <P>Accordion content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>

  <List.Item.Accordion open title="Opened by default">
    <List.Item.Accordion.Content innerSpace>
      <P>This section is open initially.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>

  <List.Item.Accordion chevronPosition="left" title="Chevron on the left">
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <NumberFormat.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>
        Use <Code>chevronPosition="left"</Code> to place the chevron on the
        left.
      </P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),U=()=>(0,D.jsx)(T,{"data-visual-test":`list-overline`,stableName:`WithDateFormat`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,DateFormat:m,Value:b,Accordion:x,P:l,Code:r},children:`<List.Container>
  <List.Item.Basic title="In Basic Item">
    <List.Cell.Start fontSize="small">
      <DateFormat
        value={new Date('2026-02-07')}
        dateStyle="medium"
        hideCurrentYear
      />
    </List.Cell.Start>
    <List.Cell.End>
      <Value.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Basic>

  <List.Item.Action>
    <List.Cell.Title>
      <List.Cell.Title.Overline>
        <DateFormat
          value={new Date('2026-02-07')}
          dateStyle="medium"
          hideCurrentYear
        />
      </List.Cell.Title.Overline>
      In Action Item
    </List.Cell.Title>
    <List.Cell.End>
      <Value.Currency value={5678} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Accordion>
    <List.Item.Accordion.Header>
      <List.Cell.Title>
        <List.Cell.Title.Overline>
          <DateFormat
            value={new Date('2026-02-07')}
            dateStyle="medium"
            hideCurrentYear
          />
        </List.Cell.Title.Overline>
        In Accordion Item
      </List.Cell.Title>
      <List.Cell.End>
        <Value.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>
        Use <Code>chevronPosition="left"</Code> to place the chevron on the
        left.
      </P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),W=()=>(0,D.jsx)(T,{"data-visual-test":`list-subline`,scope:{fish_medium:a},stableName:`ListSubline`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,DateFormat:m,Value:b,Accordion:x,Flex:f,Badge:w,P:l},children:`<List.Container>
  <List.Item.Action icon={fish_medium}>
    <List.Cell.Title>
      <span>Item 1</span>
      <List.Cell.Title.Subline>
        <DateFormat
          value={new Date('2026-02-07')}
          dateStyle="medium"
          hideCurrentYear
        />
      </List.Cell.Title.Subline>
    </List.Cell.Title>
    <List.Cell.End>
      <Value.Currency value={5678} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Accordion icon={fish_medium}>
    <List.Item.Accordion.Header>
      <List.Cell.Title>
        <span>Item 2</span>
        <List.Cell.Title.Subline>Detail 1</List.Cell.Title.Subline>
        <List.Cell.Title.Subline variant="description">
          Detail 2
        </List.Cell.Title.Subline>
        <List.Cell.Title.Subline>
          <Flex.Horizontal rowGap="x-small">
            <Badge status="neutral" subtle content="Detail 3" />
            <Badge status="neutral" subtle content="Detail 3" />
          </Flex.Horizontal>
        </List.Cell.Title.Subline>
      </List.Cell.Title>
      <List.Cell.End>
        <Value.Currency value={5678} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Accordion content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>

  <List.Item.Action title="Title" icon={fish_medium}>
    <List.Cell.End>
      <Value.Currency value={5678} />
      <List.Cell.Title.Subline variant="description">
        Subline
      </List.Cell.Title.Subline>
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),G=()=>(0,D.jsx)(T,{scope:{fish_medium:a},stableName:`WithBadge`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Badge:w,Accordion:x,Flex:f,Value:b,P:l},children:`<List.Container>
  <List.Item.Action title="In Action Item" icon={fish_medium}>
    <List.Cell.End>
      <Badge content="Badge" />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Accordion title="In Accordion Item" icon={fish_medium}>
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <Flex.Horizontal>
          <Badge
            content={3}
            label="Notifications"
            variant="notification"
          />
          <Value.Currency value={1234} />
        </Flex.Horizontal>
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Accordion content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),K=()=>(0,D.jsx)(T,{"data-visual-test":`list-form-elements`,stableName:`WithFormElements`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{Form:v,Flex:f,Field:y,List:g,Value:b},noInline:!0,children:`render(
  <Form.Handler
    defaultData={{
      mySelection: 'bar',
      myArraySelection: ['bar'],
      myDataPath: [
        {
          value: 'foo',
          title: 'Foo!',
          amount: 1234,
        },
        {
          value: 'bar',
          title: 'Baar!',
          amount: 5678,
        },
        {
          value: 'baz',
          title: 'Baz!',
          amount: 9999,
        },
      ],
    }}
  >
    <Flex.Stack>
      <Field.Selection
        label="Single choice"
        variant="radio"
        path="/mySelection"
        dataPath="/myDataPath"
        width="large"
      >
        {({ value: selectedValue, options = [] }) => {
          return (
            <List.Container>
              {options.map(({ value, title, amount }) => {
                return (
                  <List.Item.Basic
                    key={value}
                    selected={value === selectedValue}
                  >
                    <List.Cell.Start>
                      <Field.Option value={value} title={title} />
                    </List.Cell.Start>
                    <List.Cell.End>
                      <Value.Currency value={amount} />
                    </List.Cell.End>
                  </List.Item.Basic>
                )
              })}
            </List.Container>
          )
        }}
      </Field.Selection>

      <Field.ArraySelection
        label="Multiple choice"
        variant="checkbox"
        path="/myArraySelection"
        dataPath="/myDataPath"
        width="large"
      >
        {({ value = [], options = [] }) => {
          return (
            <List.Container>
              {options.map(({ value: optionValue, title, amount }) => {
                return (
                  <List.Item.Basic
                    key={optionValue}
                    selected={value.includes(optionValue)}
                  >
                    <List.Cell.Start>
                      <Field.Option value={optionValue} title={title} />
                    </List.Cell.Start>
                    <List.Cell.End>
                      <Value.Currency value={amount} />
                    </List.Cell.End>
                  </List.Item.Basic>
                )
              })}
            </List.Container>
          )
        }}
      </Field.ArraySelection>
    </Flex.Stack>
  </Form.Handler>
)
`}),q=()=>(0,D.jsx)(T,{scope:{fish_medium:a},background:`plain`,stableName:`GridColumns`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{Grid:h,List:g,NumberFormat:_,P:l},children:`<Grid.Container
  rowGap
  columnGap
  style={{
    marginInline: 'auto',
    maxInlineSize: 'var(--layout-medium)',
  }}
>
  <Grid.Item
    span={{
      small: 'full',
      medium: [1, 4],
      large: [5, 12],
    }}
  >
    <List.Container>
      <List.Item.Action icon={fish_medium} title="Navigate to details">
        <List.Cell.End>
          <NumberFormat.Currency value={1234} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Navigate to details">
        <List.Cell.End>
          <NumberFormat.Currency value={1234} />
        </List.Cell.End>
      </List.Item.Action>
    </List.Container>
  </Grid.Item>

  <Grid.Item
    span={{
      small: 'full',
      medium: [5, 6],
      large: [1, 4],
    }}
    style={{
      display: 'gid',
      placeContent: 'center',
      textAlign: 'center',
      background: 'var(--token-color-background-neutral-subtle)',
    }}
  >
    <P>Second Grid Item</P>
  </Grid.Item>
</Grid.Container>
`}),J=()=>(0,D.jsx)(T,{"data-visual-test":`list-card`,scope:{fish_medium:a},stableName:`InsideCard`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Card:p,Heading:C,ScrollView:u,Value:b},children:`<List.Card>
  <Heading size="medium">Transactions</Heading>

  <List.ScrollView maxVisibleListItems={4}>
    <List.Container>
      <List.Item.Action icon={fish_medium} title="Payment received">
        <List.Cell.End>
          <Value.Currency value={1234} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Transfer sent">
        <List.Cell.End>
          <Value.Currency value={-500} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Subscription">
        <List.Cell.End>
          <Value.Currency value={-99} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Refund">
        <List.Cell.End>
          <Value.Currency value={250} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Salary">
        <List.Cell.End>
          <Value.Currency value={45000} />
        </List.Cell.End>
      </List.Item.Action>

      <List.Item.Action icon={fish_medium} title="Groceries">
        <List.Cell.End>
          <Value.Currency value={-320} />
        </List.Cell.End>
      </List.Item.Action>
    </List.Container>
  </List.ScrollView>
</List.Card>
`}),Y=()=>(0,D.jsx)(T,{"data-visual-test":`list-card-no-scroll-view`,scope:{fish_medium:a},stableName:`InsideCardWithoutScrollView`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{List:g,Card:p,Value:b},children:`<List.Card innerSpace="x-small">
  <List.Container>
    <List.Item.Action
      icon={fish_medium}
      title="Payment received"
      onClick={() => {}}
    >
      <List.Cell.End>
        <Value.Currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Action
      icon={fish_medium}
      title="Transfer sent"
      onClick={() => {}}
    >
      <List.Cell.End>
        <Value.Currency value={-500} />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Basic icon={fish_medium} title="Subscription">
      <List.Cell.End>
        <Value.Currency value={-99} />
      </List.Cell.End>
    </List.Item.Basic>
  </List.Container>
</List.Card>
`}),X=()=>(0,D.jsx)(T,{scope:{fish_medium:a},background:`plain`,stableName:`WithShowMoreButton`,sourceImports:[`import { Anchor, Avatar, Badge, Button, Code, DateFormat, Flex, Grid, Heading, List, NumberFormat, P, ProgressIndicator, Span } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { fish_medium } from '@dnb/eufemia/icons'`],__buildScope:{Flex:f,Heading:C,List:g,Value:b,Accordion:x,P:l},children:`
<Flex.Horizontal justify="space-between" align="center" bottom>
  <Heading size="medium" top={false} bottom={false}>
    Transactions
  </Heading>
  <List.ShowMoreButton id="my-limited-list" />
</Flex.Horizontal>
<List.Container id="my-limited-list" visibleCount={3}>
  <List.Item.Action icon={fish_medium} title="Payment received">
    <List.Cell.End>
      <Value.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
   <List.Item.Accordion
    icon={fish_medium}
    title="Transfer sent (Accordion)"
  >
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <Value.Currency value={-500} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Details about the transfer go here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
   <List.Item.Basic icon={fish_medium} title="Subscription">
    <List.Cell.End>
      <Value.Currency value={-99} />
    </List.Cell.End>
  </List.Item.Basic>
   <List.Item.Action icon={fish_medium} title="Refund">
    <List.Cell.End>
      <Value.Currency value={250} />
    </List.Cell.End>
  </List.Item.Action>
   <List.Item.Action icon={fish_medium} title="Salary">
    <List.Cell.End>
      <Value.Currency value={45000} />
    </List.Cell.End>
  </List.Item.Action>
   <List.Item.Accordion icon={fish_medium} title="Groceries (Accordion)">
    <List.Item.Accordion.Header>
      <List.Cell.End>
        <Value.Currency value={-320} />
      </List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Details about the transfer go here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>

`});function Z(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,strong:`strong`,...S(),...e.components};return E||$(`Examples`,!1),H||$(`Examples.Accordion`,!0),L||$(`Examples.BackgroundColor`,!0),A||$(`Examples.FooterWithButtons`,!0),q||$(`Examples.GridColumns`,!0),J||$(`Examples.InsideCard`,!0),Y||$(`Examples.InsideCardWithoutScrollView`,!0),W||$(`Examples.ListSubline`,!0),j||$(`Examples.NavigableItem`,!0),N||$(`Examples.NavigableItemWithCustomElement`,!0),M||$(`Examples.NavigableItemWithHref`,!0),z||$(`Examples.PendingState`,!0),B||$(`Examples.ProgressIndicatorRow`,!0),k||$(`Examples.RowsWithSlots`,!0),I||$(`Examples.SelectedState`,!0),V||$(`Examples.SeparatedLists`,!0),O||$(`Examples.SimpleRows`,!0),R||$(`Examples.SkeletonState`,!0),P||$(`Examples.WithAnchor`,!0),F||$(`Examples.WithAvatar`,!0),G||$(`Examples.WithBadge`,!0),U||$(`Examples.WithDateFormat`,!0),K||$(`Examples.WithFormElements`,!0),X||$(`Examples.WithShowMoreButton`,!0),(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(t.h2,{children:`Demos`}),`
`,(0,D.jsx)(t.h3,{children:`Rows with cells like Start, Center, End, Title`}),`
`,(0,D.jsx)(t.p,{children:`This example demonstrates different cell layouts and their placement.`}),`
`,(0,D.jsx)(k,{}),`
`,(0,D.jsx)(t.h3,{children:`Navigable item`}),`
`,(0,D.jsx)(j,{}),`
`,(0,D.jsx)(t.h3,{children:`Navigable item with href`}),`
`,(0,D.jsxs)(t.p,{children:[`Use the `,(0,D.jsx)(t.code,{children:`href`}),` property on `,(0,D.jsx)(t.code,{children:`List.Item.Action`}),` to render a native link. Use `,(0,D.jsx)(t.code,{children:`target`}),` and `,(0,D.jsx)(t.code,{children:`rel`}),` for external links (e.g. `,(0,D.jsx)(t.code,{children:`target="_blank"`}),` with `,(0,D.jsx)(t.code,{children:`rel="noopener noreferrer"`}),`).`]}),`
`,(0,D.jsx)(M,{}),`
`,(0,D.jsx)(t.h3,{children:`Navigable item with custom element`}),`
`,(0,D.jsxs)(t.p,{children:[`Use the `,(0,D.jsx)(t.code,{children:`element`}),` prop to render a custom link component such as React Router's `,(0,D.jsx)(t.code,{children:`Link`}),`. Pass the route via the `,(0,D.jsx)(t.code,{children:`to`}),` prop directly on `,(0,D.jsx)(t.code,{children:`List.Item.Action`}),` — the entire row will be clickable.`]}),`
`,(0,D.jsx)(N,{}),`
`,(0,D.jsx)(t.h3,{children:`With anchor`}),`
`,(0,D.jsxs)(t.p,{children:[`List items containing `,(0,D.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` links.`]}),`
`,(0,D.jsx)(P,{}),`
`,(0,D.jsx)(t.h3,{children:`Accordion`}),`
`,(0,D.jsxs)(t.p,{children:[`Expandable list items using `,(0,D.jsx)(t.code,{children:`List.Item.Accordion`}),` with optional `,(0,D.jsx)(t.code,{children:`icon`}),` and `,(0,D.jsx)(t.code,{children:`title`}),` properties and `,(0,D.jsx)(t.code,{children:`List.Item.Accordion.Content`}),` for the expandable section. Use the `,(0,D.jsx)(t.code,{children:`open`}),` property to set the initial open state.`]}),`
`,(0,D.jsx)(H,{}),`
`,(0,D.jsx)(t.h3,{children:`With Badge`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.a,{href:`/uilib/components/badge`,children:`Badge`}),` in `,(0,D.jsx)(t.code,{children:`List.Cell.End`}),` to show status or counts.`]}),`
`,(0,D.jsx)(G,{}),`
`,(0,D.jsx)(t.h3,{children:`Footer with buttons`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`List.Cell.Footer`}),` to place actions such as `,(0,D.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),` in the list row.`]}),`
`,(0,D.jsx)(A,{}),`
`,(0,D.jsx)(t.h3,{children:`Responsive Grid Layout`}),`
`,(0,D.jsxs)(t.p,{children:[`Using `,(0,D.jsx)(t.a,{href:`/uilib/layout/grid/container`,children:`Grid.Container`}),` with `,(0,D.jsx)(t.a,{href:`/uilib/layout/grid/item`,children:`Grid.Item`}),` for a 12-column responsive grid.`]}),`
`,(0,D.jsx)(q,{}),`
`,(0,D.jsx)(t.h3,{children:`Separated lists`}),`
`,(0,D.jsxs)(t.p,{children:[`Use the `,(0,D.jsx)(t.code,{children:`separated`}),` property on `,(0,D.jsx)(t.code,{children:`List.Container`}),` to add row gap between list items.`]}),`
`,(0,D.jsx)(V,{}),`
`,(0,D.jsx)(t.h3,{children:`Dynamic list`}),`
`,(0,D.jsx)(O,{}),`
`,(0,D.jsx)(t.h3,{children:`With DateFormat`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.a,{href:`/uilib/components/date-format`,children:`DateFormat`}),` in `,(0,D.jsx)(t.code,{children:`List.Cell.Start`}),` to show dates in the list row.`]}),`
`,(0,D.jsx)(U,{}),`
`,(0,D.jsx)(t.h3,{children:`With Subline`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`List.Cell.Title.Subline`}),` to add supporting text below the title. The `,(0,D.jsx)(t.code,{children:`variant="description"`}),` option uses smaller text for secondary information.`]}),`
`,(0,D.jsx)(W,{}),`
`,(0,D.jsx)(t.h3,{children:`With form elements`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` and `,(0,D.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),` render prop children to compose list rows and `,(0,D.jsx)(t.code,{children:`selected`}),` state.`]}),`
`,(0,D.jsxs)(t.p,{children:[`Place them inside `,(0,D.jsx)(t.code,{children:`List.Cell.Start`}),` to align them to the left side of the list row.`]}),`
`,(0,D.jsx)(K,{}),`
`,(0,D.jsx)(t.h3,{children:`With avatar`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.a,{href:`/uilib/components/avatar`,children:`Avatar`}),` in `,(0,D.jsx)(t.code,{children:`List.Cell.Start`}),` as the left content.`]}),`
`,(0,D.jsx)(F,{}),`
`,(0,D.jsx)(t.h3,{children:`Selected state`}),`
`,(0,D.jsxs)(t.p,{children:[`Provide the `,(0,D.jsx)(t.code,{children:`selected`}),` property on `,(0,D.jsx)(t.code,{children:`List.Item.Basic`}),` for selectable rows. When a `,(0,D.jsx)(t.strong,{children:`checkbox`}),` or `,(0,D.jsx)(t.strong,{children:`radio`}),` is nested inside the row, this also enables the full-row hit area behavior.`]}),`
`,(0,D.jsx)(I,{}),`
`,(0,D.jsx)(t.h3,{children:`With custom background color`}),`
`,(0,D.jsx)(L,{}),`
`,(0,D.jsx)(t.h3,{children:`Pending state`}),`
`,(0,D.jsxs)(t.p,{children:[`Use the `,(0,D.jsx)(t.code,{children:`pending`}),` property on `,(0,D.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,D.jsx)(t.code,{children:`List.Item.Action`}),` to show a skeleton overlay. Click and keyboard are disabled while pending.`]}),`
`,(0,D.jsx)(z,{}),`
`,(0,D.jsx)(t.h3,{children:`Progress indicator`}),`
`,(0,D.jsxs)(t.p,{children:[`A single list item with a circular progress indicator in `,(0,D.jsx)(t.code,{children:`List.Cell.Start`}),`.`]}),`
`,(0,D.jsx)(B,{}),`
`,(0,D.jsx)(t.h3,{children:`Skeleton`}),`
`,(0,D.jsxs)(t.p,{children:[`Use the `,(0,D.jsx)(t.code,{children:`skeleton`}),` property on `,(0,D.jsx)(t.code,{children:`List.Item.Basic`}),`, `,(0,D.jsx)(t.code,{children:`List.Item.Action`}),` or `,(0,D.jsx)(t.code,{children:`List.Item.Accordion`}),` to show a skeleton overlay while content is loading.`]}),`
`,(0,D.jsx)(R,{}),`
`,(0,D.jsx)(t.h3,{children:`Inside a Card`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`List.Card`}),` to wrap a list inside a `,(0,D.jsx)(t.a,{href:`/uilib/components/card`,children:`Card`}),` with built-in styling. Add `,(0,D.jsx)(t.code,{children:`List.ScrollView`}),` for a scrollable area with a `,(0,D.jsx)(t.code,{children:`maxVisibleListItems`}),` property.`]}),`
`,(0,D.jsx)(J,{}),`
`,(0,D.jsx)(t.h4,{children:`Inside a Card without ScrollView`}),`
`,(0,D.jsxs)(t.p,{children:[(0,D.jsx)(t.code,{children:`List.Card`}),` also works without `,(0,D.jsx)(t.code,{children:`List.ScrollView`}),`. Side borders and redundant top/bottom borders on the first and last items are automatically removed.`]}),`
`,(0,D.jsx)(Y,{}),`
`,(0,D.jsx)(t.h4,{children:`With ShowMoreButton and visibleCount`}),`
`,(0,D.jsxs)(t.p,{children:[`Use `,(0,D.jsx)(t.code,{children:`List.ShowMoreButton`}),` to add a "Show more" / "Show less" toggle outside the list. Link it to `,(0,D.jsx)(t.code,{children:`List.Container`}),` by giving both the same `,(0,D.jsx)(t.code,{children:`id`}),`. Set `,(0,D.jsx)(t.code,{children:`visibleCount`}),` on the container to limit how many items are visible when collapsed.`]}),`
`,(0,D.jsx)(X,{})]})}function Q(e={}){let{wrapper:t}={...S(),...e.components};return t?(0,D.jsx)(t,{...e,children:(0,D.jsx)(Z,{...e})}):Z(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{Q as default};