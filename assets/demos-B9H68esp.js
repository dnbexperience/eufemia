import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{B as r,t as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({Basic:()=>c,Disabled:()=>_,VariantInline:()=>b,WithConfirmCancel:()=>f,WithDataPath:()=>g,WithDisabledItems:()=>h,WithError:()=>v,WithManySelectedItems:()=>y,WithNestedItems:()=>m,WithSearch:()=>d,WithSelectAll:()=>l,WithSelectedItems:()=>p}),s=e(n()),c=()=>(0,s.jsx)(i,{"data-visual-test":`multi-selection-basic`,stableName:`Basic`,noInline:!0,children:`const cities = [
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
`}),l=()=>(0,s.jsx)(i,{stableName:`WithSelectAll`,noInline:!0,children:`const cities = [
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
`}),u=[{value:`apple`,title:`Apple`,text:1.5,description:`Red fruit`},{value:`banana`,title:`Banana`,text:.75,description:`Yellow fruit`},{value:`orange`,title:`Orange`,text:1.25,description:`Orange fruit`},{value:`grape`,title:`Grape`,text:2,description:`Small green fruit`},{value:`strawberry`,title:`Strawberry`,text:2.5,description:`Red berry`},{value:`blueberry`,title:`Blueberry`,text:3,description:`Small blue fruit`},{value:`raspberry`,title:`Raspberry`,text:3.5,description:`Red berry`},{value:`blackberry`,title:`Blackberry`,text:3.5,description:`Dark berry`},{value:`watermelon`,title:`Watermelon`,text:5,description:`Large red fruit`},{value:`mango`,title:`Mango`,text:2.75,description:`Tropical fruit`},{value:`pineapple`,title:`Pineapple`,text:3.5,description:`Spiky tropical`},{value:`papaya`,title:`Papaya`,text:2.25,description:`Orange tropical`},{value:`kiwi`,title:`Kiwi`,text:1.75,description:`Green fruit`},{value:`peach`,title:`Peach`,text:1.5,description:`Fuzzy fruit`},{value:`plum`,title:`Plum`,text:1.25,description:`Purple fruit`},{value:`cherry`,title:`Cherry`,text:4,description:`Small red fruit`},{value:`lemon`,title:`Lemon`,text:.8,description:`Yellow citrus`},{value:`lime`,title:`Lime`,text:.9,description:`Green citrus`},{value:`grapefruit`,title:`Grapefruit`,text:1.5,description:`Large citrus`},{value:`avocado`,title:`Avocado`,text:2.5,description:`Green creamy`}].map(e=>({...e,text:(0,s.jsx)(r,{value:e.text})})),d=()=>(0,s.jsx)(i,{scope:{fruits:u},stableName:`WithSearch`,noInline:!0,children:`render(
  <Field.MultiSelection
    label="Select fruits"
    data={fruits}
    showSearchField
  />
)
`}),f=()=>(0,s.jsx)(i,{stableName:`WithConfirmCancel`,noInline:!0,children:`const cities = [
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
`}),p=()=>(0,s.jsx)(i,{stableName:`WithSelectedItems`,noInline:!0,children:`const cities = [
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
`}),m=()=>(0,s.jsx)(i,{stableName:`WithNestedItems`,children:`<Field.MultiSelection
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
`}),h=()=>(0,s.jsx)(i,{stableName:`WithDisabledItems`,children:`<Field.MultiSelection
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
`}),g=()=>(0,s.jsx)(i,{stableName:`WithDataPath`,children:`<Form.Handler
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
`}),_=()=>(0,s.jsx)(i,{stableName:`Disabled`,noInline:!0,children:`const cities = [
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
`}),v=()=>(0,s.jsx)(i,{stableName:`WithError`,noInline:!0,children:`const cities = [
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
`}),y=()=>(0,s.jsx)(i,{stableName:`WithManySelectedItems`,noInline:!0,children:`const items = Array.from(
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
`}),b=()=>(0,s.jsx)(i,{"data-visual-test":`multi-selection-variant-inline`,stableName:`VariantInline`,noInline:!0,children:`const cities = [
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
`});function x(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return o||C(`Examples`,!1),c||C(`Examples.Basic`,!0),_||C(`Examples.Disabled`,!0),b||C(`Examples.VariantInline`,!0),f||C(`Examples.WithConfirmCancel`,!0),g||C(`Examples.WithDataPath`,!0),h||C(`Examples.WithDisabledItems`,!0),v||C(`Examples.WithError`,!0),y||C(`Examples.WithManySelectedItems`,!0),m||C(`Examples.WithNestedItems`,!0),d||C(`Examples.WithSearch`,!0),l||C(`Examples.WithSelectAll`,!0),p||C(`Examples.WithSelectedItems`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Basic`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`With Select all`}),`
`,(0,s.jsxs)(t.p,{children:[`This example uses field width `,(0,s.jsx)(t.code,{children:`medium`}),`.`]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`With search`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`With confirm and cancel`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`With nested items`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`With selected item tags`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`With many selected items`}),`
`,(0,s.jsxs)(t.p,{children:[`When `,(0,s.jsx)(t.code,{children:`showSelectedTags`}),` is enabled and the number of items exceeds the `,(0,s.jsx)(t.code,{children:`selectedItemsCollapsibleThreshold`}),` (default: `,(0,s.jsx)(t.code,{children:`10`}),`), an accordion appears to collapse/expand the selected items. A "Clear all" button also appears to the right for quickly deselecting all items.`]}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h3,{children:`With disabled items`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline variant`}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`inline`}),` variant renders the item list inline without a popover. This is useful when you want the options to be always visible.`]}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Using dataPath from Form context`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled field`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`With minimum required items`}),`
`,(0,s.jsx)(v,{})]})}function S(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};