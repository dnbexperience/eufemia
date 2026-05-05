import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-Bf5b-1do.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'
render(<Flex.Container />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Flex.Container`}),` is a building block for `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout`,children:`CSS flexbox`}),` based layout of contents and components.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` For form layouts, use `,(0,r.jsx)(n.a,{href:`/uilib/layout/flex/stack/`,children:`Flex.Stack`}),` instead.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use `,(0,r.jsx)(n.a,{href:`/uilib/layout/flex/item`,children:`Flex.Item`}),` or `,(0,r.jsx)(n.a,{href:`/uilib/components/card`,children:`Card`}),` for you inner wrappers:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Flex, Card } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <Card>content</Card>
  </Flex.Container>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`But you can use it with what ever element too. It will wrap it in an `,(0,r.jsx)(n.code,{children:`Flex.Item`}),` to ensure the spacing is applied:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <div>content</div>
    <div>content</div>
  </Flex.Container>
)
`})}),`
`,(0,r.jsx)(n.p,{children:`During render, the items within the "Wrapper" container are wrapped with the same properties. This ensures that all the items have the same appearance.`}),`
`,(0,r.jsx)(n.h3,{children:`Horizontal and Vertical aliases`}),`
`,(0,r.jsxs)(n.p,{children:[`For shortening the usage of `,(0,r.jsx)(n.code,{children:`direction="..."`}),`, you can use:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<Flex.Vertical>`}),` instead of `,(0,r.jsx)(n.code,{children:`<Flex.Container direction="vertical">`})]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Flex.Vertical>
  <Flex.Item>part of vertical alignment</Flex.Item>
  <Flex.Item>part of vertical alignment</Flex.Item>
</Flex.Vertical>
`})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<Flex.Horizontal>`}),` instead of `,(0,r.jsx)(n.code,{children:`<Flex.Container direction="horizontal">`})]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Flex.Horizontal>
  <Flex.Item>part of horizontal alignment</Flex.Item>
  <Flex.Item>part of horizontal alignment</Flex.Item>
</Flex.Horizontal>
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container/`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Limitations`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Flex.Container`}),` will iterate over its childrenToReact, but not the children of the children`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` This examples showcases the limitation:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Flex, Card } from '@dnb/eufemia'

// The Cards will not get the spacing applied
const MyItem = () => (
  <>
    <Card>content</Card>
    <Card>content</Card>
  </>
)

const MyContainer = () => (
  <Flex.Container>
    <MyItem />
  </Flex.Container>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`How spacing is applied`}),`
`,(0,r.jsxs)(n.p,{children:[`Nested components should preferably support `,(0,r.jsx)(n.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`When a element or component was given, that does not support spacing, it will still work out of the box as it gets wrapped in a spacing block.`}),`
`,(0,r.jsxs)(n.p,{children:[`You may else wrap your custom component in a `,(0,r.jsx)(n.code,{children:`Flex.Item`}),` – this way, you still can change the spacing per component basis.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Technically, `,(0,r.jsx)(n.code,{children:`Flex.Container`}),` checks if a nested component has a property called `,(0,r.jsx)(n.code,{children:`_supportsSpacingProps`}),`. So if you have a component that supports the `,(0,r.jsx)(n.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),`, you can add this property `,(0,r.jsx)(n.code,{children:`ComponentName._supportsSpacingProps = true`}),`. If you provide `,(0,r.jsx)(n.code,{children:`false`}),`, it will not support spacing.`]}),`
`,(0,r.jsxs)(n.p,{children:[`If the component is a wrapper component, and you want its children to support spacing, you can add this property `,(0,r.jsx)(n.code,{children:`ComponentName._supportsSpacingProps = 'children'`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`But for simplicity, you can use the HOC `,(0,r.jsx)(n.code,{children:`Flex.withChildren`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const Wrapper = Flex.withChildren(({ children }) => {
  return <div>{children}</div>
})

render(
  <Flex.Container direction="vertical">
    <Item />
    <Wrapper>
      <Item />
      <Item />
    </Wrapper>
    <Item />
  </Flex.Container>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};