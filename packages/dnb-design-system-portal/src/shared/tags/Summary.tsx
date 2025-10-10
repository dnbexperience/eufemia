/**
 * Summary Tag
 *
 * Used with the Details tag
 */

import {
  information_circled as InfoIcon,
  subtract as MinusIcon,
} from '@dnb/eufemia/src/icons'
import { IconPrimary, Flex } from '@dnb/eufemia/src'
import {
  detailsBox__tag,
  detailsBox__text,
  detailsBox__icon,
  detailsBox__icon__line,
} from './Details.module.scss'

const Summary = ({ children, ...props }) => {
  return (
    <summary {...props}>
      <Flex.Container justify="space-between" gap="x-small" wrap={false}>
        <Flex.Item>
          <IconPrimary icon={InfoIcon} className={detailsBox__tag} />
        </Flex.Item>
        <Flex.Item grow>
          Read more: <span className={detailsBox__text}>{children}</span>
        </Flex.Item>
        <Flex.Item>
          <span className={detailsBox__icon}>
            <IconPrimary
              icon={MinusIcon}
              className={detailsBox__icon__line}
            />
            <IconPrimary
              icon={MinusIcon}
              className={detailsBox__icon__line}
            />
          </span>
        </Flex.Item>
      </Flex.Container>
    </summary>
  )
}

export default Summary
