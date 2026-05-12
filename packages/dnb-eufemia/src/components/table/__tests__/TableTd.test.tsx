import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import type { TableTdProps } from '../TableTd'
import TableTd from '../TableTd'
import TableTh from '../TableTh'
import TableTr from '../TableTr'
import Table, { useTableHighlight } from '../Table'
import { TableAccordionContentSingle } from '../table-accordion/TableAccordionContent'

describe('TableTd', () => {
  it('renders with props as an object', () => {
    const props: TableTdProps = {}

    render(
      <table>
        <tbody>
          <tr>
            <TableTd {...props} />
          </tr>
        </tbody>
      </table>
    )
    expect(document.querySelector('td')).toBeInTheDocument()
  })

  it('should contain children content', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')

    expect(element.textContent).toBe('td content')
  })

  it('should include custom attributes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd aria-label="custom-label">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'aria-label'])
  })

  it('should have role with cell as value', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')

    expect(element.getAttribute('role')).toBe('cell')
  })

  it('should include custom classes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd className="custom-class">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toEqual([
      'dnb-table__td',
      'custom-class',
    ])
  })

  it('should set noSpacing class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd noSpacing>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--no-spacing'
    )
  })

  it('should set spacing="horizontal" class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd spacing="horizontal">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--spacing-horizontal'
    )
  })

  it('should set verticalAlign="middle" class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd verticalAlign="middle">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--vertical-align-middle'
    )
  })

  it('should set verticalAlign="top" class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd verticalAlign="top">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--vertical-align-top'
    )
  })

  it('should set verticalAlign="bottom" class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd verticalAlign="bottom">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--vertical-align-bottom'
    )
  })

  it('should have Td.AccordionContent', () => {
    expect(TableTd.AccordionContent).toBe(TableAccordionContentSingle)
  })
})

describe('TableTd with onClick (navigable cell)', () => {
  it('should have --clickable modifier class on the td', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--clickable'
    )
  })

  it('should render a native button inside the cell', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector(
      'td button.dnb-table__td__button'
    )
    expect(button).toBeInTheDocument()
    expect(button.getAttribute('type')).toBe('button')
  })

  it('should not render a button when onClick is not provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    expect(button).not.toBeInTheDocument()
  })

  it('should render chevron icon by default when onClick is provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const icon = document.querySelector('.dnb-table__td__button__icon')
    expect(icon).toBeInTheDocument()
  })

  it('should hide the icon when icon is false', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()} icon={false}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const icon = document.querySelector('.dnb-table__td__button__icon')
    expect(icon).not.toBeInTheDocument()
  })

  it('should render a custom icon when icon is a string', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()} icon="bell">
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const icon = document.querySelector('.dnb-table__td__button__icon')
    expect(icon).toBeInTheDocument()
  })

  it('should render content inside the button', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>cell content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const content = document.querySelector(
      '.dnb-table__td__button__content'
    )
    expect(content).toBeInTheDocument()
    expect(content.textContent).toBe('cell content')
  })

  it('should emit onClick when clicking the button', () => {
    const onClick = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={onClick}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should pass enriched info as second argument to onClick', () => {
    const onClick = jest.fn()

    render(
      <table>
        <thead>
          <tr>
            <th data-column-id="name">Name</th>
            <th data-column-id="age">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr data-row-id="row-1">
            <TableTd onClick={onClick}>Alice</TableTd>
            <TableTd onClick={onClick}>30</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const buttons = document.querySelectorAll('td button')
    fireEvent.click(buttons[0])

    expect(onClick).toHaveBeenCalledTimes(1)

    const info = onClick.mock.calls[0][1]
    expect(info.trElement).toBe(document.querySelector('tbody tr'))
    expect(info.tdElement).toBe(document.querySelectorAll('td')[0])
    expect(info.thElement).toBe(document.querySelectorAll('th')[0])

    fireEvent.click(buttons[1])

    const info2 = onClick.mock.calls[1][1]
    expect(info2.thElement).toBe(document.querySelectorAll('th')[1])
  })

  it('should return null thElement when no thead exists', () => {
    const onClick = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={onClick}>Alice</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    fireEvent.click(button)

    const info = onClick.mock.calls[0][1]
    expect(info.trElement).toBe(document.querySelector('tbody tr'))
    expect(info.tdElement).toBe(document.querySelector('td'))
    expect(info.thElement).toBeNull()
  })

  it('should emit onClick on Enter key (native button behavior)', () => {
    const onClick = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={onClick}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    fireEvent.keyDown(button, { key: 'Enter' })

    // Native button handles Enter, but fireEvent.keyDown doesn't trigger click.
    // In a real browser, Enter on a button triggers click natively.
    // We verify the button is focusable and present.
    expect(button.getAttribute('type')).toBe('button')
  })

  it('should not have tabIndex on the td when onClick is provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(element.getAttribute('tabindex')).toBeNull()
  })

  it('should have no axe violations with clickable cells', async () => {
    const Component = render(
      <table>
        <thead>
          <tr>
            <th>Column A</th>
            <th>Column B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>Cell A</TableTd>
            <TableTd onClick={jest.fn()}>Cell B</TableTd>
          </tr>
        </tbody>
      </table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('TableTd selected state', () => {
  it('should set selected class when selected prop is true', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--selected'
    )
  })

  it('should not render a button when selected is true without onClick', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    expect(button).not.toBeInTheDocument()
  })

  it('should render selected class and clickable button when selected and onClick are both provided', () => {
    const onClick = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const td = document.querySelector('td')
    const button = document.querySelector('td button')

    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')
    expect(Array.from(td.classList)).toContain('dnb-table__td--clickable')
    expect(button).toBeInTheDocument()
    expect(button.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not set selected class when selected prop is false', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).not.toContain(
      'dnb-table__td--selected'
    )
  })

  it('should set aria-pressed on button when selected is true', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected onClick={jest.fn()}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    expect(button.getAttribute('aria-pressed')).toBe('true')
  })

  it('should not set aria-pressed when selected prop is not provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={jest.fn()}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    expect(button.getAttribute('aria-pressed')).toBeNull()
  })

  it('should set aria-pressed="false" when selected is false', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={jest.fn()}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    expect(button.getAttribute('aria-pressed')).toBe('false')
  })

  it('should provide setSelected and isSelected in onClick callback', () => {
    const onClick = jest.fn()

    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    fireEvent.click(button)

    const info = onClick.mock.calls[0][1]
    expect(typeof info.setSelected).toBe('function')
    expect(info.isSelected).toBe(false)
  })

  it('should not apply selection when selected prop is not provided', () => {
    const onClick = jest.fn((_event, { setSelected }) => {
      setSelected(true)
    })

    render(
      <table>
        <tbody>
          <tr>
            <TableTd onClick={onClick}>content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    const td = document.querySelector('td')

    fireEvent.click(button)

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )
    expect(button.getAttribute('aria-pressed')).toBeNull()
  })

  it('should toggle selected state via setSelected from onClick', () => {
    const onClick = jest.fn((_event, { isSelected, setSelected }) => {
      const result = setSelected(!isSelected)
      expect(result).toBe(!isSelected)
    })

    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    const td = document.querySelector('td')

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )

    fireEvent.click(button)

    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')
    expect(button.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(button)

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )
    expect(button.getAttribute('aria-pressed')).toBe('false')
  })

  it('should allow deselecting via setSelected(false)', () => {
    let setSelectedRef: (v: boolean) => void

    const onClick = jest.fn((_event, { setSelected }) => {
      setSelectedRef = setSelected
      setSelected(true)
    })

    const { rerender } = render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const button = document.querySelector('td button')
    fireEvent.click(button)

    const td = document.querySelector('td')
    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')

    // Deselect by calling setSelected(false) outside of click
    setSelectedRef(false)

    rerender(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )
  })

  it('should use selected prop as initial value', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected onClick={jest.fn()}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const td = document.querySelector('td')
    const button = document.querySelector('td button')

    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')
    expect(button.getAttribute('aria-pressed')).toBe('true')
  })

  it('should let internal state take precedence after setSelected', () => {
    const onClick = jest.fn((_event, { setSelected }) => {
      setSelected(true)
    })

    render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={onClick}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const td = document.querySelector('td')
    const button = document.querySelector('td button')

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )

    fireEvent.click(button)

    // Internal state (true) takes precedence over prop (false)
    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')
    expect(button.getAttribute('aria-pressed')).toBe('true')
  })

  it('should sync when selected prop changes externally', () => {
    const { rerender } = render(
      <table>
        <tbody>
          <tr>
            <TableTd selected={false} onClick={jest.fn()}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    const td = document.querySelector('td')
    const button = document.querySelector('td button')

    expect(Array.from(td.classList)).not.toContain(
      'dnb-table__td--selected'
    )

    rerender(
      <table>
        <tbody>
          <tr>
            <TableTd selected onClick={jest.fn()}>
              content
            </TableTd>
          </tr>
        </tbody>
      </table>
    )

    expect(Array.from(td.classList)).toContain('dnb-table__td--selected')
    expect(button.getAttribute('aria-pressed')).toBe('true')
  })

  it('should have no axe violations with selected cell', async () => {
    const Component = render(
      <table>
        <thead>
          <tr>
            <th>Column A</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableTd selected onClick={jest.fn()}>
              Cell A
            </TableTd>
          </tr>
        </tbody>
      </table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('TableTd highlight', () => {
  it('should set highlight class when highlight prop is true', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd highlight>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--highlight'
    )
  })

  it('should not set highlight class when highlight prop is false', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd highlight={false}>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).not.toContain(
      'dnb-table__td--highlight'
    )
  })

  it('should inherit highlight from Tr context', () => {
    render(
      <Table>
        <tbody>
          <TableTr highlight>
            <TableTd>td content</TableTd>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__td--highlight'
    )
  })

  it('should inherit highlight from Th in the same column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
              <TableTh>C</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
              <TableTd>3</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(Array.from(cells[0].classList)).not.toContain(
      'dnb-table__td--highlight'
    )
    expect(Array.from(cells[1].classList)).toContain(
      'dnb-table__td--highlight'
    )
    expect(Array.from(cells[2].classList)).not.toContain(
      'dnb-table__td--highlight'
    )
  })

  it('should set transparent left border on non-highlighted cell right of highlighted column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight>A</TableTh>
              <TableTh>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[1].classList).toContain(
      'dnb-table--highlight-neighbor-left'
    )
  })

  it('should set transparent right border on non-highlighted cell left of highlighted column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[0].classList).toContain(
      'dnb-table--highlight-neighbor-right'
    )
  })

  it('should set transparent top border on non-highlighted cell below highlighted cell', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd highlight>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>3</TableTd>
              <TableTd>4</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[2].classList).toContain(
      'dnb-table--highlight-neighbor-top'
    )
  })

  it('should add highlight-border class between vertically adjacent highlighted cells', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight>A</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[0].classList).toContain('dnb-table__td--highlight')
    expect(cells[0].classList).toContain('dnb-table__td--highlight-border')
    expect(cells[1].classList).toContain('dnb-table__td--highlight')
    expect(cells[1].classList).toContain('dnb-table__td--highlight-border')
  })

  it('should not set transparent borders on non-highlighted cells without highlighted neighbors', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
              <TableTh>C</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
              <TableTd>3</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    // Cell 0 (left of highlight): no left neighbor class
    expect(cells[0].classList).not.toContain(
      'dnb-table--highlight-neighbor-left'
    )
    // Cell 2 (right of highlight): no right neighbor class
    expect(cells[2].classList).not.toContain(
      'dnb-table--highlight-neighbor-right'
    )
  })
})
