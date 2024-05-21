import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Iterate, Value } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Form.Handler data={{ myList: ['foo', 'bar'] }}>
        <Iterate.Count path="/myList" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Interactive = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      {() => {
        const MyForm = () => {
          const { count } = Iterate.useCount('myForm')
          return (
            <Form.Handler id="myForm" data={{ myList: [1, 2] }}>
              <output>
                Total: <Iterate.Count path="/myList" />
              </output>

              <Iterate.Array path="/myList">
                <Iterate.AnimatedContainer gap={false}>
                  <Flex.Horizontal align="center">
                    <strong>
                      <Value.Number itemPath="/" />
                    </strong>
                    <Iterate.RemoveButton />
                  </Flex.Horizontal>
                </Iterate.AnimatedContainer>
              </Iterate.Array>
              <Iterate.PushButton
                path="/myList"
                pushValue={() => {
                  return (
                    Iterate.count({ id: 'myForm', path: '/myList' }) + 1
                  )
                }}
                top
              >
                Add item nr. {count('/myList') + 1}
              </Iterate.PushButton>
            </Form.Handler>
          )
        }
        return <MyForm />
      }}
    </ComponentBox>
  )
}
