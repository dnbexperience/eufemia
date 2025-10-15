/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  SkipContent,
  Button,
  Table,
  Td,
  Tr,
  Th,
  Checkbox,
  Input,
  Section,
  H4,
  Dl,
  Dd,
  Dt,
  H2,
} from '@dnb/eufemia/src'

export const SkipContentTable = () => (
  <ComponentBox hideCode scope={{ LargeTableWithInteractiveElements }}>
    <section aria-labelledby="table-with-caption heading">
      <H4 id="heading" space={0}>
        This table has many focusable elements
      </H4>

      <SkipContent selector="#submit-area" text="Skip table content" top />

      <LargeTableWithInteractiveElements id="table-with-caption" />
    </section>

    <Section id="submit-area" spacing="small" variant="divider" top>
      <SkipContent.Return selector="#submit-area" bottom>
        Back to beginning of table
      </SkipContent.Return>

      <Button>Submit</Button>
    </Section>
  </ComponentBox>
)

const LargeTableWithInteractiveElements = (props) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" labelSrOnly />
  }
  const TdInput = () => {
    return <Input label="Label" labelSrOnly size={4} />
  }

  const Row = ({ nr }) => {
    return (
      <Tr>
        <Td>
          <TdCheckbox />
        </Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>

        <Td.AccordionContent>
          <Section top spacing>
            <Dl>
              <Dt>Favorittfarge</Dt>
              <Dd>Grønn</Dd>
              <Dt>Favorittmat</Dt>
              <Dd>Taco</Dd>
            </Dl>
          </Section>
        </Td.AccordionContent>
      </Tr>
    )
  }

  const Rows = []
  for (let i = 0, l = 10; i < l; i++) {
    Rows.push(<Row key={i} nr={String(i + 1)} />)
  }

  return (
    <Table.ScrollView top>
      <Table accordion border outline size="medium" {...props}>
        <caption className="dnb-sr-only">A Table Caption</caption>

        <thead>
          <Tr>
            <Th>Column A</Th>
            <Th>Column B</Th>
            <Th>Column C</Th>
            <Th align="right">Column D</Th>
          </Tr>
        </thead>

        <tbody>{Rows}</tbody>
      </Table>
    </Table.ScrollView>
  )
}

export const SkipContentInfo1 = () => (
  <ComponentBox hidePreview hideToolbar>
    <section aria-labelledby="heading-id">
      <H2 id="heading-id">Description of table</H2>

      <SkipContent selector="#my-selector" text="Skip table content" />

      <Table aria-labelledby="heading-id">table content</Table>
    </section>

    <section id="my-selector" aria-label="Submit">
      <div id="submit-form" />
    </section>
  </ComponentBox>
)

export const SkipContentInfo2 = () => (
  <ComponentBox hidePreview hideToolbar>
    <section aria-labelledby="table-id">
      <SkipContent selector=".my-selector">Skip table content</SkipContent>

      <Table id="table-id">
        <caption>Description of table</caption>
      </Table>

      <div className="my-selector">
        <SkipContent.Return
          selector=".my-selector" // same as SkipContent
          text="Back to beginning of table"
        />

        <div id="submit-form" />
      </div>
    </section>
  </ComponentBox>
)
