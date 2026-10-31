import { useEffect, useState } from 'react'
import HeightAnimation from '@dnb/eufemia/src/components/height-animation'
import { homePlayCommands } from './homePlay'
import './fun.scss'

export default function Fun() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // HeightAnimation skips state changes during its first 100ms.
    const timer = setTimeout(() => setOpen(true), 150)
    return () => clearTimeout(timer)
  }, [])
  return (
    <HeightAnimation open={open}>
      <section className="dnb-home-fun" aria-label="Hidden commands">
        <ul>
          {homePlayCommands.map((command) => (
            <li key={command}>
              <code>{command}</code>
            </li>
          ))}
        </ul>
      </section>
    </HeightAnimation>
  )
}
