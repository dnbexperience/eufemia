import React, { useContext } from 'react'
import classnames from 'classnames'
import { ListVariant, ListContext } from './ListContext'
import FlexContainer, { Props as FlexProps } from '../flex/Stack'
import type { SkeletonShow } from '../Skeleton'
import SharedContext from '../../shared/Context'

export type ListContainerProps = {
  variant?: ListVariant
  separated?: boolean
  skeleton?: SkeletonShow
  disabled?: boolean
} & FlexProps

function ListContainer(props: ListContainerProps) {
  const {
    className,
    children,
    variant = 'basic',
    separated = false,
    skeleton,
    disabled,
    wrapChildrenInSpace = false,
    ...rest
  } = props

  const parentContext = useContext(ListContext)
  const globalContext = useContext(SharedContext)
  const appliedSkeleton =
    skeleton ?? parentContext?.skeleton ?? globalContext?.skeleton
  const appliedDisabled = disabled ?? parentContext?.disabled

  return (
    <ListContext.Provider
      value={{
        variant,
        separated,
        skeleton: appliedSkeleton,
        disabled: appliedDisabled,
      }}
    >
      <FlexContainer
        element="ul"
        rowGap={separated ? 'small' : false}
        wrapChildrenInSpace={wrapChildrenInSpace}
        className={classnames(
          'dnb-list',
          'dnb-list__container',
          variant && `dnb-list--variant-${variant}`,
          separated && 'dnb-list--separated',
          className
        )}
        {...rest}
      >
        {children}
      </FlexContainer>
    </ListContext.Provider>
  )
}

ListContainer._supportsSpacingProps = true

export default ListContainer
