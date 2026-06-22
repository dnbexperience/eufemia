import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r,{a as i,i as a,n as o,o as s,r as c,t as l}from"./demos-D_T8vJMg.js";var u=e(t());function d(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Import`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { InputMasked } from '@dnb/eufemia'
`})}),`
`,(0,u.jsx)(t.h2,{children:`Description`}),`
`,(0,u.jsxs)(t.p,{children:[`The InputMasked component uses the basic `,(0,u.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` component, but with input masking powered by `,(0,u.jsx)(t.a,{href:`https://maskito.dev/`,children:`Maskito`}),`.`]}),`
`,(0,u.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input-masked`,children:`Source code`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input-masked`,children:`Docs code`})}),`
`]}),`
`,(0,u.jsx)(t.h3,{children:`How it works`}),`
`,(0,u.jsxs)(t.p,{children:[`This component uses the basic `,(0,u.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` component with a set of additional options and features.`]}),`
`,(0,u.jsxs)(t.p,{children:[`You can either create your own mask using an array of RegExp and string tokens, a single RegExp, or use one of the provided number/currency masks. There are also masks that change based on different `,(0,u.jsx)(t.a,{href:`/uilib/components/input-masked/info?fullscreen#mask-based-on-locale`,children:`locales`}),` (`,(0,u.jsx)(t.code,{children:`asCurrency`}),` or `,(0,u.jsx)(t.code,{children:`asNumber`}),`).`]}),`
`,(0,u.jsxs)(t.p,{children:[`Array masks define the expected input character-by-character. Each RegExp in the array represents a user-editable slot, while strings act as fixed separator tokens. For example, `,(0,u.jsx)(t.code,{children:`[/[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/]`}),` creates a mask for a six-digit code with spaces after every two digits.`]}),`
`,(0,u.jsxs)(t.p,{children:[`You can also use `,(0,u.jsx)(t.code,{children:`allowOverflow`}),` to let users type beyond the defined mask length, and `,(0,u.jsx)(t.code,{children:`overwriteMode`}),` to control how characters are overwritten (`,(0,u.jsx)(t.code,{children:`shift`}),` moves to the next slot, `,(0,u.jsx)(t.code,{children:`replace`}),` stays on the current slot).`]}),`
`,(0,u.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,u.jsx)(t.p,{children:`Screen readers will also read the mask before the user enters the content. Additionally, the user will hear the mask during typing. This behavior can have both positive and negative side effects for the user, but overall, it works well.`}),`
`,(0,u.jsxs)(t.p,{children:[`Entering either a comma or a dot will act as a decimal separator if `,(0,u.jsx)(t.a,{href:`/uilib/components/input-masked/#decimals`,children:`decimals are enabled`}),` and one of the internal masks for numbers is used.`]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Note:`}),` When pasting values that contain a dot (`,(0,u.jsx)(t.code,{children:`.`}),`) in a locale where the dot is not the native decimal or thousands separator (e.g. Norwegian), the component uses a heuristic to disambiguate: a dot followed by exactly three digits is treated as a thousands separator and removed, while any other dot is treated as a decimal separator. For example, pasting `,(0,u.jsx)(t.code,{children:`20.500`}),` in Norwegian locale produces 20 500 (twenty thousand five hundred), while pasting `,(0,u.jsx)(t.code,{children:`20.5`}),` produces 20,5 (twenty point five). Values with a leading zero (e.g. `,(0,u.jsx)(t.code,{children:`0.500`}),`) are always treated as decimals. Be aware that a dot-decimal value with exactly three fractional digits (e.g. `,(0,u.jsx)(t.code,{children:`2.000`}),` meaning 2.0) will be interpreted as thousands (2 000) — this is an inherent limitation of the heuristic. Commas are only treated as thousands separators when multiple comma-separated groups appear (e.g. `,(0,u.jsx)(t.code,{children:`1,234,567`}),`); a single trailing `,(0,u.jsx)(t.code,{children:`,###`}),` is kept as a decimal. When both dots and commas are present (e.g. `,(0,u.jsx)(t.code,{children:`1,234.56`}),` or `,(0,u.jsx)(t.code,{children:`1.234,56`}),`), the rightmost separator is always treated as the decimal and the others as thousands separators.`]}),`
`,(0,u.jsx)(t.h4,{children:`InputMode`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`NB:`}),` Please do not set `,(0,u.jsx)(t.code,{children:`inputMode="numeric"`}),` or `,(0,u.jsx)(t.code,{children:`inputMode="decimal"`}),` because devices may or may not show a minus key (`,(0,u.jsx)(t.code,{children:`-`}),`)!`]}),`
`,(0,u.jsxs)(t.p,{children:[`The InputMasked component handles soft keyboards (iOS and Android) by using either `,(0,u.jsx)(t.code,{children:`inputMode="numeric"`}),` or `,(0,u.jsx)(t.code,{children:`inputMode="decimal"`}),`, depending on `,(0,u.jsx)(t.code,{children:`allowNegative`}),` and `,(0,u.jsx)(t.code,{children:`allowDecimal`}),` (getSoftKeyboardAttributes).`]}),`
`,(0,u.jsxs)(t.p,{children:[`For iOS, it additionally sets `,(0,u.jsx)(t.code,{children:`type="number"`}),` during focus (InputModeNumber). This way, the correct numeric soft keyboard is shown.`]}),`
`,(0,u.jsx)(i,{}),`
`,(0,u.jsx)(t.h3,{children:`Mask based on locale`}),`
`,(0,u.jsxs)(t.p,{children:[`The InputMasked component supports masks based on a given locale. The locale will be inherited from the `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),` if not specified.`]}),`
`,(0,u.jsx)(t.p,{children:`You can enable these masks by setting:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`asCurrency="EUR"`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`asNumber={true}`})}),`
`]}),`
`,(0,u.jsxs)(t.p,{children:[`You can still provide custom mask parameters to `,(0,u.jsx)(t.code,{children:`currencyMask={{ ... }}`}),` or `,(0,u.jsx)(t.code,{children:`numberMask={{ ... }}`}),`. Alternatively, you can use `,(0,u.jsx)(t.code,{children:`maskOptions={{ ... }}`}),` and provide your extra options there.`]}),`
`,(0,u.jsxs)(t.p,{children:[`More details in the `,(0,u.jsx)(t.a,{href:`/uilib/components/input-masked/demos`,children:`examples above`}),`.`]}),`
`,(0,u.jsx)(t.h4,{children:`Clean number values`}),`
`,(0,u.jsxs)(t.p,{children:[`If you use `,(0,u.jsx)(t.code,{children:`asCurrency`}),` or `,(0,u.jsx)(t.code,{children:`asNumber`}),`, you must always provide a clean number without any mask (`,(0,u.jsx)(t.code,{children:`value="1234.50"`}),`):`]}),`
`,(0,u.jsx)(l,{}),`
`,(0,u.jsx)(t.p,{children:`You can also receive a clean number value you can use and pass back in:`}),`
`,(0,u.jsx)(o,{}),`
`,(0,u.jsx)(t.h4,{children:`Decimals`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`numberMask`}),` will default to no decimals`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`currencyMask`}),` will default to no decimals`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`asNumber`}),` will default to no decimals`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`asCurrency`}),` will default to 2 decimals`]}),`
`]}),`
`,(0,u.jsxs)(t.p,{children:[`You can change the number of decimals by sending in options to the `,(0,u.jsx)(t.code,{children:`currencyMask`}),`, `,(0,u.jsx)(t.code,{children:`numberMask`}),`, or `,(0,u.jsx)(t.code,{children:`maskOptions`}),` (see example above).`]}),`
`,(0,u.jsxs)(t.p,{children:[`This example also shows how to affect every InputMasked component in your application by setting these options on the `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`.`]}),`
`,(0,u.jsx)(c,{}),`
`,(0,u.jsx)(a,{}),`
`,(0,u.jsxs)(t.p,{children:[`To remove a decimal limit, you can provide `,(0,u.jsx)(t.code,{children:`null`}),` and allow decimals with `,(0,u.jsx)(t.code,{children:`allowDecimal`}),`:`]}),`
`,(0,u.jsx)(s,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(d,{...e})}):d(e)}function p(e){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{}),`
`,(0,u.jsx)(r,{})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}export{m as default};