import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Accordion-CHhnWaz_.js";import{t as i}from"./ComponentBox-DPdYTeDv.js";import{In as a,ci as o,ni as s,xr as c,yi as l}from"./index--zEB_f_m.js";var u=e(t()),d=n(),f=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-default`,children:`
<Accordion expanded id="single-accordion" title="Accordion title">
  <P>Accordion content</P>
</Accordion>
<Accordion.Provider top icon="chevron_down" iconPosition="right">
  <Accordion id="single-provider-accordion" title="Accordion title">
    <P>Accordion content</P>
  </Accordion>
</Accordion.Provider>

`}),p=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-large`,hideCode:!0,children:`<Accordion
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
`}),m=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-custom`,scope:{bell:l},children:`
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

`}),h=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-group`,children:`<Accordion.Group expanded allowCloseAll>
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
`}),g=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-variant-plain`,scope:{AddIcon:o,SubtractIcon:s},children:`
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

`}),_=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-nested`,children:`<Accordion id="nested-accordion" title="Accordion" expanded space>
  <P space={0}>Content A</P>
  <Accordion id="nested-accordion-1" title="Accordion nested 1" space>
    <P space={0}>I'm nested 1</P>
  </Accordion>

  <P space={0}>Content B</P>
  <Accordion id="nested-accordion-2" title="Accordion nested 2" space>
    <P space={0}>I'm nested 2</P>
  </Accordion>
</Accordion>
`}),v=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-disabled`,children:`
<Accordion expanded disabled title="Disabled (expanded)">
  <P>I am expanded, but disabled, so I can't be closed</P>
</Accordion>
<Accordion.Provider
  top
  disabled
  icon="chevron_down"
  iconPosition="right"
>
  <Accordion title="Disabled (closed)">
    <P>You can't see this text because I am disabled and closed.</P>
  </Accordion>
</Accordion.Provider>

`}),y=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-description`,children:`
<Accordion
  expanded
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>
<Accordion
  top
  icon="chevron_down"
  iconPosition="right"
  id="description-provider-accordion"
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>

`}),b=()=>(0,d.jsx)(i,{"data-visual-test":`accordion-filled`,children:`
<Accordion expanded title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>
<Accordion top title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>

`}),x=()=>(0,d.jsx)(i,{background:`plain`,noInline:!0,children:`const items = [
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
`});function S(){let e=(0,u.useRef)(null);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(c,{bottom:`large`,variant:`secondary`,onClick:()=>e.current?.(),children:`Close All`}),(0,d.jsxs)(r.Group,{expanded:!0,allowCloseAll:!0,collapseAllHandleRef:e,children:[(0,d.jsxs)(r,{children:[(0,d.jsx)(r.Header,{children:`Accordion title 1`}),(0,d.jsx)(r.Content,{children:(0,d.jsx)(a,{children:`Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida himenaeos nostra mollis volutpat bibendum convallis cum condimentum dictumst blandit rutrum vehicula`})})]}),(0,d.jsxs)(r,{children:[(0,d.jsx)(r.Header,{children:`Accordion title 2`}),(0,d.jsx)(r.Content,{children:(0,d.jsx)(a,{children:`Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam`})})]}),(0,d.jsxs)(r,{children:[(0,d.jsx)(r.Header,{children:`Accordion title 3`}),(0,d.jsx)(r.Content,{children:(0,d.jsx)(a,{children:`Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam`})})]})]})]})}export{v as a,x as c,g as d,y as i,p as l,m as n,b as o,f as r,h as s,S as t,_ as u};