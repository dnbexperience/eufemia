type ObserverOptions = {
  init?: (callback: ResizeObserverCallback) => void
  observe?: (elem: HTMLElement) => void
  disconnect?: () => void
}

export const setResizeObserver = ({
  observe,
  init,
  disconnect,
}: ObserverOptions = {}) => {
  class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      init?.(callback)
    }
    observe(elem: HTMLElement) {
      return observe?.(elem)
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      return disconnect?.()
    }
  }

  globalThis.ResizeObserver = ResizeObserver
}
