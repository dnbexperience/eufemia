/**
 * Pagination Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import type {
  PaginationProps} from '../Pagination';
import Pagination, {
  createPagination,
  Bar
} from '../Pagination'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import Provider from '../../../shared/Provider'

const nb = nbNO['nb-NO'].Pagination
const en = enGB['en-GB'].Pagination

describe('Pagination bar', () => {
  const props: PaginationProps = {
    pageCount: 30,
    currentPage: 15,
  }

  it('has correct state at startup', () => {
    render(<Pagination {...props} />)
    const innerElem = document.querySelector('.dnb-pagination__bar__inner')

    expect(
      innerElem.querySelectorAll('button.dnb-pagination__button').length
    ).toBe(9)
    expect(
      innerElem.querySelectorAll('button.dnb-button--secondary').length
    ).toBe(8)
    expect(
      innerElem.querySelectorAll('button.dnb-button--primary').length
    ).toBe(1)
  })

  it('reacts to prop changes with valid button attributes', () => {
    const { rerender } = render(
      <Pagination {...props}>
        <div id="page-content">content</div>
      </Pagination>
    )

    expect(document.querySelector('div#page-content')).toBeInTheDocument()

    rerender(
      <Pagination {...props} currentPage={1}>
        <div id="page-content">content</div>
      </Pagination>
    )

    expect(document.querySelector('div#page-content')).toBeInTheDocument()

    const buttonElements = document
      .querySelector('.dnb-pagination__bar__inner')
      .querySelectorAll('button.dnb-pagination__button')

    const firstButton = buttonElements[0]
    expect(firstButton.classList).toContain('dnb-button--primary')
    expect(firstButton.getAttribute('aria-current')).toBe('page')

    const secondButton = buttonElements[1]
    expect(secondButton.classList).toContain('dnb-button--secondary')
    expect(secondButton).not.toHaveAttribute('aria-current')

    const prevNavButton = document.querySelectorAll('.dnb-button')[0]
    expect(prevNavButton).toHaveAttribute('disabled')
    expect(
      prevNavButton
        .querySelector('span.dnb-icon')

        .getAttribute('data-testid')
    ).toBe('chevron left icon')
  })

  it('reacts to prop changes and calls the render prop fn', () => {
    // Set our test reference
    let currentPage = 15

    const { rerender } = render(
      <Pagination {...props}>
        {({ pageNumber }) => {
          // Update our test reference
          currentPage = pageNumber

          return <div id="page-no">{pageNumber}</div>
        }}
      </Pagination>
    )

    expect(document.querySelector('div#page-no').textContent).toBe('15')

    const buttonElements = document
      .querySelector('.dnb-pagination__bar__inner')
      .querySelectorAll('button.dnb-pagination__button')

    fireEvent.click(buttonElements[2])
    expect(currentPage).toBe(13)
    expect(document.querySelector('div#page-no').textContent).toBe('13')

    fireEvent.click(buttonElements[3])
    expect(currentPage).toBe(14)
    expect(document.querySelector('div#page-no').textContent).toBe('14')

    rerender(
      <Pagination {...props} currentPage={5}>
        {({ pageNumber }) => {
          // Update our test reference
          currentPage = pageNumber

          return <div id="page-no">{pageNumber}</div>
        }}
      </Pagination>
    )
    expect(currentPage).toBe(5)
    expect(document.querySelector('div#page-no').textContent).toBe('5')

    rerender(
      <Pagination {...props} currentPage={3}>
        {({ pageNumber }) => {
          // Update our test reference
          currentPage = pageNumber

          return <div id="page-no">{pageNumber}</div>
        }}
      </Pagination>
    )
    expect(currentPage).toBe(3)
    expect(document.querySelector('div#page-no').textContent).toBe('3')
  })

  it('accepts element in the function return', () => {
    render(
      <Pagination pageCount={3} startupPage={2}>
        {({ pageNumber }) => <div>{pageNumber}</div>}
      </Pagination>
    )
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('2')
  })

  it('sets content with setContent', () => {
    render(
      <Pagination pageCount={3} startupPage={2}>
        {({ pageNumber, setContent }) => {
          setContent(pageNumber, <div>{pageNumber}</div>)
        }}
      </Pagination>
    )
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('2')

    const nextButton = document
      .querySelector('div.dnb-pagination__bar')
      .querySelector('.dnb-pagination__bar__skip')
      .querySelectorAll('.dnb-button')[1]

    expect(nextButton.getAttribute('title')).toBe('Neste side')

    fireEvent.click(nextButton)

    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('3')
  })

  it('should set correct class when paginationBarLayout is set to "horizontal"', () => {
    render(
      <Pagination
        pageCount={3}
        startupPage={2}
        paginationBarLayout="horizontal"
      >
        {({ pageNumber, setContent }) => {
          setContent(pageNumber, <div>{pageNumber}</div>)
        }}
      </Pagination>
    )
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('2')

    expect(document.querySelector('.dnb-pagination')).toHaveClass(
      'dnb-pagination--layout-horizontal'
    )
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
          <Pagination pageCount={3} startupPage={2}>
            {({ pageNumber, setContent }) => {
              setContent(
                pageNumber,
                <code>{JSON.stringify({ pageNumber, count })}</code>
              )
            }}
          </Pagination>
        </>
      )
    }
    render(<Rerender />)

    expect(document.querySelector('#button').textContent).toBe('1')
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('{"pageNumber":2,"count":1}')

    fireEvent.click(document.querySelector('#button'))

    expect(document.querySelector('#button').textContent).toBe('2')
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('{"pageNumber":2,"count":2}')

    const nextButton = document
      .querySelector('div.dnb-pagination__bar')
      .querySelector('.dnb-pagination__bar__skip')
      .querySelectorAll('.dnb-button')[1]

    fireEvent.click(nextButton)
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('{"pageNumber":3,"count":2}')

    fireEvent.click(document.querySelector('#button'))
    expect(
      document.querySelector('.dnb-pagination__content').textContent
    ).toBe('{"pageNumber":3,"count":3}')
  })

  it('has valid onChange callback', () => {
    const onChange = jest.fn()

    render(<Pagination {...props} onChange={onChange} />)

    const nextButton = document
      .querySelector('div.dnb-pagination__bar')
      .querySelector('.dnb-pagination__bar__skip')
      .querySelectorAll('.dnb-button')[1]

    fireEvent.click(nextButton)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].pageNumber).toBe(16)

    fireEvent.click(nextButton)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].pageNumber).toBe(17)
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

  const props: PaginationProps = {
    pageCount: 5,
    currentPage: 3,
    minWaitTime: 0,
  }

  const PageItem = ({ children }) => (
    <div className="page-item">{children}</div>
  )

  const waitForComponent = async () => {
    await wait(20)
  }

  it('should load pages with intersection observer (after)', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const onEnd = jest.fn()
    const onStartup = jest.fn(action)
    const onChange = jest.fn(action)
    const onLoad = jest.fn()
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
      await waitForComponent()
    }

    render(
      <Pagination
        mode="infinity"
        {...props}
        onStartup={onStartup}
        onChange={onChange}
        onLoad={onLoad}
        onEnd={onEnd}
      />
    )

    await waitForComponent()

    await intersect()
    expect(observe).toHaveBeenCalledTimes(2)

    expect(document.querySelectorAll('div.page-item').length).toBe(2)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      '3'
    )
    expect(document.querySelectorAll('div.page-item')[1].textContent).toBe(
      '4'
    )

    await intersect()
    expect(observe).toHaveBeenCalledTimes(3)

    expect(document.querySelectorAll('div.page-item').length).toBe(3)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      '3'
    )
    expect(document.querySelectorAll('div.page-item')[1].textContent).toBe(
      '4'
    )
    expect(document.querySelectorAll('div.page-item')[2].textContent).toBe(
      '5'
    )

    expect(disconnect).toHaveBeenCalledTimes(2)

    await intersect()

    expect(onStartup).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenCalledTimes(3)
    expect(onEnd).toHaveBeenCalledTimes(1)
  })

  it('should handle startupCount properly', async () => {
    let resetInfinityHandler

    const onStartup = jest.fn()
    const onChange = jest.fn()

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
      await waitForComponent()
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
          minWaitTime={0}
          currentPage={currentPage}
          startupCount={2}
          onStartup={(e) => {
            action(e)
            onStartup(e)
          }}
          onChange={(e) => {
            action(e)
            onChange(e)
          }}
        >
          {items}
        </InfinityMarker>
      )
    }

    render(<MyComponent />)

    await waitForComponent()

    expect(document.querySelectorAll('div.page-item').length).toBe(20)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      'page-11'
    )
    expect(
      document.querySelectorAll('div.page-item')[
        document.querySelectorAll('div.page-item').length - 1
      ].textContent
    ).toBe('page-30')

    await intersect()

    expect(document.querySelectorAll('div.page-item').length).toBe(30)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      'page-11'
    )
    expect(
      document.querySelectorAll('div.page-item')[
        document.querySelectorAll('div.page-item').length - 1
      ].textContent
    ).toBe('page-40')

    await waitForComponent()
    await intersect()

    expect(document.querySelectorAll('div.page-item').length).toBe(40)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      'page-11'
    )
    expect(
      document.querySelectorAll('div.page-item')[
        document.querySelectorAll('div.page-item').length - 1
      ].textContent
    ).toBe('page-50')

    localStack.current = {}
    resetInfinityHandler()

    await waitForComponent()

    expect(document.querySelectorAll('div.page-item').length).toBe(10)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      'page-21'
    )
    expect(
      document.querySelectorAll('div.page-item')[
        document.querySelectorAll('div.page-item').length - 1
      ].textContent
    ).toBe('page-30')
  })

  it('should handle re-render with decreasing currentPage and not show the loadbar', async () => {
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
        <InfinityMarker minWaitTime={0} currentPage={currentPage}>
          {items}
        </InfinityMarker>
      )
    }

    render(<MyComponent />)

    await waitForComponent()

    expect(document.querySelectorAll('div.page-item').length).toBe(20)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      'page-1'
    )
    expect(
      document.querySelectorAll('div.page-item')[
        document.querySelectorAll('div.page-item').length - 1
      ].textContent
    ).toBe('page-20')
    expect(
      document.querySelector('div.dnb-pagination__loadbar')
    ).not.toBeInTheDocument()
  })

  it('should load pages with load more button (before)', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const onStartup = jest.fn(action)
    const onChange = jest.fn(action)
    const onLoad = jest.fn()

    const clickOnLoadMore = async () => {
      fireEvent.click(
        document.querySelector('div.dnb-pagination__loadbar button')
      )

      await waitForComponent()
    }

    render(
      <Pagination
        mode="infinity"
        {...props}
        onStartup={onStartup}
        onChange={onChange}
        onLoad={onLoad}
      />
    )

    await waitForComponent()

    expect(document.querySelectorAll('div.page-item').length).toBe(1)

    await clickOnLoadMore()

    expect(document.querySelectorAll('div.page-item').length).toBe(2)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      '2'
    )

    await clickOnLoadMore()

    expect(document.querySelectorAll('div.page-item').length).toBe(3)
    expect(document.querySelectorAll('div.page-item')[0].textContent).toBe(
      '1'
    )
    expect(
      document.querySelector('div.dnb-pagination__loadbar')
    ).not.toBeInTheDocument()

    expect(onStartup).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenCalledTimes(3)
  })

  it('will pass children', () => {
    render(
      <Pagination mode="infinity" {...props}>
        <div id="page-content">content</div>
      </Pagination>
    )

    expect(document.querySelector('div#page-content')).toBeInTheDocument()
  })

  it('should support locale from provider', () => {
    const { rerender } = render(
      <Provider>
        <Pagination {...props} />
      </Provider>
    )

    const element = document.querySelector(
      '.dnb-pagination__bar__skip button'
    )

    expect(element.textContent).toContain(nb.prevTitle)

    rerender(
      <Provider locale="en-GB">
        <Pagination {...props} />
      </Provider>
    )

    expect(element.textContent).toContain(en.prevTitle)

    rerender(
      <Provider locale="nb-NO">
        <Pagination {...props} />
      </Provider>
    )

    expect(element.textContent).toContain(nb.prevTitle)
  })

  it('should support spacing props', () => {
    render(<Pagination top="2rem" {...props} />)

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

  it('should support pagination bar space prop', () => {
    render(<Pagination barSpace="2rem" {...props} />)

    const element = document.querySelector('.dnb-pagination__bar')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-pagination__bar',
        'dnb-space__top--large',
      ])
    )
  })

  it('should support InfinityMarker from createPagination', async () => {
    let resetInfinityHandler

    const onStartup = jest.fn()
    const onChange = jest.fn()
    const onLoad = jest.fn()
    const onEnd = jest.fn()

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
          minWaitTime={0}
          currentPage={currentPage}
          onStartup={(e) => {
            action(e)
            onStartup(e)
          }}
          onChange={(e) => {
            action(e)
            onChange(e)
          }}
          onLoad={onLoad}
          onEnd={onEnd}
        >
          <div id="page-content">page-{currentPage}</div>
        </InfinityMarker>
      )
    }

    render(<MyComponent />)

    await waitForComponent()

    const clickOnLoadMore = async () => {
      fireEvent.click(
        document.querySelector('div.dnb-pagination__loadbar button')
      )

      await waitForComponent()
    }

    expect(document.querySelector('div#page-content').textContent).toBe(
      'page-3'
    )

    await clickOnLoadMore()

    expect(document.querySelector('div#page-content').textContent).toBe(
      'page-2'
    )

    await clickOnLoadMore()

    expect(document.querySelector('div#page-content').textContent).toBe(
      'page-1'
    )

    expect(onStartup).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenCalledTimes(3)
    expect(onEnd).toHaveBeenCalledTimes(1)

    resetInfinityHandler()

    await waitForComponent()

    expect(document.querySelector('div#page-content').textContent).toBe(
      'page-3'
    )

    expect(onStartup).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenCalledTimes(4)
    expect(onEnd).toHaveBeenCalledTimes(1)
  })

  it('should show pagination bar using Bar component', () => {
    render(<Bar skeleton={false} />)

    expect(
      document.querySelector('.dnb-pagination__bar')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-pagination__indicator')
    ).not.toBeInTheDocument()
  })

  it('should forward load button props', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const onStartup = jest.fn(action)

    render(
      <Pagination
        mode="infinity"
        {...props}
        onStartup={onStartup}
        useLoadButton
        loadButton={{ text: 'Load please', iconPosition: 'right' }}
      />
    )

    await waitForComponent()

    const loadButton = document.querySelector(
      '.dnb-button--secondary'
    ) as HTMLButtonElement

    expect(loadButton).toHaveTextContent('Load please')
    expect(loadButton).toHaveClass('dnb-button--icon-position-right')
  })

  it('should accept custom component as value for loadButton', async () => {
    const action = ({ pageNumber, setContent }) => {
      setContent(pageNumber, <PageItem>{pageNumber}</PageItem>)
    }

    const onStartup = jest.fn(action)

    render(
      <Pagination
        mode="infinity"
        {...props}
        onStartup={onStartup}
        useLoadButton
        loadButton={() => (
          <button className="my-cool-button">The best load button</button>
        )}
      />
    )

    await waitForComponent()

    const loadButton = document.querySelector(
      '.my-cool-button'
    ) as HTMLButtonElement

    expect(loadButton).toHaveTextContent('The best load button')
    expect(loadButton.tagName).toBe('BUTTON')
  })
})

describe('Pagination ARIA', () => {
  it('should validate with ARIA rules for pagination bar', async () => {
    const snapshotProps: PaginationProps = {
      pageCount: 4,
      currentPage: 2,
    }

    const result = render(<Pagination {...snapshotProps} />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('should validate with ARIA rules for Infinity Scroller', async () => {
    const result = render(
      <Pagination
        mode="infinity"
        pageCount={5}
        currentPage={3}
        minWaitTime={0}
      />
    )
    await wait(1)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Pagination scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-pagination-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
