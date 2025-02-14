import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
import { topMovies } from '../../../../../components/autocomplete/Examples'

export const BasicUsage = () => {
  return (
    <ComponentBox scope={{ topMovies }}>
      {() => {
        const onTypeHandler = (
          value,
          { showIndicator, hideIndicator, updateData, debounce },
        ) => {
          showIndicator()
          debounce(
            ({ value }) => {
              console.log('debounced value:', value)

              // Simulate server delay
              const timeout = setTimeout(() => {
                updateData(topMovies)
                hideIndicator()
              }, 600)

              return () => clearTimeout(timeout)
            },
            { value },
            250,
          )
        }

        const transformOut = (index) => {
          return topMovies[index]?.content ?? topMovies[index]
        }

        return (
          <Form.Handler onSubmit={console.log}>
            <Form.Card>
              <Field.Autocomplete
                label="Autocomplete"
                placeholder="Search ..."
                help={{
                  title: 'Help title',
                  content: 'Help content',
                }}
                onType={onTypeHandler}
                transformOut={transformOut}
                mode="async"
                path="/movieTitle"
                required
              />
              <Tools.Log />
            </Form.Card>

            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
