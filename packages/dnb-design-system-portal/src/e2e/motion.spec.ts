import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import sampleMotionPoints from './shared/sampleMotionPoints'
import sampleMotionStyles from './shared/sampleMotionStyles'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
})

test('principles and motion link both ways with implementation guidance below the gallery', async ({
  page,
}) => {
  const content = page.getByRole('main')
  const implementation = content.getByRole('heading', {
    name: 'Implementation',
    exact: true,
  })
  await expect(implementation).toBeVisible()
  expect(
    await implementation.evaluate((element) =>
      Boolean(
        element.compareDocumentPosition(
          document.querySelector('.dnb-motion-demos__grid')
        ) & Node.DOCUMENT_POSITION_PRECEDING
      )
    )
  ).toBe(true)
  await expect(
    content.getByText('Looping previews', { exact: true })
  ).toHaveCount(0)
  await expect(
    content.locator('.dnb-motion-demos > .dnb-form-status')
  ).toHaveCount(0)

  await expect(
    content.getByText(/The submission study follows/)
  ).toHaveCount(0)
  for (const name of ['Timing and easing', 'Reduced motion']) {
    await expect(
      content.getByRole('heading', { name, exact: true, level: 4 })
    ).toBeVisible()
    await expect(
      content.getByRole('button', { name, exact: true })
    ).toHaveCount(0)
  }
  await expect(
    content.locator('pre').filter({ hasText: '--easing-fast-bounce' })
  ).toBeVisible()
  await expect(
    content.locator('pre').filter({ hasText: 'prefers-reduced-motion' })
  ).toBeVisible()

  await content
    .getByRole('link', { name: 'Animation Principles', exact: true })
    .click()
  await expect(page).toHaveURL(
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await expect(
    content.getByRole('heading', {
      name: 'Animation Principles',
      level: 1,
    })
  ).toBeVisible()
  await expect(content.locator('pre, .dnb-motion-demos')).toHaveCount(0)
  await expect(
    content.getByRole('heading', { name: 'Helpers to use in code' })
  ).toHaveCount(0)

  await content.getByRole('link', { name: 'Motion', exact: true }).click()
  await expect(page).toHaveURL(/\/quickguide-designer\/motion\/?$/)
  await expect(content.locator('.dnb-motion-demo')).toHaveCount(13)
})

test('animation principles can be opened directly', async ({ page }) => {
  await page.goto('/quickguide-designer/animation-principles/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Animation Principles', level: 1 })
  ).toBeVisible()
})

test('all thirteen motion studies autoplay in a loop without a pause control', async ({
  page,
}) => {
  const gallery = page.locator('.dnb-motion-demos')
  const studies = gallery.locator('.dnb-motion-demo')
  await expect(studies).toHaveCount(13)
  await expect(
    gallery.getByRole('button', {
      name: /Pause all|Resume all|Motion paused/,
    })
  ).toHaveCount(0)
  await expect(gallery.locator('.dnb-motion-demos__controls')).toHaveCount(
    0
  )
  await expect(studies.locator('button, input, a')).toHaveCount(0)
  await expect(
    studies.locator(
      '.dnb-motion-demo__stage[aria-hidden="true"][focusable="false"]'
    )
  ).toHaveCount(13)
  await expect(studies.getByRole('heading')).toHaveText([
    'Enter and exit',
    'Make room',
    'Respond to input',
    'Open from an edge',
    'Reveal the path',
    'Keep details with the row',
    'Show feedback in place',
    'Show activity',
    'Show submission',
    'Animate an illustration',
    'Animate an icon',
    'Update a bar graph',
    'Reshape a line graph',
  ])
  await expect(studies.getByText(/^(Draft|Concept)$/)).toHaveCount(0)
  await expect(
    page.locator('summary', { hasText: 'About these studies' })
  ).toHaveCount(0)
  await expect(page.getByText(/^Inspiration:/)).toHaveCount(0)

  for (const study of await studies.all()) {
    await expect(study.getByRole('heading', { level: 2 })).toBeVisible()
    const animations = await study.evaluate((element) =>
      element.getAnimations({ subtree: true }).map((animation) => ({
        state: animation.playState,
        iterations: animation.effect?.getTiming().iterations,
      }))
    )
    expect(animations.length).toBeGreaterThan(0)
    for (const animation of animations) {
      expect(animation.state).toBe('running')
      expect(animation.iterations).toBe(Infinity)
    }
  }
})

for (const width of [320, 1280]) {
  test(`fragment links reveal the study at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    for (const [id, title] of [
      ['enter-and-exit', 'Enter and exit'],
      ['animate-an-illustration', 'Animate an illustration'],
    ]) {
      await page.goto(`/quickguide-designer/motion/#${id}`)
      await waitForApp(page)
      await expect
        .poll(() =>
          page.locator(`#${id}`).evaluate((element) => {
            const scrollPadding = parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop
            )
            const scrollMargin = parseFloat(
              getComputedStyle(element).scrollMarginTop
            )

            return Math.abs(
              element.getBoundingClientRect().top -
                (scrollPadding + scrollMargin)
            )
          })
        )
        .toBeLessThan(1)

      const study = page.getByRole('figure', { name: title, exact: true })
      const stage = study.locator('.dnb-motion-demo__stage')
      const heading = study.getByRole('heading')
      await expect(stage).toBeInViewport({ ratio: 1 })
      await expect(heading).toBeInViewport({ ratio: 1 })
      expect(
        await stage.evaluate(
          (element) => element.getBoundingClientRect().top
        )
      ).toBeGreaterThanOrEqual(0)
    }
  })
}

test('each study changes visually over its timeline and repeats', async ({
  page,
}) => {
  for (const study of await page.locator('.dnb-motion-demo').all()) {
    const frames = await study.evaluate((element) => {
      const animations = element.getAnimations({ subtree: true })
      const duration = Math.max(
        ...animations.map((animation) =>
          Number(animation.effect.getTiming().duration)
        )
      )
      const sample = (time: number) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        return Array.from(element.querySelectorAll('[data-motion]')).map(
          (node) => {
            const style = getComputedStyle(node)
            return [
              style.opacity,
              style.transform,
              style.fill,
              style.strokeDashoffset,
              style.getPropertyValue('--motion-morph'),
              style.backgroundImage,
            ]
          }
        )
      }
      return {
        start: sample(400),
        timeline: [0.2, 0.3, 0.5, 0.7].map((progress) =>
          sample(duration * progress)
        ),
        repeated: sample(400 + duration),
      }
    })
    expect(frames.timeline).not.toEqual(
      frames.timeline.map(() => frames.start)
    )
    expect(frames.repeated).toEqual(frames.start)
  }
})

test('Dialog stays hidden between loops and fades smoothly as it enters, with separate backdrop timing', async ({
  page,
}) => {
  const study = page.locator('#enter-and-exit')
  const selectors = {
    dialog: '.dnb-motion-scene__dialog',
    backdrop: '.dnb-motion-scene__backdrop',
  }
  const hidden = await study.evaluate(sampleMotionStyles, {
    times: [0, 300, 599, 3500, 3999, 4000, 4300, 4599],
    selectors,
  })
  for (const { dialog, backdrop } of hidden) {
    expect(dialog.opacity).toBe(0)
    expect(backdrop.opacity).toBe(0)
  }
  const fadingIn = await study.evaluate(sampleMotionStyles, {
    times: [650, 750, 850],
    selectors,
  })
  let previousOpacity = 0
  for (const { dialog } of fadingIn) {
    expect(dialog.opacity).toBeGreaterThan(previousOpacity)
    expect(dialog.opacity).toBeLessThan(1)
    previousOpacity = dialog.opacity
  }
  const [enter, settled, exit, gone] = await study.evaluate(
    sampleMotionStyles,
    {
      times: [600, 900, 2820, 2900],
      selectors,
    }
  )
  expect(enter.dialog.transform).toBe('matrix(1, 0, 0, 1, 0, -16)')
  expect(settled.dialog.transform).toBe('matrix(1, 0, 0, 1, 0, 0)')
  expect(settled.dialog.opacity).toBe(1)
  expect(exit.dialog.transform).toBe('matrix(1, 0, 0, 1, 0, 16)')
  expect(exit.dialog.opacity).toBe(0)
  expect(exit.backdrop.opacity).toBeGreaterThan(0)
  expect(gone.backdrop.opacity).toBeCloseTo(0)
})

test('the accordion chevron morphs vertically without rotating', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-scene__chevron')
    .evaluate(sampleMotionPoints, [600, 750, 1000, 2600, 3000, 3400])

  await expect(page.locator('.dnb-motion-scene__chevron')).toHaveCSS(
    'transform',
    'none'
  )
  for (const frame of frames) {
    expect([frame[0], frame[2], frame[4]]).toEqual([-5, 0, 5])
  }
  expect(frames[0][3]).toBeGreaterThan(frames[0][1])
  expect(frames[2][3]).toBeLessThan(frames[2][1])
  expect(frames[1]).not.toEqual(frames[0])
  expect(frames[1]).not.toEqual(frames[2])
  expect(frames[3]).toEqual(frames[2])
  expect(frames[4]).not.toEqual(frames[3])
  expect(frames[5]).toEqual(frames[0])
})

test('the Drawer study opens from the right and returns to the same edge', async ({
  page,
}) => {
  await expect(
    page.getByRole('heading', { name: 'Guide attention' })
  ).toHaveCount(0)
  await expect(
    page.getByRole('heading', { name: 'Open from an edge' })
  ).toBeVisible()
  const frames = (
    await page
      .locator('.dnb-motion-scene__drawer')
      .evaluate(sampleMotionStyles, {
        times: [600, 750, 900, 2600, 2750, 2900],
      })
  ).map(({ target }) => target)
  expect(frames[0].x).toBe(136)
  expect(frames[1].x).toBeGreaterThan(0)
  expect(frames[1].x).toBeLessThan(frames[0].x)
  expect(frames[2]).toMatchObject({ x: 0, y: 0, opacity: 1 })
  expect(frames[3].x).toBeCloseTo(0)
  expect(frames[3].opacity).toBeCloseTo(1)
  expect(frames[4].x).toBeGreaterThan(0)
  expect(frames[4].x).toBeLessThan(frames[5].x)
  expect(frames[5].x).toBe(136)
  expect(frames[5].opacity).toBeCloseTo(0)
  expect(frames.every(({ y }) => y === 0)).toBe(true)
})

test('the switch uses the component bounce curve and overshoots in both directions', async ({
  page,
}) => {
  const thumb = page.locator('.dnb-motion-scene__switch-thumb')
  const motion = await thumb.evaluate((element) => {
    const animation = element.getAnimations()[0]
    return {
      easing: (animation.effect as KeyframeEffect)
        .getKeyframes()
        .map(({ easing }) => easing),
      token: new KeyframeEffect(null, [], {
        easing: getComputedStyle(element)
          .getPropertyValue('--easing-fast-bounce')
          .trim(),
      }).getTiming().easing,
    }
  })
  const [off, overshootOn, on, overshootOff, settledOff] = (
    await thumb.evaluate(sampleMotionStyles, {
      times: [600, 720, 780, 2720, 2780],
    })
  ).map(({ target }) => target.x)

  expect(motion.token).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)')
  expect(motion.easing.every((easing) => easing === motion.token)).toBe(
    true
  )
  expect(off).toBe(0)
  expect(overshootOn).toBeGreaterThan(on)
  expect(on).toBe(28)
  expect(overshootOff).toBeLessThan(off)
  expect(settledOff).toBe(0)
})

test('activity sweeps at constant speed through both phases and the loop boundary', async ({
  page,
}) => {
  const progress = page.locator('.dnb-motion-scene__progress')
  const timing = await progress.evaluate((element) => {
    const animation = element.getAnimations()[0]
    return {
      duration: animation.effect.getTiming().duration,
      easing: (animation.effect as KeyframeEffect)
        .getKeyframes()
        .map(({ easing }) => easing),
    }
  })
  expect(timing.duration).toBe(2000)
  expect(timing.easing.every((easing) => easing === 'linear')).toBe(true)

  const frames = (
    await page
      .locator('.dnb-motion-demo')
      .filter({ has: progress })
      .evaluate(sampleMotionStyles, {
        times: [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000],
        selectors: {
          progress: '.dnb-motion-scene__progress',
          wipe: '.dnb-motion-scene__progress-wipe',
        },
      })
  ).map(({ progress, wipe }) => [
    progress.strokeDashoffset,
    wipe.strokeDashoffset,
  ])
  expect(frames[0]).toEqual([100, 100])
  expect(frames[2][1]).toBe(100)
  expect(frames[4][0]).toBeCloseTo(1 / Math.PI)
  expect(frames[4][1]).toBeCloseTo(100)
  expect(frames[6][0]).toBeCloseTo(frames[4][0])
  expect(frames[6][1]).toBeCloseTo(frames[2][0])
  expect(frames[8]).toEqual(frames[0])
  const sweep = 100 - 1 / Math.PI
  const distances = frames.map(([dark, light], index) =>
    index === 8 ? 2 * sweep : 200 - dark - light
  )
  distances.slice(1).forEach((distance, index) => {
    expect(distance - distances[index]).toBeCloseTo(sweep / 4, 3)
  })
  await expect(page.locator('.dnb-motion-scene__complete')).toHaveCount(0)
})

test('breadcrumb items slide locally with the component stagger', async ({
  page,
}) => {
  const breadcrumb = page.locator('.dnb-motion-scene__breadcrumb')
  const delays = await breadcrumb
    .locator('.dnb-motion-scene__breadcrumb-item')
    .evaluateAll((items) =>
      items.map((item) => item.getAnimations()[0].effect.getTiming().delay)
    )
  const [start, stagger, open, closed] = (
    await breadcrumb.evaluate(sampleMotionStyles, {
      times: [600, 650, 1100, 3100],
      selectors: {
        home: '.dnb-motion-scene__breadcrumb-item:nth-of-type(1)',
        accounts: '.dnb-motion-scene__breadcrumb-item:nth-of-type(2)',
        account: '.dnb-motion-scene__breadcrumb-item:nth-of-type(3)',
      },
    })
  ).map((frame) => Object.values(frame).map(({ x }) => x))
  expect(delays).toEqual([0, 50, 100])
  expect(start).toEqual([-16, -16, -16])
  expect(stagger[0]).toBeGreaterThan(-16)
  expect(stagger.slice(1)).toEqual([-16, -16])
  open.forEach((x) => expect(x).toBeCloseTo(0))
  expect(closed).toEqual(start)
})

for (const scene of ['expansion', 'table']) {
  test(`${scene} paragraphs fade and slide subtly inside the expanding area`, async ({
    page,
  }) => {
    const content = page.locator(`.dnb-motion-scene__${scene}-content`)
    const frames = (
      await content.evaluate(sampleMotionStyles, {
        times: [600, 800, 1000, 1100, 2400, 2800, 3100],
      })
    ).map(({ target }) => target)
    expect(frames[0].y).toBe(-10)
    expect(frames[0].opacity).toBe(0)
    for (const index of [1, 2, 5]) {
      expect(frames[index].y).toBeGreaterThan(-10)
      expect(frames[index].y).toBeLessThan(0)
      expect(frames[index].opacity).toBeGreaterThan(0)
      expect(frames[index].opacity).toBeLessThan(1)
    }
    for (const index of [3, 4]) {
      expect(frames[index].y).toBeCloseTo(0)
      expect(frames[index].opacity).toBeCloseTo(1)
    }
    expect(frames[6]).toEqual(frames[0])
    frames.forEach(({ scaleX, scaleY }) => {
      expect(scaleX).toBe(1)
      expect(scaleY).toBe(1)
    })
    expect(
      await content.evaluate((element) =>
        element.parentElement.getAttribute('clip-path')
      )
    ).toMatch(/^url\(#.+\)$/)
  })
}

test('Make room clips paragraphs to its expanding background', async ({
  page,
}) => {
  const study = page.locator('#expand-and-collapse')
  const [backgroundBounds, clipBounds] = await study
    .locator(
      '.dnb-motion-scene__expansion-fill, .dnb-motion-scene__expansion-clip'
    )
    .evaluateAll((elements) =>
      elements.map((element) =>
        ['x', 'y', 'width', 'height'].map((name) =>
          element.getAttribute(name)
        )
      )
    )
  expect(clipBounds).toEqual(backgroundBounds)
  const frames = await study.evaluate(sampleMotionStyles, {
    times: [600, 800, 1000, 2800, 3000, 3400],
    selectors: {
      background: '.dnb-motion-scene__expansion-fill',
      clip: '.dnb-motion-scene__expansion-clip',
    },
  })
  frames.forEach(({ background, clip }) => {
    expect(clip.transform).toBe(background.transform)
    expect(clip.origin).toBe(background.origin)
  })
})

test('table details settle after the row has made room without scaling the text', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-scene__table')
    .evaluate(sampleMotionStyles, {
      times: [600, 800, 1000, 1100, 2600, 3000, 3100],
      selectors: {
        clip: '.dnb-motion-scene__disclosure-clip',
        following: '.dnb-motion-scene__disclosure-following',
        content: '.dnb-motion-scene__table-content',
      },
    })
  expect(frames[0].clip.height).toBe(0)
  expect(frames[0].content.y).toBe(-10)
  expect(frames[1].clip.height).toBeGreaterThan(0)
  expect(frames[1].clip.height).toBeLessThan(64)
  expect(frames[2].clip.height).toBe(64)
  expect(frames[2].content.y).toBeLessThan(0)
  expect(frames[3].content.y).toBeCloseTo(0)
  expect(frames[4].clip.height).toBeCloseTo(64)
  expect(frames[5].clip.height).toBeCloseTo(0)
  expect(frames[6].content.y).toBe(-10)
  frames.forEach(({ clip, following, content }) => {
    expect(following.y).toBeCloseTo(clip.height)
    expect(content.scaleY).toBe(1)
  })
})

test('TextCounter changes its message immediately and makes room for the warning icon', async ({
  page,
}) => {
  const frames = (
    await page
      .locator('.dnb-motion-demo')
      .filter({ has: page.locator('.dnb-motion-scene__counter-icon') })
      .evaluate(sampleMotionStyles, {
        times: [500, 601, 800, 1000, 2601, 2800, 3000],
        selectors: {
          icon: '.dnb-motion-scene__counter-icon',
          width: '.dnb-motion-scene__counter-width',
          gap: '.dnb-motion-scene__counter-gap',
          error: '.dnb-motion-scene__counter-error',
          normal: '.dnb-motion-scene__counter-normal',
        },
      })
  ).map(({ icon, width, gap, error, normal }) => ({
    icon: icon.scaleX,
    width: width.x,
    gap: gap.x,
    error: error.opacity,
    normal: normal.opacity,
  }))
  expect(frames[0]).toEqual({
    icon: 0,
    width: 0,
    gap: 0,
    error: 0,
    normal: 1,
  })
  expect(frames[1].icon).toBeCloseTo(0)
  expect(frames[1].width).toBeCloseTo(0)
  expect(frames[1].gap).toBeCloseTo(0)
  expect(frames[1].error).toBe(1)
  expect(frames[1].normal).toBe(0)
  expect(frames[2].gap).toBe(8)
  expect(frames[2].icon).toBeGreaterThan(0)
  expect(frames[2].icon).toBeLessThan(1)
  expect(frames[3]).toEqual({
    icon: 1,
    width: 16,
    gap: 8,
    error: 1,
    normal: 0,
  })
  expect(frames[4].error).toBe(0)
  expect(frames[4].normal).toBe(1)
  expect(frames[5].gap).toBeCloseTo(0)
  expect(frames[6]).toEqual(frames[0])
  frames.forEach(({ width, icon }) => {
    expect(width).toBeCloseTo(icon * 16)
  })
})

test('the complete DNB house remains visible and stationary', async ({
  page,
}) => {
  const artwork = page.locator(
    'svg.dnb-motion-scene__illustration-artwork'
  )
  await expect(artwork).toHaveCount(1)
  await expect(artwork).toHaveAttribute(
    'preserveAspectRatio',
    'xMidYMid meet'
  )
  await expect(artwork.locator('image')).toHaveCount(0)
  const dimensions = await artwork.evaluate((element: SVGSVGElement) => ({
    natural: [
      element.viewBox.baseVal.width,
      element.viewBox.baseVal.height,
    ],
    rendered: [element.width.baseVal.value, element.height.baseVal.value],
  }))
  expect(dimensions).toEqual({
    natural: [523, 250],
    rendered: [261.5, 125],
  })

  for (const selector of [
    '.dnb-motion-scene__illustration-body',
    '.dnb-motion-scene__illustration-details',
    '.dnb-motion-scene__illustration-roof',
    '.dnb-motion-scene__garage',
  ]) {
    await expect(artwork.locator(selector)).toHaveCount(1)
  }
  await expect(
    artwork.locator('.dnb-motion-scene__illustration-windows')
  ).toHaveCount(2)
  await expect(
    artwork.locator('.dnb-motion-scene__illustration-greenery')
  ).toHaveCount(2)
  await expect(artwork.locator('[data-motion]')).toHaveCount(1)
  await expect(artwork.locator('[data-motion]')).toHaveClass(
    /dnb-motion-scene__garage-door/
  )

  const masks = await artwork.evaluate((element) =>
    Array.from(element.querySelectorAll('g[mask]')).map((group) => {
      const id = group.getAttribute('mask').slice(5, -1)
      const matches = Array.from(document.querySelectorAll('[id]')).filter(
        (node) => node.id === id
      )
      return {
        unique: matches.length === 1,
        local: element.contains(matches[0]),
        type: matches[0] ? getComputedStyle(matches[0]).maskType : null,
      }
    })
  )
  expect(masks).toHaveLength(7)
  masks.forEach((mask) =>
    expect(mask).toEqual({ unique: true, local: true, type: 'alpha' })
  )

  const clipId = await artwork.locator('clipPath').getAttribute('id')
  await expect(
    artwork.locator('.dnb-motion-scene__garage')
  ).toHaveAttribute('clip-path', `url(#${clipId})`)
  expect(
    await artwork
      .locator('clipPath rect')
      .evaluate((element) =>
        ['x', 'y', 'width', 'height'].map((name) =>
          element.getAttribute(name)
        )
      )
  ).toEqual(['105.921', '183.7', '112', '65'])

  const frames = (
    await artwork.evaluate(sampleMotionStyles, {
      times: [0, 1300, 2000, 2700, 4000],
      selectors: {
        artwork: ':scope',
        body: '.dnb-motion-scene__illustration-body',
        roof: '.dnb-motion-scene__illustration-roof',
        details: '.dnb-motion-scene__illustration-details',
        left: '.dnb-motion-scene__illustration-greenery--left',
        right: '.dnb-motion-scene__illustration-greenery--right',
      },
    })
  ).map((frame) =>
    Object.values(frame).map(
      ({ opacity, x, y, scaleX, scaleY, bounds }) => ({
        opacity,
        x,
        y,
        scaleX,
        scaleY,
        bounds,
      })
    )
  )
  frames.forEach((frame) => {
    expect(frame).toEqual(frames[0])
    frame.forEach(({ opacity }) => {
      expect(opacity).toBe(1)
    })
  })
})

test('the garage door opens, closes, and repeats over four seconds', async ({
  page,
}) => {
  const door = page.locator('.dnb-motion-scene__garage-door')
  await expect(door).toHaveCount(1)
  await expect(door).toHaveCSS('animation-duration', '4s')
  await expect(door).toHaveCSS('animation-iteration-count', 'infinite')

  const frames = (
    await door.evaluate(sampleMotionStyles, {
      times: [0, 1000, 1300, 1600, 2400, 2700, 3000, 4000, 5600],
    })
  ).map(({ target }) => ({
    opacity: target.opacity,
    x: target.x,
    y: target.y,
    scaleX: target.scaleX,
    scaleY: target.scaleY,
  }))

  for (const index of [0, 1, 6, 7]) {
    expect(frames[index].y).toBeCloseTo(0)
  }
  for (const index of [3, 4, 8]) {
    expect(frames[index].y).toBeCloseTo(-52)
  }
  for (const index of [2, 5]) {
    expect(frames[index].y).toBeGreaterThan(-52)
    expect(frames[index].y).toBeLessThan(0)
  }
  frames.forEach(({ opacity, x, scaleX, scaleY }) => {
    expect(opacity).toBe(1)
    expect(x).toBe(0)
    expect(scaleX).toBe(1)
    expect(scaleY).toBe(1)
  })
  expect(frames[7]).toEqual(frames[0])
  expect(frames[8]).toEqual(frames[3])
})

test('the Eufemia bell rings with diminishing swings inside a stationary circle', async ({
  page,
}) => {
  const study = page.locator('.dnb-motion-demo').filter({
    has: page.locator('.dnb-motion-scene__icon'),
  })
  const icon = study.locator('.dnb-icon svg')
  await expect(icon).toHaveCount(1)
  await expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
  await expect(icon.locator('path')).toHaveAttribute('d', /^M10 21\.75/)
  const frames = (
    await study.evaluate(sampleMotionStyles, {
      times: [600, 720, 880, 1040, 1200, 1360, 1520, 2400],
      selectors: {
        icon: '.dnb-motion-scene__icon',
        circle: '.dnb-motion-scene__icon-background',
        glyph: '.dnb-motion-scene__icon svg',
      },
    })
  ).map(({ icon, circle, glyph }) => ({
    ...icon,
    circle: circle.bounds,
    glyph: glyph.bounds,
  }))
  const angles = [0, -16, 14, -10, 6, -3, 0, 0]
  frames.forEach(({ x, y, angle, scale, opacity, circle }, index) => {
    expect(x).toBe(0)
    expect(y).toBe(0)
    expect(angle).toBeCloseTo(angles[index])
    expect(scale).toBeCloseTo(1)
    expect(opacity).toBe(1)
    expect(circle).toEqual(frames[0].circle)
  })
  expect(frames[0].glyph.width / frames[0].circle.width).toBeCloseTo(0.5)
  expect(frames[0].glyph.height / frames[0].glyph.width).toBeCloseTo(1)
})

test('bar values interpolate in both directions without moving the baseline or axes', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-demo')
    .filter({ has: page.locator('.dnb-motion-scene__graph-bar') })
    .evaluate((element) => {
      const bars = Array.from(
        element.querySelectorAll<SVGRectElement>(
          '.dnb-motion-scene__graph-bar'
        )
      )
      const axes = element.querySelector('.dnb-motion-scene__graph-axes')
      return [600, 850, 1100, 2600, 3100].map((time) => {
        const values = bars.map((bar) => {
          const animation = bar.getAnimations()[0]
          animation.pause()
          animation.currentTime = time
          const style = getComputedStyle(bar)
          const transform = new DOMMatrix(style.transform)
          const originY = parseFloat(style.transformOrigin.split(' ')[1])
          return {
            height: bar.height.baseVal.value * transform.m22,
            baseline:
              (bar.y.baseVal.value + bar.height.baseVal.value - originY) *
                transform.m22 +
              originY +
              transform.m42,
            x: bar.x.baseVal.value,
            width: bar.width.baseVal.value * transform.m11,
          }
        })
        const { x, y, width, height } = axes.getBoundingClientRect()
        return { values, axes: { x, y, width, height } }
      })
    })
  const before = [35, 55, 40, 65]
  const after = [55, 40, 75, 85]
  frames.forEach(({ values, axes }) => {
    expect(axes).toEqual(frames[0].axes)
    values.forEach(({ height, baseline, x, width }, index) => {
      expect(baseline).toBeCloseTo(180)
      expect(x).toBe(96 + index * 52)
      expect(width).toBe(28)
      expect(height).toBeGreaterThanOrEqual(
        Math.min(before[index], after[index]) * 1.12 - 0.001
      )
      expect(height).toBeLessThanOrEqual(
        Math.max(before[index], after[index]) * 1.12 + 0.001
      )
    })
  })
  before.forEach((value, index) => {
    expect(frames[0].values[index].height).toBeCloseTo(value * 1.12)
    expect(frames[2].values[index].height).toBeCloseTo(after[index] * 1.12)
    expect(frames[3].values[index].height).toBeCloseTo(after[index] * 1.12)
    expect(frames[4].values[index].height).toBeCloseTo(value * 1.12)
    expect(frames[1].values[index].height).not.toBeCloseTo(value * 1.12)
  })
})

test('the line graph preserves dates and interpolates values without overshooting', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-scene__graph-line')
    .evaluate(sampleMotionPoints, [600, 850, 1100, 2600, 3100])
  const before = [96, 150, 160, 125, 224, 139, 288, 105]
  const after = [96, 125, 160, 139, 224, 91, 288, 77]
  expect(frames[0]).toEqual(before)
  expect(frames[2]).toEqual(after)
  expect(frames[4]).toEqual(before)
  expect(frames[1]).not.toEqual(before)
  expect(frames[1]).not.toEqual(after)
  frames.forEach((points) => {
    points.forEach((value, index) => {
      if (index % 2 === 0) {
        expect(value).toBe(before[index])
      } else {
        expect(value).toBeGreaterThanOrEqual(
          Math.min(before[index], after[index])
        )
        expect(value).toBeLessThanOrEqual(
          Math.max(before[index], after[index])
        )
      }
    })
  })
})

test('the submit button keeps its label and shape while a tapered border rotates', async ({
  page,
}) => {
  const study = page
    .locator('.dnb-motion-demo')
    .filter({ has: page.locator('.dnb-motion-scene__submit-glow') })
  await expect(study).toHaveCSS('padding-bottom', '8px')
  await expect(
    study.locator('.dnb-motion-scene__submit-label')
  ).toHaveText('Send')
  const result = await study.evaluate((element) => {
    const glow = element.querySelector('.dnb-motion-scene__submit-glow')
    const button = element.querySelector<SVGRectElement>(
      '.dnb-motion-scene__submit-button'
    )
    const viewport = element.querySelector('foreignObject')
    const cutout = element.querySelector<SVGRectElement>(
      '.dnb-motion-scene__submit-cutout'
    )
    const paragraph = element
      .querySelector('.dnb-motion-scene__muted')
      .getBoundingClientRect()
    const lines = element
      .querySelector('.dnb-motion-scene__lines')
      .getBoundingClientRect()
    const animation = glow.getAnimations()[0]
    animation.pause()
    const style = getComputedStyle(glow)
    const frames = [0, 375, 750, 1125, 1500].map((time) => {
      animation.currentTime = time
      const { x, y, width, height } = button.getBoundingClientRect()
      return {
        angle: parseFloat(
          getComputedStyle(glow).getPropertyValue('--motion-submit-angle')
        ),
        button: { x, y, width, height },
      }
    })
    return {
      duration: animation.effect.getTiming().duration,
      easing: style.animationTimingFunction,
      radius: style.borderRadius,
      mask: style.maskImage,
      gradient: style.backgroundImage,
      cutout: {
        x: cutout.x.baseVal.value - viewport.x.baseVal.value,
        y: cutout.y.baseVal.value - viewport.y.baseVal.value,
        width: cutout.width.baseVal.value,
        height: cutout.height.baseVal.value,
        radius: cutout.rx.baseVal.value,
      },
      cutoutFill: getComputedStyle(cutout).fill,
      surfaceFill: getComputedStyle(
        element.querySelector('.dnb-motion-scene__surface')
      ).fill,
      paragraphPadding: {
        top: lines.top - paragraph.top,
        bottom: paragraph.bottom - lines.bottom,
      },
      gap: {
        x: button.x.baseVal.value - viewport.x.baseVal.value,
        y: button.y.baseVal.value - viewport.y.baseVal.value,
      },
      frames,
    }
  })
  expect(result.duration).toBe(1500)
  expect(result.easing).toBe('linear')
  expect(result.radius).toBe('24px')
  expect(result.mask).toBe('none')
  expect(result.cutout).toEqual({
    x: 2,
    y: 2,
    width: 116,
    height: 44,
    radius: 22,
  })
  expect(result.cutoutFill).toBe(result.surfaceFill)
  expect(result.gradient).toContain('conic-gradient')
  expect(result.paragraphPadding.bottom).toBeGreaterThanOrEqual(
    result.paragraphPadding.top
  )
  for (const stop of ['25%', '45%', '55%', '75%']) {
    expect(result.gradient).toContain(stop)
  }
  expect(result.gap).toEqual({ x: 4, y: 4 })
  result.frames.forEach(({ angle, button }, index) => {
    expect(angle).toBeCloseTo((index % 4) * 90)
    expect(button).toEqual(result.frames[0].button)
  })
})

for (const width of [320, 1600]) {
  test(`reduced-motion FormStatus fits at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const gallery = page.locator('.dnb-motion-demos')
    const notice = gallery.locator('.dnb-form-status--warning')
    await expect(notice).toHaveText(
      'Reduced motion: showing still illustrations.'
    )
    await expect(notice).toBeVisible()
    const noticeBounds = await notice.boundingBox()
    expect(noticeBounds.x).toBeGreaterThanOrEqual(0)
    expect(noticeBounds.x + noticeBounds.width).toBeLessThanOrEqual(width)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(notice).toHaveCount(0)
  })
}

test('reduced motion prevents autoplay and shows meaningful stills', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await waitForApp(page)
  const gallery = page.locator('.dnb-motion-demos')
  await expect(
    gallery.getByRole('button', { name: 'Motion paused' })
  ).toHaveCount(0)
  await expect(gallery).toContainText(
    'Reduced motion: showing still illustrations.'
  )
  expect(
    await gallery
      .locator('.dnb-motion-demos__grid')
      .evaluate(
        (element) => element.getAnimations({ subtree: true }).length
      )
  ).toBe(0)
  for (const selector of [
    'dialog',
    'expansion-content',
    'drawer',
    'progress',
    'submit-glow',
    'table-content',
    'breadcrumb-item',
    'counter-error',
    'illustration-artwork',
    'illustration-greenery',
    'illustration-body',
    'illustration-roof',
    'illustration-details',
    'illustration-windows',
    'garage',
    'garage-door',
    'icon',
    'graph-bar',
    'graph-line',
  ]) {
    for (const element of await gallery
      .locator(`.dnb-motion-scene__${selector}`)
      .all()) {
      await expect(element).toHaveCSS('opacity', '1')
      await expect(element).toHaveCSS('animation-name', 'none')
    }
  }
  await expect(gallery.locator('.dnb-motion-scene__progress')).toHaveCSS(
    'stroke-dashoffset',
    '25px'
  )
  await expect(
    gallery.locator('.dnb-motion-scene__progress-wipe')
  ).toHaveCSS('stroke-dashoffset', '100px')
  await expect(
    gallery.locator('.dnb-motion-scene__counter-normal')
  ).toHaveCSS('opacity', '0')
  await expect(
    gallery.locator('.dnb-motion-scene__switch-thumb')
  ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 28, 0)')
  await expect(
    gallery.locator('.dnb-motion-scene__following-row')
  ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 72)')
  await expect(gallery.locator('.dnb-motion-scene__chevron')).toHaveCSS(
    'transform',
    'none'
  )
  expect(
    (
      await gallery
        .locator('.dnb-motion-scene__chevron')
        .evaluate(sampleMotionPoints, null)
    )[0][3]
  ).toBe(-2)
  for (const [selector, height] of [
    ['table', 64],
    ['breadcrumb', 104],
  ] as const) {
    await expect(
      gallery.locator(
        `.dnb-motion-scene__${selector} .dnb-motion-scene__disclosure-clip`
      )
    ).toHaveCSS('height', `${height}px`)
  }
  await expect(
    gallery.locator('.dnb-motion-scene__counter-icon')
  ).toHaveCSS('transform', 'none')
  for (const scene of ['expansion', 'table']) {
    await expect(
      gallery.locator(`.dnb-motion-scene__${scene}-content`)
    ).toHaveCSS('transform', 'none')
  }
  await expect(
    gallery.locator('.dnb-motion-scene__counter-width')
  ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 16, 0)')
  await expect(
    gallery.locator('.dnb-motion-scene__illustration-artwork')
  ).toHaveCSS('transform', 'none')
  for (const part of [
    'illustration-body',
    'illustration-roof',
    'garage-door',
  ]) {
    await expect(gallery.locator(`.dnb-motion-scene__${part}`)).toHaveCSS(
      'transform',
      'none'
    )
  }
  for (const greenery of await gallery
    .locator('.dnb-motion-scene__illustration-greenery')
    .all()) {
    await expect(greenery).toHaveCSS('transform', 'none')
  }
  await expect(gallery.locator('.dnb-motion-scene__icon')).toHaveCSS(
    'transform',
    'none'
  )
  for (const bar of await gallery
    .locator('.dnb-motion-scene__graph-bar')
    .all()) {
    await expect(bar).toHaveCSS('transform', 'none')
  }
  const line = await gallery
    .locator('.dnb-motion-scene__graph-line')
    .evaluate(sampleMotionPoints, null)
  expect(line[0]).toEqual([96, 125, 160, 139, 224, 91, 288, 77])
  await expect(
    gallery.locator('.dnb-motion-scene__submit-glow')
  ).toHaveCSS('--motion-submit-angle', '0deg')
  await expect(
    gallery.locator('.dnb-motion-scene__submit-glow')
  ).toHaveCSS('background-image', /conic-gradient/)

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(gallery.locator('.dnb-motion-scene__dialog')).toHaveCSS(
    'animation-play-state',
    'running'
  )
  await expect(gallery.locator('.dnb-motion-scene__dialog')).not.toHaveCSS(
    'animation-name',
    'none'
  )
})

for (const width of [320, 640, 641, 768, 1280]) {
  test(`study captions switch sides at the small-screen breakpoint at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    const captions = await page
      .locator('.dnb-motion-demo')
      .evaluateAll((studies) =>
        studies.map((study) => {
          const caption = study.querySelector('figcaption')
          const heading = caption.querySelector('h2')
          const description = caption.querySelector('p')
          const stage = study.querySelector('.dnb-motion-demo__stage')
          return {
            captionFirst: study.firstElementChild === caption,
            figureTop: study.getBoundingClientRect().top,
            headingBottom: heading.getBoundingClientRect().bottom,
            descriptionTop: description.getBoundingClientRect().top,
            descriptionBottom: description.getBoundingClientRect().bottom,
            captionTop: caption.getBoundingClientRect().top,
            captionBottom: caption.getBoundingClientRect().bottom,
            stageTop: stage.getBoundingClientRect().top,
            stageBottom: stage.getBoundingClientRect().bottom,
          }
        })
      )
    expect(captions).toHaveLength(13)
    for (const caption of captions) {
      expect(caption.captionFirst).toBe(true)
      expect(caption.headingBottom).toBeLessThanOrEqual(
        caption.descriptionTop
      )
      if (width <= 640) {
        expect(caption.descriptionBottom).toBeLessThan(caption.stageTop)
        expect(caption.captionBottom).toBeLessThan(caption.stageTop)
      } else {
        expect(caption.stageBottom).toBeLessThan(caption.captionTop)
        expect(caption.stageTop).toBe(caption.figureTop)
      }
    }
  })

  test(`illustrations fit at ${width}px without moving the document`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    const gallery = page.locator('.dnb-motion-demos')
    await expect(gallery).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
    const geometry = await gallery.evaluate((element) => {
      const animations = element.getAnimations({ subtree: true })
      const sample = (time: number) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        return Array.from(
          element.querySelectorAll('.dnb-motion-demo__stage')
        ).map((stage) => {
          const { x, y, width, height } = stage.getBoundingClientRect()
          return { x, y, width, height }
        })
      }
      return { before: sample(0), after: sample(1800) }
    })
    expect(geometry.after).toEqual(geometry.before)
    geometry.after.forEach((stage) => {
      expect(stage.width / stage.height).toBeCloseTo(1.5, 1)
      expect(stage.x).toBeGreaterThanOrEqual(0)
      expect(stage.x + stage.width).toBeLessThanOrEqual(width)
    })
    const assets = await gallery
      .locator(
        '.dnb-motion-scene__illustration-artwork, .dnb-motion-scene__icon svg'
      )
      .evaluateAll((elements: SVGSVGElement[]) =>
        elements.map((element) => {
          let { x, y, width, height } = element.getBoundingClientRect()
          const isHouse = element.classList.contains(
            'dnb-motion-scene__illustration-artwork'
          )
          if (isHouse) {
            // Nested SVG bounds include masked paths; measure the viewport.
            const transform = element.ownerSVGElement.getScreenCTM()
            const origin = new DOMPoint(
              element.x.baseVal.value,
              element.y.baseVal.value
            )
            const start = origin.matrixTransform(transform)
            const end = new DOMPoint(
              origin.x + element.width.baseVal.value,
              origin.y + element.height.baseVal.value
            ).matrixTransform(transform)
            x = start.x
            y = start.y
            width = end.x - start.x
            height = end.y - start.y
          }
          const stage = element
            .closest('.dnb-motion-demo__stage')
            .getBoundingClientRect()
          return {
            x: x - stage.x,
            y: y - stage.y,
            width,
            height,
            stageWidth: stage.width,
            stageHeight: stage.height,
            ratio: isHouse ? 523 / 250 : 1,
          }
        })
      )
    expect(assets).toHaveLength(2)
    assets.forEach((asset) => {
      expect(asset.width).toBeGreaterThan(0)
      expect(asset.width / asset.height).toBeCloseTo(asset.ratio)
      expect(asset.x).toBeGreaterThanOrEqual(0)
      expect(asset.y).toBeGreaterThanOrEqual(0)
      expect(asset.x + asset.width).toBeLessThanOrEqual(asset.stageWidth)
      expect(asset.y + asset.height).toBeLessThanOrEqual(asset.stageHeight)
    })
    if (width === 320) {
      expect(geometry.after[0].y).toBeLessThan(geometry.after[1].y)
    } else if (width === 1280) {
      expect(geometry.after[0].y).toBe(geometry.after[1].y)
    }
  })
}
