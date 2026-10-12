# React Live SSR adapter

A provider-only companion for upstream React Live v5. It imports the original
LiveContext and compiler functions, so upstream LiveEditor, LivePreview,
LiveError, and withLive share the same context. No upstream files are patched.

Use the adapter's provider with components from react-live:

```tsx
import { LiveProvider } from 'react-live-ssr-adapter'
import { LiveEditor, LivePreview, LiveError } from 'react-live'
function Playground() {
  return (
    <LiveProvider code="<strong>Hello</strong>" ssr>
      <LivePreview />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  )
}
```

SSR is opt-in. Use it for trusted, deterministic examples that are safe to
evaluate and render on the server. React error boundaries do not catch server
rendering errors. Browser-dependent examples should stay client-only.

Async transforms leave the initial preview empty and resolve after hydration.
The provider guards obsolete transforms and delayed noInline callbacks. It also
reuses synchronous initial output so hydration does not remount the preview.
React StrictMode can still invoke pure initializers twice in development.

This workspace package currently exposes TypeScript source for Vite consumers
and is private. Publishing it later requires a compiled distribution, a suitable
license, and release tooling. React and react-live must stay peer dependencies
and external to any bundle so the application shares one context instance.

The Portal imports only this provider from the adapter; all other components
come from upstream react-live. This replaces the previous workspace fork,
including its custom editor. The Portal browser test verifies SSR, hydration,
typing, paste, undo/redo, and cursor behavior with the upstream editor.
