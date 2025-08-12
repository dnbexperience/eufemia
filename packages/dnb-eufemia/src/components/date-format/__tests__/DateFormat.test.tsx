import React from 'react'
import { render } from '@testing-library/react'
import DateFormat from '../../DateFormat'
import { axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../../shared'

describe('DateFormat', () => {
  describe('absolute date', () => {
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
      global.console.log = jest.fn()

      const { rerender } = render(<DateFormat>2025-13-01</DateFormat>)

      const dateFormat = () => document.querySelector('.dnb-date-format')

      expect(dateFormat()).toHaveTextContent('Ugyldig dato: 2025-13-01')

      // Test children prop
      rerender(<DateFormat>2025-17</DateFormat>)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: 2025-17')

      rerender(<DateFormat>not a date</DateFormat>)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: not a date')

      rerender(<DateFormat>{null}</DateFormat>)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: null')

      rerender(<DateFormat>{undefined}</DateFormat>)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: undefined')

      rerender(<DateFormat />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: undefined')

      // Test value prop
      rerender(<DateFormat value="2025-13-01" />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: 2025-13-01')

      rerender(<DateFormat value="2025-17" />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: 2025-17')

      rerender(<DateFormat value="not a date" />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: not a date')

      rerender(<DateFormat value={undefined} />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: undefined')

      rerender(<DateFormat value={null} />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: null')

      rerender(<DateFormat value={new Date('2026-12-99')} />)
      expect(dateFormat()).toHaveTextContent('Ugyldig dato: Invalid Date')

      expect(global.console.log).toHaveBeenCalledTimes(7)
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

    describe('skeleton', () => {
      it('should apply skeleton classes when skeleton prop is true', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(
          <DateFormat value={pastDate} relativeTime skeleton={true} />
        )

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-skeleton',
          'dnb-skeleton--font',
        ])
      })

      it('should apply skeleton classes with spacing props', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(
          <DateFormat
            value={pastDate}
            relativeTime
            skeleton={true}
            top="2rem"
          />
        )

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-space__top--large',
          'dnb-skeleton',
          'dnb-skeleton--font',
        ])
      })
    })

    describe('ARIA', () => {
      it('should validate', async () => {
        const Component = render(<DateFormat>2025-08-01</DateFormat>)
        expect(await axeComponent(Component)).toHaveNoViolations()
      })

      it('should have correct `dateTime` attribute', () => {
        render(<DateFormat>01.08.2025</DateFormat>)
        const dateFormat = document.querySelector('.dnb-date-format')

        expect(dateFormat).toHaveAttribute('dateTime', '2025-08-01')
      })
    })
  })

  describe('relative time', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      // Mock setTimeout and clearTimeout to track calls
      jest.spyOn(global, 'setTimeout')
      jest.spyOn(global, 'clearTimeout')
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.restoreAllMocks()
    })

    it('should render relative time when relativeTime prop is true', () => {
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      render(<DateFormat value={pastDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 2 timer siden')
    })

    it('should respect locale for relative time', () => {
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      const { rerender } = render(
        <DateFormat value={pastDate} relativeTime locale="en-GB" />
      )

      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 hours ago')

      rerender(<DateFormat value={pastDate} relativeTime locale="en-US" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 hours ago')

      rerender(<DateFormat value={pastDate} relativeTime locale="nb-NO" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 2 timer siden')
    })

    it('should auto-update relative time at appropriate intervals', () => {
      const pastDate = new Date(Date.now() - 30 * 1000) // 30 seconds ago
      render(<DateFormat value={pastDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 30 sekunder siden')

      // Fast-forward to just before the next update threshold
      jest.advanceTimersByTime(20000) // 20 seconds
      expect(dateFormat).toHaveTextContent('for 50 sekunder siden')

      // Fast-forward past the threshold where it should change to "1 minute ago"
      jest.advanceTimersByTime(35000) // 55 seconds total
      expect(dateFormat).toHaveTextContent('for 1 minutt siden')
    })

    it('should handle future dates correctly', () => {
      const futureDate = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
      render(<DateFormat value={futureDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('om 2 timer')
    })

    it('should handle very recent dates (seconds)', () => {
      const recentDate = new Date(Date.now() - 5 * 1000) // 5 seconds ago
      render(<DateFormat value={recentDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 5 sekunder siden')
    })

    it('should handle dates in days', () => {
      const daysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      render(<DateFormat value={daysAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 3 døgn siden')
    })

    it('should handle dates in weeks', () => {
      const weeksAgo = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000) // 2 weeks ago
      render(<DateFormat value={weeksAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 2 uker siden')
    })

    it('should handle dates in months', () => {
      const monthsAgo = new Date(
        Date.now() - 2 * 30.4375 * 24 * 60 * 60 * 1000
      ) // ~2 months ago
      render(<DateFormat value={monthsAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 2 måneder siden')
    })

    it('should handle dates in years', () => {
      const yearsAgo = new Date(
        Date.now() - 2 * 365.25 * 24 * 60 * 60 * 1000
      ) // ~2 years ago
      render(<DateFormat value={yearsAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('for 2 år siden')
    })

    it('should set lang attribute for relative time', () => {
      const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
      render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

      const element = document.querySelector('.dnb-date-format')
      expect(element).toHaveAttribute('lang', 'en-GB')
    })

    it('should handle invalid dates gracefully in relative time mode', () => {
      render(<DateFormat value="invalid-date" relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('Ugyldig dato: invalid-date')
    })

    it('should handle undefined/null dates gracefully in relative time mode', () => {
      const { rerender } = render(<DateFormat relativeTime />)

      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('Ugyldig dato: undefined')

      rerender(<DateFormat value={null} relativeTime />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('Ugyldig dato: null')
    })

    it('should cleanup timers when component unmounts', () => {
      const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
      const { unmount } = render(
        <DateFormat value={pastDate} relativeTime />
      )

      // Verify timer is running
      expect(setTimeout).toHaveBeenCalled()

      // Unmount component
      unmount()

      // Verify clearTimeout was called
      expect(clearTimeout).toHaveBeenCalled()
    })

    it('should cleanup and restart timers when date changes', () => {
      const pastDate1 = new Date(Date.now() - 60 * 1000) // 1 minute ago
      const pastDate2 = new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago

      const { rerender } = render(
        <DateFormat value={pastDate1} relativeTime />
      )

      // Get initial timer calls
      const initialTimerCalls = (
        setTimeout as jest.MockedFunction<typeof setTimeout>
      ).mock.calls.length
      const initialClearCalls = (
        clearTimeout as jest.MockedFunction<typeof clearTimeout>
      ).mock.calls.length

      // Change the date
      rerender(<DateFormat value={pastDate2} relativeTime />)

      // Should have cleared previous timer and started new one
      expect(clearTimeout).toHaveBeenCalledTimes(initialClearCalls + 1)
      expect(setTimeout).toHaveBeenCalledTimes(initialTimerCalls + 1)
    })

    it('should cleanup and restart timers when locale changes', () => {
      const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago

      const { rerender } = render(
        <DateFormat value={pastDate} relativeTime locale="nb-NO" />
      )

      // Get initial timer calls
      const initialTimerCalls = (
        setTimeout as jest.MockedFunction<typeof setTimeout>
      ).mock.calls.length
      const initialClearCalls = (
        clearTimeout as jest.MockedFunction<typeof clearTimeout>
      ).mock.calls.length

      // Change the locale
      rerender(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

      // Should have cleared previous timer and started new one
      expect(clearTimeout).toHaveBeenCalledTimes(initialClearCalls + 1)
      expect(setTimeout).toHaveBeenCalledTimes(initialTimerCalls + 1)
    })

    it('should not start timers when relativeTime is false', () => {
      const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
      render(<DateFormat value={pastDate} relativeTime={false} />)

      expect(setTimeout).not.toHaveBeenCalled()
    })

    it('should not start timers when date is invalid', () => {
      render(<DateFormat value="invalid-date" relativeTime />)

      expect(setTimeout).not.toHaveBeenCalled()
    })

    describe('spacing', () => {
      it('should support spacing props', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(<DateFormat value={pastDate} relativeTime top="2rem" />)

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-space__top--large',
        ])
      })

      it('should support multiple spacing props', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(
          <DateFormat
            value={pastDate}
            relativeTime
            top="2rem"
            bottom="1rem"
            left="small"
          />
        )

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-space__top--large',
          'dnb-space__bottom--small',
          'dnb-space__left--small',
        ])
      })
    })

    describe('skeleton', () => {
      it('should apply skeleton classes when skeleton prop is true', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(
          <DateFormat value={pastDate} relativeTime skeleton={true} />
        )

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-skeleton',
          'dnb-skeleton--font',
        ])
      })

      it('should apply skeleton classes with spacing props', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(
          <DateFormat
            value={pastDate}
            relativeTime
            skeleton={true}
            top="2rem"
          />
        )

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-space__top--large',
          'dnb-skeleton',
          'dnb-skeleton--font',
        ])
      })
    })

    describe('ARIA', () => {
      it('should validate without accessibility violations', () => {
        const pastDate = new Date('2025-01-15T14:30:00Z') // Static date for testing
        render(<DateFormat value={pastDate} relativeTime />)

        const element = document.querySelector('.dnb-date-format')
        // Basic accessibility checks without axe
        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('lang')
        expect(element).toHaveAttribute('title')
      })

      it('should have correct `lang` attribute', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

        const element = document.querySelector('.dnb-date-format')
        expect(element).toHaveAttribute('lang', 'en-GB')
      })

      it('should have `title` attribute with full date and time', () => {
        const pastDate = new Date('2025-01-15T14:30:00Z') // Fixed date for consistent testing
        render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

        const element = document.querySelector('.dnb-date-format')
        expect(element).toHaveAttribute('title')

        const title = element.getAttribute('title')
        expect(title).toMatch(/15 January 2025/)
        expect(title).toMatch(/15:30/)
      })
    })
  })
})
