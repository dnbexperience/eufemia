"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[67218],{29582:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var l={};t.r(l),t.d(l,{BasicUsage:function(){return d},Customized:function(){return m},Required:function(){return u},SessionStorage:function(){return x},WithAsyncFileHandler:function(){return h},WithAsyncOnFileClick:function(){return y},WithAsyncOnFileDelete:function(){return F},WithHelp:function(){return p},WithPath:function(){return f},WithSyncFileHandler:function(){return g}});var i=t(52322),o=t(45392),a=t(41404),s=t(36210),r=t(38265),c=t(34674);const d=()=>(0,i.jsx)(a.Z,{children:'<Form.Handler>\n  <Field.Upload\n    label="My custom label"\n    labelDescription="My description"\n  />\n</Form.Handler>\n'}),u=()=>(0,i.jsx)(a.Z,{children:"<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>\n  <Flex.Stack>\n    <Field.Upload path=\"/myFiles\" required />\n    <Form.SubmitButton />\n  </Flex.Stack>\n</Form.Handler>\n"}),p=()=>(0,i.jsx)(a.Z,{children:"<Field.Upload\n  help={{\n    title: 'Help title',\n    content: 'Help content',\n  }}\n/>\n"}),m=()=>(0,i.jsx)(a.Z,{"data-visual-test":"upload-field-customized",children:'<Field.Upload\n  title="My custom title"\n  text="My text with a help button"\n  width="large"\n  help={{\n    title: \'Help title\',\n    content: \'Help content\',\n    open: true,\n  }}\n  warning="Warning message"\n  acceptedFileTypes={[\'pdf\']}\n  filesAmountLimit={1}\n  fileMaxSize={1}\n/>\n'}),f=()=>(0,i.jsx)(a.Z,{scope:{createMockFile:s.lb},children:"<Form.Handler\n  onChange={(data) => console.log('onChange', data)}\n  data={{\n    myFiles: [\n      {\n        file: createMockFile('fileName-1.png', 100, 'image/png'),\n      },\n    ],\n  }}\n>\n  <Field.Upload path=\"/myFiles\" />\n</Form.Handler>\n"}),h=()=>(0,i.jsx)(a.Z,{scope:{createRequest:c.createRequest,useUpload:r.Z},noInline:!0,children:"const MyForm = () => {\n  return (\n    <Form.Handler onSubmit={async (form) => console.log(form)}>\n      <Flex.Stack>\n        <Field.Upload\n          path=\"/attachments\"\n          labelDescription=\"Upload multiple files at once to see the upload error message. This demo has been set up so that every other file in a batch will fail.\"\n          fileHandler={mockAsyncFileUpload}\n          required\n        />\n        <Form.SubmitButton />\n        <Tools.Log />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nasync function mockAsyncFileUpload(\n  newFiles: UploadValue,\n): Promise<UploadValue> {\n  const updatedFiles: UploadValue = []\n  for (const [, file] of Object.entries(newFiles)) {\n    const formData = new FormData()\n    formData.append('file', file.file, file.file.name)\n    const request = createRequest()\n    await request(Math.floor(Math.random() * 2000) + 1000) // Simulate a request\n\n    try {\n      const mockResponse = {\n        ok: false,\n        // Fails virus check\n        json: async () => ({\n          server_generated_id: file.file.name + '_' + crypto.randomUUID(),\n        }),\n      }\n      if (!mockResponse.ok) {\n        throw new Error('Unable to upload this file')\n      }\n      const data = await mockResponse.json()\n      updatedFiles.push({\n        ...file,\n        id: data.server_generated_id,\n      })\n    } catch (error) {\n      updatedFiles.push({\n        ...file,\n        errorMessage: error.message,\n      })\n    }\n  }\n  return updatedFiles\n}\nrender(<MyForm />)\n"}),g=()=>(0,i.jsx)(a.Z,{scope:{createRequest:c.createRequest,useUpload:r.Z},noInline:!0,children:"const MyForm = () => {\n  return (\n    <Form.Handler onSubmit={async (form) => console.log(form)}>\n      <Flex.Stack>\n        <Field.Upload\n          path=\"/myattachments\"\n          fileHandler={mockSyncFileUpload}\n          required\n        />\n        <Form.SubmitButton />\n        <Tools.Log />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nfunction mockSyncFileUpload(newFiles: UploadValue) {\n  return newFiles.map((file) => {\n    if (file.file.name.length > 5) {\n      file.errorMessage = 'File name is too long'\n    }\n    return file\n  })\n}\nrender(<MyForm />)\n"}),F=()=>(0,i.jsx)(a.Z,{scope:{createRequest:c.createRequest},noInline:!0,children:"async function mockAsyncFileRemoval({ fileItem }) {\n  const request = createRequest()\n  console.log('making API request to remove: ' + fileItem.file.name)\n  await request(3000) // Simulate a request\n  const mockResponse = {\n    successful_removal: Math.random() < 0.5, // Randomly fails to remove the file\n  }\n\n  if (!mockResponse.successful_removal) {\n    throw new Error('Unable to remove this file')\n  }\n}\nrender(\n  <Field.Upload\n    onFileDelete={mockAsyncFileRemoval}\n    acceptedFileTypes={['jpg', 'png']}\n  />,\n)\n"}),y=()=>(0,i.jsx)(a.Z,{scope:{createRequest:c.createRequest,createMockFile:s.lb},noInline:!0,children:"async function mockAsyncFileClick({ fileItem }) {\n  const request = createRequest()\n  console.log(\n    'making API request to fetch the url of the file: ' +\n      fileItem.file.name,\n  )\n  await request(2000) // Simulate a request\n  window.open(\n    'https://eufemia.dnb.no/images/avatars/' + fileItem.file.name,\n    '_blank',\n  )\n}\nrender(\n  <Form.Handler\n    data={{\n      myFiles: [\n        {\n          file: createMockFile('1501870.jpg', 100, 'image/png'),\n          id: '1',\n        },\n      ],\n    }}\n  >\n    <Field.Upload path=\"/myFiles\" onFileClick={mockAsyncFileClick} />\n  </Form.Handler>,\n)\n"});function x(){return(0,i.jsx)(a.Z,{children:'<Form.Handler sessionStorageId="documents">\n  <Flex.Stack>\n    <Form.Card>\n      <Field.Upload path="/documents" />\n      <Value.Upload\n        path="/documents"\n        label="Uploaded files"\n        placeholder="No files uploaded."\n        variant="ol"\n        showEmpty\n      />\n    </Form.Card>\n\n    <Form.SubmitButton />\n    <Tools.Log />\n  </Flex.Stack>\n</Form.Handler>\n'})}function j(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,o.ah)(),e.components);return l||k("Examples",!1),d||k("Examples.BasicUsage",!0),m||k("Examples.Customized",!0),u||k("Examples.Required",!0),x||k("Examples.SessionStorage",!0),h||k("Examples.WithAsyncFileHandler",!0),y||k("Examples.WithAsyncOnFileClick",!0),F||k("Examples.WithAsyncOnFileDelete",!0),p||k("Examples.WithHelp",!0),f||k("Examples.WithPath",!0),g||k("Examples.WithSyncFileHandler",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:"Demos"}),"\n",(0,i.jsx)(n.h3,{children:"Basic usage"}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(n.h3,{children:"Required"}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(n.h3,{children:"Path usage"}),"\n",(0,i.jsx)(f,{}),"\n",(0,i.jsx)(n.h3,{children:"With help"}),"\n",(0,i.jsx)(p,{}),"\n",(0,i.jsx)(n.h3,{children:"Customized"}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(n.h3,{children:"Session storage support"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"sessionStorageId"})," property can be used to store the files in the session storage so they persist between page reloads."]}),"\n",(0,i.jsx)(x,{}),"\n",(0,i.jsx)(n.h3,{children:"With asynchronous file handler"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"fileHandler"})," property supports an asynchronous function, and can be used for handling/validating files asynchronously, like to upload files to a virus checker and display errors based on the outcome:"]}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(n.h3,{children:"With synchronous file handler"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"fileHandler"})," property supports a synchronous function, and can be used for handling/validating files synchronously, like to check for file names that's too long:"]}),"\n",(0,i.jsx)(g,{}),"\n",(0,i.jsxs)(n.h3,{children:["With asynchronous ",(0,i.jsx)(n.code,{children:"onFileDelete"})]}),"\n",(0,i.jsx)(F,{}),"\n",(0,i.jsxs)(n.h3,{children:["With asynchronous ",(0,i.jsx)(n.code,{children:"onFileClick"})]}),"\n",(0,i.jsx)(y,{})]})}var b=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(j,e)})):j(e)};function k(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},36210:function(e,n,t){t.d(n,{Gz:function(){return d},KN:function(){return p},KW:function(){return u},Lq:function(){return c},OV:function(){return f},Q6:function(){return y},QO:function(){return r},Qb:function(){return g},av:function(){return F},ez:function(){return s},g_:function(){return m},lb:function(){return a},sM:function(){return x},zV:function(){return h}});t(2784);var l=t(41404),i=t(34674),o=t(52322);function a(e,n,t){const l=new File([],e,{type:t});return Object.defineProperty(l,"size",{get(){return n}}),l}const s=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-file-list",scope:{createMockFile:a},noInline:!0,children:"const Component = () => {\n  const { files, setFiles } = Upload.useUpload('file-list')\n  if (files.length) {\n    console.log('files', files)\n  }\n  React.useEffect(() => {\n    setFiles([\n      {\n        file: createMockFile('fileName.png', 123, 'image/png'),\n        errorMessage: 'This is no real file!',\n      },\n    ])\n  }, [setFiles])\n  return <Upload acceptedFileTypes={['jpg', 'png']} id=\"file-list\" />\n}\nrender(<Component />)\n"}),r=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-basic",children:"<Upload acceptedFileTypes={['jpg', 'png']} />\n"}),c=()=>(0,o.jsx)(l.Z,{noInline:!0,children:"const Component = () => {\n  const { files, setFiles } = Upload.useUpload('upload-single-file')\n  if (files.length) {\n    console.log('files', files, setFiles)\n  }\n  return (\n    <Upload\n      acceptedFileTypes={['jpg', 'png']}\n      id=\"upload-single-file\"\n      filesAmountLimit={1}\n    />\n  )\n}\nrender(<Component />)\n"}),d=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-remove-files",noInline:!0,children:"const Component = () => {\n  const myUploadId = 'unique-id' // or a function, object or React Context reference.\n  const { files, setFiles } = Upload.useUpload(myUploadId) // id is needed when wanting to connect with the useUpload hook.\n\n  return (\n    <>\n      <Upload acceptedFileTypes={['jpg', 'png']} id={myUploadId} />\n\n      <Button\n        top=\"small\"\n        disabled={files.length < 1}\n        onClick={() => setFiles([])}\n      >\n        Remove selected files\n      </Button>\n\n      <Preview files={files} />\n    </>\n  )\n  function Preview({ files }) {\n    const [images, setImages] = React.useState([])\n    React.useEffect(() => {\n      files.map(({ file }) => {\n        let reader = new FileReader()\n        reader.addEventListener(\n          'load',\n          (event) => {\n            images.push({\n              blob: event.target,\n              file,\n            })\n            setImages([...images])\n            reader = null\n          },\n          false,\n        )\n        reader.readAsDataURL(file)\n      })\n    }, [files, images])\n    return (\n      <Section aria-label=\"List of chosen images\">\n        {images.map((img, i) => (\n          <Img\n            top\n            key={i}\n            src={img.blob.result}\n            alt={img.file.name}\n            height={100}\n          />\n        ))}\n      </Section>\n    )\n  }\n}\nrender(<Component />)\n"}),u=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-is-loading",scope:{createMockFile:a},noInline:!0,children:"const Component = () => {\n  const { files, setFiles } = Upload.useUpload('upload-is-loading')\n  React.useEffect(() => {\n    setFiles([\n      {\n        file: createMockFile('fileName.png', 123, 'image/png'),\n        isLoading: true,\n      },\n    ])\n  }, [])\n  return (\n    <>\n      <Upload acceptedFileTypes={['jpg', 'png']} id=\"upload-is-loading\" />\n      <ToggleButton\n        top=\"small\"\n        disabled={files.length < 1}\n        on_change={({ checked }) =>\n          setFiles(\n            files.map((fileItem) => {\n              return {\n                ...fileItem,\n                isLoading: checked,\n              }\n            }),\n          )\n        }\n      >\n        Files is loading toggle\n      </ToggleButton>\n    </>\n  )\n}\nrender(<Component />)\n"}),p=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-error-message",noInline:!0,children:"const Component = () => {\n  const { files, setFiles } = Upload.useUpload('upload-error-message')\n  return (\n    <>\n      <Upload\n        acceptedFileTypes={['jpg', 'png']}\n        id=\"upload-error-message\"\n      />\n      <ToggleButton\n        top=\"small\"\n        disabled={files.length < 1}\n        on_change={({ checked }) => {\n          setFiles(\n            files.map((fileItem) => {\n              return {\n                ...fileItem,\n                errorMessage: checked ? 'custom error message' : null,\n              }\n            }),\n          )\n        }}\n      >\n        Toggle error message\n      </ToggleButton>\n    </>\n  )\n}\nrender(<Component />)\n"}),m=()=>(0,o.jsx)(l.Z,{noInline:!0,children:"const Component = () => {\n  const { files, setFiles } = Upload.useUpload('upload-accepted-formats')\n  if (files.length) {\n    console.log('files', files, setFiles)\n  }\n  return (\n    <Upload\n      acceptedFileTypes={['png', 'jpg', 'pdf']}\n      id=\"upload-accepted-formats\"\n    />\n  )\n}\nrender(<Component />)\n"}),f=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-file-max-size-based-on-file-format",hideCode:!0,children:"<Upload\n  fileMaxSize={99}\n  acceptedFileTypes={[\n    {\n      fileType: 'jpg',\n      fileMaxSize: 1,\n    },\n    {\n      fileType: 'doc',\n      fileMaxSize: 1,\n    },\n    {\n      fileType: 'svg',\n      fileMaxSize: 1,\n    },\n    {\n      fileType: 'gif',\n      fileMaxSize: 1,\n    },\n    {\n      fileType: 'doc',\n      fileMaxSize: 4,\n    },\n    {\n      fileType: 'docx',\n      fileMaxSize: 4,\n    },\n    {\n      fileType: 'tiff',\n      fileMaxSize: 5,\n    },\n    {\n      fileType: 'tif',\n      fileMaxSize: 5,\n    },\n    {\n      fileType: 'html',\n      fileMaxSize: 6,\n    },\n    {\n      fileType: 'htm',\n      fileMaxSize: 6,\n    },\n    {\n      fileType: 'xls',\n      fileMaxSize: 7,\n    },\n    {\n      fileType: 'xlsx',\n      fileMaxSize: 7,\n    },\n    {\n      fileType: 'odt',\n    },\n    {\n      fileType: 'pdf',\n    },\n    {\n      fileType: 'text',\n      fileMaxSize: false,\n    },\n    {\n      fileType: 'txt',\n      fileMaxSize: 0,\n    },\n    {\n      fileType: 'zip',\n      fileMaxSize: 99,\n    },\n  ]}\n/>\n"}),h=()=>(0,o.jsx)(l.Z,{children:"<Upload\n  acceptedFileTypes={[\n    {\n      fileType: 'jpg',\n      fileMaxSize: 0,\n    },\n    {\n      fileType: 'doc',\n      fileMaxSize: false,\n    },\n    {\n      fileType: 'svg',\n    },\n  ]}\n/>\n"}),g=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-disabled-file-max-size",children:"<Upload acceptedFileTypes={['jpg', 'pdf']} fileMaxSize={false} />\n"}),F=()=>(0,o.jsx)(l.Z,{"data-visual-test":"upload-no-title-no-text",children:"<Upload title={false} text={false} acceptedFileTypes={['jpg', 'png']} />\n"}),y=()=>(0,o.jsx)(l.Z,{scope:{createRequest:i.createRequest},noInline:!0,children:"async function mockAsyncFileRemoval({ fileItem }) {\n  const request = createRequest()\n  console.log('making API request to remove: ' + fileItem.file.name)\n  await request(3000) // Simulate a request\n  const mockResponse = {\n    successful_removal: Math.random() < 0.5, // Randomly fails to remove the file\n  }\n\n  if (!mockResponse.successful_removal) {\n    throw new Error('Unable to remove this file')\n  }\n}\nrender(\n  <Upload\n    onFileDelete={mockAsyncFileRemoval}\n    acceptedFileTypes={['jpg', 'png']}\n  />,\n)\n"}),x=()=>(0,o.jsx)(l.Z,{scope:{createMockFile:a,createRequest:i.createRequest},"data-visual-test":"upload-on-file-click",noInline:!0,children:"const Component = () => {\n  const { setFiles } = Upload.useUpload('upload-on-file-click')\n  React.useEffect(() => {\n    setFiles([\n      {\n        file: createMockFile('1501870.jpg', 123, 'image/png'),\n        id: '1',\n      },\n      {\n        file: createMockFile(\n          'file-name-that-is-very-long-and-has-letters.png',\n          123,\n          'image/png',\n        ),\n        id: '2',\n      },\n    ])\n  }, [setFiles])\n  async function mockAsyncFileFetching({ fileItem }) {\n    const request = createRequest()\n    console.log(\n      'making API request to fetch the url of the file: ' +\n        fileItem.file.name,\n    )\n    await request(2000) // Simulate a request\n    window.open(\n      'https://eufemia.dnb.no/images/avatars/' + fileItem.file.name,\n      '_blank',\n    )\n  }\n  return (\n    <Upload\n      acceptedFileTypes={['jpg', 'png']}\n      id=\"upload-on-file-click\"\n      onFileClick={mockAsyncFileFetching}\n    />\n  )\n}\nrender(<Component />)\n"})},34674:function(e,n,t){t.r(n),t.d(n,{AsyncChangeBehavior:function(){return r},AsyncSubmitBehavior:function(){return s},Default:function(){return a},WithinALabel:function(){return u},WithinOtherComponents:function(){return d},createRequest:function(){return c}});var l=t(41404),i=t(52750),o=t(52322);const a=()=>(0,o.jsx)(l.Z,{children:'<Form.SubmitIndicator state="pending" />\n'}),s=()=>(0,o.jsx)(l.Z,{scope:{createRequest:c,debounceAsync:i.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay}>\n    <Form.Card>\n      <Field.String path="/myField" label="Short label" />\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Form.Card>\n  </Form.Handler>,\n)\n'}),r=()=>(0,o.jsx)(l.Z,{scope:{createRequest:c,debounceAsync:i.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay} onChange={delay}>\n    <Form.Card>\n      <Field.String\n        path="/myField1"\n        label="Label (with async validation)"\n        placeholder="Write something ..."\n        onChangeValidator={delay}\n      />\n      <FieldBlock width="medium">\n        <Field.String\n          path="/myField2"\n          width="stretch"\n          label="This is a long label"\n        />\n      </FieldBlock>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Form.Card>\n  </Form.Handler>,\n)\n'}),c=()=>{let e,n;const t=t=>new Promise((l=>{n=l,e=setTimeout((()=>{l({hasError:!1})}),t)}));return t.cancel=()=>{var t;null===(t=n)||void 0===t||t({hasError:!0}),clearTimeout(e),e=null},t},d=()=>(0,o.jsx)(l.Z,{children:'<Form.Handler>\n  <Flex.Horizontal align="center">\n    <Form.SubmitButton showIndicator />\n    <Button variant="secondary" icon="chevron_right">\n      Secondary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <Button variant="tertiary">\n      Tertiary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <FormLabel>\n      Label\n      <Form.SubmitIndicator state="pending" />\n    </FormLabel>\n  </Flex.Horizontal>\n</Form.Handler>\n'}),u=()=>(0,o.jsx)(l.Z,{"data-visual-test":"submit-indicator-with-label",children:'<Form.Handler>\n  <Form.SubmitIndicator state="pending" showLabel />\n</Form.Handler>\n'})}}]);
//# sourceMappingURL=631f57192054c67d9a3beba410fec58a29454165-9fce5f9de6b08aaa511b.js.map