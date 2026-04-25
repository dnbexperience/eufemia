import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import { useTableKeyboardNavigation } from '../useTableKeyboardNavigation'

function TableWithKeyboardNavigation({
  enabled,
  children,
}: {
  enabled?: boolean
  children: React.ReactNode
}) {
  const navRef = useTableKeyboardNavigation({ enabled })
  return (
    <div ref={navRef}>
      <Table>{children}</Table>
    </div>
  )
}

function BasicTable() {
  return (
    <TableWithKeyboardNavigation>
      <thead>
        <tr>
          <Th>Header 1</Th>
          <Th>Header 2</Th>
          <Th>Header 3</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>Cell 1-1</Td>
          <Td>Cell 1-2</Td>
          <Td>Cell 1-3</Td>
        </tr>
        <tr>
          <Td>Cell 2-1</Td>
          <Td>Cell 2-2</Td>
          <Td>Cell 2-3</Td>
        </tr>
      </tbody>
    </TableWithKeyboardNavigation>
  )
}

function TableWithInputs() {
  return (
    <TableWithKeyboardNavigation>
      <tbody>
        <tr>
          <Td>
            <input data-testid="input-0-0" />
          </Td>
          <Td>
            <input data-testid="input-0-1" />
          </Td>
        </tr>
        <tr>
          <Td>
            <button data-testid="button-1-0">Click</button>
          </Td>
          <Td>
            <a href="/" data-testid="link-1-1">
              Link
            </a>
          </Td>
        </tr>
      </tbody>
    </TableWithKeyboardNavigation>
  )
}

describe('useTableKeyboardNavigation', () => {
  describe('arrow key navigation', () => {
    it('should move focus right with ArrowRight', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      expect(document.activeElement).toBe(cells[0])

      fireEvent.keyDown(cells[0], { key: 'ArrowRight' })

      expect(document.activeElement).toBe(cells[1])
    })

    it('should move focus left with ArrowLeft', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[1].focus()

      fireEvent.keyDown(cells[1], { key: 'ArrowLeft' })

      expect(document.activeElement).toBe(cells[0])
    })

    it('should move focus down with ArrowDown', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      fireEvent.keyDown(cells[0], { key: 'ArrowDown' })

      expect(document.activeElement).toBe(cells[3])
    })

    it('should move focus up with ArrowUp', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[3].focus()

      fireEvent.keyDown(cells[3], { key: 'ArrowUp' })

      expect(document.activeElement).toBe(cells[0])
    })

    it('should navigate from tbody to thead with ArrowUp', () => {
      render(<BasicTable />)

      const thCells = document.querySelectorAll('th')
      const tdCells = document.querySelectorAll('td')

      tdCells[0].focus()

      fireEvent.keyDown(tdCells[0], { key: 'ArrowUp' })

      expect(document.activeElement).toBe(thCells[0])
    })

    it('should navigate from thead to tbody with ArrowDown', () => {
      render(<BasicTable />)

      const thCells = document.querySelectorAll('th')
      const tdCells = document.querySelectorAll('td')

      thCells[0].focus()

      fireEvent.keyDown(thCells[0], { key: 'ArrowDown' })

      expect(document.activeElement).toBe(tdCells[0])
    })
  })

  describe('boundary behavior', () => {
    it('should not move past the left boundary', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      fireEvent.keyDown(cells[0], { key: 'ArrowLeft' })

      expect(document.activeElement).toBe(cells[0])
    })

    it('should not move past the right boundary', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      const lastInRow = cells[2]
      lastInRow.focus()

      fireEvent.keyDown(lastInRow, { key: 'ArrowRight' })

      expect(document.activeElement).toBe(lastInRow)
    })

    it('should not move past the top boundary', () => {
      render(<BasicTable />)

      const thCells = document.querySelectorAll('th')
      thCells[0].focus()

      fireEvent.keyDown(thCells[0], { key: 'ArrowUp' })

      expect(document.activeElement).toBe(thCells[0])
    })

    it('should not move past the bottom boundary', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      const lastRow = cells[5]
      lastRow.focus()

      fireEvent.keyDown(lastRow, { key: 'ArrowDown' })

      expect(document.activeElement).toBe(lastRow)
    })
  })

  describe('focusable elements', () => {
    it('should focus input inside cell when navigating to it with ArrowRight at end of content', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement
      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLElement

      input00.focus()
      input00.value = 'hello'
      input00.setSelectionRange(5, 5)

      fireEvent.keyDown(input00, { key: 'ArrowRight' })

      expect(document.activeElement).toBe(input01)
    })

    it('should not navigate with ArrowRight when cursor is not at end of input', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement

      input00.focus()
      input00.value = 'hello'
      input00.setSelectionRange(2, 2)

      fireEvent.keyDown(input00, { key: 'ArrowRight' })

      expect(document.activeElement).toBe(input00)
    })

    it('should navigate with ArrowLeft when cursor is at start of input', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLElement
      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLInputElement

      input01.focus()
      input01.value = 'hello'
      input01.setSelectionRange(0, 0)

      fireEvent.keyDown(input01, { key: 'ArrowLeft' })

      expect(document.activeElement).toBe(input00)
    })

    it('should not navigate with ArrowLeft when cursor is not at start of input', () => {
      render(<TableWithInputs />)

      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLInputElement

      input01.focus()
      input01.value = 'hello'
      input01.setSelectionRange(3, 3)

      fireEvent.keyDown(input01, { key: 'ArrowLeft' })

      expect(document.activeElement).toBe(input01)
    })

    it('should not navigate horizontally when input has a text selection', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement

      input00.focus()
      input00.value = 'hello'
      input00.setSelectionRange(0, 3)

      fireEvent.keyDown(input00, { key: 'ArrowRight' })

      expect(document.activeElement).toBe(input00)
    })

    it('should still allow ArrowUp/ArrowDown from inputs', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement
      const button10 = document.querySelector(
        '[data-testid="button-1-0"]'
      ) as HTMLElement

      input00.focus()
      input00.value = 'hello'
      input00.setSelectionRange(2, 2)

      fireEvent.keyDown(input00, { key: 'ArrowDown' })

      expect(document.activeElement).toBe(button10)
    })

    it('should focus button inside cell when navigating to it', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLElement

      input00.focus()

      fireEvent.keyDown(input00, { key: 'ArrowDown' })

      expect(document.activeElement).toBe(
        document.querySelector('[data-testid="button-1-0"]')
      )
    })

    it('should focus anchor inside cell when navigating to it', () => {
      render(<TableWithInputs />)

      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLElement

      input01.focus()

      fireEvent.keyDown(input01, { key: 'ArrowDown' })

      expect(document.activeElement).toBe(
        document.querySelector('[data-testid="link-1-1"]')
      )
    })
  })

  describe('horizontal navigation skip for sliders', () => {
    it('should skip ArrowLeft/ArrowRight for range inputs', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input
                  type="range"
                  data-testid="slider"
                  min="0"
                  max="100"
                />
              </Td>
              <Td>Other cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const slider = document.querySelector(
        '[data-testid="slider"]'
      ) as HTMLElement

      slider.focus()

      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(slider)

      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(slider)
    })

    it('should allow ArrowUp/ArrowDown for range inputs', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input
                  type="range"
                  data-testid="slider"
                  min="0"
                  max="100"
                />
              </Td>
              <Td>Other cell</Td>
            </tr>
            <tr>
              <Td>Cell below</Td>
              <Td>Cell below right</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const slider = document.querySelector(
        '[data-testid="slider"]'
      ) as HTMLElement
      const cellBelow = document.querySelectorAll('td')[2]

      slider.focus()

      fireEvent.keyDown(slider, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(cellBelow)
    })

    it('should skip ArrowLeft/ArrowRight for elements with role="slider"', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <div
                  role="slider"
                  tabIndex={0}
                  data-testid="custom-slider"
                  aria-valuenow={50}
                />
              </Td>
              <Td>Other cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const slider = document.querySelector(
        '[data-testid="custom-slider"]'
      ) as HTMLElement

      slider.focus()

      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(slider)

      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(slider)
    })

    it('should allow ArrowUp/ArrowDown for elements with role="slider"', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <div
                  role="slider"
                  tabIndex={0}
                  data-testid="custom-slider"
                  aria-valuenow={50}
                />
              </Td>
            </tr>
            <tr>
              <Td>Cell below</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const slider = document.querySelector(
        '[data-testid="custom-slider"]'
      ) as HTMLElement
      const cellBelow = document.querySelectorAll('td')[1]

      slider.focus()

      fireEvent.keyDown(slider, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(cellBelow)
    })

    it('should skip ArrowLeft/ArrowRight for elements with role="spinbutton"', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <div
                  role="spinbutton"
                  tabIndex={0}
                  data-testid="spinbutton"
                  aria-valuenow={5}
                />
              </Td>
              <Td>Other cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const spinbutton = document.querySelector(
        '[data-testid="spinbutton"]'
      ) as HTMLElement

      spinbutton.focus()

      fireEvent.keyDown(spinbutton, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(spinbutton)

      fireEvent.keyDown(spinbutton, { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(spinbutton)
    })

    it('should allow ArrowUp/ArrowDown for elements with role="spinbutton"', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <div
                  role="spinbutton"
                  tabIndex={0}
                  data-testid="spinbutton"
                  aria-valuenow={5}
                />
              </Td>
            </tr>
            <tr>
              <Td>Cell below</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const spinbutton = document.querySelector(
        '[data-testid="spinbutton"]'
      ) as HTMLElement
      const cellBelow = document.querySelectorAll('td')[1]

      spinbutton.focus()

      fireEvent.keyDown(spinbutton, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(cellBelow)
    })
  })

  describe('text input boundary navigation', () => {
    it('should navigate ArrowRight from an empty input', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement
      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLElement

      input00.focus()
      input00.value = ''
      input00.setSelectionRange(0, 0)

      fireEvent.keyDown(input00, { key: 'ArrowRight' })

      expect(document.activeElement).toBe(input01)
    })

    it('should navigate ArrowLeft from an empty input', () => {
      render(<TableWithInputs />)

      const input00 = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLElement
      const input01 = document.querySelector(
        '[data-testid="input-0-1"]'
      ) as HTMLInputElement

      input01.focus()
      input01.value = ''
      input01.setSelectionRange(0, 0)

      fireEvent.keyDown(input01, { key: 'ArrowLeft' })

      expect(document.activeElement).toBe(input00)
    })

    it('should respect boundary for textarea', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <textarea data-testid="textarea" />
              </Td>
              <Td>Next cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const textarea = document.querySelector(
        '[data-testid="textarea"]'
      ) as HTMLTextAreaElement
      const nextCell = document.querySelectorAll('td')[1]

      // Cursor in the middle — should not navigate
      textarea.focus()
      textarea.value = 'some text'
      textarea.setSelectionRange(4, 4)

      fireEvent.keyDown(textarea, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(textarea)

      // Cursor at end — should navigate
      textarea.setSelectionRange(9, 9)

      fireEvent.keyDown(textarea, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(nextCell)
    })

    it('should respect boundary for textarea with ArrowLeft', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>Previous cell</Td>
              <Td>
                <textarea data-testid="textarea" />
              </Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const textarea = document.querySelector(
        '[data-testid="textarea"]'
      ) as HTMLTextAreaElement
      const prevCell = document.querySelectorAll('td')[0]

      // Cursor in the middle — should not navigate
      textarea.focus()
      textarea.value = 'some text'
      textarea.setSelectionRange(4, 4)

      fireEvent.keyDown(textarea, { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(textarea)

      // Cursor at start — should navigate
      textarea.setSelectionRange(0, 0)

      fireEvent.keyDown(textarea, { key: 'ArrowLeft' })
      expect(document.activeElement).toBe(prevCell)
    })

    it('should respect boundary for tel input type', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input type="tel" data-testid="tel" />
              </Td>
              <Td>Next cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const tel = document.querySelector(
        '[data-testid="tel"]'
      ) as HTMLInputElement
      const nextCell = document.querySelectorAll('td')[1]

      tel.focus()
      tel.value = '12345678'
      tel.setSelectionRange(4, 4)

      fireEvent.keyDown(tel, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(tel)

      tel.setSelectionRange(8, 8)

      fireEvent.keyDown(tel, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(nextCell)
    })

    it('should respect boundary for search input type', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input type="search" data-testid="search" />
              </Td>
              <Td>Next cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const search = document.querySelector(
        '[data-testid="search"]'
      ) as HTMLInputElement
      const nextCell = document.querySelectorAll('td')[1]

      search.focus()
      search.value = 'query'
      search.setSelectionRange(2, 2)

      fireEvent.keyDown(search, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(search)

      search.setSelectionRange(5, 5)

      fireEvent.keyDown(search, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(nextCell)
    })

    it('should allow normal horizontal navigation for checkbox inputs', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input type="checkbox" data-testid="checkbox" />
              </Td>
              <Td>Next cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const checkbox = document.querySelector(
        '[data-testid="checkbox"]'
      ) as HTMLElement
      const nextCell = document.querySelectorAll('td')[1]

      checkbox.focus()

      fireEvent.keyDown(checkbox, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(nextCell)
    })

    it('should allow normal horizontal navigation for radio inputs', () => {
      render(
        <TableWithKeyboardNavigation>
          <tbody>
            <tr>
              <Td>
                <input type="radio" data-testid="radio" />
              </Td>
              <Td>Next cell</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const radio = document.querySelector(
        '[data-testid="radio"]'
      ) as HTMLElement
      const nextCell = document.querySelectorAll('td')[1]

      radio.focus()

      fireEvent.keyDown(radio, { key: 'ArrowRight' })
      expect(document.activeElement).toBe(nextCell)
    })
  })

  describe('non-arrow keys', () => {
    it('should not interfere with non-arrow key events', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      fireEvent.keyDown(cells[0], { key: 'Tab' })
      expect(document.activeElement).toBe(cells[0])

      fireEvent.keyDown(cells[0], { key: 'Enter' })
      expect(document.activeElement).toBe(cells[0])

      fireEvent.keyDown(cells[0], { key: ' ' })
      expect(document.activeElement).toBe(cells[0])
    })
  })

  describe('enabled option', () => {
    it('should not add keyboard navigation when enabled is false', () => {
      render(
        <TableWithKeyboardNavigation enabled={false}>
          <tbody>
            <tr>
              <Td>Cell 1</Td>
              <Td>Cell 2</Td>
            </tr>
          </tbody>
        </TableWithKeyboardNavigation>
      )

      const cells = document.querySelectorAll('td')

      expect(cells[0].hasAttribute('tabindex')).toBe(false)
    })

    it('should add tabindex to cells without focusable children', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      expect(cells[0].getAttribute('tabindex')).toBe('-1')
    })

    it('should not add tabindex to cells with focusable children', () => {
      render(<TableWithInputs />)

      const cells = document.querySelectorAll('td')
      expect(cells[0].hasAttribute('tabindex')).toBe(false)
    })
  })

  describe('event handling', () => {
    it('should prevent default on arrow key events', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      cells[0].dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('focus classes', () => {
    it('should add dnb-no-focus and dnb-table__cell--focus when focusing a cell', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      fireEvent.keyDown(cells[0], { key: 'ArrowRight' })

      expect(cells[1].classList.contains('dnb-no-focus')).toBe(true)
      expect(cells[1].classList.contains('dnb-table__cell--focus')).toBe(
        true
      )
    })

    it('should remove focus classes on focusout', () => {
      render(<BasicTable />)

      const cells = document.querySelectorAll('td')
      cells[0].focus()

      fireEvent.keyDown(cells[0], { key: 'ArrowRight' })

      expect(cells[1].classList.contains('dnb-table__cell--focus')).toBe(
        true
      )

      fireEvent.focusOut(cells[1])

      expect(cells[1].classList.contains('dnb-no-focus')).toBe(false)
      expect(cells[1].classList.contains('dnb-table__cell--focus')).toBe(
        false
      )
    })

    it('should not add focus classes when navigating to a cell with a focusable element', () => {
      render(<TableWithInputs />)

      const cells = document.querySelectorAll('td')
      const firstInput = document.querySelector(
        '[data-testid="input-0-0"]'
      ) as HTMLInputElement

      firstInput.focus()
      firstInput.value = ''
      firstInput.setSelectionRange(0, 0)

      fireEvent.keyDown(firstInput, { key: 'ArrowRight' })

      // The cell with the input should not get focus classes
      expect(cells[1].classList.contains('dnb-table__cell--focus')).toBe(
        false
      )
    })

    it('should add focus classes to th cells as well', () => {
      render(<BasicTable />)

      const thCells = document.querySelectorAll('th')
      thCells[0].focus()

      fireEvent.keyDown(thCells[0], { key: 'ArrowRight' })

      expect(thCells[1].classList.contains('dnb-no-focus')).toBe(true)
      expect(thCells[1].classList.contains('dnb-table__cell--focus')).toBe(
        true
      )
    })
  })
})
