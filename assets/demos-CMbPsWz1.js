import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./fish_medium-C2bdj1hh.js";import{t as r}from"./ComponentBox-xW2kV1s2.js";import{Lr as i}from"./index-DVm0MbGb.js";var a=e({Accordion:()=>x,BackgroundColor:()=>g,FooterWithButtons:()=>l,GridColumns:()=>E,InsideCard:()=>D,InsideCardWithoutScrollView:()=>O,ListSubline:()=>C,NavigableItem:()=>u,NavigableItemWithCustomElement:()=>f,NavigableItemWithHref:()=>d,PendingState:()=>v,ProgressIndicatorRow:()=>y,RowsWithSlots:()=>c,SelectedState:()=>h,SeparatedLists:()=>b,SimpleRows:()=>s,SkeletonState:()=>_,WithAnchor:()=>p,WithAvatar:()=>m,WithBadge:()=>w,WithDateFormat:()=>S,WithFormElements:()=>T,WithShowMoreButton:()=>k}),o=t(),s=()=>(0,o.jsx)(r,{noInline:!0,children:`const myList = [
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
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`list-slots`,scope:{fish_medium:n},children:`<List.Container>
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
`}),l=()=>(0,o.jsx)(r,{"data-visual-test":`list-footer`,scope:{fish_medium:n},children:`<List.Container>
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
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`list-action`,scope:{fish_medium:n},children:`<List.Container>
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
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`list-action-href`,scope:{fish_medium:n},children:`<List.Container>
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
`}),f=()=>(0,o.jsx)(r,{scope:{fish_medium:n},noInline:!0,children:`// Example using a custom link component (e.g. React Router's Link).
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
`}),p=()=>(0,o.jsx)(r,{scope:{fish_medium:n},children:`<List.Container>
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
`}),m=()=>(0,o.jsx)(r,{"data-visual-test":`list-avatar`,children:`<List.Container>
  <List.Item.Basic title="Alice Andersen">
    <List.Cell.Start>
      <Avatar size="medium">A</Avatar>
    </List.Cell.Start>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Basic>

  <List.Item.Action title="Bob Berg" onClick={() => {}}>
    <List.Cell.Start>
      <Avatar size="medium">B</Avatar>
    </List.Cell.Start>
    <List.Cell.End>
      <Value.Currency value={5678} />
    </List.Cell.End>
  </List.Item.Action>

  <List.Item.Accordion title="Carol with image">
    <List.Item.Accordion.Header>
      <List.Cell.Start>
        <Avatar size="medium">C</Avatar>
      </List.Cell.Start>
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Accordion.Header>
    <List.Item.Accordion.Content innerSpace>
      <P>Content goes here.</P>
    </List.Item.Accordion.Content>
  </List.Item.Accordion>
</List.Container>
`}),h=()=>(0,o.jsx)(r,{children:`<List.Container>
  <List.Item.Basic>Normal row</List.Item.Basic>

  <List.Item.Basic selected>Selected row</List.Item.Basic>

  <List.Item.Basic>Another normal row</List.Item.Basic>
</List.Container>
`}),g=()=>(0,o.jsx)(r,{children:`<List.Container>
  <List.Item.Basic>Normal row</List.Item.Basic>

  <List.Item.Basic
    style={{
      ['--item-background-color' as string]: 'var(--color-mint-green-12)',
    }}
  >
    Custom background color (not selected)
  </List.Item.Basic>

  <List.Item.Basic>Another normal row</List.Item.Basic>
</List.Container>
`}),_=()=>(0,o.jsx)(r,{scope:{fish_medium:n},background:`plain`,children:`<List.Container>
  <List.Item.Action icon={fish_medium} title="Loading item…" skeleton>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),v=()=>(0,o.jsx)(r,{"data-visual-test":`list-pending`,scope:{fish_medium:n},children:`<List.Container>
  <List.Item.Action icon={fish_medium} title="Pending item ..." pending>
    <List.Cell.End>
      <NumberFormat.Currency value={1234} />
    </List.Cell.End>
  </List.Item.Action>
</List.Container>
`}),y=()=>(0,o.jsx)(r,{children:`<List.Container>
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
`}),b=()=>(0,o.jsx)(r,{"data-visual-test":`list-separated`,scope:{fish_medium:n},children:`<List.Container separated>
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
`}),x=()=>(0,o.jsx)(r,{"data-visual-test":`list-accordion`,scope:{fish_medium:n},children:`<List.Container>
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
`}),S=()=>(0,o.jsx)(r,{"data-visual-test":`list-overline`,children:`<List.Container>
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
`}),C=()=>(0,o.jsx)(r,{"data-visual-test":`list-subline`,scope:{fish_medium:n},children:`<List.Container>
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
`}),w=()=>(0,o.jsx)(r,{scope:{fish_medium:n},children:`<List.Container>
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
`}),T=()=>(0,o.jsx)(r,{"data-visual-test":`list-form-elements`,noInline:!0,children:`render(
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
`}),E=()=>(0,o.jsx)(r,{scope:{fish_medium:n},background:`plain`,children:`<Grid.Container
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
`}),D=()=>(0,o.jsx)(r,{"data-visual-test":`list-card`,scope:{fish_medium:n},children:`<List.Card>
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
`}),O=()=>(0,o.jsx)(r,{"data-visual-test":`list-card-no-scroll-view`,scope:{fish_medium:n},children:`<List.Card innerSpace="x-small">
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
`}),k=()=>(0,o.jsx)(r,{scope:{fish_medium:n},background:`plain`,children:`
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

`});function A(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,strong:`strong`,...i(),...e.components};return a||M(`Examples`,!1),x||M(`Examples.Accordion`,!0),g||M(`Examples.BackgroundColor`,!0),l||M(`Examples.FooterWithButtons`,!0),E||M(`Examples.GridColumns`,!0),D||M(`Examples.InsideCard`,!0),O||M(`Examples.InsideCardWithoutScrollView`,!0),C||M(`Examples.ListSubline`,!0),u||M(`Examples.NavigableItem`,!0),f||M(`Examples.NavigableItemWithCustomElement`,!0),d||M(`Examples.NavigableItemWithHref`,!0),v||M(`Examples.PendingState`,!0),y||M(`Examples.ProgressIndicatorRow`,!0),c||M(`Examples.RowsWithSlots`,!0),h||M(`Examples.SelectedState`,!0),b||M(`Examples.SeparatedLists`,!0),s||M(`Examples.SimpleRows`,!0),_||M(`Examples.SkeletonState`,!0),p||M(`Examples.WithAnchor`,!0),m||M(`Examples.WithAvatar`,!0),w||M(`Examples.WithBadge`,!0),S||M(`Examples.WithDateFormat`,!0),T||M(`Examples.WithFormElements`,!0),k||M(`Examples.WithShowMoreButton`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Rows with cells like Start, Center, End, Title`}),`
`,(0,o.jsx)(t.p,{children:`This example demonstrates different cell layouts and their placement.`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Navigable item`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Navigable item with href`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`href`}),` property on `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),` to render a native link. Use `,(0,o.jsx)(t.code,{children:`target`}),` and `,(0,o.jsx)(t.code,{children:`rel`}),` for external links (e.g. `,(0,o.jsx)(t.code,{children:`target="_blank"`}),` with `,(0,o.jsx)(t.code,{children:`rel="noopener noreferrer"`}),`).`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Navigable item with custom element`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`element`}),` prop to render a custom link component such as React Router's `,(0,o.jsx)(t.code,{children:`Link`}),`. Pass the route via the `,(0,o.jsx)(t.code,{children:`to`}),` prop directly on `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),` — the entire row will be clickable.`]}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`With anchor`}),`
`,(0,o.jsxs)(t.p,{children:[`List items containing `,(0,o.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` links.`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Accordion`}),`
`,(0,o.jsxs)(t.p,{children:[`Expandable list items using `,(0,o.jsx)(t.code,{children:`List.Item.Accordion`}),` with optional `,(0,o.jsx)(t.code,{children:`icon`}),` and `,(0,o.jsx)(t.code,{children:`title`}),` properties and `,(0,o.jsx)(t.code,{children:`List.Item.Accordion.Content`}),` for the expandable section. Use the `,(0,o.jsx)(t.code,{children:`open`}),` property to set the initial open state.`]}),`
`,(0,o.jsx)(x,{}),`
`,(0,o.jsx)(t.h3,{children:`With Badge`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.a,{href:`/uilib/components/badge`,children:`Badge`}),` in `,(0,o.jsx)(t.code,{children:`List.Cell.End`}),` to show status or counts.`]}),`
`,(0,o.jsx)(w,{}),`
`,(0,o.jsx)(t.h3,{children:`Footer with buttons`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`List.Cell.Footer`}),` to place actions such as `,(0,o.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),` in the list row.`]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Responsive Grid Layout`}),`
`,(0,o.jsxs)(t.p,{children:[`Using `,(0,o.jsx)(t.a,{href:`/uilib/layout/grid/container`,children:`Grid.Container`}),` with `,(0,o.jsx)(t.a,{href:`/uilib/layout/grid/item`,children:`Grid.Item`}),` for a 12-column responsive grid.`]}),`
`,(0,o.jsx)(E,{}),`
`,(0,o.jsx)(t.h3,{children:`Separated lists`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`separated`}),` property on `,(0,o.jsx)(t.code,{children:`List.Container`}),` to add row gap between list items.`]}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h3,{children:`Dynamic list`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`With DateFormat`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.a,{href:`/uilib/components/date-format`,children:`DateFormat`}),` in `,(0,o.jsx)(t.code,{children:`List.Cell.Start`}),` to show dates in the list row.`]}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.h3,{children:`With Subline`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`List.Cell.Title.Subline`}),` to add supporting text below the title. The `,(0,o.jsx)(t.code,{children:`variant="description"`}),` option uses smaller text for secondary information.`]}),`
`,(0,o.jsx)(C,{}),`
`,(0,o.jsx)(t.h3,{children:`With form elements`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` and `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),` render prop children to compose list rows and `,(0,o.jsx)(t.code,{children:`selected`}),` state.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Place them inside `,(0,o.jsx)(t.code,{children:`List.Cell.Start`}),` to align them to the left side of the list row.`]}),`
`,(0,o.jsx)(T,{}),`
`,(0,o.jsx)(t.h3,{children:`With avatar`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.a,{href:`/uilib/components/avatar`,children:`Avatar`}),` in `,(0,o.jsx)(t.code,{children:`List.Cell.Start`}),` as the left content.`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Selected state`}),`
`,(0,o.jsxs)(t.p,{children:[`Provide the `,(0,o.jsx)(t.code,{children:`selected`}),` property on `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),` for selectable rows. When a `,(0,o.jsx)(t.strong,{children:`checkbox`}),` or `,(0,o.jsx)(t.strong,{children:`radio`}),` is nested inside the row, this also enables the full-row hit area behavior.`]}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`With custom background color`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Pending state`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`pending`}),` property on `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),` to show a skeleton overlay. Click and keyboard are disabled while pending.`]}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`Progress indicator`}),`
`,(0,o.jsxs)(t.p,{children:[`A single list item with a circular progress indicator in `,(0,o.jsx)(t.code,{children:`List.Cell.Start`}),`.`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`Skeleton`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`skeleton`}),` property on `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),`, `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),` or `,(0,o.jsx)(t.code,{children:`List.Item.Accordion`}),` to show a skeleton overlay while content is loading.`]}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Inside a Card`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`List.Card`}),` to wrap a list inside a `,(0,o.jsx)(t.a,{href:`/uilib/components/card`,children:`Card`}),` with built-in styling. Add `,(0,o.jsx)(t.code,{children:`List.ScrollView`}),` for a scrollable area with a `,(0,o.jsx)(t.code,{children:`maxVisibleListItems`}),` property.`]}),`
`,(0,o.jsx)(D,{}),`
`,(0,o.jsx)(t.h4,{children:`Inside a Card without ScrollView`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`List.Card`}),` also works without `,(0,o.jsx)(t.code,{children:`List.ScrollView`}),`. Side borders and redundant top/bottom borders on the first and last items are automatically removed.`]}),`
`,(0,o.jsx)(O,{}),`
`,(0,o.jsx)(t.h4,{children:`With ShowMoreButton and visibleCount`}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.code,{children:`List.ShowMoreButton`}),` to add a "Show more" / "Show less" toggle outside the list. Link it to `,(0,o.jsx)(t.code,{children:`List.Container`}),` by giving both the same `,(0,o.jsx)(t.code,{children:`id`}),`. Set `,(0,o.jsx)(t.code,{children:`visibleCount`}),` on the container to limit how many items are visible when collapsed.`]}),`
`,(0,o.jsx)(k,{})]})}function j(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(A,{...e})}):A(e)}function M(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{j as default};