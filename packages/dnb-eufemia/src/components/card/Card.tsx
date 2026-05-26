import Card from './CardInner'
import CardAction from './CardAction'
import CardList from './CardList'
import CardListItem from './CardListItem'

export type { CardProps } from './CardInner'
export { Card }

const CardCompound = Object.assign(Card, {
  Action: CardAction,
  List: CardList,
  ListItem: CardListItem,
})

export default CardCompound
