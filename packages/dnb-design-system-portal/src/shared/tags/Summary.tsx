/**
 * Summary Tag
 *
 * Used with the Details tag
 */

import {
  information_circled as InfoIcon,
  subtract as MinusIcon,
} from '@dnb/eufemia/src/icons'
import { IconPrimary, Button, Flex } from '@dnb/eufemia/src'
import {
  detailsBox__button,
  detailsBox__tag,
  detailsBox__icon,
  detailsBox__icon__line,
} from './Details.module.scss'

const Summary = ({ children, ...props }) => {
  return (
    <summary {...props}>
      <Flex.Container justify="space-between" gap="x-small" wrap={false}>
        <Flex.Item grow>
          <Button
            variant="tertiary"
            type=""
            element="span"
            size="small"
            className={detailsBox__button}
            wrap
            icon={
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
            }
            icon_position="left"
          >
            {children}
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Flex.Container
            align="center"
            gap="xx-small"
            wrap={false}
            className={detailsBox__tag}
          >
            Read more
            <IconPrimary size="small" icon={InfoIcon} />
          </Flex.Container>
        </Flex.Item>
      </Flex.Container>
    </summary>
  )
}

export default Summary
