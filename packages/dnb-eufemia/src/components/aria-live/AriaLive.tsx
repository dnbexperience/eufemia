import type { AriaLiveAllProps } from './types'
import { useContext, useRef } from 'react'
import useAriaLive from './useAriaLive'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import FlexLayoutContext from '../flex/FlexLayoutContext'
import FlexLayoutChildren, {
  useFlexLayoutRoot,
} from '../flex/FlexLayoutChildren'

function AriaLive({ element, ...props }: AriaLiveAllProps) {
  const flexLayout = useContext(FlexLayoutContext)
  const rootRef = useRef<HTMLElement>(null)
  const rootLayout = useFlexLayoutRoot(flexLayout, rootRef)
  const { children, ...ariaAttributes } = useAriaLive(props)
  const Element = element || 'section'

  return (
    <Element ref={rootRef} {...ariaAttributes}>
      <FlexLayoutChildren layout={rootLayout}>
        {children}
      </FlexLayoutChildren>
    </Element>
  )
}

withComponentMarkers(AriaLive, {
  _supportsSpacingProps: 'children',
})

export default AriaLive
