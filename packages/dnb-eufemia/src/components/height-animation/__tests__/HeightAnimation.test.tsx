/**
 * HeightAnimation.test Tests
 *
 */

import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import ToggleButton from '../../ToggleButton'
import { wait } from '@testing-library/user-event/dist/utils'
import HeightAnimation, { HeightAnimationProps } from '../HeightAnimation'

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

const getStates = () => {
  const classes = document.querySelector(
    '.dnb-height-animation'
  )?.classList
  return classes ? Array.from(classes) : []
}

describe('HeightAnimation', () => {
  const Component = ({
    open = false,
    animate = true,
    element = 'div',
    children,
    ...props
  }: Partial<HeightAnimationProps>) => {
    const [openState, setOpenState] = React.useState(open)

    const onChangeHandler = ({ checked }) => {
      setOpenState(checked)
    }

    React.useEffect(() => {
      setOpenState(open)
    }, [open])

    return (
      <>
        <ToggleButton checked={openState} onChange={onChangeHandler}>
          Toggle me
        </ToggleButton>

        <section>
          <HeightAnimation
            open={openState}
            element={element} // Optional
            animate={animate} // Optional
            {...props}
          >
            <p className="content-element">Your content {children}</p>
          </HeightAnimation>
        </section>
      </>
    )
  }

  it('should be closed by default', () => {
    render(<Component />)
    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeFalsy()
  })

  it('should use given span element', () => {
    render(<Component open animate={false} element="span" />)
    expect(
      document.querySelector('span.dnb-height-animation--is-visible')
    ).toBeFalsy()
  })

  it('should have element in DOM when open property is true', () => {
    const { rerender } = render(<Component />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    rerender(<Component open />)

    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeTruthy()
  })

  it('should set duration', () => {
    render(<Component open duration={1000} />)

    expect(
      document.querySelector('.dnb-height-animation').getAttribute('style')
    ).toBe('--duration: 1000ms; height: auto;')
  })

  it('should have element in DOM when open property is true (using ToggleButton)', async () => {
    render(<Component />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    await act(async () => {
      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(
        document.querySelector('.dnb-height-animation--is-visible')
      ).toBeTruthy()
    })
  })

  it('should adjust height when content changes', async () => {
    const { rerender } = render(<Component />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    rerender(<Component open />)

    await act(async () => {
      const element = document.querySelector('.dnb-height-animation')

      simulateAnimationEnd()

      expect(
        document
          .querySelector('.dnb-height-animation')
          .getAttribute('style')
      ).toBe('height: auto;')

      rerender(<Component open>123</Component>)

      await wait(1)

      expect(
        document
          .querySelector('.dnb-height-animation')
          .getAttribute('style')
      ).toBe('height: 0px;')

      jest
        .spyOn(element, 'clientHeight', 'get')
        .mockImplementationOnce(() => 100)

      rerender(<Component open>456</Component>)

      await wait(1)

      expect(
        document
          .querySelector('.dnb-height-animation')
          .getAttribute('style')
      ).toBe('height: 100px;')
    })
  })

  it('should have content in DOM when keepInDOM is true', async () => {
    const { rerender } = render(<Component keepInDOM />)

    expect(document.querySelector('.dnb-height-animation')).toBeTruthy()
    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeFalsy()

    rerender(<Component keepInDOM open />)

    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeTruthy()

    rerender(<Component keepInDOM open={false} />)

    await act(async () => {
      const element = document.querySelector('.dnb-height-animation')

      expect(element.getAttribute('style')).toBe('')

      simulateAnimationEnd()

      expect(element.getAttribute('style')).toBe('visibility: hidden;')
    })
  })

  it('should set height style to auto', async () => {
    const { rerender } = render(<Component />)

    rerender(<Component open />)

    await act(async () => {
      const element = document.querySelector('.dnb-height-animation')

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
      expect(getStates()).toEqual([])

      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--is-visible',
        'dnb-height-animation--parallax',
        'dnb-height-animation--animating',
      ])

      fireEvent.click(document.querySelector('button'))

      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--is-visible',
        'dnb-height-animation--animating',
      ])

      simulateAnimationEnd()

      expect(getStates()).toEqual([])
    })
  })

  it('should only set "--is-in-dom" when animation is disabled', async () => {
    render(<Component animate={false} />)

    await act(async () => {
      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
      ])

      fireEvent.click(document.querySelector('button'))

      await wait(1)

      expect(getStates()).toEqual([])
    })
  })

  it('should not animate when global.IS_TEST is true', async () => {
    global.IS_TEST = true

    const { rerender } = render(<Component />)

    rerender(<Component open />)

    await wait(1)

    expect(getStates()).toEqual([
      'dnb-space',
      'dnb-height-animation',
      'dnb-height-animation--is-in-dom',
    ])
  })
})

function simulateAnimationEnd(
  element: Element = document.querySelector('.dnb-height-animation')
) {
  const event = new CustomEvent('transitionend')
  element.dispatchEvent(event)
}
