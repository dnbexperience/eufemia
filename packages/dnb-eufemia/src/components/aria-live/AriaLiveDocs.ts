import type { PropertiesTableProps } from '../../shared/types'

export const AriaLiveProperties: PropertiesTableProps = {
  variant: {
    doc: 'Can be `text` for text messages or `content` for whole application content. Defaults to `text`.',
    type: 'string',
    status: 'optional',
  },
  priority: {
    doc: 'Priority of the announcement. Can be `low` or `high`. Defaults to `low`.',
    type: 'string',
    status: 'optional',
  },
  delay: {
    doc: 'Delay in milliseconds before the announcement is made. Defaults to `1000`.',
    type: 'number',
    status: 'optional',
  },
  disabled: {
    doc: 'If `true`, the announcement will not be made. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  atomic: {
    doc: 'If `true`, assistive technologies will present the entire region as a whole. If `false`, only additions will be announced.',
    type: 'boolean',
    status: 'optional',
  },
  politeness: {
    doc: 'The politeness setting for the announcement. Can be `polite` or `assertive`.',
    type: 'string',
    status: 'optional',
  },
  relevant: {
    doc: 'A space-separated list of the types of changes that should be announced. Can be `additions`, `removals`, `text`, or `all`.',
    type: 'string',
    status: 'optional',
  },
  showAnnouncement: {
    doc: 'Whether to show the children or not. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'The content that will be announced to the user.',
    type: 'ReactNode',
    status: 'required',
  },
}
