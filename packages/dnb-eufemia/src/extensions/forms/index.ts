export * from './types'
export * from './utils'
export * from './hooks'
export * as Field from './Field'
export * as Value from './Value'
export * as Form from './Form'
export * as Wizard from './Wizard'
export * as DataContext from './DataContext'
export * as Iterate from './Iterate'
export * as Tools from './Tools'
export * as Connectors from './Connectors'
export { default as FieldBlock } from './FieldBlock'
export { default as ValueBlock } from './ValueBlock'
export { default as Ajv } from 'ajv/dist/2020'

// Types
export type { SectionProps } from './Form/Section'

import {
  Container,
  Step,
  NextButton,
  PreviousButton,
  Buttons,
  useStep,
} from './Wizard'

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
 * @deprecated use "<Wizard.Container>" instead of "<StepsLayout>"
 */
export function StepsLayout(props) {
  console.error(
    'Please use "<Wizard.Container>" instead of "<StepsLayout>"'
  )
  return Container(props)
}
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Wizard.Step" instead of "StepsLayout.Step"
 */
StepsLayout.Step = Step
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Wizard.Buttons" instead of "StepsLayout.NextButton"
 */
StepsLayout.NextButton = NextButton
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Wizard.Buttons" instead of "StepsLayout.PreviousButton"
 */
StepsLayout.PreviousButton = PreviousButton
/**
 * Deprecated and will be removed in v11
 *
 * @deprecated use "Wizard.Buttons" instead of "StepsLayout.Buttons"
 */
StepsLayout.Buttons = Buttons
StepsLayout.useStep = useStep
