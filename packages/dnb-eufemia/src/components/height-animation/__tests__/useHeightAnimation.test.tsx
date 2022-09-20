/**
 * useHeightAnimation Tests
 *
 */

import React from 'react'
import classnames from 'classnames'
import { render, act, fireEvent } from '@testing-library/react'
import ToggleButton from '../../ToggleButton'
import { wait } from '@testing-library/user-event/dist/utils'
import { useHeightAnimation } from '../useHeightAnimation'

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
  const AnimatedContent = ({ open = false, animate = true }) => {
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
        <ToggleButton checked={openState} onChange={onChangeHandler}>
          Toggle me
        </ToggleButton>

        <AnimatedContent open={open || openState} animate={animate} />
      </>
    )
  }

  it('should be closed by default', () => {
    render(<Component />)
    expect(document.querySelector('.is-in-dom')).toBeFalsy()
  })

  it('should have element in DOM when open property is true', () => {
    const { rerender } = render(<Component />)

    expect(document.querySelector('.is-in-dom')).toBeFalsy()

    rerender(<Component open />)

    expect(document.querySelector('.is-in-dom')).toBeTruthy()
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

    await act(async () => {
      expect(getStates()).toEqual(['wrapper-element'])

      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-in-parallax',
      ])

      simulateAnimationEnd()

      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-in-parallax',
        'is-open',
      ])

      fireEvent.click(document.querySelector('button'))

      expect(getStates()).toEqual([
        'wrapper-element',
        'is-in-dom',
        'is-visible',
        'is-open',
      ])

      simulateAnimationEnd()

      expect(getStates()).toEqual(['wrapper-element'])
    })
  })

  it('should only set isInDOM when animation is disabled', async () => {
    render(<Component animate={false} />)

    await act(async () => {
      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(getStates()).toEqual(['wrapper-element', 'is-in-dom'])

      fireEvent.click(document.querySelector('button'))

      await wait(1)

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
})

function simulateAnimationEnd(
  element: Element = document.querySelector('.animation-element')
) {
  const event = new CustomEvent('transitionend')
  element.dispatchEvent(event)
}
