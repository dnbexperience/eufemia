import { Flex, Lead, Section } from '@dnb/eufemia/src'
import {
  Blocks,
  Field,
  Form,
  Tools,
} from '@dnb/eufemia/src/extensions/forms'
import { useRef } from 'react'

const Category = {
  FirstBlock: () => {
    const myTranslations = {
      'nb-NO': { MyBlock: { MyField: { label: 'Egendefinert' } } },
      'en-GB': { MyBlock: { MyField: { label: 'Custom' } } },
    }

    return (
      <Form.Handler
        data={{ firstName: 'Nora' }}
        translations={myTranslations}
      >
        <WithTools>
          <Blocks.Category.FirstBlock />
        </WithTools>
      </Form.Handler>
    )
  },
}

export { Category }

const filterDataPaths = {
  '/showProps': false,
  '/showSchema': false,
}
function WithTools({ children }) {
  const generatePropsRef = useRef()
  const generateSchemaRef = useRef()

  return (
    <>
      <Tools.ListAllProps
        generateRef={generatePropsRef}
        filterData={filterDataPaths}
      >
        <Tools.GenerateSchema
          generateRef={generateSchemaRef}
          filterData={filterDataPaths}
        >
          <Section innerSpace backgroundColor="white">
            {children}
          </Section>
        </Tools.GenerateSchema>
      </Tools.ListAllProps>

      <Section backgroundColor="sand-yellow" innerSpace>
        <Flex.Horizontal align="center">
          <Form.SubmitButton text="Submit" />
          <Field.Boolean
            path="/showProps"
            trueText="Hide Props"
            falseText="Show Props"
          />
          <Field.Boolean
            path="/showSchema"
            trueText="Hide Schema"
            falseText="Show Schema"
          />
        </Flex.Horizontal>
      </Section>

      <Form.Visibility pathTrue="/showProps" animate>
        <Output title="Props:" generateRef={generatePropsRef} />
      </Form.Visibility>
      <Form.Visibility pathTrue="/showSchema" animate>
        <Output
          title="Schema:"
          generateRef={generateSchemaRef}
          transform={(data) => data.schema}
        />
      </Form.Visibility>
    </>
  )
}

function Output({ title, generateRef, transform = (data) => data }) {
  const data = transform(generateRef.current())

  return (
    <Section element="output" innerSpace backgroundColor="sand-yellow">
      <Lead>{title}</Lead>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Section>
  )
}
