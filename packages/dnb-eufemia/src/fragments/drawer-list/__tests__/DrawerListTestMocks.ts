const wait = (t: number) => new Promise((r) => setTimeout(r, t))

type CustomResizeTo = (opts: { width?: number; height?: number }) => void
type CustomScrollTo = (opts: { top?: number }) => void

export function mockImplementationForDirectionObserver() {
  beforeAll(() => {
    ;(window as unknown as { resizeTo: CustomResizeTo }).resizeTo =
      function resizeTo({
        width = window.innerWidth,
        height = window.innerHeight,
      }) {
        Object.assign(window, {
          innerWidth: width,
          innerHeight: height,
        })
        window.dispatchEvent(new Event('resize'))

        // new setDirectionObserver implementation
        jest
          .spyOn(document.documentElement, 'clientWidth', 'get')
          .mockImplementation(() => width)
        jest
          .spyOn(document.documentElement, 'clientHeight', 'get')
          .mockImplementation(() => height)
      }
    ;(window as unknown as { scrollTo: CustomScrollTo }).scrollTo =
      function scrollTo({ top = window.scrollY }) {
        Object.assign(window, {
          scrollY: top,
        })
        window.dispatchEvent(new Event('scroll'))

        // new setDirectionObserver implementation
        jest
          .spyOn(document.documentElement, 'scrollTop', 'get')
          .mockImplementation(() => top)
      }

    // make sure we get the correct document.documentElement.clientHeight on startup
    ;(window.resizeTo as unknown as CustomResizeTo)({
      height: window.innerHeight,
    })
  })
}

export async function testDirectionObserver() {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    value: 0,
  })

  // the setDirectionObserver fn is changing this
  expect(
    document.querySelector('.dnb-drawer-list--bottom')
  ).toBeInTheDocument()
  expect(
    document
      .querySelector('.dnb-drawer-list__options')
      ?.getAttribute('style')
  ).toBe('max-height: 33.5rem;') // jsdom default is 768 innerHeight
  ;(window.resizeTo as unknown as CustomResizeTo)({
    height: 640, // change innerHeight
  })
  await wait(100)

  expect(
    document.querySelector('.dnb-drawer-list--bottom')
  ).toBeInTheDocument()
  expect(
    document
      .querySelector('.dnb-drawer-list__options')
      ?.getAttribute('style')
  ).toBe('max-height: 28rem;')
  ;(window.scrollTo as unknown as CustomScrollTo)({
    top: -640,
  })
  await wait(100)

  expect(
    document.querySelector('.dnb-drawer-list--top')
  ).toBeInTheDocument()
  expect(
    document
      .querySelector('.dnb-drawer-list__options')
      ?.getAttribute('style')
  ).toBe('max-height: 28rem;') // is now minHeight
}
