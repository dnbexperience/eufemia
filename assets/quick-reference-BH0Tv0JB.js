import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Eufemia quick reference`}),`
`,(0,r.jsx)(t.p,{children:`This is a compact, practical guide for teams who already know they want Eufemia and need the fastest path to decisions and common patterns.`}),`
`,(0,r.jsx)(t.h2,{children:`Before you build`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Choose the brand theme`}),`:`,`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`ui`}),` (default), `,(0,r.jsx)(t.code,{children:`sbanken`}),`, `,(0,r.jsx)(t.code,{children:`carnegie`}),`, or `,(0,r.jsx)(t.code,{children:`eiendom`}),` (`,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming`,children:`theming`}),`).`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Form-heavy flow?`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Prefer the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Forms extension`}),` and `,(0,r.jsx)(t.code,{children:`Field.*`}),` components for validation and structure.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Multi-step journeys?`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard`,children:`Wizard`}),` for step navigation and focus management.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Loading states?`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Plan for `,(0,r.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` or `,(0,r.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),`.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Internationalization?`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Plan for `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/localization`,children:`localization and i18n`}),`.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Styling strategy?`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Decide how to `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`import styles`}),` and whether you need `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/style-isolation`,children:`style isolation`}),`.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Setup`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`npm i @dnb/eufemia react react-dom
`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`// App entry - import styles once
import '@dnb/eufemia/style'

// Components and other imports
import { Button, Input, Card, Dialog, Icon } from '@dnb/eufemia'
import { H1, H2, P } from '@dnb/eufemia'
import { Flex, Space } from '@dnb/eufemia'
import {
  Form,
  Field,
  Value,
  Wizard,
  Iterate,
  Connectors,
} from '@dnb/eufemia/extensions/forms'
import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'
import {
  Provider,
  Theme,
  useTheme,
  useSharedContext,
  useTranslation,
  useMedia,
} from '@dnb/eufemia/shared'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Key conventions`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Prefer `,(0,r.jsx)(t.a,{href:`/uilib/layout/flex`,children:`Flex`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Forms`}),` over other layout and form solutions.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Use `,(0,r.jsx)(t.code,{children:`Field.*`}),` components for user input and forms whenever available (all `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`fields`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Follow `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility`,children:`accessibility basics`}),` and avoid font sizes below 14px.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Use the `,(0,r.jsx)(t.a,{href:`/uilib/layout/spacing`,children:`spacing system`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/layout/space`,children:`Space`}),` instead of ad-hoc margins.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Import styles once at the app root (`,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style'`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Prefer `,(0,r.jsx)(t.a,{href:`/uilib/helpers`,children:`helpers and tools`}),` over custom one-off utilities.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Use `,(0,r.jsx)(t.a,{href:`/uilib/elements`,children:`HTML elements`}),` for semantic structure, even when not using components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Favor CSS custom properties and spacing helpers over hard-coded values (`,(0,r.jsx)(t.a,{href:`/uilib/layout/spacing`,children:`Spacing`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/typography`,children:`Typography`}),`).`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Detailed references`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/components`,children:`Components`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Forms extension`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/layout`,children:`Layout`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/usage/customisation`,children:`Styling and theming`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography`,children:`Typography`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/colors/`,children:`Colors`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming`,children:`Theming`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/icons`,children:`Icons`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`See `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Forms`}),` for validation, schema, and more fields.`]}),`
`,(0,r.jsx)(t.h2,{children:`Forms essentials`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Start with `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started`,children:`Getting started`}),` for forms patterns, validation, and data handling.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` for submit/validation and `,(0,r.jsx)(t.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` for error summaries.`]}),`
`,(0,r.jsxs)(t.li,{children:[`For multi-step flows, use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`For edit/view modes, use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section`,children:`Form.Section`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Prefer `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields`,children:`feature fields`}),` (e.g. `,(0,r.jsx)(t.code,{children:`Field.*`}),`) when available.`]}),`
`,(0,r.jsxs)(t.li,{children:[`For read-only outputs, use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value`,children:`Value components`}),` (e.g. `,(0,r.jsx)(t.code,{children:`Value.*`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Most `,(0,r.jsx)(t.code,{children:`Field.*`}),` components have a corresponding `,(0,r.jsx)(t.code,{children:`Value.*`}),` component; you can mix fields and values in the same form.`]}),`
`,(0,r.jsxs)(t.li,{children:[`For read-only summaries, use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList`,children:`Value.SummaryList`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Validation schemas can be provided via Zod or `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Connectors`,children:`AJV JSON Schema`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`AI instructions and skills`}),`
`,(0,r.jsx)(t.p,{children:`Eufemia's documentation is optimized for AI assistance. When generating or reviewing code, use the following sources in order of priority.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Use the documentation exactly as provided.`}),`
`,(0,r.jsx)(t.li,{children:`Gather all required information from the documentation before using it as a reference.`}),`
`,(0,r.jsx)(t.li,{children:`Do not make assumptions or infer missing details unless explicitly instructed to do so.`}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Versioned documentation (preferred)`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Install `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` with the package manager used in your project (e.g., npm, yarn, pnpm).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Find where `,(0,r.jsx)(t.code,{children:`node_modules`}),` is located in your project.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Read docs from `,(0,r.jsx)(t.code,{children:`node_modules/@dnb/eufemia/docs/uilib/usage/first-steps/quick-reference.md`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Follow relative links between markdown files.`}),`
`,(0,r.jsx)(t.li,{children:`Use this content as the primary reference.`}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Non-versioned documentation`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fetch `,(0,r.jsx)(t.code,{children:`https://eufemia.dnb.no/uilib/usage/first-steps/quick-reference.md`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Read docs from the fetched markdown file.`}),`
`,(0,r.jsx)(t.li,{children:`Follow absolute URLs for referenced markdown files.`}),`
`,(0,r.jsx)(t.li,{children:`Use this content as a reference only.`}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};