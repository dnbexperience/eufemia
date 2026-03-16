import React from 'react';
import type { ContextProps } from '../../shared/Context';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../Skeleton';
import type { FormStatusIconTypes } from '../FormStatus';
export declare const DefaultIconSize = 16;
export declare const DefaultIconSizes: {
    readonly default: 16;
    readonly medium: 24;
};
export declare const ListDefaultIconSizes: Array<[
    ValidIconType,
    ValidIconNumericSize
]>;
export declare const ValidIconType: readonly ["small", "default", "medium", "large", "x-large", "xx-large"];
export type DefaultIconSizes = typeof DefaultIconSizes;
export type ValidIconType = (typeof ValidIconType)[number];
export type ValidIconNumericSize = DefaultIconSizes[keyof DefaultIconSizes];
/** For internal usage */
type IconType = string | React.ReactElement<SVGElement> | ((props?: unknown) => React.JSX.Element) | false;
/** For external usage */
export type IconIcon = IconType | FormStatusIconTypes | ((props?: unknown) => React.JSX.Element);
export type IconSize = ValidIconNumericSize | `${ValidIconNumericSize | number}` | ValidIconType | 'auto' | 'basis';
export type IconColor = string | number | {
    [key: string]: string | number;
};
export type IconProps = {
    /**
     * A React SVG Component.
     */
    icon?: IconIcon;
    /**
     * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
     */
    size?: IconSize;
    /**
     * The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the <a href="/uilib/usage/customisation/colors">colors table</a>, e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.
     */
    color?: IconColor;
    /**
     * Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
     */
    inheritColor?: boolean;
    /**
     * The alternative label (text version) of the icon. Defaults to the imported icon name.
     */
    alt?: string;
    /**
     * Use a title to provide extra information about the icon used.
     */
    title?: string;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
     */
    modifier?: string;
    border?: boolean;
    width?: `${IconSize}` | `${number}%` | number;
    height?: `${IconSize}` | `${number}%` | number;
    children?: IconIcon;
};
export type IconAllProps = IconProps & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>;
export default function Icon(localProps: IconAllProps): import("react/jsx-runtime").JSX.Element;
export declare function getIconNameFromComponent(icon: IconProps['icon']): string;
export declare function calcSize(props: IconProps): {
    iconParams: {
        height?: IconProps["height"];
        width?: IconProps["width"];
        color?: IconProps["color"];
    };
    sizeAsInt: -1 | ValidIconNumericSize;
    sizeAsString: any;
};
export declare function prepareIcon(props: IconAllProps, context: ContextProps): {
    icon: any;
    alt: string;
    iconParams: Record<string, unknown> | {
        height?: IconProps["height"];
        width?: IconProps["width"];
        color?: IconProps["color"];
    };
    wrapperParams: Record<string, any>;
    /**
     * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
     */
    size?: IconSize;
    /**
     * The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the <a href="/uilib/usage/customisation/colors">colors table</a>, e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.
     */
    color?: IconColor & string;
    /**
     * Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
     */
    inheritColor?: boolean;
    /**
     * Use a title to provide extra information about the icon used.
     */
    title?: string;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
     */
    modifier?: string;
    border?: boolean;
    width?: `${IconSize}` | `${number}%` | number;
    height?: `${IconSize}` | `${number}%` | number;
    children?: IconIcon;
    top?: import("../space/types").SpaceType;
    right?: import("../space/types").SpaceType;
    bottom?: import("../space/types").SpaceType;
    left?: import("../space/types").SpaceType;
    space?: import("../space/types").SpaceTypeAll;
    innerSpace?: import("../space/types").SpaceTypeAll | import("../space/types").SpaceTypeMedia;
    form?: string | undefined;
    cite?: string | undefined;
    data?: string | undefined;
    label?: string | undefined;
    slot?: string | undefined;
    span?: number | undefined;
    style?: React.CSSProperties | undefined;
    summary?: string | undefined;
    async?: boolean | undefined;
    default?: boolean | undefined;
    pattern?: string | undefined;
    dir?: string | undefined;
    role?: React.AriaRole | undefined;
    key?: React.Key | null | undefined;
    ref?: React.Ref<HTMLElement>;
    "aria-hidden"?: (boolean | "true" | "false") | undefined;
    accessKey?: string | undefined;
    value?: string | readonly string[] | number | undefined;
    "aria-labelledby"?: string | undefined;
    "aria-describedby"?: string | undefined;
    "aria-details"?: string | undefined;
    disabled?: boolean | undefined;
    "aria-disabled"?: (boolean | "true" | "false") | undefined;
    tabIndex?: number | undefined;
    required?: boolean | undefined;
    defaultChecked?: boolean | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    suppressContentEditableWarning?: boolean | undefined;
    suppressHydrationWarning?: boolean | undefined;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined | (string & {});
    autoFocus?: boolean | undefined;
    className?: string | undefined;
    contentEditable?: (boolean | "true" | "false") | "inherit" | "plaintext-only" | undefined;
    contextMenu?: string | undefined;
    draggable?: (boolean | "true" | "false") | undefined;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    nonce?: string | undefined;
    spellCheck?: (boolean | "true" | "false") | undefined;
    translate?: "yes" | "no" | undefined;
    radioGroup?: string | undefined;
    about?: string | undefined;
    content?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    rel?: string | undefined;
    resource?: string | undefined;
    rev?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    popover?: "" | "auto" | "manual" | "hint" | undefined;
    popoverTargetAction?: "toggle" | "show" | "hide" | undefined;
    popoverTarget?: string | undefined;
    inert?: boolean | undefined;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    is?: string | undefined;
    exportparts?: string | undefined;
    part?: string | undefined;
    "aria-activedescendant"?: string | undefined;
    "aria-atomic"?: (boolean | "true" | "false") | undefined;
    "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
    "aria-braillelabel"?: string | undefined;
    "aria-brailleroledescription"?: string | undefined;
    "aria-busy"?: (boolean | "true" | "false") | undefined;
    "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
    "aria-colcount"?: number | undefined;
    "aria-colindex"?: number | undefined;
    "aria-colindextext"?: string | undefined;
    "aria-colspan"?: number | undefined;
    "aria-controls"?: string | undefined;
    "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined;
    "aria-description"?: string | undefined;
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
    "aria-errormessage"?: string | undefined;
    "aria-expanded"?: (boolean | "true" | "false") | undefined;
    "aria-flowto"?: string | undefined;
    "aria-grabbed"?: (boolean | "true" | "false") | undefined;
    "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    "aria-keyshortcuts"?: string | undefined;
    "aria-label"?: string | undefined;
    "aria-level"?: number | undefined;
    "aria-live"?: "off" | "assertive" | "polite" | undefined;
    "aria-modal"?: (boolean | "true" | "false") | undefined;
    "aria-multiline"?: (boolean | "true" | "false") | undefined;
    "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
    "aria-orientation"?: "horizontal" | "vertical" | undefined;
    "aria-owns"?: string | undefined;
    "aria-placeholder"?: string | undefined;
    "aria-posinset"?: number | undefined;
    "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;
    "aria-readonly"?: (boolean | "true" | "false") | undefined;
    "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined;
    "aria-required"?: (boolean | "true" | "false") | undefined;
    "aria-roledescription"?: string | undefined;
    "aria-rowcount"?: number | undefined;
    "aria-rowindex"?: number | undefined;
    "aria-rowindextext"?: string | undefined;
    "aria-rowspan"?: number | undefined;
    "aria-selected"?: (boolean | "true" | "false") | undefined;
    "aria-setsize"?: number | undefined;
    "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
    "aria-valuemax"?: number | undefined;
    "aria-valuemin"?: number | undefined;
    "aria-valuenow"?: number | undefined;
    "aria-valuetext"?: string | undefined;
    dangerouslySetInnerHTML?: {
        __html: string | TrustedHTML;
    } | undefined;
    onCopy?: React.ClipboardEventHandler<HTMLElement>;
    onCopyCapture?: React.ClipboardEventHandler<HTMLElement>;
    onCut?: React.ClipboardEventHandler<HTMLElement>;
    onCutCapture?: React.ClipboardEventHandler<HTMLElement>;
    onPaste?: React.ClipboardEventHandler<HTMLElement>;
    onPasteCapture?: React.ClipboardEventHandler<HTMLElement>;
    onCompositionEnd?: React.CompositionEventHandler<HTMLElement>;
    onCompositionEndCapture?: React.CompositionEventHandler<HTMLElement>;
    onCompositionStart?: React.CompositionEventHandler<HTMLElement>;
    onCompositionStartCapture?: React.CompositionEventHandler<HTMLElement>;
    onCompositionUpdate?: React.CompositionEventHandler<HTMLElement>;
    onCompositionUpdateCapture?: React.CompositionEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onFocusCapture?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onBlurCapture?: React.FocusEventHandler<HTMLElement>;
    onChange?: React.FormEventHandler<HTMLElement>;
    onChangeCapture?: React.FormEventHandler<HTMLElement>;
    onBeforeInput?: React.InputEventHandler<HTMLElement>;
    onBeforeInputCapture?: React.FormEventHandler<HTMLElement>;
    onInput?: React.FormEventHandler<HTMLElement>;
    onInputCapture?: React.FormEventHandler<HTMLElement>;
    onReset?: React.FormEventHandler<HTMLElement>;
    onResetCapture?: React.FormEventHandler<HTMLElement>;
    onSubmit?: React.FormEventHandler<HTMLElement>;
    onSubmitCapture?: React.FormEventHandler<HTMLElement>;
    onInvalid?: React.FormEventHandler<HTMLElement>;
    onInvalidCapture?: React.FormEventHandler<HTMLElement>;
    onLoad?: React.ReactEventHandler<HTMLElement>;
    onLoadCapture?: React.ReactEventHandler<HTMLElement>;
    onError?: React.ReactEventHandler<HTMLElement>;
    onErrorCapture?: React.ReactEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
    onKeyPressCapture?: React.KeyboardEventHandler<HTMLElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
    onKeyUpCapture?: React.KeyboardEventHandler<HTMLElement>;
    onAbort?: React.ReactEventHandler<HTMLElement>;
    onAbortCapture?: React.ReactEventHandler<HTMLElement>;
    onCanPlay?: React.ReactEventHandler<HTMLElement>;
    onCanPlayCapture?: React.ReactEventHandler<HTMLElement>;
    onCanPlayThrough?: React.ReactEventHandler<HTMLElement>;
    onCanPlayThroughCapture?: React.ReactEventHandler<HTMLElement>;
    onDurationChange?: React.ReactEventHandler<HTMLElement>;
    onDurationChangeCapture?: React.ReactEventHandler<HTMLElement>;
    onEmptied?: React.ReactEventHandler<HTMLElement>;
    onEmptiedCapture?: React.ReactEventHandler<HTMLElement>;
    onEncrypted?: React.ReactEventHandler<HTMLElement>;
    onEncryptedCapture?: React.ReactEventHandler<HTMLElement>;
    onEnded?: React.ReactEventHandler<HTMLElement>;
    onEndedCapture?: React.ReactEventHandler<HTMLElement>;
    onLoadedData?: React.ReactEventHandler<HTMLElement>;
    onLoadedDataCapture?: React.ReactEventHandler<HTMLElement>;
    onLoadedMetadata?: React.ReactEventHandler<HTMLElement>;
    onLoadedMetadataCapture?: React.ReactEventHandler<HTMLElement>;
    onLoadStart?: React.ReactEventHandler<HTMLElement>;
    onLoadStartCapture?: React.ReactEventHandler<HTMLElement>;
    onPause?: React.ReactEventHandler<HTMLElement>;
    onPauseCapture?: React.ReactEventHandler<HTMLElement>;
    onPlay?: React.ReactEventHandler<HTMLElement>;
    onPlayCapture?: React.ReactEventHandler<HTMLElement>;
    onPlaying?: React.ReactEventHandler<HTMLElement>;
    onPlayingCapture?: React.ReactEventHandler<HTMLElement>;
    onProgress?: React.ReactEventHandler<HTMLElement>;
    onProgressCapture?: React.ReactEventHandler<HTMLElement>;
    onRateChange?: React.ReactEventHandler<HTMLElement>;
    onRateChangeCapture?: React.ReactEventHandler<HTMLElement>;
    onSeeked?: React.ReactEventHandler<HTMLElement>;
    onSeekedCapture?: React.ReactEventHandler<HTMLElement>;
    onSeeking?: React.ReactEventHandler<HTMLElement>;
    onSeekingCapture?: React.ReactEventHandler<HTMLElement>;
    onStalled?: React.ReactEventHandler<HTMLElement>;
    onStalledCapture?: React.ReactEventHandler<HTMLElement>;
    onSuspend?: React.ReactEventHandler<HTMLElement>;
    onSuspendCapture?: React.ReactEventHandler<HTMLElement>;
    onTimeUpdate?: React.ReactEventHandler<HTMLElement>;
    onTimeUpdateCapture?: React.ReactEventHandler<HTMLElement>;
    onVolumeChange?: React.ReactEventHandler<HTMLElement>;
    onVolumeChangeCapture?: React.ReactEventHandler<HTMLElement>;
    onWaiting?: React.ReactEventHandler<HTMLElement>;
    onWaitingCapture?: React.ReactEventHandler<HTMLElement>;
    onAuxClick?: React.MouseEventHandler<HTMLElement>;
    onAuxClickCapture?: React.MouseEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onClickCapture?: React.MouseEventHandler<HTMLElement>;
    onContextMenu?: React.MouseEventHandler<HTMLElement>;
    onContextMenuCapture?: React.MouseEventHandler<HTMLElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLElement>;
    onDoubleClickCapture?: React.MouseEventHandler<HTMLElement>;
    onDrag?: React.DragEventHandler<HTMLElement>;
    onDragCapture?: React.DragEventHandler<HTMLElement>;
    onDragEnd?: React.DragEventHandler<HTMLElement>;
    onDragEndCapture?: React.DragEventHandler<HTMLElement>;
    onDragEnter?: React.DragEventHandler<HTMLElement>;
    onDragEnterCapture?: React.DragEventHandler<HTMLElement>;
    onDragExit?: React.DragEventHandler<HTMLElement>;
    onDragExitCapture?: React.DragEventHandler<HTMLElement>;
    onDragLeave?: React.DragEventHandler<HTMLElement>;
    onDragLeaveCapture?: React.DragEventHandler<HTMLElement>;
    onDragOver?: React.DragEventHandler<HTMLElement>;
    onDragOverCapture?: React.DragEventHandler<HTMLElement>;
    onDragStart?: React.DragEventHandler<HTMLElement>;
    onDragStartCapture?: React.DragEventHandler<HTMLElement>;
    onDrop?: React.DragEventHandler<HTMLElement>;
    onDropCapture?: React.DragEventHandler<HTMLElement>;
    onMouseDown?: React.MouseEventHandler<HTMLElement>;
    onMouseDownCapture?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    onMouseMoveCapture?: React.MouseEventHandler<HTMLElement>;
    onMouseOut?: React.MouseEventHandler<HTMLElement>;
    onMouseOutCapture?: React.MouseEventHandler<HTMLElement>;
    onMouseOver?: React.MouseEventHandler<HTMLElement>;
    onMouseOverCapture?: React.MouseEventHandler<HTMLElement>;
    onMouseUp?: React.MouseEventHandler<HTMLElement>;
    onMouseUpCapture?: React.MouseEventHandler<HTMLElement>;
    onSelect?: React.ReactEventHandler<HTMLElement>;
    onSelectCapture?: React.ReactEventHandler<HTMLElement>;
    onTouchCancel?: React.TouchEventHandler<HTMLElement>;
    onTouchCancelCapture?: React.TouchEventHandler<HTMLElement>;
    onTouchEnd?: React.TouchEventHandler<HTMLElement>;
    onTouchEndCapture?: React.TouchEventHandler<HTMLElement>;
    onTouchMove?: React.TouchEventHandler<HTMLElement>;
    onTouchMoveCapture?: React.TouchEventHandler<HTMLElement>;
    onTouchStart?: React.TouchEventHandler<HTMLElement>;
    onTouchStartCapture?: React.TouchEventHandler<HTMLElement>;
    onPointerDown?: React.PointerEventHandler<HTMLElement>;
    onPointerDownCapture?: React.PointerEventHandler<HTMLElement>;
    onPointerMove?: React.PointerEventHandler<HTMLElement>;
    onPointerMoveCapture?: React.PointerEventHandler<HTMLElement>;
    onPointerUp?: React.PointerEventHandler<HTMLElement>;
    onPointerUpCapture?: React.PointerEventHandler<HTMLElement>;
    onPointerCancel?: React.PointerEventHandler<HTMLElement>;
    onPointerCancelCapture?: React.PointerEventHandler<HTMLElement>;
    onPointerEnter?: React.PointerEventHandler<HTMLElement>;
    onPointerLeave?: React.PointerEventHandler<HTMLElement>;
    onPointerOver?: React.PointerEventHandler<HTMLElement>;
    onPointerOverCapture?: React.PointerEventHandler<HTMLElement>;
    onPointerOut?: React.PointerEventHandler<HTMLElement>;
    onPointerOutCapture?: React.PointerEventHandler<HTMLElement>;
    onGotPointerCapture?: React.PointerEventHandler<HTMLElement>;
    onGotPointerCaptureCapture?: React.PointerEventHandler<HTMLElement>;
    onLostPointerCapture?: React.PointerEventHandler<HTMLElement>;
    onLostPointerCaptureCapture?: React.PointerEventHandler<HTMLElement>;
    onScroll?: React.UIEventHandler<HTMLElement>;
    onScrollCapture?: React.UIEventHandler<HTMLElement>;
    onScrollEnd?: React.UIEventHandler<HTMLElement>;
    onScrollEndCapture?: React.UIEventHandler<HTMLElement>;
    onWheel?: React.WheelEventHandler<HTMLElement>;
    onWheelCapture?: React.WheelEventHandler<HTMLElement>;
    onAnimationStart?: React.AnimationEventHandler<HTMLElement>;
    onAnimationStartCapture?: React.AnimationEventHandler<HTMLElement>;
    onAnimationEnd?: React.AnimationEventHandler<HTMLElement>;
    onAnimationEndCapture?: React.AnimationEventHandler<HTMLElement>;
    onAnimationIteration?: React.AnimationEventHandler<HTMLElement>;
    onAnimationIterationCapture?: React.AnimationEventHandler<HTMLElement>;
    onToggle?: React.ToggleEventHandler<HTMLElement>;
    onBeforeToggle?: React.ToggleEventHandler<HTMLElement>;
    onTransitionCancel?: React.TransitionEventHandler<HTMLElement>;
    onTransitionCancelCapture?: React.TransitionEventHandler<HTMLElement>;
    onTransitionEnd?: React.TransitionEventHandler<HTMLElement>;
    onTransitionEndCapture?: React.TransitionEventHandler<HTMLElement>;
    onTransitionRun?: React.TransitionEventHandler<HTMLElement>;
    onTransitionRunCapture?: React.TransitionEventHandler<HTMLElement>;
    onTransitionStart?: React.TransitionEventHandler<HTMLElement>;
    onTransitionStartCapture?: React.TransitionEventHandler<HTMLElement>;
    start?: number | undefined;
    list?: string | undefined;
    open?: boolean | undefined;
    step?: number | string | undefined;
    accept?: string | undefined;
    acceptCharset?: string | undefined;
    action?: string | undefined | ((formData: FormData) => void | Promise<void>) | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS];
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    as?: string | undefined;
    autoComplete?: string | undefined;
    autoPlay?: boolean | undefined;
    capture?: boolean | "user" | "environment" | undefined;
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    charSet?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    classID?: string | undefined;
    cols?: number | undefined;
    colSpan?: number | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossOrigin?: "" | "anonymous" | "use-credentials";
    dateTime?: string | undefined;
    defer?: boolean | undefined;
    download?: any;
    encType?: string | undefined;
    formAction?: string | undefined | ((formData: FormData) => void | Promise<void>) | React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[keyof React.DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS];
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    frameBorder?: number | string | undefined;
    headers?: string | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hrefLang?: string | undefined;
    htmlFor?: string | undefined;
    httpEquiv?: string | undefined;
    integrity?: string | undefined;
    keyParams?: string | undefined;
    keyType?: string | undefined;
    kind?: string | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginHeight?: number | undefined;
    marginWidth?: number | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    media?: string | undefined;
    mediaGroup?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    optimum?: number | undefined;
    placeholder?: string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readOnly?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: number | undefined;
    rowSpan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    srcLang?: string | undefined;
    srcSet?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;
};
export declare function prerenderIcon(props: IconProps & {
    listOfIcons?: Record<string, IconIcon>;
}): any;
export {};
