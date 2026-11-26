import { useState } from 'react'
import Table, { Tr, Th, Td } from '@dnb/eufemia/src/components/Table'
import Button from '@dnb/eufemia/src/components/Button'

const columns = [
  'Date',
  'USD',
  'EUR',
  'SEK',
  'DKK',
  'GBP',
  'CHF',
  'JPY',
  'CAD',
  'ISK',
  'AUD',
]

// Each click on the "Sticky column" button selects the next one
const stickyColumns = [undefined, 'first', 'last'] as const

export default function Page() {
  const [banner, setBanner] = useState(false)
  const [sticky, setSticky] = useState<true | false | 'css-position'>(true)
  const [internalScroll, setInternalScroll] = useState(false)
  const [stickyColumnIndex, setStickyColumnIndex] = useState(0)

  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh' }}>
      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto',
          height: '3.5rem',
          background: 'var(--token-color-background-neutral-base)',
          zIndex: 10,
          padding: '1rem',
        }}
      >
        Table sticky header reproduction
      </header>
      <main
        style={{
          padding: '6rem 1rem 2rem',
          maxWidth: '75rem',
          margin: 'auto',
        }}
      >
        <h1 className="dnb-h--large">Historical exchange rates</h1>
        <Button onClick={() => setBanner(!banner)}>Toggle banner</Button>
        <Button onClick={() => setSticky(!sticky)}>Toggle sticky</Button>
        <Button onClick={() => setSticky('css-position')}>
          Use CSS position
        </Button>
        <Button onClick={() => setInternalScroll(!internalScroll)}>
          Toggle internal scroll
        </Button>
        <Button
          onClick={() =>
            setStickyColumnIndex(
              (stickyColumnIndex + 1) % stickyColumns.length
            )
          }
        >
          Sticky column: {stickyColumns[stickyColumnIndex] ?? 'none'}
        </Button>
        {banner && (
          <div style={{ height: '5rem' }}>
            Dynamic content above the table
          </div>
        )}
        <Table.ScrollView
          style={{ maxHeight: internalScroll ? '25rem' : undefined }}
        >
          <Table
            sticky={sticky}
            stickyOffset="3.5rem"
            stickyColumn={stickyColumns[stickyColumnIndex]}
            style={{ minWidth: '70rem' }}
          >
            <thead>
              <Tr>
                {columns.map((column) => (
                  <Th key={column}>{column}</Th>
                ))}
              </Tr>
            </thead>
            <tbody>
              {Array.from({ length: 220 }, (_, index) => (
                <Tr key={index}>
                  {columns.map((column, columnIndex) => (
                    <Td key={column}>
                      {columnIndex === 0 ? `Day ${index + 1}` : '10.1234'}
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>
        </Table.ScrollView>
        <div style={{ height: '100vh' }}>Content after the table</div>
      </main>
    </div>
  )
}
