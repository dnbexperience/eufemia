/**
 * Button Test
 *
 */

import type { RefObject } from 'react'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import { eufemiaCssOptimizer } from '../../../style/vite-plugin'
import type { ButtonOnClick, ButtonProps } from '../Button'
import Button from '../Button'
import IconPrimary from '../../IconPrimary'
import Icon from '../../icon/Icon'
import { chevron_down, chevron_up } from '../../../icons'
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react'
import { Provider, Theme } from '../../../shared'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import userEvent from '@testing-library/user-event'

const props: ButtonProps = {
  href: 'href',
  children: 'children',
}

beforeAll(() => {
  vi.spyOn(global.console, 'log')
})

describe('Button component', () => {
  it('renders with props as an object', () => {
    const props: ButtonProps = {}

    render(<Button {...props} />)
    expect(document.querySelector('button')).toBeInTheDocument()
  })

  it('has a button tag', () => {
    const title = 'title'
    render(<Button {...props} title={title} href={null} />)
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe(title)
  })

  it('icon button should set aria-label with title', () => {
    const title = 'title'
    render(<Button icon="bell" title={title} />)
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe(title)
    expect(button.getAttribute('aria-label')).toBe(title)
  })

  it('should convert React element title to string', () => {
    render(
      <Button
        {...props}
        title={<span>Component title</span>}
        href={null}
      />
    )
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe('Component title')
  })

  it('should convert React element title to aria-label for icon-only button', () => {
    render(<Button icon="bell" title={<>Icon label</>} />)
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe('Icon label')
    expect(button.getAttribute('aria-label')).toBe('Icon label')
  })

  it('icon only has to have some extra classes', () => {
    render(<Button icon="question" />)
    const button = document.querySelector('button')

    // size "medium" and has icon
    expect(button.classList).toContain('dnb-button--size-medium')
    // has icon class, but not has text
    expect(button.classList).toContain('dnb-button--has-icon')
    expect(button.classList).not.toContain('dnb-button--has-text')
  })

  describe('size', () => {
    it('should support small size', () => {
      render(<Button icon="question" size="small" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--size-small')
      expect(button.classList).not.toContain('dnb-button--icon-size-small')
      expect(icon.classList).toContain('dnb-icon--default')
    })

    it('should support medium size', () => {
      render(<Button icon="question" size="medium" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--size-medium')
      expect(button.classList).not.toContain(
        'dnb-button--icon-size-medium'
      )
      expect(icon.classList).toContain('dnb-icon--default')
    })

    it('has size set to medium when button size is default', () => {
      render(<Button icon="question" size="default" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      expect(button.classList).toContain('dnb-button--icon-size-medium')
      expect(icon.classList).toContain('dnb-icon--medium')
    })

    it('has medium icon if button size is large', () => {
      render(<Button text="Button" size="large" icon="question" />)
      const button = document.querySelector('button')
      const icon = document.querySelector('.dnb-icon')
      // size "large
      expect(button.classList).toContain('dnb-button--size-large')
      expect(icon.classList).toContain('dnb-icon--default')
    })
  })

  it('has to have a bounding tag if property is set', () => {
    render(<Button bounding={true} />)
    expect(
      document.querySelector('.dnb-button__bounding')
    ).toBeInTheDocument()
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Button />)
    expect(document.querySelector('button')).not.toHaveAttribute(
      'disabled'
    )
    rerender(<Button disabled />)

    expect(document.querySelector('button')).toHaveAttribute('disabled')
  })

  it('uses dark surface styling from Theme context', () => {
    render(
      <Theme.Context surface="dark">
        <Button>Button</Button>
      </Theme.Context>
    )

    expect(document.querySelector('.dnb-button')).toHaveClass(
      'dnb-button--surface-dark'
    )
  })

  it('should be able to omit button type', () => {
    render(<Button type="" />)

    expect(document.querySelector('button')).not.toHaveAttribute('type')
  })

  it('should use span element if defined', () => {
    render(<Button element="span" />)
    expect(document.querySelector('.dnb-button').tagName).toBe('SPAN')
    expect(
      document.querySelector('.dnb-button').getAttribute('type')
    ).toBe('button')
  })

  it('should support spacing props', () => {
    render(<Button top="2rem" />)

    const element = document.querySelector('.dnb-button')

    expect(element).toHaveClass(
      'dnb-button dnb-button--primary dnb-space__top--large',
      { exact: true }
    )
  })

  it('should inherit disabled from formElement', () => {
    render(
      <Provider formElement={{ vertical: true, disabled: true }}>
        <Button text="Button" />
      </Provider>
    )

    const element = document.querySelector('.dnb-button')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'disabled',
      'type',
      'aria-disabled',
    ])
    expect(element).toHaveClass(
      'dnb-button dnb-button--primary dnb-button--has-text',
      { exact: true }
    )
  })

  it('has "onClick" event which will trigger on a click', () => {
    const myEvent = vi.fn()
    render(<Button onClick={myEvent} />)
    const button = document.querySelector('button')
    fireEvent.click(button)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('has set ref if ref was given', () => {
    const ref: RefObject<HTMLButtonElement | null> = {
      current: null,
    }
    expect(ref.current).toBe(null)
    render(<Button ref={ref} />)

    // ref should be the DOM element, not a class instance
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current.tagName).toBe('BUTTON')
    expect(ref.current).toBe(document.querySelector('.dnb-button'))
  })

  it('gets valid element when ref is function', () => {
    const refFn = vi.fn()

    render(<Button id="unique" ref={refFn} />)

    // ref callback receives the DOM element
    expect(refFn).toHaveBeenCalledTimes(1)
    const button = document.querySelector('#unique')
    expect(refFn).toHaveBeenCalledWith(button)
    expect(button.tagName).toBe('BUTTON')
  })

  it('has type of button', () => {
    render(<Button />)
    const button = document.querySelector('button')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('has alignment helper with aria-hidden', () => {
    const text = 'Button'
    const { rerender } = render(<Button text={text} />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(document.querySelector('.dnb-button__text').textContent).toBe(
      text
    )

    rerender(<Button icon="bell" />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector('.dnb-button__text')
    ).not.toBeInTheDocument()
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = render(<Button {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  describe('href', () => {
    it('has a anchor tag', () => {
      render(<Button {...props} href="https://url" icon={null} />)
      expect(document.querySelector('a')).toBeInTheDocument()
      expect(document.querySelector('svg')).not.toBeInTheDocument()
    })

    it('has a anchor tag and includes a launch icon', () => {
      render(
        <Button
          {...props}
          href="https://url"
          target="_blank"
          icon={null}
        />
      )
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('supports anchor rel property', () => {
      render(<Button {...props} href="https://url" icon={null} rel="me" />)
      expect(document.querySelector('a').getAttribute('rel')).toBe('me')
    })

    it('removes a javascript: href to prevent script execution', () => {
      render(
        <Button {...props} href="javascript:alert('XSS')" icon={null} />
      )
      expect(document.querySelector('a')).not.toHaveAttribute('href')
    })

    describe('disabled', () => {
      it('should validate with ARIA rules as a anchor', async () => {
        const Comp = render(<Button {...props} href="https://url" />)
        expect(await axeComponent(Comp)).toHaveNoViolations()
      })

      it('should validate with ARIA rules when disabled', async () => {
        const Comp = render(
          <Button {...props} href="https://url" disabled />
        )
        expect(await axeComponent(Comp)).toHaveNoViolations()
      })

      it('does not navigate when href is set and button is disabled', async () => {
        render(
          <Button href="https://url" disabled>
            Go to example
          </Button>
        )

        const anchor = document.querySelector('a')

        const dispatched = fireEvent.click(anchor)
        expect(dispatched).toBe(false)

        // Also expect proper disabled semantics
        expect(anchor).toHaveAttribute('aria-disabled', 'true')
        expect(anchor).toHaveAttribute('tabindex', '-1')
      })

      it('renders disabled attribute when href is set', async () => {
        render(
          <Button href="https://url" disabled>
            Go to example
          </Button>
        )

        const anchor = document.querySelector('a')
        expect(anchor).toHaveAttribute('disabled')
      })

      it('removes href from anchor when disabled', () => {
        render(
          <Button href="https://example.com" disabled>
            Disabled link button
          </Button>
        )

        const anchor = document.querySelector('a')
        expect(anchor).toBeInTheDocument()
        expect(anchor).not.toHaveAttribute('href')
      })
    })
  })

  it('has variant set to primary as default', () => {
    render(<Button />)
    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--primary')
  })

  it('has variant set to primary when only setting text', () => {
    render(<Button text="Button" />)
    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--primary')
  })

  it('has variant set to secondary when only setting icon', () => {
    render(<Button icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--secondary')
  })

  it('has variant tertiary', () => {
    render(<Button text="Button" variant="tertiary" icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--tertiary')
  })

  it('has variant unstyled', () => {
    render(<Button text="Button" variant="unstyled" />)
    const button = document.querySelector('button')
    expect(button.classList).toContain('dnb-button--unstyled')
  })

  it('will replace icon with icon component', () => {
    const { rerender } = render(
      <Button icon={<span className="dnb-icon custom-icon">icon</span>} />
    )
    expect(document.querySelector('.custom-icon')).toBeInTheDocument()

    rerender(
      <Button
        icon={
          <IconPrimary icon="bell" className="custom-icon-component" />
        }
      />
    )

    expect(document.querySelector('.custom-icon')).not.toBeInTheDocument()
    expect(
      document.querySelector('.custom-icon-component')
    ).toBeInTheDocument()
  })

  it('will only have attached event listener if one is given', () => {
    const onClick = vi.fn()
    const { rerender } = render(<Button text="Button" onClick={onClick} />)

    type Button = HTMLButtonElement & { onClickHandler: ButtonOnClick }

    const button = document.querySelector('button') as Button

    button.onClickHandler = onClick

    fireEvent.click(button)
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)

    rerender(<Button text="Button" onClick={undefined} />)

    fireEvent.click(button)

    // still 2
    expect(onClick).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)
  })

  it('will warn when tertiary is used without an icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(<Button text="Button" variant="tertiary" />)
    expect(global.console.log).toHaveBeenCalled()
  })

  it('will warn when a tertiary link without an icon opens in the same tab', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(<Button text="Button" variant="tertiary" href="https://url" />)
    expect(global.console.log).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('Icon required')
    )
  })

  it('will not warn when a tertiary link opens a new tab, because it gets a launch icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(
      <Button
        text="Button"
        variant="tertiary"
        href="https://url"
        target="_blank"
      />
    )
    expect(document.querySelector('.dnb-icon')).toBeInTheDocument()
    expect(global.console.log).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('Icon required')
    )
  })

  it('will warn when icon-only button has no title or aria-label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(<Button icon="bell" />)
    expect(global.console.log).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining(
        'Icon-only Button requires either a "title" or "aria-label"'
      )
    )
  })

  it('will not warn when icon-only button has a title', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(<Button icon="bell" title="Bell" />)
    expect(global.console.log).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining(
        'Icon-only Button requires either a "title" or "aria-label"'
      )
    )
  })

  it('will not warn when icon-only button has an aria-label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = vi.fn()
    render(<Button icon="bell" aria-label="Bell" />)
    expect(global.console.log).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining(
        'Icon-only Button requires either a "title" or "aria-label"'
      )
    )
  })

  it('has no size when only setting text', () => {
    render(<Button text="Button" />)
    expect(
      document.querySelector('.dnb-button--size-medium')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-button--size-large')
    ).not.toBeInTheDocument()
  })

  it('supports inline styling', () => {
    render(<Button text="text" style={{ color: 'red' }} />)

    expect(document.querySelector('button').getAttribute('style')).toBe(
      'color: red;'
    )
  })

  it('should show tooltip on hover', async () => {
    render(<Button text="Button" tooltip="Tooltip content" />)

    const button = document.querySelector('button')

    expect(
      document.querySelector('.dnb-tooltip--active')
    ).not.toBeInTheDocument()

    await userEvent.hover(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toBeInTheDocument()
    })
  })
})

// React's deprecated .defaultProps would convert undefined values to the
// declared default. After migrating away from .defaultProps we replicate
// that behavior with removeUndefinedProps so that context overrides still
// work when a consumer passes an explicit `undefined`.
describe('undefined props should fall through to defaults', () => {
  it('should not forward provider-only props to the DOM', () => {
    const providerButtonProps: Partial<ButtonProps> & {
      unexpected?: string
    } = {
      unexpected: 'value',
      iconSize: 'medium',
    }

    render(
      <Provider Button={providerButtonProps}>
        <Button text="Button" icon="bell" />
      </Provider>
    )

    const button = document.querySelector('.dnb-button')

    expect(button).not.toHaveAttribute('unexpected')
    expect(button.classList).toContain('dnb-button--icon-size-medium')
  })

  it('should let context override a prop that is explicitly undefined', () => {
    render(
      <Provider Button={{ iconSize: 'medium' }}>
        <Button text="Button" icon="bell" iconSize={undefined} />
      </Provider>
    )

    const button = document.querySelector('.dnb-button')

    expect(button.classList).toContain('dnb-button--icon-size-medium')
  })

  it('should use default value when prop is explicitly undefined and no context overrides it', () => {
    render(<Button text="Button" icon="bell" iconSize={undefined} />)

    const button = document.querySelector('.dnb-button')

    // Default iconSize is null, so no icon-size class should be present
    expect(button.className).not.toContain('dnb-button--icon-size')
  })

  it('should use explicit prop value over context when prop differs from default', () => {
    render(
      <Provider Button={{ iconSize: 'small' }}>
        <Button text="Button" icon="bell" iconSize="medium" />
      </Provider>
    )

    const button = document.querySelector('.dnb-button')

    // 'medium' differs from the default null, so context cannot override it
    expect(button.classList).toContain('dnb-button--icon-size-medium')
  })

  it('should let context override iconSize when using a React element as icon and iconSize is undefined', () => {
    render(
      <Provider Button={{ iconSize: 'medium' }}>
        <Button
          text="Button"
          icon={<IconPrimary icon="bell" />}
          iconSize={undefined}
        />
      </Provider>
    )

    const button = document.querySelector('.dnb-button')

    expect(button.classList).toContain('dnb-button--icon-size-medium')
  })

  it('should use default iconSize when using a React element as icon and iconSize is undefined', () => {
    render(
      <Button
        text="Button"
        icon={<IconPrimary icon="bell" />}
        iconSize={undefined}
      />
    )

    const button = document.querySelector('.dnb-button')

    // Default iconSize is null, so no icon-size class should be present
    expect(button.className).not.toContain('dnb-button--icon-size')
  })

  it('should preserve explicit iconSize when using a React element as icon', () => {
    render(
      <Provider Button={{ iconSize: 'small' }}>
        <Button
          text="Button"
          icon={<IconPrimary icon="bell" />}
          iconSize="medium"
        />
      </Provider>
    )

    const button = document.querySelector('.dnb-button')

    // 'medium' differs from the default null, so context cannot override it
    expect(button.classList).toContain('dnb-button--icon-size-medium')
  })
})

describe('Button transitionState', () => {
  it('forwards transitionState to IconPrimary', () => {
    const icon = Icon.transition({
      collapsed: chevron_down,
      expanded: chevron_up,
    })

    render(<Button text="Toggle" icon={icon} transitionState="expanded" />)

    const wrapper = document.querySelector(
      '.dnb-icon--transition-fallback'
    ) as HTMLElement

    expect(wrapper).toBeInTheDocument()

    const svgs = wrapper.querySelectorAll('svg[data-icon-state]')
    expect(svgs).toHaveLength(2)
    expect(svgs[0].getAttribute('data-icon-state')).toBe('collapsed')
    expect(svgs[1].getAttribute('data-icon-state')).toBe('expanded')
    expect(svgs[1].classList.contains('dnb-icon__state--active')).toBe(
      true
    )
  })

  it('does not leak transitionState onto the DOM element', () => {
    const icon = Icon.transition({
      collapsed: chevron_down,
      expanded: chevron_up,
    })

    render(<Button text="Toggle" icon={icon} transitionState="expanded" />)

    const button = document.querySelector('.dnb-button')
    expect(button.getAttribute('transitionState')).toBeNull()
    expect(button.getAttribute('transitionstate')).toBeNull()
  })
})

describe('Button status', () => {
  it('connects the status message to the button via aria-describedby', () => {
    render(
      <Button text="Primary button with text only" status="my error" />
    )

    const button = document.querySelector('button')
    const describedBy = button.getAttribute('aria-describedby')

    expect(describedBy).toBeTruthy()

    // The referenced element must exist and contain the status text
    const statusText = document.getElementById(describedBy)
    expect(statusText).toBeInTheDocument()
    expect(statusText).toHaveTextContent('my error')
    expect(statusText).toHaveClass('dnb-form-status__text')
  })

  it('derives the button id and the form-status ids from the same id', () => {
    render(<Button text="With status" status="my error" />)

    const button = document.querySelector('button')
    const buttonId = button.getAttribute('id')

    expect(buttonId).toBeTruthy()
    expect(
      document.querySelector('.dnb-form-status').getAttribute('id')
    ).toBe(`${buttonId}-form-status`)
    expect(button.getAttribute('aria-describedby')).toBe(
      `${buttonId}-status`
    )
  })

  it('does not set aria-describedby when no status is given', () => {
    render(<Button text="No status" />)

    const button = document.querySelector('button')
    expect(button).not.toHaveAttribute('aria-describedby')
  })

  it('combines a user provided aria-describedby with the status id', () => {
    render(
      <Button
        text="With custom describedby"
        status="my error"
        aria-describedby="custom-id"
      />
    )

    const button = document.querySelector('button')
    const describedBy = button.getAttribute('aria-describedby')
    const statusId = document
      .querySelector('.dnb-form-status__text')
      .getAttribute('id')

    expect(describedBy).toContain('custom-id')
    expect(describedBy).toContain(statusId)
  })

  it('keeps the status describedby when a tooltip is also set', () => {
    render(
      <Button
        text="With status and tooltip"
        status="my error"
        tooltip="Helpful hint"
      />
    )

    const button = document.querySelector('button')
    const statusId = document
      .querySelector('.dnb-form-status__text')
      .getAttribute('id')

    // The tooltip id is only added on hover/focus, but the status link
    // must already be present and share the same base id.
    expect(button.getAttribute('aria-describedby')).toBe(statusId)
  })

  it('should validate with ARIA rules when a status is set', async () => {
    const Comp = render(<Button text="With status" status="my error" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Button pending', () => {
  it('shows the indicator after the text', () => {
    render(<Button text="Save" pending />)

    const text = document.querySelector('.dnb-button__text')
    const indicator = text.querySelector('.dnb-forms-submit-indicator')
    const content = indicator.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(text).toHaveTextContent('Save')
    expect(text.lastElementChild).toBe(indicator)
    expect(indicator).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
    expect(content.querySelectorAll('b')).toHaveLength(3)
    expect(content).toHaveAttribute('role', 'status')
    expect(content).toHaveAttribute(
      'aria-label',
      nbNO['nb-NO'].SubmitIndicator.label
    )
  })

  it('uses the translation of the current locale', () => {
    render(
      <Provider locale="en-GB">
        <Button text="Save" pending />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-forms-submit-indicator__content')
    ).toHaveAttribute('aria-label', enGB['en-GB'].SubmitIndicator.label)
  })

  it('stays focusable and uses aria-disabled instead of disabled', () => {
    const { rerender } = render(<Button text="Save" pending={false} />)

    const button = document.querySelector('button')
    button.focus()

    expect(button).not.toHaveAttribute('aria-disabled')
    expect(button).not.toHaveClass('dnb-button--pending')

    rerender(<Button text="Save" pending />)

    expect(button).not.toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveClass('dnb-button--pending')
    expect(document.activeElement).toBe(button)
  })

  it('stays focusable when it is disabled as well', () => {
    render(
      <Provider formElement={{ disabled: true }}>
        <Button text="Save" pending />
        <Button text="Cancel" disabled pending />
      </Provider>
    )

    const [save, cancel] = Array.from(document.querySelectorAll('button'))

    expect(save).not.toBeDisabled()
    expect(save).toHaveAttribute('aria-disabled', 'true')
    expect(cancel).not.toBeDisabled()
    expect(cancel).toHaveAttribute('aria-disabled', 'true')
  })

  it('ignores clicks and does not submit a form', () => {
    const onClick = vi.fn()
    const onBodyClick = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    document.body.addEventListener('click', onBodyClick)

    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button text="Save" type="submit" onClick={onClick} pending />
      </form>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(0)
    expect(onBodyClick).toHaveBeenCalledTimes(0)
    expect(onSubmit).toHaveBeenCalledTimes(0)

    rerender(
      <form onSubmit={onSubmit}>
        <Button
          text="Save"
          type="submit"
          onClick={onClick}
          pending={false}
        />
      </form>
    )

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onBodyClick).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    document.body.removeEventListener('click', onBodyClick)
  })

  it('keeps a pending link focusable and prevents navigation', () => {
    render(<Button text="Open" href="/url" pending />)

    const anchor = document.querySelector('a')
    const event = createEvent.click(anchor)
    fireEvent(anchor, event)

    expect(event.defaultPrevented).toBe(true)
    expect(anchor).toHaveAttribute('aria-disabled', 'true')
    expect(anchor).toHaveAttribute('href', '/url')
    expect(anchor).not.toHaveAttribute('tabindex')
  })

  it('renders a hidden indicator when pending is false, so it can animate in', () => {
    const { rerender } = render(<Button text="Save" />)

    expect(
      document.querySelector('.dnb-forms-submit-indicator')
    ).not.toBeInTheDocument()

    rerender(<Button text="Save" pending={false} />)

    const indicator = document.querySelector('.dnb-forms-submit-indicator')
    const content = indicator.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(indicator).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toHaveAttribute('role')
    expect(content.querySelectorAll('b')).toHaveLength(0)
  })

  it('should validate with ARIA rules when pending', async () => {
    const Comp = render(<Button text="Save" pending />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Button scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('includes the pending indicator styles and a not-allowed cursor', () => {
    const css = String(loadScss(require.resolve('../style/deps.scss')))

    expect(css).toMatch(/\.dnb-button--pending \{\s*cursor: not-allowed;/)
    expect(css).toContain('@keyframes submit-indicator-dot')
  })

  const getStylesheet = () =>
    String(loadScss(require.resolve('../style/deps.scss')))

  const getOptimizedStylesheet = async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-button-'))
    )

    try {
      fs.mkdirSync(path.join(root, 'src'))
      fs.writeFileSync(
        path.join(root, 'src/App.tsx'),
        `import { Button } from '@dnb/eufemia'
        export const App = () => <Button pending />`
      )

      const plugin = eufemiaCssOptimizer()
      plugin.configResolved({ root, logger: { info: vi.fn() } })

      const result = await plugin.transform(
        getStylesheet(),
        path.join(
          root,
          'node_modules/@dnb/eufemia/style/dnb-ui-components.css'
        )
      )

      return result.code
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  }

  describe.each([
    ['the stylesheet', getStylesheet],
    [
      'the stylesheet optimized for an app that only uses Button',
      getOptimizedStylesheet,
    ],
  ])('pending with %s', (_, getCss) => {
    let css: string
    let style: HTMLStyleElement

    beforeAll(async () => {
      css = await getCss()
      style = document.createElement('style')
      style.textContent = css
      document.head.appendChild(style)
    })

    afterAll(() => {
      style.remove()
    })

    it('shows the animated indicator dots', () => {
      render(<Button text="Save" pending />)

      const content = document.querySelector(
        '.dnb-forms-submit-indicator__content'
      )
      const dot = content.querySelector('b')

      expect(getComputedStyle(content).opacity).toBe('1')
      expect(getComputedStyle(content).fontSize).not.toBe('0px')
      expect(getComputedStyle(dot).borderRadius).toBe('50%')
      expect(getComputedStyle(dot).animationName).toBe(
        'submit-indicator-dot'
      )
      expect(css).toContain('@keyframes submit-indicator-dot')
    })

    it('hides the indicator when pending is false', () => {
      render(<Button text="Save" pending={false} />)

      const content = document.querySelector(
        '.dnb-forms-submit-indicator__content'
      )

      expect(getComputedStyle(content).opacity).toBe('0')
      expect(getComputedStyle(content).fontSize).toBe('0px')
    })
  })

  it('shows the focus ring in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{[^{]*\.dnb-button--primary:focus-visible:not\(\[disabled\]\)[^{]*\{\s*outline: var\(--focus-ring-width\) solid transparent;/
    )
  })

  it('shows the border in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))

    // Inside, like the border, so that a neighbor cannot cover it
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-button--primary,\s*\.dnb-button--secondary \{\s*outline: var\(--button-border-width, var\(--button-border-width--default\)\) solid transparent;\s*outline-offset: calc\(var\(--button-border-width, var\(--button-border-width--default\)\) \* -1\);/
    )
    // The focus ring stays outside
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{[^{]*\.dnb-button--primary:focus-visible:not\(\[disabled\]\)[^{]*\{\s*outline-offset: 0;/
    )
  })

  it('shows disabled buttons with the disabled text color in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-button--primary\[disabled\],\s*\.dnb-button--secondary\[disabled\],[^{]*\{\s*outline: var\(--button-border-width, var\(--button-border-width--default\)\) solid transparent;\s*outline-offset: calc\(var\(--button-border-width, var\(--button-border-width--default\)\) \* -1\);/
    )
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-button--primary\[disabled\],\s*\.dnb-button--secondary\[disabled\],[^{]*\{\s*outline-color: GrayText;/
    )
  })

  it('styles buttons with aria-disabled like disabled buttons', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    const ariaDisabled = `\\[aria-disabled=["']?true["']?\\]`

    // Disabled colors
    expect(css).toMatch(
      new RegExp(
        `\\.dnb-button--primary\\[disabled\\],\\s*\\.dnb-button--primary${ariaDisabled},[^{]*\\{\\s*--button-color-bg: var\\(--button-color-bg--disabled\\);`
      )
    )

    // No hover or active state
    expect(css).toMatch(
      new RegExp(
        `\\.dnb-button--primary:where\\(:not\\(${ariaDisabled}\\)\\):hover:not\\(\\[disabled\\]\\)[^{]*\\{\\s*--button-color-bg: var\\(--button-color-bg--hover\\);`
      )
    )
    expect(css).toMatch(
      new RegExp(
        `\\.dnb-button--primary:where\\(:not\\(${ariaDisabled}\\)\\):active:not\\(\\[disabled\\]\\)[^{]*\\{\\s*--button-color-bg: var\\(--button-color-bg--active\\);`
      )
    )
    expect(css).toMatch(
      new RegExp(
        `\\.dnb-button--tertiary:where\\(:not\\(${ariaDisabled}\\)\\):hover:not\\(\\[disabled\\]\\) \\.dnb-button__text \\{\\s*text-decoration-color:`
      )
    )

    // Keeps the disabled colors with the focus ring
    expect(css).toMatch(
      new RegExp(
        `\\.dnb-button--primary:focus-visible:not\\(\\[disabled\\]\\)${ariaDisabled}[^{]*\\{\\s*--button-color-bg: var\\(--button-color-bg--disabled\\);\\s*--button-color-icon: var\\(--button-color-icon--disabled\\);\\s*--button-color-text: var\\(--button-color-text--disabled\\);\\s*\\}`
      )
    )

    // Forced colors mode
    expect(css).toMatch(
      new RegExp(
        `@media \\(forced-colors: active\\) \\{[^{]*\\.dnb-button--primary${ariaDisabled},\\s*\\.dnb-button--secondary${ariaDisabled} \\{\\s*outline-color: GrayText;`
      )
    )
    expect(css).toMatch(
      new RegExp(
        `@media \\(forced-colors: active\\) \\{\\s*\\.dnb-button${ariaDisabled},\\s*\\.dnb-button${ariaDisabled} \\.dnb-button__icon \\{\\s*color: GrayText;`
      )
    )
  })

  it('shows selected icon buttons with the selected system colors in forced colors mode', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))

    expect(css).toMatch(
      /@media \(forced-colors: active\) \{\s*\.dnb-button--icon-only\.dnb-button--selected \{\s*background-color: Highlight;\s*color: HighlightText;\s*outline-color: Highlight;\s*\}\s*\.dnb-button--icon-only\.dnb-button--selected \.dnb-button__icon \{\s*color: HighlightText;/
    )
    // The focus ring would else have the same color as the background
    expect(css).toMatch(
      /@media \(forced-colors: active\) \{[^{]*\.dnb-button--icon-only\.dnb-button--selected:focus-visible:not\(\[disabled\]\) \{\s*outline-color: CanvasText;/
    )
  })
})
