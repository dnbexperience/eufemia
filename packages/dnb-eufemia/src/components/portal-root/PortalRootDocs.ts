import type { PropertiesTableProps } from '../../shared/types'

export const PortalRootProperties: PropertiesTableProps = {
  ref: {
    doc: 'The ref of the element that will be used.',
    type: ['React.Ref<HTMLElement>', 'React.RefObject<HTMLElement>'],
    status: 'optional',
  },
  id: {
    doc: 'The id attribute for the portal root element.',
    type: 'string',
    status: 'optional',
  },
  insideSelector: {
    doc: 'CSS selector for a container to place the portal root inside. The portal element is inserted as the first child of the matched element.',
    type: 'string',
    status: 'optional',
  },
  beforeSelector: {
    doc: 'CSS selector for a target element; the portal root will be inserted directly before the first matched element.',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'The content that will be placed in a React Portal.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[HTML attributes]': {
    doc: 'When used on `PortalRoot.Provider`, any extra HTML attributes (e.g. `translate`, `lang`, `dir`, `data-*`) are forwarded to the portal DOM element. Props on `PortalRoot` itself take precedence.',
    type: 'various',
    status: 'optional',
  },
}
