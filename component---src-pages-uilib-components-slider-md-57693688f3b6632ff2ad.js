(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{202:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(288);var a=o(n(0)),r=n(274),i=o(n(873));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}t.default=function(e){var t=e.components;s(e,["components"]);return a.default.createElement(r.MDXTag,{name:"wrapper",components:t},a.default.createElement(i.default,null))};t._frontmatter={header:"UI Library",title:"Slider",draft:!1,order:11}},300:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(271),n(56);var a=n(286),r=d(n(308)),i=d(n(0)),o=n(310),s=m(n(11)),c=m(n(1)),l=m(n(765)),p=n(273),u=n(13);function m(e){return e&&e.__esModule?e:{default:e}}function d(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(){return"undefined"==typeof window?null:(0,l.default)().location},h=(0,p.css)(";.dnb-tabs__tabs{justify-content:space-between;align-items:center;}.fullscreen-page &{top:0;.is-sticky .dnb-tabs__tabs{margin:0 -2rem;}}.toggle-fullscreen{margin-right:1rem;}.dnb-modal__close-button{position:relative;top:auto;right:auto;}"),b=function(e){function t(e){var n,a,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,r=j(t).call(this,e),n=!r||"object"!==_(r)&&"function"!=typeof r?S(a):r,g(S(S(n)),"state",{activeTabKey:"demo",wasFullscreen:null}),g(S(S(n)),"openTab",function(e){var t=e.key;n.setState({activeTabKey:t})}),g(S(S(n)),"openFullscreen",function(){var e=E();e&&(0,u.navigate)("".concat(e.pathname,"?fullscreen#").concat(n.state.activeTabKey))}),g(S(S(n)),"quitFullscreen",function(){var e=E();e&&(0,u.navigate)([e.pathname,e.hash].join(""))});var i=E();return i&&(n.state.wasFullscreen=/fullscreen/.test(i.search)),n}var n,c,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,i.Component),n=t,(c=[{key:"isActive",value:function(e){return this.state.activeTabKey===e}},{key:"componentWillMount",value:function(){var e=E();e&&this.setState({wasFullscreen:/fullscreen/.test(e.search)})}},{key:"render",value:function(){var e=this,t=this.props,n=t.title,c=t.id,l=t.tabs,p=t.hideTabs,u=t.ExampleCode,m=t.Description,d=t.Details,_=t.DemoComponent,f=t.CodeComponent,j=t.callback;return i.default.createElement("div",{className:"wrapped-item"},p?i.default.createElement("h4",null,i.default.createElement(s.default,{to:"/uilib/components/".concat(c)},n)):i.default.createElement("h1",null,n),!p&&i.default.createElement(a.Tabs,{data:l,on_change:this.openTab,render:function(t){var n=t.Wrapper,r=t.TabsList,s=t.Tabs;return i.default.createElement(n,{className:h},i.default.createElement(r,null,i.default.createElement("div",{className:"dnb-tabs__tabs__inner"},i.default.createElement(s,null)),e.state.wasFullscreen?i.default.createElement(o.CloseButton,{on_click:e.quitFullscreen,title:"Quit Fullscreen",className:"toggle-fullscreen"}):i.default.createElement(a.Button,{on_click:e.openFullscreen,className:"toggle-fullscreen",variant:"secondary",title:"Fullscreen",icon:"fullscreen"})))}}),this.isActive("demo")&&i.default.createElement("div",{className:"dnb-tabs__content"},!p&&i.default.createElement(m,null),i.default.createElement(_,null),j&&j.demo&&i.default.createElement(j.demo,{CodeRenderer:r.CodeRenderer})),this.isActive("info")&&i.default.createElement("div",{className:"dnb-tabs__content"},i.default.createElement(d,null),j&&j.info&&i.default.createElement(j.info,{CodeRenderer:r.CodeRenderer}),u&&i.default.createElement(i.Fragment,null,i.default.createElement("h3",null,"JSX Example"),i.default.createElement(r.CodeRenderer,{language:"jsx"},u))),this.isActive("code")&&i.default.createElement("div",{className:"dnb-tabs__content"},i.default.createElement(r.default,{source:f}),j&&j.code&&i.default.createElement(j.code,{CodeRenderer:r.CodeRenderer})))}}])&&f(n.prototype,c),l&&f(n,l),t}();g(b,"propTypes",{ExampleCode:c.default.string,Description:c.default.func.isRequired,Details:c.default.func.isRequired,DemoComponent:c.default.func.isRequired,CodeComponent:c.default.func.isRequired,callback:c.default.shape({demo:c.default.oneOfType([c.default.func,c.default.node]),info:c.default.oneOfType([c.default.func,c.default.node]),code:c.default.oneOfType([c.default.func,c.default.node])}),hideTabs:c.default.bool,title:c.default.string.isRequired,id:c.default.string.isRequired,tabs:c.default.array}),g(b,"defaultProps",{ExampleCode:null,hideTabs:!1,callback:null,tabs:[{title:"Demo",key:"demo"},{title:"Details",key:"info"},{title:"Markup",key:"code"}]});var v=b;t.default=v},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(82),n(269),n(270),n(86);var a=c(n(0)),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(762)),i=c(n(370)),o=n(763),s=c(n(305));function c(e){return e&&e.__esModule?e:{default:e}}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var u=function(e){var t=e.language,n=e.children,c=e.reactLive,u=e.className;return t||(t=((u||"").split(/-/)||[null,"jsx"])[1]),c&&"jsx"===t?(console.log("exampleCode",t,p(n)),a.default.createElement(o.LiveProvider,{code:"string"==typeof n?String(n).trim():null},a.default.createElement(o.LiveEditor,null),a.default.createElement(o.LiveError,null),a.default.createElement(o.LivePreview,null))):a.default.createElement(r.default,l({},r.defaultProps,{code:String(n).trim(),language:t,theme:i.default}),function(e){var t=e.className,n=e.style,r=e.tokens,i=e.getLineProps,o=e.getTokenProps;return a.default.createElement(s.default,{className:t,style:n,p:3},m(r).map(function(e,t){return a.default.createElement("div",i({line:e,key:t}),e.map(function(e,t){return a.default.createElement("span",o({token:e,key:t}))}))}))})};t.default=u;var m=function(e){var t=e.length;if(0===t)return e;var n=e[t-1];return 1===n.length&&n[0].empty?e.slice(0,t-1):e}},305:function(e,t,n){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=(0,((a=n(761))&&a.__esModule?a:{default:a}).default)({is:"pre",m:0});r.displayName="Pre";var i=r;t.default=i},308:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CodeRenderer=t.default=void 0,n(269),n(270),n(41),n(271),n(29),n(766);var a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}(n(0)),r=l(n(309)),i=l(n(1)),o=l(n(769)),s=l(n(770)),c=l(n(301));function l(e){return e&&e.__esModule?e:{default:e}}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t,n,a,r,i,o){try{var s=e[i](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(a,r)}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function f(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?g(e):t}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(e){function t(e){var n;m(this,t),E(g(g(n=f(this,j(t).call(this,e)))),"state",{codeString:""}),E(g(g(n)),"_isMounted",!1);var r=n.props.source;return n.beautify(a.default.createElement(r,null)),n}var n,i;return y(t,a.Component),_(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.setCode()}},{key:"setCode",value:function(){this.code&&this.setState({codeString:this.props.raw+this.code}),this.code=null}},{key:"beautify",value:(n=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.props.language,e.next="html"===e.t0?3:18;break;case 3:return this.code=o.default.renderToStaticMarkup(t),this.code=this.code.replace(/data-fake:/g,""),this.code=this.code.replace(/disabled=""/g,'disabled="disabled"'),e.prev=6,e.next=9,(0,r.default)(this.code,"html");case 9:this.code=e.sent,this.code=(0,s.default)(this.code,{ocd:!0}),this._isMounted&&this.setCode(),e.next=17;break;case 14:e.prev=14,e.t1=e.catch(6),console.log("HTML Beautifier Error:",e.t1);case 17:return e.abrupt("break",18);case 18:case"end":return e.stop()}},e,this,[[6,14]])}),i=function(){var e=this,t=arguments;return new Promise(function(a,r){var i=n.apply(e,t);function o(e){u(i,a,r,o,s,"next",e)}function s(e){u(i,a,r,o,s,"throw",e)}o(void 0)})},function(e){return i.apply(this,arguments)})},{key:"render",value:function(){return this.state.codeString?a.default.createElement(b,{language:this.props.language},this.state.codeString):a.default.createElement(a.Fragment,null)}}]),t}();t.default=h,E(h,"propTypes",{language:i.default.string,raw:i.default.string,source:i.default.oneOfType([i.default.node,i.default.func]).isRequired}),E(h,"defaultProps",{language:"html",raw:""});var b=function(e){function t(){return m(this,t),f(this,j(t).apply(this,arguments))}return y(t,a.Component),_(t,[{key:"render",value:function(){return a.default.createElement(c.default,this.props)}}]),t}();t.CodeRenderer=b,E(b,"propTypes",{language:i.default.string,children:i.default.oneOfType([i.default.string,i.default.node,i.default.func]).isRequired}),E(b,"defaultProps",{language:"jsx"})},309:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(41);var a,r=(a=n(767))&&a.__esModule?a:{default:a};var i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(function(a){switch(t){case"html":r.default.clean(e,{indent:"  ",wrap:80,"replace-nbsp":!0,"remove-tags":[],"remove-attributes":[],"break-around-tags":n.breakAroundTags||["div","span","p","button","input","svg","path"]},function(e){return a(e)})}})};t.default=i},310:function(e,t,n){"use strict";n.r(t);var a=n(276);n.d(t,"propTypes",function(){return a.d}),n.d(t,"defaultProps",function(){return a.c}),n.d(t,"CloseButton",function(){return a.a})},371:function(e,t,n){var a={"./Binary_Property/ASCII.js":372,"./Binary_Property/ASCII_Hex_Digit.js":373,"./Binary_Property/Alphabetic.js":374,"./Binary_Property/Any.js":375,"./Binary_Property/Assigned.js":376,"./Binary_Property/Bidi_Control.js":377,"./Binary_Property/Bidi_Mirrored.js":378,"./Binary_Property/Case_Ignorable.js":379,"./Binary_Property/Cased.js":380,"./Binary_Property/Changes_When_Casefolded.js":381,"./Binary_Property/Changes_When_Casemapped.js":382,"./Binary_Property/Changes_When_Lowercased.js":383,"./Binary_Property/Changes_When_NFKC_Casefolded.js":384,"./Binary_Property/Changes_When_Titlecased.js":385,"./Binary_Property/Changes_When_Uppercased.js":386,"./Binary_Property/Dash.js":387,"./Binary_Property/Default_Ignorable_Code_Point.js":388,"./Binary_Property/Deprecated.js":389,"./Binary_Property/Diacritic.js":390,"./Binary_Property/Emoji.js":391,"./Binary_Property/Emoji_Component.js":392,"./Binary_Property/Emoji_Modifier.js":393,"./Binary_Property/Emoji_Modifier_Base.js":394,"./Binary_Property/Emoji_Presentation.js":395,"./Binary_Property/Extended_Pictographic.js":396,"./Binary_Property/Extender.js":397,"./Binary_Property/Grapheme_Base.js":398,"./Binary_Property/Grapheme_Extend.js":399,"./Binary_Property/Hex_Digit.js":400,"./Binary_Property/IDS_Binary_Operator.js":401,"./Binary_Property/IDS_Trinary_Operator.js":402,"./Binary_Property/ID_Continue.js":403,"./Binary_Property/ID_Start.js":404,"./Binary_Property/Ideographic.js":405,"./Binary_Property/Join_Control.js":406,"./Binary_Property/Logical_Order_Exception.js":407,"./Binary_Property/Lowercase.js":408,"./Binary_Property/Math.js":409,"./Binary_Property/Noncharacter_Code_Point.js":410,"./Binary_Property/Pattern_Syntax.js":411,"./Binary_Property/Pattern_White_Space.js":412,"./Binary_Property/Quotation_Mark.js":413,"./Binary_Property/Radical.js":414,"./Binary_Property/Regional_Indicator.js":415,"./Binary_Property/Sentence_Terminal.js":416,"./Binary_Property/Soft_Dotted.js":417,"./Binary_Property/Terminal_Punctuation.js":418,"./Binary_Property/Unified_Ideograph.js":419,"./Binary_Property/Uppercase.js":420,"./Binary_Property/Variation_Selector.js":421,"./Binary_Property/White_Space.js":422,"./Binary_Property/XID_Continue.js":423,"./Binary_Property/XID_Start.js":424,"./General_Category/Cased_Letter.js":425,"./General_Category/Close_Punctuation.js":426,"./General_Category/Connector_Punctuation.js":427,"./General_Category/Control.js":428,"./General_Category/Currency_Symbol.js":429,"./General_Category/Dash_Punctuation.js":430,"./General_Category/Decimal_Number.js":431,"./General_Category/Enclosing_Mark.js":432,"./General_Category/Final_Punctuation.js":433,"./General_Category/Format.js":434,"./General_Category/Initial_Punctuation.js":435,"./General_Category/Letter.js":436,"./General_Category/Letter_Number.js":437,"./General_Category/Line_Separator.js":438,"./General_Category/Lowercase_Letter.js":439,"./General_Category/Mark.js":440,"./General_Category/Math_Symbol.js":441,"./General_Category/Modifier_Letter.js":442,"./General_Category/Modifier_Symbol.js":443,"./General_Category/Nonspacing_Mark.js":444,"./General_Category/Number.js":445,"./General_Category/Open_Punctuation.js":446,"./General_Category/Other.js":447,"./General_Category/Other_Letter.js":448,"./General_Category/Other_Number.js":449,"./General_Category/Other_Punctuation.js":450,"./General_Category/Other_Symbol.js":451,"./General_Category/Paragraph_Separator.js":452,"./General_Category/Private_Use.js":453,"./General_Category/Punctuation.js":454,"./General_Category/Separator.js":455,"./General_Category/Space_Separator.js":456,"./General_Category/Spacing_Mark.js":457,"./General_Category/Surrogate.js":458,"./General_Category/Symbol.js":459,"./General_Category/Titlecase_Letter.js":460,"./General_Category/Unassigned.js":461,"./General_Category/Uppercase_Letter.js":462,"./Script/Adlam.js":463,"./Script/Ahom.js":464,"./Script/Anatolian_Hieroglyphs.js":465,"./Script/Arabic.js":466,"./Script/Armenian.js":467,"./Script/Avestan.js":468,"./Script/Balinese.js":469,"./Script/Bamum.js":470,"./Script/Bassa_Vah.js":471,"./Script/Batak.js":472,"./Script/Bengali.js":473,"./Script/Bhaiksuki.js":474,"./Script/Bopomofo.js":475,"./Script/Brahmi.js":476,"./Script/Braille.js":477,"./Script/Buginese.js":478,"./Script/Buhid.js":479,"./Script/Canadian_Aboriginal.js":480,"./Script/Carian.js":481,"./Script/Caucasian_Albanian.js":482,"./Script/Chakma.js":483,"./Script/Cham.js":484,"./Script/Cherokee.js":485,"./Script/Common.js":486,"./Script/Coptic.js":487,"./Script/Cuneiform.js":488,"./Script/Cypriot.js":489,"./Script/Cyrillic.js":490,"./Script/Deseret.js":491,"./Script/Devanagari.js":492,"./Script/Dogra.js":493,"./Script/Duployan.js":494,"./Script/Egyptian_Hieroglyphs.js":495,"./Script/Elbasan.js":496,"./Script/Ethiopic.js":497,"./Script/Georgian.js":498,"./Script/Glagolitic.js":499,"./Script/Gothic.js":500,"./Script/Grantha.js":501,"./Script/Greek.js":502,"./Script/Gujarati.js":503,"./Script/Gunjala_Gondi.js":504,"./Script/Gurmukhi.js":505,"./Script/Han.js":506,"./Script/Hangul.js":507,"./Script/Hanifi_Rohingya.js":508,"./Script/Hanunoo.js":509,"./Script/Hatran.js":510,"./Script/Hebrew.js":511,"./Script/Hiragana.js":512,"./Script/Imperial_Aramaic.js":513,"./Script/Inherited.js":514,"./Script/Inscriptional_Pahlavi.js":515,"./Script/Inscriptional_Parthian.js":516,"./Script/Javanese.js":517,"./Script/Kaithi.js":518,"./Script/Kannada.js":519,"./Script/Katakana.js":520,"./Script/Kayah_Li.js":521,"./Script/Kharoshthi.js":522,"./Script/Khmer.js":523,"./Script/Khojki.js":524,"./Script/Khudawadi.js":525,"./Script/Lao.js":526,"./Script/Latin.js":527,"./Script/Lepcha.js":528,"./Script/Limbu.js":529,"./Script/Linear_A.js":530,"./Script/Linear_B.js":531,"./Script/Lisu.js":532,"./Script/Lycian.js":533,"./Script/Lydian.js":534,"./Script/Mahajani.js":535,"./Script/Makasar.js":536,"./Script/Malayalam.js":537,"./Script/Mandaic.js":538,"./Script/Manichaean.js":539,"./Script/Marchen.js":540,"./Script/Masaram_Gondi.js":541,"./Script/Medefaidrin.js":542,"./Script/Meetei_Mayek.js":543,"./Script/Mende_Kikakui.js":544,"./Script/Meroitic_Cursive.js":545,"./Script/Meroitic_Hieroglyphs.js":546,"./Script/Miao.js":547,"./Script/Modi.js":548,"./Script/Mongolian.js":549,"./Script/Mro.js":550,"./Script/Multani.js":551,"./Script/Myanmar.js":552,"./Script/Nabataean.js":553,"./Script/New_Tai_Lue.js":554,"./Script/Newa.js":555,"./Script/Nko.js":556,"./Script/Nushu.js":557,"./Script/Ogham.js":558,"./Script/Ol_Chiki.js":559,"./Script/Old_Hungarian.js":560,"./Script/Old_Italic.js":561,"./Script/Old_North_Arabian.js":562,"./Script/Old_Permic.js":563,"./Script/Old_Persian.js":564,"./Script/Old_Sogdian.js":565,"./Script/Old_South_Arabian.js":566,"./Script/Old_Turkic.js":567,"./Script/Oriya.js":568,"./Script/Osage.js":569,"./Script/Osmanya.js":570,"./Script/Pahawh_Hmong.js":571,"./Script/Palmyrene.js":572,"./Script/Pau_Cin_Hau.js":573,"./Script/Phags_Pa.js":574,"./Script/Phoenician.js":575,"./Script/Psalter_Pahlavi.js":576,"./Script/Rejang.js":577,"./Script/Runic.js":578,"./Script/Samaritan.js":579,"./Script/Saurashtra.js":580,"./Script/Sharada.js":581,"./Script/Shavian.js":582,"./Script/Siddham.js":583,"./Script/SignWriting.js":584,"./Script/Sinhala.js":585,"./Script/Sogdian.js":586,"./Script/Sora_Sompeng.js":587,"./Script/Soyombo.js":588,"./Script/Sundanese.js":589,"./Script/Syloti_Nagri.js":590,"./Script/Syriac.js":591,"./Script/Tagalog.js":592,"./Script/Tagbanwa.js":593,"./Script/Tai_Le.js":594,"./Script/Tai_Tham.js":595,"./Script/Tai_Viet.js":596,"./Script/Takri.js":597,"./Script/Tamil.js":598,"./Script/Tangut.js":599,"./Script/Telugu.js":600,"./Script/Thaana.js":601,"./Script/Thai.js":602,"./Script/Tibetan.js":603,"./Script/Tifinagh.js":604,"./Script/Tirhuta.js":605,"./Script/Ugaritic.js":606,"./Script/Vai.js":607,"./Script/Warang_Citi.js":608,"./Script/Yi.js":609,"./Script/Zanabazar_Square.js":610,"./Script_Extensions/Adlam.js":611,"./Script_Extensions/Ahom.js":612,"./Script_Extensions/Anatolian_Hieroglyphs.js":613,"./Script_Extensions/Arabic.js":614,"./Script_Extensions/Armenian.js":615,"./Script_Extensions/Avestan.js":616,"./Script_Extensions/Balinese.js":617,"./Script_Extensions/Bamum.js":618,"./Script_Extensions/Bassa_Vah.js":619,"./Script_Extensions/Batak.js":620,"./Script_Extensions/Bengali.js":621,"./Script_Extensions/Bhaiksuki.js":622,"./Script_Extensions/Bopomofo.js":623,"./Script_Extensions/Brahmi.js":624,"./Script_Extensions/Braille.js":625,"./Script_Extensions/Buginese.js":626,"./Script_Extensions/Buhid.js":627,"./Script_Extensions/Canadian_Aboriginal.js":628,"./Script_Extensions/Carian.js":629,"./Script_Extensions/Caucasian_Albanian.js":630,"./Script_Extensions/Chakma.js":631,"./Script_Extensions/Cham.js":632,"./Script_Extensions/Cherokee.js":633,"./Script_Extensions/Common.js":634,"./Script_Extensions/Coptic.js":635,"./Script_Extensions/Cuneiform.js":636,"./Script_Extensions/Cypriot.js":637,"./Script_Extensions/Cyrillic.js":638,"./Script_Extensions/Deseret.js":639,"./Script_Extensions/Devanagari.js":640,"./Script_Extensions/Dogra.js":641,"./Script_Extensions/Duployan.js":642,"./Script_Extensions/Egyptian_Hieroglyphs.js":643,"./Script_Extensions/Elbasan.js":644,"./Script_Extensions/Ethiopic.js":645,"./Script_Extensions/Georgian.js":646,"./Script_Extensions/Glagolitic.js":647,"./Script_Extensions/Gothic.js":648,"./Script_Extensions/Grantha.js":649,"./Script_Extensions/Greek.js":650,"./Script_Extensions/Gujarati.js":651,"./Script_Extensions/Gunjala_Gondi.js":652,"./Script_Extensions/Gurmukhi.js":653,"./Script_Extensions/Han.js":654,"./Script_Extensions/Hangul.js":655,"./Script_Extensions/Hanifi_Rohingya.js":656,"./Script_Extensions/Hanunoo.js":657,"./Script_Extensions/Hatran.js":658,"./Script_Extensions/Hebrew.js":659,"./Script_Extensions/Hiragana.js":660,"./Script_Extensions/Imperial_Aramaic.js":661,"./Script_Extensions/Inherited.js":662,"./Script_Extensions/Inscriptional_Pahlavi.js":663,"./Script_Extensions/Inscriptional_Parthian.js":664,"./Script_Extensions/Javanese.js":665,"./Script_Extensions/Kaithi.js":666,"./Script_Extensions/Kannada.js":667,"./Script_Extensions/Katakana.js":668,"./Script_Extensions/Kayah_Li.js":669,"./Script_Extensions/Kharoshthi.js":670,"./Script_Extensions/Khmer.js":671,"./Script_Extensions/Khojki.js":672,"./Script_Extensions/Khudawadi.js":673,"./Script_Extensions/Lao.js":674,"./Script_Extensions/Latin.js":675,"./Script_Extensions/Lepcha.js":676,"./Script_Extensions/Limbu.js":677,"./Script_Extensions/Linear_A.js":678,"./Script_Extensions/Linear_B.js":679,"./Script_Extensions/Lisu.js":680,"./Script_Extensions/Lycian.js":681,"./Script_Extensions/Lydian.js":682,"./Script_Extensions/Mahajani.js":683,"./Script_Extensions/Makasar.js":684,"./Script_Extensions/Malayalam.js":685,"./Script_Extensions/Mandaic.js":686,"./Script_Extensions/Manichaean.js":687,"./Script_Extensions/Marchen.js":688,"./Script_Extensions/Masaram_Gondi.js":689,"./Script_Extensions/Medefaidrin.js":690,"./Script_Extensions/Meetei_Mayek.js":691,"./Script_Extensions/Mende_Kikakui.js":692,"./Script_Extensions/Meroitic_Cursive.js":693,"./Script_Extensions/Meroitic_Hieroglyphs.js":694,"./Script_Extensions/Miao.js":695,"./Script_Extensions/Modi.js":696,"./Script_Extensions/Mongolian.js":697,"./Script_Extensions/Mro.js":698,"./Script_Extensions/Multani.js":699,"./Script_Extensions/Myanmar.js":700,"./Script_Extensions/Nabataean.js":701,"./Script_Extensions/New_Tai_Lue.js":702,"./Script_Extensions/Newa.js":703,"./Script_Extensions/Nko.js":704,"./Script_Extensions/Nushu.js":705,"./Script_Extensions/Ogham.js":706,"./Script_Extensions/Ol_Chiki.js":707,"./Script_Extensions/Old_Hungarian.js":708,"./Script_Extensions/Old_Italic.js":709,"./Script_Extensions/Old_North_Arabian.js":710,"./Script_Extensions/Old_Permic.js":711,"./Script_Extensions/Old_Persian.js":712,"./Script_Extensions/Old_Sogdian.js":713,"./Script_Extensions/Old_South_Arabian.js":714,"./Script_Extensions/Old_Turkic.js":715,"./Script_Extensions/Oriya.js":716,"./Script_Extensions/Osage.js":717,"./Script_Extensions/Osmanya.js":718,"./Script_Extensions/Pahawh_Hmong.js":719,"./Script_Extensions/Palmyrene.js":720,"./Script_Extensions/Pau_Cin_Hau.js":721,"./Script_Extensions/Phags_Pa.js":722,"./Script_Extensions/Phoenician.js":723,"./Script_Extensions/Psalter_Pahlavi.js":724,"./Script_Extensions/Rejang.js":725,"./Script_Extensions/Runic.js":726,"./Script_Extensions/Samaritan.js":727,"./Script_Extensions/Saurashtra.js":728,"./Script_Extensions/Sharada.js":729,"./Script_Extensions/Shavian.js":730,"./Script_Extensions/Siddham.js":731,"./Script_Extensions/SignWriting.js":732,"./Script_Extensions/Sinhala.js":733,"./Script_Extensions/Sogdian.js":734,"./Script_Extensions/Sora_Sompeng.js":735,"./Script_Extensions/Soyombo.js":736,"./Script_Extensions/Sundanese.js":737,"./Script_Extensions/Syloti_Nagri.js":738,"./Script_Extensions/Syriac.js":739,"./Script_Extensions/Tagalog.js":740,"./Script_Extensions/Tagbanwa.js":741,"./Script_Extensions/Tai_Le.js":742,"./Script_Extensions/Tai_Tham.js":743,"./Script_Extensions/Tai_Viet.js":744,"./Script_Extensions/Takri.js":745,"./Script_Extensions/Tamil.js":746,"./Script_Extensions/Tangut.js":747,"./Script_Extensions/Telugu.js":748,"./Script_Extensions/Thaana.js":749,"./Script_Extensions/Thai.js":750,"./Script_Extensions/Tibetan.js":751,"./Script_Extensions/Tifinagh.js":752,"./Script_Extensions/Tirhuta.js":753,"./Script_Extensions/Ugaritic.js":754,"./Script_Extensions/Vai.js":755,"./Script_Extensions/Warang_Citi.js":756,"./Script_Extensions/Yi.js":757,"./Script_Extensions/Zanabazar_Square.js":758,"./index.js":759,"./unicode-version.js":760};function r(e){var t=i(e);return n(t)}function i(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id=371},768:function(e,t){},873:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n(269),n(270),n(82),n(271);var a=u(n(0)),r=p(n(1)),i=p(n(300)),o=u(n(874)),s=p(n(875)),c=p(n(876)),l=p(n(877));function p(e){return e&&e.__esModule?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};a.get||a.set?Object.defineProperty(t,n,a):t[n]=e[n]}return t.default=e,t}function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function _(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,j(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,a.Component),n=t,(r=[{key:"render",value:function(){return a.default.createElement(i.default,d({},t.defaultProps,this.props))}}])&&_(n.prototype,r),o&&_(n,o),t}();t.default=g,S(g,"propTypes",{title:r.default.string,id:r.default.string,Description:r.default.func,Details:r.default.func,DemoComponent:r.default.func,CodeComponent:r.default.func,hideTabs:r.default.bool}),S(g,"defaultProps",{title:"Slider",id:"slider",ExampleCode:l.default,Description:s.default,Details:c.default,DemoComponent:o.default,CodeComponent:o.Example,callback:o.Example.AdditionalCallback||null,hideTabs:!1})},874:function(e,t,n){"use strict";n.r(t),n.d(t,"Example",function(){return u});var a=n(6),r=n.n(a),i=n(0),o=n.n(i),s=n(273),c=n(284),l=n(277),p=n(280),u=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).onChangeHandler=function(e){var t=e.value;console.log("on_change",t)},t}return r()(t,e),t.prototype.render=function(){return o.a.createElement(i.Fragment,null,o.a.createElement(c.a,{min:0,max:100,value:70,step:10,on_change:this.onChangeHandler,attributes:{"data-fake:on_change":"SliderDemo.onChangeHandler()","data-fake:on_state_update":"SliderDemo.onStateUpdateHandler()"}}),o.a.createElement(c.a,{value:"70",max:"100",disabled:!0}))},t}(i.Component),m=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={value:5908e3},t}return r()(t,e),t.prototype.render=function(){var e=this;return o.a.createElement(d,null,o.a.createElement(u,null),o.a.createElement("form",{className:"dnb-form"},o.a.createElement("div",{className:"dnb-form__item"},o.a.createElement("div",{className:"dnb-form__cell"},o.a.createElement(p.a,{for_id:"slider-2",text:"Hvor mye ønsker du å kjøpe bolig for?"})),o.a.createElement("div",{className:"dnb-form__cell dnb-slider__slider-row"},o.a.createElement("div",{className:"dnb-slider__input-container"},o.a.createElement(c.a,{id:"slider-2",min:1e6,max:8e6,value:this.state.value,step:1e5,on_init:function(t){var n=t.value;e.setState({value:n})},on_change:function(t){var n=t.value;e.setState({value:n})}})),o.a.createElement("div",{className:"dnb-slider__output-container"},o.a.createElement(l.a,{type:"text",value:this.state.value,font_class:"typo-light typo-number--old-style",description:"Kr",extra_information:"Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp.",on_change:function(t){var n=t.value;e.setState({value:parseFloat(n)})}}))),o.a.createElement(_,{className:"dnb-form__cell"},o.a.createElement(c.a,{id:"slider-3",min:1e6,max:8e6,value:this.state.value,step:10,vertical:!0,reverse:!0,on_change:function(t){var n=t.value;e.setState({value:n})},on_state_update:function(e){var t=e.value;console.log("on_state_update",t)}})))))},t}(i.Component),d=Object(s.default)("div",{target:"e1qy53m30"})(".dnb-form{padding-top:2em;}.dnb-slider__slider-row{display:flex;align-items:flex-start;justify-content:center;align-content:center;.dnb-slider{width:100%;}.dnb-slider__input-container{margin:0.2rem 0 0 0;flex:3;}.dnb-slider__output-container{margin:0 0 0 0.5rem;flex:2;}.dnb-slider__input{margin:0 0.25rem;}}"),_=Object(s.default)("div",{target:"e1qy53m31"})("height:10rem;");t.default=m},875:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return c});var a=n(83),r=n.n(a),i=n(0),o=n.n(i),s=n(274);t.default=function(e){var t=e.components;r()(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"p",components:t},"The slider component is an custom value change component. Use it to make user input more convinient and faster."))};var c={}},876:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",function(){return c});var a=n(83),r=n.n(a),i=n(0),o=n.n(i),s=n(274);t.default=function(e){var t=e.components;r()(e,["components"]);return o.a.createElement(s.MDXTag,{name:"wrapper",components:t},o.a.createElement(s.MDXTag,{name:"table",components:t},o.a.createElement(s.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Properties"),o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),o.a.createElement(s.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"value")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(mandatory)")," the ",o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"vlaue")," of the slider. Also the event callback result.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the ",o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"id")," of the input. Default will be a random id.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"min")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the minimum value.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"max")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the maxium value.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"step")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," the steps the slider takes on changing the value.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"vertical")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," show the slider vertically.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"reverse")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," show the slider reversed.")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"disabled")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," disable the slider.")))),o.a.createElement(s.MDXTag,{name:"table",components:t},o.a.createElement(s.MDXTag,{name:"thead",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"thead"},o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Events"),o.a.createElement(s.MDXTag,{name:"th",components:t,parentName:"tr",props:{align:null}},"Description"))),o.a.createElement(s.MDXTag,{name:"tbody",components:t,parentName:"table"},o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_init")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called once the component is ready to use. The callback value is an object like {value: Number}")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_change")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called on state changes made by the user. The callback value is an object like {value: Number}")),o.a.createElement(s.MDXTag,{name:"tr",components:t,parentName:"tbody"},o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"on_state_update")),o.a.createElement(s.MDXTag,{name:"td",components:t,parentName:"tr",props:{align:null}},o.a.createElement(s.MDXTag,{name:"em",components:t,parentName:"td"},"(optional)")," will be called once the parameter ",o.a.createElement(s.MDXTag,{name:"inlineCode",components:t,parentName:"td"},"value")," changes its value.")))))};var c={}},877:function(e,t){e.exports='<Slider\n  min={0}\n  max={100}\n  value={70}\n  step={10}\n  on_change={this.onChangeHandler}\n/>\n<Slider value="70" max="100" disabled />\n'}}]);
//# sourceMappingURL=component---src-pages-uilib-components-slider-md-57693688f3b6632ff2ad.js.map