export function extractMarkdownTables(md) {
  const tables = []
  const lines = md.split('\n')
  let inFence = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^(```+|~~~+)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) {
      continue
    }

    const next = lines[i + 1] || ''
    if (isTableSeparator(next) && /|/.test(line)) {
      const rows = []
      rows.push(splitTableRow(line))
      i += 1

      for (i += 1; i < lines.length; i++) {
        const rowLine = lines[i]
        if (!/|/.test(rowLine) || rowLine.trim() === '') {
          i -= 1
          break
        }
        if (/^(```+|~~~+)/.test(rowLine)) {
          i -= 1
          break
        }
        rows.push(splitTableRow(rowLine))
      }

      if (rows.length > 0) {
        tables.push(rows)
      }
    }
  }

  return tables
}

function isTableSeparator(line) {
  // Simplified pattern to prevent ReDoS - match table separator rows
  // Pattern: optional leading pipe, then one or more cells with dashes/colons, optional trailing pipe
  return /^\s*\|?\s*(:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(line)
}

function splitTableRow(line) {
  let text = line.trim()
  if (text.startsWith('|')) {
    text = text.slice(1)
  }
  if (text.endsWith('|')) {
    text = text.slice(0, -1)
  }

  const cells = []
  let current = ''
  let escaped = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (escaped) {
      current += ch === '|' ? '|' : `\\${ch}`
      escaped = false
      continue
    }
    if (ch === '\\') {
      escaped = true
      continue
    }
    if (ch === '|') {
      cells.push(current.trim())
      current = ''
      continue
    }
    current += ch
  }

  if (escaped) {
    current += '\\'
  }
  cells.push(current.trim())
  return cells.map((cell) => renderMarkdownInline(cell))
}

function renderMarkdownInline(input) {
  if (typeof input !== 'string') {
    return input
  }

  let out = input
  // Use non-greedy quantifiers to prevent ReDoS
  out = out.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, '<a href="$2">$1</a>')
  out = out.replace(/`([^`]+?)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/__([^_]+?)__/g, '<strong>$1</strong>')
  out = out.replace(/_([^_]+?)_/g, '<em>$1</em>')
  out = out.replace(/\*([^*]+?)\*/g, '<em>$1</em>')
  return out
}
