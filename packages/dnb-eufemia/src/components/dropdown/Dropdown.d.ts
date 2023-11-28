import * as React from 'react';
import type { FormLabelLabelDirection, FormLabelText } from '../FormLabel';
import type { ButtonIconPosition, ButtonVariant } from '../Button';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type {
  DrawerListProps,
  DrawerListData
} from '../../fragments/DrawerList';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type DropdownData = DrawerListData;
type DropdownTitle = string | React.ReactNode;
type DropdownAlignDropdown = 'left' | 'right';
type DropdownTriggerElement = ((...args: any[]) => any) | React.ReactNode;
export interface DropdownProps
  extends DrawerListProps,
    SpacingProps,
    Omit<React.HTMLProps<HTMLElement>, 'ref'> {
  /**
   * Give a title to let the users know what they have to do. Defaults to `Valgmeny`.
   */
  title?: DropdownTitle;
  /**
   * Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.
   */
  variant?: ButtonVariant;
  /**
   * Icon to be included in the dropdown.
   */
  icon?: IconIcon;
  /**
   * Change the size of the icon pragmatically.
   */
  icon_size?: IconSize;
  /**
   * Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.
   */
  icon_position?: ButtonIconPosition;
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: FormLabelText;
  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
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
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * By providing a React.ref you can get the internally used main element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref<HTMLSpanElement>;
  /**
   * By providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  buttonRef?: React.Ref<HtmlButtonElement>;
  /**
   * Same as `prevent_selection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.
   */
  more_menu?: boolean;
  /**
   * Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`.
   */
  align_dropdown?: DropdownAlignDropdown;
  /**
   * Lets you provide a custom React element as the trigger HTML element.
   */
  trigger_element?: DropdownTriggerElement;
  /**
   * If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.
   */
  open_on_focus?: boolean;
  disabled?: boolean;
  /**
   * If set to `true`, then the dropdown will be 100% in available `width`.
   */
  stretch?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  on_show_focus?: (...args: any[]) => any;
  on_hide_focus?: (...args: any[]) => any;
}
export default class Dropdown extends React.Component<DropdownProps, any> {
  static defaultProps: object;
  static HorizontalItem: ({
    children
  }: {
    /**
     * <em>(required)</em> the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these <a href="/uilib/components/fragments/drawer-list/info#data-structure">data structure</a>. <br /> If you don&#39;t have to define a `value`, you can also send in a `function` which will be called once the user opens the DrawerList.
     */
    children: React.ReactNode;
  }) => JSX.Element;
  render(): JSX.Element;
}
