import React from 'react'
import classnames from 'classnames'
import { ListVariant, ListContext } from './ListContext'
import FlexContainer, { Props as FlexProps } from '../flex/Stack'

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
    <ListContext.Provider value={{ variant, separated }}>
      <FlexContainer
        element="ul"
        rowGap={separated ? 'small' : false}
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
