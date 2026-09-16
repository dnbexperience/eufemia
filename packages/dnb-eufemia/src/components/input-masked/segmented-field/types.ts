import type { FocusEvent, HTMLProps, ReactNode, RefObject } from 'react'
import type { InputProps } from '../../Input'
import type { FormStatusState, FormStatusText } from '../../FormStatus'
import type { SpacingProps } from '../../../shared/types'
import type { FormElementProps } from '../../../shared/helpers/filterValidProps'

export type InputMaskedOverwriteMode = 'shift' | 'replace'

export type InputMaskedSegmentedFieldSpinButton = {
  min: number
  max: number
  step?: number
  wrap?: boolean
  getInitialValue?: () => number | undefined
  formatValue?: (value: number) => string
  parseValue?: (value: string) => number | undefined
}

export type InputMaskedSegmentedFieldItem<T extends string> = {
  id: T
  label: ReactNode
  mask: RegExp[]
  spinButton?: InputMaskedSegmentedFieldSpinButton
} & Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'ref'>

export type InputMaskedSegmentedFieldValue<T extends string> = {
  [_K in T]: string
}

export type InputMaskedSegmentedFieldProps<T extends string> = {
  label?: ReactNode
  labelDirection?: FormElementProps['labelDirection']
  inputs: InputMaskedSegmentedFieldItem<T>[]
  values?: InputMaskedSegmentedFieldValue<T>
  overwriteMode?: InputMaskedOverwriteMode
  delimiter?: string
  onChange?: (values: InputMaskedSegmentedFieldValue<T>) => void
  onFocus?: (values: InputMaskedSegmentedFieldValue<T>) => void
  onBlur?: (values: InputMaskedSegmentedFieldValue<T>) => void
  status?: FormStatusText
  statusState?: FormStatusState
  stretch?: boolean
  suffix?: ReactNode
  _omitInputShellClass?: boolean
  scopeRef?: RefObject<HTMLElement | null>
  optionsEnhancer?: (options: {
    overwriteMode?: InputMaskedOverwriteMode
  }) => unknown
} & Omit<
  HTMLProps<HTMLInputElement>,
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'ref'
  | 'value'
  | 'label'
  | 'placeholder'
  | 'size'
  | 'onSubmit'
  | 'onKeyDown'
> &
  SpacingProps &
  Pick<InputProps, 'size'>

export type InputMaskedSectionSelectionMode = 'all' | 'caret'

export type InputMaskedSegmentedFieldInputConfig = {
  id: string
  mask: RegExp[]
}

export type InputMaskedSegmentedFieldSectionProps = {
  groupId: string
  inputId: string
  itemProps: Omit<
    InputMaskedSegmentedFieldItem<string>,
    'id' | 'mask' | 'label'
  >
  value: string
  overwriteMode: InputMaskedOverwriteMode
  delimiter?: string
  groupDelimiter?: string
  disabled: boolean
  valuesRef: RefObject<Record<string, string>>
  inputs: InputMaskedSegmentedFieldInputConfig[]
  scopeRef: RefObject<HTMLElement | null>
  sectionRefs: RefObject<Record<string, HTMLSpanElement | null>>
  caretPositionsRef: RefObject<Record<string, number>>
  sectionSelectionModeRef: RefObject<
    Record<string, InputMaskedSectionSelectionMode>
  >
  wholeGroupSelectionUi: boolean
  clearGroupSelection: () => void
  clearSectionSelection: () => void
  selectWholeGroup: (inputId: string) => void
  selectSection: (inputId: string) => void
  setSectionCaret: (inputId: string, position: number) => void
  focusSection: (inputId: string, mode: 'all' | 'start' | 'end') => void
  onChange: (inputId: string, value: string) => void
  onGroupFocus: () => void
  onGroupBlur: (event: FocusEvent<HTMLSpanElement>) => void
} & Omit<
  HTMLProps<HTMLInputElement>,
  'onChange' | 'onFocus' | 'onBlur' | 'value'
>
