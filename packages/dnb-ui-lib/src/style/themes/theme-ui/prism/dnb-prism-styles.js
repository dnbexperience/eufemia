/**
 * DNB Prism Theme Styles
 * NB: Not in active use for now
 */

const prismStyle = /* @css */ `
  --color-violet-medium: #a06eaf;
  --color-indigo-medium: #6e6491;

  &.prism-code[contentEditable='true'] {
    cursor: text;
  }

  &.comment,
  &.prolog,
  &.doctype,
  &.cdata {
    opacity: 0.8;
    font-style: italic;
    color: var(--color-accent-yellow-30);
  }

  &.property,
  &.styled-template-string.property,
  &.tag,
  &.boolean,
  &.number,
  &.constant,
  &.symbol {
    color: var(--color-mint-green-12);
  }

  &.tag {
    color: var(--color-sea-green);
  }

  &.selector,
  &.class-name,/* custom */
  &.attr-name,
  &.string,
  &.function,
  &.char,
  &.builtin,
  &.inserted {
    color: var(--color-summer-green);
  }

  /* &.selector,
  &.doctype {
    color: var(--color-fire-red);
    font-style: italic;
  } */

  &.operator,
  &.entity,
  &.url,
  &.language-css .string,
  &.style .string,
  &.variable {
    color: var(--color-mint-green);
  }

  &.atrule,
  &.attr-value,
  &.keyword {
    color: var(--color-mint-green);
  }

  &.punctuation {
    color: var(--color-violet-medium);
  }

  &.namespace {
    color: var(--color-indigo-medium);
  }

  &.regex,
  &.important {
    color: #e90;
  }

  &.important,
  &.bold {
    font-weight: bold;
  }
  &.italic {
    font-style: italic;
  }

  &.entity {
    cursor: help;
  }

  &.deleted {
    color: var(--color-fire-red);
  }
`

export default prismStyle
