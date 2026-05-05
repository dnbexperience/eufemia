import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{gn as r}from"./index-CMgyXmp3.js";import{s as i}from"./Examples-DcqJXyuQ.js";e();var a=t();function o(e,t,n){if(typeof window>`u`||!window?.File)return;let r=new File([],e,{type:n});return Object.defineProperty(r,`size`,{get(){return t}}),r}var s=()=>(0,a.jsx)(n,{"data-visual-test":`upload-file-list`,scope:{createMockFile:o},noInline:!0,children:`const Component = () => {
  const { files, setFiles } = Upload.useUpload('file-list')
  if (files.length) {
    console.log('files', files)
  }
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName.png', 123, 'image/png'),
        errorMessage: 'This is no real file!',
      },
    ])
  }, [setFiles])
  return <Upload acceptedFileTypes={['jpg', 'png']} id="file-list" />
}
render(<Component />)
`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`upload-basic`,children:`<Upload
  acceptedFileTypes={['jpg', 'png']}
  onChange={({ files }) => console.log('onChange', files)}
/>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`upload-basic-compact-variant`,children:`<Upload
  variant="compact"
  acceptedFileTypes={['jpg', 'png']}
  onChange={({ files }) => console.log('onChange', files)}
/>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`upload-basic-compact-variant-without-labels`,children:`<Upload
  variant="compact"
  acceptedFileTypes={['jpg', 'png']}
  title={false}
  text={false}
  onChange={({ files }) => console.log('onChange', files)}
/>
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`upload-disabled`,children:`<Upload
  acceptedFileTypes={['jpg', 'png']}
  disabled
  onChange={({ files }) => console.log('onChange', files)}
/>
`}),f=()=>(0,a.jsx)(n,{noInline:!0,children:`const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-single-file')
  if (files.length) {
    console.log('files', files, setFiles)
  }
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-single-file"
      filesAmountLimit={1}
    />
  )
}
render(<Component />)
`}),p=()=>(0,a.jsx)(n,{scope:{createMockFile:o},"data-visual-test":`upload-files-amount-message`,noInline:!0,children:`const Component = () => {
  const { setInternalFiles, setFiles } = Upload.useUpload(
    'upload-files-amount-message'
  )
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
      },
    ])
    setInternalFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
        id: '1',
        exists: false,
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
        id: '2',
        exists: false,
      },
    ])
  }, [])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-files-amount-message"
      filesAmountLimit={1}
    />
  )
}
render(<Component />)
`}),m=()=>(0,a.jsx)(n,{scope:{createMockFile:o},"data-visual-test":`upload-files-amount-limit`,noInline:!0,children:`const Component = () => {
  const { setInternalFiles, setFiles } = Upload.useUpload(
    'upload-files-amount-limit'
  )
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
      },
    ])
    setInternalFiles([
      {
        file: createMockFile('fileName1.png', 123, 'image/png'),
        id: '1',
        exists: false,
      },
      {
        file: createMockFile('fileName2.png', 321, 'image/png'),
        id: '2',
        exists: false,
      },
    ])
  }, [])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-files-amount-limit"
      filesAmountLimit={2}
    />
  )
}
render(<Component />)
`}),h=()=>(0,a.jsx)(n,{noInline:!0,children:`const Component = () => {
  const myUploadId = 'unique-id' // or a function, object or React Context reference.
  const { files, setFiles } = Upload.useUpload(myUploadId) // id is needed when wanting to connect with the useUpload hook.

  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id={myUploadId} />

      <Button
        top="small"
        disabled={files.length < 1}
        onClick={() => setFiles([])}
      >
        Remove selected files
      </Button>

      <Preview files={files} />
    </>
  )
  function Preview({ files }) {
    const [images, setImages] = React.useState([])
    React.useEffect(() => {
      files.map(({ file }) => {
        let reader = new FileReader()
        reader.addEventListener(
          'load',
          (event) => {
            images.push({
              blob: event.target,
              file,
            })
            setImages([...images])
            reader = null
          },
          false
        )
        reader.readAsDataURL(file)
      })
    }, [files])
    return (
      <Section aria-label="List of chosen images">
        {images.map((img, i) => (
          <Img
            top
            key={i}
            src={img.blob.result}
            alt={img.file.name}
            height={100}
          />
        ))}
      </Section>
    )
  }
}
render(<Component />)
`}),g=()=>(0,a.jsx)(n,{"data-visual-test":`upload-is-loading`,scope:{createMockFile:o},noInline:!0,children:`const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-is-loading')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('fileName.png', 123, 'image/png'),
        isLoading: true,
      },
    ])
  }, [])
  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id="upload-is-loading" />
      <ToggleButton
        top="small"
        disabled={files.length < 1}
        onChange={({ checked }) =>
          setFiles(
            files.map((fileItem) => {
              return {
                ...fileItem,
                isLoading: checked,
              }
            })
          )
        }
      >
        Files is loading toggle
      </ToggleButton>
    </>
  )
}
render(<Component />)
`}),_=()=>(0,a.jsx)(n,{"data-visual-test":`upload-error-message`,noInline:!0,children:`const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-error-message')
  return (
    <>
      <Upload
        acceptedFileTypes={['jpg', 'png']}
        id="upload-error-message"
      />
      <ToggleButton
        top="small"
        disabled={files.length < 1}
        onChange={({ checked }) => {
          setFiles(
            files.map((fileItem) => {
              return {
                ...fileItem,
                errorMessage: checked ? 'custom error message' : null,
              }
            })
          )
        }}
      >
        Toggle error message
      </ToggleButton>
    </>
  )
}
render(<Component />)
`}),v=()=>(0,a.jsx)(n,{noInline:!0,children:`const Component = () => {
  const { files, setFiles } = Upload.useUpload('upload-accepted-formats')
  if (files.length) {
    console.log('files', files, setFiles)
  }
  return (
    <Upload
      acceptedFileTypes={['png', 'jpg', 'pdf']}
      id="upload-accepted-formats"
    />
  )
}
render(<Component />)
`}),y=()=>(0,a.jsx)(n,{"data-visual-test":`upload-file-max-size-based-on-file-format`,hideCode:!0,children:`<Upload
  fileMaxSize={99}
  acceptedFileTypes={[
    {
      fileType: 'jpg',
      fileMaxSize: 1,
    },
    {
      fileType: 'doc',
      fileMaxSize: 1,
    },
    {
      fileType: 'svg',
      fileMaxSize: 1,
    },
    {
      fileType: 'gif',
      fileMaxSize: 1,
    },
    {
      fileType: 'doc',
      fileMaxSize: 4,
    },
    {
      fileType: 'docx',
      fileMaxSize: 4,
    },
    {
      fileType: 'tiff',
      fileMaxSize: 5,
    },
    {
      fileType: 'tif',
      fileMaxSize: 5,
    },
    {
      fileType: 'html',
      fileMaxSize: 6,
    },
    {
      fileType: 'htm',
      fileMaxSize: 6,
    },
    {
      fileType: 'xls',
      fileMaxSize: 7,
    },
    {
      fileType: 'xlsx',
      fileMaxSize: 7,
    },
    {
      fileType: 'odt',
    },
    {
      fileType: 'pdf',
    },
    {
      fileType: 'text',
      fileMaxSize: false,
    },
    {
      fileType: 'txt',
      fileMaxSize: 0,
    },
    {
      fileType: 'zip',
      fileMaxSize: 99,
    },
  ]}
/>
`}),b=()=>(0,a.jsx)(n,{children:`<Upload
  acceptedFileTypes={[
    {
      fileType: 'jpg',
      fileMaxSize: 0,
    },
    {
      fileType: 'doc',
      fileMaxSize: false,
    },
    {
      fileType: 'svg',
    },
  ]}
/>
`}),x=()=>(0,a.jsx)(n,{"data-visual-test":`upload-disabled-file-max-size`,children:`<Upload acceptedFileTypes={['jpg', 'pdf']} fileMaxSize={false} />
`}),S=()=>(0,a.jsx)(n,{"data-visual-test":`upload-no-title-no-text`,children:`<Upload title={false} text={false} acceptedFileTypes={['jpg', 'png']} />
`}),C=()=>(0,a.jsx)(n,{scope:{createRequest:i},noInline:!0,children:`async function mockAsyncFileRemoval({ fileItem }) {
  const request = createRequest()
  console.log('making API request to remove:', fileItem.file.name)
  await request(3000) // Simulate a request
  const mockResponse = {
    successfulRemoval: Math.random() < 0.5, // Randomly fails to remove the file
  }

  if (!mockResponse.successfulRemoval) {
    throw new Error('Unable to remove this file')
  }
}
render(
  <Upload
    onFileDelete={mockAsyncFileRemoval}
    acceptedFileTypes={['jpg', 'png']}
  />
)
`}),w=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i},"data-visual-test":`upload-on-file-click`,noInline:!0,children:`const Component = () => {
  const { setFiles } = Upload.useUpload('upload-on-file-click')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 123, 'image/png'),
        id: '1',
        description: 'Click the file name to open the image',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          123,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  async function mockAsyncFileFetching({ fileItem }) {
    const request = createRequest()
    console.log(
      'making API request to fetch the url of the file:',
      fileItem.file.name
    )
    await request(2000) // Simulate a request
    window.open(
      \`https://eufemia.dnb.no/images/avatars/\${fileItem.file.name}\`,
      '_blank'
    )
  }
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-on-file-click"
      onFileClick={mockAsyncFileFetching}
    />
  )
}
render(<Component />)
`}),T=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i},noInline:!0,children:`const Component = () => {
  const { setFiles, clearFiles } = Upload.useUpload('upload-clear-files')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 123, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          123,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  return (
    <>
      <Upload acceptedFileTypes={['jpg', 'png']} id="upload-clear-files" />
      <Button top="small" onClick={() => clearFiles()}>
        Clear files
      </Button>
    </>
  )
}
render(<Component />)
`}),E=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i},"data-visual-test":`upload-file-empty-size`,noInline:!0,children:`const Component = () => {
  const { setFiles } = Upload.useUpload('upload-file-size-empty')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-file-size-empty"
    />
  )
}
render(<Component />)
`}),D=()=>(0,a.jsx)(n,{"data-visual-test":`upload-disabled-drag-and-drop`,children:`<Upload
  disableDragAndDrop
  acceptedFileTypes={['jpg', 'png']}
  onChange={({ files }) => console.log('onChange', files)}
/>
`}),O=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i,Badge:r},"data-visual-test":`upload-description`,noInline:!0,children:`const Component = () => {
  const { setFiles } = Upload.useUpload('upload-description')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
        description: 'This is my description',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
      {
        file: createMockFile('123.jpg', 123, 'image/png'),
        id: '3',
        description: (
          <>
            <Badge
              variant="information"
              status="positive"
              content="Status"
            />{' '}
            This is my description
          </>
        ),
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-description"
      onChange={({ files }) =>
        setFiles(
          files.map((fileItem) => {
            return {
              ...fileItem,
              description: 'This is my description',
            }
          })
        )
      }
    />
  )
}
render(<Component />)
`}),k=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i},"data-visual-test":`upload-remove-delete-button`,noInline:!0,children:`const Component = () => {
  const { setFiles } = Upload.useUpload('upload-remove-delete-button')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-very-very-very-very-very-very-verylong-to-display-that-when-remove-button-is-hidden-file-name-will-take-full-width.png',
          0,
          'image/png'
        ),
        description:
          'Description that is very very very very very very very very long to display that when delete button is removed, file description will take full width.',
        removeDeleteButton: true,
      },
      {
        file: createMockFile('123.jpg', 0, 'image/png'),
        id: '3',
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
        deleteButtonProps: {
          tooltip: 'Button tooltip',
        },
      },
    ])
  }, [setFiles])
  return (
    <Upload
      acceptedFileTypes={['jpg', 'png']}
      id="upload-remove-delete-button"
      onChange={({ files }) =>
        setFiles(
          files.map((fileItem) => {
            return {
              ...fileItem,
              deleteButtonProps: {
                tooltip: \`Do you want to remove \${fileItem.file.name} file?\`,
              },
            }
          })
        )
      }
    />
  )
}
render(<Component />)
`}),A=()=>(0,a.jsx)(n,{scope:{createMockFile:o,createRequest:i},"data-visual-test":`upload-compact-variant-files-list`,noInline:!0,children:`const Component = () => {
  const { setFiles } = Upload.useUpload('upload-compact-variant-files')
  React.useEffect(() => {
    setFiles([
      {
        file: createMockFile('1501870.jpg', 0, 'image/png'),
        id: '1',
      },
      {
        file: createMockFile(
          'file-name-that-is-very-long-and-has-letters.png',
          0,
          'image/png'
        ),
        id: '2',
      },
      {
        file: createMockFile('123.jpg', 0, 'image/png'),
        id: '3',
      },
      {
        file: createMockFile('321.jpg', 0, 'image/png'),
        id: '4',
      },
    ])
  }, [setFiles])
  return (
    <Upload
      variant="compact"
      acceptedFileTypes={['jpg', 'png']}
      id="upload-compact-variant-files"
    />
  )
}
render(<Component />)
`});export{h as C,k as S,o as T,g as _,A as a,C as b,d as c,_ as d,E as f,p as g,m as h,T as i,D as l,b as m,c as n,u as o,y as p,l as r,O as s,v as t,x as u,S as v,f as w,s as x,w as y};