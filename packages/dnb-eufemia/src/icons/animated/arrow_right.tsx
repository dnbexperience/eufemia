import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import arrowRightIcon from '../dnb/arrow_right'
import './style/dnb-arrow-right.scss'

const arrow_right = ((props?: IconSVGProps) =>
  arrowRightIcon(props)) as IconFunction

arrow_right.__iconAnimation = 'arrow-right'
Object.defineProperty(arrow_right, 'name', {
  value: arrowRightIcon.name,
})

export default arrow_right
