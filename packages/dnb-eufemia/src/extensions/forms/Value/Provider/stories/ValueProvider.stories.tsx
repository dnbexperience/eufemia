import { Field, Form, Value } from '../../..'
import { HeightAnimation } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/ValueProvider',
}

export function ValueProvider() {
  return (
    <Form.Handler>
      <Form.Card>
        <Field.Boolean
          variant="button"
          path="/isVisible"
          defaultValue={true}
        />

        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Name.First path="/foo" defaultValue="foo" />
          <Field.Name.Last path="/bar" defaultValue="bar" />
        </Form.Visibility>

        <HeightAnimation>
          <Value.Provider inheritVisibility>
            <Value.SummaryList>
              <Value.Name.First path="/foo" />
              <Value.Name.First path="/bar" />
            </Value.SummaryList>
          </Value.Provider>
        </HeightAnimation>
      </Form.Card>
    </Form.Handler>
  )
}
