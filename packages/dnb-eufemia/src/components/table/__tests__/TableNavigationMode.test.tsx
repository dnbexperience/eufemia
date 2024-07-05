import React from 'react'
import { render, fireEvent, createEvent } from '@testing-library/react'
import Table from '../Table'
import Tr from '../TableTr'
import Td from '../TableTd'
import Th from '../TableTh'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'
import Provider from '../../../shared/Provider'

const nb = nbNO['nb-NO'].Table
const en = enGB['en-GB'].Table

describe('Table using mode="navigation" prop', () => {
  it('table should have --navigation modifier class', () => {
    render(
      <Table mode="navigation">
        <tbody>
          <tr>
            <td>content</td>
          </tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('table')

    expect(Array.from(element.classList)).toContain(
      'dnb-table--navigation'
    )
  })

  it('tr should have --clickable modifier class', () => {
    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={jest.fn()}>
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(Array.from(element.classList)).toContain(
      'dnb-table__tr--clickable'
    )
  })

  it('should emit onClick event when clicking tr', () => {
    const onClick = jest.fn()
    const trid = '123'

    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={onClick} data-trid={trid}>
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')

    fireEvent.click(trElement)

    expect(onClick).toHaveBeenCalledTimes(1)

    const { target } = onClick.mock.calls[0][0]
    expect(target).toBe(trElement)
    expect(target.dataset.trid).toBe(trid)
  })

  it('tr should not emit onClick event on interactive element click', () => {
    const onClick = jest.fn()

    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={onClick}>
            <Td>
              <label>
                Label
                <input type="text" />
              </label>
              <button id="test-button">button</button>
            </Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const labelElement = document.querySelector('label')
    const inputElem = trElement.querySelector('input')
    const buttonElem = trElement.querySelector('button#test-button')

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElem)

    fireEvent.click(inputElem)

    expect(onClick).not.toHaveBeenCalled()

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(buttonElem)

    fireEvent.click(buttonElem)

    expect(onClick).not.toHaveBeenCalled()

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(null)

    fireEvent.click(inputElem)

    expect(onClick).not.toHaveBeenCalled()

    fireEvent.click(labelElement)

    expect(onClick).not.toHaveBeenCalled()

    fireEvent.click(buttonElem)

    expect(onClick).toHaveBeenCalledTimes(1)

    fireEvent.click(trElement)

    expect(onClick).toHaveBeenCalledTimes(2)

    const getSelection = jest.fn(() => ({
      toString: () => 'mock selection',
    })) as jest.Mock
    jest.spyOn(window, 'getSelection').mockImplementationOnce(getSelection)

    // Click again, but with selection
    fireEvent.click(trElement)

    expect(onClick).toHaveBeenCalledTimes(2)

    // Simulate keyboard usage
    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElem)

    fireEvent.keyDown(inputElem, { keyCode: 13 }) // enter

    expect(onClick).toHaveBeenCalledTimes(2)

    fireEvent.keyDown(inputElem, { keyCode: 32 }) // space

    expect(onClick).toHaveBeenCalledTimes(2)

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(labelElement)

    fireEvent.keyDown(labelElement, { keyCode: 13 }) // enter

    expect(onClick).toHaveBeenCalledTimes(2)

    fireEvent.keyDown(labelElement, { keyCode: 32 }) // space

    expect(onClick).toHaveBeenCalledTimes(2)

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(null)
  })

  it('tr should emit onClick on button click', () => {
    const onClick = jest.fn()

    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={onClick}>
            <Td>Nothing</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const buttonElem = trElement.querySelector('.dnb-table__button button')

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(buttonElem)

    fireEvent.click(buttonElem)

    expect(onClick).toHaveBeenCalled()
  })

  it('chevron header column needs a div for proper width', () => {
    render(
      <Table mode="navigation">
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
      </Table>
    )

    const trElement = document.querySelectorAll('thead tr th')[1]
    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__th__button-icon'
    )

    const divElement = trElement.querySelector('div')
    expect(divElement).toBeInTheDocument()
  })

  it('chevron header column should contain navigationButtonSR text', () => {
    render(
      <Table mode="navigation">
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
      </Table>
    )

    const thElement = document.querySelectorAll('thead tr th')[1]
    expect(Array.from(thElement.classList)).toContain(
      'dnb-table__th__button-icon'
    )

    expect(thElement.textContent).toBe(nb.navigationButtonSR)
  })

  it('should support locale from prop and provider', () => {
    const content = (
      <thead>
        <Tr>
          <Th>heading</Th>
        </Tr>
      </thead>
    )

    const { rerender } = render(
      <Provider>
        <Table mode="navigation">{content}</Table>
      </Provider>
    )

    const thElement = document.querySelectorAll('thead tr th')[1]
    expect(Array.from(thElement.classList)).toContain(
      'dnb-table__th__button-icon'
    )

    expect(thElement.textContent).toBe(nb.navigationButtonSR)

    rerender(
      <Provider>
        <Table mode="navigation" locale="en-GB">
          {content}
        </Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(en.navigationButtonSR)

    rerender(
      <Provider locale="nb-NO">
        <Table mode="navigation">{content}</Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(nb.navigationButtonSR)

    rerender(
      <Provider>
        <Table mode="navigation" lang="en-GB">
          {content}
        </Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(en.navigationButtonSR)
  })

  it('tr should call onClick with enter or space key on tr', () => {
    const onClick = jest.fn()

    render(
      <Table mode="navigation">
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr onClick={onClick}>
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tbody tr')

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(trElement)

    expect(onClick).not.toHaveBeenCalled()

    // click enter
    const enterKey = createEvent.keyDown(trElement, {
      keyCode: 13, // enter
    })
    enterKey.preventDefault = jest.fn()
    fireEvent(trElement, enterKey)

    expect(enterKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalled()

    // click space
    const spaceKey = createEvent.keyDown(trElement, {
      keyCode: 32, // space
    })
    spaceKey.preventDefault = jest.fn()
    fireEvent(trElement, spaceKey)

    expect(spaceKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(2)
  })
})
