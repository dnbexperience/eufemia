import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-CmRmlwM9.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Array />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Iterate.Array`}),` works in many ways similar to field components. It has a `,(0,i.jsx)(t.code,{children:`value`}),` property that can receive an array, or you can give it a `,(0,i.jsx)(t.code,{children:`path`}),` if you want it to retrieve an array from a surrounding `,(0,i.jsx)(t.code,{children:`DataContext`}),`. All child components of `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` are rendered once per item the array value consists of.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Array`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Array`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array
    label="Array label"
    value={['Iron Man', 'Captain America', 'The Hulk']}
  >
    <Field.String itemPath="/" />
  </Iterate.Array>
)
`})}),`
`,(0,i.jsxs)(t.h2,{children:[`About `,(0,i.jsx)(t.code,{children:`itemPath`}),` and `,(0,i.jsx)(t.code,{children:`path`})]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`itemPath`}),` points to the root of each iterated item, while `,(0,i.jsx)(t.code,{children:`path`}),` points to the root of the data source:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`Individual values and dynamic paths`}),`
`,(0,i.jsxs)(t.p,{children:[`Since `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` renders its children once per item, the field components inside must receive values based on the different items in the array. This can be done in two ways:`]}),`
`,(0,i.jsx)(t.h3,{children:`1. itemPath`}),`
`,(0,i.jsxs)(t.p,{children:[`If field components inside `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` are given an `,(0,i.jsx)(t.code,{children:`itemPath`}),` property, this will look for values based on the array item being the root of the structure, even if the array often comes from a surrounding data set. This means you do not need to think about which index the field should point to, because it is handled by `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` internally. You can treat the individual item as its own structure.`]}),`
`,(0,i.jsx)(t.h3,{children:`2. Function callback as children (render property)`}),`
`,(0,i.jsxs)(t.p,{children:[`If you want to provide values to individual field components directly instead of pointing to them with paths, you can give `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` a render property. It works a bit like an array map call. The render function provides the value of the item as the first argument, the index of which item you are on as the second, and the internal array as the third.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Iterate.Array path="/listOfHeroes">
    {(itemValue, itemIndex, internalArray) => {
      return <Field.Name.Last itemPath="/name" />
    }}
  </Iterate.Array>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can also get the index by using the `,(0,i.jsx)(t.code,{children:`useItem`}),` hook:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const MyItem = () => {
  const { index } = Iterate.useItem()

  return <Field.Name.Last itemPath="/name" />
}

render(
  <Iterate.Array path="/listOfHeroes">
    <MyItem />
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`The item number in labels`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`{itemNo}`}),` variable in the label to display the current item number. This is useful when you have a list of items and you want to display the item number in the label.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Field.String itemPath="/" label="Item no. {itemNo}" />
  </Iterate.Array>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` also support `,(0,i.jsx)(t.code,{children:`{itemNo}`}),` in the `,(0,i.jsx)(t.code,{children:`title`}),` property to display the current item number.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Iterate.ViewContainer title="Item no. {itemNo}">
      ...
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Initial container mode`}),`
`,(0,i.jsxs)(t.p,{children:[`This section describes the behavior of the `,(0,i.jsx)(t.code,{children:`EditContainer`}),` and the `,(0,i.jsx)(t.code,{children:`ViewContainer`}),` components.`]}),`
`,(0,i.jsxs)(t.p,{children:[`By default, the container mode is set to `,(0,i.jsx)(t.code,{children:`auto`}),`. This means that the container will open (switch to `,(0,i.jsx)(t.code,{children:`edit`}),` mode) when there is an error in the container or the value is falsy (empty string, null, undefined, etc.).`]}),`
`,(0,i.jsxs)(t.p,{children:[`When a new item is added via the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushButton/`,children:`Iterate.PushButton`}),` component, the item before it will change to `,(0,i.jsx)(t.code,{children:`view`}),` mode, if it had no validation errors.`]}),`
`,(0,i.jsx)(t.h2,{children:`Filter data`}),`
`,(0,i.jsx)(t.p,{children:`You can filter data by paths specific or all paths.`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`/myList/0`}),` will filter out the first item of the list, including `,(0,i.jsx)(t.code,{children:`foo`}),` and `,(0,i.jsx)(t.code,{children:`bar`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`/myList/1/foo`}),` will filter out `,(0,i.jsx)(t.code,{children:`foo`}),` inside the second item of the list.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`/myList/*/foo`}),` will filter out all `,(0,i.jsx)(t.code,{children:`foo`}),` object keys from all items of the list.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`/myList/*/subList/*/foo`}),` does support multi wildcard paths.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`In the example below, the data given in `,(0,i.jsx)(t.code,{children:`onSubmit`}),` will still have "foo2" and "bar2" of the list.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.p,{children:[`Instead of `,(0,i.jsx)(t.code,{children:`false`}),` you can provide a function that returns `,(0,i.jsx)(t.code,{children:`false`}),` based on your logic.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};