import React, { useCallback } from 'react'
import { Field, Form, Iterate, Value } from '../..'
import { Card, Flex, Section } from '../../../../components'

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
        <Card top>
          <Iterate.Array path="/myList" placeholder={<>Empty list</>}>
            <Iterate.AnimatedContainer title="Title {itemNr}">
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
        </Card>
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
      title="Edit account holder {itemNr}"
      titleWhenNew="New account holder {itemNr}"
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
    <Iterate.ViewContainer title="Account holder {itemNr}">
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

          <Card align="stretch">
            <Iterate.Array path="/accounts">
              <MyViewItem />
              <MyEditItem />
            </Iterate.Array>
            <CreateNewEntry />
          </Card>

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

  const [count, setCount] = React.useState(0)

  return (
    <>
      <Form.Handler
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Flex.Stack>
          <Form.MainHeading>Statsborgerskap</Form.MainHeading>

          <Card align="stretch">
            <Iterate.Array
              path="/countries"
              // defaultValue={['NO']}
              defaultValue={[null]}
            >
              <MyViewItem />
              <MyEditItem />
            </Iterate.Array>

            <Iterate.PushButton
              path="/countries"
              pushValue={null}
              text="Legg til flere statsborgerskap"
            />
          </Card>

          <Form.SubmitButton variant="send" />

          <Output />

          {count}
          <button type="button" onClick={() => setCount(count + 1)}>
            Add
          </button>
        </Flex.Stack>
      </Form.Handler>
    </>
  )
}

const Output = () => {
  const { data } = Form.useData()

  return (
    <Section
      element="output"
      backgroundColor="sand-yellow"
      style={{ maxWidth: '80vw' }}
      innerSpace
    >
      <pre>All data: {JSON.stringify(data)}</pre>
    </Section>
  )
}
