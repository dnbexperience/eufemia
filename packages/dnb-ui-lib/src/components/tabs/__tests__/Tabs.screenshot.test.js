/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Tabs screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/tabs/demos' })
  it('have to match the "Tablist"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the right aligned tabs', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '60rem'
      },
      selector:
        '[data-visual-test="tabs-tablist-right-aligned"] .dnb-tabs__tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match scrollable tabs', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '50rem'
      },
      selector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match last scrollable tabs', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '50rem'
      },
      selector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs',
      simulateSelector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:last-of-type button',
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match first scrollable tabs', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '50rem'
      },
      selector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs',
      simulateSelector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs__tablist .dnb-tabs__button__snap:first-of-type button',
      simulate: 'click'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match ignored scrollable tabs', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '80rem'
      },
      selector:
        '[data-visual-test="tabs-tablist-scrollable"] .dnb-tabs__tabs'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match the "Tablist" on focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs',
      style: { margin: '0 2rem' },
      simulateSelector:
        '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs__tablist',
      simulate: 'focus'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
