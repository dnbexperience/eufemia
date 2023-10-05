type PaddingValue =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

type DynamicPaddingValue = 'xx-large' | 'x-large' | 'large' | 'medium'

type ResponsivePadding = {
  small?: PaddingValue
  medium?: PaddingValue
  large?: PaddingValue
  above?: PaddingValue
}

const defaultPadding: PaddingValue = 'large'
const defaultDynamicPadding: DynamicPaddingValue = 'large'

const dynamicPaddingMap: Record<
  DynamicPaddingValue,
  Record<'small' | 'medium' | 'large' | 'above', PaddingValue>
> = {
  'xx-large': {
    small: 'medium',
    medium: 'large',
    large: 'x-large',
    above: 'xx-large',
  },
  'x-large': {
    small: 'medium',
    medium: 'large',
    large: 'x-large',
    above: 'xx-large',
  },
  large: {
    small: 'small',
    medium: 'medium',
    large: 'large',
    above: 'x-large',
  },
  medium: {
    small: 'x-small',
    medium: 'small',
    large: 'medium',
    above: 'large',
  },
}

export type PaddingProps = {
  padding?: boolean | PaddingValue | ResponsivePadding
  dynamic_padding?: boolean | DynamicPaddingValue
}
export function createPaddingClasses<T extends PaddingProps>(
  prefix: string,
  { padding, dynamic_padding }: T
): string {
  console.log('PADDING', padding)
  return [
    padding === true && `${prefix}--padding-${defaultPadding}`,
    typeof padding === 'string' && `${prefix}--padding-${padding}`,
    typeof padding === 'object' &&
      'small' in padding &&
      `${prefix}--padding-small-${padding.small}`,
    typeof padding === 'object' &&
      'medium' in padding &&
      `${prefix}--padding-medium-${padding.medium}`,
    typeof padding === 'object' &&
      'large' in padding &&
      `${prefix}--padding-large-${padding.large}`,
    dynamic_padding === true &&
      `${prefix}--padding-small-${dynamicPaddingMap[defaultDynamicPadding].small}`,
    dynamic_padding === true &&
      `${prefix}--padding-medium-${dynamicPaddingMap[defaultDynamicPadding].medium}`,
    dynamic_padding === true &&
      `${prefix}--padding-large-${dynamicPaddingMap[defaultDynamicPadding].large}`,
    typeof dynamic_padding === 'string' &&
      dynamic_padding in dynamicPaddingMap &&
      `${prefix}--padding-small-${dynamicPaddingMap[dynamic_padding].small}`,
    typeof dynamic_padding === 'string' &&
      dynamic_padding in dynamicPaddingMap &&
      `${prefix}--padding-medium-${dynamicPaddingMap[dynamic_padding].medium}`,
    typeof dynamic_padding === 'string' &&
      dynamic_padding in dynamicPaddingMap &&
      `${prefix}--padding-large-${dynamicPaddingMap[dynamic_padding].large}`,
  ]
    .filter(Boolean)
    .join(' ')
}
