/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  einvoice as EInvoice,
  ainvoice as AInvoice,
  digipost as DigiPost,
} from '@dnb/eufemia/src/icons'
import { Tag } from '@dnb/eufemia/src'

export const TagInteractable = () => (
  <ComponentBox data-visual-test="tag-interactable">
    <Tag.Group label="Interactable tags">
      <Tag
        data-visual-test="tag-clickable"
        variant="clickable"
        onClick={() => 'click'}
      >
        Clickable
      </Tag>
      <Tag
        data-visual-test="tag-addable"
        variant="addable"
        onClick={() => 'click'}
      >
        Addable
      </Tag>
      <Tag
        data-visual-test="tag-removable"
        variant="removable"
        onClick={() => 'click'}
      >
        Removable
      </Tag>
    </Tag.Group>
  </ComponentBox>
)

export const TagDefault = () => (
  <ComponentBox hideCode data-visual-test="tag-default">
    <Tag.Group label="Payment types">
      <Tag>Digipost</Tag>
      <Tag>AvtaleGiro</Tag>
    </Tag.Group>
  </ComponentBox>
)

export const TagWithIcon = () => (
  <ComponentBox
    hideCode
    data-visual-test="tag-icon"
    scope={{ EInvoice, AInvoice, DigiPost }}
  >
    <Tag.Group label="Betalingstyper">
      <Tag icon={AInvoice} text="AvtaleGiro" />
      <Tag icon={EInvoice} text="eFaktura" />
      <Tag icon={DigiPost} text="DigiPost" />
    </Tag.Group>
  </ComponentBox>
)

export const TagInline = () => (
  <ComponentBox data-visual-test="tag-inline">
    Text{' '}
    <Tag.Group label="Inline">
      <Tag text="First" /> between
      <Tag text="Second" />
      <Tag text="Third" />
    </Tag.Group>{' '}
    Text
  </ComponentBox>
)

export const TagMultipleRemovable = () => (
  <ComponentBox data-visual-test="tag-removable-list">
    {() => {
      const Genres = () => {
        const [tagData, setTagData] = React.useState([
          { key: 0, text: 'Action' },
          { key: 1, text: 'Comedy' },
          { key: 2, text: 'Drama' },
          { key: 3, text: 'Horror' },
          { key: 4, text: 'Fantasy' },
        ])

        const handleDelete = (tagToDelete) => () => {
          setTagData((tags) =>
            tags.filter((tag) => tag.key !== tagToDelete.key),
          )
        }

        return (
          <Tag.Group label="Genres">
            {tagData.map((tag) => {
              return (
                <Tag
                  key={tag.key}
                  text={tag.text}
                  variant="removable"
                  onClick={handleDelete(tag)}
                />
              )
            })}
          </Tag.Group>
        )
      }
      return <Genres />
    }}
  </ComponentBox>
)

export const TagSkeleton = () => (
  <ComponentBox data-visual-test="tag-skeleton">
    <Tag.Group label="Skeletons">
      <Tag skeleton text="Skeleton" />
      <Tag skeleton text="Skeleton" />
      <Tag skeleton text="Skeleton" />
    </Tag.Group>
  </ComponentBox>
)
