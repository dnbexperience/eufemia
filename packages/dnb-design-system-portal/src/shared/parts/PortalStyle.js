/**
 * Default Portal Styling
 *
 */

import { css } from '@emotion/core'
import GridStyle from 'dnb-ui-lib/stories/GridStyle'

export const gridStyle = GridStyle

const testWrapperStyle = css`
  [data-dnb-test-wrapper] {
    position: relative;
    z-index: 9999;

    display: inline-block; /* to get smaller width to the right (no white space) */

    overflow: hidden;

    padding: 1rem;
    margin: -1rem;

    background: white;

    font-family: Arial;
    & * {
      font-family: inherit;
    }
  }
`

export default css`
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
    transform: scale(1.1);
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

    ${gridStyle({ rgb: '200, 200, 200', a: 0.8 })};
    background-color: rgba(255, 255, 255, 0.6);

    figcaption {
      padding-top: 1rem;

      font-size: 1em;
      line-height: 1.5rem;
      font-style: italic;

      border-top: solid 1px #c4c4c4;
    }

    img {
      margin-bottom: 2rem;
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

      font-size: 1em;
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

    font-size: 1em;
    line-height: 1.5rem;
    font-style: italic;
    text-align: center;

    border-top: solid 1px #c4c4c4;
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

  /* Do not delete, this is used for screenshot testing */
  ${testWrapperStyle};
`
