import React from 'react'
import { act, render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import Flex from '../Flex'
import { createSpacingClasses } from '../../space/SpacingUtils'
import { SpaceProps } from '../../Space'

describe('Flex.Container', () => {
  it('should forward HTML attributes', () => {
    render(
      <Flex.Container aria-label="Aria Label">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Flex.Container top="large">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )
    const element = document.querySelector('.dnb-flex-container ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <Flex.Container top="x-large">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should have wrap enabled by default', () => {
    render(
      <Flex.Container>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(element.className).toContain('dnb-flex-container--wrap')
  })

  it('should contain given classes', () => {
    render(
      <Flex.Container className="custom-class">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'custom-class',
      'dnb-flex-container--direction-horizontal',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-flex-start',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should render children', () => {
    render(
      <Flex.Container>
        <Flex.Item>Flex 1</Flex.Item>
        <Flex.Item>Flex 2</Flex.Item>
        <Flex.Item>Flex 3</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children
    const childrenTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childrenTextContents).toEqual(['Flex 1', 'Flex 2', 'Flex 3'])
  })

  it('should set flow direction of children', () => {
    const { rerender } = render(
      <Flex.Container direction="vertical">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')

    expect(element.className).toContain(
      'dnb-flex-container--direction-vertical'
    )

    rerender(
      <Flex.Container>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(element.className).toContain(
      'dnb-flex-container--direction-horizontal'
    )
  })

  it('should set alignment of content', () => {
    render(
      <Flex.Container align="center">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )
  })

  it('should justify alignment of content', () => {
    const { rerender } = render(
      <Flex.Container align="center">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')

    expect(element.className).toContain('dnb-flex-container--align-center')

    rerender(
      <Flex.Container align="flex-end">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(element.className).toContain(
      'dnb-flex-container--align-flex-end'
    )
  })

  it('should add divider between children', () => {
    const { rerender } = render(
      <Flex.Container direction="vertical" divider="space">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')

    rerender(
      <Flex.Container direction="vertical" divider="line">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children.length).toBe(7)
    expect(element.className).toContain('dnb-flex-container--divider-line')

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')
    expect(children[0].className).toContain('dnb-flex-item')

    expect(children[1].tagName).toContain('DIV')
    expect(children[1].className).toContain('dnb-space')
    expect(children[1].className).toContain('dnb-space__top--small')

    expect(children[2].tagName).toContain('HR')
    expect(children[2].className).toContain(
      'dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-space__top--zero dnb-hr'
    )

    expect(children[3].className).toContain('dnb-space__top--small')
    expect(children[3].className).toContain('dnb-space__bottom--zero')
    expect(children[3].className).toContain('dnb-flex-item')

    expect(children[4].tagName).toContain('DIV')
    expect(children[4].className).toContain('dnb-space')
    expect(children[4].className).toContain('dnb-space__top--small')

    expect(children[5].tagName).toContain('HR')
    expect(children[5].className).toContain(
      'dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-space__top--zero dnb-hr'
    )

    expect(children[6].className).toContain('dnb-space__top--small')
    expect(children[6].className).toContain('dnb-space__bottom--zero')
    expect(children[6].className).toContain('dnb-flex-item')
  })

  it('should set spacing between children', () => {
    const { rerender } = render(
      <Flex.Container>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--small')

    expect(children[1].className).toContain('dnb-space__left--zero')
    expect(children[1].className).toContain('dnb-space__right--small')

    expect(children[2].className).toContain('dnb-space__left--zero')
    expect(children[2].className).toContain('dnb-space__right--small')

    rerender(
      <Flex.Container spacing="large">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--large')

    expect(children[1].className).toContain('dnb-space__left--zero')
    expect(children[1].className).toContain('dnb-space__right--large')

    expect(children[2].className).toContain('dnb-space__left--zero')
    expect(children[2].className).toContain('dnb-space__right--large')

    rerender(
      <Flex.Container spacing="xx-small">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children[0].className).toContain('dnb-space__left--zero')
    expect(children[0].className).toContain('dnb-space__right--xx-small')

    expect(children[1].className).toContain('dnb-space__left--zero')
    expect(children[1].className).toContain('dnb-space__right--xx-small')

    expect(children[2].className).toContain('dnb-space__left--zero')
    expect(children[2].className).toContain('dnb-space__right--xx-small')
  })

  it('should not apply spacing if set to false', () => {
    render(
      <Flex.Container spacing={false}>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-flex-container--divider-space'
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
    render(<Flex.Container element="section">content</Flex.Container>)

    const element = document.querySelector('.dnb-flex-container')

    expect(element.tagName).toBe('SECTION')
  })

  it('should not add a wrapper when _supportsSpacingProps is given', () => {
    const { rerender } = render(
      <Flex.Vertical>
        <Flex.Item>content</Flex.Item>
        <Flex.Item>content</Flex.Item>
      </Flex.Vertical>
    )

    const TestComponent = (props: SpaceProps) => {
      const cn = createSpacingClasses(props)
      cn.push('test-item')
      return <div className={cn.join(' ')}>content</div>
    }

    {
      rerender(
        <Flex.Vertical>
          <TestComponent />
          <TestComponent bottom="large" />
        </Flex.Vertical>
      )

      const elements = document.querySelectorAll(
        '.dnb-flex-container > div'
      )
      expect(elements[0].className).toBe(
        'dnb-space dnb-space__top--zero dnb-space__bottom--zero'
      )
      expect(elements[1].className).toBe(
        'dnb-space dnb-space__top--small dnb-space__bottom--zero'
      )
      expect((elements[0].firstChild as HTMLElement).className).toBe(
        'test-item'
      )
      expect((elements[1].firstChild as HTMLElement).className).toBe(
        'dnb-space__bottom--large test-item'
      )
    }

    {
      TestComponent._supportsSpacingProps = true

      rerender(
        <Flex.Vertical>
          <TestComponent />
          <TestComponent bottom="x-large" />
        </Flex.Vertical>
      )

      const elements = document.querySelectorAll(
        '.dnb-flex-container > div'
      )
      expect(elements[0].className).toBe(
        'dnb-space__top--zero dnb-space__bottom--zero test-item'
      )
      expect(elements[1].className).toBe(
        'dnb-space__bottom--x-large dnb-space__top--small test-item'
      )
      expect((elements[0].firstChild as HTMLElement).className).toBeFalsy()
      expect((elements[1].firstChild as HTMLElement).className).toBeFalsy()
    }
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return (
        <Flex.Container innerRef={ref} element="section">
          <Flex.Item>FlexItem</Flex.Item>
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

    it('should set default "sizeCount" of 12', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.getAttribute('style')).toBe('--sizeCount: 12;')

      rerender(
        <Flex.Container sizeCount={6}>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('style')).toBe('--sizeCount: 6;')

      rerender(
        <Flex.Container>
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('style')).toBe('')
    })

    it('should set --has-size class', () => {
      render(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.className).toContain('dnb-flex-container--has-size')
    })

    it('should set data-media-key', () => {
      setMedia({ width: SMALL })

      const { rerender } = render(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      act(() => {
        setMedia({ width: MEDIUM })
      })

      rerender(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('data-media-key')).toBe('medium')

      act(() => {
        setMedia({ width: LARGE })
      })

      rerender(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('data-media-key')).toBe('large')
    })
  })
})
