import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DfKpi57X.js";import{j as i,w as a}from"./forms-D54jfDKN.js";import{t as o}from"./Button-kSqfAUVR.js";import{t as s}from"./P-CVKBz4XO.js";import{t as c,u as l}from"./Table-DeLWJx8P.js";import{t as u}from"./H2-DASO3mku.js";import{r as d,t as f}from"./Card-BvVSLAbs.js";import{t as p}from"./Link-DsLLxgOh.js";import{n as m,r as h,t as g}from"./Tr-BjVuDYhf.js";import{t as _}from"./Section-_oyssAWe.js";import{t as v}from"./ListExport-BvrqCQ3d.js";import{t as y}from"./Heading-OwOHsD1e.js";import{t as b}from"./export-D2BP5X_D.js";import{t as x}from"./ComponentBox-sLMgHvLi.js";var S=e({CustomBackgroundColorAndOutline:()=>R,Default:()=>w,InColoredSection:()=>I,InteractiveCards:()=>z,NestedCards:()=>T,Stack:()=>j,WithDropShadow:()=>E,WithFlex:()=>A,WithFormFields:()=>M,WithGrid:()=>k,WithHeadingsAndAriaLabel:()=>N,WithNestedSection:()=>F,WithOutset:()=>L,WithTable:()=>D,WithTableOutline:()=>O,WithoutPadding:()=>P}),C=t(n()),w=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-border`,stableName:`Default`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,P:s},children:`<Card>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
</Card>
`}),T=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-nested`,stableName:`NestedCards`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,P:s},children:`<Card stack>
  <P>First Card</P>
  <Card stack>
    <P>Second Card</P>
    <Card stack>
      <P>Third Card (edge case)</P>
    </Card>
  </Card>
</Card>
`}),E=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-drop-shadow`,stableName:`WithDropShadow`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,Lead:d},children:`<Card stack dropShadow>
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
`}),D=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-table`,stableName:`WithTable`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:c,ScrollView:l,Tr:g,Th:m,Td:h,Button:o,Card:f},noInline:!0,children:`const MyTable = () => (
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
`}),O=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-table-outline`,stableName:`WithTableOutline`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:c,ScrollView:l,Tr:g,Th:m,Td:h,Button:o,Card:f},noInline:!0,children:`const MyTable = () => (
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
`}),k=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-grid`,stableName:`WithGrid`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Grid:b,Card:f,H2:u,Heading:y,P:s},children:`<Grid.Container
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
`}),A=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-flex`,stableName:`WithFlex`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Card:f,H2:u,Heading:y,P:s},children:`<Flex.Container>
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
`}),j=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-stack`,stableName:`Stack`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,P:s},children:`<Card stack>
  <P>Stacked content</P>
  <P>Stacked content</P>
</Card>
`}),M=()=>(0,C.jsx)(x,{stableName:`WithFormFields`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:f,Field:i},children:`<Form.Card>
  <Field.String label="Label" value="Value" />
  <Field.String label="Label" value="Value" />
</Form.Card>
`}),N=()=>(0,C.jsx)(x,{hidePreview:!0,stableName:`WithHeadingsAndAriaLabel`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,Form:a,Heading:y,P:s},children:`<Card aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id" space={0}>
    Heading
  </Form.SubHeading>
  <P>Content inside a landmark ...</P>
</Card>
`}),P=()=>(0,C.jsx)(x,{stableName:`WithoutPadding`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,P:s},children:`<Card innerSpace={false} align="stretch">
  <P>no inner space</P>
</Card>
`}),F=()=>(0,C.jsx)(x,{"data-visual-test":`card-nested-section`,stableName:`WithNestedSection`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Card:f,Form:a,Section:_,Field:i,P:s},children:`<Flex.Stack>
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
`}),I=()=>(0,C.jsx)(x,{"data-visual-test":`card-in-colored-section`,stableName:`InColoredSection`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Section:_,Card:f},children:`<Section backgroundColor="var(--color-signal-orange)" innerSpace="large">
  <Card>Card in colored Section</Card>
</Section>
`}),L=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-outset`,stableName:`WithOutset`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Form:a,Card:f,P:s},children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack outset>
    <P>Card content</P>
    <Card>
      <P>Nested card</P>
    </Card>
  </Card>
  <Form.SubmitButton text="I'm also left aligned" />
</Flex.Vertical>
`}),R=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-background-color-outline`,stableName:`CustomBackgroundColorAndOutline`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Form:a,Card:f,P:s},children:`<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card
    stack
    backgroundColor="var(--token-color-background-neutral-subtle)"
    outline="var(--token-color-stroke-neutral)"
  >
    <P>Card content</P>
    <Card outline="transparent">
      <P>Nested card</P>
    </Card>
  </Card>
</Flex.Vertical>
`}),z=()=>(0,C.jsx)(x,{"data-visual-test":`layout-card-interactive`,stableName:`InteractiveCards`,sourceImports:[`import { Button, Card, Flex, Grid, H2, Lead, P, Section, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Card:f,List:v,Lead:d,P:s,Button:o,Link:p},children:`<Card.List
  style={{
    maxWidth: '640px',
    margin: '0 auto',
  }}
>
  <Card.ListItem center="when-small">
    <Card.Action
      onClick={() => console.log('Card clicked')}
      stack
      gap="x-small"
    >
      <Lead>Clickable card</Lead>
      <P>Click this card. It has hover, focus, and keyboard support.</P>
      <Button
        variant="tertiary"
        icon="chevron_right"
        text="Read more"
        element="span"
      />
    </Card.Action>
  </Card.ListItem>

  <Card.ListItem center="when-small">
    <Card.Action href="/" stack gap="x-small">
      <Lead>Link card</Lead>
      <P>This card navigates with an anchor element.</P>
      <Button
        variant="tertiary"
        icon="chevron_right"
        text="Read more"
        element="span"
      />
    </Card.Action>
  </Card.ListItem>
</Card.List>
`});export{P as _,z as a,E as c,k as d,N as f,O as g,D as h,I as i,A as l,L as m,w as n,T as o,F as p,S as r,j as s,R as t,M as u};