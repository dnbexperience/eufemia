/**
 * Button Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Button, { ButtonOnClick, ButtonProps } from '../Button'
import IconPrimary from '../../IconPrimary'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Provider } from '../../../shared'
import userEvent from '@testing-library/user-event'

const props: ButtonProps = {
  href: 'href',
  children: 'children',
}

beforeAll(() => {
  jest.spyOn(global.console, 'log')
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

  it('has a anchor tag', () => {
    render(<Button {...props} href="https://url" icon={null} />)
    expect(document.querySelector('a')).toBeInTheDocument()
    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })

  it('has a anchor tag and includes a launch icon', () => {
    render(
      <Button {...props} href="https://url" target="_blank" icon={null} />
    )
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('supports anchor rel property', () => {
    render(<Button {...props} href="https://url" icon={null} rel="me" />)
    expect(document.querySelector('a').getAttribute('rel')).toBe('me')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Button />)
    expect(document.querySelector('button')).not.toHaveAttribute(
      'disabled'
    )
    rerender(<Button disabled />)

    expect(document.querySelector('button')).toHaveAttribute('disabled')
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

    expect(Array.from(element.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-space__top--large',
    ])
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
    expect(Array.from(element.classList)).toEqual([
      'dnb-button',
      'dnb-button--primary',
      'dnb-button--has-text',
    ])
  })

  it('has "on_click" event which will trigger on a click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(<Button on_click={my_event} onClick={myEvent} />)
    const button = document.querySelector('button')
    fireEvent.click(button)
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('has set innerRef if ref was given', () => {
    const ref = React.createRef()
    expect(ref.current).toBe(null)
    render(<Button {...props} innerRef={ref} />)
    expect(ref.current).not.toBe(null)
    expect(typeof ref.current).toBe('object')
  })

  it('gets valid element when innerRef is function', () => {
    const ref: React.MutableRefObject<HTMLButtonElement> =
      React.createRef()

    const refFn = (elem: HTMLButtonElement) => {
      ref.current = elem
    }
    render(<Button id="unique" innerRef={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.tagName).toBe('BUTTON')
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

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = render(<Button {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
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
    const on_click = jest.fn()
    const { rerender } = render(
      <Button text="Button" on_click={on_click} />
    )

    type Button = HTMLButtonElement & { onClickHandler: ButtonOnClick }

    const button = document.querySelector('button') as Button

    button.onClickHandler = on_click

    fireEvent.click(button)
    fireEvent.click(button)

    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)

    rerender(<Button text="Button" onClick={undefined} />)

    fireEvent.click(button)

    // still 2
    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)
  })

  it('will warn when tertiary is used without an icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Button text="Button" variant="tertiary" />)
    expect(global.console.log).toHaveBeenCalled()
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

describe('Button scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it.each(['ui', 'sbanken'])(
    'has to match theme css for %s',
    (themeName) => {
      const css = loadScss(
        require.resolve(
          `../style/themes/dnb-button-theme-${themeName}.scss`
        )
      )
      expect(css).toMatchSnapshot()
    }
  )
})
