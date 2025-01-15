var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/components/Editor/index.tsx
import { Highlight, Prism, themes } from "prism-react-renderer";
import { useEffect, useRef, useState } from "react";
import { useEditable } from "use-editable";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const _editorRef = editorRef || useRef(null);
  const [code, setCode] = useState(origCode || "");
  const { theme } = props;
  useEffect(() => {
    setCode(origCode);
  }, [origCode]);
  useEditable(_editorRef, (text) => setCode(text.slice(0, -1)), {
    disabled,
    indentation: tabMode === "indentation" ? 2 : void 0
  });
  useEffect(() => {
    if (onChange) {
      onChange(code);
    }
  }, [code]);
  return /* @__PURE__ */ jsx("div", { className, style, children: /* @__PURE__ */ jsx(
    Highlight,
    {
      prism: prism || Prism,
      code,
      theme: origTheme || themes.nightOwl,
      language,
      children: ({
        className: _className,
        tokens,
        getLineProps,
        getTokenProps,
        style: _style
      }) => /* @__PURE__ */ jsx(
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
          children: tokens.map((line, lineIndex) => /* @__PURE__ */ jsxs("span", __spreadProps(__spreadValues({}, getLineProps({ line })), { children: [
            line.filter((token) => !token.empty).map((token, tokenIndex) => /* @__PURE__ */ jsx(
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
import {
  useEffect as useEffect2,
  useState as useState2,
  useRef as useRef2
} from "react";

// src/components/Live/LiveContext.ts
import { createContext } from "react";
var LiveContext = createContext({});
var LiveContext_default = LiveContext;

// src/utils/transpile/index.ts
import React2 from "react";

// src/utils/transpile/transform.ts
import { transform as _transform } from "sucrase";
var defaultTransforms = ["jsx", "imports"];
function transform(opts = {}) {
  const transforms = Array.isArray(opts.transforms) ? opts.transforms.filter(Boolean) : defaultTransforms;
  return (code) => _transform(code, { transforms }).code;
}

// src/utils/transpile/errorBoundary.tsx
import React, { Component } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends Component {
    componentDidCatch(error) {
      errorCallback(error);
    }
    render() {
      return typeof Element === "function" ? /* @__PURE__ */ jsx2(Element, {}) : React.isValidElement(Element) ? Element : null;
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
    evalCode_default(transformed, __spreadValues({ React: React2 }, scope)),
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
  evalCode_default(transform({ transforms })(code), __spreadProps(__spreadValues({ React: React2 }, scope), { render }));
};

// src/components/Live/LiveProvider.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
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
  const cache = useRef2("initial");
  const [state, setState] = useState2(() => transpileSync(code));
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
  useEffect2(() => {
    transpileAsync(code).catch(onError);
  }, [code, scope, noInline, transformCode]);
  const onChange = (newCode) => {
    transpileAsync(newCode).catch(onError);
  };
  return /* @__PURE__ */ jsx3(
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
import { useContext } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
function LiveEditor(props) {
  const { code, language, theme, disabled, onChange } = useContext(LiveContext_default);
  return /* @__PURE__ */ jsx4(
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
import { useContext as useContext2 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
function LiveError(props) {
  const { error } = useContext2(LiveContext_default);
  return error ? /* @__PURE__ */ jsx5("pre", __spreadProps(__spreadValues({}, props), { children: error })) : null;
}

// src/components/Live/LivePreview.tsx
import { useContext as useContext3 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
function LivePreview(_a) {
  var _b = _a, { Component: Component2 = "div" } = _b, rest = __objRest(_b, ["Component"]);
  const { element: Element } = useContext3(LiveContext_default);
  return /* @__PURE__ */ jsx6(Component2, __spreadProps(__spreadValues({}, rest), { children: Element ? /* @__PURE__ */ jsx6(Element, {}) : null }));
}
var LivePreview_default = LivePreview;

// src/hoc/withLive.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function withLive(WrappedComponent) {
  const WithLive = (props) => /* @__PURE__ */ jsx7(LiveContext_default.Consumer, { children: (live) => /* @__PURE__ */ jsx7(WrappedComponent, __spreadValues({ live }, props)) });
  WithLive.displayName = "WithLive";
  return WithLive;
}
export {
  Editor_default as Editor,
  LiveContext_default as LiveContext,
  LiveEditor,
  LiveError,
  LivePreview_default as LivePreview,
  LiveProvider_default as LiveProvider,
  generateElement,
  renderElementAsync,
  withLive
};
//# sourceMappingURL=index.mjs.map