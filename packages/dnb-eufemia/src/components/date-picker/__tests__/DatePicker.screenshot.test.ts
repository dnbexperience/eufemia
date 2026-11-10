import { it, describe } from 'vitest'
import {
  makeScreenshot,
  setupPageScreenshot,
} from '../../../core/vitest-screenshots/setupVitestScreenshots'

describe.each(['ui', 'sbanken'])(`DatePicker for %s`, (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/web/components/date-picker/visual-tests/',
  })

  it('have to match the input fields', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-input"] .dnb-date-picker__inner',
    })
  })

  it('have to match the date-picker with input in error state', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-input-error"] .dnb-date-picker__inner',
    })
  })

  it('have to match the sizes', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-sizes"]',
      executeBeforeSimulate: () => {
        document
          .querySelectorAll(
            '[data-visual-test="date-picker-sizes"] .dnb-date-picker'
          )
          .forEach((picker) => {
            const sections = picker.querySelectorAll(
              '.dnb-date-picker__input'
            )
            const shell = picker
              .querySelector('.dnb-input__shell')
              .getBoundingClientRect()
            const button = picker
              .querySelector('.dnb-input__submit-element button')
              .getBoundingClientRect()
            const range = document.createRange()
            range.selectNodeContents(sections[0])
            const left = range.getBoundingClientRect().left - shell.left
            range.selectNodeContents(sections[sections.length - 1])
            const right = button.left - range.getBoundingClientRect().right
            const fontSize = Number.parseFloat(
              getComputedStyle(sections[0]).fontSize
            )
            const expectedFontSize = picker.classList.contains(
              'dnb-date-picker--small'
            )
              ? 16
              : 18

            if (
              Math.abs(left - 16) > 0.1 ||
              Math.abs(right - 16) > 0.1 ||
              Math.abs(button.top - shell.top) > 0.1 ||
              Math.abs(button.bottom - shell.bottom) > 0.1 ||
              fontSize !== expectedFontSize
            ) {
              throw new Error(
                `DatePicker input alignment: ${JSON.stringify({ left, right, fontSize, expectedFontSize, shell, button })}`
              )
            }
          })
      },
    })
  })

  it('have to match the disabled states', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-disabled"]',
    })
  })

  it('have to match the calendar in range mode', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-calendar-range"] ',
      withWrapper: false,
    })
  })

  it('have to match the date-picker trigger button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-trigger-default"] .dnb-date-picker__inner',
    })
  })

  it('have to match the date-picker trigger button in error state', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-trigger-error"] .dnb-date-picker__inner',
    })
  })

  it('have to match label alignment right', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-label-alignment-right"]',
    })
  })

  it('have to match label alignment right with button', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-with-button-label-alignment-right"]',
    })
  })

  it('have to match calendar view when aligning picker right', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-align-picker-right"]',
      withWrapper: false,
    })
  })

  it('have to match calendar view when aligning picker right with input', async () => {
    await makeScreenshot({
      selector:
        '[data-visual-test="date-picker-align-picker-right-with-input"]',
      withWrapper: false,
    })
  })

  it('have to match calendar view with year navigation', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-year-navigation"]',
      withWrapper: false,
    })
  })

  it('have to match month only calendar', async () => {
    await makeScreenshot({
      selector: '[data-visual-test="date-picker-only-month"]',
      withWrapper: false,
    })
  })
})
