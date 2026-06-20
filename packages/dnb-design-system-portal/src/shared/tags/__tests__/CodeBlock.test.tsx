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

// Mock prettier standalone for StackBlitz formatting
const mockFormat = vi.hoisted(() =>
  vi.fn((code: string) => Promise.resolve(code))
)

vi.mock('prettier/standalone', () => ({
  format: mockFormat,
}))

vi.mock('prettier/plugins/babel', () => ({}))
vi.mock('prettier/plugins/estree', () => ({}))

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
  const { createElement, useEffect, useState } = (await vi.importActual(
    'react'
  )) as typeof import('react')

  // Faithfully model the tertiary Accordion + connected content pair backed by
  // an order-independent shared store (mirroring Eufemia's useSharedState). The
  // connected content subscribes to its trigger's expanded state, so it stays
  // in sync even when it renders before the trigger in the tree — as the preview
  // content does, since it sits above the toolbar that holds its toggle.
  const expandedById = new Map<string, boolean>()
  const listenersById = new Map<string, Set<() => void>>()
  const getExpanded = (id: string) => expandedById.get(id) ?? false
  const setExpanded = (id: string, value: boolean) => {
    expandedById.set(id, value)
    listenersById.get(id)?.forEach((notify) => notify())
  }
  const subscribe = (id: string, notify: () => void) => {
    let listeners = listenersById.get(id)
    if (!listeners) {
      listeners = new Set()
      listenersById.set(id, listeners)
    }
    listeners.add(notify)
    return () => {
      listeners?.delete(notify)
    }
  }

  const Accordion = ({
    title,
    expanded,
    onChange,
    id,
    variant: _variant,
    ...rest
  }: any) => {
    if (!expandedById.has(id)) {
      expandedById.set(id, expanded)
    }
    useEffect(() => {
      setExpanded(id, expanded)
    }, [id, expanded])

    return createElement(
      'button',
      {
        type: 'button',
        id,
        'aria-expanded': expanded,
        'aria-controls': `${id}-content`,
        onClick: (event: any) =>
          onChange?.({ expanded: !expanded, event }),
        ...rest,
      },
      title
    )
  }
  const AccordionContent = ({ children, connectedTo, ...rest }: any) => {
    const [, forceRender] = useState(0)
    useEffect(
      () =>
        subscribe(connectedTo, () => forceRender((count) => count + 1)),
      [connectedTo]
    )
    const expanded = getExpanded(connectedTo)

    return createElement(
      'section',
      {
        id: `${connectedTo}-content`,
        'aria-hidden': !expanded,
        ...rest,
      },
      createElement(
        'div',
        { 'data-height-animation-open': expanded },
        expanded ? children : null
      )
    )
  }
  Accordion.Content = AccordionContent

  return {
    Accordion,
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
    it('should render a copy code button with tooltip', () => {
      const { container } = render(
        <CodeBlock language="jsx">{'<div>Hello</div>'}</CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[tooltip="Copy to clipboard"]'
      )
      expect(copyButton).toBeTruthy()
    })

    it('should copy code to clipboard when clicking copy button', async () => {
      const { container } = render(
        <CodeBlock language="jsx">{'<div>Hello</div>'}</CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[tooltip="Copy to clipboard"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      expect(mockCopyToClipboard).toHaveBeenCalledWith('<div>Hello</div>')
    })

    it('should show "Copied!" tooltip after clicking copy button', async () => {
      const { container } = render(
        <CodeBlock language="jsx">{'<div>Hello</div>'}</CodeBlock>
      )

      const copyButton = container.querySelector(
        'button[tooltip="Copy to clipboard"]'
      ) as HTMLButtonElement

      await act(async () => {
        copyButton.click()
      })

      // After clicking, the tooltip should change to "Copied!"
      const copiedButton = container.querySelector(
        'button[tooltip="Copied!"]'
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
        'button[tooltip="Copy to clipboard"]'
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
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(mockSubmit).toHaveBeenCalled()
      expect(mockAppendChild).toHaveBeenCalled()
      expect(mockRemoveChild).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('should set form action to open App.tsx in StackBlitz', async () => {
      let capturedFormAction = ''

      const originalCreateElement = document.createElement.bind(document)
      vi.spyOn(document, 'createElement').mockImplementation(
        (tagName: string) => {
          const element = originalCreateElement(tagName)
          if (tagName === 'form') {
            element.submit = vi.fn(() => {
              capturedFormAction = element.action
            })
          }
          return element
        }
      )

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
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(capturedFormAction).toContain(
        'https://stackblitz.com/run?file=src/App.tsx'
      )

      vi.restoreAllMocks()
    })

    it('should format App.tsx code with prettier', async () => {
      mockFormat.mockClear()

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
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(mockFormat).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          parser: 'babel',
          singleQuote: true,
          semi: false,
        })
      )

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
        <CodeBlock
          reactLive
          scope={{}}
          language="jsx"
          sourceImports={["import { Button } from '@dnb/eufemia'"]}
        >
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
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      const appCode = submittedFormData['project[files][src/App.tsx]']
      expect(appCode).toContain("import { Button } from '@dnb/eufemia'")

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
        <CodeBlock
          reactLive
          scope={{}}
          language="jsx"
          sourceImports={[
            "import { useEffect, useState } from 'react'",
            "import { Button } from '@dnb/eufemia'",
          ]}
        >
          {codeWithHooks}
        </CodeBlock>
      )

      const stackBlitzButton = container.querySelector(
        'button[aria-label="Open in StackBlitz"]'
      ) as HTMLButtonElement

      await act(async () => {
        stackBlitzButton.click()
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      const appCode = submittedFormData['project[files][src/App.tsx]']
      expect(appCode).toContain(
        "import { useEffect, useState } from 'react'"
      )
      expect(appCode).toContain("import { Button } from '@dnb/eufemia'")
      // Should wrap function component properly
      expect(appCode).toContain('<Example />')

      vi.restoreAllMocks()
    })
  })

  describe('Show/Hide Code toggle (omitWrapper)', () => {
    it('should wire aria-controls and aria-expanded to the code content section', () => {
      const { container } = render(
        <CodeBlock
          reactLive
          omitWrapper
          hideCode
          scope={{}}
          language="jsx"
        >
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const toggle = container.querySelector(
        'button[aria-controls]'
      ) as HTMLButtonElement
      expect(toggle).toBeTruthy()

      const contentId = toggle.getAttribute('aria-controls')
      const content = container.querySelector(`#${contentId}`)
      expect(content).toBeTruthy()

      // Collapsed by default when hideCode is set
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(content.getAttribute('aria-hidden')).toBe('true')

      const heightAnimation = content.querySelector(
        '[data-height-animation-open]'
      )
      expect(
        heightAnimation.getAttribute('data-height-animation-open')
      ).toBe('false')
    })

    it('should toggle the aria state and HeightAnimation open prop on click', () => {
      const { container } = render(
        <CodeBlock
          reactLive
          omitWrapper
          hideCode
          scope={{}}
          language="jsx"
        >
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const toggle = container.querySelector(
        'button[aria-controls]'
      ) as HTMLButtonElement
      const contentId = toggle.getAttribute('aria-controls')
      const content = container.querySelector(`#${contentId}`)

      act(() => {
        toggle.click()
      })

      // Expanded: aria state flips and the editor is animated open
      expect(toggle.getAttribute('aria-expanded')).toBe('true')
      expect(content.getAttribute('aria-hidden')).toBe('false')
      expect(
        content
          .querySelector('[data-height-animation-open]')
          .getAttribute('data-height-animation-open')
      ).toBe('true')

      act(() => {
        toggle.click()
      })

      // Collapsed again
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(content.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('Show/Hide Code toggle (standard wrapper)', () => {
    it('should render the code toggle as an accordion alongside the preview', () => {
      const { container } = render(
        <CodeBlock reactLive hideCode scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      // The preview stays visible while the code is collapsed behind a toggle
      expect(
        container.querySelector('[data-testid="live-preview"]')
      ).toBeTruthy()

      const toggle = container.querySelector(
        'button[aria-controls]'
      ) as HTMLButtonElement
      expect(toggle).toBeTruthy()
      expect(toggle.textContent).toContain('Code')

      const contentId = toggle.getAttribute('aria-controls')
      const content = container.querySelector(`#${contentId}`)
      expect(content).toBeTruthy()

      // Collapsed by default when hideCode is set
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(content.getAttribute('aria-hidden')).toBe('true')
      expect(
        content.querySelector('[data-testid="live-editor"]')
      ).toBeNull()

      // Expanding reveals the editor
      act(() => {
        toggle.click()
      })

      expect(toggle.getAttribute('aria-expanded')).toBe('true')
      expect(content.getAttribute('aria-hidden')).toBe('false')
      expect(
        content.querySelector('[data-testid="live-editor"]')
      ).toBeTruthy()
    })

    it('should render the editor directly without a toggle when the toolbar is hidden', () => {
      const { container } = render(
        <CodeBlock reactLive hideToolbar scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      // No toolbar, so no accordion toggle is rendered
      expect(container.querySelector('.dnb-live-toolbar')).toBeNull()
      expect(container.querySelector('button[aria-controls]')).toBeNull()

      // The editor renders directly (not wrapped in an Accordion.Content region)
      expect(
        container.querySelector('[data-testid="live-editor"]')
      ).toBeTruthy()
    })
  })

  describe('Preview toggle', () => {
    it('should wire aria-controls to the preview content section', () => {
      const { container } = render(
        <CodeBlock reactLive hidePreview scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const toggle = container.querySelector(
        'button[aria-controls]'
      ) as HTMLButtonElement
      expect(toggle).toBeTruthy()
      expect(toggle.textContent).toContain('Preview')

      const contentId = toggle.getAttribute('aria-controls')
      const content = container.querySelector(`#${contentId}`)
      expect(content).toBeTruthy()

      // Hidden by default when hidePreview is set
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(content.getAttribute('aria-hidden')).toBe('true')
      expect(
        content
          .querySelector('[data-height-animation-open]')
          .getAttribute('data-height-animation-open')
      ).toBe('false')
    })

    it('should toggle the preview aria state and HeightAnimation open prop on click', () => {
      const { container } = render(
        <CodeBlock reactLive hidePreview scope={{}} language="jsx">
          {'<div>Hello</div>'}
        </CodeBlock>
      )

      const toggle = container.querySelector(
        'button[aria-controls]'
      ) as HTMLButtonElement
      const contentId = toggle.getAttribute('aria-controls')
      const content = container.querySelector(`#${contentId}`)

      act(() => {
        toggle.click()
      })

      // Visible: aria state flips and the preview is animated open
      expect(toggle.getAttribute('aria-expanded')).toBe('true')
      expect(content.getAttribute('aria-hidden')).toBe('false')
      expect(
        content
          .querySelector('[data-height-animation-open]')
          .getAttribute('data-height-animation-open')
      ).toBe('true')

      act(() => {
        toggle.click()
      })

      // Hidden again
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(content.getAttribute('aria-hidden')).toBe('true')
    })
  })
})
