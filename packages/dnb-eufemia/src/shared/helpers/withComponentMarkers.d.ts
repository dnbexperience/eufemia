/**
 * Unified helper for setting component markers.
 *
 * Many Eufemia components use static properties like `_formElement`,
 * `_supportsSpacingProps`, and `_isHeadingElement` as runtime duck-typing
 * markers. These are read by flex layout (Container, utils) and
 * FieldBlock to determine how a child component should be treated.
 *
 * This helper replaces the ad-hoc `Component._formElement = true`
 * pattern with a single type-safe call.
 */
export type SpacingPropsVariant = boolean | 'children';
export type ComponentMarkers = {
    /**
     * Marks the component as a form element.
     * Used by `FieldBlock` to auto-detect whether to render as `<fieldset>`
     * when multiple form elements appear under a single label.
     */
    _formElement?: boolean;
    /**
     * Whether the component accepts spacing props directly.
     * - `true` — spacing props are cloned onto the element
     * - `'children'` — spacing is applied to the component's children
     * - `false` — the component explicitly opts out of spacing
     *
     * Used by `Flex.Container` and `renderWithSpacing` to decide how
     * to apply spacing to child elements.
     */
    _supportsSpacingProps?: SpacingPropsVariant;
    /**
     * Marks the component as a heading element.
     * Used by `isHeadingElement()` in flex/utils to detect heading
     * components.
     */
    _isHeadingElement?: boolean;
};
/**
 * A component (function or class) that has marker properties attached.
 * Use this type when you need to reference a component with its markers.
 */
export type MarkedComponent<T> = T & ComponentMarkers;
/**
 * Attaches component markers to a component function in a type-safe way.
 *
 * Mutates the component by assigning the marker properties. Uses TypeScript
 * assertion function syntax to narrow the component's type in the caller's
 * scope, so marker properties are visible downstream.
 *
 * @example
 * ```tsx
 * function Checkbox(props: CheckboxProps) { ... }
 *
 * withComponentMarkers(Checkbox, {
 *   _formElement: true,
 *   _supportsSpacingProps: true,
 * })
 *
 * export default Checkbox
 * ```
 */
export default function withComponentMarkers<T>(component: T, markers: ComponentMarkers): asserts component is T & ComponentMarkers;
