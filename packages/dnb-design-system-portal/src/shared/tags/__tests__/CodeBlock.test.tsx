import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import type {
  createElement as CreateElement,
  createContext as CreateContext,
  ReactNode,
} from 'react'
import { act, render } from '@testing-library/react'
import * as FullscreenCodeContext from '../../../core/FullscreenCodeContext'

// Mock CSS modules
vi.mock('../CodeBlock.module.scss', () => ({
  liveCodeEditorStyle: 'liveCodeEditorStyle',
  exampleBoxStyle: 'exampleBoxStyle',
  toolbarStyle: 'toolbarStyle',
  codeBlockStyle: 'codeBlockStyle',
}))

// Mock prism theme
vi.mock('@dnb/eufemia/src/style/themes/ui/prism/dnb-prism-theme', () => ({
  default: {
    plain: { color: '#000', backgroundColor: '#fff' },
    styles: [],
  },
}))

// Mock Tag
vi.mock('../Tag', async () => {
  const { createElement } = (await vi.importActual('react')) as {
    createElement: typeof CreateElement
  }
  return {
    default: (props: any) => {
      const { children, ...rest } = props
      return createElement('pre', rest, children)
    },
  }
})

// Mock skeleton helper
vi.mock('@dnb/eufemia/src/components/skeleton/SkeletonHelper', () => ({
  createSkeletonClass: () => '',
}))

// Mock Eufemia components
vi.mock('@dnb/eufemia/src/components', async () => {
  const { createElement } = (await vi.importActual('react')) as {
    createElement: typeof CreateElement
  }
  return {
    Button: ({ text, onClick, ...rest }: any) =>
      createElement('button', { onClick, ...rest }, text),
    Checkbox: ({ label, checked, onChange, ...rest }: any) =>
      createElement(
        'label',
        null,
        createElement('input', {
          type: 'checkbox',
          checked,
          onChange: (event: any) =>
            onChange?.({ checked: event.target.checked }),
          ...rest,
        }),
        label
      ),
    Space: ({ children, ref, ...rest }: any) =>
      createElement('div', { ref: ref, ...rest }, children),
    Flex: {
      Horizontal: ({ children, ...rest }: any) =>
        createElement('div', rest, children),
    },
    ToggleButton: ({ children, checked, onChange, ...rest }: any) =>
      createElement(
        'button',
        {
          type: 'button',
          'aria-pressed': checked,
          onClick: () => onChange?.({ checked: !checked }),
          ...rest,
        },
        children
      ),
  }
})

// Mock Context
vi.mock('@dnb/eufemia/src/shared', async () => {
  const { createContext } = (await vi.importActual('react')) as {
    createContext: typeof CreateContext
  }
  return {
    Context: createContext({}),
  }
})

// Store the latest LiveEditor onChange and LiveProvider code for assertions
let mockLiveEditorOnChange: ((code: string) => void) | undefined
let mockLiveProviderCode: string | undefined

vi.mock('react-live-ssr', async () => {
  const { createElement } = (await vi.importActual('react')) as {
    createElement: typeof CreateElement
  }
  return {
    LiveProvider: ({
      children,
      code,
    }: {
      children: ReactNode
      code: string
      [key: string]: unknown
    }) => {
      mockLiveProviderCode = code
      return createElement(
        'div',
        { 'data-testid': 'live-provider' },
        children
      )
    },
    LiveEditor: ({
      onChange,
      ...rest
    }: {
      onChange?: (code: string) => void
      [key: string]: unknown
    }) => {
      mockLiveEditorOnChange = onChange
      return createElement('div', {
        'data-testid': 'live-editor',
        contentEditable: true,
      })
    },
    LiveError: () => null,
    LivePreview: ({ ...rest }: Record<string, unknown>) =>
      createElement('div', {
        'data-testid': 'live-preview',
        ...rest,
      }),
  }
})

import CodeBlock from '../CodeBlock'

describe('CodeBlock', () => {
  const isTestOriginal = global.IS_TEST

  beforeAll(() => {
    global.IS_TEST = false
  })

  beforeEach(() => {
    mockLiveEditorOnChange = undefined
    mockLiveProviderCode = undefined
    vi.restoreAllMocks()
  })

  afterAll(() => {
    global.IS_TEST = isTestOriginal
  })

  it('should render non-live code blocks with syntax highlighting', () => {
    const { container } = render(
      <CodeBlock language="jsx">{'<div>Hello</div>'}</CodeBlock>
    )

    const pre = container.querySelector('pre')
    expect(pre).toBeTruthy()
    expect(pre.textContent).toContain('Hello')
  })

  it('should detect language from className', () => {
    const { container } = render(
      <CodeBlock className="language-typescript">
        {'const x: number = 1'}
      </CodeBlock>
    )

    const pre = container.querySelector('pre')
    expect(pre).toBeTruthy()
    expect(pre.textContent).toContain('const')
  })

  it('should render LiveCode when reactLive is true', () => {
    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div>Live</div>'}
      </CodeBlock>
    )

    expect(mockLiveProviderCode).toBe('<div>Live</div>')
    expect(
      container.querySelector('[data-testid="live-preview"]')
    ).toBeTruthy()
  })

  it('should show "No Code provided" when code is empty', () => {
    render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'   '}
      </CodeBlock>
    )

    expect(mockLiveProviderCode).toBe('No Code provided')
  })

  it('should not show "No Code provided" when user clears the editor', () => {
    render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    expect(mockLiveProviderCode).not.toBe('No Code provided')

    // Simulate user clearing all code in the live editor
    act(() => {
      mockLiveEditorOnChange?.('')
    })

    expect(mockLiveProviderCode).not.toBe('No Code provided')
    expect(mockLiveProviderCode).toBe('<div>Hello</div>')
  })

  it('should not feed edited code back to LiveProvider, avoiding a feedback loop', () => {
    const initialCode = '<div>Hello</div>'

    const { rerender } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {initialCode}
      </CodeBlock>
    )

    expect(mockLiveProviderCode).toBe(initialCode)

    // Simulate user typing by calling the onChange callback
    const editedCode = '<div>Hello World</div>'
    act(() => {
      mockLiveEditorOnChange?.(editedCode)
    })

    // Re-render with the same props (as would happen in a React update)
    rerender(
      <CodeBlock reactLive scope={{}} language="jsx">
        {initialCode}
      </CodeBlock>
    )

    // LiveProvider should still have the original code prop,
    // NOT the user-edited code. LiveProvider manages edited
    // state internally — feeding it back creates a feedback
    // loop that mangles characters during typing.
    expect(mockLiveProviderCode).toBe(initialCode)
  })

  it('should strip data-visual-test attributes from code', () => {
    render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div data-visual-test="my-test">Hello</div>'}
      </CodeBlock>
    )

    expect(mockLiveProviderCode).toBe('<div>Hello</div>')
  })

  it('should hide preview when hidePreview is true', () => {
    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx" hidePreview>
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    expect(
      container.querySelector('[data-testid="live-preview"]')
    ).toBeNull()
  })

  it('should only show dark surface checkbox when surface is opted in', () => {
    const { queryByLabelText, rerender } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    expect(queryByLabelText('Dark surface')).toBeNull()

    rerender(
      <CodeBlock reactLive scope={{}} language="jsx" surface="dark">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    expect(queryByLabelText('Dark surface')).toBeTruthy()
  })

  it('should not render LiveProvider when another code block is in focusmode', () => {
    // Simulate a block that is NOT in this render tree being in fullscreen.
    // Using an unmatched id means neither block below enters isFullscreen,
    // so ChangeStyleTheme never renders and we avoid pulling in extra mocks.
    vi.spyOn(FullscreenCodeContext, 'useFullscreenCode').mockReturnValue({
      fullscreenCodeId: 'some-other-block',
      setFullscreenCodeId: vi.fn(),
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <>
        <CodeBlock
          reactLive
          scope={{}}
          language="jsx"
          data-visual-test="block-a"
        >
          {'<div>A</div>'}
        </CodeBlock>

        <CodeBlock
          reactLive
          scope={{}}
          language="jsx"
          data-visual-test="block-b"
        >
          {'<div>B</div>'}
        </CodeBlock>
      </>
    )

    // Both blocks see anotherIsFullscreen=true and suppress their LiveProvider
    expect(
      container.querySelectorAll('[data-testid="live-provider"]')
    ).toHaveLength(0)
  })

  it('should toggle color scheme class when clicking Dark mode checkbox', () => {
    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const themeWrapper = container.querySelector('.eufemia-theme')
    expect(themeWrapper).toBeTruthy()
    expect(
      themeWrapper.classList.contains('eufemia-theme__color-scheme--dark')
    ).toBe(false)

    const checkbox = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    expect(checkbox).toBeTruthy()

    // Enable dark mode
    act(() => {
      checkbox.click()
    })

    expect(
      themeWrapper.classList.contains('eufemia-theme__color-scheme--dark')
    ).toBe(true)

    // Disable dark mode
    act(() => {
      checkbox.click()
    })

    expect(
      themeWrapper.classList.contains('eufemia-theme__color-scheme--dark')
    ).toBe(false)
  })

  it('should assign fullscreen id to the LiveCode wrapper element', () => {
    vi.spyOn(FullscreenCodeContext, 'useFullscreenCode').mockReturnValue({
      fullscreenCodeId: null,
      setFullscreenCodeId: vi.fn(),
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <CodeBlock
        reactLive
        scope={{}}
        language="jsx"
        data-visual-test="my-live-block"
      >
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const wrapper = container.querySelector('#my-live-block')
    expect(wrapper).toBeTruthy()
  })

  it('should scroll to top when entering focusmode', () => {
    const scrollTo = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {})

    const mockSetFullscreenCodeId = vi.fn()
    vi.spyOn(FullscreenCodeContext, 'useFullscreenCode').mockReturnValue({
      fullscreenCodeId: null,
      setFullscreenCodeId: mockSetFullscreenCodeId,
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <CodeBlock
        reactLive
        scope={{}}
        language="jsx"
        data-visual-test="block-a"
      >
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const fullscreenButton = container.querySelector(
      'button[aria-label="Fullscreen"]'
    ) as HTMLButtonElement
    expect(fullscreenButton).toBeTruthy()

    act(() => {
      fullscreenButton.click()
    })

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
    expect(mockSetFullscreenCodeId).toHaveBeenCalledWith('block-a')
  })
})
