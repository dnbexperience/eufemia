import { Fragment, useCallback, useMemo, useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { clsx } from 'clsx'
import { Checkbox } from '../../../../components'
import ScrollView from '../../../../components/scroll-view/ScrollView'
import { P } from '../../../../elements'
import { useHighlightText } from '../../../../shared/helpers/highlightText'
import type {
  FieldMultiSelectionProps,
  MultiSelectionListDriver,
  MultiSelectionListDriverProps,
  MultiSelectionListDriverRow,
  MultiSelectionListDriverRowProps,
  MultiSelectionItem,
} from './MultiSelection'

export type MultiSelectionItemInternal = MultiSelectionItem & {
  error?: Error
  help?: { title: string; content: ReactNode }
  className?: string
  [key: string]: any
}

export type MultiSelectionItemListProps = {
  disabled?: boolean
  filteredItems: MultiSelectionItem[]
  tempValue: Array<number | string>
  searchValue: string
  showSelectAll: boolean
  htmlAttributes?: FieldMultiSelectionProps['htmlAttributes']
  translation: {
    selectAll: string
    noOptions: string
  }
  getParentState: (item: MultiSelectionItemInternal) => {
    checked: boolean
    indeterminate: boolean
  }
  onToggleItem: (value: number | string) => void
  onToggleParent: (item: MultiSelectionItemInternal) => void
  onToggleSelectAll: () => void
  selectableFilteredFlat: MultiSelectionItem[]
  allFilteredSelected: boolean
  someFilteredSelected: boolean
  maxHeight?: string | number
  listDriver?: MultiSelectionListDriver
  open: boolean
  registerListDriver: MultiSelectionListDriverProps['registerListDriver']
}

export function MultiSelectionItemList({
  disabled,
  filteredItems,
  tempValue,
  searchValue,
  showSelectAll,
  htmlAttributes,
  translation,
  getParentState,
  onToggleItem,
  onToggleParent,
  onToggleSelectAll,
  selectableFilteredFlat,
  allFilteredSelected,
  someFilteredSelected,
  maxHeight,
  listDriver,
  open,
  registerListDriver,
}: MultiSelectionItemListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const selectedValueSet = useMemo(() => new Set(tempValue), [tempValue])
  const highlight = useHighlightText({
    search: searchValue,
    className: 'dnb-forms-field-multi-selection__highlighting',
    tag: 'mark',
  })

  const handleItemClick = useCallback(
    (
      event: MouseEvent<HTMLLIElement>,
      item: MultiSelectionItemInternal
    ) => {
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
        onToggleParent(item)
        return
      }

      onToggleItem(item.value)
    },
    [disabled, onToggleItem, onToggleParent]
  )

  const renderItem = (
    item: MultiSelectionItemInternal,
    depth: number,
    itemProps: MultiSelectionListDriverRowProps = {}
  ) => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <li
      {...itemProps}
      className={clsx(
        'dnb-forms-field-multi-selection__item',
        item.children && 'dnb-forms-field-multi-selection__item--parent',
        selectedValueSet.has(item.value) &&
          'dnb-forms-field-multi-selection__item--selected',
        item.disabled && 'dnb-forms-field-multi-selection__item--disabled',
        depth > 0 &&
          `dnb-forms-field-multi-selection__item--level-${depth}`,
        itemProps.className
      )}
      onClick={(event) => handleItemClick(event, item)}
    >
      <Checkbox
        checked={
          item.children
            ? getParentState(item).checked
            : selectedValueSet.has(item.value)
        }
        indeterminate={
          item.children ? getParentState(item).indeterminate : false
        }
        onChange={() =>
          item.children ? onToggleParent(item) : onToggleItem(item.value)
        }
        disabled={disabled || item.disabled}
        label={highlight(item.title)}
        className="dnb-forms-field-multi-selection__checkbox"
        {...htmlAttributes}
      />
      {(item.text || item.description) && (
        <div className="dnb-forms-field-multi-selection__item-details">
          {item.text && (
            <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-text">
              {highlight(item.text)}
            </span>
          )}
          {item.description && (
            <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-description">
              {highlight(item.description)}
            </span>
          )}
        </div>
      )}
    </li>
  )

  const renderItems = (
    items: MultiSelectionItem[],
    depth = 0,
    parentPath = ''
  ) => {
    return items.map((item: MultiSelectionItemInternal, index) => {
      const itemPath = parentPath ? `${parentPath}-${index}` : `${index}`

      return (
        <Fragment key={item.value}>
          {renderItem(item, depth)}
          {item.children && item.children.length > 0 && (
            <ul className="dnb-forms-field-multi-selection__nested-items">
              {renderItems(item.children, depth + 1, itemPath)}
            </ul>
          )}
        </Fragment>
      )
    })
  }

  const renderSelectAll = (
    itemProps: MultiSelectionListDriverRowProps = {}
  ) => (
    <li
      {...itemProps}
      className={clsx(
        'dnb-forms-field-multi-selection__item',
        'dnb-forms-field-multi-selection__item--select-all',
        itemProps.className
      )}
    >
      <Checkbox
        checked={allFilteredSelected}
        indeterminate={someFilteredSelected}
        onChange={onToggleSelectAll}
        disabled={disabled}
        label={translation.selectAll}
        className="dnb-forms-field-multi-selection__checkbox"
      />
    </li>
  )

  const driverRows = (() => {
    let index = 0
    const rows: MultiSelectionListDriverRow[] = []

    if (showSelectAll && selectableFilteredFlat.length > 0) {
      const itemIndex = index++
      rows.push({
        key: 'select-all',
        disabled,
        render: (props = {}) =>
          renderSelectAll({
            ...props,
            'data-multi-selection-index': itemIndex,
          }),
      })
    }

    const addItems = (items: MultiSelectionItem[], depth = 0) => {
      items.forEach((item: MultiSelectionItemInternal) => {
        const itemIndex = index++
        rows.push({
          key: String(item.value),
          disabled: disabled || item.disabled,
          render: (props = {}) =>
            renderItem(item, depth, {
              ...props,
              'data-multi-selection-index': itemIndex,
            }),
        })
        if (item.children) {
          addItems(item.children, depth + 1)
        }
      })
    }

    addItems(filteredItems)
    return rows
  })()

  return (
    <ScrollView
      className={clsx('dnb-forms-field-multi-selection__items')}
      ref={scrollRef}
      interactive={maxHeight === undefined ? undefined : 'auto'}
      style={
        maxHeight === undefined
          ? undefined
          : {
              maxHeight:
                typeof maxHeight === 'number'
                  ? `${maxHeight}rem`
                  : maxHeight,
            }
      }
    >
      <ul className="dnb-forms-field-multi-selection__list">
        {!listDriver &&
          showSelectAll &&
          selectableFilteredFlat.length > 0 &&
          renderSelectAll()}

        {filteredItems.length === 0 && searchValue ? (
          <li className="dnb-forms-field-multi-selection__no-options">
            <P className="dnb-forms-field-multi-selection__no-options-text">
              {translation.noOptions}
            </P>
          </li>
        ) : listDriver ? (
          <listDriver.Renderer
            rows={driverRows}
            open={open}
            scrollRef={scrollRef}
            registerListDriver={registerListDriver}
          />
        ) : (
          renderItems(filteredItems)
        )}
      </ul>
    </ScrollView>
  )
}
