import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe('Timeline', () => {
  setupPageScreenshot({ url: '/uilib/components/timeline/demos/' })

  it('have to match Timeline single completed', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-single-completed"] .dnb-timeline',
    })
  })

  it('have to match Timeline single current', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-single-current"] .dnb-timeline',
    })
  })

  it('have to match Timeline single upcoming', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-single-upcoming"] .dnb-timeline',
    })
  })

  it('have to match Timeline multiple', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="timeline-multiple"] .dnb-timeline',
    })
  })

  it('have to match Timeline multiple with children', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-children"] .dnb-timeline',
    })
  })

  it('have to match Timeline with multiple completed timeline items', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-completed"] .dnb-timeline',
    })
  })

  it('have to match Timeline with multiple upcoming timeline items', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-upcoming"] .dnb-timeline',
    })
  })

  it('have to match Timeline with multiple current timeline items', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-multiple-current"] .dnb-timeline',
    })
  })

  it('have to match Timeline states', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="timeline-states"] .dnb-timeline',
    })
  })

  it('have to match Timeline icons', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="timeline-icons"] .dnb-timeline',
    })
  })

  it('have to match Timeline skeleton', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="timeline-skeleton"] .dnb-timeline',
    })
  })

  it('have to match Timeline as children skeleton', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-children-skeleton"] .dnb-timeline',
    })
  })

  it('have to match Timeline item skeleton', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="timeline-item-skeleton"] .dnb-timeline',
    })
  })
})
