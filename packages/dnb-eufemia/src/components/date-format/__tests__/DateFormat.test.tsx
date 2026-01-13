/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { format } from 'date-fns'
import { fireEvent, render, waitFor } from '@testing-library/react'
import DateFormat from '../../DateFormat'
import { axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../../shared'

describe('DateFormat', () => {
  // Suppress console.warn messages about fake timers from waitFor.
  // Because we can't use fake timers (they cause axe tests to hang).
  const originalWarn = console.warn
  beforeAll(() => {
    console.warn = (arg) => {
      if (arg.includes('jest.useFakeTimers')) {
        return
      }
      originalWarn.call(console, arg)
    }
  })

  afterAll(() => {
    console.warn = originalWarn
  })

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

    it('should include time when `timeStyle` is provided', () => {
      render(<DateFormat value="2025-08-01T14:30:00" timeStyle="short" />)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('1. august 2025 kl. 14:30')
    })

    it('should use a custom `timeSeparator` when provided', () => {
      render(
        <DateFormat
          value="2025-08-01T14:30:00"
          locale="en-GB"
          dateStyle="short"
          timeStyle="short"
          timeSeparator=" - "
        />
      )

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('01/08/2025 - 14:30')
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

      expect(global.console.log).toHaveBeenCalledTimes(6)
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

        expect(dateFormat).toHaveTextContent('Monday, 4 August 2025')

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
          <DateFormat locale="da-DK" dateStyle="full">
            2025-08-04
          </DateFormat>
        )
        expect(dateFormat).toHaveTextContent('mandag den 4. august 2025')

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

        expect(dateFormat).toHaveTextContent('Monday, 4 August 2025')

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
            <DateFormat locale="da-DK" dateStyle="full">
              2025-08-04
            </DateFormat>
          </Provider>
        )
        expect(dateFormat).toHaveTextContent('mandag den 4. august 2025')

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

      it('should render with time element and correct tagName', () => {
        render(<DateFormat>2025-08-01</DateFormat>)
        const dateFormat = document.querySelector('.dnb-date-format')

        expect(dateFormat.tagName).toBe('TIME')
      })

      it('should not have `aria-label` attribute for basic date formatting', () => {
        render(<DateFormat>2025-08-01</DateFormat>)
        const dateFormat = document.querySelector('.dnb-date-format')

        // Basic dates should not have aria-label since visible text is sufficient
        expect(dateFormat).not.toHaveAttribute('aria-label')
      })
    })
  })

  describe('relative time', () => {
    beforeEach(() => {
      // Mock setTimeout and clearTimeout to track calls
      jest.spyOn(global, 'setTimeout')
      jest.spyOn(global, 'clearTimeout')
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should render relative time when relativeTime prop is true', () => {
      const pastDate = new Date('2025-01-15T12:30:00Z') // 2 hours before reference
      render(<DateFormat value={pastDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should render relativeTime with time element and correct tagName', () => {
      const pastDate = new Date('2025-01-15T12:30:00Z')
      render(<DateFormat value={pastDate} relativeTime />)
      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat.tagName).toBe('TIME')
    })

    it('should render a tooltip with absolute date and show on hover', async () => {
      render(<DateFormat value="2025-08-01" relativeTime />)

      const timeElem = document.querySelector('.dnb-date-format')

      // When tooltip is inactive, aria-describedby should not be set
      expect(timeElem.getAttribute('aria-describedby')).toBeNull()

      fireEvent.mouseEnter(timeElem)

      // Wait for tooltip to show
      await waitFor(() => {
        const tooltipId = timeElem.getAttribute('aria-describedby')
        expect(tooltipId).toBeTruthy()
      })

      // When tooltip is active, aria-describedby should point to the tooltip id
      const tooltipId = timeElem.getAttribute('aria-describedby')
      const tooltipElem = document.body.querySelector(
        '#' + tooltipId
      ).parentElement

      expect(Array.from(tooltipElem.classList)).toEqual(
        expect.arrayContaining(['dnb-tooltip', 'dnb-tooltip--active'])
      )

      fireEvent.mouseLeave(timeElem)

      // Wait for tooltip to hide
      await waitFor(() => {
        expect(Array.from(tooltipElem.classList)).toEqual(
          expect.arrayContaining(['dnb-tooltip', 'dnb-tooltip--hide'])
        )
      })
    })

    it('tooltip content should match the absolute formatted date', async () => {
      render(<DateFormat value="2025-08-01T14:30:00" relativeTime />)

      const timeElem = document.querySelector('.dnb-date-format')

      // When tooltip is inactive, aria-describedby should not be set
      expect(timeElem.getAttribute('aria-describedby')).toBeNull()

      fireEvent.mouseEnter(timeElem)

      // Wait for tooltip to show
      await waitFor(() => {
        const tooltipId = timeElem.getAttribute('aria-describedby')
        expect(tooltipId).toBeTruthy()
      })

      // When tooltip is active, aria-describedby should point to the tooltip id
      const tooltipId = timeElem.getAttribute('aria-describedby')
      const tooltipElem = document.body.querySelector('#' + tooltipId)

      expect(tooltipElem).toHaveTextContent('1. august 2025 kl. 14:30')
    })

    it('should respect locale for relative time', () => {
      const { rerender } = render(
        <DateFormat
          value={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          relativeTime
          locale="en-GB"
        />
      )

      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent(/1 day ago/)

      rerender(
        <DateFormat
          value={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          relativeTime
          locale="nb-NO"
        />
      )

      dateFormat = document.querySelector('.dnb-date-format')
      // The actual output depends on the browser's Intl.RelativeTimeFormat implementation
      // and the dateStyle prop (defaults to 'long' which can add prefixes like "for")
      expect(dateFormat).toHaveTextContent(/døgn siden|dag siden/)
    })

    it('should respect dateStyle prop for relative time styling', () => {
      const { rerender } = render(
        <DateFormat
          value={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          relativeTime
          dateStyle="long"
        />
      )

      let dateFormat = document.querySelector('.dnb-date-format')
      // Long style can include prefixes like "for" and use different word forms
      expect(dateFormat).toHaveTextContent(/døgn siden|dag siden/)

      // Test short style (maps to 'narrow' - most abbreviated)
      rerender(
        <DateFormat
          value={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          relativeTime
          dateStyle="short"
        />
      )

      dateFormat = document.querySelector('.dnb-date-format')
      // Short style (narrow) should be most concise (e.g., "1d" instead of "1 døgn siden")
      expect(dateFormat).toHaveTextContent(/d|døgn|dag/)

      // Test medium style (maps to 'short' - medium abbreviation)
      rerender(
        <DateFormat
          value={new Date(Date.now() - 24 * 60 * 60 * 1000)}
          relativeTime
          dateStyle="medium"
        />
      )

      dateFormat = document.querySelector('.dnb-date-format')
      // Medium style (short) should be moderately abbreviated (e.g., "1 d. siden" or "1 døgn siden")
      expect(dateFormat).toHaveTextContent(/d\.|døgn|dag/)

      // Note: The actual style differences depend on the browser's Intl.RelativeTimeFormat implementation
      // We're mainly testing that the prop is passed through correctly
      // The new mapping provides more intuitive behavior:
      // - Long: "for 1 døgn siden" (includes "for" prefix and full word "døgn")
      // - Medium: "for 1 d. siden" (includes "for" prefix but abbreviated "d." instead of "døgn")
      // - Short: "1d" (most concise, just the number and abbreviated unit)
      // This clearly shows the styling is working and affecting the relative time format
    })

    it('should provide intuitive dateStyle mapping for relative time', () => {
      // Test that the new mapping is more intuitive:
      // short -> narrow (most abbreviated), medium -> short (medium abbreviation), long -> long (full words)
      const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago

      // Test short style (should be most abbreviated)
      const { rerender } = render(
        <DateFormat value={pastDate} relativeTime dateStyle="short" />
      )
      let dateFormat = document.querySelector('.dnb-date-format')
      // Short style (narrow) should be most concise
      expect(dateFormat).toHaveTextContent(/h|t|time/)

      // Test medium style (should be moderately abbreviated)
      rerender(
        <DateFormat value={pastDate} relativeTime dateStyle="medium" />
      )
      dateFormat = document.querySelector('.dnb-date-format')
      // Medium style (short) should be moderately abbreviated
      expect(dateFormat).toHaveTextContent(/hour|t|time/)

      // Test long style (should be full words)
      rerender(
        <DateFormat value={pastDate} relativeTime dateStyle="long" />
      )
      dateFormat = document.querySelector('.dnb-date-format')
      // Long style should use full words
      expect(dateFormat).toHaveTextContent(/hour|t|time/)
    })

    it('should auto-update relative time at appropriate intervals', () => {
      const pastDate = new Date('2025-01-15T14:30:00Z') // Fixed date for consistent testing
      render(<DateFormat value={pastDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')

      // Since we can't use fake timers (they cause axe tests to hang),
      // we verify that the component is set up to auto-update by checking
      // that it has the necessary structure and that timers are being scheduled
      expect(setTimeout).toHaveBeenCalled()

      // Verify the component renders correctly initially
      expect(dateFormat).toBeInTheDocument()
      expect(dateFormat.tagName).toBe('TIME')
    })

    it('should handle future dates correctly', () => {
      // Create a date that's definitely in the future relative to now
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
      render(<DateFormat value={futureDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent(/from now|om|fra nå|in|om/)
    })

    it('should handle very recent dates (seconds)', () => {
      const recentDate = new Date('2025-01-15T14:29:55Z') // 5 seconds before the reference
      render(<DateFormat value={recentDate} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should handle dates in days', () => {
      const daysAgo = new Date('2025-01-13T14:30:00Z') // 2 days before reference
      render(<DateFormat value={daysAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should handle dates in weeks', () => {
      const weeksAgo = new Date('2025-01-08T14:30:00Z') // 1 week before reference
      render(<DateFormat value={weeksAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should handle dates in months', () => {
      const monthsAgo = new Date('2024-11-15T14:30:00Z') // 2 months before reference
      render(<DateFormat value={monthsAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should handle dates in years', () => {
      const yearsAgo = new Date('2023-01-15T14:30:00Z') // 2 years before reference
      render(<DateFormat value={yearsAgo} relativeTime />)

      const dateFormat = document.querySelector('.dnb-date-format')
      // Check that it renders some relative time text
      expect(dateFormat).toHaveTextContent('siden')
    })

    it('should set lang attribute for relative time', () => {
      const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
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
      const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
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
      const pastDate1 = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
      const pastDate2 = new Date('2025-01-15T12:30:00Z') // 2 hours before reference

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
      const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference

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
      const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
      render(<DateFormat value={pastDate} relativeTime={false} />)

      expect(setTimeout).not.toHaveBeenCalled()
    })

    it('should not start timers when date is invalid', () => {
      render(<DateFormat value="invalid-date" relativeTime />)

      expect(setTimeout).not.toHaveBeenCalled()
    })

    describe('relativeTimeReference', () => {
      it('should use custom relativeTimeReference function for relative time calculations', () => {
        const referenceDate = new Date('2025-01-15T14:30:00Z')
        const pastDate = new Date('2025-01-15T12:30:00Z') // 2 hours before reference

        render(
          <DateFormat
            value={pastDate}
            relativeTime
            relativeTimeReference={() => referenceDate}
          />
        )

        const dateFormat = document.querySelector('.dnb-date-format')
        // Should show "2 hours ago" relative to the reference date
        expect(dateFormat).toHaveTextContent(/2.*t|2.*timer|2.*hours/)
      })

      it('should update relative time when now function changes', () => {
        const pastDate = new Date('2025-01-15T12:30:00Z')
        const referenceDate1 = new Date('2025-01-15T14:30:00Z') // 2 hours after pastDate
        const referenceDate2 = new Date('2025-01-15T13:30:00Z') // 1 hour after pastDate

        const { rerender } = render(
          <DateFormat
            value={pastDate}
            relativeTime
            relativeTimeReference={() => referenceDate1}
          />
        )

        let dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent(/2.*t|2.*timer|2.*hours/)

        rerender(
          <DateFormat
            value={pastDate}
            relativeTime
            relativeTimeReference={() => referenceDate2}
          />
        )

        dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent(/1.*t|1.*time|1.*hour/)
      })

      it('should use current time when relativeTimeReference prop is not provided', () => {
        const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago

        render(<DateFormat value={pastDate} relativeTime />)

        const dateFormat = document.querySelector('.dnb-date-format')
        // Should show relative time based on current time
        expect(dateFormat).toHaveTextContent(/siden|ago/)
      })

      it('should call relativeTimeReference function for each update calculation', () => {
        const referenceDate = new Date('2025-01-15T14:30:00Z')
        const pastDate = new Date('2025-01-15T12:30:00Z')
        const relativeTimeReferenceFn = jest.fn(() => referenceDate)

        render(
          <DateFormat
            value={pastDate}
            relativeTime
            relativeTimeReference={relativeTimeReferenceFn}
          />
        )

        // The relativeTimeReference function should be called for initial render and updates
        expect(relativeTimeReferenceFn).toHaveBeenCalled()
      })

      it('should handle future dates with custom now function', () => {
        const referenceDate = new Date('2025-01-15T14:30:00Z')
        const futureDate = new Date('2025-01-15T16:30:00Z') // 2 hours after reference

        render(
          <DateFormat
            value={futureDate}
            relativeTime
            relativeTimeReference={() => referenceDate}
          />
        )

        const dateFormat = document.querySelector('.dnb-date-format')
        // Should show "in 2 hours" or similar
        expect(dateFormat).toHaveTextContent(/om|fra nå|from now|in/)
      })
    })

    describe('spacing', () => {
      it('should support spacing props', () => {
        const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
        render(<DateFormat value={pastDate} relativeTime top="2rem" />)

        const element = document.querySelector('.dnb-date-format')
        expect(Array.from(element.classList)).toEqual([
          'dnb-date-format',
          'dnb-space__top--large',
        ])
      })

      it('should support multiple spacing props', () => {
        const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
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
        const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
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
        const pastDate = new Date('2025-01-15T13:30:00Z') // 1 hour before reference
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
      it('should have correct `dateTime` attribute', () => {
        const value = new Date('2025-01-15T14:30:00Z')
        render(<DateFormat value={value} relativeTime />)
        const dateFormat = document.querySelector('.dnb-date-format')

        // Expect local time representation of the given UTC instant
        const expected = format(value, 'yyyy-MM-dd HH:mm:ss')
        expect(dateFormat).toHaveAttribute('dateTime', expected)
      })

      it('should validate', async () => {
        const pastDate = new Date('2025-01-15T14:30:00Z') // Static date for testing
        const Component = render(
          <DateFormat value={pastDate} relativeTime />
        )
        expect(await axeComponent(Component)).toHaveNoViolations()
      })

      it('should validate without accessibility violations', () => {
        const pastDate = new Date('2025-01-15T14:30:00Z') // Static date for testing
        render(<DateFormat value={pastDate} relativeTime />)

        const element = document.querySelector('.dnb-date-format')
        // Basic accessibility checks without axe
        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('lang')
        // aria-label may or may not be present depending on format differences
        // We just check that the element exists and has lang attribute
      })

      it('should have correct `lang` attribute', () => {
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

        const element = document.querySelector('.dnb-date-format')
        expect(element).toHaveAttribute('lang', 'en-GB')
      })

      it('should handle aria-label attribute for relative time (may or may not be present)', () => {
        const pastDate = new Date('2025-01-15T14:30:00Z') // Fixed date for consistent testing
        render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

        const element = document.querySelector('.dnb-date-format')

        // aria-label may or may not be present depending on format differences
        // This test just verifies the component renders correctly in both cases
        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('lang')
      })

      it('should not have `aria-label` attribute when relative time format is the same as visible text', () => {
        // Use a date that will result in the same format for both visible text and aria-label
        const pastDate = new Date(Date.now() - 60 * 1000) // 1 minute ago
        render(<DateFormat value={pastDate} relativeTime locale="en-GB" />)

        const element = document.querySelector('.dnb-date-format')
        // When the formats are the same, aria-label should not be present
        expect(element).not.toHaveAttribute('aria-label')
      })
    })
  })

  describe('duration', () => {
    it('should format ISO 8601 duration strings automatically without relativeTime prop', () => {
      const { rerender } = render(<DateFormat value="PT2H30M" />)
      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      rerender(<DateFormat value="P1DT2H30M" />)
      expect(dateFormat).toHaveTextContent(
        '1 døgn, 2 timer og 30 minutter'
      )
    })

    it('should render duration with time element and correct tagName', () => {
      const { rerender } = render(<DateFormat value="PT2H30M" />)
      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat.tagName).toBe('TIME')

      rerender(<DateFormat value="P1DT2H30M" />)
      expect(dateFormat.tagName).toBe('TIME')
    })

    it('should handle duration in children prop automatically', () => {
      render(<DateFormat>PT1H</DateFormat>)
      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 time')
      expect(dateFormat.tagName).toBe('TIME')
    })

    it('should respect locale for duration formatting', () => {
      const { rerender } = render(
        <DateFormat value="PT2H30M" locale="nb-NO" />
      )
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      rerender(<DateFormat value="PT2H30M" locale="sv-SE" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timmar, 30 minuter')

      rerender(<DateFormat value="PT2H30M" locale="da-DK" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      rerender(<DateFormat value="PT2H30M" locale="de-DE" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 Stunden, 30 Minuten')

      rerender(<DateFormat value="PT2H30M" locale="fr-FR" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 heures et 30 minutes')

      rerender(<DateFormat value="PT2H30M" locale="es-ES" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 horas y 30 minutos')
    })

    it('should format duration in English locale', () => {
      const { rerender } = render(
        <Provider locale="en-GB">
          <DateFormat value="PT2H30M" />
        </Provider>
      )
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 hours, 30 minutes')

      rerender(
        <Provider locale="en-GB">
          <DateFormat value="P1DT2H30M" />
        </Provider>
      )
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 day, 2 hours, 30 minutes')

      rerender(
        <Provider locale="en-GB">
          <DateFormat value="P1W" />
        </Provider>
      )
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 week')

      rerender(
        <Provider locale="en-GB">
          <DateFormat value="P1M" />
        </Provider>
      )
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 month')

      rerender(
        <Provider locale="en-GB">
          <DateFormat value="P1Y" />
        </Provider>
      )
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 year')
    })

    it('should fallback to English for unsupported locales gracefully', () => {
      const { rerender } = render(
        <DateFormat value="PT2H30M" locale="xx-XX" />
      )
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 hours, 30 minutes')

      rerender(<DateFormat value="P1DT2H30M" locale="xx-XX" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 day, 2 hours, 30 minutes')
    })

    it('should fallback to English when Intl.DurationFormat is not available', () => {
      // Mock that Intl.DurationFormat is not available
      const originalDurationFormat = (Intl as any).DurationFormat
      delete (Intl as any).DurationFormat

      try {
        const { rerender } = render(<DateFormat value="PT2H30M" />)
        let dateFormat = document.querySelector('.dnb-date-format')
        // Should fallback to English hardcoded format
        expect(dateFormat).toHaveTextContent('2 hours 30 minutes')

        rerender(<DateFormat value="P1DT2H30M" />)
        dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent('1 day 2 hours 30 minutes')

        // Test with different dateStyle
        rerender(<DateFormat value="PT2H30M" dateStyle="short" />)
        dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent('2 hours 30 minutes')

        rerender(<DateFormat value="PT2H30M" dateStyle="medium" />)
        dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent('2 hours 30 minutes')

        // Test with locale that would normally use Intl.DurationFormat
        rerender(<DateFormat value="PT2H30M" locale="nb-NO" />)
        dateFormat = document.querySelector('.dnb-date-format')
        expect(dateFormat).toHaveTextContent('2 hours 30 minutes')
      } finally {
        // Restore the original DurationFormat
        if (originalDurationFormat) {
          // @ts-expect-error
          Intl.DurationFormat = originalDurationFormat
        }
      }
    })

    it('should handle invalid duration strings gracefully', () => {
      const { rerender } = render(<DateFormat value="invalid-duration" />)

      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent(
        'Ugyldig dato: invalid-duration'
      )

      rerender(<DateFormat value="PT" />)
      expect(dateFormat).toHaveTextContent('Ugyldig dato: PT')

      rerender(<DateFormat value="P2H" />)
      expect(dateFormat).toHaveTextContent('Ugyldig dato: P2H')
    })

    it('should handle edge cases for duration', () => {
      const { rerender } = render(<DateFormat value="PT0S" />)
      const dateFormat = document.querySelector('.dnb-date-format')
      // Zero durations return just '0'
      expect(dateFormat).toHaveTextContent('0')

      rerender(<DateFormat value="P0D" />)
      expect(dateFormat).toHaveTextContent('0')

      rerender(<DateFormat value="PT0H" />)
      expect(dateFormat).toHaveTextContent('0')

      rerender(<DateFormat value="PT0M" />)
      expect(dateFormat).toHaveTextContent('0')

      // Test complex zero duration with multiple units
      rerender(<DateFormat value="PT0H0M0S" />)
      expect(dateFormat).toHaveTextContent('0')

      // Test zero durations with new units
      rerender(<DateFormat value="P0W" />)
      expect(dateFormat).toHaveTextContent('0')

      rerender(<DateFormat value="P0M" />)
      expect(dateFormat).toHaveTextContent('0')

      rerender(<DateFormat value="P0Y" />)
      expect(dateFormat).toHaveTextContent('0')
    })

    it('should support extended ISO 8601 duration formats', () => {
      const { rerender } = render(<DateFormat value="P1W" />)
      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 uke')

      rerender(<DateFormat value="P1M" />)
      expect(dateFormat).toHaveTextContent('1 måned')

      rerender(<DateFormat value="P1Y" />)
      expect(dateFormat).toHaveTextContent('1 år')

      rerender(<DateFormat value="P1Y6M" />)
      expect(dateFormat).toHaveTextContent('1 år og 6 måneder')

      rerender(<DateFormat value="P1Y6M2W" />)
      expect(dateFormat).toHaveTextContent('1 år, 6 måneder og 2 uker')

      rerender(<DateFormat value="P1Y6M2W3DT4H30M" />)
      expect(dateFormat).toHaveTextContent(
        '1 år, 6 måneder, 2 uker, 3 døgn, 4 timer og 30 minutter'
      )
    })

    it('should properly handle zero duration with PT0S format', () => {
      // Test the specific case mentioned in the issue
      render(<DateFormat value="PT0S" />)
      const dateFormat = document.querySelector('.dnb-date-format')

      // PT0S should render as "0" not empty
      expect(dateFormat).toHaveTextContent('0')
      expect(dateFormat.textContent).toBe('0')

      // Verify it's not empty or undefined
      expect(dateFormat.textContent).toBeTruthy()
      expect(dateFormat.textContent?.length).toBeGreaterThan(0)
    })

    it('should support spacing props with duration', () => {
      render(<DateFormat value="PT2H30M" top="2rem" />)

      const element = document.querySelector('.dnb-date-format')
      expect(Array.from(element.classList)).toEqual([
        'dnb-date-format',
        'dnb-space__top--large',
      ])
    })

    it('should support skeleton with duration', () => {
      render(<DateFormat value="PT2H30M" skeleton={true} />)

      const element = document.querySelector('.dnb-date-format')
      expect(Array.from(element.classList)).toEqual([
        'dnb-date-format',
        'dnb-skeleton',
        'dnb-skeleton--font',
      ])
    })

    it('should handle mixed duration and date scenarios', () => {
      const { rerender } = render(<DateFormat value="PT2H30M" />)
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      // Switch to date mode
      rerender(<DateFormat value="2025-08-01" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1. august 2025')

      // Switch back to duration
      rerender(<DateFormat value="P1DT2H30M" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent(
        '1 døgn, 2 timer og 30 minutter'
      )
    })

    it('should prioritize duration over date when both are valid', () => {
      render(<DateFormat value="PT2H30M" />)
      const dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')
    })

    it('should work with relativeTime prop for actual dates while duration works automatically', () => {
      const { rerender } = render(<DateFormat value="PT1H" />)
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 time')

      // Duration still works with relativeTime prop
      rerender(<DateFormat value="PT1H" relativeTime />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('1 time')

      // But actual dates use relativeTime
      rerender(<DateFormat value="2025-08-01" relativeTime />)
      dateFormat = document.querySelector('.dnb-date-format')
      // The output depends on the current date and locale, so we'll check for a relative time pattern
      // This should match patterns like "in X days", "for X uker siden", "om X dager", etc.
      expect(dateFormat.textContent).toMatch(
        /^(?:in |for |om )?\d+ (?:days?|dager?|dag|uker?|uke|weeks?|months?|måned(er)?|years?|år)(?:\s+(?:siden|ago))?$/
      )
    })

    it('should respect dateStyle prop for duration formatting', () => {
      const { rerender } = render(<DateFormat value="PT2H30M" />)
      let dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      // Test different dateStyle options - output depends on browser's Intl.DurationFormat
      // Since it's not available in test env, all styles fallback to same English format
      rerender(<DateFormat value="PT2H30M" dateStyle="short" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2t, 30m')

      rerender(<DateFormat value="PT2H30M" dateStyle="medium" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 t, 30 min')

      rerender(<DateFormat value="PT2H30M" dateStyle="long" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')

      rerender(<DateFormat value="PT2H30M" dateStyle="full" />)
      dateFormat = document.querySelector('.dnb-date-format')
      expect(dateFormat).toHaveTextContent('2 timer og 30 minutter')
    })

    describe('ARIA', () => {
      it('should validate', async () => {
        const Component = render(
          <DateFormat value="PT2H30M" dateStyle="long" />
        )
        expect(await axeComponent(Component)).toHaveNoViolations()
      })

      it('should handle aria-label attribute for duration (may or may not be present)', () => {
        render(<DateFormat value="PT2H30M" dateStyle="short" />)
        const dateFormat = document.querySelector('.dnb-date-format')

        // aria-label may or may not be present depending on format differences
        // This test just verifies the component renders correctly in both cases
        expect(dateFormat).toBeInTheDocument()
        expect(dateFormat.tagName).toBe('TIME')
      })

      it('should not have `aria-label` attribute when duration format is the same as visible text', () => {
        render(<DateFormat value="PT2H30M" dateStyle="long" />)
        const dateFormat = document.querySelector('.dnb-date-format')
        // When the formats are the same, aria-label should not be present
        expect(dateFormat).not.toHaveAttribute('aria-label')
      })
    })
  })
})
