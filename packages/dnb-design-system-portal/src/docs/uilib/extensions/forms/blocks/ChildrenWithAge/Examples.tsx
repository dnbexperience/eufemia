import { useMemo, useRef } from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, HelpButton, Lead, Section } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  Tools,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'
import { GenerateRef as GeneratePropsRef } from '@dnb/eufemia/src/extensions/forms/Tools/ListAllProps'
import { GenerateRef as GenerateSchemaRef } from '@dnb/eufemia/src/extensions/forms/Tools/GenerateSchema'
import * as Blocks from '@dnb/eufemia/src/extensions/forms/blocks'
import { useData } from '@dnb/eufemia/src/extensions/forms/Form'

export const ChildrenWithAge = (props) => {
  return (
    <Form.Handler>
      <WithToolbar>
        <Flex.Stack>
          <Blocks.ChildrenWithAge
            enableAdditionalQuestions={['joint-responsibility', 'daycare']}
            {...props}
          />
          <Blocks.ChildrenWithAge
            mode="summary"
            enableAdditionalQuestions={['joint-responsibility', 'daycare']}
            {...props}
          />
        </Flex.Stack>
      </WithToolbar>
    </Form.Handler>
  )
}

export const ChildrenWithAgeWizard = (props) => {
  return (
    <ComponentBox scope={{ Blocks, props }}>
      {() => {
        const MyForm = () => {
          const { summaryTitle } = Form.useLocale().Step
          return (
            <Form.Handler>
              <Wizard.Container>
                <Wizard.Step title="Step 1">
                  <Blocks.ChildrenWithAge {...props} />
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title={summaryTitle}>
                  <Blocks.ChildrenWithAge
                    mode="summary"
                    toWizardStep={0}
                    {...props}
                  />

                  <Form.ButtonRow>
                    <Wizard.Buttons />
                    <Form.SubmitButton variant="send" />
                  </Form.ButtonRow>
                </Wizard.Step>
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export function WithToolbar({ children }) {
  const { filterData } = useData()

  const filterDataPaths = useMemo(
    () => ({
      '/toggleToolOf': false,
    }),
    [],
  )

  const generateDataRef = useMemo(() => {
    return {
      current: () => {
        return filterData(filterDataPaths)
      },
    }
  }, [filterData, filterDataPaths])
  const generatePropsRef = useRef<GeneratePropsRef>()
  const generateSchemaRef = useRef<GenerateSchemaRef>()

  return (
    <Flex.Stack top="large">
      <Tools.ListAllProps
        generateRef={generatePropsRef}
        filterData={filterDataPaths}
      >
        <Tools.GenerateSchema
          generateRef={generateSchemaRef}
          filterData={filterDataPaths}
        >
          {children}
        </Tools.GenerateSchema>
      </Tools.ListAllProps>

      <Section backgroundColor="sand-yellow" innerSpace>
        <Flex.Horizontal align="center">
          <Form.SubmitButton text="Submit" />
          <Field.Selection
            path="/toggleToolOf"
            variant="button"
            optionsLayout="horizontal"
          >
            <Field.Option value="off" title="Off" />
            <Field.Option value="data" title="Data" />
            <Field.Option value="props" title="Props" />
            <Field.Option value="schema" title="Schema" />
          </Field.Selection>
          <HelpButton title="About Data, Props and Schema">
            Data, Props and Schema will show block relevant information.
            Schema is an automatically generated Ajv schema, while props
            shows all used props to define the block functionality.
          </HelpButton>
        </Flex.Horizontal>
      </Section>

      <Form.Visibility
        visibleWhen={{ path: '/toggleToolOf', hasValue: 'data' }}
      >
        <Output title="Data" generateRef={generateDataRef} />
      </Form.Visibility>

      <Form.Visibility
        visibleWhen={{ path: '/toggleToolOf', hasValue: 'props' }}
      >
        <Output title="Props" generateRef={generatePropsRef} />
      </Form.Visibility>

      <Form.Visibility
        visibleWhen={{ path: '/toggleToolOf', hasValue: 'schema' }}
      >
        <Output
          title="Schema"
          generateRef={generateSchemaRef}
          transform={(data) => data.schema}
        />
      </Form.Visibility>
    </Flex.Stack>
  )
}

function Output({ title, generateRef, transform = (data) => data }) {
  const data = transform(generateRef.current())

  return (
    <>
      <Lead>{title}</Lead>
      <Section element="output" innerSpace backgroundColor="sand-yellow">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Section>
    </>
  )
}

export const ChildrenWithAgePrefilledYes = () => {
  return (
    <ComponentBox
      data-visual-test="children-with-age-prefilled"
      scope={{ Blocks }}
    >
      <Form.Handler
        data={{
          hasChildren: true,
          hasJointResponsibility: true,
          usesDaycare: true,
          countChildren: 2,
          children: [{}, {}],
        }}
      >
        <Flex.Stack>
          <Blocks.ChildrenWithAge
            enableAdditionalQuestions={['joint-responsibility', 'daycare']}
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const ChildrenWithAgeSummaryMultipleChildren = () => {
  const multipleChildren = {
    hasChildren: true,
    usesDaycare: true,
    countChildren: 2,
    children: [
      {
        age: 1,
      },
      {
        age: 2,
        hasDaycare: true,
      },
    ],
  }

  return (
    <ComponentBox
      data-visual-test="children-with-age-summary-multiple-children"
      scope={{ Blocks, multipleChildren }}
    >
      <Blocks.ChildrenWithAge data={multipleChildren} />
      <Blocks.ChildrenWithAge mode="summary" data={multipleChildren} />
    </ComponentBox>
  )
}

export const ChildrenWithAgeSummaryNoChildren = () => {
  const noChildren = {
    hasChildren: false,
  }
  return (
    <ComponentBox
      data-visual-test="children-with-age-summary-no-children"
      scope={{ Blocks, noChildren }}
    >
      <Blocks.ChildrenWithAge data={noChildren} />
      <Blocks.ChildrenWithAge mode="summary" data={noChildren} />
    </ComponentBox>
  )
}
