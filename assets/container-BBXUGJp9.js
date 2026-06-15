import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-DPmd7hpS.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'
render(<Flex.Container />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Flex.Container`}),` is a building block for `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout`,children:`CSS flexbox`}),` based layout of contents and components.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` For form layouts, use `,(0,i.jsx)(t.a,{href:`/uilib/layout/flex/stack/`,children:`Flex.Stack`}),` instead.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use `,(0,i.jsx)(t.a,{href:`/uilib/layout/flex/item`,children:`Flex.Item`}),` or `,(0,i.jsx)(t.a,{href:`/uilib/components/card`,children:`Card`}),` for you inner wrappers:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Flex, Card } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <Card>content</Card>
  </Flex.Container>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`But you can use it with what ever element too. It will wrap it in an `,(0,i.jsx)(t.code,{children:`Flex.Item`}),` to ensure the spacing is applied:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <div>content</div>
    <div>content</div>
  </Flex.Container>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`During render, the items within the "Wrapper" container are wrapped with the same properties. This ensures that all the items have the same appearance.`}),`
`,(0,i.jsx)(t.h3,{children:`Align vs Justify`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Flex.Container`}),` has two props for positioning its children: `,(0,i.jsx)(t.code,{children:`justify`}),` and `,(0,i.jsx)(t.code,{children:`align`}),`. These map directly to CSS flexbox properties and their effect depends on the `,(0,i.jsx)(t.code,{children:`direction`}),` of the container:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`justify`})}),` controls placement along the `,(0,i.jsx)(t.strong,{children:`main axis`}),` (CSS `,(0,i.jsx)(t.code,{children:`justify-content`}),`).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`align`})}),` controls alignment along the `,(0,i.jsx)(t.strong,{children:`cross axis`}),` (CSS `,(0,i.jsx)(t.code,{children:`align-items`}),`).`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`In practice, this means:`}),`
`,(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{}),(0,i.jsx)(t.th,{children:(0,i.jsx)(t.code,{children:`Flex.Horizontal`})}),(0,i.jsx)(t.th,{children:(0,i.jsx)(t.code,{children:`Flex.Vertical`})})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:`Center horizontally`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`justify="center"`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`align="center"`})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.strong,{children:`Center vertically`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`align="center"`})}),(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`justify="center"`})})]})]})]}),`
`,(0,i.jsxs)(t.p,{children:[`The main axis follows the direction: horizontal for `,(0,i.jsx)(t.code,{children:`Flex.Horizontal`}),`, vertical for `,(0,i.jsx)(t.code,{children:`Flex.Vertical`}),`. The cross axis is always perpendicular.`]}),`
`,(0,i.jsx)(t.h3,{children:`Horizontal and Vertical aliases`}),`
`,(0,i.jsxs)(t.p,{children:[`For shortening the usage of `,(0,i.jsx)(t.code,{children:`direction="..."`}),`, you can use:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`<Flex.Vertical>`}),` instead of `,(0,i.jsx)(t.code,{children:`<Flex.Container direction="vertical">`})]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Flex.Vertical>
  <Flex.Item>part of vertical alignment</Flex.Item>
  <Flex.Item>part of vertical alignment</Flex.Item>
</Flex.Vertical>
`})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`<Flex.Horizontal>`}),` instead of `,(0,i.jsx)(t.code,{children:`<Flex.Container direction="horizontal">`})]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Flex.Horizontal>
  <Flex.Item>part of horizontal alignment</Flex.Item>
  <Flex.Item>part of horizontal alignment</Flex.Item>
</Flex.Horizontal>
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container/`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Limitations`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Flex.Container`}),` will iterate over its childrenToReact, but not the children of the children`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` This examples showcases the limitation:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Flex, Card } from '@dnb/eufemia'

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
`,(0,i.jsx)(t.h2,{children:`How spacing is applied`}),`
`,(0,i.jsxs)(t.p,{children:[`Nested components should preferably support `,(0,i.jsx)(t.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`When an element or component was given, that does not support spacing, it will still work out of the box as it gets wrapped in a spacing block.`}),`
`,(0,i.jsxs)(t.p,{children:[`You may else wrap your custom component in a `,(0,i.jsx)(t.code,{children:`Flex.Item`}),` – this way, you still can change the spacing per component basis.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Technically, `,(0,i.jsx)(t.code,{children:`Flex.Container`}),` checks if a nested component has a property called `,(0,i.jsx)(t.code,{children:`_supportsSpacingProps`}),`. So if you have a component that supports the `,(0,i.jsx)(t.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),`, you can add this property `,(0,i.jsx)(t.code,{children:`ComponentName._supportsSpacingProps = true`}),`. If you provide `,(0,i.jsx)(t.code,{children:`false`}),`, it will not support spacing.`]}),`
`,(0,i.jsxs)(t.p,{children:[`If the component is a wrapper component, and you want its children to support spacing, you can add this property `,(0,i.jsx)(t.code,{children:`ComponentName._supportsSpacingProps = 'children'`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`But for simplicity, you can use the HOC `,(0,i.jsx)(t.code,{children:`Flex.withChildren`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const Wrapper = Flex.withChildren(({ children }) => {
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};