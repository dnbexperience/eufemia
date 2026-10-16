import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import { Response } from '..'

const writeText = vi.fn(() => Promise.resolve())

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText } })
  writeText.mockReset()
  writeText.mockResolvedValue(undefined)
})

describe('Ai.Response', () => {
  it('renders markdown with Eufemia elements', () => {
    render(
      <Response>
        {[
          '# Title',
          '',
          'Text with **bold**, *em*, ~~del~~ and `code`.',
          '',
          '- One',
          '- Two',
          '',
          '1. First',
          '',
          '> Quote',
          '',
          '---',
        ].join('\n')}
      </Response>
    )

    expect(document.querySelector('h1.dnb-h--large')).toHaveTextContent(
      'Title'
    )
    expect(document.querySelector('p.dnb-p strong')).toHaveTextContent(
      'bold'
    )
    expect(document.querySelector('p em')).toHaveTextContent('em')
    expect(document.querySelector('p del')).toHaveTextContent('del')
    expect(document.querySelector('p code.dnb-code')).toHaveTextContent(
      'code'
    )
    expect(document.querySelectorAll('ul.dnb-ul > li')).toHaveLength(2)
    expect(document.querySelector('ol.dnb-ol')).toBeInTheDocument()
    expect(
      document.querySelector('blockquote.dnb-ai-response__blockquote')
    ).toHaveTextContent('Quote')
    expect(document.querySelector('hr.dnb-hr')).toBeInTheDocument()
  })

  it('renders tight list items without paragraphs', () => {
    render(<Response>{'- One\n- Two'}</Response>)
    expect(document.querySelector('li p')).toBeNull()
  })

  it('renders task list items with disabled checkboxes', () => {
    render(<Response>{'- [x] Done\n- [ ] Todo'}</Response>)

    const boxes = document.querySelectorAll<HTMLInputElement>(
      '.dnb-ai-response__task input[type="checkbox"]'
    )
    expect(boxes).toHaveLength(2)
    expect(boxes[0]).toBeChecked()
    expect(boxes[1]).not.toBeChecked()
    expect(boxes[0]).toBeDisabled()
    expect(boxes[0]).toHaveAccessibleName('Done')
  })

  it('renders tables with Eufemia Table and alignment', () => {
    render(<Response>{'| A | B |\n|---|--:|\n| 1 | **2** |'}</Response>)

    expect(document.querySelector('table.dnb-table')).toBeInTheDocument()
    expect(document.querySelectorAll('th')).toHaveLength(2)
    const cell = document.querySelectorAll('td')[1]
    expect(cell.querySelector('strong')).toHaveTextContent('2')
    expect(cell).toHaveStyle({ textAlign: 'right' })
  })

  it('renders code blocks with language and a copy button', async () => {
    render(<Response>{'```ts\nconst a = 1\n```'}</Response>)

    const code = document.querySelector('pre.dnb-pre code')
    expect(code).toHaveClass('language-ts')
    expect(code).not.toHaveClass('dnb-code')
    expect(code).toHaveTextContent('const a = 1')

    const button = document.querySelector('.dnb-ai-response__copy')
    expect(button).toHaveAccessibleName('Kopier kode')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(writeText).toHaveBeenCalledWith('const a = 1')
    expect(button).toHaveAccessibleName('Kopier kode')
    expect(button).toHaveClass('dnb-copy-on-click__button')
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip__content')
      ).toHaveTextContent('Kopiert')
    })
  })

  it('copies the current raw code after a streaming update', async () => {
    const { rerender } = render(
      <Response>{'```ts\nconst a = 1\n```'}</Response>
    )
    await act(async () =>
      fireEvent.click(document.querySelector('.dnb-ai-response__copy'))
    )
    rerender(
      <Response>
        {'```ts\nconst a = 2\n  // Keep indentation\n```'}
      </Response>
    )
    await act(async () =>
      fireEvent.click(document.querySelector('.dnb-ai-response__copy'))
    )
    expect(writeText).toHaveBeenLastCalledWith(
      'const a = 2\n  // Keep indentation'
    )
  })

  it('confirms copying only when the clipboard fallback succeeds', async () => {
    writeText.mockRejectedValueOnce(new Error('Permission denied'))
    const originalExecCommand = document.execCommand
    document.execCommand = vi.fn(() => true)

    try {
      render(<Response>{'```\nx\n```'}</Response>)
      await act(async () =>
        fireEvent.click(document.querySelector('.dnb-ai-response__copy'))
      )
      expect(document.execCommand).toHaveBeenCalledWith('copy')
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-tooltip__content')
        ).toHaveTextContent('Kopiert')
      })
    } finally {
      document.execCommand = originalExecCommand
    }
  })

  it('does not confirm a copy when both clipboard methods fail', async () => {
    writeText.mockRejectedValueOnce(new Error('Permission denied'))
    const originalExecCommand = document.execCommand
    document.execCommand = vi.fn(() => false)

    try {
      render(<Response>{'```ts\nconst a = 1\n```'}</Response>)
      const button = document.querySelector('.dnb-ai-response__copy')
      await act(async () => fireEvent.click(button))

      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(button).toHaveAccessibleName('Kopier kode')
      expect(document.querySelector('.dnb-tooltip')).toBeNull()
    } finally {
      document.execCommand = originalExecCommand
    }
  })

  it('translates the copy button and success confirmation', async () => {
    render(
      <Provider locale="en-GB">
        <Response>{'```\nx\n```'}</Response>
      </Provider>
    )

    const button = document.querySelector('.dnb-ai-response__copy')
    expect(button).toHaveAccessibleName('Copy code')
    await act(async () => fireEvent.click(button))
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip__content')
      ).toHaveTextContent('Copied')
    })
  })

  it('opens external links in a new tab', () => {
    render(
      <Response>{'[DNB](https://dnb.no) and [home](/home)'}</Response>
    )

    const [external, relative] = Array.from(
      document.querySelectorAll('a.dnb-anchor')
    )
    expect(external).toHaveAttribute('href', 'https://dnb.no/')
    expect(external).toHaveAttribute('target', '_blank')
    expect(external).toHaveAttribute('rel', 'noopener noreferrer')
    expect(relative).toHaveAttribute('href', '/home')
    expect(relative).not.toHaveAttribute('target')
  })

  it('renders unsafe links and images as text', () => {
    render(
      <Response>
        {'[click](javascript:alert(1)) ![pic](data:image/png;base64,x)'}
      </Response>
    )

    expect(document.querySelector('a')).toBeNull()
    expect(document.querySelector('img')).toBeNull()
    expect(document.querySelector('p')).toHaveTextContent('click pic')
  })

  it('only allows links and images with allowed prefixes', () => {
    render(
      <Response
        allowedLinkPrefixes={['https://dnb.no']}
        allowedImagePrefixes={['https://cdn.dnb.no']}
      >
        {
          '[ok](https://dnb.no/a) [no](https://evil.com) ![ok](https://cdn.dnb.no/a.png) ![no](https://evil.com/a.png)'
        }
      </Response>
    )

    expect(document.querySelectorAll('a')).toHaveLength(1)
    expect(document.querySelector('a')).toHaveAttribute(
      'href',
      'https://dnb.no/a'
    )
    expect(document.querySelectorAll('img')).toHaveLength(1)
    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      'https://cdn.dnb.no/a.png'
    )
  })

  it('rejects lookalike hosts when link and image prefixes are restricted', () => {
    render(
      <Response
        allowedLinkPrefixes={['https://dnb.no']}
        allowedImagePrefixes={['https://cdn.dnb.no']}
      >
        {
          '[DNB](https://dnb.no.evil.example/path) ![DNB](https://cdn.dnb.no.evil.example/image.png)'
        }
      </Response>
    )

    expect(document.querySelector('a')).toBeNull()
    expect(document.querySelector('img')).toBeNull()
  })

  it('never renders raw HTML', () => {
    render(
      <Response>{'<img src=x onerror="alert(1)"> <b>bold</b>'}</Response>
    )

    expect(document.querySelector('img')).toBeNull()
    expect(document.querySelector('b')).toBeNull()
    expect(document.querySelector('p')).toHaveTextContent(
      '<img src=x onerror="alert(1)"> <b>bold</b>'
    )
  })

  it('supports overriding elements with components', () => {
    const Link = ({ href, children }) => (
      <a className="custom-link" href={href}>
        {children}
      </a>
    )
    const CodeElement = ({ className, children }) => (
      <code className={`custom-code ${className ?? ''}`}>{children}</code>
    )

    render(
      <Response components={{ a: Link, code: CodeElement }}>
        {'[a](https://a.no)\n\n```js\nx\n```'}
      </Response>
    )

    expect(document.querySelector('a.custom-link')).toHaveAttribute(
      'href',
      'https://a.no/'
    )
    expect(document.querySelector('pre code.custom-code')).toHaveClass(
      'language-js'
    )
  })

  it('closes unfinished markdown while streaming', () => {
    const { rerender } = render(<Response>{'Hello **wor'}</Response>)
    expect(document.querySelector('strong')).toHaveTextContent('wor')

    rerender(<Response>{'Hello **world** [docs](https://eu'}</Response>)
    expect(document.querySelector('a')).toBeNull()
    expect(document.querySelector('p')).toHaveTextContent(
      'Hello world docs'
    )

    rerender(
      <Response>
        {'Hello **world** [docs](https://eufemia.dnb.no)'}
      </Response>
    )
    expect(document.querySelector('a')).toHaveAttribute(
      'href',
      'https://eufemia.dnb.no/'
    )
  })

  it('only repairs the last block', () => {
    render(<Response>{'Keep **this\n\nFix **that'}</Response>)

    const [first, last] = Array.from(document.querySelectorAll('p'))
    expect(first).toHaveTextContent('Keep **this')
    expect(last.querySelector('strong')).toHaveTextContent('that')
  })

  it('renders unfinished markdown as is with parseIncompleteMarkdown={false}', () => {
    render(
      <Response parseIncompleteMarkdown={false}>{'Hello **wor'}</Response>
    )
    expect(document.querySelector('strong')).toBeNull()
    expect(document.querySelector('p')).toHaveTextContent('Hello **wor')
  })

  it('does not re-render finished blocks while streaming', () => {
    const renders = vi.fn()
    const Paragraph = ({ children }) => {
      renders(children)
      return <p>{children}</p>
    }
    const components = { p: Paragraph }

    const { rerender } = render(
      <Response components={components}>{'First\n\nSec'}</Response>
    )
    expect(renders).toHaveBeenCalledTimes(2)

    rerender(
      <Response components={components}>{'First\n\nSecond'}</Response>
    )
    expect(renders).toHaveBeenCalledTimes(3)
    expect(renders).toHaveBeenLastCalledWith(['Second'])
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Response top="large" className="custom" aria-label="Answer">
        Text
      </Response>
    )

    const element = document.querySelector('.dnb-ai-response')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('aria-label', 'Answer')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <Response>
        {
          '## Title\n\nText with [link](https://dnb.no).\n\n- [x] Task\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```\ncode\n```'
        }
      </Response>
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai', () => {
  it('exports the expected parts', async () => {
    expect(Object.keys(await import('..')).sort()).toEqual([
      'Action',
      'Actions',
      'ActivityText',
      'AgentAction',
      'Conversation',
      'DateMarker',
      'Info',
      'Message',
      'MessageIndicator',
      'PromptInput',
      'Response',
      'Sources',
      'Suggestion',
      'Suggestions',
      'Tool',
      'Welcome',
      'useConversation',
      'useConversationScrollState',
      'useConversationVisibility',
    ])
  })
})
