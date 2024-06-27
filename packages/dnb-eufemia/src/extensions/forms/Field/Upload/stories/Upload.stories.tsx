import { Field, Form } from '../../..'
import { Flex, GlobalStatus } from '../../../../../components'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

export default {
  title: 'Eufemia/Extensions/Forms/Upload',
}

export function Upload() {
  // const { setFiles } = OriginalUpload.useUpload('unique-id')

  // React.useEffect(() => {
  //   setFiles([
  //     { file: createMockFile('fileName-1.png', 100, 'image/png') },
  //   ])
  // }, [setFiles])

  return (
    <>
      <GlobalStatus />

      <Form.Handler
        defaultData={{
          myFiles: [
            { file: createMockFile('fileName-1.png', 100, 'image/png') },
          ],
        }}
        onChange={(data) => console.log('onChange', data)}
      >
        <Flex.Stack>
          <Field.Upload
            // id="id"
            id="unique-id"
            data-test="upload-field"
            width="large"
            // skeleton
            required
            // acceptedFileTypes={['jpeg']}
            title="Upload title"
            // label="Upload title"
            text="Upload text"
            // label="Upload"
            labelDescription="labelDescription"
            path="/myFiles"
            // disabled
            // error={new Error('123')}
            warning="Warning"
            info="Info"
            help={{ content: 'Help text', title: 'Help title' }}
            validateInitially
            // onChange={console.log}
            // onFileDelete={console.log}
          />

          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler>
    </>
  )
}
