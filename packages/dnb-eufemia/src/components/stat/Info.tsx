import React from 'react'
import clsx from 'clsx'
import type { SpacingProps } from '../../shared/types'
import { warn } from '../../shared/componentHelper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatValueContext from './StatValueContext'
import StatRootContext from './StatRootContext'
import { TextInternal as Text } from './Text'

const infoContextValue = {
  useBasisSize: true,
  defaultMainWeight: 'regular',
} as const

type InfoOwnProps = {
  element?: keyof React.JSX.IntrinsicElements
  variant?: 'plain' | 'subtle' | 'prominent'
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
    variant = 'subtle',
    skeleton = null,
    ...rest
  } = props

  if (!inRoot) {
    warn('Stat.Info should be used inside Stat.Root')
  }

  return (
    <Text
      {...rest}
      id={id}
      element={Element}
      className={clsx(
        'dnb-stat',
        'dnb-stat__info',
        `dnb-stat__info--${variant}`,
        className
      )}
      style={style}
      skeleton={skeleton}
      textClassName={false}
    >
      <StatValueContext value={infoContextValue}>
        {children}
      </StatValueContext>
    </Text>
  )
}

Info._supportsSpacingProps = true

export default Info
