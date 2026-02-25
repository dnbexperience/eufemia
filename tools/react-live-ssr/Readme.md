# Temporary react-live with SSR support

This build (v3.1.1) includes this [PR](https://github.com/FormidableLabs/react-live/pull/322). We may use the original as soon as it is released with SSR support.

The `use-editable` dependency has been replaced with an inline implementation in `src/useEditable.ts` to ensure React 19 compatibility and remove the unmaintained package.
