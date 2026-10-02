import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate } from '..'
import nbNO from '../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('htmlAttributes event handlers on fields', () => {
  it('Field.String should let an onChange returning false block the change', async () => {
    const fieldOnChange = vi.fn()

    render(
      <Field.String
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: () => false }}
      />
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'abc')

    expect(input).toHaveValue('')
    expect(fieldOnChange).toHaveBeenCalledTimes(0)
  })

  it('Field.String should keep its own onChange when htmlAttributes has one', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.String
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.type(document.querySelector('input'), 'a')

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('a', expect.anything())
  })

  it('Field.String should keep its own onFocus when htmlAttributes has one', async () => {
    const fieldOnFocus = vi.fn()
    const attributeOnFocus = vi.fn()

    render(
      <Field.String
        onFocus={fieldOnFocus}
        htmlAttributes={{ onFocus: attributeOnFocus }}
      />
    )

    await userEvent.click(document.querySelector('input'))

    expect(attributeOnFocus).toHaveBeenCalledTimes(1)
    expect(fieldOnFocus).toHaveBeenCalledTimes(1)
  })

  it('Field.String should call both onKeyDown handlers', async () => {
    const fieldOnKeyDown = vi.fn()
    const attributeOnKeyDown = vi.fn()

    render(
      <Field.String
        onKeyDown={fieldOnKeyDown}
        htmlAttributes={{ onKeyDown: attributeOnKeyDown }}
      />
    )

    await userEvent.type(document.querySelector('input'), 'a')

    expect(attributeOnKeyDown).toHaveBeenCalledTimes(1)
    expect(fieldOnKeyDown).toHaveBeenCalledTimes(1)
  })

  it('Field.Number should keep the arrow key stepping when htmlAttributes has an onKeyDown', async () => {
    const attributeOnKeyDown = vi.fn()

    render(
      <Field.Number
        showStepControls
        value={1}
        htmlAttributes={{ onKeyDown: attributeOnKeyDown }}
      />
    )

    const input = document.querySelector('input')

    await userEvent.click(input)
    await userEvent.keyboard('{ArrowUp}')

    expect(attributeOnKeyDown).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('2')
  })

  it('Field.Number should keep its own onChange when htmlAttributes has one', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.Number
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.type(document.querySelector('input'), '1')

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith(1, expect.anything())
  })

  it('Field.Toggle should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.click(document.querySelector('input[type="checkbox"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('on', expect.anything())
  })

  it('Field.Boolean should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.Boolean
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.click(document.querySelector('input[type="checkbox"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('Field.Indeterminate should keep the htmlAttributes it is given', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Form.Handler>
        <Field.Indeterminate
          dependencePaths={['/a']}
          onChange={fieldOnChange}
          htmlAttributes={{
            onChange: attributeOnChange,
            'data-custom': 'value',
          }}
        />
        <Field.Boolean path="/a" />
      </Form.Handler>
    )

    const [checkbox] = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )

    expect(checkbox).toHaveAttribute('data-custom', 'value')
    expect(checkbox).toHaveAttribute('aria-controls')

    await userEvent.click(checkbox)

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
  })

  it('Field.ArraySelection should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.ArraySelection
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      >
        <Field.Option value="a" title="A" />
      </Field.ArraySelection>
    )

    await userEvent.click(document.querySelector('input[type="checkbox"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith(['a'], expect.anything())
  })

  it('Field.MultiSelection should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.MultiSelection
        data={[{ value: 'a', title: 'A' }]}
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.click(document.querySelector('button'))
    await userEvent.click(document.querySelector('input[type="checkbox"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
  })

  it('Field.SelectCountry should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.SelectCountry
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.click(document.querySelector('input'))
    await userEvent.keyboard('Norge')
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('NO', expect.anything())
  })

  it('Field.SelectCurrency should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.SelectCurrency
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      />
    )

    await userEvent.click(document.querySelector('input'))
    await userEvent.keyboard('NOK')
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('NOK', expect.anything())
  })

  it('Field.Selection with a dropdown should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.Selection
        variant="dropdown"
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      >
        <Field.Option value="a" title="A" />
      </Field.Selection>
    )

    await userEvent.click(document.querySelector('button'))
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('a', expect.anything())
  })

  it('Field.Selection with an autocomplete should call both onChange handlers', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Field.Selection
        variant="autocomplete"
        onChange={fieldOnChange}
        htmlAttributes={{ onChange: attributeOnChange }}
      >
        <Field.Option value="a" title="Apple" />
      </Field.Selection>
    )

    await userEvent.click(document.querySelector('input'))
    await userEvent.keyboard('App')
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('a', expect.anything())
  })

  it('Field.Date should keep its own onChange when htmlAttributes has one', async () => {
    const fieldOnChange = vi.fn()
    const attributeOnChange = vi.fn()

    render(
      <Form.Handler>
        <Field.Date
          path="/date"
          value="2025-08-01"
          onChange={fieldOnChange}
          htmlAttributes={{ onChange: attributeOnChange }}
        />
      </Form.Handler>
    )

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )
    await userEvent.click(
      document.querySelector('td[data-date="2025-08-14"] button')
    )

    expect(attributeOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith(
      '2025-08-14',
      expect.anything()
    )
  })

  it('Field.Date should call both onCancel handlers and still revert', async () => {
    const attributeOnCancel = vi.fn()

    render(
      <Form.Handler>
        <Field.Date
          path="/date"
          value="2025-08-01"
          showCancelButton
          htmlAttributes={{ onCancel: attributeOnCancel }}
        />
      </Form.Handler>
    )

    const [day] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )
    await userEvent.click(
      document.querySelector('td[data-date="2025-08-14"] button')
    )
    await userEvent.click(
      document.querySelector('button[data-testid="cancel"]')
    )

    expect(attributeOnCancel).toHaveBeenCalledTimes(1)
    expect(day.value).toBe('01')
  })
})

describe('event handlers in component prop bags', () => {
  it('Field.Selection with a dropdown should call both onChange handlers when dropdownProps has one', async () => {
    const fieldOnChange = vi.fn()
    const givenOnChange = vi.fn()

    render(
      <Field.Selection
        variant="dropdown"
        onChange={fieldOnChange}
        dropdownProps={{ onChange: givenOnChange }}
      >
        <Field.Option value="a" title="A" />
      </Field.Selection>
    )

    await userEvent.click(document.querySelector('button'))
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(givenOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('a', expect.anything())
  })

  it('Field.Selection with an autocomplete should call both onChange handlers when autocompleteProps has one', async () => {
    const fieldOnChange = vi.fn()
    const givenOnChange = vi.fn()

    render(
      <Field.Selection
        variant="autocomplete"
        onChange={fieldOnChange}
        autocompleteProps={{ onChange: givenOnChange }}
      >
        <Field.Option value="a" title="Apple" />
      </Field.Selection>
    )

    await userEvent.click(document.querySelector('input'))
    await userEvent.keyboard('App')
    await userEvent.click(document.querySelector('li[role="option"]'))

    expect(givenOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledTimes(1)
    expect(fieldOnChange).toHaveBeenCalledWith('a', expect.anything())
  })

  it('Field.Selection with an autocomplete should call a given onType once', async () => {
    const givenOnType = vi.fn()

    render(
      <Field.Selection
        variant="autocomplete"
        autocompleteProps={{ onType: givenOnType }}
      >
        <Field.Option value="a" title="Apple" />
      </Field.Selection>
    )

    await userEvent.click(document.querySelector('input'))
    await userEvent.keyboard('A')

    expect(givenOnType).toHaveBeenCalledTimes(1)
  })

  it('Iterate.PushButton should keep pushing when an onClick is given', async () => {
    const givenOnClick = vi.fn()

    render(
      <Form.Handler data={{ list: ['first'] }}>
        <Iterate.Array path="/list">
          <Field.String itemPath="/" />
        </Iterate.Array>
        <Iterate.PushButton
          path="/list"
          pushValue="second"
          onClick={givenOnClick}
        />
      </Form.Handler>
    )

    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-push-button')
    )

    expect(givenOnClick).toHaveBeenCalledTimes(1)
    expect(document.querySelectorAll('input')).toHaveLength(2)
  })

  it('Iterate.RemoveButton should keep removing when an onClick is given', async () => {
    const givenOnClick = vi.fn()

    render(
      <Form.Handler data={{ list: ['first', 'second'] }}>
        <Iterate.Array path="/list">
          <Field.String itemPath="/" />
          <Iterate.RemoveButton onClick={givenOnClick} />
        </Iterate.Array>
      </Form.Handler>
    )

    expect(document.querySelectorAll('input')).toHaveLength(2)

    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-remove-element-button')
    )

    expect(givenOnClick).toHaveBeenCalledTimes(1)
    expect(document.querySelectorAll('input')).toHaveLength(1)
  })

  it('Iterate.RemoveButton should call a given handler it has no own handler for once', async () => {
    const givenOnMouseOver = vi.fn()

    render(
      <Form.Handler data={{ list: ['first'] }}>
        <Iterate.Array path="/list">
          <Iterate.RemoveButton onMouseOver={givenOnMouseOver} />
        </Iterate.Array>
      </Form.Handler>
    )

    await userEvent.hover(
      document.querySelector('.dnb-forms-iterate-remove-element-button')
    )

    expect(givenOnMouseOver).toHaveBeenCalledTimes(1)
  })

  it('Field.Date should keep validating while typing when an onType is given', async () => {
    const givenOnType = vi.fn()

    render(<Field.Date required onType={givenOnType} />)

    await userEvent.click(
      document.querySelector('.dnb-date-picker__input--day')
    )
    await userEvent.keyboard('07')
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorRequired)
    })
    expect(givenOnType).toHaveBeenCalled()
  })
})

describe('className in htmlAttributes on fields', () => {
  it('Field.String should keep its own className and add the given one', () => {
    render(<Field.String htmlAttributes={{ className: 'custom' }} />)

    expect(
      document.querySelector('.dnb-forms-field-string__input')
    ).toHaveClass('custom')
  })

  it('Field.Number should keep its own className and add the given one', () => {
    render(<Field.Number htmlAttributes={{ className: 'custom' }} />)

    expect(
      document.querySelector('.dnb-forms-field-number__input')
    ).toHaveClass('custom')
  })

  it('Field.Toggle should keep its own className and add the given one', () => {
    render(
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        htmlAttributes={{ className: 'custom' }}
      />
    )

    expect(document.querySelector('.dnb-checkbox')).toHaveClass(
      'dnb-forms-field-toggle',
      'custom'
    )
  })

  it('Field.ArraySelection should keep its own className and add the given one', () => {
    render(
      <Field.ArraySelection htmlAttributes={{ className: 'custom' }}>
        <Field.Option value="a" title="A" />
      </Field.ArraySelection>
    )

    expect(
      document.querySelector('.dnb-forms-field-array-selection__checkbox')
    ).toHaveClass('custom')
  })

  it('Field.MultiSelection should keep its own className and add the given one', async () => {
    render(
      <Field.MultiSelection
        data={[{ value: 'a', title: 'A' }]}
        htmlAttributes={{ className: 'custom' }}
      />
    )

    await userEvent.click(document.querySelector('button'))

    expect(
      document.querySelector('.dnb-forms-field-multi-selection__checkbox')
    ).toHaveClass('custom')
  })
})
