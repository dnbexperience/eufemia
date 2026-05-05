import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{n}from"./PropertiesTable-UfuSIzSr.js";import{n as r}from"./DrawerListDocs-DW0iotg6.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(a.h2,{children:[`The `,(0,i.jsx)(a.code,{children:`data`}),` property`]}),`
`,(0,i.jsxs)(a.p,{children:[`The `,(0,i.jsx)(a.code,{children:`data`}),` can be structured in two main ways:`]}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`As an array`}),`
`,(0,i.jsx)(a.li,{children:`As an object.`}),`
`]}),`
`,(0,i.jsx)(a.p,{children:`An array is preferred as it gives you the most options.`}),`
`,(0,i.jsxs)(a.h3,{children:[(0,i.jsx)(a.code,{children:`data`}),` as an array`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-ts`,children:`// an array can contain complex items and offers the most control
const data = [
  {
    content: "Item 1",
  },
  {
    content: <span>Item 2</span>
  },
  {
    content: ["Item 3", "Line 2", <span>Line 3</span>]
  },
  {
    content: ['Main account', '1234 12 12345'],
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
  },
]

// If you only use the \`content\` property, you can use it directly in the array.
// This list is identical to the one above:
const data = [
  "Item 1",
  <span>Item 2</span>,
  ["Item 3", "Line 2", <span>Line 3</span>],
  {
    content: ['Main account', '1234 12 12345'],
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
  },
]

const onChange = ({ data, value }) => {
  console.log(data) // returns the item as it appears in the array
  console.log(value) // returns the index of the item
}
`})}),`
`,(0,i.jsx)(a.p,{children:`Each object in the array have the following properties:`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsxs)(a.h3,{children:[(0,i.jsx)(a.code,{children:`data`}),` as an object`]}),`
`,(0,i.jsx)(a.p,{children:`A simpler alternative, but with less options`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-ts`,children:`// Each entry can contain the same type of value as the array's \`content\` property
const data = {
  first: "Item 1",,
  second: <span>Item 2</span>,
  last: ["Item 3", "Line 2", <span>Line 3</span>],
}

const onChange = ({ data, value }) => {
  console.log(data)
  // returns a generated object representing the item:
  // {
  //   selectedKey: 'first',
  //   value: 'first',
  //   content: 'Item 1',
  //   type: 'object'
  // }

  console.log(value) // returns the key ("first", "second", or "last"), instead of an index

}

`})}),`
`,(0,i.jsxs)(a.h3,{children:[(0,i.jsx)(a.code,{children:`data`}),` types overview`]}),`
`,(0,i.jsxs)(a.p,{children:[`The following is an overview of all the types that the `,(0,i.jsx)(a.code,{children:`data`}),` property accepts. (These are not actual names of actual types in the library.)`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-ts`,children:`// The visual content that is shown in one DrawerList item.
// An array can be used to define multiple lines.
type CONTENT = string | React.ReactNode | (string | React.ReactNode)[]

// An array item
type ARRAY_OBJECT = {
  content: CONTENT
  disabled?: boolean
  selectedKey?: string | number
  selectedValue?: string | React.ReactNode
  suffixValue?: string | React.ReactNode
  style?: React.CSSProperties
}

// \`data\` as an array. A list of "ARRAY_OBJECT" types is preferred,
// but the "CONTENT" type can be useful for simple lists.
type ARRAY = (CONTENT | ARRAY_OBJECT)[]

// \`data\` as an object. Can only contain the "CONTENT" type.
// Each \`key\` behaves like the "ARRAY_OBJECT"'s \`selectedKey\`.
type RECORD = Record<string, CONTENT>

// An object or array that represents the entire DrawerList list.
type DATA = ARRAY | RECORD

// The final type of the \`data\` property:
let data: DATA | () => DATA
`})}),`
`,(0,i.jsx)(a.h4,{children:`JSON string`}),`
`,(0,i.jsxs)(a.p,{children:[`There is technically support for sending in a JSON string of the data to the `,(0,i.jsx)(a.code,{children:`data`}),` property. But this is an old functionality that we do not really support anymore.`]})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as t};