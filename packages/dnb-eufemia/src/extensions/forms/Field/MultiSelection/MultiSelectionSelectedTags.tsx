import { Fragment } from 'react'
import { Accordion, Button, Flex, Tag } from '../../../../components'
import { Hr, P } from '../../../../elements'
import ScrollView from '../../../../fragments/scroll-view/ScrollView'
import { close } from '../../../../icons'
import type { MultiSelectionItem } from './MultiSelection'

export type MultiSelectionSelectedTagsProps = {
  id: string
  show: boolean
  disabled?: boolean
  isCollapsible: boolean
  selectedItems: MultiSelectionItem[]
  totalCount: number
  formatSelectionCount: (count: number, total: number) => string
  translation: {
    clearAll: string
    placeholder: string
  }
  onRemoveTag: (value: number | string) => void
  onClearAll: () => void
}

export function MultiSelectionSelectedTags({
  id,
  show,
  disabled,
  isCollapsible,
  selectedItems,
  totalCount,
  formatSelectionCount,
  translation,
  onRemoveTag,
  onClearAll,
}: MultiSelectionSelectedTagsProps) {
  if (!show) {
    return null
  }

  const tagsContent = (
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
  )

  return (
    <Fragment>
      {isCollapsible && (
        <Flex.Horizontal
          className="dnb-forms-field-multi-selection__selected-items-header"
          justify="space-between"
          align="center"
        >
          <Accordion
            variant="tertiary"
            title={formatSelectionCount(selectedItems.length, totalCount)}
            id={`${id}-selected-accordion`}
            iconPosition="right"
            disabled={disabled}
          />
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

      {isCollapsible ? (
        <Accordion.Content
          id={`${id}-selected-accordion`}
          className="dnb-forms-field-multi-selection__selected-items"
        >
          {tagsContent}
        </Accordion.Content>
      ) : (
        <div className="dnb-forms-field-multi-selection__selected-items">
          {tagsContent}
        </div>
      )}
      <Hr
        space={0}
        className="dnb-forms-field-multi-selection__separator"
      />
    </Fragment>
  )
}
