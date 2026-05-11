import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n,{a as r,i,n as a,o,r as s,t as c}from"./demos-DQwnBhiD.js";var l=e();function u(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:`Import`}),`
`,(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:`language-tsx`,children:`import { InputMasked } from '@dnb/eufemia'
`})}),`
`,(0,l.jsx)(n.h2,{children:`Description`}),`
`,(0,l.jsxs)(n.p,{children:[`The InputMasked component uses the basic `,(0,l.jsx)(n.a,{href:`/uilib/components/input`,children:`Input`}),` component, but with input masking powered by `,(0,l.jsx)(n.a,{href:`https://maskito.dev/`,children:`Maskito`}),`.`]}),`
`,(0,l.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input-masked`,children:`Source code`})}),`
`,(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input-masked`,children:`Docs code`})}),`
`]}),`
`,(0,l.jsx)(n.h3,{children:`How it works`}),`
`,(0,l.jsxs)(n.p,{children:[`This component uses the basic `,(0,l.jsx)(n.a,{href:`/uilib/components/input`,children:`Input`}),` component with a set of additional options and features.`]}),`
`,(0,l.jsxs)(n.p,{children:[`You can either create your own mask using an array of RegExp and string tokens, a single RegExp, or use one of the provided number/currency masks. There are also masks that change based on different `,(0,l.jsx)(n.a,{href:`/uilib/components/input-masked/info?fullscreen#mask-based-on-locale`,children:`locales`}),` (`,(0,l.jsx)(n.code,{children:`asCurrency`}),` or `,(0,l.jsx)(n.code,{children:`asNumber`}),`).`]}),`
`,(0,l.jsxs)(n.p,{children:[`Array masks define the expected input character-by-character. Each RegExp in the array represents a user-editable slot, while strings act as fixed separator tokens. For example, `,(0,l.jsx)(n.code,{children:`[/[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/]`}),` creates a mask for a six-digit code with spaces after every two digits.`]}),`
`,(0,l.jsxs)(n.p,{children:[`You can also use `,(0,l.jsx)(n.code,{children:`allowOverflow`}),` to let users type beyond the defined mask length, and `,(0,l.jsx)(n.code,{children:`overwriteMode`}),` to control how characters are overwritten (`,(0,l.jsx)(n.code,{children:`shift`}),` moves to the next slot, `,(0,l.jsx)(n.code,{children:`replace`}),` stays on the current slot).`]}),`
`,(0,l.jsx)(n.h3,{children:`Accessibility`}),`
`,(0,l.jsx)(n.p,{children:`Screen readers will also read the mask before the user enters the content. Additionally, the user will hear the mask during typing. This behavior can have both positive and negative side effects for the user, but overall, it works well.`}),`
`,(0,l.jsxs)(n.p,{children:[`Both entering a comma or a dot will act as a decimal separator if `,(0,l.jsx)(n.a,{href:`/uilib/components/input-masked/#decimals`,children:`decimals are enabled`}),` and one of the internal masks for numbers is used.`]}),`
`,(0,l.jsx)(n.h4,{children:`InputMode`}),`
`,(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:`NB:`}),` Please do not set `,(0,l.jsx)(n.code,{children:`inputMode="numeric"`}),` or `,(0,l.jsx)(n.code,{children:`inputMode="decimal"`}),` because devices may or may not show a minus key (`,(0,l.jsx)(n.code,{children:`-`}),`)!`]}),`
`,(0,l.jsxs)(n.p,{children:[`The InputMasked component handles soft keyboards (iOS and Android) by using either `,(0,l.jsx)(n.code,{children:`inputMode="numeric"`}),` or `,(0,l.jsx)(n.code,{children:`inputMode="decimal"`}),`, depending on `,(0,l.jsx)(n.code,{children:`allowNegative`}),` and `,(0,l.jsx)(n.code,{children:`allowDecimal`}),` (getSoftKeyboardAttributes).`]}),`
`,(0,l.jsxs)(n.p,{children:[`For iOS it additionally sets `,(0,l.jsx)(n.code,{children:`type="number"`}),` during focus (InputModeNumber). This way the correct numeric soft keyboard is shown.`]}),`
`,(0,l.jsx)(r,{}),`
`,(0,l.jsx)(n.h3,{children:`Mask based on locale`}),`
`,(0,l.jsxs)(n.p,{children:[`The InputMasked component supports masks based on a given locale. The locale will be inherited from the `,(0,l.jsx)(n.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),` if not specified.`]}),`
`,(0,l.jsx)(n.p,{children:`You can enable these masks by setting:`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:`asCurrency="EUR"`})}),`
`,(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:`asNumber={true}`})}),`
`]}),`
`,(0,l.jsxs)(n.p,{children:[`You can still provide custom mask parameters to `,(0,l.jsx)(n.code,{children:`currencyMask={{ ... }}`}),` or `,(0,l.jsx)(n.code,{children:`numberMask={{ ... }}`}),`. Alternatively, you can use `,(0,l.jsx)(n.code,{children:`maskOptions={{ ... }}`}),` and provide your extra options there.`]}),`
`,(0,l.jsxs)(n.p,{children:[`More details in the `,(0,l.jsx)(n.a,{href:`/uilib/components/input-masked/demos`,children:`examples above`}),`.`]}),`
`,(0,l.jsx)(n.h4,{children:`Clean number values`}),`
`,(0,l.jsxs)(n.p,{children:[`If you use `,(0,l.jsx)(n.code,{children:`asCurrency`}),` or `,(0,l.jsx)(n.code,{children:`asNumber`}),`, you must always provide a clean number without any mask (`,(0,l.jsx)(n.code,{children:`value="1234.50"`}),`):`]}),`
`,(0,l.jsx)(c,{}),`
`,(0,l.jsx)(n.p,{children:`You can also receive a clean number value you can use and send back in again:`}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(n.h4,{children:`Decimals`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:`numberMask`}),` will default to no decimals`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:`currencyMask`}),` will default to no decimals`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:`asNumber`}),` will default to no decimals`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:`asCurrency`}),` will default to 2 decimals`]}),`
`]}),`
`,(0,l.jsxs)(n.p,{children:[`You can change the number of decimals by sending in options to the `,(0,l.jsx)(n.code,{children:`currencyMask`}),`, `,(0,l.jsx)(n.code,{children:`numberMask`}),`, or `,(0,l.jsx)(n.code,{children:`maskOptions`}),` (see example above).`]}),`
`,(0,l.jsxs)(n.p,{children:[`This example here also shows how to affect every InputMasked component in your application, by setting these options on the `,(0,l.jsx)(n.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`.`]}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsx)(i,{}),`
`,(0,l.jsxs)(n.p,{children:[`To remove a decimal limit, you can provide `,(0,l.jsx)(n.code,{children:`null`}),` and allow decimals with `,(0,l.jsx)(n.code,{children:`allowDecimal`}),`:`]}),`
`,(0,l.jsx)(o,{})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d,{}),`
`,(0,l.jsx)(n,{})]})}function p(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(f,{...e})}):f(e)}export{p as default};