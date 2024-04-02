export * from './types'
export * from './utils'
export * from './hooks'
export * as Field from './Field'
export * as Value from './Value'
export * as Form from './Form'
export * as Steps from './Steps'
export * as DataContext from './DataContext'
export * as Iterate from './Iterate'
export { default as FieldBlock } from './FieldBlock'
export { default as ValueBlock } from './ValueBlock'
export { default as Ajv } from 'ajv/dist/2020'

import {
  Layout,
  Step,
  NextButton,
  PreviousButton,
  Buttons,
  useStep,
} from './Steps'

/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use import { Field } from 'Form'	instead
 */
export function Visibility() {
  console.error('Please import Visibility from "Form.Visibility"')
}

/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "<Steps.Layout>" instead of "<StepsLayout>"
 */
export function StepsLayout(props) {
  console.error('Please use "<Steps.Layout>" instead of "<StepsLayout>"')
  return Layout(props)
}
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Steps.Step" instead of "StepsLayout.Step"
 */
StepsLayout.Step = Step
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Steps.NextButton" instead of "StepsLayout.NextButton"
 */
StepsLayout.NextButton = NextButton
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Steps.PreviousButton" instead of "StepsLayout.PreviousButton"
 */
StepsLayout.PreviousButton = PreviousButton
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Steps.Buttons" instead of "StepsLayout.Buttons"
 */
StepsLayout.Buttons = Buttons
StepsLayout.useStep = useStep
