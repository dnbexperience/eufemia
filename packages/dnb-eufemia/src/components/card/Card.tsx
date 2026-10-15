import Card from './CardInner'
import CardAction from './CardAction'
import CardInfo from './CardInfo'
import CardList from './CardList'
import CardListItem from './CardListItem'

export type { CardProps } from './CardInner'
export type { CardInfoProps } from './CardInfo'
export { Card }

const CardCompound = Object.assign(Card, {
  Action: CardAction,
  Info: CardInfo,
  List: CardList,
  ListItem: CardListItem,
})

export default CardCompound
