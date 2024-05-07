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

const MyEditItem = () => {
  return (
    <Iterate.EditContainer
      title="Edit account holder"
      titleWhenNew="New account holder"
    >
      <Field.Composition>
        <Field.Name.First itemPath="/firstName" width="medium" />
        <Field.Name.Last
          itemPath="/lastName"
          width="medium"
          required
          // validateInitially
        />
      </Field.Composition>
    </Iterate.EditContainer>
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
        data={{
          accounts: [
            {
              firstName: 'Tony',
            },
          ],
        }}
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Flex.Vertical>
          <Form.MainHeading>Accounts</Form.MainHeading>

          <Card stack>
            <Iterate.Array path="/accounts">
              <MyViewItem />
              <MyEditItem />
            </Iterate.Array>

            <Iterate.PushButton
              text="Add another account"
              path="/accounts"
              pushValue={{}}
            />
          </Card>

          <Form.SubmitButton variant="send" />
        </Flex.Vertical>
      </Form.Handler>
    </React.StrictMode>
  )
}
