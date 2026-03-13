import type React from 'react'
import type {
  OverwriteMode,
  SectionSelectionMode,
  SegmentedFieldInputConfig,
} from './types'

export function getDisplayValue({
  value,
  placeholder,
  length,
}: {
  value: string
  placeholder: string
  length: number
}) {
  const fallback = (placeholder || '').padEnd(
    length,
    placeholder[0] || ' '
  )
  const visiblePlaceholder = fallback.slice(0, length)

  if (!value) {
    return visiblePlaceholder
  }

  return `${value}${visiblePlaceholder.slice(value.length)}`.slice(
    0,
    length
  )
}

export function insertChar(
  value: string,
  char: string,
  position: number,
  {
    overwriteMode,
    maxLength,
  }: { overwriteMode: OverwriteMode; maxLength: number }
) {
  const chars = Array.from(value)

  if (overwriteMode === 'shift') {
    chars.splice(position, 0, char)
  } else {
    chars[position] = char
  }

  return chars.join('').slice(0, maxLength)
}

export function removeChar(value: string, position: number) {
  if (position < 0 || position >= value.length) {
    return value
  }

  const chars = Array.from(value)
  chars.splice(position, 1)
  return chars.join('')
}

export function extractValidChars(value: string, mask: RegExp[]) {
  const chars = Array.from(value)
  const output: string[] = []

  for (
    let index = 0;
    index < chars.length && output.length < mask.length;
    index++
  ) {
    const char = chars[index]
    const maskRule = mask[output.length]

    if (maskRule?.test(char)) {
      output.push(char)
    }
  }

  return output.join('')
}

export function joinValues(
  values: Record<string, string>,
  delimiter?: string
) {
  const parts = Object.values(values).filter(Boolean)

  if (parts.length === 0) {
    return ''
  }

  return parts.join(delimiter ?? '')
}

export function distributeValueFromStart({
  value,
  inputs,
  existingValues,
}: {
  value: string
  inputs: SegmentedFieldInputConfig[]
  existingValues: Record<string, string>
}) {
  const nextValues = { ...existingValues }
  let remaining = value

  inputs.forEach(({ id, mask }, index) => {
    // Strip leading separators between sections
    if (index > 0) {
      remaining = remaining.replace(/^[./\-\s]+/, '')
    }

    if (!remaining) {
      return // stop here - keep existing value for fields not covered by paste
    }

    const nextValue = extractValidChars(remaining, mask)
    nextValues[id] = nextValue
    remaining = remaining.slice(Math.max(1, nextValue.length))
  })

  return nextValues
}

export function insertCharIntoSection({
  char,
  inputId,
  overwriteMode,
  valuesRef,
  inputs,
  caretPositionsRef,
  sectionSelectionModeRef,
  onChange,
  focusSection,
  setSectionCaret,
}: {
  char: string
  inputId: string
  overwriteMode: OverwriteMode
  valuesRef: React.MutableRefObject<Record<string, string>>
  inputs: SegmentedFieldInputConfig[]
  caretPositionsRef: React.MutableRefObject<Record<string, number>>
  sectionSelectionModeRef: React.MutableRefObject<
    Record<string, SectionSelectionMode>
  >
  onChange: (inputId: string, value: string) => void
  focusSection: (inputId: string, mode: 'all' | 'start' | 'end') => void
  setSectionCaret: (inputId: string, position: number) => void
}) {
  const mask = inputs.find(({ id }) => id === inputId)?.mask
  if (!mask) {
    return false
  }

  const currentValue = valuesRef.current[inputId] ?? ''
  const isAllSelected = sectionSelectionModeRef.current[inputId] === 'all'
  const currentPosition = isAllSelected
    ? 0
    : caretPositionsRef.current[inputId] ?? 0

  if (!mask[Math.min(currentPosition, mask.length - 1)]?.test(char)) {
    return false
  }

  const nextValue = insertChar(
    isAllSelected ? '' : currentValue,
    char,
    currentPosition,
    {
      overwriteMode,
      maxLength: mask.length,
    }
  )

  onChange(inputId, nextValue)

  if (nextValue.length >= mask.length) {
    focusSection(inputId, 'end')
  } else {
    setSectionCaret(inputId, nextValue.length)
  }

  return true
}
