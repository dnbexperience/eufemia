import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} />
    </ComponentBox>
  )
}

export const WithDataProp = () => {
  return (
    <ComponentBox>
      {() => {
        const cities = [
          { value: 'oslo', title: 'Oslo' },
          { value: 'stockholm', title: 'Stockholm' },
          { value: 'copenhagen', title: 'Copenhagen' },
        ]

        return (
          <Value.MultiSelection
            value={['oslo', 'copenhagen']}
            data={cities}
          />
        )
      }}
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.MultiSelection
          value={['Oslo', 'Stockholm', 'Copenhagen']}
          inline
        />{' '}
        This is after the component
      </P>
    </ComponentBox>
  )
}

export const ListVariants = () => {
  return (
    <ComponentBox>
      <Value.SummaryList>
        <Value.MultiSelection
          value={['Oslo', 'Stockholm', 'Copenhagen']}
          label="Ordered List"
          variant="ol"
        />
        <Value.MultiSelection
          value={['Oslo', 'Stockholm', 'Copenhagen']}
          label="Unordered List"
          variant="ul"
        />
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const FieldMultiSelectionPath = () => {
  return (
    <ComponentBox>
      {() => {
        const cities = [
          { value: 'oslo', title: 'Oslo' },
          { value: 'stockholm', title: 'Stockholm' },
          { value: 'copenhagen', title: 'Copenhagen' },
          { value: 'helsinki', title: 'Helsinki' },
          { value: 'reykjavik', title: 'Reykjavik' },
        ]

        return (
          <Form.Handler>
            <Flex.Stack>
              <Value.MultiSelection
                inheritLabel
                path="/myPath"
                placeholder="No cities selected"
              />

              <Field.MultiSelection
                label="Select cities"
                path="/myPath"
                data={cities}
              />
            </Flex.Stack>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const WithDataPath = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          myItems: [
            { value: 'oslo', title: 'Oslo' },
            { value: 'stockholm', title: 'Stockholm' },
            { value: 'copenhagen', title: 'Copenhagen' },
          ],
          myPath: ['oslo', 'copenhagen'],
        }}
      >
        <Value.MultiSelection
          label="Selected cities"
          path="/myPath"
          dataPath="/myItems"
        />
      </Form.Handler>
    </ComponentBox>
  )
}
