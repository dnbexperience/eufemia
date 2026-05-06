import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'

type RootStore = {
  __portalRoot?: Root
}

type CreateRootFn = (container: Element) => Root

type RenderPortalAppOptions = {
  container?: Element | null
  rootStore?: RootStore
  createRootFn?: CreateRootFn
}

export function getOrCreatePortalRoot(
  container: Element,
  {
    rootStore = globalThis as RootStore,
    createRootFn = createRoot,
  }: Omit<RenderPortalAppOptions, 'container'> = {}
) {
  const existingRoot = rootStore.__portalRoot

  if (existingRoot) {
    return existingRoot
  }

  const nextRoot = createRootFn(container)
  rootStore.__portalRoot = nextRoot
  return nextRoot
}

export function renderPortalApp<Props extends object>(
  AppComponent: React.ComponentType<Props>,
  {
    container = document.getElementById('root'),
    rootStore = globalThis as RootStore,
    createRootFn = createRoot,
    props,
  }: RenderPortalAppOptions & { props?: Props } = {}
) {
  if (!container) {
    throw new Error('Expected #root container for portal app')
  }

  const root = getOrCreatePortalRoot(container, {
    rootStore,
    createRootFn,
  })

  root.render(<AppComponent {...props} />)

  return root
}
