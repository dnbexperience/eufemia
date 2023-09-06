"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92555,24037,9952],{39460:function(t,n,e){e.r(n);var s=e(52322),o=e(45392),a=e(7674),i=e(47304);function l(t){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.default,{}),"\n",(0,s.jsx)(i.default,{})]})}n.default=function(t){void 0===t&&(t={});const{wrapper:n}=Object.assign({},(0,o.ah)(),t.components);return n?(0,s.jsx)(n,Object.assign({},t,{children:(0,s.jsx)(l,t)})):l()}},47304:function(t,n,e){e.r(n);var s=e(52322),o=e(45392),a=e(46463);function i(t){const n=Object.assign({h2:"h2",h3:"h3",p:"p",strong:"strong",code:"code"},(0,o.ah)(),t.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Demos"}),"\n",(0,s.jsx)(n.h3,{children:"GlobalStatus displaying error status"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"NB:"})," Keep in mind, the ",(0,s.jsx)(n.code,{children:"items"})," are handled automatically by all form components! This is just an example of how to define the content manually."]}),"\n",(0,s.jsx)(a.ve,{}),"\n",(0,s.jsx)(n.h3,{children:"GlobalStatus displaying info status"}),"\n",(0,s.jsx)(a.Ru,{}),"\n",(0,s.jsx)(n.h3,{children:"GlobalStatus displaying warning status"}),"\n",(0,s.jsx)(a.O4,{}),"\n",(0,s.jsx)(n.h3,{children:"GlobalStatus displaying success status"}),"\n",(0,s.jsx)(a.tb,{}),"\n",(0,s.jsxs)(n.h3,{children:["To showcase the automated coupling between ",(0,s.jsx)(n.strong,{children:"FormStatus"})," and ",(0,s.jsx)(n.strong,{children:"GlobalStatus"})]}),"\n",(0,s.jsx)(a.Hm,{}),"\n",(0,s.jsx)(n.h3,{children:"GlobalStatus and update routines"}),"\n",(0,s.jsx)(a.Vo,{}),"\n",(0,s.jsxs)(n.h3,{children:["To showcase the custom ",(0,s.jsx)(n.strong,{children:"Update"})," and ",(0,s.jsx)(n.strong,{children:"Remove"})," possibility"]}),"\n",(0,s.jsx)(a.kP,{}),"\n",(0,s.jsx)(n.h3,{children:"To showcase the scrolling"}),"\n",(0,s.jsx)(a.cQ,{})]})}n.default=function(t){void 0===t&&(t={});const{wrapper:n}=Object.assign({},(0,o.ah)(),t.components);return n?(0,s.jsx)(n,Object.assign({},t,{children:(0,s.jsx)(i,t)})):i(t)}},7674:function(t,n,e){e.r(n);var s=e(52322),o=e(45392),a=e(46463);function i(t){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",h3:"h3",ol:"ol",li:"li",strong:"strong",ul:"ul"},(0,o.ah)(),t.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Description"}),"\n",(0,s.jsxs)(n.p,{children:["The GlobalStatus is a complex component meant for displaying global Application notifications or a summary of a form ( displaying form errors, messages etc. ).\nBy default, the ",(0,s.jsx)(n.code,{children:"GlobalStatus"})," is automatically connected together with the ",(0,s.jsx)(n.a,{href:"/uilib/components/form-status",children:"FormStatus"})," component. This means, that every form component showing a status, will send the status message along to the ",(0,s.jsx)(n.code,{children:"GlobalStatus"}),"."]}),"\n",(0,s.jsx)(n.h3,{children:"FormStatus default behavior"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Once a ",(0,s.jsx)(n.strong,{children:"FormStatus"})," is shown, the ",(0,s.jsx)(n.code,{children:"main"})," ",(0,s.jsx)(n.strong,{children:"GlobalStatus"})," will show up."]}),"\n",(0,s.jsxs)(n.li,{children:["The page will scroll (if needed) to the dedicated ",(0,s.jsx)(n.strong,{children:"GlobalStatus"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"Form components will send along both the status text and its label to show a good and accessible summary."}),"\n",(0,s.jsxs)(n.li,{children:["Screen reader uses will automatically hear the whole content of the ",(0,s.jsx)(n.code,{children:"GlobalStatus"})," once it shows up."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{children:"Several Global statuses"}),"\n",(0,s.jsxs)(n.p,{children:["Normally, you only want to have ",(0,s.jsx)(n.strong,{children:"one"})," ",(0,s.jsx)(n.code,{children:"GlobalStatus"})," inside your application. But you can have several in parallel. But make sure you give every other a new ID:"]}),"\n",(0,s.jsx)(a.Pe,{}),"\n",(0,s.jsx)(n.h3,{children:"Where to put it"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"GlobalStatus"})," component should be positioned right under the header. By default, it uses ",(0,s.jsx)(n.code,{children:"main"})," as the ID."]}),"\n",(0,s.jsxs)(n.li,{children:["Or as a secondary summary of errors in a submit form. Keep in mind, by default, form components like ",(0,s.jsx)(n.a,{href:"/uilib/components/input",children:"Input"})," are using the ID ",(0,s.jsx)(n.code,{children:"main"}),". To make sure the build in ",(0,s.jsx)(n.a,{href:"/uilib/components/form-status",children:"FormStatus"})," is sending along the message to another ",(0,s.jsx)(n.code,{children:"GlobalStatus"}),", you have to set the ",(0,s.jsx)(n.a,{href:"/uilib/components/global-status/properties/#configuration-object",children:(0,s.jsx)(n.code,{children:"globalStatus"})}),", like:"]}),"\n"]}),"\n",(0,s.jsx)(a.Yz,{}),"\n",(0,s.jsxs)(n.p,{children:["But you can also make use of the ",(0,s.jsx)(n.a,{href:"/uilib/components/form-set",children:"FormSet"})," or ",(0,s.jsx)(n.a,{href:"/uilib/components/form-row",children:"FormRow"})," which will send along the ",(0,s.jsx)(n.code,{children:"globalStatus"})," the underlying/wrapped components, like:"]}),"\n",(0,s.jsx)(a.NP,{}),"\n",(0,s.jsx)(n.h3,{children:"Manually updates"}),"\n",(0,s.jsxs)(n.p,{children:["Besides the automated connection between the error states of form components (",(0,s.jsx)(n.a,{href:"/uilib/components/form-status",children:"FormStatus"}),"), you can update messages from everywhere in your application at any time:"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"NB:"})," The GlobalStatus will ",(0,s.jsx)(n.code,{children:"autoclose"})," by default, once all messages are removed."]}),"\n",(0,s.jsx)(n.h3,{children:"JavaScript (interceptor situation)"}),"\n",(0,s.jsx)(n.p,{children:"You can access and manipulate an existing GlobalStatus from outside of the React render tree."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Given you have already defined a GlobalStatus in JSX:"}),"\n"]}),"\n",(0,s.jsx)(a.Pe,{}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsx)(n.li,{children:"Then you can control it from within a JavaScript context whenever you need to:"}),"\n"]}),"\n",(0,s.jsx)(a.Oz,{}),"\n",(0,s.jsx)(n.h3,{children:"JSX"}),"\n",(0,s.jsx)(a.RV,{}),"\n",(0,s.jsxs)(n.p,{children:["If you need an additional ",(0,s.jsx)(n.code,{children:"GlobalStatus"}),", define a custom ID (custom-status):"]}),"\n",(0,s.jsx)(a.Am,{})]})}n.default=function(t){void 0===t&&(t={});const{wrapper:n}=Object.assign({},(0,o.ah)(),t.components);return n?(0,s.jsx)(n,Object.assign({},t,{children:(0,s.jsx)(i,t)})):i(t)}},46463:function(t,n,e){e.d(n,{Am:function(){return f},Hm:function(){return u},NP:function(){return b},O4:function(){return l},O9:function(){return j},Oz:function(){return p},Pe:function(){return m},RV:function(){return g},Ru:function(){return i},Vo:function(){return h},Yz:function(){return x},cQ:function(){return d},kP:function(){return c},tb:function(){return r},ve:function(){return a}});e(2784);var s=e(82058),o=e(52322);const a=()=>(0,o.jsx)(s.Z,{"data-visual-test":"global-status",children:"<GlobalStatus\n  title=\"Custom Title\"\n  text=\"Failure text\"\n  items={[\n    {\n      text: 'List item',\n      status_anchor_url: '/uilib/components/global-status',\n      status_anchor_label: 'eksempel',\n    },\n  ]}\n  show={true}\n  autoscroll={false}\n  no_animation={true}\n  omit_set_focus={true}\n  id=\"demo-1\"\n/>\n"}),i=()=>(0,o.jsx)(s.Z,{"data-visual-test":"global-status-info",children:'<GlobalStatus\n  state="info"\n  title="Custom info title ..."\n  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"\n  items={[\'Status text 1\', \'Status text 2\']}\n  show={true}\n  autoscroll={false}\n  no_animation={true}\n  omit_set_focus={true}\n  id="demo-4"\n/>\n'}),l=()=>(0,o.jsx)(s.Z,{children:'<GlobalStatus\n  state="warning"\n  title="Custom warning title ..."\n  text="A string of text providing a warning or semi-urgent message of some kind to the user"\n  show={true}\n  autoscroll={false}\n  no_animation={true}\n  omit_set_focus={true}\n  id="demo-5"\n/>\n'}),r=()=>(0,o.jsx)(s.Z,{children:'<GlobalStatus\n  state="success"\n  title="Custom success title ..."\n  text="A string of text providing a success message of some kind to the user"\n  show={true}\n  autoscroll={false}\n  no_animation={true}\n  omit_set_focus={true}\n  id="demo-6"\n/>\n'}),u=()=>(0,o.jsx)(s.Z,{noInline:!0,children:"const InputWithError = () => {\n  const [errorMessage, setErrorMessage] = React.useState(null)\n  return (\n    <Input\n      label=\"Input:\"\n      placeholder=\"Write less than 5 chars and dismiss the focus to show the GlobalStatus ...\"\n      stretch\n      status={errorMessage}\n      on_blur={({ value }) => {\n        setErrorMessage(value.length <= 4 ? 'With a message shown' : null)\n      }}\n      globalStatus={{\n        id: 'main-status',\n      }}\n    />\n  )\n}\nrender(<InputWithError />)\n"}),c=()=>(0,o.jsx)(s.Z,{hideCode:!0,noInline:!0,children:'function AddRemoveItems() {\n  const [count, toggleUpdateStatus] = React.useState(0)\n  return (\n    <>\n      <GlobalStatus\n        id="custom-status"\n        autoscroll={false}\n        on_close={() => toggleUpdateStatus(0)}\n        on_hide={() => toggleUpdateStatus(0)}\n      />\n      <Button\n        text={\'Show step #\' + count}\n        on_click={() => {\n          toggleUpdateStatus(count + 1)\n          if (count >= 3) {\n            toggleUpdateStatus(0)\n          }\n        }}\n        top="small"\n      />\n      {count === 1 && (\n        <>\n          <GlobalStatus.Add\n            id="custom-status"\n            status_id="custom-id-1"\n            title="New title"\n            text="First long info text ..."\n            item="Item from status #1"\n            on_close={({ status_id }) => {\n              console.log(\'on_close 1\', status_id)\n            }}\n          />\n          <GlobalStatus.Add\n            id="custom-status"\n            status_id="custom-id-2"\n            text="Second long info text ..."\n            item="Item from status #2"\n            on_close={({ status_id }) => {\n              console.log(\'on_close 2\', status_id)\n            }}\n          />\n        </>\n      )}\n      {count === 2 && (\n        <GlobalStatus.Remove id="custom-status" status_id="custom-id-2" />\n      )}\n      {count === 3 && (\n        <GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />\n      )}\n    </>\n  )\n}\nrender(<AddRemoveItems />)\n'}),d=()=>(0,o.jsx)(s.Z,{hideCode:!0,children:"<Button\n  text=\"Scroll to main GlobalStatus\"\n  on_click={() => {\n    GlobalStatus.Update({\n      id: 'main-status',\n      text: 'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',\n    })\n  }}\n/>\n"}),h=()=>(0,o.jsx)(s.Z,{hideCode:!0,noInline:!0,children:'const Context = React.createContext(null)\nconst UpdateDemo = () => {\n  const [errorA, setErrorA] = React.useState(false)\n  const [errorB, setErrorB] = React.useState(false)\n  const [isVisible, setVisibility] = React.useState(false)\n  return (\n    <Context.Provider\n      value={{\n        errorA,\n        errorB,\n        setErrorA,\n        setErrorB,\n        isVisible,\n        setVisibility,\n      }}\n    >\n      <UpdateDemoStatus />\n      <UpdateDemoTools />\n    </Context.Provider>\n  )\n}\nconst UpdateDemoStatus = () => {\n  const { errorA, errorB, setErrorA, setErrorB } =\n    React.useContext(Context)\n  return (\n    <>\n      <GlobalStatus title="Custom Title" text="Failure text" id="demo-2" />\n      <Input\n        top\n        right\n        label="Label A:"\n        placeholder="Placeholder A"\n        status={errorA}\n        globalStatus={{\n          id: \'demo-2\',\n        }}\n        on_change={({ value }) => {\n          setErrorA(value)\n        }}\n      />\n      <Input\n        top\n        label="Label B:"\n        placeholder="Placeholder B"\n        status={errorB}\n        globalStatus={{\n          id: \'demo-2\',\n        }}\n        on_change={({ value }) => {\n          setErrorB(value)\n        }}\n      />\n    </>\n  )\n}\nconst UpdateDemoTools = () => {\n  const {\n    errorA,\n    errorB,\n    setErrorA,\n    setErrorB,\n    isVisible,\n    setVisibility,\n  } = React.useContext(Context)\n\n  // Only to demonstrate the usage of an interceptor situation\n  const inst = React.useRef(null)\n  React.useEffect(() => {\n    if (!inst.current) {\n      inst.current = GlobalStatus.create({\n        id: \'demo-2\',\n        title: \'New Title\',\n        text: \'New Text\',\n        status_id: \'custom-item\',\n        show: false,\n      })\n      inst.current.update({\n        on_show: () => {\n          console.log(\'on_show\')\n          if (!isVisible) {\n            setVisibility(true)\n          }\n        },\n        on_hide: () => {\n          console.log(\'on_hide\')\n          setVisibility(false)\n        },\n        on_close: () => {\n          console.log(\'on_close\')\n          setVisibility(false)\n        },\n      })\n    }\n    inst.current.update({\n      show: isVisible,\n    })\n  }, [isVisible])\n  React.useEffect(() => () => inst.current.remove(), [])\n  return (\n    <Section top spacing style_type="divider">\n      <ToggleButton\n        text="Toggle"\n        variant="checkbox"\n        right\n        checked={isVisible}\n        on_change={({ checked }) => {\n          setVisibility(checked)\n        }}\n      />\n      <Button\n        text="Reset"\n        variant="tertiary"\n        icon="reset"\n        disabled={!(errorA || errorB)}\n        on_click={() => {\n          setErrorA(null)\n          setErrorB(null)\n        }}\n      />\n    </Section>\n  )\n}\nrender(<UpdateDemo />)\n'}),m=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'<GlobalStatus id="other-global-status" />\n'}),x=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:"\n<GlobalStatus id=\"other-global-status\" />\n<Input\n  globalStatus={{\n    id: 'other-global-status',\n  }}\n/>\n\n"}),b=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n<GlobalStatus id="other-global-status" />\n<FormSet\n  globalStatus={{\n    id: \'other-global-status\',\n  }}\n>\n  <Input status="Message" />\n</FormSet>\n\n'}),p=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,noInline:!0,children:"// 1. Update / extend the the status like so:\n\nconst statusOne = GlobalStatus.create({\n  id: 'other-global-status',\n  // or main\n  status_id: 'custom-id-1',\n  text: 'New Text',\n  item: 'Item from status #1',\n  title: 'New Title',\n  show: true,\n})\n\n// 2. and removes \"custom-id-1\" again if needed\n\nstatusOne.update({\n  text: 'Updated Text',\n})\n\n// 3. and removes \"custom-id-1\" again if needed\nstatusOne.remove()\nrender(<GlobalStatus id=\"other-global-status\" />)\n"}),g=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* 1. Place it under the header bar */}\n<GlobalStatus text="Optional default text" />\n{/* 2. later on, you can show a message */}\n<GlobalStatus.Add\n  id="custom-id"\n  status_id="custom-id-1"\n  title="New title"\n  text="First long info text ..."\n  item="Item from status #1"\n  on_close={({ status_id }) => {\n    console.log(\'on_close\', status_id)\n  }}\n/>\n{/* 3. and remove it again */}\n<GlobalStatus.Remove id="custom-id" status_id="custom-id-1" />\n\n'}),f=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* 1. Place it somewhere in your application */}\n<GlobalStatus id="custom-status" />\n{/* 2. later on, you can show a message */}\n<GlobalStatus.Add\n  id="custom-status"\n  status_id="custom-id-1"\n  title="New title"\n  text="First long info text ..."\n  item="Item from status #1"\n  on_close={({ status_id }) => {\n    console.log(\'on_close\', status_id)\n  }}\n/>\n{/* 3. and remove it again */}\n<GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />\n\n'}),j=()=>(0,o.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* Place the status where ever you have to.*/}\n<GlobalStatus id="custom-id" />\n{/* Manipulate the status later on. Every property is optional.*/}\n<GlobalStatus.Add\n  id="custom-id"\n  status_id="status-1"\n  item="Item #1"\n  text="New Text"\n  on_close={({ status_id }) => {\n    console.log(\'on_close\', status_id)\n  }}\n/>\n<GlobalStatus.Add\n  id="custom-id"\n  status_id="status-2"\n  item="Item #2"\n  text="New Text"\n  title="New Title"\n  on_close={({ status_id }) => {\n    console.log(\'on_close\', status_id)\n  }}\n/>\n<GlobalStatus.Add\n  id="custom-id"\n  status_id="status-3"\n  item="Item #3"\n  text="Text #3"\n  on_close={({ status_id }) => {\n    console.log(\'on_close\', status_id)\n  }}\n/>\n{/* or update the status.*/}\n<GlobalStatus.Update id="custom-id" text="text" />\n{/* Later you can remove a resolved item.*/}\n<GlobalStatus.Remove id="custom-id" status_id="status-3" />\n\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-global-status-mdx-92ed12fe9fa047de3270.js.map