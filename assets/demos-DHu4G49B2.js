import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{C as n,S as r,_ as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,u as x,v as S,w as C,x as w,y as T}from"./Examples-D8kd0gBc.js";var E=e();function D(e){let D={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...t(),...e.components},{VisibleWhenNotVisualTest:O,VisibleWhenVisualTest:A}=D;return O||k(`VisibleWhenNotVisualTest`,!0),A||k(`VisibleWhenVisualTest`,!0),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(D.h2,{children:`Demos`}),`
`,(0,E.jsx)(D.h3,{children:`Upload (default)`}),`
`,(0,E.jsx)(h,{}),`
`,(0,E.jsxs)(D.h3,{children:[`Upload `,(0,E.jsx)(D.code,{children:`compact`}),` variant`]}),`
`,(0,E.jsx)(v,{}),`
`,(0,E.jsxs)(D.h3,{children:[(0,E.jsx)(D.code,{children:`useUpload`}),` React Hook`]}),`
`,(0,E.jsxs)(D.p,{children:[`By using the `,(0,E.jsx)(D.code,{children:`Upload.useUpload`}),` you can remove or add files or the status displayed in the component.`]}),`
`,(0,E.jsxs)(D.p,{children:[`You can also use the file blob in combination with the `,(0,E.jsx)(D.a,{href:`https://developer.mozilla.org/en-US/docs/Web/API/File_API`,children:`FileReader`}),` API.`]}),`
`,(0,E.jsx)(n,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload single file/fixed amount of files`}),`
`,(0,E.jsx)(C,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload loading state`}),`
`,(0,E.jsxs)(D.p,{children:[`When uploading the file you can set the loading state of the request using the `,(0,E.jsx)(D.code,{children:`Upload.useUpload`}),` hook and passing `,(0,E.jsx)(D.code,{children:`isLoading`}),` to the file that is being uploaded.`]}),`
`,(0,E.jsx)(i,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload error message`}),`
`,(0,E.jsxs)(D.p,{children:[`The only file verification the Upload component does is for the file size and the file type. These errors are handled by the HTML element `,(0,E.jsx)(D.code,{children:`input`}),` so they are not selectable. If you want any other error messages you can use the `,(0,E.jsx)(D.code,{children:`Upload.useUpload`}),` hook the same way as with the loading state.`]}),`
`,(0,E.jsx)(c,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload specific accepted file formats`}),`
`,(0,E.jsx)(D.p,{children:`You can pass the file formats as a string array. This will restrict which files that can be selected.`}),`
`,(0,E.jsx)(b,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload with prefilled error`}),`
`,(0,E.jsx)(w,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload with file max size based on file type`}),`
`,(0,E.jsxs)(D.p,{children:[`The table of accepted file types is sorted descending by `,(0,E.jsx)(D.code,{children:`maxFileSize`}),`. Multiple `,(0,E.jsx)(D.code,{children:`fileType`}),` for the same `,(0,E.jsx)(D.code,{children:`maxFileSize`}),` is sorted alphabetically ascending by `,(0,E.jsx)(D.code,{children:`fileType`}),`.`]}),`
`,(0,E.jsx)(_,{}),`
`,(0,E.jsxs)(D.p,{children:[`To disable `,(0,E.jsx)(D.code,{children:`maxFileSize`}),` Use either `,(0,E.jsx)(D.code,{children:`0`}),` or `,(0,E.jsx)(D.code,{children:`false`}),`. If `,(0,E.jsx)(D.code,{children:`maxFileSize`}),` is not provided, it defaults to the value of `,(0,E.jsx)(D.a,{href:`/uilib/components/upload/properties/#properties`,children:`Uploads`}),` `,(0,E.jsx)(D.code,{children:`fileMaxSize`}),` which defaults to 5 MB.`]}),`
`,(0,E.jsx)(O,{children:(0,E.jsx)(m,{})}),`
`,(0,E.jsx)(D.h3,{children:`Upload without file max size`}),`
`,(0,E.jsx)(D.p,{children:`You can disable the file max size, which will deactivate all file size verifications in the Upload component.
This can also be used to manually implement more complex file max size verifications.`}),`
`,(0,E.jsx)(x,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload without title and text`}),`
`,(0,E.jsx)(S,{}),`
`,(0,E.jsxs)(D.h3,{children:[`Upload with async `,(0,E.jsx)(D.code,{children:`onFileDelete`})]}),`
`,(0,E.jsx)(o,{}),`
`,(0,E.jsxs)(D.h3,{children:[`Upload with `,(0,E.jsx)(D.code,{children:`onFileClick`})]}),`
`,(0,E.jsx)(T,{}),`
`,(0,E.jsxs)(D.h3,{children:[`Upload programatically clearing files using `,(0,E.jsx)(D.code,{children:`clearFiles `})]}),`
`,(0,E.jsx)(f,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload with file description`}),`
`,(0,E.jsx)(y,{}),`
`,(0,E.jsx)(D.h3,{children:`Upload with file without delete button`}),`
`,(0,E.jsx)(r,{}),`
`,(0,E.jsxs)(A,{children:[(0,E.jsx)(l,{}),(0,E.jsx)(p,{}),(0,E.jsx)(u,{}),(0,E.jsx)(d,{}),(0,E.jsx)(s,{}),(0,E.jsx)(g,{}),(0,E.jsx)(a,{})]})]})}function O(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,E.jsx)(n,{...e,children:(0,E.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};