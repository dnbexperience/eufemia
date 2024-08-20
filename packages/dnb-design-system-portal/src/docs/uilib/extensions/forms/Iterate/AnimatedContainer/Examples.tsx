import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card } from '@dnb/eufemia/src'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const { count } = Iterate.useCount('myForm')
          return (
            <Form.Handler
              defaultData={{
                myList: ['Item 1'],
              }}
              id="myForm"
            >
              <Card stack>
                <Iterate.Array
                  path="/myList"
                  placeholder={<>Empty list</>}
                >
                  <Iterate.AnimatedContainer title="Title">
                    <Field.String label="Label" itemPath="/" />

                    <Iterate.Toolbar>
                      <Iterate.RemoveButton />
                    </Iterate.Toolbar>
                  </Iterate.AnimatedContainer>
                </Iterate.Array>

                <Iterate.PushButton
                  path="/myList"
                  pushValue={'Item ' + String(count('/myList') + 1)}
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
