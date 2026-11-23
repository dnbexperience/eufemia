import { test, expect } from '@playwright/test'
import { compileString } from 'sass'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import AnimatedDigits from '../AnimatedDigits'

let css: string

test.beforeAll(() => {
  css = compileString(`@use '../style/dnb-animated-digits.scss';`, {
    loadPaths: [__dirname],
  }).css
})

test('preserves copied text and digit order in left-to-right and right-to-left pages', async ({
  page,
}) => {
  const value = '+1 234,50'
  const markup = renderToStaticMarkup(
    createElement(AnimatedDigits, { value, previousValue: '+99,50' })
  )
  for (const direction of ['ltr', 'rtl']) {
    await page.setContent(
      `<style>${css}</style><p dir="${direction}">Balance ${markup} kr</p>`
    )
    const paragraph = page.locator('p')
    const copied = await paragraph.evaluate((element) => {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.selectAllChildren(element)
      return selection.toString()
    })
    expect(copied).toBe(`Balance ${value} kr`)

    expect(
      await paragraph.evaluate(() => {
        window.getSelection().removeAllRanges()
        return (
          window as unknown as {
            find: (
              text: string,
              matchCase: boolean,
              backwards: boolean,
              wrap: boolean
            ) => boolean
          }
        ).find('+1 234,50', false, false, true)
      })
    ).toBe(true)

    const positions = await paragraph
      .locator('.dnb-animated-digits__character')
      .evaluateAll((digits) =>
        digits.map((digit) => digit.getBoundingClientRect().x)
      )
    expect(positions).toEqual([...positions].sort((a, b) => a - b))

    await expect(paragraph).toMatchAriaSnapshot(
      '- paragraph: Balance +1 234,50 kr'
    )

    const bounds = await paragraph
      .locator('.dnb-animated-digits__viewport')
      .evaluate((viewport: HTMLElement) => {
        viewport.style.width = '2ch'
        const content = viewport.firstElementChild.getBoundingClientRect()
        const box = viewport.getBoundingClientRect()
        return { contentRight: content.right, viewportRight: box.right }
      })
    expect(bounds.contentRight).toBeCloseTo(bounds.viewportRight, 1)
  }

  const reserved = renderToStaticMarkup(
    createElement(AnimatedDigits, { value: '+28', reserveWidth: '10ch' })
  )
  await page.setContent(
    `<style>${css}</style><p style="text-align:left">${reserved}</p><p style="text-align:right">${reserved}</p>`
  )
  for (const paragraph of await page.locator('p').all()) {
    const bounds = await paragraph.evaluate((element) => {
      const root = element
        .querySelector('.dnb-animated-digits')
        .getBoundingClientRect()
      const viewport = element
        .querySelector('.dnb-animated-digits__viewport')
        .getBoundingClientRect()
      const prefix = element
        .querySelector('.dnb-animated-digits__visual > span')
        .getBoundingClientRect()
      return {
        aligned:
          getComputedStyle(element).textAlign === 'right'
            ? root.right - viewport.right
            : root.left - viewport.left,
        prefix: prefix.left - viewport.left,
      }
    })
    expect(bounds.aligned).toBeCloseTo(0, 1)
    expect(bounds.prefix).toBeCloseTo(0, 1)
  }

  const shrinking = renderToStaticMarkup(
    createElement(AnimatedDigits, {
      value: '+28',
      previousValue: '+1 999',
    })
  )
  await page.setContent(
    `<style>${css}</style><p style="text-align:right">${shrinking} kr</p>`
  )
  const bounds = await page
    .locator('.dnb-animated-digits')
    .evaluate((element) => {
      const animation = element.animate(
        [{ width: '6ch' }, { width: '3ch' }],
        160
      )
      animation.pause()
      animation.currentTime = 80
      const viewport = element
        .querySelector('.dnb-animated-digits__viewport')
        .getBoundingClientRect()
      const content = element
        .querySelector('.dnb-animated-digits__content')
        .getBoundingClientRect()
      return { viewportRight: viewport.right, contentRight: content.right }
    })
  expect(bounds.contentRight).toBeCloseTo(bounds.viewportRight, 1)
})

test('preserves formatted wrapping and complete values in forced colors', async ({
  page,
}) => {
  const digits = renderToStaticMarkup(
    createElement(AnimatedDigits, { value: '+28', previousValue: '+199' })
  )
  await page.setContent(`<style>${css}</style>
    <p>${digits} kr</p>
    <span class="dnb-animated-digits__formatted dnb-animated-digits__formatted--fluid">
      <span class="dnb-animated-digits__formatted-text">NOK −28,00</span>
      <span class="dnb-animated-digits__formatted-visual" aria-hidden="true">${digits}</span>
    </span>
    <div style="width:160px;font-size:24px">
      <p id="plain-date">31. desember 2026</p>
      <p id="animated-date"><span class="dnb-animated-digits__formatted"><span class="dnb-animated-digits__formatted-text">31. desember 2026</span><span class="dnb-animated-digits__formatted-visual" aria-hidden="true">${renderToStaticMarkup(createElement(AnimatedDigits, { value: '31', decorative: true }))}<span class="dnb-animated-digits__formatted-literal" data-text=". desember "></span>${renderToStaticMarkup(createElement(AnimatedDigits, { value: '2026', decorative: true }))}</span></span></p>
    </div>`)
  const plainHeight = await page
    .locator('#plain-date')
    .evaluate((element) => element.getBoundingClientRect().height)
  expect(
    await page
      .locator('#animated-date')
      .evaluate((element) => element.getBoundingClientRect().height)
  ).toBeCloseTo(plainHeight, 1)
  await expect(page.locator('#animated-date')).toMatchAriaSnapshot(
    '- paragraph: 31. desember 2026'
  )
  const copied = await page
    .locator('#animated-date')
    .evaluate((element) => {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.selectAllChildren(element)
      return selection.toString()
    })
  expect(copied).toBe('31. desember 2026')
  for (const forcedColors of ['active', 'none', 'active'] as const) {
    await page.emulateMedia({ forcedColors })
    const active = forcedColors === 'active'
    await expect(
      page.locator(
        'p > .dnb-animated-digits > .dnb-animated-digits__visual'
      )
    ).toHaveCSS('display', active ? 'none' : 'block')
    await expect(
      page.locator(
        '.dnb-animated-digits__formatted--fluid > .dnb-animated-digits__formatted-visual'
      )
    ).toHaveCSS('display', active ? 'none' : 'inline-block')
    await expect(
      page.locator(
        '.dnb-animated-digits__formatted--fluid > .dnb-animated-digits__formatted-text'
      )
    ).toHaveCSS('position', active ? 'static' : 'absolute')
    expect(
      await page
        .locator('#animated-date')
        .evaluate((element) => element.getBoundingClientRect().height)
    ).toBeCloseTo(plainHeight, 1)
  }
})

test('prints only the final value after an update', async ({ page }) => {
  const markup = renderToStaticMarkup(
    createElement(AnimatedDigits, { value: '28', previousValue: '199' })
  )
  await page.setContent(
    `<style>${css} @media print { * { animation: none !important; } }</style>${markup}`
  )
  await page.emulateMedia({ media: 'print' })
  for (const outgoing of await page
    .locator(
      '.dnb-animated-digits__previous, .dnb-animated-digits__removed'
    )
    .all()) {
    await expect(outgoing).toBeHidden()
  }
})

test('disables digit rolling and removal when reduced motion is enabled or changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setContent(`
    <style>${css}</style>
    ${(['up', 'down'] as const)
      .map((direction) =>
        renderToStaticMarkup(
          createElement(AnimatedDigits, {
            value: '2',
            previousValue: '−11',
            direction,
          })
        )
      )
      .join('')}
  `)

  for (const reducedMotion of [
    'reduce',
    'no-preference',
    'reduce',
  ] as const) {
    await page.emulateMedia({ reducedMotion })

    for (const [direction, suffix] of [
      ['up', ''],
      ['down', '-down'],
    ]) {
      const digits = page.locator(`.dnb-animated-digits--${direction}`)
      const value = digits.locator('.dnb-animated-digits__value')
      const previous = digits.locator('.dnb-animated-digits__previous')
      const removed = digits.locator('.dnb-animated-digits__removed')
      const reduced = reducedMotion === 'reduce'

      await expect(
        digits.locator('.dnb-animated-digits__text')
      ).toHaveText('2')
      await expect(
        digits.locator('.dnb-animated-digits__visual')
      ).toHaveCSS('display', reduced ? 'none' : 'block')
      await expect(value).toHaveAttribute('data-text', '2')
      await expect(value).toHaveCSS(
        'animation-name',
        reduced ? 'none' : `dnb-animated-digits-in${suffix}`
      )
      await expect(previous).toHaveCSS(
        'animation-name',
        reduced ? 'none' : `dnb-animated-digits-out${suffix}`
      )
      await expect(previous).toHaveCSS(
        'display',
        reduced ? 'none' : 'block'
      )
      await expect(removed).toHaveCSS(
        'animation-name',
        reduced ? 'none' : 'dnb-animated-digits-remove'
      )
      await expect(removed).toHaveCSS(
        'display',
        reduced ? 'none' : 'block'
      )
    }
  }
})
