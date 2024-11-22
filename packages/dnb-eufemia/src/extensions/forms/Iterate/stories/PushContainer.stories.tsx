import React, { useLayoutEffect } from 'react'
import { Field, Form, Iterate, Tools, Value } from '../..'
import { Flex } from '../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Iterate/PushContainer',
}

const formData = {
  persons: [
    {
      firstName: 'Ola',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Kari',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Per',
      lastName: 'Hansen',
    },
  ],
}

export const ComplexPushContainer = () => {
  return (
    <Form.Handler>
      <Form.MainHeading>Representatives</Form.MainHeading>
      <Form.Card>
        <Iterate.Array path="/representatives">
          <RepresentativesView />
          <RepresentativesEdit />
        </Iterate.Array>
        <RepresentativesCreateNew />
      </Form.Card>
      <Tools.Log />
    </Form.Handler>
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
          variant="tertiary"
          text="Add new representative"
        />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <PushContainerContent />
    </Iterate.PushContainer>
  )
}
