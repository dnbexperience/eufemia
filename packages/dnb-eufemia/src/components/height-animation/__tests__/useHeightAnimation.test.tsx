import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import {
  render,
  fireEvent,
  renderHook,
  waitFor,
} from '@testing-library/react'
import ToggleButton from '../../ToggleButton'
import {
  useHeightAnimation,
  useHeightAnimationOptions,
} from '../useHeightAnimation'
import {
  simulateAnimationEnd,
  initializeTestSetup,
  nextAnimationFrame,
  getElement,
  mockHeight,
} from './HeightAnimationUtils'

initializeTestSetup()

describe('useHeightAnimation', () => {
  const AnimatedContent = ({
    open = false,
    animate = true,
  }: useHeightAnimationOptions) => {
    const element = React.useRef()
    const { isOpen, isVisible, isInDOM, isVisibleParallax } =
      useHeightAnimation(element, {
        open,
        animate,
      })

    return (
      <div
        className={classnames(
          'wrapper-element',
          isInDOM && 'is-in-dom',
          isVisible && 'is-visible',
          isVisibleParallax && 'is-parallax',
          isOpen && 'is-open'
        )}
      >
        <div ref={element} className="dnb-height-animation">
          <div className="content">content</div>
        </div>
      </div>
    )
  }

  const MockComponent = ({ open = false, animate = true }) => {
    const [openState, setOpenState] = useState(open)

    const onChangeHandler = useCallback(({ checked }) => {
      setOpenState(checked)
    }, [])

    return (
      <>
        <ToggleButton checked={openState} on_change={onChangeHandler}>
          Toggle me
        </ToggleButton>

        <AnimatedContent open={open || openState} animate={animate} />
      </>
    )
  }

  it('should be closed by default', () => {
    render(<MockComponent />)
    expect(document.querySelector('.is-in-dom')).not.toBeInTheDocument()
  })

  it('should have element in DOM when open property is true', () => {
    const { rerender } = render(<MockComponent />)

    expect(document.querySelector('.is-in-dom')).not.toBeInTheDocument()

    rerender(<MockComponent open />)

    expect(document.querySelector('.is-in-dom')).toBeInTheDocument()
  })

  it('should set correct heights during the animation cycle', () => {
    const { rerender } = render(<MockComponent />)

    mockHeight(200)

    expect(getElement()).not.toHaveAttribute('style')

    rerender(<MockComponent open />)

    expect(getElement()).not.toHaveAttribute('style')

    nextAnimationFrame()

    expect(getElement()).toHaveAttribute('style', 'height: 0px;')

    nextAnimationFrame()

    expect(getElement()).toHaveAttribute('style', 'height: 200px;')

    simulateAnimationEnd()

    expect(getElement()).toHaveAttribute('style', 'height: auto;')

    mockHeight(100)

    rerender(<MockComponent open={false} />)

    expect(getElement()).toHaveAttribute('style', 'height: auto;')

    nextAnimationFrame()

    expect(getElement()).toHaveAttribute('style', 'height: 100px;')

    nextAnimationFrame()

    expect(getElement()).toHaveAttribute('style', 'height: 0px;')

    simulateAnimationEnd()

    expect(getElement()).toHaveAttribute(
      'style',
      'height: 0px; visibility: hidden; overflow-y: clip;'
    )
  })

  it('should act with different states through the animation transition', () => {
    render(<MockComponent />)

    const element = document.querySelector('.wrapper-element')

    expect(element).toHaveAttribute('class', 'wrapper-element')

    fireEvent.click(document.querySelector('button'))

    expect(element).toHaveAttribute(
      'class',
      'wrapper-element is-in-dom is-visible is-parallax'
    )

    simulateAnimationEnd()

    expect(element).toHaveAttribute(
      'class',
      'wrapper-element is-in-dom is-visible is-parallax is-open'
    )

    fireEvent.click(document.querySelector('button'))

    expect(element).toHaveAttribute(
      'class',
      'wrapper-element is-in-dom is-visible is-open'
    )

    simulateAnimationEnd()

    expect(element).toHaveAttribute('class', 'wrapper-element')
  })

  it('should only set isInDOM when animation is disabled', async () => {
    render(<MockComponent animate={false} />)

    const element = document.querySelector('.wrapper-element')

    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      expect(element).toHaveClass('wrapper-element')
      expect(element).toHaveClass('is-in-dom')
    })

    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      expect(element).toHaveClass('wrapper-element')
    })
  })

  it('should not animate when globalThis.IS_TEST is true', () => {
    globalThis.IS_TEST = true

    const { rerender } = render(<MockComponent />)

    rerender(<MockComponent open />)

    const element = document.querySelector('.wrapper-element')

    expect(element).toHaveClass('wrapper-element')
    expect(element).toHaveClass('is-in-dom')
  })

  it('should be open by default', () => {
    const current: HTMLDivElement = document.createElement('div')
    const ref: React.RefObject<HTMLDivElement> = { current }

    const { result } = renderHook(() => useHeightAnimation(ref))

    expect(result.current).toEqual({
      firstPaintStyle: {},
      isAnimating: false,
      isInDOM: true,
      isOpen: true,
      isVisible: true,
      isVisibleParallax: true,
      open: true,
    })
  })

  it('should be closed if open is false', () => {
    const current: HTMLDivElement = document.createElement('div')
    const ref: React.RefObject<HTMLDivElement> = { current }

    const { result } = renderHook(() =>
      useHeightAnimation(ref, { open: false })
    )

    expect(result.current).toEqual({
      firstPaintStyle: {},
      isAnimating: false,
      isInDOM: false,
      isOpen: false,
      isVisible: false,
      isVisibleParallax: false,
      open: false,
    })
  })

  it('should call onAnimationEnd on open', () => {
    globalThis.IS_TEST = undefined

    const onAnimationEnd = jest.fn()
    const current: HTMLDivElement = document.createElement('div')
    const ref: React.RefObject<HTMLDivElement> = { current }

    const { rerender } = renderHook(
      ({ open }) => useHeightAnimation(ref, { open, onAnimationEnd }),
      {
        initialProps: { open: false },
      }
    )

    expect(onAnimationEnd).toHaveBeenCalledTimes(0)

    rerender({ open: true })

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
    expect(onAnimationEnd).toHaveBeenLastCalledWith('opened')
  })

  it('should call onAnimationEnd on close', () => {
    globalThis.IS_TEST = undefined

    const onAnimationEnd = jest.fn()
    const current: HTMLDivElement = document.createElement('div')
    const ref: React.RefObject<HTMLDivElement> = { current }

    const { rerender } = renderHook(
      ({ open }) => useHeightAnimation(ref, { open, onAnimationEnd }),
      {
        initialProps: { open: true },
      }
    )

    expect(onAnimationEnd).toHaveBeenCalledTimes(0)

    rerender({ open: false })

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
    expect(onAnimationEnd).toHaveBeenLastCalledWith('closed')
  })
})
