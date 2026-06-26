import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-Wkf3MdWR.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.EditContainer />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Iterate.EditContainer`}),` enables users to toggle (with animation) the content of each item between the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and this edit container. It can be used instead of the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/AnimatedContainer/`,children:`Iterate.AnimatedContainer`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/EditContainer`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/EditContainer`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`By default, it features the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),` containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`The item number in the title`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`{itemNo}`}),` variable in the `,(0,i.jsx)(t.code,{children:`title`}),` or the `,(0,i.jsx)(t.code,{children:`titleWhenNew`}),` property to display the current item number.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.EditContainer>
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Get the internal item object`}),`
`,(0,i.jsxs)(t.p,{children:[`You can get the internal item object by using the `,(0,i.jsx)(t.code,{children:`Iterate.useItem`}),` hook.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyItemForm = () => {
  // TypeScript type inference
  const item = Iterate.useItem<{ foo: string }>()
  console.log('My item:', item.index, item.value.foo)

  return <Field.String itemPath="/" />
}

render(
  <Iterate.Array value={['foo', 'bar']}>
    <MyItemForm />
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Customize the Toolbar`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer>
      <Field.Name.Last itemPath="/name" />
      <Iterate.Toolbar>
        <Iterate.EditContainer.DoneButton />
        <Iterate.EditContainer.CancelButton />
      </Iterate.Toolbar>
    </Iterate.EditContainer>
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Variants`}),`
`,(0,i.jsx)(t.h4,{children:(0,i.jsx)(t.code,{children:`minimumOneItem`})}),`
`,(0,i.jsx)(t.p,{children:`This variant has the following behavior:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`When `,(0,i.jsx)(t.code,{children:`EditContainer`}),` is visible, and the number of items in the array is one, the entire toolbar will be hidden.`]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer toolbarVariant="minimumOneItem">
      Item Content
    </Iterate.EditContainer>
  </Iterate.Array>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Iterate.EditContainer`}),` component has an `,(0,i.jsx)(t.code,{children:`aria-label`}),` attribute, which is set to the `,(0,i.jsx)(t.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,i.jsx)(t.p,{children:`When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};