import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BICIY3-r.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.ViewContainer />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Iterate.ViewContainer`}),` enables users to toggle (with animation) the content of each item between this view and the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` container. It can be used instead of the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/AnimatedContainer/`,children:`Iterate.AnimatedContainer`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/ViewContainer`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/ViewContainer`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`By default, it features the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),` containing a "Edit" button and a `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/RemoveButton/`,children:`Iterate.RemoveButton`}),` button. The "Remove" will delete the current item from the array.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer
      title="Edit account holder"
      titleWhenNew="New account holder"
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.EditContainer>

    <Iterate.ViewContainer title="Account holder">
      <Value.Name.Last itemPath="/name" />
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`The item number in the title`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`{itemNo}`}),` variable in the `,(0,r.jsx)(n.code,{children:`title`}),` property to display the current item number.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.Name.Last itemPath="/name" />
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Customize the Toolbar`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      <Value.Name.Last itemPath="/name" />

      <Iterate.Toolbar>
        <Iterate.ViewContainer.EditButton />
        <Iterate.ViewContainer.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Variants`}),`
`,(0,r.jsx)(n.h4,{children:(0,r.jsx)(n.code,{children:`minimumOneItem`})}),`
`,(0,r.jsx)(n.p,{children:`This variant has the following behavior:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`When `,(0,r.jsx)(n.code,{children:`ViewContainer`}),` is visible, and the number of items in the array is one, the remove button will be hidden.`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer toolbarVariant="minimumOneItem">
      Item Content
    </Iterate.ViewContainer>
  </Iterate.Array>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Iterate.ViewContainer`}),` component has an `,(0,r.jsx)(n.code,{children:`aria-label`}),` attribute, which is set to the `,(0,r.jsx)(n.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,r.jsx)(n.p,{children:`When the item (view and edit) container gets removed, the active element focus will be set on the previous item.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};