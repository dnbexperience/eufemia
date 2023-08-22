import { StepIndicatorData, StepIndicatorProps } from './StepIndicator'

export const stepIndicatorDefaultProps: Omit<
  StepIndicatorProps,
  'sidebar_id' | 'mode'
> = {
  data: [] as StepIndicatorData,
  skeleton: false,
  current_step: 0,
  hide_numbers: false,
  no_animation: false,
}
