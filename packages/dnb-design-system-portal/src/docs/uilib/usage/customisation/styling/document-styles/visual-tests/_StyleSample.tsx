import { H1, H2, P } from '@dnb/eufemia/src/elements'
import { Table } from '@dnb/eufemia/src/components'
import { Th, Td, Tr } from '@dnb/eufemia/src/components/Table'
import styles from './sample.module.scss'

export default function StyleSample({
  print = false,
}: {
  print?: boolean
}) {
  return (
    <article
      className={`dnb-document ${styles.sample}`}
      data-visual-test="style-sample"
    >
      <H1>{print ? 'Print styles' : 'Document styles'}</H1>
      <P>
        Branded text with <strong>emphasis</strong> and a{' '}
        <small>smaller annotation</small>.
      </P>
      <H2 size="x-large">Section heading</H2>
      <ul className="dnb-ul">
        <li>First item</li>
        <li>
          Second item with text that wraps onto another line to show
          document line height and list spacing.
        </li>
      </ul>
      <Table size="small">
        <thead>
          <Tr>
            <Th scope="col">Description</Th>
            <Th scope="col" align="right">
              Amount
            </Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <P>First row</P>
            </Td>
            <Td align="right">1 250,00</Td>
          </Tr>
          <Tr>
            <Td>Second row</Td>
            <Td align="right">750,00</Td>
          </Tr>
        </tbody>
      </Table>
      <P className="dnb-print-hidden">Visible on screen only.</P>
      <div className="dnb-document__signature">
        <P>
          Kind regards
          <br />
          The team
        </P>
      </div>
      <footer className="dnb-document__footer">
        <P>Footer with nested paragraph content.</P>
      </footer>
    </article>
  )
}
