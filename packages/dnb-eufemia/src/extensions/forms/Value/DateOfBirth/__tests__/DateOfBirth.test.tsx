import { render } from '@testing-library/react'
import { Field, Form, Value } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.DateOfBirth', () => {
  it('renders value', () => {
    render(<Value.DateOfBirth value="2024-05-17" />)
    expect(
      document.querySelector('.dnb-forms-value-block__content').textContent
    ).toBe('17. mai 2024')
  })

  it('renders default label', () => {
    render(<Value.DateOfBirth showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.DateOfBirth.label
    )
  })

  it('renders custom label', () => {
    render(<Value.DateOfBirth label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  describe('dateFormat', () => {
    it('should use default format when no dateFormat is provided', () => {
      render(<Value.DateOfBirth value="2024-05-17" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17. mai 2024')
    })

    it('should format date using yyyy/MM/dd format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="yyyy/MM/dd" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('2024/05/17')
    })

    it('should format date using dd/MM/yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="dd/MM/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17/05/2024')
    })

    it('should format date using MM/dd/yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="MM/dd/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('05/17/2024')
    })

    it('should format date using dd-MM-yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="dd-MM-yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17-05-2024')
    })

    it('should handle empty value with custom format', () => {
      render(<Value.DateOfBirth value="" dateFormat="dd/MM/yyyy" />)
      const contentElement = document.querySelector(
        '.dnb-forms-value-block__content'
      )
      expect(contentElement).toBeNull()
    })

    it('should read the value in the custom format', () => {
      render(
        <>
          <Value.DateOfBirth value="04/03/1990" dateFormat="dd/MM/yyyy" />
          <Value.DateOfBirth value="04.03.1990" dateFormat="dd.MM.yyyy" />
          <Value.DateOfBirth value="03/04/1990" dateFormat="MM/dd/yyyy" />
        </>
      )

      const contents = Array.from(
        document.querySelectorAll('.dnb-forms-value-block__content')
      ).map((element) => element.textContent)
      expect(contents).toEqual(['04/03/1990', '04.03.1990', '03/04/1990'])
    })

    it('should show the date stored by Field.DateOfBirth', () => {
      render(
        <Form.Handler defaultData={{ birthDate: '04/03/1990' }}>
          <Field.DateOfBirth path="/birthDate" dateFormat="dd/MM/yyyy" />
          <Value.DateOfBirth path="/birthDate" dateFormat="dd/MM/yyyy" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('04/03/1990')
    })

    it('should show a non-existent date as it is', () => {
      render(
        <Value.DateOfBirth value="2028-02-30" dateFormat="dd/MM/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('2028-02-30')
    })

    it('should handle invalid date with custom format', () => {
      render(
        <Value.DateOfBirth value="invalid-date" dateFormat="dd/MM/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('invalid-date')
    })
  })
})
