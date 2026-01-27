import React from 'react'
import { render, screen } from '@testing-library/react'
import renderWithFormatting from '../renderWithFormatting'
import useTranslation from '../useTranslation'
import Provider from '../Provider'
import { Field, Form } from '../../extensions/forms'

const renderNode = (node: React.ReactNode) =>
  render(<output>{node}</output>)

describe('renderWithFormatting', () => {
  it('should render plain text without changes', () => {
    const { container } = renderNode(renderWithFormatting('Hello world'))
    expect(container.textContent).toBe('Hello world')
  })

  it('inserts <br> for {br} tokens', () => {
    const { container } = renderNode(
      renderWithFormatting('Line A{br}Line B{br}Line C')
    )
    const brs = document.querySelectorAll('br')
    expect(brs.length).toBe(2)
    expect(container.textContent).toBe('Line ALine BLine C')
  })

  it('should support custom br', () => {
    const { container } = renderNode(
      renderWithFormatting('A~B~C', { br: '~' })
    )
    expect(document.querySelectorAll('br').length).toBe(2)
    expect(container.textContent).toBe('ABC')
  })

  it('formats bold syntax using **text**', () => {
    renderNode(renderWithFormatting('A **bold** move'))
    const strong = screen.getByText('bold')
    expect(strong.tagName.toLowerCase()).toBe('strong')
  })

  it('formats italic syntax using _text_', () => {
    renderNode(renderWithFormatting('Some _emphasis_ here'))
    const em = screen.getByText('emphasis')
    expect(em.tagName.toLowerCase()).toBe('em')
  })

  it('should handle combined formatting and line breaks', () => {
    const { container } = renderNode(
      renderWithFormatting('**Bold** then _italic_{br}next line')
    )
    expect(document.querySelectorAll('strong').length).toBe(1)
    expect(document.querySelectorAll('em').length).toBe(1)
    expect(document.querySelectorAll('br').length).toBe(1)
    expect(container.textContent).toBe('Bold then italicnext line')
  })

  it('should support custom wrappers for strong and em', () => {
    const { container } = renderNode(
      renderWithFormatting('**B** and _I_', {
        strong: (c) => <b data-testid="custom-strong">{c}</b>,
        em: (c) => <i data-testid="custom-em">{c}</i>,
      })
    )
    expect(screen.getByTestId('custom-strong').tagName.toLowerCase()).toBe(
      'b'
    )
    expect(screen.getByTestId('custom-em').tagName.toLowerCase()).toBe('i')
    expect(container.textContent).toBe('B and I')
  })

  it('accepts array input with strings and nodes', () => {
    const nodes = renderWithFormatting(['A', '{br}', 'B'])
    const { container } = renderNode(nodes)
    expect(document.querySelectorAll('br').length).toBe(1)
    expect(container.textContent).toBe('AB')
  })

  it('parses markdown-like links', () => {
    const text = 'Go to [DNB](https://www.dnb.no) today'
    renderNode(renderWithFormatting(text))
    const a = document.querySelector('a') as HTMLAnchorElement
    expect(a).toBeTruthy()
    expect(a.textContent).toBe('DNB')
    expect(a.getAttribute('href')).toBe('https://www.dnb.no')
  })

  it('should support formatting inside link labels', () => {
    const text = 'Click [**here**](https://example.com)'
    renderNode(renderWithFormatting(text))
    const a = document.querySelector('a') as HTMLAnchorElement
    expect(a).toBeTruthy()
    expect(a.querySelector('strong')?.textContent).toBe('here')
    expect(a.getAttribute('href')).toBe('https://example.com')
  })

  it('should support URLs https:// without label', () => {
    const text = 'Go to https://example.com now'
    renderNode(renderWithFormatting(text))
    const a = document.querySelector('a') as HTMLAnchorElement
    expect(a).toBeTruthy()
    expect(a.textContent).toBe('https://example.com')
    expect(a.getAttribute('href')).toBe('https://example.com')
  })

  it('returns fragment with key="renderWithFormatting"', () => {
    const node = renderWithFormatting('`Test`')
    expect(React.isValidElement(node)).toBe(true)
    expect((node as React.ReactElement).key).toBe('renderWithFormatting')
  })

  it('should not produce React key warnings for generated fragments', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    const text = [
      'A{br}B{br}C ',
      '**b1** **b2** ',
      '_i1_ _i2_ ',
      '[x](https://x.example) [y](https://y.example) ',
      '`c1` `c2` ',
      'https://a.example https://b.example',
    ].join('')

    renderNode(renderWithFormatting(text))

    const keyWarnings = spy.mock.calls.filter((args) =>
      args.some(
        (a) => typeof a === 'string' && a.includes('unique "key" prop')
      )
    )
    expect(keyWarnings.length).toBe(0)

    spy.mockRestore()
  })

  it('formats inline code using backticks', () => {
    const text = 'Use `const x = 1` inline'
    renderNode(renderWithFormatting(text))
    expect(document.querySelector('code')).toBeTruthy()
    expect(document.querySelector('code').textContent).toBe('const x = 1')
  })

  it('should not format tokens inside inline code', () => {
    const text = 'This is `**not bold** and _not italic_` example'
    renderNode(renderWithFormatting(text))
    expect(document.querySelector('code')).toBeTruthy()
    expect(document.querySelector('code').textContent).toBe(
      '**not bold** and _not italic_'
    )
    expect(document.querySelector('strong')).toBeNull()
    expect(document.querySelector('em')).toBeNull()
  })

  it('should be able to be used in Eufemia Forms Field labels', () => {
    render(
      <Field.String
        label={renderWithFormatting(
          'A label with `code` and a **bold** text and a link: [DNB](https://www.dnb.no)'
        )}
      />
    )

    expect(
      document.querySelector('.dnb-forms-field-block__label__content')
        .innerHTML
    ).toMatchInlineSnapshot(
      `"A label with <code class="dnb-code">code</code> and a <strong>bold</strong> text and a link: <a class="dnb-anchor dnb-anchor--was-node dnb-a" href="https://www.dnb.no" rel="noopener noreferrer">DNB</a>"`
    )
  })

  it('should not format when markers are not closed', () => {
    const cases = [
      'Start **bold only',
      'Some _italic only',
      'Backtick `code only',
      'Broken [link](example.com',
    ]

    cases.forEach((text) => {
      const { container } = renderNode(renderWithFormatting(text))
      expect(container.querySelector('strong')).toBeNull()
      expect(container.querySelector('em')).toBeNull()
      expect(container.querySelector('code')).toBeNull()
      expect(container.querySelector('a')).toBeNull()
      expect(container.textContent).toBe(text)
    })
  })

  it('useTranslation with shared Provider and renderWithFormatting', () => {
    const translations = {
      'en-GB': {
        'Info.formatted':
          'Use **bold** and _italic_ with a {br}line-break and `code` and a [link](https://www.dnb.no)',
      },
    }

    type T = (typeof translations)['en-GB']

    const Comp = () => {
      const t = useTranslation<T>()
      return <>{renderWithFormatting(t.Info.formatted)}</>
    }

    render(
      <Provider translations={translations} locale="en-GB">
        <Comp />
      </Provider>
    )

    expect(document.querySelectorAll('strong').length).toBe(1)
    expect(document.querySelectorAll('em').length).toBe(1)
    expect(document.querySelectorAll('br').length).toBe(1)
    expect(document.querySelectorAll('code').length).toBe(1)
    expect(document.querySelector('a').getAttribute('href')).toBe(
      'https://www.dnb.no'
    )
    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          Use 
          <strong>
            bold
          </strong>
           and 
          <em>
            italic
          </em>
           with a 
          <br />
          line-break and 
          <code
            class="dnb-code"
          >
            code
          </code>
           and a 
          <a
            class="dnb-anchor dnb-anchor--was-node dnb-a"
            href="https://www.dnb.no"
            rel="noopener noreferrer"
          >
            link
          </a>
        </div>
      </body>
    `)
  })

  it('Form.useTranslation with Form.Handler and renderWithFormatting', () => {
    const translations = {
      'en-GB': {
        'Field.info':
          'Fill out the **form** and _submit_ {br}when `ready` with a [link](https://example.com)',
      },
    }

    type T = (typeof translations)['en-GB']

    const Comp = () => {
      const t = Form.useTranslation<T>()
      return <>{renderWithFormatting(t.Field.info)}</>
    }

    render(
      <Form.Handler translations={translations} locale="en-GB">
        <Comp />
      </Form.Handler>
    )

    expect(document.querySelectorAll('strong').length).toBe(1)
    expect(document.querySelectorAll('em').length).toBe(1)
    expect(document.querySelectorAll('br').length).toBe(1)
    expect(document.querySelectorAll('code').length).toBe(1)
    expect(document.querySelector('a').getAttribute('href')).toBe(
      'https://example.com'
    )
    expect(document.querySelector('form')).toMatchInlineSnapshot(`
      <form
        class="dnb-space dnb-forms-form"
      >
        Fill out the 
        <strong>
          form
        </strong>
         and 
        <em>
          submit
        </em>
         
        <br />
        when 
        <code
          class="dnb-code"
        >
          ready
        </code>
         with a 
        <a
          class="dnb-anchor dnb-anchor--was-node dnb-a"
          href="https://example.com"
          rel="noopener noreferrer"
        >
          link
        </a>
      </form>
    `)
  })
})
