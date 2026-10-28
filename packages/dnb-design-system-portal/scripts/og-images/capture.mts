import type { Page, Locator } from '@playwright/test'

export async function capturePreview(
  page: Page,
  url: string,
  expectedAssets: string[],
  format: 'square' | 'landscape' = 'square'
) {
  const response = await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 25000,
  })
  if (!response?.ok()) {
    throw new Error('Specimen page did not load')
  }
  await page
    .locator('.dnb-live-preview')
    .first()
    .waitFor({ state: 'attached', timeout: 10000 })
  await page.evaluate(() => document.fonts.ready)
  // Live demos keep rendering and the Portal can scroll after
  // DOMContentLoaded. Wait until the page has been quiet for a moment.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let quiet: ReturnType<typeof setTimeout>
        const observer = new MutationObserver(() => restart())
        const done = () => {
          observer.disconnect()
          removeEventListener('scroll', restart)
          clearTimeout(quiet)
          clearTimeout(limit)
          resolve()
        }
        const restart = () => {
          clearTimeout(quiet)
          quiet = setTimeout(done, 500)
        }
        const limit = setTimeout(done, 5000)
        observer.observe(document.body, {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true,
        })
        addEventListener('scroll', restart, { passive: true })
        restart()
      })
  )
  await page.addStyleTag({
    content:
      '.example-box::after{display:none!important}*{transition:none!important;caret-color:transparent!important}',
  })
  const assets = await page
    .locator(
      'link[rel="stylesheet"][href], script[src], link[rel="modulepreload"][href]'
    )
    .evaluateAll((nodes) =>
      nodes
        .map(
          (node) =>
            node.getAttribute('href') || node.getAttribute('src') || ''
        )
        .filter((value) => value.startsWith('/assets/'))
        .sort()
    )
  if (JSON.stringify(assets) !== JSON.stringify(expectedAssets)) {
    throw new Error('Portal assets changed during capture')
  }
  const { crop } = await captureSpecimen(page, format)
  return crop
}

export async function captureSpecimen(
  page: Page,
  format: 'square' | 'landscape' = 'square'
) {
  let selected
  for (const width of format === 'square'
    ? [384, 566, undefined]
    : [undefined]) {
    try {
      selected = await selectPreview(page, width)
      break
    } catch (error) {
      if (
        !(error instanceof Error) ||
        error.message !== 'No compact specimen'
      ) {
        throw error
      }
    }
  }
  if (!selected) {
    throw new Error('No compact specimen')
  }
  const { element } = selected
  const box = await element.boundingBox()
  const backgrounds = await element.evaluate((element) => {
    const backgrounds: Array<{ value: string; priority: string }> = []
    for (
      let ancestor = element.parentElement;
      ancestor;
      ancestor = ancestor.parentElement
    ) {
      backgrounds.push({
        value: ancestor.style.getPropertyValue('background-color'),
        priority: ancestor.style.getPropertyPriority('background-color'),
      })
      ancestor.style.setProperty(
        'background-color',
        'transparent',
        'important'
      )
    }
    return backgrounds
  })
  // Fixed and sticky page chrome, like the Portal header, would be
  // painted over a specimen scrolled underneath it.
  const overlays = await element.evaluate((element) => {
    const overlays: Array<{ value: string; priority: string }> = []
    for (const node of document.body.querySelectorAll<HTMLElement>('*')) {
      if (
        node.contains(element) ||
        element.contains(node) ||
        !['fixed', 'sticky'].includes(getComputedStyle(node).position)
      ) {
        continue
      }
      node.dataset.ogOverlay = String(overlays.length)
      overlays.push({
        value: node.style.getPropertyValue('visibility'),
        priority: node.style.getPropertyPriority('visibility'),
      })
      node.style.setProperty('visibility', 'hidden', 'important')
    }
    return overlays
  })
  let crop: Buffer
  try {
    await element.scrollIntoViewIfNeeded()
    // page.screenshot() clips are relative to the viewport, not the
    // document, so the scroll offset must not be added.
    const measure = () =>
      element.evaluate((element) => {
        // Include outlines drawn just outside the specimen's layout box.
        const margin = 2
        let rect = element.getBoundingClientRect()
        // A specimen scrolled in from across the fold ends flush with the
        // viewport edge, which would cut that margin off.
        const overflow =
          rect.bottom + margin > window.innerHeight
            ? rect.bottom + margin - window.innerHeight
            : Math.min(0, rect.top - margin)
        if (overflow) {
          window.scrollBy(0, overflow)
          rect = element.getBoundingClientRect()
        }
        const x = Math.max(0, rect.left - margin)
        const y = Math.max(0, rect.top - margin)
        return {
          x,
          y,
          width: rect.right + margin - x,
          height: rect.bottom + margin - y,
        }
      })
    // The Portal can still scroll or shift after load. Only keep a
    // screenshot taken while the specimen stayed in the measured place.
    let clip = await measure()
    for (let attempt = 0; ; attempt++) {
      const shot = await page.screenshot({
        clip,
        type: 'png',
        omitBackground: true,
        animations: 'disabled',
        timeout: 10000,
      })
      const after = await measure()
      if (JSON.stringify(after) === JSON.stringify(clip)) {
        crop = shot
        break
      }
      if (attempt === 4) {
        throw new Error('Specimen moved during capture')
      }
      clip = after
    }
  } finally {
    await page.evaluate((overlays) => {
      for (const node of document.querySelectorAll<HTMLElement>(
        '[data-og-overlay]'
      )) {
        const { value, priority } =
          overlays[Number(node.dataset.ogOverlay)]
        if (value) {
          node.style.setProperty('visibility', value, priority)
        } else {
          node.style.removeProperty('visibility')
        }
        delete node.dataset.ogOverlay
      }
    }, overlays)
    await element.evaluate((element, backgrounds) => {
      let index = 0
      for (
        let ancestor = element.parentElement;
        ancestor;
        ancestor = ancestor.parentElement
      ) {
        const { value, priority } = backgrounds[index++]
        if (value) {
          ancestor.style.setProperty('background-color', value, priority)
        } else {
          ancestor.style.removeProperty('background-color')
        }
      }
    }, backgrounds)
  }
  return {
    crop,
    selection: { index: selected.index, part: selected.part },
    size: box
      ? { width: Math.round(box.width), height: Math.round(box.height) }
      : null,
  }
}

export async function selectPreview(page: Page, width?: number) {
  const previews = page.locator('.dnb-live-preview')
  const marked = page.locator('.dnb-live-preview[data-social-preview]')
  const markedCount = await marked.count()
  if (markedCount > 1) {
    throw new Error('Only one socialPreview demo is allowed per page')
  }
  const preview = markedCount ? marked.first() : previews.first()
  if (
    !(await preview.count()) ||
    (await preview.getAttribute('data-social-preview')) === 'false'
  ) {
    throw new Error('No compact specimen')
  }
  if (
    (await preview.getAttribute('data-social-preview-layout')) === 'stack'
  ) {
    await page.addStyleTag({
      content:
        '.dnb-live-preview[data-social-preview-layout="stack"] > .dnb-flex-container{width:max-content!important;flex-direction:column!important;align-items:center!important;gap:0.25rem!important}.dnb-live-preview[data-social-preview-layout="stack"] > .dnb-flex-container > *{margin:0!important}',
    })
  }
  await preview.evaluate((element: HTMLElement, width) => {
    if (element.dataset.ogOriginalWidth === undefined) {
      element.dataset.ogOriginalWidth = element.style.width
      element.dataset.ogOriginalMaxWidth = element.style.maxWidth
    }
    element.style.width = width
      ? width + 'px'
      : element.dataset.ogOriginalWidth
    element.style.maxWidth = width
      ? width + 'px'
      : element.dataset.ogOriginalMaxWidth || ''
  }, width)
  const suitable = async (element: Locator) => {
    if (!(await element.isVisible())) {
      return false
    }
    const box = await element.boundingBox()
    if (!box || box.width < 8 || box.height < 8 || box.height > 900) {
      return false
    }
    return element.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const scrollContainers = [element, ...element.querySelectorAll('*')]
      const clipped = scrollContainers.some((node) => {
        if (
          node.matches('.dnb-sr-only') ||
          node.clientWidth <= 1 ||
          node.clientHeight <= 1
        ) {
          return false
        }
        const style = getComputedStyle(node)
        const horizontal = ['auto', 'scroll', 'hidden', 'clip'].includes(
          style.overflowX
        )
        const vertical = ['hidden', 'clip'].includes(style.overflowY)
        return (
          node.clientWidth > 0 &&
          node.clientHeight > 0 &&
          ((horizontal && node.scrollWidth > node.clientWidth + 1) ||
            (vertical && node.scrollHeight > node.clientHeight + 1))
        )
      })
      return (
        !clipped &&
        element.scrollWidth <= element.clientWidth + 1 &&
        Boolean(
          element.textContent?.trim() ||
          element.querySelector(
            'input, textarea, select, button, svg, img, canvas'
          ) ||
          (rect.width >= 16 && rect.height >= 16)
        )
      )
    })
  }
  let element = preview
  if (!(await suitable(preview))) {
    throw new Error('No compact specimen')
  }
  if ((await preview.locator(':scope > *').count()) === 1) {
    const child = preview.locator(':scope > *').first()
    if (await suitable(child)) {
      element = child
    }
  }
  const index = await preview.evaluate((element) =>
    [...document.querySelectorAll('.dnb-live-preview')].indexOf(element)
  )
  return { element, index, part: 'demo' }
}
