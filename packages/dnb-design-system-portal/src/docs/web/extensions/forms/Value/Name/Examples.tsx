import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const FirstName = () => {
  return (
    <ComponentBox>
      <Value.Name.First value="Nora" />
    </ComponentBox>
  )
}

export const LastName = () => {
  return (
    <ComponentBox>
      <Value.Name.Last value="Mørk" />
    </ComponentBox>
  )
}

export const CompanyName = () => {
  return (
    <ComponentBox>
      <Value.Name.Company value="DNB" />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Name.Last placeholder="Custom placeholder" />
    </ComponentBox>
  )
}

export const Composition = () => {
  return (
    <ComponentBox>
      <Value.Composition>
        <Value.Name.First value="Nora" />
        <Value.Name.Last value="Mørk" />
      </Value.Composition>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          firstName: 'Nora',
          lastName: 'Mørk',
        }}
      >
        <P>
          This is before the component{' '}
          <Value.Name.First path="/firstName" inline />{' '}
          <Value.Name.Last path="/lastName" inline /> This is after the
          component
        </P>
      </Form.Handler>
    </ComponentBox>
  )
}
