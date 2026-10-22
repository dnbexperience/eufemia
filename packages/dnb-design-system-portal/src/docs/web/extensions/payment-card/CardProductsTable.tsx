import data from '@dnb/eufemia/src/extensions/payment-card/utils/cardProducts'
import { Table, Td, Th, Tr } from '@dnb/eufemia/src'

export default function CardProductsTable() {
  return (
    <Table.ScrollView>
      <Table border outline>
        <thead>
          <Tr>
            <Th>Product Id</Th>
            <Th>Product name cards</Th>
            <Th>Card name to show in app</Th>
            <Th>Design</Th>
            <Th>Bank Logo</Th>
            <Th>Product Logo</Th>
            <Th>Product Logo Variant</Th>
            <Th>Type of Card</Th>
            <Th>Type of Card Variant</Th>
          </Tr>
        </thead>
        <tbody>
          {data.map((card) => {
            return (
              <Tr key={card.productCode}>
                <Td>{card.productCode}</Td>
                <Td>{card.productName}</Td>
                <Td>{card.displayName}</Td>
                <Td>{card.cardDesign.name}</Td>
                <Td>{getProductLogo(card.cardDesign.bankLogo)}</Td>
                <Td>
                  {card.productType.tag === 'None'
                    ? '-'
                    : card.productType.tag}
                </Td>
                <Td>
                  {getProductVariant(card.productType, card.cardDesign)}
                </Td>
                <Td>
                  {card.cardType.tag === 'None' ? '-' : card.cardType.tag}
                </Td>
                <Td>{getTypeVariant(card.cardType, card.cardDesign)}</Td>
              </Tr>
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
