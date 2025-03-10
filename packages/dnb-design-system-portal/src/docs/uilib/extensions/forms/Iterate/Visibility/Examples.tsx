import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Iterate,
  TestElement,
} from '@dnb/eufemia/src/extensions/forms'

export const BasicExample = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Form.Handler
        defaultData={{
          myList: [
            {
              toggleValue: false,
            },
            {
              toggleValue: true,
            },
          ],
        }}
      >
        <Iterate.Array path="/myList">
          <Field.Boolean
            label="Show content for item no. {itemNo}"
            variant="checkbox"
            itemPath="/toggleValue"
          />
          <Iterate.Visibility pathTrue="/toggleValue" animate>
            <TestElement>
              <Iterate.ItemNo>
                {'Hide and show me item no. {itemNo}'}
              </Iterate.ItemNo>
            </TestElement>
          </Iterate.Visibility>
        </Iterate.Array>
      </Form.Handler>
    </ComponentBox>
  )
}
