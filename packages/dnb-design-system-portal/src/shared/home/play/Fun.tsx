import { homePlayCommands } from './homePlay'
import './fun.scss'

export default function Fun() {
  return (
    <section className="dnb-home-fun" aria-label="Hidden commands">
      <ul>
        {homePlayCommands.map((command) => (
          <li key={command}>
            <code>{command}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
