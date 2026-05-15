import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import * as z from 'zod'
import clsx from 'clsx'
import { AriaLive, Popover } from '../../../../components'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import type { DefaultErrorMessages, FieldProps, Path } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import useTranslation from '../../hooks/useTranslation'
import { convertJsxToString } from '../../../../shared/component-helper'
import type { SearchConfig } from '../../../../shared/search'
import {
  prepareSearchWords,
  findMatchingWords,
  calculateTotalScore,
  checkMultipleNumericTerms,
} from '../../../../shared/search'
import whatInput from '../../../../shared/helpers/whatInput'
import useIsomorphicLayoutEffect from '../../../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import { MultiSelectionTrigger } from './MultiSelectionTrigger'
import { MultiSelectionSearch } from './MultiSelectionSearch'
import { MultiSelectionSelectedTags } from './MultiSelectionSelectedTags'
import type { MultiSelectionItemInternal } from './MultiSelectionItemList'
import { MultiSelectionItemList } from './MultiSelectionItemList'
import { MultiSelectionActions } from './MultiSelectionActions'

export type MultiSelectionItem = {
  value: number | string
  title: ReactNode
  text?: ReactNode
  description?: ReactNode
  disabled?: boolean
  children?: Array<MultiSelectionItem>
}

type MultiSelectionData = Array<MultiSelectionItem>

type MultiSelectionFieldBlockWidth = Exclude<
  FieldBlockWidth,
  'small' | 'stretch'
>

export type FieldMultiSelectionProps = FieldProps<
  Array<number | string> | undefined
> & {
  /**
   * Data to be used for the component. Array of objects with `value` and `title` properties.
   * Supports nested items via `children` property.
   */
  data?: MultiSelectionData

  /**
   * The path to the context data (Form.Handler).
   */
  dataPath?: Path

  /**
   * Defines the variant of the component.
   * `popover` renders a trigger button that opens a popover with the item list.
   * `inline` renders the item list inline as checkboxes.
   * Default: `popover`
   */
  variant?: 'popover' | 'inline'

  /**
   * The width of the component. Supported values: false, 'medium', 'large', or a custom width.
   */
  width?: MultiSelectionFieldBlockWidth

  /**
   * Show search field to filter options. Defaults to false.
   */
  showSearchField?: boolean

  /**
   * Show "Select all" checkbox at top of list. Defaults to false.
   */
  showSelectAll?: boolean

  /**
   * Show selected items as tags inside the popover. When enabled and nothing is
   * selected a placeholder text is shown. Defaults to false.
   */
  showSelectedTags?: boolean

  /**
   * Threshold for collapsing selected items when showSelectedTags is enabled.
   * When the number of selected items exceeds this threshold, a toggle button
   * and "Clear all" button appear, and the tags are hidden by default. Defaults to 10.
   */
  selectedItemsCollapsibleThreshold?: number

  /**
   * Configure search behavior. Options include `matchNumbers`, `inWordIndex`,
   * `match`, `filter`, and `reorder`. `highlight` has no effect in
   * MultiSelection because items are rendered as checkboxes.
   */
  search?: SearchConfig

  /**
   * Show confirm/cancel buttons. Defaults to false.
   */
  showConfirmButton?: boolean

  /**
   * Minimum number of items required to be selected
   */
  minItems?: number

  /**
   * Maximum number of items allowed to be selected
   */
  maxItems?: number

  errorMessages?: DefaultErrorMessages & {
    minItems?: string
    maxItems?: string
  }
}

function MultiSelection(props: FieldMultiSelectionProps) {
  const {
    id,
    path,
    dataPath,
    data,
    className,
    variant = 'popover',
    width,
    search,
    showSearchField = false,
    showSelectedTags = false,
    showConfirmButton = false,
    showSelectAll = false,
    selectedItemsCollapsibleThreshold = 10,
    value,
    disabled,
    emptyValue,
    htmlAttributes,
    handleChange,
    setDisplayValue,
  } = useFieldProps({
    ...props,
    schema: (() => {
      if (
        typeof props.minItems === 'number' ||
        typeof props.maxItems === 'number'
      ) {
        return (p: FieldMultiSelectionProps) => {
          let s = z.array(z.union([z.string(), z.number()]))
          if (typeof p.minItems === 'number') {
            s = s.min(p.minItems, {
              message:
                p.errorMessages?.minItems ??
                'MultiSelectionField.errorMinItems',
            })
          }
          if (typeof p.maxItems === 'number') {
            s = s.max(p.maxItems, {
              message:
                p.errorMessages?.maxItems ??
                'MultiSelectionField.errorMaxItems',
            })
          }
          return s
        }
      }
      return props.schema
    })(),
  })

  const { MultiSelectionField: translation, formatMessage } =
    useTranslation()

  const formatSelectionCount = useCallback(
    (count: number, total: number) =>
      formatMessage(translation.selectionCount, { count, total }),
    [formatMessage, translation.selectionCount]
  )

  const { getValueByPath } = useDataValue()
  const { setFieldInternals } = useContext(DataContext)
  const dataList = dataPath ? getValueByPath(dataPath) : data

  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [tempValue, setTempValue] = useState<Array<number | string>>(
    value || []
  )
  const [showSelectedItemsList, setShowSelectedItemsList] = useState(false)
  const [ariaLiveCheckedCount, setAriaLiveCheckedCount] = useState('')
  const confirmedRef = useRef(false)

  // Sync tempValue when the external value changes (e.g. form reset,
  // another field writing to the same path). Skip the sync while the
  // popover is open so we don't overwrite in-progress selections.
  const isInline = variant === 'inline'
  useEffect(() => {
    if (!isOpen || isInline) {
      setTempValue(value || [])
    }
  }, [value, isOpen, isInline])
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Calculate max height of popover content to prevent it from growing too large and going off-screen
  const handlePopoverContentRef = useCallback(
    (el: HTMLDivElement | null) => {
      popoverContentRef.current = el

      if (!el || !isOpen) {
        return
      }

      // Defer until after browser paints and positions the element
      requestAnimationFrame(() => {
        const trigger =
          triggerRef.current ??
          (document.getElementById(id) as HTMLElement)
        triggerRef.current = trigger

        const contentRect = el.getBoundingClientRect()
        const triggerRect = trigger?.getBoundingClientRect()
        const margin = 16

        // Determine placement from the rendered geometry so max-height matches the resolved popover position.
        const isBottomPlacement =
          !triggerRect || contentRect.top >= triggerRect.bottom

        const maxHeight = isBottomPlacement
          ? window.innerHeight - contentRect.top - margin
          : contentRect.bottom - margin

        if (maxHeight > 100) {
          el.style.setProperty(
            '--popover-max-height',
            `${Math.max(0, maxHeight)}px`
          )
        }
      })
    },
    [id, isOpen]
  )
  const pendingTriggerNavigationRef = useRef<-1 | 1 | null>(null)
  const pendingCheckedCountAnnouncementRef = useRef(false)
  const previousTempValueRef = useRef<Array<number | string>>(value || [])
  const hasFeature =
    showSearchField || showSelectedTags || showConfirmButton

  // Match the existing menu pattern so arrow-key navigation is treated as
  // keyboard input even when focus is moved programmatically after mouse-open.
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      whatInput.specificKeys([
        'Tab',
        'ArrowLeft',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'End',
        'Home',
      ])
    }

    return () => {
      whatInput.specificKeys(['Tab'])
    }
  }, [isOpen])

  // Flatten nested items to a single array for searching and counting
  const flattenItems = useCallback(
    (items: MultiSelectionData | undefined): MultiSelectionData => {
      if (!items) {
        return []
      }
      return items.flatMap((item: MultiSelectionItemInternal) => [
        item,
        ...(item.children ? flattenItems(item.children) : []),
      ])
    },
    []
  )

  const allFlatItems = useMemo(
    () => flattenItems(dataList),
    [dataList, flattenItems]
  )

  const disableFilter = search?.filter === false
  const disableReorder = search?.reorder === false

  // Filter items based on search (includes nested items)
  const filteredItems = useMemo(() => {
    if (!dataList) {
      return []
    }
    if (!searchValue || disableFilter) {
      return dataList
    }

    const searchOptions = {
      matchNumbers: search?.matchNumbers,
      inWordIndex: search?.inWordIndex ?? 1,
      match: search?.match,
    }
    const prepared = prepareSearchWords(searchValue, searchOptions)

    type ScoredItem = MultiSelectionItem & { __score?: number }

    const filterRecursive = (items: MultiSelectionData): ScoredItem[] => {
      return items
        .map((item: MultiSelectionItemInternal): ScoredItem | null => {
          const title = convertJsxToString(item.title)
          const text = convertJsxToString(item.text || '')
          const description = convertJsxToString(item.description || '')

          const contentChunk = [title, text, description]
            .filter(Boolean)
            .join(' ')

          const matchedWords = findMatchingWords(contentChunk, prepared)

          if (!checkMultipleNumericTerms(matchedWords, prepared)) {
            const children = item.children
              ? filterRecursive(item.children)
              : []

            if (children.length > 0) {
              return {
                ...item,
                children,
              }
            }

            return null
          }

          const matches =
            matchedWords.length === prepared.searchWordsData.length

          const children = item.children
            ? filterRecursive(item.children)
            : []

          if (matches || children.length > 0) {
            return {
              ...item,
              children: children.length > 0 ? children : item.children,
              __score: matches ? calculateTotalScore(matchedWords) : 0,
            }
          }

          return null
        })
        .filter(Boolean) as ScoredItem[]
    }

    const result = filterRecursive(dataList)

    if (!disableReorder) {
      result.sort((a, b) => (b.__score ?? 0) - (a.__score ?? 0))
    }

    return result.map(({ __score, ...item }) => item)
  }, [dataList, searchValue, disableFilter, disableReorder, search])

  // Get items of selected values (based on tempValue)
  const selectedItems = useMemo(() => {
    if (!tempValue) {
      return []
    }
    return allFlatItems.filter((item) => tempValue.includes(item.value))
  }, [allFlatItems, tempValue])

  const totalCount = allFlatItems.length
  const selectedCount = selectedItems.length
  const isCollapsible = totalCount > selectedItemsCollapsibleThreshold

  // When showConfirmButton is enabled, show the confirmed value count in the
  // trigger, not the temporary count. This prevents the trigger from updating
  // live as the user makes selections.
  const confirmedItems = useMemo(() => {
    if (!value) {
      return []
    }
    return allFlatItems.filter((item) => value.includes(item.value))
  }, [allFlatItems, value])
  const displayCount = showConfirmButton
    ? confirmedItems.length
    : selectedCount

  useEffect(() => {
    const previousValue = previousTempValueRef.current
    const hasChanged =
      previousValue.length !== tempValue.length ||
      previousValue.some((item, index) => item !== tempValue[index])

    if (!hasChanged) {
      previousTempValueRef.current = tempValue
      return
    }

    previousTempValueRef.current = tempValue

    if (!pendingCheckedCountAnnouncementRef.current) {
      return
    }

    pendingCheckedCountAnnouncementRef.current = false
    setAriaLiveCheckedCount(
      formatSelectionCount(tempValue.length, totalCount)
    )
  }, [tempValue, totalCount, formatSelectionCount])

  // Calculate indeterminate state for a parent item based on its children
  const getParentState = useCallback(
    (item: MultiSelectionItemInternal) => {
      if (!item.children || item.children.length === 0) {
        return {
          checked: tempValue.includes(item.value),
          indeterminate: false,
        }
      }

      const children = flattenItems(item.children)
      const checkedChildren = children.filter((child) =>
        tempValue.includes(child.value)
      ).length

      return {
        checked: checkedChildren === children.length,
        indeterminate:
          checkedChildren > 0 && checkedChildren < children.length,
      }
    },
    [tempValue, flattenItems]
  )

  // Normalize value to remove parent items when not all children are selected
  // and add parent items when all their children are selected
  const normalizeValue = useCallback(
    (nextValue: Array<number | string>) => {
      const normalized = new Set(nextValue)

      // Remove parents that don't have all children selected
      normalized.forEach((itemValue) => {
        const item = allFlatItems.find((i) => i.value === itemValue)
        if (item?.children) {
          const childValues = flattenItems(item.children).map(
            (c) => c.value
          )
          const allChildrenInValue = childValues.every((childVal) =>
            normalized.has(childVal)
          )
          if (!allChildrenInValue) {
            normalized.delete(itemValue)
          }
        }
      })

      // Add parents when all their children are selected
      const parentItems = allFlatItems.filter((item) => item.children)
      parentItems.forEach((item) => {
        const childValues = flattenItems(item.children).map((c) => c.value)
        const allChildrenInValue = childValues.every((childVal) =>
          normalized.has(childVal)
        )
        if (allChildrenInValue && childValues.length > 0) {
          normalized.add(item.value)
        }
      })

      return Array.from(normalized)
    },
    [allFlatItems, flattenItems]
  )

  const applyChange = useCallback(
    (nextValue: Array<number | string>) => {
      const normalizedValue = normalizeValue(nextValue)
      const finalValue =
        normalizedValue.length === 0
          ? (emptyValue as typeof value)
          : normalizedValue
      handleChange?.(finalValue)
      const nextSelectedItems = allFlatItems.filter((item) =>
        normalizedValue.includes(item.value)
      )
      setDisplayValue(nextSelectedItems.map((item) => item.title))
      if (path) {
        setFieldInternals?.(path + '/multiSelectionData', {
          props: nextSelectedItems,
        })
      }
    },
    [
      allFlatItems,
      emptyValue,
      handleChange,
      setDisplayValue,
      path,
      setFieldInternals,
      normalizeValue,
    ]
  )

  const handleToggleItem = useCallback(
    (itemValue: number | string) => {
      const next = tempValue.includes(itemValue)
        ? tempValue.filter((v) => v !== itemValue)
        : [...tempValue, itemValue]
      pendingCheckedCountAnnouncementRef.current = true
      setTempValue(next)
      if (!showConfirmButton) {
        applyChange(next)
      }
    },
    [tempValue, showConfirmButton, applyChange]
  )

  // Toggle parent item and all its children
  const handleToggleParent = useCallback(
    (item: MultiSelectionItemInternal) => {
      const children = item.children ? flattenItems(item.children) : []
      const allChildValues = children.map((child) => child.value)
      const allChildrenChecked = allChildValues.every((childVal) =>
        tempValue.includes(childVal)
      )

      let next = [...tempValue]

      if (allChildrenChecked) {
        // Uncheck all children and parent
        next = next.filter(
          (v) => ![item.value, ...allChildValues].includes(v)
        )
      } else {
        // Check all children (parent will be added by applyChange normalization
        // once all children are selected)
        next = Array.from(new Set([...next, ...allChildValues]))
      }

      pendingCheckedCountAnnouncementRef.current = true
      setTempValue(next)
      if (!showConfirmButton) {
        applyChange(next)
      }
    },
    [tempValue, showConfirmButton, applyChange, flattenItems]
  )

  const handleSelectAll = useCallback(() => {
    const allFilteredFlat = flattenItems(filteredItems)
    const selectableItems = allFilteredFlat.filter(
      (item) => !item.disabled
    )
    const allSelectableChecked = selectableItems.every((item) =>
      tempValue.includes(item.value)
    )

    const next = allSelectableChecked
      ? tempValue.filter(
          (v) => !selectableItems.some((item) => item.value === v)
        )
      : Array.from(
          new Set([
            ...tempValue,
            ...selectableItems.map((item) => item.value),
          ])
        )

    pendingCheckedCountAnnouncementRef.current = true
    setTempValue(next)
    if (!showConfirmButton) {
      applyChange(next)
    }
  }, [
    filteredItems,
    tempValue,
    showConfirmButton,
    applyChange,
    flattenItems,
  ])

  const handleRemoveTag = useCallback(
    (itemValue: number | string) => {
      const item = allFlatItems.find((i) => i.value === itemValue)
      if (item?.disabled) {
        return
      }
      const next = tempValue.filter((v) => v !== itemValue)
      pendingCheckedCountAnnouncementRef.current = true
      setTempValue(next)
      if (!showConfirmButton) {
        applyChange(next)
      }
    },
    [allFlatItems, tempValue, showConfirmButton, applyChange]
  )

  const handleConfirm = useCallback(() => {
    applyChange(tempValue)
    confirmedRef.current = true
    setIsOpen(false)
  }, [tempValue, applyChange])

  const handleCancel = useCallback(() => {
    setTempValue(value || [])
    setSearchValue('')
    setIsOpen(false)
  }, [value])

  // Calculate select-all state based on filtered items (excluding disabled)
  const allFilteredFlat = useMemo(
    () => flattenItems(filteredItems),
    [filteredItems, flattenItems]
  )
  const selectableFilteredFlat = useMemo(
    () => allFilteredFlat.filter((item) => !item.disabled),
    [allFilteredFlat]
  )
  const allFilteredSelected =
    selectableFilteredFlat.length > 0 &&
    selectableFilteredFlat.every((item) => tempValue.includes(item.value))
  const someFilteredSelected =
    !allFilteredSelected &&
    selectableFilteredFlat.some((item) => tempValue.includes(item.value))

  const getCheckboxes = useCallback(
    () =>
      Array.from(
        popoverContentRef.current?.querySelectorAll<HTMLInputElement>(
          '.dnb-checkbox__input:not(:disabled)'
        ) || []
      ),
    []
  )

  const getSearchInput = useCallback(
    () =>
      popoverContentRef.current?.querySelector<HTMLInputElement>(
        '.dnb-forms-field-multi-selection__search input:not(:disabled)'
      ) ?? null,
    []
  )

  const handlePopoverKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return
      }

      event.preventDefault()

      if (disabled) {
        return
      }

      const checkboxes = getCheckboxes()
      const searchInput = getSearchInput()
      const navigable: Array<HTMLInputElement> = [
        ...(searchInput ? [searchInput] : []),
        ...checkboxes,
      ]

      if (!navigable.length) {
        return
      }

      const active = document.activeElement
      const rowCheckbox = (active as HTMLElement)
        ?.closest('.dnb-forms-field-multi-selection__item')
        ?.querySelector<HTMLInputElement>('.dnb-checkbox__input')
      const current = navigable.includes(active as HTMLInputElement)
        ? (active as HTMLInputElement)
        : rowCheckbox && navigable.includes(rowCheckbox)
          ? rowCheckbox
          : null
      const index = current ? navigable.indexOf(current) : -1

      const next =
        index === -1
          ? event.key === 'ArrowDown'
            ? navigable[0]
            : navigable[navigable.length - 1]
          : event.key === 'ArrowDown'
            ? navigable[(index + 1) % navigable.length]
            : navigable[(index - 1 + navigable.length) % navigable.length]

      next?.focus()

      if (next !== searchInput) {
        next
          ?.closest('.dnb-forms-field-multi-selection__item')
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    },
    [disabled, getCheckboxes, getSearchInput]
  )

  const resolveFocusOnOpenElement = useCallback(() => {
    const dir = pendingTriggerNavigationRef.current
    const checkboxes = getCheckboxes()
    const searchInput = getSearchInput()

    if (dir === null) {
      // Mouse-open: focus the content wrapper so arrow keys work via handlePopoverKeyDown
      return popoverContentRef.current
    }

    if (dir === 1) {
      return searchInput ?? checkboxes[0]
    }

    return checkboxes[checkboxes.length - 1]
  }, [getCheckboxes, getSearchInput])

  const handleFocusComplete = useCallback(() => {
    pendingTriggerNavigationRef.current = null
  }, [])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx(
      'dnb-forms-field-multi-selection',
      isInline && 'dnb-forms-field-multi-selection--inline',
      className
    ),
    contentClassName: 'dnb-forms-field-multi-selection__field-content',
    disableStatusSummary: true,
    asFieldset: isInline,
    ...pickSpacingProps(props),
  }

  if (!isInline) {
    fieldBlockProps.contentWidth = width ?? 'large'
  }

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return
      }

      event.preventDefault()

      if (disabled) {
        return
      }

      if (isOpen) {
        const checkboxes = getCheckboxes()
        const searchInput = getSearchInput()
        const target =
          event.key === 'ArrowDown'
            ? (searchInput ?? checkboxes[0])
            : checkboxes[checkboxes.length - 1]
        target?.focus()
        return
      }

      pendingTriggerNavigationRef.current =
        event.key === 'ArrowDown' ? 1 : -1
      setIsOpen(true)
    },
    [disabled, getCheckboxes, getSearchInput, isOpen]
  )

  const searchContent = (
    <MultiSelectionSearch
      show={showSearchField}
      placeholder={translation.searchPlaceholder}
      value={searchValue}
      disabled={disabled}
      onSearchChange={setSearchValue}
    />
  )

  const itemListContent = (
    <MultiSelectionItemList
      disabled={disabled}
      filteredItems={filteredItems}
      tempValue={tempValue}
      searchValue={searchValue}
      showSelectAll={showSelectAll}
      htmlAttributes={htmlAttributes}
      translation={{
        selectAll: translation.selectAll,
        noOptions: translation.noOptions,
      }}
      getParentState={getParentState}
      onToggleItem={handleToggleItem}
      onToggleParent={handleToggleParent}
      onToggleSelectAll={handleSelectAll}
      selectableFilteredFlat={selectableFilteredFlat}
      allFilteredSelected={allFilteredSelected}
      someFilteredSelected={someFilteredSelected}
    />
  )

  const selectedTagsContent = (
    <MultiSelectionSelectedTags
      id={id}
      show={showSelectedTags}
      disabled={disabled}
      isCollapsible={isCollapsible}
      showSelectedItemsList={showSelectedItemsList}
      selectedItems={selectedItems}
      totalCount={totalCount}
      formatSelectionCount={formatSelectionCount}
      translation={{
        clearAll: translation.clearAll,
        placeholder: translation.placeholder,
      }}
      onToggleList={setShowSelectedItemsList}
      onRemoveTag={handleRemoveTag}
      onClearAll={() => {
        const disabledValues = allFlatItems
          .filter(
            (item) => item.disabled && tempValue.includes(item.value)
          )
          .map((item) => item.value)
        setTempValue(disabledValues)
        setShowSelectedItemsList(true)
        if (!showConfirmButton) {
          applyChange(disabledValues)
        }
      }}
    />
  )

  if (isInline) {
    return (
      <FieldBlock {...fieldBlockProps}>
        <div className="dnb-forms-field-multi-selection__container">
          <AriaLive priority="high">{ariaLiveCheckedCount}</AriaLive>

          <div className="dnb-forms-field-multi-selection__inline-content">
            {searchContent}
            {selectedTagsContent}
            {itemListContent}
          </div>
        </div>
      </FieldBlock>
    )
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <div className="dnb-forms-field-multi-selection__container">
        <AriaLive priority="high">{ariaLiveCheckedCount}</AriaLive>
        <Popover
          open={isOpen}
          focusOnOpen
          focusOnOpenElement={resolveFocusOnOpenElement}
          onFocusComplete={handleFocusComplete}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open && !confirmedRef.current) {
              setTempValue(value || [])
              setSearchValue('')
            }
            if (!open) {
              confirmedRef.current = false
            }
          }}
          placement="bottom"
          autoAlignViewportThreshold={0.75}
          horizontalOffset={width === 'medium' ? 40 : 0}
          hideCloseButton
          noInnerSpace={!hasFeature}
          hideArrow
          className="dnb-forms-field-multi-selection__popover"
          trigger={({ active, ...triggerProps }) => (
            <MultiSelectionTrigger
              id={id}
              active={active}
              disabled={disabled}
              displayCount={displayCount}
              totalCount={totalCount}
              formatSelectionCount={formatSelectionCount}
              onKeyDown={handleTriggerKeyDown}
              triggerProps={triggerProps}
            />
          )}
        >
          <div
            className="dnb-forms-field-multi-selection__popover-content"
            ref={handlePopoverContentRef}
            tabIndex={-1}
            onKeyDownCapture={handlePopoverKeyDown}
          >
            {searchContent}

            {selectedTagsContent}

            {itemListContent}

            <MultiSelectionActions
              show={showConfirmButton}
              disabled={disabled}
              tempValueLength={tempValue.length}
              formatMessage={formatMessage}
              translation={{
                confirmButton: translation.confirmButton,
                cancelButton: translation.cancelButton,
              }}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
        </Popover>
      </div>
    </FieldBlock>
  )
}

withComponentMarkers(MultiSelection, {
  _supportsSpacingProps: true,
})

export default MultiSelection
