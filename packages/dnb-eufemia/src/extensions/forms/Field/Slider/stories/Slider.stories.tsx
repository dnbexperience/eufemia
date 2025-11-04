import { Field, Form, Tools, Value } from '../../..'
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
            decimalLimit={0}
          />
          <Field.Currency
            path="/mySecondValue"
            width="stretch"
            decimalLimit={0}
          />
        </Flex.Horizontal>

        <Field.Slider
          id="test"
          paths={['/myValue', '/mySecondValue']}
          min="/minValue"
          max="/maxValue"
        />

        <Field.Slider
          label="Slider"
          help={{ content: 'Help text' }}
          path="/myValue"
          min="/minValue"
          max="/maxValue"
        />
      </Flex.Stack>
    </Form.Handler>
  )
}

const transformOut = (internal) => {
  return { someValue: internal }
}

const transformIn = (external: any) => {
  if (external) {
    const { someValue } = external
    return someValue
  }
}

export const SlidersTransformers = () => {
  return (
    <Form.Handler
      defaultData={{
        myField: {
          someValue: 21,
        },
      }}
    >
      <Form.Card space>
        <Field.Slider
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />

        <Tools.Log />
      </Form.Card>
    </Form.Handler>
  )
}
