/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps, ElementIsType } from './Element'
import Context from '../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext,
} from '../shared/component-helper'
import Tooltip from '../components/tooltip/Tooltip'
import { SpacingProps } from '../shared/types'

export type AnchorProps = {
  element?: ElementIsType
  href?: string
  to?: string
  targetBlankTitle?: string
  target?: string
  tooltip?: React.ReactNode
  skeleton?: boolean
  omitClass?: boolean
  innerRef?: React.RefObject<HTMLAnchorElement>

  /** @deprecated use innerRef instead */
  inner_ref?: React.RefObject<HTMLAnchorElement>
}

export type AnchorAllProps = AnchorProps &
  React.HTMLProps<HTMLAnchorElement> &
  SpacingProps

const defaultProps = {}

export function AnchorInstance(localProps: AnchorAllProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps as AnchorAllProps).Anchor,
    context?.Anchor
  )

  // deprecated
  if (typeof allProps.inner_ref !== 'undefined') {
    allProps.innerRef = allProps.inner_ref
    delete allProps.inner_ref
  }

  if (!allProps.innerRef) {
    allProps.innerRef = React.createRef()
  }

  const {
    id,
    element,
    className,
    children,
    tooltip,
    omitClass,
    innerRef,
    targetBlankTitle,
    ...rest
  } = allProps

  const attributes = rest as ElementProps

  const internalId = id || 'id' + makeUniqueId()

  // WCAG guide: https://www.w3.org/TR/WCAG20-TECHS/G201.html
  const showTooltip = allProps.target === '_blank' && !allProps.title

  const as = (element || 'a') as string

  return (
    <>
      <E
        as={as}
        className={classnames(
          omitClass !== true && 'dnb-anchor',
          className,

          // because we then don't want to distract the link out
          // we make sure we hide the icon
          allProps.target === '_blank' &&
            typeof children !== 'string' &&
            'dnb-anchor--no-icon'
        )}
        {...attributes}
        innerRef={innerRef}
      >
        {children}
      </E>

      {showTooltip && (
        <Tooltip
          showDelay={100}
          id={internalId + '-tooltip'}
          targetElement={innerRef}
          tooltip={tooltip}
        >
          {allProps.title || targetBlankTitle}
        </Tooltip>
      )}
    </>
  )
}

const Anchor = React.forwardRef(
  (props: AnchorAllProps, ref: React.RefObject<HTMLAnchorElement>) => {
    return <AnchorInstance innerRef={ref} {...props} />
  }
)

export default Anchor
