import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-C1A0ualT.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.ViewContainer />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Section.ViewContainer`}),` enables users to toggle (with animation) the content of each item between this view and the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` container.`]}),`
`,(0,i.jsx)(t.p,{children:`By default, it features the toolbar containing a "Edit" button.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer title="Edit account holder">
      <Field.Name.Last path="/name" />
    </Form.Section.EditContainer>

    <Form.Section.ViewContainer title="Account holder">
      <Value.Name.Last path="/name" />
    </Form.Section.ViewContainer>
  </Form.Section>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Customize the Toolbar`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.ViewContainer>
      <Value.Name.Last itemPath="/name" />

      <Form.Section.Toolbar>
        <Form.Section.ViewContainer.EditButton />
      </Form.Section.Toolbar>
    </Form.Section.ViewContainer>
  </Form.Section>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`ViewContainer`}),` component has an `,(0,i.jsx)(t.code,{children:`aria-label`}),` attribute, which is set to the `,(0,i.jsx)(t.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,i.jsx)(t.p,{children:`When the item (view and edit) container gets removed, the active element focus will be set on the previous item.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};