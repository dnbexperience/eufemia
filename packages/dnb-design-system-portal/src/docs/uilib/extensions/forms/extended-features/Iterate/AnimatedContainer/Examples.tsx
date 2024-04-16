import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card } from '@dnb/eufemia/src'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      {() => {
        const MyForm = () => {
          const { data } = Form.useData('myList')

          return (
            <Form.Handler
              id="myList"
              defaultData={{
                myList: ['Item 1'],
              }}
            >
              <Card stack>
                <Iterate.Array
                  path="/myList"
                  placeholder={<>Empty list</>}
                >
                  <Iterate.AnimatedContainer title="Title">
                    <Field.String label="Label" itemPath="/" />

                    <Iterate.Toolbar>
                      <Iterate.ArrayRemoveElementButton />
                    </Iterate.Toolbar>
                  </Iterate.AnimatedContainer>
                </Iterate.Array>

                <Iterate.ArrayPushButton
                  path="/myList"
                  pushValue={
                    'Item ' + String(data?.['myList']?.length + 1)
                  }
                  text="Add new item"
                />
              </Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
