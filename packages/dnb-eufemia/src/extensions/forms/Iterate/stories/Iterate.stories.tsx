import React, { useCallback } from 'react'
import { Field, Form, Iterate, Tools, Value, Wizard } from '../..'
import { Flex } from '../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Iterate',
}

export const AnimatedContainer = () => {
  const { count } = Iterate.useCount('myForm')
  return (
    <React.StrictMode>
      <Form.Handler
        defaultData={{
          myList: ['Item 1'],
        }}
        id="myForm"
      >
        <Iterate.Count path="/myList" />
        <Form.Card top>
          <Iterate.Array path="/myList" placeholder={<>Empty list</>}>
            <Iterate.AnimatedContainer title="Title {itemNo}">
              <Field.String label="Label" itemPath="/" />

              <Iterate.Toolbar>
                <Iterate.RemoveButton />
              </Iterate.Toolbar>
            </Iterate.AnimatedContainer>
          </Iterate.Array>

          <Iterate.PushButton
            path="/myList"
            pushValue={() => 'New item ' + String(count('/myList') + 1)}
            text="Add new item"
            top
          />
        </Form.Card>
      </Form.Handler>

      <Iterate.Array
        top
        value={['Iron Man', 'Captain America', 'The Hulk']}
        onChange={console.log}
      >
        <Field.String itemPath="/" />
      </Iterate.Array>
    </React.StrictMode>
  )
}

const MyEditItemForm = () => {
  return (
    <Field.Composition>
      <Field.Name.First itemPath="/firstName" width="medium" />
      <Field.Name.Last
        itemPath="/lastName"
        width="medium"
        required
        // validateInitially
      />
    </Field.Composition>
  )
}

const MyEditItem = (props) => {
  return (
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
      {...props}
    >
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}

const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/accounts"
      title="New account holder"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another account" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.PushContainer>
  )
}

const MyViewItem = () => {
  return (
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" showEmpty />
        <Value.Name.Last itemPath="/lastName" placeholder="–" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}

export const ViewAndEditContainer = () => {
  return (
    <>
      <Form.Handler
        data={{
          accounts: [
            // {
            //   firstName: 'Tony',
            // },
            // {
            //   firstName: 'Maria',
            // },
          ],
        }}
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Flex.Vertical>
          <Form.MainHeading>Accounts</Form.MainHeading>

          <Form.Card>
            <Iterate.Array path="/accounts" limit={2}>
              <MyViewItem />
              <MyEditItem />
            </Iterate.Array>
            <CreateNewEntry />
          </Form.Card>

          <Form.SubmitButton variant="send" />
        </Flex.Vertical>
      </Form.Handler>
    </>
  )
}

export const InitialOpen = () => {
  const MyEditItemForm = useCallback(() => {
    return (
      <Field.SelectCountry
        label="Land du er statsborger i"
        itemPath="/"
        required
      />
    )
  }, [])

  const MyEditItem = useCallback(() => {
    return (
      <Iterate.EditContainer toolbarVariant="minimumOneItem">
        <MyEditItemForm />
      </Iterate.EditContainer>
    )
  }, [MyEditItemForm])

  const MyViewItem = useCallback(() => {
    return (
      <Iterate.ViewContainer toolbarVariant="minimumOneItem">
        <Value.SelectCountry
          label="Land du er statsborger i"
          itemPath="/"
        />
      </Iterate.ViewContainer>
    )
  }, [])

  const { getCountryNameByIso } = Value.SelectCountry.useCountry()

  const [count, setCount] = React.useState(0)

  return (
    <>
      <Form.Handler
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Flex.Stack>
          <Form.MainHeading>Statsborgerskap</Form.MainHeading>

          <Form.Card align="stretch">
            <Iterate.Array
              limit={2}
              path="/countries"
              // defaultValue={['NO']}
              defaultValue={[null]}
              onChangeValidator={(arrayValue) => {
                const findFirstDuplication = (arr) =>
                  arr.findIndex((e, i) => arr.indexOf(e) !== i)

                const count = arrayValue.filter(Boolean).length
                const index = findFirstDuplication(arrayValue)
                if (count > 1 && index > -1) {
                  return new Error(
                    'You can not have duplicate items: ' +
                      getCountryNameByIso(arrayValue.at(index) as string)
                  )
                }
              }}
            >
              <MyViewItem />
              <MyEditItem />
            </Iterate.Array>

            <Iterate.PushButton
              path="/countries"
              pushValue={null}
              text="Legg til flere statsborgerskap"
            />
          </Form.Card>

          <Form.SubmitButton variant="send" />

          <Tools.Log />

          {count}
          <button type="button" onClick={() => setCount(count + 1)}>
            Add
          </button>
        </Flex.Stack>
      </Form.Handler>
    </>
  )
}

export const WithArrayValidator = () => {
  return (
    <Form.Handler>
      <Iterate.Array
        path="/items"
        onChangeValidator={(arrayValue) => {
          if (!(arrayValue?.length > 0)) {
            return new Error('You need at least one item')
          }
        }}
      >
        <Field.String itemPath="/" />
      </Iterate.Array>
      <Iterate.PushButton path="/items" pushValue="baz" />
      <Form.SubmitButton />
    </Form.Handler>
  )
}

const CountCountries = () => {
  const { count } = Iterate.useCount()

  return (
    <Iterate.Array path="/countries">
      {() => `{itemNo} of ' ${count('/countries')}`}
    </Iterate.Array>
  )
}

export const useCount = () => (
  <Form.Handler data={{ countries: [] }}>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <CountCountries />
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <CountCountries />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)

export function InWizard() {
  return (
    <React.StrictMode>
      <Form.Handler required>
        <Wizard.Container>
          <Wizard.Step>
            <Form.Card>
              <Iterate.Array path="/myList" defaultValue={[{}]}>
                <Iterate.ViewContainer>
                  <Value.String label="Item {itemNo}" itemPath="/foo" />
                </Iterate.ViewContainer>
                <Iterate.EditContainer>
                  <Field.String
                    label="Item {itemNo}"
                    itemPath="/foo"
                    defaultValue="foo"
                  />
                </Iterate.EditContainer>
              </Iterate.Array>

              <Iterate.PushButton
                text="Add"
                path="/myList"
                variant="tertiary"
                pushValue={{}}
              />
            </Form.Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step>
            <Iterate.Array path="/myList" defaultValue={[{}]}>
              <Iterate.EditContainer>
                <Field.String
                  label="Item {itemNo}"
                  itemPath="/foo"
                  defaultValue="foo"
                />
              </Iterate.EditContainer>
              <Iterate.ViewContainer>
                <Value.String label="Item {itemNo}" itemPath="/foo" />
              </Iterate.ViewContainer>
            </Iterate.Array>

            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>

        <Tools.Log top />
      </Form.Handler>
    </React.StrictMode>
  )
}

export const DisplayDividerWhenUsingContainer = () => (
  <Form.Handler>
    <Flex.Stack>
      <Form.Card>
        <Form.SubHeading>
          Displaying divider line when using container
        </Form.SubHeading>
        <Iterate.Array path="/list" divider="line">
          <Iterate.ViewContainer
            variant="basic"
            toolbarVariant="custom"
            divider="line"
          >
            <Value.String label="Something" itemPath="/something" />
          </Iterate.ViewContainer>
          <Iterate.EditContainer variant="basic" divider="line">
            <Field.String label="Something" itemPath="/something" />
          </Iterate.EditContainer>
        </Iterate.Array>
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
