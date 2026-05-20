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
import * as FocusModeCodeContext from '../../../core/FocusModeCodeContext'

// Mock CSS modules
vi.mock('../CodeBlock.module.scss', () => ({
  liveCodeEditorStyle: 'liveCodeEditorStyle',
  exampleBoxStyle: 'exampleBoxStyle',
  copyButtonStyle: 'copyButtonStyle',
  showFocusModePaddingStyle: 'showFocusModePaddingStyle',
  toolbarStyle: 'toolbarStyle',
  codeBlockStyle: 'codeBlockStyle',
}))

vi.mock('../../../core/ChangeStyleTheme', () => ({
  default: () => null,
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

// Mock portalRuntimeUtils
vi.mock('../../../core/portalRuntimeUtils', () => ({
  setLang: vi.fn(),
}))

// Create hoisted mock for copyToClipboard
const mockCopyToClipboard = vi.hoisted(() =>
  vi.fn().mockResolvedValue(true)
)

// Mock helpers - partially mock to keep other exports
vi.mock('@dnb/eufemia/src/shared/helpers', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('@dnb/eufemia/src/shared/helpers')
    >()
  return {
    ...actual,
    copyToClipboard: mockCopyToClipboard,
  }
})

// Mock Eufemia components
vi.mock('@dnb/eufemia/src/components', async () => {
  const { createElement } = (await vi.importActual('react')) as {
    createElement: typeof CreateElement
  }
  return {
    Button: ({ text, onClick, icon: _icon, ...rest }: any) =>
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
    ToggleButton: Object.assign(
      ({ children, text, checked, onChange, onClick, ...rest }: any) =>
        createElement(
          'button',
          {
            type: 'button',
            'aria-pressed': checked,
            onClick: onClick ?? (() => onChange?.({ checked: !checked })),
            ...rest,
          },
          text || children
        ),
      {
        Group: ({ children, value, onChange, ...rest }: any) =>
          createElement(
            'div',
            { role: 'group', 'data-value': value, ...rest },
            typeof children === 'function'
              ? children
              : children?.map?.((child: any) =>
                  createElement('button', {
                    key: child.props?.value,
                    type: 'button',
                    'aria-pressed': value === child.props?.value,
                    onClick: () =>
                      onChange?.({ value: child.props?.value }),
                    title: child.props?.title,
                    'aria-label': child.props?.['aria-label'],
                    children: child.props?.text,
                  })
                )
          ),
      }
    ),
    Menu: {
      Root: ({ children, ...rest }: any) =>
        createElement('div', { 'data-testid': 'menu-root', ...rest }, children),
      Button: ({ icon: _icon, ...rest }: any) =>
        createElement('button', { 'data-testid': 'menu-button', ...rest }),
      List: ({ children, ...rest }: any) =>
        createElement('div', { 'data-testid': 'menu-list', role: 'menu', ...rest }, children),
      Action: ({ text, onClick, ...rest }: any) =>
        createElement('button', { role: 'menuitem', onClick, ...rest }, text),
    },
  }
})

// Mock Context
vi.mock('@dnb/eufemia/src/shared', async () => {
  const { createContext } = (await vi.importActual('react')) as {
    createContext: typeof CreateContext
  }
  return {
    Context: createContext({
      locale: 'nb-NO',
      setLocale: vi.fn(),
    }),
  }
})

// Store the latest LiveEditor onChange and LiveProvider code for assertions
let mockLiveEditorOnChange: ((code: string) => void) | undefined
let mockLiveProviderCode: string | undefined
const mockLiveContextOnChange = vi.hoisted(() => vi.fn())

vi.mock('react-live-ssr', async () => {
  const { createElement, createContext } = (await vi.importActual(
    'react'
  )) as {
    createElement: typeof CreateElement
    createContext: typeof CreateContext
  }

  // Create a mock LiveContext with a trackable onChange
  const MockLiveContext = createContext<{
    onChange: (code: string) => void
  }>({
    onChange: mockLiveContextOnChange,
  })

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
        MockLiveContext.Provider,
        { value: { onChange: mockLiveContextOnChange } },
        createElement('div', { 'data-testid': 'live-provider' }, children)
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
    LiveContext: MockLiveContext,
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
    mockLiveContextOnChange.mockClear()
    mockCopyToClipboard?.mockClear()
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
    // Simulate a block that is NOT in this render tree being in focus mode.
    // Using an unmatched id means neither block below enters focus mode,
    // so ChangeStyleTheme never renders and we avoid pulling in extra mocks.
    vi.spyOn(FocusModeCodeContext, 'useFocusModeCode').mockReturnValue({
      focusModeCodeId: 'some-other-block',
      setFocusModeCodeId: vi.fn(),
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

    // Both blocks see another block in focus mode and suppress their LiveProvider.
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

  it('should assign the focus mode id to the LiveCode wrapper element', () => {
    vi.spyOn(FocusModeCodeContext, 'useFocusModeCode').mockReturnValue({
      focusModeCodeId: null,
      setFocusModeCodeId: vi.fn(),
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <CodeBlock
        reactLive
        scope={{}}
        language="jsx"
        stableName="my-live-block"
      >
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const wrapper = container.querySelector('#my-live-block')
    expect(wrapper).toBeTruthy()
  })

  it('should toggle preview padding in focusmode', () => {
    vi.spyOn(FocusModeCodeContext, 'useFocusModeCode').mockReturnValue({
      focusModeCodeId: 'block-a',
      setFocusModeCodeId: vi.fn(),
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx" stableName="block-a">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const previewBox = container.querySelector('.example-box')
    expect(previewBox).toBeTruthy()
    expect(
      previewBox.classList.contains('showFocusModePaddingStyle')
    ).toBe(true)

    const paddingButton = container.querySelector(
      'button[aria-label="Hide preview padding"]'
    ) as HTMLButtonElement
    expect(paddingButton).toBeTruthy()

    act(() => {
      paddingButton.click()
    })

    expect(
      previewBox.classList.contains('showFocusModePaddingStyle')
    ).toBe(false)

    const showPaddingButton = container.querySelector(
      'button[aria-label="Show preview padding"]'
    ) as HTMLButtonElement
    expect(showPaddingButton).toBeTruthy()

    act(() => {
      showPaddingButton.click()
    })

    expect(
      previewBox.classList.contains('showFocusModePaddingStyle')
    ).toBe(true)
  })

  it('should scroll to top when entering focusmode', () => {
    const scrollTo = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {})

    const mockSetFocusModeCodeId = vi.fn()
    vi.spyOn(FocusModeCodeContext, 'useFocusModeCode').mockReturnValue({
      focusModeCodeId: null,
      setFocusModeCodeId: mockSetFocusModeCodeId,
      savedScrollY: { current: 0 },
    })

    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx" stableName="block-a">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    const focusModeButton = container.querySelector(
      'button[aria-label="Focus mode"]'
    ) as HTMLButtonElement
    expect(focusModeButton).toBeTruthy()

    act(() => {
      focusModeButton.click()
    })

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })
    expect(mockSetFocusModeCodeId).toHaveBeenCalledWith('block-a')
  })

  describe('copy code button', () => {
    it('should render a copy code button', () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[aria-label="Copy code"]'
      )
      expect(copyButton).toBeTruthy()
    })

    it('should copy code to clipboard when clicking copy button', async () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[aria-label="Copy code"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      expect(mockCopyToClipboard).toHaveBeenCalledWith('<div>Hello</div>')
    })

    it('should show "Copied!" label after clicking copy button', async () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[aria-label="Copy code"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      const copiedButton = container.querySelector(
        'button[aria-label="Copied!"]'
      )
      expect(copiedButton).toBeTruthy()
    })

    it('should copy edited code when user has made changes', async () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      // Simulate user editing the code
      act(() => {
        mockLiveEditorOnChange?.('<div>Hello World</div>')
      })

      const copyButton = container.querySelector(
        'button[aria-label="Copy code"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        '<div>Hello World</div>'
      )
    })

    it('should update preview when user edits code', () => {
      render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      expect(mockLiveProviderCode).toBe('<div>Hello</div>')

      // Simulate user editing the code - this should trigger the context's onChange
      // which updates the preview
      act(() => {
        mockLiveEditorOnChange?.('<div>Edited</div>')
      })

      // The context's onChange should have been called to update the preview
      expect(mockLiveContextOnChange).toHaveBeenCalledWith(
        '<div>Edited</div>'
      )
    })

    it('should not show reset button when code has not been edited', () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const resetButton = container.querySelector(
        'button[aria-label="Reset code"]'
      )
      expect(resetButton).toBeNull()
    })

    it('should show reset button when code has been edited', () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      // Simulate user editing the code
      act(() => {
        mockLiveEditorOnChange?.('<div>Edited</div>')
      })

      const resetButton = container.querySelector(
        'button[aria-label="Reset code"]'
      )
      expect(resetButton).toBeTruthy()
    })

    it('should reset code to original when clicking reset button', async () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      // Simulate user editing the code
      act(() => {
        mockLiveEditorOnChange?.('<div>Edited</div>')
      })

      const resetButton = container.querySelector(
        'button[aria-label="Reset code"]'
      ) as HTMLButtonElement

      await act(async () => {
        resetButton.click()
      })

      // After reset, the reset button should be hidden (no edited code)
      const resetButtonAfter = container.querySelector(
        'button[aria-label="Reset code"]'
      )
      expect(resetButtonAfter).toBeNull()

      // Copy should now use original code
      mockCopyToClipboard.mockClear()
      const copyButton = container.querySelector(
        'button[aria-label="Copy code"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      expect(mockCopyToClipboard).toHaveBeenCalledWith('<div>Hello</div>')
    })

    it('should render an open in StackBlitz button', () => {
      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const stackBlitzButton = container.querySelector(
        'button[aria-label="Open in StackBlitz"]'
      )
      expect(stackBlitzButton).toBeTruthy()
    })

    it('should open StackBlitz when clicking the button', async () => {
      const mockSubmit = vi.fn()
      const mockAppendChild = vi.spyOn(document.body, 'appendChild')
      const mockRemoveChild = vi.spyOn(document.body, 'removeChild')

      // Mock HTMLFormElement.prototype.submit
      HTMLFormElement.prototype.submit = mockSubmit

      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const stackBlitzButton = container.querySelector(
        'button[aria-label="Open in StackBlitz"]'
      ) as HTMLButtonElement

      await act(async () => {
        stackBlitzButton.click()
      })

      expect(mockSubmit).toHaveBeenCalled()
      expect(mockAppendChild).toHaveBeenCalled()
      expect(mockRemoveChild).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should generate StackBlitz code with proper Eufemia imports', async () => {
      const submittedFormData: Record<string, string> = {}

      const originalCreateElement = document.createElement.bind(document)
      vi.spyOn(document, 'createElement').mockImplementation(
        (tagName: string) => {
          const element = originalCreateElement(tagName)
          if (tagName === 'form') {
            element.submit = vi.fn(() => {
              // Capture form data
              const inputs = element.querySelectorAll('input')
              inputs.forEach((input: HTMLInputElement) => {
                submittedFormData[input.name] = input.value
              })
            })
          }
          return element
        }
      )

      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {
            '<Button onClick={() => console.log("clicked")}>Click me</Button>'
          }
        </CodeBlock>
      )

      const stackBlitzButton = container.querySelector(
        'button[aria-label="Open in StackBlitz"]'
      ) as HTMLButtonElement

      await act(async () => {
        stackBlitzButton.click()
      })

      const appCode = submittedFormData['project[files][src/App.tsx]']
      expect(appCode).toContain("import { Button } from '@dnb/eufemia'")
      expect(appCode).toContain(
        "import { Provider } from '@dnb/eufemia/shared'"
      )

      vi.restoreAllMocks()
    })

    it('should generate StackBlitz code with React hooks imports', async () => {
      const submittedFormData: Record<string, string> = {}

      const originalCreateElement = document.createElement.bind(document)
      vi.spyOn(document, 'createElement').mockImplementation(
        (tagName: string) => {
          const element = originalCreateElement(tagName)
          if (tagName === 'form') {
            element.submit = vi.fn(() => {
              const inputs = element.querySelectorAll('input')
              inputs.forEach((input: HTMLInputElement) => {
                submittedFormData[input.name] = input.value
              })
            })
          }
          return element
        }
      )

      const codeWithHooks = `function Example() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count)
  }, [count])
  return <Button onClick={() => setCount(c => c + 1)}>{count}</Button>
}`

      const { container } = render(
        <CodeBlock reactLive scope={{}} language="jsx">
          {codeWithHooks}
        </CodeBlock>
      )

      const stackBlitzButton = container.querySelector(
        'button[aria-label="Open in StackBlitz"]'
      ) as HTMLButtonElement

      await act(async () => {
        stackBlitzButton.click()
      })

      const appCode = submittedFormData['project[files][src/App.tsx]']
      expect(appCode).toContain(
        "import { useState, useEffect } from 'react'"
      )
      expect(appCode).toContain("import { Button } from '@dnb/eufemia'")
      // Should wrap function component properly
      expect(appCode).toContain('<Example />')

      vi.restoreAllMocks()
    })
  })
})
