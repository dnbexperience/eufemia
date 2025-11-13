/**
 * DrawerList Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DrawerList, {
  DrawerListAllProps,
  DrawerListDataArray,
  DrawerListData,
  DrawerListGroupTitles,
} from '../DrawerList'
import DrawerListProvider from '../DrawerListProvider'
import DrawerListContext, {
  DrawerListContextProps,
} from '../DrawerListContext'
import { IsolatedStyleScope } from '../../../shared'
import Dialog from '../../../components/dialog/Dialog'
import {
  mockImplementationForDirectionObserver,
  testDirectionObserver,
} from './DrawerListTestMocks'
import locales from '../../../shared/locales/nb-NO'

const nbNO = locales['nb-NO'].DrawerList
mockImplementationForDirectionObserver()

// use noAnimation so we don't need to wait
const mockProps: DrawerListAllProps = {}

const props: DrawerListAllProps = {
  id: 'drawer-list-id',
  value: 2,
  opened: true,
  noAnimation: true,
}

const mockData: DrawerListDataArray = [
  {
    content: ['1234 56 78901', 'Brukskonto - Kari Nordmann'],
  },
  {
    content: ['1234 56 78902', 'Sparekonto - Ole Nordmann'],
  },
  {
    content: [
      '1134 56 78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    content: ['1534 96 48901', 'Oppussing - Ole Nordmann'],
  },
  {
    content: <>Custom content {'123'}</>,
  },
  <>Custom content {'123'}</>,
  [<React.Fragment key="key1">Custom content {'123'}</React.Fragment>],
]

describe('DrawerList component', () => {
  const getFocusedItemIndex = () => {
    const item = document.querySelector(
      'li.dnb-drawer-list__option.dnb-drawer-list__option--focus'
    )
    return Array.from(item?.parentElement.children || []).indexOf(item)
  }

  const getSelectedItemIndex = () => {
    const item = document.querySelector(
      'li.dnb-drawer-list__option.dnb-drawer-list__option--selected'
    )
    return Array.from(item?.parentElement.children || []).indexOf(item)
  }

  const isListFocused = () => {
    const item = document.querySelector(
      'ul.dnb-drawer-list__options.dnb-drawer-list__options--focusring'
    )
    return getFocusedItemIndex() === -1 && item !== null
  }

  it('has correct state at startup', () => {
    render(<DrawerList {...props} data={mockData} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
  })

  it('should skip portal when skipPortal is set', () => {
    render(<DrawerList {...props} data={mockData} skipPortal />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
    expect(
      document
        .querySelector('.dnb-drawer-list--opened')
        .closest('#eufemia-portal-root')
    ).toBeNull()
  })

  it('should not skip portal when skipPortal is not set', () => {
    render(<DrawerList {...props} data={mockData} />)
    expect(
      document
        .querySelector('.dnb-drawer-list--opened')
        .closest('#eufemia-portal-root')
    ).toBeInTheDocument()
  })

  it('has correct state after changing prop to opened', () => {
    const { rerender } = render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()

    rerender(<DrawerList {...props} data={mockData} opened={false} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).not.toBeInTheDocument()

    rerender(<DrawerList {...props} data={mockData} opened={true} />)
    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()
  })

  it('keeps dialog open when Escape is pressed inside the drawer list', async () => {
    render(
      <Dialog noAnimation openState title="Dialog">
        <DrawerList
          {...props}
          opened
          skip_portal
          no_animation
          data={mockData}
        />
      </Dialog>
    )

    expect(
      document.querySelector('.dnb-drawer-list--opened')
    ).toBeInTheDocument()

    const options = document.querySelector(
      '.dnb-drawer-list__options'
    ) as HTMLElement
    expect(options).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-drawer-list__options')
      ).not.toBeInTheDocument()
    })

    expect(document.documentElement).toHaveAttribute(
      'data-dnb-modal-active'
    )

    await userEvent.keyboard('{Escape}')

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-modal-active'
    )

    document.body.removeAttribute('style')
  })

  describe('with disabled option', () => {
    const disabledOptionProps = {
      opened: true,
      noAnimation: true,
      data: [
        { content: 'item 1' },
        { disabled: true, content: 'item 2' },
        { content: 'item 3' },
      ],
    }

    it('has correct attributes', async () => {
      render(<DrawerList {...disabledOptionProps} />)

      const options = document.querySelectorAll('.dnb-drawer-list__option')
      expect(options[1].getAttribute('disabled')).toEqual('')
      expect(options[1].getAttribute('aria-disabled')).toEqual('true')
    })

    it('sends onSelect events', async () => {
      const onSelect = jest.fn()

      render(<DrawerList {...disabledOptionProps} onSelect={onSelect} />)

      keydown(40) // down
      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect.mock.calls[0][0].activeItem).toBe(0)
      })

      keydown(40) // down
      await waitFor(() => {
        // onSelect is called when navigating to disabled item
        expect(onSelect).toHaveBeenCalledTimes(2)
        expect(onSelect.mock.calls[1][0].activeItem).toBe(1)
        expect(onSelect.mock.calls[1][0].data.disabled).toBe(true)
      })

      keydown(40) // down
      await waitFor(() => {
        // navigates to next item
        expect(onSelect).toHaveBeenCalledTimes(3)
        expect(onSelect.mock.calls[2][0].activeItem).toBe(2)
      })
    })

    it('cannot be clicked', async () => {
      const onChange = jest.fn()
      const onSelect = jest.fn()

      render(
        <DrawerList
          {...disabledOptionProps}
          onChange={onChange}
          onSelect={onSelect}
        />
      )

      keydown(40) // down
      keydown(40) // down
      await waitFor(() => {
        // verify item is disabled
        expect(onSelect).toHaveBeenCalledTimes(2)
        expect(onSelect.mock.calls[1][0].activeItem).toBe(1)
        expect(onSelect.mock.calls[1][0].data.disabled).toBe(true)
      })

      keydown(13) // enter
      await waitFor(() => {
        // onChange and onSelect is not called when attempting to chose a disabled item
        expect(onChange).toHaveBeenCalledTimes(0)
        expect(onSelect).toHaveBeenCalledTimes(2)
      })

      await fireEvent.click(
        document.querySelectorAll('.dnb-drawer-list__option')[1]
      )
      await waitFor(() => {
        // onChange and onSelect is not called when attempting to click a disabled item
        expect(onChange).toHaveBeenCalledTimes(0)
        expect(onSelect).toHaveBeenCalledTimes(2)
      })
    })
  })

  it('handles defaultValue correctly on forcing re-render', () => {
    const { rerender } = render(
      <DrawerList
        opened
        noAnimation
        data={mockData}
        defaultValue={props.value}
        {...mockProps}
      />
    )

    expect(getSelectedItemIndex()).toBe(props.value)
    expect(getFocusedItemIndex()).toBe(props.value)

    // force re-render by prop change
    const title = 'show this attribute now'
    rerender(
      <DrawerList
        opened
        noAnimation
        data={mockData}
        defaultValue={props.value}
        {...mockProps}
        title={title}
      />
    )
    expect(screen.getByTitle(title)).toBeInTheDocument()

    // force re-render with null as value by prop change
    rerender(
      <DrawerList
        opened
        noAnimation
        data={mockData}
        defaultValue={props.value}
        {...mockProps}
        title={title}
        value={(props.value as number) + 1}
      />
    )

    // the selected option got a new position and is focused

    expect(getSelectedItemIndex()).toBe((props.value as number) + 1)
    expect(getFocusedItemIndex()).toBe((props.value as number) + 1)

    // and for sure, the title attribute is still the same
    expect(screen.getByTitle(title)).toBeInTheDocument()
  })

  it('has correct value on key search', async () => {
    render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list__option--focus')
    ).toBeInTheDocument()

    keydown(83) // S

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })

    keydown(70) // F

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(2)
      expect(getSelectedItemIndex()).toBe(2)
    })
  })

  it('does not change focus with no search results', async () => {
    render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelector('.dnb-drawer-list__option--focus')
    ).toBeInTheDocument()

    keydown(83) // S

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })

    keydown(69) // E

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })

    keydown(17) // ctrl

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })
  })

  it('keyboard navigation does not focus list before looping', async () => {
    render(<DrawerList {...props} value={undefined} data={mockData} />)

    expect(getFocusedItemIndex()).toBe(-1)
    expect(isListFocused()).toBe(false)

    keydown(40) // down

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(0)
    })

    keydown(38) // up

    await waitFor(() => {
      expect(isListFocused()).toBe(false)
    })
    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(6)
    })

    keydown(40) // down

    await waitFor(() => {
      expect(isListFocused()).toBe(false)
    })
    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(0)
    })
  })

  it('keyboard navigation loops when item is selected', async () => {
    render(<DrawerList {...props} data={mockData} />)

    expect(getFocusedItemIndex()).toBe(2)
    expect(isListFocused()).toBe(false)

    keydown(38) // up

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })

    keydown(38) // up

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(0)
    })

    keydown(38) // up

    await waitFor(() => {
      expect(isListFocused()).toBe(false)
    })

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(6)
    })

    keydown(40) // down

    await waitFor(() => {
      expect(isListFocused()).toBe(false)
    })
    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(0)
    })
  })

  it('focused item remembered when reopening', async () => {
    const contextRef: React.MutableRefObject<DrawerListContextProps> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = React.useContext(DrawerListContext)
      return null
    }

    render(
      <DrawerListProvider opened no_animation data={mockData}>
        <ContextConsumer />
        <DrawerList no_animation />
      </DrawerListProvider>
    )

    expect(
      document.querySelector('ul.dnb-drawer-list__options')
    ).toBeInTheDocument()
    expect(getFocusedItemIndex()).toBe(-1)

    // focus the second item
    keydown(40) // down
    keydown(40) // down

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(1)
    })

    // close the list
    contextRef.current.drawerList.setHidden()

    await waitFor(() => {
      expect(
        document.querySelector('ul.dnb-drawer-list__options')
      ).not.toBeInTheDocument()
    })

    // open the list again
    contextRef.current.drawerList.setVisible()

    await waitFor(() => {
      expect(
        document.querySelector('ul.dnb-drawer-list__options')
      ).toBeInTheDocument()

      expect(getFocusedItemIndex()).toBe(1)
    })
  })

  it('focused item set to selected item when opening', async () => {
    const contextRef: React.MutableRefObject<DrawerListContextProps> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = React.useContext(DrawerListContext)
      return null
    }

    render(
      <DrawerListProvider opened no_animation value={1} data={mockData}>
        <ContextConsumer />
        <DrawerList no_animation />
      </DrawerListProvider>
    )

    expect(
      document.querySelector('ul.dnb-drawer-list__options')
    ).toBeInTheDocument()
    expect(getFocusedItemIndex()).toBe(1)
    expect(getSelectedItemIndex()).toBe(1)

    // focus the second item
    keydown(40) // down

    await waitFor(() => {
      expect(getFocusedItemIndex()).toBe(2)
      expect(getSelectedItemIndex()).toBe(1)
    })

    // close the list
    contextRef.current.drawerList.setHidden()

    await waitFor(() => {
      expect(
        document.querySelector('ul.dnb-drawer-list__options')
      ).not.toBeInTheDocument()
    })

    // open the list again
    contextRef.current.drawerList.setVisible()

    await waitFor(() => {
      expect(
        document.querySelector('ul.dnb-drawer-list__options')
      ).toBeInTheDocument()

      expect(getFocusedItemIndex()).toBe(1)
      expect(getSelectedItemIndex()).toBe(1)
    })
  })

  it('has valid onSelect callback', async () => {
    const onSelect = jest.fn()

    const { rerender } = render(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        onSelect={onSelect}
      />
    )

    // select the current
    keydown(32) // space

    const notChangedItem = mockData[props.value]
    await waitFor(() => {
      expect(onSelect.mock.calls[0][0].data).toStrictEqual(notChangedItem)
      expect(onSelect.mock.calls[0][0].selectedItem).toBe(2)
      expect(onSelect.mock.calls[0][0].activeItem).toBe(2)
    })

    // reset props
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        onSelect={onSelect}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={Object.freeze(mockData) as DrawerListDataArray}
        onSelect={onSelect}
        opened={true}
      />
    )
    keydown(40) // down
    await waitFor(() => {
      expect(onSelect.mock.calls[1][0].selectedItem).toBe(undefined)
      expect(onSelect.mock.calls[1][0].activeItem).toBe(3)

      const selectedItem = mockData[(props.value as number) + 1]
      expect(onSelect.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
    })
  })

  it('will set data-dnb-drawer-list-active with id', () => {
    const { rerender } = render(
      <DrawerList {...props} opened={false} data={mockData} />
    )

    rerender(<DrawerList {...props} opened={true} data={mockData} />)

    expect(
      document.documentElement.getAttribute('data-dnb-drawer-list-active')
    ).toBe(props.id)

    rerender(<DrawerList {...props} opened={false} data={mockData} />)

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-drawer-list-active'
    )
  })

  describe('id', () => {
    const testAllIds = (id) => {
      expect(
        document.querySelector('.dnb-drawer-list').getAttribute('id')
      ).toBe(`${id}-drawer-list`)

      expect(
        document.querySelector('.dnb-drawer-list__list').getAttribute('id')
      ).toBe(`${id}-listbox`)

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('id')
      ).toBe(`${id}-ul`)

      expect(
        document
          .querySelector('.dnb-drawer-list__option')
          .getAttribute('id')
      ).toBe(`option-${id}-0`)

      keydown(40) // down

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('aria-activedescendant')
      ).toBe(`option-${id}-3`)

      expect(
        document.documentElement.getAttribute(
          'data-dnb-drawer-list-active'
        )
      ).toBe(id)
    }

    describe('when component', () => {
      it('is same when given', () => {
        render(<DrawerList {...props} data={mockData} />)
        testAllIds(props.id)
      })

      it('is same when generated', () => {
        const { id: _id, ...rest } = props
        render(<DrawerList {...rest} data={mockData} />)

        const domId = document
          .querySelector('.dnb-drawer-list')
          .getAttribute('id')

        expect(domId).not.toBe(`${undefined}-drawer-list`)

        const id = domId.replace('-drawer-list', '')

        testAllIds(id)
      })
    })

    describe('from context', () => {
      it('is used by instance', () => {
        render(
          <DrawerListProvider {...props} data={mockData}>
            <DrawerList />
          </DrawerListProvider>
        )

        testAllIds(props.id)
      })

      it('overrides instance', () => {
        render(
          <DrawerListProvider {...props} data={mockData}>
            <DrawerList id="badId" />
          </DrawerListProvider>
        )

        testAllIds(props.id)
      })

      it('is same when generated', () => {
        const { id: _id, ...rest } = props
        render(
          <DrawerListProvider {...rest} data={mockData}>
            <DrawerList />
          </DrawerListProvider>
        )
        const domId = document
          .querySelector('.dnb-drawer-list')
          .getAttribute('id')

        expect(domId).not.toBe(`${undefined}-drawer-list`)

        const id = domId.replace('-drawer-list', '')

        testAllIds(id)
      })
    })
  })

  it('will unset data-dnb-drawer-list-active on unmount', () => {
    const { rerender, unmount } = render(
      <DrawerList {...props} data={mockData} opened={false} />
    )

    rerender(<DrawerList {...props} data={mockData} opened={true} />)

    expect(
      document.documentElement.getAttribute('data-dnb-drawer-list-active')
    ).toBe(props.id)

    unmount()

    expect(document.documentElement).not.toHaveAttribute(
      'data-dnb-drawer-list-active'
    )
  })

  it('will lock body scroll when enableBodyLock is true', () => {
    const MockComponent = (p) => (
      <DrawerList {...props} data={mockData} enableBodyLock {...p} />
    )

    const { rerender } = render(<MockComponent opened={false} />)

    expect(document.body.getAttribute('style')).toBe(null)

    rerender(<MockComponent opened />)

    expect(document.body.getAttribute('style')).toBe(
      'overflow: hidden; height: auto; box-sizing: border-box; margin-right: 0px;'
    )

    rerender(<MockComponent opened={false} />)

    expect(document.body.getAttribute('style')).toBe('')
  })

  it('has valid onChange callback', async () => {
    const onChange = jest.fn()
    const onSelect = jest.fn()

    const { rerender } = render(
      <DrawerList
        {...props}
        data={mockData}
        onChange={onChange}
        onSelect={onSelect}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(32) // space

    await waitFor(() => {
      const selectedItem = mockData[(props.value as number) + 1]
      expect(onChange.mock.calls[0][0].data).toStrictEqual(selectedItem)
      expect(onSelect.mock.calls[1][0].data).toStrictEqual(selectedItem)
    })

    rerender(
      <DrawerList
        {...props}
        data={mockData}
        onChange={onChange}
        onSelect={onSelect}
        opened={null}
      />
    )

    // then open again
    rerender(
      <DrawerList
        {...props}
        data={mockData}
        onChange={onChange}
        onSelect={onSelect}
        opened={true}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(13) // enter

    await waitFor(() => {
      const selectedItem = mockData[(props.value as number) + 2]
      expect(onChange.mock.calls[1][0].data).toStrictEqual(selectedItem) // second call!
      expect(onSelect.mock.calls[3][0].data).toStrictEqual(selectedItem) // second call!
    })
  })

  it('does not fire onChange when selecting the selected item', async () => {
    const onChange = jest.fn()

    render(
      <DrawerList
        {...props}
        value={0}
        data={mockData}
        onChange={onChange}
      />
    )

    // then simulate changes
    keydown(40) // down
    keydown(38) // up
    keydown(32) // space

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(0)
    })
  })

  it('has correct direction prop', () => {
    const directionTop = 'top'

    const { rerender } = render(
      <DrawerList {...props} data={mockData} direction={directionTop} />
    )

    expect(
      document.querySelector(`.dnb-drawer-list--${directionTop}`)
    ).toBeInTheDocument()

    const directionBottom = 'bottom'
    rerender(
      <DrawerList {...props} data={mockData} direction={directionBottom} />
    )
    expect(
      document.querySelector(`.dnb-drawer-list--${directionBottom}`)
    ).toBeInTheDocument()
  })

  it('will call onHide after "esc" key', async () => {
    const onHide = jest.fn()

    render(<DrawerList {...props} data={mockData} onHide={onHide} />)

    expect(
      Array.from(document.querySelector('span.dnb-drawer-list').classList)
    ).toEqual([
      'dnb-drawer-list',
      'dnb-drawer-list--bottom',
      'dnb-drawer-list--opened',
      'dnb-drawer-list--triangle-position-left',
      'dnb-drawer-list--left',
      'dnb-drawer-list--default',
      'dnb-drawer-list--scroll',
    ])

    keydown(27) // esc
    expect(onHide.mock.calls.length).toBe(1)

    await waitFor(() => {
      expect(
        Array.from(
          document.querySelector('span.dnb-drawer-list').classList
        )
      ).toEqual([
        'dnb-drawer-list',
        'dnb-drawer-list--bottom',
        'dnb-drawer-list--hidden',
        'dnb-drawer-list--triangle-position-left',
        'dnb-drawer-list--left',
        'dnb-drawer-list--default',
        'dnb-drawer-list--scroll',
      ])
    })
  })

  it('has correct class modifier "--opened"', () => {
    render(<DrawerList {...props} data={mockData} />)
    const elem = document.querySelector('span.dnb-drawer-list')

    expect(elem.className).toContain('dnb-drawer-list--opened')

    expect(elem.className).not.toContain('dnb-drawer-list--hidden')
  })

  it('has correct length of li elements', () => {
    render(<DrawerList {...props} data={mockData} />)

    expect(
      document.querySelectorAll('li.dnb-drawer-list__option').length
    ).toBe(mockData.length)
  })

  it('has correct value on data given as an object', async () => {
    const onChange = jest.fn()
    const onSelect = jest.fn()

    render(
      <DrawerList
        opened
        noAnimation
        onChange={onChange}
        onSelect={onSelect}
        data={() => ({ a: 'A', b: 'B', c: 'C' })}
        {...mockProps}
      />
    )

    // then simulate changes
    keydown(40) // down
    await waitFor(() => {
      expect(onSelect.mock.calls[0][0].activeItem).toBe(0)
    })

    keydown(13) // enter
    await waitFor(() => {
      expect(onChange.mock.calls[0][0].value).toBe('a')
    })

    // then open again
    keydown(32) // space
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onSelect).toHaveBeenCalledTimes(2)
    })
  })

  it('should update and correctly set selected item on data prop change', () => {
    const data: Record<string, DrawerListData> = {
      first: [
        { selectedKey: 'key_1', content: 'Content 1' },
        { selectedKey: 'key_2', content: 'Content 2' },
        { selectedKey: 'key_3', content: 'Content 3' },
      ],
      second: [
        { selectedKey: 'key_4', content: 'Content 4' },
        { selectedKey: 'key_5', content: 'Content 5' },
      ],
      third: [
        { selectedKey: 'key_6', content: 'Content 6' },
        { selectedKey: 'key_7', content: 'Content 7' },
        { selectedKey: 'key_8', content: 'Content 8' },
      ],
    }

    const getSelectedItem = () =>
      document.querySelector('.dnb-drawer-list__option--selected')

    const { rerender } = render(
      <DrawerList
        opened
        noAnimation
        data={data.first}
        value={data.first[0].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 1')

    rerender(
      <DrawerList
        opened
        noAnimation
        data={data.second}
        value={data.second[1].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 5')

    rerender(
      <DrawerList
        opened
        noAnimation
        data={data.third}
        value={data.third[2].selectedKey}
        {...mockProps}
      />
    )

    expect(getSelectedItem()).toHaveTextContent('Content 8')
  })

  it('has to return all additional attributes the event return', () => {
    const onShow = jest.fn()
    const onHide = jest.fn()
    const params = { 'data-attr': 'value' }

    render(
      <DrawerList
        {...props}
        onShow={onShow}
        onHide={onHide}
        {...params}
        data={mockData}
      />
    )

    expect(onShow.mock.calls.length).toBe(1)
    expect(onShow.mock.calls[0][0].attributes).toMatchObject(params)

    keydown(27) // esc
    expect(onHide.mock.calls.length).toBe(1)
    expect(onHide.mock.calls[0][0].attributes).toMatchObject(params)
  })

  describe('height calculation', () => {
    it('has given max-height when maxHeight is set', () => {
      render(<DrawerList {...props} data={mockData} maxHeight={10} />)

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 10rem;')
    })

    it('has correct max-height with direction top', () => {
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementationOnce(() => 100)

      let count = 0
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        get() {
          if (this.classList.contains('dnb-drawer-list__root')) {
            count++
            switch (count) {
              case 1:
                return 300
              default:
                return 200
            }
          }
        },
      })

      const directionTop = 'top'
      render(
        <DrawerList {...props} data={mockData} direction={directionTop} />
      )

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 4rem;')
    })

    it('has correct max-height with direction bottom', () => {
      jest
        .spyOn(document.documentElement, 'clientHeight', 'get')
        .mockImplementationOnce(() => 300)

      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get() {
          if (this.classList.contains('dnb-drawer-list__root')) {
            return 200
          }
        },
      })

      const directionTop = 'bottom'

      render(
        <DrawerList {...props} data={mockData} direction={directionTop} />
      )

      expect(
        document
          .querySelector('.dnb-drawer-list__options')
          .getAttribute('style')
      ).toBe('max-height: 4rem;')
    })
  })

  describe('direction observer', () => {
    it('should results in correct direction', async () => {
      render(<DrawerList {...props} data={mockData} />)
      await testDirectionObserver()
    })
  })

  describe('inline style', () => {
    it('sets correct styling using data object', () => {
      render(
        <DrawerList
          {...props}
          data={[
            {
              content: 'content',
              style: { hyphens: 'auto' },
            },
          ]}
        />
      )

      expect(
        document
          .querySelector('li.dnb-drawer-list__option')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })

    it('sets correct style using DrawerList.Item', () => {
      render(
        <DrawerList {...props}>
          <DrawerList.Options>
            <DrawerList.Item
              style={{ hyphens: 'auto' }}
              key="A"
              selected={false}
              value="A"
              onClick={() => {
                console.log('onClick')
              }}
            >
              Content
            </DrawerList.Item>
          </DrawerList.Options>
        </DrawerList>
      )

      expect(
        document
          .querySelector('li.dnb-drawer-list__option')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })

    it('sets correct style using DrawerList.HorizontalItem', () => {
      render(
        <DrawerList {...props}>
          <DrawerList.Options>
            <DrawerList.HorizontalItem style={{ hyphens: 'auto' }}>
              Content
            </DrawerList.HorizontalItem>
          </DrawerList.Options>
        </DrawerList>
      )

      expect(
        document
          .querySelector('span.dnb-drawer-list__option__item')
          .getAttribute('style')
      ).toBe('hyphens: auto;')
    })
  })

  describe('groups', () => {
    beforeEach(() => {
      global.console.log = jest.fn()
    })

    const dataProp: DrawerListDataArray = [
      { groupIndex: 0, content: 'Item 0.1' },
      { groupIndex: 0, content: 'Item 0.2' },
      { groupIndex: 1, content: 'Item 1.1' },
      { groupIndex: 2, content: 'Item 2.1' },
      { groupIndex: 3, content: 'Item 3.1' },
    ]

    const groupsProp: DrawerListGroupTitles = [
      'First',
      'Second',
      'Third',
      'Fourth',
    ]

    it('renders groups', () => {
      render(
        <DrawerList
          opened={true}
          noAnimation={true}
          data={dataProp}
          groups={groupsProp}
        />
      )

      const groupsUL = document.querySelectorAll('.dnb-drawer-list__group')
      expect(groupsUL.length).toBe(4)
      expect(
        groupsUL[0].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('First')
      expect(
        groupsUL[1].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Second')
      expect(
        groupsUL[2].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Third')
      expect(
        groupsUL[3].querySelector('.dnb-drawer-list__group-title')
          .textContent
      ).toBe('Fourth')

      const options = document.querySelectorAll('.dnb-drawer-list__option')
      expect(options.length).toBe(5)

      expect(
        groupsUL[0].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 0.1')
      expect(
        groupsUL[0].querySelectorAll('.dnb-drawer-list__option')[1]
          .textContent
      ).toBe('Item 0.2')
      expect(
        groupsUL[1].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 1.1')
      expect(
        groupsUL[2].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 2.1')
      expect(
        groupsUL[3].querySelectorAll('.dnb-drawer-list__option')[0]
          .textContent
      ).toBe('Item 3.1')
    })

    it('uses default title for groups missing title', () => {
      render(
        <DrawerList
          opened={true}
          noAnimation={true}
          data={dataProp}
          groups={[undefined, undefined, 'Third']}
        />
      )

      const groupsUL = document.querySelectorAll(
        '.dnb-drawer-list__group-title'
      )
      expect(groupsUL.length).toBe(4)

      expect(groupsUL[0].textContent).toBe(nbNO.defaultGroupSR)
      expect(groupsUL[0].classList).toContain('dnb-sr-only')

      expect(groupsUL[1].textContent).toBe(nbNO.missingGroup + ' 2')
      expect(groupsUL[1].classList).not.toContain('dnb-sr-only')

      expect(groupsUL[2].textContent).toBe('Third')
      expect(groupsUL[2].classList).not.toContain('dnb-sr-only')

      expect(groupsUL[3].textContent).toBe(nbNO.missingGroup + ' 4')
      expect(groupsUL[3].classList).not.toContain('dnb-sr-only')

      expect(global.console.log).toHaveBeenCalledTimes(6)
      expect(global.console.log).toHaveBeenLastCalledWith(
        expect.stringContaining('Eufemia'),
        `Missing group title for groupIndex: 3`
      )
    })

    it('adds group for items without group index', () => {
      render(
        <DrawerList
          opened={true}
          noAnimation={true}
          data={[...dataProp, { content: 'Item without groupIndex' }]}
          groups={groupsProp}
        />
      )

      const groups = document.querySelectorAll('.dnb-drawer-list__group')
      expect(groups.length).toBe(5)

      const finalGroupTitle = groups[4].querySelector(
        '.dnb-drawer-list__group-title'
      )
      expect(finalGroupTitle.textContent).toBe(nbNO.noGroupSR)
      expect(finalGroupTitle.classList).toContain('dnb-sr-only')

      const finalGroupItems = groups[4].querySelectorAll(
        '.dnb-drawer-list__option'
      )
      expect(finalGroupItems.length).toBe(1)
      expect(finalGroupItems[0].textContent).toBe(
        'Item without groupIndex'
      )
    })
  })
})

describe('DrawerList markup', () => {
  it('should validate with ARIA rules', async () => {
    const snapshotProps: DrawerListAllProps = {
      id: 'drawer-list-id',
      direction: 'bottom',
      value: 2,
      opened: true,
      noAnimation: true,
      size: 'default',
    }

    const result = render(
      <DrawerList {...snapshotProps} data={mockData} />
    )
    expect(
      await axeComponent(result, {
        rules: {
          'aria-input-field-name': { enabled: false },
          'aria-required-children': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })

  it('should have correct aria-activedescendant', async () => {
    render(<DrawerList {...props} value={undefined} data={mockData} />)
    const ul = document.querySelector('ul.dnb-drawer-list__options')

    expect(ul.getAttribute('aria-activedescendant')).toEqual(
      `option-${props.id}-0`
    )

    keydown(40) // down

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-0`
      )
    })

    keydown(38) // up

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-6`
      )
    })

    keydown(38) // up

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-5`
      )
    })

    keydown(40) // down

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-6`
      )
    })

    keydown(40) // down

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-0`
      )
    })

    keydown(40) // down

    await waitFor(() => {
      expect(ul.getAttribute('aria-activedescendant')).toEqual(
        `option-${props.id}-1`
      )
    })
  })
})

describe('DrawerList portal', () => {
  it('will set correct width when independentWidth is set', async () => {
    const style = {
      getPropertyValue: () => 20,
    } as undefined

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    const { rerender } = render(<DrawerList opened noAnimation />)

    const styleElement = document.querySelector(
      '.dnb-drawer-list__portal__style'
    )

    await waitFor(() => {
      expect(styleElement.getAttribute('style')).toBe(
        'width: 64px; --drawer-list-width: 4rem; top: 0px; left: 0px;'
      )
    })

    rerender(<DrawerList opened noAnimation independentWidth />)

    expect(styleElement.getAttribute('style')).toBe(
      'width: 320px; --drawer-list-width: 20rem; top: 0px; left: 0px;'
    )

    const element = document.querySelector('.dnb-drawer-list')
    expect(Array.from(element.classList)).toContain(
      'dnb-drawer-list--independent-width'
    )
  })

  it('will set correct width when independentWidth is set and isolated style scope is used', async () => {
    const style = {
      getPropertyValue: () => 20,
    } as undefined

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    const { rerender } = render(
      <IsolatedStyleScope>
        <DrawerList opened noAnimation />
      </IsolatedStyleScope>
    )

    const styleElement = document.querySelector(
      '.dnb-drawer-list__portal__style'
    )

    await waitFor(() => {
      expect(styleElement.getAttribute('style')).toBe(
        'width: 64px; --drawer-list-width: 4rem; top: 0px; left: 0px;'
      )
    })

    rerender(
      <IsolatedStyleScope>
        <DrawerList opened noAnimation independentWidth />
      </IsolatedStyleScope>
    )

    expect(styleElement.getAttribute('style')).toBe(
      'width: 320px; --drawer-list-width: 20rem; top: 0px; left: 0px;'
    )

    const element = document.querySelector('.dnb-drawer-list')
    expect(Array.from(element.classList)).toContain(
      'dnb-drawer-list--independent-width'
    )
  })
})

describe('DrawerList scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-drawer-list-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

const keydown = (keyCode) => {
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }))
  })
}
