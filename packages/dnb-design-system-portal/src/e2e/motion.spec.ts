import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

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
  ).toBeVisible()

  const timing = content.getByRole('button', {
    name: 'Timing and easing',
    exact: true,
  })
  const reducedMotion = content.getByRole('button', {
    name: 'Reduced motion',
    exact: true,
  })
  await expect(timing).toHaveAttribute('aria-expanded', 'false')
  await expect(reducedMotion).toHaveAttribute('aria-expanded', 'false')
  await timing.click()
  await expect(
    content.locator('pre').filter({ hasText: '--easing-fast-bounce' })
  ).toBeVisible()
  await reducedMotion.click()
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
              style.getPropertyValue('d'),
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

test('Dialog still enters from above and exits below, with separate backdrop timing', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-demo')
    .first()
    .evaluate((element) => {
      const dialog = element.querySelector('.dnb-motion-scene__dialog')
      const backdrop = element.querySelector('.dnb-motion-scene__backdrop')
      const sample = (time: number) => {
        element.getAnimations({ subtree: true }).forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        return {
          transform: getComputedStyle(dialog).transform,
          opacity: getComputedStyle(dialog).opacity,
          backdrop: getComputedStyle(backdrop).opacity,
        }
      }
      return {
        enter: sample(600),
        settled: sample(900),
        exit: sample(2820),
        gone: sample(2900),
      }
    })
  expect(frames.enter.transform).toBe('matrix(1, 0, 0, 1, 0, -16)')
  expect(frames.settled.transform).toBe('matrix(1, 0, 0, 1, 0, 0)')
  expect(frames.settled.opacity).toBe('1')
  expect(frames.exit.transform).toBe('matrix(1, 0, 0, 1, 0, 16)')
  expect(frames.exit.opacity).toBe('0')
  expect(Number(frames.exit.backdrop)).toBeGreaterThan(0)
  expect(Number(frames.gone.backdrop)).toBeCloseTo(0)
})

test('the accordion chevron morphs vertically without rotating', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-scene__chevron')
    .evaluate((element: SVGPathElement) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      return [600, 750, 1000, 2600, 3000, 3400].map((time) => {
        animation.currentTime = time
        const length = element.getTotalLength()
        const points = [0, length / 2, length].map((distance) => {
          const { x, y } = element.getPointAtLength(distance)
          return { x, y }
        })
        return { points, transform: getComputedStyle(element).transform }
      })
    })

  for (const frame of frames) {
    expect(frame.transform).toBe('none')
    expect(frame.points.map(({ x }) => x)).toEqual([-5, 0, 5])
  }
  expect(frames[0].points[1].y).toBeGreaterThan(frames[0].points[0].y)
  expect(frames[2].points[1].y).toBeLessThan(frames[2].points[0].y)
  expect(frames[1].points).not.toEqual(frames[0].points)
  expect(frames[1].points).not.toEqual(frames[2].points)
  expect(frames[3].points).toEqual(frames[2].points)
  expect(frames[4].points).not.toEqual(frames[3].points)
  expect(frames[5].points).toEqual(frames[0].points)
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
  const frames = await page
    .locator('.dnb-motion-scene__drawer')
    .evaluate((element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      return [600, 750, 900, 2600, 2750, 2900].map((time) => {
        animation.currentTime = time
        const style = getComputedStyle(element)
        const transform = new DOMMatrix(style.transform)
        return {
          x: transform.m41,
          y: transform.m42,
          opacity: Number(style.opacity),
        }
      })
    })
  expect(frames[0].x).toBe(136)
  expect(frames[1].x).toBeGreaterThan(0)
  expect(frames[1].x).toBeLessThan(frames[0].x)
  expect(frames[2]).toEqual({ x: 0, y: 0, opacity: 1 })
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
  const motion = await page
    .locator('.dnb-motion-scene__switch-thumb')
    .evaluate((element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      const sample = (time: number) => {
        animation.currentTime = time
        return new DOMMatrix(getComputedStyle(element).transform).m41
      }
      return {
        easing: (animation.effect as KeyframeEffect)
          .getKeyframes()
          .map(({ easing }) => easing),
        token: getComputedStyle(element)
          .getPropertyValue('--easing-fast-bounce')
          .trim(),
        off: sample(600),
        overshootOn: sample(720),
        on: sample(780),
        overshootOff: sample(2720),
        settledOff: sample(2780),
      }
    })

  expect(motion.token).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)')
  expect(motion.easing.every((easing) => easing === motion.token)).toBe(
    true
  )
  expect(motion.off).toBe(0)
  expect(motion.overshootOn).toBeGreaterThan(motion.on)
  expect(motion.on).toBe(28)
  expect(motion.overshootOff).toBeLessThan(motion.off)
  expect(motion.settledOff).toBe(0)
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

  const frames = await page
    .locator('.dnb-motion-demo')
    .filter({ has: progress })
    .evaluate((element) => {
      const animations = element.getAnimations({ subtree: true })
      return [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000].map(
        (time) => {
          animations.forEach((animation) => {
            animation.pause()
            animation.currentTime = time
          })
          return ['progress', 'progress-wipe'].map((name) =>
            parseFloat(
              getComputedStyle(
                element.querySelector(`.dnb-motion-scene__${name}`)
              ).strokeDashoffset
            )
          )
        }
      )
    })
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
  const motion = await page
    .locator('.dnb-motion-scene__breadcrumb')
    .evaluate((element) => {
      const items = Array.from(
        element.querySelectorAll('.dnb-motion-scene__breadcrumb-item')
      )
      const animations = element.getAnimations({ subtree: true })
      const sample = (time: number) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        return items.map(
          (item) => new DOMMatrix(getComputedStyle(item).transform).m41
        )
      }
      return {
        delays: items.map(
          (item) => item.getAnimations()[0].effect.getTiming().delay
        ),
        start: sample(600),
        stagger: sample(650),
        open: sample(1100),
        closed: sample(3100),
      }
    })
  expect(motion.delays).toEqual([0, 50, 100])
  expect(motion.start).toEqual([-16, -16, -16])
  expect(motion.stagger[0]).toBeGreaterThan(-16)
  expect(motion.stagger.slice(1)).toEqual([-16, -16])
  motion.open.forEach((x) => expect(x).toBeCloseTo(0))
  expect(motion.closed).toEqual(motion.start)
})

for (const scene of ['expansion', 'table']) {
  test(`${scene} paragraphs fade and slide subtly inside the expanding area`, async ({
    page,
  }) => {
    const content = page.locator(`.dnb-motion-scene__${scene}-content`)
    const frames = await content.evaluate((element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      return [600, 800, 1000, 1100, 2400, 2800, 3100].map((time) => {
        animation.currentTime = time
        const style = getComputedStyle(element)
        const transform = new DOMMatrix(style.transform)
        return {
          opacity: Number(style.opacity),
          y: transform.m42,
          scaleX: transform.m11,
          scaleY: transform.m22,
        }
      })
    })
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
  const frames = await page
    .locator('.dnb-motion-scene__expansion-fill')
    .evaluate((background) => {
      const study = background.closest('figure')
      const clip = study.querySelector('.dnb-motion-scene__expansion-clip')
      const animations = study.getAnimations({ subtree: true })
      return [600, 800, 1000, 2800, 3000, 3400].map((time) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        return [background, clip].map((element) => {
          const style = getComputedStyle(element)
          return {
            bounds: ['x', 'y', 'width', 'height'].map((name) =>
              element.getAttribute(name)
            ),
            transform: style.transform,
            origin: style.transformOrigin,
          }
        })
      })
    })
  frames.forEach(([background, clip]) => {
    expect(clip).toEqual(background)
  })
})

test('table details settle after the row has made room without scaling the text', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-scene__table')
    .evaluate((element) => {
      const animations = element.getAnimations({ subtree: true })
      return [600, 800, 1000, 1100, 2600, 3000, 3100].map((time) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        const content = new DOMMatrix(
          getComputedStyle(
            element.querySelector('.dnb-motion-scene__table-content')
          ).transform
        )
        return {
          height: parseFloat(
            getComputedStyle(
              element.querySelector('.dnb-motion-scene__disclosure-clip')
            ).height
          ),
          following: new DOMMatrix(
            getComputedStyle(
              element.querySelector(
                '.dnb-motion-scene__disclosure-following'
              )
            ).transform
          ).m42,
          contentY: content.m42,
          scale: content.m22,
        }
      })
    })
  expect(frames[0].height).toBe(0)
  expect(frames[0].contentY).toBe(-10)
  expect(frames[1].height).toBeGreaterThan(0)
  expect(frames[1].height).toBeLessThan(64)
  expect(frames[2].height).toBe(64)
  expect(frames[2].contentY).toBeLessThan(0)
  expect(frames[3].contentY).toBeCloseTo(0)
  expect(frames[4].height).toBeCloseTo(64)
  expect(frames[5].height).toBeCloseTo(0)
  expect(frames[6].contentY).toBe(-10)
  frames.forEach(({ height, following, scale }) => {
    expect(following).toBeCloseTo(height)
    expect(scale).toBe(1)
  })
})

test('TextCounter changes its message immediately and makes room for the warning icon', async ({
  page,
}) => {
  const frames = await page
    .locator('.dnb-motion-demo')
    .filter({ has: page.locator('.dnb-motion-scene__counter-icon') })
    .evaluate((element) => {
      const animations = element.getAnimations({ subtree: true })
      return [500, 601, 800, 1000, 2601, 2800, 3000].map((time) => {
        animations.forEach((animation) => {
          animation.pause()
          animation.currentTime = time
        })
        const style = (name: string) =>
          getComputedStyle(
            element.querySelector(`.dnb-motion-scene__counter-${name}`)
          )
        return {
          icon: new DOMMatrix(style('icon').transform).m11,
          width: new DOMMatrix(style('width').transform).m41,
          gap: new DOMMatrix(style('gap').transform).m41,
          error: Number(style('error').opacity),
          normal: Number(style('normal').opacity),
        }
      })
    })
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
  const frames = await artwork.evaluate((element) => {
    const greenery = Array.from(
      element.querySelectorAll('.dnb-motion-scene__illustration-greenery')
    )
    const animations = element.getAnimations({ subtree: true })
    const stage = element
      .closest('.dnb-motion-demo__stage')
      .getBoundingClientRect()
    return [600, 800, 1000, 2400, 2800, 3200].map((time) => {
      animations.forEach((animation) => {
        animation.pause()
        animation.currentTime = time
      })
      const { x, y, width, height } = element
        .querySelector('image')
        .getBoundingClientRect()
      return {
        greenery: greenery.map((plant) => {
          const style = getComputedStyle(plant)
          const transform = new DOMMatrix(style.transform)
          const bounds = plant.getBoundingClientRect()
          return {
            x: transform.m41,
            y: transform.m42,
            opacity: Number(style.opacity),
            scale: transform.m11,
            fits:
              bounds.left >= stage.left &&
              bounds.right <= stage.right &&
              bounds.top >= stage.top &&
              bounds.bottom <= stage.bottom,
          }
        }),
        opacity: Number(getComputedStyle(element).opacity),
        house: { x, y, width, height },
      }
    })
  })
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
    greenery.forEach(({ y, scale, fits }) => {
      expect(y).toBe(0)
      expect(scale).toBe(1)
      expect(fits).toBe(true)
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
  const frames = await artwork.evaluate((element) => {
    const animations = element.getAnimations({ subtree: true })
    const body = element.querySelector(
      '.dnb-motion-scene__illustration-body'
    )
    const otherParts = Array.from(
      element.querySelectorAll(
        '.dnb-motion-scene__illustration-roof, .dnb-motion-scene__illustration-details, .dnb-motion-scene__garage, .dnb-motion-scene__illustration-greenery'
      )
    )
    return [0, 350, 500, 1800, 3500, 3650, 3800, 4000].map((time) => {
      animations.forEach((animation) => {
        animation.pause()
        animation.currentTime = time
      })
      return {
        body: Number(getComputedStyle(body).opacity),
        otherParts: otherParts.map((part) =>
          Number(getComputedStyle(part).opacity)
        ),
      }
    })
  })
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
  const frames = await artwork.evaluate((element) => {
    const animations = element.getAnimations({ subtree: true })
    const roof = element.querySelector(
      '.dnb-motion-scene__illustration-roof'
    )
    const details = element.querySelector(
      '.dnb-motion-scene__illustration-details'
    )
    const garage = element.querySelector('.dnb-motion-scene__garage')
    const door = element.querySelector('.dnb-motion-scene__garage-door')
    return [
      500, 700, 900, 1000, 1100, 1350, 1600, 2400, 2650, 2900, 3100, 3350,
      3600,
    ].map((time) => {
      animations.forEach((animation) => {
        animation.pause()
        animation.currentTime = time
      })
      const transform = new DOMMatrix(getComputedStyle(door).transform)
      const roofTransform = new DOMMatrix(getComputedStyle(roof).transform)
      return {
        roof: Number(getComputedStyle(roof).opacity),
        roofY: roofTransform.m42,
        roofScale: roofTransform.m22,
        details: Number(getComputedStyle(details).opacity),
        garage: Number(getComputedStyle(garage).opacity),
        doorY: transform.m42,
        doorScale: transform.m22,
      }
    })
  })
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
  const frames = await study.evaluate((element) => {
    const icon = element.querySelector('.dnb-motion-scene__icon')
    const circle = element.querySelector(
      '.dnb-motion-scene__icon-background'
    )
    const animation = icon.getAnimations()[0]
    animation.pause()
    return [600, 720, 880, 1040, 1200, 1360, 1520, 2400].map((time) => {
      animation.currentTime = time
      const style = getComputedStyle(icon)
      const transform = new DOMMatrix(style.transform)
      const { x, y, width, height } = circle.getBoundingClientRect()
      const glyph = icon.querySelector('svg').getBoundingClientRect()
      return {
        x: transform.m41,
        y: transform.m42,
        angle: (Math.atan2(transform.m12, transform.m11) * 180) / Math.PI,
        scale: Math.hypot(transform.m11, transform.m12),
        opacity: Number(style.opacity),
        circle: { x, y, width, height },
        glyph: { width: glyph.width, height: glyph.height },
      }
    })
  })
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
    .evaluate((element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      return [600, 850, 1100, 2600, 3100].map((time) => {
        animation.currentTime = time
        return getComputedStyle(element)
          .getPropertyValue('d')
          .match(/[\d.]+/g)
          .map(Number)
      })
    })
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
    await gallery
      .locator('.dnb-motion-scene__chevron')
      .evaluate(
        (element: SVGPathElement) =>
          element.getPointAtLength(element.getTotalLength() / 2).y
      )
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
    .evaluate((element: SVGPathElement) => ({
      start: element.getPointAtLength(0).y,
      end: element.getPointAtLength(element.getTotalLength()).y,
    }))
  expect(line).toEqual({ start: 125, end: 77 })
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
