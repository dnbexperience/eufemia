import { screen, render } from '@testing-library/react'
import { Field, Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.Address', () => {
  it('renders value', () => {
    render(<Value.Address value="Dronning Eufemias gate 30" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Dronning Eufemias gate 30')
  })

  it('renders a default label', () => {
    render(<Value.Address showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Address.label
    )
  })

  it('lets an inherited label win over the default label', () => {
    render(
      <Form.Handler>
        <Field.Address path="/address" label="Leveringsadresse" />
        <Value.Address path="/address" inheritLabel showEmpty />
        <Value.SummaryList inheritLabel>
          <Value.Address path="/address" showEmpty />
        </Value.SummaryList>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-value-string .dnb-form-label')
    ).toHaveTextContent('Leveringsadresse')
    expect(document.querySelector('dt')).toHaveTextContent(
      'Leveringsadresse'
    )
  })

  it('renders the default label when there is no label to inherit', () => {
    render(<Value.Address path="/address" inheritLabel showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.Address.label
    )
  })

  it('renders no label when label is false', () => {
    render(<Value.Address label={false} showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toBeNull()
  })

  it('renders custom label', () => {
    render(<Value.Address label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders PostalAddress label', () => {
    render(<Value.Address.Postal showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.PostalAddress.label
    )
  })

  it('renders StreetAddress label', () => {
    render(<Value.Address.Street showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.StreetAddress.label
    )
  })

  it('renders placeholder', () => {
    render(<Value.Address placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'Dronning Eufemias gate 30' }}>
        <Value.Address path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Dronning Eufemias gate 30')
  })
})
