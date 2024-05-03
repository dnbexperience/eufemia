import React from 'react'
import { Field, Form, Iterate, Value } from '../..'
import { Button, Card, Flex } from '../../../../components'
import Provider from '../../DataContext/Provider'

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
  const [count, setCount] = React.useState(0)
  return (
    // <React.StrictMode>
    <Form.Handler
      defaultData={{
        accounts: [
          // {
          //   // firstName: 'Tony',
          // },
        ],
      }}
      onSubmit={(data) => console.log('onSubmit', data)}
      onSubmitRequest={() => console.log('onSubmitRequest')}
      onChange={(data) => console.log('onChangeContext', data)}
    >
      <Flex.Vertical>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Card stack>
          <Iterate.Array
            path="/accounts"
            id="hello"
            // emptyValue={[{}]}
            // value={[{}]}
            // initialValue={[{}]}
            // assignWhenDone
            // concatWith={{ firstName: 'Tony' }}
            // concatWith={(array) => {
            //   console.log('array.length', array.length)
            //   if (array.length === 0) {
            //     return [{ firstName: 'Tony' }]
            //   }
            // }}
            onChange={(data) => console.log('Array1 onChange', data)}
          >
            <MyViewItem />
            <MyEditItem />
          </Iterate.Array>

          {/* <Provider
            onSubmit={(data) => {
              console.log('onSubmit isolated', data)
            }}
          > */}
          <Iterate.Array.New
            path="/accounts"
            defaultValue={[{}]}
            // isolate
            // onChange={(data) => console.log('Array2 onChange', data)}
            // path="/x"
          >
            <MyEditItem
            // open
            // onDone={(item, { update }) => {
            //   console.log('item', item)
            //   update('/accounts', (array) => {
            //     return [...(array || []), item]
            //   })
            // }}
            />
            <Iterate.PushButton
              text="Add another account"
              // path="/accounts"
              pushValue={{}}
            />
          </Iterate.Array.New>
          {/* </Provider> */}

          {/* <Iterate.PushButton
            text="Add another account"
            path="/accounts"
            pushValue={{}}
          /> */}

          <Button
            onClick={() => {
              setCount((c) => c + 1)
            }}
          >
            count {count}
          </Button>
        </Card>

        <Form.SubmitButton variant="send" />
      </Flex.Vertical>
    </Form.Handler>
    // </React.StrictMode>
  )
}
