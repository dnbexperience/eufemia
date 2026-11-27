import type { Locator } from '@playwright/test'

/**
 * Taps the center of an element with trusted touch events through CDP
 * (Chromium only). Unlike `hasTouch`, this keeps the desktop hover media
 * features, like a laptop with both a touchscreen and a mouse.
 */
export default async function tapWithTouchEvents(locator: Locator) {
  await locator.scrollIntoViewIfNeeded()
  const box = await locator.boundingBox()
  const session = await locator
    .page()
    .context()
    .newCDPSession(locator.page())
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [point],
  })
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  })
  await session.detach()
}
