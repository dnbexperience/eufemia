(self["webpackChunkdnb_design_system_portal"] = self["webpackChunkdnb_design_system_portal"] || []).push([[337],{

/***/ 67228:
/***/ (function(module) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 23646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(67228);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 69100:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(99489);

var isNativeReflectConstruct = __webpack_require__(57067);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 59713:
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 57067:
/***/ (function(module) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 46860:
/***/ (function(module) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 98206:
/***/ (function(module) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 319:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(23646);

var iterableToArray = __webpack_require__(46860);

var unsupportedIterableToArray = __webpack_require__(60379);

var nonIterableSpread = __webpack_require__(98206);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 60379:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(67228);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 46725:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(93395);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 93395:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _construct=__webpack_require__(69100);var _toConsumableArray=__webpack_require__(319);var _defineProperty=__webpack_require__(59713);var _objectWithoutPropertiesLoose=__webpack_require__(37316);var _excluded=["scope","children"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly){symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});}keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(67294);var _require=__webpack_require__(64983),mdx=_require.mdx;var _require2=__webpack_require__(89480),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,_excluded);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ }),

/***/ 12664:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MdxTemplate; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94578);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64983);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46725);
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_parts_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38744);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35414);
/* harmony import */ var _shared_tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(84796);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23431);
/* eslint-disable react/prop-types */ /**
 * MDX Template
 */var Tabbar=_shared_tags__WEBPACK_IMPORTED_MODULE_5__/* ["default"].Tabbar */ .Z.Tabbar;var ContentWrapper=Tabbar.ContentWrapper;var MdxTemplate=/*#__PURE__*/function(_React$PureComponent){(0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(MdxTemplate,_React$PureComponent);function MdxTemplate(){return _React$PureComponent.apply(this,arguments)||this;}var _proto=MdxTemplate.prototype;_proto.render=function render(){var _mdx$frontmatter,_mdx$frontmatter2,_tableOfContents$item;var _this$props=this.props,location=_this$props.location,_this$props$data=_this$props.data,mdx=_this$props$data.mdx,_this$props$data$site=_this$props$data.site.siteMetadata,mainTitle=_this$props$data$site.title,mainDescription=_this$props$data$site.description;var body=mdx.body,tableOfContents=mdx.tableOfContents,siblings=mdx.siblings;var makeUseOfCategory=Boolean(!(mdx!==null&&mdx!==void 0&&(_mdx$frontmatter=mdx.frontmatter)!==null&&_mdx$frontmatter!==void 0&&_mdx$frontmatter.title)&&(mdx===null||mdx===void 0?void 0:(_mdx$frontmatter2=mdx.frontmatter)===null||_mdx$frontmatter2===void 0?void 0:_mdx$frontmatter2.showTabs));var category=siblings===null||siblings===void 0?void 0:siblings[0];var categoryFm=(category===null||category===void 0?void 0:category.frontmatter)||{};var currentFm=(mdx===null||mdx===void 0?void 0:mdx.frontmatter)||{};var pageDescription=(currentFm===null||currentFm===void 0?void 0:currentFm.description)||mainDescription;var pageTitle;// Extend the title with a sub tab title
if(currentFm!==null&&currentFm!==void 0&&currentFm.title&&Array.isArray(tableOfContents===null||tableOfContents===void 0?void 0:(_tableOfContents$item=tableOfContents.items)===null||_tableOfContents$item===void 0?void 0:_tableOfContents$item[0])){var _tableOfContents$item2;pageTitle=(currentFm.title||(categoryFm===null||categoryFm===void 0?void 0:categoryFm.title))+" \u2013 "+((_tableOfContents$item2=tableOfContents.items[0])===null||_tableOfContents$item2===void 0?void 0:_tableOfContents$item2.title);}else{pageTitle=(currentFm===null||currentFm===void 0?void 0:currentFm.title)||(categoryFm===null||categoryFm===void 0?void 0:categoryFm.title)||mainTitle;}return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(react_helmet__WEBPACK_IMPORTED_MODULE_4__/* .Helmet */ .q,null,(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)("title",null,pageTitle),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)("meta",{name:"description",content:pageDescription})),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(_shared_parts_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,{key:"layout",location:location,fullscreen:Boolean(currentFm.fullscreen||categoryFm.fullscreen)||this.props.pageContext.fullscreen},currentFm.showTabs&&(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(Tabbar,{key:"tabbar",location:location,rootPath:'/'+(makeUseOfCategory?category===null||category===void 0?void 0:category.slug:mdx===null||mdx===void 0?void 0:mdx.slug),title:currentFm.title||categoryFm.title,tabs:currentFm.tabs||categoryFm.tabs,defaultTabs:currentFm.defaultTabs||categoryFm.defaultTabs,hideTabs:currentFm.hideTabs||categoryFm.hideTabs}),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(ContentWrapper,null,(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.MDXProvider,{components:_shared_tags__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z},(0,_emotion_react__WEBPACK_IMPORTED_MODULE_7__/* .jsx */ .tZ)(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_2__.MDXRenderer,null,body)))));};return MdxTemplate;}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);var pageQuery="114056107";

/***/ })

}]);
//# sourceMappingURL=component---src-templates-mdx-js-d5c18184e003d9e9dc3a.js.map