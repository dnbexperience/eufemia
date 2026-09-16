/**
 * HTML Element
 *
 */

import { createContext, useContext } from 'react'
import type { Ref, RefObject } from 'react'
import { clsx } from 'clsx'
import type { DynamicElement } from '../../shared/types'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context from '../../shared/Context'
import type {
  TypographyContextType,
  TypographyProps,
  TypographyProviderProps,
  TypographySize,
  TypographyUseProps,
} from './types'

export * from './types'

export const TypographyContext = createContext<TypographyContextType>({
  proseMaxWidth: undefined,
  responsive: undefined,
})

type TypographyInternalProps = {
  ref?: RefObject<HTMLElement> | Ref<unknown>
}

const Typography = (props: TypographyProps & TypographyInternalProps) => {
  const {
    element = 'p',
    className,
    size,
    lineHeight,
    align,
    family,
    weight,
    decoration,
    slant,
    ...rest
  } = useTypography(props)

  const context = useContext(Context)

  return (
    <E
      as={element as DynamicElement<unknown>}
      {...rest}
      className={clsx(
        className,
        size && `dnb-t__size--${size}`,
        align && `dnb-t__align--${align}`,
        family && `dnb-t__family--${family}`,
        weight && `dnb-t__weight--${weight}`,
        decoration && `dnb-t__decoration--${decoration}`,
        slant && `dnb-t__slant--${slant}`,
        context?.theme?.surface === 'dark' && 'dnb-t--surface-dark',
        (lineHeight || size) && `dnb-t__line-height--${lineHeight || size}`
      )}
    />
  )
}

const Provider = ({ children, ...rest }: TypographyProviderProps) => {
  const parentContext = useContext(TypographyContext)
  const newContext = { ...parentContext, ...rest }

  return (
    <TypographyContext value={newContext}>{children}</TypographyContext>
  )
}

withComponentMarkers(Typography, { _supportsSpacingProps: true })
/** @deprecated use Typography.Context */
Typography.Provider = Provider
Typography.Context = Provider

export default Typography
export { Provider }

const HEADING_LINE_HEIGHT_MAP: Record<TypographySize, TypographySize> = {
  'x-small': 'x-small',
  small: 'small',
  basis: 'basis',
  medium: 'medium',
  large: 'large',
  'x-large': 'x-large',
  'xx-large': 'xx-large',
}

export function getHeadingLineHeightSize(
  fontSize: TypographySize
): TypographySize {
  return HEADING_LINE_HEIGHT_MAP[fontSize] || 'basis'
}

/** Updates props.style based on props.proseMaxWidth and typography context values */
export const useTypography = <Props extends TypographyUseProps>({
  proseMaxWidth: proseMaxWidthProp,
  ...rest
}: Props): Omit<Props & TypographyUseProps, 'proseMaxWidth'> => {
  const { proseMaxWidth: proseMaxWidthContext, responsive } =
    useContext(TypographyContext)

  // Use prop value if provided, otherwise fall back to context
  const proseMaxWidth = proseMaxWidthProp ?? proseMaxWidthContext

  const style = proseMaxWidth
    ? { maxWidth: `${proseMaxWidth === true ? 60 : proseMaxWidth}ch` }
    : undefined

  return {
    ...rest,
    ...(style !== undefined && {
      style: { ...style, ...rest.style },
    }),
    ...(responsive !== undefined && {
      className: clsx(
        rest.className,
        responsive && 'dnb-t__responsive-on',
        responsive === false && 'dnb-t__responsive-off'
      ),
    }),
  }
}
