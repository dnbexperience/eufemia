import React from 'react'
import { render } from '@testing-library/react'
import Theme, { ThemeAllProps } from '../Theme'
import {
  Autocomplete,
  Dialog,
  Drawer,
  Dropdown,
  Tooltip,
} from '../../components'

describe('Theme', () => {
  it('renders with props as an object', () => {
    const props: ThemeAllProps = {}

    render(<Theme {...props} />)
    expect(document.querySelector('.eufemia-theme')).toBeInTheDocument()
  })

  it('sets name and variant as HTML classes', () => {
    render(
      <Theme name="eiendom" variant="soft">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('supports nested themes', () => {
    render(
      <Theme id="theme-1" name="eiendom">
        <Theme id="theme-2" variant="soft">
          content
        </Theme>
      </Theme>
    )

    const element1 = document.querySelector('#theme-1')
    const element2 = document.querySelector('#theme-2')
    expect(Array.from(element1.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
    ])
    expect(Array.from(element2.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('sets size as HTML classes', () => {
    render(<Theme size="basis">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__size--basis',
    ])
  })

  it('sets prop-mapping as HTML classes', () => {
    render(<Theme propMapping="basis">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__prop-mapping--basis',
    ])
  })

  it('sets contrast-mode as HTML classes', () => {
    render(<Theme contrastMode>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__contrast-mode',
    ])
  })

  it('sets dark-mode as HTML classes', () => {
    render(<Theme darkMode>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__dark-mode',
    ])
  })

  it('sets additional attributes', () => {
    render(
      <Theme aria-label="custom label" element="section">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    expect(attributes).toEqual(['class', 'aria-label'])
  })

  it('uses custom element when set', () => {
    render(<Theme element="span">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses custom component when set', () => {
    const Component = React.forwardRef(
      (
        { children, ...rest }: { children: React.ReactNode },
        ref: React.LegacyRef<HTMLElement>
      ) => (
        <section {...rest} ref={ref}>
          {children}
        </section>
      )
    )
    render(<Theme element={Component}>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SECTION')
  })

  it('will omit element on false or fragment', () => {
    const { rerender } = render(<Theme element={false}>content</Theme>)

    expect(
      document.querySelector('.eufemia-theme')
    ).not.toBeInTheDocument()

    rerender(<Theme element={React.Fragment}>content</Theme>)

    expect(
      document.querySelector('.eufemia-theme')
    ).not.toBeInTheDocument()

    rerender(<Theme element="div">content</Theme>)

    expect(document.querySelector('.eufemia-theme')).toBeInTheDocument()
  })
})

describe('Portals', () => {
  it('have correct theme classes in dialog content', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Dialog noAnimation openState="opened">
          content
        </Dialog>
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-dialog__root',
        'dnb-modal__content',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in drawer content', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Drawer noAnimation openState="opened">
          content
        </Drawer>
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-modal__content',
        'dnb-modal__content--right',
        'dnb-drawer__root',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in dropdown', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Dropdown open no_animation data={['A', 'B']} />
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-drawer-list__portal__style',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in autocomplete', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Autocomplete open no_animation data={['A', 'B']} />
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-drawer-list__portal__style',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })

  it('have correct theme classes in tooltip', () => {
    render(
      <Theme name="eiendom" variant="soft" element={false}>
        <Tooltip open no_animation />
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-tooltip__portal',
        'eufemia-theme',
        'eufemia-theme__eiendom',
        'eufemia-theme__eiendom--soft',
      ])
    )
    expect(document.querySelectorAll('.eufemia-theme')).toHaveLength(1)
  })
})
