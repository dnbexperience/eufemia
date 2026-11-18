import { Flex } from '@dnb/eufemia/src'
import Table, { Tr, Th, Td } from '@dnb/eufemia/src/components/Table'

export default function PlainCells() {
  return (
    <Flex.Horizontal
      data-visual-test="table-plain-cells"
      align="flex-start"
      gap="medium"
      style={{ width: '50rem' }}
    >
      {(['medium', 'small'] as const).map((size) => (
        <Flex.Item key={size} grow>
          <Table size={size} aria-label={`Plain cells: ${size}`}>
            <thead>
              <Tr>
                <Th>Th</Th>
                <th>th</th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>Td</Td>
                <td>td</td>
              </Tr>
              <Tr>
                <Th scope="row">Th</Th>
                <th scope="row">th</th>
              </Tr>
            </tbody>
          </Table>
        </Flex.Item>
      ))}
    </Flex.Horizontal>
  )
}
