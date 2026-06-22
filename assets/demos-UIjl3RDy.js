import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{c as i}from"./ToggleButton-DoxBGtHF.js";import{j as a,l as o,v as s,w as c}from"./forms-CsJzlVUF.js";import{t as l}from"./Card-DP9KYSzC.js";import{t as u}from"./Section-DfvD9Xmd.js";import{B as d}from"./index-DdG6L_K8.js";import{t as f}from"./ComponentBox-q_23Ylzi.js";var p=e({OutsideTreeFields:()=>g,SectionInsideOutlet:()=>_}),m=n(t()),h=n(r()),g=()=>(0,h.jsx)(f,{hideCode:!0,scope:{useId:m.useId},stableName:`OutsideTreeFields`,sourceImports:[`import { useId } from 'react'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Flex:i,Form:c,Card:l,Value:s,Field:a},noInline:!0,children:`const Example = () => {
  const formHandlerId = useId()
  return (
    <Flex.Stack>
      <Form.Handler
        id={formHandlerId}
        data={{
          firstName: 'Nora',
          lastName: 'Mork',
        }}
        required
      >
        <Flex.Stack>
          <Form.Card>
            <Form.SubHeading>Form.Handler</Form.SubHeading>
            <Value.Composition label="Name">
              <Value.String path="/firstName" />
              <Value.String path="/lastName" />
            </Value.Composition>
          </Form.Card>
        </Flex.Stack>
      </Form.Handler>

      <Form.Card>
        <Flex.Stack>
          <Form.SubHeading>Linked editor (Form.Outlet)</Form.SubHeading>

          <Form.Outlet formHandlerId={formHandlerId}>
            <Field.Name.First path="/firstName" />
            <Field.Name.Last path="/lastName" />
          </Form.Outlet>
        </Flex.Stack>
      </Form.Card>
    </Flex.Stack>
  )
}
render(<Example />)
`}),_=()=>(0,h.jsx)(f,{hideCode:!0,scope:{useId:m.useId},stableName:`SectionInsideOutlet`,sourceImports:[`import { useId } from 'react'`,`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Flex:i,Form:c,Card:l,Field:a,Section:u,Tools:o},noInline:!0,children:`const Example = () => {
  const formHandlerId = useId()
  return (
    <>
      <Flex.Stack>
        <Form.Handler id={formHandlerId} required>
          <Flex.Stack>
            <Form.Card>
              <Form.SubHeading>Form.Handler</Form.SubHeading>
              <Field.Composition width="large">
                <Field.Name.First path="/mySection/firstName" />
                <Field.Name.Last path="/mySection/lastName" />
              </Field.Composition>
              <Form.SubmitButton />
            </Form.Card>
          </Flex.Stack>
        </Form.Handler>

        <Form.Outlet formHandlerId={formHandlerId}>
          <Form.Card>
            <Form.SubHeading>
              Linked editor in Form.Section (Form.Outlet)
            </Form.SubHeading>

            <Form.Section path="/mySection">
              <Flex.Stack>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last path="/lastName" />
                </Field.Composition>
                <Form.SubmitButton />
              </Flex.Stack>
            </Form.Section>
            <Tools.Log
              label="Linked data"
              placeholder="Type in either place to see linked data"
            />
          </Form.Card>
        </Form.Outlet>
      </Flex.Stack>
    </>
  )
}
render(<Example />)
`});function v(e){let t={h2:`h2`,h3:`h3`,...d(),...e.components};return p||b(`Examples`,!1),g||b(`Examples.OutsideTreeFields`,!0),_||b(`Examples.SectionInsideOutlet`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Link data between handler and outlet`}),`
`,(0,h.jsx)(g,{}),`
`,(0,h.jsx)(t.h3,{children:`Linked data inside Form.Section in outlet`}),`
`,(0,h.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};