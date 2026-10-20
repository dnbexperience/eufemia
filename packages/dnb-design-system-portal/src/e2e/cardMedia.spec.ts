import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('card demo code starts collapsed', async ({ page }) => {
  await page.goto('/uilib/components/card/demos/')
  const toggles = page.getByRole('button', { name: 'Code', exact: true })
  expect(await toggles.count()).toBeGreaterThan(10)
  for (const toggle of await toggles.all()) {
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  }
})

test('composed close control dismisses the card and restores focus after animation', async ({
  page,
}) => {
  await page.goto('/uilib/components/card/demos/#closable-info-card')
  await waitForApp(page)
  const close = page.getByRole('button', { name: 'Dismiss savings tip' })
  await close.press('Enter')
  await expect(
    page.locator('[data-visual-test="card-info-close"] .dnb-card')
  ).toHaveCount(0)
  await expect(page.locator('#graphic-and-centered-layouts')).toBeFocused()
})

test('card controls have visible surfaces and centered icons', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const button = page.locator(
    '[data-visual-test="card-media-video"] .dnb-card__media-button'
  )
  const geometry = await button.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height,
    }
  })
  expect(geometry).toEqual({ width: 32, height: 32 })
  const close = page.getByRole('button', { name: 'Dismiss savings tip' })
  for (const control of [button, close]) {
    const background = await control.evaluate(
      (element) => getComputedStyle(element).backgroundColor
    )
    expect(background).not.toBe('rgba(0, 0, 0, 0)')
    expect(background).not.toBe('transparent')
  }
  await expect(close).toHaveCSS('width', '24px')
  await expect(close).toHaveCSS('height', '24px')
  const closeIcon = close.locator('svg')
  await expect(closeIcon).toHaveCSS('width', '16px')
  await expect(closeIcon).toHaveCSS('height', '16px')
  const icon = button.locator('.dnb-icon')
  await expect(icon).toHaveClass(/dnb-icon--transition-fallback/)
  for (const state of ['play', 'pause']) {
    if (state === 'pause') {
      await button.click()
    }
    const active = button.locator(`svg[data-icon-state="${state}"]`)
    await expect(active).toHaveClass(/dnb-icon__state--active/)
    await expect
      .poll(() =>
        active.evaluate((svg) => {
          const rect = svg.getBoundingClientRect()
          const button = svg.closest('button').getBoundingClientRect()
          return Math.max(
            Math.abs(
              rect.left + rect.width / 2 - button.left - button.width / 2
            ),
            Math.abs(
              rect.top + rect.height / 2 - button.top - button.height / 2
            )
          )
        })
      )
      .toBeLessThanOrEqual(1)
  }
})

test('card controls have a 44px hit area outside their visible circles', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  await waitForApp(page)
  const example = page.locator('[data-visual-test="card-media-video"]')
  const video = example.locator('video')
  const media = example.locator('.dnb-card__media-button')
  const close = example.locator('.dnb-card__close-button')

  for (const control of [media, close]) {
    await control.scrollIntoViewIfNeeded()
    const bounding = control.locator('.dnb-button__bounding')
    await expect(bounding).toBeVisible()
    const rect = await bounding.boundingBox()
    expect(rect.width).toBeCloseTo(44, 0)
    expect(rect.height).toBeCloseTo(44, 0)
    await page.mouse.click(rect.x + 2, rect.y + rect.height / 2)
    if (control === media) {
      await expect(video).toHaveJSProperty('paused', false)
    } else {
      await expect(example.locator('.dnb-card')).toHaveCount(0)
    }
  }
})

test('card controls show interaction outlines on hover, press, and keyboard focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  await waitForApp(page)
  const controls = page.locator(
    '[data-visual-test="card-media-video"] .dnb-card__media-button, [data-visual-test="card-media-video"] .dnb-card__close-button'
  )
  await expect(controls).toHaveCount(2)

  for (const control of await controls.all()) {
    const shadow = () =>
      control.evaluate(
        (element) => getComputedStyle(element, '::before').boxShadow
      )

    await control.hover()
    await expect.poll(shadow).toMatch(/0px 0px 0px 2px/)
    await page.mouse.down()
    await expect.poll(shadow).toMatch(/0px 0px 0px 1px inset/)
    await page.mouse.move(0, 0)
    await page.mouse.up()
    await control.blur()
    await page.keyboard.press('Tab')
    await control.focus()
    await expect(control).toBeFocused()
    await expect.poll(shadow).toMatch(/0px 0px 0px 4px/)
    await control.press('Tab')
  }
})

test('video autoplays unless reduced motion is enabled and pauses when the preference changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const example = page.locator('[data-visual-test="card-media-video"]')
  const video = example.locator('video')
  await expect(video).toHaveJSProperty('paused', false)
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(video).toHaveJSProperty('paused', true)
  const pausedTime = await video.evaluate(
    (v: HTMLVideoElement) => v.currentTime
  )
  await example
    .getByRole('button', { name: 'Play background video' })
    .click()
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(pausedTime)
  await example
    .getByRole('button', { name: 'Pause background video' })
    .click()
  await expect(video).toHaveJSProperty('paused', true)
})

test('the video close button dismisses the card and restores focus', async ({
  page,
}) => {
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const example = page.locator('[data-visual-test="card-media-video"]')
  const close = example.getByRole('button', { name: 'Dismiss video card' })
  await expect(close).toBeVisible()
  const geometry = await example.locator('.dnb-card').evaluate((card) => {
    const rect = card.getBoundingClientRect()
    const video = card.querySelector('video').getBoundingClientRect()
    const close = card
      .querySelector('.dnb-card__close-button')
      .getBoundingClientRect()
    return {
      widthDifference: Math.abs(rect.width - video.width),
      right: rect.right - close.right,
      top: close.top - rect.top,
    }
  })
  expect(geometry.widthDifference).toBeLessThanOrEqual(1)
  expect(geometry.right).toBeCloseTo(16, 0)
  expect(geometry.top).toBeCloseTo(16, 0)
  await close.press('Enter')
  await expect(example.locator('video')).toHaveCount(0)
  await expect(example.locator('.dnb-card')).toHaveCount(0)
  await expect(page.locator('#full-media-with-video')).toBeFocused()
})

test('poster uses the video first frame before playback', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const video = page.locator('[data-visual-test="card-media-video"] video')
  await expect(video).toHaveAttribute(
    'poster',
    '/media/card/savings-poster.webp'
  )
})

test('the supplied overlay keeps content readable and controls interactive', async ({
  page,
}) => {
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const overlay = page.locator(
    '[data-visual-test="card-media-video"] .dnb-card__overlay'
  )
  await expect(overlay).toHaveCSS('position', 'relative')
  await expect(overlay.getByRole('heading')).toHaveCSS(
    'text-shadow',
    'rgba(0, 0, 0, 0.25) 0px 0px 13px'
  )
  await expect(overlay.locator('p')).toHaveCSS(
    'text-shadow',
    'rgba(0, 0, 0, 0.25) 0px 0px 2px'
  )
  await expect(
    overlay.getByRole('link', { name: 'Start sparing' })
  ).toHaveCSS('text-shadow', 'none')
  await expect(
    page.locator('[data-visual-test="card-media-centered"] h2')
  ).toHaveCSS('text-shadow', 'none')
  const gradient = await overlay.evaluate(
    (element) => getComputedStyle(element, '::before').backgroundImage
  )
  expect(gradient).toContain('linear-gradient')
  await expect(overlay.locator('.dnb-card__overlay-blur')).toHaveAttribute(
    'aria-hidden',
    'true'
  )
  await expect(
    overlay.locator('.dnb-card__overlay-blur > span')
  ).toHaveCount(4)
  await overlay.getByRole('link', { name: 'Start sparing' }).click()
  await expect(page).toHaveURL(/#info-card-layout$/)
})

test('replacing the video with the same ref keeps the control in sync', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/uilib/components/card/visual-tests/media-replacement/')
  const fixture = page.locator(
    '[data-visual-test="card-media-replacement"]'
  )
  const video = fixture.locator('video')
  await expect(video).toHaveJSProperty('paused', false)
  await fixture.getByRole('button', { name: 'Replace video' }).click()
  await expect(video).toHaveAttribute('data-generation', '1')
  await expect(video).toHaveJSProperty('paused', false)
  await fixture
    .getByRole('button', { name: 'Pause background video' })
    .click()
  await expect(video).toHaveJSProperty('paused', true)
  await expect(
    fixture.getByRole('button', { name: 'Play background video' })
  ).toBeVisible()
})

for (const width of [375, 1280]) {
  test(`media cards fit and adapt to their available width at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/uilib/components/card/demos/#image-beside-content')
    const example = page.locator('[data-visual-test="card-media-image"]')
    const image = example.locator('img')
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        image.evaluate((img: HTMLImageElement) => img.naturalWidth)
      )
      .toBeGreaterThan(0)

    const checkLayout = async (stacked: boolean) => {
      const geometry = await example
        .locator('.dnb-card')
        .evaluate((card) => {
          const content = card.querySelector('h2').getBoundingClientRect()
          const image = card.querySelector('img').getBoundingClientRect()
          return {
            stacked: image.bottom <= content.top,
            fits: image.right <= card.getBoundingClientRect().right + 1,
            noOverflow: card.scrollWidth <= card.clientWidth + 1,
          }
        })
      expect(geometry).toEqual({ stacked, fits: true, noOverflow: true })
    }
    await checkLayout(width < 600)

    if (width > 600) {
      await example.locator('.dnb-card').evaluate((card: HTMLElement) => {
        card.style.width = '320px'
      })
      await checkLayout(true)
    }

    const centered = page.locator(
      '[data-visual-test="card-media-centered"] .dnb-card'
    )
    expect(
      await centered.evaluate((card) => card.getBoundingClientRect().width)
    ).toBeLessThanOrEqual(344)
    const linked = centered.getByRole('link', { name: 'Start sparing' })
    await linked.focus()
    await expect(linked).toBeFocused()
    expect(
      await linked.evaluate((element) => {
        const card = element.closest('.dnb-card')
        return {
          focusVisible: element.matches(':focus-visible'),
          overflow: getComputedStyle(card).overflow,
          controls: element.querySelectorAll('a,button,input').length,
        }
      })
    ).toEqual({ focusVisible: true, overflow: 'visible', controls: 0 })
    await linked.press('Enter')
    await expect(page).toHaveURL(/#info-card-layout$/)
  })
}

test('background video starts on request and supports keyboard pause and resume', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const requests: string[] = []
  page.on('request', (request) => {
    if (request.url().endsWith('.mp4')) {
      requests.push(request.url())
    }
  })
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const example = page.locator('[data-visual-test="card-media-video"]')
  const video = example.locator('video')
  await expect(video).toHaveJSProperty('paused', true)
  expect(requests).toHaveLength(0)

  const play = example.getByRole('button', {
    name: 'Play background video',
  })
  await play.press('Enter')
  await expect(video).toHaveJSProperty('paused', false)
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0)
  await expect(video).toHaveJSProperty('muted', true)
  const pauseIcon = example.locator('button svg[data-icon-state="pause"]')
  await expect(pauseIcon).toHaveClass(/dnb-icon__state--active/)
  const pause = example.getByRole('button', {
    name: 'Pause background video',
  })
  await pause.press('Space')
  await expect(video).toHaveJSProperty('paused', true)
  await expect(play).toBeFocused()
  await play.press('Enter')
  await expect(video).toHaveJSProperty('paused', false)
  await pause.click()
  await expect(video).toHaveJSProperty('paused', true)
})

test('video failure retains the poster, text, and independent action', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route('**/media/card/savings-loop.mp4', (route) =>
    route.abort()
  )
  await page.goto('/uilib/components/card/demos/#full-media-with-video')
  const example = page.locator('[data-visual-test="card-media-video"]')
  await example
    .getByRole('button', { name: 'Play background video' })
    .click()
  await expect(example.getByRole('status')).toContainText(
    'Videoen kunne ikke spilles av'
  )
  await expect(example.locator('video')).toHaveCSS('visibility', 'hidden')
  await expect(
    example.locator('img[src="/media/card/savings-poster.webp"]')
  ).toBeVisible()
  await expect(
    example.getByRole('heading', { name: 'Spar til noe uventet' })
  ).toBeVisible()
  await example.getByRole('link', { name: 'Start sparing' }).click()
  await expect(page).toHaveURL(/#info-card-layout$/)
})
