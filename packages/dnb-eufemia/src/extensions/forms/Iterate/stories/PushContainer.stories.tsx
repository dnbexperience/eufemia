import React, { useLayoutEffect } from 'react'
import { Field, Form, Iterate, Value, Wizard } from '../..'
import { Card, Flex } from '../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Iterate/PushContainer',
}

const formData = {
  persons: [
    {
      firstName: 'Test',
      lastName: 'Bruker',
    },
    {
      firstName: 'Some',
      lastName: 'Person',
    },
    {
      firstName: 'Geir',
      lastName: 'Service',
    },
  ],
}

export const ComplexPushContainer = () => {
  return (
    <Form.Handler id="main-form">
      <RepresentativesSection />
      <Wizard.Buttons />
    </Form.Handler>
  )
}

function RepresentativesSection() {
  return (
    <Form.Section>
      <Form.MainHeading bottom="1rem">Representatives</Form.MainHeading>
      <Card stack>
        <Iterate.Array path="/representatives">
          <RepresentativesView />
          <RepresentativesEdit />
        </Iterate.Array>
        <RepresentativesCreateNew />
      </Card>
    </Form.Section>
  )
}

function RepresentativesView() {
  return (
    <Iterate.ViewContainer>
      <Value.Composition>
        <Value.String itemPath="/firstName" />
        <Value.String itemPath="/lastName" />
      </Value.Composition>
    </Iterate.ViewContainer>
  )
}

function RepresentativesEdit() {
  return (
    <Iterate.EditContainer>
      <Field.Name.First itemPath="/firstName" />
      <Field.Name.Last itemPath="/lastName" />
    </Iterate.EditContainer>
  )
}

function ExistingPersonDetails() {
  const { data, getValue } = Form.useData()
  const person = getValue(data.selectedPerson)?.data || {}

  return (
    <Flex.Stack>
      <Field.Name.First
        readOnly
        itemPath="/firstName"
        value={person.firstName}
      />
      <Field.Name.Last
        readOnly
        itemPath="/lastName"
        value={person.lastName}
      />
    </Flex.Stack>
  )
}

function NewPersonDetails() {
  return (
    <Flex.Stack>
      <Field.Name.First required itemPath="/firstName" />
      <Field.Name.Last required itemPath="/lastName" />
    </Flex.Stack>
  )
}

function PushContainerContent() {
  const { data, update } = Form.useData()

  // Clear the PushContainer data when the selected person is "other",
  // so the fields do not inherit existing data.
  useLayoutEffect(() => {
    if (data.selectedPerson === 'other') {
      update('/pushContainerItems/0', {})
    }
  }, [data.selectedPerson, update])

  return (
    <Flex.Stack>
      <Field.Selection
        variant="radio"
        required
        path="/selectedPerson"
        dataPath="/persons"
      >
        <Field.Option value="other" label="Other person" />
      </Field.Selection>
      <Form.Visibility
        visibleWhen={{
          path: '/selectedPerson',
          hasValue: (value) =>
            typeof value === 'string' && value !== 'other',
        }}
      >
        <ExistingPersonDetails />
      </Form.Visibility>

      <Form.Visibility
        visibleWhen={{
          path: '/selectedPerson',
          hasValue: (value) => value === 'other',
        }}
      >
        <NewPersonDetails />
      </Form.Visibility>
    </Flex.Stack>
  )
}

function RepresentativesCreateNew() {
  return (
    <Iterate.PushContainer
      path="/representatives"
      title="Add new representative"
      isolatedData={{
        persons: formData.persons.map((data, i) => {
          return {
            title: [data.firstName, data.lastName].join(' '),
            value: '/persons/' + i,
            data,
          }
        }),
      }}
      openButton={
        <Iterate.PushContainer.OpenButton
          text="Add new representative"
          variant="tertiary"
          icon="add"
        />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <PushContainerContent />
    </Iterate.PushContainer>
  )
}
