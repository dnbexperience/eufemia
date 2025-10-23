import { StepIndicatorData, StepIndicatorProps } from './StepIndicator'

export const stepIndicatorDefaultProps: Omit<StepIndicatorProps, 'mode'> =
  {
    data: [] as StepIndicatorData,
    skeleton: false,
    currentStep: 0,
    hideNumbers: false,
    noAnimation: false,
    expandedInitially: false,
  }
