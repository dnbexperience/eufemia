import React from 'react'
import CardInstance, {
  Props as CardProps,
} from '../../../../components/card/Card'

function Card(props: CardProps) {
  return <CardInstance stack outset {...props} />
}

Card._supportsSpacingProps = true

export default Card
