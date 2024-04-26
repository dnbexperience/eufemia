import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  ValueBlock,
  Form,
  useValueProps,
} from '@dnb/eufemia/src/extensions/forms'
import { format } from '@dnb/eufemia/src/components/number-format/NumberUtils'

export const CustomComponentExample = () => {
  return (
    <ComponentBox scope={{ useValueProps, ValueBlock, format }}>
      {() => {
        const MyValueComponent = (props) => {
          const preparedProps = {
            label: 'Default Label',
            ...props,
            toInput: (value) => value + 10,
          }

          const { value, ...rest } = useValueProps(preparedProps)

          return (
            <ValueBlock {...rest}>
              {format(value, { currency: true })} kroner
            </ValueBlock>
          )
        }

        return (
          <Form.Handler data={{ myValue: 10 }}>
            <MyValueComponent
              label="Amount"
              path="/myValue"
              transformIn={(value) => value * 2}
            />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
