/**
 * Dl Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Dl, { DlAllProps } from '../Dl'
import Dt, { DtProps } from '../../Dt'
import Dd, { DdProps } from '../../Dd'

describe('Dl', () => {
  it('renders with props as an object', () => {
    const props: DlAllProps = {}
    render(<Dl {...props} />)

    expect(document.querySelector('.dnb-dl')).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(
      <Dl top="medium" direction="horizontal">
        <Dl.Item top="medium">
          <Dt top="medium">Term</Dt>
          <Dd top="medium">Description</Dd>
        </Dl.Item>
      </Dl>
    )

    const element = document.querySelector('.dnb-dl')

    expect(Array.from(element.classList)).toEqual([
      'dnb-dl__direction--horizontal',
      'dnb-space__top--medium',
      'dnb-dl',
    ])
    expect(Array.from(element.querySelector('dt').classList)).toEqual([
      'dnb-space__top--medium',
      'dnb-dt',
    ])
    expect(Array.from(element.querySelector('dd').classList)).toEqual([
      'dnb-space__top--medium',
      'dnb-dd',
    ])
    expect(
      Array.from(element.querySelector('.dnb-dl__item').classList)
    ).toEqual(['dnb-dl__item', 'dnb-space__top--medium', 'dnb-dd'])
  })

  describe('in horizontal direction', () => {
    it('should validate with ARIA rules', async () => {
      const Component = render(
        <Dl direction="horizontal">
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
        <Dl direction="horizontal">
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
