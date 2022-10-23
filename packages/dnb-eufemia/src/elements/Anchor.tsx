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
  className?: string
  children?: React.ReactNode
  omitClass?: boolean
  innerRef?: React.ForwardedRef<unknown>

  // HTML Attributes
  id?: string
  title?: string
  lang?: string

  /** @deprecated use innerRef instead */
  inner_ref?: React.ForwardedRef<unknown>

  /** @deprecated use targetBlankTitle instead */
  target_blank_title?: string
} & Partial<Omit<HTMLAnchorElement, 'children'>> &
  SpacingProps

const defaultProps = {}

function AnchorInstance(localProps: AnchorProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps as Partial<AnchorProps>).Anchor,
    context?.Anchor
  )

  // deprecated
  if (typeof allProps.inner_ref !== 'undefined') {
    allProps.innerRef = allProps.inner_ref
    delete allProps.inner_ref
  }
  // deprecated
  if (typeof allProps.target_blank_title !== 'undefined') {
    allProps.targetBlankTitle = allProps.target_blank_title
    delete allProps.target_blank_title
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

const Anchor = React.forwardRef((props: AnchorProps, ref) => {
  return <AnchorInstance inner_ref={ref} {...props} />
})

export default Anchor
