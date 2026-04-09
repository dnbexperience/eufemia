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

    expect(element.getAttribute('style')).toContain('--margin-t-')

    rerender(<Flex.Item top="x-large">Flex</Flex.Item>)

    expect(element.getAttribute('style')).toContain('--margin-t-')
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
    let ref: React.RefObject<HTMLElement>

    function MockComponent() {
      ref = React.useRef<HTMLElement | null>(null)
      return (
        <Flex.Container>
          <Flex.Item ref={ref} element="section">
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
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-item')

      expect(element.classList).toContain('dnb-flex-item--responsive')
    })

    it('should unset span when null is given', () => {
      render(
        <Flex.Container>
          <Flex.Item span="auto">FlexItem</Flex.Item>
          <Flex.Item span={{ small: 4, large: 'auto' }}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--span--default: auto;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--small: 4; --large: auto;'
      )

      const element = document.querySelector('.dnb-flex-item')

      expect(element.classList).toContain('dnb-flex-item--responsive')
    })

    it('should set style attribute based on spans', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item span={4}>FlexItem</Flex.Item>
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--span--default: 4;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--span--default: 6;'
      )

      rerender(
        <Flex.Container>
          <Flex.Item span={2}>FlexItem</Flex.Item>
          <Flex.Item span={10}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--span--default: 2;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--span--default: 10;'
      )

      rerender(
        <Flex.Container>
          <Flex.Item style={{ background: 'blue' }} span={7}>
            FlexItem
          </Flex.Item>
          <Flex.Item style={{ background: 'red' }} span={5}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getFlexItem(0).getAttribute('style')).toBe(
        '--span--default: 7;'
      )
      expect(getFlexItem(1).getAttribute('style')).toBe(
        '--span--default: 5;'
      )
      expect(
        getFlexItem(0)
          .querySelector('.dnb-flex-item__spacer')
          .getAttribute('style')
      ).toContain('background: blue;')
      expect(
        getFlexItem(1)
          .querySelector('.dnb-flex-item__spacer')
          .getAttribute('style')
      ).toContain('background: red;')
    })

    it('should set correct spacing', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item span={2}>FlexItem</Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item span={12}>FlexItem</Flex.Item>
          <Flex.Item span={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should omit span when heading is a child and direction is horizontal', () => {
      const { rerender } = render(
        <Flex.Container>
          <MainHeading level={1}>Heading</MainHeading>
          <Flex.Item span={2}>FlexItem</Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.className).not.toContain(
        'dnb-flex-container--has-size'
      )
      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      rerender(
        <Flex.Container>
          <MainHeading level={1}>Heading</MainHeading>
          <Flex.Item left span={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="large" right="medium" span={2}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(element.className).not.toContain(
        'dnb-flex-container--has-size'
      )
      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should omit span prop logic when FlexContainer "direction" is vertical', () => {
      const { rerender } = render(
        <Flex.Container direction="vertical">
          <Flex.Item span={2}>FlexItem</Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-t-', '--margin-b-'],
        ['--margin-t-', '--margin-b-'],
      ])

      rerender(
        <Flex.Container direction="vertical">
          <Flex.Item span={12}>FlexItem</Flex.Item>
          <Flex.Item span={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-t-', '--margin-b-'],
        ['--margin-t-', '--margin-b-'],
      ])
    })

    it('should allow custom spacing on item', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item right="large" span={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="x-large" right="large" span={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item right="large" span={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="medium" right="large" span={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item right="x-large" span={12}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should omit span prop logic when FlexContainer "divider" is line', () => {
      const { rerender } = render(
        <Flex.Container divider="line">
          <Flex.Item right="large" span={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="x-large" right="large" span={2}>
            FlexItem
          </Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      rerender(
        <Flex.Container divider="space">
          <Flex.Item right="large" span={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item left="medium" right="large" span={6}>
            FlexItem
          </Flex.Item>
          <Flex.Item right="x-large" span={12}>
            FlexItem
          </Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should use given "spacing" size from FlexContainer', () => {
      const { rerender } = render(
        <Flex.Container gap="large">
          <Flex.Item span={2}>FlexItem</Flex.Item>
          <Flex.Item span={2}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      rerender(
        <Flex.Container>
          <Flex.Item span={12}>FlexItem</Flex.Item>
          <Flex.Item span={12}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should set correct spacing based on media queries', () => {
      setMedia({ width: SMALL })

      render(
        <Flex.Container>
          <Flex.Item span={{ small: 4, large: 12 }}>FlexItem</Flex.Item>
          <Flex.Item span={{ small: 6, large: 4 }}>FlexItem</Flex.Item>
          <Flex.Item span={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      act(() => {
        setMedia({ width: LARGE })
      })

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })

    it('should pick nearest media key', () => {
      setMedia({ width: SMALL })

      render(
        <Flex.Container>
          <Flex.Item span={{ small: 4, large: 12 }}>FlexItem</Flex.Item>
          <Flex.Item span={{ small: 6, large: 4 }}>FlexItem</Flex.Item>
          <Flex.Item span={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])

      act(() => {
        setMedia({ width: MEDIUM })
      })

      expect(getSpacingStyles()).toEqual([
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
        ['--margin-l-', '--margin-r-'],
      ])
    })
  })
})

function getSpacingStyles() {
  const collection = []
  const elements = document.querySelectorAll('.dnb-flex-item')

  elements.forEach((node) => {
    const element = node.querySelector('.dnb-flex-item__spacer')

    const item = []
    const style = element?.getAttribute('style') || ''

    if (style.includes('--margin-l-')) {
      item.push('--margin-l-')
    }
    if (style.includes('--margin-r-')) {
      item.push('--margin-r-')
    }
    if (style.includes('--margin-t-')) {
      item.push('--margin-t-')
    }
    if (style.includes('--margin-b-')) {
      item.push('--margin-b-')
    }

    collection.push(item)
  })

  return collection
}

const getFlexItem = (item: number) =>
  document.querySelectorAll('.dnb-flex-item')[item] as HTMLElement
