import { useRef } from 'react'

/**
 *
 * Shallow object comparison to easily find out what props of an object was changed since the last render
 */
export default function useWasChanged<Subject extends object>(
  subject: Subject,
  title?: string,
  debug?: boolean
): void {
  const previous = useRef<Subject>(subject)
  if (!previous.current && !subject) {
    console.log(
      'useWasChanged() - No subject was provided, while previous render had a subject. Was the whole object deleted?'
    )
  }

  const { changed, unchanged } = [
    ...Object.entries(subject),
    ...Object.entries(previous.current ?? {}).filter(
      ([key]) => subject[key] === undefined
    ),
  ].reduce(
    ({ changed, unchanged }, [key, value]) => {
      if (previous.current?.[key] !== subject?.[key]) {
        return {
          changed: changed.concat(key),
          unchanged,
        }
      } else {
        return {
          changed,
          unchanged: unchanged.concat(key),
        }
      }
    },
    { changed: [], unchanged: [] }
  )

  if (changed.length === 0 && !debug) {
    return
  }

  console.groupCollapsed(
    `${title ?? 'object'} -- ${changed.length} members was changed`
  )

  Object.values(changed).map((key) => {
    if (debug) {
      console.groupCollapsed(`CHANGED: ${key}`)
      console.log('PREVIOUS: ', previous.current?.[key])
      console.log('CURRENT: ', subject?.[key])
      console.groupEnd()
    } else {
      console.log(`CHANGED: ${key}`)
    }
  })
  Object.values(unchanged).map((key) => {
    console.log(`UNCHANGED: ${key}`)
  })

  previous.current = subject

  console.groupEnd()
}
