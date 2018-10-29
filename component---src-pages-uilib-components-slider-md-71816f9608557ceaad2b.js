(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{203:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(287);var a=l(n(0)),r=n(278),o=l(n(465));function l(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components;c(e,["components"]);return a.default.createElement(r.MDXTag,{name:"wrapper",components:t},a.default.createElement(o.default,null))};t._frontmatter={header:"UI Library",title:"Slider",draft:!1,order:11}},299:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271),n(56);var a=n(285),r=d(n(305)),o=d(n(0)),l=n(307),c=p(n(11)),i=p(n(1)),u=p(n(369)),s=n(272),m=n(13);function p(e){return e&&e.__esModule?e:{default:e}}function d(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(){return"undefined"==typeof window?null:(0,u.default)().location},_=(0,s.css)(";.fullscreen-page &{top:0;.is-sticky .dnb-tabs__tabs{margin:0 -2rem;}}.dnb-tabs__tabs{justify-content:space-between;align-items:center;}.toggle-fullscreen{margin-right:1rem;}.dnb-modal__close-button{position:relative;top:auto;right:auto;}"),T=function(e){function t(e){var n,a,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=g(t).call(this,e),n=!r||"object"!==f(r)&&"function"!=typeof r?v(a):r,h(v(v(n)),"state",{activeTabKey:"demo",wasFullscreen:null}),h(v(v(n)),"openTab",function(e){var t=e.key;n.setState({activeTabKey:t})}),h(v(v(n)),"openFullscreen",function(){var e=E();e&&(0,m.navigate)("".concat(e.pathname,"?fullscreen#").concat(n.state.activeTabKey))}),h(v(v(n)),"quitFullscreen",function(){var e=E();e&&(0,m.navigate)([e.pathname,e.hash].join(""))});var o=E();return o&&(n.state.wasFullscreen=/fullscreen/.test(o.search)),n}var n,i,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,o.Component),n=t,(i=[{key:"isActive",value:function(e){return this.state.activeTabKey===e}},{key:"componentWillMount",value:function(){var e=E();e&&this.setState({wasFullscreen:/fullscreen/.test(e.search)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,i=t.id,u=t.tabs,s=t.hideTabs,m=t.ExampleCode,p=t.InfoComponent,d=t.DemoComponent,f=t.CodeComponent,b=t.callback;return o.default.createElement("div",{className:"wrapped-item"},s?o.default.createElement("h4",null,o.default.createElement(c.default,{to:"/uilib/components/".concat(i)},n)):o.default.createElement("h1",null,n),!s&&o.default.createElement(a.Tabs,{data:u,on_change:this.openTab,render:function(t){var n=t.Wrapper,r=t.TabsList,c=t.Tabs;return o.default.createElement(n,{className:_},o.default.createElement(r,null,o.default.createElement("div",{className:"dnb-tabs__tabs__inner"},o.default.createElement(c,null)),e.state.wasFullscreen?o.default.createElement(l.CloseButton,{on_click:e.quitFullscreen,title:"Quit Fullscreen",className:"toggle-fullscreen"}):o.default.createElement(a.Button,{on_click:e.openFullscreen,className:"toggle-fullscreen",variant:"secondary",title:"Fullscreen",icon:"fullscreen"})))}}),this.isActive("demo")&&o.default.createElement("div",{className:"dnb-tabs__content"},o.default.createElement(d,null),b&&b.demo&&o.default.createElement(b.demo,{CodeRenderer:r.CodeRenderer})),this.isActive("info")&&o.default.createElement("div",{className:"dnb-tabs__content"},o.default.createElement(p,null),b&&b.info&&o.default.createElement(b.info,{CodeRenderer:r.CodeRenderer}),m&&o.default.createElement(o.Fragment,null,o.default.createElement("h3",null,"JSX Example"),o.default.createElement(r.CodeRenderer,{language:"jsx"},m))),this.isActive("code")&&o.default.createElement("div",{className:"dnb-tabs__content"},o.default.createElement(r.default,{source:f}),b&&b.code&&o.default.createElement(b.code,{CodeRenderer:r.CodeRenderer})))}}])&&b(n.prototype,i),u&&b(n,u),t}();h(T,"propTypes",{ExampleCode:i.default.string,InfoComponent:i.default.func.isRequired,DemoComponent:i.default.func.isRequired,CodeComponent:i.default.func.isRequired,callback:i.default.shape({demo:i.default.oneOfType([i.default.func,i.default.node]),info:i.default.oneOfType([i.default.func,i.default.node]),code:i.default.oneOfType([i.default.func,i.default.node])}),hideTabs:i.default.bool,title:i.default.string.isRequired,id:i.default.string.isRequired,tabs:i.default.array}),h(T,"defaultProps",{ExampleCode:null,hideTabs:!1,callback:null,tabs:[{title:"Demo",key:"demo"},{title:"Details",key:"info"},{title:"Markup",key:"code"}]});var M=T;t.default=M},300:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(82),n(269),n(270),n(86);var a=i(n(0)),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(367)),o=i(n(364)),l=n(365),c=i(n(304));function i(e){return e&&e.__esModule?e:{default:e}}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var m=function(e){var t=e.language,n=e.children,i=e.reactLive,m=e.className;return t||(t=((m||"").split(/-/)||[null,"jsx"])[1]),i&&"jsx"===t?(console.log("exampleCode",t,s(n)),a.default.createElement(l.LiveProvider,{code:"string"==typeof n?String(n).trim():null},a.default.createElement(l.LiveEditor,null),a.default.createElement(l.LiveError,null),a.default.createElement(l.LivePreview,null))):a.default.createElement(r.default,u({},r.defaultProps,{code:String(n).trim(),language:t,theme:o.default}),function(e){var t=e.className,n=e.style,r=e.tokens,o=e.getLineProps,l=e.getTokenProps;return a.default.createElement(c.default,{className:t,style:n,p:3},p(r).map(function(e,t){return a.default.createElement("div",o({line:e,key:t}),e.map(function(e,t){return a.default.createElement("span",l({token:e,key:t}))}))}))})};t.default=m;var p=function(e){var t=e.length;if(0===t)return e;var n=e[t-1];return 1===n.length&&n[0].empty?e.slice(0,t-1):e}},304:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((a=n(366))&&a.__esModule?a:{default:a}).default)({is:"pre",m:0});r.displayName="Pre";var o=r;t.default=o},305:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CodeRenderer=t.default=void 0,n(269),n(270),n(41),n(271),n(29),n(370);var a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(0)),r=u(n(306)),o=u(n(1)),l=u(n(375)),c=u(n(376)),i=u(n(300));function u(e){return e&&e.__esModule?e:{default:e}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n,a,r,o,l){try{var c=e[o](l),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(a,r)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function b(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?h(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=function(e){function t(e){var n;p(this,t),E(h(h(n=b(this,g(t).call(this,e)))),"state",{codeString:""}),E(h(h(n)),"_isMounted",!1);var r=n.props.source;return n.beautify(a.default.createElement(r,null)),n}var n,o;return y(t,a.Component),f(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.setCode()}},{key:"setCode",value:function(){this.code&&this.setState({codeString:this.props.raw+this.code}),this.code=null}},{key:"beautify",value:(n=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.props.language,e.next="html"===e.t0?3:18;break;case 3:return this.code=l.default.renderToStaticMarkup(t),this.code=this.code.replace(/data-fake:/g,""),this.code=this.code.replace(/disabled=""/g,'disabled="disabled"'),e.prev=6,e.next=9,(0,r.default)(this.code,"html");case 9:this.code=e.sent,this.code=(0,c.default)(this.code,{ocd:!0}),this._isMounted&&this.setCode(),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(6),console.log("HTML Beautifier Error:",e.t1);case 17:return e.abrupt("break",18);case 18:case"end":return e.stop()}},e,this,[[6,14]])}),o=function(){var e=this,t=arguments;return new Promise(function(a,r){var o=n.apply(e,t);function l(e){m(o,a,r,l,c,"next",e)}function c(e){m(o,a,r,l,c,"throw",e)}l(void 0)})},function(e){return o.apply(this,arguments)})},{key:"render",value:function(){return this.state.codeString?a.default.createElement(T,{language:this.props.language},this.state.codeString):a.default.createElement(a.Fragment,null)}}]),t}();t.default=_,E(_,"propTypes",{language:o.default.string,raw:o.default.string,source:o.default.oneOfType([o.default.node,o.default.func]).isRequired}),E(_,"defaultProps",{language:"html",raw:""});var T=function(e){function t(){return p(this,t),b(this,g(t).apply(this,arguments))}return y(t,a.Component),f(t,[{key:"render",value:function(){return a.default.createElement(i.default,this.props)}}]),t}();t.CodeRenderer=T,E(T,"propTypes",{language:o.default.string,children:o.default.oneOfType([o.default.string,o.default.node,o.default.func]).isRequired}),E(T,"defaultProps",{language:"jsx"})},306:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(41);var a,r=(a=n(371))&&a.__esModule?a:{default:a};var o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(function(a){switch(t){case"html":r.default.clean(e,{indent:"  ",wrap:80,"replace-nbsp":!0,"remove-tags":[],"remove-attributes":[],"break-around-tags":n.breakAroundTags||["div","span","p","button","input","svg","path"]},function(e){return a(e)})}})};t.default=o},307:function(e,t,n){"use strict";n.r(t);var a=n(274);n.d(t,"propTypes",function(){return a.d}),n.d(t,"defaultProps",function(){return a.c}),n.d(t,"CloseButton",function(){return a.a})},372:function(e,t){},373:function(e,t){},374:function(e,t){},465:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(82),n(271);var a=s(n(0)),r=u(n(1)),o=u(n(299)),l=s(n(466)),c=u(n(467)),i=u(n(468));function u(e){return e&&e.__esModule?e:{default:e}}function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,b(t).apply(this,arguments))}var n,r,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,a.Component),n=t,(r=[{key:"render",value:function(){return a.default.createElement(o.default,p({},t.defaultProps,this.props))}}])&&d(n.prototype,r),l&&d(n,l),t}();t.default=v,y(v,"propTypes",{title:r.default.string,id:r.default.string,InfoComponent:r.default.func,DemoComponent:r.default.func,CodeComponent:r.default.func,hideTabs:r.default.bool}),y(v,"defaultProps",{title:"Slider",id:"slider",ExampleCode:i.default,InfoComponent:c.default,DemoComponent:l.default,CodeComponent:l.Example,callback:l.Example.AdditionalCallback||null,hideTabs:!1})},466:function(e,t,n){"use strict";n.r(t),n.d(t,"Example",function(){return p});var a=n(85),r=n(6),o=n.n(r),l=n(0),c=n.n(l),i=n(272),u=n(283),s=n(275),m=n(279),p=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).onChangeHandler=function(e){var t=e.value;console.log("on_change",t)},t}return o()(t,e),t.prototype.render=function(){return c.a.createElement(l.Fragment,null,c.a.createElement(u.a,{min:0,max:100,value:70,step:10,on_change:this.onChangeHandler,attributes:{"data-fake:on_change":"SliderDemo.onChangeHandler()","data-fake:on_state_update":"SliderDemo.onStateUpdateHandler()"}}),c.a.createElement(u.a,{value:"70",max:"100",disabled:!0}))},t}(l.Component),d=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={value:5908e3},t}return o()(t,e),t.prototype.render=function(){var e=this;return c.a.createElement("div",{className:Object(a.css)(Object(i.css)(".dnb-form{padding-top:2em;}.dnb-slider__slider-row{display:flex;align-items:flex-start;justify-content:center;align-content:center;.dnb-slider{width:100%;}.dnb-slider__input-container{margin:0.2rem 0 0 0;flex:3;}.dnb-slider__output-container{margin:0 0 0 0.5rem;flex:2;}.dnb-slider__input{margin:0 0.25rem;}}"))},c.a.createElement(p,null),c.a.createElement("form",{className:"dnb-form"},c.a.createElement("div",{className:"dnb-form__item"},c.a.createElement("div",{className:"dnb-form__cell"},c.a.createElement(m.a,{for_id:"slider-2",text:"Hvor mye ønsker du å kjøpe bolig for?"})),c.a.createElement("div",{className:"dnb-form__cell dnb-slider__slider-row"},c.a.createElement("div",{className:"dnb-slider__input-container"},c.a.createElement(u.a,{id:"slider-2",min:1e6,max:8e6,value:this.state.value,step:1e5,on_init:function(t){var n=t.value;e.setState({value:n})},on_change:function(t){var n=t.value;e.setState({value:n})}})),c.a.createElement("div",{className:"dnb-slider__output-container"},c.a.createElement(s.a,{type:"text",value:this.state.value,font_class:"typo-light typo-number--old-style",description:"Kr",extra_information:"Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp.",on_change:function(t){var n=t.value;e.setState({value:parseFloat(n)})}}))),c.a.createElement("div",{className:Object(a.css)(Object(i.css)("height:10rem;"))+" dnb-form__cell"},c.a.createElement(u.a,{id:"slider-3",min:1e6,max:8e6,value:this.state.value,step:10,vertical:!0,reverse:!0,on_change:function(t){var n=t.value;e.setState({value:n})},on_state_update:function(e){var t=e.value;console.log("on_state_update",t)}})))))},t}(l.Component);t.default=d},467:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return i});var a=n(83),r=n.n(a),o=n(0),l=n.n(o),c=n(278);t.default=function(e){var t=e.components;r()(e,["components"]);return l.a.createElement(c.MDXTag,{name:"wrapper",components:t},l.a.createElement(c.MDXTag,{name:"p",components:t},"The slider component is an custom value change component. Use it to make user input more convinient and faster."),l.a.createElement(c.MDXTag,{name:"table",components:t},l.a.createElement(c.MDXTag,{name:"thead",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"thead"},l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Properties"),l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),l.a.createElement(c.MDXTag,{name:"tbody",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"value")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(mandatory)")," the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"vlaue")," of the slider. Also the event callback result.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")," of the input. Default will be a random id.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"min")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the minimum value.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"max")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the maxium value.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"step")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the steps the slider takes on changing the value.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"vertical")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," show the slider vertically.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"reverse")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," show the slider reversed.")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"disabled")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," disable the slider.")))),l.a.createElement(c.MDXTag,{name:"table",components:t},l.a.createElement(c.MDXTag,{name:"thead",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"thead"},l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Events"),l.a.createElement(c.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),l.a.createElement(c.MDXTag,{name:"tbody",components:t,parentName:"table"},l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_init")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called once the component is ready to use. The callback value is an object like {value: Number}")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_change")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called on state changes made by the user. The callback value is an object like {value: Number}")),l.a.createElement(c.MDXTag,{name:"tr",components:t,parentName:"tbody"},l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_state_update")),l.a.createElement(c.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},l.a.createElement(c.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called once the parameter ",l.a.createElement(c.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"value")," changes its value.")))))};var i={component:"Slider",class:"dnb-slider",status:"prototype",version:"0.5.0"}},468:function(e,t){e.exports='<Slider\n  min={0}\n  max={100}\n  value={70}\n  step={10}\n  on_change={this.onChangeHandler}\n/>\n<Slider value="70" max="100" disabled />\n'}}]);
//# sourceMappingURL=component---src-pages-uilib-components-slider-md-71816f9608557ceaad2b.js.map