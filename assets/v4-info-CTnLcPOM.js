import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`v4`}),`
`,(0,n.jsx)(r.p,{children:`All the major edge cases as listed below:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#component-wrappers`,children:`Component wrappers`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#dropdown-event-handling`,children:`Dropdown event handling`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#switch-label-position`,children:`Switch label position`}),` `,(0,n.jsx)(r.strong,{children:`(minor change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#layout-and-spacing`,children:`Layout/Spacing components`}),` `,(0,n.jsx)(r.strong,{children:`(new)`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#install`,children:`How to Install`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Component wrappers`}),`
`,(0,n.jsxs)(r.p,{children:[`Every component that provides a `,(0,n.jsx)(r.code,{children:`label`}),` property is now wrapping the `,(0,n.jsx)(r.code,{children:`FormLabel`}),` inside itself.`]}),`
`,(0,n.jsxs)(r.blockquote,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Note:`}),` This is not a breaking change, but if you have made CSS styling to the component, then this can cause some issues.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`To select and change the component `,(0,n.jsx)(r.strong,{children:`inside`}),` with CSS, you can use now the `,(0,n.jsx)(r.code,{children:`*__inner`}),` wrapper. But - for sure, it depends on your customization made with v3.`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Before`}),` (v3):`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Input label="Label" className="my-input" />

// Will result in:
<label>Label</label>
<span class="dnb-input my-input">
  <input class="dnb-input__input" />
  ...
</span>
`})}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`After`}),` (v4):`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Input label="Label" className="my-input" />

// Will result in:
<span class="dnb-input my-input">
  <label>Label</label>
  <span class="dnb-input__inner">
    <input class="dnb-input__input" />
    ...
  </span>
</span>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Dropdown event handling`}),`
`,(0,n.jsxs)(r.p,{children:[`Did you use `,(0,n.jsx)(r.code,{children:`on_select`}),` before? Then make sure you double-check that you really want `,(0,n.jsx)(r.code,{children:`on_select`}),`. In most cases, you will only need `,(0,n.jsx)(r.code,{children:`on_change`}),`. `,(0,n.jsx)(r.a,{href:`/uilib/components/dropdown/events`,children:`Read more about the difference`}),` between `,(0,n.jsx)(r.code,{children:`on_change`}),` and `,(0,n.jsx)(r.code,{children:`on_select`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Switch label position`}),`
`,(0,n.jsxs)(r.p,{children:[`Now the `,(0,n.jsx)(r.a,{href:`/uilib/components/switch`,children:`Switch`}),` component has `,(0,n.jsx)(r.code,{children:`right`}),` as the default `,(0,n.jsx)(r.code,{children:`label_position`}),` unlike in v3. The reason is to make it consistent with both the `,(0,n.jsx)(r.a,{href:`/uilib/components/radio`,children:`Radio`}),` button and the `,(0,n.jsx)(r.a,{href:`/uilib/components/checkbox`,children:`Checkbox`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Layout and Spacing`}),`
`,(0,n.jsx)(r.p,{children:`Spacing is an important part of Eufemia, that's why there are now three new helper components to make it easy and fast to build forms and layouts with proper spacing.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`FormSet provides by default the `,(0,n.jsx)(r.code,{children:`<form>`}),` tag and sends some `,(0,n.jsx)(r.code,{children:`FormRow`}),` properties along down.`]}),`
`,(0,n.jsxs)(r.li,{children:[`FormRow provides by default the `,(0,n.jsx)(r.code,{children:`<fieldset>`}),` tag and `,(0,n.jsx)(r.code,{children:`<legend>`}),` tag. `,(0,n.jsx)(r.code,{children:`FormRow`}),` is meant to help you achieve easily common DNB layout patterns and setups. Also, `,(0,n.jsx)(r.code,{children:`FormRow`}),` is supporting the `,(0,n.jsx)(r.code,{children:`Spacing`}),` component.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/uilib/layout/space`,children:`Space`}),` is made to achieve the Eufemia `,(0,n.jsx)(r.a,{href:`/uilib/usage/layout/spacing#spacing-helpers`,children:`spacing patterns`}),`. In other words; `,(0,n.jsx)(r.em,{children:`margin`}),` within the provided spacing blocks.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Components and Spacing`}),`
`,(0,n.jsxs)(r.p,{children:[`In v4, all components have the properties `,(0,n.jsx)(r.code,{children:`top`}),`, `,(0,n.jsx)(r.code,{children:`right`}),`, `,(0,n.jsx)(r.code,{children:`bottom`}),` and `,(0,n.jsx)(r.code,{children:`left`}),` available to define `,(0,n.jsx)(r.a,{href:`/uilib/layout/space#components-and-spacing`,children:`spacing directly`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`E.g. this `,(0,n.jsx)(r.code,{children:`right="small"`}),` will give you a spacing of `,(0,n.jsx)(r.code,{children:`8rem`}),` to the left side.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Input label="My Input" right="small" />
`})}),`
`,(0,n.jsx)(r.h2,{children:`Install`}),`
`,(0,n.jsx)(r.p,{children:`To upgrade to v4 with NPM, use:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@4
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`July, 21. 2019`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};