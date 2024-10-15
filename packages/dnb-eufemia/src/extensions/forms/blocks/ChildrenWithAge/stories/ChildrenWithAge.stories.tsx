import React from 'react'
import ChildrenWithAge from '../ChildrenWithAge'
import { Form, Wizard } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Blocks/ChildrenWithAge',
}

const filterDataPaths = {
  '/countChildren': ({ data }) => Boolean(data?.hasChildren),
  '/children': ({ data }) => Boolean(data?.hasChildren),
}

const myTranslations = {
  'nb-NO': { ChildrenWithAge: { hasChildren: { title: 'Egendefinert' } } },
  'en-GB': { ChildrenWithAge: { hasChildren: { title: 'Custom label' } } },
}

export function Basic() {
  const { filterData } = Form.useData('ChildrenWithAge')
  console.log('data', filterData(filterDataPaths))

  return (
    <Form.Handler
      id="ChildrenWithAge"
      // defaultData={{
      //   hasChildren: true,
      // }}
      // onChange={(data) => {
      //   console.log('onChange', data.children.length)
      // }}
      onSubmit={(data, { reduceToVisibleFields }) => {
        console.log('Raw', data)
        console.log('Reduced', reduceToVisibleFields(data))
      }}
      translations={myTranslations}
    >
      <Flex.Stack>
        <ChildrenWithAge
          enableAdditionalQuestions={['daycare', 'joint-responsibility']}
        />

        <ChildrenWithAge
          mode="summary"
          enableAdditionalQuestions={['daycare', 'joint-responsibility']}
        />
        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function InsideWizard() {
  const { filterData } = Form.useData('ChildrenWithAge')
  console.log('data', filterData(filterDataPaths))
  const { summaryTitle } = Form.useLocale().Step

  return (
    <Form.Handler
      id="ChildrenWithAge"
      translations={myTranslations}
      onSubmit={(data, { reduceToVisibleFields }) => {
        console.log('Raw', data)
        console.log('Reduced', reduceToVisibleFields(data))
      }}
    >
      <Wizard.Container initialActiveIndex={0}>
        <Wizard.Step title="Step 1">
          <ChildrenWithAge
            enableAdditionalQuestions={['daycare', 'joint-responsibility']}
          />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <ChildrenWithAge
            mode="summary"
            toWizardStep={0}
            enableAdditionalQuestions={['daycare', 'joint-responsibility']}
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

export function WithoutDataContext() {
  const data = {
    hasChildren: true,
    countChildren: 2,
    children: [
      {
        age: 1,
      },
      { age: 2 },
    ],
  }

  return (
    <Flex.Stack>
      <ChildrenWithAge
        data={data}
        onChange={(value) => console.log('onChange', value)}
        enableAdditionalQuestions={['daycare', 'joint-responsibility']}
      />

      <ChildrenWithAge data={data} mode="summary" />
      <Form.SubmitButton />
    </Flex.Stack>
  )
}
