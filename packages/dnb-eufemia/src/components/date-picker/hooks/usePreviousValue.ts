import { useEffect, useRef } from 'react'

// Move to different folder?
export default function usePreviousProps<T>(props: T) {
  const previousProps = useRef(props)

  useEffect(() => {
    previousProps.current = props
  }, [props])

  return previousProps.current
}
