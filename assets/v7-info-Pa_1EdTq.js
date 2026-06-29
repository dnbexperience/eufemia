import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v7`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#new-components`,children:`New components`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#new-icons`,children:`New icons`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#new-features`,children:`New features`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#font-fixes`,children:`Font fixes`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`How to Install`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsxs)(t.p,{children:[`v7 contains a couple of `,(0,r.jsx)(t.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`sea-green-alt-30`}),` and replace it with `,(0,r.jsx)(t.code,{children:`sea-green-30`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`sea-green-alt`}),` and replace it with `,(0,r.jsx)(t.code,{children:`sea-green`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`#B3DADA`}),` and replace it with `,(0,r.jsx)(t.code,{children:`#B3D5D5`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`#008484`}),` and replace it with `,(0,r.jsx)(t.code,{children:`#007272`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`['data-is-touch']`}),` and replace it with `,(0,r.jsx)(t.code,{children:`[data-whatintent='touch']`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`isIE11`}),` and replace it with `,(0,r.jsx)(t.code,{children:`IS_IE11`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`isEdge`}),` and replace it with `,(0,r.jsx)(t.code,{children:`IS_EDGE`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h1--small`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--x-large`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h1`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--xx-large`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h2`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--large`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h3`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--medium`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h4`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--basis`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h5`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--small`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`dnb-h6`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-h--x-small`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`prevent_selection`}),` and replace it with `,(0,r.jsx)(t.code,{children:`more_menu`}),` (you may have to define a different icon as well)`]}),`
`,(0,r.jsxs)(t.li,{children:[`If you used `,(0,r.jsx)(t.code,{children:`style_type`}),`, like `,(0,r.jsx)(t.code,{children:`<H1 style_type="small">`}),` before, instead use `,(0,r.jsx)(t.code,{children:`<H1 size="x-large">`}),` and the same applies to `,(0,r.jsx)(t.code,{children:`<P style_type="small">`}),`, so use the `,(0,r.jsx)(t.code,{children:`modifier`}),` property here `,(0,r.jsx)(t.code,{children:`<P modifier="small">`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`For UMD usage only`}),` find `,(0,r.jsx)(t.code,{children:`dnb-ui-lib.min.js`}),` replace it with `,(0,r.jsx)(t.code,{children:`dnb-ui-web-components.min.js`})]}),`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor (Text link)`}),` has now also the default font-size of 18px (basis) - this means, you may have places where you would rather inherit the font-size by: `,(0,r.jsx)(t.code,{children:`.dnb-anchor { font-size: inherit; }`})]}),`
`,(0,r.jsxs)(t.li,{children:[`New strings were added to the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/localization`,children:`language files`}),` `,(0,r.jsx)(t.code,{children:`nb-NO.js`}),` and `,(0,r.jsx)(t.code,{children:`en-US.js`}),`. If you have a customized localization (`,(0,r.jsx)(t.a,{href:`https://gist.github.com/tujoworker/f754da1137507fdd5d4bb61949a92259/revisions`,children:`changes or addition`}),`), then make sure you maintain these new groups of strings:`,`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Autocomplete`}),`
`,(0,r.jsx)(t.li,{children:`Pagination`}),`
`,(0,r.jsx)(t.li,{children:`ProgressIndicator`}),`
`,(0,r.jsx)(t.li,{children:`StepIndicator`}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` uses now by default React Portal. This can have negative effects on scrollable views. Therefore, use the new `,(0,r.jsx)(t.a,{href:`/uilib/components/fragments/scroll-view`,children:`ScrollView`}),` fragment as the scrollable element.`]}),`
`,(0,r.jsxs)(t.li,{children:[`For a custom `,(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` list width `,(0,r.jsx)(t.code,{children:`.dnb-dropdown__list`}),`, use `,(0,r.jsx)(t.code,{children:`.dnb-dropdown .dnb-drawer-list__root`}),` instead.`]}),`
`,(0,r.jsxs)(t.li,{children:[`All events called `,(0,r.jsx)(t.code,{children:`on_state_update`}),` are now deprecated and will be removed in a future major version.`]}),`
`,(0,r.jsxs)(t.li,{children:[`The property `,(0,r.jsx)(t.code,{children:`default_state`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/components/checkbox`,children:`Checkbox`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/switch`,children:`Switch`}),` is now deprecated and will be removed in a future major version.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Heading changes`}),`
`,(0,r.jsxs)(t.p,{children:[`The new naming of h1, h2, etc. is to make it more clear that `,(0,r.jsx)(t.a,{href:`/uilib/usage/best-practices/for-typography#headings-and-styling`,children:`semantic use of headings`}),` don't have anything to do with the actual styling. Developers still too often don't care about the correct `,(0,r.jsx)(t.a,{href:`/uilib/usage/best-practices/for-typography#think-semantics-first`,children:`leveling of headings`}),`, because of the visual prioritization.`]}),`
`,(0,r.jsxs)(t.p,{children:[`We hope that this change promotes `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/checklist`,children:`better accessibility`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`New components`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/heading`,children:`Heading`}),` component to automate semantic headings.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/autocomplete`,children:`Autocomplete`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/pagination`,children:`Pagination`}),` component including `,(0,r.jsx)(t.strong,{children:`infinity scroller`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`New element `,(0,r.jsx)(t.a,{href:`/uilib/elements/horizontal-rule`,children:`Horizontal Rule (Hr)`}),`, called `,(0,r.jsx)(t.code,{children:`hr-line`}),` in Figma.`]}),`
`,(0,r.jsxs)(t.li,{children:[`New fragment `,(0,r.jsx)(t.a,{href:`/uilib/components/fragments/scroll-view`,children:`ScrollView`}),`, used in `,(0,r.jsx)(t.a,{href:`/uilib/components/modal`,children:`Modal`}),` to fulfill the new Portal mode in the DrawerList scroll dependency inside of a Modal / Drawer.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`New features`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Icons inside of `,(0,r.jsx)(t.a,{href:`/uilib/components/input/demos#input-with-icon`,children:`Input`}),` fields.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/number-format`,children:`Number`}),` got more useful properties, like `,(0,r.jsx)(t.code,{children:`decimals="0"`}),` and `,(0,r.jsx)(t.code,{children:`currency_position="after"`}),` and also a neat `,(0,r.jsx)(t.a,{href:`/uilib/components/number-format#accessibility`,children:`copy & paste`}),` feature, where an unformatted number gets copied, instead of the visual number. Also, Norwegian organization numbers (`,(0,r.jsx)(t.code,{children:`org`}),`) are now supported.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/button`,children:`Buttons`}),` now supports overflow text to wrap (break-word) by using `,(0,r.jsx)(t.code,{children:`wrap="true"`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/drawer/`,children:`Modal`}),` has now a `,(0,r.jsx)(t.strong,{children:`Drawer`}),` mode inside the Modal component `,(0,r.jsx)(t.code,{children:`mode="drawer"`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Also, the `,(0,r.jsx)(t.a,{href:`/uilib/components/drawer/`,children:`Modal`}),` has now a dark background color and both open and close animations`]}),`
`,(0,r.jsxs)(t.li,{children:[`Expose `,(0,r.jsx)(t.a,{href:`/uilib/helpers/functions#general-helpers`,children:`new helper functions`}),` like, `,(0,r.jsx)(t.code,{children:`isSafari`}),`, `,(0,r.jsx)(t.code,{children:`isiOS`}),`, `,(0,r.jsx)(t.code,{children:`isMac`}),`, `,(0,r.jsx)(t.code,{children:`isWin`}),` and `,(0,r.jsx)(t.code,{children:`isLinux`}),` (beside `,(0,r.jsx)(t.code,{children:`isIE11`}),`,`,(0,r.jsx)(t.code,{children:`isEdge`}),`) in the shared helpers file: `,(0,r.jsx)(t.code,{children:`import { isLinux } from 'dnb-ui-lib/shared/helpers'`}),`. They are available as constants as well: `,(0,r.jsx)(t.code,{children:`IS_IE11`}),`, `,(0,r.jsx)(t.code,{children:`IS_EDGE`}),`, `,(0,r.jsx)(t.code,{children:`IS_IOS`}),`, `,(0,r.jsx)(t.code,{children:`IS_MAC`}),`, `,(0,r.jsx)(t.code,{children:`IS_WIN`}),` and `,(0,r.jsx)(t.code,{children:`IS_LINUX`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`<Dropdown
  data={{
    a: 'AA',
    b: 'BB',
  }}
/>
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` now also works fine inside of a `,(0,r.jsx)(t.a,{href:`/uilib/components/drawer/`,children:`Modal`}),`, taking the height of the Modal as the viewport reference.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`ESM`}),` (mjs) `,(0,r.jsx)(t.a,{href:`/uilib/usage/first-steps/bundles`,children:`bundles`}),` to load directly into modern browsers.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Table (new features)`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Sticky `,(0,r.jsx)(t.a,{href:`/uilib/components/table/demos#table-with-sticky-header`,children:`Table`}),` header.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Sortable `,(0,r.jsx)(t.a,{href:`/uilib/components/table`,children:`table`}),` header buttons now support word-wrap by using `,(0,r.jsx)(t.code,{children:`wrap="true"`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/table`,children:`Table`}),` headers now support `,(0,r.jsx)(t.code,{children:`small`}),` font-size (`,(0,r.jsx)(t.code,{children:`.dnb-table--small`}),`) as well as `,(0,r.jsx)(t.code,{children:`right`}),` and `,(0,r.jsx)(t.code,{children:`center`}),` aligned headers.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`New icons`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`New `,(0,r.jsx)(t.a,{href:`/icons/secondary`,children:`secondary icons`}),`: `,(0,r.jsx)(t.code,{children:`pay_from`}),`, `,(0,r.jsx)(t.code,{children:`transfer_to`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Font fixes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`DNB`}),` Font got updates on the bold weight. The changes affect these characters: `,(0,r.jsx)(t.code,{children:`i?!`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to v7 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@7
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`June, 4. 2020`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};