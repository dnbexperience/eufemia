/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Dialog from '../../dialog/Dialog'
import HelpButton, { HelpButtonProps } from '../HelpButton'
import {
  question as QuestionIcon,
  information_medium as InformationIcon,
} from '../../../icons'
import { fireEvent, render } from '@testing-library/react'

const props: HelpButtonProps = { id: 'help-button' }

describe('HelpButton', () => {
  it('should have question icon by default', () => {
    render(<HelpButton {...props} />)
    expect(
      document.querySelector('.dnb-icon').getAttribute('data-testid')
    ).toBe('question icon')
    expect(document.querySelector('svg').outerHTML).toBe(
      render(<QuestionIcon />).container.innerHTML
    )
    expect(document.querySelector('.dnb-button').textContent.trim()).toBe(
      '‌'
    )
  })

  it('should support inline styling', () => {
    render(<HelpButton text="text" style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-button').getAttribute('style')
    ).toBe('color: red;')
  })

  it('should use "information" icon when set', () => {
    render(<HelpButton {...props} icon="information" />)
    expect(
      document.querySelector('.dnb-icon').getAttribute('data-testid')
    ).toBe('information icon')
    expect(document.querySelector('svg').outerHTML).toBe(
      render(<InformationIcon />).container.innerHTML
    )
    expect(document.querySelector('.dnb-button').textContent.trim()).toBe(
      '‌'
    )
  })

  it('should use given icon', () => {
    render(<HelpButton {...props} icon={InformationIcon} />)
    expect(
      document.querySelector('.dnb-icon').getAttribute('data-testid')
    ).toBe('information medium icon')
    expect(document.querySelector('svg').outerHTML).toBe(
      render(<InformationIcon />).container.innerHTML
    )
    expect(document.querySelector('.dnb-button').textContent.trim()).toBe(
      '‌'
    )
  })

  it('should have correct role description', () => {
    render(<HelpButton {...props} />)
    expect(
      document
        .querySelector('.dnb-button')
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')
  })

  it('should have larger bounding class when size is set to small', () => {
    render(<HelpButton {...props} size="small" />)
    expect(
      document.querySelector('.dnb-button .dnb-button__bounding')
    ).toBeInTheDocument()
  })

  describe('with bell icon', () => {
    it('should have correct aria-label', () => {
      render(<HelpButton {...props} icon="bell" />)
      expect(
        document.querySelector('.dnb-button').getAttribute('aria-label')
      ).toBe('Hjelpetekst')
    })

    it('should have not aria-label if text is given', () => {
      render(<HelpButton {...props} icon="bell" text="button text" />)
      expect(document.querySelector('.dnb-button')).not.toHaveAttribute(
        'aria-label'
      )
      expect(
        document.querySelector('.dnb-button').textContent.trim()
      ).toBe('‌button text')
    })

    it('should have aria-label if title is given, but no text', () => {
      render(<HelpButton {...props} icon="bell" title="button title" />)
      expect(
        document.querySelector('.dnb-button').getAttribute('aria-label')
      ).toBe('button title')
      expect(
        document.querySelector('.dnb-button').textContent.trim()
      ).toBe('‌')
    })

    it('should use given aria-label if title is given, but no text', () => {
      render(
        <HelpButton
          {...props}
          icon="bell"
          title="button title"
          aria-label="custom aria-label"
        />
      )
      expect(
        document.querySelector('.dnb-button').getAttribute('aria-label')
      ).toBe('custom aria-label')
      expect(
        document.querySelector('.dnb-button').textContent.trim()
      ).toBe('‌')
    })

    it('should validate with ARIA rules', async () => {
      const Component = render(<HelpButton {...props} icon="bell" />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  it('should open a dialog if children are given', () => {
    const dialogContent = 'Dialog Content'
    render(<HelpButton {...props}>{dialogContent}</HelpButton>)

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const id = `dnb-modal-${props.id}`
    const dialogElem = document.getElementById(id)
    const textContent = String(dialogElem.textContent).replace(
      /\u200C/g,
      ''
    )

    expect(textContent).toContain(dialogContent)
  })

  it('should return given render element', () => {
    render(
      <HelpButton
        title="Title"
        render={(children, props) => (
          <Dialog triggerAttributes={props} className="custom-class">
            {children}
          </Dialog>
        )}
      >
        Help text
      </HelpButton>
    )

    fireEvent.click(document.querySelector('button.dnb-modal__trigger'))

    const dialogElem = document.querySelector('.custom-class')

    expect(
      dialogElem.querySelector('.dnb-dialog__header').textContent
    ).toBe('Title')
    expect(
      dialogElem.querySelector('.dnb-dialog__content').textContent
    ).toBe('Help text')
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<HelpButton {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('HelpButton scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-help-button-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
