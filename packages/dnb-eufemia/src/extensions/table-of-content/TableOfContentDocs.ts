import type { PropertiesTableProps } from '../../shared/types'

export const TableOfContentRootProperties: PropertiesTableProps = {
  children: {
    doc: 'Nested TableOfContent.Item elements. Fragments and memoized items are supported. Use Data for generated content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  title: {
    doc: 'Visible title and default accessible name. Translated through locale or the Provider locale.',
    type: 'React.ReactNode',
    defaultValue: '"On this page"',
    status: 'optional',
  },
  locale: {
    doc: 'Language of the built-in title and show-all label. Overrides the Provider locale for this navigation only. Also sets its lang attribute unless lang is supplied. Custom titles and accessible names take precedence.',
    type: 'string',
    status: 'optional',
  },
  currentId: {
    doc: 'Controlled current section id. Omit to detect it while scrolling. Set null to clear it. A section below maxDepth marks its nearest visible ancestor.',
    type: ['string', 'null'],
    status: 'optional',
  },
  currentSectionOffset: {
    doc: 'Distance in pixels from the viewport top where a heading becomes current. Match the height of your sticky header.',
    type: 'number',
    defaultValue: '0',
    status: 'optional',
  },
  maxDepth: {
    doc: 'Number of visible levels, starting at the highest heading level below h1. Deeper headings remain tracked.',
    type: 'number',
    defaultValue: '2',
    status: 'optional',
  },
  maxVisibleItems: {
    doc: 'Maximum number of links initially shown below the breakpoint, including nested links and an included page title. Set 0 to show every link. Desktop always shows all links.',
    type: 'number',
    defaultValue: '10',
    status: 'optional',
  },
  breakpoint: {
    doc: 'Eufemia breakpoint above which the navigation is always expanded. At or below it, a disclosure button controls the list. Defaults to large (72em, normally 1152px); Provider breakpoint overrides are respected.',
    type: ['"small"', '"medium"', '"large"', '"x-large"', '"xx-large"'],
    defaultValue: '"large"',
    status: 'optional',
  },
  styleNonce: {
    doc: 'CSP nonce for the inline styles used before hydration.',
    type: 'string',
    status: 'optional',
  },
  stretch: {
    doc: 'Use the available width. Otherwise the expanded sidebar is 12rem wide.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  sticky: {
    doc: 'Keep the desktop navigation visible while its containing content scrolls. Set false when the application positions it.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  stickyOffset: {
    doc: 'Distance from the top of the scroll container. Numbers use pixels; strings accept CSS lengths.',
    type: ['number', 'string'],
    defaultValue: '0',
    status: 'optional',
  },
  animateChanges: {
    doc: 'Animate heading-list changes with a short fade and staggered slide from the left. Initial rendering, section selection and collapsed lists are not animated. Respects reduced motion.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  expanded: {
    doc: 'Controlled disclosure state below the breakpoint.',
    type: 'boolean',
    status: 'optional',
  },
  defaultExpanded: {
    doc: 'Initial disclosure state below the breakpoint.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  expandedStorageKey: {
    doc: 'Storage key used to remember the disclosure state across navigation and reloads. Stored booleans override defaultExpanded. Controlled expanded does not read or write storage.',
    type: 'string',
    status: 'optional',
  },
  expandedStorage: {
    doc: 'Storage used with expandedStorageKey. Session storage is recommended for navigation UI state.',
    type: ['"session"', '"local"'],
    defaultValue: '"session"',
    status: 'optional',
  },
  ref: {
    doc: 'Reference to the navigation element.',
    type: 'React.Ref<HTMLElement>',
    status: 'optional',
  },
  '[HTML attributes]': {
    doc: 'Standard nav attributes, including className, style, aria-label and aria-labelledby. A supplied accessible name takes precedence over the visible title.',
    type: 'Various',
    status: 'optional',
  },
  '[Space properties]': {
    doc: 'Supports spacing properties.',
    type: 'Various',
    status: 'optional',
  },
}
export const TableOfContentDataProperties: PropertiesTableProps = {
  data: {
    doc: 'Flat array of { id, text, level } in document order. Ids identify existing destinations and must be unique on the page. Text accepts inline React content. Level is the heading level from 1 to 6; h1 headings are tracked and shown when includeH1 is enabled.',
    type: 'Array<TableOfContentSection>',
    status: 'required',
  },
  '[Root properties]': {
    doc: 'Supports TableOfContent.Root properties except children.',
    type: 'Various',
    status: 'optional',
  },
  includeH1: {
    doc: 'Include level-1 page titles as links before their sections, without adding indentation or counting toward maxDepth.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
}
export const TableOfContentItemProperties: PropertiesTableProps = {
  id: {
    doc: 'Unique id of the heading or section to navigate to. It is not applied to the list item.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'Readable link label. Supports inline formatting such as code. Avoid interactive content inside labels.',
    type: 'React.ReactNode',
    status: 'required',
  },
  children: {
    doc: 'Nested TableOfContent.Item elements.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  '[HTML attributes]': {
    doc: 'Standard list-item attributes, including className and style.',
    type: 'Various',
    status: 'optional',
  },
}
export const TableOfContentRootEvents: PropertiesTableProps = {
  onExpandedChange: {
    doc: 'Called with the requested disclosure state after button activation or browser find-in-page. Update expanded when controlling the state.',
    type: '(expanded: boolean) => void',
    status: 'optional',
  },
}
export const TableOfContentItemEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called before native fragment navigation and destination focus. Call event.preventDefault() to handle navigation yourself.',
    type: 'React.MouseEventHandler<HTMLAnchorElement>',
    status: 'optional',
  },
}
