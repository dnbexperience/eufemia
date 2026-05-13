import { Fragment } from 'react'
import clsx from 'clsx'
import { Button, Flex, HeightAnimation, Tag } from '../../../../components'
import { Hr, P } from '../../../../elements'
import ScrollView from '../../../../fragments/scroll-view/ScrollView'
import { close, chevron_down } from '../../../../icons'
import type { MultiSelectionItem } from './MultiSelection'

export type MultiSelectionSelectedTagsProps = {
  id: string
  show: boolean
  disabled?: boolean
  isCollapsible: boolean
  showSelectedItemsList: boolean
  selectedItems: MultiSelectionItem[]
  totalCount: number
  formatSelectionCount: (count: number, total: number) => string
  translation: {
    clearAll: string
    placeholder: string
  }
  onToggleList: (open: boolean) => void
  onRemoveTag: (value: number | string) => void
  onClearAll: () => void
}

export function MultiSelectionSelectedTags({
  id,
  show,
  disabled,
  isCollapsible,
  showSelectedItemsList,
  selectedItems,
  totalCount,
  formatSelectionCount,
  translation,
  onToggleList,
  onRemoveTag,
  onClearAll,
}: MultiSelectionSelectedTagsProps) {
  if (!show) {
    return null
  }

  return (
    <Fragment>
      {isCollapsible && (
        <Flex.Horizontal
          className="dnb-forms-field-multi-selection__selected-items-header"
          justify="space-between"
          align="center"
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
            onClick={() => onToggleList(!showSelectedItemsList)}
            disabled={disabled}
          >
            {formatSelectionCount(selectedItems.length, totalCount)}
          </Button>
          {selectedItems.length > 0 && (
            <Button
              variant="tertiary"
              icon={close}
              onClick={onClearAll}
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
                variant={item.disabled ? 'default' : 'removable'}
                hasLabel
                onClick={
                  item.disabled ? undefined : () => onRemoveTag(item.value)
                }
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
    </Fragment>
  )
}
