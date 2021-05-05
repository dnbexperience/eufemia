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

const snapshotProps = {
  ...fakeProps(require.resolve('../Pagination'), {
    all: true,
    optional: true
  })
}

const props = {
  page_count: 30,
  current_page: 15
}

describe('Pagination bar component', () => {
  it('has correct state at startup', () => {
    const Comp = mount(<Component {...props} />)
    const innerElem = Comp.find('.dnb-pagination__bar__inner')

    expect(innerElem.find('button.dnb-pagination__button').length).toBe(7)
    expect(innerElem.find('button.dnb-button--secondary').length).toBe(6)
    expect(innerElem.find('button.dnb-button--primary').length).toBe(1)
  })

  it('reacts to prop changes with valid button attributes', () => {
    const Comp = mount(
      <Component {...props}>
        <div id="page-content">content</div>
      </Component>
    )

    expect(Comp.exists('div#page-content')).toBe(true)

    Comp.setProps({
      current_page: 1
    })

    Comp.update()
    expect(Comp.exists('div#page-content')).toBe(true)

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
        .getAttribute('data-test-id')
    ).toBe('chevron left icon')
  })

  it('reacts to prop changes and calls the render prop fn', () => {
    // Set our test reference
    let currentPage = 15

    const Comp = mount(
      <Component {...props}>
        {({ pageNumber }) => {
          // Update our test reference
          currentPage = pageNumber

          return <div id="page-no">{pageNumber}</div>
        }}
      </Component>
    )

    expect(Comp.find('div#page-no').text()).toBe('15')

    const buttonElements = Comp.find('.dnb-pagination__bar__inner').find(
      'button.dnb-pagination__button'
    )

    buttonElements.at(2).simulate('click')
    expect(currentPage).toBe(14)
    expect(Comp.find('div#page-no').text()).toBe('14')

    Comp.setProps({
      current_page: 5
    })
    expect(currentPage).toBe(5)
    expect(Comp.find('div#page-no').text()).toBe('5')

    buttonElements.at(3).simulate('click')
    expect(currentPage).toBe(15)
    expect(Comp.find('div#page-no').text()).toBe('15')

    Comp.setProps({
      current_page: 3
    })
    expect(currentPage).toBe(3)
    expect(Comp.find('div#page-no').text()).toBe('3')
  })

  it('accepts element in the function return', () => {
    const Comp = mount(
      <Component page_count={3} startup_page={2}>
        {({ pageNumber }) => <div>{pageNumber}</div>}
      </Component>
    )
    expect(Comp.find('.dnb-pagination__content').text()).toBe('2')
  })

  it('sets content with setContent', () => {
    const Comp = mount(
      <Component page_count={3} startup_page={2}>
        {({ pageNumber, setContent }) => {
          setContent(pageNumber, <div>{pageNumber}</div>)
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

  it('rerenders properly', () => {
    const Rerender = () => {
      const [count, incrementBy] = React.useReducer((state, count) => {
        return state + count
      }, 1)
      const onClickHandler = () => incrementBy(1)
      return (
        <>
          <button id="button" onClick={onClickHandler}>
            {count}
          </button>
          <Component page_count={3} startup_page={2}>
            {({ pageNumber, setContent }) => {
              setContent(
                pageNumber,
                <code>{JSON.stringify({ pageNumber, count })}</code>
              )
            }}
          </Component>
        </>
      )
    }
    const Comp = mount(<Rerender />)

    expect(Comp.find('#button').text()).toBe('1')
    expect(Comp.find('.dnb-pagination__content').text()).toBe(
      '{"pageNumber":2,"count":1}'
    )

    Comp.find('#button').simulate('click')
    expect(Comp.find('#button').text()).toBe('2')
    expect(Comp.find('.dnb-pagination__content').text()).toBe(
      '{"pageNumber":2,"count":2}'
    )

    const nextButton = Comp.find('div.dnb-pagination__bar')
      .find('button.dnb-pagination__button')
      .find('.dnb-button--size-small')
      .at(1)

    nextButton.simulate('click')
    expect(Comp.find('.dnb-pagination__content').text()).toBe(
      '{"pageNumber":3,"count":2}'
    )

    Comp.find('#button').simulate('click')
    expect(Comp.find('.dnb-pagination__content').text()).toBe(
      '{"pageNumber":3,"count":3}'
    )
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

  it('should validate with ARIA rules', async () => {
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
