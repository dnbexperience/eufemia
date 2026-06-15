import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{t as i}from"./withComponentMarkers-MtpU7Mly.js";import{a,o}from"./Space-BSYUvJs5.js";import{t as s}from"./HelpButton-C7xeEDxM.js";import{t as c}from"./Lead-BP0Y_QOD.js";import{t as ee}from"./Section-BtXmNREe.js";import{c as te,d as l,u}from"./ToggleButton-_NsXxiTa.js";import{P as d,i as f,t as p}from"./Selection-DWa_5MEy.js";import{t as m}from"./Array-Dv1HxHKW.js";import{t as h}from"./Visibility-YtdWU-TW.js";import{c as g,l as ne,r as _,t as v}from"./Form-JTiJXf2d.js";import{i as y,n as b,t as x}from"./Currency-WZNrSwWK.js";import{i as re,n as S,r as C,t as w}from"./Currency-BzGhTxlm.js";import{n as T,r as E}from"./useEventListener-BwbCzb4i.js";import{n as D,r as O}from"./Wizard-CUdMs3bu.js";import{n as k,r as A,t as j}from"./Log-CbWy2etq.js";import{K as M}from"./index-ppRu2ktv.js";import{t as N}from"./ComponentBox-R2c6Bo76.js";import{t as P}from"./ChildrenWithAgeTranslations-Dd_pT-Bz.js";var F=n(r()),I=9;function L({mode:e,enableAdditionalQuestions:t,toWizardStep:n,...r}){let i=o(r),s=a(r);return(0,F.jsx)(ne,{translations:P,required:!0,...s,children:e===`summary`?(0,F.jsx)(z,{toWizardStep:n,spacingProps:i,enableAdditionalQuestions:t}):(0,F.jsx)(R,{enableAdditionalQuestions:t,spacingProps:i})})}function R({spacingProps:e,enableAdditionalQuestions:t}){let n=d(),{getValue:r}=_(),i=r(`/hasChildren`)===!0;return(0,F.jsxs)(g,{...e,children:[(0,F.jsx)(c,{children:n.ChildrenWithAge.hasChildren.title}),(0,F.jsx)(b,{path:`/hasChildren`,label:n.ChildrenWithAge.hasChildren.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.hasChildren.required}}),(0,F.jsxs)(h,{pathTrue:`/hasChildren`,animate:!0,children:[(0,F.jsx)(y,{path:`/countChildren`,label:n.ChildrenWithAge.countChildren.fieldLabel,errorMessages:{"NumberField.errorMinimum":n.ChildrenWithAge.countChildren.required,"Field.errorRequired":n.ChildrenWithAge.countChildren.required},defaultValue:1,width:`small`,showStepControls:!0,minimum:1,maximum:I,decimalLimit:0,allowNegative:!1}),(0,F.jsx)(m,{path:`/children`,countPath:`/countChildren`,countPathLimit:I,animate:!0,children:(0,F.jsx)(y,{itemPath:`/age`,label:n.ChildrenWithAge.childrenAge.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.childrenAge.required},width:`small`,minimum:0,maximum:17,decimalLimit:0,allowNegative:!1})})]}),t?.includes(`daycare`)&&(0,F.jsx)(h,{pathTrue:`/hasChildren`,animate:!0,children:(0,F.jsx)(b,{path:`/usesDaycare`,label:n.ChildrenWithAge.usesDaycare.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.usesDaycare.required},help:{title:n.ChildrenWithAge.usesDaycare.fieldLabel,content:n.renderMessage(n.ChildrenWithAge.usesDaycare.helpText)}})}),t?.includes(`daycare`)&&i&&(0,F.jsx)(h,{pathTrue:`/usesDaycare`,animate:!0,children:(0,F.jsx)(x,{path:`/daycareExpenses`,label:n.ChildrenWithAge.dayCareExpenses.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.dayCareExpenses.required},minimum:1,maximum:1e6,decimalLimit:0,allowNegative:!1})}),t?.includes(`joint-responsibility`)&&(0,F.jsx)(h,{pathTrue:`/hasChildren`,animate:!0,children:(0,F.jsx)(b,{path:`/hasJointResponsibility`,label:n.ChildrenWithAge.hasJointResponsibility.fieldLabel,variant:`buttons`,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.hasJointResponsibility.required}})}),t?.includes(`joint-responsibility`)&&i&&(0,F.jsx)(h,{pathTrue:`/hasJointResponsibility`,animate:!0,children:(0,F.jsx)(x,{path:`/jointResponsibilityExpenses`,label:n.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel,errorMessages:{"Field.errorRequired":n.ChildrenWithAge.jointResponsibilityExpenses.required},minimum:1,maximum:1e6,decimalLimit:0,allowNegative:!1})})]})}function z({spacingProps:e,toWizardStep:t}){let n=d();return(0,F.jsxs)(g,{...e,children:[(0,F.jsx)(c,{children:n.ChildrenWithAge.hasChildren.title}),(0,F.jsxs)(re,{children:[(0,F.jsx)(S,{path:`/hasChildren`,label:n.ChildrenWithAge.hasChildren.fieldLabel}),(0,F.jsxs)(h,{pathTrue:`/hasChildren`,children:[(0,F.jsx)(C,{path:`/countChildren`,label:n.ChildrenWithAge.countChildren.fieldLabel,suffix:n.ChildrenWithAge.countChildren.suffix,maximum:I}),(0,F.jsx)(m,{path:`/children`,children:(0,F.jsx)(C,{itemPath:`/age`,label:n.ChildrenWithAge.childrenAge.fieldLabel,suffix:n.ChildrenWithAge.childrenAge.suffix,defaultValue:`–`})}),(0,F.jsxs)(h,{pathDefined:`/usesDaycare`,children:[(0,F.jsx)(S,{label:n.ChildrenWithAge.usesDaycare.fieldLabel,path:`/usesDaycare`}),(0,F.jsx)(h,{pathTrue:`/usesDaycare`,children:(0,F.jsx)(w,{label:n.ChildrenWithAge.dayCareExpenses.fieldLabel,path:`/daycareExpenses`,decimals:0})})]}),(0,F.jsxs)(h,{pathDefined:`/hasJointResponsibility`,children:[(0,F.jsx)(S,{path:`/hasJointResponsibility`,label:n.ChildrenWithAge.hasJointResponsibility.fieldLabel}),(0,F.jsx)(h,{pathTrue:`/hasJointResponsibility`,children:(0,F.jsx)(w,{label:n.ChildrenWithAge.jointResponsibilityExpenses.fieldLabel,path:`/jointResponsibilityExpenses`,decimals:0})})]})]})]}),typeof t==`number`?(0,F.jsx)(O,{toStep:t}):null]})}i(L,{_supportsSpacingProps:!0});var B=n(t()),V=e({ChildrenWithAge:()=>L}),H=e({ChildrenWithAge:()=>U,ChildrenWithAgePrefilledYes:()=>q,ChildrenWithAgeSummaryMultipleChildren:()=>Y,ChildrenWithAgeSummaryMultipleNoAnswers:()=>J,ChildrenWithAgeSummaryNoChildren:()=>X,ChildrenWithAgeSummaryNoChildrenAfterFilledOutData:()=>Z,ChildrenWithAgeWizard:()=>W,WithToolbar:()=>G}),U=e=>(0,F.jsx)(E,{onSubmit:(e,{reduceToVisibleFields:t})=>{console.log(t(e))},children:(0,F.jsx)(G,{children:(0,F.jsxs)(l,{children:[(0,F.jsx)(L,{...e}),(0,F.jsx)(L,{mode:`summary`,...e})]})})}),W=()=>(0,F.jsx)(N,{scope:{Blocks:V},stableName:`ChildrenWithAgeWizard`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],__buildScope:{Form:v,Wizard:D},noInline:!0,children:`const MyForm = () => {
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
          />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <Blocks.ChildrenWithAge mode="summary" toWizardStep={0} />

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
`});function G({children:e}){let{filterData:t}=_(),n=(0,B.useMemo)(()=>({"/toggleToolOf":!1}),[]),r=(0,B.useMemo)(()=>({current:()=>t(n)}),[t,n]),i=(0,B.useRef)(void 0),a=(0,B.useRef)(void 0);return(0,F.jsxs)(l,{top:`large`,children:[(0,F.jsx)(k,{generateRef:i,filterData:n,children:(0,F.jsx)(A,{generateRef:a,filterData:n,children:e})}),(0,F.jsx)(ee,{variant:`information`,innerSpace:!0,children:(0,F.jsxs)(u,{align:`center`,children:[(0,F.jsx)(T,{text:`Submit`}),(0,F.jsxs)(p,{path:`/toggleToolOf`,variant:`button`,optionsLayout:`horizontal`,children:[(0,F.jsx)(f,{value:`off`,title:`Off`}),(0,F.jsx)(f,{value:`data`,title:`Data`}),(0,F.jsx)(f,{value:`props`,title:`Props`}),(0,F.jsx)(f,{value:`schema`,title:`Schema`})]}),(0,F.jsx)(s,{title:`About Data, Props and Schema`,children:`Data, Props and Schema will show block relevant information. Schema is an automatically generated Ajv schema, while props shows all used props to define the block functionality.`})]})}),(0,F.jsx)(h,{visibleWhen:{path:`/toggleToolOf`,hasValue:`data`},children:(0,F.jsx)(K,{title:`Data`,generateRef:r})}),(0,F.jsx)(h,{visibleWhen:{path:`/toggleToolOf`,hasValue:`props`},children:(0,F.jsx)(K,{title:`Props`,generateRef:i})}),(0,F.jsx)(h,{visibleWhen:{path:`/toggleToolOf`,hasValue:`schema`},children:(0,F.jsx)(K,{title:`Schema`,generateRef:a,transform:e=>e.schema})})]})}function K({title:e,generateRef:t,transform:n=e=>e}){let r=n(t.current());return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(c,{children:e}),(0,F.jsx)(j,{data:r})]})}var q=()=>(0,F.jsx)(N,{"data-visual-test":`children-with-age-prefilled`,scope:{Blocks:V},stableName:`ChildrenWithAgePrefilledYes`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],__buildScope:{Form:v,Flex:te},children:`<Form.Handler
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
`}),J=()=>(0,F.jsx)(N,{"data-visual-test":`children-with-age-summary-multiple-no-answers`,scope:{Blocks:V,multipleChildrenNoJointAndDaycare:{hasChildren:!0,hasJointResponsibility:!1,usesDaycare:!1,countChildren:2,children:[{age:0},{age:0}]}},stableName:`ChildrenWithAgeSummaryMultipleNoAnswers`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],children:`
<Blocks.ChildrenWithAge
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>

`}),Y=()=>(0,F.jsx)(N,{"data-visual-test":`children-with-age-summary-multiple-children`,scope:{Blocks:V,multipleChildren:{hasChildren:!0,usesDaycare:!0,hasJointResponsibility:!0,daycareExpenses:4001,jointResponsibilityExpenses:1004,countChildren:2,children:[{age:1},{age:2}]}},stableName:`ChildrenWithAgeSummaryMultipleChildren`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],children:`
<Blocks.ChildrenWithAge
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>

`}),X=()=>(0,F.jsx)(N,{"data-visual-test":`children-with-age-summary-no-children`,scope:{Blocks:V,noChildren:{hasChildren:!1}},stableName:`ChildrenWithAgeSummaryNoChildren`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],children:`
<Blocks.ChildrenWithAge data={noChildren} />
<Blocks.ChildrenWithAge mode="summary" data={noChildren} />

`}),Z=()=>(0,F.jsx)(N,{"data-visual-test":`children-with-age-summary-previously-filled-out-data`,scope:{Blocks:V,noChildren:{hasChildren:!1,countChildren:3,usesDaycare:!0,hasJointResponsibility:!0,daycareExpenses:4001,jointResponsibilityExpenses:1004,children:[{age:1},{age:2},{age:3}]}},stableName:`ChildrenWithAgeSummaryNoChildrenAfterFilledOutData`,sourceImports:[`import { useMemo, useRef } from 'react'`,`import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'`,`import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/extensions/forms/Tools/GenerateSchema'`,`import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`,`import { useData } from '@dnb/eufemia/extensions/forms/Form'`],children:`
<Blocks.ChildrenWithAge
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>

`});function Q(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...M(),...e.components},{VisibleWhenVisualTest:n}=t;return H||$(`Examples`,!1),U||$(`Examples.ChildrenWithAge`,!0),q||$(`Examples.ChildrenWithAgePrefilledYes`,!0),Y||$(`Examples.ChildrenWithAgeSummaryMultipleChildren`,!0),J||$(`Examples.ChildrenWithAgeSummaryMultipleNoAnswers`,!0),X||$(`Examples.ChildrenWithAgeSummaryNoChildren`,!0),Z||$(`Examples.ChildrenWithAgeSummaryNoChildrenAfterFilledOutData`,!0),W||$(`Examples.ChildrenWithAgeWizard`,!0),n||$(`VisibleWhenVisualTest`,!0),(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(t.h2,{children:`Demos`}),`
`,(0,F.jsx)(t.h3,{children:`In Wizard`}),`
`,(0,F.jsxs)(t.p,{children:[`All features, and additional questions (`,(0,F.jsx)(t.code,{children:`enableAdditionalQuestions`}),`) and custom translations, are enabled in this example.`]}),`
`,(0,F.jsx)(W,{}),`
`,(0,F.jsx)(t.h3,{children:`Basic`}),`
`,(0,F.jsx)(U,{}),`
`,(0,F.jsxs)(t.h3,{children:[`With `,(0,F.jsx)(t.code,{children:`joint-responsibility`}),` question`]}),`
`,(0,F.jsx)(U,{enableAdditionalQuestions:[`joint-responsibility`]}),`
`,(0,F.jsxs)(t.h3,{children:[`With `,(0,F.jsx)(t.code,{children:`daycare`}),` question`]}),`
`,(0,F.jsx)(U,{enableAdditionalQuestions:[`daycare`]}),`
`,(0,F.jsxs)(t.h3,{children:[`With `,(0,F.jsx)(t.code,{children:`daycare`}),` and `,(0,F.jsx)(t.code,{children:`joint-responsibility`}),` question`]}),`
`,(0,F.jsx)(U,{enableAdditionalQuestions:[`daycare`,`joint-responsibility`]}),`
`,(0,F.jsxs)(n,{children:[(0,F.jsx)(q,{}),(0,F.jsx)(X,{}),(0,F.jsx)(Y,{}),(0,F.jsx)(J,{}),(0,F.jsx)(Z,{})]})]})}function ie(e={}){let{wrapper:t}={...M(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(Q,{...e})}):Q(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{ie as default};