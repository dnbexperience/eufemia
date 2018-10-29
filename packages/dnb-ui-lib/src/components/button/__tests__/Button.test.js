/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  setupPageScreenshot,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Button'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-button.scss'

const props = fakeProps(require.resolve('../Button'), {
  optional: true
})
props.variant = 'primary'
props.icon = 'question'
props.title = 'This is a button title'
props.size = null
props.icon_position = 'right'

describe('Button component', () => {
  it('have to match default button snapshot', () => {
    const Comp = mount(<Component {...props} href={null} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match href="..." snapshot', () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has a button tag', () => {
    const title = 'title'
    const Comp = mount(<Component {...props} title={title} href={null} />)
    expect(Comp.find('button').exists()).toBe(true)
    expect(Comp.find('button').props().title).toBe(title)
  })

  it('has a button tag', () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(Comp.find('a').exists()).toBe(true)
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anker', async () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe.skip('Button screenshot', () => {
  setupPageScreenshot()

  it('have to match the primary button screenshot snapshot', async () => {
    // more info: github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
    await global.page.goto(
      'http://localhost:8000/uilib/components/button/?fullscreen#demo'
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

  it.skip('have to match the screenshot snapshot', async () => {
    // to use this test, put this first in the Button Example
    /*
    
    -> Syntax
    <div className="button-wrapper">
      <Button text="Next" variant="secondary" icon="chevron-right" />
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
      'http://localhost:8000/uilib/components/button/?fullscreen#demo'
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

describe('Button scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-button.scss'))
    expect(scss).toMatchSnapshot()
  })
})
