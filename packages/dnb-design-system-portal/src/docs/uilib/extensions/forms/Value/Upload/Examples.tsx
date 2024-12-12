import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Value, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex, Span } from '@dnb/eufemia/src'
import { createMockFile } from '../../../../../../docs/uilib/components/upload/Examples'
import { createRequest } from '../../Form/SubmitIndicator/Examples'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Upload placeholder="No values given" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox
      scope={{ createMockFile }}
      data-visual-test="upload-value-default"
    >
      <Value.Upload
        inline
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
        ]}
      />
    </ComponentBox>
  )
}

export const WithSize = () => {
  return (
    <ComponentBox
      hideCode
      scope={{ createMockFile }}
      data-visual-test="upload-value-size"
    >
      <Value.Upload
        displaySize
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
        ]}
      />
    </ComponentBox>
  )
}

export const WithDownload = () => {
  return (
    <ComponentBox hideCode scope={{ createMockFile }}>
      <Value.Upload
        download
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
        ]}
      />
    </ComponentBox>
  )
}

export const WithCustomFormat = () => {
  return (
    <ComponentBox hideCode scope={{ createMockFile }}>
      <Form.Handler
        locale="en-GB"
        data={{
          myPath: [
            {
              file: createMockFile('fileName-1.png', 1000000, 'image/png'),
              exists: false,
              id: '1',
            },
            {
              file: createMockFile('fileName-2.png', 2000000, 'image/png'),
              exists: false,
              id: '2',
            },
          ],
        }}
      >
        <Value.Upload
          inline
          path="/myPath"
          format={{ type: 'disjunction' }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const FieldUploadSelectionPath = () => {
  return (
    <ComponentBox hideCode scope={{ createMockFile }}>
      <Form.Handler
        data={{
          myPath: [
            {
              file: createMockFile('fileName-1.png', 1000000, 'image/png'),
              exists: false,
              id: '1',
            },
            {
              file: createMockFile('fileName-2.png', 3000000, 'image/png'),
              exists: false,
              id: '2',
            },
            {
              file: createMockFile('fileName-3.png', 3000000, 'image/png'),
              exists: false,
              id: '3',
            },
          ],
        }}
      >
        <Flex.Stack>
          <Field.Upload label="My selections" path="/myPath" />
          <Value.Upload
            inheritLabel
            path="/myPath"
            variant="ul"
            listType="unstyled"
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.Upload label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox
      hideCode
      scope={{ createMockFile }}
      data-visual-test="upload-value-label-and-value"
    >
      <Value.Upload
        label="Label text"
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
        ]}
      />
    </ComponentBox>
  )
}

export const LabelAndValueOnFileClick = () => {
  return (
    <ComponentBox
      hideCode
      scope={{ createMockFile }}
      data-visual-test="upload-value-label-and-value-on-file-click"
    >
      <Value.Upload
        onFileClick={() => {
          console.log('Clicked on file')
        }}
        label="Label text"
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            isLoading: true,
            id: '2',
          },
        ]}
      />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox
      hideCode
      scope={{ createMockFile }}
      data-visual-test="upload-value-inline"
    >
      <Span>
        This is before the component{' '}
        <Value.Upload
          value={[
            {
              file: createMockFile('fileName-1.png', 1000000, 'image/png'),
              exists: false,
              id: '1',
            },
            {
              file: createMockFile('fileName-2.png', 2000000, 'image/png'),
              exists: false,
              id: '2',
            },
          ]}
          inline
        />{' '}
        This is after the component
      </Span>
    </ComponentBox>
  )
}

export const ListVariants = () => {
  return (
    <ComponentBox
      scope={{ createMockFile }}
      data-visual-test="upload-value-lists"
      hideCode
    >
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List"
        variant="ol"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Unordered List"
        variant="ul"
      />
    </ComponentBox>
  )
}

export const ListVariantsOnFileClick = () => {
  return (
    <ComponentBox
      scope={{ createMockFile }}
      data-visual-test="upload-value-lists-on-file-click"
      hideCode
    >
      <Value.Upload
        onFileClick={() => {
          console.log('Clicked on file')
        }}
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            isLoading: true,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List"
        variant="ol"
      />
      <Value.Upload
        onFileClick={() => {
          console.log('Clicked on file')
        }}
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
            isLoading: true,
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
            isLoading: true,
          },
        ]}
        label="Unordered List"
        variant="ul"
      />
    </ComponentBox>
  )
}

export const ListTypes = () => {
  return (
    <ComponentBox scope={{ createMockFile }} hideCode>
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List a"
        variant="ol"
        listType="a"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List A"
        variant="ol"
        listType="A"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List i"
        variant="ol"
        listType="i"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Ordered List I"
        variant="ol"
        listType="I"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Unordered List square"
        variant="ul"
        listType="square"
      />
      <Value.Upload
        value={[
          {
            file: createMockFile('fileName-1.png', 1000000, 'image/png'),
            exists: false,
            id: '1',
          },
          {
            file: createMockFile('fileName-2.png', 2000000, 'image/png'),
            exists: false,
            id: '2',
          },
          {
            file: createMockFile('fileName-3.png', 3000000, 'image/png'),
            exists: false,
            id: '3',
          },
        ]}
        label="Unordered List circle"
        variant="ul"
        listType="circle"
      />
    </ComponentBox>
  )
}

export const OnFileClick = () => (
  <ComponentBox hideCode scope={{ createMockFile, createRequest }}>
    {() => {
      const Component = () => {
        async function mockAsyncFileFetching({ fileItem }) {
          const request = createRequest()
          console.log(
            'making API request to fetch the url of the file: ' +
              fileItem.file.name,
          )
          await request(2000) // Simulate a request
          window.open(
            'https://eufemia.dnb.no/images/avatars/' + fileItem.file.name,
            '_blank',
          )
        }

        return (
          <Value.Upload
            label="Label text"
            value={[
              {
                file: createMockFile('35217511.jpg', 1000000, 'image/png'),
                exists: false,
                id: '1',
              },
              {
                file: createMockFile('1501870.jpg', 2000000, 'image/png'),
                exists: false,
                id: '2',
              },
            ]}
            onFileClick={mockAsyncFileFetching}
          />
        )
      }

      return <Component />
    }}
  </ComponentBox>
)
