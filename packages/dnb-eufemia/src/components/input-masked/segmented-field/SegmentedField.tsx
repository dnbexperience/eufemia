import React, { useCallback, useEffect, useRef } from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../../shared/helpers/withComponentMarkers'
import useId from '../../../shared/helpers/useId'
import { isiOS } from '../../../shared/helpers'
import Input from '../../Input'
import FormLabel from '../../FormLabel'
import { createSpacingClasses } from '../../space/SpacingHelper'
import { useMultiInputValue } from '../hooks/useMultiInputValues'
import SegmentedFieldSection from './SegmentedFieldSection'
import { ensureTextNode, listAllSections } from './dom'
import { joinValues } from './utils'
import type {
  SectionSelectionMode,
  SegmentedFieldProps,
  SegmentedFieldValue,
} from './types'

export type {
  OverwriteMode,
  SegmentedFieldItem,
  SegmentedFieldProps,
  SegmentedFieldSpinButton,
  SegmentedFieldValue,
} from './types'

// @internal This component is for internal use only as of now.
function SegmentedField<T extends string>(props: SegmentedFieldProps<T>) {
  const fallbackId = useId(props?.id)
  const fallbackFieldsetRef = useRef<HTMLElement | null>(null)
  const {
    id = fallbackId,
    label,
    labelDirection = 'horizontal',
    inputs,
    delimiter,
    onChange: onChangeExternal,
    disabled,
    status,
    statusState,
    values: defaultValues,
    className,
    stretch,
    _omitInputShellClass,
    scopeRef = fallbackFieldsetRef,
    size,
    suffix,
    onBlur,
    onFocus,
    overwriteMode = 'shift',
    optionsEnhancer,
    ...rest
  } = props
  const hasExternalScopeRef = Boolean(props.scopeRef)

  const [values, onChangeBase] = useMultiInputValue({
    inputs,
    defaultValues,
  })

  const valuesRef = useRef(values)
  const sectionRefs = useRef<Record<string, HTMLSpanElement | null>>({})
  const caretPositionsRef = useRef<Record<string, number>>({})
  const sectionSelectionModeRef = useRef<
    Record<string, SectionSelectionMode>
  >({})
  const areInputsInFocus = useRef(false)
  const groupSelectionRef = useRef(false)
  const skipBoundaryBackspaceRef = useRef<Record<string, boolean>>({})
  const boundaryTraversalLockRef = useRef<Record<string, boolean>>({})

  valuesRef.current = values

  useEffect(() => {
    optionsEnhancer?.({ overwriteMode })
  }, [optionsEnhancer, overwriteMode])

  const onLegendClick = useCallback(() => {
    if (disabled) {
      return
    }

    const firstId = inputs[0]?.id
    if (!firstId) {
      return
    }

    sectionRefs.current[String(firstId)]?.focus()
  }, [disabled, inputs])

  const onChange = useCallback(
    (inputId: string, value: string) => {
      const updatedValues = {
        ...valuesRef.current,
        [inputId]: value,
      } as SegmentedFieldValue<T>

      valuesRef.current = updatedValues
      onChangeBase(updatedValues)

      if (typeof onChangeExternal === 'function') {
        onChangeExternal(updatedValues)
      }
    },
    [onChangeBase, onChangeExternal]
  )

  const clearGroupSelection = useCallback(() => {
    groupSelectionRef.current = false
  }, [])

  const clearSectionSelection = useCallback(() => {
    const selection = window.getSelection()
    selection?.removeAllRanges()

    inputs.forEach(({ id }) => {
      const inputId = String(id)
      const section = sectionRefs.current[inputId]
      const length = section?.textContent?.length ?? 0

      sectionSelectionModeRef.current[inputId] = 'caret'
      caretPositionsRef.current[inputId] = length
    })
  }, [inputs])

  const selectSection = useCallback((inputId: string) => {
    const section = sectionRefs.current[inputId]

    if (!section) {
      return
    }

    const selection = window.getSelection()
    const range = document.createRange()

    range.selectNodeContents(section)
    selection?.removeAllRanges()
    selection?.addRange(range)

    sectionSelectionModeRef.current[inputId] = 'all'
    caretPositionsRef.current[inputId] = 0
  }, [])

  const setSectionCaret = useCallback(
    (inputId: string, position: number) => {
      const section = sectionRefs.current[inputId]

      if (!section) {
        return
      }

      const safePosition = Math.max(
        0,
        Math.min(position, section.textContent?.length ?? 0)
      )
      const textNode = ensureTextNode(section)

      if (!textNode) {
        return
      }

      const selection = window.getSelection()
      const range = document.createRange()

      range.setStart(textNode, safePosition)
      range.collapse(true)
      selection?.removeAllRanges()
      selection?.addRange(range)

      sectionSelectionModeRef.current[inputId] = 'caret'
      caretPositionsRef.current[inputId] = safePosition
    },
    []
  )

  const selectWholeGroup = useCallback(
    (targetInputId: string) => {
      const currentSection = sectionRefs.current[targetInputId]
      const currentGroup = currentSection?.closest(
        '.dnb-segmented-field__group'
      ) as HTMLElement | null
      const sections = listAllSections(currentGroup || undefined)

      if (sections.length === 0) {
        return
      }

      const firstSection = sections[0]
      const lastSection = sections[sections.length - 1]

      if (!firstSection || !lastSection) {
        return
      }

      const firstTextNode = ensureTextNode(firstSection)
      const lastTextNode = ensureTextNode(lastSection)

      if (!firstTextNode || !lastTextNode) {
        return
      }

      const selection = window.getSelection()
      const range = document.createRange()

      range.setStart(firstTextNode, 0)
      range.setEnd(lastTextNode, lastTextNode.textContent?.length ?? 0)
      selection?.removeAllRanges()
      selection?.addRange(range)

      sections.forEach((section) => {
        const sectionId = section.dataset.segmentedInputId

        if (!sectionId) {
          return
        }

        sectionSelectionModeRef.current[sectionId] = 'all'
        caretPositionsRef.current[sectionId] = 0
      })

      groupSelectionRef.current = true
    },
    [caretPositionsRef, sectionRefs, sectionSelectionModeRef]
  )

  const focusSection = useCallback(
    (inputId: string, mode: 'all' | 'start' | 'end') => {
      const section = sectionRefs.current[inputId]

      if (!section) {
        return
      }

      section.focus()

      if (mode === 'all') {
        selectSection(inputId)
        return
      }

      const displayValue = section.textContent ?? ''
      setSectionCaret(inputId, mode === 'end' ? displayValue.length : 0)
    },
    [selectSection, setSectionCaret]
  )

  const WrapperElement: 'fieldset' | 'div' = label ? 'fieldset' : 'div'
  const hiddenInputValue = joinValues(values, delimiter)

  return (
    <WrapperElement
      ref={(element: HTMLFieldSetElement | HTMLDivElement | null) => {
        if (!hasExternalScopeRef && !scopeRef.current) {
          scopeRef.current = element as HTMLElement | null
        }
      }}
      className={clsx(
        'dnb-segmented-field__fieldset',
        labelDirection === 'horizontal' &&
          'dnb-segmented-field__fieldset--horizontal',
        createSpacingClasses(rest)
      )}
    >
      <Input
        {...rest}
        _omitInputShellClass={_omitInputShellClass}
        id={id}
        label={
          label && (
            <FormLabel
              element="legend"
              forId={id}
              disabled={disabled}
              labelDirection={labelDirection}
              onClick={onLegendClick}
            >
              {label}
            </FormLabel>
          )
        }
        className={clsx('dnb-segmented-field', className)}
        size={size}
        labelDirection={labelDirection}
        disabled={disabled}
        status={status}
        statusState={statusState}
        suffix={suffix}
        stretch={stretch}
        inputElement={
          <>
            <div
              className="dnb-segmented-field__group"
              role="group"
              data-segmented-selection={
                groupSelectionRef.current ? 'all' : undefined
              }
            >
              {inputs.map(
                (
                  { id: inputId, onFocus: _a, onBlur: _b, ...itemProps },
                  index
                ) => (
                  <SegmentedFieldSection
                    key={String(inputId)}
                    groupId={id}
                    inputId={String(inputId)}
                    itemProps={itemProps}
                    value={String(values[inputId] ?? '')}
                    overwriteMode={overwriteMode}
                    delimiter={
                      index !== inputs.length - 1 ? delimiter : undefined
                    }
                    groupDelimiter={delimiter}
                    disabled={Boolean(disabled)}
                    valuesRef={
                      valuesRef as React.RefObject<Record<string, string>>
                    }
                    inputs={inputs.map(({ id, mask }) => ({
                      id: String(id),
                      mask,
                    }))}
                    scopeRef={scopeRef}
                    sectionRefs={sectionRefs}
                    caretPositionsRef={caretPositionsRef}
                    sectionSelectionModeRef={sectionSelectionModeRef}
                    groupSelectionRef={groupSelectionRef}
                    skipBoundaryBackspaceRef={skipBoundaryBackspaceRef}
                    boundaryTraversalLockRef={boundaryTraversalLockRef}
                    clearGroupSelection={clearGroupSelection}
                    clearSectionSelection={clearSectionSelection}
                    selectWholeGroup={selectWholeGroup}
                    selectSection={selectSection}
                    setSectionCaret={setSectionCaret}
                    focusSection={focusSection}
                    onChange={onChange}
                    onGroupFocus={() => {
                      if (!areInputsInFocus.current) {
                        onFocus?.(
                          valuesRef.current as SegmentedFieldValue<T>
                        )
                      }

                      areInputsInFocus.current = true
                    }}
                    onGroupBlur={(event) => {
                      if (!event.relatedTarget?.id?.startsWith(`${id}-`)) {
                        const run = () =>
                          onBlur?.(
                            valuesRef.current as SegmentedFieldValue<T>
                          )

                        if (isiOS()) {
                          setTimeout(run, 10)
                        } else {
                          window.requestAnimationFrame(run)
                        }

                        areInputsInFocus.current = false
                        clearGroupSelection()
                        clearSectionSelection()
                      }
                    }}
                    {...rest}
                  />
                )
              )}
            </div>
            <input
              id={id}
              className="dnb-segmented-field__hidden-input"
              value={hiddenInputValue}
              readOnly
              hidden
              tabIndex={-1}
              aria-hidden
            />
          </>
        }
      />
    </WrapperElement>
  )
}

export default SegmentedField

withComponentMarkers(SegmentedField, {
  _formElement: true,
  _supportsSpacingProps: true,
})
