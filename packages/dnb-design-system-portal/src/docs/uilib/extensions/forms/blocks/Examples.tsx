import { useRef } from 'react'
import { Flex, Lead, Section } from '@dnb/eufemia/src'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/src/extensions/forms/Tools/ListAllProps'
import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/src/extensions/forms/Tools/GenerateSchema'
import { Category } from '@dnb/eufemia/src/extensions/forms/blocks'

export const FirstBlock = () => {
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
        <Category.FirstBlock />
      </WithTools>
    </Form.Handler>
  )
}

const filterDataPaths = {
  '/showProps': false,
  '/showSchema': false,
}
function WithTools({ children }) {
  const generatePropsRef = useRef<GeneratePropsRef>()
  const generateSchemaRef = useRef<GenerateSchemaRef>()

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
            variant="button"
            trueText="Hide Props"
            falseText="Show Props"
          />
          <Field.Boolean
            path="/showSchema"
            variant="button"
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
