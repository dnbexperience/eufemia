import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mergeHtmlAttributes from '../mergeHtmlAttributes'
import { Field } from '../..'

type Handlers = Record<string, (...args: Array<unknown>) => unknown>

describe('mergeHtmlAttributes', () => {
  it('should return the given props when no htmlAttributes are given', () => {
    const props = { id: 'unique' }

    expect(mergeHtmlAttributes(props)).toBe(props)
  })

  it('should let htmlAttributes win over non-handler props', () => {
    const merged = mergeHtmlAttributes(
      { 'aria-label': 'own' },
      { 'aria-label': 'given' }
    )

    expect(merged['aria-label']).toBe('given')
  })

  it('should call both the given and the own handler', () => {
    const own = vi.fn()
    const given = vi.fn()

    const merged = mergeHtmlAttributes(
      { onKeyDown: own },
      { onKeyDown: given }
    ) as Handlers
    merged.onKeyDown({ key: 'a' })

    expect(given).toHaveBeenCalledTimes(1)
    expect(own).toHaveBeenCalledTimes(1)
    expect(given).toHaveBeenCalledWith({ key: 'a' })
    expect(own).toHaveBeenCalledWith({ key: 'a' })
  })

  it('should call the given handler before the own handler', () => {
    const order: Array<string> = []

    const merged = mergeHtmlAttributes(
      { onKeyDown: () => order.push('own') },
      { onKeyDown: () => order.push('given') }
    ) as Handlers
    merged.onKeyDown()

    expect(order).toEqual(['given', 'own'])
  })

  it('should skip the own handler when the given handler returns false', () => {
    const own = vi.fn()

    const merged = mergeHtmlAttributes(
      { onChange: own },
      { onChange: () => false }
    ) as Handlers

    expect(merged.onChange()).toBe(false)
    expect(own).toHaveBeenCalledTimes(0)
  })

  it('should return the result of the own handler', () => {
    const merged = mergeHtmlAttributes(
      { onChange: () => 'own' },
      { onChange: () => undefined }
    ) as Handlers

    expect(merged.onChange()).toBe('own')
  })

  it('should keep the given handler when the field has no own handler', () => {
    const given = vi.fn()

    const merged = mergeHtmlAttributes(
      {},
      { onKeyDown: given }
    ) as Handlers
    merged.onKeyDown()

    expect(given).toHaveBeenCalledTimes(1)
  })

  it('should not compose props that are not event handlers', () => {
    const own = vi.fn()
    const given = vi.fn()

    const merged = mergeHtmlAttributes(
      { onto: own },
      { onto: given }
    ) as Handlers
    merged.onto()

    expect(given).toHaveBeenCalledTimes(1)
    expect(own).toHaveBeenCalledTimes(0)
  })
})

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
})
