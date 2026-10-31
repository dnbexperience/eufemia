/**
 * Global ref registry for sharing DOM refs between
 * compound Toaster sub-components (siblings connected by ID).
 */
export type ToasterRefStore = {
  notificationButtonRef: { current: HTMLButtonElement | null }
  focusProxyRef: { current: HTMLButtonElement | null }
  programmaticFocusRef: { current: boolean }
  returningRef: { current: boolean }
  pointerDownRef: { current: boolean }
  hasNotificationUI: { current: boolean }
  hasFocusProxy: { current: boolean }
}

const stores = new Map<string, ToasterRefStore>()

export function getToasterRefs(id: string): ToasterRefStore {
  let store = stores.get(id)

  if (!store) {
    store = {
      notificationButtonRef: { current: null },
      focusProxyRef: { current: null },
      programmaticFocusRef: { current: false },
      returningRef: { current: false },
      pointerDownRef: { current: false },
      hasNotificationUI: { current: false },
      hasFocusProxy: { current: false },
    }
    stores.set(id, store)
  }

  return store
}
