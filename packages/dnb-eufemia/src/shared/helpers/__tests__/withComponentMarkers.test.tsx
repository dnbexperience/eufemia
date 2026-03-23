import React from 'react'
import { render } from '@testing-library/react'
import withComponentMarkers from '../withComponentMarkers'
import type { ComponentMarkers } from '../withComponentMarkers'
import {
  isHeadingElement,
  getSpaceVariant,
} from '../../../components/flex/utils'
import FieldBlock from '../../../extensions/forms/FieldBlock/FieldBlock'
import Flex from '../../../components/flex/Flex'
import { createSpacingClasses } from '../../../components/space/SpacingHelper'
import type { SpacingProps } from '../../../components/space/types'

describe('withComponentMarkers', () => {
  it('should set _formElement marker', () => {
    function MyComponent(): null {
      return null
    }

    withComponentMarkers(MyComponent, {
      _formElement: true,
    })

    expect((MyComponent as ComponentMarkers)._formElement).toBe(true)
  })

  it('should set _supportsSpacingProps to true', () => {
    function MyComponent(): null {
      return null
    }

    withComponentMarkers(MyComponent, {
      _supportsSpacingProps: true,
    })

    expect((MyComponent as ComponentMarkers)._supportsSpacingProps).toBe(
      true
    )
  })

  it('should set _supportsSpacingProps to "children"', () => {
    function MyComponent(): null {
      return null
    }

    withComponentMarkers(MyComponent, {
      _supportsSpacingProps: 'children',
    })

    expect((MyComponent as ComponentMarkers)._supportsSpacingProps).toBe(
      'children'
    )
  })

  it('should set _supportsSpacingProps to false', () => {
    function MyComponent(): null {
      return null
    }

    withComponentMarkers(MyComponent, {
      _supportsSpacingProps: false,
    })

    expect((MyComponent as ComponentMarkers)._supportsSpacingProps).toBe(
      false
    )
  })

  it('should set _isHeadingElement marker', () => {
    function MyHeading(): null {
      return null
    }

    withComponentMarkers(MyHeading, {
      _isHeadingElement: true,
    })

    expect((MyHeading as ComponentMarkers)._isHeadingElement).toBe(true)
  })

  it('should set multiple markers at once', () => {
    function MyFormComponent(): null {
      return null
    }

    withComponentMarkers(MyFormComponent, {
      _formElement: true,
      _supportsSpacingProps: true,
    })

    expect((MyFormComponent as ComponentMarkers)._formElement).toBe(true)
    expect(
      (MyFormComponent as ComponentMarkers)._supportsSpacingProps
    ).toBe(true)
    expect(
      (MyFormComponent as ComponentMarkers)._isHeadingElement
    ).toBeUndefined()
  })

  it('should mutate the same function reference', () => {
    function MyComponent(): null {
      return null
    }

    const ref = MyComponent

    withComponentMarkers(MyComponent, {
      _formElement: true,
    })

    expect(MyComponent).toBe(ref)
  })

  it('should work with React element type checking', () => {
    function MyComponent() {
      return React.createElement('div')
    }

    withComponentMarkers(MyComponent, {
      _formElement: true,
      _supportsSpacingProps: true,
    })

    const element = React.createElement(MyComponent)

    // Simulates how FieldBlock and flex/utils read markers
    expect(
      (element.type as unknown as Record<string, unknown>)['_formElement']
    ).toBe(true)
    expect(
      (element.type as unknown as Record<string, unknown>)[
        '_supportsSpacingProps'
      ]
    ).toBe(true)
  })

  it('should work with class components', () => {
    class MyClassComponent extends React.Component {
      render(): null {
        return null
      }
    }

    withComponentMarkers(MyClassComponent, {
      _supportsSpacingProps: true,
    })

    expect(
      (MyClassComponent as ComponentMarkers)._supportsSpacingProps
    ).toBe(true)
  })

  describe('_formElement behavior', () => {
    it('should cause FieldBlock to render fieldset/legend when two marked children are present', () => {
      function MockInput() {
        return <input />
      }
      withComponentMarkers(MockInput, { _formElement: true })

      render(
        <FieldBlock label="Legend">
          <MockInput />
          <MockInput />
        </FieldBlock>
      )

      expect(document.querySelector('fieldset')).toBeInTheDocument()
      expect(document.querySelector('legend')).toBeInTheDocument()
    })

    it('should not render fieldset/legend when only one marked child is present', () => {
      function MockInput() {
        return <input />
      }
      withComponentMarkers(MockInput, { _formElement: true })

      render(
        <FieldBlock label="Label">
          <MockInput />
        </FieldBlock>
      )

      expect(document.querySelector('fieldset')).not.toBeInTheDocument()
      expect(document.querySelector('legend')).not.toBeInTheDocument()
      expect(document.querySelector('label')).toBeInTheDocument()
    })

    it('should not render fieldset/legend when children are not marked', () => {
      function PlainComponent() {
        return <div>plain</div>
      }

      render(
        <FieldBlock label="Label">
          <PlainComponent />
          <PlainComponent />
        </FieldBlock>
      )

      expect(document.querySelector('fieldset')).not.toBeInTheDocument()
      expect(document.querySelector('legend')).not.toBeInTheDocument()
    })
  })

  describe('_supportsSpacingProps behavior', () => {
    it('should apply spacing classes directly when _supportsSpacingProps is true', () => {
      function TestItem(props: SpacingProps) {
        const cn = createSpacingClasses(props)
        cn.push('test-item')
        return <div className={cn.join(' ')}>content</div>
      }
      withComponentMarkers(TestItem, { _supportsSpacingProps: true })

      render(
        <Flex.Vertical>
          <TestItem />
          <TestItem />
        </Flex.Vertical>
      )

      // When _supportsSpacingProps is true, no wrapping Space element is added
      const items = document.querySelectorAll('.test-item')
      expect(items).toHaveLength(2)

      // Spacing classes are applied directly to the component's root
      items.forEach((item) => {
        expect(item.className).toMatch(/dnb-space__top/)
        expect(item.className).toMatch(/dnb-space__bottom/)
      })

      // No extra wrapping Space elements
      expect(
        document.querySelectorAll('.dnb-space:not(.dnb-flex-container)')
      ).toHaveLength(0)
    })

    it('should wrap with Space element when _supportsSpacingProps is not set', () => {
      function TestItem() {
        return <div className="test-item">content</div>
      }

      render(
        <Flex.Vertical>
          <TestItem />
          <TestItem />
        </Flex.Vertical>
      )

      const items = document.querySelectorAll('.test-item')
      expect(items).toHaveLength(2)

      // Each item should be wrapped in a Space element
      items.forEach((item) => {
        expect(item.parentElement!.className).toMatch(/dnb-space/)
      })
    })

    it('should not apply any spacing when _supportsSpacingProps is false', () => {
      function NoSpaceItem() {
        return <div className="no-space-item">content</div>
      }
      withComponentMarkers(NoSpaceItem, { _supportsSpacingProps: false })

      render(
        <Flex.Vertical>
          <NoSpaceItem />
        </Flex.Vertical>
      )

      const item = document.querySelector('.no-space-item')
      // The element should not be wrapped in a Space
      expect(item!.parentElement!.className).toMatch(/dnb-flex-container/)
    })

    it('should pass spacing to children when _supportsSpacingProps is "children"', () => {
      function ChildItem(props: SpacingProps) {
        const cn = createSpacingClasses(props)
        cn.push('child-item')
        return <div className={cn.join(' ')}>child</div>
      }
      withComponentMarkers(ChildItem, { _supportsSpacingProps: true })

      function WrapperComponent({
        children,
      }: {
        children: React.ReactNode
      }) {
        return <div className="wrapper">{children}</div>
      }
      withComponentMarkers(WrapperComponent, {
        _supportsSpacingProps: 'children',
      })

      render(
        <Flex.Vertical>
          <WrapperComponent>
            <ChildItem />
            <ChildItem />
          </WrapperComponent>
        </Flex.Vertical>
      )

      // The children inside the wrapper should get their own Flex.Container
      const childItems = document.querySelectorAll('.child-item')
      expect(childItems).toHaveLength(2)

      // The wrapper's children are managed by a nested flex container
      const nestedContainers = document.querySelectorAll(
        '.dnb-flex-container'
      )
      expect(nestedContainers.length).toBeGreaterThan(1)
    })

    it('should be detected by getSpaceVariant', () => {
      function MarkedTrue() {
        return <div>content</div>
      }
      withComponentMarkers(MarkedTrue, { _supportsSpacingProps: true })

      function MarkedFalse() {
        return <div>content</div>
      }
      withComponentMarkers(MarkedFalse, { _supportsSpacingProps: false })

      function MarkedChildren() {
        return <div>content</div>
      }
      withComponentMarkers(MarkedChildren, {
        _supportsSpacingProps: 'children',
      })

      function Unmarked() {
        return <div>content</div>
      }

      expect(getSpaceVariant(<MarkedTrue />)).toBe(true)
      expect(getSpaceVariant(<MarkedFalse />)).toBe(false)
      expect(getSpaceVariant(<MarkedChildren />)).toBe('children')
      expect(getSpaceVariant(<Unmarked />)).toBeFalsy()
    })
  })

  describe('_isHeadingElement behavior', () => {
    it('should be detected by isHeadingElement', () => {
      function MyHeading() {
        return <h2>heading</h2>
      }
      withComponentMarkers(MyHeading, { _isHeadingElement: true })

      expect(isHeadingElement(<MyHeading />)).toBe(true)
    })

    it('should not detect unmarked components as heading elements', () => {
      function NotAHeading() {
        return <div>not a heading</div>
      }

      expect(isHeadingElement(<NotAHeading />)).toBe(false)
    })

    it('should not add divider line below marked heading in Flex.Container', () => {
      function MyHeading({ children }: { children: React.ReactNode }) {
        return <h2>{children}</h2>
      }
      withComponentMarkers(MyHeading, {
        _isHeadingElement: true,
        _supportsSpacingProps: true,
      })

      render(
        <Flex.Vertical divider="line">
          <MyHeading>Heading</MyHeading>
          <div>content</div>
        </Flex.Vertical>
      )

      // The heading should not have a bottom border / divider line
      const heading = document.querySelector('h2')
      expect(heading!.parentElement!.className).not.toMatch(
        /dnb-flex-container__divider/
      )
    })
  })
})
