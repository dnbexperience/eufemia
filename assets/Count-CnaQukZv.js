import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-DGxSvRQC.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Count />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Iterate.Count`}),` is a helper component that returns the count of a data array or object.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Count`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Count`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  return <Iterate.Count path="/myList" />
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.p,{children:`You can use the hook as well:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const { count } = Iterate.useCount() // id of the form is not needed when called inside a Form.Handler

  return count('/myList')
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also give a custom `,(0,r.jsx)(n.code,{children:`filter`}),` function to count only specific items:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Iterate.Count path="/myList" filter={(item) => item !== 'bar'} />
`})}),`
`,(0,r.jsx)(n.p,{children:`Or give the hook a filter:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const { count } = Iterate.useCount()

  return count('/myList', (item) => item !== 'bar')
}
`})}),`
`,(0,r.jsx)(n.p,{children:`You can also count over objects:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.Handler data={{ myList: { foo: 1, bar: 2 } }}>
  <Iterate.Count path="/myList" filter={([key, value]) => key !== 'bar'} />
</Form.Handler>
`})}),`
`,(0,r.jsx)(n.p,{children:`And you can call it outside of the context as well:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`render(
  <>
    <Form.Handler id="myForm" data={{ myList: ['foo', 'bar'] }}>
      Form Content
    </Form.Handler>

    <Iterate.Count path="/myList" id="myForm" />
  </>
)
`})}),`
`,(0,r.jsx)(n.p,{children:`And call it as a function as well (id is required):`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const count = Iterate.count({ id: myFormId, path: '/myList' })

  return (
    <Form.Handler id={myFormId} data={{ myList: ['foo', 'bar'] }}>
      <MyComponent />
    </Form.Handler>
  )
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};