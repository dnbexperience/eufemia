/**
 * Dl Test
 *
 */

import { axeComponent } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { Theme } from '../../../shared'
import type { DlAllProps } from '../Dl'
import Dl from '../Dl'
import Ol from '../Ol'
import Ul from '../Ul'
import Li from '../Li'
import type { DtProps } from '../../Dt'
import Dt from '../../Dt'
import type { DdProps } from '../../Dd'
import Dd from '../../Dd'

describe('lists surface', () => {
  it.each([
    ['Ul', (<Ul key="ul" />) as React.ReactElement, '.dnb-ul'],
    ['Ol', (<Ol key="ol" />) as React.ReactElement, '.dnb-ol'],
    ['Dl', (<Dl key="dl" />) as React.ReactElement, '.dnb-dl'],
  ])(
    '%s does not apply dark surface class by default',
    (_, list, selector) => {
      render(list)

      const element = document.querySelector(selector)

      expect(
        element.classList.contains(`${selector.slice(1)}--surface-dark`)
      ).toBe(false)
    }
  )

  it.each([
    [
      'Ul',
      (
        <Ul key="ul">
          <Li>Item</Li>
        </Ul>
      ) as React.ReactElement,
      '.dnb-ul',
    ],
    [
      'Ol',
      (
        <Ol key="ol">
          <Li>Item</Li>
        </Ol>
      ) as React.ReactElement,
      '.dnb-ol',
    ],
    [
      'Dl',
      (
        <Dl key="dl">
          <Dt>Term</Dt>
          <Dd>Description</Dd>
        </Dl>
      ) as React.ReactElement,
      '.dnb-dl',
    ],
  ])(
    '%s applies dark surface class from Theme.Context',
    (_, list, selector) => {
      render(<Theme.Context surface="dark">{list}</Theme.Context>)

      const element = document.querySelector(selector)

      expect(
        element.classList.contains(`${selector.slice(1)}--surface-dark`)
      ).toBe(true)
    }
  )
})

describe('Dl', () => {
  it('renders with props as an object', () => {
    const props: DlAllProps = {}
    render(<Dl {...props} />)

    expect(document.querySelector('.dnb-dl')).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(
      <Dl top="medium" layout="horizontal">
        <Dl.Item top="medium">
          <Dt top="medium">Term</Dt>
          <Dd top="medium">Description</Dd>
        </Dl.Item>
      </Dl>
    )

    const element = document.querySelector('.dnb-dl')

    expect(Array.from(element.classList)).toEqual([
      'dnb-dl__layout--horizontal',
      'dnb-dl',
      'dnb-space__top--medium',
    ])
    expect(Array.from(element.querySelector('dt').classList)).toEqual([
      'dnb-dt',
      'dnb-space__top--medium',
    ])
    expect(Array.from(element.querySelector('dd').classList)).toEqual([
      'dnb-dd',
      'dnb-space__top--medium',
    ])
    expect(
      Array.from(element.querySelector('.dnb-dl__item').classList)
    ).toEqual(['dnb-dl__item', 'dnb-dd', 'dnb-space__top--medium'])
  })

  describe('in horizontal direction', () => {
    it('should validate with ARIA rules', async () => {
      const Component = render(
        <Dl layout="horizontal">
          <Dl.Item>
            <Dt>Term</Dt>
            <Dd>Description</Dd>
          </Dl.Item>
          <Dl.Item>
            <Dt>Term</Dt>
            <Dd>Description</Dd>
          </Dl.Item>
        </Dl>
      )
      expect(await axeComponent(Component)).toHaveNoViolations()
    })

    it('should have aria-hidden on item', async () => {
      render(
        <Dl layout="horizontal">
          <Dl.Item>
            <Dt>Term</Dt>
            <Dd>Description</Dd>
          </Dl.Item>
        </Dl>
      )
      expect(
        document.querySelector('.dnb-dl__item').getAttribute('aria-hidden')
      ).toBe('true')
    })
  })

  describe('with nested Dls', () => {
    it('should validate with ARIA rules', async () => {
      const Component = render(
        <Dl>
          <Dt>Term</Dt>
          <Dd>Description</Dd>
          <Dd>
            <Dl>
              <Dt>Term</Dt>
              <Dd>Description</Dd>
            </Dl>
          </Dd>
        </Dl>
      )
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('Dt', () => {
    it('renders with props as an object', () => {
      const props: DtProps = {}
      render(<Dt {...props} />)

      expect(document.querySelector('.dnb-dt')).toBeInTheDocument()
    })
  })

  describe('Dd', () => {
    it('renders with props as an object', () => {
      const props: DdProps = { children: 'children' }
      render(<Dd {...props} />)

      expect(document.querySelector('.dnb-dd')).toBeInTheDocument()
    })
  })
})
