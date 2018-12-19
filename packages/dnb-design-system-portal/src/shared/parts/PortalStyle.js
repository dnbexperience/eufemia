/**
 * Default Portal Styling
 *
 */

import { css } from 'react-emotion'
import bluegridSvg from '../../../static/assets/images/grid-32x32-blue.svg'
import greygridSvg from '../../../static/assets/images/grid-32x32.svg'

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

  .demo-box {
    margin: 1rem 0;
    padding: 1.5rem 0.5rem;
    background-color: #f9ffff;
    border-left: solid 1px #a4ffff;
  }

  .image-box {
    margin: 0 0 4rem 0;
    padding: 2rem 2rem 0.9375rem 2rem;

    text-align: center;

    border-bottom: solid 1px #e7e8e7;
    border-right: solid 1px #e7e8e7;

    background-color: #f9ffff;
    background-repeat: repeat;
    background-image: url(${greygridSvg});
    ${'' /* background-image: url('/assets/images/grid-32x32.svg'); */}

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

    background-color: #f9ffff;
    border-bottom: solid 1px #a4ffff;
    border-right: solid 1px #a4ffff;

    background-repeat: repeat;
    background-image: url(${bluegridSvg});
    ${'' /* background-image: url('/assets/images/grid-32x32.svg'); */}

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
`
