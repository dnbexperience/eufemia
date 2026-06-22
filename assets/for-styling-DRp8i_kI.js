import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`CSS and Styling`}),`
`,(0,r.jsx)(t.p,{children:`One can be forgiven for assuming that CSS is easy. After all, your stylesheets will probably work even when there are mistakes in them. However, this 'freedom' can be a trap.`}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsx)(t.p,{children:`It is crucial to do CSS right from the very beginning.`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`Otherwise, you will find yourself making a fix of a fix, and so on. Also, refactoring and enhancements will often affect code deeper down as well.`}),`
`,(0,r.jsx)(t.h2,{children:`Styling structure`}),`
`,(0,r.jsx)(t.p,{children:`To write more structured and uniform CSS code, so both you and your coworkers can more easily read and use your code. It even helps during development, because you are always aware of what CSS properties you have already used.`}),`
`,(0,r.jsx)(t.p,{children:`Using the same principles helps coworkers quickly find and understand the structure and meaning of your CSS code.`}),`
`,(0,r.jsx)(t.h3,{children:`Rational CSS properties order`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`Start with the most influential and important properties first, then work progressively toward aesthetics and animations.`}),`
`,(0,r.jsx)(t.li,{children:`Leave one empty line between these "logical" groups.`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`For the "logical" groups we recommend the following rational order principle:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`.my-selector {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0;
  z-index: 10;
  display: flex;

  /* Box Model */
  width: 16rem;
  height: 16rem;
  margin: 2rem;
  padding: 1rem;
  color: #111;

  /* Typography */
  font:
    normal 1rem Helvetica,
    sans-serif;
  line-height: 1.5rem;
  text-align: left;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 0.25rem;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
  cursor: pointer;
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`You may check out this `,(0,r.jsx)(t.a,{href:`https://www.npmjs.com/package/prettier-plugin-rational-order`,children:`Prettier Plugin`}),` for handling it automatic with `,(0,r.jsx)(t.a,{href:`https://prettier.io/`,children:`prettier`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`CSS Units`}),`
`,(0,r.jsx)(t.p,{children:`Here is a list of what we should use as layout and styling units to embrace the best possible accessibility experience and visual correctness.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`rem`})}),`: Use `,(0,r.jsx)(t.em,{children:`rem`}),` as a default sizing unit - as long as no other unit if preferred.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`em`})}),`: Use `,(0,r.jsx)(t.em,{children:`em`}),` only on complex layouts, whenever you need the sizes to respond to constraints.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`px`})}),`: Use `,(0,r.jsx)(t.em,{children:`pixels`}),` on visual helper lines and borders. Borders do not necessarily need to be responsive.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:`viewport units and percentage`})}),`: Use these units to make layout and component widths responsive. Use also for placing and positioning layout wrappers which can give a better user experience.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.em,{children:`em`}),` for CSS `,(0,r.jsx)(t.code,{children:`@media`}),` queries for the best browser compatibility. Read more about `,(0,r.jsx)(t.a,{href:`/uilib/layout/media-queries`,children:`viewport units, Media Queries and breakpoints`}),`.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};