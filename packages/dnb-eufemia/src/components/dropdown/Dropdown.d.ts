import * as React from 'react';
import type { FormLabelLabelDirection } from '../FormLabel';
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
export interface DropdownProps {
  /**
   * give a title to let the users know what they have to do. Defaults to `Valgmeny`.
   */
  title?: DropdownTitle;
  /**
   * defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.
   */
  variant?: ButtonVariant;
  /**
   * icon to be included in the dropdown.
   */
  icon?: IconIcon;
  /**
   * change the size of the icon pragmatically.
   */
  iconSize?: IconSize;
  /**
   * position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.
   */
  iconPosition?: ButtonIconPosition;
  /**
   * prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: React.ReactNode;
  /**
   * use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: FormLabelLabelDirection;
  /**
   * use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean;
  /**
   * text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState;
  /**
   * use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps;
  statusNoAnimation?: boolean;
  /**
   * the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * by providing a React.ref you can get the internally used main element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
  /**
   * by providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  buttonRef?: React.Ref;
  /**
   * same as `preventSelection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.
   */
  moreMenu?: boolean;
  /**
   * use `right` to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `moreMenu`. Defaults to `left`.
   */
  alignDropdown?: DropdownAlignDropdown;
  /**
   * lets you provide a custom React element as the trigger HTML element.
   */
  triggerElement?: DropdownTriggerElement;
  /**
   * if set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.
   */
  openOnFocus?: boolean;
  disabled?: boolean;
  /**
   * if set to `true`, then the dropdown will be 100% in available `width`.
   */
  stretch?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.
   */
  suffix?: DrawerListSuffix;
  /**
   * Will be called once the Dropdown shows up.
   */
  onOpen?: (...args: any[]) => any;
  /**
   * Will be called once the Dropdown gets closed.
   */
  onClose?: (...args: any[]) => any;
  onOpenFocus?: (...args: any[]) => any;
  onCloseFocus?: (...args: any[]) => any;
}
export type DropdownAllProps = DropdownProps &
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
    | 'onChange'
    | 'onFocus'
    | 'onOpen'
    | 'onClose'
    | 'onSelect'
    | 'onResize'
  >;
export default class Dropdown extends React.Component<
  DropdownAllProps,
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
