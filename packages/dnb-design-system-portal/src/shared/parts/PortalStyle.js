/**
 * Default Portal Styling
 *
 */

import { css } from '@emotion/core'
import { gridStyle } from 'dnb-ui-lib/stories/GridStyle'

export { gridStyle }

// Screenshot Tests Setup
let testWrapperStyle = ''
if (typeof window !== 'undefined' && window.IS_TEST) {
  testWrapperStyle = css`
    [data-dnb-test-wrapper] {
      position: relative;
      z-index: 9999;

      /* to get smaller width to the right (no white space) */
      display: inline-block;

      /* to get a space arround the element,
      so we can include a box-shadow in the screenshot */
      padding: 1rem;
      margin: -1rem;

      background: #fff;
    }

    /* because the font-weight is differently on Arial, we have to redefine it to be bold */
    :root {
      --font-weight-demi: 600;
      --font-weight-medium: 700;
    }

    html {
      scroll-behavior: auto !important;
    }

    body * {
      font-family: Arial, Helvetica, sans-serif !important;
      font-variant-numeric: normal;
      font-feature-settings: normal;

      -webkit-font-smoothing: antialiased;
    }
  `
}

export default css`
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    .anchor {
      display: inline-block;
      visibility: hidden;

      width: 1em;
      margin-left: -1em;

      line-height: 1; /* for vertical centering*/
      text-align: center;
      border-bottom: none;

      transition: opacity 0.4s ease-out;
      opacity: 0;
    }

    &:hover .anchor {
      visibility: visible;
      opacity: 1;
    }
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

  .task-list-item {
    list-style-type: none;
  }
  .task-list-item + .task-list-item {
    margin-top: 0.5rem;
  }
  .task-list-item input {
    margin-right: 0.5rem;
    margin-bottom: 0.25em;
    vertical-align: middle;
  }

  .image-box {
    margin: 0 0 4rem 0;
    padding: 2rem 2rem 0.9375rem 2rem;

    text-align: center;

    ${gridStyle({ rgb: '40, 180, 130', a: 0.4 })};
    background-color: rgba(255, 255, 255, 0.6);

    figcaption {
      padding-top: 1rem;

      font-style: italic;

      border-top: solid 1px #c4c4c4;
    }

    img {
      width: 100%;
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
      margin-top: 0rem;
    }

    ul {
      margin: 0;
      padding: 0;

      line-height: 1rem;
      list-style: none;
      /*
      border-top: 1px solid rgba(219, 0, 255, 0.25);
      border-bottom: 1px solid rgba(219, 0, 255, 0.25);
      */
    }

    li {
      margin: 0;
      padding: 0;

      font-size: 1rem;
      font-family: monospace;
      line-height: 1rem;
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
    line-height: 0.75rem;
  }
  .lh-16 {
    line-height: 1rem;
  }
  .lh-20 {
    line-height: 1.25rem;
  }
  .lh-24 {
    line-height: 1.5rem;
  }
  .lh-28 {
    line-height: 1.75rem;
  }
  .lh-32 {
    line-height: 2rem;
  }

  .gatsby-resp-image-background-image {
    padding-bottom: 0 !important;
  }

  /* Do not delete, this is used for screenshot testing */
  ${testWrapperStyle};
`
