import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CudrG74x.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Toolbar />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`Iterate.Toolbar`}),` to enhance each item in the array with additional functionality. It's particularly useful within components like `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/AnimatedContainer`,children:`Iterate.AnimatedContainer`}),` to incorporate a toolbar with extra tools.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Toolbar`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Toolbar`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The Toolbar is integrated into the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.AnimatedContainer>
      Item Content
      <Iterate.Toolbar>
        <Iterate.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.AnimatedContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Customize the Toolbar`}),`
`,(0,r.jsx)(n.p,{children:`You can customize the toolbar by either passing a function as a child or as a JSX element:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      Item view content
      <Iterate.Toolbar>
        <Iterate.ViewContainer.EditButton />
        <Iterate.ViewContainer.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.ViewContainer>

    <Iterate.EditContainer>
      Item edit content
      <Iterate.Toolbar>
        <Iterate.EditContainer.DoneButton />
        <Iterate.EditContainer.CancelButton />
      </Iterate.Toolbar>
    </Iterate.EditContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.p,{children:`You can also provide a function as a child. The function will receive the following parameters as an object:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`index`}),` the index of the current item in the array.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`value`}),` the value of the current item.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`items`}),` the array of items.`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      Item Content
      <Iterate.Toolbar>
        {({ items, index, value }) => {
          return items.length === 1 ? null : (
            <>
              <Iterate.ViewContainer.EditButton />
              <Iterate.ViewContainer.RemoveButton />
            </>
          )
        }}
      </Iterate.Toolbar>
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};