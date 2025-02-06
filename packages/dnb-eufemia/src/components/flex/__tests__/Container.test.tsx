import React from 'react'
import { act, render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import Flex from '../Flex'
import { createSpacingClasses } from '../../space/SpacingUtils'
import { SpaceProps } from '../../Space'
import { Form } from '../../../extensions/forms'
import H1 from '../../../elements/H1'
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
      'dnb-flex-container--row-gap-small',
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
      <Flex.Container direction="vertical" divider="space">
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
      <Flex.Container direction="vertical" divider="line">
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

  it('should not add line divider below heading', () => {
    render(
      <Flex.Container direction="vertical" divider="line">
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
          class="dnb-space__top--zero dnb-space__bottom--zero dnb-h--xx-large"
        >
          Heading
        </h1>
        <div
          class="dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-item"
        >
          Flex
        </div>
        <hr
          class="dnb-flex-container__hr dnb-space__top--small dnb-space__left--zero dnb-space__bottom--zero dnb-space__right--zero dnb-hr"
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
      <Flex.Container direction="vertical" divider="line">
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
      <Flex.Container direction="vertical" divider="line-framed">
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
    expect(element).toHaveClass('dnb-flex-container--divider-space')

    expect(children[0]).toHaveClass('dnb-space__left--zero')
    expect(children[0]).toHaveClass('dnb-space__right--small')

    expect(children[1]).toHaveClass('dnb-space__left--zero')
    expect(children[1]).toHaveClass('dnb-space__right--small')

    expect(children[2]).toHaveClass('dnb-space__left--zero')
    expect(children[2]).toHaveClass('dnb-space__right--small')

    rerender(
      <Flex.Container gap="large">
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
    expect(children[2]).toHaveClass('dnb-space__right--large')

    rerender(
      <Flex.Container gap="xx-small">
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
    expect(children[2]).toHaveClass('dnb-space__right--xx-small')
  })

  it('should not apply spacing if set to false', () => {
    render(
      <Flex.Container gap={false}>
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
        const cn = createSpacingClasses(props)
        cn.push('test-item')
        return <div className={cn.join(' ')}>content</div>
      }
      TestComponent._supportsSpacingProps = undefined

      const { rerender } = render(<></>)

      return { rerender, Wrapper, TestComponent }
    }

    it('should wrap TestComponent with Space', () => {
      const { rerender, TestComponent } = getMocks()

      rerender(
        <Flex.Vertical>
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
            class="dnb-space__top--large dnb-space__bottom--zero test-item"
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
        <Flex.Vertical>
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
            class="dnb-space__top--zero dnb-space__bottom--zero test-item"
          >
            content
          </div>
          <div
            class="dnb-space__top--small dnb-space__bottom--zero test-item"
          >
            content
          </div>
          <div
            class="dnb-space__top--large dnb-space__bottom--zero test-item"
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
        <Flex.Vertical>
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
                class="dnb-space__top--zero dnb-space__bottom--zero test-item"
              >
                content
              </div>
              <div
                class="dnb-space__top--small dnb-space__bottom--zero test-item"
              >
                content
              </div>
              <div
                class="dnb-space__top--large dnb-space__bottom--zero test-item"
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

    it('should with _supportsSpacingProps=children wrap the children inside the Wrapper', () => {
      const { rerender, Wrapper } = getMocks()

      Wrapper._supportsSpacingProps = 'children'

      rerender(
        <Flex.Vertical>
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
        <Flex.Vertical>
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
            class="dnb-space__top--large dnb-space__bottom--zero test-item"
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
        <Flex.Vertical>
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
            class="dnb-space__top--large dnb-space__bottom--zero test-item"
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
          <Flex.Vertical>
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
            class="dnb-heading dnb-h--medium dnb-forms-sub-heading dnb-card--auto-indent dnb-space__top--zero dnb-space__bottom--zero"
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
          <Flex.Vertical>
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
            class="dnb-heading dnb-h--medium dnb-forms-sub-heading dnb-card--auto-indent dnb-space__top--zero dnb-space__bottom--zero"
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

      expect(element).toHaveClass('dnb-flex-container--has-size')
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

    it('should set rowGap', () => {
      const { rerender } = render(
        <Flex.Container rowGap="medium">
          <Flex.Item>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--row-gap-medium')

      rerender(
        <Flex.Container rowGap>
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

    it('should have no rowGap when false, but size on items are given', () => {
      const { rerender } = render(
        <Flex.Container>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      const element = document.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-container--has-size')
      expect(element).toHaveClass('dnb-flex-container--spacing-small')
      expect(element).toHaveClass('dnb-flex-container--row-gap-small')

      rerender(
        <Flex.Container rowGap={false}>
          <Flex.Item size={6}>FlexItem</Flex.Item>
        </Flex.Container>
      )

      expect(element).toHaveClass('dnb-flex-container--has-size')
      expect(element).toHaveClass('dnb-flex-container--spacing-small')
      expect(element).not.toHaveClass('dnb-flex-container--row-gap-small')
    })
  })
})
