import { act, useRef } from 'react'
import type { RefObject } from 'react'
import { render, waitFor } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import '../../../core/vitest/mockMatchMediaSetup'
import { setMedia, matchMedia } from 'mock-match-media'
import { defaultQueries } from '../../../shared/useMedia'
import Flex from '../Flex'
import { useSpacing } from '../../space/SpacingUtils'
import type { SpaceProps } from '../../Space'
import { Form } from '../../../extensions/forms'
import H1 from '../../../elements/H1'
import AriaLive from '../../aria-live/AriaLive'
import HeightAnimation from '../../height-animation/HeightAnimation'
import Space from '../../space/Space'
import P from '../../../elements/P'

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
    expect(element).toHaveClass('dnb-flex-container--wrap')
  })

  it('should preserve the legacy layout engine by default', () => {
    render(
      <Flex.Vertical>
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')

    expect(container).not.toHaveClass('dnb-flex-container--css-gap')
    expect(container.children[0]).toHaveClass('dnb-space__top--zero')
    expect(container.children[1]).toHaveClass('dnb-space__top--small')
  })

  it('should contain given classes', () => {
    render(
      <Flex.Container className="custom-class">
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')

    expect(element).toHaveClass(
      'dnb-space dnb-flex-container dnb-flex-container--direction-horizontal dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--row-gap-small dnb-flex-container--divider-space custom-class',
      { exact: true }
    )
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

    expect(element).toHaveClass('dnb-flex-container--direction-vertical')

    rerender(
      <Flex.Container>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(element).toHaveClass('dnb-flex-container--direction-horizontal')
  })

  it('should set alignment of content', () => {
    render(
      <Flex.Container align="center">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(document.querySelector('.dnb-flex-container')).toHaveClass(
      'dnb-flex-container--align-center'
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

    expect(element).toHaveClass('dnb-flex-container--align-center')

    rerender(
      <Flex.Container align="flex-end">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(element).toHaveClass('dnb-flex-container--align-flex-end')
  })

  it('should add divider between children', () => {
    const { rerender } = render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        divider="space"
      >
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element).toHaveClass('dnb-flex-container--divider-space')

    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--zero')

    expect(children[1]).toHaveClass('dnb-space__top--small')
    expect(children[1]).toHaveClass('dnb-space__bottom--zero')

    expect(children[2]).toHaveClass('dnb-space__top--small')
    expect(children[2]).toHaveClass('dnb-space__bottom--zero')

    rerender(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        divider="line"
      >
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children.length).toBe(5)
    expect(element).toHaveClass('dnb-flex-container--divider-line')

    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--zero')
    expect(children[0]).toHaveClass('dnb-flex-item')

    expect(children[1].tagName).toContain('HR')
    expect(children[1]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[2].tagName).toContain('DIV')
    expect(children[2]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[3].tagName).toContain('HR')
    expect(children[3]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[4]).toHaveClass('dnb-space__top--small')
    expect(children[4]).toHaveClass('dnb-space__bottom--zero')
    expect(children[4]).toHaveClass('dnb-flex-item')
  })

  it('should render CSS dividers without inserting React children', () => {
    const { rerender } = render(
      <Flex.Vertical layoutEngine="css" divider="line">
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
        <Flex.Item>Third</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')

    expect(container.children).toHaveLength(3)
    expect(container.querySelector('hr')).toBeNull()
    expect(container).toHaveClass('dnb-flex-container--divider-line')

    rerender(
      <Flex.Vertical layoutEngine="css" divider="line-framed">
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
      </Flex.Vertical>
    )

    expect(container.children).toHaveLength(2)
    expect(container.querySelector('hr')).toBeNull()
    expect(container).toHaveClass(
      'dnb-flex-container--divider-line-framed'
    )
  })

  it('should not use child pseudo-elements for CSS dividers', () => {
    render(
      <Flex.Vertical layoutEngine="css" divider="line">
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector(
      '.dnb-flex-container'
    ) as HTMLElement

    expect(container.children).toHaveLength(2)
    expect(
      container.querySelector('.dnb-flex-container__divider')
    ).toBeNull()
  })

  it('should use rendered heading metadata in CSS divider mode', () => {
    render(
      <Flex.Vertical layoutEngine="css" divider="line">
        <H1>Heading</H1>
        <Flex.Item>Content</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')

    expect(container.children).toHaveLength(2)
    expect(container.children[0]).toHaveAttribute(
      'data-flex-item-type',
      'heading'
    )
    expect(container.querySelector('hr')).toBeNull()
  })

  it('should not wrap intrinsic elements with extra Space when wrapChildrenInSpace is false', () => {
    render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        wrapChildrenInSpace={false}
      >
        <p>Alpha</p>
        <p>Beta</p>
      </Flex.Container>
    )

    const container = document.querySelector('.dnb-flex-container')
    const children = Array.from(container.children)

    expect(children).toHaveLength(2)
    expect(children[0].tagName).toBe('P')
    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--zero')
    expect(children[1].tagName).toBe('P')
    expect(children[1]).toHaveClass('dnb-space__top--small')
    expect(children[1]).toHaveClass('dnb-space__bottom--zero')
    expect(
      document.querySelectorAll('.dnb-flex-container > .dnb-space')
    ).toHaveLength(0)
  })

  it('should still wrap custom components with Space when wrapChildrenInSpace is false', () => {
    const TestComponent = () => <div className="test-item">content</div>

    render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        wrapChildrenInSpace={false}
      >
        <TestComponent />
        <TestComponent />
      </Flex.Container>
    )

    const container = document.querySelector('.dnb-flex-container')
    const children = Array.from(container.children)

    expect(children).toHaveLength(2)
    expect(children[0].tagName).toBe('DIV')
    expect(children[0]).toHaveClass('dnb-space')
    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).not.toHaveClass('test-item')
    expect(children[0].querySelector('.test-item')).toBeInTheDocument()
    expect(children[1].tagName).toBe('DIV')
    expect(children[1]).toHaveClass('dnb-space')
    expect(children[1]).toHaveClass('dnb-space__top--small')
    expect(children[1]).not.toHaveClass('test-item')
    expect(children[1].querySelector('.test-item')).toBeInTheDocument()
  })

  it('should not add line divider below heading', () => {
    render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        divider="line"
      >
        <H1>Heading</H1>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const container = document.querySelector('.dnb-flex-container')
    expect(container).toMatchInlineSnapshot(`
      <div
        class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-line"
      >
        <h1
          class="dnb-h--xx-large dnb-space__top--zero dnb-space__bottom--zero"
          data-flex-item-type="heading"
        >
          Heading
        </h1>
        <div
          class="dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item"
        >
          Flex
        </div>
        <hr
          class="dnb-hr dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero"
        />
        <div
          class="dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item"
        >
          Flex
        </div>
      </div>
    `)

    expect(container).toHaveClass('dnb-flex-container--divider-line')

    const children = container.children

    expect(children.length).toBe(4)

    expect(children[0].tagName).toContain('H1')
    expect(children[0]).toHaveClass(
      'dnb-space__top--zero dnb-space__bottom--zero dnb-h--xx-large'
    )

    expect(children[1].tagName).toContain('DIV')
    expect(children[1]).toHaveClass('dnb-space__top--small')

    expect(children[2].tagName).toContain('HR')
    expect(children[2]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[3].tagName).toContain('DIV')
    expect(children[3]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )
  })

  it('has correct classes when divider is line', () => {
    render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        divider="line"
      >
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element).toHaveClass('dnb-flex-container--divider-line')

    expect(children[0].tagName).toContain('DIV')
    expect(children[0]).toHaveClass(
      'dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[1].tagName).toContain('HR')
    expect(children[1]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[2].tagName).toContain('DIV')
    expect(children[2]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )
  })

  it('has correct classes when divider is line-framed', () => {
    render(
      <Flex.Container
        layoutEngine="legacy"
        direction="vertical"
        divider="line-framed"
      >
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(5)
    expect(element).toHaveClass('dnb-flex-container--divider-line-framed')

    expect(children[0].tagName).toContain('HR')
    expect(children[0]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--zero dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[1].tagName).toContain('DIV')
    expect(children[1]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[2].tagName).toContain('HR')
    expect(children[2]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )

    expect(children[3].tagName).toContain('DIV')
    expect(children[3]).toHaveClass(
      'dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item'
    )

    expect(children[4].tagName).toContain('HR')
    expect(children[4]).toHaveClass(
      'dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr'
    )
  })

  it('should not add trailing spacing to the final horizontal child', () => {
    render(
      <Flex.Container layoutEngine="legacy" gap="medium">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space__right--medium')
    expect(children[1]).toHaveClass('dnb-space__right--medium')
    expect(children[2]).toHaveClass('dnb-space__right--zero')
  })

  it('should preserve explicit vertical child margins in the legacy engine', () => {
    render(
      <Flex.Vertical layoutEngine="legacy" gap="small">
        <Flex.Item bottom="large">First</Flex.Item>
        <Flex.Item top="x-small" bottom="medium">
          Second
        </Flex.Item>
        <Flex.Item>Third</Flex.Item>
      </Flex.Vertical>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space__top--zero')
    expect(children[0]).toHaveClass('dnb-space__bottom--large')
    expect(children[1]).toHaveClass('dnb-space__top--x-small')
    expect(children[1]).toHaveClass('dnb-space__bottom--medium')
    expect(children[2]).toHaveClass('dnb-space__top--medium')
    expect(children[2]).toHaveClass('dnb-space__bottom--zero')
  })

  it('should preserve explicit horizontal child margins in the legacy engine', () => {
    render(
      <Flex.Horizontal layoutEngine="legacy" gap="small">
        <Flex.Item right="large">First</Flex.Item>
        <Flex.Item left="x-small" right="medium">
          Second
        </Flex.Item>
        <Flex.Item>Third</Flex.Item>
      </Flex.Horizontal>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--large')
    expect(children[1]).toHaveClass('dnb-space__left--x-small')
    expect(children[1]).toHaveClass('dnb-space__right--medium')
    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--zero')
  })

  it('should preserve vertical spacing at the outer edges in the legacy engine', () => {
    render(
      <Flex.Vertical layoutEngine="legacy" gap={false}>
        <Flex.Item top="large">First</Flex.Item>
        <Flex.Item bottom="medium">Last</Flex.Item>
      </Flex.Vertical>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space__top--large')
    expect(children[1]).toHaveClass('dnb-space__top--zero')
    expect(children[1]).toHaveClass('dnb-space__bottom--medium')
  })

  it('should normalize numeric, rem, and px child spacing values', () => {
    render(
      <Flex.Vertical gap="small">
        <Flex.Item>First</Flex.Item>
        <Flex.Item top={2}>Numeric</Flex.Item>
        <Flex.Item top="1.5rem">Rem</Flex.Item>
        <Flex.Item top="8px">Px</Flex.Item>
      </Flex.Vertical>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[1]).toHaveClass('dnb-space__top--large')
    expect(children[2]).toHaveClass('dnb-space__top--medium')
    expect(children[3]).toHaveClass('dnb-space__top--x-small')
  })

  it('should render children unchanged in the CSS gap engine', () => {
    const CustomItem = ({ children }) => (
      <article className="custom-item">{children}</article>
    )

    render(
      <Flex.Vertical layoutEngine="css">
        <div className="intrinsic">Intrinsic</div>
        <CustomItem>Custom</CustomItem>
        <>
          <span>Fragment A</span>
          <span>Fragment B</span>
        </>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')
    const children = Array.from(container.children)

    expect(container).toHaveClass('dnb-flex-container--css-gap')
    expect(children).toHaveLength(4)
    expect(children.map((child) => child.tagName)).toEqual([
      'DIV',
      'ARTICLE',
      'SPAN',
      'SPAN',
    ])
    expect(container.querySelector(':scope > .dnb-space')).toBeNull()
  })

  it('should expose CSS gap values without cloning children', () => {
    const { rerender } = render(
      <Flex.Horizontal layoutEngine="css" gap="large" rowGap="x-small">
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
      </Flex.Horizontal>
    )

    const container = document.querySelector('.dnb-flex-container')
    expect(container).toHaveClass(
      'dnb-flex-container--spacing-large',
      'dnb-flex-container--row-gap-x-small'
    )

    rerender(
      <Flex.Vertical layoutEngine="css" gap="large" rowGap="medium">
        <Flex.Item>First</Flex.Item>
        <Flex.Item>Second</Flex.Item>
      </Flex.Vertical>
    )

    const verticalContainer = document.querySelector('.dnb-flex-container')
    expect(verticalContainer).toHaveClass(
      'dnb-flex-container--spacing-medium'
    )
    expect(verticalContainer).not.toHaveClass(
      'dnb-flex-container--row-gap-x-small'
    )
  })

  it('should expose pairwise spacing metadata in the CSS gap engine', () => {
    render(
      <Flex.Vertical layoutEngine="css" gap="small">
        <Flex.Item bottom="large">First</Flex.Item>
        <Flex.Item top="x-small" bottom="medium">
          Second
        </Flex.Item>
        <Flex.Item>Third</Flex.Item>
      </Flex.Vertical>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space--has-block-end')
    expect(children[0].getAttribute('style')).toContain(
      '--space-block-end: var(--spacing-large)'
    )
    expect(children[1]).toHaveClass(
      'dnb-space--has-block-start',
      'dnb-space--has-block-end'
    )
    expect(children[1].getAttribute('style')).toContain(
      '--space-block-start: var(--spacing-x-small)'
    )
    expect(children[2]).not.toHaveClass('dnb-space--has-block-start')
  })

  it('should preserve explicit outer spacing in the CSS gap engine', () => {
    render(
      <Flex.Vertical layoutEngine="css" gap={false}>
        <Flex.Item top="large">First</Flex.Item>
        <Flex.Item bottom="medium">Last</Flex.Item>
      </Flex.Vertical>
    )

    const children = document.querySelector('.dnb-flex-container').children

    expect(children[0]).toHaveClass('dnb-space__top--large')
    expect(children[1]).toHaveClass('dnb-space__bottom--medium')
  })

  it('should preserve children without spacing metadata when gap is false', () => {
    const CustomItem = () => <div className="custom-item">Custom</div>

    render(
      <Flex.Horizontal layoutEngine="css" gap={false} rowGap={false}>
        <CustomItem />
        <CustomItem />
      </Flex.Horizontal>
    )

    const container = document.querySelector('.dnb-flex-container')
    expect(container).toHaveClass('dnb-flex-container--css-gap')
    expect(container.className).not.toContain('--spacing-')
    expect(container.className).not.toContain('--row-gap-')
    expect(
      container.querySelectorAll(':scope > .custom-item')
    ).toHaveLength(2)
  })

  it('should preserve conditional children in the CSS gap engine', () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <Flex.Item>First</Flex.Item>
        {null}
        <Flex.Item>Last</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')

    expect(container.children).toHaveLength(2)
    expect(container).toHaveTextContent('FirstLast')
  })

  it('should keep hidden Form.Visibility roots out of CSS layout', () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <Flex.Item>First</Flex.Item>
        <Form.Visibility keepInDOM visible={false}>
          <P>Hidden</P>
        </Form.Visibility>
        <Flex.Item>Last</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')
    const hidden = container.querySelector('.dnb-forms-visibility')

    expect(container.children).toHaveLength(3)
    expect(hidden).toHaveAttribute('hidden')
  })

  it('should keep hidden HeightAnimation roots out of CSS layout', () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <Flex.Item>First</Flex.Item>
        <HeightAnimation animate={false} keepInDOM open={false}>
          Hidden
        </HeightAnimation>
        <Flex.Item>Last</Flex.Item>
      </Flex.Vertical>
    )

    const container = document.querySelector('.dnb-flex-container')
    const hidden = container.querySelector('.dnb-height-animation')

    expect(container.children).toHaveLength(3)
    expect(hidden).toHaveClass('dnb-height-animation--hidden')
    expect(hidden).toHaveAttribute('aria-hidden', 'true')
  })

  it('should create a nested CSS layout inside direct HeightAnimation roots', async () => {
    render(
      <Flex.Vertical layoutEngine="css" gap="medium">
        <HeightAnimation animate={false}>
          <Flex.Item>First</Flex.Item>
          <Flex.Item>Second</Flex.Item>
        </HeightAnimation>
      </Flex.Vertical>
    )

    const outer = document.querySelector('.dnb-flex-container--css-gap')
    const animation = outer.querySelector(':scope > .dnb-height-animation')
    const nested = await waitFor(() => {
      const element = animation.querySelector(
        ':scope > .dnb-flex-container--css-gap'
      )
      expect(element).toBeInTheDocument()
      return element
    })

    expect(outer.children).toHaveLength(1)
    expect(nested).toHaveClass(
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--spacing-medium'
    )
    expect(nested.children).toHaveLength(2)
  })

  it('should create a nested CSS layout without changing AriaLive semantics', async () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <AriaLive variant="content">
          <Flex.Item>First</Flex.Item>
          <Flex.Item>Second</Flex.Item>
        </AriaLive>
      </Flex.Vertical>
    )

    const liveRegion = document.querySelector('.dnb-aria-live')
    const nested = await waitFor(() => {
      const element = liveRegion.querySelector(
        ':scope > .dnb-flex-container--css-gap'
      )
      expect(element).toBeInTheDocument()
      return element
    })

    expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    expect(liveRegion).toHaveAttribute('aria-atomic', 'false')
    expect(nested.children).toHaveLength(2)
  })

  it('should create a nested CSS layout inside real Form.Visibility roots', async () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <Form.Visibility id="visible-content" visible>
          <Flex.Item>First</Flex.Item>
          <Flex.Item>Second</Flex.Item>
        </Form.Visibility>
      </Flex.Vertical>
    )

    const visibility = document.querySelector('#visible-content')
    const nested = await waitFor(() => {
      const element = visibility.querySelector(
        ':scope > .dnb-flex-container--css-gap'
      )
      expect(element).toBeInTheDocument()
      return element
    })

    expect(visibility.tagName).toBe('SPAN')
    expect(nested.children).toHaveLength(2)
  })

  it('should keep transparent providers transparent in the CSS gap engine', () => {
    render(
      <Flex.Vertical layoutEngine="css">
        <Space.ResponsiveContext off>
          <Flex.Item>First</Flex.Item>
          <Flex.Item>Second</Flex.Item>
        </Space.ResponsiveContext>
      </Flex.Vertical>
    )

    const outer = document.querySelector('.dnb-flex-container--css-gap')

    expect(outer.children).toHaveLength(2)
    expect(
      outer.querySelector(':scope > .dnb-flex-container--css-gap')
    ).toBeNull()
  })

  it('should use Flex.withChildren as a CSS layout compatibility adapter', () => {
    const Wrapper = Flex.withChildren(({ children }) => (
      <section className="custom-wrapper">{children}</section>
    ))

    render(
      <Flex.Vertical layoutEngine="css">
        <Wrapper>
          <Flex.Item>First</Flex.Item>
          <Flex.Item>Second</Flex.Item>
        </Wrapper>
      </Flex.Vertical>
    )

    const wrapper = document.querySelector('.custom-wrapper')
    const nested = wrapper.querySelector(
      ':scope > .dnb-flex-container--css-gap'
    )

    expect(nested.children).toHaveLength(2)
  })

  it('should not leak CSS layout context through unrelated DOM wrappers', async () => {
    const Wrapper = ({ children }) => (
      <section className="unrelated-wrapper">{children}</section>
    )

    render(
      <Flex.Vertical layoutEngine="css">
        <Wrapper>
          <HeightAnimation animate={false}>
            <Flex.Item>First</Flex.Item>
            <Flex.Item>Second</Flex.Item>
          </HeightAnimation>
        </Wrapper>
      </Flex.Vertical>
    )

    const animation = document.querySelector('.dnb-height-animation')

    await waitFor(() => {
      expect(
        animation.querySelector(':scope > .dnb-flex-container--css-gap')
      ).toBeNull()
    })
    expect(animation.children).toHaveLength(2)
  })

  it('should set spacing between children', () => {
    const { rerender } = render(
      <Flex.Container layoutEngine="legacy">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element).toHaveClass('dnb-flex-container--divider-space')

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--small')

    expect(children[1]).toHaveClass('dnb-space__left--zero')
    expect(children[1]).toHaveClass('dnb-space__right--small')

    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--zero')

    rerender(
      <Flex.Container layoutEngine="legacy" gap="large">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--large')

    expect(children[1]).toHaveClass('dnb-space__left--zero')
    expect(children[1]).toHaveClass('dnb-space__right--large')

    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--zero')

    rerender(
      <Flex.Container layoutEngine="legacy" gap="xx-small">
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--xx-small')

    expect(children[1]).toHaveClass('dnb-space__left--zero')
    expect(children[1]).toHaveClass('dnb-space__right--xx-small')

    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--zero')
  })

  it('should not apply spacing if set to false', () => {
    render(
      <Flex.Container layoutEngine="legacy" gap={false}>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
        <Flex.Item>Flex</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element).toHaveClass('dnb-flex-container--divider-space')

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--zero')

    expect(children[1].className).not.toContain('dnb-space__left--small')
    expect(children[1]).toHaveClass('dnb-space__left--zero')
    expect(children[1]).toHaveClass('dnb-space__right--zero')

    expect(children[2].className).not.toContain('dnb-space__left--small')
    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--zero')
  })

  describe('_supportsSpacingProps', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    const getMocks = () => {
      const Wrapper = ({ children }) => {
        return <div className="wrapper">{children}</div>
      }
      Wrapper._supportsSpacingProps = undefined

      const TestComponent = (props: SpaceProps) => {
        const params = useSpacing(props, { className: 'test-item' })
        return <div {...params}>content</div>
      }
      TestComponent._supportsSpacingProps = undefined

      const { rerender } = render(<></>)

      return { rerender, Wrapper, TestComponent }
    }

    it('should wrap TestComponent with Space', () => {
      const { rerender, TestComponent } = getMocks()

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <TestComponent />
          <TestComponent />
          <TestComponent top="large" />
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="dnb-space dnb-space__top--zero dnb-space__bottom--zero"
          >
            <div
              class="test-item"
            >
              content
            </div>
          </div>
          <div
            class="dnb-space dnb-space__top--small dnb-space__bottom--zero"
          >
            <div
              class="test-item"
            >
              content
            </div>
          </div>
          <div
            class="test-item dnb-space__top--large dnb-space__bottom--zero"
          >
            content
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__top"]')
      ).toHaveLength(3)
      expect(
        document.querySelectorAll('.dnb-space__top--zero')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('.dnb-space__top--small')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('.dnb-space__top--large')
      ).toHaveLength(1)
    })

    it('should with _supportsSpacingProps=true not wrap with extra Space', () => {
      const { rerender, TestComponent } = getMocks()

      TestComponent._supportsSpacingProps = true

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <TestComponent />
          <TestComponent />
          <TestComponent top="large" />
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="test-item dnb-space__top--zero dnb-space__bottom--zero"
          >
            content
          </div>
          <div
            class="test-item dnb-space__top--small dnb-space__bottom--zero"
          >
            content
          </div>
          <div
            class="test-item dnb-space__top--large dnb-space__bottom--zero"
          >
            content
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__top"]')
      ).toHaveLength(3)
      expect(
        document.querySelectorAll('.dnb-space__top--zero')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('.dnb-space__top--small')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('.dnb-space__top--large')
      ).toHaveLength(1)
    })

    it('should with _supportsSpacingProps=children wrap the children of Wrapper with a new Flex.Container and use the same props', () => {
      const { rerender, Wrapper, TestComponent } = getMocks()

      TestComponent._supportsSpacingProps = true
      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <Wrapper>
            <TestComponent />
            <TestComponent />
            <TestComponent top="large" />
          </Wrapper>
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="wrapper"
          >
            <div
              class="dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
            >
              <div
                class="test-item dnb-space__top--zero dnb-space__bottom--zero"
              >
                content
              </div>
              <div
                class="test-item dnb-space__top--small dnb-space__bottom--zero"
              >
                content
              </div>
              <div
                class="test-item dnb-space__top--large dnb-space__bottom--zero"
              >
                content
              </div>
            </div>
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(2)
      expect(document.querySelectorAll('.wrapper')).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__top"]')
      ).toHaveLength(4)
      expect(
        document.querySelectorAll('.dnb-space__top--zero')
      ).toHaveLength(2)
      expect(
        document.querySelectorAll('.dnb-space__top--small')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('.dnb-space__top--large')
      ).toHaveLength(1)
    })

    it('should preserve key from element when wrapping with _supportsSpacingProps=children', () => {
      const { rerender, Wrapper, TestComponent } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <Wrapper key="my-key">
            <TestComponent />
          </Wrapper>
        </Flex.Vertical>
      )

      // Verify the component renders correctly with key preservation
      const container = document.querySelector('.dnb-flex-container')
      expect(container).toBeTruthy()
    })

    it('should with _supportsSpacingProps=children wrap the children inside the Wrapper', () => {
      const { rerender, Wrapper } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <Wrapper>
            Content A <p>Content B</p>
          </Wrapper>
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="wrapper"
          >
            <div
              class="dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
            >
              <div
                class="dnb-space dnb-space__top--zero dnb-space__bottom--zero"
              >
                Content A 
              </div>
              <div
                class="dnb-space dnb-space__top--small dnb-space__bottom--zero"
              >
                <p>
                  Content B
                </p>
              </div>
            </div>
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(2)
      expect(document.querySelectorAll('.wrapper')).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__"]')
      ).toHaveLength(3)
    })

    it('should handle fragments like _supportsSpacingProps=children', () => {
      const { rerender, Wrapper, TestComponent } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <>
            Content A <p>Content B</p>
            <TestComponent top="large" />
          </>
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="dnb-space dnb-space__top--zero dnb-space__bottom--zero"
          >
            Content A 
          </div>
          <div
            class="dnb-space dnb-space__top--small dnb-space__bottom--zero"
          >
            <p>
              Content B
            </p>
          </div>
          <div
            class="test-item dnb-space__top--large dnb-space__bottom--zero"
          >
            content
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__"]')
      ).toHaveLength(3)
    })

    it('should handle nested fragments like _supportsSpacingProps=children', () => {
      const { rerender, Wrapper, TestComponent } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical layoutEngine="legacy">
          <>
            <>
              Content A<p>Content B</p>
            </>
            <>
              <TestComponent top="large" />
            </>
          </>
        </Flex.Vertical>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <div
            class="dnb-space dnb-space__top--zero dnb-space__bottom--zero"
          >
            Content A
          </div>
          <div
            class="dnb-space dnb-space__top--zero dnb-space__bottom--zero"
          >
            <p>
              Content B
            </p>
          </div>
          <div
            class="test-item dnb-space__top--large dnb-space__bottom--zero"
          >
            content
          </div>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__"]')
      ).toHaveLength(3)
    })

    it('should handle Form.Visibility', () => {
      const { rerender, Wrapper } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Form.Handler
          id="unique-id"
          data={{
            visible: false,
          }}
        >
          <Flex.Vertical layoutEngine="legacy">
            <Form.SubHeading>Heading</Form.SubHeading>
            <Form.Visibility
              visibleWhen={{ path: '/visible', hasValue: true }}
            >
              <P>text</P>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible', hasValue: true }}
            >
              <P>text</P>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible', hasValue: true }}
            >
              <P>text</P>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible', hasValue: true }}
            >
              <P>text</P>
            </Form.Visibility>
          </Flex.Vertical>
        </Form.Handler>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <h3
            class="dnb-heading dnb-h--medium dnb-forms-sub-heading dnb-space__top--zero dnb-space__bottom--zero"
            data-flex-item-type="heading"
          >
            Heading
          </h3>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__"]')
      ).toHaveLength(1)
    })

    it('should handle Form.Visibility nested in fragments', () => {
      const { rerender, Wrapper } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Form.Handler
          id="unique-id"
          data={{
            visible: false,
          }}
        >
          <Flex.Vertical layoutEngine="legacy">
            <Form.SubHeading>Heading</Form.SubHeading>
            <>
              <>
                <Form.Visibility
                  visibleWhen={{ path: '/visible', hasValue: true }}
                >
                  <P>text</P>
                </Form.Visibility>
                <Form.Visibility
                  visibleWhen={{ path: '/visible', hasValue: true }}
                >
                  <P>text</P>
                </Form.Visibility>
              </>
              <Form.Visibility
                visibleWhen={{ path: '/visible', hasValue: true }}
              >
                <P>text</P>
              </Form.Visibility>
            </>
            <>
              <>
                <Form.Visibility
                  visibleWhen={{ path: '/visible', hasValue: true }}
                >
                  <P>text</P>
                </Form.Visibility>
              </>
            </>
          </Flex.Vertical>
        </Form.Handler>
      )

      const container = document.querySelector('.dnb-flex-container')
      expect(container).toMatchInlineSnapshot(`
        <div
          class="dnb-space dnb-flex-container dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-flex-start dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
        >
          <h3
            class="dnb-heading dnb-h--medium dnb-forms-sub-heading dnb-space__top--zero dnb-space__bottom--zero"
            data-flex-item-type="heading"
          >
            Heading
          </h3>
        </div>
      `)

      expect(
        document.querySelectorAll('.dnb-flex-container')
      ).toHaveLength(1)
      expect(
        document.querySelectorAll('[class*="dnb-space__"]')
      ).toHaveLength(1)
    })
  })

  it('should set custom element', () => {
    render(<Flex.Container element="section">content</Flex.Container>)

    const element = document.querySelector('.dnb-flex-container')

    expect(element.tagName).toBe('SECTION')
  })

  it('gets valid ref element', () => {
    let ref: RefObject<HTMLElement>

    function MockComponent() {
      ref = useRef<HTMLElement | null>(null)
      return (
        <Flex.Container ref={ref} element="section">
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
      vi.spyOn(window, 'matchMedia').mockImplementation(matchMedia)
    })

    const matchMediaOriginal = window.matchMedia
    afterEach(() => {
      window.matchMedia = matchMediaOriginal
    })

    const SMALL = '39em' // 40em
    const MEDIUM = '59em' // 60em
    const LARGE = '79em' // 80em

    it('should set default "sizeCount" of 12 in the legacy engine', () => {
      const { rerender } = render(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.getAttribute('style')).toBe('--size-count: 12;')

      rerender(
        <Flex.Container layoutEngine="legacy" sizeCount={6}>
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('style')).toBe('--size-count: 6;')

      rerender(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('style')).toBe('')
    })

    it('should set --has-size class in the legacy engine', () => {
      render(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--has-size')
    })

    it('should set data-media-key in the legacy engine', () => {
      setMedia({ width: SMALL })

      const { rerender } = render(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      act(() => {
        setMedia({ width: MEDIUM })
      })

      rerender(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('data-media-key')).toBe('medium')

      act(() => {
        setMedia({ width: LARGE })
      })

      rerender(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('data-media-key')).toBe('large')
    })

    it('should expose span layout context in the CSS gap engine without scanning children', () => {
      setMedia({ width: MEDIUM })

      render(
        <Flex.Container layoutEngine="css" sizeCount={6}>
          <Flex.Item span={3}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--css-gap')
      expect(element).not.toHaveClass('dnb-flex-container--has-size')
      expect(element.getAttribute('style')).toBe('--size-count: 6;')
      expect(element).not.toHaveAttribute('data-media-key')
    })

    it('should update the CSS gap engine media key for custom queries', () => {
      setMedia({ width: SMALL })

      const { rerender } = render(
        <Flex.Container layoutEngine="css" queries={defaultQueries}>
          <Flex.Item span={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      act(() => {
        setMedia({ width: LARGE })
      })

      rerender(
        <Flex.Container layoutEngine="css" queries={defaultQueries}>
          <Flex.Item span={{ small: 12, large: 6 }}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element.getAttribute('data-media-key')).toBe('large')
      expect(element).toHaveAttribute('data-custom-media', 'true')
      expect(
        (
          document.querySelector('.dnb-flex-item') as HTMLElement
        ).style.getPropertyValue('--span--media')
      ).toBe('6')
    })

    it('should not expose horizontal span context on vertical CSS containers', () => {
      render(
        <Flex.Vertical layoutEngine="css" sizeCount={6}>
          <Flex.Item span={3}>FlexItem</Flex.Item>
        </Flex.Vertical>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element.getAttribute('style')).toBeNull()
      expect(element).not.toHaveAttribute('data-media-key')
    })

    it('should set rowGap', () => {
      const { rerender } = render(
        <Flex.Container rowGap="medium">
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--row-gap-medium')

      rerender(
        <Flex.Container rowGap="small">
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element).toHaveClass('dnb-flex-container--row-gap-small')

      rerender(
        <Flex.Container rowGap={false}>
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element).not.toHaveClass('dnb-flex-container--row-gap-small')
    })

    it('should have no rowGap when false in the legacy size engine', () => {
      const { rerender } = render(
        <Flex.Container layoutEngine="legacy">
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--has-size')
      expect(element).toHaveClass('dnb-flex-container--spacing-small')
      expect(element).toHaveClass('dnb-flex-container--row-gap-small')

      rerender(
        <Flex.Container layoutEngine="legacy" rowGap={false}>
          <Flex.Item span={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element).toHaveClass('dnb-flex-container--has-size')
      expect(element).toHaveClass('dnb-flex-container--spacing-small')
      expect(element).not.toHaveClass('dnb-flex-container--row-gap-small')
    })
  })

  it('should forward ref', () => {
    const ref: RefObject<HTMLElement | null> = { current: null }

    render(
      <Flex.Container ref={ref}>
        <Flex.Item>Item 1</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(ref.current).toBe(element)
  })

  it('should forward ref as a function', () => {
    let refElement: HTMLElement | null = null
    const refFn = (elem: HTMLElement) => {
      refElement = elem
    }

    render(
      <Flex.Container ref={refFn}>
        <Flex.Item>Item 1</Flex.Item>
      </Flex.Container>
    )

    const element = document.querySelector('.dnb-flex-container')
    expect(refElement).toBe(element)
  })

  describe('Flex.Container accessibility', () => {
    it('should validate with ARIA rules', async () => {
      const Comp = render(
        <Flex.Container>
          <Flex.Item>Item 1</Flex.Item>
          <Flex.Item>Item 2</Flex.Item>
        </Flex.Container>
      )
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })
})
