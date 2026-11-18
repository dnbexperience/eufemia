import { Flex } from '@dnb/eufemia/src'
import Table, { Tr, Th, Td } from '@dnb/eufemia/src/components/Table'
import TableContainer from '@dnb/eufemia/src/components/table/TableContainer'

export default function BodyHeaderCells() {
  return (
    <Flex.Horizontal
      data-visual-test="table-body-header-cells"
      align="flex-start"
      gap="medium"
      style={{ width: '60rem' }}
    >
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Flex.Item key={size} grow>
          <TableContainer>
            <TableContainer.Body>
              <Table
                size={size}
                border="horizontal"
                striped={false}
                aria-label={`Body header cells: ${size}`}
              >
                <thead>
                  <Tr>
                    <Th>Header</Th>
                    <Th>Header</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Tr verticalAlign="middle">
                    <Th scope="rowgroup">Row header</Th>
                    <Td>Data</Td>
                  </Tr>
                  <Tr verticalAlign="middle" style={{ height: '6rem' }}>
                    <Th scope="rowgroup">Row header</Th>
                    <Td>Data</Td>
                  </Tr>
                  <Tr verticalAlign="bottom" style={{ height: '6rem' }}>
                    <Th scope="rowgroup">Row header</Th>
                    <Td verticalAlign="top">Data</Td>
                  </Tr>
                </tbody>
              </Table>
            </TableContainer.Body>
          </TableContainer>
        </Flex.Item>
      ))}
    </Flex.Horizontal>
  )
}
