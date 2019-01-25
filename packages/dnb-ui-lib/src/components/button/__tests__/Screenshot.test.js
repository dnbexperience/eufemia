/**
 * Component Test
 *
 */

// import React from 'react'
import { setupPageScreenshot } from '../../../core/jest/jestSetup'

describe.skip('Button screenshot', () => {
  setupPageScreenshot({ timeout: 10e3 })

  it('have to match the primary button screenshot snapshot', async () => {
    // more info: github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
    await global.page.goto(
      'https://eufemia.dnb.no/uilib/components/button/?fullscreen#demo'
      // 'http://localhost:8000/uilib/components/button/?fullscreen#demo'
    )
    const selector =
      '.dnb-button.dnb-button--primary.dnb-button--has-text.dnb-button--has-icon'
    await global.page.waitForSelector(selector)
    const element = await global.page.$(selector)
    await element.$eval(
      '.dnb-button__text',
      node => (node.innerText = 'MASTER')
    )

    // await element.hover()
    // await element.click()
    // await element.press('Tab') // to simulate pressing tab key before focus
    // await element.focus()

    expect(await element.screenshot()).toMatchImageSnapshot()
  })

  it.skip('have to match the .button-wrapper', async () => {
    // to use this test, put this first in the Button Example
    /*

    -> Syntax
    <div className="button-wrapper">
      <Button text="Next" variant="secondary" icon="chevron_right" />
    </div>

    -> Styling
    .button-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: blue;
      height: 46px;
      padding: 0 3px;
      .dnb-button {
        margin: 0;
      }
    }
    */

    // more info: github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
    await global.page.goto(
      'https://eufemia.dnb.no/uilib/components/button/?fullscreen#demo'
      // 'http://localhost:8000/uilib/components/button/?fullscreen#demo'
    )
    await global.page.waitForSelector('.button-wrapper')
    const wrapper = await global.page.$('.button-wrapper')
    const element = await wrapper.$('button')
    await element.$eval(
      '.dnb-button__text',
      node => (node.innerText = 'MASTER')
    )
    // await element.hover()
    // await element.click()
    await element.press('Tab') // to simulate pressing tab key before focus
    await element.focus()
    expect(await wrapper.screenshot()).toMatchImageSnapshot()
  })
})
