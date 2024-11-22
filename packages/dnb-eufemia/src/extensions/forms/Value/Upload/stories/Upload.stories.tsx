import { Form, Value } from '../../..'
import { P } from '../../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/Value/Upload',
}

function createMockFile(name: string, size: number, type: string) {
  const file = new File([], name, { type })
  Object.defineProperty(file, 'size', {
    get() {
      return size
    },
  })
  return file
}

export function Upload() {
  return (
    <Form.Handler
      data={{
        foo: 'John',
        bar: 'Doe',
        baz: [
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
        ],
        what: ['Foo', 'Bar', 'Baz'],
      }}
    >
      <Form.Card>
        <P>layout="grid"</P>
        <Value.SummaryList
          layout="grid"
          transformLabel={(label: string) => label.toUpperCase()}
        >
          <Value.String label="foo" path="/foo" />
          <Value.String label="bar" path="/bar" />
          <Value.Upload label="baz" path="/baz" />
          <Value.ArraySelection label="what" path="/what" />
        </Value.SummaryList>
      </Form.Card>
      <Form.Card>
        <P>layout="horizontal"</P>
        <Value.SummaryList
          layout="horizontal"
          transformLabel={(label: string) => label.toUpperCase()}
        >
          <Value.String label="foo" path="/foo" />
          <Value.String label="bar" path="/bar" />
          <Value.Upload label="baz" path="/baz" />
          <Value.ArraySelection label="what" path="/what" />
        </Value.SummaryList>
      </Form.Card>
      <Form.Card>
        <P>layout="vertical"</P>
        <Value.SummaryList
          layout="vertical"
          transformLabel={(label: string) => label.toUpperCase()}
        >
          <Value.String label="foo" path="/foo" />
          <Value.String label="bar" path="/bar" />
          <Value.Upload label="baz" path="/baz" />
          <Value.ArraySelection label="what" path="/what" />
        </Value.SummaryList>
      </Form.Card>
      <Form.Card>
        <P>empty values</P>
        <Value.SummaryList
          transformLabel={(label: string) => label.toUpperCase()}
        >
          <Value.String label="foo" />
          <Value.String label="bar" />
          <Value.Upload label="baz" />
          <Value.ArraySelection label="what" />
        </Value.SummaryList>
      </Form.Card>
    </Form.Handler>
  )
}
