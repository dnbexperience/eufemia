import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const FirstName = () => {
  return (
    <ComponentBox>
      <Field.Name.First
        value="Nora"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LastName = () => {
  return (
    <ComponentBox>
      <Field.Name.Last
        value="Mørk"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CompanyName = () => {
  return (
    <ComponentBox>
      <Field.Name.Company
        value="DNB"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Name.Last
        placeholder="Custom placeholder"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Composition = () => {
  return (
    <ComponentBox>
      <Field.Composition width="large">
        <Field.Name.First
          value="Nora"
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Name.Last
          value="Mørk"
          onChange={(value) => console.log('onChange', value)}
        />
      </Field.Composition>
    </ComponentBox>
  )
}

export const FormHandler = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          firstName: 'Nora',
          lastName: 'Mørk',
        }}
        onChange={(value) => console.log('onChange', value)}
      >
        <Flex.Stack>
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Name.First
        value="Nora"
        help={{
          title: 'Help is available',
          content:
            'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const InvalidSyntax = () => {
  return (
    <ComponentBox>
      <Field.Name.First
        value="Invalid @ syntax"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.Name.First
        value="Nora"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Name.First
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}
