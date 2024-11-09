import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../HelpButtonInline'

describe('HelpButtonInline', () => {
  it('should render without title and content', () => {
    render(<HelpButtonInline help={{ open: true }} />)
    expect(
      document.querySelector('.dnb-help-button__content')
    ).toBeInTheDocument()
  })

  it('should toggle open state when clicked', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')

    await userEvent.click(button)
    expect(button).toHaveClass('dnb-help-button__inline--open')

    await userEvent.click(button)
    expect(button).not.toHaveClass('dnb-help-button__inline--open')
  })

  it('should toggle open state when key pressed', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')

    await userEvent.type(button, '{Enter}')
    expect(button).toHaveClass('dnb-help-button__inline--open')

    await userEvent.type(button, '{Space}')
    expect(button).not.toHaveClass('dnb-help-button__inline--open')
  })

  it('should display title when open', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')
    expect(
      document.querySelector('.dnb-help-button__content')
    ).not.toBeInTheDocument()

    await userEvent.click(button)
    expect(
      document.querySelector('.dnb-help-button__content')
    ).toHaveTextContent('Help title')
  })

  it('should respect size props', () => {
    render(<HelpButtonInline size="large" />)

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--icon-size-medium')
  })

  it('should not render content when contentId was given', () => {
    render(
      <HelpButtonInline
        contentId="unique"
        help={{ open: true, title: 'Help title' }}
      />
    )

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).not.toBeInTheDocument()
  })

  it('should have aria-controls attribute', () => {
    render(
      <>
        <HelpButtonInline
          contentId="unique"
          help={{ open: true, title: 'Help title' }}
        />
        <HelpButtonInlineContent contentId="unique" />
      </>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-controls', 'unique-content')
    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveAttribute('id', 'unique-content')
  })

  it('should have aria-label attribute', () => {
    render(<HelpButtonInline help={{ open: true, title: 'Help title' }} />)

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveAttribute('aria-label', 'Help title')
  })

  it('should have aria-label attribute when title is HTML', () => {
    render(
      <HelpButtonInline
        help={{
          open: true,
          title: <span>Help title</span>,
        }}
      />
    )

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveAttribute('aria-label', 'Help title')
  })

  it('should support HTML as title and content', () => {
    render(
      <HelpButtonInline
        help={{
          open: true,
          title: <span>Help title</span>,
          content: <span>Some content</span>,
        }}
      />
    )

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
        .innerHTML
    ).toContain(`<span>Help title</span>`)

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
        .innerHTML
    ).toContain(`<span>Some content</span>`)
  })

  it('should render dialog when renderAs is "dialog"', async () => {
    render(
      <HelpButtonInline
        help={{ renderAs: 'dialog', title: 'Dialog Title' }}
      />
    )

    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-help-button__content')
    ).not.toBeInTheDocument()
  })

  it('should set focus on the content when open', async () => {
    render(<HelpButtonInline help={{ title: 'Dialog Title' }} />)

    expect(document.body).toHaveFocus()

    await userEvent.click(document.querySelector('button'))
    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveFocus()

    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('button')).toHaveFocus()

    await userEvent.click(document.querySelector('button'))
    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveFocus()
  })

  it('should not set focus on the content when open', async () => {
    render(
      <HelpButtonInline help={{ open: true, title: 'Dialog Title' }} />
    )

    expect(document.body).toHaveFocus()

    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('button')).toHaveFocus()

    await userEvent.click(document.querySelector('button'))
    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveFocus()
  })
})

describe('HelpButtonInlineContent Component', () => {
  it('should render content when open', () => {
    render(
      <HelpButtonInlineContent
        contentId="test-content"
        help={{
          open: true,
          content: 'Some content',
        }}
      />
    )

    expect(
      document.querySelector('.dnb-help-button__content')
    ).toBeInTheDocument()
  })

  it('should have tabindex with -1', () => {
    render(
      <HelpButtonInlineContent
        contentId="test-content"
        help={{
          open: true,
          content: 'Some content',
        }}
      />
    )

    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveAttribute('tabindex', '-1')
  })

  it('should not render content when closed', () => {
    render(<HelpButtonInlineContent contentId="test-content" />)

    expect(
      document.querySelector('.dnb-help-button__content')
    ).not.toBeInTheDocument()
  })

  it('should respect spacing props', () => {
    render(
      <HelpButtonInlineContent
        contentId="test-content"
        help={{ open: true }}
        top="large"
        bottom="small"
      />
    )

    expect(document.querySelector('.dnb-section')).toHaveClass(
      'dnb-space__top--large'
    )
  })
})
