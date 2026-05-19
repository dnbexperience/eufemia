type MediaQueryListener = (
  this: MediaQueryList,
  event: MediaQueryListEvent
) => void

type MockMediaQueryList = MediaQueryList & {
  __dispatch: (matches: boolean, notify?: boolean) => void
}

export default class MatchMediaMock {
  private activeQuery: string | null = null
  private mqls = new Map<string, MockMediaQueryList>()
  private previousMatchMedia = window.matchMedia

  constructor() {
    window.matchMedia = this.matchMedia as typeof window.matchMedia
  }

  useMediaQuery(query: string) {
    const previousQuery = this.activeQuery

    if (previousQuery === query) {
      return
    }

    this.activeQuery = query

    if (previousQuery) {
      this.mqls.get(previousQuery)?.__dispatch(false, false)
    }

    this.mqls.get(query)?.__dispatch(true)
  }

  clear() {
    const previousQuery = this.activeQuery
    this.activeQuery = null

    if (previousQuery) {
      this.mqls.get(previousQuery)?.__dispatch(false, false)
    }
  }

  destroy() {
    this.clear()
    window.matchMedia = this.previousMatchMedia
  }

  private matchMedia = (query: string): MediaQueryList => {
    const existing = this.mqls.get(query)

    if (existing) {
      return existing
    }

    const listeners = new Set<MediaQueryListener>()
    let currentMatches = this.activeQuery === query

    const mql = {
      media: query,
      get matches() {
        return currentMatches
      },
      onchange: null as MediaQueryListener | null,
      addListener: (listener: MediaQueryListener) => {
        listeners.add(listener)
      },
      removeListener: (listener: MediaQueryListener) => {
        listeners.delete(listener)
      },
      addEventListener: (
        type: string,
        listener: EventListenerOrEventListenerObject
      ) => {
        if (type !== 'change') {
          return
        }

        if (typeof listener === 'function') {
          listeners.add(listener as unknown as MediaQueryListener)
        }
      },
      removeEventListener: (
        type: string,
        listener: EventListenerOrEventListenerObject
      ) => {
        if (type !== 'change') {
          return
        }

        if (typeof listener === 'function') {
          listeners.delete(listener as unknown as MediaQueryListener)
        }
      },
      dispatchEvent: () => true,
    } as unknown as MockMediaQueryList

    Object.defineProperty(mql, '__dispatch', {
      configurable: true,
      enumerable: false,
      value: (matches: boolean, notify = true) => {
        if (currentMatches === matches) {
          return
        }

        currentMatches = matches

        if (!notify) {
          return
        }

        const event = {
          matches,
          media: query,
        } as MediaQueryListEvent

        mql.onchange?.call(mql as MediaQueryList, event)

        listeners.forEach((listener) => {
          listener.call(mql as MediaQueryList, event)
        })
      },
    })

    this.mqls.set(query, mql)

    return mql
  }
}
