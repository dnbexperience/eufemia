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
import { render } from '@testing-library/react'
import Component, { createPagination, Bar } from '../Pagination'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import Provider from '../../../shared/Provider'

const snapshotProps = {
  ...fakeProps(require.resolve('../Pagination'), {
    all: true,
    optional: true,
  }),
}
snapshotProps.page_count = 4
snapshotProps.current_page = 2

const nb = nbNO['nb-NO'].Pagination
const en = enGB['en-GB'].Pagination

describe('Pagination bar', () => {
  const props = {
    page_count: 30,
    current_page: 15,
  }

  it('has correct state at startup', () => {
    const Comp = mount(<Component {...props} />)
    const innerElem = Comp.find('.dnb-pagination__bar__inner')

    expect(innerElem.find('button.dnb-pagination__button').length).toBe(9)
    expect(innerElem.find('button.dnb-button--secondary').length).toBe(8)
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
      current_page: 1,
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

    const prevNavButton = Comp.find('.dnb-button').at(0)
    expect(prevNavButton.instance().hasAttribute('disabled')).toBe(true)
    expect(
      prevNavButton
        .find('span.dnb-icon')
        .instance()
        .getAttribute('data-testid')
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
    expect(currentPage).toBe(13)
    expect(Comp.find('div#page-no').text()).toBe('13')

    Comp.setProps({
      current_page: 5,
    })
    expect(currentPage).toBe(5)
    expect(Comp.find('div#page-no').text()).toBe('5')

    buttonElements.at(3).simulate('click')
    expect(currentPage).toBe(14)
    expect(Comp.find('div#page-no').text()).toBe('14')

    Comp.setProps({
      current_page: 3,
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
      .find('.dnb-pagination__bar__skip')
      .find('.dnb-button')
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
      .find('.dnb-pagination__bar__skip')
      .find('.dnb-button')
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
      .find('.dnb-pagination__bar__skip')
      .find('.dnb-button')
      .at(1)

    nextButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].pageNumber).toBe(16)

    nextButton.simulate('click')
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_change.mock.calls[1][0].pageNumber).toBe(17)
  })

  // compare the snapshot
  it('have to match snapshot', () => {
    const CheckComponent = mount(<Component {...snapshotProps} />)
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    const CheckComponent = mount(<Component {...snapshotProps} />)
    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
  })
})

describe('Infinity scroller', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      }
    })
  })

  const props = {
    page_count: 5,
    current_page: 3,
    min_wait_time: 0,
  }

  const PageItem = ({ children }) => (
    <div className="page-item">{children}</div>
  )

  const rerenderComponent = async (Comp) => {
    await wait(10)
    Comp.update()
  }

  it('should load pages with intersection observer (after)', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const on_end = jest.fn()
    const on_startup = jest.fn(action)
    const on_change = jest.fn(action)
    const on_load = jest.fn()
    const observe = jest.fn()
    const disconnect = jest.fn()

    let callObserver
    window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
      callObserver = cb
      return {
        observe,
        disconnect,
      }
    })

    const intersect = async () => {
      callObserver([{ isIntersecting: true }])
      await rerenderComponent(Comp)
    }

    const Comp = mount(
      <Component
        mode="infinity"
        {...props}
        on_startup={on_startup}
        on_change={on_change}
        on_load={on_load}
        on_end={on_end}
      />
    )

    await rerenderComponent(Comp)

    await intersect()
    expect(observe).toHaveBeenCalledTimes(2)

    Comp.update()
    expect(Comp.find('div.page-item').length).toBe(2)
    expect(Comp.find('div.page-item').at(0).text()).toBe('3')
    expect(Comp.find('div.page-item').at(1).text()).toBe('4')

    await intersect()
    expect(observe).toHaveBeenCalledTimes(3)

    Comp.update()
    expect(Comp.find('div.page-item').length).toBe(3)
    expect(Comp.find('div.page-item').at(0).text()).toBe('3')
    expect(Comp.find('div.page-item').at(1).text()).toBe('4')
    expect(Comp.find('div.page-item').at(2).text()).toBe('5')

    expect(disconnect).toHaveBeenCalledTimes(2)

    await intersect()

    expect(on_startup).toHaveBeenCalledTimes(1)
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_load).toHaveBeenCalledTimes(3)
    expect(on_end).toHaveBeenCalledTimes(1)
  })

  it('should handle startup_count properly', async () => {
    let resetInfinityHandler

    const on_startup = jest.fn()
    const on_change = jest.fn()

    let callObserver
    window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
      callObserver = cb
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      }
    })

    const intersect = async () => {
      callObserver([{ isIntersecting: true }])
      await rerenderComponent(Comp)
    }

    const startupPage = 2
    const perPageCount = 10

    const tableItems = []
    for (let i = 1; i <= 60; i++) {
      tableItems.push({
        ssn: i,
        content: <PageItem key={i}>page-{i}</PageItem>,
      })
    }

    const localStack = { current: {} }

    const MyComponent = () => {
      const [{ InfinityMarker, endInfinity, resetInfinity }] =
        React.useState(createPagination)
      const [currentPage, setCurrentPage] = React.useState(startupPage)

      resetInfinityHandler = resetInfinity

      tableItems
        .filter((cur, idx) => {
          const floor = (currentPage - 1) * perPageCount
          const ceil = floor + perPageCount
          return idx >= floor && idx < ceil
        })
        .forEach((item) => {
          localStack.current[item.ssn] = item.content
        })
      const items = Object.values(localStack.current)

      const action = ({ pageNumber }) => {
        setCurrentPage(pageNumber)

        if (pageNumber === 1) {
          endInfinity()
        }
      }

      return (
        <InfinityMarker
          min_wait_time={0}
          current_page={currentPage}
          startup_count={2}
          on_startup={(e) => {
            action(e)
            on_startup(e)
          }}
          on_change={(e) => {
            action(e)
            on_change(e)
          }}
        >
          {items}
        </InfinityMarker>
      )
    }

    const Comp = mount(<MyComponent />)

    await rerenderComponent(Comp)

    expect(Comp.find('div.page-item').length).toBe(20)
    expect(Comp.find('div.page-item').at(0).text()).toBe('page-11')
    expect(Comp.find('div.page-item').last().text()).toBe('page-30')

    await intersect()

    Comp.update()
    expect(Comp.find('div.page-item').length).toBe(30)
    expect(Comp.find('div.page-item').at(0).text()).toBe('page-11')
    expect(Comp.find('div.page-item').last().text()).toBe('page-40')

    await intersect()

    Comp.update()
    expect(Comp.find('div.page-item').length).toBe(40)
    expect(Comp.find('div.page-item').at(0).text()).toBe('page-11')
    expect(Comp.find('div.page-item').last().text()).toBe('page-50')

    localStack.current = {}
    resetInfinityHandler()

    await rerenderComponent(Comp)

    expect(Comp.find('div.page-item').length).toBe(20)
    expect(Comp.find('div.page-item').at(0).text()).toBe('page-11')
    expect(Comp.find('div.page-item').last().text()).toBe('page-30')
  })

  it('should handle re-render with decreasing current_page and not show the loadbar', async () => {
    const perPageCount = 10

    const tableItems = []
    for (let i = 1; i <= 60; i++) {
      tableItems.push({
        ssn: i,
        content: <PageItem key={i}>page-{i}</PageItem>,
      })
    }

    const localStack = { current: {} }

    const MyComponent = () => {
      const [{ InfinityMarker }] = React.useState(createPagination)

      // 1. Start with 2
      const [currentPage, setCurrentPage] = React.useState(2)

      tableItems
        .filter((cur, idx) => {
          const floor = (currentPage - 1) * perPageCount
          const ceil = floor + perPageCount
          return idx >= floor && idx < ceil
        })
        .forEach((item) => {
          localStack.current[item.ssn] = item.content
        })
      const items = Object.values(localStack.current)

      // 2. And set it back to 1
      React.useEffect(() => {
        setCurrentPage(1)
      }, [])

      return (
        <InfinityMarker min_wait_time={0} current_page={currentPage}>
          {items}
        </InfinityMarker>
      )
    }

    const Comp = mount(<MyComponent />)

    await rerenderComponent(Comp)

    expect(Comp.find('div.page-item').length).toBe(20)
    expect(Comp.find('div.page-item').at(0).text()).toBe('page-1')
    expect(Comp.find('div.page-item').last().text()).toBe('page-20')
    expect(Comp.find('div.dnb-pagination__loadbar').exists()).toBe(false)
  })

  it('should load pages with load more button (before)', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const on_startup = jest.fn(action)
    const on_change = jest.fn(action)
    const on_load = jest.fn()

    const clickOnLoadMore = async () => {
      Comp.find('div.dnb-pagination__loadbar button').simulate('click')

      await rerenderComponent(Comp)
    }

    const Comp = mount(
      <Component
        mode="infinity"
        {...props}
        on_startup={on_startup}
        on_change={on_change}
        on_load={on_load}
      />
    )

    await rerenderComponent(Comp)

    expect(Comp.find('div.page-item').length).toBe(1)

    await clickOnLoadMore()

    expect(Comp.find('div.page-item').length).toBe(2)
    expect(Comp.find('div.page-item').at(0).text()).toBe('2')

    await clickOnLoadMore()

    expect(Comp.find('div.page-item').length).toBe(3)
    expect(Comp.find('div.page-item').at(0).text()).toBe('1')
    expect(Comp.exists('div.dnb-pagination__loadbar')).toBe(false)

    expect(on_startup).toHaveBeenCalledTimes(1)
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_load).toHaveBeenCalledTimes(3)
  })

  it('will pass children', () => {
    const Comp = mount(
      <Component mode="infinity" {...props}>
        <div id="page-content">content</div>
      </Component>
    )

    expect(Comp.exists('div#page-content')).toBe(true)
  })

  it('should support locale from provider', () => {
    const { rerender } = render(
      <Provider>
        <Component {...props} />
      </Provider>
    )

    const element = document.querySelector(
      '.dnb-pagination__bar__skip button'
    )

    expect(element.textContent).toContain(nb.prev_title)

    rerender(
      <Provider locale="en-GB">
        <Component {...props} />
      </Provider>
    )

    expect(element.textContent).toContain(en.prev_title)

    rerender(
      <Provider locale="nb-NO">
        <Component {...props} />
      </Provider>
    )

    expect(element.textContent).toContain(nb.prev_title)
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" {...props} />)

    const element = document.querySelector('.dnb-pagination')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-pagination',
        'dnb-space__top--large',
        'dnb-pagination--left',
      ])
    )
  })

  it('should support InfinityMarker from createPagination', async () => {
    let resetInfinityHandler

    const on_startup = jest.fn()
    const on_change = jest.fn()
    const on_load = jest.fn()
    const on_end = jest.fn()

    const MyComponent = () => {
      const startupPage = 3
      const [{ InfinityMarker, endInfinity, resetInfinity }] =
        React.useState(createPagination)
      const [currentPage, setCurrentPage] = React.useState(startupPage)

      resetInfinityHandler = resetInfinity

      const action = ({ pageNumber }) => {
        setCurrentPage(pageNumber)

        if (pageNumber === 1) {
          endInfinity()
        }
      }

      return (
        <InfinityMarker
          min_wait_time={0}
          current_page={currentPage}
          on_startup={(e) => {
            action(e)
            on_startup(e)
          }}
          on_change={(e) => {
            action(e)
            on_change(e)
          }}
          on_load={on_load}
          on_end={on_end}
        >
          <div id="page-content">page-{currentPage}</div>
        </InfinityMarker>
      )
    }

    const Comp = mount(<MyComponent />)

    await rerenderComponent(Comp)

    const clickOnLoadMore = async () => {
      Comp.find('div.dnb-pagination__loadbar button').simulate('click')

      await rerenderComponent(Comp)
    }

    expect(Comp.find('div#page-content').text()).toBe('page-3')

    await clickOnLoadMore()

    expect(Comp.find('div#page-content').text()).toBe('page-2')

    await clickOnLoadMore()

    expect(Comp.find('div#page-content').text()).toBe('page-1')

    expect(on_startup).toHaveBeenCalledTimes(1)
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_load).toHaveBeenCalledTimes(3)
    expect(on_end).toHaveBeenCalledTimes(1)

    resetInfinityHandler()

    await rerenderComponent(Comp)

    expect(Comp.find('div#page-content').text()).toBe('page-3')

    expect(on_startup).toHaveBeenCalledTimes(2)
    expect(on_change).toHaveBeenCalledTimes(2)
    expect(on_load).toHaveBeenCalledTimes(4)
    expect(on_end).toHaveBeenCalledTimes(1)
  })

  it('should show pagination bar using Bar component', () => {
    const Comp = mount(<Bar skeleton={false} />)

    expect(Comp.exists('.dnb-pagination__bar')).toBe(true)
    expect(Comp.exists('.dnb-pagination__indicator')).toBe(false)
  })

  // compare the snapshot
  it('have to match snapshot', async () => {
    const CheckComponent = mount(<Component mode="infinity" {...props} />)
    await wait(1)
    CheckComponent.update()
    expect(toJson(CheckComponent)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    const CheckComponent = mount(<Component mode="infinity" {...props} />)
    await wait(1)
    CheckComponent.update()
    expect(await axeComponent(CheckComponent)).toHaveNoViolations()
  })
})

describe('Pagination scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-pagination-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))
