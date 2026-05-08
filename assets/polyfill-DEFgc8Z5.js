import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Properties Polyfill`}),`
`,(0,n.jsxs)(r.p,{children:[`By using Eufemia properties, like `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/colors`,children:`color names`}),` and `,(0,n.jsx)(r.a,{href:`/uilib/typography`,children:`typography properties`}),`, instead of defining colors and typography directly as hard coded values, you make your code much more readable and future proof in terms of refactoring and new enhancements. `,(0,n.jsx)(r.a,{href:`/uilib/about-the-lib/maintainability`,children:`Maintainability`}),` is important. But it fits also better in thinking of the `,(0,n.jsx)(r.a,{href:`/uilib/about-the-lib/living-system`,children:`Living system`}),` terms.`]}),`
`,(0,n.jsx)(r.h2,{children:`Post CSS`}),`
`,(0,n.jsxs)(r.p,{children:[`Use `,(0,n.jsx)(r.a,{href:`https://github.com/csstools/postcss-preset-env`,children:`postcss-preset-env`}),`. Example `,(0,n.jsx)(r.a,{href:`https://webpack.js.org`,children:`webpack`}),` loader config:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssPresetEnv({
        stage: 0,
        preserve: true,
        browsers: ['extends @dnb/browserslist-config'],
        importFrom: [require.resolve('@dnb/eufemia/style/themes/ui/ui-theme-properties.css')]
      })
    ]
  }
},
`})}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.em,{children:`Notes`}),`: Use `,(0,n.jsx)(r.code,{children:`preserve: true`}),` so we get the calc from vars `,(0,n.jsx)(r.code,{children:`calc(var() + var())`}),`, to get processed for IE later with `,(0,n.jsx)(r.a,{href:`https://github.com/postcss/postcss-calc`,children:`postcss-calc`}),` if this is needed.`]}),`
`,(0,n.jsx)(r.h3,{children:`Post CSS and Create React App`}),`
`,(0,n.jsxs)(r.p,{children:[`Here's an example `,(0,n.jsx)(r.a,{href:`https://codesandbox.io/s/eufemia-scss-polyfill-knfpz?file=/config-overrides.js`,children:`CRA Codesandbox`}),` with `,(0,n.jsx)(r.code,{children:`postcss`}),` config and omit of file hashing.`]}),`
`,(0,n.jsx)(r.h2,{children:`SASS (SCSS) / LESS`}),`
`,(0,n.jsxs)(r.p,{children:[`Use the `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/styling/polyfill#post-css`,children:`Post CSS`}),` method.`]}),`
`,(0,n.jsx)(r.h2,{children:`CSS-in-JS`}),`
`,(0,n.jsxs)(r.p,{children:[`For `,(0,n.jsx)(r.strong,{children:`CSS-in-JS`}),` you can use `,(0,n.jsx)(r.a,{href:`https://github.com/jhildenbiddle/css-vars-ponyfill`,children:`css-vars-ponyfill`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`In your application root:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// import the polyfill (Ponyfill)
import cssVars from 'css-vars-ponyfill'

// run the polyfill
cssVars()
`})}),`
`,(0,n.jsx)(r.h3,{children:`CSS Properties (variables)`}),`
`,(0,n.jsx)(r.p,{children:`You can also import all the main properties as a JavaScript Object:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import properties from '@dnb/eufemia/style/properties'
// properties gives you { '--color-sea-green': '#007272', ... }
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};