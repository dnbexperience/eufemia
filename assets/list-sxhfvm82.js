import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-D1L5wabr.js";import r,{n as i,t as a}from"./demos-240_eM5M.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return i||l(`Examples`,!1),a||l(`Examples.CustomItemComponent`,!0),r||l(`RelatedComponents`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { List } from '@dnb/eufemia'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`List`}),` is a layout component for displaying rows of content. Use `,(0,o.jsx)(t.code,{children:`List.Container`}),` as the wrapper and `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),`, `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),`, or `,(0,o.jsx)(t.code,{children:`List.Item.Accordion`}),` for each row.`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Container`}),` – Provides list context (e.g. variant) and wraps items in a vertical flex layout. Pass `,(0,o.jsx)(t.code,{children:`separated`}),` to insert gap between rows so each item gets its own rounding/outline instead of sharing borders.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Item.Basic`}),` – A single row with optional `,(0,o.jsx)(t.code,{children:`icon`}),` and `,(0,o.jsx)(t.code,{children:`title`}),` props and cell children. Supports selected state, variant override, and loading states via `,(0,o.jsx)(t.code,{children:`pending`}),` (skeleton overlay) or `,(0,o.jsx)(t.code,{children:`skeleton`}),` (text placeholder).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Item.Action`}),` – Clickable row with optional `,(0,o.jsx)(t.code,{children:`icon`}),` and `,(0,o.jsx)(t.code,{children:`title`}),` props (Enter/Space support) and a chevron icon. Use `,(0,o.jsx)(t.code,{children:`chevronPosition="left"`}),` or `,(0,o.jsx)(t.code,{children:`"right"`}),` (default) to place the chevron. Supports `,(0,o.jsx)(t.code,{children:`pending`}),` to show a loading overlay and disable interaction. Use `,(0,o.jsx)(t.code,{children:`href`}),` for navigation.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Item.Accordion`}),` – Expandable row with optional `,(0,o.jsx)(t.code,{children:`icon`}),` and `,(0,o.jsx)(t.code,{children:`title`}),` props and `,(0,o.jsx)(t.code,{children:`List.Item.Accordion.Content`}),` for the expandable section. Use `,(0,o.jsx)(t.code,{children:`open`}),` for initial state, `,(0,o.jsx)(t.code,{children:`chevronPosition="left"`}),` or `,(0,o.jsx)(t.code,{children:`"right"`}),` (default) for chevron placement, and optional `,(0,o.jsx)(t.code,{children:`id`}),` for ARIA. Supports `,(0,o.jsx)(t.code,{children:`pending`}),` to disable toggling.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Cell.Start`}),`, `,(0,o.jsx)(t.strong,{children:`List.Cell.Center`}),`, `,(0,o.jsx)(t.strong,{children:`List.Cell.End`}),`, `,(0,o.jsx)(t.strong,{children:`List.Cell.Footer`}),` – Cell slots inside Basic/Action/Accordion for start, middle, end, and additional content.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Cell.Title`}),` – Title block that can contain `,(0,o.jsx)(t.code,{children:`List.Cell.Title.Overline`}),` and `,(0,o.jsx)(t.code,{children:`List.Cell.Title.Subline`}),`. Use the nested helpers for structured header text, even though the drop-in `,(0,o.jsx)(t.code,{children:`List.Cell.Title.Overline`}),`/`,(0,o.jsx)(t.code,{children:`List.Cell.Title.Subline`}),` components still exist for backward compatibility.`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`All item components support `,(0,o.jsx)(t.a,{href:`/uilib/layout/space/properties`,children:`Space`}),` props (`,(0,o.jsx)(t.code,{children:`top`}),`, `,(0,o.jsx)(t.code,{children:`bottom`}),`, etc.) and forward standard HTML attributes.`]}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=47195-2954`,children:`Figma`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Basic usage`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { List } from '@dnb/eufemia'

render(
  <List.Container>
    <List.Item.Basic>Simple row</List.Item.Basic>

    <List.Item.Basic title="Title" icon="bell">
      <List.Cell.Start>Start</List.Cell.Start>
      <List.Cell.Center>Center</List.Cell.Center>
      <List.Cell.End>End</List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic>
      <List.Cell.Center>
        <List.Cell.Title>
          <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
          Main title here
          <List.Cell.Title.Subline>Subline</List.Cell.Title.Subline>
        </List.Cell.Title>
      </List.Cell.Center>
    </List.Item.Basic>

    <List.Item.Action
      title="Click me"
      icon="bell"
      onClick={() => console.log('Clicked')}
    >
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Action>

    <List.Item.Action
      title="Link"
      icon="bell"
      href="https://dnb.no"
      target="_blank"
      rel="noopener noreferrer"
    >
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion title="Expandable" icon="bell">
      <List.Item.Accordion.Header>
        <List.Cell.End>1234</List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content>
        <P>Content when expanded.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>

    <List.Item.Accordion title="Without explicit header" icon="bell">
      <List.Item.Accordion.Content>
        <P>Content when expanded.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
`})}),`
`,(0,o.jsx)(t.h2,{children:`Custom item components`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`List.Container`}),` applies spacing to each direct child by checking it for a `,(0,o.jsx)(t.code,{children:`_supportsSpacingProps`}),` marker. The built-in items (`,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),`, `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),`, `,(0,o.jsx)(t.code,{children:`List.Item.Accordion`}),`) set it, so they render directly as `,(0,o.jsx)(t.code,{children:`<li>`}),` children of the list.`]}),`
`,(0,o.jsx)(t.p,{children:`If you extract a row into your own component, the container can't tell it is a list item and wraps it in an extra element. This makes each row its own group, so every row gets top and bottom rounding instead of only the first and last row of the list.`}),`
`,(0,o.jsxs)(t.p,{children:[`Set `,(0,o.jsx)(t.code,{children:`_supportsSpacingProps = true`}),` on your component to opt in, and forward the props to the underlying item so spacing (such as the `,(0,o.jsx)(t.code,{children:`separated`}),` variant gap) still applies:`]}),`
`,(0,o.jsx)(a,{}),`
`,(0,o.jsx)(t.h2,{children:`Loading states`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`pending`}),` – On `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),`: shows a skeleton overlay and disables pointer events. On `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),`, click and keyboard are disabled (`,(0,o.jsx)(t.code,{children:`tabIndex={-1}`}),`, `,(0,o.jsx)(t.code,{children:`aria-disabled`}),`). Use while data is loading.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`skeleton`}),` – On `,(0,o.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,o.jsx)(t.code,{children:`List.Item.Action`}),`: applies skeleton font styling (text placeholder) without the full overlay. Use for a lighter loading indication.`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Item.Action`}),` uses `,(0,o.jsx)(t.code,{children:`role="button"`}),` so assistive technologies announce it as a button. It is focusable (`,(0,o.jsx)(t.code,{children:`tabIndex={0}`}),`) and activates on Enter and Space. When `,(0,o.jsx)(t.code,{children:`pending`}),` is true, it is not focusable and has `,(0,o.jsx)(t.code,{children:`aria-disabled="true"`}),`. You can override the role via the `,(0,o.jsx)(t.code,{children:`role`}),` prop (e.g. `,(0,o.jsx)(t.code,{children:`role="link"`}),`).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`List.Item.Accordion`}),` exposes full ARIA for expand/collapse: the header has `,(0,o.jsx)(t.code,{children:`id`}),`, `,(0,o.jsx)(t.code,{children:`aria-controls`}),`, and `,(0,o.jsx)(t.code,{children:`aria-expanded`}),`; the content region has `,(0,o.jsx)(t.code,{children:`id`}),`, `,(0,o.jsx)(t.code,{children:`aria-labelledby`}),`, `,(0,o.jsx)(t.code,{children:`aria-hidden`}),`, and `,(0,o.jsx)(t.code,{children:`aria-expanded`}),`. Pass an `,(0,o.jsx)(t.code,{children:`id`}),` prop for stable references, or leave it unset for an auto-generated id. When `,(0,o.jsx)(t.code,{children:`pending`}),` is true, the header is not focusable and has `,(0,o.jsx)(t.code,{children:`aria-disabled="true"`}),`.`]}),`
`,(0,o.jsxs)(t.li,{children:[`Use `,(0,o.jsx)(t.code,{children:`aria-label`}),` or other ARIA attributes on the container or items when needed for screen readers.`]}),`
`]}),`
`,(0,o.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(r,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};