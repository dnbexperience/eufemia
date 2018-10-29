/**
 * Storybook Entry
 *
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import PerformanceTest from '../src/uilib/performance-test/PerformanceTest'

storiesOf('First Story', module).add('Hello', () => <div>Hello</div>)

storiesOf('UI Library', module).add('Performance Test', () => (
  <PerformanceTest />
))
