import React from 'react'
import classnames from 'classnames'
import type { SpacingProps } from '../../shared/types'
import { warn } from '../../shared/component-helper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatValueContext from './StatValueContext'
import StatRootContext from './StatRootContext'
import Text from './Text'

const infoContextValue = {
  useBasisSize: true,
  defaultMainWeight: 'regular',
} as const

type InfoOwnProps = {
  element?: keyof JSX.IntrinsicElements
  variant?:
    | 'plain'
    | 'subtle'
    | 'prominent'
    | /** @deprecated Use "plain" instead */ 'default'
  skeleton?: SkeletonShow
}

export type InfoProps = Omit<
  React.HTMLProps<HTMLElement>,
  keyof InfoOwnProps | 'ref'
> &
  InfoOwnProps &
  SpacingProps

function Info(props: InfoProps) {
  const { inRoot } = React.useContext(StatRootContext)

  const {
    children,
    id = null,
    element: Element = 'span',
    className = null,
    style = null,
    variant: variantProp = 'subtle',
    skeleton = null,
    ...rest
  } = props

  let variant = variantProp
  if (variant === 'default') {
    warn(
      'Stat.Info variant="default" is deprecated. Use variant="plain" instead.'
    )
    variant = 'plain'
  }

  if (!inRoot) {
    warn('Stat.Info should be used inside Stat.Root')
  }

  return (
    <Text
      {...rest}
      id={id}
      element={Element}
      className={classnames(
        'dnb-stat',
        'dnb-stat__info',
        `dnb-stat__info--${variant}`,
        className
      )}
      style={style}
      skeleton={skeleton}
      textClassName={false}
    >
      <StatValueContext.Provider value={infoContextValue}>
        {children}
      </StatValueContext.Provider>
    </Text>
  )
}

Info._supportsSpacingProps = true

export default Info
