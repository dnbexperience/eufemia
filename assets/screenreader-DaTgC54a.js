import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Screen readers`}),`
`,(0,r.jsx)(t.p,{children:`In order for screen reader users to be able to properly navigate and access content, you need to architect and develop navigation and content presentation with screen readers in mind.`}),`
`,(0,r.jsxs)(t.p,{children:[`To avoid much work afterwards, make sure you actually check your application with a screen reader `,(0,r.jsx)(t.strong,{children:`regularly during development`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Mobile`}),`
`,(0,r.jsxs)(t.p,{children:[`Also, screen readers `,(0,r.jsx)(t.strong,{children:`behave differently`}),` on mobile phones than desktop browsers. So, use both in your frontend tooling.`]}),`
`,(0,r.jsx)(t.h2,{children:`Focus Highlight for NVDA`}),`
`,(0,r.jsxs)(t.p,{children:[`If you are using NVDA on Windows to test your application, there is an NVDA add-on, called `,(0,r.jsx)(t.a,{href:`https://addons.nvda-project.org/addons/focusHighlight.en.html`,children:`Focus Highlight`}),`, showing the current focus visually. This makes it so much easier to navigate and understand where you currently are in the context.`]}),`
`,(0,r.jsx)(t.h2,{children:`Images and illustrations`}),`
`,(0,r.jsxs)(t.p,{children:[`Example usage of `,(0,r.jsx)(t.code,{children:`role`}),`, `,(0,r.jsx)(t.code,{children:`aria-label`}),`, `,(0,r.jsx)(t.code,{children:`aria-labelledby`}),` and `,(0,r.jsx)(t.code,{children:`aria-hidden`}),`. There is no one fits all. It depends on the situation what accessibility features you have to prefer over others. But in general:`]}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsx)(t.p,{children:`Try to use HTML 5 first, and use ARIA as sugar on top.`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`Some random examples of image and illustration usage:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<a class="dnb-anchor" aria-label="descriptive text" href="/action">
  <svg aria-hidden="true">icon only ...</svg>
</a>

<a class="dnb-anchor" href="/action">
  <svg>
    <title>descriptive text</title>
    icon only ...
  </svg>
</a>

<img role="presentation" aria-label="descriptive text" src="..." />

<svg role="img" alt="descriptive text" src="..." />

<figure>
  <img alt="image alt" src="..." aria-hidden="true" />
  <figcaption>Descriptive text <cite>reference etc.</cite></figcaption>
</figure>

<object data="..." aria-labelledby="figure-id" />
<label id="figure-id">descriptive text</label>
`})}),`
`,(0,r.jsx)(t.h2,{children:`Usage of aria-label, aria-labelledby, and aria-describedby`}),`
`,(0,r.jsxs)(t.p,{children:[`There are limitations to when or where you can use `,(0,r.jsx)(t.code,{children:`aria-label`}),`, `,(0,r.jsx)(t.code,{children:`aria-labelledby`}),`, and `,(0,r.jsx)(t.code,{children:`aria-describedby`}),` attributes, because they do not work consistently with all HTML elements.`]}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`aria-label`}),` and `,(0,r.jsx)(t.code,{children:`aria-labelledby`}),` attributes can be used to give an element an accessible name.
The `,(0,r.jsx)(t.code,{children:`aria-describedby`}),` attribute can be used to give an element an accessible description.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Do `,(0,r.jsx)(t.strong,{children:`not`}),` use `,(0,r.jsx)(t.code,{children:`aria-label`}),`, `,(0,r.jsx)(t.code,{children:`aria-labelledby`}),`, or `,(0,r.jsx)(t.code,{children:`aria-describedby`}),` with any other elements like:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`div`}),`, `,(0,r.jsx)(t.code,{children:`span`}),`, `,(0,r.jsx)(t.code,{children:`p`}),`, `,(0,r.jsx)(t.code,{children:`blockquote`}),`, or `,(0,r.jsx)(t.code,{children:`strong`}),` etc.`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`they generally won’t work across all assistive technology combinations (screen readers).`}),`
`,(0,r.jsx)(t.h3,{children:`Where can I use them?`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`aria-label`}),`, `,(0,r.jsx)(t.code,{children:`aria-labelledby`}),`, and `,(0,r.jsx)(t.code,{children:`aria-describedby`}),` attributes can be used with:`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`interactive HTML elements like `,(0,r.jsx)(t.code,{children:`<a>`}),` (when the href attribute is present), `,(0,r.jsx)(t.code,{children:`audio`}),` and `,(0,r.jsx)(t.code,{children:`video`}),` (when the controls attribute is present), `,(0,r.jsx)(t.code,{children:`input`}),` (unless they are of type="hidden"), `,(0,r.jsx)(t.code,{children:`button`}),`, and `,(0,r.jsx)(t.code,{children:`textarea`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`elements that have a landmark role – either implicit (`,(0,r.jsx)(t.code,{children:`header`}),`, `,(0,r.jsx)(t.code,{children:`footer`}),`, `,(0,r.jsx)(t.code,{children:`main`}),`, `,(0,r.jsx)(t.code,{children:`nav`}),`, `,(0,r.jsx)(t.code,{children:`aside`}),`, `,(0,r.jsx)(t.code,{children:`section`}),`, and `,(0,r.jsx)(t.code,{children:`form`}),`) or explicitly set via the role attribute.`]}),`
`,(0,r.jsxs)(t.li,{children:[`elements that have an explicit widget role applied, using the role attribute – there are 27 widget roles in ARIA 1.1, including `,(0,r.jsx)(t.code,{children:`dialog`}),`, `,(0,r.jsx)(t.code,{children:`slider`}),`, `,(0,r.jsx)(t.code,{children:`progressbar`}),`, and `,(0,r.jsx)(t.code,{children:`tooltip`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`elements like `,(0,r.jsx)(t.code,{children:`img`}),`, `,(0,r.jsx)(t.code,{children:`figure`}),` and `,(0,r.jsx)(t.code,{children:`iframe`}),`.`]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};