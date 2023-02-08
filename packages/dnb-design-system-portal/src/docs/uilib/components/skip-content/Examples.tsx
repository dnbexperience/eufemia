/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
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
  Dl,
  Dd,
  Dt,
} from '@dnb/eufemia/src'

export const SkipContentDefault = () => (
  <ComponentBox hideCode scope={{ LargeTableWithInteractiveElements }}>
    <Button variant="secondary">Tab me first</Button>

    <SkipContent selector="#form-id">
      Skip table with enter key – or continue tabbing
    </SkipContent>

    <LargeTableWithInteractiveElements />

    <Button top id="form-id">
      Submit
    </Button>
  </ComponentBox>
)

export const SkipContentSection = () => (
  <ComponentBox hideCode scope={{ LargeTableWithInteractiveElements }}>
    <Button variant="secondary">Tab me first</Button>

    <SkipContent
      selector=".section-form-id"
      text="Skip table with enter key – or continue tabbing"
    />

    <LargeTableWithInteractiveElements />

    <Section className="section-form-id" top>
      <Button>Submit</Button>
    </Section>
  </ComponentBox>
)

const LargeTableWithInteractiveElements = () => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
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
      <Table accordion border outline size="medium">
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
