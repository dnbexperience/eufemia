/**
 * This is a helper function (hack),
 * that will evoke a good numeric keyboard (on iOS) that supports decimals and minus keys.
 */
export default class InputModeNumber {
    inputElement: HTMLInputElement;
    labelElement: HTMLLabelElement;
    timeout: NodeJS.Timer;
    hasFocus: boolean;
    focusEventName: string;
    blurEventName: string;
    _type: string;
    _value: string;
    _width: number;
    _cssText: string;
    _placeholder: string;
    _selectionStart: number;
    _selectionEnd: number;
    setElement(element: HTMLInputElement): void;
    handleLabel(): void;
    add(): void;
    removeEvent(element: HTMLInputElement | HTMLLabelElement): void;
    remove(): void;
    onBlur: () => void;
    onFocus: () => void;
    reset: () => void;
}
