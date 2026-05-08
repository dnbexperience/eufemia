import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-Btr83KI6.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { List } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`List`}),` is a layout component for displaying rows of content. Use `,(0,r.jsx)(n.code,{children:`List.Container`}),` as the wrapper and `,(0,r.jsx)(n.code,{children:`List.Item.Basic`}),`, `,(0,r.jsx)(n.code,{children:`List.Item.Action`}),`, or `,(0,r.jsx)(n.code,{children:`List.Item.Accordion`}),` for each row.`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Container`}),` – Provides list context (e.g. variant) and wraps items in a vertical flex layout. Pass `,(0,r.jsx)(n.code,{children:`separated`}),` to insert gap between rows so each item gets its own rounding/outline instead of sharing borders.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Item.Basic`}),` – A single row with optional `,(0,r.jsx)(n.code,{children:`icon`}),` and `,(0,r.jsx)(n.code,{children:`title`}),` props and cell children. Supports selected state, variant override, and loading states via `,(0,r.jsx)(n.code,{children:`pending`}),` (skeleton overlay) or `,(0,r.jsx)(n.code,{children:`skeleton`}),` (text placeholder).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Item.Action`}),` – Clickable row with optional `,(0,r.jsx)(n.code,{children:`icon`}),` and `,(0,r.jsx)(n.code,{children:`title`}),` props (Enter/Space support) and a chevron icon. Use `,(0,r.jsx)(n.code,{children:`chevronPosition="left"`}),` or `,(0,r.jsx)(n.code,{children:`"right"`}),` (default) to place the chevron. Supports `,(0,r.jsx)(n.code,{children:`pending`}),` to show a loading overlay and disable interaction. Use `,(0,r.jsx)(n.code,{children:`href`}),` for navigation.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Item.Accordion`}),` – Expandable row with optional `,(0,r.jsx)(n.code,{children:`icon`}),` and `,(0,r.jsx)(n.code,{children:`title`}),` props and `,(0,r.jsx)(n.code,{children:`List.Item.Accordion.Content`}),` for the expandable section. Use `,(0,r.jsx)(n.code,{children:`open`}),` for initial state, `,(0,r.jsx)(n.code,{children:`chevronPosition="left"`}),` or `,(0,r.jsx)(n.code,{children:`"right"`}),` (default) for chevron placement, and optional `,(0,r.jsx)(n.code,{children:`id`}),` for ARIA. Supports `,(0,r.jsx)(n.code,{children:`pending`}),` to disable toggling.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Cell.Start`}),`, `,(0,r.jsx)(n.strong,{children:`List.Cell.Center`}),`, `,(0,r.jsx)(n.strong,{children:`List.Cell.End`}),`, `,(0,r.jsx)(n.strong,{children:`List.Cell.Footer`}),` – Cell slots inside Basic/Action/Accordion for start, middle, end, and additional content.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Cell.Title`}),` – Title block that can contain `,(0,r.jsx)(n.code,{children:`List.Cell.Title.Overline`}),` and `,(0,r.jsx)(n.code,{children:`List.Cell.Title.Subline`}),`. Use the nested helpers for structured header text, even though the drop-in `,(0,r.jsx)(n.code,{children:`List.Cell.Title.Overline`}),`/`,(0,r.jsx)(n.code,{children:`List.Cell.Title.Subline`}),` components still exist for backward compatibility.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`All item components support `,(0,r.jsx)(n.a,{href:`/uilib/layout/space/properties`,children:`Space`}),` props (`,(0,r.jsx)(n.code,{children:`top`}),`, `,(0,r.jsx)(n.code,{children:`bottom`}),`, etc.) and forward standard HTML attributes.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=47195-2954`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Basic usage`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { List } from '@dnb/eufemia'

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
`,(0,r.jsx)(n.h2,{children:`Loading states`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`pending`}),` – On `,(0,r.jsx)(n.code,{children:`List.Item.Basic`}),` or `,(0,r.jsx)(n.code,{children:`List.Item.Action`}),`: shows a skeleton overlay and disables pointer events. On `,(0,r.jsx)(n.code,{children:`List.Item.Action`}),`, click and keyboard are disabled (`,(0,r.jsx)(n.code,{children:`tabIndex={-1}`}),`, `,(0,r.jsx)(n.code,{children:`aria-disabled`}),`). Use while data is loading.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`skeleton`}),` – On `,(0,r.jsx)(n.code,{children:`List.Item.Basic`}),` or `,(0,r.jsx)(n.code,{children:`List.Item.Action`}),`: applies skeleton font styling (text placeholder) without the full overlay. Use for a lighter loading indication.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Item.Action`}),` uses `,(0,r.jsx)(n.code,{children:`role="button"`}),` so assistive technologies announce it as a button. It is focusable (`,(0,r.jsx)(n.code,{children:`tabIndex={0}`}),`) and activates on Enter and Space. When `,(0,r.jsx)(n.code,{children:`pending`}),` is true, it is not focusable and has `,(0,r.jsx)(n.code,{children:`aria-disabled="true"`}),`. You can override the role via the `,(0,r.jsx)(n.code,{children:`role`}),` prop (e.g. `,(0,r.jsx)(n.code,{children:`role="link"`}),`).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`List.Item.Accordion`}),` exposes full ARIA for expand/collapse: the header has `,(0,r.jsx)(n.code,{children:`id`}),`, `,(0,r.jsx)(n.code,{children:`aria-controls`}),`, and `,(0,r.jsx)(n.code,{children:`aria-expanded`}),`; the content region has `,(0,r.jsx)(n.code,{children:`id`}),`, `,(0,r.jsx)(n.code,{children:`aria-labelledby`}),`, `,(0,r.jsx)(n.code,{children:`aria-hidden`}),`, and `,(0,r.jsx)(n.code,{children:`aria-expanded`}),`. Pass an `,(0,r.jsx)(n.code,{children:`id`}),` prop for stable references, or leave it unset for an auto-generated id. When `,(0,r.jsx)(n.code,{children:`pending`}),` is true, the header is not focusable and has `,(0,r.jsx)(n.code,{children:`aria-disabled="true"`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Use `,(0,r.jsx)(n.code,{children:`aria-label`}),` or other ARIA attributes on the container or items when needed for screen readers.`]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};