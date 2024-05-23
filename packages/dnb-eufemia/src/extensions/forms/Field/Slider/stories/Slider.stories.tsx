import { Field, Form, Value } from '../../..'
import { Flex, HelpButton } from '../../../../../components'
import { P } from '../../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/Slider',
}

export function Slider() {
  return (
    <Form.Handler
      defaultData={{
        myValue: 1000,
        mySecondValue: 4000,
        maxValue: 10000,
      }}
    >
      <Flex.Stack>
        <Flex.Horizontal align="center">
          <P>
            Engangsinnskudd (maks.{' '}
            <Value.Currency path="/maxValue" decimals={0} inline />)
          </P>

          <HelpButton>Help text</HelpButton>

          <Field.Currency
            path="/myValue"
            width="stretch"
            // decimals={0}
            decimalLimit={0}
          />
          <Field.Currency
            path="/mySecondValue"
            width="stretch"
            // decimals={0}
            decimalLimit={0}
          />
        </Flex.Horizontal>

        <Field.Slider
          id="test"
          // error={new Error('123')}
          paths={['/myValue', '/mySecondValue']}
          min="/minValue"
          max="/maxValue"
          // onChange={console.log}
        />
        {/* <Field.Slider
          value={[300, 700]}
          min={100}
          max={1000}
          onChange={console.log}
        /> */}
        <Field.Slider
          label="Slider"
          help={{ content: 'Help text' }}
          path="/myValue"
          min="/minValue"
          max="/maxValue"
        />
        {/* <Field.Slider
          label="Slider"
          help={{ content: 'Help text' }}
          path="/myValue"
          min="/minValue"
          max="/maxValue"
        /> */}
      </Flex.Stack>
    </Form.Handler>
  )
}
