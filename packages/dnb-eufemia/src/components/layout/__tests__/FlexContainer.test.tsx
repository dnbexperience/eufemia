import React from 'react'
import { act, render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import FlexContainer from '../FlexContainer'
import FlexItem from '../FlexItem'

describe('Layout.FlexContainer', () => {
  it('should forward HTML attributes', () => {
    render(
      <FlexContainer aria-label="Aria Label">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <FlexContainer top="large">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )
    const element = document.querySelector('.dnb-layout-flex-container ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <FlexContainer top="x-large">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should have wrap enabled by default', () => {
    render(
      <FlexContainer>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    expect(element.className).toContain('dnb-layout-flex-container--wrap')
  })

  it('should contain given classes', () => {
    render(
      <FlexContainer className="custom-class">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-flex-container',
      'custom-class',
      'dnb-layout-flex-container--direction-horizontal',
      'dnb-layout-flex-container--justify-flex-start',
      'dnb-layout-flex-container--align-flex-start',
      'dnb-layout-flex-container--spacing-small',
      'dnb-layout-flex-container--wrap',
      'dnb-layout-flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <FlexContainer>
        <FlexItem>Flex 1</FlexItem>
        <FlexItem>Flex 2</FlexItem>
        <FlexItem>Flex 3</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    const children = element.children
    const childredTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childredTextContents).toEqual(['Flex 1', 'Flex 2', 'Flex 3'])
  })

  it('should set flow direction of children', () => {
    const { rerender } = render(
      <FlexContainer direction="vertical">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')

    expect(element.className).toContain(
      'dnb-layout-flex-container--direction-vertical'
    )

    rerender(
      <FlexContainer direction="horizontal">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout-flex-container--direction-horizontal'
    )
  })

  it('should set alignment of content', () => {
    render(
      <FlexContainer align="center">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )
  })

  it('should justify alignment of content', () => {
    const { rerender } = render(
      <FlexContainer align="center">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')

    expect(element.className).toContain(
      'dnb-layout-flex-container--align-center'
    )

    rerender(
      <FlexContainer align="flex-end">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout-flex-container--align-flex-end'
    )
  })

  it('should add divider between children', () => {
    const { rerender } = render(
      <FlexContainer divider="space">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout-flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')

    expect(children[1].className).toContain('dnb-space__left--small')
    expect(children[1].className).toContain('dnb-space__right--zero')

    expect(children[2].className).toContain('dnb-space__left--small')
    expect(children[2].className).toContain('dnb-space__right--zero')

    rerender(
      <FlexContainer divider="line">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children.length).toBe(7)
    expect(element.className).toContain(
      'dnb-layout-flex-container--divider-line'
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')
    expect(children[0].className).toContain('dnb-layout-flex-item')

    expect(children[1].tagName).toContain('DIV')
    expect(children[1].className).toContain('dnb-space')
    expect(children[1].className).toContain('dnb-space__top--small')

    expect(children[2].tagName).toContain('HR')
    expect(children[2].className).toContain(
      'dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-space__top--zero dnb-hr'
    )

    expect(children[3].className).toContain('dnb-space__left--small')
    expect(children[3].className).toContain('dnb-space__right--zero')
    expect(children[3].className).toContain('dnb-layout-flex-item')

    expect(children[4].tagName).toContain('DIV')
    expect(children[4].className).toContain('dnb-space')
    expect(children[4].className).toContain('dnb-space__top--small')

    expect(children[5].tagName).toContain('HR')
    expect(children[5].className).toContain(
      'dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-space__top--zero dnb-hr'
    )

    expect(children[6].className).toContain('dnb-space__left--small')
    expect(children[6].className).toContain('dnb-space__right--zero')
    expect(children[6].className).toContain('dnb-layout-flex-item')
  })

  it('should set spacing between children', () => {
    const { rerender } = render(
      <FlexContainer>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout-flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')

    expect(children[1].className).toContain('dnb-space__left--small')
    expect(children[1].className).toContain('dnb-space__right--zero')

    expect(children[2].className).toContain('dnb-space__left--small')
    expect(children[2].className).toContain('dnb-space__right--zero')

    rerender(
      <FlexContainer spacing="large">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')

    expect(children[1].className).toContain('dnb-space__left--large')
    expect(children[1].className).toContain('dnb-space__right--zero')

    expect(children[2].className).toContain('dnb-space__left--large')
    expect(children[2].className).toContain('dnb-space__right--zero')

    rerender(
      <FlexContainer spacing="xx-small">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')

    expect(children[1].className).toContain('dnb-space__left--xx-small')
    expect(children[1].className).toContain('dnb-space__right--zero')

    expect(children[2].className).toContain('dnb-space__left--xx-small')
    expect(children[2].className).toContain('dnb-space__right--zero')
  })

  it('should not apply spacing if set to false', () => {
    render(
      <FlexContainer spacing={false}>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout-flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--zero')

    expect(children[1].className).not.toContain('dnb-space__left--small')
    expect(children[1].className).toContain('dnb-space__left--zero')
    expect(children[1].className).toContain('dnb-space__right--zero')

    expect(children[2].className).not.toContain('dnb-space__left--small')
    expect(children[2].className).toContain('dnb-space__left--zero')
    expect(children[2].className).toContain('dnb-space__right--zero')
  })

  it('should set element', () => {
    render(<FlexContainer element="section">content</FlexContainer>)

    const element = document.querySelector('.dnb-layout-flex-container')

    expect(element.tagName).toBe('SECTION')
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

    it('should set default "sizeCount" of 12', () => {
      const { rerender } = render(
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      const element = document.querySelector('.dnb-layout-flex-container')

      expect(element.getAttribute('style')).toBe('--sizeCount: 12;')

      rerender(
        <FlexContainer sizeCount={6}>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(element.getAttribute('style')).toBe('--sizeCount: 6;')

      rerender(
        <FlexContainer>
          <FlexItem>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(element.getAttribute('style')).toBe('')
    })

    it('should set --has-size class', () => {
      render(
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      const element = document.querySelector('.dnb-layout-flex-container')

      expect(element.className).toContain(
        'dnb-layout-flex-container--has-size'
      )
    })

    it('should set data-media-key', () => {
      setMedia({ width: SMALL })

      const { rerender } = render(
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      const element = document.querySelector('.dnb-layout-flex-container')

      act(() => {
        setMedia({ width: MEDIUM })
      })

      rerender(
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(element.getAttribute('data-media-key')).toBe('medium')

      act(() => {
        setMedia({ width: LARGE })
      })

      rerender(
        <FlexContainer>
          <FlexItem size={6}>FlexItem</FlexItem>
        </FlexContainer>
      )

      expect(element.getAttribute('data-media-key')).toBe('large')
    })
  })
})
