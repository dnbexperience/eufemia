import { clsx } from 'clsx'
import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type StackProps = Omit<
  FlexContainerAllProps,
  'direction' | 'align' | 'alignSelf' | 'gap' | 'element'
> & {
  /**
   * Direction of sub components. Can be: `horizontal` or `vertical`. Defaults to `vertical`.
   */
  direction?: FlexContainerAllProps['direction']
  /**
   * Align sub components along the cross axis (CSS `align-items`). In horizontal direction, this controls vertical alignment. In vertical direction, this controls horizontal alignment. Defaults to `stretch`.
   */
  align?: FlexContainerAllProps['align']
  /**
   * Align the Stack itself when it is a flex item in an outer container (CSS `align-self`). Defaults to `stretch`.
   */
  alignSelf?: FlexContainerAllProps['alignSelf']
  /**
   * How much space between child items. Use `false` for no spacing. Defaults to `medium`, or `small` when `divider` is `line` or `line-framed`.
   */
  gap?: FlexContainerAllProps['gap']
  /**
   * Define the type of element. Defaults to `section`.
   */
  element?: FlexContainerAllProps['element']
}

function Stack(props: StackProps) {
  const {
    className,
    direction = 'vertical',
    alignSelf = 'stretch',
    align = 'stretch',
    gap = props.divider !== 'line' && props.divider !== 'line-framed'
      ? 'medium'
      : 'small',
    children,
    ...rest
  } = props

  return (
    <Container
      element="section"
      className={clsx('dnb-flex-stack', className)}
      direction={direction}
      alignSelf={alignSelf}
      align={align}
      gap={gap}
      {...rest}
    >
      {children}
    </Container>
  )
}

withComponentMarkers(Stack, { _supportsSpacingProps: true })

export default Stack
