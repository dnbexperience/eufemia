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
  let crop: Buffer
  try {
    await element.scrollIntoViewIfNeeded()
    const clip = await element.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      // Include outlines drawn just outside the specimen's layout box.
      const x = Math.max(0, rect.left + window.scrollX - 2)
      const y = Math.max(0, rect.top + window.scrollY - 2)
      return {
        x,
        y,
        width: rect.right + window.scrollX + 2 - x,
        height: rect.bottom + window.scrollY + 2 - y,
      }
    })
    crop = await page.screenshot({
      clip,
      type: 'png',
      omitBackground: true,
      animations: 'disabled',
      timeout: 10000,
    })
  } finally {
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
  const marked = page.locator(
    '.dnb-live-preview[data-social-preview="true"]'
  )
  const markedCount = await marked.count()
  if (markedCount > 1) {
    throw new Error('Only one socialPreview demo is allowed per page')
  }
  const preview = markedCount ? marked.first() : previews.first()
  if (!(await preview.count())) {
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
