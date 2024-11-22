import * as React from 'react';
import type {
  DrawerListProps,
  DrawerListData,
  DrawerListOptionsRender
} from '../../fragments/DrawerList';
import type { ButtonIconPosition } from '../Button';
import type { FormLabelLabelDirection } from '../FormLabel';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type AutocompleteData = DrawerListData;
export type AutocompleteOptionsRender = DrawerListOptionsRender;
type AutocompleteMode = 'sync' | 'async';
type AutocompleteTitle = string | React.ReactNode;
type AutocompletePlaceholder = string | React.ReactNode;
type AutocompleteNoOptions = string | React.ReactNode;
type AutocompleteShowAll = string | React.ReactNode;
type AutocompleteAriaLiveOptions = string | React.ReactNode;
type AutocompleteIndicatorLabel = string | React.ReactNode;
type AutocompleteSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
type AutocompleteInputRef =
  | ((...args: any[]) => any)
  | React.MutableRefObject<HTMLInputElement | undefined>;
type AutocompleteInputIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
type AutocompleteAlignAutocomplete = 'left' | 'right';
type AutocompleteInputElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
type AutocompleteSearchInWordIndex = string | number;
export interface AutocompleteProps {
  /**
   * If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.
   */
  mode?: AutocompleteMode;
  /**
   * Give a title to let the user know what they have to do. Defaults to `Skriv og få alternativer`.
   */
  title?: AutocompleteTitle;
  /**
   * Use this to define the pre-filled placeholder text in the input. Defaults to `title="Skriv og velg"`.
   */
  placeholder?: AutocompletePlaceholder;
  /**
   * Text show in the "no options" item. Defaults to `Ingen alternativer`.
   */
  no_options?: AutocompleteNoOptions;
  /**
   * Text that lets a user unravel all the available options. Defaults to `Vis alt`.
   */
  show_all?: AutocompleteShowAll;
  /**
   * Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.
   */
  aria_live_options?: AutocompleteAriaLiveOptions;
  /**
   * Text show on indicator "options" item. Defaults to `Henter data ...`.
   */
  indicator_label?: AutocompleteIndicatorLabel;
  /**
   * Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`.
   */
  show_options_sr?: string;
  /**
   * Only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to `Valgt:`.
   */
  selected_sr?: string;
  /**
   * Title on submit button. Defaults to `Vis alternativer`.
   */
  submit_button_title?: string;
  /**
   * The icon used in the submit button. Defaults to `chevron_down`.
   */
  submit_button_icon?: AutocompleteSubmitButtonIcon;
  /**
   * Use a React.Ref to get access to the `input` DOM element.
   */
  input_ref?: AutocompleteInputRef;
  /**
   * To be included in the autocomplete input.
   */
  icon?: IconIcon;
  /**
   * Change the size of the icon pragmatically.
   */
  icon_size?: IconSize;
  /**
   * Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.
   */
  icon_position?: ButtonIconPosition;
  /**
   * Same as `icon`.
   */
  input_icon?: AutocompleteInputIcon;
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: React.ReactNode;
  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur. Defaults to `false`.
   */
  keep_value?: boolean;
  /**
   * Use `true` to not remove selected item on input blur, when the input value is empty. Defaults to `false`.
   */
  keep_selection?: boolean;
  /**
   * Like `keep_value` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept. Defaults to `false`.
   */
  keep_value_and_selection?: boolean;
  /**
   * If set to `true`, a clear button is shown inside the input field. Defaults to `false`.
   */
  show_clear_button?: boolean;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.
   */
  disable_filter?: boolean;
  /**
   * If set to `true`, reordering of search results will be disabled. Defaults to `false`.
   */
  disable_reorder?: boolean;
  /**
   * If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.
   */
  disable_highlighting?: boolean;
  /**
   * Use `true` to show a Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.
   */
  show_submit_button?: boolean;
  /**
   * Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from &#39;@dnb/eufemia/components/input/Input&#39;`.
   */
  submit_element?: React.ReactNode;
  /**
   * Use `right` to change the options alignment direction. Defaults to `left`.
   */
  align_autocomplete?: AutocompleteAlignAutocomplete;
  /**
   * Lets you provide a custom React element as the input HTML element.
   */
  input_element?: AutocompleteInputElement;
  /**
   * This gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`.
   */
  search_in_word_index?: AutocompleteSearchInWordIndex;
  /**
   * If set to `true` and `search_in_word_index` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.
   */
  search_numbers?: boolean;
  /**
   * Lets you define a custom input value.
   */
  input_value?: string;
  /**
   * Use `true` to auto open the list once the user is entering the input field with the keyboard.
   */
  open_on_focus?: boolean;
  disabled?: boolean;
  /**
   * If set to `true`, then the autocomplete will be 100% in available `width`.
   */
  stretch?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.
   */
  suffix?: DrawerListSuffix;
  /**
   * Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.
   */
  drawer_class?: string;
  on_type?: (...args: any[]) => any;
  on_focus?: (...args: any[]) => any;
  on_blur?: (...args: any[]) => any;
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export type AutocompleteAllProps = AutocompleteProps &
  DrawerListProps &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'title'
    | 'placeholder'
    | 'data'
    | 'children'
  >;
export default class Autocomplete extends React.Component<
  AutocompleteAllProps,
  any
> {
  static defaultProps: object;
  static HorizontalItem: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  render(): JSX.Element;
}
