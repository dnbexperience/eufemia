"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[72835],{45922:function(n,e,t){t.r(e),t.d(e,{default:function(){return _}});var r=t(52322),i=t(45392),s=(t(2784),t(82058)),o=t(72913);const a=()=>(0,r.jsx)(s.Z,{"data-visual-test":"step-indicator-static",children:"<StepIndicator\n  sidebar_id=\"unique-id-static\"\n  mode=\"static\"\n  current_step={1}\n  on_change={({ current_step }) => {\n    console.log('on_change', current_step)\n  }}\n  data={[\n    {\n      title: 'Om din nye bolig',\n    },\n    {\n      title: 'Ditt lån og egenkapital',\n      on_click: ({ current_step }) => console.log(current_step),\n    },\n    {\n      title: 'Oppsummering',\n    },\n  ]}\n/>\n"}),c=()=>(0,r.jsx)(s.Z,{"data-visual-test":"step-indicator-strict",children:"\n<StepIndicator.Sidebar sidebar_id=\"unique-id-strict\" />\n<StepIndicator\n  sidebar_id=\"unique-id-strict\"\n  mode=\"strict\"\n  current_step={1}\n  on_change={({ current_step }) => {\n    console.log('on_change', current_step)\n  }}\n  data={[\n    {\n      title: 'Velg mottaker',\n    },\n    {\n      title: 'Bestill eller erstatt',\n      on_click: ({ current_step }) =>\n        console.log('current_step:', current_step),\n      status:\n        'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',\n    },\n    {\n      title: 'Oppsummering',\n    },\n  ]}\n/>\n\n"}),u=()=>(0,r.jsx)(s.Z,{"data-visual-test":"step-indicator-loose",noInline:!0,children:"const InteractiveDemo = () => {\n  const [step, setStep] = React.useState(1)\n  return (\n    <div\n      style={{\n        display: 'flex',\n      }}\n    >\n      <StepIndicator.Sidebar sidebar_id=\"unique-id-loose\" />\n\n      <Space stretch>\n        <StepIndicator\n          sidebar_id=\"unique-id-loose\"\n          mode=\"loose\"\n          current_step={step}\n          on_change={({ current_step }) => {\n            setStep(current_step)\n          }}\n          data={[\n            'Cum odio si bolig bla et ta',\n            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',\n            'Bibendum sociis',\n          ]}\n          bottom\n        />\n\n        <Button\n          variant=\"secondary\"\n          on_click={() => {\n            setStep((step) => {\n              if (step >= 2) {\n                step = -1\n              }\n              return step + 1\n            })\n          }}\n        >\n          Next step\n        </Button>\n      </Space>\n    </div>\n  )\n}\nrender(<InteractiveDemo />)\n"}),d=()=>(0,r.jsx)(s.Z,{noInline:!0,children:"function CustomStepIndicator({ children, data, ...props }) {\n  const [step, setStep] = React.useState(0)\n  return (\n    <>\n      <StepIndicator\n        sidebar_id=\"unique-id-customized\"\n        mode=\"loose\"\n        data={data}\n        current_step={step}\n        on_change={({ current_step }) => setStep(current_step)}\n        {...props}\n      />\n      <Section style_type=\"lavender\" spacing>\n        {children(step)}\n      </Section>\n    </>\n  )\n}\nrender(\n  <CustomStepIndicator\n    data={[\n      {\n        title: 'First',\n        is_current: true,\n      },\n      {\n        title: 'Second',\n      },\n      {\n        title: 'Last',\n      },\n    ]}\n  >\n    {(step) => {\n      switch (step) {\n        case 0:\n          return <>Step One</>\n        case 1:\n          return <>Step Two</>\n        default:\n          return <>Fallback</>\n      }\n    }}\n  </CustomStepIndicator>,\n)\n"}),l=()=>(0,r.jsx)(s.Z,{"data-visual-test":"step-indicator-sidebar",children:"\n<StepIndicator\n  style={{\n    display: 'none',\n  }}\n  sidebar_id=\"unique-id-sidebar\"\n  mode=\"loose\"\n  data={[\n    {\n      title: 'Om din nye bolig',\n    },\n    {\n      title: 'Ditt lån og egenkapital',\n    },\n    {\n      title: 'Oppsummering',\n      is_current: true,\n    },\n  ]}\n/>\n<StepIndicator.Sidebar sidebar_id=\"unique-id-sidebar\" top=\"large\" />\n\n"}),p=()=>(0,r.jsx)(s.Z,{children:"<StepIndicator\n  sidebar_id=\"unique-id-text\"\n  mode=\"static\"\n  current_step={1}\n  data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}\n/>\n"}),h=()=>(0,r.jsx)(s.Z,{children:"<StepIndicator\n  sidebar_id=\"unique-id-renderer\"\n  mode=\"strict\"\n  current_step={1}\n  on_change={({ current_step }) => {\n    console.log('on_change', current_step)\n  }}\n  on_item_render={({ StepItem }) => {\n    return <StepItem onClick={(e) => console.log(e)} />\n  }}\n  data={[\n    {\n      title: 'Om din nye bolig',\n    },\n    {\n      title: 'Ditt lån og egenkapital',\n      on_click: ({ current_step }) => console.log(current_step),\n      on_render: ({ StepItem }) => (\n        <StepItem onClick={(e) => console.log(e)} />\n      ),\n    },\n    {\n      title: 'Oppsummering',\n      /**\n       * We can also overwrite the states\n       * inactive: true\n       * is_current: true\n       */\n    },\n  ]}\n/>\n"}),m=()=>(0,r.jsx)(s.Z,{scope:{createBrowserHistory:o.lX},noInline:!0,children:"const StepIndicatorWithRouter = () => {\n  const [currentStep, setCurrentStep] = React.useState(1)\n  const [history, setInstance] = React.useState(null)\n  React.useEffect(() => {\n    const history = createBrowserHistory()\n    const step =\n      parseFloat(history.location.search?.replace(/[?]/, '')) || 1\n    setCurrentStep(step)\n    setInstance(history)\n  }, [])\n  return (\n    <>\n      <StepIndicator\n        sidebar_id=\"step-indicator-router\"\n        mode=\"loose\"\n        current_step={currentStep - 1}\n        on_change={({ current_step }) => {\n          const step = current_step + 1\n          setCurrentStep(step)\n          history.push('?' + step)\n        }}\n        data={[\n          {\n            title: 'Om din nye bolig',\n          },\n          {\n            title: 'Ditt lån og egenkapital',\n          },\n          {\n            title: 'Oppsummering',\n          },\n        ]}\n        space\n      />\n      <StepIndicator.Sidebar sidebar_id=\"step-indicator-router\" space />\n    </>\n  )\n}\nrender(<StepIndicatorWithRouter />)\n"});function g(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,i.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator in loose mode"}),"\n",(0,r.jsx)(e.p,{children:"Every step can be clicked."}),"\n",(0,r.jsxs)(e.p,{children:["You want to place ",(0,r.jsx)(e.code,{children:'<StepIndicator.Sidebar sidebar_id="unique-id-loose" />'})," somewhere in your layout."]}),"\n",(0,r.jsx)(u,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator in strict mode"}),"\n",(0,r.jsx)(e.p,{children:"Every visited step can be clicked, including the current step."}),"\n",(0,r.jsxs)(e.p,{children:["You want to place ",(0,r.jsx)(e.code,{children:'<StepIndicator.Sidebar sidebar_id="unique-id-strict" />'})," somewhere in your layout."]}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator in static mode"}),"\n",(0,r.jsx)(e.p,{children:"None of the steps are clickable."}),"\n",(0,r.jsxs)(e.p,{children:["You want to place ",(0,r.jsx)(e.code,{children:'<StepIndicator.Sidebar sidebar_id="unique-id-static" />'})," somewhere in your layout."]}),"\n",(0,r.jsx)(a,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator with sidebar"}),"\n",(0,r.jsx)(l,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator with a router"}),"\n",(0,r.jsx)(m,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator customized"}),"\n",(0,r.jsx)(e.p,{children:"Completely customized step indicator."}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator with text only"}),"\n",(0,r.jsx)(p,{}),"\n",(0,r.jsx)(e.h3,{children:"StepIndicator with a custom renderer."}),"\n",(0,r.jsx)(h,{})]})}var _=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(g,n)})):g(n)}},72913:function(n,e,t){t.d(e,{lX:function(){return p}});var r,i=t(7896),s=r||(r={});s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE";var o=function(n){return n};function a(n){n.preventDefault(),n.returnValue=""}function c(){var n=[];return{get length(){return n.length},push:function(e){return n.push(e),function(){n=n.filter((function(n){return n!==e}))}},call:function(e){n.forEach((function(n){return n&&n(e)}))}}}function u(){return Math.random().toString(36).substr(2,8)}function d(n){var e=n.pathname,t=n.search;return(void 0===e?"/":e)+(void 0===t?"":t)+(void 0===(n=n.hash)?"":n)}function l(n){var e={};if(n){var t=n.indexOf("#");0<=t&&(e.hash=n.substr(t),n=n.substr(0,t)),0<=(t=n.indexOf("?"))&&(e.search=n.substr(t),n=n.substr(0,t)),n&&(e.pathname=n)}return e}function p(n){function e(){var n=m.location,e=g.state||{};return[e.idx,o({pathname:n.pathname,search:n.search,hash:n.hash,state:e.usr||null,key:e.key||"default"})]}function t(n){return"string"==typeof n?n:d(n)}function s(n,e){return void 0===e&&(e=null),o((0,i.Z)({pathname:b.pathname,hash:"",search:""},"string"==typeof n?l(n):n,{state:e,key:u()}))}function p(n){f=n,n=e(),S=n[0],b=n[1],x.call({action:f,location:b})}function h(n){g.go(n)}void 0===n&&(n={});var m=void 0===(n=n.window)?document.defaultView:n,g=m.history,_=null;m.addEventListener("popstate",(function(){if(_)v.call(_),_=null;else{var n=r.Pop,t=e(),i=t[0];if(t=t[1],v.length){if(null!=i){var s=S-i;s&&(_={action:n,location:t,retry:function(){h(-1*s)}},h(s))}}else p(n)}}));var f=r.Pop,S=(n=e())[0],b=n[1],x=c(),v=c();return null==S&&(S=0,g.replaceState((0,i.Z)({},g.state,{idx:S}),"")),{get action(){return f},get location(){return b},createHref:t,push:function n(e,i){var o=r.Push,a=s(e,i);if(!v.length||(v.call({action:o,location:a,retry:function(){n(e,i)}}),0)){var c=[{usr:a.state,key:a.key,idx:S+1},t(a)];a=c[0],c=c[1];try{g.pushState(a,"",c)}catch(u){m.location.assign(c)}p(o)}},replace:function n(e,i){var o=r.Replace,a=s(e,i);v.length&&(v.call({action:o,location:a,retry:function(){n(e,i)}}),1)||(a=[{usr:a.state,key:a.key,idx:S},t(a)],g.replaceState(a[0],"",a[1]),p(o))},go:h,back:function(){h(-1)},forward:function(){h(1)},listen:function(n){return x.push(n)},block:function(n){var e=v.push(n);return 1===v.length&&m.addEventListener("beforeunload",a),function(){e(),v.length||m.removeEventListener("beforeunload",a)}}}}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-step-indicator-demos-mdx-d917fbb4a850ac6bbc81.js.map