// Renders a snapshot of analytics records. Data is fetched at build time by the
// snapshot workflow and served as a static file, so no API token lives here.

import { ensureSignedIn, signOut } from './auth.js'

const DATA_URL = './data/records.json'

/** Normalise the stored shape to a common view model. */
function normalise(record) {
  const label =
    record.name ?? record.path ?? record.type ?? record.id ?? '—'
  const when = record.createdAt ?? record.timestamp ?? ''
  const day = typeof when === 'string' ? when.slice(0, 10) : ''
  const env = record.env ?? ''

  return { label, day, env }
}

function toRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records
  }

  return []
}

function countBy(items, key) {
  const counts = new Map()

  for (const item of items) {
    const value = item[key]
    if (!value) {
      continue
    }

    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return counts
}

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) {
    node.className = className
  }
  if (text !== undefined) {
    node.textContent = text
  }

  return node
}

function renderKpis(rows) {
  const container = document.getElementById('kpis')
  container.replaceChildren()

  const days = new Set(rows.map((r) => r.day).filter(Boolean))
  const labels = new Set(rows.map((r) => r.label).filter(Boolean))

  const kpis = [
    { value: rows.length.toLocaleString(), label: 'Records' },
    { value: labels.size.toLocaleString(), label: 'Unique pages' },
    { value: days.size.toLocaleString(), label: 'Days with data' },
  ]

  for (const kpi of kpis) {
    const card = el('div', 'kpi')
    card.append(
      el('div', 'value', kpi.value),
      el('div', 'label', kpi.label)
    )
    container.append(card)
  }
}

function renderBars(targetId, counts, { sort = 'desc', limit } = {}) {
  const target = document.getElementById(targetId)
  target.replaceChildren()

  let entries = [...counts.entries()]
  entries.sort((a, b) =>
    sort === 'key' ? a[0].localeCompare(b[0]) : b[1] - a[1]
  )
  if (limit) {
    entries = entries.slice(0, limit)
  }

  const max = entries.reduce((m, [, count]) => Math.max(m, count), 0)

  for (const [name, count] of entries) {
    const row = el('div', 'row')

    const track = el('div', 'track')
    const fill = el('div', 'fill')
    fill.style.width = max > 0 ? `${(count / max) * 100}%` : '0'
    track.append(fill)

    row.append(
      el('div', 'name', name),
      track,
      el('div', 'count', count.toLocaleString())
    )
    target.append(row)
  }

  if (entries.length === 0) {
    target.append(el('p', 'meta', 'No data.'))
  }
}

function render(rows) {
  renderKpis(rows)
  renderBars('per-day', countBy(rows, 'day'), { sort: 'key' })
  renderBars('top-names', countBy(rows, 'label'), {
    sort: 'desc',
    limit: 15,
  })
}

function populateEnvFilter(rows, onChange) {
  const select = document.getElementById('env')
  const envs = [...new Set(rows.map((r) => r.env).filter(Boolean))].sort()

  for (const env of envs) {
    const option = el('option', undefined, env)
    option.value = env
    select.append(option)
  }

  select.addEventListener('change', () => onChange(select.value))
}

function renderUser(session) {
  if (!session) {
    return
  }

  const container = document.getElementById('user')
  const button = el('button', 'signout', 'Sign out')
  button.type = 'button'
  button.addEventListener('click', signOut)

  container.replaceChildren(el('span', 'user-name', session.name), button)
  container.hidden = false
}

async function main() {
  let session
  try {
    session = await ensureSignedIn()
  } catch (error) {
    const box = document.getElementById('error')
    box.textContent = `Sign-in failed: ${error.message}`
    box.hidden = false

    return
  }

  renderUser(session)

  let payload
  try {
    const response = await fetch(DATA_URL, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    payload = await response.json()
  } catch (error) {
    const box = document.getElementById('error')
    box.textContent = `Could not load data (${error.message}).`
    box.hidden = false

    return
  }

  const all = toRecords(payload).map(normalise)

  const generated = payload && payload.generatedAt
  if (generated) {
    document.getElementById('meta').textContent =
      `Snapshot generated ${new Date(generated).toLocaleString()}`
  }

  const apply = (env) =>
    render(env ? all.filter((r) => r.env === env) : all)

  populateEnvFilter(all, apply)
  apply('')
}

main()
