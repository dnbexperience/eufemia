import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./Card-Df9wOiUT.js";import{Fn as r,_ as i,wr as a,y as o}from"./index-DqqByKA2.js";var s=e(t());function c(e){let{url:t,title:n,about:i,icon:o}=e;return(0,s.jsx)(l,{children:(0,s.jsx)(u,{to:t,children:(0,s.jsxs)(d,{stack:!0,dropShadow:!0,children:[o&&(0,s.jsx)(o,{}),(0,s.jsx)(r,{className:`dnb-p--lead`,children:n}),(0,s.jsx)(r,{top:`x-small`,children:i}),(0,s.jsx)(a,{variant:`tertiary`,icon:`chevron_right`,text:`Read more`,tabIndex:-1,element:`span`})]})})})}var l=o.li`
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
`,u=o(i)`
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
`,d=o(n)`
  height: 100%;

  svg {
    align-self: center;
    color: var(--token-color-icon-neutral);
  }
`;export{c as t};