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
    <Form.Handler
      onSubmit={(data, { reduceToVisibleFields }) => {
        console.log(reduceToVisibleFields(data))
      }}
    >
      <WithToolbar>
        <Flex.Stack>
          <Blocks.ChildrenWithAge {...props} />
          <Blocks.ChildrenWithAge mode="summary" {...props} />
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
          const myTranslations = {
            'nb-NO': {
              ChildrenWithAge: {
                hasChildren: {
                  title: 'Utgifter til barn',
                  fieldLabel:
                    'Har du/dere barn under 18 år som dere er økonomisk ansvarlige for?',
                  required:
                    'Du må angi om du/dere har barn under 18 år som dere er økonomisk ansvarlige for.',
                },
              },
            },
            'en-GB': {
              ChildrenWithAge: {
                hasChildren: {
                  title: 'Child expenses',
                  fieldLabel:
                    'Do you have children under the age of 18 for whom you are financially responsible?',
                  required:
                    'You must state whether you have children under the age of 18 for whom you are financially responsible.',
                },
              },
            },
          }

          const { summaryTitle } = Form.useLocale().Step
          return (
            <Form.Handler
              onSubmit={(data, { reduceToVisibleFields }) => {
                console.log(reduceToVisibleFields(data))
              }}
              translations={myTranslations}
            >
              <Wizard.Container>
                <Wizard.Step title="Step 1">
                  <Blocks.ChildrenWithAge
                    enableAdditionalQuestions={[
                      'joint-responsibility',
                      'daycare',
                    ]}
                    {...props}
                  />
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
      <Tools.Log data={data} />
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
          daycareExpenses: 123,
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

export const ChildrenWithAgeSummaryMultipleNoAnswers = () => {
  const multipleChildrenNoJointAndDaycare = {
    hasChildren: true,
    hasJointResponsibility: false,
    usesDaycare: false,
    countChildren: 2,
    children: [
      {
        age: 0,
      },
      {
        age: 0,
      },
    ],
  }

  return (
    <ComponentBox
      data-visual-test="children-with-age-summary-multiple-no-answers"
      scope={{ Blocks, multipleChildrenNoJointAndDaycare }}
    >
      <Blocks.ChildrenWithAge
        data={multipleChildrenNoJointAndDaycare}
        enableAdditionalQuestions={['joint-responsibility', 'daycare']}
      />
      <Blocks.ChildrenWithAge
        mode="summary"
        data={multipleChildrenNoJointAndDaycare}
        enableAdditionalQuestions={['joint-responsibility', 'daycare']}
      />
    </ComponentBox>
  )
}

export const ChildrenWithAgeSummaryMultipleChildren = () => {
  const multipleChildren = {
    hasChildren: true,
    usesDaycare: true,
    hasJointResponsibility: true,
    daycareExpenses: 4001,
    jointResponsibilityExpenses: 1004,
    countChildren: 2,
    children: [
      {
        age: 1,
      },
      {
        age: 2,
      },
    ],
  }

  return (
    <ComponentBox
      data-visual-test="children-with-age-summary-multiple-children"
      scope={{ Blocks, multipleChildren }}
    >
      <Blocks.ChildrenWithAge
        data={multipleChildren}
        enableAdditionalQuestions={['daycare', 'joint-responsibility']}
      />
      <Blocks.ChildrenWithAge
        mode="summary"
        data={multipleChildren}
        enableAdditionalQuestions={['daycare', 'joint-responsibility']}
      />
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

export const ChildrenWithAgeSummaryNoChildrenAfterFilledOutData = () => {
  const noChildren = {
    hasChildren: false,
    countChildren: 3,
    usesDaycare: true,
    hasJointResponsibility: true,
    daycareExpenses: 4001,
    jointResponsibilityExpenses: 1004,
    children: [
      {
        age: 1,
      },
      {
        age: 2,
      },
      {
        age: 3,
      },
    ],
  }
  return (
    <ComponentBox
      data-visual-test="children-with-age-summary-previously-filled-out-data"
      scope={{ Blocks, noChildren }}
    >
      <Blocks.ChildrenWithAge
        data={noChildren}
        enableAdditionalQuestions={['joint-responsibility', 'daycare']}
      />
      <Blocks.ChildrenWithAge
        mode="summary"
        data={noChildren}
        enableAdditionalQuestions={['joint-responsibility', 'daycare']}
      />
    </ComponentBox>
  )
}
