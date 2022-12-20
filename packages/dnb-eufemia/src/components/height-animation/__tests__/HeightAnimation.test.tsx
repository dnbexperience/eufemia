/**
 * HeightAnimation.test Tests
 *
 */

import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import ToggleButton from '../../ToggleButton'
import { wait } from '@testing-library/user-event/dist/utils'
import HeightAnimation, {
  HeightAnimationAllProps,
  HeightAnimationProps,
} from '../HeightAnimation'
import HeightAnimationInstance from '../HeightAnimationInstance'
import {
  testSetupInit,
  simulateAnimationEnd,
} from './HeightAnimationUtils'

testSetupInit()

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
    ...rest
  }: Partial<HeightAnimationProps>) => {
    const [openState, setOpenState] = React.useState(open)

    const onChangeHandler = ({ checked }) => {
      setOpenState(checked)
    }

    React.useEffect(() => {
      setOpenState(open)
    }, [open])

    const props = rest as HeightAnimationAllProps

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

  it('should be open by default', () => {
    render(<HeightAnimation>visible content</HeightAnimation>)

    expect(
      document.querySelector('.dnb-height-animation').textContent
    ).toBe('visible content')
    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeTruthy()
    expect(
      document.querySelector('.dnb-height-animation').getAttribute('style')
    ).toBe('height: auto;')
  })

  it('should have element in DOM when open property is true (using ToggleButton)', () => {
    render(<Component />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    fireEvent.click(document.querySelector('button'))

    act(() => {
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

  it('should call onOpen', () => {
    const onOpen = jest.fn()
    const { rerender } = render(<Component onOpen={onOpen} />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    rerender(<Component open />)

    act(() => {
      simulateAnimationEnd()
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledWith(true)
    })

    rerender(<Component open={false} />)

    act(() => {
      simulateAnimationEnd()
      expect(onOpen).toHaveBeenCalledTimes(2)
      expect(onOpen).toHaveBeenCalledWith(false)
    })
  })

  it('should call onAnimationEnd', () => {
    const onAnimationEnd = jest.fn()
    const { rerender } = render(
      <Component onAnimationEnd={onAnimationEnd} />
    )

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    rerender(<Component open />)

    act(() => {
      simulateAnimationEnd()
      expect(onAnimationEnd).toHaveBeenCalledTimes(1)
      expect(onAnimationEnd).toHaveBeenCalledWith('opened')
    })

    rerender(<Component open={false} />)

    act(() => {
      simulateAnimationEnd()
      expect(onAnimationEnd).toHaveBeenCalledWith('closed')
    })
  })

  it('should call onInit', () => {
    const onInit = jest.fn()
    const { rerender } = render(<Component onInit={onInit} />)

    expect(document.querySelector('.dnb-height-animation')).toBeFalsy()

    rerender(<Component open />)

    act(() => {
      simulateAnimationEnd()
      expect(onInit).toHaveBeenCalledTimes(1)
      expect(onInit).toHaveBeenCalledWith(
        expect.any(HeightAnimationInstance)
      )
    })

    rerender(<Component open={false} />)

    act(() => {
      simulateAnimationEnd()
      expect(onInit).toHaveBeenCalledTimes(1)
    })
  })

  it('should have content in DOM when keepInDOM is true', () => {
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

    act(() => {
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

  it('should set aria-hidden when closed and keepInDOM is true', () => {
    const { rerender } = render(<Component keepInDOM />)

    const getElem = () => document.querySelector('.dnb-height-animation')

    expect(getElem().getAttribute('aria-hidden')).toBe('true')

    rerender(<Component keepInDOM open />)

    act(() => {
      simulateAnimationEnd()

      expect(getElem().getAttribute('aria-hidden')).toBe('false')
    })

    rerender(<Component keepInDOM open={false} />)

    act(() => {
      simulateAnimationEnd()

      expect(getElem().getAttribute('aria-hidden')).toBe('true')
      expect(getElem().getAttribute('style')).toBe(
        'height: auto; visibility: hidden;'
      )
    })

    rerender(<Component keepInDOM={false} open />)

    act(() => {
      simulateAnimationEnd()

      expect(getElem().getAttribute('aria-hidden')).toBe(null)
    })
  })

  it('should set className "hidden" when closed and keepInDOM is true', () => {
    render(<Component keepInDOM />)

    const getClasses = () =>
      Array.from(
        document.querySelector('.dnb-height-animation')?.classList || []
      )

    expect(getClasses()).toEqual([
      'dnb-space',
      'dnb-height-animation',
      'dnb-height-animation--hidden',
    ])

    fireEvent.click(document.querySelector('button'))

    act(simulateAnimationEnd)

    act(() => {
      expect(getClasses()).toEqual(
        expect.arrayContaining([
          'dnb-height-animation--is-in-dom',
          'dnb-height-animation--is-visible',
        ])
      )
    })

    fireEvent.click(document.querySelector('button'))

    act(simulateAnimationEnd)

    act(() => {
      expect(getClasses()).toEqual(
        expect.arrayContaining(['dnb-height-animation--hidden'])
      )
    })
  })

  it('should act with different states through the animation transition', () => {
    render(<Component />)

    act(() => {
      expect(getStates()).toEqual([])
    })

    fireEvent.click(document.querySelector('button'))

    act(() => {
      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-visible',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--parallax',
        'dnb-height-animation--animating',
      ])
    })

    fireEvent.click(document.querySelector('button'))

    act(() => {
      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-visible',
        'dnb-height-animation--is-in-dom',
        'dnb-height-animation--animating',
      ])
    })

    act(simulateAnimationEnd)

    act(() => {
      expect(getStates()).toEqual([])
    })
  })

  it('should only set "--is-in-dom" when animation is disabled', () => {
    render(<Component animate={false} />)

    fireEvent.click(document.querySelector('button'))

    act(() => {
      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
      ])
    })

    fireEvent.click(document.querySelector('button'))

    act(() => {
      expect(getStates()).toEqual([])
    })
  })

  it('should not animate when global.IS_TEST is true', () => {
    global.IS_TEST = true

    const { rerender } = render(<Component />)

    rerender(<Component open />)

    act(() => {
      expect(getStates()).toEqual([
        'dnb-space',
        'dnb-height-animation',
        'dnb-height-animation--is-in-dom',
      ])
    })
  })
})
