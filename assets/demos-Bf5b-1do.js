import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{t as r}from"./TestElement-7TlpAKwo.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({Default:()=>s,FramedLineDividers:()=>_,HorizontalWithFieldString:()=>c,HorizontalWithFlexItem:()=>l,HorizontalWithFlexItemJustifyCenter:()=>u,HorizontalWithFlexItemJustifyFlexEnd:()=>d,LayoutHorizontalFlexGrowItems:()=>h,VerticalLineDivider:()=>m,VerticalWithCard:()=>p,VerticalWithFlexItem:()=>f,WrappedWithChildren:()=>g}),o=t(),s=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),c=()=>(0,o.jsx)(n,{scope:{TestElement:r},"data-visual-test":`flex-container-field`,children:`<Flex.Container>
  <Field.String label="Label" value="Foo" width="medium" />
  <Field.String label="Label" value="Foo" width="small" />
</Flex.Container>
`}),l=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),u=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container justify="center">
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),d=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container justify="flex-end">
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),f=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container direction="vertical">
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),p=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container direction="vertical">
  <Card>Card contents</Card>
  <Card>Card contents</Card>
  <Card>Card contents</Card>
</Flex.Container>
`}),m=()=>(0,o.jsx)(n,{scope:{TestElement:r},"data-visual-test":`flex-container-divider`,children:`<Flex.Container direction="vertical" divider="line" alignSelf="stretch">
  <TestElement>FlexItem</TestElement>
  <TestElement>FlexItem</TestElement>
  <TestElement>FlexItem</TestElement>
</Flex.Container>
`}),h=()=>(0,o.jsx)(n,{children:`<Flex.Horizontal>
  <Flex.Item span={3}>
    <Card>Card contents</Card>
  </Flex.Item>
  <Flex.Item span={4}>
    <Card>Card contents</Card>
  </Flex.Item>
  <Flex.Item span={5}>
    <Card>Card contents</Card>
  </Flex.Item>
  <Flex.Item grow>
    <Card>Card contents</Card>
  </Flex.Item>
  <Flex.Item grow>
    <Card>Card contents</Card>
  </Flex.Item>
  <Flex.Item grow>
    <Card>Card contents</Card>
  </Flex.Item>
</Flex.Horizontal>
`}),g=()=>(0,o.jsx)(n,{scope:{TestElement:r},"data-visual-test":`flex-container-with-children`,noInline:!0,children:`// @ts-expect-error -- strictFunctionTypes
const Wrapper = Flex.withChildren(({ children }) => {
  return <div>{children}</div>
})
render(
  <Flex.Container direction="vertical">
    <TestElement>FlexItem 1</TestElement>
    <Wrapper>
      <TestElement>FlexItem 2</TestElement>
      <TestElement>FlexItem 3</TestElement>
    </Wrapper>
    <TestElement>FlexItem 4</TestElement>
  </Flex.Container>
)
`}),_=()=>(0,o.jsx)(n,{scope:{TestElement:r},"data-visual-test":`flex-container-line-framed`,background:`plain`,noInline:!0,children:`const Item = () => (
  <Flex.Stack divider="line-framed" gap="x-small">
    <TestElement>FlexItem</TestElement>
    <TestElement>FlexItem</TestElement>
  </Flex.Stack>
)
render(
  <Flex.Horizontal rowGap={false}>
    <Item />
    <Item />
    <Item />
  </Flex.Horizontal>
)
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||b(`Examples`,!1),s||b(`Examples.Default`,!0),_||b(`Examples.FramedLineDividers`,!0),c||b(`Examples.HorizontalWithFieldString`,!0),l||b(`Examples.HorizontalWithFlexItem`,!0),u||b(`Examples.HorizontalWithFlexItemJustifyCenter`,!0),d||b(`Examples.HorizontalWithFlexItemJustifyFlexEnd`,!0),h||b(`Examples.LayoutHorizontalFlexGrowItems`,!0),m||b(`Examples.VerticalLineDivider`,!0),p||b(`Examples.VerticalWithCard`,!0),f||b(`Examples.VerticalWithFlexItem`,!0),g||b(`Examples.WrappedWithChildren`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`No properties`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Flex.Item`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Horizontal Flex.Item, `,(0,o.jsx)(t.code,{children:`justify="center"`})]}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Horizontal Flex.Item, `,(0,o.jsx)(t.code,{children:`justify="flex-end"`})]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Horizontal with `,(0,o.jsx)(t.code,{children:`size`}),` and `,(0,o.jsx)(t.code,{children:`grow`})]}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Field.String`}),`
`,(0,o.jsx)(t.p,{children:`Will wrap on small screens.`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Vertical Flex.Item`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Vertical aligned Card`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Vertical line divider`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Framed line dividers`}),`
`,(0,o.jsxs)(t.p,{children:[`This example shows how to use the `,(0,o.jsx)(t.code,{children:`Flex.Container`}),` component to create a framed line divider (`,(0,o.jsx)(t.code,{children:`line-framed`}),`), which includes a line before the first item and above the last item.`]}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Flex.withChildren`}),`
`,(0,o.jsx)(g,{})]})}function y(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};