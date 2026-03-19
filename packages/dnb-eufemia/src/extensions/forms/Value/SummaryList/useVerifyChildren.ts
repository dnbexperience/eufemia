import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { warn } from '../../../../shared/helpers'

export function useVerifyChildren({
  children,
  message,
  messageInfo,
  ignoreTypes,
}: {
  ignoreTypes?: Array<string>
  messageInfo?: unknown
  children: React.ReactNode
  message: string
}) {
  const verifyCount = useRef(0)
  verifyCount.current = 0
  const verifyChild = useCallback(() => {
    verifyCount.current += 1
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const count = countChildren(children, ignoreTypes)
      if (count > 0 && count > verifyCount.current) {
        warn(message, messageInfo)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, message])

  return { verifyChild }
}

/**
 * Count the children of a React node,
 * without counting React.Fragment or primitive nodes.
 */
export const countChildren = (
  children: React.ReactNode,
  ignoreTypes?: Array<string>,
  count = 0
): number => {
  return Children.toArray(children).reduce((count: number, child) => {
    if ((child as React.ReactElement)?.type === Fragment) {
      return countChildren(
        ((child as React.ReactElement).props as Record<string, unknown>)
          ?.children as React.ReactNode,
        ignoreTypes,
        count
      )
    }

    return (
      count +
      (isValidElement(child) &&
      !ignoreTypes?.includes(
        (child?.type as unknown as Record<string, string>)?.['name']
      )
        ? 1
        : 0)
    )
  }, count)
}
