import React from 'react'
import CardInstance, {
  Props as CardProps,
} from '../../../../components/card/Card'

function Card(props: CardProps) {
  return <CardInstance stack outset {...props} />
}

Object.assign(Card, CardInstance)

export default Card as typeof CardInstance
