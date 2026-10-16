import type { PropertiesTableProps } from '../../shared/types'

export const CardProperties: PropertiesTableProps = {
  closeButtonProps: {
    doc: 'Deprecated: pass properties directly to Card.Info.CloseButton. Preserved for compatibility with onClose.',
    type: 'ButtonProps',
    status: 'optional',
  },
  layoutEngine: {
    doc: 'Select the internal Flex layout engine. Defaults to `legacy` for backwards compatibility. Use `css` to opt in to native CSS gap.',
    type: ['"css"', '"legacy"'],
    defaultValue: `'legacy'`,
    status: 'optional',
  },
  outset: {
    doc: 'Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stack: {
    doc: 'True to stack the sub components with space between. The `spacing` will default to `medium`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  direction: {
    doc: 'Defaults to `vertical`.',
    type: ['"horizontal"', '"vertical"'],
    status: 'optional',
  },
  alignSelf: {
    doc: 'Defaults to `stretch`.',
    type: [
      '"flex-start"',
      '"flex-end"',
      '"center"',
      '"baseline"',
      '"stretch"',
    ],
    status: 'optional',
  },
  title: {
    doc: 'Define a title that appears on top of the Card.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  responsive: {
    doc: 'Define if the card should behave responsive. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  filled: {
    doc: 'Define if the Card should get the same background color as the outline border.',
    type: 'boolean',
    status: 'optional',
  },
  outline: {
    doc: 'Define the outline color. Defaults to `var(--card-outline-color)`.',
    type: 'string',
    status: 'optional',
  },
  outlineWidth: {
    doc: 'Define the outline width. Defaults to `var(--card-outline-width)` (`0.0625rem`).',
    type: ['string', 'number'],
    status: 'optional',
  },
  dropShadow: {
    doc: 'Define if the Card should have drop shadow. Uses Section `dropShadow`.',
    type: 'boolean',
    status: 'optional',
  },
  backgroundColor: {
    doc: 'Define the background color. Defaults to `var(--card-background-color)`.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `section`.',
    type: 'React.Element',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const CardActionProperties: PropertiesTableProps = {
  href: {
    doc: 'The URL to navigate to. When set, renders an anchor element. Values using a script-executing protocol (`javascript:` or `vbscript:`) are removed.',
    type: 'string',
    status: 'optional',
  },
  to: {
    doc: 'Route path for use with a router Link component (e.g. react-router). Pass a custom `element` that accepts `to`. Values using a script-executing protocol (`javascript:` or `vbscript:`) are removed.',
    type: 'string',
    status: 'optional',
  },
  target: {
    doc: 'The anchor target attribute.',
    type: 'string',
    status: 'optional',
  },
  rel: {
    doc: 'The anchor rel attribute.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Custom element to render as the wrapper. Defaults to `a` when `href`/`to` is set. Use this for router Link components.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  children: {
    doc: 'Contents of the Card inside the action wrapper.',
    type: 'React.ReactNode',
    status: 'required',
  },
  'Card properties': {
    doc: '[Card](/uilib/components/card/properties) properties are supported. A whole-card action must not contain nested interactive controls.',
    type: 'Various',
    status: 'optional',
  },
}

export const CardActionEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Click handler. When used without `href`/`to`, renders a button-like wrapper with keyboard support (Enter/Space).',
    type: 'function',
    status: 'optional',
  },
}

export const CardInfoProperties: PropertiesTableProps = {
  children: {
    doc: 'Freely composed content such as headings, text, graphics, or actions. Do not include interactive controls when the whole card is interactive.',
    type: 'React.ReactNode',
    status: 'required',
  },
  'Card properties': {
    doc: 'All [Card](/uilib/components/card/properties) properties are supported. Defaults to responsive=false, dropShadow=true, stack=true, gap="small", and innerSpace="small" on small screens or "medium" on larger screens. All defaults can be overridden.',
    type: 'Various',
    status: 'optional',
  },
  'Card.Action properties': {
    doc: '[Card.Action](/uilib/components/card/properties/#cardaction-properties) properties are supported for a whole-card link or action. Set href, to, or onClick to make Card.Info interactive. Do not nest Card.Info.CloseButton, Card.Info.MediaButton, or other interactive controls in an interactive card.',
    type: 'Various',
    status: 'optional',
  },
}

export const CardListProperties: PropertiesTableProps = {
  children: {
    doc: 'Card.ListItem elements.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const CardListItemProperties: PropertiesTableProps = {
  center: {
    doc: 'Center the content of the list item. Use `true` to always center, or `"when-small"` to center only on small screens.',
    type: ['boolean', '"when-small"'],
    status: 'optional',
  },
  children: {
    doc: 'A Card or Card.Action element.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const CardCloseButtonProperties: PropertiesTableProps = {
  title: {
    doc: 'Accessible close label. Defaults to the translated Card.closeTitle.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  'Button properties': {
    doc: 'Button properties are supported, except href and type. Always renders a type="button" control. Compose directly inside a noninteractive Card or Card.Info.',
    type: 'Various',
    status: 'optional',
  },
}

export const CardCloseButtonEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Called when the close control is activated. The application controls dismissal and focus after removal.',
    type: 'function',
    status: 'optional',
  },
}

export const CardEvents: PropertiesTableProps = {
  onClose: {
    doc: 'Deprecated: compose Card.Info.CloseButton with onClick instead. Still displays a close control for compatibility. The application controls dismissal and focus.',
    type: 'function',
    status: 'optional',
  },
}

export const CardMediaButtonProperties: PropertiesTableProps = {
  videoRef: {
    doc: 'Stable ref attached to the video element. Mount the video and control together. After a render commits, the control detects replacement video elements, removes old listeners, and applies playback preferences to the new element. Native play, pause, ended, emptied, and error events update the control.',
    type: 'React.RefObject<HTMLVideoElement | null>',
    status: 'required',
  },
  autoPlay: {
    doc: 'Automatically plays muted video when reduced motion is not requested. Enabling reduced motion pauses playback. Manual playback remains available. A browser may block autoplay.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  playTitle: {
    doc: 'Accessible play label. Defaults to the translated Card.playTitle.',
    type: 'string',
    status: 'optional',
  },
  pauseTitle: {
    doc: 'Accessible pause label. Defaults to the translated Card.pauseTitle.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'Override both playback labels with a fixed accessible label.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  'Button properties': {
    doc: 'Button properties are supported, except href, type, icon, and transitionState. Position defaults to the top-left corner of the nearest positioned container. The application owns the video element, sources, poster, and error fallback.',
    type: 'Various',
    status: 'optional',
  },
}

export const CardMediaButtonEvents: PropertiesTableProps = {
  onClick: {
    doc: 'Runs before toggling playback. Return false or preventDefault() to cancel the toggle. Playback resumes from the current position.',
    type: '(event: React.MouseEvent<HTMLButtonElement>) => void | boolean',
    status: 'optional',
  },
}

export const CardOverlayProperties: PropertiesTableProps = {
  gradient: {
    doc: 'Add a transparent-to-dark gradient behind the content.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  blur: {
    doc: 'Add progressive backdrop blur behind the content. The gradient remains available in browsers without backdrop-filter support.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  children: {
    doc: 'Accessible content and controls above the decorative effects. Headings and paragraphs automatically receive text shadows, including when nested in layout components. Provides dark-surface context for Buttons and other supporting components.',
    type: 'React.ReactNode',
    status: 'required',
  },
  'Flex.Stack properties': {
    doc: 'All Flex.Stack properties are supported. Defaults to native CSS gaps, gap="small", and responsive padding: small on small screens and large on larger screens. Use spacing or style to position the overlay within the media container.',
    type: 'Various',
    status: 'optional',
  },
}
