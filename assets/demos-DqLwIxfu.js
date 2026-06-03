import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import{C as r,S as i,_ as a,a as o,b as s,c,d as l,f as u,g as d,h as f,i as p,l as m,m as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S,v as C,w,x as T,y as E}from"./Examples-DxAlT73P.js";var D=e(t());function O(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components},{VisibleWhenNotVisualTest:O,VisibleWhenVisualTest:k}=t;return O||A(`VisibleWhenNotVisualTest`,!0),k||A(`VisibleWhenVisualTest`,!0),(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(t.h2,{children:`Demos`}),`
`,(0,D.jsx)(t.h3,{children:`Upload (default)`}),`
`,(0,D.jsx)(g,{}),`
`,(0,D.jsxs)(t.h3,{children:[`Upload `,(0,D.jsx)(t.code,{children:`compact`}),` variant`]}),`
`,(0,D.jsx)(y,{}),`
`,(0,D.jsxs)(t.h3,{children:[(0,D.jsx)(t.code,{children:`useUpload`}),` React Hook`]}),`
`,(0,D.jsxs)(t.p,{children:[`By using the `,(0,D.jsx)(t.code,{children:`Upload.useUpload`}),` you can remove or add files or the status displayed in the component.`]}),`
`,(0,D.jsxs)(t.p,{children:[`You can also use the file blob in combination with the `,(0,D.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/API/File_API`,children:`FileReader`}),` API.`]}),`
`,(0,D.jsx)(r,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload single file/fixed amount of files`}),`
`,(0,D.jsx)(w,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload loading state`}),`
`,(0,D.jsxs)(t.p,{children:[`When uploading the file you can set the loading state of the request using the `,(0,D.jsx)(t.code,{children:`Upload.useUpload`}),` hook and passing `,(0,D.jsx)(t.code,{children:`isLoading`}),` to the file that is being uploaded.`]}),`
`,(0,D.jsx)(a,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload error message`}),`
`,(0,D.jsxs)(t.p,{children:[`The only file verification the Upload component does is for the file size and the file type. These errors are handled by the HTML element `,(0,D.jsx)(t.code,{children:`input`}),` so they are not selectable. If you want any other error messages you can use the `,(0,D.jsx)(t.code,{children:`Upload.useUpload`}),` hook the same way as with the loading state.`]}),`
`,(0,D.jsx)(l,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload specific accepted file formats`}),`
`,(0,D.jsx)(t.p,{children:`You can pass the file formats as a string array. This will restrict which files that can be selected.`}),`
`,(0,D.jsx)(x,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload with prefilled error`}),`
`,(0,D.jsx)(T,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload with file max size based on file type`}),`
`,(0,D.jsxs)(t.p,{children:[`The table of accepted file types is sorted descending by `,(0,D.jsx)(t.code,{children:`maxFileSize`}),`. Multiple `,(0,D.jsx)(t.code,{children:`fileType`}),` for the same `,(0,D.jsx)(t.code,{children:`maxFileSize`}),` is sorted alphabetically ascending by `,(0,D.jsx)(t.code,{children:`fileType`}),`.`]}),`
`,(0,D.jsx)(v,{}),`
`,(0,D.jsxs)(t.p,{children:[`To disable `,(0,D.jsx)(t.code,{children:`maxFileSize`}),` Use either `,(0,D.jsx)(t.code,{children:`0`}),` or `,(0,D.jsx)(t.code,{children:`false`}),`. If `,(0,D.jsx)(t.code,{children:`maxFileSize`}),` is not provided, it defaults to the value of `,(0,D.jsx)(t.a,{href:`/uilib/components/upload/properties/#properties`,children:`Uploads`}),` `,(0,D.jsx)(t.code,{children:`fileMaxSize`}),` which defaults to 5 MB.`]}),`
`,(0,D.jsx)(O,{children:(0,D.jsx)(h,{})}),`
`,(0,D.jsx)(t.h3,{children:`Upload without file max size`}),`
`,(0,D.jsx)(t.p,{children:`You can disable the file max size, which will deactivate all file size verifications in the Upload component.
This can also be used to manually implement more complex file max size verifications.`}),`
`,(0,D.jsx)(S,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload without title and text`}),`
`,(0,D.jsx)(C,{}),`
`,(0,D.jsxs)(t.h3,{children:[`Upload with async `,(0,D.jsx)(t.code,{children:`onFileDelete`})]}),`
`,(0,D.jsx)(s,{}),`
`,(0,D.jsxs)(t.h3,{children:[`Upload with `,(0,D.jsx)(t.code,{children:`onFileClick`})]}),`
`,(0,D.jsx)(E,{}),`
`,(0,D.jsxs)(t.h3,{children:[`Upload programmatically clearing files using `,(0,D.jsx)(t.code,{children:`clearFiles `})]}),`
`,(0,D.jsx)(p,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload with file description`}),`
`,(0,D.jsx)(b,{}),`
`,(0,D.jsx)(t.h3,{children:`Upload with file without delete button`}),`
`,(0,D.jsx)(i,{}),`
`,(0,D.jsxs)(k,{children:[(0,D.jsx)(u,{}),(0,D.jsx)(m,{}),(0,D.jsx)(d,{}),(0,D.jsx)(f,{}),(0,D.jsx)(c,{}),(0,D.jsx)(_,{}),(0,D.jsx)(o,{})]})]})}function k(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,D.jsx)(t,{...e,children:(0,D.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};