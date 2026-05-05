import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{D as i,E as a,S as o,T as s,_ as c,a as l,d as u,f as d,h as f,i as p,l as m,m as ee,p as h,r as g,rt as _,s as v,t as y,v as b,x,y as S}from"./ComponentBox-geTEYZ7b.js";import{Er as C,G as w,Ri as T,Rr as E,Xn as D,Yn as O,h as k,ln as A,tr as j,un as M,v as N}from"./index-CMgyXmp3.js";import{t as P}from"./ChildrenWithAgeTranslations-J1W_VR7E.js";var F=e(n()),I=r(),L=9;function R({mode:e,enableAdditionalQuestions:t,toWizardStep:n,...r}){let i=D(r),a=O(r);return(0,I.jsx)(h,{translations:P,required:!0,...a,children:e===`summary`?(0,I.jsx)(B,{toWizardStep:n,spacingProps:i,enableAdditionalQuestions:t}):(0,I.jsx)(z,{enableAdditionalQuestions:t,spacingProps:i})})}function z({spacingProps:e,enableAdditionalQuestions:t}){let n=w(),{getValue:r}=u(),o=r(`/hasChildren`)===!0;return(0,I.jsxs)(d,{...e,children:[(0,I.jsx)(_,{children:n.ChildrenWithAge.hasChildren.title}),(0,I.jsx)(a,{path:`/hasChildren`,label:n.ChildrenWithAge.hasChildren.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.hasChildren.required}}),(0,I.jsxs)(x,{pathTrue:`/hasChildren`,animate:!0,children:[(0,I.jsx)(i,{path:`/countChildren`,label:n.ChildrenWithAge.countChildren.fieldLabel,errorMessages:{"NumberField.errorMinimum":n.ChildrenWithAge.countChildren.required,"Field.errorRequired":n.ChildrenWithAge.countChildren.required},defaultValue:1,width:`small`,showStepControls:!0,minimum:1,maximum:L,decimalLimit:0,allowNegative:!1}),(0,I.jsx)(v,{path:`/children`,countPath:`/countChildren`,countPathLimit:L,animate:!0,children:(0,I.jsx)(i,{itemPath:`/age`,label:n.ChildrenWithAge.childrenAge.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.childrenAge.required},width:`small`,minimum:0,maximum:17,decimalLimit:0,allowNegative:!1})})]}),t?.includes(`daycare`)&&(0,I.jsx)(x,{pathTrue:`/hasChildren`,animate:!0,children:(0,I.jsx)(a,{path:`/usesDaycare`,label:n.ChildrenWithAge.usesDaycare.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.usesDaycare.required},help:{title:n.ChildrenWithAge.usesDaycare.fieldLabel,content:n.renderMessage(n.ChildrenWithAge.usesDaycare.helpText)}})}),t?.includes(`daycare`)&&o&&(0,I.jsx)(x,{pathTrue:`/usesDaycare`,animate:!0,children:(0,I.jsx)(s,{path:`/daycareExpenses`,label:n.ChildrenWithAge.dayCareExpenses.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.dayCareExpenses.required},minimum:1,maximum:1e6,decimalLimit:0,allowNegative:!1})}),t?.includes(`joint-responsibility`)&&(0,I.jsx)(x,{pathTrue:`/hasChildren`,animate:!0,children:(0,I.jsx)(a,{path:`/hasJointResponsibility`,label:n.ChildrenWithAge.hasJointResponsibility.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.hasJointResponsibility.required}})}),t?.includes(`joint-responsibility`)&&o&&(0,I.jsx)(x,{pathTrue:`/hasJointResponsibility`,animate:!0,children:(0,I.jsx)(s,{path:`/jointResponsibilityExpenses`,label:n.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.jointResponsibilityExpenses.required},minimum:1,maximum:1e6,decimalLimit:0,allowNegative:!1})})]})}function B({spacingProps:e,toWizardStep:t}){let n=w();return(0,I.jsxs)(d,{...e,children:[(0,I.jsx)(_,{children:n.ChildrenWithAge.hasChildren.title}),(0,I.jsxs)(o,{children:[(0,I.jsx)(b,{path:`/hasChildren`,label:n.ChildrenWithAge.hasChildren.fieldLabel}),(0,I.jsxs)(x,{pathTrue:`/hasChildren`,children:[(0,I.jsx)(S,{path:`/countChildren`,label:n.ChildrenWithAge.countChildren.fieldLabel,suffix:n.ChildrenWithAge.countChildren.suffix,maximum:L}),(0,I.jsx)(v,{path:`/children`,children:(0,I.jsx)(S,{itemPath:`/age`,label:n.ChildrenWithAge.childrenAge.fieldLabel,suffix:n.ChildrenWithAge.childrenAge.suffix,defaultValue:`–`})}),(0,I.jsxs)(x,{pathDefined:`/usesDaycare`,children:[(0,I.jsx)(b,{label:n.ChildrenWithAge.usesDaycare.fieldLabel,path:`/usesDaycare`}),(0,I.jsx)(x,{pathTrue:`/usesDaycare`,children:(0,I.jsx)(c,{label:n.ChildrenWithAge.dayCareExpenses.fieldLabel,path:`/daycareExpenses`,decimals:0})})]}),(0,I.jsxs)(x,{pathDefined:`/hasJointResponsibility`,children:[(0,I.jsx)(b,{path:`/hasJointResponsibility`,label:n.ChildrenWithAge.hasJointResponsibility.fieldLabel}),(0,I.jsx)(x,{pathTrue:`/hasJointResponsibility`,children:(0,I.jsx)(c,{label:n.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel,path:`/jointResponsibilityExpenses`,decimals:0})})]})]})]}),typeof t==`number`?(0,I.jsx)(m,{toStep:t}):null]})}T(R,{_supportsSpacingProps:!0});var V=t({ChildrenWithAge:()=>R}),H=t({ChildrenWithAge:()=>U,ChildrenWithAgePrefilledYes:()=>q,ChildrenWithAgeSummaryMultipleChildren:()=>Y,ChildrenWithAgeSummaryMultipleNoAnswers:()=>J,ChildrenWithAgeSummaryNoChildren:()=>X,ChildrenWithAgeSummaryNoChildrenAfterFilledOutData:()=>Z,ChildrenWithAgeWizard:()=>W,WithToolbar:()=>G}),U=e=>(0,I.jsx)(f,{onSubmit:(e,{reduceToVisibleFields:t})=>{console.log(t(e))},children:(0,I.jsx)(G,{children:(0,I.jsxs)(M,{children:[(0,I.jsx)(R,{...e}),(0,I.jsx)(R,{mode:`summary`,...e})]})})}),W=e=>(0,I.jsx)(y,{scope:{Blocks:V,props:e},noInline:!0,children:`const MyForm = () => {
  const myTranslations = {
    'nb-NO': {
      ChildrenWithAge: {
        hasChildren: {
          title: 'Utgifter til barn',
          fieldLabel:
            'Har du/dere barn under 18 år som dere er økonomisk ansvarlige for?',
          required:
            'Du må angi om du/dere har barn under 18 år som dere er økonomisk ansvarlige for.',
        },
      },
    },
    'en-GB': {
      ChildrenWithAge: {
        hasChildren: {
          title: 'Child expenses',
          fieldLabel:
            'Do you have children under the age of 18 for whom you are financially responsible?',
          required:
            'You must state whether you have children under the age of 18 for whom you are financially responsible.',
        },
      },
    },
  }
  const { summaryTitle } = Form.useTranslation().Step
  return (
    <Form.Handler
      onSubmit={(data, { reduceToVisibleFields }) => {
        console.log(reduceToVisibleFields(data))
      }}
      translations={myTranslations}
    >
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Blocks.ChildrenWithAge
            enableAdditionalQuestions={['joint-responsibility', 'daycare']}
            {...props}
          />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <Blocks.ChildrenWithAge
            mode="summary"
            toWizardStep={0}
            {...props}
          />

          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton variant="send" />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
`});function G({children:e}){let{filterData:t}=u(),n=(0,F.useMemo)(()=>({"/toggleToolOf":!1}),[]),r=(0,F.useMemo)(()=>({current:()=>t(n)}),[t,n]),i=(0,F.useRef)(void 0),a=(0,F.useRef)(void 0);return(0,I.jsxs)(M,{top:`large`,children:[(0,I.jsx)(p,{generateRef:i,filterData:n,children:(0,I.jsx)(l,{generateRef:a,filterData:n,children:e})}),(0,I.jsx)(C,{backgroundColor:`sand-yellow`,innerSpace:!0,children:(0,I.jsxs)(A,{align:`center`,children:[(0,I.jsx)(ee,{text:`Submit`}),(0,I.jsxs)(k,{path:`/toggleToolOf`,variant:`button`,optionsLayout:`horizontal`,children:[(0,I.jsx)(N,{value:`off`,title:`Off`}),(0,I.jsx)(N,{value:`data`,title:`Data`}),(0,I.jsx)(N,{value:`props`,title:`Props`}),(0,I.jsx)(N,{value:`schema`,title:`Schema`})]}),(0,I.jsx)(j,{title:`About Data, Props and Schema`,children:`Data, Props and Schema will show block relevant information. Schema is an automatically generated Ajv schema, while props shows all used props to define the block functionality.`})]})}),(0,I.jsx)(x,{visibleWhen:{path:`/toggleToolOf`,hasValue:`data`},children:(0,I.jsx)(K,{title:`Data`,generateRef:r})}),(0,I.jsx)(x,{visibleWhen:{path:`/toggleToolOf`,hasValue:`props`},children:(0,I.jsx)(K,{title:`Props`,generateRef:i})}),(0,I.jsx)(x,{visibleWhen:{path:`/toggleToolOf`,hasValue:`schema`},children:(0,I.jsx)(K,{title:`Schema`,generateRef:a,transform:e=>e.schema})})]})}function K({title:e,generateRef:t,transform:n=e=>e}){let r=n(t.current());return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(_,{children:e}),(0,I.jsx)(g,{data:r})]})}var q=()=>(0,I.jsx)(y,{"data-visual-test":`children-with-age-prefilled`,scope:{Blocks:V},children:`<Form.Handler
  data={{
    hasChildren: true,
    hasJointResponsibility: true,
    usesDaycare: true,
    daycareExpenses: 123,
    countChildren: 2,
    children: [{}, {}],
  }}
>
  <Flex.Stack>
    <Blocks.ChildrenWithAge
      enableAdditionalQuestions={['joint-responsibility', 'daycare']}
    />
  </Flex.Stack>
</Form.Handler>
`}),J=()=>(0,I.jsx)(y,{"data-visual-test":`children-with-age-summary-multiple-no-answers`,scope:{Blocks:V,multipleChildrenNoJointAndDaycare:{hasChildren:!0,hasJointResponsibility:!1,usesDaycare:!1,countChildren:2,children:[{age:0},{age:0}]}},children:`
<Blocks.ChildrenWithAge
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>

`}),Y=()=>(0,I.jsx)(y,{"data-visual-test":`children-with-age-summary-multiple-children`,scope:{Blocks:V,multipleChildren:{hasChildren:!0,usesDaycare:!0,hasJointResponsibility:!0,daycareExpenses:4001,jointResponsibilityExpenses:1004,countChildren:2,children:[{age:1},{age:2}]}},children:`
<Blocks.ChildrenWithAge
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>

`}),X=()=>(0,I.jsx)(y,{"data-visual-test":`children-with-age-summary-no-children`,scope:{Blocks:V,noChildren:{hasChildren:!1}},children:`
<Blocks.ChildrenWithAge data={noChildren} />
<Blocks.ChildrenWithAge mode="summary" data={noChildren} />

`}),Z=()=>(0,I.jsx)(y,{"data-visual-test":`children-with-age-summary-previously-filled-out-data`,scope:{Blocks:V,noChildren:{hasChildren:!1,countChildren:3,usesDaycare:!0,hasJointResponsibility:!0,daycareExpenses:4001,jointResponsibilityExpenses:1004,children:[{age:1},{age:2},{age:3}]}},children:`
<Blocks.ChildrenWithAge
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>

`});function Q(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...E(),...e.components},{VisibleWhenVisualTest:n}=t;return H||$(`Examples`,!1),U||$(`Examples.ChildrenWithAge`,!0),q||$(`Examples.ChildrenWithAgePrefilledYes`,!0),Y||$(`Examples.ChildrenWithAgeSummaryMultipleChildren`,!0),J||$(`Examples.ChildrenWithAgeSummaryMultipleNoAnswers`,!0),X||$(`Examples.ChildrenWithAgeSummaryNoChildren`,!0),Z||$(`Examples.ChildrenWithAgeSummaryNoChildrenAfterFilledOutData`,!0),W||$(`Examples.ChildrenWithAgeWizard`,!0),n||$(`VisibleWhenVisualTest`,!0),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(t.h2,{children:`Demos`}),`
`,(0,I.jsx)(t.h3,{children:`In Wizard`}),`
`,(0,I.jsxs)(t.p,{children:[`All features, and additional questions (`,(0,I.jsx)(t.code,{children:`enableAdditionalQuestions`}),`) and custom translations, are enabled in this example.`]}),`
`,(0,I.jsx)(W,{}),`
`,(0,I.jsx)(t.h3,{children:`Basic`}),`
`,(0,I.jsx)(U,{}),`
`,(0,I.jsxs)(t.h3,{children:[`With `,(0,I.jsx)(t.code,{children:`joint-responsibility`}),` question`]}),`
`,(0,I.jsx)(U,{enableAdditionalQuestions:[`joint-responsibility`]}),`
`,(0,I.jsxs)(t.h3,{children:[`With `,(0,I.jsx)(t.code,{children:`daycare`}),` question`]}),`
`,(0,I.jsx)(U,{enableAdditionalQuestions:[`daycare`]}),`
`,(0,I.jsxs)(t.h3,{children:[`With `,(0,I.jsx)(t.code,{children:`daycare`}),` and `,(0,I.jsx)(t.code,{children:`joint-responsibility`}),` question`]}),`
`,(0,I.jsx)(U,{enableAdditionalQuestions:[`daycare`,`joint-responsibility`]}),`
`,(0,I.jsxs)(n,{children:[(0,I.jsx)(q,{}),(0,I.jsx)(X,{}),(0,I.jsx)(Y,{}),(0,I.jsx)(J,{}),(0,I.jsx)(Z,{})]})]})}function te(e={}){let{wrapper:t}={...E(),...e.components};return t?(0,I.jsx)(t,{...e,children:(0,I.jsx)(Q,{...e})}):Q(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{te as default};