import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import SkipContent, { SkipContentAllProps } from '../SkipContent'
import Section from '../../Section'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'

describe('SkipContent', () => {
  it('renders with properties as object', () => {
    const props: SkipContentAllProps = { selector: '#unique-id' }
    render(
      <>
        <SkipContent {...props} />
        <Section id="unique-id">content</Section>
      </>
    )

    expect(document.querySelector('.dnb-skip-content')).toBeInTheDocument()
  })

  it('should have one button child with dnb-sr-only class', () => {
    render(
      <>
        <SkipContent selector="#unique-id" text="Text" />
        <Section id="unique-id">content</Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')
    expect(element.childNodes).toHaveLength(1)
    expect((element.childNodes[0] as HTMLButtonElement).className).toBe(
      'dnb-sr-only'
    )
    expect((element.childNodes[0] as HTMLButtonElement).tagName).toBe(
      'BUTTON'
    )
  })

  it('should have no aria-hidden on button', () => {
    render(
      <>
        <SkipContent selector="#unique-id" text="Text" />
        <Section id="unique-id">content</Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')
    expect(element.childNodes[0] as HTMLButtonElement).not.toHaveAttribute(
      'aria-hidden'
    )
  })

  it('should have a certain amount of attributes on button', () => {
    render(
      <>
        <SkipContent selector="#unique-id" text="Text" />
        <Section id="unique-id">content</Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')
    expect((element.childNodes[0] as HTMLButtonElement).attributes)
      .toMatchInlineSnapshot(`
      NamedNodeMap {
        "class": "dnb-sr-only",
      }
    `)
  })

  it('should have given text in DOM', () => {
    render(
      <>
        <SkipContent
          selector="#unique-id"
          text="Skip table with enter key – or continue tabbing"
        />
        <Section id="unique-id">content</Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')
    expect(element.textContent).toBe(
      'Skip table with enter key – or continue tabbing'
    )
  })

  it('should show button and set focus on content element', async () => {
    render(
      <>
        <SkipContent selector="#unique-id" focusDelay={1}>
          Aria
        </SkipContent>
        <Section id="unique-id">content</Section>
      </>
    )

    expect(document.activeElement.tagName).toBe('BODY')

    const element = document.querySelector('.dnb-skip-content')

    // 1. make it visible
    fireEvent.keyUp(element.querySelector('button.dnb-sr-only'), {
      key: 'Tab',
      keyCode: 'Tab',
    })

    expect(
      element.querySelector('button.dnb-sr-only')
    ).not.toBeInTheDocument()

    // 2. make focus action
    fireEvent.click(element.querySelector('.dnb-button'))

    await waitFor(() => {
      expect(document.activeElement.tagName).toBe('SECTION')
    })
    expect(element.querySelector('.dnb-button')).not.toBeInTheDocument()
    expect(document.activeElement.classList).toContain(
      'dnb-skip-content__focus'
    )
  })

  it('should hide button when pressing tab key two times (blur second button)', async () => {
    render(
      <>
        <SkipContent selector="#unique-id" focusDelay={1}>
          Aria
        </SkipContent>
        <Section id="unique-id">content</Section>
      </>
    )

    expect(document.activeElement.tagName).toBe('BODY')

    const element = document.querySelector('.dnb-skip-content')

    // 1. make it visible
    fireEvent.keyUp(element.querySelector('button.dnb-sr-only'), {
      key: 'Tab',
      keyCode: 'Tab',
    })

    await waitFor(() => {
      // because of requestAnimationFrame
      expect(document.activeElement.tagName).toBe('BUTTON')
    })

    // 2. blur the event
    fireEvent.blur(element.querySelector('.dnb-button'))

    expect(element.querySelector('.dnb-button')).not.toBeInTheDocument()
    expect(document.activeElement.tagName).toBe('BODY')
  })

  it('should validate axe test', async () => {
    const Component = render(
      <>
        <SkipContent selector="#unique-id">Aria</SkipContent>
        <Section id="unique-id">
          <SkipContent.Return selector="#unique-id">
            return
          </SkipContent.Return>
          content
        </Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')

    // make it visible
    fireEvent.keyUp(element.querySelector('button.dnb-sr-only'), {
      key: 'Tab',
      keyCode: 'Tab',
    })

    expect(await axeComponent(Component)).toHaveNoViolations()
  })

  it('scss has to match snapshot', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})

describe('SkipContent.Return', () => {
  it('should show button and set focus on content element', async () => {
    render(
      <>
        <SkipContent selector="#unique-id" focusDelay={1}>
          Aria
        </SkipContent>
        <Section id="unique-id">
          <SkipContent.Return selector="#unique-id" focusDelay={1}>
            return
          </SkipContent.Return>
          content
        </Section>
      </>
    )

    expect(document.activeElement.tagName).toBe('BODY')

    const element = document.querySelector('.dnb-skip-content')

    // 1. make it visible
    fireEvent.keyUp(element.querySelector('button.dnb-sr-only'), {
      key: 'Tab',
      keyCode: 'Tab',
    })

    expect(
      element.querySelector('button.dnb-sr-only')
    ).not.toBeInTheDocument()

    // 2. make focus action
    fireEvent.click(element.querySelector('.dnb-button'))

    await waitFor(() => {
      expect(document.activeElement.tagName).toBe('SECTION')
      expect(element.querySelector('.dnb-button')).not.toBeInTheDocument()
      expect(document.activeElement.classList).toContain(
        'dnb-skip-content__focus'
      )
    })

    const section = document.querySelector('#unique-id')

    // 3. make "return" visible
    fireEvent.keyUp(section.querySelector('button.dnb-sr-only'), {
      key: 'Tab',
      keyCode: 'Tab',
    })

    expect(
      section.querySelector('button.dnb-sr-only')
    ).not.toBeInTheDocument()

    // 4. make focus action
    fireEvent.click(section.querySelector('.dnb-button'))

    await waitFor(() => {
      expect(document.activeElement.tagName).toBe('BUTTON')
      expect(section.querySelector('.dnb-button')).not.toBeInTheDocument()
      expect(
        // First parent is HeightAnimation, second is span.dnb-skip-content
        document.activeElement.parentElement.parentElement.getAttribute(
          'id'
        )
      ).toBe('unique-id--alias')
    })
  })
})
