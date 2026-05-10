import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { MouseEvent, ReactNode } from 'react'
import * as z from 'zod'
import clsx from 'clsx'
import {
  AriaLive,
  Button,
  Checkbox,
  IconPrimary,
  Input,
  Tag,
  Popover,
  HeightAnimation,
  Flex,
} from '../../../../components'
import ScrollView from '../../../../fragments/scroll-view/ScrollView'
import { Hr, P } from '../../../../elements'
import { close, chevron_down } from '../../../../icons'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import type { DefaultErrorMessages, FieldProps, Path } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import useTranslation from '../../hooks/useTranslation'
import type { FormError } from '../../utils'
import {
  combineDescribedBy,
  convertJsxToString,
} from '../../../../shared/component-helper'
import whatInput from '../../../../shared/helpers/whatInput'
import useIsomorphicLayoutEffect from '../../../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type MultiSelectItem = {
  value: number | string
  title: ReactNode
  text?: ReactNode
  description?: ReactNode
  disabled?: boolean
  children?: Array<MultiSelectItem>
}
type MultiSelectItemInternal = MultiSelectItem & {
  error?: Error | FormError
  help?: { title: string; content: ReactNode }
  className?: string
  [key: string]: any
}

type MultiSelectionData = Array<MultiSelectItem>

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
    width,
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
  const [showSelectedItemsList, setShowSelectedItemsList] = useState(true)
  const [ariaLiveCheckedCount, setAriaLiveCheckedCount] = useState('')
  const confirmedRef = useRef(false)
  const popoverContentRef = useRef<HTMLDivElement>(null)
  const pendingTriggerNavigationRef = useRef<-1 | 1 | null>(null)
  const pendingCheckedCountAnnouncementRef = useRef(false)
  const previousTempValueRef = useRef<Array<number | string>>(value || [])
  const hasFeature =
    showSearchField || showSelectedTags || showConfirmButton

  const toSearchText = useCallback((content?: ReactNode) => {
    return convertJsxToString(content || '').toLowerCase()
  }, [])

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
      return items.flatMap((item: MultiSelectItemInternal) => [
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

  // Filter items based on search (includes nested items)
  const filteredItems = useMemo(() => {
    if (!dataList) {
      return []
    }
    if (!searchValue) {
      return dataList
    }

    const searchLower = searchValue.toLowerCase()

    const filterRecursive = (
      items: MultiSelectionData
    ): MultiSelectionData => {
      return items
        .map((item: MultiSelectItemInternal) => {
          const title = convertJsxToString(item.title).toLowerCase()
          const text = toSearchText(item.text)
          const description = toSearchText(item.description)
          const matches =
            title.includes(searchLower) ||
            text.includes(searchLower) ||
            description.includes(searchLower)
          const children = item.children
            ? filterRecursive(item.children)
            : []

          if (matches || children.length > 0) {
            return {
              ...item,
              children: children.length > 0 ? children : item.children,
            }
          }
          return null
        })
        .filter(Boolean) as MultiSelectionData
    }

    return filterRecursive(dataList)
  }, [dataList, searchValue, toSearchText])

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

  const selectionCountId = `${id}-selection-count`

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
    (item: MultiSelectItemInternal) => {
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
    (item: MultiSelectItemInternal) => {
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
      const next = tempValue.filter((v) => v !== itemValue)
      pendingCheckedCountAnnouncementRef.current = true
      setTempValue(next)
      if (!showConfirmButton) {
        applyChange(next)
      }
    },
    [tempValue, showConfirmButton, applyChange]
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
    className: clsx('dnb-forms-field-multi-selection', className),
    contentClassName: 'dnb-forms-field-multi-selection__field-content',
    disableStatusSummary: true,
    asFieldset: false,
    ...pickSpacingProps(props),
  }

  fieldBlockProps.contentWidth = width ?? 'large'

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLLIElement>, item: MultiSelectItemInternal) => {
      if (disabled || item.disabled) {
        return
      }

      const target = event.target as HTMLElement | null

      if (
        target?.closest('.dnb-checkbox__input') ||
        target?.closest('.dnb-checkbox__label')
      ) {
        return
      }

      if (item.children) {
        handleToggleParent(item)
        return
      }

      handleToggleItem(item.value)
    },
    [disabled, handleToggleItem, handleToggleParent]
  )

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

  // Recursively render items with support for nested items
  const renderItems = (
    items: MultiSelectionData,
    depth = 0,
    parentPath = ''
  ) => {
    return items.map((item: MultiSelectItemInternal, index) => {
      const itemPath = parentPath ? `${parentPath}-${index}` : `${index}`

      return (
        <Fragment key={item.value}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          <li
            className={clsx(
              'dnb-forms-field-multi-selection__item',
              item.children &&
                'dnb-forms-field-multi-selection__item--parent',
              tempValue.includes(item.value) &&
                'dnb-forms-field-multi-selection__item--selected',
              item.disabled &&
                'dnb-forms-field-multi-selection__item--disabled',
              depth > 0 &&
                `dnb-forms-field-multi-selection__item--level-${depth}`
            )}
            onClick={(event) => handleItemClick(event, item)}
          >
            <Checkbox
              checked={
                item.children
                  ? getParentState(item).checked
                  : tempValue.includes(item.value)
              }
              indeterminate={
                item.children ? getParentState(item).indeterminate : false
              }
              onChange={() =>
                item.children
                  ? handleToggleParent(item)
                  : handleToggleItem(item.value)
              }
              disabled={disabled || item.disabled}
              label={item.title}
              className="dnb-forms-field-multi-selection__checkbox"
              {...htmlAttributes}
            />
            {(item.text || item.description) && (
              <div className="dnb-forms-field-multi-selection__item-details">
                {item.text && (
                  <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-text">
                    {item.text}
                  </span>
                )}
                {item.description && (
                  <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-description">
                    {item.description}
                  </span>
                )}
              </div>
            )}
          </li>
          {item.children && item.children.length > 0 && (
            <ul className="dnb-forms-field-multi-selection__nested-items">
              {renderItems(item.children, depth + 1, itemPath)}
            </ul>
          )}
        </Fragment>
      )
    })
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
          horizontalOffset={width === 'medium' ? 40 : 0}
          hideCloseButton
          noInnerSpace={!hasFeature}
          hideArrow
          className="dnb-forms-field-multi-selection__popover"
          trigger={({
            active,
            className: triggerClassName,
            ...triggerProps
          }) => (
            <span
              className={clsx(
                'dnb-dropdown',
                'dnb-dropdown--stretch',
                'dnb-dropdown--default',
                'dnb-dropdown--right',
                'dnb-dropdown--icon-position-right',
                'dnb-dropdown--vertical',
                'dnb-form-component',
                active && 'dnb-dropdown--open'
              )}
            >
              <span className="dnb-dropdown__inner">
                <span className="dnb-dropdown__row">
                  <span className="dnb-dropdown__shell">
                    <Button
                      variant="secondary"
                      size="medium"
                      className={clsx(
                        'dnb-dropdown__trigger',
                        triggerClassName
                      )}
                      disabled={disabled}
                      customContent={
                        <>
                          <span
                            aria-hidden="true"
                            className="dnb-dropdown__text dnb-button__text"
                          >
                            <span className="dnb-dropdown__text__inner">
                              {formatSelectionCount(
                                displayCount,
                                totalCount
                              )}
                            </span>
                          </span>
                          <span
                            id={selectionCountId}
                            className="dnb-sr-only"
                          >
                            {formatSelectionCount(
                              displayCount,
                              totalCount
                            )}
                          </span>
                          <span aria-hidden className="dnb-dropdown__icon">
                            <IconPrimary icon="chevron_down" />
                          </span>
                        </>
                      }
                      role="combobox"
                      aria-haspopup="listbox"
                      {...triggerProps}
                      aria-describedby={combineDescribedBy(
                        triggerProps,
                        selectionCountId
                      )}
                      onKeyDown={(event) => {
                        handleTriggerKeyDown(event)
                        triggerProps.onKeyDown?.(event)
                      }}
                      id={id}
                    />
                  </span>
                </span>
              </span>
            </span>
          )}
        >
          <div
            className="dnb-forms-field-multi-selection__popover-content"
            ref={popoverContentRef}
            tabIndex={-1}
            onKeyDownCapture={handlePopoverKeyDown}
          >
            {showSearchField && (
              <>
                <Input
                  label={false}
                  icon="loupe"
                  iconPosition="left"
                  placeholder={translation.searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.value)}
                  disabled={disabled}
                  stretch
                  showClearButton={searchValue.length > 0}
                  onClear={() => setSearchValue('')}
                  className="dnb-forms-field-multi-selection__search"
                />
                <Hr
                  space={0}
                  className="dnb-forms-field-multi-selection__separator"
                />
              </>
            )}

            {showSelectedTags && (
              <>
                {isCollapsible && (
                  <Flex.Horizontal
                    className="dnb-forms-field-multi-selection__selected-items-header"
                    justify="space-between"
                    align="center"
                    bottom="x-small"
                  >
                    <Button
                      variant="tertiary"
                      icon={chevron_down}
                      className={clsx(
                        'dnb-forms-field-multi-selection__accordion',
                        showSelectedItemsList &&
                          'dnb-forms-field-multi-selection__accordion--open'
                      )}
                      aria-expanded={showSelectedItemsList}
                      aria-controls={`${id}-selected-items`}
                      onClick={() =>
                        setShowSelectedItemsList(!showSelectedItemsList)
                      }
                      disabled={disabled}
                    >
                      {formatSelectionCount(
                        selectedItems.length,
                        totalCount
                      )}
                    </Button>
                    {selectedItems.length > 0 && (
                      <Button
                        variant="tertiary"
                        icon={close}
                        onClick={() => {
                          setTempValue([])
                          setShowSelectedItemsList(true)
                          if (!showConfirmButton) {
                            applyChange([])
                          }
                        }}
                        disabled={disabled}
                      >
                        {translation.clearAll}
                      </Button>
                    )}
                  </Flex.Horizontal>
                )}

                <HeightAnimation
                  open={isCollapsible ? showSelectedItemsList : true}
                  keepInDOM={isCollapsible}
                  id={`${id}-selected-items`}
                  className="dnb-forms-field-multi-selection__selected-items"
                >
                  <ScrollView className="dnb-forms-field-multi-selection__selected-items__inner">
                    {selectedItems.length > 0 ? (
                      selectedItems.map((item) => (
                        <Tag
                          key={item.value}
                          variant="removable"
                          hasLabel
                          onClick={() => handleRemoveTag(item.value)}
                        >
                          {item.title}
                        </Tag>
                      ))
                    ) : (
                      <P className="dnb-forms-field-multi-selection__placeholder">
                        {translation.placeholder}
                      </P>
                    )}
                  </ScrollView>
                </HeightAnimation>
                <Hr
                  space={0}
                  className="dnb-forms-field-multi-selection__separator"
                />
              </>
            )}

            <ScrollView
              className={clsx('dnb-forms-field-multi-selection__items')}
            >
              <ul className="dnb-forms-field-multi-selection__list">
                {showSelectAll && selectableFilteredFlat.length > 0 && (
                  <li className="dnb-forms-field-multi-selection__item dnb-forms-field-multi-selection__item--select-all">
                    <Checkbox
                      checked={allFilteredSelected}
                      indeterminate={someFilteredSelected}
                      onChange={handleSelectAll}
                      disabled={disabled}
                      label={translation.selectAll}
                      className="dnb-forms-field-multi-selection__checkbox"
                    />
                  </li>
                )}

                {filteredItems.length === 0 && searchValue ? (
                  <li className="dnb-forms-field-multi-selection__no-options">
                    <P className="dnb-forms-field-multi-selection__no-options-text">
                      {translation.noOptions}
                    </P>
                  </li>
                ) : (
                  renderItems(filteredItems)
                )}
              </ul>
            </ScrollView>

            {showConfirmButton && (
              <>
                <Hr
                  space={0}
                  className="dnb-forms-field-multi-selection__separator"
                />
                <div className="dnb-forms-field-multi-selection__actions">
                  <Button
                    variant="primary"
                    onClick={handleConfirm}
                    disabled={disabled}
                    className="dnb-forms-field-multi-selection__confirm-button"
                  >
                    {formatMessage(translation.confirmButton, {
                      count: tempValue.length,
                    })}
                  </Button>
                  <Button
                    variant="tertiary"
                    onClick={handleCancel}
                    disabled={disabled}
                    icon={close}
                  >
                    {translation.cancelButton}
                  </Button>
                </div>
              </>
            )}
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
