import type { PropertiesTableProps } from '../../shared/types'

export const VisuallyHiddenProperties: PropertiesTableProps = {
  focusable: {
    doc: 'Set to `true` to hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user) root. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Custom root HTML element for the component. Defaults to `<span>`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
}
