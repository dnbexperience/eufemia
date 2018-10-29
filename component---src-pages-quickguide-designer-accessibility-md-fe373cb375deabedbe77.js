(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{168:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(287);var r,o=(r=n(0))&&r.__esModule?r:{default:r},u=n(278);function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}t.default=function(e){var t=e.components;a(e,["components"]);return o.default.createElement(u.MDXTag,{name:"wrapper",components:t},o.default.createElement(u.MDXTag,{name:"h1",components:t},"Accessibility, Inclusivness and WCAG"))};t._frontmatter={header:"Quickguide Designers - WCAG Accessibility",title:"WCAG Accessibility",draft:!1}},278:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(330);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return u(r).default}});var o=n(301);function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return u(o).default}})},287:function(e,t,n){var r=n(30),o=n(43);n(332)("keys",function(){return function(e){return o(r(e))}})},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=c(n(0)),u=c(n(57)),a=c(n(1));function c(e){return e&&e.__esModule?e:{default:e}}var i=(0,u.default)({}),l=i.Provider,f=i.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,u=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["components"]);return o.default.createElement(f,null,function(t){return o.default.createElement(e,r({components:n||t},u))})}};var s=function(e){var t=e.components,n=e.children;return o.default.createElement(l,{value:t},n)};s.propTypes={components:a.default.object.isRequired,children:a.default.element.isRequired},t.default=s},330:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),a=l(u),c=l(n(331)),i=n(301);function l(e){return e&&e.__esModule?e:{default:e}}var f={inlineCode:"code",wrapper:"div"},s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u.Component),o(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,o=e.props,u=void 0===o?{}:o,i=e.children,l=e.components,s=void 0===l?{}:l,p=e.Layout,d=e.layoutProps,y=s[n+"."+t]||s[t]||f[t]||t;return p?((0,c.default)(this,p),a.default.createElement(p,r({components:s},d),a.default.createElement(y,u,i))):a.default.createElement(y,u,i)}}]),t}();t.default=(0,i.withMDXComponents)(s)},331:function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},u=Object.defineProperty,a=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,i=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,f=l&&l(Object);e.exports=function e(t,n,s){if("string"!=typeof n){if(f){var p=l(n);p&&p!==f&&e(t,p,s)}var d=a(n);c&&(d=d.concat(c(n)));for(var y=0;y<d.length;++y){var b=d[y];if(!(r[b]||o[b]||s&&s[b])){var v=i(n,b);try{u(t,b,v)}catch(e){}}}return t}return t}},332:function(e,t,n){var r=n(7),o=n(21),u=n(19);e.exports=function(e,t){var n=(o.Object||{})[e]||Object[e],a={};a[e]=t(n),r(r.S+r.F*u(function(){n(1)}),"Object",a)}}}]);
//# sourceMappingURL=component---src-pages-quickguide-designer-accessibility-md-fe373cb375deabedbe77.js.map