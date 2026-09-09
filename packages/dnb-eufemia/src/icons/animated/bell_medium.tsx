import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import bellIcon from '../dnb/bell_medium'
import './style/dnb-bell.scss'

const bell_medium = ((props?: IconSVGProps) =>
  bellIcon(props)) as IconFunction

bell_medium.__iconAnimation = 'bell'
Object.defineProperty(bell_medium, 'name', { value: bellIcon.name })

export default bell_medium
