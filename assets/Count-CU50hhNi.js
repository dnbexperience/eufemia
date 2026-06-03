import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-C6Mvyf_8.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Count />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Iterate.Count`}),` is a helper component that returns the count of a data array or object.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Count`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Count`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  return <Iterate.Count path="/myList" />
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`You can use the hook as well:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const { count } = Iterate.useCount() // id of the form is not needed when called inside a Form.Handler

  return count('/myList')
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can also give a custom `,(0,i.jsx)(t.code,{children:`filter`}),` function to count only specific items:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Iterate.Count path="/myList" filter={(item) => item !== 'bar'} />
`})}),`
`,(0,i.jsx)(t.p,{children:`Or give the hook a filter:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const { count } = Iterate.useCount()

  return count('/myList', (item) => item !== 'bar')
}
`})}),`
`,(0,i.jsx)(t.p,{children:`You can also count over objects:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.Handler data={{ myList: { foo: 1, bar: 2 } }}>
  <Iterate.Count path="/myList" filter={([key, value]) => key !== 'bar'} />
</Form.Handler>
`})}),`
`,(0,i.jsx)(t.p,{children:`And you can call it outside of the context as well:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <>
    <Form.Handler id="myForm" data={{ myList: ['foo', 'bar'] }}>
      Form Content
    </Form.Handler>

    <Iterate.Count path="/myList" id="myForm" />
  </>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`And call it as a function as well (id is required):`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const count = Iterate.count({ id: myFormId, path: '/myList' })

  return (
    <Form.Handler id={myFormId} data={{ myList: ['foo', 'bar'] }}>
      <MyComponent />
    </Form.Handler>
  )
}
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};