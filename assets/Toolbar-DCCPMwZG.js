import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-DD70a208.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Toolbar />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`Iterate.Toolbar`}),` to enhance each item in the array with additional functionality. It's particularly useful within components like `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/AnimatedContainer`,children:`Iterate.AnimatedContainer`}),` to incorporate a toolbar with extra tools.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Toolbar`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Toolbar`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`The Toolbar is integrated into the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`Customize the Toolbar`}),`
`,(0,i.jsx)(t.p,{children:`You can customize the toolbar by either passing a function as a child or as a JSX element:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.p,{children:`You can also provide a function as a child. The function will receive the following parameters as an object:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`index`}),` the index of the current item in the array.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`value`}),` the value of the current item.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`items`}),` the array of items.`]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};