import type { FocusEvent, HTMLProps, ReactNode, RefObject } from 'react'
import type { InputProps } from '../../Input'
import type { FormStatusState, FormStatusText } from '../../FormStatus'
import type { SpacingProps } from '../../space/types'

export type OverwriteMode = 'shift' | 'replace'

export type SegmentedFieldSpinButton = {
  min: number
  max: number
  step?: number
  wrap?: boolean
  getInitialValue?: () => number | undefined
  formatValue?: (value: number) => string
  parseValue?: (value: string) => number | undefined
}

export type SegmentedFieldItem<T extends string> = {
  id: T
  label: ReactNode
  mask: RegExp[]
  spinButton?: SegmentedFieldSpinButton
} & Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'ref'>

export type SegmentedFieldValue<T extends string> = {
  [_K in T]: string
}

export type SegmentedFieldProps<T extends string> = {
  label?: ReactNode
  labelDirection?: 'vertical' | 'horizontal'
  inputs: SegmentedFieldItem<T>[]
  values?: SegmentedFieldValue<T>
  overwriteMode?: OverwriteMode
  delimiter?: string
  onChange?: (values: SegmentedFieldValue<T>) => void
  onFocus?: (values: SegmentedFieldValue<T>) => void
  onBlur?: (values: SegmentedFieldValue<T>) => void
  status?: FormStatusText
  statusState?: FormStatusState
  stretch?: boolean
  suffix?: ReactNode
  _omitInputShellClass?: boolean
  scopeRef?: RefObject<HTMLElement | null>
  optionsEnhancer?: (options: { overwriteMode?: OverwriteMode }) => unknown
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

export type SectionSelectionMode = 'all' | 'caret'

export type SegmentedFieldInputConfig = {
  id: string
  mask: RegExp[]
}

export type SegmentedFieldSectionProps = {
  groupId: string
  inputId: string
  itemProps: Omit<SegmentedFieldItem<string>, 'id' | 'mask' | 'label'>
  value: string
  overwriteMode: OverwriteMode
  delimiter?: string
  groupDelimiter?: string
  disabled: boolean
  valuesRef: RefObject<Record<string, string>>
  inputs: SegmentedFieldInputConfig[]
  scopeRef: RefObject<HTMLElement | null>
  sectionRefs: RefObject<Record<string, HTMLSpanElement | null>>
  caretPositionsRef: RefObject<Record<string, number>>
  sectionSelectionModeRef: RefObject<Record<string, SectionSelectionMode>>
  groupSelectionRef: RefObject<boolean>
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
