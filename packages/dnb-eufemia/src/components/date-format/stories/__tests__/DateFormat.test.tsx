import React from 'react'
import { render } from '@testing-library/react'
import DateFormat from '../../DateFormat'
import { axeComponent } from '../../../../core/jest/jestSetup'
import { Provider } from '../../../../shared'

describe('DateFormat', () => {
  it('should format the whole date based on `dateStyle`', () => {
    const { rerender } = render(
      <DateFormat value="2025-08-01" dateStyle="full" />
    )

    const dateFormat = document.querySelector('.dnb-date-format')

    expect(dateFormat).toHaveTextContent('fredag 1. august 2025')

    rerender(<DateFormat value="2025-08-01" dateStyle="long" />)
    expect(dateFormat).toHaveTextContent('1. august 2025')

    rerender(<DateFormat value="2025-08-01" dateStyle="medium" />)
    expect(dateFormat).toHaveTextContent('1. aug. 2025')

    rerender(<DateFormat value="2025-08-01" dateStyle="short" />)
    expect(dateFormat).toHaveTextContent('01.08.2025')
  })

  it('should return an invalid date message if the date is invalid', () => {
    const { rerender } = render(<DateFormat>2025-13-01</DateFormat>)

    const dateFormat = document.querySelector('.dnb-date-format')

    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    // Test children prop
    rerender(<DateFormat>2025-08</DateFormat>)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat>not a date</DateFormat>)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat>{null}</DateFormat>)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat>{undefined}</DateFormat>)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    // Test value prop
    rerender(<DateFormat value="2025-13-01" />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat value="2025-08" />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat value="not a date" />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat value={undefined} />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat value={null} />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')

    rerender(<DateFormat value={new Date('2026-12-99')} />)
    expect(dateFormat).toHaveTextContent('Ugyldig dato')
  })

  it('should have `value` prop take precedence over `children`', () => {
    render(
      <DateFormat value="2025-08-01" dateStyle="full">
        2026-12-13
      </DateFormat>
    )

    const dateFormat = document.querySelector('.dnb-date-format')

    expect(dateFormat).toHaveTextContent('fredag 1. august 2025')
  })

  describe('date value formats', () => {
    it('should support dates in `yyyy-MM-dd` format', () => {
      const { rerender } = render(<DateFormat>2025-05-23</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat value="2026-06-08" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `dd.MM.yyyy` format', () => {
      const { rerender } = render(<DateFormat>23.05.2025</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat value="08.06.2026" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `dd/MM/yyyy` format', () => {
      const { rerender } = render(<DateFormat>23/05/2025</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat value="08/06/2026" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `Date object` format', () => {
      render(<DateFormat value={new Date('2026-06-08')} />)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })
  })

  describe('locale', () => {
    it('should default to `nb-NO`', () => {
      render(<DateFormat dateStyle="full">2025-05-23</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('fredag 23. mai 2025')
    })

    it('should set locale based on prop', () => {
      const { rerender } = render(
        <DateFormat locale="en-GB" dateStyle="full">
          2025-08-04
        </DateFormat>
      )

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('Monday 4 August 2025')

      rerender(
        <DateFormat locale="en-US" dateStyle="full">
          2025-08-04
        </DateFormat>
      )
      expect(dateFormat).toHaveTextContent('Monday, August 4, 2025')

      rerender(
        <DateFormat locale="sv-SE" dateStyle="full">
          2025-08-04
        </DateFormat>
      )
      expect(dateFormat).toHaveTextContent('måndag 4 augusti 2025')

      rerender(
        <DateFormat locale="nb-NO" dateStyle="full">
          2025-08-04
        </DateFormat>
      )
      expect(dateFormat).toHaveTextContent('mandag 4. august 2025')
    })

    it('should set locale based on provider prop', () => {
      const { rerender } = render(
        <Provider locale="en-GB">
          <DateFormat dateStyle="full">2025-08-04</DateFormat>
        </Provider>
      )

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('Monday 4 August 2025')

      rerender(
        <Provider locale="en-GB">
          <DateFormat locale="en-US" dateStyle="full">
            2025-08-04
          </DateFormat>
        </Provider>
      )
      expect(dateFormat).toHaveTextContent('Monday, August 4, 2025')

      rerender(
        <Provider locale="en-GB">
          <DateFormat locale="sv-SE" dateStyle="full">
            2025-08-04
          </DateFormat>
        </Provider>
      )
      expect(dateFormat).toHaveTextContent('måndag 4 augusti 2025')

      rerender(
        <Provider locale="en-GB">
          <DateFormat locale="nb-NO" dateStyle="full">
            2025-08-04
          </DateFormat>
        </Provider>
      )
      expect(dateFormat).toHaveTextContent('mandag 4. august 2025')
    })
  })

  describe('spacing', () => {
    it('should support spacing props', () => {
      render(<DateFormat top="2rem">2025-05-23</DateFormat>)

      const element = document.querySelector('.dnb-date-format')

      expect(Array.from(element.classList)).toEqual([
        'dnb-date-format',
        'dnb-space__top--large',
      ])
    })
  })
})

describe('DateFormat ARIA', () => {
  it('should validate', async () => {
    const Comp = render(<DateFormat>2025-08-01</DateFormat>)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should have correct `dateTime` attribute', () => {
    render(<DateFormat>01.08.2025</DateFormat>)
    const dateFormat = document.querySelector('.dnb-date-format')

    expect(dateFormat).toHaveAttribute('dateTime', '2025-08-01')
  })
})
