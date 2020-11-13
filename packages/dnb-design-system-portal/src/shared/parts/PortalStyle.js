/**
 * Default Portal Styling
 *
 */

import { css } from '@emotion/react'
import { gridStyle } from 'dnb-ui-lib/stories/GridStyle'

export { gridStyle }

export default css`
  ${'' /* .dnb-form-component {
    @media screen and (max-width: 40em) {
      flex-wrap: wrap;
      & > .dnb-form-label {
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
      }
    }
  } */}

  /*
    Make sure we cut the tab and seciton parts on the left side
    so it's not visible "over" the sidebar.
   */
  .dnb-app-content {
    overflow: hidden;
  }

  main > .dnb-global-status {
    transform: translateY(-2rem);
  }
  table td.selectable {
    position: relative;
    z-index: 1;
    user-select: all;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.2s ease;
  }
  table td.selectable:hover,
  table td.selectable:active {
    z-index: 2;
    transform: scale(1.2);
    user-select: all;
  }
  table td em {
    padding-right: 0.5em;
  }

  img[align='right'] {
    padding-left: 1rem;
  }

  img[align='left'] {
    padding-right: 1rem;
  }

  .dev-grid > .dnb-h--xx-large {
    position: relative;
    z-index: 2;
  }

  :checked + .radio-label {
    position: relative;
    z-index: 1;
    border-color: var(--color-sea-green);
  }

  .markdown-body::before {
    display: table;
    content: '';
  }
  .markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }
  .gatsby-resp-image-wrapper {
    margin-left: 0 !important; /* align the img to the left */
    a {
      padding: 0;
      box-shadow: none;
      &[target='_blank']:not(:empty):not(.dnb-anchor--no-icon)::after {
        content: none;
      }

      img {
        width: 100%;
      }
    }
    a:hover img {
      border-radius: 0.25rem; /* 4/16 */
      box-shadow: 0 0 0 0.125rem var(--color-mint-green-50);
    }
  }

  ${'' /* .pl-0 {
    padding-left: 0 !important;
  }
  .pl-1 {
    padding-left: 4px !important;
  }
  .pl-2 {
    padding-left: 8px !important;
  }
  .pl-3 {
    padding-left: 1rem !important;
  }
  .pl-4 {
    padding-left: 24px !important;
  }
  .pl-5 {
    padding-left: 32px !important;
  }
  .pl-6 {
    padding-left: 40px !important;
  } */}

  .contains-task-list {
    padding-left: 0;
  }
  .task-list-item {
    list-style-type: none;
  }
  .task-list-item + .task-list-item {
    margin-top: 0.5rem;
  }
  .task-list-item .dnb-checkbox {
    margin-right: 0.5rem;
    margin-bottom: 0.25em;
  }

  .image-box {
    margin: 1rem 0 3rem 0;
    padding: 2rem 2rem 0.9375rem 2rem;

    text-align: center;

    ${gridStyle({ rgb: '40, 180, 130', a: 0.4 })};
    background-color: rgba(255, 255, 255, 0.6);

    figcaption {
      padding-top: 0.938rem; /* 15/16  because of the border */

      font-style: italic;

      border-top: solid 1px #c4c4c4;
    }

    img:not([width]) {
      width: 100%;
    }
    img:not(width) {
      margin-bottom: 2rem;
    }
    /* SVG illustration helper for increasing font-size */
    &.x-10 img {
      width: calc(50% + 10rem);
    }

    &.mint-green-12 {
      background-color: var(--color-mint-green-12);
    }
    &.blank {
      background-color: transparent;
    }
    &.blank::after {
      background-image: none;
      border-color: transparent;
    }
  }

  .typography-box {
    margin-bottom: 4rem;
    padding: 2rem 2rem 1.9375rem 2rem;

    ${gridStyle({ rgb: '164, 255, 255', a: 0.8 })};

    h1 {
      margin-top: 0;
    }

    ul {
      margin: 0;
      padding: 0;

      line-height: var(--line-height-basis);
      list-style: none;
      /*
      border-top: 1px solid rgba(219, 0, 255, 0.25);
      border-bottom: 1px solid rgba(219, 0, 255, 0.25);
      */
    }

    li {
      margin: 0;
      padding: 0;

      font-size: var(--font-size-basis);
      font-family: monospace;
      line-height: var(--line-height-basis);
    }
  }

  .example-box {
    margin-bottom: 2rem;
    padding: 2rem;

    ${gridStyle({ rgb: '236, 236, 236', a: 1 })};

    &.center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .example-caption {
    margin-top: 2rem;
    padding-top: 0.9375rem;

    font-size: var(--font-size-small);
    font-style: italic;
    text-align: center;

    border-top: solid 1px #c4c4c4;

    p {
      margin: 0;
      padding: 0;
    }
  }
  .example-box + .example-caption {
    margin-top: -2rem;
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }

  /* used in the designers guide */
  .lh-12 {
    line-height: calc(var(--line-height-basis) - 0.25rem); /* 0.75rem */
  }
  .lh-16 {
    line-height: var(--line-height-basis); /* 1rem */
  }
  .lh-20 {
    line-height: calc(var(--line-height-basis) + 0.25rem); /* 1.25rem */
  }
  .lh-24 {
    line-height: var(--line-height-basis); /* 1rem */
  }
  .lh-28 {
    line-height: calc(var(--line-height-basis) + 0.75rem); /* 1.75rem */
  }
  .lh-32 {
    line-height: calc(var(--line-height-basis) + 1rem); /* 2rem */
  }
`
