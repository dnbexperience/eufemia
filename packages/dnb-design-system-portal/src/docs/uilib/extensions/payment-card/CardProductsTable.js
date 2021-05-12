import React from 'react'
import data from '@dnb/eufemia/src/extensions/payment-card/utils/cardProducts.js'
import { Table } from '@dnb/eufemia/src/elements'

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
                <td>{prettiePrint(card.productType.toString())}</td>
                <td>
                  {getProductVariant(card.productType, card.cardDesign)}
                </td>
                <td>{prettiePrint(card.cardType.toString())}</td>
                <td>{getTypeVariant(card.cardType, card.cardDesign)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const prettiePrint = (text) => {
  const textArr = text.split('.')
  let newText = textArr[1]
  if (newText === 'None') {
    newText = '-'
  }
  return newText
}

const getTypeVariant = (type, design) =>
  type.cata({
    Visa: () => prettiePrint(design.visa.toString()),
    Mastercard: () => prettiePrint(design.mastercard.toString()),
    None: () => '-',
  })

const getProductVariant = (type, design) =>
  type.cata({
    BankAxept: () => prettiePrint(design.bankAxept.toString()),
    Saga: () => prettiePrint(design.saga.toString()),
    Pluss: () => '-',
    PrivateBanking: () => prettiePrint(design.privateBanking.toString()),
    None: () => '-',
  })

const getProductLogo = (bankLogo) =>
  bankLogo.cata({
    Colored: (color) => color,
    Metalic: () => 'Metalic',
  })
