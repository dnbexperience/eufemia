import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CsUfJSp5.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.ViewContainer />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.Section.ViewContainer`}),` enables users to toggle (with animation) the content of each item between this view and the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` container.`]}),`
`,(0,r.jsx)(n.p,{children:`By default, it features the toolbar containing a "Edit" button.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h2,{children:`Customize the Toolbar`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Value } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`ViewContainer`}),` component has an `,(0,r.jsx)(n.code,{children:`aria-label`}),` attribute, which is set to the `,(0,r.jsx)(n.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,r.jsx)(n.p,{children:`When the item (view and edit) container gets removed, the active element focus will be set on the previous item.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};