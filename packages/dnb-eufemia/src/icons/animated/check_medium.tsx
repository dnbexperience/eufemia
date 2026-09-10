import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import checkIcon from '../dnb/check_medium'
import './style/dnb-check.scss'

const check_medium = ((props?: IconSVGProps) =>
  checkIcon(props)) as IconFunction

check_medium.__iconAnimation = 'check'
Object.defineProperty(check_medium, 'name', { value: checkIcon.name })

export default check_medium
