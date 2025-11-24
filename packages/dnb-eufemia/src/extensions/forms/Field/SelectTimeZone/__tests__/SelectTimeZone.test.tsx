import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '../SelectTimeZone'
import { Provider } from '../../../../../shared'
import DataContext from '../../../DataContext/Context'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'
import { Field, Form, FieldBlock, Value, Iterate } from '../../..'
import { TimeZoneIdentifier } from '../../../constants/timezones'

describe('Field.SelectTimeZone', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.SelectTimeZone {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('should support size', () => {
    render(<Field.SelectTimeZone size="large" />)

    const autocompleteElement: HTMLInputElement = document.querySelector(
      '.dnb-autocomplete'
    )
    expect(autocompleteElement.classList).toContain(
      'dnb-autocomplete--large'
    )

    const selectTimeZoneElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone'
    )
    expect(selectTimeZoneElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )
  })

  it('should return correct value onChange event', () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()

    render(
      <Field.SelectTimeZone
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    expect(inputElement).toHaveValue('')

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'Oslo' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe('Europe/Oslo')
    expect(inputElement).toHaveValue('Oslo')
  })

  it('should select matching timezone on type change to support autofill', async () => {
    const onChange = jest.fn()

    render(<Field.SelectTimeZone onChange={onChange} />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )
    const liElements = () =>
      document.querySelectorAll('li:not([aria-hidden])')
    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'stock' },
      nativeEvent: undefined,
    })

    expect(inputElement).toHaveValue('Stockholm')
    expect(liElements().length).toBeGreaterThan(0)
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe('Europe/Stockholm')
  })

  it('should filter timezones list with given filterTimeZones', () => {
    render(
      <Field.SelectTimeZone
        filterTimeZones={({ timezone }) =>
          timezone.startsWith('Europe/')
        }
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(0)
    // All should be Europe timezones
    liElements.forEach((el) => {
      expect(el.textContent).toBeTruthy()
    })
  })

  it('should by default sort prioritized timezones on top', () => {
    render(<Field.SelectTimeZone />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(0)
    expect(liElements[0].textContent).toBe('Oslo')
    expect(liElements[1].textContent).toBe('Stockholm')
    expect(liElements[2].textContent).toBe('Copenhagen')
    expect(liElements[3].textContent).toBe('Helsingfors')
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <Field.SelectTimeZone required />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-submit-button'
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should use value from path', () => {
    render(
      <Form.Handler defaultData={{ timezone: 'Europe/Oslo' }}>
        <Field.SelectTimeZone path="/timezone" />
      </Form.Handler>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )

    expect(inputElement.value).toBe('Oslo')
  })

  it('should use value from itemPath inside iterate', () => {
    render(
      <Form.Handler
        defaultData={{
          items: [
            { timezone: 'Europe/Oslo' },
            { timezone: 'Europe/Copenhagen' },
          ],
        }}
      >
        <Iterate.Array path="/items">
          <Field.SelectTimeZone itemPath="/timezone" />
        </Iterate.Array>
      </Form.Handler>
    )

    const [oslo, copenhagen] = Array.from(
      document.querySelectorAll('.dnb-forms-field-select-timezone')
    )

    expect(oslo.querySelector('input')).toHaveValue('Oslo')
    expect(copenhagen.querySelector('input')).toHaveValue('Copenhagen')
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <Field.SelectTimeZone required validateInitially />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    rerender(<Field.SelectTimeZone validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should change locale', async () => {
    const { rerender } = render(
      <Provider>
        <Field.SelectTimeZone value="Europe/Oslo" />
      </Provider>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-timezone input'
    )

    fireEvent.mouseDown(inputElement)

    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    expect(inputElement.value).toBe('Oslo')
    expect(selectedItemElement().textContent).toBe('Oslo')

    rerender(
      <Provider locale="en-GB">
        <Field.SelectTimeZone value="Europe/Oslo" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    await waitFor(() => {
      expect(inputElement.value).toBe('Oslo')
      expect(selectedItemElement().textContent).toBe('Oslo')
    })
  })

  it('renders error', () => {
    const errorMessage = new Error('Error message')
    render(<Field.SelectTimeZone error={errorMessage} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('shows error style in FieldBlock', () => {
    const errorMessage = new Error('Error message')
    render(
      <FieldBlock>
        <Field.SelectTimeZone error={errorMessage} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('should support "transformIn" and "transformOut"', async () => {
    const transformOut = jest.fn((value, timezone) => {
      if (value) {
        return `${timezone.name} (${value})`
      }
    })
    const transformIn = jest.fn((external) => {
      return String(external).match(/\((.*)\)/)?.[1] || external
    })
    const valueTransformIn = jest.fn((internal) => {
      return String(internal).match(/\((.*)\)/)?.[1]
    })

    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.SelectTimeZone
          path="/timezone"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="Europe/Oslo"
        />

        <Value.SelectTimeZone
          path="/timezone"
          transformIn={valueTransformIn}
        />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const value = document.querySelector('.dnb-forms-value-block__content')

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    expect(input).toHaveValue('Oslo')
    expect(value).toHaveTextContent('Oslo')
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler locale="en-GB">
        <Field.SelectTimeZone path="/timezone" defaultValue="Europe/Oslo" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/timezone': {
        type: 'field',
        value: 'Oslo',
      },
    })
  })

  it('should support "defaultValue" with "itemPath" inside a PushContainer with without opening the drawer', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/persons">
          <Field.SelectTimeZone itemPath="/" defaultValue="Europe/Oslo" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-drawer-list__option')
    ).not.toBeInTheDocument()
  })

  it('should have default autoComplete', () => {
    render(<Field.SelectTimeZone />)
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('off')
  })

  it('should render autoComplete when provided', () => {
    render(<Field.SelectTimeZone autoComplete="timezone" />)
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('timezone')
  })

  it('should render open button', async () => {
    render(<Field.SelectTimeZone value="Europe/Oslo" />)

    const button = document.querySelector('button')
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(firstItemElement()).toHaveTextContent('Oslo')
  })

  it('should open when clicking on the input', async () => {
    render(<Field.SelectTimeZone value="Europe/Oslo" />)

    const input = document.querySelector('input')
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    expect(input).toBeInTheDocument()

    await userEvent.click(input)

    await waitFor(() => {
      expect(firstItemElement()).toHaveTextContent('Oslo')
    })
  })

  it('should select whole input value on click', async () => {
    render(<Field.SelectTimeZone defaultValue="Europe/Oslo" noAnimation />)

    const input: HTMLInputElement = document.querySelector(
      '.dnb-autocomplete input'
    )

    await userEvent.click(input)

    await waitFor(() => {
      expect(input.selectionStart).toBe(0)
      expect(input.selectionEnd).toBe(4)
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.SelectTimeZone required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.SelectTimeZone required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.SelectTimeZone required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})

