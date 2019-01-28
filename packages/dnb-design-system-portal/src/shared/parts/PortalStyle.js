/**
 * Default Portal Styling
 *
 */

import { css } from '@emotion/core'

export const gridStyle = ({
  rgb = null,
  hsl = '204, 80%, 72%',
  a = 0.8
} = {}) => {
  const color = c =>
    rgb ? `rgba(${rgb}, ${a - c})` : `hsla(${hsl}, ${a - c})`
  return css`
    position: relative;

    --grid-gutter: 0.5rem;
    --grid-gutter-bold: 2rem;
    --grid-color: ${color(0.5)};
    --grid-color-bold: ${color(0.15)};
    --grid-line-thickness: 1px;

    --grid-columns: repeating-linear-gradient(
      to right,
      var(--grid-color),
      var(--grid-color) var(--grid-line-thickness),
      transparent var(--grid-line-thickness),
      transparent var(--grid-gutter)
    );
    --grid-columns-bold: repeating-linear-gradient(
      to right,
      var(--grid-color-bold),
      var(--grid-color-bold) var(--grid-line-thickness),
      transparent var(--grid-line-thickness),
      transparent var(--grid-gutter-bold)
    );
    --grid-rows: repeating-linear-gradient(
      to bottom,
      var(--grid-color),
      var(--grid-color) var(--grid-line-thickness),
      transparent var(--grid-line-thickness),
      transparent var(--grid-gutter)
    );
    --grid-rows-bold: repeating-linear-gradient(
      to bottom,
      var(--grid-color-bold),
      var(--grid-color-bold) var(--grid-line-thickness),
      transparent var(--grid-line-thickness),
      transparent var(--grid-gutter-bold)
    );

    border-bottom: solid var(--grid-line-thickness) var(--grid-color-bold);
    border-right: solid var(--grid-line-thickness) var(--grid-color-bold);

    &::after {
      content: '';

      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-image: var(--grid-columns), var(--grid-columns-bold),
        var(--grid-rows), var(--grid-rows-bold);
    }
  `
}

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
    padding-left: 1.2rem;
  }

  img[align='left'] {
    padding-right: 1.2rem;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    margin: 1rem 0;
    overflow: hidden;

    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--color-black-border);
  }

  hr::before {
    display: table;
    content: '';
  }

  hr::after {
    display: table;
    clear: both;
    content: '';
  }

  .anchor {
    float: left;
    position: relative;
    left: -0.3rem;
    line-height: 65%;
    border: none;
  }

  .anchor:hover svg {
    fill: currentColor;
  }

  .anchor:focus {
    outline: none;
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

  .octicon {
    vertical-align: text-bottom;
  }

  .pl-0 {
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
  }

  .task-list-item {
    list-style-type: none;
  }

  .task-list-item + .task-list-item {
    margin-top: 3px;
  }

  .task-list-item input {
    margin: 0 0.2rem 0.25em -1.6em;
    vertical-align: middle;
  }

  .image-box {
    margin: 0 0 4rem 0;
    padding: 2rem 2rem 0.9375rem 2rem;

    text-align: center;

    ${gridStyle({ rgb: '231, 232, 231', a: 0.8 })}

    figcaption {
      padding-top: 0.9375rem;

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

    ${gridStyle({ rgb: '164, 255, 255', a: 0.8 })}

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

  div.example-box {
    ${'' /* position: relative;
    overflow: hidden; */}

    margin-bottom: 2rem;
    padding: 2rem;

    ${gridStyle({ rgb: '236, 236, 236', a: 1 })}

    &.center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  p.example-caption {
    margin-top: 2rem;
    padding-top: 0.9375rem;

    font-size: 1em;
    line-height: 1.5rem;
    font-style: italic;
    text-align: center;

    border-top: solid 1px #c4c4c4;
  }
  div.example-box + p.example-caption {
    margin-top: -2rem;
  }

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

  /*
  *
  * Helper Classes - some of them need
  * visualising to see their effect
  */

  .dnb-nudge--vertical {
    background-color: var(--color-mint-green-50);
  }

  .dnb-nudge--horizontal {
    background-color: var(--color-mint-green-50);
  }
`
