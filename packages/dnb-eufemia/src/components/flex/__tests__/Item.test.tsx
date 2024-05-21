import React from 'react'
import { act, render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import { P } from '../../../elements'
import MainHeading from '../../../extensions/forms/Form/MainHeading'
import Flex from '../Flex'

describe('Flex.Item', () => {
  it('should forward HTML attributes', () => {
    render(<Flex.Item aria-label="Aria Label">Flex</Flex.Item>)

    const element = document.querySelector('.dnb-flex-item')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Flex.Item top="large">Flex</Flex.Item>)
    const element = document.querySelector('.dnb-flex-item')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Flex.Item top="x-large">Flex</Flex.Item>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Flex.Item className="custom-class">Flex</Flex.Item>)

    const element = document.querySelector('.dnb-flex-item')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-item',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <Flex.Item>
        <P>Flex</P>
      </Flex.Item>
    )

    const element = document.querySelector('.dnb-flex-item')
    const children = element.children

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Flex')
  })

  it('should grow and shrink', () => {
    const { rerender } = render(<Flex.Item grow>Flex</Flex.Item>)

    const element = document.querySelector('.dnb-flex-item')

    expect(element.className).toContain('dnb-flex-item--grow')
    expect(element.className).not.toContain('dnb-flex-item--shrink')

    rerender(<Flex.Item shrink>Flex</Flex.Item>)

    expect(element.className).toContain('dnb-flex-item--shrink')
    expect(element.className).not.toContain('dnb-flex-item--grow')
  })

  it('should use div as default element', () => {
    render(<Flex.Item>Flex</Flex.Item>)

    const element = document.querySelector('.dnb-flex-item')

    expect(element.tagName).toBe('DIV')
  })

  it('should set element', () => {
    render(<Flex.Item element="div">Flex</Flex.Item>)

    const element = document.querySelector('.dnb-flex-item')

    expect(element.tagName).toBe('DIV')
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return (
        <Flex.Container>
          <Flex.Item innerRef={ref} element="section">
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLElement).toBe(true)
    expect(ref.current.tagName).toBe('SECTION')
  })

  describe('size', () => {
    beforeEach(() => {
      jest.spyOn(window, 'matchMedia').mockImplementation(matchMedia)
    })

    const matchMediaOriginal = window.matchMedia
    afterEach(() => {
      window.matchMedia = matchMediaOriginal
    })

    const SMALL = '39em' // 40em
    const MEDIUM = '59em' // 60em
    const LARGE = '79em' // 80em

    it('should contain responsive class', () => {
      render(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-item')

      expect(element.classList).toContain('dnb-flex-item--responsive')
    })

    it('should unset size when null is given', () => {
      render(
        <Flex.Container>
          <Flex.Item size="auto">FlexItem</Flex.Item>
          <Flex.Item size={{ small: 4, large: 'auto' }}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: auto;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--small: 4; --large: auto;'
      )

      const element = document.querySelector('.dnb-flex-item')

      expect(element.classList).toContain('dnb-flex-item--responsive')
    })

    it('should set style attribute based on sizes', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item size={4}>FlexItem</Flex.Item>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 4;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 6;'
      )

      rerender(
        <Flex.Container>
          <Flex.Item size={2}>FlexItem</Flex.Item>
          <Flex.Item size={10}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 2;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 10;'
      )

      rerender(
        <Flex.Container>
          <Flex.Item style={{ background: 'blue' }} size={7}>
            FlexItem
          </Flex.Item>
          <Flex.Item style={{ background: 'red' }} size={5}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 7;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 5;'
      )
      expect(
        getFlexItem(0)
          .querySelector('.dnb-flex-item__spacer')
          .getAttribute('style')
      ).toBe('background: blue;')
      expect(
        getFlexItem(1)
          .querySelector('.dnb-flex-item__spacer')
          .getAttribute('style')
      ).toBe('background: red;')
    })

    it('should set correct spacing', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item size={2}>FlexItem</Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item size={12}>FlexItem</Flex.Item>
          <Flex.Item size={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--zero', 'dnb-space__right--zero'],
      ])
    })

    it('should omit size when heading is a child and direction is horizontal', () => {
      const { rerender } = render(
        <Flex.Container>
          <MainHeading level={1}>Heading</MainHeading>
          <Flex.Item size={2}>FlexItem</Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.className).not.toContain(
        'dnb-flex-container--has-size'
      )
      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--zero'],
      ])

      rerender(
        <Flex.Container>
          <MainHeading level={1}>Heading</MainHeading>
          <Flex.Item left size={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="large" right="medium" size={2}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(element.className).not.toContain(
        'dnb-flex-container--has-size'
      )
      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--small', 'dnb-space__right--small'],
        ['dnb-space__left--large', 'dnb-space__right--medium'],
      ])
    })

    it('should omit size prop logic when FlexContainer "direction" is vertical', () => {
      const { rerender } = render(
        <Flex.Container direction="vertical">
          <Flex.Item size={2}>FlexItem</Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__bottom--zero', 'dnb-space__top--zero'],
        ['dnb-space__bottom--zero', 'dnb-space__top--small'],
      ])

      rerender(
        <Flex.Container direction="vertical">
          <Flex.Item size={12}>FlexItem</Flex.Item>
          <Flex.Item size={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__bottom--zero', 'dnb-space__top--zero'],
        ['dnb-space__bottom--zero', 'dnb-space__top--small'],
      ])
    })

    it('should allow custom spacing on item', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item right="large" size={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item
            left="x-large"
            right="large"
            space={{ top: '1.5rem' }}
            size={2}
          >
            FlexItem
          </Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        [
          'dnb-space__left--x-large',
          'dnb-space__right--large',
          'dnb-space__top--medium',
        ],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item right="large" size={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="medium" right="large" size={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item right="x-large" size={12}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--medium', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--x-large'],
      ])
    })

    it('should omit size prop logic when FlexContainer "divider" is line', () => {
      const { rerender } = render(
        <Flex.Container divider="line">
          <Flex.Item right="large" size={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="x-large" right="large" size={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--x-large', 'dnb-space__right--large'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])

      rerender(
        <Flex.Container divider="space">
          <Flex.Item right="large" size={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="medium" right="large" size={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item right="x-large" size={12}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--medium', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--x-large'],
      ])
    })

    it('should use given "spacing" size from FlexContainer', () => {
      const { rerender } = render(
        <Flex.Container gap="large">
          <Flex.Item size={2}>FlexItem</Flex.Item>
          <Flex.Item size={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--small', 'dnb-space__right--zero'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item size={12}>FlexItem</Flex.Item>
          <Flex.Item size={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--zero', 'dnb-space__right--zero'],
      ])
    })

    it('should set correct spacing based on media queries', () => {
      setMedia({ width: SMALL })

      render(
        <Flex.Container>
          <Flex.Item size={{ small: 4, large: 12 }}>FlexItem</Flex.Item>
          <Flex.Item size={{ small: 6, large: 4 }}>FlexItem</Flex.Item>
          <Flex.Item size={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])

      act(() => {
        setMedia({ width: LARGE })
      })

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])
    })

    it('should pick nearest media key', () => {
      setMedia({ width: SMALL })

      render(
        <Flex.Container>
          <Flex.Item size={{ small: 4, large: 12 }}>FlexItem</Flex.Item>
          <Flex.Item size={{ small: 6, large: 4 }}>FlexItem</Flex.Item>
          <Flex.Item size={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])

      act(() => {
        setMedia({ width: MEDIUM })
      })

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--zero', 'dnb-space__right--x-small'],
        ['dnb-space__left--x-small', 'dnb-space__right--zero'],
      ])
    })
  })
})

function getSpacingClasses() {
  const collection = []
  const elements = document.querySelectorAll('.dnb-flex-item')

  elements.forEach((node) => {
    const element = node.querySelector('.dnb-flex-item__spacer')

    const item = []

    Object.values(element.classList)
      .reverse()
      .forEach((className) => {
        if (className.includes('dnb-space__')) {
          item.push(className)
        }
      })

    collection.push(item)
  })

  return collection
}

const getFlexItem = (item: number) =>
  document.querySelectorAll('.dnb-flex-item')[item] as HTMLElement
