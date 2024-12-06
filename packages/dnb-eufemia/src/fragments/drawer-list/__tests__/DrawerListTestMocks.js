export function mockImplementationForDirectionObserver() {
  beforeAll(() => {
    window.resizeTo = function resizeTo({
      width = window.innerWidth,
      height = window.innerHeight,
    }) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
      }).dispatchEvent(new this.Event('resize'))

      // new setDirectionObserver implementation
      jest
        .spyOn(document.documentElement, 'clientWidth', 'get')
        .mockImplementation(() => width)
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementation(() => height)
    }

    window.scrollTo = function resizeTo({ top = window.pageYOffset }) {
      Object.assign(this, {
        pageYOffset: top,
      }).dispatchEvent(new this.Event('scroll'))

      // new setDirectionObserver implementation
      jest
        .spyOn(document.documentElement, 'scrollTop', 'get')
        .mockImplementation(() => top)
    }

    // make sure we get the correct document.documentElement.clientHeight on startup
    window.resizeTo({ height: window.innerHeight })
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
      .getAttribute('style')
  ).toBe('max-height: 33.5rem;') // jsdom default is 768 innerHeight

  window.resizeTo({
    height: 640, // change innerHeight
  })
  await wait(100)

  expect(
    document.querySelector('.dnb-drawer-list--bottom')
  ).toBeInTheDocument()
  expect(
    document
      .querySelector('.dnb-drawer-list__options')
      .getAttribute('style')
  ).toBe('max-height: 28rem;')

  window.scrollTo({
    top: -640,
  })
  await wait(100)

  expect(
    document.querySelector('.dnb-drawer-list--top')
  ).toBeInTheDocument()
  expect(
    document
      .querySelector('.dnb-drawer-list__options')
      .getAttribute('style')
  ).toBe('max-height: 28rem;') // is now min_height
}

const wait = (t) => new Promise((r) => setTimeout(r, t))
