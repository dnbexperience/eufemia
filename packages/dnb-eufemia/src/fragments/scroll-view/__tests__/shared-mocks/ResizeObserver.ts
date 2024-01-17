type ObserverOptions = {
  init?: (callback: ResizeObserverCallback) => void
  observe?: (elem: HTMLElement) => void
}

export const setResizeObserver = ({
  observe,
  init,
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
      // do nothing
    }
  }

  globalThis.ResizeObserver = ResizeObserver
}
