import GridContainer from './GridContainer'
import GridItem from './GridItem'

const Grid = GridContainer as typeof GridContainer & {
  Item: typeof GridItem
}
Grid.Item = GridItem

export default Grid
