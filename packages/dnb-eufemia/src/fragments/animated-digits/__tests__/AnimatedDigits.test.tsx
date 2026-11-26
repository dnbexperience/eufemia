import { render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import AnimatedDigits from '../AnimatedDigits'

describe('AnimatedDigits', () => {
  it('can leave the real text to a parent while generating decorative digits', () => {
    render(<AnimatedDigits value="128" decorative />)

    const digits = document.querySelector('.dnb-animated-digits')
    expect(digits.textContent).toBe('')
    expect(digits).toHaveAttribute('aria-hidden', 'true')
    expect(
      document.querySelector('.dnb-animated-digits__text')
    ).toHaveAttribute('data-text', '128')
  })

  it('exposes one complete accessible value and hides the visual digits', () => {
    render(<AnimatedDigits value="1 234,50" />)

    expect(
      document.querySelector('.dnb-animated-digits__visual')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      document.querySelector('.dnb-animated-digits__text')
    ).toHaveTextContent('1 234,50')
  })

  it('keeps right-to-left text in its native text run without animation', () => {
    render(<AnimatedDigits value="١ مليون" previousValue="٢ مليون" />)

    expect(document.querySelector('.dnb-animated-digits')).toBeNull()
    expect(document.body).toHaveTextContent('١ مليون')
  })

  it('renders formatted text without motion when no previous value is supplied', () => {
    render(<AnimatedDigits value="20 Nov 2026, 09:41" />)

    expect(
      document.querySelector('.dnb-animated-digits').textContent
    ).toBe('20 Nov 2026, 09:41')
    expect(
      document.querySelectorAll(
        '.dnb-animated-digits__character--animated'
      )
    ).toHaveLength(0)
  })

  it.each([
    ['21 Nov 2026', '20 Nov 2026', ['2', '0', '2', '0', '2', '6']],
    ['09:42', '09:41', ['0', '9', '4', '1']],
    ['3 minutes ago', '2 minutes ago', ['2']],
    ['٣٤', '١٢', ['١', '٢']],
  ])(
    'supports formatted dates, times and localized digits: %s',
    (value, previousValue, previousDigits) => {
      render(
        <AnimatedDigits value={value} previousValue={previousValue} />
      )

      expect(
        document.querySelector('.dnb-animated-digits').textContent
      ).toBe(value)
      expect(
        Array.from(
          document.querySelectorAll('.dnb-animated-digits__previous')
        ).map((digit) => digit.getAttribute('data-previous'))
      ).toEqual(previousDigits)
      document
        .querySelectorAll('.dnb-animated-digits__previous')
        .forEach((digit) => {
          expect(digit).toHaveAttribute('aria-hidden', 'true')
        })
    }
  )

  it('matches digits independently of separators and unit text', () => {
    const { rerender } = render(
      <AnimatedDigits value="12 months ago" previousValue="12 days ago" />
    )

    expect(
      document.querySelectorAll(
        '.dnb-animated-digits__character--animated'
      )
    ).toHaveLength(0)

    rerender(<AnimatedDigits value="1,234.50" previousValue="1 234,50" />)

    expect(
      document.querySelectorAll(
        '.dnb-animated-digits__character--animated'
      )
    ).toHaveLength(0)
  })

  it('cascades every digit from left to right, skipping separators and units', () => {
    render(
      <AnimatedDigits value="NOK 2 238,50" previousValue="NOK 2 128,50" />
    )

    const digits = document.querySelectorAll<HTMLElement>(
      '.dnb-animated-digits__character--animated'
    )
    expect(
      Array.from(digits).map((digit) => ({
        value: digit.lastElementChild.getAttribute('data-text'),
        previous: digit.firstElementChild.getAttribute('data-previous'),
        delay: digit.style.animationDelay,
      }))
    ).toEqual([
      { value: '2', previous: '2', delay: '0ms' },
      { value: '2', previous: '1', delay: '25ms' },
      { value: '3', previous: '2', delay: '50ms' },
      { value: '8', previous: '8', delay: '75ms' },
      { value: '5', previous: '5', delay: '100ms' },
      { value: '0', previous: '0', delay: '125ms' },
    ])
  })

  it('supports new leading digits and immediate interrupted updates', () => {
    const { rerender } = render(
      <AnimatedDigits value="1000" previousValue="99" />
    )

    expect(
      document.querySelectorAll(
        '.dnb-animated-digits__character--animated'
      )
    ).toHaveLength(4)
    expect(
      document.querySelectorAll('.dnb-animated-digits__previous')
    ).toHaveLength(2)

    rerender(
      <AnimatedDigits
        value="10"
        previousValue="1000"
        direction="down"
        reserveWidth="4ch"
      />
    )

    const element = document.querySelector<HTMLElement>(
      '.dnb-animated-digits'
    )
    expect(element.textContent).toBe('10')
    expect(element).toHaveClass('dnb-animated-digits--down')
    expect(element.style.minInlineSize).toBe('4ch')
    expect(
      document.querySelectorAll(
        '.dnb-animated-digits__character--animated'
      )
    ).toHaveLength(2)
  })

  it('keeps the number container when the digit count changes', () => {
    const { rerender } = render(<AnimatedDigits value="99,50" />)
    const number = document.querySelector('.dnb-animated-digits')

    rerender(<AnimatedDigits value="1 234 567,50" previousValue="99,50" />)

    expect(document.querySelector('.dnb-animated-digits')).toBe(number)
  })

  it('keeps an unchanged sign outside the resizing viewport', () => {
    render(<AnimatedDigits value="+1 234 567" previousValue="+99" />)

    const viewport = document.querySelector(
      '.dnb-animated-digits__viewport'
    )
    expect(viewport.previousElementSibling).toHaveAttribute(
      'data-text',
      '+'
    )
  })

  it.each([
    ['128', '28', '1'],
    ['−128', '−28', '1'],
    ['💰128', '💰28', '1'],
    ['1 234', '34', '1 2'],
    ['−128', '28', '−1'],
    ['+NOK ', 'NOK ', '+'],
  ])(
    'retains the removed prefix of %s for fading',
    (previousValue, value, removed) => {
      const { rerender } = render(<AnimatedDigits value={previousValue} />)
      rerender(
        <AnimatedDigits value={value} previousValue={previousValue} />
      )

      const outgoing = document.querySelector(
        '.dnb-animated-digits__removed'
      )
      expect(outgoing).toHaveAttribute('aria-hidden', 'true')
      expect(outgoing.firstElementChild).toHaveAttribute(
        'data-previous',
        removed
      )
      expect(
        document.querySelector('.dnb-animated-digits').textContent
      ).toBe(value)

      rerender(<AnimatedDigits value={value} />)
      expect(
        document.querySelector('.dnb-animated-digits__removed')
      ).toBeNull()
    }
  )

  describe('width changes', () => {
    let reduced: boolean
    let mediaChange: () => void
    const originalAnimate = HTMLElement.prototype.animate
    const animate = vi.fn(() => ({ cancel: vi.fn(), onfinish: null }))

    beforeEach(() => {
      animate.mockClear()
      HTMLElement.prototype.animate =
        animate as unknown as typeof originalAnimate
      vi.spyOn(
        Element.prototype,
        'getBoundingClientRect'
      ).mockImplementation(function (this: Element) {
        return { width: this.textContent.length * 10 } as DOMRect
      })
      reduced = false
      vi.stubGlobal('matchMedia', () => ({
        get matches() {
          return reduced
        },
        addEventListener: vi.fn((_, listener) => {
          mediaChange = listener
        }),
        removeEventListener: vi.fn(),
      }))
    })

    afterEach(() => {
      HTMLElement.prototype.animate = originalAnimate
      vi.restoreAllMocks()
      vi.unstubAllGlobals()
    })

    it('animates growing and shrinking values from their previous width', () => {
      const { rerender } = render(<AnimatedDigits value="99" />)
      expect(animate).not.toHaveBeenCalled()

      rerender(<AnimatedDigits value="1 000" previousValue="99" />)
      expect(animate).toHaveBeenLastCalledWith(
        [{ width: '20px' }, { width: '50px' }],
        { duration: 160, easing: 'ease-out' }
      )
      animate.mock.results[0].value.onfinish()

      rerender(<AnimatedDigits value="10" previousValue="1 000" />)
      expect(animate).toHaveBeenLastCalledWith(
        [{ width: '50px' }, { width: '20px' }],
        { duration: 160, easing: 'ease-out' }
      )
    })

    it('preserves the total width when an unchanged prefix moves outside the viewport', () => {
      const { rerender } = render(<AnimatedDigits value="+99" />)

      rerender(<AnimatedDigits value="+1 000" previousValue="+99" />)
      expect(animate).toHaveBeenLastCalledWith(
        [{ width: '30px' }, { width: '60px' }],
        { duration: 160, easing: 'ease-out' }
      )
    })

    it('continues interrupted updates from their visible width and cancels on unmount', () => {
      const { rerender, unmount } = render(<AnimatedDigits value="99" />)
      rerender(<AnimatedDigits value="1 000" previousValue="99" />)
      const first = animate.mock.results[0].value
      vi.mocked(
        Element.prototype.getBoundingClientRect
      ).mockReturnValueOnce({ width: 35 } as DOMRect)

      rerender(<AnimatedDigits value="10" previousValue="1 000" />)
      expect(first.cancel).toHaveBeenCalledOnce()
      expect(animate).toHaveBeenLastCalledWith(
        [{ width: '35px' }, { width: '20px' }],
        { duration: 160, easing: 'ease-out' }
      )

      unmount()
      expect(animate.mock.results[1].value.cancel).toHaveBeenCalledOnce()
    })

    it('skips formatting changes and disables motion when the preference changes', () => {
      const { rerender } = render(<AnimatedDigits value="99" />)
      rerender(<AnimatedDigits value="1 000" />)
      expect(animate).not.toHaveBeenCalled()

      rerender(<AnimatedDigits value="10" previousValue="1 000" />)
      const current = animate.mock.results[0].value
      reduced = true
      mediaChange()
      expect(current.cancel).toHaveBeenCalledOnce()

      rerender(<AnimatedDigits value="1 000" previousValue="10" />)
      expect(animate).toHaveBeenCalledOnce()
    })

    it('does not animate from a width measured while hidden', () => {
      vi.mocked(Element.prototype.getBoundingClientRect)
        .mockReturnValueOnce({ width: 0 } as DOMRect)
        .mockReturnValueOnce({ width: 0 } as DOMRect)
      const { rerender } = render(<AnimatedDigits value="99" />)

      rerender(<AnimatedDigits value="100" previousValue="99" />)

      expect(animate).not.toHaveBeenCalled()
    })
  })

  it('renders the same initial markup on the server and client', () => {
    const element = <AnimatedDigits value="1 234,50" />
    const { container } = render(element)

    expect(container.innerHTML).toBe(renderToString(element))
  })
})
