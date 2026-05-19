import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./TestElement-CGrmu8xx.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({Default:()=>c,FramedLineDividers:()=>v,HorizontalWithFieldString:()=>l,HorizontalWithFlexItem:()=>u,HorizontalWithFlexItemJustifyCenter:()=>d,HorizontalWithFlexItemJustifyFlexEnd:()=>f,LayoutHorizontalFlexGrowItems:()=>g,VerticalLineDivider:()=>h,VerticalWithCard:()=>m,VerticalWithFlexItem:()=>p,WrappedWithChildren:()=>_}),s=e(n()),c=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`Default`,children:`<Flex.Container>
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
`}),l=()=>(0,s.jsx)(r,{scope:{TestElement:i},"data-visual-test":`flex-container-field`,stableName:`HorizontalWithFieldString`,children:`<Flex.Container>
  <Field.String label="Label" value="Foo" width="medium" />
  <Field.String label="Label" value="Foo" width="small" />
</Flex.Container>
`}),u=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`HorizontalWithFlexItem`,children:`<Flex.Container>
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
`}),d=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`HorizontalWithFlexItemJustifyCenter`,children:`<Flex.Container justify="center">
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
`}),f=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`HorizontalWithFlexItemJustifyFlexEnd`,children:`<Flex.Container justify="flex-end">
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
`}),p=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`VerticalWithFlexItem`,children:`<Flex.Container direction="vertical">
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
`}),m=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`VerticalWithCard`,children:`<Flex.Container direction="vertical">
  <Card>Card contents</Card>
  <Card>Card contents</Card>
  <Card>Card contents</Card>
</Flex.Container>
`}),h=()=>(0,s.jsx)(r,{scope:{TestElement:i},"data-visual-test":`flex-container-divider`,stableName:`VerticalLineDivider`,children:`<Flex.Container direction="vertical" divider="line" alignSelf="stretch">
  <TestElement>FlexItem</TestElement>
  <TestElement>FlexItem</TestElement>
  <TestElement>FlexItem</TestElement>
</Flex.Container>
`}),g=()=>(0,s.jsx)(r,{stableName:`LayoutHorizontalFlexGrowItems`,children:`<Flex.Horizontal>
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
`}),_=()=>(0,s.jsx)(r,{scope:{TestElement:i},"data-visual-test":`flex-container-with-children`,stableName:`WrappedWithChildren`,noInline:!0,children:`// @ts-expect-error -- strictFunctionTypes
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
`}),v=()=>(0,s.jsx)(r,{scope:{TestElement:i},"data-visual-test":`flex-container-line-framed`,background:`plain`,stableName:`FramedLineDividers`,noInline:!0,children:`const Item = () => (
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
`});function y(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return o||x(`Examples`,!1),c||x(`Examples.Default`,!0),v||x(`Examples.FramedLineDividers`,!0),l||x(`Examples.HorizontalWithFieldString`,!0),u||x(`Examples.HorizontalWithFlexItem`,!0),d||x(`Examples.HorizontalWithFlexItemJustifyCenter`,!0),f||x(`Examples.HorizontalWithFlexItemJustifyFlexEnd`,!0),g||x(`Examples.LayoutHorizontalFlexGrowItems`,!0),h||x(`Examples.VerticalLineDivider`,!0),m||x(`Examples.VerticalWithCard`,!0),p||x(`Examples.VerticalWithFlexItem`,!0),_||x(`Examples.WrappedWithChildren`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`No properties`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal Flex.Item`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Horizontal Flex.Item, `,(0,s.jsx)(t.code,{children:`justify="center"`})]}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Horizontal Flex.Item, `,(0,s.jsx)(t.code,{children:`justify="flex-end"`})]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Horizontal with `,(0,s.jsx)(t.code,{children:`size`}),` and `,(0,s.jsx)(t.code,{children:`grow`})]}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal Field.String`}),`
`,(0,s.jsx)(t.p,{children:`Will wrap on small screens.`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Vertical Flex.Item`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Vertical aligned Card`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Vertical line divider`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Framed line dividers`}),`
`,(0,s.jsxs)(t.p,{children:[`This example shows how to use the `,(0,s.jsx)(t.code,{children:`Flex.Container`}),` component to create a framed line divider (`,(0,s.jsx)(t.code,{children:`line-framed`}),`), which includes a line before the first item and above the last item.`]}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`Flex.withChildren`}),`
`,(0,s.jsx)(_,{})]})}function b(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};