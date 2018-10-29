(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{201:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(287);var a=l(n(0)),o=n(278),r=l(n(469));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}t.default=function(e){var t=e.components;c(e,["components"]);return a.default.createElement(o.MDXTag,{name:"wrapper",components:t},a.default.createElement(r.default,null))};t._frontmatter={header:"UI Library",title:"Switch",draft:!1,order:12}},299:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271),n(56);var a=n(285),o=d(n(305)),r=d(n(0)),l=n(307),c=m(n(11)),i=m(n(1)),s=m(n(369)),u=n(272),p=n(13);function m(e){return e&&e.__esModule?e:{default:e}}function d(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(){return"undefined"==typeof window?null:(0,s.default)().location},w=(0,u.css)(";.fullscreen-page &{top:0;.is-sticky .dnb-tabs__tabs{margin:0 -2rem;}}.dnb-tabs__tabs{justify-content:space-between;align-items:center;}.toggle-fullscreen{margin-right:1rem;}.dnb-modal__close-button{position:relative;top:auto;right:auto;}"),T=function(e){function t(e){var n,a,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,o=h(t).call(this,e),n=!o||"object"!==f(o)&&"function"!=typeof o?y(a):o,v(y(y(n)),"state",{activeTabKey:"demo",wasFullscreen:null}),v(y(y(n)),"openTab",function(e){var t=e.key;n.setState({activeTabKey:t})}),v(y(y(n)),"openFullscreen",function(){var e=E();e&&(0,p.navigate)("".concat(e.pathname,"?fullscreen#").concat(n.state.activeTabKey))}),v(y(y(n)),"quitFullscreen",function(){var e=E();e&&(0,p.navigate)([e.pathname,e.hash].join(""))});var r=E();return r&&(n.state.wasFullscreen=/fullscreen/.test(r.search)),n}var n,i,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,r.Component),n=t,(i=[{key:"isActive",value:function(e){return this.state.activeTabKey===e}},{key:"componentWillMount",value:function(){var e=E();e&&this.setState({wasFullscreen:/fullscreen/.test(e.search)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,i=t.id,s=t.tabs,u=t.hideTabs,p=t.ExampleCode,m=t.InfoComponent,d=t.DemoComponent,f=t.CodeComponent,g=t.callback;return r.default.createElement("div",{className:"wrapped-item"},u?r.default.createElement("h4",null,r.default.createElement(c.default,{to:"/uilib/components/".concat(i)},n)):r.default.createElement("h1",null,n),!u&&r.default.createElement(a.Tabs,{data:s,on_change:this.openTab,render:function(t){var n=t.Wrapper,o=t.TabsList,c=t.Tabs;return r.default.createElement(n,{className:w},r.default.createElement(o,null,r.default.createElement("div",{className:"dnb-tabs__tabs__inner"},r.default.createElement(c,null)),e.state.wasFullscreen?r.default.createElement(l.CloseButton,{on_click:e.quitFullscreen,title:"Quit Fullscreen",className:"toggle-fullscreen"}):r.default.createElement(a.Button,{on_click:e.openFullscreen,className:"toggle-fullscreen",variant:"secondary",title:"Fullscreen",icon:"fullscreen"})))}}),this.isActive("demo")&&r.default.createElement("div",{className:"dnb-tabs__content"},r.default.createElement(d,null),g&&g.demo&&r.default.createElement(g.demo,{CodeRenderer:o.CodeRenderer})),this.isActive("info")&&r.default.createElement("div",{className:"dnb-tabs__content"},r.default.createElement(m,null),g&&g.info&&r.default.createElement(g.info,{CodeRenderer:o.CodeRenderer}),p&&r.default.createElement(r.Fragment,null,r.default.createElement("h3",null,"JSX Example"),r.default.createElement(o.CodeRenderer,{language:"jsx"},p))),this.isActive("code")&&r.default.createElement("div",{className:"dnb-tabs__content"},r.default.createElement(o.default,{source:f}),g&&g.code&&r.default.createElement(g.code,{CodeRenderer:o.CodeRenderer})))}}])&&g(n.prototype,i),s&&g(n,s),t}();v(T,"propTypes",{ExampleCode:i.default.string,InfoComponent:i.default.func.isRequired,DemoComponent:i.default.func.isRequired,CodeComponent:i.default.func.isRequired,callback:i.default.shape({demo:i.default.oneOfType([i.default.func,i.default.node]),info:i.default.oneOfType([i.default.func,i.default.node]),code:i.default.oneOfType([i.default.func,i.default.node])}),hideTabs:i.default.bool,title:i.default.string.isRequired,id:i.default.string.isRequired,tabs:i.default.array}),v(T,"defaultProps",{ExampleCode:null,hideTabs:!1,callback:null,tabs:[{title:"Demo",key:"demo"},{title:"Details",key:"info"},{title:"Markup",key:"code"}]});var _=T;t.default=_},300:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(82),n(269),n(270),n(86);var a=i(n(0)),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(367)),r=i(n(364)),l=n(365),c=i(n(304));function i(e){return e&&e.__esModule?e:{default:e}}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var p=function(e){var t=e.language,n=e.children,i=e.reactLive,p=e.className;return t||(t=((p||"").split(/-/)||[null,"jsx"])[1]),i&&"jsx"===t?(console.log("exampleCode",t,u(n)),a.default.createElement(l.LiveProvider,{code:"string"==typeof n?String(n).trim():null},a.default.createElement(l.LiveEditor,null),a.default.createElement(l.LiveError,null),a.default.createElement(l.LivePreview,null))):a.default.createElement(o.default,s({},o.defaultProps,{code:String(n).trim(),language:t,theme:r.default}),function(e){var t=e.className,n=e.style,o=e.tokens,r=e.getLineProps,l=e.getTokenProps;return a.default.createElement(c.default,{className:t,style:n,p:3},m(o).map(function(e,t){return a.default.createElement("div",r({line:e,key:t}),e.map(function(e,t){return a.default.createElement("span",l({token:e,key:t}))}))}))})};t.default=p;var m=function(e){var t=e.length;if(0===t)return e;var n=e[t-1];return 1===n.length&&n[0].empty?e.slice(0,t-1):e}},304:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=(0,((a=n(366))&&a.__esModule?a:{default:a}).default)({is:"pre",m:0});o.displayName="Pre";var r=o;t.default=r},305:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CodeRenderer=t.default=void 0,n(269),n(270),n(41),n(271),n(29),n(370);var a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(0)),o=s(n(306)),r=s(n(1)),l=s(n(375)),c=s(n(376)),i=s(n(300));function s(e){return e&&e.__esModule?e:{default:e}}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t,n,a,o,r,l){try{var c=e[r](l),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(a,o)}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function g(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?v(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){function t(e){var n;m(this,t),E(v(v(n=g(this,h(t).call(this,e)))),"state",{codeString:""}),E(v(v(n)),"_isMounted",!1);var o=n.props.source;return n.beautify(a.default.createElement(o,null)),n}var n,r;return b(t,a.Component),f(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.setCode()}},{key:"setCode",value:function(){this.code&&this.setState({codeString:this.props.raw+this.code}),this.code=null}},{key:"beautify",value:(n=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.props.language,e.next="html"===e.t0?3:18;break;case 3:return this.code=l.default.renderToStaticMarkup(t),this.code=this.code.replace(/data-fake:/g,""),this.code=this.code.replace(/disabled=""/g,'disabled="disabled"'),e.prev=6,e.next=9,(0,o.default)(this.code,"html");case 9:this.code=e.sent,this.code=(0,c.default)(this.code,{ocd:!0}),this._isMounted&&this.setCode(),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(6),console.log("HTML Beautifier Error:",e.t1);case 17:return e.abrupt("break",18);case 18:case"end":return e.stop()}},e,this,[[6,14]])}),r=function(){var e=this,t=arguments;return new Promise(function(a,o){var r=n.apply(e,t);function l(e){p(r,a,o,l,c,"next",e)}function c(e){p(r,a,o,l,c,"throw",e)}l(void 0)})},function(e){return r.apply(this,arguments)})},{key:"render",value:function(){return this.state.codeString?a.default.createElement(T,{language:this.props.language},this.state.codeString):a.default.createElement(a.Fragment,null)}}]),t}();t.default=w,E(w,"propTypes",{language:r.default.string,raw:r.default.string,source:r.default.oneOfType([r.default.node,r.default.func]).isRequired}),E(w,"defaultProps",{language:"html",raw:""});var T=function(e){function t(){return m(this,t),g(this,h(t).apply(this,arguments))}return b(t,a.Component),f(t,[{key:"render",value:function(){return a.default.createElement(i.default,this.props)}}]),t}();t.CodeRenderer=T,E(T,"propTypes",{language:r.default.string,children:r.default.oneOfType([r.default.string,r.default.node,r.default.func]).isRequired}),E(T,"defaultProps",{language:"jsx"})},306:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(41);var a,o=(a=n(371))&&a.__esModule?a:{default:a};var r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(function(a){switch(t){case"html":o.default.clean(e,{indent:"  ",wrap:80,"replace-nbsp":!0,"remove-tags":[],"remove-attributes":[],"break-around-tags":n.breakAroundTags||["div","span","p","button","input","svg","path"]},function(e){return a(e)})}})};t.default=r},307:function(e,t,n){"use strict";n.r(t);var a=n(274);n.d(t,"propTypes",function(){return a.d}),n.d(t,"defaultProps",function(){return a.c}),n.d(t,"CloseButton",function(){return a.a})},372:function(e,t){},373:function(e,t){},374:function(e,t){},469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(82),n(271);var a=u(n(0)),o=s(n(1)),r=s(n(299)),l=u(n(470)),c=s(n(471)),i=s(n(472));function s(e){return e&&e.__esModule?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,g(t).apply(this,arguments))}var n,o,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,a.Component),n=t,(o=[{key:"render",value:function(){return a.default.createElement(r.default,m({},t.defaultProps,this.props))}}])&&d(n.prototype,o),l&&d(n,l),t}();t.default=y,b(y,"propTypes",{title:o.default.string,id:o.default.string,InfoComponent:o.default.func,DemoComponent:o.default.func,CodeComponent:o.default.func,hideTabs:o.default.bool}),b(y,"defaultProps",{title:"Switch",id:"switch",ExampleCode:i.default,InfoComponent:c.default,DemoComponent:l.default,CodeComponent:l.Example,callback:l.Example.AdditionalCallback||null,hideTabs:!1})},470:function(e,t,n){"use strict";n.r(t),n.d(t,"Example",function(){return m});var a=n(6),o=n.n(a),r=n(0),l=n.n(r),c=n(1),i=n.n(c),s=n(286),u=n(279),p=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){return l.a.createElement(r.Fragment,null,l.a.createElement(s.a,{id:"switch-1",text_positive:"Yes",text_negative:"No",labelledby:"switch-1-label",title:"Ths is the title",value:"Value of switch",default_state:!1,checked:!1,on_state_update:this.props.onStateUpdate,on_change:this.props.onChange,attributes:{"data-fake:on_change":"SwitchDemo.onChangeHandler()","data-fake:on_state_update":"SwitchDemo.onStateUpdateHandler()"}}))},t}(r.Component);p.propTypes={onStateUpdate:i.a.func.isRequired,onChange:i.a.func.isRequired},p.defaultProps={active_second:!1},p.onChangeHandler=function(e){console.log("onChangeHandler",e)},p.onStateUpdateHandler=function(e){console.log("onStateUpdateHandler",e)};var m=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).state={active_first:!1,active_second:!1},t}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){s.a.enableWebComponent(),window.SwitchDemo=p},n.render=function(){var e=this;return l.a.createElement("form",{className:"dnb-form"},l.a.createElement("div",{className:"dnb-form__item"},l.a.createElement("div",{className:"dnb-form__cell"},l.a.createElement(u.a,{id:"switch-1-label",for_id:"switch-1",text:"Form Label Text"})),l.a.createElement("div",{className:"dnb-form__cell"},l.a.createElement(p,{active_second:this.state.active_second,onStateUpdate:function(t){var n=t.checked;return e.setState({active_first:n,active_second:n})},onChange:function(t){var n=t.checked;return e.setState({active_first:n,active_second:n})}}),l.a.createElement("dnb-switch",{id:"switch-2",title:"Ths is the title",disabled:!0,default_state:"true",checked:this.state.active_second?"true":"false",on_change:"SwitchDemo.onChangeHandler",on_state_update:"SwitchDemo.onStateUpdateHandler"}))))},t}(r.Component);t.default=function(){return l.a.createElement(m,null)}},471:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return i});var a=n(83),o=n.n(a),r=n(0),l=n.n(r),c=n(278);t.default=function(e){var t=e.components;o()(e,["components"]);return l.a.createElement(c.MDXTag,{name:"wrapper",components:t},l.a.createElement(c.MDXTag,{name:"h4",components:t},"Also known as a toggle switch or a toggle"),l.a.createElement(c.MDXTag,{name:"p",components:t},'A (toggle) switch is a digital on/off switch.\nToggle switches are best used for changing the state of system functionalities and preferences. "Toggles may replace two radio buttons or a single checkbox to allow users to choose between two opposing states." - nngroup'),l.a.createElement(c.MDXTag,{name:"h2",components:t},"How it ",l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"h2"},l.a.createElement(c.MDXTag,{name:"strong",components:t,parentName:"em"},"should"))," work"),l.a.createElement(c.MDXTag,{name:"p",components:t},'"Toggle switches should take immediate effect and should not require the user to click Save or Submit to apply the new state. As always, we should strive to match the system to the real world."'),l.a.createElement(c.MDXTag,{name:"p",components:t},"-src: ",l.a.createElement(c.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"https://www.nngroup.com/articles/toggle-switch-guidelines/"}},"https://www.nngroup.com/articles/toggle-switch-guidelines/")),l.a.createElement(c.MDXTag,{name:"h3",components:t},"When not to use it"),l.a.createElement(c.MDXTag,{name:"p",components:t},"Don't use it if the user is required to click save or update to apply the new state."),l.a.createElement(c.MDXTag,{name:"h2",components:t},"Good practices"),l.a.createElement(c.MDXTag,{name:"p",components:t},'"The toggle labels should describe what the control will do when the switch is on; they should not be neutral or ambiguous. When in doubt, say the label aloud and append “on/off” to the end. If it doesn’t make sense, then rewrite the label"\n-src: ',l.a.createElement(c.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"https://www.nngroup.com/articles/toggle-switch-guidelines/"}},"https://www.nngroup.com/articles/toggle-switch-guidelines/")),l.a.createElement(c.MDXTag,{name:"p",components:t},"The label should describe what the toggle will do when the switch is on."),l.a.createElement(c.MDXTag,{name:"table",components:t},l.a.createElement(c.MDXTag,{name:"thead",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"thead"},l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Properties"),l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),l.a.createElement(c.MDXTag,{name:"tbody",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"title")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(mandatory)")," the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"title")," of the input - describing it a bit further for accessibility reasons.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")," of the input. Default will be a random id.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"default_state")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," boolean value. The state of the switch. Defaults to ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"false"),". Set to ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"true")," if otherwise.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"checked")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," determine whether the switch is checked or not. Default will be ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"false"),".")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"disabled")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," to disable/enable the switch.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"text_positive")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the text for the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on")," status of the switch. Default will be ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"Yes"),".")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"text_negative")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the text for the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"off")," status of the switch. Default will be ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"No"),".")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"attributes")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," insert any other attributes. For example ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"disabled")," or any other custom attributes.")))),l.a.createElement(c.MDXTag,{name:"table",components:t},l.a.createElement(c.MDXTag,{name:"thead",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"thead"},l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Events"),l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),l.a.createElement(c.MDXTag,{name:"tbody",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_change")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called on state changes made by the user.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_state_update")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called once the parameter ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"checked")," changes its value.")))))};var i={component:"Switch",class:"dnb-switch",status:"prototype",version:"0.5.0"}},472:function(e,t){e.exports='<Switch\n  id="switch-1"\n  text_positive="Yes"\n  text_negative="No"\n  labelledby="switch-1-label"\n  title="Ths is the title"\n  value="Value of switch"\n  default_state={false}\n  checked={false}\n  on_state_update={this.props.onStateUpdate}\n  on_change={this.props.onChange}\n/>\n'}}]);
//# sourceMappingURL=component---src-pages-uilib-components-switch-md-0c9d6e2d8495cc2cf5c8.js.map