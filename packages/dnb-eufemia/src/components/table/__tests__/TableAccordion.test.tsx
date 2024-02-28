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

describe('TableAccordion', () => {
  it('table should have --accordion modifier class', () => {
    render(
      <Table accordion>
        <tbody>
          <tr>
            <td>content</td>
          </tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('table')

    expect(Array.from(element.classList)).toContain('dnb-table--accordion')
  })

  it('tr should have --has-accordion-content modifier class', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(Array.from(element.classList)).toContain(
      'dnb-table__tr--has-accordion-content'
    )
  })

  it('content tr should render when closed', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
      .nextSibling as HTMLTableRowElement

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['aria-hidden', 'hidden', 'class'])
    expect(element.getAttribute('aria-hidden')).toBe('true')
    expect(element.getAttribute('hidden')).toBe('')
    expect(Array.from(element.classList)).toEqual([
      'dnb-table__tr__accordion-content',
      'dnb-table__tr__accordion-content--single',
    ])
  })

  it('expanded accordion content tr should contain correct roles', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr expanded>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement

    const attributes = Array.from(accordionElem.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['aria-hidden', 'role', 'class'])
    expect(accordionElem.getAttribute('aria-hidden')).toBe('false')
    expect(accordionElem.getAttribute('role')).toBe('row')
    expect(Array.from(accordionElem.classList)).toEqual([
      'dnb-table__tr__accordion-content',
      'dnb-table__tr__accordion-content--single',
      'dnb-table__tr',
      'dnb-table__tr__accordion-content--expanded',
      'dnb-table__tr__accordion-content--parallax',
    ])
  })

  it('noAnimation should set correct class to tr', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr noAnimation>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr') as HTMLTableRowElement

    expect(Array.from(element.classList)).toEqual([
      'dnb-table__tr',
      'dnb-table__tr--odd',
      'dnb-table__tr--last',
      'dnb-table__tr--has-accordion-content',
      'dnb-table__tr--no-animation',
    ])
  })

  it('content td should render when closed', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement
    const element = accordionElem.querySelector('td')

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['colspan', 'class'])
    expect(Array.from(element.classList)).toContain('dnb-table__td')
    expect(element.getAttribute('colspan')).toBe('2')
  })

  it('expanded accordion content td should contain correct roles', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr expanded>
            <Td>content</Td>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement
    const element = accordionElem.querySelector('td')

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'colspan', 'class'])
    expect(Array.from(element.classList)).toContain('dnb-table__td')
    expect(element.getAttribute('colspan')).toBe('3')
    expect(element.getAttribute('role')).toBe('cell')
  })

  it('expanded accordion content content should contain correct roles', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr expanded>
            <Td>content</Td>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement
    const element = accordionElem.querySelector('td')

    expect(
      element.querySelector('div.dnb-table__tr__accordion-content__inner')
    ).toBeInTheDocument()
    expect(
      element.querySelector(
        'div.dnb-table__tr__accordion-content__inner__spacing'
      )
    ).toBeInTheDocument()
  })

  it('expanded accordion content content should contain aria-live announcement', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr expanded>
            <Td>content</Td>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement
    const element = accordionElem.querySelector('td')

    expect(element.querySelector('span.dnb-sr-only')).toBeInTheDocument()
    expect(element.querySelector('span[aria-live]')).toBeInTheDocument()
    expect(
      element.querySelector('span[aria-live]').getAttribute('aria-live')
    ).toBe('assertive')
  })

  it('expanded accordion content content should contain aria-live en-GB announcement', () => {
    const { rerender } = render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement
    const liveElement = accordionElem.querySelector('span[aria-live]')

    expect(liveElement.textContent).toBe('')

    fireEvent.click(trElement)

    expect(liveElement.textContent).toBe(nb.accordionMoreContentSR)

    rerender(
      <Table accordion lang="en-GB">
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    expect(liveElement.textContent).toBe(en.accordionMoreContentSR)
  })

  it('tr should open on tr click', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement

    expect(Array.from(accordionElem.classList)).toEqual([
      'dnb-table__tr__accordion-content',
      'dnb-table__tr__accordion-content--single',
    ])

    fireEvent.click(trElement)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
    expect(Array.from(accordionElem.classList)).toContain(
      'dnb-table__tr__accordion-content--expanded'
    )
  })

  it('tr should not open on interactive element click', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>
              <label>
                Label
                <input type="text" />
              </label>
              <button id="test-button">button</button>
            </Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
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

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(buttonElem)

    fireEvent.click(buttonElem)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(null)

    fireEvent.click(inputElem)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    fireEvent.click(labelElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    fireEvent.click(buttonElem)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )

    // Close again
    fireEvent.click(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    const getSelection = jest.fn(() => ({
      toString: () => 'mock selection',
    })) as jest.Mock
    jest.spyOn(window, 'getSelection').mockImplementationOnce(getSelection)

    // Open again, but with selection
    fireEvent.click(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    // Simulate keyboard usage
    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElem)

    fireEvent.keyDown(inputElem, { keyCode: 13 }) // enter

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    fireEvent.keyDown(inputElem, { keyCode: 32 }) // space

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(labelElement)

    fireEvent.keyDown(labelElement, { keyCode: 13 }) // enter

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    fireEvent.keyDown(labelElement, { keyCode: 32 }) // space

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(null)
  })

  it('tr should open on toggle button click', () => {
    render(
      <Table accordion>
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
      '.dnb-table__toggle-button button'
    )

    jest
      .spyOn(document, 'activeElement', 'get')
      .mockReturnValue(toggleButtonElem)

    fireEvent.click(toggleButtonElem)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('chevron placement class should be set with accordionChevronPlacement', () => {
    const { rerender } = render(
      <Table accordion>
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const select = (i: number, list: NodeListOf<HTMLTableCellElement>) =>
      i === -1 ? list[list.length - 1] : list[i]
    const getTh = (i: number) => {
      return select(
        i,
        document.querySelector('thead tr').querySelectorAll('th')
      )
    }
    const getTd = (i: number) => {
      return select(
        i,
        document.querySelector('tbody tr').querySelectorAll('td')
      )
    }

    expect(Array.from(getTh(0).classList)).toContain(
      'dnb-table__th__accordion-icon'
    )
    expect(Array.from(getTd(0).classList)).toContain(
      'dnb-table__td__accordion-icon'
    )

    rerender(
      <Table accordion accordionChevronPlacement="end">
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    expect(Array.from(getTh(-1).classList)).toContain(
      'dnb-table__th__accordion-icon'
    )
    expect(Array.from(getTd(-1).classList)).toContain(
      'dnb-table__td__accordion-icon'
    )
  })

  it('chevron header column needs a div for proper width', () => {
    render(
      <Table accordion>
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
      </Table>
    )

    const trElement = document.querySelector('thead tr th')
    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__th__accordion-icon'
    )

    const divElement = trElement.querySelector('div')
    expect(divElement).toBeInTheDocument()
  })

  it('chevron header column should contain accordionToggleButtonSR text', () => {
    render(
      <Table accordion>
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
      </Table>
    )

    const thElement = document.querySelector('thead tr th')
    expect(Array.from(thElement.classList)).toContain(
      'dnb-table__th__accordion-icon'
    )

    expect(thElement.textContent).toBe(nb.accordionToggleButtonSR)
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
        <Table accordion>{content}</Table>
      </Provider>
    )

    const thElement = document.querySelector('thead tr th')
    expect(Array.from(thElement.classList)).toContain(
      'dnb-table__th__accordion-icon'
    )

    expect(thElement.textContent).toBe(nb.accordionToggleButtonSR)

    rerender(
      <Provider>
        <Table accordion locale="en-GB">
          {content}
        </Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(en.accordionToggleButtonSR)

    rerender(
      <Provider locale="nb-NO">
        <Table accordion>{content}</Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(nb.accordionToggleButtonSR)

    rerender(
      <Provider>
        <Table accordion lang="en-GB">
          {content}
        </Table>
      </Provider>
    )

    expect(thElement.textContent).toBe(en.accordionToggleButtonSR)
  })

  it('tr should open with enter or space key on tr', () => {
    render(
      <Table accordion>
        <thead>
          <Tr>
            <Th>heading</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tbody tr')
    const accordionElem = trElement.nextSibling as HTMLTableRowElement

    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    // open
    const enterKey = createEvent.keyDown(trElement, {
      keyCode: 13, // enter
    })
    enterKey.preventDefault = jest.fn()
    fireEvent(trElement, enterKey)

    expect(enterKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--expanded'
    )
    expect(Array.from(accordionElem.classList)).toContain(
      'dnb-table__tr__accordion-content--expanded'
    )

    // close
    const spaceKey = createEvent.keyDown(trElement, {
      keyCode: 32, // space
    })
    spaceKey.preventDefault = jest.fn()
    fireEvent(trElement, spaceKey)

    expect(spaceKey.preventDefault).toHaveBeenCalledTimes(1)
    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )
    expect(Array.from(accordionElem.classList)).not.toContain(
      'dnb-table__tr__accordion-content--expanded'
    )
  })

  it('tr should have hover class when had click', () => {
    render(
      <Table accordion>
        <tbody>
          <Tr>
            <Td>content</Td>
            <Td.AccordionContent>accordion content</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement = document.querySelector('tr')

    expect(Array.from(trElement.classList)).toEqual([
      'dnb-table__tr',
      'dnb-table__tr--odd',
      'dnb-table__tr--last',
      'dnb-table__tr--has-accordion-content',
    ])

    fireEvent.mouseEnter(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--hover'
    )

    fireEvent.click(trElement)
    fireEvent.mouseEnter(trElement)

    expect(Array.from(trElement.classList)).toContain(
      'dnb-table__tr--hover'
    )

    fireEvent.mouseLeave(trElement)

    expect(Array.from(trElement.classList)).not.toContain(
      'dnb-table__tr--hover'
    )
  })

  it('should have expanded accordion content when id matches location hash', () => {
    global.window = Object.create(window)
    const hash = '#unique-id-1'
    const href = `https://url.tld/${hash}`

    Object.defineProperty(window, 'location', {
      value: {
        href,
        hash,
      },
    })

    render(
      <Table accordion>
        <tbody>
          <Tr id="unique-id-1">
            <Td>content 1</Td>
            <Td.AccordionContent>accordion content 1</Td.AccordionContent>
          </Tr>
          <Tr id="unique-id-2">
            <Td>content 2</Td>
            <Td.AccordionContent>accordion content 2</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const trElement1 = document.querySelector('tr')
    expect(Array.from(trElement1.classList)).toContain(
      'dnb-table__tr--expanded'
    )

    const accordionElem1 = trElement1.nextSibling as HTMLTableRowElement
    expect(Array.from(accordionElem1.classList)).toContain(
      'dnb-table__tr__accordion-content--expanded'
    )

    const trElement2 = document.querySelectorAll('tr')[1]
    expect(Array.from(trElement2.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )

    const accordionElem2 = trElement2.nextSibling as HTMLTableRowElement
    expect(Array.from(accordionElem2.classList)).not.toContain(
      'dnb-table__tr__accordion-content--expanded'
    )
  })

  describe('events', () => {
    it('should emit onClick event', () => {
      const onClick = jest.fn()
      const trid = '123'

      render(
        <Table accordion>
          <tbody>
            <Tr onClick={onClick} data-trid={trid}>
              <Td>content</Td>
              <Td.AccordionContent>accordion content</Td.AccordionContent>
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

    it('should emit onOpened event', () => {
      const onOpened = jest.fn()

      render(
        <Table accordion>
          <tbody>
            <Tr onOpened={onOpened}>
              <Td>content</Td>
              <Td.AccordionContent>accordion content</Td.AccordionContent>
            </Tr>
          </tbody>
        </Table>
      )

      const trElement = document.querySelector('tr')

      fireEvent.click(trElement)

      expect(onOpened).toHaveBeenCalledTimes(1)
      expect(onOpened).toHaveBeenCalledWith({
        target: expect.any(Element),
      })
    })

    it('should emit onClosed event', () => {
      const onClosed = jest.fn()
      const onOpened = jest.fn()

      render(
        <Table accordion>
          <tbody>
            <Tr onOpened={onOpened} onClosed={onClosed}>
              <Td>content</Td>
              <Td.AccordionContent>accordion content</Td.AccordionContent>
            </Tr>
          </tbody>
        </Table>
      )

      const trElement = document.querySelector('tr')

      fireEvent.click(trElement)
      fireEvent.click(trElement)

      expect(onOpened).toHaveBeenCalledTimes(1)
      expect(onOpened).toHaveBeenCalledWith({
        target: expect.any(Element),
      })

      expect(onClosed).toHaveBeenCalledTimes(1)

      fireEvent.click(trElement)
      fireEvent.click(trElement)

      expect(onOpened).toHaveBeenCalledTimes(2)
      expect(onClosed).toHaveBeenCalledTimes(2)
    })
  })
})
