import React from 'react'
import clsx from 'clsx'
import type { ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { StackProps as FlexProps } from '../flex/Stack'
import FlexContainer from '../flex/Stack'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ListContainerProps = {
  variant?: ListVariant
  separated?: boolean
} & React.HTMLAttributes<HTMLDivElement> &
  FlexProps

function ListContainer(props: ListContainerProps) {
  const {
    className,
    children,
    variant = 'basic',
    separated,
    ...rest
  } = props

  return (
    <ListContext value={{ variant, separated }}>
      <FlexContainer
        element="ul"
        rowGap={separated ? 'small' : false}
        className={clsx(
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
    </ListContext>
  )
}

withComponentMarkers(ListContainer, {
  _supportsSpacingProps: true,
})

export default ListContainer
