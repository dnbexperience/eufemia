/**
 * Global helpers
 *
 */
export { debounce, debounceAsync } from './helpers/debounce';
export declare const PLATFORM_MAC = "Mac|iPad|iPhone|iPod";
export declare const PLATFORM_WIN = "Win";
export declare const PLATFORM_ANDROID = "Android";
export declare const PLATFORM_LINUX = "Linux";
export declare const PLATFORM_IOS = "iOS|iPhone|iPad|iPod";
export declare let IS_IOS: boolean;
export declare let IS_SAFARI: boolean;
export declare let IS_WIN: boolean;
export declare let IS_MAC: boolean;
export declare let IS_ANDROID: boolean;
export declare let IS_LINUX: boolean;
export declare const isMac: () => boolean;
export declare const isWin: () => boolean;
export declare const isAndroid: () => boolean;
export declare const isLinux: () => boolean;
export declare const isiOS: () => boolean;
export declare const isSafari: () => boolean;
export declare function setPageFocusElement(selectorOrElement: string | HTMLElement, key?: string): string | HTMLElement;
export declare function applyPageFocus(selector?: string, callback?: ((element: HTMLElement) => void) | null): void;
export declare function getOffsetTop(elem: HTMLElement | null): number;
export declare function getOffsetLeft(elem: HTMLElement | null): number;
export declare function scrollToLocationHashId({ offset, delay, onCompletion, }?: {
    offset?: number;
    delay?: number;
    onCompletion?: (elem: HTMLElement) => void;
}): HTMLElement;
export declare function getSelectedText(): string;
export declare function emptySelectedText(): void;
export declare function hasSelectedText(): boolean;
export declare function getSelectedElement(): Node;
export declare function copyToClipboard(string: string): Promise<any>;
/**
 * Uses console.log to warn about Eufemia usage issues
 *
 * It uses log instead of warn,
 * because of the stack track some browser do add
 * which takes a lot of visual space in the console
 *
 * @param  {...any} params Send in what ever you would
 */
export declare const warn: (...params: any[]) => void;
export declare function getColor(value: string | undefined): string;
