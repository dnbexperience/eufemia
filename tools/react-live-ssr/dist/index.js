"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Editor: () => Editor_default,
  LiveContext: () => LiveContext_default,
  LiveEditor: () => LiveEditor,
  LiveError: () => LiveError,
  LivePreview: () => LivePreview_default,
  LiveProvider: () => LiveProvider_default,
  generateElement: () => generateElement,
  renderElementAsync: () => renderElementAsync,
  withLive: () => withLive
});
module.exports = __toCommonJS(src_exports);

// src/components/Editor/index.tsx
var import_prism_react_renderer = require("prism-react-renderer");
var import_react = require("react");
var import_use_editable = require("use-editable");
var import_jsx_runtime = require("react/jsx-runtime");
var CodeEditor = (props) => {
  const _a = props, {
    code: origCode,
    className,
    style,
    tabMode="indentation",
    theme: origTheme,
    prism,
    language,
    disabled,
    onChange,
    editorRef
  } = _a, rest = __objRest(_a, [
    "code",
    "className",
    "style",
    "tabMode",
    "theme",
    "prism",
    "language",
    "disabled",
    "onChange",
    "editorRef"
  ]);
  const _editorRef = editorRef || (0, import_react.useRef)(null);
  const [code, setCode] = (0, import_react.useState)(origCode || "");
  const { theme } = props;
  (0, import_react.useEffect)(() => {
    setCode(origCode);
  }, [origCode]);
  (0, import_use_editable.useEditable)(_editorRef, (text) => setCode(text.slice(0, -1)), {
    disabled,
    indentation: tabMode === "indentation" ? 2 : void 0
  });
  (0, import_react.useEffect)(() => {
    if (onChange) {
      onChange(code);
    }
  }, [code]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_prism_react_renderer.Highlight,
    {
      prism: prism || import_prism_react_renderer.Prism,
      code,
      theme: origTheme || import_prism_react_renderer.themes.nightOwl,
      language,
      children: ({
        className: _className,
        tokens,
        getLineProps,
        getTokenProps,
        style: _style
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "pre",
        __spreadProps(__spreadValues({
          className: _className,
          style: __spreadValues(__spreadValues({
            margin: 0,
            outline: "none",
            padding: 10,
            fontFamily: "inherit"
          }, theme && typeof theme.plain === "object" ? theme.plain : {}), _style),
          ref: _editorRef,
          spellCheck: "false"
        }, rest), {
          children: tokens.map((line, lineIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", __spreadProps(__spreadValues({}, getLineProps({ line })), { children: [
            line.filter((token) => !token.empty).map((token, tokenIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              __spreadValues({}, getTokenProps({ token })),
              `token-${tokenIndex}`
            )),
            "\n"
          ] }), `line-${lineIndex}`))
        })
      )
    }
  ) });
};
var Editor_default = CodeEditor;

// src/components/Live/LiveProvider.tsx
var import_react5 = require("react");

// src/components/Live/LiveContext.ts
var import_react2 = require("react");
var LiveContext = (0, import_react2.createContext)({});
var LiveContext_default = LiveContext;

// src/utils/transpile/index.ts
var import_react4 = __toESM(require("react"));

// src/utils/transpile/transform.ts
var import_sucrase = require("sucrase");
var defaultTransforms = ["jsx", "imports"];
function transform(opts = {}) {
  const transforms = Array.isArray(opts.transforms) ? opts.transforms.filter(Boolean) : defaultTransforms;
  return (code) => (0, import_sucrase.transform)(code, { transforms }).code;
}

// src/utils/transpile/errorBoundary.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends import_react3.Component {
    componentDidCatch(error) {
      errorCallback(error);
    }
    render() {
      return typeof Element === "function" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Element, {}) : import_react3.default.isValidElement(Element) ? Element : null;
    }
  };
};
var errorBoundary_default = errorBoundary;

// src/utils/transpile/evalCode.ts
var evalCode = (code, scope) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  return new Function(...scopeKeys, code)(...scopeValues);
};
var evalCode_default = evalCode;

// src/utils/transpile/compose.ts
function compose(...functions) {
  return functions.reduce(
    (acc, currentFn) => (...args) => acc(currentFn(...args))
  );
}

// src/utils/transpile/index.ts
var jsxConst = 'const _jsxFileName = "";';
var trimCode = (code) => code.trim().replace(/;$/, "");
var spliceJsxConst = (code) => code.replace(jsxConst, "").trim();
var addJsxConst = (code) => jsxConst + code;
var wrapReturn = (code) => `return (${code})`;
var generateElement = ({ code = "", scope = {}, enableTypeScript = true }, errorCallback) => {
  const firstPassTransforms = ["jsx"];
  enableTypeScript && firstPassTransforms.push("typescript");
  const transformed = compose(
    addJsxConst,
    transform({ transforms: ["imports"] }),
    wrapReturn,
    spliceJsxConst,
    trimCode,
    transform({ transforms: firstPassTransforms }),
    trimCode
  )(code);
  return errorBoundary_default(
    evalCode_default(transformed, __spreadValues({ React: import_react4.default }, scope)),
    errorCallback
  );
};
var renderElementAsync = ({ code = "", scope = {}, enableTypeScript = true }, resultCallback, errorCallback) => {
  const render = (element) => {
    if (typeof element === "undefined") {
      errorCallback(new SyntaxError("`render` must be called with valid JSX."));
    } else {
      resultCallback(errorBoundary_default(element, errorCallback));
    }
  };
  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError("No-Inline evaluations must call `render`.")
    );
  }
  const transforms = ["jsx", "imports"];
  enableTypeScript && transforms.splice(1, 0, "typescript");
  evalCode_default(transform({ transforms })(code), __spreadProps(__spreadValues({ React: import_react4.default }, scope), { render }));
};

// src/components/Live/LiveProvider.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function LiveProvider({
  children,
  code = "",
  language = "tsx",
  theme,
  enableTypeScript = true,
  disabled = false,
  scope,
  transformCode,
  noInline = false,
  skipInitialRender = false
}) {
  const cache = (0, import_react5.useRef)("initial");
  const [state, setState] = (0, import_react5.useState)(() => transpileSync(code));
  function transpileSync(code2) {
    const returnObject = {
      element: void 0,
      error: void 0
    };
    if (!skipInitialRender) {
      const renderElement = (element) => {
        return returnObject.element = element;
      };
      const errorCallback = (error) => {
        return returnObject.error = String(error);
      };
      try {
        const transformResult = transformCode ? transformCode(code2) : code2;
        const input = {
          code: transformResult,
          scope,
          enableTypeScript
        };
        if (noInline) {
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
        cache.current = code2;
      } catch (e) {
        errorCallback(e);
      }
    }
    return returnObject;
  }
  function transpileAsync(newCode) {
    return __async(this, null, function* () {
      if (cache.current === newCode) {
        cache.current = "used";
        return Promise.resolve();
      }
      const errorCallback = (error) => {
        setState({ error: error.toString(), element: void 0 });
      };
      try {
        const transformResult = transformCode ? transformCode(newCode) : newCode;
        try {
          const transformedCode = yield Promise.resolve(transformResult);
          const renderElement = (element) => setState({ error: void 0, element });
          if (typeof transformedCode !== "string") {
            throw new Error("Code failed to transform");
          }
          const input = {
            code: transformedCode,
            scope,
            enableTypeScript
          };
          if (noInline) {
            setState({ error: void 0, element: null });
            renderElementAsync(input, renderElement, errorCallback);
          } else {
            renderElement(generateElement(input, errorCallback));
          }
        } catch (error) {
          return errorCallback(error);
        }
      } catch (e) {
        errorCallback(e);
        return Promise.resolve();
      }
    });
  }
  const onError = (error) => setState({ error: error.toString() });
  (0, import_react5.useEffect)(() => {
    transpileAsync(code).catch(onError);
  }, [code, scope, noInline, transformCode]);
  const onChange = (newCode) => {
    transpileAsync(newCode).catch(onError);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    LiveContext_default.Provider,
    {
      value: __spreadProps(__spreadValues({}, state), {
        code,
        language,
        theme,
        disabled,
        onError,
        onChange
      }),
      children
    }
  );
}
var LiveProvider_default = LiveProvider;

// src/components/Live/LiveEditor.tsx
var import_react6 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function LiveEditor(props) {
  const { code, language, theme, disabled, onChange } = (0, import_react6.useContext)(LiveContext_default);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    Editor_default,
    __spreadValues({
      theme,
      code,
      language,
      disabled,
      onChange
    }, props)
  );
}

// src/components/Live/LiveError.tsx
var import_react7 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function LiveError(props) {
  const { error } = (0, import_react7.useContext)(LiveContext_default);
  return error ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("pre", __spreadProps(__spreadValues({}, props), { children: error })) : null;
}

// src/components/Live/LivePreview.tsx
var import_react8 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
function LivePreview(_a) {
  var _b = _a, { Component: Component2 = "div" } = _b, rest = __objRest(_b, ["Component"]);
  const { element: Element } = (0, import_react8.useContext)(LiveContext_default);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component2, __spreadProps(__spreadValues({}, rest), { children: Element ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Element, {}) : null }));
}
var LivePreview_default = LivePreview;

// src/hoc/withLive.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function withLive(WrappedComponent) {
  const WithLive = (props) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LiveContext_default.Consumer, { children: (live) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(WrappedComponent, __spreadValues({ live }, props)) });
  WithLive.displayName = "WithLive";
  return WithLive;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Editor,
  LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  generateElement,
  renderElementAsync,
  withLive
});
//# sourceMappingURL=index.js.map