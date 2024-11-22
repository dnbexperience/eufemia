import { Section } from '../../../../../components'
import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/ArraySelection',
}

export function NestingWithLogic() {
  return (
    <Form.Handler>
      <Form.Card>
        <Field.ArraySelection
          // variant="checkbox"
          // variant="button"
          label="Make a selection"
          path="/mySelection"
          // defaultValue={['showInput']}
        >
          <Field.Option
            value="nothing"
            title="Nothing"
            help={{
              title: 'Help title',
              content: 'Help content',
            }}
          />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value: string[]) => {
                return Boolean(value?.includes('showInput'))
              },
            }}
            compensateForGap="auto"
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value: string[]) =>
                Boolean(value?.includes('showAdditionalOption')),
            }}
            compensateForGap="auto"
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: (value: string[]) => {
                  return Boolean(value?.includes('showMeMore'))
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Form.Card>
    </Form.Handler>
  )
}

export function SelectUpToThree() {
  const data = [
    { value: 'oslo', title: 'Oslo' },
    { value: 'stockholm', title: 'Stockholm' },
    { value: 'copenhagen', title: 'Copenhagen' },
    { value: 'helsinki', title: 'Helsinki' },
    { value: 'reykjavik', title: 'Reykjavik' },
    { value: 'antananarivo', title: 'Antananarivo' },
    { value: 'nuuk', title: 'Nuuk' },
    { value: 'nairobi', title: 'Nairobi' },
    { value: 'tokyo', title: 'Tokyo' },
  ]

  return (
    <Form.Card>
      <Field.ArraySelection
        label={
          <>
            Which capitals would you most like to visit?
            <br />
            <em style={{ fontSize: '0.8em' }}>
              Select between two and three
            </em>
          </>
        }
        required
        optionsLayout="horizontal"
        variant="button"
        data={data}
        schema={{
          type: 'array',
          minItems: 2,
          maxItems: 3,
        }}
        errorMessages={{
          minItems: 'You must select at least two',
          maxItems: 'You can only select up to three',
        }}
      />
    </Form.Card>
  )
}
