import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'
// import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

export default {
  title: 'Eufemia/Extensions/Forms/Upload',
}

export function Upload() {
  // const { setFiles } = OriginalUpload.useUpload('unique-id')

  // React.useEffect(() => {
  //   setFiles([
  // { file: createMockFile('fileName-1.png', 100, 'image/png') },
  //   ])
  // }, [setFiles])

  return (
    <Form.Handler
      top
      defaultData={{
        myFiles: [
          // { file: createMockFile('fileName-1.png', 100, 'image/png') },
        ],
      }}
      onChange={(data) => {
        console.log('global onChange', data)
      }}
      onSubmit={(data) => console.log('global onSubmit', data)}
    >
      <Flex.Stack>
        <Field.Upload
          required
          label="Upload title"
          path="/myFiles"
          onChange={(e) => {
            console.log('local onChange', e)
          }}
          help={{
            title: 'Help title',
            content: 'Help content',
          }}
        />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
