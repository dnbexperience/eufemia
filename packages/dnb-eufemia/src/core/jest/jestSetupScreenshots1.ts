import {
  makeScreenshot as m,
  setupPageScreenshot as s,
} from './jestSetupScreenshots'

export const makeScreenshot = (p) => m({ ...p, snap: true })
export const setupPageScreenshot = s
