import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.PostalCodeAndCity', () => {
  it('renders value', () => {
    render(<Value.PostalCodeAndCity value="0010 Oslo" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010 Oslo')
  })

  it('renders only city', () => {
    render(<Value.PostalCodeAndCity city={{ value: 'Oslo' }} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Oslo')
  })

  it('renders only postalCode', () => {
    render(<Value.PostalCodeAndCity postalCode={{ value: '0010' }} />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.PostalCodeAndCity showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.PostalCodeAndCity.label
    )
  })

  it('renders value and label', () => {
    render(<Value.PostalCodeAndCity value="0010 Oslo" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010 Oslo')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.PostalCodeAndCity.label
    )
  })

  it('renders custom label', () => {
    render(<Value.PostalCodeAndCity label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.PostalCodeAndCity placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '0010 Oslo' }}>
        <Value.PostalCodeAndCity path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010 Oslo')
  })

  it('renders city value from path', () => {
    render(
      <Form.Handler data={{ myCity: 'Oslo' }}>
        <Value.PostalCodeAndCity city={{ path: '/myCity' }} />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Oslo')
  })

  it('renders postalCode value from path', () => {
    render(
      <Form.Handler data={{ myPostalCode: '0010' }}>
        <Value.PostalCodeAndCity postalCode={{ path: '/myPostalCode' }} />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010')
  })

  it('renders city and postalCode value from path', () => {
    render(
      <Form.Handler data={{ myPostalCode: '0010', myCity: 'Oslo' }}>
        <Value.PostalCodeAndCity
          postalCode={{ path: '/myPostalCode' }}
          city={{ path: '/myCity' }}
        />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('0010')
  })
})
