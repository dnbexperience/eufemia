import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-AI2z5JSY.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { List } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`List`}),` is a layout component for displaying rows of content. Use `,(0,i.jsx)(t.code,{children:`List.Container`}),` as the wrapper and `,(0,i.jsx)(t.code,{children:`List.Item.Basic`}),`, `,(0,i.jsx)(t.code,{children:`List.Item.Action`}),`, or `,(0,i.jsx)(t.code,{children:`List.Item.Accordion`}),` for each row.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Container`}),` – Provides list context (e.g. variant) and wraps items in a vertical flex layout. Pass `,(0,i.jsx)(t.code,{children:`separated`}),` to insert gap between rows so each item gets its own rounding/outline instead of sharing borders.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Item.Basic`}),` – A single row with optional `,(0,i.jsx)(t.code,{children:`icon`}),` and `,(0,i.jsx)(t.code,{children:`title`}),` props and cell children. Supports selected state, variant override, and loading states via `,(0,i.jsx)(t.code,{children:`pending`}),` (skeleton overlay) or `,(0,i.jsx)(t.code,{children:`skeleton`}),` (text placeholder).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Item.Action`}),` – Clickable row with optional `,(0,i.jsx)(t.code,{children:`icon`}),` and `,(0,i.jsx)(t.code,{children:`title`}),` props (Enter/Space support) and a chevron icon. Use `,(0,i.jsx)(t.code,{children:`chevronPosition="left"`}),` or `,(0,i.jsx)(t.code,{children:`"right"`}),` (default) to place the chevron. Supports `,(0,i.jsx)(t.code,{children:`pending`}),` to show a loading overlay and disable interaction. Use `,(0,i.jsx)(t.code,{children:`href`}),` for navigation.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Item.Accordion`}),` – Expandable row with optional `,(0,i.jsx)(t.code,{children:`icon`}),` and `,(0,i.jsx)(t.code,{children:`title`}),` props and `,(0,i.jsx)(t.code,{children:`List.Item.Accordion.Content`}),` for the expandable section. Use `,(0,i.jsx)(t.code,{children:`open`}),` for initial state, `,(0,i.jsx)(t.code,{children:`chevronPosition="left"`}),` or `,(0,i.jsx)(t.code,{children:`"right"`}),` (default) for chevron placement, and optional `,(0,i.jsx)(t.code,{children:`id`}),` for ARIA. Supports `,(0,i.jsx)(t.code,{children:`pending`}),` to disable toggling.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Cell.Start`}),`, `,(0,i.jsx)(t.strong,{children:`List.Cell.Center`}),`, `,(0,i.jsx)(t.strong,{children:`List.Cell.End`}),`, `,(0,i.jsx)(t.strong,{children:`List.Cell.Footer`}),` – Cell slots inside Basic/Action/Accordion for start, middle, end, and additional content.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Cell.Title`}),` – Title block that can contain `,(0,i.jsx)(t.code,{children:`List.Cell.Title.Overline`}),` and `,(0,i.jsx)(t.code,{children:`List.Cell.Title.Subline`}),`. Use the nested helpers for structured header text, even though the drop-in `,(0,i.jsx)(t.code,{children:`List.Cell.Title.Overline`}),`/`,(0,i.jsx)(t.code,{children:`List.Cell.Title.Subline`}),` components still exist for backward compatibility.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`All item components support `,(0,i.jsx)(t.a,{href:`/uilib/layout/space/properties`,children:`Space`}),` props (`,(0,i.jsx)(t.code,{children:`top`}),`, `,(0,i.jsx)(t.code,{children:`bottom`}),`, etc.) and forward standard HTML attributes.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=47195-2954`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Basic usage`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { List } from '@dnb/eufemia'

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
`,(0,i.jsx)(t.h2,{children:`Loading states`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`pending`}),` – On `,(0,i.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,i.jsx)(t.code,{children:`List.Item.Action`}),`: shows a skeleton overlay and disables pointer events. On `,(0,i.jsx)(t.code,{children:`List.Item.Action`}),`, click and keyboard are disabled (`,(0,i.jsx)(t.code,{children:`tabIndex={-1}`}),`, `,(0,i.jsx)(t.code,{children:`aria-disabled`}),`). Use while data is loading.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`skeleton`}),` – On `,(0,i.jsx)(t.code,{children:`List.Item.Basic`}),` or `,(0,i.jsx)(t.code,{children:`List.Item.Action`}),`: applies skeleton font styling (text placeholder) without the full overlay. Use for a lighter loading indication.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Item.Action`}),` uses `,(0,i.jsx)(t.code,{children:`role="button"`}),` so assistive technologies announce it as a button. It is focusable (`,(0,i.jsx)(t.code,{children:`tabIndex={0}`}),`) and activates on Enter and Space. When `,(0,i.jsx)(t.code,{children:`pending`}),` is true, it is not focusable and has `,(0,i.jsx)(t.code,{children:`aria-disabled="true"`}),`. You can override the role via the `,(0,i.jsx)(t.code,{children:`role`}),` prop (e.g. `,(0,i.jsx)(t.code,{children:`role="link"`}),`).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`List.Item.Accordion`}),` exposes full ARIA for expand/collapse: the header has `,(0,i.jsx)(t.code,{children:`id`}),`, `,(0,i.jsx)(t.code,{children:`aria-controls`}),`, and `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`; the content region has `,(0,i.jsx)(t.code,{children:`id`}),`, `,(0,i.jsx)(t.code,{children:`aria-labelledby`}),`, `,(0,i.jsx)(t.code,{children:`aria-hidden`}),`, and `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`. Pass an `,(0,i.jsx)(t.code,{children:`id`}),` prop for stable references, or leave it unset for an auto-generated id. When `,(0,i.jsx)(t.code,{children:`pending`}),` is true, the header is not focusable and has `,(0,i.jsx)(t.code,{children:`aria-disabled="true"`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Use `,(0,i.jsx)(t.code,{children:`aria-label`}),` or other ARIA attributes on the container or items when needed for screen readers.`]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};