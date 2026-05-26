import { useEffect, useState } from 'react'
import { branchBanner } from './BranchBanner.module.scss'

export default function BranchBanner() {
  const [branch, setBranch] = useState('')

  useEffect(() => {
    if (globalThis.IS_TEST) {
      return // stop here
    }

    fetch('/__git-branch')
      .then((res) => {
        const isPlainText = res.headers
          .get('content-type')
          ?.startsWith('text/plain')
        return res.ok && isPlainText ? res.text() : ''
      })
      .then(setBranch)
      .catch(() => {
        // ignore
      })

    if (import.meta.hot) {
      import.meta.hot.on('git-branch:update', (data) => {
        setBranch(data.branch)
      })
    }
  }, [])

  if (!branch) {
    return null
  }

  return <div className={branchBanner}>{branch}</div>
}
