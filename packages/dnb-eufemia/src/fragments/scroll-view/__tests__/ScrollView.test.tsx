import { act } from 'react'
import type { RefObject } from 'react'
import { render } from '@testing-library/react'
import type { ScrollViewAllProps } from '../ScrollView'
import ScrollView from '../ScrollView'
import { setResizeObserver } from './shared-mocks/ResizeObserver'

describe('ScrollView', () => {
  it('renders with props as an object', () => {
    const props: ScrollViewAllProps = {}

    render(<ScrollView {...props} />)
    expect(document.querySelector('.dnb-scroll-view')).toBeInTheDocument()
  })

  it('should contain children content', () => {
    render(<ScrollView>overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')

    expect(element.textContent).toBe('overflow content')
  })

  it('should set tabindex when interactive is set', () => {
    render(<ScrollView interactive>overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')

    expect(element.getAttribute('tabindex')).toBe('0')
  })

  it('should set tabindex based on children when interactive is set to auto', () => {
    setResizeObserver()

    const ref: RefObject<HTMLDivElement | null> = { current: null }
    const { rerender } = render(
      <ScrollView ref={ref} interactive="auto">
        overflow content
      </ScrollView>
    )

    const element = document.querySelector('.dnb-scroll-view')
    expect(element).not.toHaveAttribute('tabindex')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(102)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      rerender(
        <ScrollView ref={ref} interactive="auto">
          new content to force hook re-render
        </ScrollView>
      )
    })

    expect(element.getAttribute('tabindex')).toBe('0')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(101)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      rerender(
        <ScrollView ref={ref} interactive="auto">
          again, new content to force hook re-render
        </ScrollView>
      )
    })

    expect(element).not.toHaveAttribute('tabindex')
  })

  it('should set tabindex based on ResizeObserver when interactive is set to auto', () => {
    let renderResizeObserver = null

    const observe = jest.fn()
    const init = jest.fn((callback) => {
      renderResizeObserver = callback
    })
    setResizeObserver({ init, observe })

    const ref: RefObject<HTMLDivElement | null> = { current: null }
    render(
      <ScrollView ref={ref} interactive="auto">
        overflow content
      </ScrollView>
    )

    const element = document.querySelector('.dnb-scroll-view')
    expect(element).not.toHaveAttribute('tabindex')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(102)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObserver()
    })

    expect(element.getAttribute('tabindex')).toBe('0')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(101)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObserver()
    })

    expect(element).not.toHaveAttribute('tabindex')

    expect(init).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledWith(ref.current)
  })

  it('should attach ResizeObserver when a callback ref is used', () => {
    const observe = jest.fn()
    const init = jest.fn()
    setResizeObserver({ init, observe })

    let refValue: HTMLDivElement | null = null
    const callbackRef = (el: HTMLDivElement | null) => {
      refValue = el
    }

    render(
      <ScrollView ref={callbackRef} interactive="auto">
        overflow content
      </ScrollView>
    )

    expect(refValue).toBeInstanceOf(HTMLDivElement)
    expect(init).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledWith(refValue)
  })

  it('should include custom classes', () => {
    render(
      <ScrollView className="custom-class">overflow content</ScrollView>
    )

    const element = document.querySelector('.dnb-scroll-view')
    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'custom-class',
    ])
  })

  it('should support spacing', () => {
    render(<ScrollView top="large">overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')
    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'dnb-space__top--large',
    ])
  })

  it('should have constant of _supportsSpacingProps', () => {
    expect(ScrollView['_supportsSpacingProps']).toBe(true)
  })

  it('should add scrollbar-gutter class when scrollbarGutter is "stable"', () => {
    render(
      <ScrollView scrollbarGutter="stable">overflow content</ScrollView>
    )

    const element = document.querySelector('.dnb-scroll-view')
    expect(element).toHaveClass('dnb-scroll-view--scrollbar-gutter-stable')
  })

  it('should not add scrollbar-gutter class when scrollbarGutter is not provided', () => {
    render(<ScrollView>overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')
    expect(element).not.toHaveClass(
      'dnb-scroll-view--scrollbar-gutter-stable'
    )
  })
})
