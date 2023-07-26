import React from 'react'
import { act, render } from '@testing-library/react'
import ScrollView, { ScrollViewAllProps } from '../ScrollView'
import { setResizeObserver } from './__mocks__/ResizeObserver'

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

    const ref = React.createRef<HTMLDivElement>()
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

    const ref = React.createRef<HTMLDivElement>()
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
})
