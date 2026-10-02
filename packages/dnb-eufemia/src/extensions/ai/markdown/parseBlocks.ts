export type TableAlign = 'left' | 'center' | 'right' | null

export type ListItem = {
  checked: boolean | null
  children: Array<Block>
}

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'code'; lang: string; value: string }
  | { type: 'blockquote'; children: Array<Block> }
  | {
      type: 'list'
      ordered: boolean
      start: number
      tight: boolean
      items: Array<ListItem>
    }
  | {
      type: 'table'
      align: Array<TableAlign>
      header: Array<string>
      rows: Array<Array<string>>
    }
  | { type: 'hr' }

export type BlockWithSource = Block & { source: string }

// Deeper nesting is rendered as text
const MAX_DEPTH = 32

const FENCE_RE = /^ {0,3}(`{3,}|~{3,})[ \t]*([^\s`]*)[^`]*$/
const HEADING_RE = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/
const HR_RE = /^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/
const BLOCKQUOTE_RE = /^ {0,3}> ?/
const LIST_RE = /^( {0,3})([-*+]|\d{1,9}[.)])(?:([ \t]+)(.*))?$/
const SETEXT_RE = /^ {0,3}(=+|-+)[ \t]*$/
const TABLE_DELIMITER_RE =
  /^ {0,3}\|?[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)*\|?[ \t]*$/
const TASK_RE = /^\[([ xX])\][ \t]+/

/**
 * Splits markdown into top-level blocks.
 * Each block keeps its `source`, so finished blocks can be memoized while streaming.
 */
export function parseBlocks(markdown: string): Array<BlockWithSource> {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n')
  return parseLines(lines, true) as Array<BlockWithSource>
}

function parseLines(
  lines: Array<string>,
  withSource = false,
  depth = 0
): Array<Block> {
  if (depth > MAX_DEPTH) {
    return [{ type: 'paragraph', text: lines.join('\n').trim() }]
  }

  const blocks: Array<Block> = []
  let i = 0

  const push = (block: Block, from: number) => {
    if (withSource) {
      ;(block as BlockWithSource).source = lines.slice(from, i).join('\n')
    }
    blocks.push(block)
  }

  while (i < lines.length) {
    const line = lines[i]
    const from = i

    if (isBlank(line)) {
      i++
      continue
    }

    const fence = FENCE_RE.exec(line)
    if (fence) {
      const [, marker, lang] = fence
      const indent = line.search(/\S/)
      const value: Array<string> = []
      i++

      // An unclosed fence runs to the end, which also covers streaming
      while (i < lines.length && !isClosingFence(lines[i], marker)) {
        value.push(lines[i].replace(new RegExp(`^ {0,${indent}}`), ''))
        i++
      }
      i++

      push({ type: 'code', lang, value: value.join('\n') }, from)
      continue
    }

    const heading = HEADING_RE.exec(line)
    if (heading) {
      i++
      push(
        {
          type: 'heading',
          level: heading[1].length as 1,
          text: heading[2] || '',
        },
        from
      )
      continue
    }

    if (HR_RE.test(line)) {
      i++
      push({ type: 'hr' }, from)
      continue
    }

    if (BLOCKQUOTE_RE.test(line)) {
      const inner: Array<string> = []
      while (i < lines.length && BLOCKQUOTE_RE.test(lines[i])) {
        inner.push(lines[i].replace(BLOCKQUOTE_RE, ''))
        i++
      }
      push(
        {
          type: 'blockquote',
          children: parseLines(inner, false, depth + 1),
        },
        from
      )
      continue
    }

    if (LIST_RE.test(line)) {
      i = parseList(lines, i, depth, (block) => push(block, from))
      continue
    }

    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      TABLE_DELIMITER_RE.test(lines[i + 1])
    ) {
      const header = splitRow(line)
      const align = splitRow(lines[i + 1]).map(toAlign)

      if (header.length === align.length) {
        const rows: Array<Array<string>> = []
        i += 2
        while (
          i < lines.length &&
          !isBlank(lines[i]) &&
          lines[i].includes('|')
        ) {
          const cells = splitRow(lines[i])
          rows.push(header.map((_, index) => cells[index] ?? ''))
          i++
        }
        push({ type: 'table', align, header, rows }, from)
        continue
      }
    }

    const text: Array<string> = [line]
    i++
    while (i < lines.length && !isBlank(lines[i])) {
      const next = lines[i]

      const setext = SETEXT_RE.exec(next)
      if (setext) {
        i++
        push(
          {
            type: 'heading',
            level: setext[1][0] === '=' ? 1 : 2,
            text: text.join('\n').trim(),
          },
          from
        )
        text.length = 0
        break
      }

      if (interruptsParagraph(next)) {
        break
      }

      text.push(next)
      i++
    }

    if (text.length > 0) {
      push({ type: 'paragraph', text: text.join('\n').trim() }, from)
    }
  }

  return blocks
}

function parseList(
  lines: Array<string>,
  start: number,
  depth: number,
  push: (block: Block) => void
): number {
  const first = LIST_RE.exec(lines[start])
  const ordered = /\d/.test(first[2])
  const delimiter = first[2].slice(-1)
  const items: Array<{ lines: Array<string> }> = []
  let tight = true
  let i = start

  while (i < lines.length) {
    const match = LIST_RE.exec(lines[i])
    if (
      !match ||
      /\d/.test(match[2]) !== ordered ||
      match[2].slice(-1) !== delimiter ||
      HR_RE.test(lines[i])
    ) {
      break
    }

    const [, indent, marker, spacing = ' ', content = ''] = match
    const contentIndent =
      indent.length + marker.length + Math.min(spacing.length, 4)
    const itemLines = [content]
    i++

    while (i < lines.length) {
      const next = lines[i]

      if (isBlank(next)) {
        const following = lines.slice(i + 1).find((l) => !isBlank(l))
        if (following && indentOf(following) >= contentIndent) {
          itemLines.push('')
          i++
          continue
        }
        break
      }

      if (indentOf(next) >= contentIndent) {
        itemLines.push(next.slice(contentIndent))
        i++
        continue
      }

      // Lazy paragraph continuation
      if (
        !interruptsParagraph(next) &&
        !LIST_RE.test(next) &&
        !isBlank(itemLines[itemLines.length - 1])
      ) {
        itemLines.push(next)
        i++
        continue
      }

      break
    }

    if (itemLines.includes('')) {
      tight = false
    }
    items.push({ lines: itemLines })

    // A blank line between items makes the list loose
    if (i < lines.length && isBlank(lines[i])) {
      const following = lines.slice(i).findIndex((l) => !isBlank(l))
      const nextLine = following > -1 ? lines[i + following] : null
      const nextMatch = nextLine && LIST_RE.exec(nextLine)
      if (
        nextMatch &&
        /\d/.test(nextMatch[2]) === ordered &&
        nextMatch[2].slice(-1) === delimiter
      ) {
        tight = false
        i += following
      }
    }
  }

  push({
    type: 'list',
    ordered,
    start: ordered ? parseInt(first[2], 10) : 1,
    tight,
    items: items.map(({ lines }) => {
      const task = TASK_RE.exec(lines[0])
      if (task) {
        lines = [lines[0].slice(task[0].length), ...lines.slice(1)]
      }
      return {
        checked: task ? task[1] !== ' ' : null,
        children: parseLines(lines, false, depth + 1),
      }
    }),
  })

  return i
}

function interruptsParagraph(line: string) {
  const list = LIST_RE.exec(line)
  return (
    FENCE_RE.test(line) ||
    HEADING_RE.test(line) ||
    HR_RE.test(line) ||
    BLOCKQUOTE_RE.test(line) ||
    // Only non-empty lists that start at 1 may interrupt a paragraph
    (list && Boolean(list[4]) && /^(?:[-*+]|1[.)])$/.test(list[2]))
  )
}

function isClosingFence(line: string, marker: string) {
  const match = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(line)
  return Boolean(
    match && match[1][0] === marker[0] && match[1].length >= marker.length
  )
}

function splitRow(line: string): Array<string> {
  const cells: Array<string> = []
  let cell = ''
  let inCode = false
  const row = line.trim().replace(/^\|/, '')

  for (let i = 0; i < row.length; i++) {
    const char = row[i]
    if (char === '\\' && row[i + 1] === '|') {
      cell += '|'
      i++
    } else if (char === '`') {
      inCode = !inCode
      cell += char
    } else if (char === '|' && !inCode) {
      cells.push(cell.trim())
      cell = ''
    } else {
      cell += char
    }
  }

  if (cell.trim() !== '' || !row.endsWith('|')) {
    cells.push(cell.trim())
  }

  return cells
}

function toAlign(cell: string): TableAlign {
  const left = cell.startsWith(':')
  const right = cell.endsWith(':')
  if (left && right) {
    return 'center'
  }
  if (right) {
    return 'right'
  }
  if (left) {
    return 'left'
  }
  return null
}

function indentOf(line: string) {
  return line.length - line.replace(/^[ \t]+/, '').length
}

function isBlank(line: string) {
  return line.trim() === ''
}
