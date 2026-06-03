import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-C6UABezd.js";import{t as i}from"./Currency-DdnOfMj0.js";import{t as a}from"./Form-C16rVaXm.js";import{t as o}from"./Field-B5trC2Cn.js";import{W as s}from"./index-BCXtuv-b.js";import{t as c}from"./ComponentBox-B2X8809Z.js";var l=e({Basic:()=>d,Disabled:()=>b,VariantInline:()=>C,WithConfirmCancel:()=>h,WithDataPath:()=>y,WithDisabledItems:()=>v,WithError:()=>x,WithManySelectedItems:()=>S,WithNestedItems:()=>_,WithSearch:()=>m,WithSelectAll:()=>f,WithSelectedItems:()=>g}),u=t(n()),d=()=>(0,u.jsx)(c,{"data-visual-test":`multi-selection-basic`,stableName:`Basic`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    description: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    description: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    description: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    description: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    description: 'Capital of Iceland',
  },
]
render(<Field.MultiSelection label="Select cities" data={cities} />)
`}),f=()=>(0,u.jsx)(c,{stableName:`WithSelectAll`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland',
  },
]
render(
  <Field.MultiSelection
    label="Select cities"
    data={cities}
    showSelectAll
    width="medium"
  />
)
`}),p=[{value:`apple`,title:`Apple`,text:1.5,description:`Red fruit`},{value:`banana`,title:`Banana`,text:.75,description:`Yellow fruit`},{value:`orange`,title:`Orange`,text:1.25,description:`Orange fruit`},{value:`grape`,title:`Grape`,text:2,description:`Small green fruit`},{value:`strawberry`,title:`Strawberry`,text:2.5,description:`Red berry`},{value:`blueberry`,title:`Blueberry`,text:3,description:`Small blue fruit`},{value:`raspberry`,title:`Raspberry`,text:3.5,description:`Red berry`},{value:`blackberry`,title:`Blackberry`,text:3.5,description:`Dark berry`},{value:`watermelon`,title:`Watermelon`,text:5,description:`Large red fruit`},{value:`mango`,title:`Mango`,text:2.75,description:`Tropical fruit`},{value:`pineapple`,title:`Pineapple`,text:3.5,description:`Spiky tropical`},{value:`papaya`,title:`Papaya`,text:2.25,description:`Orange tropical`},{value:`kiwi`,title:`Kiwi`,text:1.75,description:`Green fruit`},{value:`peach`,title:`Peach`,text:1.5,description:`Fuzzy fruit`},{value:`plum`,title:`Plum`,text:1.25,description:`Purple fruit`},{value:`cherry`,title:`Cherry`,text:4,description:`Small red fruit`},{value:`lemon`,title:`Lemon`,text:.8,description:`Yellow citrus`},{value:`lime`,title:`Lime`,text:.9,description:`Green citrus`},{value:`grapefruit`,title:`Grapefruit`,text:1.5,description:`Large citrus`},{value:`avocado`,title:`Avocado`,text:2.5,description:`Green creamy`}].map(e=>({...e,text:(0,u.jsx)(i,{value:e.text})})),m=()=>(0,u.jsx)(c,{scope:{fruits:p},stableName:`WithSearch`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`render(
  <Field.MultiSelection
    label="Select fruits"
    data={fruits}
    showSearchField
  />
)
`}),h=()=>(0,u.jsx)(c,{stableName:`WithConfirmCancel`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland',
  },
]
render(
  <Field.MultiSelection
    label="Select cities"
    data={cities}
    showSearchField
    showSelectAll
    showConfirmButton
  />
)
`}),g=()=>(0,u.jsx)(c,{stableName:`WithSelectedItems`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland',
  },
]
render(
  <Field.MultiSelection
    label="Select cities"
    data={cities}
    value={['stockholm']}
    showSelectedTags
  />
)
`}),_=()=>(0,u.jsx)(c,{stableName:`WithNestedItems`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.MultiSelection
  label="Select regions"
  showSelectAll
  data={[
    {
      value: 'scandinavia',
      title: 'Scandinavia',
      children: [
        {
          value: 'oslo',
          title: 'Oslo',
          text: 'Capital of Norway',
        },
        {
          value: 'stockholm',
          title: 'Stockholm',
          text: 'Capital of Sweden',
        },
        {
          value: 'copenhagen',
          title: 'Copenhagen',
          text: 'Capital of Denmark',
        },
      ],
    },
    {
      value: 'nordic',
      title: 'Other Nordic',
      children: [
        {
          value: 'helsinki',
          title: 'Helsinki',
          text: 'Capital of Finland',
        },
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ],
    },
  ]}
/>
`}),v=()=>(0,u.jsx)(c,{stableName:`WithDisabledItems`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.MultiSelection
  label="Select available languages"
  data={[
    {
      value: 'nodejs',
      title: 'Node.js',
      text: 'JavaScript runtime',
    },
    {
      value: 'python',
      title: 'Python',
      text: 'General purpose language',
      disabled: true,
    },
    {
      value: 'rust',
      title: 'Rust',
      text: 'Systems programming language',
    },
    {
      value: 'golang',
      title: 'Go',
      text: 'Compiled language',
      disabled: true,
    },
    {
      value: 'java',
      title: 'Java',
      text: 'Enterprise language',
    },
  ]}
/>
`}),y=()=>(0,u.jsx)(c,{stableName:`WithDataPath`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Form:a,Field:o},children:`<Form.Handler
  data={{
    colors: [
      {
        value: 'red',
        title: 'Red',
        text: 'Primary color',
      },
      {
        value: 'green',
        title: 'Green',
        text: 'Secondary color',
      },
      {
        value: 'blue',
        title: 'Blue',
        text: 'Tertiary color',
      },
      {
        value: 'yellow',
        title: 'Yellow',
        text: 'Accent color',
      },
    ],
  }}
>
  <Field.MultiSelection
    label="Select colors"
    dataPath="/colors"
    value={['red']}
    help={{
      title: 'Help text',
      content: 'Additional information about this field',
    }}
  />
</Form.Handler>
`}),b=()=>(0,u.jsx)(c,{stableName:`Disabled`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland',
  },
]
render(
  <Field.MultiSelection label="Disabled field" disabled data={cities} />
)
`}),x=()=>(0,u.jsx)(c,{stableName:`WithError`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Form:a,Card:r,Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland',
  },
]
render(
  <Form.Handler>
    <Form.Card>
      <Field.MultiSelection
        label="Select cities"
        path="/cities"
        required
        minItems={2}
        data={cities}
        showSearchField
        showSelectedTags
      />
      <Form.SubmitButton />
    </Form.Card>
  </Form.Handler>
)
`}),S=()=>(0,u.jsx)(c,{stableName:`WithManySelectedItems`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const items = Array.from(
  {
    length: 30,
  },
  (_, i) => ({
    value: \`item\${i + 1}\`,
    title: \`Item \${i + 1}\`,
    description: \`Description for item \${i + 1}\`,
  })
)
render(
  <Field.MultiSelection
    label="Select items"
    data={items}
    value={items.slice(0, 25).map((item) => item.value)}
    showSelectedTags
    showSelectAll
    showSearchField
  />
)
`}),C=()=>(0,u.jsx)(c,{"data-visual-test":`multi-selection-variant-inline`,stableName:`VariantInline`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { NumberFormat } from '@dnb/eufemia'`],__buildScope:{Field:o},noInline:!0,children:`const cities = [
  {
    value: 'oslo',
    title: 'Oslo',
  },
  {
    value: 'stockholm',
    title: 'Stockholm',
  },
  {
    value: 'copenhagen',
    title: 'Copenhagen',
  },
  {
    value: 'helsinki',
    title: 'Helsinki',
  },
  {
    value: 'reykjavik',
    title: 'Reykjavik',
  },
]
render(
  <Field.MultiSelection
    label="Select cities"
    variant="inline"
    value={['stockholm']}
    data={cities}
    showSelectAll
    showSearchField
    showSelectedTags
  />
)
`});function w(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...s(),...e.components};return l||E(`Examples`,!1),d||E(`Examples.Basic`,!0),b||E(`Examples.Disabled`,!0),C||E(`Examples.VariantInline`,!0),h||E(`Examples.WithConfirmCancel`,!0),y||E(`Examples.WithDataPath`,!0),v||E(`Examples.WithDisabledItems`,!0),x||E(`Examples.WithError`,!0),S||E(`Examples.WithManySelectedItems`,!0),_||E(`Examples.WithNestedItems`,!0),m||E(`Examples.WithSearch`,!0),f||E(`Examples.WithSelectAll`,!0),g||E(`Examples.WithSelectedItems`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Basic`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`With Select all`}),`
`,(0,u.jsxs)(t.p,{children:[`This example uses field width `,(0,u.jsx)(t.code,{children:`medium`}),`.`]}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`With search`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`With confirm and cancel`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`With nested items`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`With selected item tags`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`With many selected items`}),`
`,(0,u.jsxs)(t.p,{children:[`When `,(0,u.jsx)(t.code,{children:`showSelectedTags`}),` is enabled and the number of items exceeds the `,(0,u.jsx)(t.code,{children:`selectedItemsCollapsibleThreshold`}),` (default: `,(0,u.jsx)(t.code,{children:`10`}),`), an accordion appears to collapse/expand the selected items. A "Clear all" button also appears to the right for quickly deselecting all items.`]}),`
`,(0,u.jsx)(S,{}),`
`,(0,u.jsx)(t.h3,{children:`With disabled items`}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`Inline variant`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`inline`}),` variant renders the item list inline without a popover. This is useful when you want the options to be always visible.`]}),`
`,(0,u.jsx)(C,{}),`
`,(0,u.jsx)(t.h3,{children:`Using dataPath from Form context`}),`
`,(0,u.jsx)(y,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled field`}),`
`,(0,u.jsx)(b,{}),`
`,(0,u.jsx)(t.h3,{children:`With minimum required items`}),`
`,(0,u.jsx)(x,{})]})}function T(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};