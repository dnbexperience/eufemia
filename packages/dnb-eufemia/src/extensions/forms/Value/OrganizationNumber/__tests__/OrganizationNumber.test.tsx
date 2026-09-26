import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.OrganizationNumber', () => {
  it('renders value', () => {
    render(<Value.OrganizationNumber value="123456789" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.OrganizationNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.OrganizationNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.OrganizationNumber value="123456789" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.OrganizationNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.OrganizationNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.OrganizationNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '123456789' }}>
        <Value.OrganizationNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })

  it('does not render when value is null', () => {
    render(<Value.OrganizationNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('does not render when value is undefined', () => {
    render(<Value.OrganizationNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('announces the value to screen readers', () => {
    render(<Value.OrganizationNumber value="123456789" />)

    expect(
      document.querySelector('.dnb-sr-only').getAttribute('data-text')
    ).toBe('1 2 3 4 5 6 7 8 9')
  })

  it('gives the formatted string to transformIn', () => {
    const transformIn = vi.fn((value) => value)

    render(
      <Value.OrganizationNumber
        value="123456789"
        transformIn={transformIn}
      />
    )

    expect(transformIn).toHaveBeenCalledWith('123 456 789')
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123 456 789')
  })

  it('does not reformat a custom transformIn result', () => {
    render(
      <Value.OrganizationNumber
        value="123456789"
        transformIn={(value) => `NO ${String(value)}`}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('NO 123 456 789')
    expect(document.querySelector('.dnb-sr-only')).toBeNull()
  })
})
