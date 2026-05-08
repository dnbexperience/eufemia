import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BdIHiKP5.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Array />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Iterate.Array`}),` works in many ways similar to field components. It has a `,(0,r.jsx)(n.code,{children:`value`}),` property that can receive an array, or you can give it a `,(0,r.jsx)(n.code,{children:`path`}),` if you want it to retrieve an array from a surrounding `,(0,r.jsx)(n.code,{children:`DataContext`}),`. All child components of `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` are rendered once per item the array value consists of.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Array`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Array`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array
    label="Array label"
    value={['Iron Man', 'Captain America', 'The Hulk']}
  >
    <Field.String itemPath="/" />
  </Iterate.Array>
)
`})}),`
`,(0,r.jsxs)(n.h2,{children:[`About `,(0,r.jsx)(n.code,{children:`itemPath`}),` and `,(0,r.jsx)(n.code,{children:`path`})]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`itemPath`}),` points to the root of each iterated item, while `,(0,r.jsx)(n.code,{children:`path`}),` points to the root of the data source:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    defaultData={{
      listOfHeroes: [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'The Hulk' },
      ],
    }}
    onChange={console.log}
  >
    <Iterate.Array path="/listOfHeroes">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Individual values and dynamic paths`}),`
`,(0,r.jsxs)(n.p,{children:[`Since `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` renders its children once per item, the field components inside must receive values based on the different items in the array. This can be done in two ways:`]}),`
`,(0,r.jsx)(n.h3,{children:`1. itemPath`}),`
`,(0,r.jsxs)(n.p,{children:[`If field components inside `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` are given an `,(0,r.jsx)(n.code,{children:`itemPath`}),` property, this will look for values based on the array item being the root of the structure, even if the array often comes from a surrounding data set. This means you do not need to think about which index the field should point to, because it is handled by `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` internally. You can treat the individual item as its own structure.`]}),`
`,(0,r.jsx)(n.h3,{children:`2. Function callback as children (render property)`}),`
`,(0,r.jsxs)(n.p,{children:[`If you want to provide values to individual field components directly instead of pointing to them with paths, you can give `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` a render property. It works a bit like an array map call. The render function provides the value of the item as the first argument, the index of which item you are on as the second, and the internal array as the third.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`render(
  <Iterate.Array path="/listOfHeroes">
    {(itemValue, itemIndex, internalArray) => {
      return <Field.Name.Last itemPath="/name" />
    }}
  </Iterate.Array>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also get the index by using the `,(0,r.jsx)(n.code,{children:`useItem`}),` hook:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const MyItem = () => {
  const { index } = Iterate.useItem()

  return <Field.Name.Last itemPath="/name" />
}

render(
  <Iterate.Array path="/listOfHeroes">
    <MyItem />
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`The item number in labels`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`{itemNo}`}),` variable in the label to display the current item number. This is useful when you have a list of items and you want to display the item number in the label.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Field.String itemPath="/" label="Item no. {itemNo}" />
  </Iterate.Array>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` also support `,(0,r.jsx)(n.code,{children:`{itemNo}`}),` in the `,(0,r.jsx)(n.code,{children:`title`}),` property to display the current item number.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Iterate.ViewContainer title="Item no. {itemNo}">
      ...
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Initial container mode`}),`
`,(0,r.jsxs)(n.p,{children:[`This section describes the behavior of the `,(0,r.jsx)(n.code,{children:`EditContainer`}),` and the `,(0,r.jsx)(n.code,{children:`ViewContainer`}),` components.`]}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the container mode is set to `,(0,r.jsx)(n.code,{children:`auto`}),`. This means that the container will open (switch to `,(0,r.jsx)(n.code,{children:`edit`}),` mode) when there is an error in the container or the value is falsy (empty string, null, undefined, etc.).`]}),`
`,(0,r.jsxs)(n.p,{children:[`When a new item is added via the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/PushButton/`,children:`Iterate.PushButton`}),` component, the item before it will change to `,(0,r.jsx)(n.code,{children:`view`}),` mode, if it had no validation errors.`]}),`
`,(0,r.jsx)(n.h2,{children:`Filter data`}),`
`,(0,r.jsx)(n.p,{children:`You can filter data by paths specific or all paths.`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`/myList/0`}),` will filter out the first item of the list, including `,(0,r.jsx)(n.code,{children:`foo`}),` and `,(0,r.jsx)(n.code,{children:`bar`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`/myList/1/foo`}),` will filter out `,(0,r.jsx)(n.code,{children:`foo`}),` inside the second item of the list.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`/myList/*/foo`}),` will filter out all `,(0,r.jsx)(n.code,{children:`foo`}),` object keys from all items of the list.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`/myList/*/subList/*/foo`}),` does support multi wildcard paths.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`In the example below, the data given in `,(0,r.jsx)(n.code,{children:`onSubmit`}),` will still have "foo2" and "bar2" of the list.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

const myFilter = {
  '/myList/0': false,
}

render(
  <Form.Handler
    data={{
      myList: [
        { foo: 'foo1', bar: 'bar1' },
        { foo: 'foo2', bar: 'bar2' },
      ],
    }}
    onSubmit={(data, { filterData }) => {
      console.log('onSubmit', filterData(myFilter))
    }}
  >
    <Iterate.Array path="/myList">
      <Field.String itemPath="/foo" label="Foo no. {itemNo}" />
      <Field.String itemPath="/bar" label="Bar no. {itemNo}" />
    </Iterate.Array>
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Instead of `,(0,r.jsx)(n.code,{children:`false`}),` you can provide a function that returns `,(0,r.jsx)(n.code,{children:`false`}),` based on your logic.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};