import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  JSX,
  MutableRefObject,
  ReactElement,
  Ref,
} from 'react'
import { useMaskito } from '@maskito/react'
import {
  maskitoTransform,
  maskitoUpdateElement,
  type MaskitoPostprocessor,
  type MaskitoPreprocessor,
  type MaskitoMask,
  type MaskitoMaskExpression,
  type MaskitoOptions,
} from '@maskito/core'
import {
  maskitoCaretGuard,
  maskitoNumberOptionsGenerator,
} from '@maskito/kit'
import InputModeNumber from './text-mask/InputModeNumber'
import type { MaskParams } from './text-mask/types'
import type { createNumberMask } from './hooks/useNumberMask'
export type TextMaskMask =
  | RegExp
  | Array<RegExp | string>
  | false
  | typeof createNumberMask
export type TextMaskInputElement = ReactElement<any>
export type TextMaskValue = string | number
export type TextMaskProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'size'
> & {
  mask: TextMaskMask
  inputRef?: Ref<HTMLInputElement> &
    MutableRefObject<HTMLInputElement | null>
  inputElement?: TextMaskInputElement
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: TextMaskValue
  size?: number
  showMask?: boolean
  // Advanced: allow parent to enhance Maskito options without TextMask importing extras
  optionsEnhancer?: (opts: MaskitoOptions | null) => MaskitoOptions | null
  // Optional: display-time ghost placeholder string for regex masks
  ghostPlaceholder?: string
  // Optional: strip display value (e.g., remove ghost chars) before bubbling
  stripValue?: (displayValue: string) => string
  allowOverflow?: boolean
  overwriteMode?: MaskitoOptions['overwriteMode']
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
    allowOverflow,
    overwriteMode,
    ...rest
  } = props

  const localRef = useRef<HTMLInputElement>(null)

  const [inputMode] = useState(() => new InputModeNumber())
  useEffect(() => () => inputMode.remove(), [inputMode])

  // Extract maskParams for dependency tracking
  const maskParams =
    typeof rawMask === 'object' &&
    rawMask !== null &&
    'maskParams' in rawMask
      ? (rawMask.maskParams as MaskParams | undefined)
      : undefined

  const separatorTokens = useMemo(
    () => getSeparatorTokens(rawMask),
    [rawMask]
  )

  const options = useMemo<MaskitoOptions | null>(() => {
    // Numeric mask: detect our internal number mask object
    if (
      typeof rawMask === 'object' &&
      rawMask !== null &&
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

    const overflowAwareMask = allowOverflow
      ? withOverflowSupport(mask)
      : mask

    const preprocessors: MaskitoPreprocessor[] = Array.isArray(mask)
      ? [
          (({ elementState, data }, actionType) => {
            // Handle backspace over separator tokens for array masks so the caret skips over the token without the user having to press backspace twice.
            if (actionType === 'deleteBackward') {
              const value = elementState.value
              const [selectionStart, selectionEnd] = elementState.selection
              const isSeparatorBeforeCaret = separatorTokens.includes(
                value[selectionStart - 1]
              )

              if (isSeparatorBeforeCaret) {
                const newCaretPosition = selectionStart - 1

                const valueBeforeCaret = value.slice(0, selectionStart)
                const valueAfterCaret = value.slice(selectionEnd)

                return {
                  elementState: {
                    value: valueAfterCaret
                      ? `${valueBeforeCaret}${valueAfterCaret}`
                      : valueBeforeCaret.slice(0, -1),
                    selection: [newCaretPosition, newCaretPosition],
                  },
                  data,
                }
              }

              return { elementState, data }
            }
            return { elementState, data }
          }) as MaskitoPreprocessor,
        ]
      : []

    return {
      mask: overflowAwareMask,
      ...(preprocessors.length > 0 ? { preprocessors } : {}),
      ...(overwriteMode != null ? { overwriteMode } : {}),
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- list individual maskParams properties instead of the object reference to avoid rebuilding the mask on every render when only the reference changes
  }, [
    rawMask,
    allowOverflow,
    overwriteMode,

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

    baseProps.onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          rest.onChange({
            target: { value: v },
          } as ChangeEvent<HTMLInputElement>)
        } else {
          rest.onChange(e)
        }
      }
    }

    return baseProps
  }, [rest, enhancedOptions, stripValue])

  // Track previous value so we can detect transitions to null/undefined
  const prevValueRef = useRef<TextMaskValue | undefined | null>(undefined)

  // Conform initial value on mount/options change
  useEffect(() => {
    if (!localRef.current || !enhancedOptions) {
      return
    }

    const el = localRef.current

    // Always use the value prop - never use the formatted DOM value which could be in wrong locale format
    const valueToTransform = value
    if (valueToTransform === undefined || valueToTransform === null) {
      // Clear the element when value transitions from a real value to
      // null/undefined, so the input does not keep showing a stale
      // formatted value (e.g. when PushContainer clears its data).
      // Skip on mount (prevValueRef is undefined) to preserve showMask.
      if (prevValueRef.current != null && el.value !== '') {
        maskitoUpdateElement(el, { value: '', selection: [0, 0] })
      }
      prevValueRef.current = valueToTransform
      return
    }

    // For numeric masks, strip existing prefix/suffix before transforming
    const cleanValue = cleanNumericValue(String(valueToTransform), rawMask)

    const selection: readonly [number, number] = [
      el.selectionStart ?? cleanValue.length,
      el.selectionEnd ?? cleanValue.length,
    ]
    const validated = maskitoTransform(
      { value: cleanValue, selection },
      enhancedOptions
    )

    // Only update if the formatted value actually changed to preserve Maskito's caret positioning.
    if (el.value !== validated.value) {
      maskitoUpdateElement(el, validated)
    }

    prevValueRef.current = valueToTransform
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
      if (
        typeof rawMask === 'object' &&
        rawMask !== null &&
        'maskParams' in rawMask
      ) {
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
    const cleanValue = cleanNumericValue(raw, rawMask)

    const { value: formatted } = maskitoTransform(
      {
        value: cleanValue,
        selection: [cleanValue.length, cleanValue.length],
      },
      options
    )
    return formatted
  }, [value, showMask, options, rawMask, ghostPlaceholder])

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

function withOverflowSupport(mask: MaskitoMask): MaskitoMask {
  if (Array.isArray(mask)) {
    const baseMask = [...mask]
    return (state) => appendOverflowTokens(baseMask, state?.value ?? '')
  }

  if (typeof mask === 'function') {
    return (state) => {
      const resolved = mask(state)
      if (!Array.isArray(resolved)) {
        return resolved
      }
      return appendOverflowTokens(resolved, state?.value ?? '')
    }
  }

  return mask
}

const ALL_CHARACTERS = /[\s\S]/

function appendOverflowTokens(
  maskExpression: MaskitoMaskExpression,
  currentValue: string
): MaskitoMaskExpression {
  if (!Array.isArray(maskExpression)) {
    return maskExpression
  }

  const userSlots = countUserSlots(maskExpression)
  const userInputLength = countUserInputLength(
    currentValue,
    maskExpression
  )
  const overflow = Math.max(0, userInputLength - userSlots)
  if (overflow <= 0) {
    return maskExpression
  }

  const lastUserSlot = getLastUserSlot(maskExpression)

  return maskExpression.concat(
    Array.from({ length: overflow }, () => lastUserSlot)
  )
}

function getLastUserSlot(maskExpression: MaskitoMaskExpression): RegExp {
  if (!Array.isArray(maskExpression)) {
    return ALL_CHARACTERS
  }

  for (let i = maskExpression.length - 1; i >= 0; i--) {
    if (maskExpression[i] instanceof RegExp) {
      return maskExpression[i] as RegExp
    }
  }

  return ALL_CHARACTERS
}

function countUserSlots(maskExpression: MaskitoMaskExpression) {
  if (!Array.isArray(maskExpression)) {
    return 0
  }
  return maskExpression.reduce((count, token) => {
    return count + (typeof token === 'string' ? 0 : 1)
  }, 0)
}

function getSeparatorTokens(maskExpression: TextMaskMask) {
  if (!Array.isArray(maskExpression)) {
    return []
  }
  return maskExpression.filter(
    (token): token is string =>
      typeof token === 'string' && token.length > 0
  )
}

function countUserInputLength(
  value: string,
  maskExpression: MaskitoMaskExpression
) {
  if (typeof value !== 'string') {
    return value == null ? 0 : String(value).length
  }
  if (!Array.isArray(maskExpression) || !maskExpression.length) {
    return value.length
  }

  let strippedValue = value
  for (const token of maskExpression) {
    if (typeof token === 'string' && token.length > 0) {
      const escaped = escapeRegExp(token)
      strippedValue = strippedValue.replace(new RegExp(escaped, 'g'), '')
    }
  }

  return strippedValue.length
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

function stripAffixes(
  value: string,
  prefix: string,
  suffix: string
): string {
  let result = value

  if (prefix && result.startsWith(prefix)) {
    result = result.slice(prefix.length)
  }

  if (suffix && result.endsWith(suffix)) {
    result = result.slice(0, -suffix.length)
  } else if (suffix && suffix.includes(' ')) {
    // Try to match partial suffix (e.g., ' kr' from ', kr')
    const suffixParts = suffix.split(' ')
    const lastPart = suffixParts[suffixParts.length - 1]
    if (lastPart && result.endsWith(lastPart)) {
      result = result.slice(0, -lastPart.length).trim()
    }
  }

  return result
}

/**
 * If the mask is a numeric mask (has maskParams), strip prefix/suffix from the value.
 * Otherwise return the value unchanged.
 */
function cleanNumericValue(value: string, rawMask: TextMaskMask): string {
  if (
    typeof rawMask === 'object' &&
    rawMask !== null &&
    'maskParams' in rawMask
  ) {
    const mp = rawMask.maskParams as MaskParams
    return stripAffixes(value, mp.prefix ?? '', mp.suffix ?? '')
  }

  return value
}

function createMaskitoNumberOptions(mp: MaskParams): MaskitoOptions {
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

  // Only use middle dot (·) as a built-in pseudo-separator.
  // Dots and commas are disambiguated by disambiguateSeparatorsPreprocessor
  // below using the "3-digit" heuristic instead.
  const decimalPseudoSeparators = ['·']

  const base = maskitoNumberOptionsGenerator({
    min,
    max: Number.MAX_SAFE_INTEGER,
    thousandSeparator: thousand,
    decimalSeparator: decimal,
    maximumFractionDigits,
    minimumFractionDigits: 0,
    prefix,
    postfix: postfixToUse,
    decimalPseudoSeparators,
    minusSign: '-', // Define "-" (U+002D) because Maskito uses "−" (U+2212) by default, and would replace "-" (U+002D) with it.
  })

  const caretGuard = maskitoCaretGuard((value) => {
    const left = prefix ? prefix.length : 0
    const right = postfixToUse ? postfixToUse.length : 0
    const max = Math.max(left, value.length - right)
    return [left, max] as [number, number]
  })

  // Clear the value when only prefix/postfix remain (no numeric content)
  const clearEmptyPostprocessor: MaskitoPostprocessor = (elementState) => {
    const value = elementState.value
    const withoutAffixes = stripAffixes(value, prefix, postfixToUse).trim()

    if (withoutAffixes === '' || withoutAffixes === decimal) {
      return {
        ...elementState,
        value: '',
        selection: [0, 0],
      }
    }

    return elementState
  }

  // If suffix starts with comma, add a postprocessor to insert it before the postfix
  const postprocessors = suffixStartsWithComma
    ? [
        ...(base.postprocessors || []),
        ((elementState) => {
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
        }) as MaskitoPostprocessor,
        clearEmptyPostprocessor,
      ]
    : [...(base.postprocessors || []), clearEmptyPostprocessor]

  // Reject digit/paste insertion that would produce a value beyond safe
  // integer limits. This prevents Maskito's default clamp behavior which
  // silently replaces the value with MAX/MIN_SAFE_INTEGER.
  const stripFormatting = new RegExp(
    `[^\\d\\-.${decimal === '.' ? '' : '\\' + decimal}]`,
    'g'
  )
  const rejectBeyondSafeInteger: MaskitoPreprocessor = (
    { elementState, data },
    actionType
  ) => {
    if (actionType !== 'insert' || !data) {
      return { elementState, data }
    }

    const { value, selection } = elementState
    let raw = (
      value.slice(0, selection[0]) +
      data +
      value.slice(selection[1])
    ).replace(stripFormatting, '')

    if (decimal !== '.') {
      raw = raw.replace(decimal, '.')
    }

    const num = Number(raw)

    if (
      !isNaN(num) &&
      (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER)
    ) {
      mp.onRejectSafeInteger?.(num)
      return { elementState, data: '' }
    }

    return { elementState, data }
  }

  // Disambiguate '.' and ',' in pasted/programmatic values when they
  // are not the locale's native thousands separator.
  //
  // Heuristic: separator followed by exactly 3 digits (then non-digit
  // or end of string) is treated as a thousands separator and stripped.
  // Any remaining separator is kept as the decimal separator.
  //
  // Dot disambiguation applies to both 'insert' (paste) and 'validation'
  // (programmatic value changes) because correctNumberValue() in
  // InputMaskedUtils already converts dots to the locale's decimal
  // separator — so dots in the validation path are always foreign.
  //
  // Comma disambiguation applies only to 'insert' (paste) because in
  // the validation path, commas may be legitimate locale-decimal
  // separators placed by correctNumberValue().
  //
  // Examples in nb-NO (decimal=',', thousands=' '):
  //   "20.500"     → "20500"  (thousands — dot + 3 digits)
  //   "1.234.567"  → "1234567" (thousands — each dot + 3 digits)
  //   "20.5"       → "20,5"   (decimal — dot + 1 digit)
  //   "20.50"      → "20,50"  (decimal — dot + 2 digits)
  //   "25,000"     → "25000"  (thousands — comma + 3 digits, paste only)
  //   "25,5"       → "25,5"   (decimal — comma + 1 digit, already correct)
  const disambiguateDot = (value: string): string =>
    value.replace(/\.(\d{3})(?=\D|$)/g, '$1').replace(/\./g, decimal)

  const disambiguateComma = (value: string): string =>
    value.replace(/,(\d{3})(?=\D|$)/g, '$1')

  const disambiguateSeparatorsPreprocessor: MaskitoPreprocessor = (
    { elementState, data },
    actionType
  ) => {
    if (decimal === '.' || thousand === '.') {
      return { elementState, data }
    }

    if (actionType === 'insert' && data) {
      let d = disambiguateDot(data)

      // Also disambiguate commas in pasted data when comma is the
      // locale's decimal separator (e.g. nb-NO) — "25,000" → "25000"
      if (decimal === ',' && thousand !== ',') {
        d = disambiguateComma(d)
      }

      return { elementState, data: d }
    }

    if (actionType === 'validation' && elementState.value.includes('.')) {
      return {
        elementState: {
          ...elementState,
          value: disambiguateDot(elementState.value),
        },
        data,
      }
    }

    return { elementState, data }
  }

  const preprocessors = [
    disambiguateSeparatorsPreprocessor,
    ...(base.preprocessors || []),
    rejectBeyondSafeInteger,
  ]

  const plugins = [...(base.plugins || []), caretGuard]

  return {
    ...base,
    plugins,
    preprocessors,
    postprocessors,
  }
}
