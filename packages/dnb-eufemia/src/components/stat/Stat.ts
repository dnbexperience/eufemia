import StatNumber from './Number'
import Currency from './Currency'
import Percent from './Percent'
import Rating from './Rating'
import Trend from './Trend'
import Label from './Label'
import Info from './Info'
import Inline from './Inline'
import Root from './Root'
import Content from './Content'
import Text from './Text'

export { StatNumber as Number }
export { Currency }
export { Percent }
export { Rating }
export { Trend }
export { Label }
export { Info }
export { Inline }
export { Root }
export { Content }
export { Text }

const Stat = {
  Number: StatNumber,
  Currency,
  Percent,
  Rating,
  Trend,
  Label,
  Info,
  Inline,
  Root,
  Content,
  Text,
} as const

export default Stat
