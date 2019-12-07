/**
 * Screenshot Test
 * This file will not run on "test:staged" because we dont require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot
} from '../../../core/jest/jestSetupScreenshots'

describe('Button primary screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/button' })
  it('have to match primary button with href', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-anchor"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--primary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-primary"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button secondary screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/button' })
  it('have to match "dnb-button--secondary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-secondary"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--secondary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-secondary"]',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--secondary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-secondary"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--secondary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-secondary"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button tertiary screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/button' })
  it('have to match "dnb-button--tertiary"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-tertiary"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--tertiary" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-tertiary"]',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--tertiary" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-tertiary"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--tertiary" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-tertiary"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Button signal screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/button' })
  it('have to match "dnb-button--signal"', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-signal"]'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--signal" with focus state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-signal"]',
      simulate: 'focus' // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--signal" with hover state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-signal"]',
      simulate: 'hover'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
  it('have to match "dnb-button--signal" with active state', async () => {
    const screenshot = await testPageScreenshot({
      selector: '[data-dnb-test="button-signal"]',
      simulate: 'active'
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
