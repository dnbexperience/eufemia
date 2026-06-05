import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-CrwMLiET.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.EditContainer />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Section.EditContainer`}),` enables users to toggle (with animation) the content of each item between the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` and this edit container.`]}),`
`,(0,i.jsx)(t.p,{children:`By default, it features a toolbar containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer title="Edit account holder">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>

    <Form.Section.ViewContainer title="Account holder">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  </Form.Section>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Customize the Toolbar`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer>
      <Field.Name.Last itemPath="/name" />
      <Form.Section.Toolbar>
        <Form.Section.EditContainer.DoneButton />
        <Form.Section.EditContainer.CancelButton />
      </Form.Section.Toolbar>
    </Form.Section.EditContainer>
  </Form.Section>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`EditContainer`}),` component has an `,(0,i.jsx)(t.code,{children:`aria-label`}),` attribute, which is set to the `,(0,i.jsx)(t.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,i.jsx)(t.p,{children:`When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};