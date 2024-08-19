import React from 'react'
import { Field, Form, Iterate, Value } from '../..'
import { Card, Flex } from '../../../../components'

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
            <Iterate.AnimatedContainer title="Title">
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
      title="Edit account holder"
      titleWhenNew="New account holder"
      {...props}
    >
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}

const CreateNewEntry = () => {
  return (
    <Iterate.CreateEntryContainer
      path="/accounts"
      title="New account holder"
      showButton={
        <Iterate.CreateEntryContainer.OpenButton text="Add another account" />
      }
      showButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.CreateEntryContainer>
  )
}

const MyViewItem = () => {
  return (
    <Iterate.ViewContainer title="Account holder">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" showEmpty />
        <Value.Name.Last itemPath="/lastName" placeholder="–" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}

export const ViewAndEditContainer = () => {
  return (
    <React.StrictMode>
      <Form.Handler
        data={
          {
            // accounts: [
            //   {
            //     firstName: 'Tony',
            //   },
            // ],
          }
        }
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
    </React.StrictMode>
  )
}
