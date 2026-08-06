import { useContext } from 'react'
import type { ComponentType, ReactNode } from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import FlexLayoutContext from './FlexLayoutContext'
import FlexLayoutChildren from './FlexLayoutChildren'

export type WithChildrenProps = {
  children?: ReactNode
}

/**
 * @deprecated Custom components participate in Flex through their rendered DOM.
 * Use only as a temporary adapter while migrating wrapper components.
 */
function withChildren<T extends WithChildrenProps>(
  Component: ComponentType<T>
): ComponentType<T> {
  function WithChildren(props: T) {
    const layout = useContext(FlexLayoutContext)

    return (
      <Component {...props}>
        <FlexLayoutChildren layout={layout}>
          {props.children}
        </FlexLayoutChildren>
      </Component>
    )
  }

  WithChildren.displayName = `Flex.withChildren(${
    Component.displayName || Component.name || 'Component'
  })`

  withComponentMarkers(WithChildren, {
    _supportsSpacingProps: 'children',
  })

  return WithChildren
}

export default withChildren
