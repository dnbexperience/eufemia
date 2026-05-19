import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({CustomBackgroundColorAndOutline:()=>b,Default:()=>o,InColoredSection:()=>v,NestedCards:()=>s,Stack:()=>p,WithDropShadow:()=>c,WithFlex:()=>f,WithFormFields:()=>m,WithGrid:()=>d,WithHeadingsAndAriaLabel:()=>h,WithNestedSection:()=>_,WithOutset:()=>y,WithTable:()=>l,WithTableOutline:()=>u,WithoutPadding:()=>g}),a=e(n()),o=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-border`,stableName:`Default`,children:`<Card>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
</Card>
`}),s=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-nested`,stableName:`NestedCards`,children:`<Card stack>
  <P>First Card</P>
  <Card stack>
    <P>Second Card</P>
    <Card stack>
      <P>Third Card (edge case)</P>
    </Card>
  </Card>
</Card>
`}),c=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-drop-shadow`,stableName:`WithDropShadow`,children:`<Card stack dropShadow>
  <Lead>Card 1</Lead>
  <Card stack top="2.5rem">
    <Lead size="basis">Card 2</Lead>
    <Card
      stack
      top="1.5rem"
      innerSpace={{
        top: true,
        block: '3rem',
        inline: true,
      }}
    >
      <Lead size="small">Card 3 (edge case)</Lead>
    </Card>
  </Card>
</Card>
`}),l=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-table`,stableName:`WithTable`,noInline:!0,children:`const MyTable = () => (
  <Table.ScrollView>
    <Table border outline size="medium">
      <thead>
        <Tr noWrap>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={3} align="right">
            <Button>Button</Button>
          </Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
render(
  <Card title="Card title" responsive={false} innerSpace={0} filled>
    <MyTable />
  </Card>
)
`}),u=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-table-outline`,stableName:`WithTableOutline`,noInline:!0,children:`const MyTable = () => (
  <Table.ScrollView>
    <Table border outline size="medium">
      <thead>
        <Tr noWrap>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={3} align="right">
            <Button>Button</Button>
          </Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
render(
  <Card title="Card title" responsive={false} filled>
    <MyTable />
  </Card>
)
`}),d=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-grid`,stableName:`WithGrid`,children:`<Grid.Container
  columns={{
    small: 1,
    medium: 3,
    large: 3,
  }}
  columnGap="small"
>
  <Card stack>
    <H2>Heading</H2>
    <P>Text</P>
  </Card>
  <Card stack>
    <H2>Heading</H2>
    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>
  </Card>
  <Card stack>
    <H2>Heading</H2>
    <P>Text</P>
  </Card>
</Grid.Container>
`}),f=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-flex`,stableName:`WithFlex`,children:`<Flex.Container>
  <Card
    span={{
      small: 'auto',
      medium: 4,
      large: 4,
    }}
    stack
  >
    <H2>Heading</H2>
    <P>Text</P>
  </Card>
  <Card
    span={{
      small: 'auto',
      medium: 4,
      large: 4,
    }}
    stack
  >
    <H2>Heading</H2>
    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>
  </Card>
  <Card
    span={{
      small: 'auto',
      medium: 4,
      large: 4,
    }}
    stack
  >
    <H2>Heading</H2>
    <P>Text</P>
  </Card>
</Flex.Container>
`}),p=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-stack`,stableName:`Stack`,children:`<Card stack>
  <P>Stacked content</P>
  <P>Stacked content</P>
</Card>
`}),m=()=>(0,a.jsx)(r,{stableName:`WithFormFields`,children:`<Form.Card>
  <Field.String label="Label" value="Value" />
  <Field.String label="Label" value="Value" />
</Form.Card>
`}),h=()=>(0,a.jsx)(r,{hidePreview:!0,stableName:`WithHeadingsAndAriaLabel`,children:`<Card aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id" space={0}>
    Heading
  </Form.SubHeading>
  <P>Content inside a landmark ...</P>
</Card>
`}),g=()=>(0,a.jsx)(r,{stableName:`WithoutPadding`,children:`<Card innerSpace={false} align="stretch">
  <P>no inner space</P>
</Card>
`}),_=()=>(0,a.jsx)(r,{"data-visual-test":`card-nested-section`,stableName:`WithNestedSection`,children:`<Flex.Stack>
  <Card gap="x-small" align="stretch">
    <Form.SubHeading>Card with a nested Section</Form.SubHeading>
    <Section
      variant="information"
      innerSpace={{
        top: 'small',
        bottom: 'medium',
      }}
    >
      <Field.String width="medium" label="In nested Section" />
    </Section>
  </Card>

  <Card innerSpace="x-large" stack>
    <Section
      variant="information"
      innerSpace={{
        top: 'small',
        bottom: 'medium',
      }}
    >
      <Field.String
        width="medium"
        label="Card with a 'x-large' inner space"
      />
    </Section>
  </Card>

  <Card innerSpace={false} align="stretch">
    <P>no inner space</P>
    <Section innerSpace backgroundColor="var(--color-lavender)">
      <Field.String width="medium" label="Card with no inner space" />
    </Section>
    <P>no inner space</P>
  </Card>
</Flex.Stack>
`}),v=()=>(0,a.jsx)(r,{"data-visual-test":`card-in-colored-section`,stableName:`InColoredSection`,children:`<Section backgroundColor="var(--color-signal-orange)" innerSpace="large">
  <Card>Card in colored Section</Card>
</Section>
`}),y=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-outset`,stableName:`WithOutset`,children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack outset>
    <P>Card content</P>
    <Card>
      <P>Nested card</P>
    </Card>
  </Card>
  <Form.SubmitButton text="I'm also left aligned" />
</Flex.Vertical>
`}),b=()=>(0,a.jsx)(r,{"data-visual-test":`layout-card-background-color-outline`,stableName:`CustomBackgroundColorAndOutline`,children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack backgroundColor="pistachio" outline="sea-green">
    <P>Card content</P>
    <Card outline="transparent">
      <P>Nested card</P>
    </Card>
  </Card>
</Flex.Vertical>
`});export{s as a,f as c,h as d,_ as f,g,u as h,v as i,m as l,l as m,o as n,p as o,y as p,i as r,c as s,b as t,d as u};