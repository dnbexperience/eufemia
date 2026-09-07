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
          document.querySelector('.dnb-motion-demos')
        ) & Node.DOCUMENT_POSITION_PRECEDING
      )
    )
  ).toBe(true)
  await expect(
    content.getByText('Looping previews', { exact: true })
  ).toHaveCount(0)
  await expect(content.locator('.dnb-motion-demos__hint')).toHaveCount(0)

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
    /\/quickguide-designer\/principles\/animations\/?$/
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
  await page.goto('/quickguide-designer/principles/animations/')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Animation Principles', level: 1 })
  ).toBeVisible()
})

test('all thirteen motion studies autoplay in a loop with one shared control', async ({
  page,
}) => {
  const gallery = page.locator('.dnb-motion-demos')
  const studies = gallery.locator('.dnb-motion-demo')
  await expect(studies).toHaveCount(13)
  await expect(gallery.getByRole('button')).toHaveCount(1)
  await expect(
    gallery.getByRole('button', { name: 'Pause all' })
  ).toBeVisible()
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
  test(`fragment links reveal the study below the toolbar at ${width}px`, async ({
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
            const offset = Math.max(
              100,
              parseFloat(getComputedStyle(element).scrollMarginTop)
            )
            return Math.abs(element.getBoundingClientRect().top - offset)
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
          (element) =>
            element.getBoundingClientRect().top -
            document
              .querySelector('.dnb-motion-demos__controls')
              .getBoundingClientRect().bottom
        )
      ).toBeGreaterThanOrEqual(0)
    }
  })

  test(`pause controls remain reachable beside lower studies at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    const gallery = page.locator('.dnb-motion-demos')
    const studies = gallery.locator('.dnb-motion-demo')
    const pause = gallery.getByRole('button', { name: 'Pause all' })

    for (const study of [studies.nth(9), studies.last()]) {
      await study.scrollIntoViewIfNeeded()
      await expect(pause).toBeInViewport({ ratio: 1 })
      await pause.click()
      await expect(gallery).toHaveAttribute('data-paused', 'true')
      await expect(study).toBeInViewport()
      await gallery.getByRole('button', { name: 'Resume all' }).click()
    }
  })
}

test('pause freezes every illustration and resume continues without restarting', async ({
  page,
}) => {
  const gallery = page.locator('.dnb-motion-demos')
  const pause = gallery.getByRole('button', { name: 'Pause all' })
  await pause.focus()
  await page.keyboard.press('Enter')
  const resume = gallery.getByRole('button', { name: 'Resume all' })
  await expect(resume).toBeFocused()

  const paused = await gallery.evaluate(async (element) => {
    const animations = element
      .querySelector('.dnb-motion-demos__grid')
      .getAnimations({ subtree: true })
    await Promise.all(animations.map((animation) => animation.ready))
    const times = animations.map((animation) => animation.currentTime)
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    )
    return {
      states: animations.map((animation) => animation.playState),
      dialogTime: element
        .querySelector('.dnb-motion-scene__dialog')
        .getAnimations()[0].currentTime,
      times,
      later: animations.map((animation) => animation.currentTime),
    }
  })
  expect(paused.states.every((state) => state === 'paused')).toBe(true)
  expect(paused.later).toEqual(paused.times)

  await page.keyboard.press('Enter')
  await expect(pause).toBeFocused()
  await expect
    .poll(() =>
      gallery
        .locator('.dnb-motion-scene__dialog')
        .evaluate((element) =>
          Number(element.getAnimations()[0].currentTime)
        )
    )
    .toBeGreaterThan(Number(paused.dialogTime))
  expect(
    await gallery
      .locator('.dnb-motion-demos__grid')
      .evaluate((element) =>
        element
          .getAnimations({ subtree: true })
          .every((animation) => animation.playState === 'running')
      )
  ).toBe(true)
})

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

test('the DNB house stays still while greenery slides a short distance from both sides', async ({
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
  const dimensions = await artwork.evaluate(
    async (element: SVGSVGElement) => {
      const image = new Image()
      image.src = element.querySelector('image').href.baseVal
      await image.decode()
      return {
        natural: [image.naturalWidth, image.naturalHeight],
        rendered: [
          element.width.baseVal.value,
          element.height.baseVal.value,
        ],
      }
    }
  )
  expect(dimensions).toEqual({
    natural: [523, 250],
    rendered: [261.5, 125],
  })
  await expect(
    artwork.locator('.dnb-motion-scene__illustration-greenery')
  ).toHaveCount(2)
  await expect(artwork.locator('[data-motion]')).toHaveCount(7)
  expect(
    await artwork.evaluate((element) => element.getAnimations().length)
  ).toBe(0)
  const stage = await artwork.evaluate((element) => {
    const { x, y, width, height } = element
      .closest('.dnb-motion-demo__stage')
      .getBoundingClientRect()
    return { x, y, width, height }
  })
  const frames = (
    await artwork.evaluate(sampleMotionStyles, {
      times: [300, 650, 1000, 2400, 2800, 3200],
      selectors: {
        artwork: ':scope',
        house: 'image',
        left: '.dnb-motion-scene__illustration-greenery--left',
        right: '.dnb-motion-scene__illustration-greenery--right',
      },
    })
  ).map(({ artwork, house, left, right }) => ({
    greenery: [left, right],
    opacity: artwork.opacity,
    house: house.bounds,
  }))
  expect(frames[0].greenery.map(({ x }) => x)).toEqual([-16, 16])
  for (const index of [1, 4]) {
    expect(frames[index].greenery[0].x).toBeGreaterThan(-16)
    expect(frames[index].greenery[0].x).toBeLessThan(0)
    expect(frames[index].greenery[1].x).toBeLessThan(16)
    expect(frames[index].greenery[1].x).toBeGreaterThan(0)
    frames[index].greenery.forEach(({ opacity }) => {
      expect(opacity).toBeGreaterThan(0)
      expect(opacity).toBeLessThan(1)
    })
  }
  for (const index of [2, 3]) {
    frames[index].greenery.forEach(({ x, opacity }) => {
      expect(x).toBeCloseTo(0)
      expect(opacity).toBeCloseTo(1)
    })
  }
  expect(frames[5]).toEqual(frames[0])
  frames.forEach(({ opacity, house, greenery }) => {
    expect(opacity).toBe(1)
    expect(house).toEqual(frames[0].house)
    greenery.forEach(({ y, scaleX, bounds }) => {
      expect(y).toBe(0)
      expect(scaleX).toBe(1)
      expect(bounds.x).toBeGreaterThanOrEqual(stage.x)
      expect(bounds.y).toBeGreaterThanOrEqual(stage.y)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(
        stage.x + stage.width
      )
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(
        stage.y + stage.height
      )
    })
  })
})

test('the front wall fades in first and disappears last', async ({
  page,
}) => {
  const artwork = page.locator('.dnb-motion-scene__illustration-artwork')
  await expect(
    artwork.locator('.dnb-motion-scene__illustration-body')
  ).toHaveCount(1)
  const frames = (
    await artwork.evaluate(sampleMotionStyles, {
      times: [0, 200, 300, 1800, 3500, 3650, 3800, 4000],
      selectors: {
        body: '.dnb-motion-scene__illustration-body',
        roof: '.dnb-motion-scene__illustration-roof',
        details: '.dnb-motion-scene__illustration-details',
        garage: '.dnb-motion-scene__garage',
        left: '.dnb-motion-scene__illustration-greenery--left',
        right: '.dnb-motion-scene__illustration-greenery--right',
      },
    })
  ).map(({ body, ...otherParts }) => ({
    body: body.opacity,
    otherParts: Object.values(otherParts).map(({ opacity }) => opacity),
  }))
  for (const index of [0, 6, 7]) {
    expect(frames[index].body).toBeCloseTo(0)
  }
  for (const index of [1, 5]) {
    expect(frames[index].body).toBeGreaterThan(0)
    expect(frames[index].body).toBeLessThan(1)
  }
  for (const index of [2, 3, 4]) {
    expect(frames[index].body).toBeCloseTo(1)
  }
  frames.forEach(({ otherParts }, index) => {
    otherParts.forEach((opacity) =>
      expect(opacity).toBeCloseTo(index === 3 ? 1 : 0)
    )
  })
})

test('house assembly starts quickly and decelerates into its final pose', async ({
  page,
}) => {
  for (const [part, start, duration] of [
    ['illustration-roof', 300, 400],
    ['illustration-greenery--left', 300, 700],
    ['illustration-greenery--right', 300, 700],
  ] as const) {
    const frames = (
      await page
        .locator(`.dnb-motion-scene__${part}`)
        .evaluate(sampleMotionStyles, {
          times: [0, 0.25, 0.5, 0.75, 1].map(
            (progress) => start + duration * progress
          ),
        })
    ).map(({ target }) => 16 - Math.hypot(target.x, target.y))
    expect(frames[0]).toBeCloseTo(0)
    expect(frames[4]).toBeCloseTo(16)
    const distances = frames
      .slice(1)
      .map((position, index) => position - frames[index])
    distances.forEach((distance, index) => {
      expect(distance).toBeGreaterThan(0)
      if (index > 0) {
        expect(distance).toBeLessThan(distances[index - 1])
      }
    })
    expect(distances[0]).toBeGreaterThan(distances[3] * 2)
  }
})

test('the illustration reveals its details before opening the garage and reverses the sequence', async ({
  page,
}) => {
  const artwork = page.locator('.dnb-motion-scene__illustration-artwork')
  for (const name of ['body', 'roof', 'details']) {
    const layer = artwork.locator(
      `image.dnb-motion-scene__illustration-${name}`
    )
    await expect(layer).toHaveCount(1)
    expect(
      await layer.evaluate(async (element: SVGImageElement) => {
        const image = new Image()
        image.src = element.href.baseVal
        await image.decode()
        return [image.naturalWidth, image.naturalHeight]
      })
    ).toEqual([523, 250])
    if (name !== 'roof') {
      await expect(layer).toHaveCSS('transform', 'none')
    }
  }
  for (const layer of await artwork.locator('image').all()) {
    const parts = await layer.evaluate(
      async (element: SVGImageElement) => {
        const response = await fetch(element.href.baseVal)
        const svg = new DOMParser().parseFromString(
          await response.text(),
          'image/svg+xml'
        )
        return {
          rightWall: Boolean(svg.querySelector('[id="Vector_3"]')),
          frontDoor: Boolean(svg.querySelector('[id="Door"] mask')),
        }
      }
    )
    const isDetails =
      (await layer.getAttribute('class')) ===
      'dnb-motion-scene__illustration-details'
    expect(parts).toEqual({
      rightWall: isDetails,
      frontDoor: isDetails,
    })
  }
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
      times: [
        300, 400, 800, 1000, 1100, 1350, 1600, 2400, 2650, 2900, 3100,
        3350, 3600,
      ],
      selectors: {
        roof: '.dnb-motion-scene__illustration-roof',
        details: '.dnb-motion-scene__illustration-details',
        garage: '.dnb-motion-scene__garage',
        door: '.dnb-motion-scene__garage-door',
      },
    })
  ).map(({ roof, details, garage, door }) => ({
    roof: roof.opacity,
    roofY: roof.y,
    roofScale: roof.scaleY,
    details: details.opacity,
    garage: garage.opacity,
    doorY: door.y,
    doorScale: door.scaleY,
  }))
  expect(frames[0]).toEqual({
    roof: 0,
    roofY: -16,
    roofScale: 1,
    details: 0,
    garage: 0,
    doorY: 0,
    doorScale: 1,
  })
  expect(frames[1].roof).toBeGreaterThan(0)
  expect(frames[1].roof).toBeLessThan(1)
  for (const index of [1, 11]) {
    expect(frames[index].roofY).toBeGreaterThan(-16)
    expect(frames[index].roofY).toBeLessThan(0)
  }
  expect(frames[1].details).toBeCloseTo(0)
  expect(frames[2].roof).toBe(1)
  expect(frames[2].roofY).toBeCloseTo(0)
  expect(frames[2].details).toBeGreaterThan(0)
  expect(frames[2].details).toBeLessThan(1)
  expect(frames[3].details).toBeCloseTo(1)
  expect(frames[4].doorY).toBeCloseTo(0)
  for (const index of [5, 8]) {
    expect(frames[index].doorY).toBeGreaterThan(-52)
    expect(frames[index].doorY).toBeLessThan(0)
  }
  for (const index of [6, 7]) {
    expect(frames[index].doorY).toBeCloseTo(-52)
  }
  expect(frames[9].doorY).toBeCloseTo(0)
  expect(frames[10].details).toBeGreaterThan(0)
  expect(frames[10].details).toBeLessThan(1)
  expect(frames[10].roof).toBe(1)
  expect(frames[11].details).toBe(0)
  expect(frames[11].roof).toBeGreaterThan(0)
  expect(frames[11].roof).toBeLessThan(1)
  expect(frames[12]).toEqual(frames[0])
  frames.forEach(({ doorScale, garage, details, roofScale }) => {
    expect(doorScale).toBe(1)
    expect(roofScale).toBe(1)
    expect(garage).toBeCloseTo(details)
  })
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
      padding: style.padding,
      radius: style.borderRadius,
      mask: style.maskComposite,
      gradient: style.backgroundImage,
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
  expect(result.padding).toBe('2px')
  expect(result.radius).toBe('24px')
  expect(result.mask).toContain('exclude')
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

test('reduced motion prevents autoplay and shows meaningful stills', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await waitForApp(page)
  const gallery = page.locator('.dnb-motion-demos')
  await expect(
    gallery.getByRole('button', { name: 'Motion paused' })
  ).toBeDisabled()
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
  await expect(
    gallery.getByRole('button', { name: 'Pause all' })
  ).toBeEnabled()
  await page.getByRole('button', { name: 'Pause all' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(
    gallery.getByRole('button', { name: 'Resume all' })
  ).toBeEnabled()
  await expect(gallery.locator('.dnb-motion-scene__dialog')).toHaveCSS(
    'animation-play-state',
    'paused'
  )
})

for (const width of [320, 768, 1280]) {
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
        '.dnb-motion-scene__illustration-artwork > image, .dnb-motion-scene__icon svg'
      )
      .evaluateAll((elements) =>
        elements.map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect()
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
            ratio: element instanceof SVGImageElement ? 523 / 250 : 1,
          }
        })
      )
    expect(assets).toHaveLength(4)
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
