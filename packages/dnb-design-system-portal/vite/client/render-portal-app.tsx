import { createRoot, hydrateRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { releaseVersion } from 'virtual:build-info'

type RootStore = {
  __portalRoot?: Root
}

type CreateRootFn = (container: Element) => Root
type HydrateRootFn = typeof hydrateRoot

type RenderPortalAppOptions = {
  container?: Element | null
  rootStore?: RootStore
  createRootFn?: CreateRootFn
  hydrateRootFn?: HydrateRootFn
}

export function renderPortalApp<Props extends object>(
  AppComponent: React.ComponentType<Props>,
  {
    container = document.getElementById('root'),
    rootStore = globalThis as RootStore,
    createRootFn = createRoot,
    hydrateRootFn = hydrateRoot,
    props,
  }: RenderPortalAppOptions & { props?: Props } = {}
) {
  if (!container) {
    throw new Error('Expected #root container for portal app')
  }

  const existingRoot = rootStore.__portalRoot

  if (existingRoot) {
    existingRoot.render(<AppComponent {...props} />)
    return existingRoot
  }

  const element = <AppComponent {...(props as Props)} />

  const hasPreRenderedContent = container.childElementCount > 0

  let root: Root

  if (hasPreRenderedContent) {
    // The pre-rendered HTML from SSG is already in the DOM. Use
    // hydrateRoot so React adopts the existing nodes without
    // rebuilding the tree. The current route's lazy chunk was
    // pre-resolved before this call, so React Router won't
    // render a HydrateFallback.
    //
    // Minor hydration mismatches (e.g. AriaLive spans from Tooltips
    // that only render client-side) are expected and handled
    // gracefully by React's recovery mechanism.
    root = hydrateRootFn(container, element, {
      onRecoverableError(error, errorInfo) {
        // Only log hydration mismatches on local and preview builds
        // so they surface during development without cluttering
        // production error reporting.
        if (releaseVersion !== '[LOCAL BUILD]') {
          return
        }

        console.group('React recoverable hydration error')
        console.error(error)
        if (errorInfo?.componentStack) {
          console.log(errorInfo.componentStack)
        }
        console.groupEnd()
      },
    })
  } else {
    root = createRootFn(container)
    root.render(element)
  }

  rootStore.__portalRoot = root

  return root
}
