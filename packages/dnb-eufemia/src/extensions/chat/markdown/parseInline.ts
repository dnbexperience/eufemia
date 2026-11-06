export type Inline =
  | { type: 'text'; value: string }
  | { type: 'strong' | 'em' | 'del'; children: Array<Inline> }
  | { type: 'code'; value: string }
  | { type: 'link'; href: string; title?: string; children: Array<Inline> }
  | { type: 'image'; src: string; alt: string; title?: string }
  | { type: 'br' }

export type ParseInlineOptions = {
  /**
   * Treat the text as still streaming: unclosed emphasis and code is closed at the end,
   * and unfinished links and images are hidden until they are complete.
   */
  incomplete?: boolean
}

type Node = {
  value: Inline
  prev: Node | null
  next: Node | null
}

type Delimiter = {
  node: Node
  char: string
  length: number
  originalLength: number
  canOpen: boolean
  canClose: boolean
  prev: Delimiter | null
  next: Delimiter | null
}

type Bracket = {
  node: Node
  image: boolean
  active: boolean
  delimiterBottom: Delimiter | null
  prev: Bracket | null
}

// Same limit as cmark, keeps link parsing linear
const MAX_PAREN_DEPTH = 32
const ESCAPABLE_RE = /[!-/:-@[-`{-~]/
const PUNCTUATION_RE = new RegExp('[\\p{P}\\p{S}]', 'u')
const WORD_CHAR_RE = new RegExp('[\\p{L}\\p{N}]', 'u')
const WHITESPACE_RE = /\s/
const SPECIAL_RE = /[\\`*_~![\]<\nhw]/
const AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.-]{1,31}:[^\s<>]*)>/
const EMAIL_AUTOLINK_RE = /^<([^\s<>@]+@[^\s<>@]+\.[^\s<>@]+)>/
const BARE_URL_RE = /^(?:https?:\/\/|www\.)[^\s<[\]]*/

export function parseInline(
  text: string,
  { incomplete = false }: ParseInlineOptions = {}
): Array<Inline> {
  const head: Node = {
    value: { type: 'text', value: '' },
    prev: null,
    next: null,
  }
  let tail = head
  let delimiters: Delimiter | null = null
  let brackets: Bracket | null = null
  let pos = 0

  const append = (value: Inline): Node => {
    const node: Node = { value, prev: tail, next: null }
    tail.next = node
    tail = node
    return node
  }

  // Nodes holding a delimiter or bracket must not absorb following text
  const markers = new WeakSet<Node>()

  const appendText = (value: string) => {
    if (
      tail !== head &&
      tail.value.type === 'text' &&
      !markers.has(tail)
    ) {
      tail.value.value += value
    } else {
      append({ type: 'text', value })
    }
  }

  const removeDelimiter = (d: Delimiter) => {
    if (d.prev) {
      d.prev.next = d.next
    }
    if (d.next) {
      d.next.prev = d.prev
    } else {
      delimiters = d.prev
    }
  }

  const removeNode = (node: Node) => {
    node.prev.next = node.next
    if (node.next) {
      node.next.prev = node.prev
    } else {
      tail = node.prev
    }
  }

  // Replaces the nodes between `from` and `to` (exclusive) with a single node
  const wrap = (from: Node, to: Node | null, value: Inline) => {
    const children: Array<Inline> = []
    for (let n = from.next; n && n !== to; n = n.next) {
      children.push(n.value)
    }
    ;(value as { children: Array<Inline> }).children = mergeText(children)

    const node: Node = { value, prev: from, next: to }
    from.next = node
    if (to) {
      to.prev = node
    } else {
      tail = node
    }
    return node
  }

  const processEmphasis = (bottom: Delimiter | null) => {
    const openersBottom: Record<string, Delimiter | null> = {}
    let closer = bottom ? bottom.next : findFirst()

    while (closer) {
      if (!closer.canClose) {
        closer = closer.next
        continue
      }

      const key = `${closer.char}${closer.canOpen}${closer.originalLength % 3}`
      const limit = key in openersBottom ? openersBottom[key] : bottom
      let opener = closer.prev
      while (opener && opener !== bottom && opener !== limit) {
        if (isMatch(opener, closer)) {
          break
        }
        opener = opener.prev
      }

      if (opener && opener !== bottom && opener !== limit) {
        const use =
          closer.char === '~'
            ? closer.length
            : closer.length >= 2 && opener.length >= 2
              ? 2
              : 1
        const type =
          closer.char === '~' ? 'del' : use === 2 ? 'strong' : 'em'

        opener.length -= use
        closer.length -= use
        ;(opener.node.value as { value: string }).value =
          opener.char.repeat(opener.length)
        ;(closer.node.value as { value: string }).value =
          closer.char.repeat(closer.length)

        wrap(opener.node, closer.node, { type, children: [] })

        // Delimiters between opener and closer are consumed as text
        opener.next = closer
        closer.prev = opener

        if (opener.length === 0) {
          removeNode(opener.node)
          removeDelimiter(opener)
        }
        if (closer.length === 0) {
          const next = closer.next
          removeNode(closer.node)
          removeDelimiter(closer)
          closer = next
        }
      } else {
        openersBottom[key] = closer.prev
        const next = closer.next
        if (!closer.canOpen) {
          removeDelimiter(closer)
        }
        closer = next
      }
    }

    if (incomplete) {
      closeOpenDelimiters(bottom)
    }

    // Unmatched delimiters stay as plain text
    delimiters = bottom
    if (bottom) {
      bottom.next = null
    }
  }

  const findFirst = () => {
    let d = delimiters
    while (d && d.prev) {
      d = d.prev
    }
    return d
  }

  // Closes unmatched openers at the end of streamed text
  const closeOpenDelimiters = (bottom: Delimiter | null) => {
    for (let d = delimiters; d && d !== bottom; d = d.prev) {
      if (!d.canOpen || !d.node.next) {
        continue
      }
      const type = d.char === '~' ? 'del' : d.length >= 2 ? 'strong' : 'em'
      d.length -= d.char === '~' ? d.length : Math.min(d.length, 2)
      ;(d.node.value as { value: string }).value = d.char.repeat(d.length)
      wrap(d.node, null, { type, children: [] })
    }
  }

  while (pos < text.length) {
    const char = text[pos]

    if (char === '\\') {
      const next = text[pos + 1]
      if (next === '\n') {
        append({ type: 'br' })
        pos += 2
      } else if (next && ESCAPABLE_RE.test(next)) {
        appendText(next)
        pos += 2
      } else {
        appendText(char)
        pos++
      }
      continue
    }

    if (char === '`') {
      const run = /^`+/.exec(text.slice(pos))[0]
      const closeIndex = findClosingBackticks(
        text,
        pos + run.length,
        run.length
      )

      if (closeIndex > -1) {
        append({
          type: 'code',
          value: normalizeCode(text.slice(pos + run.length, closeIndex)),
        })
        pos = closeIndex + run.length
      } else if (incomplete) {
        append({
          type: 'code',
          value: normalizeCode(text.slice(pos + run.length)),
        })
        pos = text.length
      } else {
        appendText(run)
        pos += run.length
      }
      continue
    }

    if (char === '*' || char === '_' || char === '~') {
      const run = new RegExp(`^\\${char}+`).exec(text.slice(pos))[0]
      const before = pos === 0 ? ' ' : text[pos - 1]
      const after = text[pos + run.length] ?? ' '
      const left =
        !isWhitespace(after) &&
        (!isPunctuation(after) ||
          isWhitespace(before) ||
          isPunctuation(before))
      const right =
        !isWhitespace(before) &&
        (!isPunctuation(before) ||
          isWhitespace(after) ||
          isPunctuation(after))

      let canOpen = left
      let canClose = right
      if (char === '_') {
        canOpen = left && (!right || isPunctuation(before))
        canClose = right && (!left || isPunctuation(after))
      }
      if (char === '~' && run.length > 2) {
        canOpen = canClose = false
      }

      const node = append({ type: 'text', value: run })
      markers.add(node)
      pos += run.length

      // Hide a trailing marker that is still being typed
      if (incomplete && pos === text.length && !canClose) {
        removeNode(node)
        continue
      }

      if (canOpen || canClose) {
        const d: Delimiter = {
          node,
          char,
          length: run.length,
          originalLength: run.length,
          canOpen,
          canClose,
          prev: delimiters,
          next: null,
        }
        if (delimiters) {
          delimiters.next = d
        }
        delimiters = d
      }
      continue
    }

    if (char === '[' || (char === '!' && text[pos + 1] === '[')) {
      const image = char === '!'
      const node = append({ type: 'text', value: image ? '![' : '[' })
      markers.add(node)
      brackets = {
        node,
        image,
        active: true,
        delimiterBottom: delimiters,
        prev: brackets,
      }
      pos += image ? 2 : 1
      continue
    }

    if (char === ']') {
      pos++
      const opener = brackets
      if (!opener) {
        appendText(']')
        continue
      }
      brackets = opener.prev

      if (!opener.active) {
        appendText(']')
        continue
      }

      const destination = parseDestination(text, pos)

      if (destination === 'incomplete' && incomplete) {
        // Show the label without a link until the URL is complete
        processEmphasis(opener.delimiterBottom)
        if (opener.image) {
          removeFrom(opener.node)
        } else {
          removeNode(opener.node)
        }
        pos = text.length
        continue
      }

      if (destination && destination !== 'incomplete') {
        processEmphasis(opener.delimiterBottom)
        const node = wrap(opener.node, null, {
          type: 'link',
          href: destination.href,
          children: [],
        })
        removeNode(opener.node)
        const children = unwrapLinks(
          (node.value as { children: Array<Inline> }).children
        )
        ;(node.value as { children: Array<Inline> }).children = children

        if (opener.image) {
          node.value = {
            type: 'image',
            src: destination.href,
            alt: toPlainText(children),
            title: destination.title,
          }
        } else {
          if (destination.title) {
            ;(node.value as { title?: string }).title = destination.title
          }
          // Links may not contain other links
          for (let b = brackets; b; b = b.prev) {
            if (!b.image) {
              b.active = false
            }
          }
        }

        pos = destination.end
        continue
      }

      appendText(']')
      continue
    }

    if (char === '<') {
      const rest = text.slice(pos)
      const auto = AUTOLINK_RE.exec(rest)
      const email = !auto && EMAIL_AUTOLINK_RE.exec(rest)
      if (auto || email) {
        const value = (auto || email)[1]
        append({
          type: 'link',
          href: email ? `mailto:${value}` : value,
          children: [{ type: 'text', value }],
        })
        pos += (auto || email)[0].length
        continue
      }
      appendText(char)
      pos++
      continue
    }

    if (
      (char === 'h' || char === 'w') &&
      !WORD_CHAR_RE.test(text[pos - 1] ?? '')
    ) {
      const match = BARE_URL_RE.exec(text.slice(pos))
      const url = match && trimUrl(match[0])
      if (url && url.length > (url.startsWith('www.') ? 4 : 8)) {
        append({
          type: 'link',
          href: url.startsWith('www.') ? `http://${url}` : url,
          children: [{ type: 'text', value: url }],
        })
        pos += url.length
        continue
      }
      appendText(char)
      pos++
      continue
    }

    if (char === '\n') {
      if (tail.value.type === 'text' && / {2,}$/.test(tail.value.value)) {
        tail.value.value = tail.value.value.replace(/ +$/, '')
        append({ type: 'br' })
      } else {
        if (tail.value.type === 'text') {
          tail.value.value = tail.value.value.replace(/ +$/, '')
        }
        appendText('\n')
      }
      pos++
      while (text[pos] === ' ') {
        pos++
      }
      continue
    }

    const nextSpecial = text.slice(pos + 1).search(SPECIAL_RE)
    const end = nextSpecial === -1 ? text.length : pos + 1 + nextSpecial
    appendText(text.slice(pos, end))
    pos = end
  }

  if (incomplete) {
    for (let b = brackets; b; b = b.prev) {
      if (b.image) {
        removeFrom(b.node)
      } else {
        removeNode(b.node)
      }
    }
  }

  processEmphasis(null)

  const result: Array<Inline> = []
  for (let n = head.next; n; n = n.next) {
    result.push(n.value)
  }
  return mergeText(result)

  function removeFrom(node: Node) {
    node.prev.next = null
    tail = node.prev
    for (let d = delimiters; d; d = d.prev) {
      if (!isAttached(d.node)) {
        removeDelimiter(d)
      }
    }
  }

  function isAttached(node: Node) {
    for (let n = head.next; n; n = n.next) {
      if (n === node) {
        return true
      }
    }
    return false
  }
}

function isMatch(opener: Delimiter, closer: Delimiter) {
  if (opener.char !== closer.char || !opener.canOpen) {
    return false
  }
  if (closer.char === '~') {
    return opener.length === closer.length
  }
  const oddMatch =
    (opener.canClose || closer.canOpen) &&
    (opener.originalLength + closer.originalLength) % 3 === 0 &&
    !(opener.originalLength % 3 === 0 && closer.originalLength % 3 === 0)
  return !oddMatch
}

function parseDestination(
  text: string,
  pos: number
): { href: string; title?: string; end: number } | 'incomplete' | null {
  if (text[pos] !== '(') {
    return null
  }

  let i = pos + 1
  const skipSpace = () => {
    while (i < text.length && /[ \t\n]/.test(text[i])) {
      i++
    }
  }
  skipSpace()

  let href = ''
  if (text[i] === '<') {
    const close = text.indexOf('>', i)
    if (close === -1) {
      return 'incomplete'
    }
    href = text.slice(i + 1, close)
    i = close + 1
  } else {
    let depth = 0
    while (i < text.length && !/\s/.test(text[i])) {
      const char = text[i]
      if (char === '\\' && ESCAPABLE_RE.test(text[i + 1] ?? '')) {
        href += text[i + 1]
        i += 2
        continue
      }
      if (char === '(') {
        depth++
        if (depth > MAX_PAREN_DEPTH) {
          return null
        }
      } else if (char === ')') {
        if (depth === 0) {
          break
        }
        depth--
      }
      href += char
      i++
    }
  }

  skipSpace()

  let title: string | undefined
  const quote = text[i]
  if (quote === '"' || quote === "'" || quote === '(') {
    const closeChar = quote === '(' ? ')' : quote
    const close = text.indexOf(closeChar, i + 1)
    if (close === -1) {
      return 'incomplete'
    }
    title = text.slice(i + 1, close)
    i = close + 1
    skipSpace()
  }

  if (i >= text.length) {
    return 'incomplete'
  }
  if (text[i] !== ')') {
    return null
  }

  return { href, title, end: i + 1 }
}

function findClosingBackticks(text: string, from: number, length: number) {
  const re = /`+/g
  re.lastIndex = from
  let match: RegExpExecArray | null
  while ((match = re.exec(text))) {
    if (match[0].length === length) {
      return match.index
    }
  }
  return -1
}

function normalizeCode(value: string) {
  const code = value.replace(/\n/g, ' ')
  if (/^ .*[^ ].* $/.test(code)) {
    return code.slice(1, -1)
  }
  return code
}

function trimUrl(url: string) {
  let result = url.replace(/[?!.,:*_~'"]+$/, '')
  while (
    result.endsWith(')') &&
    (result.match(/\(/g) || []).length < (result.match(/\)/g) || []).length
  ) {
    result = result.slice(0, -1)
  }
  return result
}

function unwrapLinks(nodes: Array<Inline>): Array<Inline> {
  return mergeText(
    nodes.flatMap((node) => {
      if (node.type === 'link') {
        return unwrapLinks(node.children)
      }
      if ('children' in node) {
        return [{ ...node, children: unwrapLinks(node.children) }]
      }
      return [node]
    })
  )
}

function toPlainText(nodes: Array<Inline>): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
        case 'code':
          return node.value
        case 'image':
          return node.alt
        case 'br':
          return ' '
        default:
          return toPlainText(node.children)
      }
    })
    .join('')
}

function mergeText(nodes: Array<Inline>): Array<Inline> {
  const result: Array<Inline> = []
  for (const node of nodes) {
    if (node.type === 'text' && node.value === '') {
      continue
    }
    const last = result[result.length - 1]
    if (node.type === 'text' && last?.type === 'text') {
      result[result.length - 1] = {
        type: 'text',
        value: last.value + node.value,
      }
    } else {
      result.push(node)
    }
  }
  return result
}

function isWhitespace(char: string) {
  return WHITESPACE_RE.test(char)
}

function isPunctuation(char: string) {
  return PUNCTUATION_RE.test(char)
}
