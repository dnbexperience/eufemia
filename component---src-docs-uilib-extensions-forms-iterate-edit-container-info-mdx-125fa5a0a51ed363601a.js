"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[30530],{85902:function(e,t,n){n.r(t);var i=n(52322),r=n(45392);function a(e){const t=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,r.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:"Description"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"Iterate.EditContainer"})," enables users to toggle (with animation) the content of each item between the ",(0,i.jsx)(t.a,{href:"/uilib/extensions/forms/Iterate/ViewContainer/",children:"ViewContainer"})," and this edit container. It can be used instead of the ",(0,i.jsx)(t.a,{href:"/uilib/extensions/forms/Iterate/AnimatedContainer/",children:"AnimatedContainer"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["By default, it features the ",(0,i.jsx)(t.a,{href:"/uilib/extensions/forms/Iterate/Toolbar/",children:"Toolbar"}),' containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.']}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:'import { Iterate, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Iterate.Array>\n    <Iterate.EditContainer\n      title="Edit account holder"\n      titleWhenNew="New account holder"\n    >\n      <Field.Name.Last itemPath="/name" />\n    </Iterate.EditContainer>\n\n    <Iterate.ViewContainer title="Account holder">\n      <Value.Name.Last itemPath="/name" />\n    </Iterate.ViewContainer>\n  </Iterate.Array>,\n)\n'})}),"\n",(0,i.jsx)(t.h2,{children:"The item number in the title"}),"\n",(0,i.jsxs)(t.p,{children:["You can use the ",(0,i.jsx)(t.code,{children:"{itemNr}"})," variable in the ",(0,i.jsx)(t.code,{children:"title"})," or the ",(0,i.jsx)(t.code,{children:"titleWhenNew"})," property to display the current item number."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:'import { Iterate, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Iterate.Array>\n    <Iterate.EditContainer\n      title="Edit account holder {itemNr}"\n      titleWhenNew="New account holder {itemNr}"\n    >\n      <Field.Name.Last itemPath="/name" />\n    </Iterate.EditContainer>\n  </Iterate.Array>,\n)\n'})}),"\n",(0,i.jsx)(t.h2,{children:"Get the internal item object"}),"\n",(0,i.jsxs)(t.p,{children:["You can get the internal item object by using the ",(0,i.jsx)(t.code,{children:"Iterate.useItem"})," hook."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-tsx",children:"import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'\n\nconst MyItemForm = () => {\n  const item = Iterate.useItem()\n  console.log('index:', item.index)\n\n  return <Field.String itemPath=\"/\" />\n}\n\nrender(\n  <Iterate.Array value={['foo', 'bar']}>\n    <MyItemForm />\n  </Iterate.Array>,\n)\n"})}),"\n",(0,i.jsx)(t.h2,{children:"Accessibility"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"Iterate.EditContainer"})," component has an ",(0,i.jsx)(t.code,{children:"aria-label"})," attribute, which is set to the ",(0,i.jsx)(t.code,{children:"title"})," prop value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement."]}),"\n",(0,i.jsx)(t.p,{children:"When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container."})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,i.jsx)(t,Object.assign({},e,{children:(0,i.jsx)(a,e)})):a(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-edit-container-info-mdx-125fa5a0a51ed363601a.js.map