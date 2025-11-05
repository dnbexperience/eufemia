export type Mask = Array<string | RegExp>

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
  meta: {
    someCharsRejected: boolean
  }
}

export type MaskFunction = (
  rawValue: string,
  config?: ConformToMaskConfig
) => Mask

export type CaretAdjustmentArgs = {
  previousConformedValue?: string
  previousPlaceholder?: string
  currentCaretPosition?: number
  conformedValue: string
  rawValue: string
  placeholderChar: string
  placeholder: string
  indexesOfPipedChars?: number[]
  caretTrapIndexes?: number[]
  keepCharPositions?: boolean
}

export type MaskParams = {
  decimalSymbol?: string
  thousandsSeparatorSymbol?: string
  allowDecimal?: boolean
  decimalLimit?: number
  integerLimit?: number
  allowNegative?: boolean
  prefix?: string
  suffix?: string
  disallowLeadingZeroes?: boolean
  min?: number
  max?: number
}
