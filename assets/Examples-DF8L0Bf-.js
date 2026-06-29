import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{I as r,Q as i,v as a,w as o}from"./Anchor-BPx9fjvj.js";import{t as s}from"./Icon-C5IFEhlK.js";import{s as c}from"./ToggleButton-DfKpi57X.js";import{t as l}from"./Accordion-j22KWkR9.js";import{t as u}from"./Button-kSqfAUVR.js";import{t as d}from"./P-CVKBz4XO.js";import{t as f}from"./Heading-OwOHsD1e.js";import{t as p}from"./export-D2BP5X_D.js";import{t as m}from"./ComponentBox-sLMgHvLi.js";var h=t(e()),g=t(n()),_=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-default`,stableName:`AccordionDefaultExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d,Provider:i},children:`
<Accordion expanded id="single-accordion" title="Accordion title">
  <P>Accordion content</P>
</Accordion>
<Accordion.Provider top iconPosition="right">
  <Accordion id="single-provider-accordion" title="Accordion title">
    <P>Accordion content</P>
  </Accordion>
</Accordion.Provider>

`}),v=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-large`,hideCode:!0,stableName:`AccordionLargeContentExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`<Accordion
  expanded
  bottom="large"
  title="Large content with long titleScelerisque eget cubilia tempus ipsum aenean dolor suscipit egestas potenti at eleifend platea interdum magnis amet molestie sem faucibus netus "
>
  <P>
    Hendrerit dictum elit facilisis aliquet eleifend potenti leo nec
    praesent sollicitudin elementum scelerisque ridiculus neque nisi risus
    et habitant torquent nam pellentesque dictumst porttitor accumsan a
    nibh fringilla facilisi lacus sagittis mauris libero tellus justo
    ultricies tempor viverra sodales vestibulum proin tempus lorem cubilia
    at velit sociis sit malesuada class consectetur turpis metus vulputate
    tortor cum nisl ornare ligula platea quam gravida sapien penatibus ad
    curae varius hac ultrices ipsum felis vehicula fermentum rutrum
    parturient congue sed vel magnis laoreet donec id consequat augue mi
    semper volutpat urna in condimentum luctus cursus fames dignissim magna
    suspendisse bibendum mus natoque diam
  </P>
</Accordion>
`}),y=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-custom`,scope:{bell:r},stableName:`AccordionCustomisationExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,Icon:s,P:d},children:`
<Accordion group="unique-id" leftComponent={<Icon icon={bell} />}>
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
      himenaeos nostra mollis volutpat bibendum convallis cum condimentum
      dictumst blandit rutrum vehicula
    </P>
  </Accordion.Content>
</Accordion>
<Accordion top expanded={true} group="unique-id">
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam
    </P>
  </Accordion.Content>
</Accordion>

`}),b=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-group`,stableName:`AccordionGroupExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`<Accordion.Group expanded allowCloseAll>
  <Accordion expanded={false}>
    <Accordion.Header>Accordion title</Accordion.Header>
    <Accordion.Content top>
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
        himenaeos nostra mollis volutpat bibendum convallis cum condimentum
        dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
  </Accordion>
  <Accordion top>
    <Accordion.Header>Accordion title</Accordion.Header>
    <Accordion.Content>
      <P>
        Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam
      </P>
    </Accordion.Content>
  </Accordion>
</Accordion.Group>
`}),x=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-variant-plain`,scope:{AddIcon:o,SubtractIcon:a},stableName:`AccordionPlainVariant`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  iconPosition="right"
>
  <P>content</P>
</Accordion>
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  iconPosition="right"
  expanded
>
  <P>content</P>
</Accordion>

`}),S=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-nested`,stableName:`AccordionNestedExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`<Accordion id="nested-accordion" title="Accordion" expanded space>
  <P space={0}>Content A</P>
  <Accordion id="nested-accordion-1" title="Accordion nested 1" space>
    <P space={0}>I'm nested 1</P>
  </Accordion>

  <P space={0}>Content B</P>
  <Accordion id="nested-accordion-2" title="Accordion nested 2" space>
    <P space={0}>I'm nested 2</P>
  </Accordion>
</Accordion>
`}),C=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-disabled`,stableName:`AccordionDisabledExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d,Provider:i},children:`
<Accordion expanded disabled title="Disabled (expanded)">
  <P>I am expanded, but disabled, so I can't be closed</P>
</Accordion>
<Accordion.Provider top disabled iconPosition="right">
  <Accordion title="Disabled (closed)">
    <P>You can't see this text because I am disabled and closed.</P>
  </Accordion>
</Accordion.Provider>

`}),w=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-description`,stableName:`AccordionDescriptionExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`
<Accordion
  expanded
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>
<Accordion
  top
  iconPosition="right"
  id="description-provider-accordion"
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>

`}),T=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-filled`,stableName:`AccordionFilledExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d},children:`
<Accordion expanded title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>
<Accordion top title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>

`}),E=()=>(0,g.jsx)(m,{background:`plain`,stableName:`AccordionInColumns`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{Accordion:l,P:d,Heading:f,Grid:p,Flex:c},noInline:!0,children:`const items = [
  <Accordion key="one" variant="filled">
    <Accordion.Header>
      Sit amet suscipit ipsum tincidunt id?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
        himenaeos nostra mollis volutpat bibendum convallis cum condimentum
        dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="two" variant="filled">
    <Accordion.Header>
      Cras eget quam eget tortor placerat viverra?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Morbi condimentum odio ut enim vulputate, rutrum ullamcorper sem
        vestibulum. Ut luctus tempus leo vel finibus. Pellentesque ultrices
        interdum nisi, sit amet suscipit ipsum tincidunt id. Praesent
        sodales vel eros ut accumsan.
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="three" variant="filled">
    <Accordion.Header>Nam porta nec ipsum id porta</Accordion.Header>
    <Accordion.Content space>
      <P>
        Nam porta nec ipsum id porta. Cras eget quam eget tortor placerat
        viverra.
      </P>
    </Accordion.Content>
  </Accordion>,
]
render(
  <>
    <Heading size="large">Accordion in columns</Heading>
    <Grid.Container columns={2} columnGap="small" rowGap="x-small">
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [1, 1],
          large: [1, 1],
        }}
      >
        <Flex.Stack gap="x-small">{items}</Flex.Stack>
      </Grid.Item>
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [2, 2],
          large: [2, 2],
        }}
      >
        <Flex.Stack gap="x-small">{[...items].reverse()}</Flex.Stack>
      </Grid.Item>
    </Grid.Container>
  </>
)
`});function D(){let e=(0,h.useRef)(null);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u,{bottom:`large`,variant:`secondary`,onClick:()=>e.current?.(),children:`Close All`}),(0,g.jsxs)(l.Group,{expanded:!0,allowCloseAll:!0,collapseAllHandleRef:e,children:[(0,g.jsxs)(l,{children:[(0,g.jsx)(l.Header,{children:`Accordion title 1`}),(0,g.jsx)(l.Content,{children:(0,g.jsx)(d,{children:`Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida himenaeos nostra mollis volutpat bibendum convallis cum condimentum dictumst blandit rutrum vehicula`})})]}),(0,g.jsxs)(l,{children:[(0,g.jsx)(l.Header,{children:`Accordion title 2`}),(0,g.jsx)(l.Content,{children:(0,g.jsx)(d,{children:`Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam`})})]}),(0,g.jsxs)(l,{children:[(0,g.jsx)(l.Header,{children:`Accordion title 3`}),(0,g.jsx)(l.Content,{children:(0,g.jsx)(d,{children:`Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam`})})]})]})]})}var O=()=>(0,g.jsx)(m,{"data-visual-test":`accordion-tertiary`,stableName:`AccordionTertiarySplitExample`,sourceImports:[`import { useRef } from 'react'`,`import { bell, add_medium as AddIcon, subtract_medium as SubtractIcon } from '@dnb/eufemia/icons'`,`import { Accordion, P, Icon, Grid, Flex, Heading, Button } from '@dnb/eufemia'`],__buildScope:{P:d,Accordion:l},children:`
<P>
  Text{' '}
  <Accordion
    variant="tertiary"
    title="Toggle remote content"
    id="accordion-tertiary"
  />{' '}
  Text
</P>
<P>Other content between button and accordion content.</P>
<Accordion.Content connectedTo="accordion-tertiary">
  <P top>
    This content is placed separately from the button, connected via the{' '}
    <code>connectedTo</code> prop.
  </P>
</Accordion.Content>

`});export{C as a,E as c,x as d,O as f,w as i,v as l,y as n,T as o,_ as r,b as s,D as t,S as u};