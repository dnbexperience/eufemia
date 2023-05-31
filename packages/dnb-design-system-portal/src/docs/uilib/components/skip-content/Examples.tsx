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
  H4,
  Dl,
  Dd,
  Dt,
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

    <Section id="submit-area" spacing="small" style_type="divider" top>
      <SkipContent.Return selector="#submit-area" bottom>
        Back to beginning of table
      </SkipContent.Return>

      <Button>Submit</Button>
    </Section>
  </ComponentBox>
)

const LargeTableWithInteractiveElements = (props) => {
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
