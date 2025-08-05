import React, { useLayoutEffect } from 'react'
import { Field, Form, Iterate, Tools, Value, Wizard } from '../../..'
import { Flex, Grid, HeightAnimation } from '../../../../../components'
import { P } from '../../../../../elements'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

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
  const { data, getValue } = Form.useData<{ selectedPerson: string }>()
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
  const { data, update } = Form.useData<{ selectedPerson: string }>()

  // Clear the PushContainer data when the selected person is "other",
  // so the fields do not inherit existing data.
  useLayoutEffect(() => {
    if (data.selectedPerson === 'other') {
      update('/pushContainerItems/0', {})
    }
  }, [data.selectedPerson, update])

  return (
    <>
      <Field.Selection
        variant="radio"
        required
        path="/selectedPerson"
        dataPath="/persons"
      >
        <Field.Option value="other" label="Other person" />
      </Field.Selection>

      <HeightAnimation top>
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
      </HeightAnimation>
    </>
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

export function RequireUnchanged() {
  return (
    <Form.Handler
      onSubmit={() => console.log('onSubmit')}
      onSubmitRequest={() => console.log('onSubmitRequest')}
    >
      <Wizard.Container keepInDOM>
        <Wizard.Step title="Step 1">
          <Form.Card>
            <Form.SubHeading>People</Form.SubHeading>

            <Iterate.Array path="/representatives">
              <RepresentativesView />
              <RepresentativesEdit />
            </Iterate.Array>

            <Iterate.PushContainer
              preventUncommittedChanges
              showResetButton
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
          </Form.Card>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Iterate.Array path="/people">
            <Value.Name.First itemPath="/firstName" />
          </Iterate.Array>
          <Wizard.Buttons />
          <Form.SubmitButton />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}

export const Something = () => {
  return (
    <Form.Handler data={{ test: 0 }}>
      <Wizard.Container id="as" mode="strict">
        <Wizard.Step title="Step 1">
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Field.String path="/test" required />

          <Iterate.Array
            path="/directOwnership/directOwners"
            space="0"
            bottom="0"
            required
          >
            <Iterate.ViewContainer
              variant="filled"
              toolbarVariant="custom"
            >
              <Value.Address />
            </Iterate.ViewContainer>
            <Iterate.EditContainer
              variant="filled"
              toolbarVariant="custom"
            >
              <Field.Address required />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushContainer
            path="/directOwnership/directOwners"
            title={'Add'}
            openButton={
              <Iterate.PushContainer.OpenButton
                top="1rem"
                variant="tertiary"
                text={'Add'}
              />
            }
            showOpenButtonWhen={() => true}
            variant="filled"
            bubbleValidation
            required
          >
            <Field.Address required />
          </Iterate.PushContainer>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
      <Tools.Log />
    </Form.Handler>
  )
}
