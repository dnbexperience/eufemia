import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./Card-CDdReKli.js";import{At as n,In as r,Mt as i,xr as a}from"./index-2AO2Cu5K.js";var o=e();function s(e){let{url:t,title:n,about:i,icon:s}=e;return(0,o.jsx)(c,{children:(0,o.jsx)(l,{to:t,children:(0,o.jsxs)(u,{stack:!0,dropShadow:!0,children:[s&&(0,o.jsx)(s,{}),(0,o.jsx)(r,{className:`dnb-p--lead`,children:n}),(0,o.jsx)(r,{top:`x-small`,children:i}),(0,o.jsx)(a,{variant:`tertiary`,icon:`chevron_right`,text:`Read more`,tabIndex:-1,element:`span`})]})})})}var c=i.li`
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
`,l=i(n)`
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
`,u=i(t)`
  height: 100%;

  svg {
    align-self: center;
    color: var(--token-color-icon-neutral);
  }
`;export{s as t};