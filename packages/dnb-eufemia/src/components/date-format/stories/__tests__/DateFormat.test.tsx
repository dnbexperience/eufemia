import React from 'react'
import { render } from '@testing-library/react'
import DateFormat from '../../DateFormat'

describe('DateFormat', () => {
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
