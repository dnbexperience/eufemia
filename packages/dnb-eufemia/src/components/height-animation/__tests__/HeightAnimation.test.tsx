import React from 'react'
import { render } from '@testing-library/react'
import HeightAnimation from '../HeightAnimation'
import HeightAnimationInstance from '../HeightAnimationInstance'
import {
  getElement,
  initializeTestSetup,
  mockHeight,
  nextAnimationFrame,
  runAnimation,
  simulateAnimationEnd,
} from './HeightAnimationUtils'

describe('HeightAnimation', () => {
  initializeTestSetup()

  it('should be open by default', () => {
    render(<HeightAnimation>visible content</HeightAnimation>)

    expect(getElement()).toHaveTextContent('visible content')
    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).not.toHaveAttribute('style')
  })

  it('should have element in DOM when open property get true', () => {
    const { rerender } = render(<HeightAnimation open={false} />)

    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toBeInTheDocument()

    rerender(<HeightAnimation open />)

    expect(
      document.querySelector('.dnb-height-animation--is-visible')
    ).toBeInTheDocument()
  })

  it('should set duration', () => {
    render(<HeightAnimation duration={1000} />)

    expect(
      document.querySelector('.dnb-height-animation')
    ).toHaveAttribute('style', '--duration: 1000ms;')
  })

  it('should set delay', () => {
    render(<HeightAnimation delay={1000} />)

    expect(
      document.querySelector('.dnb-height-animation')
    ).toHaveAttribute('style', '--delay: 1000ms;')
  })

  it('should adjust height when content changes', () => {
    globalThis.readjustTime = 1

    const { rerender } = render(
      <HeightAnimation open={false}>123</HeightAnimation>
    )

    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toBeInTheDocument()

    rerender(<HeightAnimation open>123</HeightAnimation>)

    runAnimation()

    expect(getElement()).toBeInTheDocument()
    expect(getElement()).toHaveAttribute('style', 'height: auto;')

    mockHeight(100)
    mockHeight(200)

    rerender(<HeightAnimation open>456</HeightAnimation>)

    nextAnimationFrame()
    expect(getElement()).toHaveAttribute('style', 'height: 100px;')

    nextAnimationFrame()
    expect(getElement()).toHaveAttribute('style', 'height: 200px;')

    simulateAnimationEnd()
    expect(getElement()).toHaveAttribute('style', 'height: auto;')
  })

  it('should call onOpen', () => {
    const onOpen = jest.fn()
    const { rerender } = render(
      <HeightAnimation open={false} onOpen={onOpen} />
    )

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenLastCalledWith(false)

    rerender(<HeightAnimation open onOpen={onOpen} />)

    simulateAnimationEnd()

    expect(onOpen).toHaveBeenCalledTimes(2)
    expect(onOpen).toHaveBeenLastCalledWith(true)

    rerender(<HeightAnimation open={false} onOpen={onOpen} />)

    simulateAnimationEnd()

    expect(onOpen).toHaveBeenCalledTimes(3)
    expect(onOpen).toHaveBeenLastCalledWith(false)
  })

  it('should call onAnimationEnd', () => {
    const onAnimationEnd = jest.fn()
    const { rerender } = render(
      <HeightAnimation open={false} onAnimationEnd={onAnimationEnd} />
    )

    expect(onAnimationEnd).toHaveBeenCalledTimes(0)

    rerender(
      <HeightAnimation open={true} onAnimationEnd={onAnimationEnd} />
    )

    simulateAnimationEnd()

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
    expect(onAnimationEnd).toHaveBeenLastCalledWith('opened')

    rerender(
      <HeightAnimation open={false} onAnimationEnd={onAnimationEnd} />
    )

    simulateAnimationEnd()

    expect(onAnimationEnd).toHaveBeenCalledTimes(2)
    expect(onAnimationEnd).toHaveBeenLastCalledWith('closed')
  })

  it('should call onInit', () => {
    const onInit = jest.fn()
    const { rerender } = render(
      <HeightAnimation onInit={onInit} open={false} />
    )

    expect(onInit).toHaveBeenCalledTimes(1)
    expect(onInit).toHaveBeenCalledWith(
      expect.any(HeightAnimationInstance)
    )

    rerender(<HeightAnimation onInit={onInit} open={true} />)

    expect(onInit).toHaveBeenCalledTimes(1)
  })

  it('should set height style to auto', () => {
    const { rerender } = render(<HeightAnimation open={false} />)

    rerender(<HeightAnimation open />)

    expect(getElement()).toHaveAttribute('style', '')

    runAnimation()

    expect(getElement()).toHaveAttribute('style', 'height: auto;')
  })

  describe('compensateForGap', () => {
    it('should add wrapper element with compensateForGap class', () => {
      render(
        <HeightAnimation compensateForGap="auto">
          <span className="content">content</span>
        </HeightAnimation>
      )

      const inner = document.querySelector(
        '.dnb-height-animation > .compensateForGap'
      )
      expect(inner).toBeInTheDocument()
    })

    it('should set marginTop when compensateForGap is given', () => {
      render(
        <div style={{ rowGap: '2rem' }}>
          <HeightAnimation compensateForGap="auto">
            <span className="content">content</span>
          </HeightAnimation>
        </div>
      )

      const main = document.querySelector('.dnb-height-animation')
      expect(main).toHaveStyle('margin-top: calc(2rem * -1);')

      const inner = main.querySelector('.compensateForGap')
      expect(inner).toHaveStyle('margin-top: 2rem;')
    })
  })

  describe('keepInDOM', () => {
    it('should have content in DOM when keepInDOM is true', () => {
      const { rerender } = render(
        <HeightAnimation keepInDOM>
          <span className="content">content</span>
        </HeightAnimation>
      )

      expect(document.querySelector('.content')).toBeInTheDocument()
      expect(getElement()).toHaveClass('dnb-height-animation--is-visible')

      rerender(
        <HeightAnimation keepInDOM open={false}>
          <span className="content">content</span>
        </HeightAnimation>
      )

      expect(document.querySelector('.content')).toBeInTheDocument()

      rerender(
        <HeightAnimation keepInDOM open>
          <span className="content">content</span>
        </HeightAnimation>
      )

      expect(document.querySelector('.content')).toBeInTheDocument()
      expect(getElement()).toHaveClass('dnb-height-animation--animating')

      simulateAnimationEnd()

      expect(getElement()).not.toHaveClass(
        'dnb-height-animation--animating'
      )
      expect(getElement()).toHaveClass('dnb-height-animation--is-in-dom')
      expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    })

    it('should set aria-hidden when closed and keepInDOM is true', () => {
      const { rerender } = render(
        <HeightAnimation open={false} keepInDOM />
      )

      expect(getElement()).toHaveAttribute('aria-hidden', 'true')

      rerender(<HeightAnimation keepInDOM open />)

      simulateAnimationEnd()

      expect(getElement()).toHaveAttribute('aria-hidden', 'false')

      rerender(<HeightAnimation keepInDOM open={false} />)

      simulateAnimationEnd()

      expect(getElement()).toHaveAttribute('aria-hidden', 'true')

      rerender(<HeightAnimation keepInDOM={false} open />)

      simulateAnimationEnd()

      expect(getElement()).not.toHaveAttribute('aria-hidden')
    })

    it('should set className "hidden" when closed and keepInDOM is true', () => {
      const { rerender } = render(
        <HeightAnimation open={false} keepInDOM />
      )

      expect(getElement()).toHaveClass('dnb-height-animation--hidden')

      rerender(<HeightAnimation open={true} keepInDOM />)

      simulateAnimationEnd()

      expect(getElement()).toHaveClass('dnb-height-animation--is-in-dom')
      expect(getElement()).toHaveClass('dnb-height-animation--is-visible')

      rerender(<HeightAnimation open={false} keepInDOM />)

      simulateAnimationEnd()

      expect(getElement()).toHaveClass('dnb-height-animation--hidden')
    })
  })

  it('should set custom style', () => {
    render(<HeightAnimation style={{ color: 'red' }} />)

    expect(getElement()).toHaveAttribute('style', 'color: red;')
  })

  it('should act with different states through the animation transition', () => {
    const { rerender } = render(<HeightAnimation keepInDOM />)

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')

    runAnimation() // even there should be not animation

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')

    mockHeight(100)
    rerender(<HeightAnimation open={false} keepInDOM />)

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).toHaveClass('dnb-height-animation--animating')
    expect(getElement()).not.toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')

    runAnimation()

    expect(getElement()).not.toHaveClass(
      'dnb-height-animation--is-visible'
    )
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).not.toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).toHaveClass('dnb-height-animation--hidden')

    mockHeight(150)
    rerender(<HeightAnimation open={true} keepInDOM />)

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).toHaveClass('dnb-height-animation--animating')
    expect(getElement()).toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')

    runAnimation()

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('should have correct classes when animation is disabled', () => {
    const { rerender } = render(
      <HeightAnimation animate={false} keepInDOM />
    )

    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).not.toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).not.toHaveClass('dnb-height-animation--hidden')

    rerender(<HeightAnimation open={false} animate={false} keepInDOM />)

    expect(getElement()).not.toHaveClass(
      'dnb-height-animation--is-visible'
    )
    expect(getElement()).not.toHaveClass('dnb-height-animation--animating')
    expect(getElement()).not.toHaveClass('dnb-height-animation--parallax')
    expect(getElement()).toHaveClass('dnb-height-animation--hidden')
  })

  it('should have constant of _supportsSpacingProps="children"', () => {
    expect(HeightAnimation._supportsSpacingProps).toBe('children')
  })

  it('should use given "element"', () => {
    render(<HeightAnimation element="span" />)

    expect(getElement().tagName).toBe('SPAN')
  })

  it('should not animate when globalThis.IS_TEST is true', () => {
    globalThis.IS_TEST = true

    const { rerender } = render(<HeightAnimation />)

    const element = document.querySelector('.dnb-height-animation')

    rerender(<HeightAnimation open={false} />)

    expect(element).not.toHaveClass('dnb-height-animation--animating')

    globalThis.IS_TEST = false
  })
})

describe('stopOuterAnimations', () => {
  it('should stop outer height animation by adding the --stop className', async () => {
    globalThis.readjustTime = 1

    const { rerender } = render(
      <HeightAnimation className="outer">
        <HeightAnimation className="inner">123</HeightAnimation>
      </HeightAnimation>
    )

    expect(
      document.querySelectorAll('.dnb-height-animation')
    ).toHaveLength(2)

    const innerElement = document.querySelector(
      '.dnb-height-animation .dnb-height-animation'
    )

    mockHeight(100, innerElement)
    mockHeight(200, innerElement)

    rerender(
      <HeightAnimation className="outer">
        <HeightAnimation className="inner">456</HeightAnimation>
      </HeightAnimation>
    )

    expect(
      document.querySelector('.dnb-height-animation--stop')
    ).toHaveClass('outer')

    runAnimation()

    expect(
      document.querySelector('.dnb-height-animation--stop')
    ).not.toBeInTheDocument()
  })

  it('should not animate when outer height animation has --stop className', async () => {
    globalThis.readjustTime = 1

    const { rerender } = render(
      <HeightAnimation open={false}>123</HeightAnimation>
    )

    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toBeInTheDocument()

    rerender(<HeightAnimation open>123</HeightAnimation>)

    runAnimation()

    expect(getElement()).toBeInTheDocument()
    expect(getElement()).toHaveAttribute('style', '')

    mockHeight(100)
    mockHeight(200)

    rerender(<HeightAnimation open>456</HeightAnimation>)

    rerender(
      <HeightAnimation open className="dnb-height-animation--stop">
        789
      </HeightAnimation>
    )

    nextAnimationFrame()
    expect(getElement()).toHaveAttribute('style', '')

    nextAnimationFrame()
    expect(getElement()).toHaveAttribute('style', '')

    simulateAnimationEnd()
    expect(getElement()).toHaveAttribute('style', '')
  })
})

describe('HeightAnimation without initializeTestSetup()', () => {
  beforeEach(() => {
    globalThis.IS_TEST = false
  })
  afterEach(() => {
    globalThis.IS_TEST = undefined
    window.requestAnimationFrame = undefined
  })

  it('should open without animation', () => {
    window.requestAnimationFrame = jest.fn((callback) =>
      setTimeout(callback, 0)
    )

    const { rerender } = render(
      <HeightAnimation open={false}>visible content</HeightAnimation>
    )

    expect(getElement()).toBeNull()

    rerender(
      <HeightAnimation open={true}>visible content</HeightAnimation>
    )

    expect(getElement()).toHaveTextContent('visible content')
    expect(getElement()).toHaveClass('dnb-height-animation--is-visible')
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
  })
})
