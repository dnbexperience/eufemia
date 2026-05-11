import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./Card-BHltANSX.js";import{In as n,_ as r,xr as i,y as a}from"./index-DVm0MbGb.js";var o=e();function s(e){let{url:t,title:r,about:a,icon:s}=e;return(0,o.jsx)(c,{children:(0,o.jsx)(l,{to:t,children:(0,o.jsxs)(u,{stack:!0,dropShadow:!0,children:[s&&(0,o.jsx)(s,{}),(0,o.jsx)(n,{className:`dnb-p--lead`,children:r}),(0,o.jsx)(n,{top:`x-small`,children:a}),(0,o.jsx)(i,{variant:`tertiary`,icon:`chevron_right`,text:`Read more`,tabIndex:-1,element:`span`})]})})})}var c=a.li`
  list-style-type: none;
  width: calc(33.333333% - 1rem);

  &:hover {
    z-index: 1;
  }

  @media screen and (max-width: 60em) {
    width: calc(50% - 1rem);
  }
  @media screen and (min-width: 40em) {
    margin: 0.5rem;
  }
  @media screen and (max-width: 40em) {
    width: 100%;
    text-align: center;

    .dnb-card {
      align-items: center;

      > .dnb-flex-container--align-stretch > .dnb-button {
        align-self: center;
      }
    }
  }
`,l=a(r)`
  outline: none;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }

  &:hover .dnb-card {
    --card-outline-color: var(--token-color-stroke-action-hover);
  }
  &:focus-visible .dnb-card {
    --card-outline-color: var(--token-color-stroke-action-focus);
    --card-outline-width: var(--focus-ring-width);
  }
`,u=a(t)`
  height: 100%;

  svg {
    align-self: center;
    color: var(--token-color-icon-neutral);
  }
`;export{s as t};