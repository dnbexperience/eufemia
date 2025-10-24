import React from 'react'
import { useMaskito } from '@maskito/react'
import {
  maskitoTransform,
  maskitoUpdateElement,
  type MaskitoPostprocessor,
  type MaskitoPreprocessor,
  type MaskitoMask,
  type MaskitoOptions,
} from '@maskito/core'
import InputModeNumber from './text-mask/InputModeNumber'
import {
  maskitoCaretGuard,
  maskitoNumberOptionsGenerator,
} from '@maskito/kit'
import { isNil } from './text-mask/utilities'
import type { Mask, MaskFunction, Pipe } from './text-mask/types'

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
  inputRef?: React.RefObject<HTMLInputElement>
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

  const localRef = React.useRef<HTMLInputElement>(null)

  const [inputMode] = React.useState(() => new InputModeNumber())
  React.useEffect(() => () => inputMode.remove(), [inputMode])

  const options = React.useMemo<MaskitoOptions | null>(() => {
    // Numeric mask: detect our internal number mask function
    if (
      typeof rawMask === 'function' &&
      (rawMask as any).instanceOf === 'createNumberMask' &&
      (rawMask as any).maskParams
    ) {
      const mp = (rawMask as any).maskParams as {
        decimalSymbol?: string
        thousandsSeparatorSymbol?: string
        allowDecimal?: boolean
        decimalLimit?: number
        integerLimit?: number
        allowNegative?: boolean
        prefix?: string
        suffix?: string
      }
      return createMaskitoNumberOptions(mp)
    }

    const mask = normalizeMask(rawMask, placeholderChar)
    if (!mask) return null
    return { mask }
  }, [rawMask, placeholderChar])

  const maskitoRef = useMaskito({ options })

  const setRefs = React.useCallback(
    (el: HTMLInputElement | null) => {
      // Attach to Maskito
      maskitoRef(el as any)
      // Provide to consumer ref
      if (inputRef && 'current' in (inputRef as any)) {
        ;(inputRef as React.RefObject<HTMLInputElement>).current = el
      } else if (typeof inputRef === 'function') {
        ;(inputRef as (instance: HTMLInputElement | null) => void)?.(el)
      }
      localRef.current = el
      // Keep InputModeNumber behavior (iOS soft keyboard handling)
      if (el) {
        inputMode.setElement(el)
      }
    },
    [inputRef, maskitoRef, inputMode]
  )

  const params = React.useMemo(() => {
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
        ;(rest.onChange as React.ChangeEventHandler<HTMLInputElement>)(e)
      }
    }

    return baseProps as any
  }, [rest, options])

  // Conform initial value on mount/options change
  React.useEffect(() => {
    if (!localRef.current || !options) return
    const el = localRef.current
    const selection: readonly [number, number] = [
      el.selectionStart ?? el.value.length,
      el.selectionEnd ?? el.value.length,
    ]
    const validated = maskitoTransform(
      { value: el.value, selection },
      options
    )
    maskitoUpdateElement(el, validated)
  }, [options])

  // Compute initial defaultValue for immediate render (before Maskito attaches)
  const defaultValue = React.useMemo(() => {
    const raw =
      typeof (props as any).value === 'string'
        ? (props as any).value
        : undefined
    if (!raw) return undefined
    if (!options) return raw
    // If we use numeric formatting (presence of postprocessors), format initial value.
    const hasFormatting =
      Array.isArray((options as any).postprocessors) &&
      (options as any).postprocessors.length > 0
    if (!hasFormatting) return raw
    const { value: formatted } = maskitoTransform(
      { value: raw, selection: [raw.length, raw.length] },
      options
    )
    return formatted
  }, [options, (props as any).value])

  return inputElement ? (
    React.cloneElement(inputElement, {
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
  const pc = isNil(placeholderChar) ? '_' : placeholderChar!

  // Handle combined object shape { mask, pipe }
  if (
    maskProp &&
    typeof maskProp === 'object' &&
    'mask' in (maskProp as any)
  ) {
    return normalizeMask((maskProp as any).mask, pc)
  }

  // Support disabling mask with false
  if (maskProp === false) {
    return /^.*$/
  }

  // Array form: filter out caret traps from text-mask '[]'
  if (Array.isArray(maskProp)) {
    return (maskProp as Array<string | RegExp>).filter(
      (t) => t !== '[]'
    ) as any
  }

  // RegExp passthrough
  if (maskProp instanceof RegExp) {
    return maskProp as any
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
        } as any)
        if (result === false) {
          return [/^.*$/]
        }
        const arr = Array.isArray(result) ? result : []
        // Remove text-mask caret traps '[]'
        return (arr as Array<string | RegExp>).filter(
          (t) => t !== '[]'
        ) as any
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
  const maximumFractionDigits = Math.max(0, Number(mp.decimalLimit ?? 0))

  const base = maskitoNumberOptionsGenerator({
    min,
    max: Number.MAX_SAFE_INTEGER,
    thousandSeparator: thousand,
    decimalSeparator: decimal,
    maximumFractionDigits,
    minimumFractionDigits: 0,
    prefix,
    postfix: suffix,
    decimalPseudoSeparators: ['.', ',', '·'],
  })

  const caretGuard = maskitoCaretGuard((value) => {
    const left = prefix ? prefix.length : 0
    const right = suffix ? suffix.length : 0
    const max = Math.max(left, value.length - right)
    return [left, max] as [number, number]
  })

  return {
    ...base,
    plugins: [...(base.plugins || []), caretGuard],
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
