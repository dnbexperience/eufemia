import { reduceContext } from './extendPropsWithContext'

export function assignPropsWithContext<Props>(
  props: Props,
  ...contexts: Array<Record<string, unknown>>
) {
  props = Object.isFrozen(props) ? { ...props } : props
  const context = reduceContext(contexts)
  return Object.entries(context).reduce((acc, [key, value]) => {
    if (!(props && Object.prototype.hasOwnProperty.call(props, key))) {
      acc[key] = value
    }
    return acc
  }, props || {})
}
