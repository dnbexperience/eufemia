/**
 * useHeightAnimation Tests
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  render,
  act,
  fireEvent,
  renderHook,
  waitFor,
} from '@testing-library/react'
import ToggleButton from '../../ToggleButton'
import {
  useHeightAnimation,
  useHeightAnimationOptions,
} from '../useHeightAnimation'
import { wait } from '../../../core/jest/jestSetup'

beforeEach(() => {
  global.IS_TEST = false

  window.requestAnimationFrame = jest.fn((callback) => {
    return setTimeout(callback, 0)
  })
  window.cancelAnimationFrame = jest.fn((id) => {
    clearTimeout(id)
    return id
  })
})

const getStates = () =>
  Array.from(document.querySelector('.wrapper-element').classList)

describe('useHeightAnimation', () => {
  const AnimatedContent = ({
    open = false,
    animate = true,
  }: useHeightAnimationOptions) => {
    const animationElement = React.useRef()
    const { isOpen, isVisible, isInDOM, isVisibleParallax } =
      useHeightAnimation(animationElement, {
        open,
        animate,
      })

    return (
      <div
        className={classnames(
          'wrapper-element',
          isInDOM && 'is-in-dom',
          isVisible && 'is-visible',
          isVisibleParallax && 'is-in-parallax',
          isOpen && 'is-open'
        )}
      >
        <div ref={animationElement} className="animation-element">
          <div className="content">content</div>
        </div>
      </div>
    )
  }

  const Component = ({ open = false, animate = true }) => {
    const [openState, setOpenState] = React.useState(open)

    const onChangeHandler = ({ checked }) => {
      setOpenState(checked)
    }

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
    render(<Component />)
    expect(document.querySelector('.is-in-dom')).not.toBeInTheDocument()
  })

  it('should have element in DOM when open property is true', () => {
    const { rerender } = render(<Component />)

    expect(document.querySelector('.is-in-dom')).not.toBeInTheDocument()

    rerender(<Component open />)

    expect(document.querySelector('.is-in-dom')).toBeInTheDocument()
  })

  it('should set height style to auto', async () => {
    const { rerender } = render(<Component />)

    rerender(<Component open />)

    await act(async () => {
      const element = document.querySelector('.animation-element')

      expect(element.getAttribute('style')).toBe('')

      await wait(1)

      expect(element.getAttribute('style')).toBe('height: 0px;')

      simulateAnimationEnd()

      expect(element.getAttribute('style')).toBe('height: auto;')
    })
  })

  it('should act with different states through the animation transition', async () => {
    render(<Component />)

    expect(getStates()).toEqual(['wrapper-element'])

    act(() => {
      fireEvent.click(document.querySelector('button'))
    })
    await waitFor(() => {
      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-in-parallax',
      ])
    })

    act(() => {
      simulateAnimationEnd()
    })
    await waitFor(() => {
      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-in-parallax',
        'is-open',
      ])
    })

    act(() => {
      fireEvent.click(document.querySelector('button'))
    })
    await waitFor(() => {
      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-open',
      ])
    })

    act(() => {
      simulateAnimationEnd()
    })
    await waitFor(() => {
      expect(getStates()).toEqual(['wrapper-element'])
    })
  })

  it('should only set isInDOM when animation is disabled', async () => {
    render(<Component animate={false} />)

    act(() => {
      fireEvent.click(document.querySelector('button'))
    })
    await waitFor(() => {
      expect(getStates()).toEqual(['wrapper-element', 'is-in-dom'])
    })

    act(() => {
      fireEvent.click(document.querySelector('button'))
    })
    await waitFor(() => {
      expect(getStates()).toEqual(['wrapper-element'])
    })
  })

  it('should not animate when global.IS_TEST is true', async () => {
    global.IS_TEST = true

    const { rerender } = render(<Component />)

    rerender(<Component open />)

    await wait(1)

    expect(getStates()).toEqual(['wrapper-element', 'is-in-dom'])
  })

  it('should be open by default', () => {
    const current: HTMLDivElement = document.createElement('div')
    const ref: React.RefObject<HTMLDivElement> = { current }

    const { result } = renderHook(() => useHeightAnimation(ref))

    expect(result.current).toEqual({
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
      isAnimating: false,
      isInDOM: false,
      isOpen: false,
      isVisible: false,
      isVisibleParallax: false,
      open: false,
    })
  })
})

function simulateAnimationEnd(
  element: Element = document.querySelector('.animation-element')
) {
  const event = new CustomEvent('transitionend')
  element.dispatchEvent(event)
}
