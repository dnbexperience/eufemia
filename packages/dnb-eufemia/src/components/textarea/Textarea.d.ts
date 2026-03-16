/**
 * Web Textarea Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers';
import React from 'react';
import type { InternalLocale } from '../../shared/Context';
import Context from '../../shared/Context';
import type { FormStatusBaseProps } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { TextCounterProps } from '../../fragments/TextCounter';
export type TextareaSuffix = string | React.ReactNode;
export type TextareaAlign = 'left' | 'center' | 'right' | 'justify';
export type TextareaAutoresizeMaxRows = string | number;
export type TextareaRows = number | string;
export type TextareaCols = number | string;
export type TextareaTextareaElement = ((params: React.TextareaHTMLAttributes<HTMLTextAreaElement>, ref: React.RefObject<HTMLTextAreaElement | null>) => React.ReactNode) | React.ReactNode;
export type TextareaChildren = React.ReactNode | ((...args: any[]) => any);
export type TextareaSize = 'small' | 'medium' | 'large';
export type TextareaEvent<E = React.SyntheticEvent<HTMLTextAreaElement>> = {
    value: string;
    event: E;
};
export type TextareaChangeEvent = TextareaEvent<React.ChangeEvent<HTMLTextAreaElement>> & {
    rows: number;
};
export type TextareaKeyDownEvent = TextareaEvent<React.KeyboardEvent<HTMLTextAreaElement>> & {
    rows: number;
};
export interface TextareaProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children' | 'label' | 'size' | 'cols' | 'rows' | 'placeholder' | 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown'>, SpacingProps, FormStatusBaseProps {
    /**
     * The content value of the Textarea.
     */
    value?: string;
    id?: string;
    /**
     * Prepends the Form Label component. If no ID is provided, a random ID is created.
     */
    label?: React.ReactNode;
    /**
     * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
     */
    labelDirection?: 'vertical' | 'horizontal';
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.
     */
    size?: TextareaSize;
    /**
     * To control the visual focus state as a prop, like `focus` or `blur`.
     */
    textareaState?: string;
    /**
     * Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.
     */
    suffix?: TextareaSuffix;
    /**
     * The placeholder which shows up once the Textarea value is empty.
     */
    placeholder?: React.ReactNode;
    /**
     * Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.
     */
    keepPlaceholder?: boolean;
    /**
     * Defines the `text-align` of the Textarea. Defaults to `left`.
     */
    align?: TextareaAlign;
    /**
     * If set to `true`, then the Textarea field will be 100% in `width`.
     */
    stretch?: boolean;
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.
     */
    autoResize?: boolean;
    /**
     * Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.
     */
    characterCounter?: Omit<TextCounterProps, 'text'> | number;
    /**
     * Set a number to define how many rows the Textarea can auto grow.
     */
    autoResizeMaxRows?: TextareaAutoresizeMaxRows;
    textareaClass?: string;
    readOnly?: boolean;
    rows?: TextareaRows;
    cols?: TextareaCols;
    className?: string;
    textareaElement?: TextareaTextareaElement;
    children?: TextareaChildren;
    onChange?: (event: TextareaChangeEvent) => void;
    onFocus?: (event: TextareaEvent<React.FocusEvent<HTMLTextAreaElement>>) => void;
    onBlur?: (event: TextareaEvent<React.FocusEvent<HTMLTextAreaElement>>) => void;
    onKeyDown?: (event: TextareaKeyDownEvent) => void;
    /**
     * Locale to use for text counter. Inherited from context if not set.
     */
    locale?: InternalLocale;
    /**
     * By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
     */
    ref?: React.Ref<HTMLTextAreaElement> | null;
}
interface TextareaComponentState {
    textareaState: string;
    value: string | null;
    _value: string | undefined;
}
/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
declare class TextareaClass extends React.PureComponent<TextareaProps, TextareaComponentState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    _ref: React.RefObject<HTMLTextAreaElement | null>;
    _id: string;
    _heightOffset: number | undefined;
    resizeModifier: string | false;
    resizeObserver: ResizeObserver | null;
    static defaultProps: {
        value: string;
        id: any;
        label: any;
        labelDirection: any;
        labelSrOnly: any;
        status: any;
        textareaState: any;
        statusState: string;
        statusProps: any;
        statusNoAnimation: any;
        globalStatus: any;
        suffix: any;
        placeholder: any;
        keepPlaceholder: any;
        align: any;
        size: any;
        stretch: any;
        disabled: any;
        skeleton: any;
        autoResize: any;
        autoResizeMaxRows: any;
        characterCounter: any;
        textareaClass: any;
        readOnly: boolean;
        rows: any;
        cols: any;
        ref: any;
        className: any;
        textareaElement: any;
        children: any;
        onChange: any;
        onFocus: any;
        onBlur: any;
        onKeyDown: any;
    };
    static getDerivedStateFromProps(props: TextareaProps, state: TextareaComponentState): TextareaComponentState;
    static hasValue(value: string | number | null | undefined): boolean;
    static getValue(props: TextareaProps): any;
    state: {
        textareaState: string;
        value: any;
        _value: any;
    };
    constructor(props: TextareaProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onFocusHandler: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlurHandler: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownHandler: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    prepareAutosize: () => void;
    setAutosize: (rows?: any) => void;
    getRows(): number;
    getLineHeight(): number;
    getProps(): Readonly<TextareaProps> & {};
    render(): import("react/jsx-runtime").JSX.Element;
}
export interface TextareaStaticProperties extends ComponentMarkers {
    hasValue: typeof TextareaClass.hasValue;
    getValue: typeof TextareaClass.getValue;
}
/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
declare function Textarea({ ref, ...props }: TextareaProps): import("react/jsx-runtime").JSX.Element;
declare const TextareaExport: typeof Textarea & TextareaStaticProperties;
export default TextareaExport;
