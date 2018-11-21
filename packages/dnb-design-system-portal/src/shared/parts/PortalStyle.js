/**
 * Default Portal Styling
 *
 */

import { css } from 'react-emotion'
import gridSvg from '../../../static/assets/images/grid-32x32.svg'

export default css`
  table {
    border-spacing: 0;
    border-collapse: collapse;
    border-top: 8px solid #c6cbd1;
  }

  table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  table {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  table th {
    font-weight: 600;
    white-space: nowrap;
  }

  table th,
  table td {
    padding: 0.5rem 0.5rem 0.4375rem 0.5rem;
    border-bottom: 1px solid #dfe2e5;
    border-left: 1px solid #dfe2e5;
    border-right: 1px solid #dfe2e5;
  }

  table tr {
    background-color: #fff;
    border-top: 0px;
  }

  table td {
    white-space: nowrap;
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
    transform: scale(1.1);
    user-select: all;
  }

  table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  td,
  th {
    padding: 0;
    font-size: 1em;
    line-height: 1rem;
  }

  hr {
    box-sizing: content-box;
    overflow: visible;
    height: 0;
    margin: 1rem 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
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

  *:not([class^='dnb-']) + {
    blockquote {
      margin: 0;
    }

    ul,
    ol {
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    ul li,
    ol li {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    ol ol,
    ul ol {
      list-style-type: lower-roman;
    }

    ul ul ol,
    ul ol ol,
    ol ul ol,
    ol ol ol {
      list-style-type: lower-alpha;
    }

    dd {
      margin-left: 0;
    }

    > *:first-child {
      margin-top: 0 !important;
    }

    > *:last-child {
      margin-bottom: 0 !important;
    }

    p,
    blockquote,
    ul,
    ol,
    dl,
    pre {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    blockquote {
      padding: 0 1rem;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
    }

    blockquote > :first-child {
      margin-top: 0;
    }

    blockquote > :last-child {
      margin-bottom: 0;
    }

    ul,
    ol {
      padding-left: 2rem;
    }

    ul ul,
    ul ol,
    ol ol,
    ol ul {
      margin-top: 0;
      margin-bottom: 0;
    }

    li {
      word-wrap: break-all;
    }

    li > p {
      margin-top: 1rem;
    }

    li + li {
      margin-top: 0.25em;
    }

    dl {
      padding: 0;
    }

    dl dt {
      padding: 0;
      margin-top: 1rem;
      font-size: 1rem;
      font-style: italic;
      font-weight: 600;
    }

    dl dd {
      padding: 0 1rem;
      margin-bottom: 1rem;
    }

    img {
      box-sizing: content-box;
      max-width: 100%;
      border-style: none;
      background-color: #fff;
    }

    img[align='right'] {
      padding-left: 1.2rem;
    }

    img[align='left'] {
      padding-right: 1.2rem;
    }
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

  .typography-box {
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.0425);
    margin-bottom: 4rem;
    border-radius: 0.5rem;

    background-repeat: repeat;
    background-image: url(${gridSvg});
    ${'' /* background-image: url('/assets/images/grid-32x32.svg'); */}

    h1 {
      margin-top: 0rem;
    }

    ul {
      font-size: 1em;
      line-height: 1rem;
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: calc(1rem - 2px);
    }

    li {
      font-size: 1em;
      font-family: monospace;
      line-height: 1rem;
      margin: 0;
      padding: 0;
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
