"use strict";
(self["webpackChunkdnb_design_system_portal"] = self["webpackChunkdnb_design_system_portal"] || []).push([[223],{

/***/ 91608:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var reactIs = __webpack_require__(97155);
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ 32719:
/***/ (function(__unused_webpack_module, exports) {

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = t;
exports.Memo = r;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;

exports.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

exports.isConcurrentMode = A;

exports.isContextConsumer = function (a) {
  return z(a) === k;
};

exports.isContextProvider = function (a) {
  return z(a) === h;
};

exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

exports.isForwardRef = function (a) {
  return z(a) === n;
};

exports.isFragment = function (a) {
  return z(a) === e;
};

exports.isLazy = function (a) {
  return z(a) === t;
};

exports.isMemo = function (a) {
  return z(a) === r;
};

exports.isPortal = function (a) {
  return z(a) === d;
};

exports.isProfiler = function (a) {
  return z(a) === g;
};

exports.isStrictMode = function (a) {
  return z(a) === f;
};

exports.isSuspense = function (a) {
  return z(a) === p;
};

exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

exports.typeOf = z;

/***/ }),

/***/ 97155:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(32719);
} else {}

/***/ }),

/***/ 31549:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ PortalStyle; },
  "R": function() { return /* reexport */ gridStyle; }
});

// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(23431);
// EXTERNAL MODULE: ../dnb-eufemia/build/shared/helpers.js
var helpers = __webpack_require__(55538);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.global-this.js
var esnext_global_this = __webpack_require__(65743);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Enum.js
var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';
var Enum_COMMENT = 'comm';
var Enum_RULESET = 'rule';
var Enum_DECLARATION = 'decl';
var PAGE = '@page';
var MEDIA = '@media';
var Enum_IMPORT = '@import';
var CHARSET = '@charset';
var VIEWPORT = '@viewport';
var SUPPORTS = '@supports';
var DOCUMENT = '@document';
var NAMESPACE = '@namespace';
var KEYFRAMES = '@keyframes';
var FONT_FACE = '@font-face';
var COUNTER_STYLE = '@counter-style';
var FONT_FEATURE_VALUES = '@font-feature-values';
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Utility.js
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;
/**
 * @param {number}
 * @return {string}
 */

var Utility_from = String.fromCharCode;
/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */

function hash(value, length) {
  return (((length << 2 ^ Utility_charat(value, 0)) << 2 ^ Utility_charat(value, 1)) << 2 ^ Utility_charat(value, 2)) << 2 ^ Utility_charat(value, 3);
}
/**
 * @param {string} value
 * @return {string}
 */

function Utility_trim(value) {
  return value.trim();
}
/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */

function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */

function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
/**
 * @param {string} value
 * @param {string} value
 * @return {number}
 */

function indexof(value, search) {
  return value.indexOf(search);
}
/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */

function Utility_charat(value, index) {
  return value.charCodeAt(index) | 0;
}
/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */

function Utility_substr(value, begin, end) {
  return value.slice(begin, end);
}
/**
 * @param {string} value
 * @return {number}
 */

function Utility_strlen(value) {
  return value.length;
}
/**
 * @param {any[]} value
 * @return {number}
 */

function Utility_sizeof(value) {
  return value.length;
}
/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */

function Utility_append(value, array) {
  return array.push(value), value;
}
/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */

function Utility_combine(array, callback) {
  return array.map(callback).join('');
}
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Tokenizer.js

var line = 1;
var column = 1;
var Tokenizer_length = 0;
var Tokenizer_position = 0;
var character = 0;
var characters = '';
/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string} type
 * @param {string[]} props
 * @param {object[]} children
 * @param {number} length
 */

function node(value, root, parent, type, props, children, length) {
  return {
    value: value,
    root: root,
    parent: parent,
    type: type,
    props: props,
    children: children,
    line: line,
    column: column,
    length: length,
    return: ''
  };
}
/**
 * @param {string} value
 * @param {object} root
 * @param {string} type
 */

function copy(value, root, type) {
  return node(value, root.root, root.parent, type, root.props, root.children, 0);
}
/**
 * @return {number}
 */

function Tokenizer_char() {
  return character;
}
/**
 * @return {number}
 */

function prev() {
  character = Tokenizer_position > 0 ? charat(characters, --Tokenizer_position) : 0;
  if (column--, character === 10) column = 1, line--;
  return character;
}
/**
 * @return {number}
 */

function Tokenizer_next() {
  character = Tokenizer_position < Tokenizer_length ? charat(characters, Tokenizer_position++) : 0;
  if (column++, character === 10) column = 1, line++;
  return character;
}
/**
 * @return {number}
 */

function Tokenizer_peek() {
  return charat(characters, Tokenizer_position);
}
/**
 * @return {number}
 */

function caret() {
  return Tokenizer_position;
}
/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */

function Tokenizer_slice(begin, end) {
  return substr(characters, begin, end);
}
/**
 * @param {number} type
 * @return {number}
 */

function Tokenizer_token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token

    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126: // ; { } breakpoint token

    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token

    case 58:
      return 3;
    // " ' ( [ opening delimit token

    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token

    case 41:
    case 93:
      return 1;
  }

  return 0;
}
/**
 * @param {string} value
 * @return {any[]}
 */

function Tokenizer_alloc(value) {
  return line = column = 1, Tokenizer_length = strlen(characters = value), Tokenizer_position = 0, [];
}
/**
 * @param {any} value
 * @return {any}
 */

function Tokenizer_dealloc(value) {
  return characters = '', value;
}
/**
 * @param {number} type
 * @return {string}
 */

function Tokenizer_delimit(type) {
  return trim(Tokenizer_slice(Tokenizer_position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
 * @param {string} value
 * @return {string[]}
 */

function Tokenizer_tokenize(value) {
  return Tokenizer_dealloc(tokenizer(Tokenizer_alloc(value)));
}
/**
 * @param {number} type
 * @return {string}
 */

function whitespace(type) {
  while (character = Tokenizer_peek()) {
    if (character < 33) Tokenizer_next();else break;
  }

  return Tokenizer_token(type) > 2 || Tokenizer_token(character) > 3 ? '' : ' ';
}
/**
 * @param {string[]} children
 * @return {string[]}
 */

function tokenizer(children) {
  while (Tokenizer_next()) {
    switch (Tokenizer_token(character)) {
      case 0:
        append(identifier(Tokenizer_position - 1), children);
        break;

      case 2:
        append(Tokenizer_delimit(character), children);
        break;

      default:
        append(from(character), children);
    }
  }

  return children;
}
/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */

function escaping(index, count) {
  while (--count && Tokenizer_next()) {
    // not 0-9 A-F a-f
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
  }

  return Tokenizer_slice(index, caret() + (count < 6 && Tokenizer_peek() == 32 && Tokenizer_next() == 32));
}
/**
 * @param {number} type
 * @return {number}
 */

function delimiter(type) {
  while (Tokenizer_next()) {
    switch (character) {
      // ] ) " '
      case type:
        return Tokenizer_position;
      // " '

      case 34:
      case 39:
        return delimiter(type === 34 || type === 39 ? type : character);
      // (

      case 40:
        if (type === 41) delimiter(type);
        break;
      // \

      case 92:
        Tokenizer_next();
        break;
    }
  }

  return Tokenizer_position;
}
/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */

function commenter(type, index) {
  while (Tokenizer_next()) {
    // //
    if (type + character === 47 + 10) break; // /*
    else if (type + character === 42 + 42 && Tokenizer_peek() === 47) break;
  }

  return '/*' + Tokenizer_slice(index, Tokenizer_position - 1) + '*' + from(type === 47 ? type : Tokenizer_next());
}
/**
 * @param {number} index
 * @return {string}
 */

function identifier(index) {
  while (!Tokenizer_token(Tokenizer_peek())) {
    Tokenizer_next();
  }

  return Tokenizer_slice(index, Tokenizer_position);
}
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Serializer.js


/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */

function Serializer_serialize(children, callback) {
  var output = '';
  var length = Utility_sizeof(children);

  for (var i = 0; i < length; i++) {
    output += callback(children[i], i, children, callback) || '';
  }

  return output;
}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */

function Serializer_stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;

    case COMMENT:
      return '';

    case RULESET:
      element.value = element.props.join(',');
  }

  return strlen(children = Serializer_serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : '';
}
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Prefixer.js


/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */

function prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (Utility_strlen(value) - 1 - length > 6) switch (Utility_charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (Utility_charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (Utility_charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (Utility_charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (Utility_charat(value, Utility_strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (Utility_charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (Utility_charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}
;// CONCATENATED MODULE: ../../node_modules/stylis/src/Middleware.js





/**
 * @param {function[]} collection
 * @return {function}
 */

function Middleware_middleware(collection) {
  var length = sizeof(collection);
  return function (element, index, children, callback) {
    var output = '';

    for (var i = 0; i < length; i++) {
      output += collection[i](element, index, children, callback) || '';
    }

    return output;
  };
}
/**
 * @param {function} callback
 * @return {function}
 */

function Middleware_rulesheet(callback) {
  return function (element) {
    if (!element.root) if (element = element.return) callback(element);
  };
}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */

function prefixer(element, index, children, callback) {
  if (!element.return) switch (element.type) {
    case Enum_DECLARATION:
      element.return = prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return Serializer_serialize([copy(replace(element.value, '@', '@' + WEBKIT), element, '')], callback);

    case Enum_RULESET:
      if (element.length) return Utility_combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return Serializer_serialize([copy(replace(value, /:(read-\w+)/, ':' + MOZ + '$1'), element, '')], callback);
          // :placeholder

          case '::placeholder':
            return Serializer_serialize([copy(replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1'), element, ''), copy(replace(value, /:(plac\w+)/, ':' + MOZ + '$1'), element, ''), copy(replace(value, /:(plac\w+)/, MS + 'input-$1'), element, '')], callback);
        }

        return '';
      });
  }
}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */

function namespace(element) {
  switch (element.type) {
    case RULESET:
      element.props = element.props.map(function (value) {
        return combine(tokenize(value), function (value, index, children) {
          switch (charat(value, 0)) {
            // \f
            case 12:
              return substr(value, 1, strlen(value));
            // \0 ( + > ~

            case 0:
            case 40:
            case 43:
            case 62:
            case 126:
              return value;
            // :

            case 58:
              if (children[++index] === 'global') children[index] = '', children[++index] = '\f' + substr(children[index], index = 1, -1);
            // \s

            case 32:
              return index === 1 ? '' : value;

            default:
              switch (index) {
                case 0:
                  element = value;
                  return sizeof(children) > 1 ? '' : value;

                case index = sizeof(children) - 1:
                case 2:
                  return index === 2 ? value + element + element : value + element;

                default:
                  return value;
              }

          }
        });
      });
  }
}
;// CONCATENATED MODULE: ../../node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js





var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
}; // based on https://github.com/thysultan/stylis.js/blob/e6843c373ebcbbfade25ebcc23f540ed8508da0a/src/Tokenizer.js#L239-L244


var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();

var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};

var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (false) {}

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (false) {}

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (false) {}

  {
    var currentSheet;
    var finalizingPlugins = [stringify,  false ? 0 : rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if (false) {}

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ var emotion_cache_browser_esm = ((/* unused pure expression or super */ null && (createCache)));
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(67154);
// EXTERNAL MODULE: ../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(91608);
;// CONCATENATED MODULE: ../../node_modules/@emotion/hash/dist/hash.browser.esm.js
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ var hash_browser_esm = (murmur2);
;// CONCATENATED MODULE: ../../node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
/* harmony default export */ var unitless_browser_esm = (unitlessKeys);
;// CONCATENATED MODULE: ../../node_modules/@emotion/memoize/dist/emotion-memoize.browser.esm.js
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ var emotion_memoize_browser_esm = (memoize);
;// CONCATENATED MODULE: ../../node_modules/@emotion/react/node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js



var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */emotion_memoize_browser_esm(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitless_browser_esm[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (false) { var hyphenatedCache, hyphenPattern, msPattern, oldProcessStyleValue, contentValues, contentValuePattern; }

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (false) {}

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (false) {}

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (false) {}

        break;
      }

    case 'string':
      if (false) { var replaced, matched; }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {}

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (false) {}

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (false) {} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;

var emotion_serialize_browser_esm_serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (false) {}

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if (false) {}

      styles += strings[i];
    }
  }

  var sourceMap;

  if (false) {} // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = hash_browser_esm(styles) + identifierName;

  if (false) {}

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};


;// CONCATENATED MODULE: ../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js












var pkg = {
  name: "@emotion/react",
  version: "11.5.0",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  types: "types/index.d.ts",
  files: ["src", "dist", "jsx-runtime", "jsx-dev-runtime", "isolated-hoist-non-react-statics-do-not-use-this-in-your-code", "types/*.d.ts", "macro.js", "macro.d.ts", "macro.js.flow"],
  sideEffects: false,
  author: "mitchellhamilton <mitchell@mitchellhamilton.me>",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.13.10",
    "@emotion/cache": "^11.5.0",
    "@emotion/serialize": "^1.0.2",
    "@emotion/sheet": "^1.0.3",
    "@emotion/utils": "^1.0.0",
    "@emotion/weak-memoize": "^0.2.5",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.13.10",
    "@emotion/css": "11.5.0",
    "@emotion/css-prettifier": "1.0.0",
    "@emotion/server": "11.4.0",
    "@emotion/styled": "11.3.0",
    "@types/react": "^16.9.11",
    dtslint: "^0.3.0",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: ["./index.js", "./jsx-runtime.js", "./jsx-dev-runtime.js", "./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"],
    umdName: "emotionReact"
  }
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(/* unused pure expression or super */ null && (withEmotionCache(function (props, cache) {
  if (false) {}

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, useContext(ThemeContext)); // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything

  var sheetRef = useRef();
  useLayoutEffect(function () {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useLayoutEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
})));

if (false) {}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return emotion_serialize_browser_esm_serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if (false) {}

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = /* #__PURE__ */(/* unused pure expression or super */ null && (withEmotionCache(function (props, cache) {
  var hasRendered = false;

  var css = function css() {
    if (hasRendered && "production" !== 'production') {}

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);
    {
      insertStyles(cache, serialized, false);
    }
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "production" !== 'production') {}

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return ele;
})));

if (false) {}

if (false) { var globalKey, globalContext, isJest, isBrowser; }


;// CONCATENATED MODULE: ../dnb-eufemia-sandbox/stories/GridStyle.js
/**
 * Default Portal Styling
 *
 */var gridStyle=function gridStyle(_temp){var _ref=_temp===void 0?{}:_temp,_ref$rgb=_ref.rgb,rgb=_ref$rgb===void 0?null:_ref$rgb,_ref$hsl=_ref.hsl,hsl=_ref$hsl===void 0?'204, 80%, 72%':_ref$hsl,_ref$a=_ref.a,a=_ref$a===void 0?0.8:_ref$a,_ref$returnOnlyVars=_ref.returnOnlyVars,returnOnlyVars=_ref$returnOnlyVars===void 0?false:_ref$returnOnlyVars;// sorry IE user, here is nothing funn to get
if(helpers/* IS_IE11 */.cW){return'';}var color=function color(c){return rgb?"rgba("+rgb+", "+(a-c)+")":"hsla("+hsl+", "+(a-c)+")";};var vars=/* css */"\n    --grid-gutter: 0.5rem;\n    --grid-gutter-bold: 2rem;\n    --grid-color: "+color(0.5)+";\n    --grid-color-bold: "+color(0.15)+";\n    --grid-line-thickness: 1px;\n\n    --grid-columns: repeating-linear-gradient(\n      to right,\n      var(--grid-color),\n      var(--grid-color) var(--grid-line-thickness),\n      transparent var(--grid-line-thickness),\n      transparent var(--grid-gutter)\n    );\n    --grid-columns-bold: repeating-linear-gradient(\n      to right,\n      var(--grid-color-bold),\n      var(--grid-color-bold) var(--grid-line-thickness),\n      transparent var(--grid-line-thickness),\n      transparent var(--grid-gutter-bold)\n    );\n    --grid-rows: repeating-linear-gradient(\n      to bottom,\n      var(--grid-color),\n      var(--grid-color) var(--grid-line-thickness),\n      transparent var(--grid-line-thickness),\n      transparent var(--grid-gutter)\n    );\n    --grid-rows-bold: repeating-linear-gradient(\n      to bottom,\n      var(--grid-color-bold),\n      var(--grid-color-bold) var(--grid-line-thickness),\n      transparent var(--grid-line-thickness),\n      transparent var(--grid-gutter-bold)\n    );\n  ";if(returnOnlyVars){return vars;}return/*#__PURE__*/css("position:relative;",vars,";&::after{content:'';position:absolute;z-index:-100;top:0;left:0;width:100%;height:100%;background-image:var(--grid-columns),var(--grid-columns-bold),var(--grid-rows),var(--grid-rows-bold);border-bottom:solid var(--grid-line-thickness) var(--grid-color-bold);border-right:solid var(--grid-line-thickness) var(--grid-color-bold);}"+( true?"":0), true?"":0);};
;// CONCATENATED MODULE: ./src/shared/parts/PortalStyle.js
/**
 * Default Portal Styling
 *
 *//* harmony default export */ var PortalStyle = (/*#__PURE__*/(0,emotion_react_browser_esm/* css */.iv)("#gatsby-noscript{position:absolute;z-index:5000;top:0;color:black;background-color:white;}.dnb-app-content{overflow:hidden;}main>.dnb-global-status{transform:translateY(-2rem);}table td.selectable{position:relative;z-index:1;user-select:all;cursor:pointer;transform:scale(1);transition:transform 0.2s ease;}table td.selectable:hover,table td.selectable:active{z-index:2;transform:scale(1.2);user-select:all;}table td em{padding-right:0.5em;}img[align='right']{padding-left:1rem;}img[align='left']{padding-right:1rem;}.dev-grid>.dnb-h--xx-large{position:relative;z-index:2;}:checked+.radio-label{position:relative;z-index:1;border-color:var(--color-sea-green);}.markdown-body::before{display:table;content:'';}.markdown-body::after{display:table;clear:both;content:'';}.image-box{margin:1rem 0 3rem 0;padding:2rem 2rem 0.9375rem 2rem;text-align:center;",gridStyle({rgb:'40, 180, 130',a:0.4}),";background-color:rgba(255, 255, 255, 0.6);figcaption{padding-top:0.938rem;font-style:italic;border-top:solid 1px #c4c4c4;}img:not([width]){width:100%;margin-bottom:2rem;}&.x-10 img{width:calc(50% + 10rem);}&.mint-green-12{background-color:var(--color-mint-green-12);}&.blank{background-color:transparent;}&.blank::after{background-image:none;border-color:transparent;}}.gatsby-resp-image-wrapper{margin-left:0!important;a{padding:0;box-shadow:none;&[target='_blank']:not(:empty):not(.dnb-anchor--no-icon)::after{content:none;}img{width:100%;}}a:hover img{border-radius:0.25rem;box-shadow:0 0 0 0.125rem var(--color-mint-green-50);}} .contains-task-list{padding-left:0;}.task-list-item{list-style-type:none;}.task-list-item+.task-list-item{margin-top:0.5rem;}.task-list-item .dnb-checkbox{margin-right:0.5rem;margin-bottom:0.25em;}.typography-box{margin-bottom:4rem;padding:2rem 2rem 1.9375rem 2rem;",gridStyle({rgb:'164, 255, 255',a:0.8}),";h1{margin-top:0;}ul{margin:0;padding:0;line-height:var(--line-height-basis);list-style:none;}li{margin:0;padding:0;font-size:var(--font-size-basis);font-family:monospace;line-height:var(--line-height-basis);}}.example-box{margin-bottom:2rem;padding:2rem;",gridStyle({rgb:'236, 236, 236',a:1}),";&.center{display:flex;flex-direction:column;align-items:center;}}.example-caption{margin-top:2rem;padding-top:0.9375rem;font-size:var(--font-size-small);font-style:italic;text-align:center;border-top:solid 1px #c4c4c4;p{margin:0;padding:0;}}.example-box+.example-caption{margin-top:-2rem;}.margin-bottom{margin-bottom:2rem;}.lh-12{line-height:calc(var(--line-height-basis) - 0.25rem);}.lh-16{line-height:var(--line-height-basis);}.lh-20{line-height:calc(var(--line-height-basis) + 0.25rem);}.lh-24{line-height:var(--line-height-basis);}.lh-28{line-height:calc(var(--line-height-basis) + 0.75rem);}.lh-32{line-height:calc(var(--line-height-basis) + 1rem);}"+( true?"":0)));

/***/ })

}]);
//# sourceMappingURL=213db14e82bdc34bb4a8b39c0e7853c664cfa366-b75a637b8e0d4690db5e.js.map