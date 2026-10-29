import { H1, H2, P } from '@dnb/eufemia/src/elements'
import { clsx } from 'clsx'
import {
  Anchor,
  Checkbox,
  Input,
  Radio,
  Switch,
  Table,
} from '@dnb/eufemia/src/components'
import { Th, Td, Tr } from '@dnb/eufemia/src/components/Table'
import styles from './sample.module.scss'

export default function StyleSample({
  print = false,
  plain = false,
}: {
  print?: boolean
  plain?: boolean
}) {
  return (
    <article
      className={clsx(
        print ? 'dnb-print' : 'dnb-document',
        plain && 'dnb-print--plain',
        styles.sample
      )}
      data-visual-test="style-sample"
    >
      <H1>{print ? 'Print styles' : 'Document styles'}</H1>
      {!print && (
        <p className="dnb-document__return-address">
          Return address: Example Bank, Example Street 1, 0123 Oslo
        </p>
      )}
      <P>
        Branded text with <strong>emphasis</strong> and a{' '}
        <small>smaller annotation</small>.
      </P>
      <P>
        <Anchor href="https://example.com">Read more</Anchor>
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
      {plain && <P className="dnb-print-only">Visible in print only.</P>}
      {plain && (
        <div className={styles.controls}>
          <Input label="Reference" value="12345" readOnly bottom />
          <Input
            label="Empty reference"
            value=""
            placeholder="12345"
            readOnly
            bottom
          />
          <Checkbox label="Selected" checked readOnly right />
          <Checkbox label="Not selected" checked={false} readOnly right />
          <Checkbox label="Partial" indeterminate readOnly bottom />
          <Radio label="Selected option" checked readOnly right />
          <Radio label="Other option" checked={false} readOnly bottom />
          <Switch label="Enabled setting" checked readOnly right />
          <Switch label="Off setting" checked={false} readOnly bottom />
        </div>
      )}
      <div className="dnb-document__signature dnb-print__keep-together">
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
