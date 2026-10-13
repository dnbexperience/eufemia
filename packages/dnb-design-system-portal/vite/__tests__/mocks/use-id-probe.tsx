import { useId } from 'react'

// Records the id React generates for this position, so a test can compare
// the client id with the one in the server HTML
export default function UseIdProbe() {
  const id = useId()
  globalThis.__useIdProbe = id

  return <span className="use-id-probe" id={id} />
}

declare global {
  var __useIdProbe: string | undefined
}
