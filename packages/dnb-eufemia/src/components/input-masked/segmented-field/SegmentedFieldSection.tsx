import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import clsx from 'clsx'
import {
  listAllSections,
  pickSectionDomProps,
  setSectionDomApi,
} from './dom'
import {
  distributeValueFromStart,
  extractValidChars,
  getDisplayValue,
  insertChar,
  insertCharIntoSection,
  joinValues,
  removeChar,
} from './utils'
import type {
  SegmentedFieldItem,
  SegmentedFieldSectionProps,
} from './types'

export default function SegmentedFieldSection({
  groupId,
  inputId,
  itemProps,
  value,
  overwriteMode,
  delimiter,
  groupDelimiter,
  disabled,
  valuesRef,
  inputs,
  scopeRef,
  sectionRefs,
  caretPositionsRef,
  sectionSelectionModeRef,
  groupSelectionRef,
  skipBoundaryBackspaceRef,
  boundaryTraversalLockRef,
  clearGroupSelection,
  clearSectionSelection,
  selectWholeGroup,
  selectSection,
  setSectionCaret,
  focusSection,
  onChange,
  onGroupFocus,
  onGroupBlur,
  ...sharedProps
}: SegmentedFieldSectionProps) {
  const {
    label,
    mask,
    spinButton,
    className,
    placeholder,
    onCopy: onCopyExternal,
    onPaste: onPasteExternal,
    ...htmlProps
  } = itemProps as SegmentedFieldItem<string>

  const displayValue = getDisplayValue({
    value,
    placeholder: String(placeholder || ''),
    length: mask.length,
  })
  const hasTypedValue = value.length > 0
  const handledPasteTimestampRef = useRef<number | undefined>(undefined)

  const setRef = useCallback(
    (element: HTMLSpanElement | null) => {
      sectionRefs.current[inputId] = element
    },
    [inputId, sectionRefs]
  )

  useLayoutEffect(() => {
    const element = sectionRefs.current[inputId]

    if (!element) {
      return
    }

    setSectionDomApi({
      element,
      inputId,
      displayValue,
      caretPositionsRef,
      sectionSelectionModeRef,
      selectSection,
      setSectionCaret,
    })
  }, [
    caretPositionsRef,
    displayValue,
    inputId,
    selectSection,
    sectionRefs,
    sectionSelectionModeRef,
    setSectionCaret,
    value,
  ])

  useLayoutEffect(() => {
    const element = sectionRefs.current[inputId]

    if (!element || document.activeElement !== element) {
      return
    }

    if (sectionSelectionModeRef.current[inputId] === 'all') {
      selectSection(inputId)
      return
    }

    setSectionCaret(
      inputId,
      caretPositionsRef.current[inputId] ?? displayValue.length
    )
  }, [
    caretPositionsRef,
    displayValue.length,
    inputId,
    sectionRefs,
    sectionSelectionModeRef,
    selectSection,
    setSectionCaret,
    value,
  ])

  const updateValue = useCallback(
    (nextValue: string) => {
      caretPositionsRef.current[inputId] = Math.min(
        caretPositionsRef.current[inputId] ?? 0,
        nextValue.length
      )
      onChange(inputId, nextValue)
    },
    [caretPositionsRef, inputId, onChange]
  )

  const stepSpinButton = useCallback(
    (direction: 'up' | 'down') => {
      if (!spinButton) {
        return false
      }

      const {
        min,
        max,
        step = 1,
        wrap = true,
        getInitialValue,
        parseValue,
        formatValue,
      } = spinButton
      const currentValue = valuesRef.current[inputId] ?? ''
      const parsedValue =
        parseValue?.(currentValue) ??
        (currentValue ? Number(currentValue) : undefined)

      let nextValue = parsedValue

      if (typeof parsedValue !== 'number' || Number.isNaN(parsedValue)) {
        const initialValue = getInitialValue?.()
        nextValue =
          typeof initialValue === 'number' && !Number.isNaN(initialValue)
            ? initialValue
            : direction === 'up'
            ? min
            : max
      } else {
        nextValue = parsedValue + (direction === 'up' ? step : step * -1)

        if (nextValue > max) {
          nextValue = wrap ? min : max
        } else if (nextValue < min) {
          nextValue = wrap ? max : min
        }
      }

      const formattedValue = (
        formatValue?.(nextValue) ??
        String(nextValue).padStart(mask.length, '0')
      ).slice(0, mask.length)

      updateValue(formattedValue)
      selectSection(inputId)

      return true
    },
    [
      inputId,
      mask.length,
      selectSection,
      spinButton,
      updateValue,
      valuesRef,
    ]
  )

  const getNextSectionId = useCallback(
    (
      direction: 'next' | 'prev',
      {
        withinGroup = false,
      }: {
        withinGroup?: boolean
      } = {}
    ) => {
      const current = sectionRefs.current[inputId]

      if (!current) {
        return undefined
      }

      const root = withinGroup
        ? (current.closest(
            '.dnb-segmented-field__group'
          ) as HTMLElement | null) || undefined
        : scopeRef.current || undefined
      const sections = listAllSections(root)
      const index = sections.findIndex((section) => section === current)

      if (index < 0) {
        return undefined
      }

      if (direction === 'prev') {
        return sections[index - 1]?.dataset.segmentedInputId
      }

      return sections[index + 1]?.dataset.segmentedInputId
    },
    [inputId, scopeRef, sectionRefs]
  )

  const focusAdjacentSection = useCallback(
    (direction: 'next' | 'prev') => {
      const current = sectionRefs.current[inputId]

      if (!current) {
        return false
      }

      const sections = listAllSections(scopeRef.current || undefined)
      const index = sections.findIndex((section) => section === current)

      if (index < 0) {
        return false
      }

      const target =
        direction === 'prev' ? sections[index - 1] : sections[index + 1]

      if (!target) {
        return false
      }

      target.focus()
      return true
    },
    [inputId, scopeRef, sectionRefs]
  )

  const replaceWithChar = useCallback(
    (char: string) => {
      const currentValue = valuesRef.current[inputId] ?? ''
      const currentPosition = caretPositionsRef.current[inputId] ?? 0
      const isAllSelected =
        sectionSelectionModeRef.current[inputId] === 'all'

      if (!mask[Math.min(currentPosition, mask.length - 1)]?.test(char)) {
        return false
      }

      if (
        !isAllSelected &&
        currentPosition >= mask.length &&
        currentValue.length >= mask.length
      ) {
        const nextSectionId = getNextSectionId('next', {
          withinGroup: true,
        })

        if (nextSectionId) {
          const nextMask = inputs.find(({ id }) => id === nextSectionId)
            ?.mask
          if (!nextMask?.[0]?.test(char)) {
            return false
          }

          focusSection(nextSectionId, 'all')
          caretPositionsRef.current[nextSectionId] = 0
          return insertCharIntoSection({
            char,
            inputId: nextSectionId,
            overwriteMode,
            valuesRef,
            inputs,
            caretPositionsRef,
            sectionSelectionModeRef,
            onChange,
            focusSection,
            setSectionCaret,
          })
        }

        if (focusAdjacentSection('next')) {
          ;(document.activeElement as HTMLElement | null)?.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: char,
              bubbles: true,
              cancelable: true,
            })
          )

          return true
        }

        return false
      }

      const sourceValue = isAllSelected ? '' : currentValue
      const sourcePosition = isAllSelected ? 0 : currentPosition
      const nextValue = insertChar(sourceValue, char, sourcePosition, {
        overwriteMode,
        maxLength: mask.length,
      })

      updateValue(nextValue)

      const nextPosition = Math.min(sourcePosition + 1, mask.length)
      if (nextValue.length >= mask.length && nextPosition >= mask.length) {
        const nextSectionId = getNextSectionId('next', {
          withinGroup: true,
        })

        if (nextSectionId) {
          focusSection(nextSectionId, 'all')
        } else if (!focusAdjacentSection('next')) {
          setSectionCaret(inputId, mask.length)
        }
      } else {
        setSectionCaret(inputId, nextPosition)
      }

      return true
    },
    [
      caretPositionsRef,
      focusAdjacentSection,
      focusSection,
      getNextSectionId,
      inputId,
      inputs,
      mask,
      onChange,
      overwriteMode,
      sectionSelectionModeRef,
      setSectionCaret,
      updateValue,
      valuesRef,
    ]
  )

  const sectionProps = useMemo(
    () => ({
      ...pickSectionDomProps(htmlProps),
      ...pickSectionDomProps(sharedProps),
    }),
    [htmlProps, sharedProps]
  )

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLSpanElement>) => {
      if (handledPasteTimestampRef.current === event.timeStamp) {
        return
      }

      handledPasteTimestampRef.current = event.timeStamp

      onPasteExternal?.(
        event as unknown as React.ClipboardEvent<HTMLInputElement>
      )

      if (event.defaultPrevented) {
        return
      }

      const pastedValue = event.clipboardData.getData('text/plain')

      if (!pastedValue) {
        return
      }

      event.preventDefault()

      const nextValues =
        pastedValue.length > mask.length || /[./\-\s]/.test(pastedValue)
          ? distributeValueFromStart({
              value: pastedValue,
              inputs,
              existingValues: valuesRef.current,
            })
          : {
              ...valuesRef.current,
              [inputId]: extractValidChars(pastedValue, mask),
            }

      Object.entries(nextValues).forEach(([key, nextValue]) => {
        onChange(key, nextValue)
      })

      if (
        pastedValue.length > mask.length ||
        /[./\-\s]/.test(pastedValue)
      ) {
        const lastFilledSection = inputs
          .map(({ id }) => id)
          .reverse()
          .find((key) => nextValues[key])

        if (lastFilledSection) {
          focusSection(lastFilledSection, 'end')
        }
      } else {
        setSectionCaret(
          inputId,
          Math.min(nextValues[inputId].length, mask.length)
        )
      }
    },
    [
      focusSection,
      inputId,
      inputs,
      mask,
      onChange,
      onPasteExternal,
      setSectionCaret,
      valuesRef,
    ]
  )

  const clearWholeGroup = useCallback(() => {
    if (!groupDelimiter) {
      return false
    }

    inputs.forEach(({ id }) => {
      onChange(id, '')
      sectionSelectionModeRef.current[id] = 'caret'
      caretPositionsRef.current[id] = 0
    })

    clearGroupSelection()

    const firstSectionId = inputs[0]?.id

    if (firstSectionId) {
      focusSection(firstSectionId, 'start')
    } else {
      setSectionCaret(inputId, 0)
    }

    return true
  }, [
    caretPositionsRef,
    clearGroupSelection,
    focusSection,
    groupDelimiter,
    inputId,
    inputs,
    onChange,
    sectionSelectionModeRef,
    setSectionCaret,
  ])

  const syncSelectionFromDom = useCallback(() => {
    const element = sectionRefs.current[inputId]

    if (!element || document.activeElement !== element) {
      return
    }

    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) {
      return
    }

    const range = selection.getRangeAt(0)

    if (
      !element.contains(range.startContainer) ||
      !element.contains(range.endContainer)
    ) {
      return
    }

    const normalizeOffset = (
      container: Node,
      offset: number,
      edge: 'start' | 'end'
    ) => {
      if (container === element) {
        return edge === 'start' ? 0 : displayValue.length
      }

      return offset
    }

    const startOffset = normalizeOffset(
      range.startContainer,
      range.startOffset,
      'start'
    )
    const endOffset = normalizeOffset(
      range.endContainer,
      range.endOffset,
      'end'
    )

    if (
      !selection.isCollapsed &&
      startOffset === 0 &&
      endOffset >= displayValue.length
    ) {
      sectionSelectionModeRef.current[inputId] = 'all'
      caretPositionsRef.current[inputId] = 0
      return
    }

    sectionSelectionModeRef.current[inputId] = 'caret'
    caretPositionsRef.current[inputId] = Math.min(
      endOffset,
      displayValue.length
    )
  }, [
    caretPositionsRef,
    displayValue.length,
    inputId,
    sectionRefs,
    sectionSelectionModeRef,
  ])

  return (
    <>
      <span
        id={`${groupId}-${inputId}`}
        ref={setRef}
        className={clsx(
          'dnb-input__input',
          'dnb-segmented-field__section',
          hasTypedValue && 'dnb-segmented-field__section--highlight',
          className
        )}
        data-segmented-input-id={inputId}
        contentEditable={!disabled}
        // React warns about managed children inside contentEditable. We intentionally
        // render controlled text here because each segment behaves like a custom input.
        suppressContentEditableWarning
        role={spinButton ? 'spinbutton' : 'textbox'}
        tabIndex={disabled ? -1 : 0}
        spellCheck={false}
        aria-label={String(label)}
        aria-readonly={disabled}
        aria-disabled={disabled}
        aria-valuemin={spinButton ? spinButton.min : undefined}
        aria-valuemax={spinButton ? spinButton.max : undefined}
        aria-valuenow={
          spinButton && hasTypedValue
            ? spinButton?.parseValue?.(value) ?? Number(value)
            : undefined
        }
        aria-valuetext={
          spinButton ? (hasTypedValue ? value : 'Empty') : undefined
        }
        onFocus={() => {
          skipBoundaryBackspaceRef.current[inputId] = false
          boundaryTraversalLockRef.current[inputId] = false
          clearGroupSelection()
          onGroupFocus()
          selectSection(inputId)
        }}
        onBlur={onGroupBlur}
        onMouseDown={(event) => {
          clearGroupSelection()
          boundaryTraversalLockRef.current[inputId] = false

          if (document.activeElement !== sectionRefs.current[inputId]) {
            event.preventDefault()
            sectionRefs.current[inputId]?.focus()
            selectSection(inputId)
          }
        }}
        onMouseUp={() => {
          syncSelectionFromDom()
        }}
        onInput={(event) => {
          event.preventDefault()
        }}
        onKeyDown={(event) => {
          if (disabled) {
            return
          }

          const key = event.key

          if (
            (event.metaKey || event.ctrlKey) &&
            key.toLowerCase() === 'a'
          ) {
            event.preventDefault()
            selectWholeGroup(inputId)
            return
          }

          if (
            (event.metaKey || event.ctrlKey) &&
            key.toLowerCase() === 'c'
          ) {
            return
          }

          if (event.metaKey || event.ctrlKey) {
            return
          }

          const hadWholeGroupSelected = groupSelectionRef.current
          clearGroupSelection()
          syncSelectionFromDom()

          if (key === 'Tab') {
            clearSectionSelection()
            return
          }

          if (key === 'ArrowRight') {
            event.preventDefault()
            boundaryTraversalLockRef.current[inputId] = false

            const currentValue = valuesRef.current[inputId] ?? ''

            if (!currentValue) {
              focusAdjacentSection('next')
              return
            }

            if (sectionSelectionModeRef.current[inputId] === 'all') {
              setSectionCaret(inputId, displayValue.length)
              return
            }

            const currentPosition = caretPositionsRef.current[inputId] ?? 0

            if (currentPosition >= displayValue.length) {
              focusAdjacentSection('next')

              return
            }

            setSectionCaret(inputId, currentPosition + 1)
            return
          }

          if (key === 'ArrowLeft') {
            event.preventDefault()

            const currentValue = valuesRef.current[inputId] ?? ''

            if (!currentValue) {
              boundaryTraversalLockRef.current[inputId] = false
              focusAdjacentSection('prev')
              return
            }

            if (sectionSelectionModeRef.current[inputId] === 'all') {
              boundaryTraversalLockRef.current[inputId] = 'selection'
              setSectionCaret(inputId, 0)
              return
            }

            const currentPosition = caretPositionsRef.current[inputId] ?? 0

            if (currentPosition <= 0) {
              boundaryTraversalLockRef.current[inputId] = false
              focusAdjacentSection('prev')

              return
            }

            const nextPosition = currentPosition - 1

            boundaryTraversalLockRef.current[inputId] =
              nextPosition === 0 ? 'caret' : false
            setSectionCaret(inputId, nextPosition)
            return
          }

          if (key === 'ArrowUp' || key === 'ArrowDown') {
            event.preventDefault()
            stepSpinButton(key === 'ArrowUp' ? 'up' : 'down')
            return
          }

          if (key === 'Backspace') {
            event.preventDefault()

            if (hadWholeGroupSelected) {
              clearWholeGroup()
              return
            }

            const isAllSelected =
              sectionSelectionModeRef.current[inputId] === 'all'
            const currentValue = valuesRef.current[inputId] ?? ''
            const currentPosition = caretPositionsRef.current[inputId] ?? 0

            if (isAllSelected && currentValue.length > 0) {
              if (skipBoundaryBackspaceRef.current[inputId]) {
                skipBoundaryBackspaceRef.current[inputId] = false
                selectSection(inputId)
                return
              }

              updateValue('')
              selectSection(inputId)
              return
            }

            if (currentValue.length === 0 || currentPosition <= 0) {
              const previousSectionId = getNextSectionId('prev', {
                withinGroup: true,
              })
              let keepPreviousSectionGuard = currentValue.length > 0
              let shouldClearPreviousSection = false

              if (currentValue.length > 0) {
                const traversalMode =
                  boundaryTraversalLockRef.current[inputId]

                boundaryTraversalLockRef.current[inputId] = false
                const shouldTraverseBoundaryImmediately =
                  traversalMode === 'caret' ||
                  traversalMode === 'selection'
                keepPreviousSectionGuard =
                  keepPreviousSectionGuard &&
                  !shouldTraverseBoundaryImmediately
                shouldClearPreviousSection = traversalMode === 'selection'

                if (!previousSectionId) {
                  focusAdjacentSection('prev')
                  return
                }

                if (
                  !shouldTraverseBoundaryImmediately &&
                  !skipBoundaryBackspaceRef.current[inputId]
                ) {
                  skipBoundaryBackspaceRef.current[inputId] = true
                  setSectionCaret(inputId, 0)
                  return
                }
              } else {
                boundaryTraversalLockRef.current[inputId] = false
              }

              skipBoundaryBackspaceRef.current[inputId] = false

              if (previousSectionId) {
                focusSection(previousSectionId, 'all')

                if (shouldClearPreviousSection) {
                  onChange(previousSectionId, '')
                  selectSection(previousSectionId)
                  skipBoundaryBackspaceRef.current[previousSectionId] =
                    false
                  return
                }

                skipBoundaryBackspaceRef.current[previousSectionId] =
                  keepPreviousSectionGuard
              } else {
                if (currentValue.length === 0) {
                  focusAdjacentSection('prev')
                }

                return
              }

              return
            }

            const nextValue = removeChar(currentValue, currentPosition - 1)
            skipBoundaryBackspaceRef.current[inputId] = false
            boundaryTraversalLockRef.current[inputId] = false
            updateValue(nextValue)
            setSectionCaret(inputId, currentPosition - 1)
            return
          }

          if (key === 'Delete') {
            event.preventDefault()
            boundaryTraversalLockRef.current[inputId] = false

            if (hadWholeGroupSelected) {
              clearWholeGroup()
              return
            }

            const isAllSelected =
              sectionSelectionModeRef.current[inputId] === 'all'
            const currentValue = valuesRef.current[inputId] ?? ''
            const currentPosition = caretPositionsRef.current[inputId] ?? 0

            if (isAllSelected) {
              updateValue('')
              selectSection(inputId)
              return
            }

            const nextValue = removeChar(currentValue, currentPosition)
            updateValue(nextValue)
            setSectionCaret(inputId, currentPosition)
            return
          }

          if (key.length === 1) {
            event.preventDefault()
            boundaryTraversalLockRef.current[inputId] = false

            if (hadWholeGroupSelected) {
              const firstSectionId = inputs[0]?.id

              if (firstSectionId && clearWholeGroup()) {
                insertCharIntoSection({
                  char: key,
                  inputId: firstSectionId,
                  overwriteMode,
                  valuesRef,
                  inputs,
                  caretPositionsRef,
                  sectionSelectionModeRef,
                  onChange,
                  focusSection,
                  setSectionCaret,
                })
                return
              }
            }

            replaceWithChar(key)
            return
          }
        }}
        onCopy={(event) => {
          onCopyExternal?.(
            event as unknown as React.ClipboardEvent<HTMLInputElement>
          )

          if (event.defaultPrevented) {
            return
          }

          event.preventDefault()
          event.clipboardData.setData(
            'text/plain',
            joinValues(valuesRef.current, groupDelimiter)
          )
        }}
        onPasteCapture={handlePaste}
        onPaste={handlePaste}
        {...sectionProps}
      >
        {displayValue}
      </span>
      {delimiter && (
        <span
          aria-hidden
          className={clsx(
            'dnb-segmented-field__delimiter',
            hasTypedValue && 'dnb-segmented-field__delimiter--highlight'
          )}
        >
          {delimiter}
        </span>
      )}
    </>
  )
}
