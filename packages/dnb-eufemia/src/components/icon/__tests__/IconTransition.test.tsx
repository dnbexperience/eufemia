import { render, act } from '@testing-library/react'
import { createRef } from 'react'
import Icon from '../Icon'
import { transition } from '../IconTransition'
import arrow_down from '../../../icons/dnb/arrow_down'
import arrow_up from '../../../icons/dnb/arrow_up'
import arrow_left from '../../../icons/dnb/arrow_left'
import arrow_right from '../../../icons/dnb/arrow_right'
import chevron_down from '../../../icons/dnb/chevron_down'
import chevron_up from '../../../icons/dnb/chevron_up'

describe('Icon.transition', () => {
  beforeEach(() => {
    transition.isSupported = true
  })

  afterEach(() => {
    transition.isSupported = false
  })

  it('is exposed as a static method on Icon', () => {
    expect(Icon.transition).toBe(transition)
  })

  it('returns a function', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    expect(typeof icon).toBe('function')
  })

  it('renders the default (first) icon unchanged', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    render(<Icon icon={icon} />)

    const path = document.querySelector('.dnb-icon svg path')
    expect(path).toBeInTheDocument()

    // The SVG attribute keeps the original path data — no modification
    // so the icon renders identically to a non-transition icon
    expect(path.getAttribute('d')).toBe('m3 9.75 5 5m0 0 5-5m-5 5V1.25')
  })

  it('sets named CSS custom properties on the wrapper when transitionState is provided', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    render(<Icon icon={icon} transitionState="asc" />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    expect(style).toContain('--icon-transition-asc')
    expect(style).toContain('--icon-transition-desc')
    expect(style).toContain('--icon-transition-default')
    expect(style).toContain('var(--icon-transition-asc)')
  })

  it('sets CSS custom properties even without transitionState', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    render(<Icon icon={icon} />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    expect(style).toContain('--icon-transition-asc')
    expect(style).toContain('--icon-transition-desc')
    expect(style).toContain('--icon-transition-default')
  })

  it('normalizes paths to absolute coordinates', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    render(<Icon icon={icon} transitionState="asc" />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    // arrow_down: m3 9.75 5 5m0 0 5-5m-5 5V1.25
    expect(style).toContain(
      "path('M3 9.75 L8 14.75 M8 14.75 L13 9.75 M8 14.75 L8 1.25')"
    )

    // arrow_up: m3 6.25 5-5m0 0 5 5m-5-5v13.5
    // Last subpath reversed by alignPath to match arrow_down's direction
    expect(style).toContain(
      "path('M3 6.25 L8 1.25 M8 1.25 L13 6.25 M8 14.75 L8 1.25')"
    )
  })

  it('supports more than two icon states', () => {
    const icon = Icon.transition({
      down: arrow_down,
      up: arrow_up,
      left: arrow_left,
      right: arrow_right,
    })

    render(<Icon icon={icon} transitionState="down" />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    expect(style).toContain('--icon-transition-down')
    expect(style).toContain('--icon-transition-up')
    expect(style).toContain('--icon-transition-left')
    expect(style).toContain('--icon-transition-right')
    expect(style).toContain('--icon-transition-default')
    expect(style).toContain('var(--icon-transition-down)')
  })

  it('defaults to the first state', () => {
    const icon = Icon.transition({
      left: arrow_left,
      right: arrow_right,
    })

    render(<Icon icon={icon} transitionState="left" />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    expect(style).toContain(
      '--icon-transition-default: var(--icon-transition-left)'
    )
  })

  it('preserves icon props like width and height', () => {
    const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

    render(<Icon icon={icon} width="32" height="32" />)

    const svg = document.querySelector('.dnb-icon svg')
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.getAttribute('height')).toBe('32')
  })

  it('aligns cross-wired paths to avoid midpoint collapse', () => {
    const icon = Icon.transition({
      collapsed: chevron_down,
      expanded: chevron_up,
    })

    render(<Icon icon={icon} transitionState="collapsed" />)

    const wrapper = document.querySelector('.dnb-icon') as HTMLElement
    const style = wrapper.getAttribute('style')

    // chevron_down (default, kept as-is): M13 5.5 L8 10.5 L3 5.5
    expect(style).toContain("path('M13 5.5 L8 10.5 L3 5.5')")

    // chevron_up aligned to match chevron_down's point order:
    // Original: M3 10.5 L8 5.5 L13 10.5 → Reversed: M13 10.5 L8 5.5 L3 10.5
    expect(style).toContain("path('M13 10.5 L8 5.5 L3 10.5')")
  })

  describe('when CSS d interpolation is not supported', () => {
    beforeEach(() => {
      transition.isSupported = false
    })

    it('uses fallback crossfade even for structurally compatible paths', () => {
      const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

      render(<Icon icon={icon} />)

      const wrapper = document.querySelector('.dnb-icon') as HTMLElement
      expect(
        wrapper.classList.contains('dnb-icon--transition-fallback')
      ).toBe(true)

      const svgs = wrapper.querySelectorAll('svg[data-icon-state]')
      expect(svgs).toHaveLength(2)
      expect(svgs[0].getAttribute('data-icon-state')).toBe('asc')
      expect(svgs[1].getAttribute('data-icon-state')).toBe('desc')
    })
  })

  describe('transitionState prop', () => {
    it('activates CSS d transition state via inline style', () => {
      const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

      render(<Icon icon={icon} transitionState="desc" />)

      const wrapper = document.querySelector('.dnb-icon') as HTMLElement
      expect(wrapper.style.getPropertyValue('--icon-transition')).toBe(
        'var(--icon-transition-desc)'
      )
    })

    it('activates fallback state by toggling active class on SVGs', () => {
      transition.isSupported = false

      const icon = Icon.transition({
        collapsed: chevron_down,
        expanded: chevron_up,
      })

      render(<Icon icon={icon} transitionState="expanded" />)

      const svgs = document.querySelectorAll('svg[data-icon-state]')
      expect(svgs[0].classList.contains('dnb-icon__state--active')).toBe(
        false
      )
      expect(svgs[1].classList.contains('dnb-icon__state--active')).toBe(
        true
      )
    })

    it('updates when transitionState changes', () => {
      const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })

      const { rerender } = render(
        <Icon icon={icon} transitionState="asc" />
      )

      const wrapper = document.querySelector('.dnb-icon') as HTMLElement
      expect(wrapper.style.getPropertyValue('--icon-transition')).toBe(
        'var(--icon-transition-asc)'
      )

      act(() => {
        rerender(<Icon icon={icon} transitionState="desc" />)
      })

      expect(wrapper.style.getPropertyValue('--icon-transition')).toBe(
        'var(--icon-transition-desc)'
      )
    })

    it('preserves an external ref passed to Icon', () => {
      const icon = Icon.transition({ asc: arrow_down, desc: arrow_up })
      const externalRef = createRef<HTMLSpanElement>()

      render(<Icon icon={icon} ref={externalRef} transitionState="desc" />)

      expect(externalRef.current).toBeInstanceOf(HTMLSpanElement)
      expect(externalRef.current.classList.contains('dnb-icon')).toBe(true)
    })
  })

  describe('SSR active state', () => {
    it('renders the correct SVG as active based on transitionState', () => {
      const icon = Icon.transition({
        collapsed: chevron_down,
        expanded: chevron_up,
      })

      render(<Icon icon={icon} transitionState="expanded" />)

      const svgs = document.querySelectorAll('svg[data-icon-state]')
      expect(svgs[0].getAttribute('data-icon-state')).toBe('collapsed')
      expect(svgs[0].classList.contains('dnb-icon__state--active')).toBe(
        false
      )
      expect(svgs[1].getAttribute('data-icon-state')).toBe('expanded')
      expect(svgs[1].classList.contains('dnb-icon__state--active')).toBe(
        true
      )
    })

    it('defaults to first state when transitionState is not set', () => {
      transition.isSupported = false

      const icon = Icon.transition({
        collapsed: chevron_down,
        expanded: chevron_up,
      })

      render(<Icon icon={icon} />)

      const svgs = document.querySelectorAll('svg[data-icon-state]')
      expect(svgs[0].classList.contains('dnb-icon__state--active')).toBe(
        true
      )
      expect(svgs[1].classList.contains('dnb-icon__state--active')).toBe(
        false
      )
    })
  })

  describe('transition.activate', () => {
    it('toggles both fallback classes and CSS d property', () => {
      const icon = Icon.transition({
        collapsed: chevron_down,
        expanded: chevron_up,
      })

      render(<Icon icon={icon} transitionState="collapsed" />)

      const wrapper = document.querySelector('.dnb-icon') as HTMLElement

      act(() => {
        transition.activate(wrapper, 'expanded')
      })

      // CSS d property is updated
      expect(wrapper.style.getPropertyValue('--icon-transition')).toBe(
        'var(--icon-transition-expanded)'
      )

      // Fallback classes are also toggled
      const svgs = wrapper.querySelectorAll('svg[data-icon-state]')
      expect(svgs[0].classList.contains('dnb-icon__state--active')).toBe(
        false
      )
      expect(svgs[1].classList.contains('dnb-icon__state--active')).toBe(
        true
      )
    })
  })
})
