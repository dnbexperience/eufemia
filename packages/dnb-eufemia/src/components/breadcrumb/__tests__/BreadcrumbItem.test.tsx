import { render } from '@testing-library/react'
import { vi } from 'vitest'
import type { BreadcrumbItemProps } from '../BreadcrumbItem'
import BreadcrumbItem from '../BreadcrumbItem'
import { Theme } from '../../../shared'

describe('BreadcrumbItem', () => {
  const defaultProps: BreadcrumbItemProps = {
    text: 'Page',
  }

  it('renders without properties', () => {
    render(<BreadcrumbItem {...defaultProps} />)

    expect(document.querySelector('li')).toBeInTheDocument()
    expect(document.querySelector('a')).toBeNull()
  })

  it('should have default text for home variant', () => {
    render(<BreadcrumbItem variant="home" />)

    expect(document.querySelector('li')).toHaveTextContent('Hjem')
  })

  it('renders breadcrumb item as a link', () => {
    render(<BreadcrumbItem {...defaultProps} href="/url" />)

    expect(document.querySelector('li')).toBeInTheDocument()
    expect(document.querySelector('a')).toBeDefined()
    expect(document.querySelector('a').getAttribute('href')).toBe('/url')
  })

  it('renders breadcrumb item as a button', () => {
    render(<BreadcrumbItem {...defaultProps} onClick={vi.fn()} />)

    expect(document.querySelector('button')).toBeDefined()
  })

  it('should have aria-current when variant is current', () => {
    const { rerender } = render(
      <BreadcrumbItem {...defaultProps} variant="current" />
    )

    expect(document.querySelector('li')).toHaveAttribute(
      'aria-current',
      'page'
    )

    rerender(<BreadcrumbItem {...defaultProps} />)

    expect(document.querySelector('li')).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('should have delay style based on itemNo', () => {
    const { rerender } = render(
      <BreadcrumbItem {...defaultProps} itemNo={1} />
    )

    expect(document.querySelector('li')).toHaveAttribute(
      'style',
      '--delay: 1;'
    )

    rerender(<BreadcrumbItem {...defaultProps} itemNo={2} />)

    expect(document.querySelector('li')).toHaveAttribute(
      'style',
      '--delay: 2;'
    )
  })

  describe('with icon', () => {
    it('has a default icon', () => {
      render(<BreadcrumbItem {...defaultProps} />)

      expect(document.querySelector('img')).toBeDefined()
      expect(document.querySelector('.dnb-icon')).toHaveAttribute(
        'data-testid',
        'chevron right icon'
      )
    })

    it('can have a custom icon', () => {
      render(<BreadcrumbItem {...defaultProps} icon="arrow_right" />)

      expect(document.querySelector('img')).toBeDefined()
      expect(document.querySelector('.dnb-icon')).toHaveAttribute(
        'data-testid',
        'arrow right icon'
      )
    })

    it('supports inline styling', () => {
      render(
        <BreadcrumbItem
          {...defaultProps}
          onClick={vi.fn()}
          style={{ color: 'red' }}
        />
      )

      expect(document.querySelector('a').getAttribute('style')).toBe(
        'color: red;'
      )
    })

    it('has a home icon', () => {
      render(<BreadcrumbItem {...defaultProps} variant="home" />)

      expect(document.querySelector('img')).toBeDefined()
      expect(document.querySelector('.dnb-icon')).toHaveAttribute(
        'data-testid',
        'home icon'
      )
    })

    describe('sbanken', () => {
      it('should have SSR fallback', () => {
        const matchMedia = window.matchMedia
        window.matchMedia = undefined

        render(
          <Theme name="sbanken">
            <BreadcrumbItem {...defaultProps} />
          </Theme>
        )

        expect(document.querySelector('.dnb-icon')).toHaveAttribute(
          'data-testid',
          'chevron right icon'
        )

        window.matchMedia = matchMedia
      })

      it('should have icons based on variant', () => {
        const { rerender } = render(
          <Theme name="sbanken">
            <BreadcrumbItem {...defaultProps} variant="home" />
          </Theme>
        )

        expect(document.querySelector('.dnb-icon')).toHaveAttribute(
          'data-testid',
          'home icon'
        )

        rerender(
          <Theme name="sbanken">
            <BreadcrumbItem
              {...defaultProps}
              variant={'single' as BreadcrumbItemProps['variant']}
            />
          </Theme>
        )

        expect(document.querySelector('.dnb-icon')).toHaveAttribute(
          'data-testid',
          'chevron left icon'
        )

        rerender(
          <Theme name="sbanken">
            <BreadcrumbItem
              {...defaultProps}
              variant={'collapse' as BreadcrumbItemProps['variant']}
            />
          </Theme>
        )

        expect(document.querySelector('.dnb-icon')).toHaveAttribute(
          'data-testid',
          'chevron right icon'
        )

        rerender(
          <Theme name="sbanken">
            <BreadcrumbItem {...defaultProps} />
          </Theme>
        )

        expect(document.querySelector('.dnb-icon')).toHaveAttribute(
          'data-testid',
          'chevron right icon'
        )
      })
    })
  })
})
