import React, { act } from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../shared/component-helper'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../HelpButtonInline'
import Dialog from '../../dialog/Dialog'

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
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.keyboard('{Space}')
    expect(document.querySelector('button')).toHaveFocus()

    // Will not close when Space is pressed
    expect(document.querySelector('button')).toHaveClass(
      'dnb-help-button__inline--open'
    )
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
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.keyboard('{Enter}')
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).not.toHaveClass(
      'dnb-help-button__inline--open'
    )
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
    expect(document.querySelector('button')).toHaveFocus()
    expect(document.querySelector('button')).toHaveClass(
      'dnb-help-button__inline--open'
    )

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(document.querySelector('button')).toHaveFocus()
      expect(document.querySelector('button')).not.toHaveClass(
        'dnb-help-button__inline--open'
      )
    })
  })

  it('keeps dialog open when Escape is pressed inside the inline help', async () => {
    render(
      <Dialog noAnimation open title="Dialog">
        <HelpButtonInline
          focusOnOpen
          help={{
            title: 'Help title',
            content: 'Help content',
            open: true,
          }}
        />
      </Dialog>
    )

    expect(
      document.querySelector('.dnb-modal__content')
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-dnb-modal-active'
      )
    })

    const section = document.querySelector(
      '.dnb-help-button__content .dnb-section'
    ) as HTMLElement
    expect(section).toBeInTheDocument()

    section.focus()
    await waitFor(() => {
      expect(section).toHaveFocus()
    })

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-help-button__content')
      ).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-dnb-modal-active'
      )
    })

    const closeButton = document.querySelector(
      'button.dnb-modal__close-button'
    ) as HTMLButtonElement
    closeButton.focus()

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute(
        'data-dnb-modal-active'
      )
    })

    document.body.removeAttribute('style')
  })

  describe('focusOnOpen', () => {
    it('should set focus on the button when closing with Escape key', async () => {
      render(
        <HelpButtonInline focusOnOpen help={{ title: 'Help title' }} />
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
        <HelpButtonInline focusOnOpen help={{ title: 'Help title' }} />
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
          focusOnOpen
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
          focusOnOpen
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
          focusOnOpen
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

    it('should have aria-label when title is a React component', () => {
      function CustomTitle() {
        return <>Component title</>
      }

      render(
        <HelpButtonInline
          focusOnOpen
          help={{
            open: true,
            title: <CustomTitle />,
          }}
        />
      )

      expect(
        document.querySelector('.dnb-help-button__content .dnb-section')
      ).not.toHaveAttribute('aria-label', 'Component title')
    })

    it('should set button aria-label when title is a React component', () => {
      function CustomTitle() {
        return <>Component title</>
      }

      render(
        <HelpButtonInline
          help={{
            title: <CustomTitle />,
          }}
        />
      )

      expect(document.querySelector('button')).toHaveAttribute(
        'aria-label',
        'Hjelpetekst'
      )
    })

    it('should show tooltip when title is a React component', async () => {
      function CustomTitle() {
        return <>Component title</>
      }

      render(
        <HelpButtonInline
          help={{
            title: <CustomTitle />,
          }}
        />
      )

      const button = document.querySelector('.dnb-help-button')
      await userEvent.hover(button)

      const ariaDescribedBy = await waitFor(() => {
        const id = button.getAttribute('aria-describedby')
        expect(id).toBeTruthy()
        return id
      })

      const tooltipContent = await waitFor(() => {
        const tooltip = document.querySelector(`#${ariaDescribedBy}`)
        expect(tooltip).toBeInTheDocument()
        return tooltip
      })

      expect(tooltipContent).toHaveTextContent('Component title')
    })

    it('should have aria-label attribute', () => {
      render(
        <HelpButtonInline
          focusOnOpen
          help={{ open: true, title: 'Help title' }}
        />
      )

      expect(
        document.querySelector('.dnb-help-button__content .dnb-section')
      ).toHaveAttribute('aria-label', 'Help title')
    })

    it('should not have aria-live when focusOnOpen is true', () => {
      render(
        <HelpButtonInline
          focusOnOpen
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
        help={{
          renderAs: 'dialog',
          title: 'Dialog Title',
          noAnimation: true,
        }}
      />
    )

    await userEvent.click(document.querySelector('button'))
    expect(document.querySelector('.dnb-dialog')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-help-button__content')
    ).not.toBeInTheDocument()
  })

  it('should render tooltip', async () => {
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

    const button = document.querySelector('.dnb-help-button')

    // Tooltip only sets aria-describedby when active (hover/focus)
    // So we need to trigger focus to activate the tooltip
    await userEvent.hover(button)

    const ariaDescribedBy = await waitFor(() => {
      const id = button.getAttribute('aria-describedby')
      expect(id).toBeTruthy()
      return id
    })

    const tooltipContent = await waitFor(() => {
      const tooltip = document.querySelector(`#${ariaDescribedBy}`)
      expect(tooltip).toBeInTheDocument()
      return tooltip
    })

    expect(ariaDescribedBy).toBe(tooltipContent.id)
  })

  it('calls focus with preventScroll when opening', async () => {
    render(<HelpButtonInline focusOnOpen help={{ title: 'Help title' }} />)

    const button = document.querySelector('button') as HTMLButtonElement

    // Spy on the prototype before clicking so we catch the focus call
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus')

    await userEvent.click(button)

    // Wait for the focus to be called (it happens in a useEffect with requestAnimationFrame)
    await waitFor(
      () => {
        expect(focusSpy).toHaveBeenCalledWith(
          expect.objectContaining({ preventScroll: true })
        )
      },
      { timeout: 200 }
    )

    focusSpy.mockRestore()
  })

  it('calls focus with preventScroll when closing', async () => {
    render(<HelpButtonInline focusOnOpen help={{ title: 'Help title' }} />)

    const button = document.querySelector('button') as HTMLButtonElement

    // Open the help button
    await userEvent.click(button)
    await waitFor(() => {
      expect(button).toHaveClass('dnb-help-button__inline--open')
    })

    // Get the content section element (where onKeyDown is attached when focusOnOpen is true)
    const content = (await waitFor(() => {
      const elem = document.querySelector(
        '.dnb-help-button__content .dnb-section'
      ) as HTMLElement
      expect(elem).toBeInTheDocument()
      return elem
    })) as HTMLElement

    // Spy on the button's focus method
    const focusSpy = jest.spyOn(button, 'focus')

    // Focus the content and press Escape (the onKeyDown handler is on the content section)
    content.focus()
    fireEvent.keyDown(content, { key: 'Escape' })

    // Wait for the requestAnimationFrame to complete
    await waitFor(
      () => {
        expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
      },
      { timeout: 200 }
    )

    focusSpy.mockRestore()
  })
})

describe('animation end reset', () => {
  const simulateAnimationEnd = (
    element: Element = document.querySelector('.dnb-height-animation')
  ) => {
    act(() => {
      element.dispatchEvent(new CustomEvent('transitionend'))
    })
  }

  it('should remove --was-open class after closing animation ends', async () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')

    await userEvent.click(button)
    expect(button).toHaveClass('dnb-help-button__inline--open')
    expect(button).toHaveClass('dnb-help-button__inline--was-open')

    await userEvent.click(button)
    expect(button).not.toHaveClass('dnb-help-button__inline--open')

    await waitFor(() => {
      expect(button).not.toHaveClass('dnb-help-button__inline--was-open')
    })
  })

  it('should remove --was-open class when using separate content', async () => {
    const id = makeUniqueId()

    render(
      <>
        <HelpButtonInline contentId={id} help={{ title: 'Help title' }} />
        <HelpButtonInlineContent contentId={id} />
      </>
    )

    const button = document.querySelector('button')

    await userEvent.click(button)
    expect(button).toHaveClass('dnb-help-button__inline--was-open')

    await userEvent.click(button)

    const heightAnimation = document.querySelector('.dnb-height-animation')
    if (heightAnimation) {
      simulateAnimationEnd(heightAnimation)
    }

    await waitFor(() => {
      expect(button).not.toHaveClass('dnb-help-button__inline--was-open')
    })
  })

  it('should not have --was-open class initially', () => {
    render(<HelpButtonInline help={{ title: 'Help title' }} />)

    const button = document.querySelector('button')
    expect(button).not.toHaveClass('dnb-help-button__inline--was-open')
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

  it('should render block-level content without wrapping it in a p tag', () => {
    render(
      <HelpButtonInline
        help={{
          open: true,
          title: 'Help title',
          content: (
            <div>
              <ul>
                <li>Item 1</li>
              </ul>
            </div>
          ),
        }}
      />
    )

    const pElements = document.querySelectorAll(
      '.dnb-help-button__content .dnb-p'
    )
    const contentElement = pElements[1]
    expect(contentElement.tagName).toBe('DIV')
  })

  it('should render block-level title without wrapping it in a p tag', () => {
    render(
      <HelpButtonInline
        help={{
          open: true,
          title: (
            <div>
              <span>Title with block content</span>
            </div>
          ),
        }}
      />
    )

    const titleElement = document.querySelector(
      '.dnb-help-button__content .dnb-p'
    )
    expect(titleElement.tagName).toBe('DIV')
  })

  it('should render string content with paragraph styling', () => {
    render(
      <HelpButtonInline
        help={{
          open: true,
          content: 'Simple text content',
        }}
      />
    )

    const contentElement = document.querySelector(
      '.dnb-help-button__content .dnb-p'
    )
    expect(contentElement).toHaveTextContent('Simple text content')
    expect(contentElement).toHaveClass('dnb-p')
  })
})
