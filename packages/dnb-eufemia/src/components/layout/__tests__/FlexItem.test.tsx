import React from 'react'
import { act, render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import { P } from '../../../elements'
import FlexItem from '../FlexItem'
import FlexContainer from '../FlexContainer'
import MainHeading from '../MainHeading'

describe('Layout.FlexItem', () => {
  it('should forward HTML attributes', () => {
    render(<FlexItem aria-label="Aria Label">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout-flex-item')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<FlexItem top="large">Flex</FlexItem>)
    const element = document.querySelector('.dnb-layout-flex-item')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<FlexItem top="x-large">Flex</FlexItem>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<FlexItem className="custom-class">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout-flex-item')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-flex-item',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <FlexItem>
        <P>Flex</P>
      </FlexItem>
    )

    const element = document.querySelector('.dnb-layout-flex-item')
    const children = element.children

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Flex')
  })

  it('should grow and shrink', () => {
    const { rerender } = render(<FlexItem grow>Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout-flex-item')

    expect(element.className).toContain('dnb-layout-flex-item--grow')
    expect(element.className).not.toContain('dnb-layout-flex-item--shrink')

    rerender(<FlexItem shrink>Flex</FlexItem>)

    expect(element.className).toContain('dnb-layout-flex-item--shrink')
    expect(element.className).not.toContain('dnb-layout-flex-item--grow')
  })

  it('should use div as default element', () => {
    render(<FlexItem>Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout-flex-item')

    expect(element.tagName).toBe('DIV')
  })

  it('should set element', () => {
    render(<FlexItem element="div">Flex</FlexItem>)

    const element = document.querySelector('.dnb-layout-flex-item')

    expect(element.tagName).toBe('DIV')
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
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      const element = document.querySelector('.dnb-layout-flex-item')

      expect(element.classList).toContain(
        'dnb-layout-flex-item--responsive'
      )
    })

    it('should unset size when null is given', () => {
      render(
        <FlexContainer>
          <FlexItem size="auto">FlexItem</FlexItem>
          <FlexItem size={{ small: 4, large: 'auto' }}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: auto;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--small: 4; --large: auto;'
      )

      const element = document.querySelector('.dnb-layout-flex-item')

      expect(element.classList).toContain(
        'dnb-layout-flex-item--responsive'
      )
    })

    it('should set style attribute based on sizes', () => {
      const { rerender } = render(
        <FlexContainer>
          <FlexItem size={4}>FlexItem</FlexItem>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 4;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 6;'
      )

      rerender(
        <FlexContainer>
          <FlexItem size={2}>FlexItem</FlexItem>
          <FlexItem size={10}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 2;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 10;'
      )

      rerender(
        <FlexContainer>
          <FlexItem style={{ background: 'blue' }} size={7}>
            FlexItem
          </FlexItem>
          <FlexItem style={{ background: 'red' }} size={5}>
            FlexItem
          </FlexItem>
        </FlexContainer>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--size--default: 7; background: blue;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--size--default: 5; background: red;'
      )
    })

    it('should set correct spacing', () => {
      const { rerender } = render(
        <FlexContainer>
          <FlexItem size={2}>FlexItem</FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])

      rerender(
        <FlexContainer>
          <FlexItem size={12}>FlexItem</FlexItem>
          <FlexItem size={12}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])
    })

    it('should omit size when heading is a child and direction is horizontal', () => {
      const { rerender } = render(
        <FlexContainer>
          <MainHeading level={1}>Heading</MainHeading>
          <FlexItem size={2}>FlexItem</FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      const element = document.querySelector('.dnb-layout-flex-container')

      expect(element.className).not.toContain(
        'dnb-layout-flex-container--has-size'
      )
      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])

      rerender(
        <FlexContainer>
          <MainHeading level={1}>Heading</MainHeading>
          <FlexItem left size={2}>
            FlexItem
          </FlexItem>
          <FlexItem left="large" right="medium" size={2}>
            FlexItem
          </FlexItem>
        </FlexContainer>
      )

      expect(element.className).not.toContain(
        'dnb-layout-flex-container--has-size'
      )
      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--small', 'dnb-space__right--small'],
        ['dnb-space__left--large', 'dnb-space__right--medium'],
      ])
    })

    it('should omit size prop logic when FlexContainer "direction" is vertical', () => {
      const { rerender } = render(
        <FlexContainer direction="vertical">
          <FlexItem size={2}>FlexItem</FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__bottom--zero', 'dnb-space__top--zero'],
        ['dnb-space__bottom--zero', 'dnb-space__top--small'],
      ])

      rerender(
        <FlexContainer direction="vertical">
          <FlexItem size={12}>FlexItem</FlexItem>
          <FlexItem size={12}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__bottom--zero', 'dnb-space__top--zero'],
        ['dnb-space__bottom--zero', 'dnb-space__top--small'],
      ])
    })

    it('should allow custom spacing on item', () => {
      const { rerender } = render(
        <FlexContainer>
          <FlexItem right="large" size={2}>
            FlexItem
          </FlexItem>
          <FlexItem left="x-large" right="large" size={2}>
            FlexItem
          </FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--x-large', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--large'],
      ])

      rerender(
        <FlexContainer>
          <FlexItem right="large" size={6}>
            FlexItem
          </FlexItem>
          <FlexItem left="medium" right="large" size={6}>
            FlexItem
          </FlexItem>
          <FlexItem right="x-large" size={12}>
            FlexItem
          </FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--medium', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--x-large'],
      ])
    })

    it('should omit size prop logic when FlexContainer "divider" is line', () => {
      const { rerender } = render(
        <FlexContainer divider="line">
          <FlexItem right="large" size={2}>
            FlexItem
          </FlexItem>
          <FlexItem left="x-large" right="large" size={2}>
            FlexItem
          </FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--x-large', 'dnb-space__right--large'],
        ['dnb-space__left--small', 'dnb-space__right--zero'],
      ])

      rerender(
        <FlexContainer divider="space">
          <FlexItem right="large" size={6}>
            FlexItem
          </FlexItem>
          <FlexItem left="medium" right="large" size={6}>
            FlexItem
          </FlexItem>
          <FlexItem right="x-large" size={12}>
            FlexItem
          </FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--medium', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--x-large'],
      ])
    })

    it('should use given "spacing" size from FlexContainer', () => {
      const { rerender } = render(
        <FlexContainer spacing="large">
          <FlexItem size={2}>FlexItem</FlexItem>
          <FlexItem size={2}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--large'],
        ['dnb-space__left--zero', 'dnb-space__right--large'],
      ])

      rerender(
        <FlexContainer>
          <FlexItem size={12}>FlexItem</FlexItem>
          <FlexItem size={12}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])
    })

    it('should set correct spacing based on media queries', () => {
      setMedia({ width: SMALL })

      render(
        <FlexContainer>
          <FlexItem size={{ small: 4, large: 12 }}>FlexItem</FlexItem>
          <FlexItem size={{ small: 6, large: 4 }}>FlexItem</FlexItem>
          <FlexItem size={{ small: 12, large: 6 }}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])

      act(() => {
        setMedia({ width: LARGE })
      })

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])
    })

    it('should pcik nearest media key', () => {
      setMedia({ width: SMALL })

      render(
        <FlexContainer>
          <FlexItem size={{ small: 4, large: 12 }}>FlexItem</FlexItem>
          <FlexItem size={{ small: 6, large: 4 }}>FlexItem</FlexItem>
          <FlexItem size={{ small: 12, large: 6 }}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])

      act(() => {
        setMedia({ width: MEDIUM })
      })

      expect(getSpacingClasses()).toEqual([
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
        ['dnb-space__left--zero', 'dnb-space__right--small'],
      ])
    })
  })
})

function getSpacingClasses() {
  const collection = []
  const elements = document.querySelectorAll('.dnb-layout-flex-item')

  elements.forEach((node) => {
    const element = node.querySelector('.dnb-layout-flex-item__spacer')

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
  document.querySelectorAll('.dnb-layout-flex-item')[item] as HTMLElement
