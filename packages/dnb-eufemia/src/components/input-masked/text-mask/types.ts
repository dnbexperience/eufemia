export type MaskChar = string | RegExp
export type Mask = MaskChar[]

export type MaskFunctionConfig = {
  currentCaretPosition?: number | null
  previousConformedValue?: string
  placeholderChar?: string
}

export type MaskFunction = (
  rawValue: string,
  config: MaskFunctionConfig
) => Mask | false

export type ConformToMaskConfig = {
  guide?: boolean
  previousConformedValue?: string
  placeholderChar?: string
  placeholder?: string
  currentCaretPosition?: number
  keepCharPositions?: boolean
}

export type ConformToMaskResult = {
  conformedValue: string
  meta: { someCharsRejected: boolean }
}

export type PipeResult = {
  value: string
  indexesOfPipedChars?: number[]
  rejected?: boolean
}

export type Pipe = (
  conformedValue: string,
  args: { rawValue: string } & ConformToMaskConfig
) => PipeResult | string | false

export type CaretAdjustmentArgs = {
  previousConformedValue: string
  previousPlaceholder: string
  currentCaretPosition: number
  conformedValue: string
  rawValue: string
  placeholderChar: string
  placeholder: string
  indexesOfPipedChars?: number[]
  caretTrapIndexes?: number[]
  keepCharPositions?: boolean
}
