"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[33989,8936],{49440:function(e,n,r){r.r(n);var a=r(52322),s=r(45392),i=r(79273),t=r(29582);function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{}),"\n",(0,a.jsx)(t.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(l,e)})):l()}},79273:function(e,n,r){r.r(n);var a=r(52322),s=r(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre",h3:"h3"},(0,s.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Description"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"Field.Upload"})," is a wrapper for the ",(0,a.jsx)(n.a,{href:"/uilib/components/upload/",children:"Upload"})," component to make it easier to use inside a form."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.Upload />)\n"})}),"\n",(0,a.jsxs)(n.p,{children:["There is a corresponding ",(0,a.jsx)(n.a,{href:"/uilib/extensions/forms/Value/Upload",children:"Value.Upload"})," component."]}),"\n",(0,a.jsx)(n.h2,{children:"The data and file format"}),"\n",(0,a.jsx)(n.p,{children:"The returned data is an array of objects containing a file object and a unique ID. The file object contains the file itself and some additional properties like an unique ID."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:"{\n  id: '1234',\n  file: {\n    name: 'file1.jpg',\n    size: 1234,\n    type: 'image/jpeg',\n  },\n  errorMessage: 'error message ...',\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["This data format will be returned by the ",(0,a.jsx)(n.code,{children:"onChange"})," and the ",(0,a.jsx)(n.code,{children:"onSubmit"})," event handlers."]}),"\n",(0,a.jsx)(n.h2,{children:"Validation"}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"required"})," property will validate if there are valid files present. If there are files with an error, the validation will fail."]}),"\n",(0,a.jsxs)(n.p,{children:["If there are invalid files, the ",(0,a.jsx)(n.code,{children:"onSubmit"})," event will not be called and a validation error will be shown."]}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"onChange"})," event handler will return an array with objects containing the file object and some additional properties – regardless of the validity of the file."]}),"\n",(0,a.jsxs)(n.p,{children:["For error handling of invalid files, you can refer to the ",(0,a.jsx)(n.a,{href:"/uilib/components/upload/",children:"Upload"})," component for more details."]}),"\n",(0,a.jsxs)(n.h2,{children:["About the ",(0,a.jsx)(n.code,{children:"value"})," and ",(0,a.jsx)(n.code,{children:"path"})," property"]}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"path"})," property represents an array with an object described above:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:'render(\n  <Form.Handler defaultData={{ myFiles: files }}>\n    <Field.Upload path="/myFiles" />\n  </Form.Handler>,\n)\n'})}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"value"})," property represents an array with an object described above:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:"render(<Field.Upload value={files} />)\n"})}),"\n",(0,a.jsxs)(n.h2,{children:["About the ",(0,a.jsx)(n.code,{children:"fileHandler"})," property"]}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"fileHandler"})," is a handler function that supports both an asynchronous and synchronous function. It takes newly added files as a parameter and returns processed files (a promise when asynchronous).\nThe component will automatically handle asynchronous loading states during the upload process. This feature is useful for tasks like uploading files to a virus checker, which returns a new file ID if the file passes the check. To indicate a failed upload, set the ",(0,a.jsx)(n.code,{children:"errorMessage"})," on the specific file object with the desired message to display next to the file in the upload list."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"async function virusCheck(newFiles) {\n  const promises = newFiles.map(async (file) => {\n    const formData = new FormData()\n    formData.append('file', file.file, file.file.name)\n\n    return await fetch('/', { method: 'POST', body: formData })\n      .then((response) => {\n        if (response.ok) return response.json()\n        throw new Error('Unable to upload this file')\n      })\n      .then((data) => {\n        return {\n          ...file,\n          id: data.server_generated_id,\n        }\n      })\n      .catch((error) => {\n        return {\n          ...file,\n          errorMessage: error.message,\n        }\n      })\n  })\n\n  return await Promise.all(promises)\n}\n"})}),"\n",(0,a.jsx)(n.h3,{children:"TransformIn and TransformOut"}),"\n",(0,a.jsxs)(n.p,{children:["You can use the ",(0,a.jsx)(n.code,{children:"transformIn"})," and ",(0,a.jsx)(n.code,{children:"transformOut"})," properties to transform the data from the internal format to the external format and vice versa."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:"import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'\nimport type {\n  UploadValue,\n  UploadFileNative,\n} from '@dnb/eufemia/extensions/forms/Field/Upload'\n\n// Our external format\ntype DocumentMetadata = {\n  id: string\n  fileName: string\n}\n\nconst defaultValue = [\n  {\n    id: '1234',\n    fileName: 'myFile.pdf',\n  },\n] satisfies DocumentMetadata[] as unknown as UploadValue\n\nconst filesCache = new Map<string, File>()\n\n// To the Field (from e.g. defaultValue)\nconst transformIn = (external?: DocumentMetadata[]) => {\n  return (\n    external?.map(({ id, fileName }) => {\n      const file: File =\n        filesCache.get(id) ||\n        new File([], fileName, { type: 'images/png' })\n\n      return { id, file }\n    }) || []\n  )\n}\n\n// From the Field (internal value) to the data context or event parameter\nconst transformOut = (internal?: UploadValue) => {\n  return (\n    internal?.map(({ id, file }) => {\n      if (!filesCache.has(id)) {\n        filesCache.set(id, file)\n      }\n\n      return { id, fileName: file.name }\n    }) || []\n  )\n}\n\nfunction MyForm() {\n  return (\n    <Form.Handler>\n      <Field.Upload\n        path=\"/documents\"\n        transformIn={transformIn}\n        transformOut={transformOut}\n        defaultValue={defaultValue}\n      />\n\n      <Tools.Log />\n    </Form.Handler>\n  )\n}\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(i,e)})):i(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-more-fields-upload-mdx-5f5fe95e1b79f446eb92.js.map