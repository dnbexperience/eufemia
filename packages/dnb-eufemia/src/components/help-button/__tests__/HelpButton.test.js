/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../HelpButton'
import {
  question as QuestionIcon,
  information_medium as InformationIcon,
} from '../../../icons'

const snapshotProps = fakeProps(require.resolve('../HelpButton'), {})
snapshotProps.id = 'help-button'

const modal_props = {}
modal_props.content_id = null
modal_props.no_animation = true

const props = { modal_props }
props.id = 'help-button'

describe('HelpButton component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have question icon by default', () => {
    const Comp = mount(<Component {...props} />)
    expect(
      Comp.find('.dnb-icon').instance().getAttribute('data-test-id')
    ).toBe('question icon')
    expect(Comp.find('svg').html()).toBe(mount(<QuestionIcon />).html())
    expect(Comp.find('.dnb-button').text().trim()).toBe('‌')
  })

  it('should use "information" icon when set', () => {
    const Comp = mount(<Component {...props} icon="information" />)
    expect(
      Comp.find('.dnb-icon').instance().getAttribute('data-test-id')
    ).toBe('information icon')
    expect(Comp.find('svg').html()).toBe(mount(<InformationIcon />).html())
    expect(Comp.find('.dnb-button').text().trim()).toBe('‌')
  })

  it('should use given icon', () => {
    const Comp = mount(<Component {...props} icon={InformationIcon} />)
    expect(
      Comp.find('.dnb-icon').instance().getAttribute('data-test-id')
    ).toBe('information medium icon')
    expect(Comp.find('svg').html()).toBe(mount(<InformationIcon />).html())
    expect(Comp.find('.dnb-button').text().trim()).toBe('‌')
  })

  it('should have correct role description', () => {
    const Comp = mount(<Component {...props} />)
    expect(
      Comp.find('.dnb-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')
  })

  describe('with bell icon', () => {
    it('should have correct aria-label', () => {
      const Comp = mount(<Component {...props} icon="bell" />)
      expect(
        Comp.find('.dnb-button').instance().getAttribute('aria-label')
      ).toBe('Hjelpetekst')
    })

    it('should have not aria-label if text is given', () => {
      const Comp = mount(
        <Component {...props} icon="bell" text="button text" />
      )
      expect(
        Comp.find('.dnb-button').instance().hasAttribute('aria-label')
      ).toBe(false)
      expect(Comp.find('.dnb-button').text().trim()).toBe('‌button text')
    })

    it('should have aria-label if title is given, but no text', () => {
      const Comp = mount(
        <Component {...props} icon="bell" title="button title" />
      )
      expect(
        Comp.find('.dnb-button').instance().getAttribute('aria-label')
      ).toBe('button title')
      expect(Comp.find('.dnb-button').text().trim()).toBe('‌')
    })

    it('should use given aria-label if title is given, but no text', () => {
      const Comp = mount(
        <Component
          {...props}
          icon="bell"
          title="button title"
          aria-label="custom aria-label"
        />
      )
      expect(
        Comp.find('.dnb-button').instance().getAttribute('aria-label')
      ).toBe('custom aria-label')
      expect(Comp.find('.dnb-button').text().trim()).toBe('‌')
    })

    it('should validate with ARIA rules', async () => {
      const Comp = mount(<Component {...props} icon="bell" />)
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })

  it('should open a modal if children are given', () => {
    const modalContent = 'Modal Content'
    const Comp = mount(<Component {...props}>{modalContent}</Component>)

    Comp.find('button.dnb-modal__trigger').simulate('click')

    const id = `dnb-modal-${props.id}`
    const modalElem = document.getElementById(id)
    const textContent = String(modalElem.textContent).replace(
      /\u200C/g,
      ''
    )

    expect(textContent).toContain(modalContent)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('HelpButton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-help-button.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-help-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
