import { PropertiesTableProps } from '../../shared/types'

export const DropdownEvents: PropertiesTableProps = {
  on_change: {
    doc: 'will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }`.',
    type: 'function',
    status: 'optional',
  },
  on_select: {
    doc: 'will be called once the user focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }`. The **active_item** property is the currently selected item by keyboard navigation.',
    type: 'function',
    status: 'optional',
  },
  on_show: {
    doc: 'will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
  on_hide: {
    doc: 'will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
}
