import data from '@dnb/eufemia/src/extensions/payment-card/utils/cardProducts'
import { Table } from '@dnb/eufemia/src/components'

export default function CardProductsTable() {
  return (
    <div className="table-container">
      <Table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product name cards</th>
            <th>Card name to show in app</th>
            <th>Design</th>
            <th>Bank Logo</th>
            <th>Product Logo</th>
            <th>Product Logo Variant</th>
            <th>Type of Card</th>
            <th>Type of Card Variant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((card) => {
            return (
              <tr key={card.productCode}>
                <td>{card.productCode}</td>
                <td>{card.productName}</td>
                <td>{card.displayName}</td>
                <td>{card.cardDesign.name}</td>
                <td>{getProductLogo(card.cardDesign.bankLogo)}</td>
                <td>
                  {card.productType.tag === 'None'
                    ? '-'
                    : card.productType.tag}
                </td>
                <td>
                  {getProductVariant(card.productType, card.cardDesign)}
                </td>
                <td>
                  {card.cardType.tag === 'None' ? '-' : card.cardType.tag}
                </td>
                <td>{getTypeVariant(card.cardType, card.cardDesign)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
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
