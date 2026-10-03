import type { PropertiesTableProps } from '../../../../shared/types'

export const RemoveButtonProperties: PropertiesTableProps = {
  showConfirmDialog: {
    doc: 'Use `true` to show a confirmation dialog before removing the item.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties. A given `onClick` runs before the item is removed, instead of replacing it. Return `false` from it to keep the item. With `showConfirmDialog`, it runs when the dialog opens.',
    type: 'Various',
    status: 'optional',
  },
}
