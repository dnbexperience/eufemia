import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-CGxQ8PRe.js";import r from"./demos-C_AbBF4W.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
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
`,(0,i.jsx)(t.h2,{children:`How spacing is applied`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Flex.Container`}),` keeps the existing spacing behavior by default. This preserves layouts that depend on spacing props, generated `,(0,i.jsx)(t.code,{children:`Space`}),` wrappers, or `,(0,i.jsx)(t.code,{children:`_supportsSpacingProps`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Set `,(0,i.jsx)(t.code,{children:`layoutEngine="css"`}),` to use native CSS flex gaps. In CSS mode, React children are rendered unchanged, so intrinsic elements and custom components participate automatically through their rendered DOM roots.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const MyItem = () => (
  <>
    <Card>content</Card>
    <Card>content</Card>
  </>
)

render(
  <Flex.Container direction="vertical" layoutEngine="css">
    <MyItem />
  </Flex.Container>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`Fragments and providers that render no DOM are transparent. In the example above, both Cards become flex items and receive the container gap.`}),`
`,(0,i.jsxs)(t.p,{children:[`Components that support `,(0,i.jsx)(t.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),` expose their requested spacing on the rendered root. An explicit start spacing overrides the previous item's end spacing for that pair. The first item's start and last item's end remain outer margins.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Ordinary custom components do not need a marker or wrapper to receive the container gap. Use `,(0,i.jsx)(t.code,{children:`Flex.Item`}),` when you need an explicit layout item, span sizing, or spacing props around a component that does not expose spacing on its own root.`]}),`
`,(0,i.jsx)(t.h3,{children:`Divider accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`In CSS mode, `,(0,i.jsx)(t.code,{children:`divider="line"`}),` and `,(0,i.jsx)(t.code,{children:`divider="line-framed"`}),` are painted visual lines. Unlike the legacy engine, they do not render `,(0,i.jsx)(t.code,{children:`<hr>`}),` elements and therefore do not add separator roles to the accessibility tree. If the separation is meaningful rather than decorative, render explicit `,(0,i.jsx)(t.code,{children:`Hr`}),` elements instead of relying on the `,(0,i.jsx)(t.code,{children:`divider`}),` property.`]}),`
`,(0,i.jsx)(t.h2,{children:`Backwards compatibility`}),`
`,(0,i.jsx)(t.p,{children:`The existing React child-inspection engine remains the default, so applications do not need to annotate every established layout:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Flex.Container>...</Flex.Container>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`layoutEngine="css"`}),` when migrating a layout to native gaps. The explicit `,(0,i.jsx)(t.code,{children:`layoutEngine="legacy"`}),` value is still supported when an integration needs to document that dependency.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};