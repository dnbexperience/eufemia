import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'
import { TimeZoneIdentifier } from '../../../constants/timezones'

describe('Value.SelectTimeZone', () => {
  it('renders string values', () => {
    render(<Value.SelectTimeZone value="Europe/Oslo" />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Oslo')
  })

  it('supports invalid values', () => {
    const { rerender } = render(
      <Value.SelectTimeZone value={'NotValidTimeZone' as TimeZoneIdentifier} />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('NotValidTimeZone')

    rerender(
      <Value.SelectTimeZone value={0 as unknown as TimeZoneIdentifier} showEmpty />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectTimeZone value={null} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()

    rerender(<Value.SelectTimeZone value={undefined} showEmpty />)

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).not.toBeInTheDocument()
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.SelectTimeZone showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(<Value.SelectTimeZone label="My selections" value="Europe/Oslo" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Oslo')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.SelectTimeZone label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.SelectTimeZone placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myTimezone: 'Europe/Copenhagen' }}>
        <Value.SelectTimeZone path="/myTimezone" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Copenhagen')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler locale="en-GB" data={{ myTimezone: 'Europe/Copenhagen' }}>
        <Value.SelectTimeZone path="/myTimezone" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-select-timezone .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Copenhagen')
  })
})

