/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, act } from '@testing-library/react'

// Mock CSS modules
jest.mock('../CodeBlock.module.scss', () => ({
  liveCodeEditorStyle: 'liveCodeEditorStyle',
  toolbarStyle: 'toolbarStyle',
  codeBlockStyle: 'codeBlockStyle',
  whiteBackgroundStyle: 'whiteBackgroundStyle',
}))

// Mock prism theme
jest.mock(
  '@dnb/eufemia/src/style/themes/ui/prism/dnb-prism-theme',
  () => ({
    plain: { color: '#000', backgroundColor: '#fff' },
    styles: [],
  })
)

// Mock Tag
jest.mock('../Tag', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: (props: any) => {
      const { children, ...rest } = props
      return React.createElement('pre', rest, children)
    },
  }
})

// Mock skeleton helper
jest.mock('@dnb/eufemia/src/components/skeleton/SkeletonHelper', () => ({
  createSkeletonClass: () => '',
}))

// Mock Eufemia components
jest.mock('@dnb/eufemia/src/components', () => {
  const React = require('react')
  return {
    Button: ({ text, onClick, ...rest }: any) =>
      React.createElement('button', { onClick, ...rest }, text),
    Space: ({ children, innerRef, ...rest }: any) =>
      React.createElement('div', { ref: innerRef, ...rest }, children),
  }
})

// Mock makeUniqueId
jest.mock('@dnb/eufemia/src/shared/component-helper', () => ({
  makeUniqueId: () => 'test-id',
}))

// Mock Context
jest.mock('@dnb/eufemia/src/shared', () => {
  const React = require('react')
  return {
    Context: React.createContext({}),
  }
})

// Store the latest LiveEditor onChange and LiveProvider code for assertions
let mockLiveEditorOnChange: ((code: string) => void) | undefined
let mockLiveProviderCode: string | undefined

jest.mock('react-live-ssr', () => {
  const React = require('react')
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
  beforeEach(() => {
    mockLiveEditorOnChange = undefined
    mockLiveProviderCode = undefined
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
    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'   '}
      </CodeBlock>
    )

    expect(container.textContent).toContain('No Code provided')
  })

  it('should not show "No Code provided" when user clears the editor', () => {
    const { container } = render(
      <CodeBlock reactLive scope={{}} language="jsx">
        {'<div>Hello</div>'}
      </CodeBlock>
    )

    expect(container.textContent).not.toContain('No Code provided')

    // Simulate user clearing all code in the live editor
    act(() => {
      mockLiveEditorOnChange?.('')
    })

    expect(container.textContent).not.toContain('No Code provided')
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
})
