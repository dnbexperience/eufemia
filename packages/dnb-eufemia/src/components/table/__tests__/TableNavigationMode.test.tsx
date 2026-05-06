import { render, fireEvent, createEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
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

  it('clickable tr should have role="row"', () => {
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

    expect(element.getAttribute('role')).toBe('row')
  })

  it('should emit onClick and expose data attributes on the tr', () => {
    let currentTarget: HTMLElement | null = null

    const onClick = jest.fn((event) => {
      currentTarget = event.currentTarget
    })

    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={onClick} data-row-number="42">
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    fireEvent.click(trElement)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(currentTarget).toBe(trElement)
    expect(currentTarget.dataset.rowNumber).toBe('42')
  })

  it('should pass enriched info as second argument to onClick', () => {
    const onClick = jest.fn()

    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={onClick} data-row-id="row-1">
            <Td>content</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tbody tr')
    fireEvent.click(trElement)

    expect(onClick).toHaveBeenCalledTimes(1)

    const info = onClick.mock.calls[0][1]
    expect(info.trElement).toBe(trElement)
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

    fireEvent.keyDown(inputElem, { key: 'Enter' })

    expect(onClick).toHaveBeenCalledTimes(2)

    fireEvent.keyDown(inputElem, { key: ' ' })

    expect(onClick).toHaveBeenCalledTimes(2)

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(labelElement)

    fireEvent.keyDown(labelElement, { key: 'Enter' })

    expect(onClick).toHaveBeenCalledTimes(2)

    fireEvent.keyDown(labelElement, { key: ' ' })

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

  it('should have no axe violations with clickable rows', async () => {
    const Component = render(
      <Table mode="navigation">
        <thead>
          <Tr>
            <Th>Column A</Th>
            <Th>Column B</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr onClick={jest.fn()}>
            <Td>Row 1 A</Td>
            <Td>Row 1 B</Td>
          </Tr>
          <Tr onClick={jest.fn()}>
            <Td>Row 2 A</Td>
            <Td>Row 2 B</Td>
          </Tr>
        </tbody>
      </Table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
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
      key: 'Enter',
    })
    enterKey.preventDefault = jest.fn()
    fireEvent(trElement, enterKey)

    expect(enterKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalled()

    // click space
    const spaceKey = createEvent.keyDown(trElement, {
      key: ' ',
    })
    spaceKey.preventDefault = jest.fn()
    fireEvent(trElement, spaceKey)

    expect(spaceKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(2)
  })
})
