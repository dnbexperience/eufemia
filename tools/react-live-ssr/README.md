# Temporary react-live with SSR support

This build (v3.1.1) includes this [PR](https://github.com/FormidableLabs/react-live/pull/322). We may use the original as soon as it is released with SSR support.

The `use-editable` dependency has been replaced with an inline implementation in `src/useEditable.ts` to ensure React 19 compatibility and remove the unmaintained package.

## Local modifications

The dist files have been modified to use the automatic JSX runtime (`jsxRuntime: 'automatic'`) instead of the classic `React.createElement` approach. This prevents the console warning "Your app (or one of its dependencies) is using an outdated JSX transform."
