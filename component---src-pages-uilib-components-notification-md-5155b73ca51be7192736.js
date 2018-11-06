(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{201:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(288);var r=o(n(0)),i=n(274),a=o(n(868));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}t.default=function(e){var t=e.components;s(e,["components"]);return r.default.createElement(i.MDXTag,{name:"wrapper",components:t},r.default.createElement(a.default,null))};t._frontmatter={header:"UI Library",title:"Notification",draft:!1,order:10}},300:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271),n(56);var r=n(286),i=f(n(308)),a=f(n(0)),o=n(310),s=_(n(11)),c=_(n(1)),p=_(n(765)),l=n(273),u=n(13);function _(e){return e&&e.__esModule?e:{default:e}}function f(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(){return"undefined"==typeof window?null:(0,p.default)().location},E=(0,l.css)(";.dnb-tabs__tabs{justify-content:space-between;align-items:center;}.fullscreen-page &{top:0;.is-sticky .dnb-tabs__tabs{margin:0 -2rem;}}.toggle-fullscreen{margin-right:1rem;}.dnb-modal__close-button{position:relative;top:auto;right:auto;}"),b=function(e){function t(e){var n,r,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,i=S(t).call(this,e),n=!i||"object"!==j(i)&&"function"!=typeof i?m(r):i,h(m(m(n)),"state",{activeTabKey:"demo",wasFullscreen:null}),h(m(m(n)),"openTab",function(e){var t=e.key;n.setState({activeTabKey:t})}),h(m(m(n)),"openFullscreen",function(){var e=g();e&&(0,u.navigate)("".concat(e.pathname,"?fullscreen#").concat(n.state.activeTabKey))}),h(m(m(n)),"quitFullscreen",function(){var e=g();e&&(0,u.navigate)([e.pathname,e.hash].join(""))});var a=g();return a&&(n.state.wasFullscreen=/fullscreen/.test(a.search)),n}var n,c,p;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,a.Component),n=t,(c=[{key:"isActive",value:function(e){return this.state.activeTabKey===e}},{key:"componentWillMount",value:function(){var e=g();e&&this.setState({wasFullscreen:/fullscreen/.test(e.search)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,c=t.id,p=t.tabs,l=t.hideTabs,u=t.ExampleCode,_=t.Description,f=t.Details,j=t.DemoComponent,d=t.CodeComponent,S=t.callback;return a.default.createElement("div",{className:"wrapped-item"},l?a.default.createElement("h4",null,a.default.createElement(s.default,{to:"/uilib/components/".concat(c)},n)):a.default.createElement("h1",null,n),!l&&a.default.createElement(r.Tabs,{data:p,on_change:this.openTab,render:function(t){var n=t.Wrapper,i=t.TabsList,s=t.Tabs;return a.default.createElement(n,{className:E},a.default.createElement(i,null,a.default.createElement("div",{className:"dnb-tabs__tabs__inner"},a.default.createElement(s,null)),e.state.wasFullscreen?a.default.createElement(o.CloseButton,{on_click:e.quitFullscreen,title:"Quit Fullscreen",className:"toggle-fullscreen"}):a.default.createElement(r.Button,{on_click:e.openFullscreen,className:"toggle-fullscreen",variant:"secondary",title:"Fullscreen",icon:"fullscreen"})))}}),this.isActive("demo")&&a.default.createElement("div",{className:"dnb-tabs__content"},!l&&a.default.createElement(_,null),a.default.createElement(j,null),S&&S.demo&&a.default.createElement(S.demo,{CodeRenderer:i.CodeRenderer})),this.isActive("info")&&a.default.createElement("div",{className:"dnb-tabs__content"},a.default.createElement(f,null),S&&S.info&&a.default.createElement(S.info,{CodeRenderer:i.CodeRenderer}),u&&a.default.createElement(a.Fragment,null,a.default.createElement("h3",null,"JSX Example"),a.default.createElement(i.CodeRenderer,{language:"jsx"},u))),this.isActive("code")&&a.default.createElement("div",{className:"dnb-tabs__content"},a.default.createElement(i.default,{source:d}),S&&S.code&&a.default.createElement(S.code,{CodeRenderer:i.CodeRenderer})))}}])&&d(n.prototype,c),p&&d(n,p),t}();h(b,"propTypes",{ExampleCode:c.default.string,Description:c.default.func.isRequired,Details:c.default.func.isRequired,DemoComponent:c.default.func.isRequired,CodeComponent:c.default.func.isRequired,callback:c.default.shape({demo:c.default.oneOfType([c.default.func,c.default.node]),info:c.default.oneOfType([c.default.func,c.default.node]),code:c.default.oneOfType([c.default.func,c.default.node])}),hideTabs:c.default.bool,title:c.default.string.isRequired,id:c.default.string.isRequired,tabs:c.default.array}),h(b,"defaultProps",{ExampleCode:null,hideTabs:!1,callback:null,tabs:[{title:"Demo",key:"demo"},{title:"Details",key:"info"},{title:"Markup",key:"code"}]});var x=b;t.default=x},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(82),n(269),n(270),n(86);var r=c(n(0)),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(762)),a=c(n(370)),o=n(763),s=c(n(305));function c(e){return e&&e.__esModule?e:{default:e}}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var u=function(e){var t=e.language,n=e.children,c=e.reactLive,u=e.className;return t||(t=((u||"").split(/-/)||[null,"jsx"])[1]),c&&"jsx"===t?(console.log("exampleCode",t,l(n)),r.default.createElement(o.LiveProvider,{code:"string"==typeof n?String(n).trim():null},r.default.createElement(o.LiveEditor,null),r.default.createElement(o.LiveError,null),r.default.createElement(o.LivePreview,null))):r.default.createElement(i.default,p({},i.defaultProps,{code:String(n).trim(),language:t,theme:a.default}),function(e){var t=e.className,n=e.style,i=e.tokens,a=e.getLineProps,o=e.getTokenProps;return r.default.createElement(s.default,{className:t,style:n,p:3},_(i).map(function(e,t){return r.default.createElement("div",a({line:e,key:t}),e.map(function(e,t){return r.default.createElement("span",o({token:e,key:t}))}))}))})};t.default=u;var _=function(e){var t=e.length;if(0===t)return e;var n=e[t-1];return 1===n.length&&n[0].empty?e.slice(0,t-1):e}},305:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=(0,((r=n(761))&&r.__esModule?r:{default:r}).default)({is:"pre",m:0});i.displayName="Pre";var a=i;t.default=a},308:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CodeRenderer=t.default=void 0,n(269),n(270),n(41),n(271),n(29),n(766);var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}(n(0)),i=p(n(309)),a=p(n(1)),o=p(n(769)),s=p(n(770)),c=p(n(301));function p(e){return e&&e.__esModule?e:{default:e}}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function _(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function d(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?h(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(e){function t(e){var n;_(this,t),g(h(h(n=d(this,S(t).call(this,e)))),"state",{codeString:""}),g(h(h(n)),"_isMounted",!1);var i=n.props.source;return n.beautify(r.default.createElement(i,null)),n}var n,a;return y(t,r.Component),j(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.setCode()}},{key:"setCode",value:function(){this.code&&this.setState({codeString:this.props.raw+this.code}),this.code=null}},{key:"beautify",value:(n=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.props.language,e.next="html"===e.t0?3:18;break;case 3:return this.code=o.default.renderToStaticMarkup(t),this.code=this.code.replace(/data-fake:/g,""),this.code=this.code.replace(/disabled=""/g,'disabled="disabled"'),e.prev=6,e.next=9,(0,i.default)(this.code,"html");case 9:this.code=e.sent,this.code=(0,s.default)(this.code,{ocd:!0}),this._isMounted&&this.setCode(),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(6),console.log("HTML Beautifier Error:",e.t1);case 17:return e.abrupt("break",18);case 18:case"end":return e.stop()}},e,this,[[6,14]])}),a=function(){var e=this,t=arguments;return new Promise(function(r,i){var a=n.apply(e,t);function o(e){u(a,r,i,o,s,"next",e)}function s(e){u(a,r,i,o,s,"throw",e)}o(void 0)})},function(e){return a.apply(this,arguments)})},{key:"render",value:function(){return this.state.codeString?r.default.createElement(b,{language:this.props.language},this.state.codeString):r.default.createElement(r.Fragment,null)}}]),t}();t.default=E,g(E,"propTypes",{language:a.default.string,raw:a.default.string,source:a.default.oneOfType([a.default.node,a.default.func]).isRequired}),g(E,"defaultProps",{language:"html",raw:""});var b=function(e){function t(){return _(this,t),d(this,S(t).apply(this,arguments))}return y(t,r.Component),j(t,[{key:"render",value:function(){return r.default.createElement(c.default,this.props)}}]),t}();t.CodeRenderer=b,g(b,"propTypes",{language:a.default.string,children:a.default.oneOfType([a.default.string,a.default.node,a.default.func]).isRequired}),g(b,"defaultProps",{language:"jsx"})},309:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(41);var r,i=(r=n(767))&&r.__esModule?r:{default:r};var a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(function(r){switch(t){case"html":i.default.clean(e,{indent:"  ",wrap:80,"replace-nbsp":!0,"remove-tags":[],"remove-attributes":[],"break-around-tags":n.breakAroundTags||["div","span","p","button","input","svg","path"]},function(e){return r(e)})}})};t.default=a},310:function(e,t,n){"use strict";n.r(t);var r=n(276);n.d(t,"propTypes",function(){return r.d}),n.d(t,"defaultProps",function(){return r.c}),n.d(t,"CloseButton",function(){return r.a})},371:function(e,t,n){var r={"./Binary_Property/ASCII.js":372,"./Binary_Property/ASCII_Hex_Digit.js":373,"./Binary_Property/Alphabetic.js":374,"./Binary_Property/Any.js":375,"./Binary_Property/Assigned.js":376,"./Binary_Property/Bidi_Control.js":377,"./Binary_Property/Bidi_Mirrored.js":378,"./Binary_Property/Case_Ignorable.js":379,"./Binary_Property/Cased.js":380,"./Binary_Property/Changes_When_Casefolded.js":381,"./Binary_Property/Changes_When_Casemapped.js":382,"./Binary_Property/Changes_When_Lowercased.js":383,"./Binary_Property/Changes_When_NFKC_Casefolded.js":384,"./Binary_Property/Changes_When_Titlecased.js":385,"./Binary_Property/Changes_When_Uppercased.js":386,"./Binary_Property/Dash.js":387,"./Binary_Property/Default_Ignorable_Code_Point.js":388,"./Binary_Property/Deprecated.js":389,"./Binary_Property/Diacritic.js":390,"./Binary_Property/Emoji.js":391,"./Binary_Property/Emoji_Component.js":392,"./Binary_Property/Emoji_Modifier.js":393,"./Binary_Property/Emoji_Modifier_Base.js":394,"./Binary_Property/Emoji_Presentation.js":395,"./Binary_Property/Extended_Pictographic.js":396,"./Binary_Property/Extender.js":397,"./Binary_Property/Grapheme_Base.js":398,"./Binary_Property/Grapheme_Extend.js":399,"./Binary_Property/Hex_Digit.js":400,"./Binary_Property/IDS_Binary_Operator.js":401,"./Binary_Property/IDS_Trinary_Operator.js":402,"./Binary_Property/ID_Continue.js":403,"./Binary_Property/ID_Start.js":404,"./Binary_Property/Ideographic.js":405,"./Binary_Property/Join_Control.js":406,"./Binary_Property/Logical_Order_Exception.js":407,"./Binary_Property/Lowercase.js":408,"./Binary_Property/Math.js":409,"./Binary_Property/Noncharacter_Code_Point.js":410,"./Binary_Property/Pattern_Syntax.js":411,"./Binary_Property/Pattern_White_Space.js":412,"./Binary_Property/Quotation_Mark.js":413,"./Binary_Property/Radical.js":414,"./Binary_Property/Regional_Indicator.js":415,"./Binary_Property/Sentence_Terminal.js":416,"./Binary_Property/Soft_Dotted.js":417,"./Binary_Property/Terminal_Punctuation.js":418,"./Binary_Property/Unified_Ideograph.js":419,"./Binary_Property/Uppercase.js":420,"./Binary_Property/Variation_Selector.js":421,"./Binary_Property/White_Space.js":422,"./Binary_Property/XID_Continue.js":423,"./Binary_Property/XID_Start.js":424,"./General_Category/Cased_Letter.js":425,"./General_Category/Close_Punctuation.js":426,"./General_Category/Connector_Punctuation.js":427,"./General_Category/Control.js":428,"./General_Category/Currency_Symbol.js":429,"./General_Category/Dash_Punctuation.js":430,"./General_Category/Decimal_Number.js":431,"./General_Category/Enclosing_Mark.js":432,"./General_Category/Final_Punctuation.js":433,"./General_Category/Format.js":434,"./General_Category/Initial_Punctuation.js":435,"./General_Category/Letter.js":436,"./General_Category/Letter_Number.js":437,"./General_Category/Line_Separator.js":438,"./General_Category/Lowercase_Letter.js":439,"./General_Category/Mark.js":440,"./General_Category/Math_Symbol.js":441,"./General_Category/Modifier_Letter.js":442,"./General_Category/Modifier_Symbol.js":443,"./General_Category/Nonspacing_Mark.js":444,"./General_Category/Number.js":445,"./General_Category/Open_Punctuation.js":446,"./General_Category/Other.js":447,"./General_Category/Other_Letter.js":448,"./General_Category/Other_Number.js":449,"./General_Category/Other_Punctuation.js":450,"./General_Category/Other_Symbol.js":451,"./General_Category/Paragraph_Separator.js":452,"./General_Category/Private_Use.js":453,"./General_Category/Punctuation.js":454,"./General_Category/Separator.js":455,"./General_Category/Space_Separator.js":456,"./General_Category/Spacing_Mark.js":457,"./General_Category/Surrogate.js":458,"./General_Category/Symbol.js":459,"./General_Category/Titlecase_Letter.js":460,"./General_Category/Unassigned.js":461,"./General_Category/Uppercase_Letter.js":462,"./Script/Adlam.js":463,"./Script/Ahom.js":464,"./Script/Anatolian_Hieroglyphs.js":465,"./Script/Arabic.js":466,"./Script/Armenian.js":467,"./Script/Avestan.js":468,"./Script/Balinese.js":469,"./Script/Bamum.js":470,"./Script/Bassa_Vah.js":471,"./Script/Batak.js":472,"./Script/Bengali.js":473,"./Script/Bhaiksuki.js":474,"./Script/Bopomofo.js":475,"./Script/Brahmi.js":476,"./Script/Braille.js":477,"./Script/Buginese.js":478,"./Script/Buhid.js":479,"./Script/Canadian_Aboriginal.js":480,"./Script/Carian.js":481,"./Script/Caucasian_Albanian.js":482,"./Script/Chakma.js":483,"./Script/Cham.js":484,"./Script/Cherokee.js":485,"./Script/Common.js":486,"./Script/Coptic.js":487,"./Script/Cuneiform.js":488,"./Script/Cypriot.js":489,"./Script/Cyrillic.js":490,"./Script/Deseret.js":491,"./Script/Devanagari.js":492,"./Script/Dogra.js":493,"./Script/Duployan.js":494,"./Script/Egyptian_Hieroglyphs.js":495,"./Script/Elbasan.js":496,"./Script/Ethiopic.js":497,"./Script/Georgian.js":498,"./Script/Glagolitic.js":499,"./Script/Gothic.js":500,"./Script/Grantha.js":501,"./Script/Greek.js":502,"./Script/Gujarati.js":503,"./Script/Gunjala_Gondi.js":504,"./Script/Gurmukhi.js":505,"./Script/Han.js":506,"./Script/Hangul.js":507,"./Script/Hanifi_Rohingya.js":508,"./Script/Hanunoo.js":509,"./Script/Hatran.js":510,"./Script/Hebrew.js":511,"./Script/Hiragana.js":512,"./Script/Imperial_Aramaic.js":513,"./Script/Inherited.js":514,"./Script/Inscriptional_Pahlavi.js":515,"./Script/Inscriptional_Parthian.js":516,"./Script/Javanese.js":517,"./Script/Kaithi.js":518,"./Script/Kannada.js":519,"./Script/Katakana.js":520,"./Script/Kayah_Li.js":521,"./Script/Kharoshthi.js":522,"./Script/Khmer.js":523,"./Script/Khojki.js":524,"./Script/Khudawadi.js":525,"./Script/Lao.js":526,"./Script/Latin.js":527,"./Script/Lepcha.js":528,"./Script/Limbu.js":529,"./Script/Linear_A.js":530,"./Script/Linear_B.js":531,"./Script/Lisu.js":532,"./Script/Lycian.js":533,"./Script/Lydian.js":534,"./Script/Mahajani.js":535,"./Script/Makasar.js":536,"./Script/Malayalam.js":537,"./Script/Mandaic.js":538,"./Script/Manichaean.js":539,"./Script/Marchen.js":540,"./Script/Masaram_Gondi.js":541,"./Script/Medefaidrin.js":542,"./Script/Meetei_Mayek.js":543,"./Script/Mende_Kikakui.js":544,"./Script/Meroitic_Cursive.js":545,"./Script/Meroitic_Hieroglyphs.js":546,"./Script/Miao.js":547,"./Script/Modi.js":548,"./Script/Mongolian.js":549,"./Script/Mro.js":550,"./Script/Multani.js":551,"./Script/Myanmar.js":552,"./Script/Nabataean.js":553,"./Script/New_Tai_Lue.js":554,"./Script/Newa.js":555,"./Script/Nko.js":556,"./Script/Nushu.js":557,"./Script/Ogham.js":558,"./Script/Ol_Chiki.js":559,"./Script/Old_Hungarian.js":560,"./Script/Old_Italic.js":561,"./Script/Old_North_Arabian.js":562,"./Script/Old_Permic.js":563,"./Script/Old_Persian.js":564,"./Script/Old_Sogdian.js":565,"./Script/Old_South_Arabian.js":566,"./Script/Old_Turkic.js":567,"./Script/Oriya.js":568,"./Script/Osage.js":569,"./Script/Osmanya.js":570,"./Script/Pahawh_Hmong.js":571,"./Script/Palmyrene.js":572,"./Script/Pau_Cin_Hau.js":573,"./Script/Phags_Pa.js":574,"./Script/Phoenician.js":575,"./Script/Psalter_Pahlavi.js":576,"./Script/Rejang.js":577,"./Script/Runic.js":578,"./Script/Samaritan.js":579,"./Script/Saurashtra.js":580,"./Script/Sharada.js":581,"./Script/Shavian.js":582,"./Script/Siddham.js":583,"./Script/SignWriting.js":584,"./Script/Sinhala.js":585,"./Script/Sogdian.js":586,"./Script/Sora_Sompeng.js":587,"./Script/Soyombo.js":588,"./Script/Sundanese.js":589,"./Script/Syloti_Nagri.js":590,"./Script/Syriac.js":591,"./Script/Tagalog.js":592,"./Script/Tagbanwa.js":593,"./Script/Tai_Le.js":594,"./Script/Tai_Tham.js":595,"./Script/Tai_Viet.js":596,"./Script/Takri.js":597,"./Script/Tamil.js":598,"./Script/Tangut.js":599,"./Script/Telugu.js":600,"./Script/Thaana.js":601,"./Script/Thai.js":602,"./Script/Tibetan.js":603,"./Script/Tifinagh.js":604,"./Script/Tirhuta.js":605,"./Script/Ugaritic.js":606,"./Script/Vai.js":607,"./Script/Warang_Citi.js":608,"./Script/Yi.js":609,"./Script/Zanabazar_Square.js":610,"./Script_Extensions/Adlam.js":611,"./Script_Extensions/Ahom.js":612,"./Script_Extensions/Anatolian_Hieroglyphs.js":613,"./Script_Extensions/Arabic.js":614,"./Script_Extensions/Armenian.js":615,"./Script_Extensions/Avestan.js":616,"./Script_Extensions/Balinese.js":617,"./Script_Extensions/Bamum.js":618,"./Script_Extensions/Bassa_Vah.js":619,"./Script_Extensions/Batak.js":620,"./Script_Extensions/Bengali.js":621,"./Script_Extensions/Bhaiksuki.js":622,"./Script_Extensions/Bopomofo.js":623,"./Script_Extensions/Brahmi.js":624,"./Script_Extensions/Braille.js":625,"./Script_Extensions/Buginese.js":626,"./Script_Extensions/Buhid.js":627,"./Script_Extensions/Canadian_Aboriginal.js":628,"./Script_Extensions/Carian.js":629,"./Script_Extensions/Caucasian_Albanian.js":630,"./Script_Extensions/Chakma.js":631,"./Script_Extensions/Cham.js":632,"./Script_Extensions/Cherokee.js":633,"./Script_Extensions/Common.js":634,"./Script_Extensions/Coptic.js":635,"./Script_Extensions/Cuneiform.js":636,"./Script_Extensions/Cypriot.js":637,"./Script_Extensions/Cyrillic.js":638,"./Script_Extensions/Deseret.js":639,"./Script_Extensions/Devanagari.js":640,"./Script_Extensions/Dogra.js":641,"./Script_Extensions/Duployan.js":642,"./Script_Extensions/Egyptian_Hieroglyphs.js":643,"./Script_Extensions/Elbasan.js":644,"./Script_Extensions/Ethiopic.js":645,"./Script_Extensions/Georgian.js":646,"./Script_Extensions/Glagolitic.js":647,"./Script_Extensions/Gothic.js":648,"./Script_Extensions/Grantha.js":649,"./Script_Extensions/Greek.js":650,"./Script_Extensions/Gujarati.js":651,"./Script_Extensions/Gunjala_Gondi.js":652,"./Script_Extensions/Gurmukhi.js":653,"./Script_Extensions/Han.js":654,"./Script_Extensions/Hangul.js":655,"./Script_Extensions/Hanifi_Rohingya.js":656,"./Script_Extensions/Hanunoo.js":657,"./Script_Extensions/Hatran.js":658,"./Script_Extensions/Hebrew.js":659,"./Script_Extensions/Hiragana.js":660,"./Script_Extensions/Imperial_Aramaic.js":661,"./Script_Extensions/Inherited.js":662,"./Script_Extensions/Inscriptional_Pahlavi.js":663,"./Script_Extensions/Inscriptional_Parthian.js":664,"./Script_Extensions/Javanese.js":665,"./Script_Extensions/Kaithi.js":666,"./Script_Extensions/Kannada.js":667,"./Script_Extensions/Katakana.js":668,"./Script_Extensions/Kayah_Li.js":669,"./Script_Extensions/Kharoshthi.js":670,"./Script_Extensions/Khmer.js":671,"./Script_Extensions/Khojki.js":672,"./Script_Extensions/Khudawadi.js":673,"./Script_Extensions/Lao.js":674,"./Script_Extensions/Latin.js":675,"./Script_Extensions/Lepcha.js":676,"./Script_Extensions/Limbu.js":677,"./Script_Extensions/Linear_A.js":678,"./Script_Extensions/Linear_B.js":679,"./Script_Extensions/Lisu.js":680,"./Script_Extensions/Lycian.js":681,"./Script_Extensions/Lydian.js":682,"./Script_Extensions/Mahajani.js":683,"./Script_Extensions/Makasar.js":684,"./Script_Extensions/Malayalam.js":685,"./Script_Extensions/Mandaic.js":686,"./Script_Extensions/Manichaean.js":687,"./Script_Extensions/Marchen.js":688,"./Script_Extensions/Masaram_Gondi.js":689,"./Script_Extensions/Medefaidrin.js":690,"./Script_Extensions/Meetei_Mayek.js":691,"./Script_Extensions/Mende_Kikakui.js":692,"./Script_Extensions/Meroitic_Cursive.js":693,"./Script_Extensions/Meroitic_Hieroglyphs.js":694,"./Script_Extensions/Miao.js":695,"./Script_Extensions/Modi.js":696,"./Script_Extensions/Mongolian.js":697,"./Script_Extensions/Mro.js":698,"./Script_Extensions/Multani.js":699,"./Script_Extensions/Myanmar.js":700,"./Script_Extensions/Nabataean.js":701,"./Script_Extensions/New_Tai_Lue.js":702,"./Script_Extensions/Newa.js":703,"./Script_Extensions/Nko.js":704,"./Script_Extensions/Nushu.js":705,"./Script_Extensions/Ogham.js":706,"./Script_Extensions/Ol_Chiki.js":707,"./Script_Extensions/Old_Hungarian.js":708,"./Script_Extensions/Old_Italic.js":709,"./Script_Extensions/Old_North_Arabian.js":710,"./Script_Extensions/Old_Permic.js":711,"./Script_Extensions/Old_Persian.js":712,"./Script_Extensions/Old_Sogdian.js":713,"./Script_Extensions/Old_South_Arabian.js":714,"./Script_Extensions/Old_Turkic.js":715,"./Script_Extensions/Oriya.js":716,"./Script_Extensions/Osage.js":717,"./Script_Extensions/Osmanya.js":718,"./Script_Extensions/Pahawh_Hmong.js":719,"./Script_Extensions/Palmyrene.js":720,"./Script_Extensions/Pau_Cin_Hau.js":721,"./Script_Extensions/Phags_Pa.js":722,"./Script_Extensions/Phoenician.js":723,"./Script_Extensions/Psalter_Pahlavi.js":724,"./Script_Extensions/Rejang.js":725,"./Script_Extensions/Runic.js":726,"./Script_Extensions/Samaritan.js":727,"./Script_Extensions/Saurashtra.js":728,"./Script_Extensions/Sharada.js":729,"./Script_Extensions/Shavian.js":730,"./Script_Extensions/Siddham.js":731,"./Script_Extensions/SignWriting.js":732,"./Script_Extensions/Sinhala.js":733,"./Script_Extensions/Sogdian.js":734,"./Script_Extensions/Sora_Sompeng.js":735,"./Script_Extensions/Soyombo.js":736,"./Script_Extensions/Sundanese.js":737,"./Script_Extensions/Syloti_Nagri.js":738,"./Script_Extensions/Syriac.js":739,"./Script_Extensions/Tagalog.js":740,"./Script_Extensions/Tagbanwa.js":741,"./Script_Extensions/Tai_Le.js":742,"./Script_Extensions/Tai_Tham.js":743,"./Script_Extensions/Tai_Viet.js":744,"./Script_Extensions/Takri.js":745,"./Script_Extensions/Tamil.js":746,"./Script_Extensions/Tangut.js":747,"./Script_Extensions/Telugu.js":748,"./Script_Extensions/Thaana.js":749,"./Script_Extensions/Thai.js":750,"./Script_Extensions/Tibetan.js":751,"./Script_Extensions/Tifinagh.js":752,"./Script_Extensions/Tirhuta.js":753,"./Script_Extensions/Ugaritic.js":754,"./Script_Extensions/Vai.js":755,"./Script_Extensions/Warang_Citi.js":756,"./Script_Extensions/Yi.js":757,"./Script_Extensions/Zanabazar_Square.js":758,"./index.js":759,"./unicode-version.js":760};function i(e){var t=a(e);return n(t)}function a(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}i.keys=function(){return Object.keys(r)},i.resolve=a,e.exports=i,i.id=371},768:function(e,t){},868:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(82),n(271);var r=u(n(0)),i=l(n(1)),a=l(n(300)),o=u(n(869)),s=l(n(870)),c=l(n(871)),p=l(n(872));function l(e){return e&&e.__esModule?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return!t||"object"!==_(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),d(this,S(t).apply(this,arguments))}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,r.Component),n=t,(i=[{key:"render",value:function(){return r.default.createElement(a.default,f({},t.defaultProps,this.props))}}])&&j(n.prototype,i),o&&j(n,o),t}();t.default=h,m(h,"propTypes",{title:i.default.string,id:i.default.string,Description:i.default.func,Details:i.default.func,DemoComponent:i.default.func,CodeComponent:i.default.func,hideTabs:i.default.bool}),m(h,"defaultProps",{title:"Notification",id:"notification",ExampleCode:p.default,Description:s.default,Details:c.default,DemoComponent:o.default,CodeComponent:o.Example,callback:o.Example.AdditionalCallback||null,hideTabs:!1})},869:function(e,t,n){"use strict";n.r(t),n.d(t,"Example",function(){return c});var r=n(6),i=n.n(r),a=n(0),o=n.n(a),s=n(283),c=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){return o.a.createElement(a.Fragment,null,o.a.createElement(s.a,{notification_amount:2,title_text:"Du har {amount} notifications"}),o.a.createElement(s.a,{notification_amount:2,title_text:"Du har {amount} notifications"}),o.a.createElement(s.a,{notification_amount:0,title_text:"Du har ingen notifications"}))},t}(a.Component);t.default=function(){return o.a.createElement(c,null)}},870:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return c});var r=n(83),i=n.n(r),a=n(0),o=n.n(a),s=n(274);t.default=function(e){var t=e.components;i()(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"p",components:t},"TODO: Write description for Notifications"))};var c={}},871:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return c});var r=n(83),i=n.n(r),a=n(0),o=n.n(a),s=n(274);t.default=function(e){var t=e.components;i()(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"table",components:t},o.a.createElement(s.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Properties"),o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),o.a.createElement(s.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"notification_amount")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(mandatory)")," the amount of notifications")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"title_text")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(mandatory)")," accessibility helper text - telling the user what the icon means")))))};var c={}},872:function(e,t){e.exports='<Notification\n  notification_amount={2}\n  title_text="Du har {amount} notifications"\n/>\n<Notification\n  notification_amount={2}\n  title_text="Du har {amount} notifications"\n/>\n<Notification\n  notification_amount={0}\n  title_text="Du har ingen notifications"\n/>\n'}}]);
//# sourceMappingURL=component---src-pages-uilib-components-notification-md-5155b73ca51be7192736.js.map