import { PropertiesTableProps } from '../../shared/types'

export const AccordionProperties: PropertiesTableProps = {
  id: {
    doc: 'A unique `id` that will be used on the button element. If you use `remember_state`, an id is required.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'A title as a string or React element. It will be used as the button text.',
    type: 'string',
    status: 'optional',
  },
  expanded: {
    doc: 'If set to `true` the accordion will be expanded as its initial state.',
    type: 'boolean',
    status: 'optional',
  },
  expanded_ssr: {
    doc: "If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that's mainly a technical aspect to consider.",
    type: 'boolean',
    status: 'optional',
  },
  remember_state: {
    doc: 'If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the state in the local storage.',
    type: 'boolean',
    status: 'optional',
  },
  flush_remembered_state: {
    doc: 'If set to `true`, the saved (remembered) state will be removed and the initial component state will be used and set.',
    type: 'boolean',
    status: 'optional',
  },
  no_animation: {
    doc: 'If set to `true`, the open and close animation will be omitted.',
    type: 'boolean',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the used styling. `Outlined`, `filled`, or `plain` (no styling). Defaults to `outlined`.',
    type: ['outlined', 'filled', 'plain'],
    status: 'optional',
  },
  icon: {
    doc: 'Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon_position: {
    doc: 'Will set the placement of the icon. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  icon_size: {
    doc: 'Define a different icon size. Defaults to `medium` (1.5rem).',
    type: 'string',
    status: 'optional',
  },
  left_component: {
    doc: 'Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  prerender: {
    doc: 'If set to `true` the content will be present, even the accordion is not expanded. Can be useful for assistive technology or SEO.',
    type: 'boolean',
    status: 'optional',
  },
  prevent_rerender: {
    doc: "If set to `true` the accordion component will not re-render its content – can be useful for widgets you don't have control of storing the temporary state during an interaction.",
    type: 'boolean',
    status: 'optional',
  },
  prevent_rerender_conditional: {
    doc: 'Use this prop together with `prevent_rerender` – and if it is set to `true`, the accordion component will re-render if the children are a new React element and do not match the previous one anymore.',
    type: 'boolean',
    status: 'optional',
  },
  single_container: {
    doc: 'If set to `true`, a group of accordions will be wrapped to a sidebar looking menu for medium and larger screens.',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  heading: {
    doc: 'If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `heading_level` property.',
    type: 'boolean',
    status: 'optional',
  },
  heading_level: {
    doc: 'If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, the accordion button will be disabled (dimmed).',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  contentRef: {
    doc: 'Send along a custom React Ref for `.dnb-accordion__content`.',
    type: 'function',
    status: 'optional',
  },
  collapseAllHandleRef: {
    doc: 'Ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions. Default: `undefined`.',
    type: 'React.MutableRefObject<() => void>',
    status: 'optional',
  },
  space: {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const AccordionProviderGroupProperties: PropertiesTableProps = {
  group: {
    doc: "Define a unique id, it will be used to 'group' several accordions into one.",
    type: 'string',
    status: 'optional',
  },
  allow_close_all: {
    doc: 'If set to `true`, the group of accordions will allow all to close.',
    type: 'boolean',
    status: 'optional',
  },

  expandBehaviour: {
    doc: 'Determines how many accordions can be expanded at once. Defaults to `single`',
    type: ['single', 'multiple'],
    status: 'optional',
  },
  expanded_id: {
    doc: 'Define an `id` of a nested accordion that will get expanded.',
    type: 'string',
    status: 'optional',
  },
  space: {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const AccordionEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.',
    type: 'function',
    status: 'optional',
  },
}
