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
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../Pagination'

// just to make sure we re-run the test in watch mode due to changes in theese files
import _pagination from '../style/_pagination.scss' // eslint-disable-line
import dnb_pagination from '../style/dnb-pagination.scss' // eslint-disable-line
import dnb_pagination_theme_ui from '../style/themes/dnb-pagination-theme-ui.scss' // eslint-disable-line

const snapshotProps = {
  ...fakeProps(require.resolve('../Pagination'), {
    all: true,
    optional: true
  })
  // starutp_page: null
}

const props = {
  page_count: 30,
  // starutp_page: null,
  current_page: 15
}

describe('Pagination bar component', () => {
  const Comp = mount(<Component {...props} />)

  it('has correct state at startup', () => {
    const innerElem = Comp.find('.dnb-pagination__bar__inner')

    expect(innerElem.find('button.dnb-pagination__button').length).toBe(7)
    expect(innerElem.find('button.dnb-button--secondary').length).toBe(6)
    expect(innerElem.find('button.dnb-button--primary').length).toBe(1)
  })

  it('reacts to prop changes', () => {
    // const Comp = mount(<Component {...props} />)

    Comp.setProps({
      current_page: 1
    })

    const buttonElements = Comp.find('.dnb-pagination__bar__inner').find(
      'button.dnb-pagination__button'
    )

    const firstButton = buttonElements.at(0)
    expect(firstButton.hasClass('dnb-button--primary')).toBe(true)
    expect(firstButton.instance().getAttribute('aria-current')).toBe(
      'page'
    )

    const secondButton = buttonElements.at(1)
    expect(secondButton.hasClass('dnb-button--secondary')).toBe(true)
    expect(secondButton.instance().hasAttribute('aria-current')).toBe(
      false
    )

    const prevNavButton = Comp.find('button.dnb-pagination__button').at(0)
    expect(prevNavButton.instance().hasAttribute('disabled')).toBe(true)
    expect(
      prevNavButton
        .find('span.dnb-icon')
        .instance()
        .getAttribute('aria-label')
    ).toBe('chevron left icon')
  })

  it('accepts element in the function return', () => {
    const Comp = mount(
      <Component page_count={3} current_page={2}>
        {({ pageNo }) => <div>{pageNo}</div>}
      </Component>
    )
    expect(Comp.find('.dnb-pagination__content').text()).toBe('2')
  })

  it('sets content with setContent', () => {
    const Comp = mount(
      <Component page_count={3} current_page={2}>
        {({ pageNo, setContent }) => {
          setContent(pageNo, <div>{pageNo}</div>)
        }}
      </Component>
    )
    expect(Comp.find('.dnb-pagination__content').text()).toBe('2')

    const nextButton = Comp.find('div.dnb-pagination__bar')
      .find('button.dnb-pagination__button')
      .find('.dnb-button--size-small')
      .at(1)

    expect(nextButton.instance().getAttribute('title')).toBe('Neste side')

    nextButton.simulate('click')
    expect(Comp.find('.dnb-pagination__content').text()).toBe('3')
  })

  it('has valid on_change callback', () => {
    const on_change = jest.fn()

    const Comp = mount(<Component {...props} on_change={on_change} />)

    const nextButton = Comp.find('div.dnb-pagination__bar')
      .find('button.dnb-pagination__button')
      .find('.dnb-button--size-small')
      .at(1)

    nextButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].page).toBe(16)

    nextButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].page).toBe(17)
  })

  const CheckComponent = mount(<Component {...snapshotProps} />)

  // compare the snapshot
  it('have to match snapshot', () => {
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tabs', async () => {
    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
  })
})

describe('Pagination scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-pagination.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-pagination-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
