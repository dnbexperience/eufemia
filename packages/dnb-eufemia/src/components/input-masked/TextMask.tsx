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
import { MaskParams } from './text-mask/types'
import { createNumberMask } from './hooks/useNumberMask'

export type TextMaskMask =
  | RegExp
  | Array<RegExp | string>
  | false
  | typeof createNumberMask
export type TextMaskInputElement = React.ReactElement
export type TextMaskValue = string | number
export interface TextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  mask: TextMaskMask
  inputRef?: React.Ref<HTMLInputElement> &
    React.MutableRefObject<HTMLInputElement | null>
  inputElement?: TextMaskInputElement
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: TextMaskValue
  showMask?: boolean
  // Advanced: allow parent to enhance Maskito options without TextMask importing extras
  optionsEnhancer?: (opts: MaskitoOptions | null) => MaskitoOptions | null
  // Optional: display-time ghost placeholder string for regex masks
  ghostPlaceholder?: string
  // Optional: strip display value (e.g., remove ghost chars) before bubbling
  stripValue?: (displayValue: string) => string
}

export default function TextMask(props: TextMaskProps): JSX.Element {
  const {
    inputElement,
    inputRef,
    mask: rawMask,
    value,
    showMask,
    optionsEnhancer,
    ghostPlaceholder,
    stripValue,
    ...rest
  } = props

  const localRef = useRef<HTMLInputElement>(null)

  const [inputMode] = useState(() => new InputModeNumber())
  useEffect(() => () => inputMode.remove(), [inputMode])

  // Extract maskParams for dependency tracking
  const maskParams =
    typeof rawMask === 'function' && 'maskParams' in rawMask
      ? (rawMask.maskParams as MaskParams | undefined)
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
      const mp = rawMask.maskParams as MaskParams
      return createMaskitoNumberOptions(mp)
    }

    const mask = normalizeMask(rawMask)
    if (!mask) {
      return null
    }

    return { mask }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rawMask,

    // Include all properties that affect mask behavior
    maskParams?.thousandsSeparatorSymbol,
    maskParams?.decimalSymbol,
    maskParams?.allowDecimal,
    maskParams?.decimalLimit,
  ])

  const enhancedOptions = useMemo<MaskitoOptions | null>(() => {
    return typeof optionsEnhancer === 'function'
      ? optionsEnhancer(options)
      : options
  }, [options, optionsEnhancer])

  const maskitoRef = useMaskito({ options: enhancedOptions })

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
      enhancedOptions &&
      typeof baseProps.value === 'string' &&
      baseProps.value != null
    ) {
      const raw = String(baseProps.value)
      const sel: readonly [number, number] = [raw.length, raw.length]
      const { value: formatted } = maskitoTransform(
        { value: raw, selection: sel },
        enhancedOptions
      )
      baseProps.value = formatted
    }

    baseProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Conform programmatic value changes (e.g. tests firing change directly)
      if (localRef.current && enhancedOptions) {
        const element = localRef.current
        const selection: readonly [number, number] = [
          element.selectionStart ?? 0,
          element.selectionEnd ?? 0,
        ]
        const elementState = {
          value: e.target.value,
          selection,
        }
        const validated = maskitoTransform(elementState, enhancedOptions)
        maskitoUpdateElement(element, validated)
      }
      // Call original handler if given
      if (typeof rest.onChange === 'function') {
        if (typeof stripValue === 'function') {
          const v = stripValue(e.target.value)
          rest.onChange({ target: { value: v } } as any)
        } else {
          rest.onChange(e)
        }
      }
    }

    return baseProps
  }, [rest, enhancedOptions])

  // Conform initial value on mount/options change
  useEffect(() => {
    if (!localRef.current || !enhancedOptions) {
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
      const mp = rawMask.maskParams as MaskParams
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
      enhancedOptions
    )

    maskitoUpdateElement(el, validated)
  }, [enhancedOptions, value, rawMask])

  // Compute initial defaultValue for immediate render (before Maskito attaches)
  const defaultValue = useMemo(() => {
    const raw = typeof value === 'string' ? value : undefined

    // Handle empty value with showMask for numeric masks
    if (!raw && showMask) {
      if (ghostPlaceholder) {
        return ghostPlaceholder
      }
      // Check if this is a numeric mask with prefix/suffix
      if (typeof rawMask === 'function' && 'maskParams' in rawMask) {
        const mp = rawMask.maskParams as MaskParams
        const prefix = mp.prefix ?? ''
        const suffix = mp.suffix ?? ''

        // Return prefix + suffix if showMask is true
        if (prefix || suffix) {
          return prefix + suffix
        }
      }
      return undefined
    }

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
      const mp = rawMask.maskParams as MaskParams
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
  }, [enhancedOptions, value, rawMask, showMask, ghostPlaceholder])

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

function normalizeMask(maskProp: TextMaskMask): MaskitoMask | null {
  // Handle combined object shape { mask }
  if (
    maskProp &&
    typeof maskProp === 'object' &&
    'mask' in maskProp &&
    !Array.isArray(maskProp)
  ) {
    return normalizeMask((maskProp as { mask?: TextMaskMask }).mask)
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
  // If allowDecimal is true but decimalLimit is not specified, use a default of 2
  // Otherwise use decimalLimit if specified, or 0 if decimals are not allowed
  const defaultDecimalLimit = mp.allowDecimal === true ? 2 : 0
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
    minusSign: '-', // Define "-" (U+002D) because Maskito uses "−" (U+2212) by default, and would replace "-" (U+002D) with it.
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
}
