import React from 'react'
import { render } from '@testing-library/react'
import DateFormat from '../../DateFormat'

describe('DateFormat', () => {
  describe('formats', () => {
    it('should support dates in `yyyy-MM-dd` format', () => {
      const { rerender } = render(<DateFormat>2025-05-23</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat date="2026-06-08" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `dd.MM.yyyy` format', () => {
      const { rerender } = render(<DateFormat>23.05.2025</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat date="08.06.2026" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `dd/MM/yyyy` format', () => {
      const { rerender } = render(<DateFormat>23/05/2025</DateFormat>)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('23. mai 2025')

      rerender(<DateFormat date="08/06/2026" />)
      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })

    it('should support dates in `Date object` format', () => {
      render(<DateFormat date={new Date('2026-06-08')} />)

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('8. juni 2026')
    })
  })

  describe('formatting date', () => {
    it('should support formatting the whole date with `dateStyle`', () => {
      const { rerender } = render(
        <DateFormat date="2025-08-01" dateStyle="full" />
      )

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('fredag 1. august 2025')

      rerender(<DateFormat date="2025-08-01" dateStyle="long" />)
      expect(dateFormat).toHaveTextContent('1. august 2025')

      rerender(<DateFormat date="2025-08-01" dateStyle="medium" />)
      expect(dateFormat).toHaveTextContent('1. aug. 2025')

      rerender(<DateFormat date="2025-08-01" dateStyle="short" />)
      expect(dateFormat).toHaveTextContent('01.08.2025')
    })

    it('should support formatting `weekday`', () => {
      const { rerender } = render(
        <DateFormat date="2025-05-23" weekday="long" />
      )
      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('fredag')

      rerender(<DateFormat date="2025-05-23" weekday="narrow" />)
      expect(dateFormat).toHaveTextContent('F')

      rerender(<DateFormat date="2025-05-23" weekday="short" />)
      expect(dateFormat).toHaveTextContent('fre.')
    })

    it('should support formatting `day`', () => {
      const { rerender } = render(
        <DateFormat date="2025-05-08" day="2-digit" />
      )
      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('08.')

      rerender(<DateFormat date="2025-05-08" day="numeric" />)
      expect(dateFormat).toHaveTextContent('8.')
    })

    it('should support formatting `month`', () => {
      const { rerender } = render(
        <DateFormat date="2025-08-01" month="2-digit" />
      )
      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('08.')

      rerender(<DateFormat date="2025-08-01" month="long" />)
      expect(dateFormat).toHaveTextContent('august')

      rerender(<DateFormat date="2025-08-01" month="narrow" />)
      expect(dateFormat).toHaveTextContent('A')

      rerender(<DateFormat date="2025-08-01" month="numeric" />)
      expect(dateFormat).toHaveTextContent('8.')

      rerender(<DateFormat date="2025-08-01" month="short" />)
      expect(dateFormat).toHaveTextContent('aug')
    })

    it('should support formatting `year`', () => {
      const { rerender } = render(
        <DateFormat date="2025-05-08" year="2-digit" />
      )
      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).toHaveTextContent('25')

      rerender(<DateFormat date="2025-05-08" year="numeric" />)
      expect(dateFormat).toHaveTextContent('2025')
    })

    it('should prioritize `weekday`, `day`, `month`, and `year` over `dateStyle`', () => {
      render(
        <DateFormat
          date="2025-08-01"
          dateStyle="full"
          weekday="short"
          day="2-digit"
          month="short"
          year="2-digit"
        />
      )

      const dateFormat = document.querySelector('.dnb-date-format')

      expect(dateFormat).not.toHaveTextContent('fredag 1. august 2025')
      expect(dateFormat).toHaveTextContent('fre. 01. aug. 25')
    })
  })
})
