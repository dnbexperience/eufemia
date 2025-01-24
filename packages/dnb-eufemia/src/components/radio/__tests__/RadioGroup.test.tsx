/**
 * Radio Test
 *
 */

import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Radio from '../Radio'
import { Provider } from '../../../shared'

describe('Radio group component', () => {
  it('should not have _formElement property', () => {
    expect(Radio.Group['_formElement']).toBeUndefined()
  })

  it('has to set correct value using keys', () => {
    const my_event = jest.fn()
    render(
      <Radio.Group
        label="Label"
        name="group"
        id="group"
        on_change={my_event}
      >
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )
    fireEvent.click(document.querySelectorAll('input')[0])
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].value).toBe('first')
    expect(my_event.mock.calls[0][0].event).toBeType('object')

    fireEvent.click(document.querySelectorAll('input')[1])
    expect(my_event.mock.calls.length).toBe(2)
    expect(my_event.mock.calls[1][0].value).toBe('second')
    expect(my_event.mock.calls[1][0].event).toBeType('object')
  })

  it('will disable a single button within a group', () => {
    render(
      <Radio.Group>
        <Radio disabled />
      </Radio.Group>
    )

    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('will disable a single button, defined in the group', () => {
    render(
      <Radio.Group disabled>
        <Radio />
      </Radio.Group>
    )

    expect(document.querySelector('input[disabled]')).toBeInTheDocument()
  })

  it('should support inline styling', () => {
    render(
      <Radio.Group style={{ color: 'red' }}>
        <Radio />
      </Radio.Group>
    )

    expect(
      document
        .querySelector('.dnb-radio-group__shell')
        .getAttribute('style')
    ).toBe('color: red;')
  })

  it('will overwrite "disable" state, defined in the group', () => {
    render(
      <Radio.Group disabled>
        <Radio disabled={false} />
        <Radio disabled />
      </Radio.Group>
    )

    expect(document.querySelectorAll('input')[0]).not.toHaveAttribute(
      'disabled'
    )
    expect(document.querySelectorAll('input')[1]).toHaveAttribute(
      'disabled'
    )
  })

  it('should support spacing props', () => {
    render(
      <Radio.Group top="2rem">
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )

    const element = document.querySelector('.dnb-radio-group')

    expect(Array.from(element.classList)).toEqual([
      'dnb-radio-group',
      'dnb-radio-group--row',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Radio.Group label="Label" name="group" id="group">
          <Radio id="radio-1" label="Radio 1" value="first" />
          <Radio id="radio-2" label="Radio 2" value="second" checked />
        </Radio.Group>
      </Provider>
    )

    const element = document.querySelector('.dnb-radio-group')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-radio-group',
      'dnb-radio-group--row',
      'dnb-form-component',
    ])
    expect(
      Array.from(
        document.querySelector('.dnb-radio-group .dnb-flex-container')
          .classList
      )
    ).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
    expect(
      Array.from(document.querySelector('.dnb-flex-container').classList)
    ).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should support vertical label', () => {
    const { rerender } = render(
      <Radio.Group label="Label" vertical>
        <Radio />
      </Radio.Group>
    )

    const element = document.querySelector('.dnb-radio-group')
    const flexElement = element.querySelector('.dnb-flex-container')

    expect(Array.from(flexElement.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-x-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])

    rerender(
      <Radio.Group label="Label" label_direction="vertical">
        <Radio />
      </Radio.Group>
    )

    expect(Array.from(flexElement.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-container--row-gap-off',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should use formset/legend when label was given', () => {
    const { rerender } = render(
      <Radio.Group label="Legend">
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
      </Radio.Group>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelectorAll('label')).toHaveLength(2)

    rerender(
      <Radio.Group>
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
      </Radio.Group>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(2)
  })

  it('should not render label when not label given', () => {
    render(
      <Radio.Group>
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
      </Radio.Group>
    )

    expect(document.querySelectorAll('label')).toHaveLength(2)
  })
})

describe('Radio ARIA', () => {
  it('should validate with ARIA rules for Radio.Group', async () => {
    const Comp = render(
      <Radio.Group
        label="Label"
        name="group"
        id="group"
        on_change={jest.fn()}
      >
        <Radio id="radio-1" label="Radio 1" value="first" />
        <Radio id="radio-2" label="Radio 2" value="second" checked />
      </Radio.Group>
    )
    expect(
      await axeComponent(Comp, {
        rules: {
          // NVDA fix
          // because of the role="radio", we have to allow this
          'aria-allowed-role': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})
