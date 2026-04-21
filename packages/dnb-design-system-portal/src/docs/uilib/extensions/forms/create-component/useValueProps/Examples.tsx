import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  ValueBlock,
  Form,
  useValueProps,
} from '@dnb/eufemia/src/extensions/forms'
import { formatCurrency } from '@dnb/eufemia/src/components/number-format/NumberUtils'

export const CustomComponentExample = () => {
  return (
    <ComponentBox scope={{ useValueProps, ValueBlock, formatCurrency }}>
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
              {formatCurrency(value)} kroner
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
