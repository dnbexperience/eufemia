import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,input:`input`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Accessibility Checklist`}),`
`,(0,r.jsxs)(t.ul,{className:`contains-task-list`,children:[`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Follow `,(0,r.jsx)(t.strong,{children:`semantics`}),` properly, use `,(0,r.jsx)(t.strong,{children:`landmarks`}),` (`,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/checklist/#landmark--and-semantics-example`,children:`landmark and semantic example`}),`).`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Ensure correct `,(0,r.jsx)(t.a,{href:`/uilib/usage/best-practices/for-typography#headings-and-styling`,children:`heading levels`}),`.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Use different `,(0,r.jsx)(t.strong,{children:`screen readers`}),` and test `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader`,children:`regularly`}),`.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Make sure, `,(0,r.jsx)(t.a,{href:`/uilib/layout`,children:`everything is responsive`}),` - use mostly the `,(0,r.jsx)(t.code,{children:`rem`}),` `,(0,r.jsx)(t.a,{href:`/uilib/usage/best-practices/for-styling#css-units`,children:`unit`}),`.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Make everything accessible for `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility#keyboard-users`,children:`keyboard navigation only`}),` and handle `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/focus#managing-focus-state`,children:`focus management`}),` properly.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Group form elements inside `,(0,r.jsx)(t.code,{children:`<fieldset />`}),` and `,(0,r.jsx)(t.code,{children:`<legend />`}),`. The `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` is doing this by default.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Do never expose a form element as `,(0,r.jsx)(t.code,{children:`disabled`}),` to the user. Use good UX instead.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Have a `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/focus#skip-link`,children:`Skip Link`}),` in place if the user has to tab many times to reach the main content.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Use the `,(0,r.jsx)(t.a,{href:`/uilib/components/skip-content/`,children:`SkipContent`}),` helper to let the user skip large parts of content, while using keyboard navigation.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Use the `,(0,r.jsx)(t.a,{href:`/uilib/components/aria-live`,children:`AriaLive`}),` component to automatically inform users using a screen reader, about changes on the screen that they didn't initiate.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Make good use of `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader#usage-of-aria-label-aria-labelledby-and-aria-describedby`,children:(0,r.jsx)(t.code,{children:`aria-label`})}),` and `,(0,r.jsx)(t.code,{children:`aria-hidden`}),`, e.g. of `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/icons#decorative-icons`,children:`decorative content`}),`.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Make `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader#images-and-illustrations`,children:`images and illustrations`}),` accessible.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Have `,(0,r.jsx)(t.code,{children:`aria-live`}),` in place for dynamic content, like updates coming from the server.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Hide `,(0,r.jsx)(t.strong,{children:`invisible content`}),` with `,(0,r.jsx)(t.code,{children:`display: none;`}),` or with the `,(0,r.jsx)(t.code,{children:`hidden`}),` attribute, or remove the markup entirely (with React States).`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Properly use the `,(0,r.jsx)(t.code,{children:`for="#id"`}),` attribute on `,(0,r.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Attributes`,children:`labels`}),`. Every `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`form component`}),` is supporting internal label usage, like `,(0,r.jsx)(t.code,{children:`<Input label="Input label:" />`}),`.`]}),`
`,(0,r.jsxs)(t.li,{className:`task-list-item`,children:[(0,r.jsx)(t.input,{type:`checkbox`,disabled:!0}),` `,`Allow viewport zooming in web pages. Example below.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Viewport`}),`
`,(0,r.jsx)(t.p,{children:`Allow zooming in web pages, especially important on touch devices.`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
/>
`})}),`
`,(0,r.jsx)(t.h2,{children:`Landmark- and semantics example`}),`
`,(0,r.jsxs)(t.p,{children:[`Example usage of HTML5 `,(0,r.jsx)(t.code,{children:`landmarks`}),` (e.g. `,(0,r.jsx)(t.code,{children:`<nav>`}),` or `,(0,r.jsx)(t.code,{children:`<section>`}),` etc.):`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-html`,children:`<body>
  <header>Header</header>
  <nav>Main navigation landmark</nav>

  <main>

    <section aria-label="I need a label to be a region landmark">
      <h1 class="dnb-h--large">h1 styled as h2</h1>
      <p class="dnb-o">text</p>
    </section>

    <article aria-labelledby="article-1">
      <h2 id="article-1" class="dnb-h--xx-large">h2 styled as h1</h2>
      <h3 class="dnb-h--medium">h3</h2>
      <h4 class="dnb-h--basis">h4</h2>
      ...
    </article>

    <article aria-labelledby="article-2">
      <header>I'm not a landmark anymore, because I'm inside article</header>
      <h2 id="article-2" class="dnb-h--large">Another article h2</h2>
      ...
      <footer>I'm not a landmark anymore, because I'm inside article</footer>
    </article>

  </main>

  <aside>Aside the main landmark</aside>

  <footer>Footer landmark</footer>
</body>
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about `,(0,r.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html`,children:`HTML landmarks and sectioning elements`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Practical Support of ARIA labels`}),`
`,(0,r.jsxs)(t.p,{children:[`You may be interested to read more about aria labels in the `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader#usage-of-aria-label-aria-labelledby-and-aria-describedby`,children:`Screen readers section`}),`.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};