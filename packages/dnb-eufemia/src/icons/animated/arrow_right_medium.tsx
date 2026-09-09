import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import arrowRightIcon from '../dnb/arrow_right_medium'
import './style/dnb-arrow-right.scss'

const arrow_right_medium = ((props?: IconSVGProps) =>
  arrowRightIcon(props)) as IconFunction

arrow_right_medium.__iconAnimation = 'arrow-right'
Object.defineProperty(arrow_right_medium, 'name', {
  value: arrowRightIcon.name,
})

export default arrow_right_medium
