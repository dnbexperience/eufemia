import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BpCze3sd.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.MultiSelection />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.MultiSelection`}),` is a component for selecting multiple items from a fixed set with a confirmation flow. The selection interface appears in a popover overlay, keeping your form layout clean.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/MultiSelection`,children:`Value.MultiSelection`}),` component.`]}),`
`,(0,i.jsx)(t.p,{children:`This is ideal when users need to:`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`Browse and filter through many options.`}),`
`,(0,i.jsx)(t.li,{children:`See their selections clearly before confirming.`}),`
`,(0,i.jsx)(t.li,{children:`Cancel and discard changes without applying them.`}),`
`,(0,i.jsx)(t.li,{children:`Work with structured data beyond simple strings.`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

const data = [
  {
    value: 'option1',
    title: 'Option 1',
    text: 'Text',
    description: 'Description',
  },
  { value: 'option2', title: 'Option 2', text: 'Text' },
  { value: 'option3', title: 'Option 3', description: 'Description' },
]

render(
  <Field.MultiSelection
    label="Select items"
    data={data}
    showSearchField
    showSelectedTags
  />
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Using with dataPath`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the `,(0,i.jsx)(t.code,{children:`dataPath`}),` property to provide the data from the Form context:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myItems: [
        { value: 'oslo', title: 'Oslo', text: 'Capital of Norway' },
        {
          value: 'stockholm',
          title: 'Stockholm',
          text: 'Capital of Sweden',
        },
        {
          value: 'copenhagen',
          title: 'Copenhagen',
          text: 'Capital of Denmark',
        },
      ],
    }}
  >
    <Field.MultiSelection
      label="Select cities"
      dataPath="/myItems"
      showSearchField
      showSelectedTags
    />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Features`}),`
`,(0,i.jsx)(t.h3,{children:`Popover Interface`}),`
`,(0,i.jsx)(t.p,{children:`The selection interface appears in a popover overlay, keeping your form clean and maintaining focus on the current field. Click the trigger button to open the selection interface, showing the search field, items list, and action buttons.`}),`
`,(0,i.jsx)(t.h3,{children:`Selected Items Display`}),`
`,(0,i.jsxs)(t.p,{children:[`Shows currently selected items as removable tags when `,(0,i.jsx)(t.code,{children:`showSelectedTags`}),` is enabled.`]}),`
`,(0,i.jsxs)(t.h3,{children:[`Collapsible Selected Items (`,(0,i.jsx)(t.code,{children:`selectedItemsCollapsibleThreshold`}),`)`]}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`showSelectedTags`}),` is enabled and the `,(0,i.jsx)(t.strong,{children:`total number of available items`}),` exceeds `,(0,i.jsx)(t.code,{children:`selectedItemsCollapsibleThreshold`}),` (default: `,(0,i.jsx)(t.code,{children:`20`}),`), the selected items are hidden by default and a collapsible header appears with two controls:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Toggle button`}),`: Shows the count of selected items relative to the total (e.g. `,(0,i.jsx)(t.em,{children:`"22 of 30 selected"`}),`) with a rotating chevron icon. Announces its state to screen readers via `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`. Click to expand or collapse the tag list.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Clear all button`}),`: A tertiary button with a close icon that deselects all items at once. Hidden when nothing is selected.`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`The tag list expands and collapses with a smooth height animation.`}),`
`,(0,i.jsxs)(t.p,{children:[`Set `,(0,i.jsx)(t.code,{children:`selectedItemsCollapsibleThreshold`}),` to a custom number to control when the collapsible header kicks in:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Field.MultiSelection
  showSelectedTags
  selectedItemsCollapsibleThreshold={10}
  {/* ... */}
/>
`})}),`
`,(0,i.jsx)(t.h3,{children:`Search Functionality`}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`showSearchField`}),` is enabled, users can filter through items by typing in the search field. The filtering applies to both the item title and text and description.`]}),`
`,(0,i.jsx)(t.h3,{children:`Item Details`}),`
`,(0,i.jsxs)(t.p,{children:[`Each item can include optional `,(0,i.jsx)(t.code,{children:`text`}),` and `,(0,i.jsx)(t.code,{children:`description`}),` content below the main title. `,(0,i.jsx)(t.code,{children:`text`}),` renders as black primary lines, while `,(0,i.jsx)(t.code,{children:`description`}),` renders as grey secondary lines.`]}),`
`,(0,i.jsx)(t.h3,{children:`Disabled Items`}),`
`,(0,i.jsxs)(t.p,{children:[`Individual items can be disabled by setting their `,(0,i.jsx)(t.code,{children:`disabled`}),` property to `,(0,i.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Confirmation Flow`}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`showConfirmButton`}),` is enabled, users must click "Confirm selection" to apply changes, or "Cancel" to discard them without modifying the form value.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsx)(t.h3,{children:`Keyboard interaction`}),`
`,(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:`Key`}),(0,i.jsx)(t.th,{children:`Behavior`})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsxs)(t.td,{children:[(0,i.jsx)(t.code,{children:`Enter`}),` / `,(0,i.jsx)(t.code,{children:`Space`})]}),(0,i.jsx)(t.td,{children:`Opens or closes the popover when the trigger button is focused. Toggles an item when a checkbox is focused.`})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`ArrowDown`})}),(0,i.jsx)(t.td,{children:`When the trigger is focused: opens the popover and moves focus to the first checkbox. When inside the popover: moves focus to the next checkbox.`})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`ArrowUp`})}),(0,i.jsx)(t.td,{children:`When the trigger is focused: opens the popover and moves focus to the last checkbox. When inside the popover: moves focus to the previous checkbox.`})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`Escape`})}),(0,i.jsx)(t.td,{children:`Closes the popover and discards any pending changes (same as Cancel).`})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:(0,i.jsx)(t.code,{children:`Tab`})}),(0,i.jsx)(t.td,{children:`Moves focus through the interactive elements inside the popover (search field, checkboxes, confirm/cancel buttons).`})]})]})]}),`
`,(0,i.jsx)(t.h3,{children:`Screen reader announcements`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The trigger button exposes the current selection count via `,(0,i.jsx)(t.code,{children:`aria-describedby`}),`. Screen readers will read e.g. `,(0,i.jsx)(t.em,{children:`"2 of 5 selected"`}),` when the button receives focus.`]}),`
`,(0,i.jsxs)(t.li,{children:[`After each checkbox toggle (or tag removal), a live region (`,(0,i.jsx)(t.code,{children:`aria-live="assertive"`}),`) announces the updated count, e.g. `,(0,i.jsx)(t.em,{children:`"3 of 5 selected"`}),`. This announcement does not fire when the popover is closed via Cancel, since changes are discarded.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The trigger button uses `,(0,i.jsx)(t.code,{children:`role="combobox"`}),` with `,(0,i.jsx)(t.code,{children:`aria-haspopup="listbox"`}),` so assistive technologies describe it as a combobox that opens a list.`]}),`
`,(0,i.jsx)(t.li,{children:`Each checkbox announces its own checked/unchecked state natively. No duplicate descriptions are added.`}),`
`,(0,i.jsxs)(t.li,{children:[`Nested item groups are rendered as sibling `,(0,i.jsx)(t.code,{children:`<ul>`}),` elements after their parent `,(0,i.jsx)(t.code,{children:`<li>`}),`, so assistive technologies announce them as a new list level (e.g. `,(0,i.jsx)(t.em,{children:`"list, 3 items, level 2"`}),`).`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Focus management`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Opening the popover with the mouse moves focus to the popover content area so arrow-key navigation works immediately.`}),`
`,(0,i.jsxs)(t.li,{children:[`Opening the popover with `,(0,i.jsx)(t.code,{children:`ArrowDown`}),` moves focus directly to the first checkbox; `,(0,i.jsx)(t.code,{children:`ArrowUp`}),` moves focus to the last checkbox.`]}),`
`,(0,i.jsx)(t.li,{children:`During keyboard navigation inside the popover, the focused item is automatically scrolled into view.`}),`
`,(0,i.jsx)(t.li,{children:`Closing the popover (confirm, cancel, or Escape) returns focus to the trigger button.`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Semantic structure`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The item list is rendered as a `,(0,i.jsx)(t.code,{children:`<ul>`}),` with each option as an `,(0,i.jsx)(t.code,{children:`<li>`}),`, giving assistive technologies correct list semantics.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Nested item groups use a child `,(0,i.jsx)(t.code,{children:`<ul>`}),` inside the parent `,(0,i.jsx)(t.code,{children:`<li>`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The field label is linked to the trigger button via a `,(0,i.jsx)(t.code,{children:`<label for="…">`}),` relationship provided by `,(0,i.jsx)(t.code,{children:`FieldBlock`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=61839-11710&t=oe60OMkAhyFE8eje-4`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/MultiSelection`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/MultiSelection`,children:`Docs code`})}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};