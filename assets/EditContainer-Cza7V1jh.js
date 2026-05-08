import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-CvRVkcMb.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.EditContainer />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.Section.EditContainer`}),` enables users to toggle (with animation) the content of each item between the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` and this edit container.`]}),`
`,(0,r.jsx)(n.p,{children:`By default, it features a toolbar containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h2,{children:`Customize the Toolbar`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`EditContainer`}),` component has an `,(0,r.jsx)(n.code,{children:`aria-label`}),` attribute, which is set to the `,(0,r.jsx)(n.code,{children:`title`}),` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.`]}),`
`,(0,r.jsx)(n.p,{children:`When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};