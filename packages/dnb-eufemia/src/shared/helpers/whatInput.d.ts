/**
 * Internal input detection helper.
 *
 * @deprecated This module is a temporary internal replacement for the
 * `what-input` npm package, which was removed to reduce external
 * dependencies. The goal is to migrate away from `data-whatinput` /
 * `data-whatintent` selectors entirely and use native CSS such as
 * `:focus-visible` instead. Until that migration is complete, this
 * module keeps existing styling functional by setting the same
 * `data-whatinput` and `data-whatintent` attributes on `<html>`.
 */
/**
 * Set which specific keys should trigger "keyboard" input detection.
 * When set, only matching key codes count as keyboard input.
 * Pass e.g. `[9]` for Tab-only, or `[9, 37, 39]` for Tab + arrow keys.
 */
declare function specificKeys(arr: number[]): void;
declare const whatInput: {
    specificKeys: typeof specificKeys;
};
export default whatInput;
