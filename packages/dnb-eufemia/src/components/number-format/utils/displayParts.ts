import type {
  FormatPartItem,
  NumberFormatOptionParams,
  NumberFormatReturnValue,
} from './types'

/**
 * Internal metadata for consumers that need semantic display boundaries.
 * Public formatter calls keep their return shape unchanged unless this
 * opt-in flag is set by an internal caller.
 */
export const numberFormatDisplayPartsSymbol = Symbol(
  'NumberFormat.displayParts'
)

export type NumberFormatInternalOptionParams = NumberFormatOptionParams & {
  returnDisplayParts?: boolean
}

export type NumberFormatReturnValueWithDisplayParts =
  NumberFormatReturnValue & {
    [numberFormatDisplayPartsSymbol]?: FormatPartItem[]
  }
