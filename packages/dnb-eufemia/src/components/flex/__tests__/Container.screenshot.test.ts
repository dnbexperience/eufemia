import { it, describe } from 'vitest'
import { makeScreenshot } from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Flex.Container', () => {
  it('should preserve additive item spacing in CSS gap mode', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-css-additive-spacing"].dnb-flex-container',
      executeBeforeSimulate: () => {
        const container = document.querySelector(
          '[data-visual-test="flex-container-css-additive-spacing"]'
        )
        const items = container ? Array.from(container.children) : []

        if (!container || items.length !== 4) {
          throw new Error(
            `Expected one CSS gap container with four items, found ${items.length}`
          )
        }

        const distances = items.slice(1).map((item, index) => {
          const previous = items[index].getBoundingClientRect()
          const current = item.getBoundingClientRect()
          return current.top - previous.bottom
        })
        const expectedDistances = [48, 24, 40]

        distances.forEach((distance, index) => {
          if (Math.abs(distance - expectedDistances[index]) > 0.5) {
            throw new Error(
              `Flex additive spacing mismatch: ${JSON.stringify({ distances, expectedDistances })}`
            )
          }
        })

        const pairwiseRoot = document.querySelector(
          '[data-visual-test="flex-container-css-pairwise-spacing"]'
        )
        const pairwiseContainers = pairwiseRoot
          ? Array.from(
              pairwiseRoot.querySelectorAll(':scope > .dnb-flex-container')
            )
          : []

        if (pairwiseContainers.length !== 2) {
          throw new Error(
            'Expected horizontal and vertical Flex containers'
          )
        }

        const expectedPairwiseDistances = [32, 8, 24, 16]
        const expectedOuterMargins = [32, 48]

        pairwiseContainers.forEach((container, containerIndex) => {
          const items = Array.from(container.children)
          const containerRect = container.getBoundingClientRect()
          const itemRects = items.map((item) =>
            item.getBoundingClientRect()
          )
          const distances = itemRects.slice(1).map((rect, itemIndex) => {
            const previous = itemRects[itemIndex]
            return containerIndex === 0
              ? rect.left - previous.right
              : rect.top - previous.bottom
          })
          const outerMargins =
            containerIndex === 0
              ? [
                  itemRects[0].left - containerRect.left,
                  containerRect.right - itemRects.at(-1).right,
                ]
              : [
                  itemRects[0].top - containerRect.top,
                  containerRect.bottom - itemRects.at(-1).bottom,
                ]

          distances.forEach((distance, index) => {
            if (
              Math.abs(distance - expectedPairwiseDistances[index]) > 0.5
            ) {
              throw new Error(
                `Flex pairwise spacing mismatch: ${JSON.stringify({ distances, expectedDistances: expectedPairwiseDistances })}`
              )
            }
          })
          outerMargins.forEach((margin, index) => {
            if (Math.abs(margin - expectedOuterMargins[index]) > 0.5) {
              throw new Error(
                `Flex outer spacing mismatch: ${JSON.stringify({ outerMargins, expectedOuterMargins })}`
              )
            }
          })
        })
      },
    })
  })

  it('should match legacy divider geometry without inserting hr elements', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-css-divider-parity"][data-css-divider-parity]',
      executeBeforeSimulate: () => {
        const parityRoot = document.querySelector(
          '[data-css-divider-parity]'
        )
        const containers = parityRoot
          ? Array.from(
              parityRoot.querySelectorAll(':scope > .dnb-flex-container')
            )
          : []

        if (containers.length !== 2) {
          throw new Error(`Expected two divider containers`)
        }

        const itemDistances = containers.map((container) => {
          const items = Array.from(container.children).filter(
            (element) => element.tagName !== 'HR'
          )

          return items.slice(1).map((item, index) => {
            const previous = items[index].getBoundingClientRect()
            const current = item.getBoundingClientRect()
            return current.top - previous.bottom
          })
        })

        if (
          JSON.stringify(itemDistances[0]) !==
          JSON.stringify(itemDistances[1])
        ) {
          const details = containers.map((container) => ({
            rowGap: getComputedStyle(container).rowGap,
            items: Array.from(container.children)
              .filter((element) => element.tagName !== 'HR')
              .map((element) => {
                const style = getComputedStyle(element)
                return {
                  tagName: element.tagName,
                  className: element.className,
                  itemType: element.getAttribute('data-flex-item-type'),
                  marginBlockStart: style.marginBlockStart,
                  marginBlockEnd: style.marginBlockEnd,
                }
              }),
          }))

          throw new Error(
            `Flex divider spacing mismatch: ${JSON.stringify({ itemDistances, details })}`
          )
        }

        if (containers[1].querySelector('hr')) {
          throw new Error('CSS divider mode must not insert hr elements')
        }
      },
    })
  })

  it('should preserve horizontal dividers with cross-axis alignment', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-css-horizontal-divider-alignment"]',
      executeBeforeSimulate: () => {
        const container = document.querySelector(
          '[data-visual-test="flex-container-css-horizontal-divider-alignment"]'
        ) as HTMLElement

        if (!container) {
          throw new Error('Expected a horizontal divider container')
        }

        const containers = Array.from(
          container.querySelectorAll<HTMLElement>(
            ':scope > [data-expected-dividers]'
          )
        )

        containers.forEach((container) => {
          const expectedDividers = Number(
            container.dataset.expectedDividers
          )
          const dividerImages = container.style.getPropertyValue(
            '--flex-divider-images'
          )
          const dividerCount = (
            dividerImages.match(/linear-gradient\(/g) ?? []
          ).length

          if (dividerCount !== expectedDividers) {
            throw new Error(
              `Expected ${expectedDividers} horizontal dividers, found ${dividerCount}`
            )
          }
        })
      },
    })
  })

  it('should account for native gap in CSS span widths', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 1000,
      },
      selector:
        '[data-visual-test="flex-container-css-span-geometry"].dnb-flex-container',
      executeBeforeSimulate: () => {
        const container = document.querySelector(
          '[data-visual-test="flex-container-css-span-geometry"]'
        )
        const items = container ? Array.from(container.children) : []

        if (!container || items.length !== 2) {
          throw new Error('Expected a CSS span container with two items')
        }

        const containerRect = container.getBoundingClientRect()
        const itemRects = items.map((item) => item.getBoundingClientRect())
        const gap = parseFloat(getComputedStyle(container).columnGap)
        const usedWidth = itemRects[0].width + itemRects[1].width + gap

        if (Math.abs(usedWidth - containerRect.width) > 0.5) {
          throw new Error(
            `Flex span width mismatch: ${JSON.stringify({
              container: containerRect.width,
              items: itemRects.map((rect) => rect.width),
              gap,
              usedWidth,
            })}`
          )
        }

        if (itemRects[0].top !== itemRects[1].top) {
          throw new Error('Responsive spans wrapped unexpectedly')
        }
      },
    })
  })

  it('should not reserve CSS gap for hidden items', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-css-hidden-gap-geometry"].dnb-flex-container',
      executeBeforeSimulate: () => {
        const container = document.querySelector(
          '[data-visual-test="flex-container-css-hidden-gap-geometry"]'
        )
        const visibleItems = container
          ? Array.from(container.children).filter(
              (element) => getComputedStyle(element).display !== 'none'
            )
          : []

        if (!container || visibleItems.length !== 2) {
          throw new Error(
            `Expected two visible Flex items, found ${visibleItems.length}`
          )
        }

        const first = visibleItems[0].getBoundingClientRect()
        const last = visibleItems[1].getBoundingClientRect()
        const distance = last.top - first.bottom
        const gap = parseFloat(getComputedStyle(container).rowGap)

        if (Math.abs(distance - gap) > 0.5) {
          throw new Error(
            `Hidden Flex items reserved space: ${JSON.stringify({ distance, gap })}`
          )
        }
      },
    })
  })

  it('should preserve wrapper roots and nested CSS spacing', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-css-wrapper-geometry"].dnb-flex-container',
      executeBeforeSimulate: () => {
        const outer = document.querySelector(
          '[data-visual-test="flex-container-css-wrapper-geometry"]'
        )
        const roots = outer ? Array.from(outer.children) : []

        if (!outer || roots.length !== 3) {
          throw new Error(
            `Expected three wrapper roots, found ${roots.length}`
          )
        }

        const liveRegion = roots.find((element) =>
          element.classList.contains('dnb-aria-live')
        )
        if (
          liveRegion?.getAttribute('aria-live') !== 'polite' ||
          liveRegion?.getAttribute('aria-atomic') !== 'false'
        ) {
          throw new Error('AriaLive semantics changed in CSS Flex mode')
        }

        for (const root of roots) {
          const nested = root.querySelector(
            ':scope > .dnb-flex-container--css-gap'
          )
          const items = nested ? Array.from(nested.children) : []

          if (!nested || items.length !== 2) {
            throw new Error(
              `Missing nested CSS layout in ${root.className || root.tagName}`
            )
          }

          const first = items[0].getBoundingClientRect()
          const second = items[1].getBoundingClientRect()
          const distance = second.top - first.bottom
          const gap = parseFloat(getComputedStyle(nested).rowGap)

          if (Math.abs(distance - gap) > 0.5 || Math.abs(gap - 24) > 0.5) {
            throw new Error(
              `Wrapper spacing mismatch: ${JSON.stringify({
                root: root.className,
                distance,
                gap,
              })}`
            )
          }
        }
      },
    })
  })

  it('should apply item gap overrides on both main axes', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector: '[data-visual-test="flex-item-gap-override-geometry"]',
      executeBeforeSimulate: () => {
        const root = document.querySelector(
          '[data-visual-test="flex-item-gap-override-geometry"]'
        )
        const containers = root
          ? Array.from(
              root.querySelectorAll(':scope > .dnb-flex-container')
            )
          : []

        if (containers.length !== 2) {
          throw new Error(
            'Expected horizontal and vertical Flex containers'
          )
        }

        const expectedDistances = [40, 8, 24, 16]
        const distances = containers.map((container, containerIndex) => {
          const items = Array.from(container.children)
          return items.slice(1).map((item, itemIndex) => {
            const previous = items[itemIndex].getBoundingClientRect()
            const current = item.getBoundingClientRect()
            return containerIndex === 0
              ? current.left - previous.right
              : current.top - previous.bottom
          })
        })

        for (const axisDistances of distances) {
          axisDistances.forEach((distance, index) => {
            if (Math.abs(distance - expectedDistances[index]) > 0.5) {
              throw new Error(
                `Flex item gap override mismatch: ${JSON.stringify({ distances, expectedDistances })}`
              )
            }
          })
        }
      },
    })
  })

  it('have to match divider', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-divider"] .dnb-flex-container',
    })
  })

  it('have to match with children', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-with-children"] .dnb-flex-container',
    })
  })

  it('have to match bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  it('have to match wrapped bookend line', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 240,
      },
      selector:
        '[data-visual-test="flex-container-line-framed"] .dnb-flex-container',
    })
  })

  it('have to match field on large viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  it('have to match field on small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 600,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })

  it('have to match field on x-small viewport', async () => {
    await makeScreenshot({
      url: '/uilib/layout/flex/container/demos/',
      pageViewport: {
        width: 300,
      },
      selector:
        '[data-visual-test="flex-container-field"] .dnb-flex-container',
    })
  })
})
