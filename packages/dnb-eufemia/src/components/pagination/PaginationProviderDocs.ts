import { PropertiesTableProps } from '../../shared/types'

export const PaginationProviderProperties: PropertiesTableProps = {
  mode: {
    doc: 'If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the <a href="https://eufemia.dnb.no/uilib/components/pagination/infinity-scroller">Infinity Scroller</a>. Defaults to `pagination`.',
    type: 'unknown',
    state: 'optional',
  },
  children: {
    doc: 'The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.',
    type: 'unknown',
    state: 'optional',
  },
  align: {
    doc: 'Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.',
    type: 'unknown',
    state: 'optional',
  },
  startup_page: {
    doc: 'The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.',
    type: 'unknown',
    state: 'optional',
  },
  current_page: {
    doc: 'The page shown at the moment the component renders. Defaults to `1`.',
    type: 'unknown',
    state: 'optional',
  },
  page_count: {
    doc: 'The total pages count. Defaults to `1`.',
    type: 'unknown',
    state: 'optional',
  },
  startup_count: {
    doc: 'Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.',
    type: 'unknown',
    state: 'optional',
  },
  parallel_load_count: {
    doc: 'Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.',
    type: 'unknown',
    state: 'optional',
  },
  min_wait_time: {
    doc: 'The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.',
    type: 'unknown',
    state: 'optional',
  },
  place_maker_before_content: {
    doc: 'If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  use_load_button: {
    doc: 'If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.',
    type: 'unknown',
    state: 'optional',
  },
  hide_progress_indicator: {
    doc: 'If set to `true` no indicator will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  page_element: {
    doc: 'By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.',
    type: 'unknown',
    state: 'optional',
  },
  fallback_element: {
    doc: '(infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.',
    type: 'unknown',
    state: 'optional',
  },
  indicator_element: {
    doc: '(infinity mode) is used by the <em>indicator</em>. Falls back to `fallback_element` if not defined.',
    type: 'unknown',
    state: 'optional',
  },
  marker_element: {
    doc: '(infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.',
    type: 'unknown',
    state: 'optional',
  },
  set_content_handler: {
    doc: 'Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.',
    type: 'unknown',
    state: 'optional',
  },
  reset_content_handler: {
    doc: 'Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.',
    type: 'unknown',
    state: 'optional',
  },
  reset_pagination_handler: {
    doc: 'Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.',
    type: 'unknown',
    state: 'optional',
  },
  end_infinity_handler: {
    doc: 'Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.',
    type: 'unknown',
    state: 'optional',
  },
  button_title: {
    doc: 'The title used in every button shown in the bar. Defaults to `Side %s`.',
    type: 'unknown',
    state: 'optional',
  },
  next_title: {
    doc: 'The title used in the next page button. Defaults to `Neste side`.',
    type: 'unknown',
    state: 'optional',
  },
  prev_title: {
    doc: 'The title used in the previous page button. Defaults to `Forrige side`.',
    type: 'unknown',
    state: 'optional',
  },
  more_pages: {
    doc: 'The title used in the dots. Relevant for screen-readers. Defaults to `%s flere sider`.',
    type: 'unknown',
    state: 'optional',
  },
  is_loading_text: {
    doc: 'Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.',
    type: 'unknown',
    state: 'optional',
  },
  load_button_text: {
    doc: 'Used during infinity mode. If `use_load_button` is set to `true`, then a button is show on the bottom. If the `startup_page` is higher than 1. Defaults to `Vis mer innhold`.',
    type: 'unknown',
    state: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, all pagination bar buttons are disabled.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const PaginationProviderEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.',
    type: 'unknown',
    state: 'optional',
  },
  on_startup: {
    doc: 'Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.',
    type: 'unknown',
    state: 'optional',
  },
  on_load: {
    doc: 'Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.',
    type: 'unknown',
    state: 'optional',
  },
  on_end: {
    doc: 'Only on "infinity" mode. Will be called once `page_count` is reached or `endInfinity` was called.',
    type: 'unknown',
    state: 'optional',
  },
}
