import { cloneElement, Fragment, isValidElement, useCallback } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { clsx } from 'clsx'
import { Checkbox } from '../../../../components'
import ScrollView from '../../../../fragments/scroll-view/ScrollView'
import { P } from '../../../../elements'
import type { MultiSelectionItem } from './MultiSelection'

export type MultiSelectionItemInternal = MultiSelectionItem & {
  error?: Error | any
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
  htmlAttributes?: any
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
}

function highlightText(
  text: string,
  searchValue: string,
  keyPrefix: string
): ReactNode {
  if (!searchValue || !text) {
    return text
  }

  const escapedSearch = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedSearch})`, 'gi')
  const exactRegex = new RegExp(`^${escapedSearch}$`, 'i')
  const parts = text.split(regex)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (exactRegex.test(part)) {
      return (
        <mark
          key={`${keyPrefix}-${index}`}
          className="dnb-forms-field-multi-selection__highlighting"
        >
          {part}
        </mark>
      )
    }

    return part
  })
}

function highlightSearchValue(
  node: ReactNode,
  searchValue: string,
  keyPrefix: string
): ReactNode {
  if (!searchValue) {
    return node
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      highlightSearchValue(child, searchValue, `${keyPrefix}-${index}`)
    )
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return highlightText(String(node), searchValue, keyPrefix)
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const children = node.props.children

    if (typeof children === 'undefined') {
      return node
    }

    return cloneElement(
      node,
      undefined,
      highlightSearchValue(children, searchValue, `${keyPrefix}-children`)
    )
  }

  return node
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
}: MultiSelectionItemListProps) {
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

  const renderItems = (
    items: MultiSelectionItem[],
    depth = 0,
    parentPath = ''
  ) => {
    return items.map((item: MultiSelectionItemInternal, index) => {
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
                  ? onToggleParent(item)
                  : onToggleItem(item.value)
              }
              disabled={disabled || item.disabled}
              label={highlightSearchValue(
                item.title,
                searchValue,
                `${itemPath}-title`
              )}
              className="dnb-forms-field-multi-selection__checkbox"
              {...htmlAttributes}
            />
            {(item.text || item.description) && (
              <div className="dnb-forms-field-multi-selection__item-details">
                {item.text && (
                  <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-text">
                    {highlightSearchValue(
                      item.text,
                      searchValue,
                      `${itemPath}-text`
                    )}
                  </span>
                )}
                {item.description && (
                  <span className="dnb-t__size--small dnb-forms-field-multi-selection__item-description">
                    {highlightSearchValue(
                      item.description,
                      searchValue,
                      `${itemPath}-description`
                    )}
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
    <ScrollView className={clsx('dnb-forms-field-multi-selection__items')}>
      <ul className="dnb-forms-field-multi-selection__list">
        {showSelectAll && selectableFilteredFlat.length > 0 && (
          <li className="dnb-forms-field-multi-selection__item dnb-forms-field-multi-selection__item--select-all">
            <Checkbox
              checked={allFilteredSelected}
              indeterminate={someFilteredSelected}
              onChange={onToggleSelectAll}
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
  )
}
