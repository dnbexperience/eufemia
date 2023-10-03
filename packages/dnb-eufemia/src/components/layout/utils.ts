import { SpacingProps } from '../../shared/types'

export const pickSpacingProps = <Props extends SpacingProps>(
  props: Props
): SpacingProps => {
  return {
    space: props?.space,
    top: props?.top,
    bottom: props?.bottom,
    left: props?.left,
    right: props?.right,
  }
}

export const omitSpacingProps = <Props extends SpacingProps>(
  props: Props
): Omit<Props, keyof SpacingProps> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { space, top, bottom, left, right, ...restProps } = props
  return restProps
}
