import { test, expect } from '@playwright/test'
import type { Locator } from '@playwright/test'

// Collects the different values that read() gives during 600 ms
async function sampleOverTime(read: () => Promise<string>) {
  const values = new Set<string>()
  const end = Date.now() + 600

  while (Date.now() < end) {
    values.add(await read())
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return [...values]
}

test.describe('with reduced motion', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/progress-indicator/demos/')
  })

  test('shows a still part of the indeterminate linear bar', async ({
    page,
  }) => {
    const track = page
      .locator(
        '.dnb-progress-indicator__linear:has(.dnb-progress-indicator__linear__bar1-animation)'
      )
      .first()
    await expect(track).toBeVisible()

    const frames = await sampleOverTime(() =>
      track.evaluate((element) => {
        const trackRect = element.getBoundingClientRect()
        const [bar1, bar2] = element.querySelectorAll(
          '.dnb-progress-indicator__linear__bar'
        )
        const bar1Rect = bar1.getBoundingClientRect()
        return JSON.stringify({
          bar1Left: Math.round(bar1Rect.left - trackRect.left),
          bar1Width: Math.round(bar1Rect.width),
          bar2Width: Math.round(bar2.getBoundingClientRect().width),
          trackWidth: Math.round(trackRect.width),
        })
      })
    )

    expect(frames).toHaveLength(1)

    const { bar1Left, bar1Width, bar2Width, trackWidth } = JSON.parse(
      frames[0]
    )

    // Not empty, and not a full bar that looks complete
    expect(bar1Left).toBeGreaterThan(0)
    expect(bar1Width).toBeGreaterThan(0)
    expect(bar1Left + bar1Width).toBeLessThan(trackWidth)
    expect(bar2Width).toBe(0)
  })

  test('shows a still part of the indeterminate circle', async ({
    page,
  }) => {
    const readLines = (locator: Locator) => () =>
      locator.evaluate((element) =>
        [...element.querySelectorAll('svg')]
          .map((svg) => {
            const style = getComputedStyle(svg)
            return style.visibility === 'hidden'
              ? 'hidden'
              : style.strokeDashoffset
          })
          .join(' ')
      )

    const circular = page
      .locator(
        '.dnb-progress-indicator__circular:not(.dnb-progress-indicator__circular--has-progress-value)'
      )
      .first()
    await expect(circular).toBeVisible()

    // Light background line, dark arc of 25 %, hidden light line on top
    expect(await sampleOverTime(readLines(circular))).toEqual([
      '1% 235.619% hidden',
    ])

    // With onComplete, JavaScript sets the arc with inline styles on every frame
    const withOnComplete = page
      .locator(
        '.dnb-progress-indicator__circular:not(.dnb-progress-indicator__circular--has-progress-value):has(.dark.paused)'
      )
      .first()

    expect(await sampleOverTime(readLines(withOnComplete))).toEqual([
      '1% 235.619% hidden',
    ])
  })
})
