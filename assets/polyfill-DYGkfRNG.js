import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Properties Polyfill`}),`
`,(0,r.jsxs)(t.p,{children:[`By using Eufemia properties, like `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/colors`,children:`color names`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/typography`,children:`typography properties`}),`, instead of defining colors and typography directly as hard coded values, you make your code much more readable and future proof in terms of refactoring and new enhancements. `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/maintainability`,children:`Maintainability`}),` is important. But it fits also better in thinking of the `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/living-system`,children:`Living system`}),` terms.`]}),`
`,(0,r.jsx)(t.h2,{children:`Post CSS`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.a,{href:`https://github.com/csstools/postcss-preset-env`,children:`postcss-preset-env`}),`. Example `,(0,r.jsx)(t.a,{href:`https://webpack.js.org`,children:`webpack`}),` loader config:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`{
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
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.em,{children:`Notes`}),`: Use `,(0,r.jsx)(t.code,{children:`preserve: true`}),` so we get the calc from vars `,(0,r.jsx)(t.code,{children:`calc(var() + var())`}),`, to get processed for IE later with `,(0,r.jsx)(t.a,{href:`https://github.com/postcss/postcss-calc`,children:`postcss-calc`}),` if this is needed.`]}),`
`,(0,r.jsx)(t.h3,{children:`Post CSS and Create React App`}),`
`,(0,r.jsxs)(t.p,{children:[`You can configure `,(0,r.jsx)(t.code,{children:`postcss`}),` with omit of file hashing in your Create React App setup.`]}),`
`,(0,r.jsx)(t.h2,{children:`SASS (SCSS) / LESS`}),`
`,(0,r.jsxs)(t.p,{children:[`Use the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/polyfill#post-css`,children:`Post CSS`}),` method.`]}),`
`,(0,r.jsx)(t.h2,{children:`CSS-in-JS`}),`
`,(0,r.jsxs)(t.p,{children:[`For `,(0,r.jsx)(t.strong,{children:`CSS-in-JS`}),` you can use `,(0,r.jsx)(t.a,{href:`https://github.com/jhildenbiddle/css-vars-ponyfill`,children:`css-vars-ponyfill`}),`.`]}),`
`,(0,r.jsx)(t.p,{children:`In your application root:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// import the polyfill (Ponyfill)
import cssVars from 'css-vars-ponyfill'

// run the polyfill
cssVars()
`})}),`
`,(0,r.jsx)(t.h3,{children:`CSS Properties (variables)`}),`
`,(0,r.jsx)(t.p,{children:`You can also import all the main properties as a JavaScript Object:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import properties from '@dnb/eufemia/style/properties'
// properties gives you { '--color-sea-green': '#007272', ... }
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};