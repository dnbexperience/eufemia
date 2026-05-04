import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterAll,
} from 'vitest'
import React, { act } from 'react'
import { render } from '@testing-library/react'

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
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const React = await vi.importActual<typeof import('react')>('react')
  return {
    default: (props: any) => {
      const { children, ...rest } = props
      return React.createElement('pre', rest, children)
    },
  }
})

// Mock skeleton helper
vi.mock('@dnb/eufemia/src/components/skeleton/SkeletonHelper', () => ({
  createSkeletonClass: () => '',
}))

// Mock Eufemia components
vi.mock('@dnb/eufemia/src/components', async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const React = await vi.importActual<typeof import('react')>('react')
  return {
    Button: ({ text, onClick, ...rest }: any) =>
      React.createElement('button', { onClick, ...rest }, text),
    Checkbox: ({ label, checked, onChange, ...rest }: any) =>
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'checkbox',
          checked,
          onChange: (event: any) =>
            onChange?.({ checked: event.target.checked }),
          ...rest,
        }),
        label
      ),
    Space: ({ children, ref, ...rest }: any) =>
      React.createElement('div', { ref: ref, ...rest }, children),
    ToggleButton: ({ children, checked, onChange, ...rest }: any) =>
      React.createElement(
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
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const React = await vi.importActual<typeof import('react')>('react')
  return {
    Context: React.createContext({}),
  }
})

// Store the latest LiveEditor onChange and LiveProvider code for assertions
let mockLiveEditorOnChange: ((code: string) => void) | undefined
let mockLiveProviderCode: string | undefined

vi.mock('react-live-ssr', async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const React = await vi.importActual<typeof import('react')>('react')
  return {
    LiveProvider: ({
      children,
      code,
    }: {
      children: React.ReactNode
      code: string
      [key: string]: unknown
    }) => {
      mockLiveProviderCode = code
      return React.createElement(
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
      return React.createElement('div', {
        'data-testid': 'live-editor',
        contentEditable: true,
      })
    },
    LiveError: () => null,
    LivePreview: ({ ...rest }: Record<string, unknown>) =>
      React.createElement('div', {
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
})
