import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CarlvxZI2.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Upload } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Upload component should be used in scenarios where the user has to upload any kind of files.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=23118-25104`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/upload`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/upload`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`How to use the Upload component`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Files selected by the user should be uploaded immediately to a temporary location.`}),`
`,(0,r.jsx)(n.li,{children:`The user should be able to remove files during the session.`}),`
`,(0,r.jsxs)(n.li,{children:[`The Upload component connects to the `,(0,r.jsx)(n.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` and displays file error messages there.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Validation messages from the backend should be displayed for each file via the `,(0,r.jsx)(n.code,{children:`useUpload`}),` hook. See the `,(0,r.jsx)(n.a,{href:`/uilib/components/upload/#upload-error-message`,children:`example`}),` below.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The `,(0,r.jsx)(n.code,{children:`useUpload`}),` hook can be placed in any location in your application, and does not need to be where the `,(0,r.jsx)(n.code,{children:`Upload`}),` component is used.`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`function YourComponent() {
  const myUploadId = 'unique-id' // or a function, object or React Context reference
  const { files, setFiles } = Upload.useUpload(myUploadId)

  React.useEffect(() => {
    setFiles(
      files.map((fileItem) => {
        if (fileItem.file.name === fileNameFromBackend) {
          fileItem.errorMessage = 'Your message from the backend'
        }
        return fileItem
      })
    )
  }, [fileNameFromBackend])

  return <Upload id={myUploadId} />
}
`})}),`
`,(0,r.jsxs)(n.h2,{children:[(0,r.jsx)(n.code,{children:`useUpload`}),` hook`]}),`
`,(0,r.jsx)(n.p,{children:`Exposes the following functionality:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`files`}),`: The given files of the Upload component.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`setFiles`}),`: A function to set the files of the Upload component.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`clearFiles`}),`: A function to clear the files of the Upload component. It can be useful when you want to programmatically clear the files of the Upload component at a given time.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Variant compact`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`compact`}),` variant displays less information than the `,(0,r.jsx)(n.code,{children:`default`}),` variant and aims to display only what's necessary for the user to upload a file:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Upload button`}),`
`,(0,r.jsx)(n.li,{children:`List of uploaded files`}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`title`}),` as label (can be removed by providing the value `,(0,r.jsx)(n.code,{children:`false`}),`)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`text`}),` as sublabel (can be removed by providing the value `,(0,r.jsx)(n.code,{children:`false`}),`)`]}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`It does not display information about:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`filesAmountLimit`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`fileMaxSize`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`acceptedFileTypes`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`JPG vs JPEG`}),`
`,(0,r.jsxs)(n.p,{children:[`When `,(0,r.jsx)(n.code,{children:`jpg`}),` is defined (most commonly used), the component will also accept `,(0,r.jsx)(n.code,{children:`jpeg`}),` files.`]}),`
`,(0,r.jsx)(n.h2,{children:`Backend integration`}),`
`,(0,r.jsx)(n.p,{children:`The backend receiving the files is decoupled and can be any existing or new system.`}),`
`,(0,r.jsx)(n.h2,{children:`Limit the amount of files`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the Upload component accepts multiple files. You can use the property `,(0,r.jsx)(n.code,{children:`filesAmountLimit={1}`}),` to make the component accept only one file.`]}),`
`,(0,r.jsx)(n.h2,{children:`Page-wide drop support`}),`
`,(0,r.jsx)(n.p,{children:`Once the Upload component mounts, it also adds support for dropping files to the entire browser body.`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` When you have several mounted components, only the first Upload component will receive the dropped files.`]}),`
`,(0,r.jsxs)(n.h2,{children:[`The `,(0,r.jsx)(n.code,{children:`download`}),` property`]}),`
`,(0,r.jsx)(n.p,{children:`Each file item is displayed as a clickable link with its original file name, which opens the file source in a new browser tab.`}),`
`,(0,r.jsxs)(n.p,{children:[`In some situations, it's more suitable to have each link download the file instead of opening it in a new browser tab. To achieve this, set the `,(0,r.jsx)(n.code,{children:`download={true}`}),` property on the Upload component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Prevents uploading duplicate files`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the Upload component prevents uploading duplicate files. It determines if a file is a duplicate if the file's `,(0,r.jsx)(n.code,{children:`name`}),`, `,(0,r.jsx)(n.code,{children:`size`}),` (if existing), and `,(0,r.jsx)(n.code,{children:`lastModified`}),` (if existing) values are equal. You can use the property `,(0,r.jsx)(n.code,{children:`allowDuplicates={true}`}),` to allow duplicate files.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};