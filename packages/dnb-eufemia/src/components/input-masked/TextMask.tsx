import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useMaskito } from '@maskito/react'
import {
  maskitoTransform,
  maskitoUpdateElement,
  type MaskitoMask,
  type MaskitoOptions,
} from '@maskito/core'
import {
  maskitoCaretGuard,
  maskitoNumberOptionsGenerator,
} from '@maskito/kit'
import InputModeNumber from './text-mask/InputModeNumber'
import { isNil } from './text-mask/utilities'
import type { Mask, MaskFunction, Pipe } from './text-mask/types'
import type { NumberMaskFunction } from './addons/createNumberMask'

// Type for mask parameters
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

export type TextMaskMask =
  | Mask
  | MaskFunction
  | boolean
  | { mask?: Mask | MaskFunction; pipe?: Pipe }
export type TextMaskInputElement = React.ReactElement
export type TextMaskValue = string | number
export interface TextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  mask: TextMaskMask
  inputRef?: React.Ref<HTMLInputElement> &
    React.MutableRefObject<HTMLInputElement | null>
  inputElement?: TextMaskInputElement
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  guide?: boolean
  value?: TextMaskValue
  pipe?: Pipe
  placeholderChar?: string
  keepCharPositions?: boolean
  showMask?: boolean
}

export default function TextMask(props: TextMaskProps): JSX.Element {
  const {
    inputElement,
    inputRef,
    mask: rawMask,
    // Unused by Maskito but kept for API compatibility
    guide, // eslint-disable-line @typescript-eslint/no-unused-vars
    pipe, // eslint-disable-line @typescript-eslint/no-unused-vars
    placeholderChar,
    keepCharPositions, // eslint-disable-line @typescript-eslint/no-unused-vars
    value, // eslint-disable-line @typescript-eslint/no-unused-vars
    showMask, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = props

  const localRef = useRef<HTMLInputElement>(null)

  const [inputMode] = useState(() => new InputModeNumber())
  useEffect(() => () => inputMode.remove(), [inputMode])

  // Extract maskParams for dependency tracking
  const maskParams =
    typeof rawMask === 'function' && 'maskParams' in rawMask
      ? ((rawMask as NumberMaskFunction).maskParams as
          | MaskParams
          | undefined)
      : undefined

  const options = useMemo<MaskitoOptions | null>(() => {
    // Numeric mask: detect our internal number mask function
    if (
      typeof rawMask === 'function' &&
      'instanceOf' in rawMask &&
      'maskParams' in rawMask &&
      rawMask.instanceOf === 'createNumberMask' &&
      rawMask.maskParams
    ) {
      const mp = (rawMask as NumberMaskFunction).maskParams as MaskParams
      return createMaskitoNumberOptions(mp)
    }

    const mask = normalizeMask(rawMask, placeholderChar)
    if (!mask) return null
    return { mask }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rawMask,
    placeholderChar,

    // Include all properties that affect mask behavior
    maskParams?.thousandsSeparatorSymbol,
    maskParams?.decimalSymbol,
    maskParams?.allowDecimal,
    maskParams?.decimalLimit,
  ])

  const maskitoRef = useMaskito({ options })

  const setRefs = useCallback(
    (el: HTMLInputElement | null) => {
      // Attach to Maskito
      maskitoRef(el)
      if (inputRef) {
        if (typeof inputRef === 'object' && 'current' in inputRef) {
          inputRef.current = el
        } else if (typeof inputRef === 'function') {
          inputRef(el)
        }
      }
      localRef.current = el

      // Keep InputModeNumber behavior (iOS soft keyboard handling)
      if (el) {
        inputMode.setElement(el)
      }
    },
    [inputRef, maskitoRef, inputMode]
  )

  const params = useMemo(() => {
    const baseProps: Record<string, unknown> = { ...rest }
    // Conform controlled value before render so React renders formatted value
    if (
      options &&
      typeof baseProps.value === 'string' &&
      baseProps.value != null
    ) {
      const raw = String(baseProps.value)
      const sel: readonly [number, number] = [raw.length, raw.length]
      const { value: formatted } = maskitoTransform(
        { value: raw, selection: sel },
        options
      )
      baseProps.value = formatted
    }

    baseProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Conform programmatic value changes (e.g. tests firing change directly)
      if (localRef.current && options) {
        const element = localRef.current
        const selection: readonly [number, number] = [
          element.selectionStart ?? 0,
          element.selectionEnd ?? 0,
        ]
        const elementState = {
          value: e.target.value,
          selection,
        }
        const validated = maskitoTransform(elementState, options)
        maskitoUpdateElement(element, validated)
      }
      // Call original handler if given
      if (typeof rest.onChange === 'function') {
        rest.onChange(e)
      }
    }

    return baseProps
  }, [rest, options])

  // Conform initial value on mount/options change
  useEffect(() => {
    if (!localRef.current || !options) {
      return
    }

    const el = localRef.current

    // Always use the value prop - never use the formatted DOM value which could be in wrong locale format
    const valueToTransform = value
    if (valueToTransform === undefined || valueToTransform === null) {
      return
    }

    // For numeric masks, strip existing prefix/suffix before transforming
    let cleanValue = String(valueToTransform)
    if (typeof rawMask === 'function' && 'maskParams' in rawMask) {
      const mp = (rawMask as NumberMaskFunction).maskParams as MaskParams
      const prefix = mp.prefix ?? ''
      const suffix = mp.suffix ?? ''

      if (prefix && cleanValue.startsWith(prefix)) {
        cleanValue = cleanValue.slice(prefix.length)
      }
      if (suffix && cleanValue.endsWith(suffix)) {
        cleanValue = cleanValue.slice(0, -suffix.length)
      } else if (suffix && suffix.includes(' ')) {
        // Try to match partial suffix (e.g., ' kr' from ', kr')
        const suffixParts = suffix.split(' ')
        const lastPart = suffixParts[suffixParts.length - 1]
        if (lastPart && cleanValue.endsWith(lastPart)) {
          cleanValue = cleanValue.slice(0, -lastPart.length).trim()
        }
      }
    }

    const selection: readonly [number, number] = [
      el.selectionStart ?? cleanValue.length,
      el.selectionEnd ?? cleanValue.length,
    ]
    const validated = maskitoTransform(
      { value: cleanValue, selection },
      options
    )

    maskitoUpdateElement(el, validated)
  }, [options, value, rawMask])

  // Compute initial defaultValue for immediate render (before Maskito attaches)
  const defaultValue = useMemo(() => {
    const raw = typeof value === 'string' ? value : undefined
    if (!raw) {
      return undefined
    }
    if (!options) {
      return raw
    }
    // If we use numeric formatting (presence of postprocessors), format initial value.
    const hasFormatting =
      Array.isArray(options.postprocessors) &&
      options.postprocessors.length > 0
    if (!hasFormatting) {
      return raw
    }

    // For numeric masks, extract the numeric part before formatting
    // Maskito needs just the numeric value without any existing prefix/suffix
    let cleanValue = raw
    if (typeof rawMask === 'function' && 'maskParams' in rawMask) {
      const mp = (rawMask as NumberMaskFunction).maskParams as MaskParams
      const prefix = mp.prefix ?? ''
      const suffix = mp.suffix ?? ''

      // Strip any existing prefix/suffix from the value
      if (prefix && cleanValue.startsWith(prefix)) {
        cleanValue = cleanValue.slice(prefix.length)
      }
      // Try to strip the suffix - handle both with and without the full suffix pattern
      if (suffix && cleanValue.endsWith(suffix)) {
        cleanValue = cleanValue.slice(0, -suffix.length)
      } else if (suffix && suffix.includes(' ')) {
        // Handle partial suffix matching (e.g., ' kr' from ', kr')
        const suffixParts = suffix.split(' ')
        const lastPart = suffixParts[suffixParts.length - 1]
        if (lastPart && cleanValue.endsWith(lastPart)) {
          cleanValue = cleanValue.slice(0, -lastPart.length).trim()
        }
      }
    }

    const { value: formatted } = maskitoTransform(
      {
        value: cleanValue,
        selection: [cleanValue.length, cleanValue.length],
      },
      options
    )
    return formatted
  }, [options, value, rawMask])

  return inputElement ? (
    cloneElement(inputElement, {
      ...params,
      defaultValue,
      ref: setRefs,
    })
  ) : (
    <input ref={setRefs} defaultValue={defaultValue} {...params} />
  )
}

function normalizeMask(
  maskProp: TextMaskMask,
  placeholderChar?: string | null
): MaskitoMask | null {
  const pc = isNil(placeholderChar) ? '_' : placeholderChar

  // Handle combined object shape { mask, pipe }
  if (
    maskProp &&
    typeof maskProp === 'object' &&
    'mask' in maskProp &&
    !Array.isArray(maskProp)
  ) {
    return normalizeMask((maskProp as { mask?: TextMaskMask }).mask, pc)
  }

  // Support disabling mask with false
  if (maskProp === false) {
    return /^.*$/
  }

  // Array form: filter out caret traps from text-mask '[]'
  if (Array.isArray(maskProp)) {
    return (maskProp as Array<string | RegExp>).filter((t) => t !== '[]')
  }

  // RegExp passthrough
  if (maskProp instanceof RegExp) {
    return maskProp
  }

  // Function form: adapt text-mask signature to Maskito
  if (typeof maskProp === 'function') {
    const fn = maskProp as MaskFunction
    return (elementState) => {
      try {
        const result = fn(elementState.value, {
          // Text-mask typically passes 0 on initialization
          currentCaretPosition: 0,
          previousConformedValue: undefined,
          placeholderChar: pc,
        })
        if (result === false) {
          return [/^.*$/]
        }
        const arr = Array.isArray(result) ? result : []
        // Remove text-mask caret traps '[]'
        return (arr as Array<string | RegExp>).filter((t) => t !== '[]')
      } catch (e) {
        return [/^.*$/]
      }
    }
  }

  // Fallback — permissive mask
  return /^.*$/
}

function createMaskitoNumberOptions(mp: {
  decimalSymbol?: string
  thousandsSeparatorSymbol?: string
  allowDecimal?: boolean
  decimalLimit?: number
  integerLimit?: number
  allowNegative?: boolean
  disallowLeadingZeroes?: boolean
  prefix?: string
  suffix?: string
}): MaskitoOptions {
  // Use Maskito number kit as base to format numbers and grouping
  const decimal = mp.decimalSymbol ?? ','
  const thousand = mp.thousandsSeparatorSymbol ?? ' '
  const prefix = mp.prefix ?? ''
  const suffix = mp.suffix ?? ''
  const allowNegative = mp.allowNegative !== false
  const min = allowNegative ? Number.MIN_SAFE_INTEGER : 0
  // If allowDecimal is true but decimalLimit is not specified, use a default of 10
  // Otherwise use decimalLimit if specified, or 0 if decimals are not allowed
  const defaultDecimalLimit = mp.allowDecimal === true ? 10 : 0
  const maximumFractionDigits = Math.max(
    0,
    Number(mp.decimalLimit ?? defaultDecimalLimit)
  )

  // Check if suffix starts with a comma - this is a special pattern like ',- kr'
  const suffixStartsWithComma = suffix && suffix.startsWith(',')
  const postfixToUse = suffixStartsWithComma ? suffix.slice(1) : suffix

  const base = maskitoNumberOptionsGenerator({
    min,
    max: Number.MAX_SAFE_INTEGER,
    thousandSeparator: thousand,
    decimalSeparator: decimal,
    maximumFractionDigits,
    minimumFractionDigits: 0,
    prefix,
    postfix: postfixToUse,
    decimalPseudoSeparators: ['.', ',', '·'],
  })

  const caretGuard = maskitoCaretGuard((value) => {
    const left = prefix ? prefix.length : 0
    const right = postfixToUse ? postfixToUse.length : 0
    const max = Math.max(left, value.length - right)
    return [left, max] as [number, number]
  })

  // If suffix starts with comma, add a postprocessor to insert it before the postfix
  const postprocessors = suffixStartsWithComma
    ? [
        ...(base.postprocessors || []),
        (elementState: any) => {
          // Always add the comma before the postfix for this suffix pattern
          const prefixLen = prefix ? prefix.length : 0
          const postfixLen = postfixToUse ? postfixToUse.length : 0
          const valueWithoutAffixes = elementState.value.slice(
            prefixLen,
            elementState.value.length - postfixLen
          )
          const newValue =
            prefix + valueWithoutAffixes + ',' + postfixToUse
          return { ...elementState, value: newValue }
        },
      ]
    : base.postprocessors

  const plugins = [...(base.plugins || []), caretGuard]

  return {
    ...base,
    plugins,
    postprocessors,
  }

  // const decimal = mp.decimalSymbol ?? ','
  // const thousand = mp.thousandsSeparatorSymbol ?? ' '
  // const allowedDecimals =
  //   (typeof mp.decimalLimit === 'number' ? mp.decimalLimit : 2) > 0 ||
  //   mp.allowDecimal !== false
  // const decimalLimit =
  //   typeof mp.decimalLimit === 'number'
  //     ? mp.decimalLimit
  //     : allowedDecimals
  //     ? 2
  //     : 0
  // const integerLimit =
  //   typeof mp.integerLimit === 'number' ? mp.integerLimit : Infinity
  // const allowNegative = mp.allowNegative !== false
  // const disallowLeadingZeroes = !!mp.disallowLeadingZeroes
  // const prefix = mp.prefix ?? ''
  // const suffix = mp.suffix ?? ''

  // const escapeReg = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // const minusRe = /^-+/

  // let lastWasDecimal = false
  // let pendingBatchedDecimal = false
  // const pre: MaskitoPreprocessor = (
  //   { elementState, data },
  //   actionType
  // ) => {
  //   // Normalize multi-char inserts (e.g. '0.1')
  //   if (
  //     actionType === 'insert' &&
  //     data &&
  //     data.length > 1 &&
  //     allowedDecimals
  //   ) {
  //     const atEnd =
  //       (elementState.selection?.[1] ?? 0) === elementState.value.length
  //     const nextState = atEnd
  //       ? elementState
  //       : {
  //           value: elementState.value,
  //           selection: [
  //             elementState.value.length,
  //             elementState.value.length,
  //           ] as const,
  //         }
  //     pendingBatchedDecimal = /[.,·]/.test(String(data))
  //     const normalized = String(data).replace(/[.,·]/g, decimal)
  //     return { elementState: nextState, data: normalized }
  //   }
  //   // Normalize and inject decimal symbol on insert
  //   if (
  //     actionType === 'insert' &&
  //     allowedDecimals &&
  //     (data === '.' || data === decimal)
  //   ) {
  //     const atEnd =
  //       (elementState.selection?.[1] ?? 0) === elementState.value.length
  //     const nextState = atEnd
  //       ? elementState
  //       : {
  //           value: elementState.value,
  //           selection: [
  //             elementState.value.length,
  //             elementState.value.length,
  //           ] as const,
  //         }
  //     // If decimal is not present yet, inject it immediately and consume the input
  //     if (!nextState.value.includes(decimal)) {
  //       lastWasDecimal = true
  //       pendingBatchedDecimal = true
  //       return {
  //         elementState: {
  //           value: `${nextState.value}${decimal}`,
  //           selection: [
  //             nextState.value.length + 1,
  //             nextState.value.length + 1,
  //           ] as const,
  //         },
  //         data: '',
  //       }
  //     }
  //     lastWasDecimal = true
  //     pendingBatchedDecimal = true
  //     return { elementState: nextState, data: '' }
  //   }
  //   if (
  //     actionType === 'insert' &&
  //     data &&
  //     /\d/.test(data) &&
  //     lastWasDecimal
  //   ) {
  //     lastWasDecimal = false
  //     if (!elementState.value.includes(decimal)) {
  //       const atEnd =
  //         (elementState.selection?.[1] ?? 0) === elementState.value.length
  //       const next = atEnd
  //         ? `${elementState.value}${decimal}`
  //         : `${elementState.value}${decimal}`
  //       return {
  //         elementState: {
  //           value: next,
  //           selection: [next.length, next.length] as const,
  //         },
  //         data,
  //       }
  //     }
  //   }
  //   if (actionType === 'insert' && data && data.length === 1) {
  //     const atEnd =
  //       (elementState.selection?.[1] ?? 0) === elementState.value.length
  //     if (!atEnd) {
  //       return {
  //         elementState: {
  //           value: elementState.value,
  //           selection: [
  //             elementState.value.length,
  //             elementState.value.length,
  //           ] as const,
  //         },
  //         data,
  //       }
  //     }
  //   }
  //   return { elementState, data }
  // }

  // const post: MaskitoPostprocessor = (elementState) => {
  //   const originalSelection = elementState.selection
  //   const wasAtEnd =
  //     (originalSelection?.[1] ?? 0) === (elementState.value?.length ?? 0)
  //   let raw = elementState.value || ''

  //   // Edge case: user typed a decimal separator just before a digit, but it was consumed upstream
  //   if (lastWasDecimal && !raw.includes(decimal) && /^0\d+/.test(raw)) {
  //     raw = `0${decimal}${raw.slice(1)}`
  //     lastWasDecimal = false
  //   }
  //   // Edge case: batched decimal typing that collapsed to a single digit
  //   if (
  //     pendingBatchedDecimal &&
  //     allowedDecimals &&
  //     disallowLeadingZeroes &&
  //     !raw.includes(decimal) &&
  //     /^\d$/.test(raw)
  //   ) {
  //     raw = `0${decimal}${raw}`
  //     pendingBatchedDecimal = false
  //   }
  //   // Another edge-case: batched input '0.1' may come as '01'
  //   if (
  //     disallowLeadingZeroes &&
  //     allowedDecimals &&
  //     !raw.includes(decimal) &&
  //     /^0\d$/.test(raw) &&
  //     pendingBatchedDecimal
  //   ) {
  //     raw = `0${decimal}${raw.slice(1)}`
  //   }

  //   // Strip prefix/suffix and spaces
  //   if (prefix && raw.startsWith(prefix)) raw = raw.slice(prefix.length)
  //   if (suffix && raw.endsWith(suffix)) raw = raw.slice(0, -suffix.length)

  //   raw = raw.replace(new RegExp(escapeReg(thousand), 'g'), '')
  //   raw = raw.replace(/\s+/g, '')

  //   // Replace alternative decimal to configured one
  //   raw = raw.replace(/[.,·]/g, (m) =>
  //     m === decimal ? decimal : allowedDecimals ? decimal : ''
  //   )

  //   // Handle minus
  //   let negative = false
  //   if (allowNegative && minusRe.test(raw)) {
  //     negative = true
  //   }
  //   raw = raw.replace(/-/g, '')

  //   // Keep only digits and optional single decimal
  //   const parts = raw.split(decimal)
  //   let integers = parts[0].replace(/\D+/g, '')
  //   let fraction =
  //     allowedDecimals && parts.length > 1 ? parts.slice(1).join('') : ''
  //   fraction = fraction.replace(/\D+/g, '')

  //   // If we have a fractional part but no integer part, add leading zero
  //   if (allowedDecimals && fraction.length > 0 && integers.length === 0) {
  //     integers = '0'
  //   }

  //   // Integer limit
  //   if (integerLimit !== Infinity && integers.length > integerLimit) {
  //     integers = integers.slice(0, integerLimit)
  //   }

  //   // Disallow leading zeroes when more than one digit before decimal
  //   if (integers.length > 1) {
  //     // Keep a single leading zero if we have a fractional part (e.g. 0,1)
  //     if (!disallowLeadingZeroes) {
  //       // legacy behavior allows leading zeroes unless explicitly disallowed
  //     } else if (allowedDecimals && fraction.length > 0) {
  //       integers = integers.replace(/^0+/, '0')
  //     } else {
  //       integers = integers.replace(/^0+/, '') || '0'
  //     }
  //   }

  //   // Trim fraction
  //   if (!allowedDecimals) {
  //     fraction = ''
  //   } else if (decimalLimit >= 0) {
  //     fraction = fraction.slice(0, decimalLimit)
  //   }

  //   // Add thousands separators
  //   const withThousands = integers.replace(
  //     /\B(?=(\d{3})+(?!\d))/g,
  //     thousand
  //   )

  //   // Build final value
  //   let next = `${negative ? '-' : ''}${withThousands}`
  //   if (allowedDecimals && fraction.length > 0) {
  //     next += `${decimal}${fraction}`
  //   }
  //   // Only append prefix/suffix when we actually have any digits
  //   if (next.length > 0) {
  //     if (prefix) next = `${prefix}${next}`
  //     if (suffix) next = `${next}${suffix}`
  //   }

  //   const nextSelection = wasAtEnd
  //     ? ([next?.length ?? 0, next?.length ?? 0] as const)
  //     : originalSelection
  //   const result = { value: next, selection: nextSelection }
  //   // Reset batched decimal hint after applying one cycle
  //   pendingBatchedDecimal = false
  //   return result
  // }

  // const caretGuard = maskitoCaretGuard((value) => {
  //   const left = prefix ? prefix.length : 0
  //   const right = suffix ? suffix.length : 0
  //   const max = Math.max(left, value.length - right)
  //   return [left, max] as [number, number]
  // })

  // return {
  //   mask: /^.*$/,
  //   preprocessors: [pre],
  //   postprocessors: [post],
  //   plugins: [caretGuard],
  //   // overwriteMode: 'replace',
  // }
}

TextMask.defaultProps = {
  inputElement: null,
  inputRef: null,
  onChange: null,
  guide: null,
  value: null,
  pipe: null,
  placeholderChar: null,
  keepCharPositions: null,
  showMask: null,
}
