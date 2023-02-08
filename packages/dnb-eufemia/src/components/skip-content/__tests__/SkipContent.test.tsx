import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { wait } from '@testing-library/user-event/dist/utils'
import SkipContent from '../SkipContent'
import Section from '../../Section'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'

describe('SkipContent', () => {
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

  it('should have aria-hidden on button', () => {
    render(
      <>
        <SkipContent selector="#unique-id" text="Text" />
        <Section id="unique-id">content</Section>
      </>
    )

    const element = document.querySelector('.dnb-skip-content')
    expect(
      (element.childNodes[0] as HTMLButtonElement).hasAttribute(
        'aria-hidden'
      )
    ).toBeTruthy()
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
        "aria-hidden": "true",
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

  it('should show button and set focus on content element', () => {
    render(
      <>
        <SkipContent selector="#unique-id">Aria</SkipContent>
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

    expect(element.querySelector('button.dnb-sr-only')).toBeFalsy()

    // 2. make focus action
    fireEvent.click(element.querySelector('.dnb-button'))

    expect(element.querySelector('.dnb-button')).toBeFalsy()
    expect(document.activeElement.tagName).toBe('SECTION')
  })

  it('should hide button when pressing tab key two times (blur second button)', async () => {
    render(
      <>
        <SkipContent selector="#unique-id">Aria</SkipContent>
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

    await wait(10) // because of requestAnimationFrame
    expect(document.activeElement.tagName).toBe('BUTTON')

    // 2. blur the event
    fireEvent.blur(element.querySelector('.dnb-button'))

    expect(element.querySelector('.dnb-button')).toBeFalsy()
    expect(document.activeElement.tagName).toBe('BODY')
  })

  it('should validate axe test', async () => {
    const Component = render(
      <>
        <SkipContent selector="#unique-id">Aria</SkipContent>
        <Section id="unique-id">content</Section>
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
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
