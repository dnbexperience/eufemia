import { useEffect, useRef } from 'react'

export default function usePreviousProps<T>(props: T) {
  const previousProps = useRef(props)

  useEffect(() => {
    previousProps.current = props
  }, [props])

  return previousProps.current
}
