import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";var r=e({CustomBackgroundColorAndOutline:()=>y,Default:()=>a,InColoredSection:()=>_,NestedCards:()=>o,Stack:()=>f,WithDropShadow:()=>s,WithFlex:()=>d,WithFormFields:()=>p,WithGrid:()=>u,WithHeadingsAndAriaLabel:()=>m,WithNestedSection:()=>g,WithOutset:()=>v,WithTable:()=>c,WithTableOutline:()=>l,WithoutPadding:()=>h}),i=t(),a=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-border`,children:`<Card>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
</Card>
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-nested`,children:`<Card stack>
  <P>First Card</P>
  <Card stack>
    <P>Second Card</P>
    <Card stack>
      <P>Third Card (edge case)</P>
    </Card>
  </Card>
</Card>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-drop-shadow`,children:`<Card stack dropShadow>
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-table`,noInline:!0,children:`const MyTable = () => (
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
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-table-outline`,noInline:!0,children:`const MyTable = () => (
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
`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-grid`,children:`<Grid.Container
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
`}),d=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-flex`,children:`<Flex.Container>
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
`}),f=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-stack`,children:`<Card stack>
  <P>Stacked content</P>
  <P>Stacked content</P>
</Card>
`}),p=()=>(0,i.jsx)(n,{children:`<Form.Card>
  <Field.String label="Label" value="Value" />
  <Field.String label="Label" value="Value" />
</Form.Card>
`}),m=()=>(0,i.jsx)(n,{hidePreview:!0,children:`<Card aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id" space={0}>
    Heading
  </Form.SubHeading>
  <P>Content inside a landmark ...</P>
</Card>
`}),h=()=>(0,i.jsx)(n,{children:`<Card innerSpace={false} align="stretch">
  <P>no inner space</P>
</Card>
`}),g=()=>(0,i.jsx)(n,{"data-visual-test":`card-nested-section`,children:`<Flex.Stack>
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
`}),_=()=>(0,i.jsx)(n,{"data-visual-test":`card-in-colored-section`,children:`<Section backgroundColor="var(--color-signal-orange)" innerSpace="large">
  <Card>Card in colored Section</Card>
</Section>
`}),v=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-outset`,children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack outset>
    <P>Card content</P>
    <Card>
      <P>Nested card</P>
    </Card>
  </Card>
  <Form.SubmitButton text="I'm also left aligned" />
</Flex.Vertical>
`}),y=()=>(0,i.jsx)(n,{"data-visual-test":`layout-card-background-color-outline`,children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack backgroundColor="pistachio" outline="sea-green">
    <P>Card content</P>
    <Card outline="transparent">
      <P>Nested card</P>
    </Card>
  </Card>
</Flex.Vertical>
`});export{o as a,d as c,m as d,g as f,h as g,l as h,_ as i,p as l,c as m,a as n,f as o,v as p,r,s,y as t,u};