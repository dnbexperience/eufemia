import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import bellIcon from '../dnb/bell'
import './style/dnb-bell.scss'

const bell = ((props?: IconSVGProps) => bellIcon(props)) as IconFunction

bell.__iconAnimation = 'bell'
Object.defineProperty(bell, 'name', { value: bellIcon.name })

export default bell
