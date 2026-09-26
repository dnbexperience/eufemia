import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.NationalIdentityNumber', () => {
  it('renders value', () => {
    render(<Value.NationalIdentityNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.NationalIdentityNumber showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.NationalIdentityNumber.label
    )
  })

  it('renders value and label', () => {
    render(<Value.NationalIdentityNumber value="20001234567" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.NationalIdentityNumber.label
    )
  })

  it('renders custom label', () => {
    render(<Value.NationalIdentityNumber label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.NationalIdentityNumber placeholder="Enter some value" />)
    expect(screen.getByText('Enter some value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: '20001234567' }}>
        <Value.NationalIdentityNumber path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('200012 34567')
  })

  it('does not render when value is null', () => {
    render(<Value.NationalIdentityNumber value={null} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('does not render when value is undefined', () => {
    render(<Value.NationalIdentityNumber value={undefined} />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  it('announces the value to screen readers', () => {
    render(<Value.NationalIdentityNumber value="18089212345" />)

    expect(
      document.querySelector('.dnb-sr-only').getAttribute('data-text')
    ).toBe('18 08 92 1 2 3 4 5')
  })

  it('gives the formatted string to transformIn', () => {
    const transformIn = vi.fn((value) => value)

    render(
      <Value.NationalIdentityNumber
        value="18089212345"
        transformIn={transformIn}
      />
    )

    expect(transformIn).toHaveBeenCalledWith('180892 12345')
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('180892 12345')
  })

  it('does not reformat a custom transformIn result', () => {
    render(
      <Value.NationalIdentityNumber
        value="18089212345"
        transformIn={(value) => `${String(value).slice(0, 6)} *****`}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('180892 *****')
    expect(document.querySelector('.dnb-sr-only')).toBeNull()
  })
})
