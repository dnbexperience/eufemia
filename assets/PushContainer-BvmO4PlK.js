import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-DwFwhG9X.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.PushContainer />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Iterate.PushContainer`}),` enables users to create a new item in the array. It can be used instead of the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/PushButton/`,children:`Iterate.PushButton`}),`, but with fields in the container.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/PushContainer`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/PushContainer`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`It allows the user to fill in the fields without storing them in the data context.`}),`
`,(0,r.jsx)(n.p,{children:`Good to know:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Fields inside the container must have an `,(0,r.jsx)(n.code,{children:`itemPath`}),` defined, instead of a `,(0,r.jsx)(n.code,{children:`path`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[`If the user enters data without committing it to the outer context, that data will be lost when navigating to another step in the Wizard. To prevent this, you can use the `,(0,r.jsx)(n.code,{children:`preventUncommittedChanges`}),` property on the PushContainer. When enabled, it will display an error message if the user tries to proceed without committing their changes.`]}),`
`,(0,r.jsxs)(n.li,{children:[`You can provide `,(0,r.jsx)(n.code,{children:`data`}),`, `,(0,r.jsx)(n.code,{children:`defaultData`}),` in addition to `,(0,r.jsx)(n.code,{children:`isolatedData`}),` to prefill the fields.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The `,(0,r.jsx)(n.code,{children:`path`}),` you define needs to point to an existing `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` path.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.p,{children:[`You may place it below the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` component like this:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer path="/myList" title="New item title">
      <Field.Name.Last itemPath="/name" />
    </Iterate.PushContainer>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Prevent the form from being submitted`}),`
`,(0,r.jsxs)(n.p,{children:[`To prevent the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` from being submitted when there are fields with errors inside the PushContainer, you can use the `,(0,r.jsx)(n.code,{children:`bubbleValidation`}),` property.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer path="/myList" bubbleValidation>
      <Field.Name.Last itemPath="/name" required />
    </Iterate.PushContainer>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Show a button to create a new item`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, it keeps the form open after a new item has been created. You can change this behavior by using the `,(0,r.jsx)(n.code,{children:`openButton`}),` and `,(0,r.jsx)(n.code,{children:`showOpenButtonWhen`}),` properties.`]}),`
`,(0,r.jsxs)(n.p,{children:[`These properties allow you to render a button (`,(0,r.jsx)(n.code,{children:`openButton`}),`) and determine when to show it based on the logic provided by the `,(0,r.jsx)(n.code,{children:`showOpenButtonWhen`}),` function. The `,(0,r.jsx)(n.code,{children:`showOpenButtonWhen`}),` function receives the current list of items as an argument.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The button will be shown instead of the content provided by the children when the `,(0,r.jsx)(n.code,{children:`showOpenButtonWhen`}),` function returns `,(0,r.jsx)(n.code,{children:`true`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer
      path="/myList"
      title="New item title"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another item" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      Will be hidden based on the showOpenButtonWhen function
    </Iterate.PushContainer>
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Iterate.PushContainer.OpenButton`}),` accepts the same properties as the `,(0,r.jsx)(n.a,{href:`/uilib/components/button/`,children:`Button`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Show the next item number in the open button`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`{nextItemNo}`}),` variable in the `,(0,r.jsx)(n.code,{children:`text`}),` or `,(0,r.jsx)(n.code,{children:`children`}),` property to display the next item number.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer
      path="/myList"
      title="New item title"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add no. {nextItemNo}" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.PushContainer>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Technical details`}),`
`,(0,r.jsxs)(n.p,{children:[`Under the hood, it uses the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),` component to isolate the data from the rest of the form. It also uses the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` inside the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` component to render the fields.`]}),`
`,(0,r.jsxs)(n.p,{children:[`All fields inside the container will be stored in the data context at this path: `,(0,r.jsx)(n.code,{children:`/pushContainerItems/0`}),`.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};