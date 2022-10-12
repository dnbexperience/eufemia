/**
 * Dl Test
 *
 */

import React from 'react'
import { axeComponent } from '../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Dl from '../Dl'
import Dt from '../Dt'
import Dd from '../Dd'

describe('Dl', () => {
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
})
