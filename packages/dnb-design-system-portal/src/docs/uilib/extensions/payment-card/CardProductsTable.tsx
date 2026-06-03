import data from '@dnb/eufemia/src/extensions/payment-card/utils/cardProducts'
import { Table } from '@dnb/eufemia/src/components'

export default function CardProductsTable() {
  return (
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Table.Tr>
            <Table.Th>Product Id</Table.Th>
            <Table.Th>Product name cards</Table.Th>
            <Table.Th>Card name to show in app</Table.Th>
            <Table.Th>Design</Table.Th>
            <Table.Th>Bank Logo</Table.Th>
            <Table.Th>Product Logo</Table.Th>
            <Table.Th>Product Logo Variant</Table.Th>
            <Table.Th>Type of Card</Table.Th>
            <Table.Th>Type of Card Variant</Table.Th>
          </Table.Tr>
        </thead>
        <tbody>
          {data.map((card) => {
            return (
              <Table.Tr key={card.productCode}>
                <Table.Td>{card.productCode}</Table.Td>
                <Table.Td>{card.productName}</Table.Td>
                <Table.Td>{card.displayName}</Table.Td>
                <Table.Td>{card.cardDesign.name}</Table.Td>
                <Table.Td>
                  {getProductLogo(card.cardDesign.bankLogo)}
                </Table.Td>
                <Table.Td>
                  {card.productType.tag === 'None'
                    ? '-'
                    : card.productType.tag}
                </Table.Td>
                <Table.Td>
                  {getProductVariant(card.productType, card.cardDesign)}
                </Table.Td>
                <Table.Td>
                  {card.cardType.tag === 'None' ? '-' : card.cardType.tag}
                </Table.Td>
                <Table.Td>
                  {getTypeVariant(card.cardType, card.cardDesign)}
                </Table.Td>
              </Table.Tr>
            )
          })}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}

const getTypeVariant = (type, design) => {
  switch (type.tag) {
    case 'Visa':
      return design.visa.tag === 'None' ? '-' : design.visa.tag
    case 'Mastercard':
      return design.mastercard.tag === 'None' ? '-' : design.mastercard.tag
    case 'None':
      return '-'
  }
}

const getProductVariant = (type, design) => {
  switch (type.tag) {
    case 'Saga':
      return design.saga.tag === 'None' ? '-' : design.saga.tag
    case 'PrivateBanking':
      return design.privateBanking.tag === 'None'
        ? '-'
        : design.privateBanking.tag
    default:
      return '-'
  }
}

const getProductLogo = (bankLogo) => {
  switch (bankLogo.tag) {
    case 'Colored':
      return bankLogo.color
    case 'Sbanken':
      return bankLogo.color
  }
}
