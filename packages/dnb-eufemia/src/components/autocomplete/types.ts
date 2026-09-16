/**
 * Types for Autocomplete
 *
 */

import type {
  ChangeEvent,
  ElementType,
  FocusEvent,
  HTMLProps,
  KeyboardEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react'
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListOptionsRender,
  DrawerListSuffix,
  DrawerListDataArrayObject,
} from '../../fragments/DrawerList'
import type { ButtonIconPosition } from '../Button'
import type { FormStatusBaseProps } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'
import type { SearchOptions } from '../../shared/search'

export type AutocompleteOnClearParams = {
  value: string
  previousValue: string | number | null
  event: SyntheticEvent | Event
}

export type AutocompleteMode = 'sync' | 'async'

export type AutocompleteAlign = 'left' | 'right'

export type FormLabelLabelDirection = 'horizontal' | 'vertical'

export type AutocompleteTitle = string | ReactNode

export type AutocompletePlaceholder = string | ReactNode

export type AutocompleteNoOptions = ReactNode

export type AutocompleteShowAll = string | ReactNode

export type AutocompleteAriaLiveOptions = string | ReactNode

export type AutocompleteIndicatorLabel = string | ReactNode

export type AutocompleteSubmitButtonIcon =
  | string
  | ReactNode
  | (() => ReactNode)

export type AutocompleteInputRef =
  | ((element: HTMLInputElement | null) => void)
  | RefObject<HTMLInputElement | undefined>

export type AutocompleteInputElement = ElementType | ReactNode

export type AutocompleteSearchInWordIndex = string | number

export type AutocompleteSearchMatch = 'word' | 'starts-with'

export type AutocompleteData = DrawerListData

export type AutocompleteOptionsRender = DrawerListOptionsRender

export type AutocompleteEventMethods = {
  attributes: Record<string, unknown>
  dataList: DrawerListData
  updateData(data: DrawerListData): void
  revalidateSelectedItem: () => void
  revalidateInputValue: () => void
  resetSelectedItem: () => void
  clearInputValue: () => void
  showAllItems: () => void
  setVisible: () => void
  resetInputValue: () => void
  setHidden: () => void
  emptyData: () => void
  focusInput: () => void
  setInputValue: (value: string) => void
  showNoOptionsItem: () => void
  showIndicatorItem: () => void
  showIndicator: () => void
  hideIndicator: () => void
  setMode: (mode: 'sync' | 'async') => void
  debounce: (
    func: (...args: unknown[]) => void,
    props?: Record<string, unknown>,
    wait?: number
  ) => void
}

export type AutocompleteOnTypeParams = {
  value: string
  event: ChangeEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
} & AutocompleteEventMethods

export type AutocompleteOnFocusParams = {
  value: string
  event: FocusEvent<HTMLInputElement>
} & AutocompleteEventMethods

export type AutocompleteOnBlurParams = {
  value?: string
  event?: FocusEvent<HTMLInputElement>
  data?: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods

export type AutocompleteOnChangeParams = {
  value?: string
  event?: FocusEvent<HTMLInputElement>
  data: DrawerListDataArrayObject | string | null
  selectedItem?: number | string
} & AutocompleteEventMethods

export type AutocompleteOnSubmitParams = {
  value: string
  event: KeyboardEvent<HTMLInputElement>
} & AutocompleteEventMethods

export type AutocompleteOnSelectParams = {
  activeItem: number | string
  selectedItem?: number | string | null
  value: string | number
  data: DrawerListDataArrayObject | string | null
  event: SyntheticEvent
} & AutocompleteEventMethods

export type AutocompleteProps = {
  /**
   * If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.
   */
  mode?: AutocompleteMode
  /**
   * Give a title to let the user know what they have to do. Defaults to `Skriv og velg`.
   */
  title?: AutocompleteTitle
  /**
   * Use this to define the pre-filled placeholder text in the input. Defaults to `title="Skriv og velg"`.
   */
  placeholder?: AutocompletePlaceholder
  /**
   * Text shown in the "no options" item. If set to `false`, the list will not be rendered when there are no options available. Defaults to `Ingen alternativer`.
   */
  noOptions?: AutocompleteNoOptions
  /**
   * Text that lets a user unravel all the available options. Defaults to `Vis alt`.
   */
  showAll?: AutocompleteShowAll
  /**
   * Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.
   */
  ariaLiveOptions?: AutocompleteAriaLiveOptions
  /**
   * Text shown on indicator "options" item. Defaults to `Henter data ...`.
   */
  indicatorLabel?: AutocompleteIndicatorLabel
  /**
   * Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer, lukk med esc knappen`.
   */
  showOptionsSr?: string
  /**
   * Only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to `Valgt:`.
   */
  selectedSr?: string
  /**
   * If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.
   */
  selectAll?: boolean
  /**
   * Title on submit button. Defaults to `Vis alternativer`.
   */
  submitButtonTitle?: string
  /**
   * The icon used in the submit button. Defaults to `chevron_down`.
   */
  submitButtonIcon?: AutocompleteSubmitButtonIcon
  /**
   * Use a `React.Ref` to get access to the `input` DOM element.
   */
  inputRef?: AutocompleteInputRef
  /**
   * To be included in the autocomplete input. Defaults to `loupe`. Set to `null` to remove the icon entirely – no progress indicator will then be shown while loading.
   */
  icon?: IconIcon | ReactNode | (() => ReactNode)
  /**
   * Change the size of the icon programmatically.
   */
  iconSize?: IconSize
  /**
   * Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.
   */
  iconPosition?: ButtonIconPosition
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: ReactNode
  /**
   * Use `labelDirection="horizontal"` to change the label layout direction. Defaults to `vertical`.
   */
  labelDirection?: FormLabelLabelDirection
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / be replaced by a selected value from the data list during the input field blur. Defaults to `false`.
   */
  keepValue?: boolean
  /**
   * Use `true` to not remove selected item on input blur, when the input value is empty. Defaults to `false`.
   */
  keepSelection?: boolean
  /**
   * Like `keepValue` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept. Defaults to `false`.
   */
  keepValueAndSelection?: boolean
  /**
   * If set to `true`, a clear button is shown inside the input field. Defaults to `false`.
   */
  showClearButton?: boolean
  /**
   * Configure search behavior with a single config object. An object with optional keys: `filter` (enable result filtering, default `true`), `reorder` (enable relevance reordering, default `true`), `highlight` (enable text highlighting, default `true`), `numbers` (enable number search, default `false`), `matchInsideWordsFrom` (threshold for in-word search, default `3`), and `match` (matching mode `"word"` or `"starts-with"`, default `"word"`). Example: `search={{ filter: false }}` to disable filtering while keeping highlighting.
   */
  search?: SearchOptions
  /**
   * If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`. **Deprecated**: Use `search={{ filter: false }}` instead.
   * @deprecated Use `search={{ filter: false }}` instead.
   */
  disableFilter?: boolean
  /**
   * If set to `true`, reordering of search results will be disabled. Defaults to `false`. **Deprecated**: Use `search={{ reorder: false }}` instead.
   * @deprecated Use `search={{ reorder: false }}` instead.
   */
  disableReorder?: boolean
  /**
   * If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`. **Deprecated**: Use `search={{ highlight: false }}` instead.
   * @deprecated Use `search={{ highlight: false }}` instead.
   */
  disableHighlighting?: boolean
  /**
   * Use `true` to show an Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.
   */
  showSubmitButton?: boolean
  /**
   * Use `true` to render the results list persistently open in normal document flow, instead of an overlay. The toggle button is hidden. Defaults to `false`.
   */
  inline?: boolean
  /**
   * Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from '@dnb/eufemia/components/input/Input'`.
   */
  submitElement?: ReactNode
  /**
   * Use `right` to change the options alignment direction. Defaults to `left`.
   */
  align?: AutocompleteAlign
  /**
   * Lets you provide a custom React element as the input HTML element.
   */
  inputElement?: AutocompleteInputElement
  /**
   * This gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`. **Deprecated**: Use `search={{ matchInsideWordsFrom: number }}` instead.
   * @deprecated Use `search={{ matchInsideWordsFrom: number }}` instead.
   */
  searchInWordIndex?: AutocompleteSearchInWordIndex
  /**
   * Defines how search matching is performed. Use `starts-with` to only match items that begin with the first typed word. Defaults to `word`. **Deprecated**: Use `search={{ match: "word" | "starts-with" }}` instead.
   * @deprecated Use `search={{ match: "word" | "starts-with" }}` instead.
   */
  searchMatch?: AutocompleteSearchMatch
  /**
   * If set to `true` and `searchInWordIndex` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`. **Deprecated**: Use `search={{ numbers: true }}` instead.
   * @deprecated Use `search={{ numbers: true }}` instead.
   */
  searchNumbers?: boolean
  /**
   * Use `true` to auto open the list once the user is entering the input field with the keyboard.
   */
  openOnFocus?: boolean
  disabled?: boolean
  /**
   * If set to `true`, then the autocomplete will be 100% in available `width`.
   */
  stretch?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.
   */
  suffix?: DrawerListSuffix
  /**
   * Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.
   */
  drawerClass?: string
  /**
   * Selected value.
   */
  value?: string | number
  /**
   * Initial selected value.
   */
  defaultValue?: string | number
  /**
   * Lets you define a custom input value. Setting it to an empty string `""` will reset the input value.
   */
  inputValue?: string
  size?: DrawerListProps['size']
  data?: DrawerListData
  /**
   * Will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.
   */
  onOpen?: (event: AutocompleteOnTypeParams) => void
  /**
   * Will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.
   */
  onClose?: (event: AutocompleteOnTypeParams) => void
  onType?: (event: AutocompleteOnTypeParams) => void
  onFocus?: (event: AutocompleteOnFocusParams) => void
  onBlur?: (event: AutocompleteOnBlurParams) => void
  onChange?: (event: AutocompleteOnChangeParams) => void
  onSelect?: (event: AutocompleteOnSelectParams) => void
  onClear?: (event: AutocompleteOnClearParams) => void
  /**
   * Will be called when the user presses Enter in the input field without selecting an item from the list. Useful for triggering custom actions like navigating to a search results page. Returns `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).
   */
  onSubmit?: (event: AutocompleteOnSubmitParams) => void
}

export type AutocompleteAllProps = AutocompleteProps &
  FormStatusBaseProps &
  Omit<DrawerListProps, 'onChange' | 'onSelect'> &
  SpacingProps &
  Omit<
    HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'title'
    | 'placeholder'
    | 'data'
    | 'children'
    | 'onChange'
    | 'onFocus'
    | 'onOpen'
    | 'onClose'
    | 'onSelect'
    | 'onResize'
    | 'onBlur'
    | 'onSubmit'
  >
