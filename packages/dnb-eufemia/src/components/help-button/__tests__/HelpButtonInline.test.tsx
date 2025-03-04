import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../shared/component-helper'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../HelpButtonInline'

describe('HelpButtonInline', () => {
  let uniqueId = null

  beforeEach(() => {
    uniqueId = makeUniqueId()
  })

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

  it('should toggle open state when Space key gets pressed', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    expect(document.body).toHaveFocus()

    await userEvent.tab()
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).not.toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.type(document.querySelector('button'), '{Space}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).toHaveClass(
        'dnb-help-button__inline--open'
      )
    })

    await userEvent.keyboard('{Space}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()

      // Will not close when Space is pressed
      expect(document.querySelector('button')).toHaveClass(
        'dnb-help-button__inline--open'
      )
    })
  })

  it('should toggle open state when Enter key gets pressed', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    expect(document.body).toHaveFocus()

    await userEvent.tab()
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).not.toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).toHaveClass(
        'dnb-help-button__inline--open'
      )
    })

    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).not.toHaveClass(
        'dnb-help-button__inline--open'
      )
    })
  })

  it('should set focus on the button when closing with Escape key', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    expect(document.body).toHaveFocus()

    await userEvent.tab()
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).not.toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.keyboard('{Enter}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).toHaveClass(
        'dnb-help-button__inline--open'
      )
    })

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).not.toHaveClass(
        'dnb-help-button__inline--open'
      )
    })
  })

  describe('focusWhenOpen', () => {
    it('should set focus on the button when closing with Escape key', async () => {
      render(
        <HelpButtonInline focusWhenOpen help={{ title: 'Help title' }} />
      )

      expect(document.body).toHaveFocus()

      await userEvent.tab()
      expect(document.querySelector('button')).toHaveFocus()

      await userEvent.keyboard('{Enter}')
      await waitFor(() => {
        expect(document.querySelector('section')).toHaveFocus()
      })

      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(document.querySelector('button')).toHaveFocus()
      })
    })

    it('should set focus on the content when open', async () => {
      render(
        <HelpButtonInline focusWhenOpen help={{ title: 'Help title' }} />
      )

      expect(document.body).toHaveFocus()

      await userEvent.click(document.querySelector('button'))
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-help-button__content .dnb-section')
        ).toHaveFocus()
      })

      await userEvent.click(document.querySelector('button'))
      expect(document.querySelector('button')).toHaveFocus()

      await userEvent.click(document.querySelector('button'))
      await waitFor(() => {
        const section = document.querySelector(
          '.dnb-help-button__content .dnb-section'
        )
        expect(section).toHaveFocus()
        expect(section).toHaveClass('dnb-no-focus')
      })
    })

    it('should not set focus on the content when open is true', async () => {
      render(
        <HelpButtonInline
          focusWhenOpen
          help={{ open: true, title: 'Help title' }}
        />
      )

      expect(document.body).toHaveFocus()

      await userEvent.click(document.querySelector('button'))
      expect(document.querySelector('button')).toHaveFocus()

      await userEvent.click(document.querySelector('button'))
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-help-button__content .dnb-section')
        ).toHaveFocus()
      })
    })

    it('should have tabindex with -1', () => {
      render(
        <HelpButtonInlineContent
          focusWhenOpen
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

    it('should have aria-label attribute when title is HTML', () => {
      render(
        <HelpButtonInline
          focusWhenOpen
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

    it('should have aria-label attribute', () => {
      render(
        <HelpButtonInline
          focusWhenOpen
          help={{ open: true, title: 'Help title' }}
        />
      )

      expect(
        document.querySelector('.dnb-help-button__content .dnb-section')
      ).toHaveAttribute('aria-label', 'Help title')
    })

    it('should not have aria-live when focusWhenOpen is true', () => {
      render(
        <HelpButtonInline
          focusWhenOpen
          help={{ open: true, title: 'Help title' }}
        />
      )

      expect(document.querySelector('section')).not.toHaveAttribute(
        'aria-live'
      )
    })
  })

  it('should have aria-live with polite when open', async () => {
    render(
      <HelpButtonInline
        help={{ open: true, title: 'Help title', content: 'Help content' }}
      />
    )

    await waitFor(() => {
      expect(document.querySelector('section')).toHaveAttribute(
        'aria-live',
        'polite'
      )
      expect(document.querySelector('section')).toHaveAttribute(
        'aria-atomic',
        'true'
      )
    })
  })

  it('should close when Escape key on the button gets pressed', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')

    await userEvent.type(button, '{Space}')
    expect(button).toHaveClass('dnb-help-button__inline--open')

    await userEvent.type(button, '{Escape}')
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
        contentId={uniqueId}
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
          contentId={uniqueId}
          help={{ open: true, title: 'Help title' }}
        />
        <HelpButtonInlineContent contentId={uniqueId} />
      </>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute(
      'aria-controls',
      expect.stringContaining(uniqueId + '-content')
    )
    expect(
      document.querySelector('.dnb-help-button__content .dnb-section')
    ).toHaveAttribute('id', expect.stringContaining(uniqueId + '-content'))
  })

  it('should have aria-expanded attribute', async () => {
    render(
      <>
        <HelpButtonInline
          contentId={uniqueId}
          help={{ title: 'Help title' }}
        />
        <HelpButtonInlineContent contentId={uniqueId} />
      </>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
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

  it('should render tooltip', () => {
    render(
      <>
        <HelpButtonInline
          contentId={uniqueId}
          help={{ title: 'Help title' }}
        />
        <HelpButtonInlineContent contentId={uniqueId} />
      </>
    )
    expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
    expect(
      document
        .querySelector('.dnb-help-button')
        .getAttribute('aria-describedby')
    ).toBe(document.querySelector('.dnb-tooltip__content').id)
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
