import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./Accordion-CHhnWaz_.js";import{Lr as n}from"./index--zEB_f_m.js";var r=e();function i(e){let i={a:`a`,blockquote:`blockquote`,code:`code`,del:`del`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,h5:`h5`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`v11`}),`
`,(0,r.jsx)(i.p,{children:`This is the migration guide for @dnb/eufemia v11. It covers all breaking changes, removals, and required code updates.`}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Start here →`}),` Follow the `,(0,r.jsx)(i.a,{href:`#step-by-step-migration-procedure`,children:`Step-by-step migration procedure`}),` for a structured, phase-by-phase migration workflow covering all 8 phases. The reference sections below provide details for each step.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`How to use this guide:`}),` Start with the `,(0,r.jsx)(i.a,{href:`#step-by-step-migration-procedure`,children:`Step-by-step migration procedure`}),` for the ordered workflow. Reference the `,(0,r.jsx)(i.a,{href:`#components`,children:`per-component sections`}),` to find individual property renames for a specific component. Check `,(0,r.jsx)(i.a,{href:`#silent-failures-typescript-wont-catch`,children:`Silent failures TypeScript won't catch`}),` after applying changes.`]}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Using AI to migrate?`}),` Set up the `,(0,r.jsx)(i.a,{href:`/uilib/usage/first-steps/tools/#ai-assistance-and-mcp-server-beta`,children:`Eufemia MCP server`}),` to give your AI agent access to the full v11 API documentation alongside this migration guide.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Most changes fall into these categories:`})}),`
`,(0,r.jsxs)(i.ol,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`snake_case → camelCase renames`}),` — The majority of changes are mechanical property, event, and translation key renames. These can be `,(0,r.jsx)(i.a,{href:`#automated-migration-snake_case-to-camelcase`,children:`automated`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`React 19 alignment`}),` — `,(0,r.jsx)(i.code,{children:`innerRef`}),` → `,(0,r.jsx)(i.code,{children:`ref`}),`, `,(0,r.jsx)(i.code,{children:`Context.Provider`}),` → `,(0,r.jsx)(i.code,{children:`Context`}),`, and related updates.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Behavioral changes and removals`}),` — API redesigns, removed features, and changed defaults. These require manual review.`]}),`
`]}),`
`,(0,r.jsx)(t,{title:`Table of contents`,children:(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#summary-of-changes`,children:`Summary of changes`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#v10-support-timeline`,children:`v10 support timeline`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#install`,children:`Install`})}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:`#migration`,children:`Migration`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#automated-migration-snake_case-to-camelcase`,children:`Automated migration: snake_case to camelCase`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#migration-effort-levels`,children:`Migration effort levels`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#semantic-renames-not-just-casing`,children:`Semantic renames (not just casing)`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#import-path-changes`,children:`Import path changes`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#common-migration-mistakes`,children:`Common migration mistakes`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#cross-component-prop-patterns`,children:`Cross-component prop patterns`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#step-by-step-migration-procedure`,children:`Step-by-step migration procedure`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#find-and-replace-safety-guide`,children:`Find-and-replace safety guide`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#verifying-your-migration`,children:`Verifying your migration`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#silent-failures-typescript-wont-catch`,children:`Silent failures TypeScript won't catch`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#complete-migration-example`,children:`Complete migration example`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#innerref--ref`,children:`innerRef → ref`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#contextprovider--context`,children:`Context.Provider → Context`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#themeprovider--themecontext`,children:`Theme.Provider → Theme.Context`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#theme-propmapping-removed`,children:`Theme propMapping removed`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#theme-darkmode--colorscheme`,children:`Theme darkMode → colorScheme`})}),`
`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.a,{href:`#components`,children:`Components`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#labeldirection-default-changed-to-vertical`,children:`labelDirection default changed to vertical`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#section`,children:`Section`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#helpbutton`,children:`HelpButton`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#autocomplete`,children:`Autocomplete`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#dropdown`,children:`Dropdown`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#drawerlist`,children:`DrawerList`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#anchor`,children:`Anchor`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#input`,children:`Input`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#inputmasked`,children:`InputMasked`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#formlabel`,children:`FormLabel`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#radio`,children:`Radio`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#textarea`,children:`Textarea`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#accordion`,children:`Accordion`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#tag`,children:`Tag`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#upload`,children:`Upload`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#stat`,children:`Stat`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#p`,children:`P (paragraph)`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#definition-lists`,children:`Definition lists`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#breadcrumb`,children:`Breadcrumb`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#progressindicator`,children:`ProgressIndicator`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#paymentcard`,children:`PaymentCard`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#divider-horizontal-rule`,children:`Divider (Horizontal Rule)`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#flexitem`,children:`Flex.Item`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#card`,children:`Card`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#checkbox`,children:`Checkbox`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#switch`,children:`Switch`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#logo`,children:`Logo`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#icon`,children:`Icon`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#button`,children:`Button`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#modal-dialog-and-drawer`,children:`Modal, Dialog and Drawer`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#heading`,children:`Heading`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#h-heading-elements`,children:`H (heading elements)`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#table`,children:`Table`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#formstatus`,children:`FormStatus`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#skeleton`,children:`Skeleton`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#tabs`,children:`Tabs`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#pagination`,children:`Pagination`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#slider`,children:`Slider`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#timeline`,children:`Timeline`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#datepicker`,children:`DatePicker`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#numberformat`,children:`NumberFormat`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#stepindicator`,children:`StepIndicator`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#globalerror`,children:`GlobalError`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#togglebutton`,children:`ToggleButton`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#tooltip`,children:`Tooltip`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#globalstatus`,children:`GlobalStatus`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#copyonclick`,children:`CopyOnClick`})}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#layout`,children:`Layout`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#helpers`,children:`Helpers`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#eufemia-forms`,children:`Eufemia Forms`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#scss-mixin-renames`,children:`SCSS mixin renames`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#scss-import--use`,children:`SCSS: @import → @use`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#typescript`,children:`TypeScript`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#theming`,children:`Theming`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#props-type-exports`,children:`Props Type Exports`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.a,{href:`#new-in-v11`,children:`New in v11`})}),`
`]})}),`
`,(0,r.jsx)(i.h2,{children:`Summary of changes`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`React 19 required`}),` — v11 requires React and React DOM v19.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`IE and Edge (EdgeHTML) no longer supported`}),` — All IE- and legacy-Edge-specific CSS rules have been removed from the CSS reset and component styles. Only modern evergreen browsers (Chrome, Firefox, Safari, Chromium-based Edge) are supported.`]}),`
`,(0,r.jsxs)(i.li,{children:[`All `,(0,r.jsx)(i.strong,{children:`snake_case`}),` (`,(0,r.jsx)(i.code,{children:`on_click`}),`) events and properties have been converted to `,(0,r.jsx)(i.strong,{children:`camelCase`}),` (`,(0,r.jsx)(i.code,{children:`onClick`}),`). The reason for previously using snake_case was to support Web Components – but the support was discontinued in `,(0,r.jsx)(i.a,{href:`/uilib/about-the-lib/releases/eufemia/v10-info/`,children:`v10`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`labelDirection`}),` default changed to `,(0,r.jsx)(i.code,{children:`vertical`})]}),` — Labels render above the input by default. If you relied on horizontal labels, set `,(0,r.jsx)(i.code,{children:`labelDirection="horizontal"`}),` explicitly. See `,(0,r.jsx)(i.a,{href:`#labeldirection-default-changed-to-vertical`,children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`FormRow and FormSet removed`}),` — Replace with Flex layout components. See `,(0,r.jsx)(i.a,{href:`#removal-of-formrow-and-formset`,children:`Removal of FormRow and FormSet`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`InputMasked engine replaced`}),` — Switched from text-mask to Maskito. Custom masks using `,(0,r.jsx)(i.code,{children:`createNumberMask`}),` or `,(0,r.jsx)(i.code,{children:`emailMask`}),` must be updated. See `,(0,r.jsx)(i.a,{href:`#inputmasked`,children:`InputMasked`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Logo API redesigned`}),` — The `,(0,r.jsx)(i.code,{children:`brand`}),`/`,(0,r.jsx)(i.code,{children:`variant`}),` props are replaced with an `,(0,r.jsx)(i.code,{children:`svg`}),` prop import pattern. See `,(0,r.jsx)(i.a,{href:`#logo`,children:`Logo`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`StepIndicator redesigned`}),` — The sidebar mode has been removed. See `,(0,r.jsx)(i.a,{href:`#stepindicator`,children:`StepIndicator`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Ajv no longer auto-instantiated`}),` — Ajv is still a dependency, but is no longer automatically instantiated. If you use JSON Schema validation, you must explicitly create and provide an Ajv instance. See `,(0,r.jsx)(i.a,{href:`#ajv-no-longer-auto-instantiated`,children:`Ajv no longer auto-instantiated`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsxs)(i.strong,{children:[`Dropdown `,(0,r.jsx)(i.code,{children:`actionMenu`}),`/`,(0,r.jsx)(i.code,{children:`moreMenu`}),` removed`]}),` — The `,(0,r.jsx)(i.code,{children:`actionMenu`}),` and `,(0,r.jsx)(i.code,{children:`moreMenu`}),` props on Dropdown have been removed. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`NumberFormat split into variants`}),` — The generic `,(0,r.jsx)(i.code,{children:`<NumberFormat />`}),` component and `,(0,r.jsx)(i.code,{children:`format()`}),` utility have been removed. Use variant sub-components like `,(0,r.jsx)(i.code,{children:`<NumberFormat.Number />`}),`, `,(0,r.jsx)(i.code,{children:`<NumberFormat.Currency />`}),`, etc. See `,(0,r.jsx)(i.a,{href:`#numberformat`,children:`NumberFormat`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`date-fns`}),` upgraded from v2 to v4`]}),` — If you import `,(0,r.jsx)(i.code,{children:`date-fns`}),` functions directly (e.g. for DatePicker's `,(0,r.jsx)(i.code,{children:`locale`}),` prop), update your imports to use named exports. See `,(0,r.jsx)(i.a,{href:`#datepicker`,children:`DatePicker`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replaced deprecated `,(0,r.jsx)(i.code,{children:`<Context.Provider>`}),` with direct `,(0,r.jsx)(i.code,{children:`<Context>`}),` rendering across all internal context providers (React 19).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Several exported TypeScript `,(0,r.jsx)(i.code,{children:`interface`}),` declarations have been converted to `,(0,r.jsx)(i.code,{children:`type`}),`. This prevents declaration merging but has no impact on standard usage.`]}),`
`,(0,r.jsxs)(i.li,{children:[`All React context value types have been renamed to use a consistent `,(0,r.jsx)(i.code,{children:`...ContextValue`}),` suffix (e.g. `,(0,r.jsx)(i.code,{children:`AccordionContextProps`}),` → `,(0,r.jsx)(i.code,{children:`AccordionContextValue`}),`). See `,(0,r.jsx)(i.a,{href:`#typescript`,children:`TypeScript`}),` for the full list.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Event handler and render function prop types have been replaced with properly typed signatures (e.g. `,(0,r.jsx)(i.code,{children:`(...args: any[]) => any`}),` → `,(0,r.jsx)(i.code,{children:`(event: AccordionChangeEvent) => void`}),`). See `,(0,r.jsx)(i.a,{href:`#typed-event-handlers`,children:`Typed event handlers`}),` for the full list.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`New in v11`}),`
`,(0,r.jsx)(i.p,{children:`These components are new in v11:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`})}),` — A context menu component that replaces Dropdown's `,(0,r.jsx)(i.code,{children:`actionMenu`}),` and `,(0,r.jsx)(i.code,{children:`moreMenu`}),` props. Supports `,(0,r.jsx)(i.code,{children:`Menu.Button`}),`, `,(0,r.jsx)(i.code,{children:`Menu.List`}),`, `,(0,r.jsx)(i.code,{children:`Menu.Action`}),`, `,(0,r.jsx)(i.code,{children:`Menu.Accordion`}),`, `,(0,r.jsx)(i.code,{children:`Menu.Header`}),`, and `,(0,r.jsx)(i.code,{children:`Menu.Divider`}),` sub-components.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.a,{href:`/uilib/components/list/`,children:`List`})}),` — A layout component for displaying structured lists with support for icons, titles, content, and accordion behavior.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`v10 support timeline`}),`
`,(0,r.jsxs)(i.p,{children:[`After the v11 release, `,(0,r.jsx)(i.strong,{children:`v10 will continue to receive critical bug fixes and security patches for 6 months`}),`. During this period:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Critical bugs`}),` and `,(0,r.jsx)(i.strong,{children:`security vulnerabilities`}),` will be patched in v10.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`New features`}),` will only be added to v11.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Non-critical bug fixes`}),` will only target v11.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`After the 6-month window, v10 will no longer receive updates. We recommend starting your migration early to avoid last-minute pressure.`}),`
`,(0,r.jsx)(i.h2,{children:`Install`}),`
`,(0,r.jsx)(i.p,{children:`To upgrade to @dnb/eufemia v11 with NPM, use:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`$ npm i @dnb/eufemia@11
# or
$ yarn add @dnb/eufemia@11
# or
$ pnpm add @dnb/eufemia@11
`})}),`
`,(0,r.jsx)(i.h2,{children:`Migration`}),`
`,(0,r.jsxs)(i.p,{children:[`v11 of @dnb/eufemia contains `,(0,r.jsx)(i.em,{children:`breaking changes`}),`.`]}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Important: Upgrading to v11 requires React and React DOM v19 (`,(0,r.jsx)(i.a,{href:`https://react.dev/blog/2024/04/25/react-19-upgrade-guide`,children:`React 19 Upgrade Guide`}),`).`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Automated migration: snake_case to camelCase`}),`
`,(0,r.jsxs)(i.p,{children:[`The largest category of changes in v11 is the rename of `,(0,r.jsx)(i.strong,{children:`all snake_case properties, events, and translation keys to camelCase`}),`. This affects every component and can be automated.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`The pattern:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Properties: `,(0,r.jsx)(i.code,{children:`selected_key`}),` → `,(0,r.jsx)(i.code,{children:`selectedKey`}),`, `,(0,r.jsx)(i.code,{children:`label_direction`}),` → `,(0,r.jsx)(i.code,{children:`labelDirection`})]}),`
`,(0,r.jsxs)(i.li,{children:[`Events: `,(0,r.jsx)(i.code,{children:`on_change`}),` → `,(0,r.jsx)(i.code,{children:`onChange`}),`, `,(0,r.jsx)(i.code,{children:`on_click`}),` → `,(0,r.jsx)(i.code,{children:`onClick`})]}),`
`,(0,r.jsxs)(i.li,{children:[`Translations: `,(0,r.jsx)(i.code,{children:`Autocomplete.no_options`}),` → `,(0,r.jsx)(i.code,{children:`Autocomplete.noOptions`})]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`You can use your editor's find-and-replace to handle most of these. Since each snake_case property maps to a specific camelCase name, we recommend using the per-component lists below rather than a generic regex.`}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Note:`}),` Some renames are not just snake_case conversions — they also change the name itself (e.g. `,(0,r.jsx)(i.code,{children:`triangle_position`}),` → `,(0,r.jsx)(i.code,{children:`arrowPosition`}),`, `,(0,r.jsx)(i.code,{children:`opened`}),` → `,(0,r.jsx)(i.code,{children:`open`}),`, `,(0,r.jsx)(i.code,{children:`on_show`}),` → `,(0,r.jsx)(i.code,{children:`onOpen`}),`). These are listed individually per component below and require manual attention.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`The rest of this section covers changes that `,(0,r.jsx)(i.strong,{children:`cannot`}),` be automated with a simple find-and-replace and need manual review.`]}),`
`,(0,r.jsx)(i.h3,{children:`Migration effort levels`}),`
`,(0,r.jsx)(i.p,{children:`To help plan your migration, changes are grouped by effort:`}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Automated`}),` (find-and-replace):`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`All snake_case → camelCase property, event, and translation key renames`}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`innerRef`}),` → `,(0,r.jsx)(i.code,{children:`ref`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`<Context.Provider>`}),` → `,(0,r.jsx)(i.code,{children:`<Context>`})]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Semi-automated`}),` (value renames — find-and-replace with care):`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Status value `,(0,r.jsx)(i.code,{children:`'info'`}),` → `,(0,r.jsx)(i.code,{children:`'information'`}),` (applies to `,(0,r.jsx)(i.code,{children:`state`}),`, `,(0,r.jsx)(i.code,{children:`statusState`}),`, `,(0,r.jsx)(i.code,{children:`variant`}),`, `,(0,r.jsx)(i.code,{children:`confirmType`}),`)`]}),`
`,(0,r.jsxs)(i.li,{children:[`Status value `,(0,r.jsx)(i.code,{children:`'warn'`}),` → `,(0,r.jsx)(i.code,{children:`'warning'`}),` (applies to `,(0,r.jsx)(i.code,{children:`statusState`}),`)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`opened`}),` → `,(0,r.jsx)(i.code,{children:`open`}),` on Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`on_show`}),` → `,(0,r.jsx)(i.code,{children:`onOpen`}),` and `,(0,r.jsx)(i.code,{children:`on_hide`}),` → `,(0,r.jsx)(i.code,{children:`onClose`}),` on Autocomplete, Dropdown, DrawerList, DatePicker`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`prerender`}),` → `,(0,r.jsx)(i.code,{children:`keepInDOM`}),` on Tabs, Accordion`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`styleType`}),` / `,(0,r.jsx)(i.code,{children:`style_type`}),` → `,(0,r.jsx)(i.code,{children:`backgroundColor`}),` on Breadcrumb, Dialog.Body, Drawer.Body`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Manual review required:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`InputMasked masking engine replacement (text-mask → Maskito)`}),`
`,(0,r.jsx)(i.li,{children:`StepIndicator redesign (sidebar variant removed)`}),`
`,(0,r.jsx)(i.li,{children:`DatePicker behavioral changes (segment elements, format strings, focus events)`}),`
`,(0,r.jsxs)(i.li,{children:[`Logo API redesign (`,(0,r.jsx)(i.code,{children:`brand`}),`/`,(0,r.jsx)(i.code,{children:`variant`}),` → `,(0,r.jsx)(i.code,{children:`svg`}),` prop)`]}),`
`,(0,r.jsx)(i.li,{children:`Ajv no longer auto-instantiated`}),`
`,(0,r.jsx)(i.li,{children:`FormRow and FormSet removal`}),`
`,(0,r.jsx)(i.li,{children:`Card visual changes (outline, border-radius, default innerSpace)`}),`
`,(0,r.jsxs)(i.li,{children:[`Button `,(0,r.jsx)(i.code,{children:`variant="signal"`}),` removal`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Semantic renames (not just casing)`}),`
`,(0,r.jsx)(i.p,{children:`These renames change the property or event name itself, not just the casing. They affect multiple components and require targeted find-and-replace:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old`}),(0,r.jsx)(i.th,{children:`New`}),(0,r.jsx)(i.th,{children:`Affected components`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`innerRef`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ref`})}),(0,r.jsxs)(i.td,{children:[`20+ components (see `,(0,r.jsx)(i.a,{href:`#innerref--ref`,children:`innerRef → ref`}),`)`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`opened`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`open`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`on_show`}),` / `,(0,r.jsx)(i.code,{children:`on_hide`})]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`onOpen`}),` / `,(0,r.jsx)(i.code,{children:`onClose`})]}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList, DatePicker`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`on_show_focus`}),` / `,(0,r.jsx)(i.code,{children:`on_hide_focus`})]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`onOpenFocus`}),` / `,(0,r.jsx)(i.code,{children:`onCloseFocus`})]}),(0,r.jsx)(i.td,{children:`Dropdown`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`triangle_position`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`arrowPosition`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`styleType`}),` / `,(0,r.jsx)(i.code,{children:`style_type`})]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`backgroundColor`})}),(0,r.jsx)(i.td,{children:`Breadcrumb, Dialog.Body, Drawer.Body`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`spacing`})}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`innerSpace`}),` (object form)`]}),(0,r.jsx)(i.td,{children:`Section, Dialog.Body, Drawer.Body`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`input_class`}),` / `,(0,r.jsx)(i.code,{children:`textarea_class`})]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`inputClassName`}),` / `,(0,r.jsx)(i.code,{children:`textareaClassName`})]}),(0,r.jsx)(i.td,{children:`Input, InputMasked, Textarea`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`prerender`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`keepInDOM`})}),(0,r.jsx)(i.td,{children:`Tabs, Accordion`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`as`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`element`})}),(0,r.jsx)(i.td,{children:`H (heading element)`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`size`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`span`})}),(0,r.jsx)(i.td,{children:`Flex.Item, Card`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`align_autocomplete`}),` / `,(0,r.jsx)(i.code,{children:`align_dropdown`})]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`align`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`input_icon`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`icon`})}),(0,r.jsx)(i.td,{children:`Autocomplete`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`clear`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`showClearButton`})}),(0,r.jsx)(i.td,{children:`Input, InputMasked`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`visible`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`show`})}),(0,r.jsx)(i.td,{children:`ProgressIndicator`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`show_label`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`showDefaultLabel`})}),(0,r.jsx)(i.td,{children:`ProgressIndicator`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`active`}),` / `,(0,r.jsx)(i.code,{children:`forceOpen`})]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`open`})}),(0,r.jsx)(i.td,{children:`Tooltip`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`position`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`placement`})}),(0,r.jsx)(i.td,{children:`Tooltip`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`accordion`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`mode="accordion"`})}),(0,r.jsx)(i.td,{children:`Table`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`onClosed`}),` / `,(0,r.jsx)(i.code,{children:`onOpened`})]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`onClose`}),` / `,(0,r.jsx)(i.code,{children:`onOpen`})]}),(0,r.jsx)(i.td,{children:`Table`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`isCollapsed`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`collapsed`})}),(0,r.jsx)(i.td,{children:`Breadcrumb`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`expandBehaviour`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`expandBehavior`})}),(0,r.jsx)(i.td,{children:`Accordion`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`class`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`className`})}),(0,r.jsx)(i.td,{children:`ProgressIndicator, Button, Tabs, PaymentCard`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`contentSpacing`}),` / `,(0,r.jsx)(i.code,{children:`tabsSpacing`})]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`contentInnerSpace`}),` / `,(0,r.jsx)(i.code,{children:`tabsInnerSpace`})]}),(0,r.jsx)(i.td,{children:`Tabs`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`darkMode`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`colorScheme`})}),(0,r.jsx)(i.td,{children:`Theme`})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Import path changes`}),`
`,(0,r.jsx)(i.p,{children:`All import paths that changed or were removed in v11. Update these before changing component APIs — your app won't compile until these are fixed.`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old import`}),(0,r.jsx)(i.th,{children:`New import`}),(0,r.jsx)(i.th,{children:`Notes`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input/InputPassword`})}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`import { Field } from '@dnb/eufemia/extensions/forms'`}),` then use `,(0,r.jsx)(i.code,{children:`<Field.Password>`})]}),(0,r.jsx)(i.td,{children:`Component moved to Eufemia Forms`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/fragments/drawer-list/DrawerList`}),` (`,(0,r.jsx)(i.code,{children:`ItemContent`}),`)`]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/fragments/drawer-list/DrawerListItem`}),` (`,(0,r.jsx)(i.code,{children:`ItemContent`}),`)`]}),(0,r.jsx)(i.td,{children:`Named export moved`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/form-row/FormRowHelpers`}),` (`,(0,r.jsx)(i.code,{children:`includeValidProps`}),`)`]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/shared/helpers/filterValidProps`}),` (`,(0,r.jsx)(i.code,{children:`pickFormElementProps`}),`)`]}),(0,r.jsx)(i.td,{children:`Function moved and renamed`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/form-row/FormRowHelpers`}),` (`,(0,r.jsx)(i.code,{children:`prepareFormRowContext`}),`)`]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/shared/helpers/filterValidProps`}),` (`,(0,r.jsx)(i.code,{children:`prepareFormElementContext`}),`)`]}),(0,r.jsx)(i.td,{children:`Function moved and renamed`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/InputMaskedHooks`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/hooks`})}),(0,r.jsx)(i.td,{children:`Path changed`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/addons/createNumberMask`})}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.strong,{children:`Removed`}),` — use built-in `,(0,r.jsx)(i.code,{children:`numberMask`}),` prop`]}),(0,r.jsx)(i.td,{children:`Addon deleted`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/addons/emailMask`})}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.strong,{children:`Removed`}),` — use `,(0,r.jsx)(i.code,{children:`mask`}),` prop directly`]}),(0,r.jsx)(i.td,{children:`Addon deleted`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input`}),` (`,(0,r.jsx)(i.code,{children:`inputPropTypes`}),`)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.strong,{children:`Removed`})}),(0,r.jsx)(i.td,{children:`PropTypes no longer provided`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/button`}),` (`,(0,r.jsx)(i.code,{children:`buttonVariantPropType`}),`)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.strong,{children:`Removed`})}),(0,r.jsx)(i.td,{children:`PropTypes no longer provided`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/theme-ui/`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/ui/`})}),(0,r.jsx)(i.td,{children:`Path shortened`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/theme-sbanken/`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/sbanken/`})}),(0,r.jsx)(i.td,{children:`Path shortened`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/theme-eiendom/`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/eiendom/`})}),(0,r.jsx)(i.td,{children:`Path shortened`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/theme-carnegie/`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`style/themes/carnegie/`})}),(0,r.jsx)(i.td,{children:`Path shortened`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/space/types`}),` (`,(0,r.jsx)(i.code,{children:`SectionSpacing`}),`)`]}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/space/types`}),` (`,(0,r.jsx)(i.code,{children:`InnerSpaceType`}),`)`]}),(0,r.jsx)(i.td,{children:`Type renamed`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`export type { Props }`}),` from any Field/Value/Form module`]}),(0,r.jsxs)(i.td,{children:[`Use component-prefixed name (e.g. `,(0,r.jsx)(i.code,{children:`FieldStringProps`}),`)`]}),(0,r.jsxs)(i.td,{children:[`See `,(0,r.jsx)(i.a,{href:`#props-type-exports`,children:`Props Type Exports`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/payment-card/utils/Types`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/payment-card/utils/types`})}),(0,r.jsx)(i.td,{children:`Filename lowercased for consistency`})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Common migration mistakes`}),`
`,(0,r.jsx)(i.p,{children:`These changes look simple but are easy to get wrong. Pay special attention to these:`}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`spacing`}),` → `,(0,r.jsx)(i.code,{children:`innerSpace`}),` requires an object, not a string`]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`spacing`}),` prop accepted a string like `,(0,r.jsx)(i.code,{children:`"large"`}),`. The replacement `,(0,r.jsx)(i.code,{children:`innerSpace`}),` requires an `,(0,r.jsxs)(i.strong,{children:[`object with a `,(0,r.jsx)(i.code,{children:`block`}),` key`]}),` to match the same vertical-only padding behavior. Using `,(0,r.jsx)(i.code,{children:`innerSpace="large"`}),` (plain string) applies padding on `,(0,r.jsx)(i.strong,{children:`all four sides`}),`, which will break your layout.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Wrong:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Section innerSpace="large">Content</Section>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Correct:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Section innerSpace={{ block: 'large' }}>Content</Section>
`})}),`
`,(0,r.jsx)(i.p,{children:`This applies to Section, Dialog.Body, and Drawer.Body.`}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`on_show`}),` / `,(0,r.jsx)(i.code,{children:`on_hide`}),` → `,(0,r.jsx)(i.code,{children:`onOpen`}),` / `,(0,r.jsx)(i.code,{children:`onClose`}),` is NOT just a casing change`]}),`
`,(0,r.jsxs)(i.p,{children:[`The event names changed semantically. A naive snake_case→camelCase conversion would produce `,(0,r.jsx)(i.code,{children:`onShow`}),` / `,(0,r.jsx)(i.code,{children:`onHide`}),`, which are `,(0,r.jsx)(i.strong,{children:`wrong`}),`.`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old`}),(0,r.jsx)(i.th,{children:`Wrong (naive conversion)`}),(0,r.jsx)(i.th,{children:`Correct`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_show`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.del,{children:(0,r.jsx)(i.code,{children:`onShow`})})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onOpen`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_hide`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.del,{children:(0,r.jsx)(i.code,{children:`onHide`})})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onClose`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_show_focus`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.del,{children:(0,r.jsx)(i.code,{children:`onShowFocus`})})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onOpenFocus`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_hide_focus`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.del,{children:(0,r.jsx)(i.code,{children:`onHideFocus`})})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onCloseFocus`})})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[`Affected components: Autocomplete, Dropdown, DrawerList, DatePicker. The `,(0,r.jsx)(i.code,{children:`_focus`}),` variants only apply to Dropdown.`]}),`
`,(0,r.jsxs)(i.p,{children:[`Note: GlobalStatus still uses `,(0,r.jsx)(i.code,{children:`onShow`}),` / `,(0,r.jsx)(i.code,{children:`onHide`}),` — those are correct for that component and did not change semantically.`]}),`
`,(0,r.jsx)(i.h4,{children:`Component-specific props — don't apply globally`}),`
`,(0,r.jsx)(i.p,{children:`These renames only apply to specific components. Do not find-and-replace them across the entire codebase:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Rename`}),(0,r.jsx)(i.th,{children:`Only applies to`}),(0,r.jsx)(i.th,{children:`Do NOT apply to`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`clear`}),` → `,(0,r.jsx)(i.code,{children:`showClearButton`})]}),(0,r.jsx)(i.td,{children:`Input, InputMasked`}),(0,r.jsx)(i.td,{children:`—`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`isCollapsed`}),` → `,(0,r.jsx)(i.code,{children:`collapsed`})]}),(0,r.jsx)(i.td,{children:`Breadcrumb`}),(0,r.jsx)(i.td,{children:`—`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`input_icon`}),` → `,(0,r.jsx)(i.code,{children:`icon`})]}),(0,r.jsx)(i.td,{children:`Autocomplete`}),(0,r.jsxs)(i.td,{children:[`Other components that already have `,(0,r.jsx)(i.code,{children:`icon`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`visible`}),` → `,(0,r.jsx)(i.code,{children:`show`})]}),(0,r.jsx)(i.td,{children:`ProgressIndicator`}),(0,r.jsxs)(i.td,{children:[`Other components with `,(0,r.jsx)(i.code,{children:`visible`}),` prop`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`position`}),` → `,(0,r.jsx)(i.code,{children:`placement`})]}),(0,r.jsx)(i.td,{children:`Tooltip`}),(0,r.jsxs)(i.td,{children:[`Other components with `,(0,r.jsx)(i.code,{children:`position`}),` prop`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`children`}),` → `,(0,r.jsx)(i.code,{children:`label`})]}),(0,r.jsx)(i.td,{children:`Checkbox, ProgressIndicator`}),(0,r.jsx)(i.td,{children:`—`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`as`}),` → `,(0,r.jsx)(i.code,{children:`element`})]}),(0,r.jsx)(i.td,{children:`H (heading element)`}),(0,r.jsx)(i.td,{children:`—`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`accordion`}),` → `,(0,r.jsx)(i.code,{children:`mode="accordion"`})]}),(0,r.jsx)(i.td,{children:`Table`}),(0,r.jsx)(i.td,{children:`Accordion component itself`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`size`}),` → `,(0,r.jsx)(i.code,{children:`span`})]}),(0,r.jsx)(i.td,{children:`Flex.Item, Card`}),(0,r.jsxs)(i.td,{children:[`Other components where `,(0,r.jsx)(i.code,{children:`size`}),` is still valid`]})]})]})]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`FormRow`}),` / `,(0,r.jsx)(i.code,{children:`FormSet`}),` references in context providers`]}),`
`,(0,r.jsxs)(i.p,{children:[`When replacing `,(0,r.jsx)(i.code,{children:`FormRow`}),`, be careful not to just rename the JSX tag. The context provider pattern also changed:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old`}),(0,r.jsx)(i.th,{children:`New`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`FormRow=`}),` (in Provider config)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formElement=`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`FormRow:`}),` (in context objects)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formElement:`})})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Cross-component prop patterns`}),`
`,(0,r.jsx)(i.p,{children:`These snake_case props appear on many components and follow the same rename pattern everywhere. Apply these as global find-and-replace within Eufemia component JSX:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old prop`}),(0,r.jsx)(i.th,{children:`New prop`}),(0,r.jsx)(i.th,{children:`Components that use it`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`status_state`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`statusState`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Slider, StepIndicator, Switch, Textarea, ToggleButton, ToggleButton.Group`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`status_props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`statusProps`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`status_no_animation`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`statusNoAnimation`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`label_direction`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`labelDirection`})}),(0,r.jsx)(i.td,{children:`Autocomplete, DatePicker, Dropdown, FormLabel, Input, InputMasked, ProgressIndicator, Radio.Group, Slider, Textarea, ToggleButton, ToggleButton.Group`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`label_sr_only`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`labelSrOnly`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio.Group, Switch, Textarea, ToggleButton.Group`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`label_position`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`labelPosition`})}),(0,r.jsx)(i.td,{children:`Checkbox, Radio, Switch`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`icon_size`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`iconSize`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Button, GlobalStatus, ProgressIndicator, ToggleButton`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`icon_position`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`iconPosition`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Button, Dropdown, ToggleButton`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`no_animation`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`noAnimation`})}),(0,r.jsx)(i.td,{children:`Autocomplete, DatePicker, Dropdown, DrawerList, FormStatus, GlobalStatus, Modal/Dialog/Drawer, Skeleton, StepIndicator`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_change`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:`Nearly all interactive components`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_focus`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onFocus`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Input, Textarea`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_blur`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onBlur`})}),(0,r.jsx)(i.td,{children:`Autocomplete, Input, Textarea`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`on_click`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onClick`})}),(0,r.jsx)(i.td,{children:`Button, StepIndicator, Tabs, Table.ClickableHead`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`inner_ref`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ref`})}),(0,r.jsxs)(i.td,{children:[`All components that accepted `,(0,r.jsx)(i.code,{children:`innerRef`}),` (see `,(0,r.jsx)(i.a,{href:`#innerref--ref`,children:`innerRef → ref`}),` for the full list)`]})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Status value renames`}),` — apply to all components that accept `,(0,r.jsx)(i.code,{children:`statusState`}),` or `,(0,r.jsx)(i.code,{children:`state`}),`:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old value`}),(0,r.jsx)(i.th,{children:`New value`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`'warn'`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`'warning'`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`'info'`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`'information'`})})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`CSS class renames`}),` — apply wherever these CSS classes are referenced:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old CSS class`}),(0,r.jsx)(i.th,{children:`New CSS class`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-autocomplete--opened`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-autocomplete--open`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-dropdown--opened`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-dropdown--open`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-drawer-list--opened`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-drawer-list--open`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-date-picker--opened`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-date-picker--open`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-progress-indicator--visible`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-progress-indicator--show`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-anchor--contrast`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-anchor--surface-dark`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-number-format--selectall`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-number-format--select-all`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-autocomplete__suffixValue`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-autocomplete__suffix-value`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-height-animation__compensateForGap`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`dnb-height-animation__compensate-for-gap`})})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Step-by-step migration procedure`}),`
`,(0,r.jsxs)(i.p,{children:[`Follow these steps `,(0,r.jsx)(i.strong,{children:`in order`}),`. Steps in Phase 1 are safe to apply as global find-and-replace across your entire codebase. Steps in later phases require scoping or manual review.`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 1: Global find-and-replace (safe across entire codebase)`}),`
`,(0,r.jsx)(i.p,{children:`These renames only exist as Eufemia prop/event names and won't collide with other libraries:`}),`
`,(0,r.jsxs)(i.ol,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace all `,(0,r.jsx)(i.strong,{children:`snake_case props and events`}),` with their camelCase equivalents. Use the per-component lists in the `,(0,r.jsx)(i.a,{href:`#components`,children:`Components`}),` section below. The most common ones: `,(0,r.jsx)(i.code,{children:`on_change`}),` → `,(0,r.jsx)(i.code,{children:`onChange`}),`, `,(0,r.jsx)(i.code,{children:`on_click`}),` → `,(0,r.jsx)(i.code,{children:`onClick`}),`, `,(0,r.jsx)(i.code,{children:`status_state`}),` → `,(0,r.jsx)(i.code,{children:`statusState`}),`, `,(0,r.jsx)(i.code,{children:`label_direction`}),` → `,(0,r.jsx)(i.code,{children:`labelDirection`}),`, `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` → `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`, `,(0,r.jsx)(i.code,{children:`no_animation`}),` → `,(0,r.jsx)(i.code,{children:`noAnimation`}),`, `,(0,r.jsx)(i.code,{children:`icon_size`}),` → `,(0,r.jsx)(i.code,{children:`iconSize`}),`, `,(0,r.jsx)(i.code,{children:`icon_position`}),` → `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`innerRef`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),` on all Eufemia components.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<Context.Provider>`}),` with `,(0,r.jsx)(i.code,{children:`<Context>`}),` when using Eufemia contexts directly.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace the status value `,(0,r.jsx)(i.code,{children:`'info'`}),` with `,(0,r.jsx)(i.code,{children:`'information'`}),` (applies to `,(0,r.jsx)(i.code,{children:`state`}),`, `,(0,r.jsx)(i.code,{children:`statusState`}),`, `,(0,r.jsx)(i.code,{children:`variant`}),`, `,(0,r.jsx)(i.code,{children:`confirmType`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace the status value `,(0,r.jsx)(i.code,{children:`'warn'`}),` with `,(0,r.jsx)(i.code,{children:`'warning'`}),` (applies to `,(0,r.jsx)(i.code,{children:`statusState`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_class`}),` (or `,(0,r.jsx)(i.code,{children:`inputClass`}),`) with `,(0,r.jsx)(i.code,{children:`inputClassName`}),` on Input and InputMasked.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`textarea_class`}),` (or `,(0,r.jsx)(i.code,{children:`textareaClass`}),`) with `,(0,r.jsx)(i.code,{children:`textareaClassName`}),` on Textarea.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 2: Targeted find-and-replace (scope to specific components)`}),`
`,(0,r.jsx)(i.p,{children:`These renames use generic names that exist in non-Eufemia code. Scope your find-and-replace to JSX using the affected component:`}),`
`,(0,r.jsxs)(i.ol,{start:`8`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),` and `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Autocomplete, Dropdown, DrawerList, DatePicker. `,(0,r.jsxs)(i.em,{children:[`(Not just a casing change — the name changed semantically. GlobalStatus still uses `,(0,r.jsx)(i.code,{children:`onShow`}),`/`,(0,r.jsx)(i.code,{children:`onHide`}),`.)`]})]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`triangle_position`}),` with `,(0,r.jsx)(i.code,{children:`arrowPosition`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Autocomplete, Dropdown, DrawerList.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clear`}),` with `,(0,r.jsx)(i.code,{children:`showClearButton`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Input, InputMasked.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`isCollapsed`}),` with `,(0,r.jsx)(i.code,{children:`collapsed`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Breadcrumb.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`visible`}),` with `,(0,r.jsx)(i.code,{children:`show`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` ProgressIndicator.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`position`}),` with `,(0,r.jsx)(i.code,{children:`placement`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Tooltip.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`children`}),` with `,(0,r.jsx)(i.code,{children:`label`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Checkbox, ProgressIndicator.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`active`}),` or `,(0,r.jsx)(i.code,{children:`forceOpen`}),` with `,(0,r.jsx)(i.code,{children:`open`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Tooltip.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`as`}),` with `,(0,r.jsx)(i.code,{children:`element`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` H (heading element).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`size`}),` with `,(0,r.jsx)(i.code,{children:`span`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Flex.Item, Card.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_icon`}),` with `,(0,r.jsx)(i.code,{children:`icon`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Autocomplete.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`accordion`}),` with `,(0,r.jsx)(i.code,{children:`mode="accordion"`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Table.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prerender`}),` with `,(0,r.jsx)(i.code,{children:`keepInDOM`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Tabs, Accordion.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`styleType`}),` (or `,(0,r.jsx)(i.code,{children:`style_type`}),`) with `,(0,r.jsx)(i.code,{children:`backgroundColor`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Breadcrumb, Dialog.Body, Drawer.Body.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`contentSpacing`}),` with `,(0,r.jsx)(i.code,{children:`contentInnerSpace`}),` and `,(0,r.jsx)(i.code,{children:`tabsSpacing`}),` with `,(0,r.jsx)(i.code,{children:`tabsInnerSpace`}),` — `,(0,r.jsx)(i.strong,{children:`only on`}),` Tabs.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 3: Structural and visual changes (require code modification or review)`}),`
`,(0,r.jsxs)(i.ol,{start:`24`,children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Visual review:`}),` The `,(0,r.jsx)(i.code,{children:`labelDirection`}),` default has changed to `,(0,r.jsx)(i.code,{children:`vertical`}),`. If your layouts relied on horizontal labels, add `,(0,r.jsx)(i.code,{children:`labelDirection="horizontal"`}),` explicitly. See `,(0,r.jsx)(i.a,{href:`#labeldirection-default-changed-to-vertical`,children:`labelDirection default changed to vertical`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Visual review:`}),` Card outline, border-radius, and default `,(0,r.jsx)(i.code,{children:`innerSpace`}),` have changed. Review your Card layouts. See `,(0,r.jsx)(i.a,{href:`#card`,children:`Card`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`spacing`}),` with `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'value' }}`}),` on Section, Dialog.Body, Drawer.Body. Do NOT use `,(0,r.jsx)(i.code,{children:`innerSpace="large"`}),` — it must be an object. See `,(0,r.jsx)(i.a,{href:`#section`,children:`Section`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Theme.Provider`}),` with `,(0,r.jsx)(i.code,{children:`Theme.Context`}),` and `,(0,r.jsx)(i.code,{children:`darkBackground`}),` with `,(0,r.jsx)(i.code,{children:`surface="dark"`}),`. See `,(0,r.jsx)(i.a,{href:`#themeprovider--themecontext`,children:`Theme.Provider → Theme.Context`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<FormRow>`}),` with `,(0,r.jsx)(i.code,{children:`<Flex.Horizontal align="baseline">`}),` and `,(0,r.jsx)(i.code,{children:`<FormRow vertical>`}),` with `,(0,r.jsx)(i.code,{children:`<Flex.Vertical>`}),`. Replace `,(0,r.jsx)(i.code,{children:`FormRow=`}),` with `,(0,r.jsx)(i.code,{children:`formElement=`}),` in Provider config. See `,(0,r.jsx)(i.a,{href:`#removal-of-formrow-and-formset`,children:`Removal of FormRow and FormSet`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`openState="opened"`}),` with `,(0,r.jsx)(i.code,{children:`open={true}`}),` and `,(0,r.jsx)(i.code,{children:`openState="closed"`}),` with `,(0,r.jsx)(i.code,{children:`open={false}`}),` on Modal/Dialog/Drawer.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Update `,(0,r.jsx)(i.code,{children:`dateFormat`}),` and `,(0,r.jsx)(i.code,{children:`returnFormat`}),` strings: `,(0,r.jsx)(i.code,{children:`YYYY`}),` → `,(0,r.jsx)(i.code,{children:`yyyy`}),`, `,(0,r.jsx)(i.code,{children:`DD`}),` → `,(0,r.jsx)(i.code,{children:`dd`}),` on DatePicker.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Stat.Amount`}),` with `,(0,r.jsx)(i.code,{children:`Stat.Number`}),`, `,(0,r.jsx)(i.code,{children:`Stat.Info variant="default"`}),` with `,(0,r.jsx)(i.code,{children:`variant="plain"`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace Logo `,(0,r.jsx)(i.code,{children:`brand`}),`/`,(0,r.jsx)(i.code,{children:`variant`}),` props with `,(0,r.jsx)(i.code,{children:`svg`}),` prop import pattern. See `,(0,r.jsx)(i.a,{href:`#logo`,children:`Logo`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 4: Import path and module changes`}),`
`,(0,r.jsxs)(i.ol,{start:`33`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Update all changed import paths. See `,(0,r.jsx)(i.a,{href:`#import-path-changes`,children:`Import path changes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`If using Ajv with JSON Schema validation, add `,(0,r.jsx)(i.code,{children:`ajvInstance={makeAjvInstance()}`}),` to `,(0,r.jsx)(i.code,{children:`Form.Handler`}),`. See `,(0,r.jsx)(i.a,{href:`#ajv-no-longer-auto-instantiated`,children:`Ajv no longer auto-instantiated`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`InputPassword`}),` import with `,(0,r.jsx)(i.code,{children:`Field.Password`}),` from Eufemia Forms. See `,(0,r.jsx)(i.a,{href:`#inputpassword-moved-to-fieldpassword`,children:`InputPassword moved to Field.Password`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Container`}),`, `,(0,r.jsx)(i.code,{children:`StepsLayout.Step`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Step`}),`, etc.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 5: SCSS changes`}),`
`,(0,r.jsxs)(i.ol,{start:`37`,children:[`
`,(0,r.jsxs)(i.li,{children:[`If you import Eufemia SCSS source files with `,(0,r.jsx)(i.code,{children:`@import`}),`, replace with `,(0,r.jsx)(i.code,{children:`@use`}),` and namespace your calls. See `,(0,r.jsx)(i.a,{href:`#scss-import--use`,children:`SCSS: @import → @use`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Rename all SCSS mixin references to camelCase. See `,(0,r.jsx)(i.a,{href:`#scss-mixin-renames`,children:`SCSS mixin renames`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`extendFocusRing`}),` and `,(0,r.jsx)(i.code,{children:`componentReset`}),` SCSS mixin calls — they have been deleted.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 6: TypeScript type updates`}),`
`,(0,r.jsxs)(i.ol,{start:`40`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Update any imported context value types (`,(0,r.jsx)(i.code,{children:`AccordionContextProps`}),` → `,(0,r.jsx)(i.code,{children:`AccordionContextValue`}),`, etc.). See `,(0,r.jsx)(i.a,{href:`#typescript`,children:`TypeScript`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Update any Props type imports (`,(0,r.jsx)(i.code,{children:`Props`}),` → component-prefixed name). See `,(0,r.jsx)(i.a,{href:`#props-type-exports`,children:`Props Type Exports`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Update event handler types to match new typed signatures. See `,(0,r.jsx)(i.a,{href:`#typed-event-handlers`,children:`Typed event handlers`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 7: Eufemia Forms behavioral changes`}),`
`,(0,r.jsxs)(i.ol,{start:`43`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`validator`}),` with `,(0,r.jsx)(i.code,{children:`onChangeValidator`}),` on all Field components.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`continuousValidation`}),` with `,(0,r.jsx)(i.code,{children:`validateContinuously`}),` on all Field components.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Update `,(0,r.jsx)(i.code,{children:`errorMessages`}),` object keys: `,(0,r.jsx)(i.code,{children:`required`}),` → `,(0,r.jsx)(i.code,{children:`Field.errorRequired`}),`, `,(0,r.jsx)(i.code,{children:`pattern`}),` → `,(0,r.jsx)(i.code,{children:`Field.errorPattern`}),`, etc. See `,(0,r.jsx)(i.a,{href:`#error-handling`,children:`Error handling`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.useError`}),` with `,(0,r.jsx)(i.code,{children:`Form.useValidation`}),`, `,(0,r.jsx)(i.code,{children:`Form.useLocale`}),` with `,(0,r.jsx)(i.code,{children:`Form.useTranslation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.Visibility`}),` props: `,(0,r.jsx)(i.code,{children:`withValue`}),` → `,(0,r.jsx)(i.code,{children:`hasValue`}),`, `,(0,r.jsx)(i.code,{children:`pathValue`}),`/`,(0,r.jsx)(i.code,{children:`whenValue`}),` → `,(0,r.jsx)(i.code,{children:`visibleWhen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.FieldProps`}),` with `,(0,r.jsx)(i.code,{children:`Field.Provider`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<Card stack>`}),` with `,(0,r.jsx)(i.code,{children:`<Form.Card>`}),` and `,(0,r.jsx)(i.code,{children:`<Card>`}),` (inside forms) with `,(0,r.jsx)(i.code,{children:`<Form.Card>`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Iterate.ArrayPushButton`}),` with `,(0,r.jsx)(i.code,{children:`Iterate.PushButton`}),` and `,(0,r.jsx)(i.code,{children:`Iterate.ArrayRemoveElementButton`}),` with `,(0,r.jsx)(i.code,{children:`Iterate.RemoveButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`requireCommit`}),` with `,(0,r.jsx)(i.code,{children:`preventUncommittedChanges`}),` on `,(0,r.jsx)(i.code,{children:`Iterate.PushContainer`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`active`}),` with `,(0,r.jsx)(i.code,{children:`include`}),` and `,(0,r.jsx)(i.code,{children:`activeWhen`}),` with `,(0,r.jsx)(i.code,{children:`includeWhen`}),` on `,(0,r.jsx)(i.code,{children:`Wizard.Step`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace Form.Iterate label variable `,(0,r.jsx)(i.code,{children:`{itemNr}`}),` with `,(0,r.jsx)(i.code,{children:`{itemNo}`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Review all remaining changes in the `,(0,r.jsx)(i.a,{href:`#eufemia-forms`,children:`Eufemia Forms`}),` section.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Phase 8: Verify`}),`
`,(0,r.jsxs)(i.ol,{start:`55`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Run `,(0,r.jsx)(i.code,{children:`npx tsc --noEmit`}),` to catch remaining type errors.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Run your tests. Update any test selectors that query DatePicker/Expiry `,(0,r.jsx)(i.code,{children:`input`}),` elements (now `,(0,r.jsx)(i.code,{children:`role="spinbutton"`}),` sections).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Search for remaining snake_case patterns using the grep command in `,(0,r.jsx)(i.a,{href:`#verifying-your-migration`,children:`Verifying your migration`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Find-and-replace safety guide`}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Safe for global find-and-replace`}),` — these prop names are Eufemia-specific and won't collide with other code:`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`on_change`}),`, `,(0,r.jsx)(i.code,{children:`on_click`}),`, `,(0,r.jsx)(i.code,{children:`on_focus`}),`, `,(0,r.jsx)(i.code,{children:`on_blur`}),`, `,(0,r.jsx)(i.code,{children:`on_submit`}),`, `,(0,r.jsx)(i.code,{children:`on_key_down`}),`, `,(0,r.jsx)(i.code,{children:`on_type`}),`, `,(0,r.jsx)(i.code,{children:`on_select`}),`, `,(0,r.jsx)(i.code,{children:`on_clear`}),`, `,(0,r.jsx)(i.code,{children:`on_open`}),`, `,(0,r.jsx)(i.code,{children:`on_close`}),`, `,(0,r.jsx)(i.code,{children:`on_cancel`}),`, `,(0,r.jsx)(i.code,{children:`on_reset`}),`, `,(0,r.jsx)(i.code,{children:`on_complete`}),`, `,(0,r.jsx)(i.code,{children:`on_resize`}),`, `,(0,r.jsx)(i.code,{children:`on_end`}),`, `,(0,r.jsx)(i.code,{children:`on_load`}),`, `,(0,r.jsx)(i.code,{children:`on_startup`}),`, `,(0,r.jsx)(i.code,{children:`on_adjust`}),`, `,(0,r.jsx)(i.code,{children:`on_days_render`}),`, `,(0,r.jsx)(i.code,{children:`on_submit_focus`}),`, `,(0,r.jsx)(i.code,{children:`on_submit_blur`}),`, `,(0,r.jsx)(i.code,{children:`status_state`}),`, `,(0,r.jsx)(i.code,{children:`status_props`}),`, `,(0,r.jsx)(i.code,{children:`status_no_animation`}),`, `,(0,r.jsx)(i.code,{children:`label_direction`}),`, `,(0,r.jsx)(i.code,{children:`label_sr_only`}),`, `,(0,r.jsx)(i.code,{children:`label_position`}),`, `,(0,r.jsx)(i.code,{children:`icon_size`}),`, `,(0,r.jsx)(i.code,{children:`icon_position`}),`, `,(0,r.jsx)(i.code,{children:`no_animation`}),`, `,(0,r.jsx)(i.code,{children:`inner_ref`}),`, `,(0,r.jsx)(i.code,{children:`selected_key`}),`, `,(0,r.jsx)(i.code,{children:`default_value`}),`, `,(0,r.jsx)(i.code,{children:`prevent_selection`}),`, `,(0,r.jsx)(i.code,{children:`prevent_close`}),`, `,(0,r.jsx)(i.code,{children:`keep_open`}),`, `,(0,r.jsx)(i.code,{children:`independent_width`}),`, `,(0,r.jsx)(i.code,{children:`fixed_position`}),`, `,(0,r.jsx)(i.code,{children:`enable_body_lock`}),`, `,(0,r.jsx)(i.code,{children:`skip_portal`}),`, `,(0,r.jsx)(i.code,{children:`cache_hash`}),`, `,(0,r.jsx)(i.code,{children:`no_scroll_animation`}),`, `,(0,r.jsx)(i.code,{children:`min_height`}),`, `,(0,r.jsx)(i.code,{children:`max_height`}),`, `,(0,r.jsx)(i.code,{children:`input_element`}),`, `,(0,r.jsx)(i.code,{children:`submit_element`}),`, `,(0,r.jsx)(i.code,{children:`submit_button_title`}),`, `,(0,r.jsx)(i.code,{children:`submit_button_icon`}),`, `,(0,r.jsx)(i.code,{children:`submit_button_variant`}),`, `,(0,r.jsx)(i.code,{children:`clear_button_title`}),`, `,(0,r.jsx)(i.code,{children:`keep_placeholder`}),`, `,(0,r.jsx)(i.code,{children:`input_attributes`}),`, `,(0,r.jsx)(i.code,{children:`inner_element`}),`.`]}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Note:`}),` `,(0,r.jsx)(i.code,{children:`on_state_update`}),` is `,(0,r.jsx)(i.strong,{children:`not`}),` in this list because it has been removed, not renamed. If you used `,(0,r.jsx)(i.code,{children:`on_state_update`}),`, replace it with `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Must be scoped to specific components`}),` — these names exist outside Eufemia or overlap across components with different meanings:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Rename`}),(0,r.jsx)(i.th,{children:`Scope to`}),(0,r.jsx)(i.th,{children:`Risk if applied globally`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`opened`}),` → `,(0,r.jsx)(i.code,{children:`open`})]}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date`}),(0,r.jsxs)(i.td,{children:[`Collides with HTML `,(0,r.jsx)(i.code,{children:`open`}),` attribute on `,(0,r.jsx)(i.code,{children:`<details>`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`clear`}),` → `,(0,r.jsx)(i.code,{children:`showClearButton`})]}),(0,r.jsx)(i.td,{children:`Input, InputMasked`}),(0,r.jsxs)(i.td,{children:[`Collides with generic `,(0,r.jsx)(i.code,{children:`clear`}),` functions`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`visible`}),` → `,(0,r.jsx)(i.code,{children:`show`})]}),(0,r.jsx)(i.td,{children:`ProgressIndicator`}),(0,r.jsxs)(i.td,{children:[`Collides with generic `,(0,r.jsx)(i.code,{children:`visible`}),` props`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`position`}),` → `,(0,r.jsx)(i.code,{children:`placement`})]}),(0,r.jsx)(i.td,{children:`Tooltip`}),(0,r.jsxs)(i.td,{children:[`Collides with CSS `,(0,r.jsx)(i.code,{children:`position`}),` prop/style`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`children`}),` → `,(0,r.jsx)(i.code,{children:`label`})]}),(0,r.jsx)(i.td,{children:`Checkbox, ProgressIndicator`}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`children`}),` is a React universal prop`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`as`}),` → `,(0,r.jsx)(i.code,{children:`element`})]}),(0,r.jsx)(i.td,{children:`H (heading element)`}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`as`}),` is used by styled-components and other libs`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`size`}),` → `,(0,r.jsx)(i.code,{children:`span`})]}),(0,r.jsx)(i.td,{children:`Flex.Item, Card`}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`size`}),` is used by many non-Eufemia components`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`active`}),` → `,(0,r.jsx)(i.code,{children:`open`})]}),(0,r.jsx)(i.td,{children:`Tooltip`}),(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`active`}),` is a common generic prop`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`accordion`}),` → `,(0,r.jsx)(i.code,{children:`mode="accordion"`})]}),(0,r.jsx)(i.td,{children:`Table`}),(0,r.jsx)(i.td,{children:`Prop-to-prop+value change, not a simple rename`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`input_icon`}),` → `,(0,r.jsx)(i.code,{children:`icon`})]}),(0,r.jsx)(i.td,{children:`Autocomplete`}),(0,r.jsxs)(i.td,{children:[`Other components already have different `,(0,r.jsx)(i.code,{children:`icon`}),` props`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`spacing`}),` → `,(0,r.jsx)(i.code,{children:`innerSpace`})]}),(0,r.jsx)(i.td,{children:`Section, Dialog.Body, Drawer.Body`}),(0,r.jsxs)(i.td,{children:[`Requires object form `,(0,r.jsx)(i.code,{children:`{ block: '...' }`}),`, not string`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`on_show`}),` → `,(0,r.jsx)(i.code,{children:`onOpen`})]}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList, DatePicker`}),(0,r.jsxs)(i.td,{children:[`Semantic change; GlobalStatus keeps `,(0,r.jsx)(i.code,{children:`onShow`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`on_hide`}),` → `,(0,r.jsx)(i.code,{children:`onClose`})]}),(0,r.jsx)(i.td,{children:`Autocomplete, Dropdown, DrawerList, DatePicker`}),(0,r.jsxs)(i.td,{children:[`Semantic change; GlobalStatus keeps `,(0,r.jsx)(i.code,{children:`onHide`})]})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Verifying your migration`}),`
`,(0,r.jsx)(i.p,{children:`After applying changes, use these commands to validate:`}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`TypeScript check`}),` — catches missed renames, wrong prop types, and removed APIs:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`npx tsc --noEmit
`})}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Search for remaining snake_case`}),` — catches props you missed:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'on_\\|status_\\|label_\\|icon_\\|_class\\b\\|inner_ref\\|_state\\|_position\\|_button\\|_text\\|_sr_' \\
  --include='*.tsx' --include='*.ts' src/
`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Note:`}),` This grep only catches snake_case patterns. Semantic renames like `,(0,r.jsx)(i.code,{children:`opened`}),` → `,(0,r.jsx)(i.code,{children:`open`}),`, `,(0,r.jsx)(i.code,{children:`prerender`}),` → `,(0,r.jsx)(i.code,{children:`keepInDOM`}),`, `,(0,r.jsx)(i.code,{children:`clear`}),` → `,(0,r.jsx)(i.code,{children:`showClearButton`}),`, and `,(0,r.jsx)(i.code,{children:`expandBehaviour`}),` → `,(0,r.jsx)(i.code,{children:`expandBehavior`}),` require manual review using the `,(0,r.jsx)(i.a,{href:`#semantic-renames-not-just-casing`,children:`Semantic renames`}),` table.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Common TypeScript errors and what they mean:`})}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Error`}),(0,r.jsx)(i.th,{children:`Cause`}),(0,r.jsx)(i.th,{children:`Fix`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Property 'on_change' does not exist`})}),(0,r.jsx)(i.td,{children:`Missed snake_case → camelCase rename`}),(0,r.jsxs)(i.td,{children:[`Replace with `,(0,r.jsx)(i.code,{children:`onChange`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Property 'innerRef' does not exist`})}),(0,r.jsx)(i.td,{children:`Missed innerRef → ref`}),(0,r.jsxs)(i.td,{children:[`Replace with `,(0,r.jsx)(i.code,{children:`ref`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Type '"info"' is not assignable`})}),(0,r.jsx)(i.td,{children:`Missed status value rename`}),(0,r.jsxs)(i.td,{children:[`Replace `,(0,r.jsx)(i.code,{children:`'info'`}),` with `,(0,r.jsx)(i.code,{children:`'information'`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Type '"warn"' is not assignable`})}),(0,r.jsx)(i.td,{children:`Missed status value rename`}),(0,r.jsxs)(i.td,{children:[`Replace `,(0,r.jsx)(i.code,{children:`'warn'`}),` with `,(0,r.jsx)(i.code,{children:`'warning'`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Module not found: '@dnb/eufemia/components/input/InputPassword'`})}),(0,r.jsx)(i.td,{children:`Import path moved`}),(0,r.jsxs)(i.td,{children:[`Use `,(0,r.jsx)(i.code,{children:`Field.Password`}),` from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/forms`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Property 'spacing' does not exist`})}),(0,r.jsx)(i.td,{children:`Removed prop`}),(0,r.jsxs)(i.td,{children:[`Replace with `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'value' }}`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Property 'brand' does not exist`}),` on Logo`]}),(0,r.jsx)(i.td,{children:`Logo API redesigned`}),(0,r.jsxs)(i.td,{children:[`Import SVG component and use `,(0,r.jsx)(i.code,{children:`svg`}),` prop`]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Type '"signal"' is not assignable`}),` on Button`]}),(0,r.jsx)(i.td,{children:`Variant removed`}),(0,r.jsxs)(i.td,{children:[`Use `,(0,r.jsx)(i.code,{children:`variant="primary"`}),` or `,(0,r.jsx)(i.code,{children:`variant="secondary"`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Cannot find name 'FormRow'`})}),(0,r.jsx)(i.td,{children:`Component removed`}),(0,r.jsxs)(i.td,{children:[`Replace with `,(0,r.jsx)(i.code,{children:`Flex.Horizontal`}),` or `,(0,r.jsx)(i.code,{children:`Flex.Vertical`})]})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Property 'opened' does not exist`})}),(0,r.jsx)(i.td,{children:`Prop renamed`}),(0,r.jsxs)(i.td,{children:[`Replace with `,(0,r.jsx)(i.code,{children:`open`})]})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Silent failures TypeScript won't catch`}),`
`,(0,r.jsxs)(i.p,{children:[`TypeScript catches most v10 → v11 errors, but these three categories `,(0,r.jsx)(i.strong,{children:`compile without errors and fail silently at runtime`}),`. You must search for them manually after migration.`]}),`
`,(0,r.jsx)(i.h4,{children:`1. Data object property renames`}),`
`,(0,r.jsxs)(i.p,{children:[`Dropdown, Autocomplete, DrawerList, and Field.Selection accept `,(0,r.jsx)(i.code,{children:`data`}),` arrays with objects. The `,(0,r.jsx)(i.code,{children:`DrawerListDataArrayObject`}),` type allows arbitrary keys (`,(0,r.jsx)(i.code,{children:`[key: string]: any`}),`), so TypeScript `,(0,r.jsx)(i.strong,{children:`will not flag`}),` old snake_case property names. The component simply won't find the values it expects.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Compiles but broken:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Dropdown
  data={[
    { selected_key: 'no', content: 'Norway' }, // silent failure
    { selected_key: 'se', content: 'Sweden' }, // silent failure
  ]}
/>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Correct:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Dropdown
  data={[
    { selectedKey: 'no', content: 'Norway' },
    { selectedKey: 'se', content: 'Sweden' },
  ]}
/>
`})}),`
`,(0,r.jsx)(i.p,{children:`Search for old data property names:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'selected_key\\|selected_value\\|suffix_value\\|search_content\\|class_name' \\
  --include='*.tsx' --include='*.ts' src/
`})}),`
`,(0,r.jsx)(i.h4,{children:`2. Event callback return object renames`}),`
`,(0,r.jsxs)(i.p,{children:[`Several components renamed properties on the objects passed to event callbacks. If you destructure the old property names, the values will be `,(0,r.jsx)(i.code,{children:`undefined`}),` at runtime with no TypeScript error (because callback parameter types are often inferred loosely).`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsxs)(i.strong,{children:[`DatePicker `,(0,r.jsx)(i.code,{children:`onChange`}),` return object:`]})}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old property`}),(0,r.jsx)(i.th,{children:`New property`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`days_between`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`daysBetween`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`is_valid`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`isValid`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`is_valid_start_date`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`isValidStartDate`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`is_valid_end_date`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`isValidEndDate`})})]})]})]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsxs)(i.strong,{children:[`Field.Date `,(0,r.jsx)(i.code,{children:`onType`}),` return object:`]})}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Old property`}),(0,r.jsx)(i.th,{children:`New property`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`start_date`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`startDate`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`end_date`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`endDate`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`is_valid`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`isValid`})})]})]})]}),`
`,(0,r.jsx)(i.p,{children:`Search for old callback property access:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'days_between\\|is_valid\\|is_valid_start_date\\|is_valid_end_date\\|start_date\\|end_date' \\
  --include='*.tsx' --include='*.ts' src/
`})}),`
`,(0,r.jsx)(i.h4,{children:`3. CSS class selectors in strings and tests`}),`
`,(0,r.jsxs)(i.p,{children:[`CSS class names used in `,(0,r.jsx)(i.code,{children:`querySelector`}),`, test assertions, or CSS/SCSS files are plain strings that TypeScript cannot validate.`]}),`
`,(0,r.jsx)(i.p,{children:`Search for all renamed CSS classes:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'dnb-autocomplete--opened\\|dnb-dropdown--opened\\|dnb-drawer-list--opened\\|dnb-date-picker--opened\\|dnb-progress-indicator--visible\\|dnb-anchor--contrast\\|dnb-number-format--selectall\\|dnb-section--spacing' \\
  --include='*.tsx' --include='*.ts' --include='*.scss' --include='*.css' src/
`})}),`
`,(0,r.jsxs)(i.p,{children:[`Also check DatePicker/Expiry test selectors — the visible date segments changed from native `,(0,r.jsx)(i.code,{children:`input`}),` elements to `,(0,r.jsx)(i.code,{children:`role="spinbutton"`}),` sections:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Before (v10) — queried native input elements
document.querySelector('.dnb-date-picker input')

// After (v11) — use role-based selectors
document.querySelector('[role="spinbutton"]')
// or
document.querySelector('.dnb-segmented-field__section')
`})}),`
`,(0,r.jsxs)(i.h4,{children:[`4. Theme `,(0,r.jsx)(i.code,{children:`darkMode`}),` prop silently ignored`]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`darkMode`}),` prop on `,(0,r.jsx)(i.code,{children:`Theme`}),` was replaced with `,(0,r.jsx)(i.code,{children:`colorScheme`}),`. Passing `,(0,r.jsx)(i.code,{children:`darkMode`}),` compiles without error but is silently ignored. The CSS class also changed from `,(0,r.jsx)(i.code,{children:`eufemia-theme__dark-mode`}),` to `,(0,r.jsx)(i.code,{children:`eufemia-theme__color-scheme--dark`}),`.`]}),`
`,(0,r.jsx)(i.p,{children:`Search for old usage:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'darkMode\\|eufemia-theme__dark-mode' \\
  --include='*.tsx' --include='*.ts' --include='*.scss' --include='*.css' src/
`})}),`
`,(0,r.jsxs)(i.h4,{children:[`5. Provider `,(0,r.jsx)(i.code,{children:`locales`}),` prop silently ignored`]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`locales`}),` prop on `,(0,r.jsx)(i.code,{children:`Provider`}),` and `,(0,r.jsx)(i.code,{children:`Context`}),` was removed in favor of `,(0,r.jsx)(i.code,{children:`translations`}),`. Passing `,(0,r.jsx)(i.code,{children:`locales`}),` compiles without error but is silently ignored, meaning your custom translations will not be applied.`]}),`
`,(0,r.jsx)(i.p,{children:`Search for old usage:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-bash`,children:`grep -rn 'locales=' --include='*.tsx' --include='*.ts' src/
`})}),`
`,(0,r.jsx)(i.h3,{children:`Complete migration example`}),`
`,(0,r.jsx)(i.p,{children:`This example shows a realistic v10 component migrated to v11, combining multiple change categories:`}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before (v10):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import {
  Input,
  Dropdown,
  DatePicker,
  Section,
  Button,
  FormRow,
} from '@dnb/eufemia'
import { Provider } from '@dnb/eufemia/shared'

function MyForm({ formRef }) {
  return (
    <Provider FormRow={{ label_direction: 'vertical' }}>
      <Section spacing="large" style_type="white">
        <FormRow>
          <Input
            label="Name"
            on_change={({ value }) => console.log(value)}
            status="Error message"
            status_state="error"
            innerRef={formRef}
          />
          <Dropdown
            label="Country"
            selected_key="no"
            on_change={({ data }) => console.log(data)}
            opened={false}
            on_show={() => console.log('opened')}
            on_hide={() => console.log('closed')}
            triangle_position="left"
            data={[
              { selected_key: 'no', content: 'Norway' },
              { selected_key: 'se', content: 'Sweden' },
            ]}
          />
          <DatePicker
            label="Start date"
            date_format="YYYY/MM/DD"
            return_format="YYYY-MM-DD"
            on_change={({ date }) => console.log(date)}
            on_show={() => console.log('shown')}
            on_hide={() => console.log('hidden')}
          />
        </FormRow>
        <Button variant="signal" on_click={() => console.log('submit')}>
          Submit
        </Button>
      </Section>
    </Provider>
  )
}
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After (v11):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import {
  Input,
  Dropdown,
  Flex,
  DatePicker,
  Section,
  Button,
} from '@dnb/eufemia'
import { Provider } from '@dnb/eufemia/shared'

function MyForm({ formRef }) {
  return (
    <Provider formElement={{ labelDirection: 'vertical' }}>
      <Section innerSpace={{ block: 'large' }} backgroundColor="white">
        <Flex.Horizontal align="baseline">
          <Input
            label="Name"
            onChange={({ value }) => console.log(value)}
            status="Error message"
            statusState="error"
            ref={formRef}
          />
          <Dropdown
            label="Country"
            selectedKey="no"
            onChange={({ data }) => console.log(data)}
            open={false}
            onOpen={() => console.log('opened')}
            onClose={() => console.log('closed')}
            arrowPosition="left"
            data={[
              { selectedKey: 'no', content: 'Norway' },
              { selectedKey: 'se', content: 'Sweden' },
            ]}
          />
          <DatePicker
            label="Start date"
            dateFormat="yyyy/MM/dd"
            returnFormat="yyyy-MM-dd"
            onChange={({ date }) => console.log(date)}
            onOpen={() => console.log('shown')}
            onClose={() => console.log('hidden')}
          />
        </Flex.Horizontal>
        <Button variant="primary" onClick={() => console.log('submit')}>
          Submit
        </Button>
      </Section>
    </Provider>
  )
}
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`What changed (13 categories in one component):`})}),`
`,(0,r.jsxs)(i.ol,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`FormRow`}),` → `,(0,r.jsx)(i.code,{children:`Flex.Horizontal align="baseline"`}),` (removed component)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`FormRow={{ label_direction: 'vertical' }}`}),` → `,(0,r.jsx)(i.code,{children:`formElement={{ labelDirection: 'vertical' }}`}),` (Provider config)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="large"`}),` → `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'large' }}`}),` (structural change — object required)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`style_type="white"`}),` → `,(0,r.jsx)(i.code,{children:`backgroundColor="white"`}),` (semantic rename)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`on_change`}),` / `,(0,r.jsx)(i.code,{children:`on_click`}),` → `,(0,r.jsx)(i.code,{children:`onChange`}),` / `,(0,r.jsx)(i.code,{children:`onClick`}),` (snake_case → camelCase)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`status_state`}),` → `,(0,r.jsx)(i.code,{children:`statusState`}),` (snake_case → camelCase)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`innerRef`}),` → `,(0,r.jsx)(i.code,{children:`ref`}),` (React 19)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`selected_key`}),` → `,(0,r.jsx)(i.code,{children:`selectedKey`}),` (snake_case → camelCase, in both props and data objects)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`opened`}),` → `,(0,r.jsx)(i.code,{children:`open`}),` (semantic rename)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`on_show`}),` / `,(0,r.jsx)(i.code,{children:`on_hide`}),` → `,(0,r.jsx)(i.code,{children:`onOpen`}),` / `,(0,r.jsx)(i.code,{children:`onClose`}),` (semantic rename — NOT `,(0,r.jsx)(i.code,{children:`onShow`}),`/`,(0,r.jsx)(i.code,{children:`onHide`}),`)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`triangle_position`}),` → `,(0,r.jsx)(i.code,{children:`arrowPosition`}),` (semantic rename)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`date_format="YYYY/MM/DD"`}),` → `,(0,r.jsx)(i.code,{children:`dateFormat="yyyy/MM/dd"`}),` (casing + format string change)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`variant="signal"`}),` → `,(0,r.jsx)(i.code,{children:`variant="primary"`}),` (removed variant)`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`innerRef → ref`}),`
`,(0,r.jsxs)(i.p,{children:[`React 19 passes `,(0,r.jsx)(i.code,{children:`ref`}),` as a regular prop, making `,(0,r.jsx)(i.code,{children:`forwardRef`}),` and custom `,(0,r.jsx)(i.code,{children:`innerRef`}),` patterns unnecessary. All Eufemia components that previously accepted an `,(0,r.jsx)(i.code,{children:`innerRef`}),` prop now accept `,(0,r.jsx)(i.code,{children:`ref`}),` directly.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Input innerRef={myRef} />
<Button innerRef={myRef} />
<Element innerRef={myRef} />
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Input ref={myRef} />
<Button ref={myRef} />
<Element ref={myRef} />
`})}),`
`,(0,r.jsxs)(i.p,{children:[`Affected components: `,(0,r.jsx)(i.code,{children:`Anchor`}),`, `,(0,r.jsx)(i.code,{children:`Button`}),`, `,(0,r.jsx)(i.code,{children:`Checkbox`}),`, `,(0,r.jsx)(i.code,{children:`Dropdown`}),`, `,(0,r.jsx)(i.code,{children:`Element`}),`, `,(0,r.jsx)(i.code,{children:`FormLabel`}),`, `,(0,r.jsx)(i.code,{children:`HeightAnimation`}),`, `,(0,r.jsx)(i.code,{children:`Input`}),`, `,(0,r.jsx)(i.code,{children:`InputMasked`}),`, `,(0,r.jsx)(i.code,{children:`PortalRoot`}),`, `,(0,r.jsx)(i.code,{children:`Radio`}),`, `,(0,r.jsx)(i.code,{children:`ScrollView`}),`, `,(0,r.jsx)(i.code,{children:`Section`}),`, `,(0,r.jsx)(i.code,{children:`Space`}),`, `,(0,r.jsx)(i.code,{children:`Switch`}),`, `,(0,r.jsx)(i.code,{children:`Textarea`}),`, `,(0,r.jsx)(i.code,{children:`Typography`}),`, `,(0,r.jsx)(i.code,{children:`Flex.Item`}),`, `,(0,r.jsx)(i.code,{children:`Flex.Container`}),`, `,(0,r.jsx)(i.code,{children:`Field.String`}),`, `,(0,r.jsx)(i.code,{children:`Field.Number`}),`, `,(0,r.jsx)(i.code,{children:`Field.Password`}),`, `,(0,r.jsx)(i.code,{children:`Field.PhoneNumber`}),`, `,(0,r.jsx)(i.code,{children:`Form.Element`}),`, and all Element wrappers (`,(0,r.jsx)(i.code,{children:`Div`}),`, `,(0,r.jsx)(i.code,{children:`Span`}),`, `,(0,r.jsx)(i.code,{children:`Code`}),`, etc.).`]}),`
`,(0,r.jsx)(i.h3,{children:`Context.Provider → Context`}),`
`,(0,r.jsxs)(i.p,{children:[`React 19 deprecates `,(0,r.jsx)(i.code,{children:`<Context.Provider>`}),`. You can now render `,(0,r.jsx)(i.code,{children:`<Context>`}),` directly as a provider. All internal Eufemia context providers have been updated to use this pattern.`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you use any Eufemia context objects directly (e.g. `,(0,r.jsx)(i.code,{children:`Wizard.Provider`}),`), update your code:`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<SomeContext.Provider value={value}>{children}</SomeContext.Provider>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<SomeContext value={value}>{children}</SomeContext>
`})}),`
`,(0,r.jsx)(i.h3,{children:`Theme.Provider → Theme.Context`}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`Theme.Provider`}),` has been renamed to `,(0,r.jsx)(i.code,{children:`Theme.Context`}),` to align with React 19's context-as-provider pattern. The `,(0,r.jsx)(i.code,{children:`darkBackground`}),` prop has been removed in favor of `,(0,r.jsx)(i.code,{children:`surface="dark"`}),`:`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Theme.Provider darkBackground>
  <Button>Primary</Button>
</Theme.Provider>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Theme.Context surface="dark">
  <Button>Primary</Button>
</Theme.Context>
`})}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`Theme.Provider`}),` has been removed.`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Theme `,(0,r.jsx)(i.code,{children:`propMapping`}),` removed`]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`propMapping`}),` prop has been removed from the `,(0,r.jsx)(i.code,{children:`Theme`}),` component. If you relied on it, use CSS custom properties directly on your theme wrapper instead.`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Theme `,(0,r.jsx)(i.code,{children:`darkMode`}),` → `,(0,r.jsx)(i.code,{children:`colorScheme`})]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`darkMode`}),` prop on the `,(0,r.jsx)(i.code,{children:`Theme`}),` component has been replaced with `,(0,r.jsx)(i.code,{children:`colorScheme`}),`, which accepts `,(0,r.jsx)(i.code,{children:`'auto'`}),`, `,(0,r.jsx)(i.code,{children:`'light'`}),`, or `,(0,r.jsx)(i.code,{children:`'dark'`}),`. The CSS class `,(0,r.jsx)(i.code,{children:`eufemia-theme__dark-mode`}),` has been renamed to `,(0,r.jsx)(i.code,{children:`eufemia-theme__color-scheme--dark`}),` (or `,(0,r.jsx)(i.code,{children:`--light`}),`).`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Theme darkMode>
  <MyApp />
</Theme>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Theme colorScheme="dark">
  <MyApp />
</Theme>
`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Note:`}),` This is a silent failure — passing `,(0,r.jsx)(i.code,{children:`darkMode`}),` will not cause a TypeScript error but the prop will be ignored.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`Components`}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Each component section below lists its changes. Behavioral changes and removals are called out separately where applicable. The bulk of per-component changes are snake_case → camelCase renames covered by the `,(0,r.jsx)(i.a,{href:`#automated-migration-snake_case-to-camelcase`,children:`automated migration`}),` section above.`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Reading the per-component lists:`}),` Entries like `,(0,r.jsx)(i.code,{children:`on_change`}),` → `,(0,r.jsx)(i.code,{children:`onChange`}),` are `,(0,r.jsx)(i.strong,{children:`JSX prop renames`}),` (apply in your component markup). Entries prefixed with the component name and a dot, like `,(0,r.jsx)(i.code,{children:`Autocomplete.no_options`}),` → `,(0,r.jsx)(i.code,{children:`Autocomplete.noOptions`}),`, are `,(0,r.jsx)(i.strong,{children:`translation key renames`}),` — these appear in locale/Provider configuration objects, not as JSX attributes. Do not add them as JSX props.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`labelDirection default changed to `,(0,r.jsx)(i.code,{children:`vertical`})]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`labelDirection`}),` prop now defaults to `,(0,r.jsx)(i.code,{children:`vertical`}),` instead of `,(0,r.jsx)(i.code,{children:`horizontal`}),` on all basis form components. This means labels are rendered above the input by default. If you relied on the horizontal default, explicitly set `,(0,r.jsx)(i.code,{children:`labelDirection="horizontal"`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`Affected components: `,(0,r.jsx)(i.code,{children:`Input`}),`, `,(0,r.jsx)(i.code,{children:`InputMasked`}),`, `,(0,r.jsx)(i.code,{children:`Textarea`}),`, `,(0,r.jsx)(i.code,{children:`Autocomplete`}),`, `,(0,r.jsx)(i.code,{children:`Dropdown`}),`, `,(0,r.jsx)(i.code,{children:`DatePicker`}),`, `,(0,r.jsx)(i.code,{children:`Slider`}),`, `,(0,r.jsx)(i.code,{children:`ProgressIndicator`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButton`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButton.Group`}),`, `,(0,r.jsx)(i.code,{children:`Radio.Group`}),`, `,(0,r.jsx)(i.code,{children:`FormLabel`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you used `,(0,r.jsx)(i.code,{children:`<Provider formElement={{ labelDirection: 'vertical' }}>`}),` or `,(0,r.jsx)(i.code,{children:`labelDirection="vertical"`}),` to achieve vertical labels, you can now remove them.`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/section/`,children:`Section`})}),`
`,(0,r.jsxs)(i.ol,{children:[`
`,(0,r.jsxs)(i.li,{children:[`All deprecated `,(0,r.jsx)(i.code,{children:`style_type`}),` variants and their legacy `,(0,r.jsx)(i.code,{children:`dnb-section--...`}),` theme classes were removed. Use the `,(0,r.jsx)(i.code,{children:`variant`}),` or `,(0,r.jsx)(i.code,{children:`backgroundColor`}),` property instead:`]}),`
`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`mint-green-12`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`mint-green`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`sea-green`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`emerald-green`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`lavender`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`black-3`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`sand-yellow`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`pistachio`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`fire-red`})}),`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`fire-red-8`})}),`
`]}),`
`,(0,r.jsxs)(i.ol,{start:`2`,children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`spacing`}),`. Use `,(0,r.jsx)(i.code,{children:`innerSpace`}),` instead. The `,(0,r.jsx)(i.code,{children:`spacing`}),` prop only applied vertical (top/bottom) padding, so use the `,(0,r.jsx)(i.code,{children:`block`}),` shorthand to match the old behavior:`]}),`
`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="x-small"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'x-small' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="small"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'small' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="medium"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'medium' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="x-large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'x-large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="xx-large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'xx-large' }}`})]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`You can also use `,(0,r.jsx)(i.code,{children:`top`}),` and `,(0,r.jsx)(i.code,{children:`bottom`}),` individually if you need different values, e.g. `,(0,r.jsx)(i.code,{children:`innerSpace={{ top: 'small', bottom: 'large' }}`}),`. Note that `,(0,r.jsx)(i.code,{children:`innerSpace="large"`}),` (a plain string) applies padding on `,(0,r.jsx)(i.strong,{children:`all four sides`}),`, not just top/bottom.`]}),`
`,(0,r.jsxs)(i.ol,{start:`3`,children:[`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Replace `,(0,r.jsx)(i.code,{children:`variant`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The exported `,(0,r.jsx)(i.code,{children:`SectionSpacing`}),` type has been removed. If you imported it (e.g. for Breadcrumb or custom components), use the `,(0,r.jsx)(i.code,{children:`InnerSpaceType`}),` from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/space/types`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove CSS classes `,(0,r.jsx)(i.code,{children:`dnb-section--spacing`}),`, `,(0,r.jsx)(i.code,{children:`dnb-section--spacing-small`}),`, etc, as they are not supported anymore.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/help-button/`,children:`HelpButton`})}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`HelpButton.aria_role`}),` with `,(0,r.jsx)(i.code,{children:`HelpButton.ariaRole`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/autocomplete/`,children:`Autocomplete`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals and behavioral changes:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_icon`}),` with `,(0,r.jsx)(i.code,{children:`icon`}),`. The `,(0,r.jsx)(i.code,{children:`inputIcon`}),` prop has been removed — use the `,(0,r.jsx)(i.code,{children:`icon`}),` prop instead (defaults to `,(0,r.jsx)(i.code,{children:`'loupe'`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_autocomplete`}),` with `,(0,r.jsx)(i.code,{children:`align`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),` and `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),` (not just a casing change — the event names changed).`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsx)(i.p,{children:`The following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_key`}),` with `,(0,r.jsx)(i.code,{children:`selectedKey`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`default_value`}),` with `,(0,r.jsx)(i.code,{children:`defaultValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_selection`}),` with `,(0,r.jsx)(i.code,{children:`preventSelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_close`}),` with `,(0,r.jsx)(i.code,{children:`preventClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_open`}),` with `,(0,r.jsx)(i.code,{children:`keepOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`independent_width`}),` with `,(0,r.jsx)(i.code,{children:`independentWidth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fixed_position`}),` with `,(0,r.jsx)(i.code,{children:`fixedPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`enable_body_lock`}),` with `,(0,r.jsx)(i.code,{children:`enableBodyLock`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_drawer`}),` with `,(0,r.jsx)(i.code,{children:`alignDrawer`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`list_class`}),` with `,(0,r.jsx)(i.code,{children:`listClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`portal_class`}),` with `,(0,r.jsx)(i.code,{children:`portalClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_scroll_animation`}),` with `,(0,r.jsx)(i.code,{children:`noScrollAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_portal`}),` with `,(0,r.jsx)(i.code,{children:`skipPortal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_height`}),` with `,(0,r.jsx)(i.code,{children:`minHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`max_height`}),` with `,(0,r.jsx)(i.code,{children:`maxHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`observer_element`}),` with `,(0,r.jsx)(i.code,{children:`observerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`cache_hash`}),` with `,(0,r.jsx)(i.code,{children:`cacheHash`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`wrapper_element`}),` with `,(0,r.jsx)(i.code,{children:`wrapperElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`options_render`}),` with `,(0,r.jsx)(i.code,{children:`optionsRender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`triangle_position`}),` with `,(0,r.jsx)(i.code,{children:`arrowPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_keysearch`}),` with `,(0,r.jsx)(i.code,{children:`skipKeysearch`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`page_offset`}),` with `,(0,r.jsx)(i.code,{children:`pageOffset`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`ignore_events`}),` with `,(0,r.jsx)(i.code,{children:`ignoreEvents`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_options`}),` with `,(0,r.jsx)(i.code,{children:`noOptions`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_all`}),` with `,(0,r.jsx)(i.code,{children:`showAll`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`aria_live_options`}),` with `,(0,r.jsx)(i.code,{children:`ariaLiveOptions`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`indicator_label`}),` with `,(0,r.jsx)(i.code,{children:`indicatorLabel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_options_sr`}),` with `,(0,r.jsx)(i.code,{children:`showOptionsSr`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_sr`}),` with `,(0,r.jsx)(i.code,{children:`selectedSr`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_title`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_icon`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonIcon`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_ref`}),` with `,(0,r.jsx)(i.code,{children:`inputRef`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_value`}),` with `,(0,r.jsx)(i.code,{children:`keepValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_selection`}),` with `,(0,r.jsx)(i.code,{children:`keepSelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_value_and_selection`}),` with `,(0,r.jsx)(i.code,{children:`keepValueAndSelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_clear_button`}),` with `,(0,r.jsx)(i.code,{children:`showClearButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`disable_filter`}),` with `,(0,r.jsx)(i.code,{children:`disableFilter`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`disable_reorder`}),` with `,(0,r.jsx)(i.code,{children:`disableReorder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`disable_highlighting`}),` with `,(0,r.jsx)(i.code,{children:`disableHighlighting`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_submit_button`}),` with `,(0,r.jsx)(i.code,{children:`showSubmitButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_element`}),` with `,(0,r.jsx)(i.code,{children:`submitElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_element`}),` with `,(0,r.jsx)(i.code,{children:`inputElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`search_in_word_index`}),` with `,(0,r.jsx)(i.code,{children:`searchInWordIndex`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`search_numbers`}),` with `,(0,r.jsx)(i.code,{children:`searchNumbers`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_value`}),` with `,(0,r.jsx)(i.code,{children:`inputValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`open_on_focus`}),` with `,(0,r.jsx)(i.code,{children:`openOnFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`drawer_class`}),` with `,(0,r.jsx)(i.code,{children:`drawerClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_focus`}),` with `,(0,r.jsx)(i.code,{children:`preventFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed: `,(0,r.jsx)(i.code,{children:`action_menu`}),` / `,(0,r.jsx)(i.code,{children:`actionMenu`}),`. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_popup`}),` with `,(0,r.jsx)(i.code,{children:`isPopup`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selectall`}),` with `,(0,r.jsx)(i.code,{children:`selectAll`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_type`}),` with `,(0,r.jsx)(i.code,{children:`onType`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_focus`}),` with `,(0,r.jsx)(i.code,{children:`onFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_blur`}),` with `,(0,r.jsx)(i.code,{children:`onBlur`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_select`}),` with `,(0,r.jsx)(i.code,{children:`onSelect`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.no_options`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.noOptions`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.show_all`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.showAll`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.aria_live_options`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.ariaLiveOptions`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.indicator_label`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.indicatorLabel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.show_options_sr`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.showOptionsSr`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.selected_sr`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.selectedSr`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Autocomplete.submit_button_title`}),` with `,(0,r.jsx)(i.code,{children:`Autocomplete.submitButtonTitle`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-autocomplete--opened`}),` with `,(0,r.jsx)(i.code,{children:`dnb-autocomplete--open`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-autocomplete__suffixValue`}),` with `,(0,r.jsx)(i.code,{children:`dnb-autocomplete__suffix-value`}),` (BEM kebab-case fix).`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteClearEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnClearParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteTypeEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnTypeParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteFocusEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnFocusParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteBlurEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnBlurParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteChangeEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnChangeParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`AutocompleteSelectEvent`}),` with `,(0,r.jsx)(i.code,{children:`AutocompleteOnSelectParams`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`DrawerListDataArrayObject`}),`
`,(0,r.jsxs)(i.p,{children:[`Data object property renames: `,(0,r.jsx)(i.code,{children:`selected_value`}),` → `,(0,r.jsx)(i.code,{children:`selectedValue`}),`, `,(0,r.jsx)(i.code,{children:`suffix_value`}),` → `,(0,r.jsx)(i.code,{children:`suffixValue`}),`, `,(0,r.jsx)(i.code,{children:`search_content`}),` → `,(0,r.jsx)(i.code,{children:`searchContent`}),`, `,(0,r.jsx)(i.code,{children:`class_name`}),` → `,(0,r.jsx)(i.code,{children:`className`}),`. See `,(0,r.jsx)(i.a,{href:`#drawerlist`,children:`DrawerList`}),` for details.`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/dropdown/`,children:`Dropdown`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals and behavioral changes:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`actionMenu`}),` prop has been removed. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`moreMenu`}),` prop has been removed. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_dropdown`}),` with `,(0,r.jsx)(i.code,{children:`align`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),` and `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),` (not just a casing change — the event names changed).`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsx)(i.p,{children:`The following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_key`}),` with `,(0,r.jsx)(i.code,{children:`selectedKey`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`default_value`}),` with `,(0,r.jsx)(i.code,{children:`defaultValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_selection`}),` with `,(0,r.jsx)(i.code,{children:`preventSelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_close`}),` with `,(0,r.jsx)(i.code,{children:`preventClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_open`}),` with `,(0,r.jsx)(i.code,{children:`keepOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`independent_width`}),` with `,(0,r.jsx)(i.code,{children:`independentWidth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fixed_position`}),` with `,(0,r.jsx)(i.code,{children:`fixedPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`enable_body_lock`}),` with `,(0,r.jsx)(i.code,{children:`enableBodyLock`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_drawer`}),` with `,(0,r.jsx)(i.code,{children:`alignDrawer`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`list_class`}),` with `,(0,r.jsx)(i.code,{children:`listClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`portal_class`}),` with `,(0,r.jsx)(i.code,{children:`portalClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_scroll_animation`}),` with `,(0,r.jsx)(i.code,{children:`noScrollAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_portal`}),` with `,(0,r.jsx)(i.code,{children:`skipPortal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_height`}),` with `,(0,r.jsx)(i.code,{children:`minHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`max_height`}),` with `,(0,r.jsx)(i.code,{children:`maxHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`observer_element`}),` with `,(0,r.jsx)(i.code,{children:`observerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`cache_hash`}),` with `,(0,r.jsx)(i.code,{children:`cacheHash`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`wrapper_element`}),` with `,(0,r.jsx)(i.code,{children:`wrapperElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`options_render`}),` with `,(0,r.jsx)(i.code,{children:`optionsRender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`triangle_position`}),` with `,(0,r.jsx)(i.code,{children:`arrowPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_keysearch`}),` with `,(0,r.jsx)(i.code,{children:`skipKeysearch`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`page_offset`}),` with `,(0,r.jsx)(i.code,{children:`pageOffset`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`ignore_events`}),` with `,(0,r.jsx)(i.code,{children:`ignoreEvents`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed: `,(0,r.jsx)(i.code,{children:`more_menu`}),` / `,(0,r.jsx)(i.code,{children:`moreMenu`}),`. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`trigger_element`}),` with `,(0,r.jsx)(i.code,{children:`triggerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`open_on_focus`}),` with `,(0,r.jsx)(i.code,{children:`openOnFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed: `,(0,r.jsx)(i.code,{children:`action_menu`}),` / `,(0,r.jsx)(i.code,{children:`actionMenu`}),`. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_popup`}),` with `,(0,r.jsx)(i.code,{children:`isPopup`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_focus`}),` with `,(0,r.jsx)(i.code,{children:`preventFocus`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_select`}),` with `,(0,r.jsx)(i.code,{children:`onSelect`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show_focus`}),` with `,(0,r.jsx)(i.code,{children:`onOpenFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide_focus`}),` with `,(0,r.jsx)(i.code,{children:`onCloseFocus`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-dropdown--opened`}),` with `,(0,r.jsx)(i.code,{children:`dnb-dropdown--open`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`DrawerListDataArrayObject`}),`
`,(0,r.jsxs)(i.p,{children:[`Data object property renames: `,(0,r.jsx)(i.code,{children:`selected_value`}),` → `,(0,r.jsx)(i.code,{children:`selectedValue`}),`, `,(0,r.jsx)(i.code,{children:`suffix_value`}),` → `,(0,r.jsx)(i.code,{children:`suffixValue`}),`, `,(0,r.jsx)(i.code,{children:`search_content`}),` → `,(0,r.jsx)(i.code,{children:`searchContent`}),`, `,(0,r.jsx)(i.code,{children:`class_name`}),` → `,(0,r.jsx)(i.code,{children:`className`}),`. See `,(0,r.jsx)(i.a,{href:`#drawerlist`,children:`DrawerList`}),` for details.`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/fragments/drawer-list/`,children:`DrawerList`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace type `,(0,r.jsx)(i.code,{children:`DrawerListDataObjectUnion`}),` with `,(0,r.jsx)(i.code,{children:`DrawerListDataArrayItem`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace type `,(0,r.jsx)(i.code,{children:`DrawerListDataObject`}),` with `,(0,r.jsx)(i.code,{children:`DrawerListDataArrayObject`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`import { ItemContent } from '@dnb/eufemia/fragments/drawer-list/DrawerList'`}),` with `,(0,r.jsx)(i.code,{children:`import { ItemContent } from '@dnb/eufemia/fragments/drawer-list/DrawerListItem'`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_key`}),` with `,(0,r.jsx)(i.code,{children:`selectedKey`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`default_value`}),` with `,(0,r.jsx)(i.code,{children:`defaultValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_selection`}),` with `,(0,r.jsx)(i.code,{children:`preventSelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_close`}),` with `,(0,r.jsx)(i.code,{children:`preventClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_open`}),` with `,(0,r.jsx)(i.code,{children:`keepOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`independent_width`}),` with `,(0,r.jsx)(i.code,{children:`independentWidth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fixed_position`}),` with `,(0,r.jsx)(i.code,{children:`fixedPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`enable_body_lock`}),` with `,(0,r.jsx)(i.code,{children:`enableBodyLock`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_drawer`}),` with `,(0,r.jsx)(i.code,{children:`alignDrawer`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`list_class`}),` with `,(0,r.jsx)(i.code,{children:`listClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`portal_class`}),` with `,(0,r.jsx)(i.code,{children:`portalClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_scroll_animation`}),` with `,(0,r.jsx)(i.code,{children:`noScrollAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_portal`}),` with `,(0,r.jsx)(i.code,{children:`skipPortal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_height`}),` with `,(0,r.jsx)(i.code,{children:`minHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`max_height`}),` with `,(0,r.jsx)(i.code,{children:`maxHeight`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`observer_element`}),` with `,(0,r.jsx)(i.code,{children:`observerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`cache_hash`}),` with `,(0,r.jsx)(i.code,{children:`cacheHash`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`wrapper_element`}),` with `,(0,r.jsx)(i.code,{children:`wrapperElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`options_render`}),` with `,(0,r.jsx)(i.code,{children:`optionsRender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`triangle_position`}),` with `,(0,r.jsx)(i.code,{children:`arrowPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_keysearch`}),` with `,(0,r.jsx)(i.code,{children:`skipKeysearch`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`page_offset`}),` with `,(0,r.jsx)(i.code,{children:`pageOffset`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`ignore_events`}),` with `,(0,r.jsx)(i.code,{children:`ignoreEvents`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed: `,(0,r.jsx)(i.code,{children:`action_menu`}),` / `,(0,r.jsx)(i.code,{children:`actionMenu`}),`. Use the new `,(0,r.jsx)(i.a,{href:`/uilib/components/menu/`,children:`Menu`}),` component instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_popup`}),` with `,(0,r.jsx)(i.code,{children:`isPopup`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_focus`}),` with `,(0,r.jsx)(i.code,{children:`preventFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`prepared_data`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`handle_dismiss_focus`}),` with `,(0,r.jsx)(i.code,{children:`handleDismissFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_pre_change`}),` with `,(0,r.jsx)(i.code,{children:`onPreChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_resize`}),` with `,(0,r.jsx)(i.code,{children:`onResize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_select`}),` with `,(0,r.jsx)(i.code,{children:`onSelect`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-drawer-list--opened`}),` with `,(0,r.jsx)(i.code,{children:`dnb-drawer-list--open`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`DrawerListDataArrayObject`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_value`}),` with `,(0,r.jsx)(i.code,{children:`selectedValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`suffix_value`}),` with `,(0,r.jsx)(i.code,{children:`suffixValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`search_content`}),` with `,(0,r.jsx)(i.code,{children:`searchContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`class_name`}),` with `,(0,r.jsx)(i.code,{children:`className`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/anchor/`,children:`Anchor`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`When using icons in an Anchor (text link), use the `,(0,r.jsx)(i.code,{children:`icon`}),` property instead of inlining it.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Find and remove `,(0,r.jsx)(i.code,{children:`scrollToHashHandler`}),`. Smooth hash scrolling is now supported by all major browsers.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-anchor--contrast`}),` with `,(0,r.jsx)(i.code,{children:`dnb-anchor--surface-dark`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/input/`,children:`Input`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`inputPropTypes`}),` export has been removed as part of the PropTypes removal. If you were importing it via `,(0,r.jsx)(i.code,{children:`import { inputPropTypes } from '@dnb/eufemia/components/input'`}),`, remove the import — runtime prop validation is no longer provided.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clear`}),` with `,(0,r.jsx)(i.code,{children:`showClearButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_class`}),` with `,(0,r.jsx)(i.code,{children:`inputClassName`}),` (note the name change, not just casing).`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsx)(i.p,{children:`The following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_state`}),` with `,(0,r.jsx)(i.code,{children:`inputState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_title`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clear_button_title`}),` with `,(0,r.jsx)(i.code,{children:`clearButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_placeholder`}),` with `,(0,r.jsx)(i.code,{children:`keepPlaceholder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_attributes`}),` with `,(0,r.jsx)(i.code,{children:`inputAttributes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_element`}),` with `,(0,r.jsx)(i.code,{children:`inputElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_element`}),` with `,(0,r.jsx)(i.code,{children:`innerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_element`}),` with `,(0,r.jsx)(i.code,{children:`submitElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_variant`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonVariant`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_icon`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonIcon`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_status`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonStatus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selectall`}),` with `,(0,r.jsx)(i.code,{children:`selectAll`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_focus`}),` with `,(0,r.jsx)(i.code,{children:`onFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_key_down`}),` with `,(0,r.jsx)(i.code,{children:`onKeyDown`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_blur`}),` with `,(0,r.jsx)(i.code,{children:`onBlur`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit`}),` with `,(0,r.jsx)(i.code,{children:`onSubmit`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit_focus`}),` with `,(0,r.jsx)(i.code,{children:`onSubmitFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit_blur`}),` with `,(0,r.jsx)(i.code,{children:`onSubmitBlur`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_clear`}),` with `,(0,r.jsx)(i.code,{children:`onClear`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Input.submit_button_title`}),` with `,(0,r.jsx)(i.code,{children:`Input.submitButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Input.clear_button_title`}),` with `,(0,r.jsx)(i.code,{children:`Input.clearButtonTitle`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`SubmitButton`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/input-masked/`,children:`InputMasked`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` The masking engine has been replaced. Read this section carefully.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`In v11, the InputMasked component has been rewritten to use `,(0,r.jsx)(i.a,{href:`https://maskito.dev/`,children:`Maskito`}),` instead of the unmaintained `,(0,r.jsx)(i.a,{href:`https://github.com/text-mask/text-mask`,children:`text-mask`}),` library. This brings better input handling, improved mobile keyboard support, and more reliable cursor/caret behavior. The public API (`,(0,r.jsx)(i.code,{children:`mask`}),`, `,(0,r.jsx)(i.code,{children:`numberMask`}),`, `,(0,r.jsx)(i.code,{children:`currencyMask`}),`, `,(0,r.jsx)(i.code,{children:`asNumber`}),`, `,(0,r.jsx)(i.code,{children:`asCurrency`}),`, `,(0,r.jsx)(i.code,{children:`asPercent`}),`, etc.) remains the same — the masking engine underneath has changed.`]}),`
`,(0,r.jsx)(i.p,{children:`New props added:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`allowOverflow`}),` – allow typing beyond the defined mask length.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`overwriteMode`}),` – control how overwriting characters is handled (`,(0,r.jsx)(i.code,{children:`shift`}),` or `,(0,r.jsx)(i.code,{children:`replace`}),`).`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clear`}),` with `,(0,r.jsx)(i.code,{children:`showClearButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`number_mask`}),` with `,(0,r.jsx)(i.code,{children:`numberMask`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`currency_mask`}),` with `,(0,r.jsx)(i.code,{children:`currencyMask`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`mask_options`}),` with `,(0,r.jsx)(i.code,{children:`maskOptions`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`number_format`}),` with `,(0,r.jsx)(i.code,{children:`numberFormat`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`as_currency`}),` with `,(0,r.jsx)(i.code,{children:`asCurrency`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`as_number`}),` with `,(0,r.jsx)(i.code,{children:`asNumber`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`as_percent`}),` with `,(0,r.jsx)(i.code,{children:`asPercent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_mask`}),` with `,(0,r.jsx)(i.code,{children:`showMask`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_state`}),` with `,(0,r.jsx)(i.code,{children:`inputState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_title`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clear_button_title`}),` with `,(0,r.jsx)(i.code,{children:`clearButtonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`keep_placeholder`}),` with `,(0,r.jsx)(i.code,{children:`keepPlaceholder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_class`}),` with `,(0,r.jsx)(i.code,{children:`inputClassName`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_attributes`}),` with `,(0,r.jsx)(i.code,{children:`inputAttributes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_element`}),` with `,(0,r.jsx)(i.code,{children:`inputElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_element`}),` with `,(0,r.jsx)(i.code,{children:`innerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_element`}),` with `,(0,r.jsx)(i.code,{children:`submitElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_variant`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonVariant`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_icon`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonIcon`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_status`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonStatus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selectall`}),` with `,(0,r.jsx)(i.code,{children:`selectAll`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit`}),` with `,(0,r.jsx)(i.code,{children:`onSubmit`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_focus`}),` with `,(0,r.jsx)(i.code,{children:`onFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_blur`}),` with `,(0,r.jsx)(i.code,{children:`onBlur`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit_focus`}),` with `,(0,r.jsx)(i.code,{children:`onSubmitFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit_blur`}),` with `,(0,r.jsx)(i.code,{children:`onSubmitBlur`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Deprecations and removals`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`MultiInputMask`}),` has been removed as a public component. If you were importing it directly, use `,(0,r.jsx)(i.code,{children:`InputMasked`}),` instead.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`show_guide`}),` has been removed. If you need to communicate an expected format, pass an example using the regular `,(0,r.jsx)(i.code,{children:`placeholder`}),` prop (e.g. `,(0,r.jsx)(i.code,{children:`placeholder="00 00 00"`}),`) or provide helper text next to the field.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`keep_char_positions`}),` has been removed.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`placeholder_char`}),` has been removed.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`pipe`}),` has been removed.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`MaskFunction`}),` (function-based masks) has been removed. Maskito only supports array masks (`,(0,r.jsx)(i.code,{children:`Array<string | RegExp>`}),`) and RegExp masks. Convert any custom mask functions to array-based masks.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Function-based mask (no longer supported)
<InputMasked mask={(value) => value.split('').map(() => /\\d/)} />

// Object-wrapped mask (no longer supported)
<InputMasked mask={{ mask: [/\\d/, /\\d/, '/', /\\d/, /\\d/] }} />
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Array mask (use directly)
<InputMasked mask={[/\\d/, /\\d/, '/', /\\d/, /\\d/]} />
`})}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`{ mask: ... }`}),` object form for masks has been removed. Use array masks directly instead of wrapping them in an object.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The addon helpers `,(0,r.jsx)(i.code,{children:`createNumberMask`}),` and `,(0,r.jsx)(i.code,{children:`emailMask`}),` have been removed. The following imports no longer work and should be deleted or replaced:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import createNumberMask from '@dnb/eufemia/components/input-masked/addons/createNumberMask'
import emailMask from '@dnb/eufemia/components/input-masked/addons/emailMask'
`})}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The backward-compatibility re-export file `,(0,r.jsx)(i.code,{children:`InputMaskedHooks`}),` has been removed. If you imported hooks from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/InputMaskedHooks`}),`, import from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/input-masked/hooks`}),` instead.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/form-label/`,children:`FormLabel`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`for_id`}),` with `,(0,r.jsx)(i.code,{children:`forId`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`sr_only`}),` with `,(0,r.jsx)(i.code,{children:`srOnly`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/radio/`,children:`Radio`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`attributes`}),` prop has been removed. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_position`}),` with `,(0,r.jsx)(i.code,{children:`labelPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/radio/`,children:`Radio.Group`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`attributes`}),` prop has been removed. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_position`}),` with `,(0,r.jsx)(i.code,{children:`labelPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`layout_direction`}),` with `,(0,r.jsx)(i.code,{children:`layoutDirection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/textarea/`,children:`Textarea`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`textareaAttributes`}),` prop has been removed. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`textarea_state`}),` with `,(0,r.jsx)(i.code,{children:`textareaState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`autoresize_max_rows`}),` with `,(0,r.jsx)(i.code,{children:`autoResizeMaxRows`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`autoresize`}),` with `,(0,r.jsx)(i.code,{children:`autoResize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`textarea_class`}),` with `,(0,r.jsx)(i.code,{children:`textareaClassName`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`textarea_attributes`}),` with `,(0,r.jsx)(i.code,{children:`textareaAttributes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`textarea_element`}),` with `,(0,r.jsx)(i.code,{children:`textareaElement`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_focus`}),` with `,(0,r.jsx)(i.code,{children:`onFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_blur`}),` with `,(0,r.jsx)(i.code,{children:`onBlur`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_key_down`}),` with `,(0,r.jsx)(i.code,{children:`onKeyDown`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/accordion/`,children:`Accordion`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`attributes`}),` prop has been removed. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`expandBehaviour`}),` with `,(0,r.jsx)(i.code,{children:`expandBehavior`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`expanded_ssr`}),` with `,(0,r.jsx)(i.code,{children:`expandedSsr`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`heading_level`}),` with `,(0,r.jsx)(i.code,{children:`headingLevel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`single_container`}),` with `,(0,r.jsx)(i.code,{children:`singleContainer`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`left_component`}),` with `,(0,r.jsx)(i.code,{children:`leftComponent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`flush_remembered_state`}),` with `,(0,r.jsx)(i.code,{children:`flushRememberedState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_rerender_conditional`}),` with `,(0,r.jsx)(i.code,{children:`preventRerenderConditional`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`remember_state`}),` with `,(0,r.jsx)(i.code,{children:`rememberState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_rerender`}),` with `,(0,r.jsx)(i.code,{children:`preventRerender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prerender`}),` with `,(0,r.jsx)(i.code,{children:`keepInDOM`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/accordion/`,children:`Accordion.Group`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`allow_close_all`}),` with `,(0,r.jsx)(i.code,{children:`allowCloseAll`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`expanded_id`}),` with `,(0,r.jsx)(i.code,{children:`expandedId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/accordion/`,children:`Accordion.Provider`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`expanded_id`}),` with `,(0,r.jsx)(i.code,{children:`expandedId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/tag/`,children:`Tag`})}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`onDelete`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`, and add `,(0,r.jsx)(i.code,{children:`variant="removable"`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/upload/`,children:`Upload`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`variant="normal"`}),` with `,(0,r.jsx)(i.code,{children:`variant="default"`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fileListAriaLabel`}),` with `,(0,r.jsx)(i.code,{children:`listAriaLabel`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/stat/`,children:`Stat`})}),`
`,(0,r.jsx)(i.h4,{children:`Removals`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Stat.Amount`}),` has been removed. Use `,(0,r.jsx)(i.code,{children:`Stat.Number`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Stat.Info`}),` no longer accepts `,(0,r.jsx)(i.code,{children:`variant="default"`}),`. Use `,(0,r.jsx)(i.code,{children:`variant="plain"`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Stat.Label`}),` no longer accepts `,(0,r.jsx)(i.code,{children:`variant="default"`}),`. Use `,(0,r.jsx)(i.code,{children:`variant="plain"`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Stat.Amount value={1000} />
<Stat.Info variant="default">Info text</Stat.Info>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Stat.Number value={1000} />
<Stat.Info variant="plain">Info text</Stat.Info>
`})}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/elements/paragraph/`,children:`P`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p--medium`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__weight--medium`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p--bold`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__weight--bold`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p__size--xx-large`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--xx-large`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--xx-large`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p__size--x-large`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--x-large`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--x-large`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p__size--large`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--large`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--large`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p__size--basis`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--basis`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--basis`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p__size--medium`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--medium`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--medium`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p--small`}),` or `,(0,r.jsx)(i.code,{children:`.dnb-p__size--small`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--small`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--small`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace class `,(0,r.jsx)(i.code,{children:`.dnb-p--x-small`}),` or `,(0,r.jsx)(i.code,{children:`.dnb-p__size--x-small`}),` with `,(0,r.jsx)(i.code,{children:`.dnb-t__size--x-small`}),` and `,(0,r.jsx)(i.code,{children:`.dnb-t__line-height--x-small`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`medium={true}`}),` with `,(0,r.jsx)(i.code,{children:`weight='medium'`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`bold={true}`}),` with `,(0,r.jsx)(i.code,{children:`weight='bold'`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`modifier`}),` — common mappings:`,`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`modifier="medium"`}),` → `,(0,r.jsx)(i.code,{children:`weight="medium"`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`modifier="small"`}),` → `,(0,r.jsx)(i.code,{children:`size="small"`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`modifier="x-small"`}),` → `,(0,r.jsx)(i.code,{children:`size="x-small"`})]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/elements/lists/#definition-lists`,children:`Definition lists`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`direction`}),` in `,(0,r.jsx)(i.code,{children:`<Dl>`}),` with `,(0,r.jsx)(i.code,{children:`layout`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/breadcrumb/`,children:`Breadcrumb`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`isCollapsed`}),` with `,(0,r.jsx)(i.code,{children:`collapsed`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`styleType`}),` (or `,(0,r.jsx)(i.code,{children:`style_type`}),`) with `,(0,r.jsx)(i.code,{children:`backgroundColor`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`spacing`}),` prop type has changed from `,(0,r.jsx)(i.code,{children:`SectionSpacing`}),` to `,(0,r.jsx)(i.code,{children:`SpaceTypeAll | SpaceTypeMedia`}),`. All previously valid string values still work, but if you imported `,(0,r.jsx)(i.code,{children:`SectionSpacing`}),` to type your Breadcrumb spacing, update to use the new types.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/breadcrumb/`,children:`BreadcrumbItem`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Removed passing down properties to the internal `,(0,r.jsx)(i.code,{children:`span`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`We don't think this has been used for anything other than passing down `,(0,r.jsx)(i.code,{children:`data-testid`}),`s for testing. We believe the potential side effects of passing down properties to this span are greater than the advantages it gives for those who want to test this span using `,(0,r.jsx)(i.code,{children:`data-testid`}),` as their way of selecting the span.`]}),`
`,(0,r.jsxs)(i.p,{children:[`We recommend `,(0,r.jsx)(i.a,{href:`/uilib/usage/best-practices/for-testing/`,children:`other testing methods`}),` to select and test the inner parts of Eufemia components. You could use, e.g., `,(0,r.jsx)(i.code,{children:`screen.queryByRole`}),` or `,(0,r.jsx)(i.code,{children:`document.querySelector`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`For more context, see this `,(0,r.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/pull/2798`,children:`PR`}),`.`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/progress-indicator/`,children:`ProgressIndicator`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`visible`}),` with `,(0,r.jsx)(i.code,{children:`show`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`indicator_label`}),` with `,(0,r.jsx)(i.code,{children:`indicatorLabel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_label`}),` with `,(0,r.jsx)(i.code,{children:`showDefaultLabel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`class`}),` with `,(0,r.jsx)(i.code,{children:`className`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`children`}),` with `,(0,r.jsx)(i.code,{children:`label`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_complete`}),` with `,(0,r.jsx)(i.code,{children:`onComplete`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-progress-indicator--visible`}),` with `,(0,r.jsx)(i.code,{children:`dnb-progress-indicator--show`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`ProgressIndicator.indicator_label`}),` with `,(0,r.jsx)(i.code,{children:`ProgressIndicator.indicatorLabel`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/payment-card/`,children:`PaymentCard`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`product_code`}),` with `,(0,r.jsx)(i.code,{children:`productCode`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`card_number`}),` with `,(0,r.jsx)(i.code,{children:`cardNumber`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`card_status`}),` with `,(0,r.jsx)(i.code,{children:`cardStatus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`raw_data`}),` with `,(0,r.jsx)(i.code,{children:`rawData`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`class`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`className`}),` instead.`]}),`
`]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`cardStatus`}),` property`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace value `,(0,r.jsx)(i.code,{children:`not_active`}),` with `,(0,r.jsx)(i.code,{children:`notActive`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace value `,(0,r.jsx)(i.code,{children:`order_in_process`}),` with `,(0,r.jsx)(i.code,{children:`orderInProcess`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace value `,(0,r.jsx)(i.code,{children:`new_order`}),` with `,(0,r.jsx)(i.code,{children:`newOrder`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove translation `,(0,r.jsx)(i.code,{children:`PaymentCard.text_card_number`}),` as it's not supported anymore.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_blocked`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textBlocked`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_expired`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textExpired`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_not_active`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textNotActive`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_new_order`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textNewOrder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_order_in_process`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textOrderInProcess`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_replaced`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textReplaced`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_renewed`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textRenewed`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_new`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textNew`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PaymentCard.text_unknown`}),` with `,(0,r.jsx)(i.code,{children:`PaymentCard.textUnknown`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Removed daggy (tagged sum) types`}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`PaymentCard`}),` types (`,(0,r.jsx)(i.code,{children:`DNB`}),`, `,(0,r.jsx)(i.code,{children:`Visa`}),`, `,(0,r.jsx)(i.code,{children:`Mastercard`}),`, `,(0,r.jsx)(i.code,{children:`CardType`}),`, `,(0,r.jsx)(i.code,{children:`BankAxept`}),`, `,(0,r.jsx)(i.code,{children:`Saga`}),`, `,(0,r.jsx)(i.code,{children:`PB`}),`, `,(0,r.jsx)(i.code,{children:`ProductType`}),`, `,(0,r.jsx)(i.code,{children:`BankAxeptType`}),`) have been refactored from daggy tagged sums to plain TypeScript discriminated unions. The constructor API (`,(0,r.jsx)(i.code,{children:`DNB.Colored('...')`}),`, `,(0,r.jsx)(i.code,{children:`Mastercard.Default`}),`, etc.) is unchanged, but how you consume them has changed:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`.cata()`}),` removed`]}),` — Replace `,(0,r.jsx)(i.code,{children:`.cata({ Variant: () => ... })`}),` with a `,(0,r.jsx)(i.code,{children:`switch`}),` on the `,(0,r.jsx)(i.code,{children:`.tag`}),` property:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-diff`,children:`- cardType.cata({
-   Visa: () => renderVisa(),
-   Mastercard: () => renderMastercard(),
-   None: () => null,
- })
+ switch (cardType.tag) {
+   case 'Visa': return renderVisa()
+   case 'Mastercard': return renderMastercard()
+   case 'None': return null
+ }
`})}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`@@tag`}),` replaced with `,(0,r.jsx)(i.code,{children:`tag`})]}),` — If you accessed the `,(0,r.jsx)(i.code,{children:`'@@tag'`}),` property, use `,(0,r.jsx)(i.code,{children:`.tag`}),` instead.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`.is()`}),` removed`]}),` — Use `,(0,r.jsx)(i.code,{children:`.tag`}),` comparison instead: `,(0,r.jsx)(i.code,{children:`val.tag === 'Visa'`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsxs)(i.strong,{children:[(0,r.jsx)(i.code,{children:`.toString()`}),` removed`]}),` — Use `,(0,r.jsx)(i.code,{children:`.tag`}),` for the variant name.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Reference equality changed`}),` — Unit variants are now plain objects, so `,(0,r.jsx)(i.code,{children:`===`}),` comparison no longer works. Use `,(0,r.jsx)(i.code,{children:`.tag`}),` comparison instead:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-diff`,children:`- data.bankAxept === BankAxeptType.BankAxept
+ data.bankAxept.tag === 'BankAxept'
`})}),`
`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Divider (`,(0,r.jsx)(i.a,{href:`/uilib/elements/horizontal-rule/`,children:`Horizontal Rule`}),`)`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove the `,(0,r.jsx)(i.code,{children:`light`}),` and `,(0,r.jsx)(i.code,{children:`medium`}),` props — they are no longer supported. The Divider now renders with a single default style. If you need to customize the line appearance, use CSS custom properties or a wrapper with custom styling.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fullscreen`}),` with `,(0,r.jsx)(i.code,{children:`breakout`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/layout/flex/item/`,children:`Flex.Item`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`size`}),` with `,(0,r.jsx)(i.code,{children:`span`}),`. The property sets how many columns an item should span in the flex layout.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/card/`,children:`Card`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`spacing`}),` property.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`size`}),` with `,(0,r.jsx)(i.code,{children:`span`}),` (inherited from `,(0,r.jsx)(i.a,{href:`/uilib/layout/flex/item/`,children:`Flex.Item`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`The default `,(0,r.jsx)(i.code,{children:`innerSpace`}),` is now `,(0,r.jsx)(i.code,{children:`small`}),` (`,(0,r.jsx)(i.code,{children:`16px`}),`) on all sides.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The default outline has changed to `,(0,r.jsx)(i.code,{children:`1px`}),` with color `,(0,r.jsx)(i.code,{children:`#ebebeb`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The corner radius has changed to `,(0,r.jsx)(i.code,{children:`24px`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/checkbox/`,children:`Checkbox`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`attributes`}),` prop has been removed. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_position`}),` with `,(0,r.jsx)(i.code,{children:`labelPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`children`}),` with `,(0,r.jsx)(i.code,{children:`label`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`OnChangeParams`}),` with `,(0,r.jsx)(i.code,{children:`CheckboxOnChangeParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`OnClickParams`}),` with `,(0,r.jsx)(i.code,{children:`CheckboxOnClickParams`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/switch/`,children:`Switch`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_position`}),` with `,(0,r.jsx)(i.code,{children:`labelPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change_end`}),` with `,(0,r.jsx)(i.code,{children:`onChangeEnd`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/logo/`,children:`Logo`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` The Logo component API has been redesigned. Instead of `,(0,r.jsx)(i.code,{children:`brand`}),` and `,(0,r.jsx)(i.code,{children:`variant`}),` props, import the specific SVG component directly.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`brand`}),` prop. Import and use the desired SVG component directly (e.g., `,(0,r.jsx)(i.code,{children:`DnbDefault`}),`, `,(0,r.jsx)(i.code,{children:`SbankenDefault`}),`, `,(0,r.jsx)(i.code,{children:`SbankenCompact`}),`, `,(0,r.jsx)(i.code,{children:`SbankenHorizontal`}),`, `,(0,r.jsx)(i.code,{children:`CarnegieDefault`}),`, `,(0,r.jsx)(i.code,{children:`EiendomDefault`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`variant`}),` prop. Instead, import the specific variant directly (e.g., `,(0,r.jsx)(i.code,{children:`SbankenCompact`}),` instead of `,(0,r.jsx)(i.code,{children:`brand="sbanken" variant="compact"`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`size`}),`. Replace it with `,(0,r.jsx)(i.code,{children:`height`}),` if it contains a numeric value, and with `,(0,r.jsx)(i.code,{children:`inheritSize`}),` where `,(0,r.jsx)(i.code,{children:`size='inherit'`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove the following properties: `,(0,r.jsx)(i.code,{children:`alt`}),` and `,(0,r.jsx)(i.code,{children:`ratio`}),`. Alt text is now built into each SVG component (e.g. `,(0,r.jsx)(i.code,{children:`DnbDefault.alt`}),` is `,(0,r.jsx)(i.code,{children:`'DNB Logo'`}),`). The Logo component reads `,(0,r.jsx)(i.code,{children:`svg.alt`}),` automatically. To customize the alt text, pass `,(0,r.jsx)(i.code,{children:`aria-label`}),` to the Logo component.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inherit_color`}),` with `,(0,r.jsx)(i.code,{children:`inheritColor`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Change `,(0,r.jsx)(i.code,{children:`width`}),` from number to string.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Change `,(0,r.jsx)(i.code,{children:`height`}),` from number to string.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Migration Example`}),`:`]}),`
`,(0,r.jsx)(i.p,{children:`Before (v10):`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { Logo } from '@dnb/eufemia'

render(<Logo brand="sbanken" variant="compact" />)
`})}),`
`,(0,r.jsx)(i.p,{children:`After (v11):`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { Logo, SbankenCompact } from '@dnb/eufemia/components/Logo'

render(<Logo svg={SbankenCompact} />)
`})}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/icon/`,children:`Icon`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inherit_color`}),` with `,(0,r.jsx)(i.code,{children:`inheritColor`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/button/`,children:`Button`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`variant="signal"`}),` has been removed. Use `,(0,r.jsx)(i.code,{children:`variant="primary"`}),` or `,(0,r.jsx)(i.code,{children:`variant="secondary"`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`buttonVariantPropType`}),` export has been removed as part of the PropTypes removal. If you were importing it via `,(0,r.jsx)(i.code,{children:`import { buttonVariantPropType } from '@dnb/eufemia/components/button'`}),`, remove the import — runtime prop validation is no longer provided.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`custom_content`}),` with `,(0,r.jsx)(i.code,{children:`customContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`class`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`className`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`inner_ref`}),` with `,(0,r.jsx)(i.code,{children:`ref`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_click`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[(0,r.jsx)(i.a,{href:`/uilib/components/modal/`,children:`Modal`}),`, `,(0,r.jsx)(i.a,{href:`/uilib/components/dialog/`,children:`Dialog`}),` and `,(0,r.jsx)(i.a,{href:`/uilib/components/drawer/`,children:`Drawer`})]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals and behavioral changes:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Removed:`}),` `,(0,r.jsx)(i.code,{children:`rootId`}),` property has been removed. Modal root elements no longer support custom IDs.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`openState`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`. Replace `,(0,r.jsx)(i.code,{children:`openState="opened"`}),` with `,(0,r.jsx)(i.code,{children:`open={true}`}),` and `,(0,r.jsx)(i.code,{children:`openState="closed"`}),` with `,(0,r.jsx)(i.code,{children:`open={false}`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`If you rely on opening and closing a modal by mounting and unmounting the component (legacy behavior), you should change to using the `,(0,r.jsx)(i.code,{children:`open`}),` property instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsx)(i.p,{children:`The following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`class`}),` with `,(0,r.jsx)(i.code,{children:`className`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`focus_selector`}),` with `,(0,r.jsx)(i.code,{children:`focusSelector`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`labelled_by`}),` with `,(0,r.jsx)(i.code,{children:`labelledBy`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`open_delay`}),` with `,(0,r.jsx)(i.code,{children:`openDelay`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`content_id`}),` with `,(0,r.jsx)(i.code,{children:`contentId`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`dialog_title`}),` with `,(0,r.jsx)(i.code,{children:`dialogTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`close_title`}),` with `,(0,r.jsx)(i.code,{children:`closeTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_close_button`}),` with `,(0,r.jsx)(i.code,{children:`hideCloseButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`close_button_attributes`}),` with `,(0,r.jsx)(i.code,{children:`closeButtonAttributes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_close`}),` with `,(0,r.jsx)(i.code,{children:`preventClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_core_style`}),` with `,(0,r.jsx)(i.code,{children:`preventCoreStyle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`animation_duration`}),` with `,(0,r.jsx)(i.code,{children:`animationDuration`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation_on_mobile`}),` with `,(0,r.jsx)(i.code,{children:`noAnimationOnMobile`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_width`}),` with `,(0,r.jsx)(i.code,{children:`minWidth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`max_width`}),` with `,(0,r.jsx)(i.code,{children:`maxWidth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_content`}),` with `,(0,r.jsx)(i.code,{children:`alignContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`container_placement`}),` with `,(0,r.jsx)(i.code,{children:`containerPlacement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`vertical_alignment`}),` with `,(0,r.jsx)(i.code,{children:`verticalAlignment`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`open_state`}),` with `,(0,r.jsx)(i.code,{children:`openState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`direct_dom_return`}),` with `,(0,r.jsx)(i.code,{children:`directDomReturn`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`omit_trigger_button`}),` with `,(0,r.jsx)(i.code,{children:`omitTriggerButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`open_modal`}),` with `,(0,r.jsx)(i.code,{children:`openModal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`close_modal`}),` with `,(0,r.jsx)(i.code,{children:`closeModal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`trigger_attributes`}),` with `,(0,r.jsx)(i.code,{children:`triggerAttributes`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`overlay_class`}),` with `,(0,r.jsx)(i.code,{children:`overlayClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`content_class`}),` with `,(0,r.jsx)(i.code,{children:`contentClass`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`modal_content`}),` with `,(0,r.jsx)(i.code,{children:`modalContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`header_content`}),` with `,(0,r.jsx)(i.code,{children:`headerContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`bar_content`}),` with `,(0,r.jsx)(i.code,{children:`barContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`dialog_role`}),` with `,(0,r.jsx)(i.code,{children:`dialogRole`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`bypass_invalidation_selectors`}),` with `,(0,r.jsx)(i.code,{children:`bypassInvalidationSelectors`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`content_ref`}),` with `,(0,r.jsx)(i.code,{children:`contentRef`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`scroll_ref`}),` with `,(0,r.jsx)(i.code,{children:`scrollRef`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_overlay_close`}),` with `,(0,r.jsx)(i.code,{children:`preventOverlayClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`confirmType`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),` on Dialog.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_open`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close_prevent`}),` with `,(0,r.jsx)(i.code,{children:`onClosePrevent`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`ModalPropTypes`}),` with `,(0,r.jsx)(i.code,{children:`ModalAllProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Modal.dialog_title`}),` with `,(0,r.jsx)(i.code,{children:`Modal.dialogTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Modal.close_title`}),` with `,(0,r.jsx)(i.code,{children:`Modal.closeTitle`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[(0,r.jsx)(i.a,{href:`/uilib/components/modal/`,children:`Modal.Header`}),`, `,(0,r.jsx)(i.a,{href:`/uilib/components/dialog/`,children:`Dialog.Header`}),` and `,(0,r.jsx)(i.a,{href:`/uilib/components/drawer/`,children:`Drawer.Header`})]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`title_class`}),` with `,(0,r.jsx)(i.code,{children:`titleClass`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[(0,r.jsx)(i.a,{href:`/uilib/components/modal/`,children:`ModalHeaderBar`}),`, `,(0,r.jsx)(i.a,{href:`/uilib/components/dialog/`,children:`Dialog.Navigation`}),` and `,(0,r.jsx)(i.a,{href:`/uilib/components/drawer/`,children:`Drawer.Navigation`})]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`shadow_class`}),` with `,(0,r.jsx)(i.code,{children:`shadowClass`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[(0,r.jsx)(i.a,{href:`/uilib/components/dialog/`,children:`Dialog.Body`}),` and `,(0,r.jsx)(i.a,{href:`/uilib/components/drawer/`,children:`Drawer.Body`})]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`styleType`}),` (or `,(0,r.jsx)(i.code,{children:`style_type`}),`) with `,(0,r.jsx)(i.code,{children:`backgroundColor`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`spacing`}),` with `,(0,r.jsx)(i.code,{children:`innerSpace`}),`. Use `,(0,r.jsx)(i.code,{children:`block`}),` to match the old vertical-only padding:`,`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="x-small"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'x-small' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="small"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'small' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="medium"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'medium' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="x-large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'x-large' }}`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`spacing="xx-large"`}),` -> `,(0,r.jsx)(i.code,{children:`innerSpace={{ block: 'xx-large' }}`})]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/heading/`,children:`Heading`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`debug_counter`}),` with `,(0,r.jsx)(i.code,{children:`debugCounter`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_correction`}),` with `,(0,r.jsx)(i.code,{children:`skipCorrection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/elements/heading/`,children:`H (heading elements)`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`as`}),` with `,(0,r.jsx)(i.code,{children:`element`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<H as="h2" size="medium">
  Heading
</H>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<H element="h2" size="medium">
  Heading
</H>
`})}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/table/`,children:`Table`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`accordion`}),` with `,(0,r.jsx)(i.code,{children:`mode="accordion"`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`accordionChevronPlacement="start"`}),` with `,(0,r.jsx)(i.code,{children:`accordionChevronPlacement="left"`}),` (or remove it, since `,(0,r.jsx)(i.code,{children:`"left"`}),` is the default).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`accordionChevronPlacement="end"`}),` with `,(0,r.jsx)(i.code,{children:`accordionChevronPlacement="right"`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`onClosed`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`onOpened`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TableClickableHead`}),`
`,(0,r.jsx)(i.h5,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_click`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/form-status/`,children:`FormStatus`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`text_id`}),` with `,(0,r.jsx)(i.code,{children:`textId`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`width_selector`}),` with `,(0,r.jsx)(i.code,{children:`widthSelector`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`width_element`}),` with `,(0,r.jsx)(i.code,{children:`widthElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`state`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`state`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`variant`}),`'s value `,(0,r.jsx)(i.code,{children:`flat`}),` with `,(0,r.jsx)(i.code,{children:`plain`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`FormStatusState`}),` type no longer includes `,(0,r.jsx)(i.code,{children:`| string | boolean`}),`. It now only accepts the literal values `,(0,r.jsx)(i.code,{children:`'error'`}),`, `,(0,r.jsx)(i.code,{children:`'warning'`}),`, `,(0,r.jsx)(i.code,{children:`'information'`}),`, `,(0,r.jsx)(i.code,{children:`'success'`}),`, and `,(0,r.jsx)(i.code,{children:`'marketing'`}),`. If you were passing arbitrary strings or booleans as `,(0,r.jsx)(i.code,{children:`state`}),` or `,(0,r.jsx)(i.code,{children:`statusState`}),`, update them to one of the valid literals.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/skeleton/`,children:`Skeleton`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`aria_busy`}),` with `,(0,r.jsx)(i.code,{children:`ariaBusy`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`aria_ready`}),` with `,(0,r.jsx)(i.code,{children:`ariaReady`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`Skeleton.aria_busy`}),` with `,(0,r.jsx)(i.code,{children:`Skeleton.ariaBusy`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`Skeleton.aria_ready`}),` with `,(0,r.jsx)(i.code,{children:`Skeleton.ariaReady`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/tabs/`,children:`Tabs`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_key`}),` with `,(0,r.jsx)(i.code,{children:`selectedKey`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`content_style`}),` with `,(0,r.jsx)(i.code,{children:`contentStyle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`content_spacing`}),` or `,(0,r.jsx)(i.code,{children:`contentSpacing`}),` with `,(0,r.jsx)(i.code,{children:`contentInnerSpace`}),`. The `,(0,r.jsx)(i.code,{children:`contentSpacing`}),` prop has been removed – use `,(0,r.jsx)(i.code,{children:`contentInnerSpace`}),` instead, which passes `,(0,r.jsx)(i.code,{children:`innerSpace`}),` to the content Section.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`tab_element`}),` with `,(0,r.jsx)(i.code,{children:`tabElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`tabs_style`}),` with `,(0,r.jsx)(i.code,{children:`tabsStyle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`tabs_spacing`}),` or `,(0,r.jsx)(i.code,{children:`tabsSpacing`}),` with `,(0,r.jsx)(i.code,{children:`tabsInnerSpace`}),`. The `,(0,r.jsx)(i.code,{children:`tabsSpacing`}),` prop has been removed – use `,(0,r.jsx)(i.code,{children:`tabsInnerSpace`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`nav_button_edge`}),` with `,(0,r.jsx)(i.code,{children:`navButtonEdge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_rerender`}),` with `,(0,r.jsx)(i.code,{children:`preventRerender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`focus_key`}),` with `,(0,r.jsx)(i.code,{children:`focusKey`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_border`}),` with `,(0,r.jsx)(i.code,{children:`noBorder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prerender`}),` with `,(0,r.jsx)(i.code,{children:`keepInDOM`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`class`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`className`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_click`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_mouse_enter`}),` with `,(0,r.jsx)(i.code,{children:`onMouseEnter`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_focus`}),` with `,(0,r.jsx)(i.code,{children:`onFocus`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The CSS classes `,(0,r.jsx)(i.code,{children:`dnb-section--spacing-*`}),` are no longer applied to the Tabs content wrapper or tab list. If you have custom CSS targeting these classes within Tabs, update to target the inline styles or use `,(0,r.jsx)(i.code,{children:`contentInnerSpace`}),`/`,(0,r.jsx)(i.code,{children:`tabsInnerSpace`}),` props instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/pagination/`,children:`Pagination`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`place_maker_before_content`}),` with `,(0,r.jsx)(i.code,{children:`placeMarkerBeforeContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`startup_page`}),` with `,(0,r.jsx)(i.code,{children:`startupPage`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`current_page`}),` with `,(0,r.jsx)(i.code,{children:`currentPage`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`page_count`}),` with `,(0,r.jsx)(i.code,{children:`pageCount`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`startup_count`}),` with `,(0,r.jsx)(i.code,{children:`startupCount`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`parallel_load_count`}),` with `,(0,r.jsx)(i.code,{children:`parallelLoadCount`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_wait_time`}),` with `,(0,r.jsx)(i.code,{children:`minWaitTime`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`use_load_button`}),` with `,(0,r.jsx)(i.code,{children:`useLoadButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_progress_indicator`}),` with `,(0,r.jsx)(i.code,{children:`hideProgressIndicator`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`set_content_handler`}),` with `,(0,r.jsx)(i.code,{children:`setContentHandler`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`reset_content_handler`}),` with `,(0,r.jsx)(i.code,{children:`resetContentHandler`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`reset_pagination_handler`}),` with `,(0,r.jsx)(i.code,{children:`resetPaginationHandler`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`end_infinity_handler`}),` with `,(0,r.jsx)(i.code,{children:`endInfinityHandler`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`page_element`}),` with `,(0,r.jsx)(i.code,{children:`pageElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`fallback_element`}),` with `,(0,r.jsx)(i.code,{children:`fallbackElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`marker_element`}),` with `,(0,r.jsx)(i.code,{children:`markerElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`indicator_element`}),` with `,(0,r.jsx)(i.code,{children:`indicatorElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`button_title`}),` with `,(0,r.jsx)(i.code,{children:`buttonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prev_title`}),` with `,(0,r.jsx)(i.code,{children:`prevTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`next_title`}),` with `,(0,r.jsx)(i.code,{children:`nextTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`more_pages`}),` with `,(0,r.jsx)(i.code,{children:`morePages`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_loading_text`}),` with `,(0,r.jsx)(i.code,{children:`isLoadingText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`load_button_text`}),` with `,(0,r.jsx)(i.code,{children:`loadButton.text`}),`. Note: `,(0,r.jsx)(i.code,{children:`loadButton`}),` is now an `,(0,r.jsx)(i.strong,{children:`object prop`}),` (not a flat string). Migrate as follows:`]}),`
`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Before:
<Pagination load_button_text="Load more" />

// After:
<Pagination loadButton={{ text: "Load more" }} />
`})}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_startup`}),` with `,(0,r.jsx)(i.code,{children:`onStartup`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_load`}),` with `,(0,r.jsx)(i.code,{children:`onLoad`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_end`}),` with `,(0,r.jsx)(i.code,{children:`onEnd`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.button_title`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.buttonTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.prev_title`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.prevTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.next_title`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.nextTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.more_pages`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.morePages`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.is_loading_text`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.isLoadingText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Pagination.load_button_text`}),` with `,(0,r.jsx)(i.code,{children:`Pagination.loadButtonText`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`InfinityLoadButton & InfinityLoadButtonProps`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_click`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/slider/`,children:`Slider`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`The following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`thumb_title`}),` with `,(0,r.jsx)(i.code,{children:`thumbTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`add_title`}),` with `,(0,r.jsx)(i.code,{children:`addTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`subtract_title`}),` with `,(0,r.jsx)(i.code,{children:`subtractTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`number_format`}),` with `,(0,r.jsx)(i.code,{children:`numberFormat`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Slider.add_title`}),` with `,(0,r.jsx)(i.code,{children:`Slider.addTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Slider.subtract_title`}),` with `,(0,r.jsx)(i.code,{children:`Slider.subtractTitle`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`OnChangeEventProps`}),` with `,(0,r.jsx)(i.code,{children:`SliderOnChangeParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`ThumbStateEnums`}),` with `,(0,r.jsx)(i.code,{children:`SliderThumbState`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/timeline/`,children:`Timeline`})}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`TimelineItem.alt_label_completed`}),` with `,(0,r.jsx)(i.code,{children:`TimelineItem.altLabelCompleted`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`TimelineItem.alt_label_current`}),` with `,(0,r.jsx)(i.code,{children:`TimelineItem.altLabelCurrent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`TimelineItem.alt_label_upcoming`}),` with `,(0,r.jsx)(i.code,{children:`TimelineItem.altLabelUpcoming`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/date-picker/`,children:`DatePicker`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Removals and behavioral changes:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`onBlur`}),` and `,(0,r.jsx)(i.code,{children:`onFocus`}),` events fire now only once per user interaction, not on every internal input blur.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The visible date segments are no longer native `,(0,r.jsx)(i.code,{children:`input`}),` elements. They are now exposed as section elements with `,(0,r.jsx)(i.code,{children:`role="spinbutton"`}),`. If you have Jest or DOM tests that query `,(0,r.jsx)(i.code,{children:`input`}),` or assert old input-specific ARIA attributes, update them to target the visible date picker field/segments instead.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Find `,(0,r.jsx)(i.code,{children:`partialDate`}),`, `,(0,r.jsx)(i.code,{children:`partialStartDate`}),` and `,(0,r.jsx)(i.code,{children:`partialEndDate`}),` and remove it.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Find `,(0,r.jsx)(i.code,{children:`correctInvalidDate`}),` / `,(0,r.jsx)(i.code,{children:`correct_invalid_date`}),` and remove it. Use `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),` from Eufemia Forms instead when using `,(0,r.jsx)(i.code,{children:`minDate`}),` and `,(0,r.jsx)(i.code,{children:`maxDate`}),`, as it has built-in validation. Automatically correcting user input leads to confusion — inform users about the error and let them correct it themselves.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),` and `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),` (not just a casing change — the event names changed).`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`dateFormat`}),` and `,(0,r.jsx)(i.code,{children:`returnFormat`}),` no longer support the format `,(0,r.jsx)(i.code,{children:`YYYY-MM-DD`}),`. Use `,(0,r.jsx)(i.code,{children:`yyyy-MM-dd`}),` instead.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<DatePicker dateFormat="YYYY/MM/DD" returnFormat="YYYY-MM-DD" />
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<DatePicker dateFormat="yyyy/MM/dd" returnFormat="yyyy-MM-dd" />
`})}),`
`]}),`
`,(0,r.jsxs)(i.li,{children:[`
`,(0,r.jsxs)(i.p,{children:[`The internal `,(0,r.jsx)(i.code,{children:`date-fns`}),` dependency has been upgraded from `,(0,r.jsx)(i.strong,{children:`v2`}),` to `,(0,r.jsx)(i.strong,{children:`v4`}),`. This does not affect the DatePicker API itself, but if you import `,(0,r.jsx)(i.code,{children:`date-fns`}),` directly in your project (e.g. to pass a `,(0,r.jsx)(i.code,{children:`locale`}),` to DatePicker), you need to update your imports from default exports to named exports:`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before (date-fns v2):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import nbLocale from 'date-fns/locale/nb'
import enLocale from 'date-fns/locale/en-GB'
;<DatePicker locale={nbLocale} />
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After (date-fns v4):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { nb } from 'date-fns/locale/nb'
import { enGB } from 'date-fns/locale/en-GB'
;<DatePicker locale={nb} />
`})}),`
`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsx)(i.p,{children:`In addition to the behavioral changes above, the following properties have been renamed from snake_case to camelCase:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`start_date`}),` with `,(0,r.jsx)(i.code,{children:`startDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`end_date`}),` with `,(0,r.jsx)(i.code,{children:`endDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`start_month`}),` with `,(0,r.jsx)(i.code,{children:`startMonth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`end_month`}),` with `,(0,r.jsx)(i.code,{children:`endMonth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`min_date`}),` with `,(0,r.jsx)(i.code,{children:`minDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`max_date`}),` with `,(0,r.jsx)(i.code,{children:`maxDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`mask_order`}),` with `,(0,r.jsx)(i.code,{children:`maskOrder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`mask_placeholder`}),` with `,(0,r.jsx)(i.code,{children:`maskPlaceholder`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`date_format`}),` with `,(0,r.jsx)(i.code,{children:`dateFormat`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`return_format`}),` with `,(0,r.jsx)(i.code,{children:`returnFormat`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_navigation`}),` with `,(0,r.jsx)(i.code,{children:`hideNavigation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_days`}),` with `,(0,r.jsx)(i.code,{children:`hideDays`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`only_month`}),` with `,(0,r.jsx)(i.code,{children:`onlyMonth`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_last_week`}),` with `,(0,r.jsx)(i.code,{children:`hideLastWeek`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`disable_autofocus`}),` with `,(0,r.jsx)(i.code,{children:`disableAutofocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`enable_keyboard_nav`}),` with `,(0,r.jsx)(i.code,{children:`enableKeyboardNav`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_input`}),` with `,(0,r.jsx)(i.code,{children:`showInput`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_submit_button`}),` with `,(0,r.jsx)(i.code,{children:`showSubmitButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_cancel_button`}),` with `,(0,r.jsx)(i.code,{children:`showCancelButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`show_reset_button`}),` with `,(0,r.jsx)(i.code,{children:`showResetButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`submit_button_text`}),` with `,(0,r.jsx)(i.code,{children:`submitButtonText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`cancel_button_text`}),` with `,(0,r.jsx)(i.code,{children:`cancelButtonText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`reset_button_text`}),` with `,(0,r.jsx)(i.code,{children:`resetButtonText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`reset_date`}),` with `,(0,r.jsx)(i.code,{children:`resetDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`first_day`}),` with `,(0,r.jsx)(i.code,{children:`firstDay`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`input_element`}),` with `,(0,r.jsx)(i.code,{children:`inputElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`addon_element`}),` with `,(0,r.jsx)(i.code,{children:`addonElement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`prevent_close`}),` with `,(0,r.jsx)(i.code,{children:`preventClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`align_picker`}),` with `,(0,r.jsx)(i.code,{children:`alignPicker`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`skip_portal`}),` with `,(0,r.jsx)(i.code,{children:`skipPortal`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace the `,(0,r.jsx)(i.code,{children:`shortcuts`}),` property `,(0,r.jsx)(i.code,{children:`close_on_select`}),` with `,(0,r.jsx)(i.code,{children:`closeOnSelect`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_days_render`}),` with `,(0,r.jsx)(i.code,{children:`onDaysRender`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_type`}),` with `,(0,r.jsx)(i.code,{children:`onType`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_submit`}),` with `,(0,r.jsx)(i.code,{children:`onSubmit`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_cancel`}),` with `,(0,r.jsx)(i.code,{children:`onCancel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_reset`}),` with `,(0,r.jsx)(i.code,{children:`onReset`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Event return object`}),`
`,(0,r.jsx)(i.p,{children:`The following properties on the event callback return object have been renamed:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`days_between`}),` with `,(0,r.jsx)(i.code,{children:`daysBetween`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_valid`}),` with `,(0,r.jsx)(i.code,{children:`isValid`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_valid_start_date`}),` with `,(0,r.jsx)(i.code,{children:`isValidStartDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_valid_end_date`}),` with `,(0,r.jsx)(i.code,{children:`isValidEndDate`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-date-picker--opened`}),` with `,(0,r.jsx)(i.code,{children:`dnb-date-picker--open`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/number-format/`,children:`NumberFormat`})}),`
`,(0,r.jsxs)(i.h4,{children:[`Split into variants (no more `,(0,r.jsx)(i.code,{children:`<NumberFormat />`}),`)`]}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` `,(0,r.jsx)(i.code,{children:`NumberFormat`}),` is now exposed as a namespace of variant sub-components. This enables code splitting and tree shaking: apps only pay for the variants they actually use. There is `,(0,r.jsx)(i.strong,{children:`no backwards compatibility`}),` – the generic `,(0,r.jsx)(i.code,{children:`<NumberFormat />`}),` component has been removed.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`Replace each usage with the matching variant:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat value={1234} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Number value={1234} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat>1234</NumberFormat>`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Number>1234</NumberFormat.Number>`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat currency value={1234} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Currency value={1234} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat currency="USD" value={1234} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Currency currency="USD" value={1234} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat percent value={12.34} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Percent value={12.34} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat compact value={12345} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Number compact value={12345} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat compact="long" value={12345} />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.Number compact="long" value={12345} />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat phone value="99999999" />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.PhoneNumber value="99999999" />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat ban value="20001234567" />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.BankAccountNumber value="20001234567" />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat nin value="18089212345" />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.NationalIdentityNumber value="18089212345" />`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat org value="123456789" />`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`<NumberFormat.OrganizationNumber value="123456789" />`})})]})]})]}),`
`,(0,r.jsx)(i.p,{children:`Notes:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`currency`}),`, `,(0,r.jsx)(i.code,{children:`percent`}),`, `,(0,r.jsx)(i.code,{children:`phone`}),`, `,(0,r.jsx)(i.code,{children:`ban`}),`, `,(0,r.jsx)(i.code,{children:`nin`}),` and `,(0,r.jsx)(i.code,{children:`org`}),` boolean props have been removed from the shared props surface. They are now implied by the chosen variant.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`NumberFormat.Currency`}),` defaults `,(0,r.jsx)(i.code,{children:`currency`}),` to `,(0,r.jsx)(i.code,{children:`true`}),` (i.e. `,(0,r.jsx)(i.code,{children:`NOK`}),`). Pass a string like `,(0,r.jsx)(i.code,{children:`currency="USD"`}),` to override.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`compact`}),` is still supported on `,(0,r.jsx)(i.code,{children:`NumberFormat.Number`}),` and `,(0,r.jsx)(i.code,{children:`NumberFormat.Currency`}),`. Pass `,(0,r.jsx)(i.code,{children:`compact`}),` (short), `,(0,r.jsx)(i.code,{children:`compact="long"`}),` or `,(0,r.jsx)(i.code,{children:`compact="short"`}),` to pick the style.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`NumberFormat.PhoneNumber`}),` still supports `,(0,r.jsx)(i.code,{children:`link="tel" | "sms"`}),` for clickable links.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`Provider`}),` context key `,(0,r.jsx)(i.code,{children:`NumberFormat`}),` (e.g. `,(0,r.jsx)(i.code,{children:`<Provider NumberFormat={{ currency: true, decimals: 0 }}>`}),`) and the `,(0,r.jsx)(i.code,{children:`NumberFormatProps`}),` TypeScript type are still available for shared configuration.`]}),`
`]}),`
`,(0,r.jsxs)(i.h4,{children:[`Utility formatter API (`,(0,r.jsx)(i.code,{children:`format`}),` removed)`]}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` The generic `,(0,r.jsx)(i.code,{children:`format(value, options)`}),` utility is gone. Import the variant formatter you need directly.`]}),`
`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { phone: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatPhoneNumber(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { ban: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatBankAccountNumber(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { nin: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatNationalIdentityNumber(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { org: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatOrganizationNumber(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { percent: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatPercent(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { currency: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatCurrency(value)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value, { currency: 'USD' })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatCurrency(value, { currency: 'USD' })`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`format(value)`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`formatNumber(value)`})})]})]})]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Before
import { format } from '@dnb/eufemia/components/NumberFormat'
format(value, { phone: true })

// After
import { formatPhoneNumber } from '@dnb/eufemia/components/NumberFormat'
formatPhoneNumber(value)
`})}),`
`,(0,r.jsxs)(i.p,{children:[`All variant formatters are re-exported from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/NumberFormat`}),`: `,(0,r.jsx)(i.code,{children:`formatNumber`}),`, `,(0,r.jsx)(i.code,{children:`formatCurrency`}),`, `,(0,r.jsx)(i.code,{children:`formatPercent`}),`, `,(0,r.jsx)(i.code,{children:`formatPhoneNumber`}),`, `,(0,r.jsx)(i.code,{children:`formatBankAccountNumber`}),`, `,(0,r.jsx)(i.code,{children:`formatNationalIdentityNumber`}),`, `,(0,r.jsx)(i.code,{children:`formatOrganizationNumber`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.code,{children:`NumberFormatOptionParams`}),` no longer accepts the `,(0,r.jsx)(i.code,{children:`phone`}),`, `,(0,r.jsx)(i.code,{children:`ban`}),`, `,(0,r.jsx)(i.code,{children:`nin`}),`, `,(0,r.jsx)(i.code,{children:`org`}),` or `,(0,r.jsx)(i.code,{children:`percent`}),` booleans; they were only used by the removed dispatcher.`]}),`
`,(0,r.jsx)(i.h4,{children:(0,r.jsx)(i.code,{children:`useNumberFormat(value, formatter, options?)`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` `,(0,r.jsx)(i.code,{children:`useNumberFormat`}),` now takes the formatter explicitly instead of the variant flag.`]}),`
`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Before
const result = useNumberFormat(value, { currency: true, decimals: 2 })

// After
import {
  useNumberFormat,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'
const result = useNumberFormat(value, formatCurrency, { decimals: 2 })
`})}),`
`,(0,r.jsx)(i.h4,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, formatter, options?)`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` `,(0,r.jsx)(i.code,{children:`useNumberFormatWithParts`}),` now mirrors `,(0,r.jsx)(i.code,{children:`useNumberFormat`}),` and takes the formatter explicitly instead of picking one from `,(0,r.jsx)(i.code,{children:`percent`}),` / `,(0,r.jsx)(i.code,{children:`currency`}),` options. The internal `,(0,r.jsx)(i.code,{children:`forceCurrencyAfterAmount`}),` option has been removed; pass `,(0,r.jsx)(i.code,{children:`currencyPosition: 'after'`}),` directly on the formatter options if you need it.`]}),`
`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// Before
const formatted = useNumberFormatWithParts(value, {
  currency: true,
  decimals: 2,
})

// After
import {
  useNumberFormatWithParts,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'
const formatted = useNumberFormatWithParts(value, formatCurrency, {
  decimals: 2,
})
`})}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value)`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, formatNumber)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, { currency: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, formatCurrency)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, { percent: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, formatPercent)`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, { forceCurrencyAfterAmount: true })`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`useNumberFormatWithParts(value, formatCurrency, { currencyPosition: 'after' })`})})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[`The returned `,(0,r.jsx)(i.code,{children:`parts`}),` shape is unchanged. `,(0,r.jsx)(i.code,{children:`parts`}),` are now derived from the formatter's display string, so any formatter returning a `,(0,r.jsx)(i.code,{children:`NumberFormatReturnValue`}),` (including custom ones) can be passed in.`]}),`
`,(0,r.jsx)(i.h4,{children:`Behavioral changes`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Phone formatting no longer treats bare numbers starting with `,(0,r.jsx)(i.code,{children:`47`}),` as having a Norwegian country code. Use E.164 format with an explicit `,(0,r.jsx)(i.code,{children:`+`}),` prefix (e.g. `,(0,r.jsx)(i.code,{children:`+4712345678`}),`) or the `,(0,r.jsx)(i.code,{children:`00`}),` prefix (e.g. `,(0,r.jsx)(i.code,{children:`004712345678`}),`) to indicate a country code. For example, `,(0,r.jsx)(i.code,{children:`4712345678`}),` now formats as `,(0,r.jsx)(i.code,{children:`47 12 34 56 78`}),` instead of `,(0,r.jsx)(i.code,{children:`+47 12 34 56 78`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Phone formatting now auto-detects country codes for all countries from spaceless E.164 numbers (e.g. `,(0,r.jsx)(i.code,{children:`+35812345678`}),` → `,(0,r.jsx)(i.code,{children:`+358 23 45 67 89`}),`). Previously, only Norwegian (`,(0,r.jsx)(i.code,{children:`+47`}),`) spaceless numbers were detected.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Phone formatting now also accepts space-separated values (e.g. `,(0,r.jsx)(i.code,{children:`+47 12345678`}),`) and values with dashes. Unrecognized values (no digits) are returned as-is.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties (per variant)`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`omit_rounding`}),` with `,(0,r.jsx)(i.code,{children:`rounding="omit"`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`currency_display`}),` with `,(0,r.jsx)(i.code,{children:`currencyDisplay`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`currency_position`}),` with `,(0,r.jsx)(i.code,{children:`currencyPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`always_selectall`}),` with `,(0,r.jsx)(i.code,{children:`alwaysSelectAll`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selectall`}),` with `,(0,r.jsx)(i.code,{children:`selectAll`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`copy_selection`}),` with `,(0,r.jsx)(i.code,{children:`copySelection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`clean_copy_value`}),` with `,(0,r.jsx)(i.code,{children:`cleanCopyValue`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`NumberFormat.clipboard_copy`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormat.clipboardCopy`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`NumberFormat.not_available`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormat.notAvailable`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-number-format--selectall`}),` with `,(0,r.jsx)(i.code,{children:`dnb-number-format--select-all`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`TypeScript types`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatReturnValue`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatReturnValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatValue`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatOptionParams`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatOptionParams`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatReturnType`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatReturnType`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatTypes`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatType`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`formatCurrencyPosition`}),` with `,(0,r.jsx)(i.code,{children:`NumberFormatCurrencyPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`value`}),` property in `,(0,r.jsx)(i.code,{children:`NumberFormatReturnValue`}),` changed from `,(0,r.jsx)(i.code,{children:`number`}),` to `,(0,r.jsx)(i.code,{children:`NumberFormatValue`}),` (`,(0,r.jsx)(i.code,{children:`string | number`}),`). If your code assumes `,(0,r.jsx)(i.code,{children:`value`}),` is always a `,(0,r.jsx)(i.code,{children:`number`}),`, add an explicit conversion with `,(0,r.jsx)(i.code,{children:`Number(result.value)`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/step-indicator/`,children:`StepIndicator`})}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Major change:`}),` This component has been redesigned. The sidebar variant has been removed entirely.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Removals`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`Major redesign of component. There is now only one variant (instead of two).`}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`StepIndicatorRenderCallback`}),` type. Not needed anymore.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`on_item_render`}),`. No longer has any other function than each step's `,(0,r.jsx)(i.code,{children:`title`}),` property.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove step item `,(0,r.jsx)(i.code,{children:`on_render`}),`. No longer has any other function than the `,(0,r.jsx)(i.code,{children:`title`}),` property.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`sidebarId`}),`. No longer has any sidebar. If an id is needed, use the `,(0,r.jsx)(i.code,{children:`id`}),` property.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`step_title_extended`}),`. Only `,(0,r.jsx)(i.code,{children:`stepTitle`}),` is needed.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_current`}),` with `,(0,r.jsx)(i.code,{children:`isCurrent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`current_step`}),` with `,(0,r.jsx)(i.code,{children:`currentStep`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`overview_title`}),` with `,(0,r.jsx)(i.code,{children:`overviewTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`step_title`}),` with `,(0,r.jsx)(i.code,{children:`stepTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_numbers`}),` with `,(0,r.jsx)(i.code,{children:`hideNumbers`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepIndicator.overview_title`}),` with `,(0,r.jsx)(i.code,{children:`StepIndicator.overviewTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepIndicator.step_title`}),` with `,(0,r.jsx)(i.code,{children:`StepIndicator.stepTitle`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_click`}),` with `,(0,r.jsx)(i.code,{children:`onClick`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`data.on_click`}),` with `,(0,r.jsx)(i.code,{children:`data.onClick`}),` for StepIndicatorItem.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`StepItemWrapperProps`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Removed `,(0,r.jsx)(i.code,{children:`number`}),` as one can only change the render of content inside the button.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed `,(0,r.jsx)(i.code,{children:`status`}),` as one can only change the render of content inside the button.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed `,(0,r.jsx)(i.code,{children:`hideNumbers`}),` as can only hide numbers in main component.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`StepIndicator.Sidebar`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`Component removed entirely after redesign. The variant that used this component no longer exists.`}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/global-error/`,children:`GlobalError`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status`}),` with `,(0,r.jsx)(i.code,{children:`statusCode`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`code`}),` with `,(0,r.jsx)(i.code,{children:`errorMessageCode`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`GlobalError.code`}),` with `,(0,r.jsx)(i.code,{children:`GlobalError.errorMessageCode`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/toggle-button/`,children:`ToggleButton`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`onStateUpdate`}),` prop has been removed. Use `,(0,r.jsx)(i.code,{children:`onChange`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The deprecated `,(0,r.jsx)(i.code,{children:`attributes`}),` prop has been removed from ToggleButton and ToggleButtonGroup. Use spread props instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_position`}),` with `,(0,r.jsx)(i.code,{children:`iconPosition`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`left_component`}),` with `,(0,r.jsx)(i.code,{children:`leftComponent`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/toggle-button/`,children:`ToggleButton.Group`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_state`}),` with `,(0,r.jsx)(i.code,{children:`statusState`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`statusState`}),`'s value `,(0,r.jsx)(i.code,{children:`warn`}),` with `,(0,r.jsx)(i.code,{children:`warning`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_props`}),` with `,(0,r.jsx)(i.code,{children:`statusProps`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_no_animation`}),` with `,(0,r.jsx)(i.code,{children:`statusNoAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_direction`}),` with `,(0,r.jsx)(i.code,{children:`labelDirection`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`label_sr_only`}),` with `,(0,r.jsx)(i.code,{children:`labelSrOnly`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`left_component`}),` with `,(0,r.jsx)(i.code,{children:`leftComponent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`layout_direction`}),` with `,(0,r.jsx)(i.code,{children:`layoutDirection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_change`}),` with `,(0,r.jsx)(i.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/tooltip/`,children:`Tooltip`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`position`}),` with `,(0,r.jsx)(i.code,{children:`placement`}),` to match the Popover API.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`active`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`forceOpen`}),` and use `,(0,r.jsx)(i.code,{children:`open`}),` instead. The `,(0,r.jsx)(i.code,{children:`open`}),` prop is now dynamically controlled — when `,(0,r.jsx)(i.code,{children:`open`}),` is a boolean it controls visibility, and when not provided (undefined) the Tooltip reverts to hover/focus behavior.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`size="basis"`}),` with `,(0,r.jsx)(i.code,{children:`size="default"`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/global-status/`,children:`GlobalStatus`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`icon_size`}),` with `,(0,r.jsx)(i.code,{children:`iconSize`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_animation`}),` with `,(0,r.jsx)(i.code,{children:`noAnimation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`hide_close_button`}),` with `,(0,r.jsx)(i.code,{children:`hideCloseButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`close_text`}),` with `,(0,r.jsx)(i.code,{children:`closeText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`default_title`}),` with `,(0,r.jsx)(i.code,{children:`defaultTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_anchor_text`}),` with `,(0,r.jsx)(i.code,{children:`statusAnchorText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`omit_set_focus`}),` with `,(0,r.jsx)(i.code,{children:`omitSetFocus`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`omit_set_focus_on_update`}),` with `,(0,r.jsx)(i.code,{children:`omitSetFocusOnUpdate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_id`}),` with `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_anchor_url`}),` with `,(0,r.jsx)(i.code,{children:`statusAnchorUrl`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_anchor_label`}),` with `,(0,r.jsx)(i.code,{children:`statusAnchorLabel`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`buffer_delay`}),` with `,(0,r.jsx)(i.code,{children:`bufferDelay`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`state`}),`'s value `,(0,r.jsx)(i.code,{children:`info`}),` with `,(0,r.jsx)(i.code,{children:`information`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`autoclose`}),` with `,(0,r.jsx)(i.code,{children:`autoClose`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`autoscroll`}),` with `,(0,r.jsx)(i.code,{children:`autoScroll`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_adjust`}),` with `,(0,r.jsx)(i.code,{children:`onAdjust`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_open`}),` with `,(0,r.jsx)(i.code,{children:`onOpen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onHide`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`. The `,(0,r.jsx)(i.code,{children:`status_id`}),` callback parameter has been renamed to `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`GlobalStatus.close_text`}),` with `,(0,r.jsx)(i.code,{children:`GlobalStatus.closeText`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`GlobalStatus.default_title`}),` with `,(0,r.jsx)(i.code,{children:`GlobalStatus.defaultTitle`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace translation `,(0,r.jsx)(i.code,{children:`GlobalStatus.status_anchor_text`}),` with `,(0,r.jsx)(i.code,{children:`GlobalStatus.statusAnchorText`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`GlobalStatusController`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`remove_on_unmount`}),` with `,(0,r.jsx)(i.code,{children:`removeOnUnmount`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`GlobalStatus.create`}),`
`,(0,r.jsx)(i.h5,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_id`}),` with `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h5,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onHide`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`GlobalStatus.Remove`}),`
`,(0,r.jsx)(i.h5,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_id`}),` with `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`buffer_delay`}),` with `,(0,r.jsx)(i.code,{children:`bufferDelay`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h5,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onHide`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`GlobalStatus.Add`}),`
`,(0,r.jsx)(i.h5,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_id`}),` with `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h5,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onHide`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`GlobalStatus.Update`}),`
`,(0,r.jsx)(i.h5,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`status_id`}),` with `,(0,r.jsx)(i.code,{children:`statusId`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h5,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show`}),` with `,(0,r.jsx)(i.code,{children:`onShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide`}),` with `,(0,r.jsx)(i.code,{children:`onHide`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_close`}),` with `,(0,r.jsx)(i.code,{children:`onClose`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/components/copy-on-click/`,children:`CopyOnClick`})}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`CopyOnClick.clipboard_copy`}),` with `,(0,r.jsx)(i.code,{children:`CopyOnClick.clipboardCopy`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`Layout`}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/layout/space/`,children:`Space`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`no_collapse`}),` with `,(0,r.jsx)(i.code,{children:`noCollapse`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/layout/flex/`,children:`Flex`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`spacing`}),` with `,(0,r.jsx)(i.code,{children:`gap`}),` on all Flex components.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`rowGap`}),` no longer accepts value `,(0,r.jsx)(i.code,{children:`true`}),`. Remove the property to get the same behavior.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Removal of FormRow and FormSet`}),`
`,(0,r.jsxs)(i.p,{children:[`For more information on how to replace these, see `,(0,r.jsx)(i.a,{href:`/uilib/about-the-lib/releases/eufemia/form-set-row-deprecation-v11#deprecation`,children:`FormSet/FormRow deprecation`}),`.`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<FormRow>`}),` with `,(0,r.jsx)(i.code,{children:`<Flex.Horizontal align="baseline">`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<FormRow vertical>`}),` with `,(0,r.jsx)(i.code,{children:`<Flex.Vertical>`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<FormRow centered>`}),` with `,(0,r.jsx)(i.code,{children:`<Flex.Horizontal align="center">`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`FormRow=`}),` with `,(0,r.jsx)(i.code,{children:`formElement=`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`FormRow:`}),` with `,(0,r.jsx)(i.code,{children:`formElement:`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`import { includeValidProps } from '@dnb/eufemia/components/form-row/FormRowHelpers'`}),` with `,(0,r.jsx)(i.code,{children:`import { pickFormElementProps } from '@dnb/eufemia/shared/helpers/filterValidProps'`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`import { prepareFormRowContext } from '@dnb/eufemia/components/form-row/FormRowHelpers'`}),` with `,(0,r.jsx)(i.code,{children:`import { prepareFormElementContext } from '@dnb/eufemia/shared/helpers/filterValidProps'`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you migrate a `,(0,r.jsx)(i.code,{children:`FormSet`}),` that relied on a native browser submit, such as `,(0,r.jsx)(i.code,{children:`method="post"`}),` with an `,(0,r.jsx)(i.code,{children:`action`}),`, you can use `,(0,r.jsx)(i.code,{children:`preventDefaultOnSubmit={false}`}),` on `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` to keep the native submit behavior.`]}),`
`,(0,r.jsx)(i.h2,{children:`Helpers`}),`
`,(0,r.jsx)(i.h3,{children:`Provider/Context`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`locales`}),` prop on `,(0,r.jsx)(i.code,{children:`Provider`}),` and `,(0,r.jsx)(i.code,{children:`Context`}),` has been removed. Use `,(0,r.jsx)(i.code,{children:`translations`}),` instead. Passing `,(0,r.jsx)(i.code,{children:`locales`}),` will be silently ignored.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Provider locales={myLocales}>...</Provider>
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`<Provider translations={myTranslations}>...</Provider>
`})}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/helpers/`,children:`Component helpers`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`extendGracefully`}),`, it no longer exists.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Removed helper functions`}),`
`,(0,r.jsxs)(i.p,{children:[`The following functions have been removed from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/shared/component-helper`}),`:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`isTrue`}),` – Checked if a value was truthy by comparing `,(0,r.jsx)(i.code,{children:`String(value) === 'true' || String(value) === '1'`}),`. Replace with direct boolean checks (e.g. `,(0,r.jsx)(i.code,{children:`value === true`}),` or simply `,(0,r.jsx)(i.code,{children:`value`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`toCamelCase`}),` – Converted snake_case strings to camelCase.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`toSnakeCase`}),` – Converted PascalCase strings to snake_case.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`matchAll`}),` – Polyfill for `,(0,r.jsx)(i.code,{children:`String.matchAll()`}),`. Use the native `,(0,r.jsx)(i.code,{children:`String.matchAll()`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`combineDetails`}),` – Unused aria-details combiner helper. Use `,(0,r.jsx)(i.code,{children:`combineDescribedBy`}),` or `,(0,r.jsx)(i.code,{children:`combineLabelledBy`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`keycode`}),` – Key-to-keycode converter. Use `,(0,r.jsx)(i.code,{children:`KeyboardEvent.key`}),` instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`EventEmitter`}),` – Internal event emitter utility. No replacement needed.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`ErrorHandler`}),` – Broken error handler utility. No replacement needed.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`The following functions have been removed from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/shared/helpers`}),`:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`insertElementBeforeSelection`}),` – Unused helper for inserting DOM elements before a text selection.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`convertStatusToStateOnly`}),` – Trivial helper. Replace `,(0,r.jsx)(i.code,{children:`convertStatusToStateOnly(status, state)`}),` with `,(0,r.jsx)(i.code,{children:`status ? state : null`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`isEdge`}),` / `,(0,r.jsx)(i.code,{children:`IS_EDGE`}),` – Edge is now Chromium-based, making these detections obsolete.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Removed HOCs and conversion utilities`}),`
`,(0,r.jsx)(i.p,{children:`The following Higher-Order Components (HOCs), conversion functions, and types have been removed:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`withCamelCaseProps`}),` – HOC that converted snake_case props to camelCase.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`withSnakeCaseProps`}),` – HOC that converted camelCase props to snake_case.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`classWithSnakeCaseProps`}),` – Class-based HOC that converted camelCase props to snake_case.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`convertCamelCasePropsToSnakeCase`}),` – Converted camelCase props to snake_case.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`convertSnakeCaseProps`}),` – Converted snake_case props to camelCase.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`The following TypeScript types have also been removed:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`ToCamelCase`}),`, `,(0,r.jsx)(i.code,{children:`ToCamelCasePartial`}),`, `,(0,r.jsx)(i.code,{children:`ToCamelCaseFlat`}),`, `,(0,r.jsx)(i.code,{children:`ToCamelCasePartialFlat`}),`, `,(0,r.jsx)(i.code,{children:`IncludeCamelCase`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`ToSnakeCase`}),`, `,(0,r.jsx)(i.code,{children:`ToSnakeCasePartial`}),`, `,(0,r.jsx)(i.code,{children:`IncludeSnakeCase`})]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`AssertNoMissing`}),`, `,(0,r.jsx)(i.code,{children:`KeysWithUnderscore`})]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`These were previously used to support dual snake_case/camelCase prop naming. Since v11 uses camelCase exclusively, they are no longer needed.`}),`
`,(0,r.jsx)(i.h4,{children:`Renamed helper functions`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`extendPropsWithContextInClassComponent`}),` has been renamed to `,(0,r.jsx)(i.code,{children:`extendExistingPropsWithContext`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h4,{children:[`Updated SCSS mixin: `,(0,r.jsx)(i.code,{children:`isFirefox`}),` (formerly `,(0,r.jsx)(i.code,{children:`IS_FF`}),`)`]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`IS_FF`}),` SCSS mixin has been renamed to `,(0,r.jsx)(i.code,{children:`isFirefox`}),` (see `,(0,r.jsx)(i.a,{href:`#scss-mixin-renames`,children:`SCSS mixin renames`}),`). Its implementation now uses `,(0,r.jsx)(i.code,{children:`@supports (-moz-appearance: none)`}),` instead of the deprecated `,(0,r.jsx)(i.code,{children:`@-moz-document url-prefix()`}),` hack. The behavior is unchanged.`]}),`
`,(0,r.jsx)(i.h4,{children:`Removed SCSS mixins`}),`
`,(0,r.jsx)(i.p,{children:`The following SCSS mixins have been removed:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.code,{children:`extendFocusRing`})}),` (`,(0,r.jsx)(i.code,{children:`style/core/utilities.scss`}),`) — added an outer ring on top of `,(0,r.jsx)(i.code,{children:`focusRing`}),`. Replace with a custom `,(0,r.jsx)(i.code,{children:`box-shadow`}),` if needed.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:(0,r.jsx)(i.code,{children:`componentReset`})}),` (`,(0,r.jsx)(i.code,{children:`style/core/scopes.scss`}),`) — applied core CSS reset rules to a single component. Use the global Eufemia CSS reset instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`CSS reset: IE and Edge (EdgeHTML) support removed`}),`
`,(0,r.jsxs)(i.p,{children:[`All IE- and legacy-Edge-specific CSS rules have been removed from `,(0,r.jsx)(i.code,{children:`reset.scss`}),` and component styles. This includes vendor-prefixed properties like `,(0,r.jsx)(i.code,{children:`-ms-overflow-style`}),`, `,(0,r.jsx)(i.code,{children:`-ms-high-contrast`}),`, and legacy Edge (EdgeHTML) hacks. Only modern evergreen browsers are supported. If you still need to support these browsers, you must add your own fallback styles.`]}),`
`,(0,r.jsx)(i.h2,{children:`Eufemia Forms`}),`
`,(0,r.jsxs)(i.blockquote,{children:[`
`,(0,r.jsxs)(i.p,{children:[`This section covers changes specific to `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/forms`}),`. Many of these are `,(0,r.jsx)(i.strong,{children:`behavioral changes and removals`}),` that require manual review.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`General`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Form.Card`}),` no longer enables `,(0,r.jsx)(i.code,{children:`outset`}),` by default.`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Form.ButtonRow`}),` no longer has automatic horizontal alignment styles when placed next to a `,(0,r.jsx)(i.code,{children:`Card`}),`. If you relied on this spacing, add explicit spacing (e.g. via `,(0,r.jsx)(i.code,{children:`left`}),` or `,(0,r.jsx)(i.code,{children:`Space`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`Card.Provider`}),` / `,(0,r.jsx)(i.code,{children:`Form.Card.Provider`}),` has been removed (including `,(0,r.jsx)(i.code,{children:`disableCardBreakout`}),`).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.useErrorMessage`}),` with your error messages as an object in the `,(0,r.jsx)(i.code,{children:`errorMessages`}),` property (e.g., with a `,(0,r.jsx)(i.code,{children:`useMemo`}),` hook).`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.useError`}),` with `,(0,r.jsx)(i.code,{children:`Form.useValidation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.useLocale`}),` with `,(0,r.jsx)(i.code,{children:`Form.useTranslation`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`internal.error`}),` with `,(0,r.jsx)(i.code,{children:`error`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace Form.Iterate label variable `,(0,r.jsx)(i.code,{children:`{itemNr}`}),` with `,(0,r.jsx)(i.code,{children:`{itemNo}`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Form.FieldProps`}),` with `,(0,r.jsx)(i.code,{children:`Field.Provider`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<Card stack>...</Card>`}),` with `,(0,r.jsx)(i.code,{children:`<Form.Card>...</Form.Card>`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`<Card>...</Card>`}),` with `,(0,r.jsx)(i.code,{children:`<Form.Card>...</Form.Card>`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Removed automatic horizontal card-content alignment for `,(0,r.jsx)(i.code,{children:`Form.MainHeading`}),` and `,(0,r.jsx)(i.code,{children:`Form.SubHeading`}),` when placed above a card.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Container`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout.Step`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Step`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout.NextButton`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Buttons`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout.PreviousButton`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Buttons`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout.Buttons`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.Buttons`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`StepsLayout.useStep`}),` with `,(0,r.jsx)(i.code,{children:`Wizard.useStep`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Iterate.ArrayPushButton`}),` with `,(0,r.jsx)(i.code,{children:`Iterate.PushButton`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`Iterate.ArrayRemoveElementButton`}),` with `,(0,r.jsx)(i.code,{children:`Iterate.RemoveButton`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`Docs: `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/`,children:`Eufemia Forms`})]}),`
`,(0,r.jsx)(i.h3,{children:`Ajv no longer auto-instantiated`}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Breaking Change`}),`: Ajv is no longer automatically instantiated in Eufemia Forms v11. The `,(0,r.jsx)(i.code,{children:`ajv`}),` package is still included as a dependency, but Eufemia Forms no longer creates an Ajv instance for you. You must explicitly create one using `,(0,r.jsx)(i.code,{children:`makeAjvInstance()`}),` and pass it to `,(0,r.jsx)(i.code,{children:`Form.Handler`}),`. This enables tree-shaking of Ajv for applications that don't use JSON Schema validation.`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Migration Required`}),`: If you use JSON Schema validation with Ajv, you must:`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Update your imports and usage`}),`:`]}),`
`,(0,r.jsx)(i.p,{children:`Before (v10):`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { Form, Field, JSONSchema } from '@dnb/eufemia/extensions/forms'

const schema: JSONSchema = {
  type: 'object',
  properties: {
    myField: { type: 'string', minLength: 3 },
  },
  required: ['myField'],
}

function MyApp() {
  return (
    <Form.Handler schema={schema}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(i.p,{children:`After (v11):`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajvInstance = makeAjvInstance()
const schema: JSONSchema = {
  type: 'object',
  properties: {
    myField: { type: 'string', minLength: 3 },
  },
  required: ['myField'],
}

function MyApp() {
  return (
    <Form.Handler schema={schema} ajvInstance={ajvInstance}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Alternative`}),`: Consider using Zod schemas instead, which provide better TypeScript integration and are included by default:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myField: z.string().min(3),
})

function MyApp() {
  return (
    <Form.Handler schema={schema}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(i.h3,{children:`InputPassword moved to Field.Password`}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`InputPassword`}),` component has been moved to `,(0,r.jsx)(i.code,{children:`Field.Password`}),`, and is now a part of Eufemia Forms. Change your import statement from `,(0,r.jsx)(i.code,{children:`import InputPassword from '@dnb/eufemia/components/input/InputPassword'`}),` to `,(0,r.jsx)(i.code,{children:`import { Field } from '@dnb/eufemia/extensions/forms'`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`Docs: `,(0,r.jsx)(i.a,{href:`/uilib/components/input/`,children:`Input`}),`, `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/all-fields/`,children:`All Fields`})]}),`
`,(0,r.jsx)(i.h3,{children:`Error handling`}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`FormError`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`validationRule`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// From
new FormError('Invalid value', {
  validationRule: 'pattern',
})

// To
new FormError('Field.errorPattern')
`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove the `,(0,r.jsx)(i.code,{children:`validationRule`}),` parameter in favor of a translation key, like so: `,(0,r.jsx)(i.code,{children:`new FormError('Field.errorRequired')`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`errorMessages`}),` object`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`// From
const errorMessages = {
  pattern: 'Show this when "pattern" fails!',
}

// To
const errorMessages = {
  'Field.errorPattern': 'Show this when "pattern" fails!',
}
`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`required`}),` with `,(0,r.jsx)(i.code,{children:`Field.errorRequired`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`pattern`}),` with `,(0,r.jsx)(i.code,{children:`Field.errorPattern`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`minLength`}),` with `,(0,r.jsx)(i.code,{children:`StringField.errorMinLength`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`maxLength`}),` with `,(0,r.jsx)(i.code,{children:`StringField.errorMaxLength`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`minimum`}),` with `,(0,r.jsx)(i.code,{children:`NumberField.errorMinimum`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`maximum`}),` with `,(0,r.jsx)(i.code,{children:`NumberField.errorMaximum`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`exclusiveMinimum`}),` with `,(0,r.jsx)(i.code,{children:`NumberField.errorExclusiveMinimum`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`exclusiveMaximum`}),` with `,(0,r.jsx)(i.code,{children:`NumberField.errorExclusiveMaximum`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`multipleOf`}),` with `,(0,r.jsx)(i.code,{children:`NumberField.errorMultipleOf`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`useErrorMessage`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Removed. Provide your error messages as an object in the `,(0,r.jsx)(i.code,{children:`errorMessages`}),` property (e.g., with a `,(0,r.jsx)(i.code,{children:`useMemo`}),` hook).`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`See also: `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Form/error-messages/`,children:`Form error messages`}),`, `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Form/useValidation/`,children:`useValidation`})]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`continuousValidation`}),` with `,(0,r.jsx)(i.code,{children:`validateContinuously`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`withValue`}),` with `,(0,r.jsx)(i.code,{children:`hasValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`pathValue`}),` with using `,(0,r.jsx)(i.code,{children:`visibleWhen`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`whenValue`}),` with using `,(0,r.jsx)(i.code,{children:`visibleWhen`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Every `,(0,r.jsx)(i.code,{children:`Field.*`}),` component`]}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`continuousValidation`}),` with `,(0,r.jsx)(i.code,{children:`validateContinuously`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`validator`}),` with `,(0,r.jsx)(i.code,{children:`onChangeValidator`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`focusWhenOpen`}),` with `,(0,r.jsx)(i.code,{children:`focusOnOpen`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`Docs: `,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/all-fields/`,children:`All Fields`})]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`opened`}),` with `,(0,r.jsx)(i.code,{children:`open`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`onType`}),` event`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`start_date`}),` with `,(0,r.jsx)(i.code,{children:`startDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`end_date`}),` with `,(0,r.jsx)(i.code,{children:`endDate`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`is_valid`}),` with `,(0,r.jsx)(i.code,{children:`isValid`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Styling`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace CSS class `,(0,r.jsx)(i.code,{children:`dnb-date-picker--opened`}),` with `,(0,r.jsx)(i.code,{children:`dnb-date-picker--open`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/Expiry/`,children:`Field.Expiry`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The visible expiry segments are no longer native `,(0,r.jsx)(i.code,{children:`input`}),` elements. They are now exposed as section elements with `,(0,r.jsx)(i.code,{children:`role="spinbutton"`}),`. If you have Jest or DOM tests that query `,(0,r.jsx)(i.code,{children:`input`}),` or assert old input-specific ARIA attributes, update them to target the visible expiry field/segments instead.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`})}),`
`,(0,r.jsx)(i.h4,{children:`E.164 value format (breaking)`}),`
`,(0,r.jsxs)(i.p,{children:[`The component now emits values in E.164 format: `,(0,r.jsx)(i.code,{children:`"+4712345678"`}),` instead of `,(0,r.jsx)(i.code,{children:`"+47 12345678"`}),`. This applies to `,(0,r.jsx)(i.code,{children:`onChange`}),`, `,(0,r.jsx)(i.code,{children:`transformOut`}),`, the data context, and pattern/schema validation.`]}),`
`,(0,r.jsxs)(i.p,{children:[(0,r.jsx)(i.strong,{children:`Migration:`}),` If you relied on the space between the country code and the phone number, update your code to handle E.164 format. The `,(0,r.jsx)(i.code,{children:`additionalArgs`}),` second argument of `,(0,r.jsx)(i.code,{children:`onChange`}),` still provides `,(0,r.jsx)(i.code,{children:`countryCode`}),` and `,(0,r.jsx)(i.code,{children:`phoneNumber`}),` separately. Spaced values (e.g. `,(0,r.jsx)(i.code,{children:`"+47 12345678"`}),`) are not accepted as input to `,(0,r.jsx)(i.code,{children:`Field.PhoneNumber`}),` — use E.164 format without spaces. However, `,(0,r.jsx)(i.code,{children:`Value.PhoneNumber`}),` and `,(0,r.jsx)(i.code,{children:`NumberFormat`}),` do accept and format spaced values.`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you used a `,(0,r.jsx)(i.code,{children:`pattern`}),` or `,(0,r.jsx)(i.code,{children:`schema`}),` that matched the space-separated format (e.g. `,(0,r.jsx)(i.code,{children:`^\\+47 [49]+`}),`), remove the space from your pattern (e.g. `,(0,r.jsx)(i.code,{children:`^\\+47[49]+`}),`).`]}),`
`,(0,r.jsx)(i.h4,{children:`Auto-detection of country codes`}),`
`,(0,r.jsxs)(i.p,{children:[`The component now auto-detects country codes from E.164 values like `,(0,r.jsx)(i.code,{children:`"+4712345678"`}),` and `,(0,r.jsx)(i.code,{children:`00`}),`-prefixed values like `,(0,r.jsx)(i.code,{children:`"004712345678"`}),`. No `,(0,r.jsx)(i.code,{children:`transformIn`}),` is needed for standard formats.`]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`detectCountryCode`}),` utility`]}),`
`,(0,r.jsxs)(i.p,{children:[`A new `,(0,r.jsx)(i.code,{children:`detectCountryCode`}),` utility is available for detecting E.164 country codes from phone number strings.`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-ts`,children:`import detectCountryCode from '@dnb/eufemia/shared/detectCountryCode'
`})}),`
`,(0,r.jsx)(i.h4,{children:`Translations`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`PhoneNumber.label`}),` translation string with `,(0,r.jsx)(i.code,{children:`PhoneNumber.numberLabel`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/PostalCodeAndCity/`,children:`Field.PostalCodeAndCity`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`country`}),` with `,(0,r.jsx)(i.code,{children:`countryCode`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.code,{children:`radio-list`}),` variant has been removed. Use a composition pattern with `,(0,r.jsx)(i.a,{href:`/uilib/components/list/`,children:`List`}),` to build custom radio layouts (`,(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/base-fields/Selection/#radio-with-list-composition`,children:`example`}),`).`]}),`
`]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`autocompleteProps`}),` property`]}),`
`,(0,r.jsxs)(i.p,{children:[`See docs about changed `,(0,r.jsx)(i.a,{href:`/uilib/about-the-lib/releases/eufemia/v11-info/#autocomplete`,children:`Autocomplete properties`})]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`dropdownProps`}),` property`]}),`
`,(0,r.jsxs)(i.p,{children:[`See docs about changed `,(0,r.jsx)(i.a,{href:`/uilib/about-the-lib/releases/eufemia/v11-info/#dropdown`,children:`Dropdown properties`})]}),`
`,(0,r.jsxs)(i.h4,{children:[(0,r.jsx)(i.code,{children:`data`}),` property`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`selected_value`}),` with `,(0,r.jsx)(i.code,{children:`selectedValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`suffix_value`}),` with `,(0,r.jsx)(i.code,{children:`suffixValue`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`search_content`}),` with `,(0,r.jsx)(i.code,{children:`searchContent`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`class_name`}),` with `,(0,r.jsx)(i.code,{children:`className`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/feature-fields/more-fields/Password/`,children:`Field.Password`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace property `,(0,r.jsx)(i.code,{children:`show_password`}),` with translation `,(0,r.jsx)(i.code,{children:`Password.ariaLabelShow`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace property `,(0,r.jsx)(i.code,{children:`hide_password`}),` with translation `,(0,r.jsx)(i.code,{children:`Password.ariaLabelHide`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h4,{children:`Events`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_show_password`}),` with `,(0,r.jsx)(i.code,{children:`onShowPassword`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`on_hide_password`}),` with `,(0,r.jsx)(i.code,{children:`onHidePassword`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`requireCommit`}),` with `,(0,r.jsx)(i.code,{children:`preventUncommittedChanges`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`variant`}),`. No longer has any variants.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`scrollTopOnStepChange`}),`, as it's now enabled by default. You can disable it with `,(0,r.jsx)(i.code,{children:`omitScrollManagement`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Remove `,(0,r.jsx)(i.code,{children:`sidebarId`}),`. No longer has any sidebar. If an id is needed, use the `,(0,r.jsx)(i.code,{children:`id`}),` property.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Wizard.Provider`}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`Wizard.Provider`}),` export has changed. It now points to the `,(0,r.jsx)(i.code,{children:`WizardContext`}),` object itself instead of `,(0,r.jsx)(i.code,{children:`WizardContext.Provider`}),`, aligning with the React 19 deprecation of `,(0,r.jsx)(i.code,{children:`<Context.Provider>`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`The JSX usage (`,(0,r.jsx)(i.code,{children:`<Wizard.Provider value={...}>`}),`) remains the same — no changes needed in your templates. However, if you reference `,(0,r.jsx)(i.code,{children:`Wizard.Provider`}),` programmatically (e.g., identity checks against `,(0,r.jsx)(i.code,{children:`WizardContext.Provider`}),`), be aware that it is now the context object itself.`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`active`}),` with `,(0,r.jsx)(i.code,{children:`include`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`activeWhen`}),` with `,(0,r.jsx)(i.code,{children:`includeWhen`}),`.`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:(0,r.jsx)(i.a,{href:`/uilib/extensions/forms/DataContext/Provider/`,children:`DataContext.Provider`})}),`
`,(0,r.jsx)(i.h4,{children:`Properties`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`filterSubmitData`}),` by using the `,(0,r.jsx)(i.code,{children:`filterData`}),` function in the second event parameter of the `,(0,r.jsx)(i.code,{children:`onSubmit`}),` or `,(0,r.jsx)(i.code,{children:`onChange`}),` events.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`SCSS mixin renames`}),`
`,(0,r.jsxs)(i.p,{children:[`All SCSS mixins have been renamed to follow the `,(0,r.jsx)(i.strong,{children:`camelCase`}),` naming convention. If you `,(0,r.jsx)(i.code,{children:`@use`}),` Eufemia's SCSS source files directly and reference these mixins, update your `,(0,r.jsx)(i.code,{children:`@include`}),` calls:`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Utilities (`,(0,r.jsx)(i.code,{children:`style/core/utilities.scss`}),`)`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`focus-visible`}),` with `,(0,r.jsx)(i.code,{children:`focusVisible`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`IS_FF`}),` with `,(0,r.jsx)(i.code,{children:`isFirefox`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`IS_CHROME`}),` with `,(0,r.jsx)(i.code,{children:`isChrome`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`IS_SAFARI_MOBILE`}),` with `,(0,r.jsx)(i.code,{children:`isSafariMobile`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`IS_SAFARI_DESKTOP`}),` with `,(0,r.jsx)(i.code,{children:`isSafariDesktop`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`Typography (`,(0,r.jsx)(i.code,{children:`elements/typography/style/typography-mixins.scss`}),`)`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_xx-large`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeXxLarge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_x-large`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeXLarge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_large`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeLarge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_medium`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeMedium`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_basis`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeBasis`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_small`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeSmall`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSize_x-small`}),` with `,(0,r.jsx)(i.code,{children:`headingSizeXSmall`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`typography_lead`}),` with `,(0,r.jsx)(i.code,{children:`typographyLead`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSpacing_xx-large`}),` with `,(0,r.jsx)(i.code,{children:`headingSpacingXxLarge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSpacing_x-large`}),` with `,(0,r.jsx)(i.code,{children:`headingSpacingXLarge`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`headingSpacing_large`}),` with `,(0,r.jsx)(i.code,{children:`headingSpacingLarge`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(i.h3,{children:[`DrawerList (`,(0,r.jsx)(i.code,{children:`fragments/drawer-list/style/dnb-drawer-list.scss`}),`)`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace `,(0,r.jsx)(i.code,{children:`closDrawerList`}),` with `,(0,r.jsx)(i.code,{children:`closeDrawerList`}),` (typo fix).`]}),`
`]}),`
`,(0,r.jsxs)(i.h2,{children:[`SCSS: `,(0,r.jsx)(i.code,{children:`@import`}),` → `,(0,r.jsx)(i.code,{children:`@use`})]}),`
`,(0,r.jsxs)(i.p,{children:[`Eufemia's internal SCSS has been migrated from the deprecated `,(0,r.jsx)(i.code,{children:`@import`}),` to the Sass module system (`,(0,r.jsx)(i.code,{children:`@use`}),` / `,(0,r.jsx)(i.code,{children:`@forward`}),`). This does not change the compiled CSS output, but affects consumers who import Eufemia's SCSS source files directly.`]}),`
`,(0,r.jsx)(i.p,{children:`If you import Eufemia's SCSS utilities (e.g. for mixins or breakpoints), update your imports:`}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-scss`,children:`@import '@dnb/eufemia/style/core/utilities.scss';

@include allBelow(small) {
  // ...
}

div {
  max-width: map-get($breakpoints, medium);
}
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After:`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-scss`,children:`@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

@include utilities.allBelow(small) {
  // ...
}

div {
  max-width: map-get(utilities.$breakpoints, medium);
}
`})}),`
`,(0,r.jsxs)(i.p,{children:[`Using `,(0,r.jsx)(i.code,{children:`@import`}),` with Eufemia's SCSS source files still works, but will trigger Sass deprecation warnings. We recommend migrating to `,(0,r.jsx)(i.code,{children:`@use`}),`.`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you previously had `,(0,r.jsx)(i.code,{children:`silenceDeprecations: ['import']`}),` in your Sass config to suppress warnings from Eufemia, you can now remove it — Eufemia's own files no longer use `,(0,r.jsx)(i.code,{children:`@import`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`TypeScript`}),`
`,(0,r.jsxs)(i.p,{children:[`Several exported TypeScript `,(0,r.jsx)(i.code,{children:`interface`}),` declarations have been converted to `,(0,r.jsx)(i.code,{children:`type`}),` aliases for consistency. This is only a breaking change if you relied on `,(0,r.jsx)(i.a,{href:`https://www.typescriptlang.org/docs/handbook/declaration-merging.html`,children:`declaration merging`}),` to augment these interfaces. Standard usage of these types (e.g. importing and using them for props) is unaffected.`]}),`
`,(0,r.jsx)(i.p,{children:`Affected types include:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:`AvatarGroupProps`})}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`DataValueReadProps`}),`, `,(0,r.jsx)(i.code,{children:`DataValueWriteProps`}),`, `,(0,r.jsx)(i.code,{children:`UseFieldProps`}),`, `,(0,r.jsx)(i.code,{children:`ValueProps`}),` (from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/forms`}),`)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`PaymentCardRawData`}),`, `,(0,r.jsx)(i.code,{children:`CardDesign`}),`, `,(0,r.jsx)(i.code,{children:`PaymentCardProps`}),` (from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/extensions/payment-card`}),`)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`SharedStateReturn`}),` (from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/shared`}),`)`]}),`
`]}),`
`,(0,r.jsx)(i.h3,{children:`Context type renames`}),`
`,(0,r.jsxs)(i.p,{children:[`All React context value types have been renamed to use a consistent `,(0,r.jsx)(i.code,{children:`...ContextValue`}),` suffix. If you import any of these types directly, update your imports:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AccordionContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AccordionContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TooltipContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TooltipContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeadingContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeadingContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DrawerListContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DrawerListContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`UploadContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`UploadContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerContextValues`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CardContextState`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CardContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SliderContextTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SliderContextValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SkeletonContextProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SkeletonContextValue`})})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`ListContext`}),` type (which previously collided with the `,(0,r.jsx)(i.code,{children:`ListContext`}),` variable) has been renamed to `,(0,r.jsx)(i.code,{children:`ListContextValue`}),`.`]}),`
`,(0,r.jsx)(i.h3,{children:`Stuttering type name renames`}),`
`,(0,r.jsx)(i.p,{children:`Several exported types had redundant/repeated words in their names. These have been cleaned up:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InputInputElement`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InputElement`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TextareaTextareaElement`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TextareaElement`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationIndicatorIndicatorElement`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationIndicatorElement`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceTypesType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceSize`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceTypesPositiveValuesType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpacePositiveSize`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceTypesPositiveRemValuesType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpacePositiveRemValue`})})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Plural to singular type suffix`}),`
`,(0,r.jsxs)(i.p,{children:[`Types using a plural `,(0,r.jsx)(i.code,{children:`Types`}),` suffix have been renamed to use singular form for consistency:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionStyleTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionStyle`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormStatusIconTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormStatusIcon`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeightAnimationOnStartTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeightAnimationOnStart`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeightAnimationOnEndTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HeightAnimationOnEnd`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceStringTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SpaceStringValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FilterPropsValidationTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FilterPropsValidation`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DataAttributeTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DataAttributes`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`StateTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldState`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatType`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`UploadAcceptedFileTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`UploadAcceptedFiles`})})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Non-prefixed type renames`}),`
`,(0,r.jsx)(i.p,{children:`Several exported types lacked a component namespace prefix, risking name collisions. They have been prefixed:`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`End`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FlexEnd`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Start`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FlexStart`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Spans`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FlexSpans`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Span`}),` (flex)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FlexSpan`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`AllProps`}),` (Iterate/EditContainer)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`IterateEditContainerAllProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`AllProps`}),` (Iterate/ViewContainer)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`IterateViewContainerAllProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`AllProps`}),` (Iterate/PushContainer)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`IteratePushContainerAllProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`AllProps`}),` (Form/Section/EditContainer)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormSectionEditContainerAllProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`AllProps`}),` (Form/Section/ViewContainer)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormSectionViewContainerAllProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GroupProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AccordionGroupProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`StoreDataReturn`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AccordionStoreDataReturn`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`StoreOptions`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AccordionStoreOptions`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TextColor`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionTextColor`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`OutlineColor`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionOutlineColor`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`BackgroundColor`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionBackgroundColor`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DropShadow`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionDropShadow`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`RoundedCorner`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SectionRoundedCorner`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TriggeredBy`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ModalTriggeredBy`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CloseHandler`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ModalCloseHandler`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CloseHandlerParams`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ModalCloseHandlerParams`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`TriggerAttributes`}),` (modal)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ModalTriggerAttributes`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`TriggerAttributes`}),` (popover)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PopoverTriggerAttributes`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ValueTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SliderValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatTypes`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SliderNumberFormat`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ThumbState`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SliderThumbState`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DummyProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsDummyProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ContentWrapperProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsContentWrapperProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ContentWrapperSelectedKey`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsContentWrapperSelectedKey`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ContentWrapperChildren`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsContentWrapperChildren`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CustomContentProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsCustomContentProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CustomContentTitle`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsCustomContentTitle`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CustomContentChildren`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TabsCustomContentChildren`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AutoSizeProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SkeletonAutoSizeProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ElementsHiddenProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`AvatarElementsHiddenProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`LoadButtonProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationLoadButtonProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InfinityScrollerProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationInfinityScrollerProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InfinityLoadButtonProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationInfinityLoadButtonProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CreatePaginationReturn`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PaginationCreateReturn`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DateType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerDateType`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CalendarDay`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerCalendarDay`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CalendarNavigationEvent`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerCalendarNavigationEvent`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CalendarView`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerCalendarView`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ReturnObject`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerReturnObject`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InvalidDates`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerInvalidDates`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`PartialDates`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerPartialDates`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SubmittedDates`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DatePickerSubmittedDates`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatType`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatCurrencyPosition`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatCurrencyPosition`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatReturnValue`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatReturnValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatValue`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatValue`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatReturnType`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatReturnType`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatOptionParams`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`NumberFormatOptionParams`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormatDateOptions`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DateFormatOptions`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`RelativeTimeUnit`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DateFormatRelativeTimeUnit`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`StickyTableHeaderProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TableStickyHeaderProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SortState`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TableSortState`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SortEventHandler`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TableSortEventHandler`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SortHandler`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TableSortHandler`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`SubmitButtonProps`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`InputSubmitButtonProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CustomSize`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ProgressIndicatorCustomSize`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TimeLineItemStates`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`TimelineItemState`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Columns`}),` (grid/Item)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GridItemColumns`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Span`}),` (grid/Item)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GridItemSpan`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Media`}),` (grid/Item)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GridItemMedia`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Columns`}),` (grid/Container)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GridContainerColumns`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`Media`}),` (grid/Container)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`GridContainerMedia`})})]})]})]}),`
`,(0,r.jsx)(i.h3,{children:`Typed event handlers`}),`
`,(0,r.jsxs)(i.p,{children:[`All untyped event handler and render function prop types (`,(0,r.jsx)(i.code,{children:`(...args: any[]) => any`}),`) have been replaced with properly typed signatures. This is only a breaking change if your existing callback types are incompatible with the new, stricter signatures.`]}),`
`,(0,r.jsx)(i.p,{children:`New event types have been introduced for the affected components. You can import them directly:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import type { AccordionChangeEvent } from '@dnb/eufemia/components/Accordion'
import type {
  TabsEvent,
  TabsRenderComponents,
} from '@dnb/eufemia/components/Tabs'
import type {
  ToggleButtonChangeEvent,
  ToggleButtonGroupChangeEvent,
} from '@dnb/eufemia/components/ToggleButton'
import type {
  DrawerListEvent,
  DrawerListChangeEvent,
  DrawerListSelectEvent,
  DrawerListResizeEvent,
} from '@dnb/eufemia/fragments/DrawerList'
`})}),`
`,(0,r.jsx)(i.p,{children:`Affected components and props:`}),`
`,(0,r.jsx)(i.h4,{children:`Accordion`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: AccordionChangeEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsxs)(i.td,{children:[(0,r.jsx)(i.code,{children:`onInit`}),` (AccordionGroup)`]}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(accordion: AccordionInstance) => void`})})]})]})]}),`
`,(0,r.jsx)(i.h4,{children:`Tabs`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: TabsEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onClick`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: TabsEvent) => void | boolean`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onMouseEnter`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: TabsEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onFocus`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: TabsEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`render`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(components: TabsRenderComponents) => React.ReactNode`})})]})]})]}),`
`,(0,r.jsx)(i.h4,{children:`ToggleButton`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsx)(i.tbody,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: ToggleButtonChangeEvent) => void`})})]})})]}),`
`,(0,r.jsx)(i.h4,{children:`ToggleButton.Group`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsx)(i.tbody,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: ToggleButtonGroupChangeEvent) => void`})})]})})]}),`
`,(0,r.jsx)(i.h4,{children:`DrawerList`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onOpen`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onClose`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListChangeEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onPreChange`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListChangeEvent) => boolean | void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onResize`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListResizeEvent) => void`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onSelect`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(event: DrawerListSelectEvent) => void`})})]})]})]}),`
`,(0,r.jsx)(i.h4,{children:`ProgressIndicator`}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Prop`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsx)(i.tbody,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`onComplete`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`(...args: any[]) => any`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`() => void`})})]})})]}),`
`,(0,r.jsx)(i.h4,{children:`Render function / children types`}),`
`,(0,r.jsxs)(i.p,{children:[`Several component types that accepted `,(0,r.jsx)(i.code,{children:`(...args: any[]) => any`}),` for render functions, children, or display elements have been narrowed to `,(0,r.jsx)(i.code,{children:`() => React.ReactNode`}),`. This affects types such as `,(0,r.jsx)(i.code,{children:`AccordionHeaderTitle`}),`, `,(0,r.jsx)(i.code,{children:`AccordionHeaderDescription`}),`, `,(0,r.jsx)(i.code,{children:`NumberFormatPrefix`}),`, `,(0,r.jsx)(i.code,{children:`NumberFormatSuffix`}),`, `,(0,r.jsx)(i.code,{children:`NumberFormatTooltip`}),`, `,(0,r.jsx)(i.code,{children:`SkeletonFigure`}),`, `,(0,r.jsx)(i.code,{children:`SkeletonChildren`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButtonSuffix`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButtonChildren`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButtonGroupSuffix`}),`, `,(0,r.jsx)(i.code,{children:`ToggleButtonGroupChildren`}),`, `,(0,r.jsx)(i.code,{children:`PaymentCardChildren`}),`, `,(0,r.jsx)(i.code,{children:`TextareaChildren`}),`, and `,(0,r.jsx)(i.code,{children:`PaginationIndicatorElement`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`Theming`}),`
`,(0,r.jsx)(i.h3,{children:`Z-index CSS custom properties`}),`
`,(0,r.jsxs)(i.p,{children:[`All hardcoded `,(0,r.jsx)(i.code,{children:`z-index`}),` values across Eufemia components have been replaced with centralized CSS custom properties. If you have custom CSS that sets `,(0,r.jsx)(i.code,{children:`z-index`}),` to interact with Eufemia component layering, use these tokens instead of hardcoded values:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`CSS custom property`}),(0,r.jsx)(i.th,{children:`Value`}),(0,r.jsx)(i.th,{children:`Used for`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`--z-index-section`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`1`})}),(0,r.jsx)(i.td,{children:`Content sections`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`--z-index-dropdown`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`100`})}),(0,r.jsx)(i.td,{children:`Inline dropdowns, drawer lists`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`--z-index-popover`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`1000`})}),(0,r.jsx)(i.td,{children:`Popovers, floating elements`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`--z-index-tooltip`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`1100`})}),(0,r.jsx)(i.td,{children:`Tooltips (always above popovers)`})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`--z-index-modal`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`3000`})}),(0,r.jsx)(i.td,{children:`Dialogs, drawers, full-screen overlays`})]})]})]}),`
`,(0,r.jsxs)(i.p,{children:[`You can override these on `,(0,r.jsx)(i.code,{children:`:root`}),` or any wrapper element to adjust Eufemia's layering within your application:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-css`,children:`:root {
  --z-index-modal: 5000; /* raise modals above a third-party widget */
}
`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Replace import from path `,(0,r.jsx)(i.code,{children:`style/themes/theme-ui/`}),` with `,(0,r.jsx)(i.code,{children:`style/themes/ui/`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace import from path `,(0,r.jsx)(i.code,{children:`style/themes/theme-sbanken/`}),` with `,(0,r.jsx)(i.code,{children:`style/themes/sbanken/`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace import from path `,(0,r.jsx)(i.code,{children:`style/themes/theme-eiendom/`}),` with `,(0,r.jsx)(i.code,{children:`style/themes/eiendom/`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`Replace import from path `,(0,r.jsx)(i.code,{children:`style/themes/theme-carnegie/`}),` with `,(0,r.jsx)(i.code,{children:`style/themes/carnegie/`}),`.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.strong,{children:`ui-theme-tags`}),` CSS package has been removed. This package applied Eufemia styles to plain HTML tags (e.g. `,(0,r.jsx)(i.code,{children:`<h1>`}),`, `,(0,r.jsx)(i.code,{children:`<ul>`}),`) inside `,(0,r.jsx)(i.code,{children:`.dnb-core-style`}),`. Use class-based element selectors (e.g. `,(0,r.jsx)(i.code,{children:`dnb-h--xx-large`}),`) instead.`]}),`
`,(0,r.jsxs)(i.li,{children:[`The `,(0,r.jsx)(i.strong,{children:`ui-theme-fonts`}),` CSS package has been removed. Font faces and properties are already included in `,(0,r.jsx)(i.strong,{children:`ui-theme-basis`}),`, so a separate import is no longer needed.`]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`Props Type Exports`}),`
`,(0,r.jsxs)(i.p,{children:[`All `,(0,r.jsx)(i.code,{children:`export type Props`}),` declarations have been renamed to use a component-prefixed name to avoid ambiguity when re-exported through barrel files.`]}),`
`,(0,r.jsxs)(i.p,{children:[`If you import `,(0,r.jsx)(i.code,{children:`Props`}),` types from component modules, update your imports to use the new names:`]}),`
`,(0,r.jsxs)(i.table,{children:[(0,r.jsx)(i.thead,{children:(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.th,{children:`Module path`}),(0,r.jsx)(i.th,{children:`Before`}),(0,r.jsx)(i.th,{children:`After`})]})}),(0,r.jsxs)(i.tbody,{children:[(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`components/card`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`CardProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`components/flex/Horizontal`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`HorizontalProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`components/flex/Stack`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`StackProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`components/flex/Vertical`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`VerticalProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Field/String`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldStringProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Field/Number`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldNumberProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Field/Boolean`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldBooleanProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Field/Selection`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldSelectionProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Field/Toggle`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldToggleProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Value/String`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ValueStringProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Value/Number`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ValueNumberProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Form/Handler`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FormHandlerProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Iterate/Array`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`IterateArrayProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/Wizard/Step`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`WizardStepProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/FieldBlock`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`FieldBlockProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/ValueBlock`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`ValueBlockProps`})})]}),(0,r.jsxs)(i.tr,{children:[(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`extensions/forms/DataContext/Provider`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`Props`})}),(0,r.jsx)(i.td,{children:(0,r.jsx)(i.code,{children:`DataContextProviderProps`})})]})]})]}),`
`,(0,r.jsx)(i.p,{children:`The table above shows the most commonly used types. The same pattern applies to all Field, Value, Form, Iterate, and Wizard sub-components (91 types total).`}),`
`,(0,r.jsx)(i.p,{children:`For example, update:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-diff`,children:`-import type { Props as StringFieldProps } from '@dnb/eufemia/extensions/forms/Field/String'
+import type { FieldStringProps } from '@dnb/eufemia/extensions/forms/Field/String'
`})}),`
`,(0,r.jsxs)(i.p,{children:[`An ESLint rule (`,(0,r.jsx)(i.code,{children:`naming-conventions/no-bare-props-export`}),`) is now enforced to prevent re-introducing bare `,(0,r.jsx)(i.code,{children:`Props`}),` exports.`]}),`
`,(0,r.jsxs)(i.h2,{children:[(0,r.jsx)(i.code,{children:`createSpacingClasses`}),` replaced with `,(0,r.jsx)(i.code,{children:`applySpacing`})]}),`
`,(0,r.jsxs)(i.p,{children:[`The internal spacing helper `,(0,r.jsx)(i.code,{children:`createSpacingClasses`}),` has been removed and replaced by `,(0,r.jsx)(i.code,{children:`applySpacing`}),` that returns both the spacing CSS classes and any CSS custom properties in one call:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:`applySpacing(props, target)`}),` – merges spacing into an existing props object (append to `,(0,r.jsx)(i.code,{children:`className`}),`, merge into `,(0,r.jsx)(i.code,{children:`style`}),`). Recommended for most component root elements.`]}),`
`]}),`
`,(0,r.jsxs)(i.p,{children:[`It is re-exported from `,(0,r.jsx)(i.code,{children:`@dnb/eufemia/components/space/SpacingUtils`}),`.`]}),`
`,(0,r.jsx)(i.p,{children:`Migrate usages as shown below.`}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Before (v10):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { createSpacingClasses } from '@dnb/eufemia/components/space/SpacingUtils'

const mainParams = {
  className: clsx(
    'dnb-my-component',
    createSpacingClasses(props),
    className
  ),
}
`})}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`After (v11):`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { applySpacing } from '@dnb/eufemia/components/space/SpacingUtils'

const mainParams = applySpacing(props, {
  className: clsx('dnb-my-component', className),
})
`})}),`
`,(0,r.jsxs)(i.p,{children:[`The output CSS classes (`,(0,r.jsx)(i.code,{children:`dnb-space__top--large`}),`, etc.) are unchanged, so no styling needs to be updated.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.em,{children:`April 21, 2026`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};