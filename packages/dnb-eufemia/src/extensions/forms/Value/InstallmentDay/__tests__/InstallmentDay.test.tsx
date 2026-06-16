import { render } from '@testing-library/react'
import { Value, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].InstallmentDay

describe('Value.InstallmentDay', () => {
  it('should render value', () => {
    render(<Value.InstallmentDay value={15} />)

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toHaveTextContent('15')
  })

  it('should render default label', () => {
    render(<Value.InstallmentDay value={1} />)

    const label = document.querySelector('.dnb-form-label')
    expect(label).toHaveTextContent(nb.label)
  })

  it('should render custom label', () => {
    render(<Value.InstallmentDay label="Custom label" value={1} />)

    const label = document.querySelector('.dnb-form-label')
    expect(label).toHaveTextContent('Custom label')
  })

  it('should render nothing when value is undefined', () => {
    render(<Value.InstallmentDay />)

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toBeNull()
  })

  it('should render label when showEmpty is true', () => {
    render(<Value.InstallmentDay label="Day" showEmpty />)

    const label = document.querySelector('.dnb-form-label')
    expect(label).toHaveTextContent('Day')
  })

  it('should work with Form.Handler data context', () => {
    render(
      <Form.Handler defaultData={{ installmentDay: 20 }}>
        <Value.InstallmentDay path="/installmentDay" />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toHaveTextContent('20')
  })

  it('should render value 1', () => {
    render(<Value.InstallmentDay value={1} />)

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toHaveTextContent('1')
  })

  it('should render value 31', () => {
    render(<Value.InstallmentDay value={31} />)

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toHaveTextContent('31')
  })

  it('should render last day label when value is "last"', () => {
    render(<Value.InstallmentDay value="last" />)

    const element = document.querySelector(
      '.dnb-forms-value-installment-day'
    )
    expect(element).toHaveTextContent(nb.lastDayLabel)
  })
})
