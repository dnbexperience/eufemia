import Root from './MenuRoot'
import Button from './MenuButton'
import MenuList from './MenuList'
import Action from './MenuAction'
import Accordion from './MenuAccordion'
import Header from './MenuHeader'
import Divider from './MenuDivider'

const Menu = {
  Root,
  Button,
  List: MenuList,
  Action,
  Accordion,
  Header,
  Divider,
} as const

export default Menu
