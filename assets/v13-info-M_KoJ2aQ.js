import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-CGxQ8PRe.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v13`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#v13`,children:`v13`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`Install`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#css-custom-properties`,children:`CSS custom properties`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#component-changes`,children:`Component changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#flex`,children:`Flex`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#accordion`,children:`Accordion`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#modal-dialog-and-drawer`,children:`Modal, Dialog and Drawer`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#infocard`,children:`InfoCard`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#popover`,children:`Popover`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#scrollview`,children:`ScrollView`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Note:`}),` There is no `,(0,r.jsx)(t.code,{children:`v12`}),` release. The version `,(0,r.jsx)(t.code,{children:`v12`}),` was accidentally published to NPM and has since been removed. Because a published version number cannot be safely reused, `,(0,r.jsx)(t.code,{children:`v12`}),` has been skipped entirely, and these breaking changes are released as `,(0,r.jsx)(t.code,{children:`v13`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsxs)(t.p,{children:[`v13 of @dnb/eufemia contains `,(0,r.jsx)(t.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to @dnb/eufemia v13 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i @dnb/eufemia@13
# or
$ yarn add @dnb/eufemia@13
`})}),`
`,(0,r.jsx)(t.h2,{children:`CSS custom properties`}),`
`,(0,r.jsx)(t.h3,{children:`Typography:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--sb-font-size-*`}),` with `,(0,r.jsx)(t.code,{children:`--font-size-*`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--sb-font-size-medium--plus`}),` with `,(0,r.jsx)(t.code,{children:`--font-size-medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--sb-line-height-*`}),` with `,(0,r.jsx)(t.code,{children:`--line-height-*`})]}),`
`]}),`
`,(0,r.jsx)(t.h4,{children:`Tailwind`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--text-sb-*`}),` with `,(0,r.jsx)(t.code,{children:`--text-*`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--text-sb-medium--plus`}),` with `,(0,r.jsx)(t.code,{children:`--text-medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`--leading-sb-*`}),` with `,(0,r.jsx)(t.code,{children:`--leading-*`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Component changes`}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/layout/flex/`,children:`Flex`})}),`
`,(0,r.jsx)(t.p,{children:`Flex now uses native CSS gap and renders React children unchanged. The following legacy migration APIs are deprecated:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`Flex.withChildren`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`_supportsSpacingProps`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`wrapChildrenInSpace`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`layoutEngine="legacy"`})}),`
`]}),`
`,(0,r.jsx)(t.h4,{children:`Custom components`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`_supportsSpacingProps`}),` marker is no longer needed. A custom component becomes a flex item through its rendered root, so nothing needs to opt it in to the layout. When the component should accept `,(0,r.jsx)(t.a,{href:`/uilib/layout/space/`,children:`spacing properties`}),`, apply them to its root with `,(0,r.jsx)(t.code,{children:`useSpacing`}),` so an author can still adjust the spacing per instance.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Before (v11):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { clsx } from 'clsx'
import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'

function MyComponent({ className, ...props }) {
  const params = useSpacing(props, {
    ...props,
    className: clsx('my-component', className),
  })

  return <div {...params} />
}

// Opted the component in to receive spacing from Flex.Container.
MyComponent._supportsSpacingProps = true
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`After (v13):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { clsx } from 'clsx'
import { useSpacing } from '@dnb/eufemia/components/space/SpacingUtils'

function MyComponent({ className, ...props }) {
  const params = useSpacing(props, {
    ...props,
    className: clsx('my-component', className),
  })

  return <div {...params} />
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`For a component that already applied spacing to its root, deleting the marker is the only change. The rendered `,(0,r.jsx)(t.code,{children:`<div>`}),` is now a flex item automatically, and `,(0,r.jsx)(t.code,{children:`useSpacing`}),` keeps the component's own `,(0,r.jsx)(t.code,{children:`top`}),`, `,(0,r.jsx)(t.code,{children:`right`}),`, `,(0,r.jsx)(t.code,{children:`bottom`}),`, and `,(0,r.jsx)(t.code,{children:`left`}),` props working — in CSS mode those values participate in pairwise spacing and may replace the adjacent container gap. If a component did not previously apply spacing to its root, adopt `,(0,r.jsx)(t.code,{children:`useSpacing`}),` as shown so authors can keep adjusting spacing per instance. A component that never needs per-instance spacing can simply drop the marker and receive the container gap.`]}),`
`,(0,r.jsx)(t.h4,{children:`Wrapper components`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`Flex.withChildren`}),` is deprecated. It never hoisted a wrapper's children into the outer container's flex line. When the HOC marked a wrapper, `,(0,r.jsx)(t.code,{children:`Flex.Container`}),` automatically injected a nested `,(0,r.jsx)(t.code,{children:`Flex.Container`}),` inside the wrapper's root — inheriting the outer container's props — and laid the wrapper's children out there. The rendered DOM was already outer container → wrapper root → inner container. To keep that layout in v13, render the inner `,(0,r.jsx)(t.code,{children:`Flex.Container`}),` yourself.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Before (v11):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'

// The HOC marked the wrapper, so Flex.Container injected a nested
// Flex.Container inside it to lay out the wrapper's children.
const Wrapper = Flex.withChildren(({ children }) => <div>{children}</div>)

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
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`After (v13):`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'

// Render the inner Flex.Container yourself — this is the container
// the HOC used to inject automatically.
function Wrapper({ children }) {
  return (
    <div>
      <Flex.Container direction="vertical">{children}</Flex.Container>
    </div>
  )
}

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
`})}),`
`,(0,r.jsxs)(t.p,{children:[`The DOM structure is unchanged from v11 — a wrapper root containing a nested `,(0,r.jsx)(t.code,{children:`Flex.Container`}),`. The only difference is that you now provide that inner container explicitly and set its own props (`,(0,r.jsx)(t.code,{children:`direction`}),`, `,(0,r.jsx)(t.code,{children:`gap`}),`, `,(0,r.jsx)(t.code,{children:`divider`}),`, …) instead of inheriting them from the outer container. If a wrapper renders no DOM of its own — for example a Fragment, a context provider, or another transparent component — its children already become direct flex items of the outer container and need no inner `,(0,r.jsx)(t.code,{children:`Flex.Container`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`When using `,(0,r.jsx)(t.code,{children:`divider="line"`}),` or `,(0,r.jsx)(t.code,{children:`divider="line-framed"`}),`, the CSS engine paints the divider without rendering `,(0,r.jsx)(t.code,{children:`<hr>`}),` elements. This removes the corresponding separator roles from the accessibility tree. If a divider conveys semantic separation, render explicit `,(0,r.jsx)(t.code,{children:`Hr`}),` elements instead of relying on the `,(0,r.jsx)(t.code,{children:`divider`}),` property.`]}),`
`,(0,r.jsx)(t.p,{children:`The previous child-inspection engine remains temporarily available during migration:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`<Flex.Container layoutEngine="legacy">...</Flex.Container>
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Do not use the deprecated APIs for new integrations. See the `,(0,r.jsx)(t.a,{href:`/uilib/layout/flex/container/#backwards-compatibility`,children:`Flex.Container migration guidance`}),` for details.`]}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/accordion/`,children:`Accordion`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`id`}),` with `,(0,r.jsx)(t.code,{children:`connectedTo`}),` on `,(0,r.jsx)(t.code,{children:`Accordion.Content`}),` when connecting to a standalone tertiary button.`]}),`
`]}),`
`,(0,r.jsxs)(t.h3,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/modal/`,children:`Modal`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/components/dialog/`,children:`Dialog`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/drawer/`,children:`Drawer`})]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`closeButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`closeButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Drawer closeButtonAttributes={{ text: 'Custom text' }} />
+<Drawer closeButtonProps={{ text: 'Custom text' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`triggerAttributes`}),` with `,(0,r.jsx)(t.code,{children:`triggerProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Dialog triggerAttributes={{ text: 'Open', variant: 'primary' }} />
+<Dialog triggerProps={{ text: 'Open', variant: 'primary' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`ModalTriggerAttributes`}),` type has been removed. Use `,(0,r.jsx)(t.code,{children:`ButtonProps`}),` from `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/info-card/`,children:`InfoCard`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`closeButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`closeButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<InfoCard closeButtonAttributes={{ href: '/path' }} />
+<InfoCard closeButtonProps={{ href: '/path' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`acceptButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`acceptButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<InfoCard acceptButtonAttributes={{ href: '/path' }} />
+<InfoCard acceptButtonProps={{ href: '/path' }} />
`})}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/popover/`,children:`Popover`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`triggerAttributes`}),` with `,(0,r.jsx)(t.code,{children:`triggerProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Popover triggerAttributes={{ 'aria-haspopup': 'menu' }} />
+<Popover triggerProps={{ 'aria-haspopup': 'menu' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`PopoverTriggerAttributes`}),` type has been removed. Use `,(0,r.jsx)(t.code,{children:`triggerProps`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/`,children:`Typography`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`<Typography.Provider>`}),` with `,(0,r.jsx)(t.code,{children:`<Typography.Context>`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Typography.Provider/>
+<Typography.Context/>
`})}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/scroll-view/`,children:`ScrollView`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The deprecated `,(0,r.jsx)(t.code,{children:`ScrollView`}),` export from `,(0,r.jsx)(t.code,{children:`@dnb/eufemia/fragments`}),` has been removed. Import it from the main package instead.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-import { ScrollView } from '@dnb/eufemia/fragments'
+import { ScrollView } from '@dnb/eufemia'
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};