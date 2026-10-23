import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import {
  render,
  fireEvent,
  createEvent,
  act,
} from '@testing-library/react'
import Table from '../Table'
import Tr from '../TableTr'
import Td from '../TableTd'

describe('Table using mode="accordion" prop', () => {
  it('tr should open on tr enter press', () => {
    render(
      <Table mode="accordion">
        <tbody>
          <Tr>
            <Td>Nothing</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    // open
    const enterKey = createEvent.keyDown(trElement, {
      key: 'Enter',
    })
    enterKey.preventDefault = vi.fn()
    fireEvent(trElement, enterKey)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('tr should open on tr enter press when text is selected', () => {
    render(
      <Table mode="accordion">
        <tbody>
          <Tr>
            <Td>Nothing</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const getSelection = vi.fn(() => ({
      toString: () => 'mock selection',
    })) as import('vitest').Mock
    vi.spyOn(window, 'getSelection').mockImplementationOnce(getSelection)

    const trElement = document.querySelector('tr')

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    // open
    const enterKey = createEvent.keyDown(trElement, {
      key: 'Enter',
    })
    enterKey.preventDefault = vi.fn()
    fireEvent(trElement, enterKey)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('tr should clear selected text on toggle button click', () => {
    const emptyFn = vi.fn()
    render(
      <Table mode="accordion">
        <tbody>
          <Tr>
            <Td>Nothing</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const toggleButtonElem = trElement.querySelector(
      '.dnb-table__button button'
    )

    const getSelection = vi.fn(() => ({
      toString: () => '',
      empty: emptyFn,
    })) as import('vitest').Mock
    vi.spyOn(window, 'getSelection').mockImplementation(getSelection)

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(
      toggleButtonElem
    )

    fireEvent.click(toggleButtonElem)

    expect(emptyFn).toHaveBeenCalledTimes(1)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('should expand the row when an id with non-ASCII characters matches location hash', () => {
    window.history.replaceState({}, '', 'http://localhost/#rad-ø')

    render(
      <Table mode="accordion">
        <tbody>
          <Tr id="rad-ø">
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    expect(document.querySelector('tr')).toHaveClass(
      'dnb-table__tr--expanded'
    )
  })

  it('should expand the row matching the location hash after hydration', () => {
    const element = (
      <Table mode="accordion">
        <tbody>
          <Tr id="row-1">
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    // The server cannot know the hash
    window.history.replaceState({}, '', 'http://localhost/')
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)

    window.history.replaceState({}, '', 'http://localhost/#row-1')

    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    act(() => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.querySelector('tr')).toHaveClass(
      'dnb-table__tr--expanded'
    )

    act(() => root.unmount())
    container.remove()
  })

  it('should keep expanding the row when an onKeyDown is given', () => {
    const onKeyDown = vi.fn()

    render(
      <Table mode="accordion">
        <tbody>
          <Tr onKeyDown={onKeyDown}>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr.dnb-table__tr')
    fireEvent.keyDown(trElement, { key: 'Enter' })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('should keep the hover state when an onMouseEnter is given', () => {
    const onMouseEnter = vi.fn()

    render(
      <Table mode="accordion">
        <tbody>
          <Tr onMouseEnter={onMouseEnter}>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr.dnb-table__tr')
    fireEvent.click(trElement)
    fireEvent.mouseEnter(trElement)

    expect(onMouseEnter).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--hover'
    )
  })

  it('should call the given handlers on a row without accordion content', () => {
    const onKeyDown = vi.fn()
    const onMouseEnter = vi.fn()
    const onMouseLeave = vi.fn()

    render(
      <Table mode="accordion">
        <tbody>
          <Tr
            onKeyDown={onKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr.dnb-table__tr')

    fireEvent.keyDown(trElement, { key: 'Enter' })
    fireEvent.mouseEnter(trElement)
    fireEvent.mouseLeave(trElement)

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onMouseEnter).toHaveBeenCalledTimes(1)
    expect(onMouseLeave).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('should call the given handlers on a disabled row without expanding it', () => {
    const onKeyDown = vi.fn()

    render(
      <Table mode="accordion">
        <tbody>
          <Tr disabled onKeyDown={onKeyDown}>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr.dnb-table__tr')
    fireEvent.keyDown(trElement, { key: 'Enter' })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )
  })
})
