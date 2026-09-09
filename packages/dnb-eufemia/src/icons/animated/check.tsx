import type {
  IconFunction,
  IconSVGProps,
} from '../../components/icon/Icon'
import checkIcon from '../dnb/check'
import './style/dnb-check.scss'

const check = ((props?: IconSVGProps) =>
  checkIcon(props)) as IconFunction

check.__iconAnimation = 'check'
Object.defineProperty(check, 'name', { value: checkIcon.name })

export default check
