import React from 'react'
import cardData from '@dnb/eufemia/src/extensions/payment-card/utils/cardProducts'
import { Table } from '@dnb/eufemia/src/components'

export default function CardProductsTable() {
  return (
    <div className="table-container">
      <Table>
        <thead>
          <tr>
            <th>productCode</th>
            <th>displayName</th>
            <th>cardClassName</th>
            <th>Custom Background Image</th>
            <th>bankLogo</th>
            <th>productType</th>
            <th>cardProvider</th>
            <th>paymentType</th>
          </tr>
        </thead>
        <tbody>
          {cardData.map((card) => {
            return (
              <tr key={card.productCode}>
                <td>{card?.productCode}</td>
                <td>{card?.displayName}</td>
                <td>{card?.cardClassName}</td>

                <td>{card?.backgroundImage ? 'YES' : ' - '}</td>

                <td>{`${card?.bankLogo?.type} ${
                  card?.bankLogo?.color
                    ? '(' + card?.bankLogo?.color + ')'
                    : ''
                }`}</td>
                <td>
                  {card?.productType
                    ? `${card?.productType?.type} ${
                        card?.productType?.color
                          ? '(' + card?.productType?.color + ')'
                          : ''
                      }`
                    : ' - '}
                </td>
                <td>{`${card?.cardProvider?.type} ${
                  card?.cardProvider?.color
                    ? '(' + card?.cardProvider?.color + ')'
                    : ''
                }`}</td>
                <td>
                  {card?.paymentType
                    ? `${card?.paymentType?.type} ${
                        card?.paymentType?.color
                          ? '(' + card?.paymentType?.color + ')'
                          : ''
                      }`
                    : ' - '}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
