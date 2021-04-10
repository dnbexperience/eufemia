/**
 * This file is used to enable Web Components
 *
 */

// import all the available libs
import { enableWebComponents as enableComponents } from './components/lib'
import { enableWebComponents as enableExtensions } from './extensions/lib'

export * from './components/lib'
export * from './extensions/lib'

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true

  // register libs to work with custom element
  enableComponents()
  enableExtensions()
}
