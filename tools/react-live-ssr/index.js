import React, {
  useState,
  useMemo,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
  createContext,
  Component,
  useContext,
} from 'react'
import Highlight, { Prism } from 'prism-react-renderer'
import { transform as transform$1 } from 'sucrase'

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }

  return obj
}

var m = {
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0,
}

function p(c) {
  var a = window.getSelection()
  a.empty()
  a.addRange(c)
}

function q(c) {
  return (c.metaKey || c.ctrlKey) && !c.altKey && 'KeyZ' === c.code
}

function r(c) {
  c = [c.firstChild]

  for (var b, a = ''; (b = c.pop()); ) {
    b.nodeType === Node.TEXT_NODE
      ? (a += b.textContent)
      : b.nodeType === Node.ELEMENT_NODE &&
        'BR' === b.nodeName &&
        (a += '\n'),
      b.nextSibling && c.push(b.nextSibling),
      b.firstChild && c.push(b.firstChild)
  }

  '\n' !== a[a.length - 1] && (a += '\n')
  return a
}

function w(c) {
  var a = window.getSelection().getRangeAt(0),
    b = a.collapsed ? 0 : a.toString().length,
    f = document.createRange()
  f.setStart(c, 0)
  f.setEnd(a.startContainer, a.startOffset)
  return {
    position: (c = (f = f.toString()).length),
    extent: b,
    content: (f = (f = f.split('\n'))[(a = f.length - 1)]),
    line: a,
  }
}

function C(c, a, b) {
  0 >= a && (a = 0)

  if (!b || 0 > b) {
    b = a
  }

  var f = document.createRange()
  c = [c.firstChild]

  for (var d, l = 0, g = a; (d = c[c.length - 1]); ) {
    if (d.nodeType === Node.TEXT_NODE) {
      if (l + d.textContent.length >= g) {
        var h = g - l

        if (g === a) {
          if (
            ((g = f),
            h < d.textContent.length
              ? g.setStart(d, h)
              : g.setStartAfter(d),
            b !== a)
          ) {
            g = b
            continue
          } else {
            break
          }
        } else {
          a = f
          h < (b = d).textContent.length
            ? a.setEnd(b, h)
            : a.setEndAfter(b)
          break
        }
      }

      l += d.textContent.length
    } else if (d.nodeType === Node.ELEMENT_NODE && 'BR' === d.nodeName) {
      if (l + 1 >= g) {
        if (g === a) {
          if (
            ((h = f),
            0 < d.textContent.length
              ? h.setStart(d, 0)
              : h.setStartAfter(d),
            b !== a)
          ) {
            g = b
            continue
          } else {
            break
          }
        } else {
          a = f
          0 < (b = d).textContent.length
            ? a.setEnd(b, 0)
            : a.setEndAfter(b)
          break
        }
      }

      l++
    }

    c.pop()
    d.nextSibling && c.push(d.nextSibling)
    d.firstChild && c.push(d.firstChild)
  }

  return f
}

function useEditable(c, a, b) {
  function f(k) {
    var b = c.current

    if (b) {
      var a = w(b)
      b = r(b)
      a.position += k.length - b.length
      e.position = a
      e.onChange(k, a)
    }
  }

  function l(k, b) {
    var e = c.current

    if (e) {
      var a = window.getSelection().getRangeAt(0)
      a.deleteContents()
      a.collapse()
      var d = b || 0
      ;(a = C(
        e,
        (b = (a = w(e)).position + (0 > d ? d : 0)),
        a.position + (0 < d ? d : 0)
      )).deleteContents()
      k && a.insertNode(document.createTextNode(k))
      p(C(e, b + k.length))
    }
  }

  function d(b) {
    var a = c.current

    if (a) {
      a.focus()
      var e = 0

      if ('number' == typeof b) {
        e = b
      } else {
        var k = r(a).split('\n').slice(0, b.row)
        b.row && (e += k.join('\n').length + 1)
        e += b.column
      }

      p(C(a, e))
    }
  }

  function g() {
    var b = c.current
    return {
      text: r(b),
      position: (b = w(b)),
    }
  }

  function h() {
    e.observer.disconnect()
  }

  b || (b = {})
  var D = useState([])[1],
    e = useState(function () {
      var e = {
        observer: null,
        disconnected: !1,
        onChange: a,
        queue: [],
        history: [],
        historyAt: -1,
        position: null,
      }
      'undefined' != typeof MutationObserver &&
        (e.observer = new MutationObserver(function b(b) {
          var a
          ;(a = e.queue).push.apply(a, b)
        }))
      return e
    })[0],
    n = useMemo(function () {
      return {
        update: f,
        insert: l,
        move: d,
        getState: g,
      }
    }, [])

  if ('object' != typeof navigator) {
    return n
  }

  useLayoutEffect(function () {
    e.onChange = a

    if (c.current && !b.disabled) {
      e.disconnected = !1
      e.observer.observe(c.current, m)

      if (e.position) {
        var k = e.position,
          d = k.position
        p(C(c.current, d, d + k.extent))
      }

      return h
    }
  })
  useLayoutEffect(
    function () {
      if (!c.current || b.disabled) {
        ;(e.history.length = 0), (e.historyAt = -1)
      } else {
        var a = c.current

        if (e.position) {
          a.focus()
          var d = e.position,
            f = d.position
          p(C(a, f, f + d.extent))
        }

        var g = a.style.whiteSpace,
          h = a.contentEditable,
          l = !0

        try {
          a.contentEditable = 'plaintext-only'
        } catch (u) {
          ;(a.contentEditable = 'true'), (l = !1)
        }

        'pre' !== g && (a.style.whiteSpace = 'pre-wrap')
        b.indentation &&
          (a.style.tabSize = a.style.MozTabSize = '' + b.indentation)
        d = '' + ' '.repeat(b.indentation || 0)

        var x,
          E = new RegExp('^(?:' + d + ')'),
          F = new RegExp('^(?:' + d + ')*(' + d + ')$'),
          t = function t(b) {
            if (c.current && e.position) {
              var u = r(a),
                d = w(a),
                f = new Date().valueOf(),
                g = e.history[e.historyAt]
              ;(!b && 500 > f - x) || (g && g[1] === u)
                ? (x = f)
                : ((b = ++e.historyAt),
                  (e.history[b] = [d, u]),
                  e.history.splice(b + 1),
                  500 < b && (e.historyAt--, e.history.shift()))
            }
          },
          v = function v() {
            var b
            ;(b = e.queue).push.apply(b, e.observer.takeRecords())
            b = w(a)

            if (e.queue.length) {
              e.observer.disconnect()
              e.disconnected = !0
              var d = r(a)
              e.position = b

              for (var c, f; (c = e.queue.pop()); ) {
                null !== c.oldValue && (c.target.textContent = c.oldValue)

                for (f = c.removedNodes.length - 1; 0 <= f; f--) {
                  c.target.insertBefore(c.removedNodes[f], c.nextSibling)
                }

                for (f = c.addedNodes.length - 1; 0 <= f; f--) {
                  c.addedNodes[f].parentNode &&
                    c.target.removeChild(c.addedNodes[f])
                }
              }

              e.onChange(d, b)
            }
          },
          y = function y(c) {
            if (!c.defaultPrevented && c.target === a) {
              if (e.disconnected) {
                return c.preventDefault(), D([])
              }

              if (q(c)) {
                c.preventDefault(),
                  c.shiftKey
                    ? ((c = ++e.historyAt),
                      (c = e.history[c]) ||
                        (e.historyAt = e.history.length - 1))
                    : ((c = --e.historyAt),
                      (c = e.history[c]) || (e.historyAt = 0)),
                  c &&
                    (e.observer.disconnect(),
                    (e.disconnected = !0),
                    (e.position = c[0]),
                    e.onChange(c[1], c[0]))
              } else {
                t()

                if ('Enter' === c.key) {
                  c.preventDefault()
                  var d = w(a),
                    f = /\S/g.exec(d.content)
                  d =
                    '\n' +
                    d.content.slice(0, f ? f.index : d.content.length)
                  n.insert(d)
                } else if (
                  (!l || b.indentation) &&
                  'Backspace' === c.key
                ) {
                  c.preventDefault(),
                    window.getSelection().getRangeAt(0).collapsed
                      ? ((d = w(a)),
                        (d = F.exec(d.content)),
                        n.insert('', d ? -d[1].length : -1))
                      : n.insert('', 0)
                } else if (b.indentation && 'Tab' === c.key) {
                  c.preventDefault()
                  f = (d = w(a)).position - d.content.length
                  var g = r(a)
                  d = c.shiftKey
                    ? g.slice(0, f) +
                      d.content.replace(E, '') +
                      g.slice(f + d.content.length)
                    : g.slice(0, f) +
                      (b.indentation ? ' '.repeat(b.indentation) : '\t') +
                      g.slice(f)
                  n.update(d)
                }

                c.repeat && v()
              }
            }
          },
          z = function z(b) {
            b.defaultPrevented ||
              b.isComposing ||
              (q(b) || t(), v(), a.focus())
          },
          A = function A(b) {
            e.position =
              window.getSelection().rangeCount && b.target === a
                ? w(a)
                : null
          },
          B = function B(a) {
            a.preventDefault()
            t(!0)
            n.insert(a.clipboardData.getData('text/plain'))
            t(!0)
            v()
          }

        document.addEventListener('selectstart', A)
        window.addEventListener('keydown', y)
        a.addEventListener('paste', B)
        a.addEventListener('keyup', z)
        return function () {
          document.removeEventListener('selectstart', A)
          window.removeEventListener('keydown', y)
          a.removeEventListener('paste', B)
          a.removeEventListener('keyup', z)
          a.style.whiteSpace = g
          a.contentEditable = h
        }
      }
    },
    [c.current, b.disabled, b.indentation]
  )
  return n
}

var theme = {
  plain: {
    color: '#C5C8C6',
    backgroundColor: '#1D1F21',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: 'hsl(30, 20%, 50%)',
      },
    },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
      ],
      style: {
        color: 'hsl(350, 40%, 70%)',
      },
    },
    {
      types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
      style: {
        color: 'hsl(75, 70%, 60%)',
      },
    },
    {
      types: [
        'operator',
        'entity',
        'url',
        'string',
        'variable',
        'language-css',
      ],
      style: {
        color: 'hsl(40, 90%, 60%)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#e90',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: 'hsl(350, 40%, 70%)',
      },
    },
    {
      types: ['punctuation', 'symbol'],
      style: {
        opacity: '0.7',
      },
    },
  ],
}

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
      )
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

var CodeEditor = function CodeEditor(props) {
  var editorRef = useRef(null)

  var _useState = useState(props.code || ''),
    code = _useState[0],
    setCode = _useState[1]

  useEffect(
    function () {
      setCode(props.code)
    },
    [props.code]
  )
  var onEditableChange = useCallback(function (_code) {
    setCode(_code.slice(0, -1))
  }, [])
  useEditable(editorRef, onEditableChange, {
    disabled: props.disabled,
    indentation: 2,
  })
  useEffect(
    function () {
      if (props.onChange) {
        props.onChange(code)
      }
    },
    [code]
  )
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: props.className,
      style: props.style,
    },
    /*#__PURE__*/ React.createElement(
      Highlight,
      {
        Prism: props.prism || Prism,
        code: code,
        theme: props.theme || theme,
        language: props.language,
      },
      function (_ref) {
        var _className = _ref.className,
          tokens = _ref.tokens,
          getLineProps = _ref.getLineProps,
          getTokenProps = _ref.getTokenProps,
          _style = _ref.style
        return /*#__PURE__*/ React.createElement(
          'pre',
          {
            className: _className,
            style: _objectSpread$2(
              {
                margin: 0,
                outline: 'none',
                padding: 10,
                fontFamily: 'inherit',
              },
              !props.className || !props.theme ? {} : _style
            ),
            ref: editorRef,
            spellCheck: 'false',
            id: props.id,
            onFocus: props.onFocus,
            onBlur: props.onBlur,
          },
          tokens.map(function (line, lineIndex) {
            return (
              /*#__PURE__*/
              // eslint-disable-next-line react/jsx-key
              React.createElement(
                'div',
                getLineProps({
                  line: line,
                  key: 'line-' + lineIndex,
                }),
                line
                  .filter(function (token) {
                    return !token.empty
                  })
                  .map(function (token, tokenIndex) {
                    return (
                      /*#__PURE__*/
                      // eslint-disable-next-line react/jsx-key
                      React.createElement(
                        'span',
                        getTokenProps({
                          token: token,
                          key: 'token-' + tokenIndex,
                        })
                      )
                    )
                  }),
                '\n'
              )
            )
          })
        )
      }
    )
  )
}

var Editor = CodeEditor

var LiveContext = /*#__PURE__*/ createContext({})
var LiveContext$1 = LiveContext

var opts = {
  transforms: ['jsx', 'imports'],
}
var transform = function (code) {
  return transform$1(code, opts).code
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }

  return _setPrototypeOf(o, p)
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  _setPrototypeOf(subClass, superClass)
}

var errorBoundary = function errorBoundary(Element, errorCallback) {
  return /*#__PURE__*/ (function (_Component) {
    _inheritsLoose(ErrorBoundary, _Component)

    function ErrorBoundary() {
      return _Component.apply(this, arguments) || this
    }

    var _proto = ErrorBoundary.prototype

    _proto.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error)
    }

    _proto.render = function render() {
      return typeof Element === 'function'
        ? /*#__PURE__*/ React.createElement(Element, null)
        : /*#__PURE__*/ React.isValidElement(Element)
        ? Element
        : null
    }

    return ErrorBoundary
  })(Component)
}

var errorBoundary$1 = errorBoundary

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true

  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    )
    return true
  } catch (e) {
    return false
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null]
      a.push.apply(a, args)
      var Constructor = Function.bind.apply(Parent, a)
      var instance = new Constructor()
      if (Class) _setPrototypeOf(instance, Class.prototype)
      return instance
    }
  }

  return _construct.apply(null, arguments)
}

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope)
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key]
  })
  return _construct(Function, scopeKeys.concat([code])).apply(
    void 0,
    scopeValues
  )
}

var evalCode$1 = evalCode

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
      )
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}
var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
    code = _ref$code === void 0 ? '' : _ref$code,
    _ref$scope = _ref.scope,
    scope = _ref$scope === void 0 ? {} : _ref$scope
  // NOTE: Remove trailing semicolon to get an actual expression.
  var codeTrimmed = code.trim().replace(/;$/, '') // NOTE: Workaround for classes and arrow functions.

  var transformed = transform('return (' + codeTrimmed + ')').trim()
  return errorBoundary$1(
    evalCode$1(
      transformed,
      _objectSpread$1(
        {
          React: React,
        },
        scope
      )
    ),
    errorCallback
  )
}
var renderElementAsync = function renderElementAsync(
  _ref2,
  resultCallback,
  errorCallback // eslint-disable-next-line consistent-return
) {
  var _ref2$code = _ref2.code,
    code = _ref2$code === void 0 ? '' : _ref2$code,
    _ref2$scope = _ref2.scope,
    scope = _ref2$scope === void 0 ? {} : _ref2$scope

  var render = function render(element) {
    if (typeof element === 'undefined') {
      errorCallback(
        new SyntaxError('`render` must be called with valid JSX.')
      )
    } else {
      resultCallback(errorBoundary$1(element, errorCallback))
    }
  }

  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError('No-Inline evaluations must call `render`.')
    )
  }

  evalCode$1(
    transform(code),
    _objectSpread$1(
      _objectSpread$1(
        {
          React: React,
        },
        scope
      ),
      {},
      {
        render: render,
      }
    )
  )
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
      )
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

function LiveProvider(_ref) {
  var children = _ref.children,
    code = _ref.code,
    language = _ref.language,
    theme = _ref.theme,
    disabled = _ref.disabled,
    scope = _ref.scope,
    transformCode = _ref.transformCode,
    _ref$noInline = _ref.noInline,
    noInline = _ref$noInline === void 0 ? false : _ref$noInline,
    _ref$skipInitialRende = _ref.skipInitialRender,
    skipInitialRender =
      _ref$skipInitialRende === void 0 ? false : _ref$skipInitialRende

  var _useState = useState(transpileSync(code)),
    state = _useState[0],
    setState = _useState[1]

  function transpileSync(code) {
    var returnObject = {
      element: undefined,
      error: undefined,
    }

    var renderElement = function renderElement(element) {
      return (returnObject.element = element)
    }

    var errorCallback = function errorCallback(error) {
      return (returnObject.error = error)
    }

    if (!skipInitialRender) {
      try {
        var transformResult = transformCode ? transformCode(code) : code // Transpilation arguments

        var input = {
          code: transformResult,
          scope: scope,
        }

        if (noInline) {
          // returnObject.error = undefined;
          renderElementAsync(input, renderElement, errorCallback)
        } else {
          renderElement(generateElement(input, errorCallback))
        }
      } catch (e) {
        errorCallback(e)
      }
    }

    return returnObject
  }

  function transpileAsync(newCode) {
    var errorCallback = function errorCallback(error) {
      setState({
        error: error.toString(),
        element: undefined,
      })
    } // - transformCode may be synchronous or asynchronous.
    // - transformCode may throw an exception or return a rejected promise, e.g.
    //   if newCode is invalid and cannot be transformed.
    // - Not using async-await to since it requires targeting ES 2017 or
    //   importing regenerator-runtime... in the next major version of
    //   react-live, should target ES 2017+

    try {
      var transformResult = transformCode
        ? transformCode(newCode)
        : newCode
      return Promise.resolve(transformResult)
        .then(function (transformedCode) {
          var renderElement = function renderElement(element) {
            return setState({
              error: undefined,
              element: element,
            })
          } // Transpilation arguments

          var input = {
            code: transformedCode,
            scope: scope,
          }

          if (noInline) {
            setState({
              error: undefined,
              element: null,
            }) // Reset output for async (no inline) evaluation

            renderElementAsync(input, renderElement, errorCallback)
          } else {
            renderElement(generateElement(input, errorCallback))
          }
        })
        ['catch'](errorCallback)
    } catch (e) {
      errorCallback(e)
      return Promise.resolve()
    }
  }

  var onError = function onError(error) {
    return setState({
      error: error.toString(),
    })
  }

  useEffect(
    function () {
      transpileAsync(code)['catch'](onError)
    },
    [code, scope, noInline, transformCode]
  )

  var onChange = function onChange(newCode) {
    transpileAsync(newCode)['catch'](onError)
  }

  return /*#__PURE__*/ React.createElement(
    LiveContext$1.Provider,
    {
      value: _objectSpread(
        _objectSpread({}, state),
        {},
        {
          code: code,
          language: language,
          theme: theme,
          disabled: disabled,
          onError: onError,
          onChange: onChange,
        }
      ),
    },
    children
  )
}

LiveProvider.defaultProps = {
  code: '',
  noInline: false,
  skipInitialRender: false,
  language: 'jsx',
  disabled: false,
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }

      return target
    }

  return _extends.apply(this, arguments)
}

function LiveEditor(props) {
  var _useContext = useContext(LiveContext$1),
    code = _useContext.code,
    language = _useContext.language,
    theme = _useContext.theme,
    disabled = _useContext.disabled,
    onChange = _useContext.onChange

  return /*#__PURE__*/ React.createElement(
    Editor,
    _extends(
      {
        theme: theme,
        code: code,
        language: language,
        disabled: disabled,
        onChange: onChange,
      },
      props
    )
  )
}

function LiveError(props) {
  var _useContext = useContext(LiveContext$1),
    error = _useContext.error

  return error
    ? /*#__PURE__*/ React.createElement('pre', props, error)
    : null
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}
  var target = {}
  var sourceKeys = Object.keys(source)
  var key, i

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i]
    if (excluded.indexOf(key) >= 0) continue
    target[key] = source[key]
  }

  return target
}

var _excluded = ['Component']

function LivePreview(_ref) {
  var Component = _ref.Component,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded)

  var _useContext = useContext(LiveContext$1),
    Element = _useContext.element

  return /*#__PURE__*/ React.createElement(
    Component,
    rest,
    Element ? /*#__PURE__*/ React.createElement(Element, null) : null
  )
}

LivePreview.defaultProps = {
  Component: 'div',
}

function withLive(WrappedComponent) {
  var WithLive = /*#__PURE__*/ (function (_Component) {
    _inheritsLoose(WithLive, _Component)

    function WithLive() {
      return _Component.apply(this, arguments) || this
    }

    var _proto = WithLive.prototype

    _proto.render = function render() {
      var _this = this

      return /*#__PURE__*/ React.createElement(
        LiveContext$1.Consumer,
        null,
        function (live) {
          return /*#__PURE__*/ React.createElement(
            WrappedComponent,
            _extends(
              {
                live: live,
              },
              _this.props
            )
          )
        }
      )
    }

    return WithLive
  })(Component)

  return WithLive
}

export {
  Editor,
  LiveContext$1 as LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  generateElement,
  renderElementAsync,
  withLive,
}
