import React from 'react'
import type { CardProps } from '../../../../components/card/Card'
import CardInstance from '../../../../components/card/Card'

function Card(props: CardProps) {
  return <CardInstance stack {...props} />
}

Object.assign(Card, CardInstance)

export default Card as typeof CardInstance
