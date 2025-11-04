import { PropertiesTableProps } from '../../shared/types'

export const PaginationProperties: PropertiesTableProps = {
  mode: {
    doc: 'If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.',
    type: ['pagination', 'infinity'],
    status: 'optional',
  },
  paginationBarLayout: {
    doc: 'The layout of the pagination bar. Defaults to `vertical`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  children: {
    doc: 'The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
  align: {
    doc: 'Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.',
    type: ['left', 'center', 'right'],
    status: 'optional',
  },
  startupPage: {
    doc: 'The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.',
    type: ['number', 'string'],
    status: 'optional',
  },
  currentPage: {
    doc: 'The page shown at the moment the component renders. Defaults to `1`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  pageCount: {
    doc: 'The total pages count. Defaults to `1`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  startupCount: {
    doc: 'Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  parallelLoadCount: {
    doc: 'Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  minWaitTime: {
    doc: 'The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.',
    type: ['number', 'string'],
    status: 'optional',
  },
  placeMarkerBeforeContent: {
    doc: 'If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  useLoadButton: {
    doc: 'If set to `true`, it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.',
    type: 'boolean',
    status: 'optional',
  },
  hideProgressIndicator: {
    doc: 'If set to `true`, no indicator will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  pageElement: {
    doc: 'By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.',
    type: ['string', 'object', 'React.ReactNode'],
    status: 'optional',
  },
  fallbackElement: {
    doc: '(infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.',
    type: ['string', 'object', 'React.ReactNode'],
    status: 'optional',
  },
  indicatorElement: {
    doc: '(infinity mode) is used by the _indicator_. Falls back to `fallbackElement` if not defined.',
    type: ['string', 'object', 'React.ReactNode'],
    status: 'optional',
  },
  markerElement: {
    doc: '(infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.',
    type: ['string', 'object', 'React.ReactNode'],
    status: 'optional',
  },
  setContentHandler: {
    doc: 'Callback function to get the `setContent` handler from the current pagination instance. E.g. `setContentHandler={fn => (...)}`. Use this handler to insert content during infinity mode.',
    type: 'function',
    status: 'optional',
  },
  resetContentHandler: {
    doc: 'Callback function to get the `resetContent` handler from the current pagination instance. E.g. `resetContentHandler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.',
    type: 'function',
    status: 'optional',
  },
  resetPaginationHandler: {
    doc: 'Callback function to get the `resetInfinity` handler from the current pagination instance. E.g. `resetPaginationHandler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.',
    type: 'function',
    status: 'optional',
  },
  endInfinityHandler: {
    doc: 'Callback function to get the `endInfinity` handler from the current pagination instance. E.g. `endInfinityHandler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.',
    type: 'function',
    status: 'optional',
  },
  buttonTitle: {
    doc: 'The title used in every button shown in the bar. Defaults to `Side %s`.',
    type: 'string',
    status: 'optional',
  },
  nextTitle: {
    doc: 'The title used in the next page button. Defaults to `Neste side`.',
    type: 'string',
    status: 'optional',
  },
  prevTitle: {
    doc: 'The title used in the previous page button. Defaults to `Forrige side`.',
    type: 'string',
    status: 'optional',
  },
  morePages: {
    doc: 'The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.',
    type: 'string',
    status: 'optional',
  },
  isLoadingText: {
    doc: 'Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.',
    type: 'string',
    status: 'optional',
  },
  barSpace: {
    doc: 'Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).',
    type: 'Various',
    status: 'optional',
  },
  loadButton: {
    doc: 'Used to set load button text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.',
    type: 'Various',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, all pagination bar buttons are disabled.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const PaginationEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.',
    type: 'function',
    status: 'optional',
  },
  on_startup: {
    doc: 'Only on **infinity** mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. **NB:** Will be called again as soon as we reset the content by calling `resetContent()`.',
    type: 'function',
    status: 'optional',
  },
  on_load: {
    doc: 'Only on **infinity** mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.',
    type: 'function',
    status: 'optional',
  },
  on_end: {
    doc: 'Only on **infinity** mode. Will be called once `pageCount` is reached or `endInfinity` was called.',
    type: 'function',
    status: 'optional',
  },
}
