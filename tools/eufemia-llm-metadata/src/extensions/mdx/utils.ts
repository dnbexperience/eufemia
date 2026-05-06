export function parseSimpleJsxStringAttributes(source: string) {
  const attrs: Record<string, string> = {}
  const regex = /([A-Za-z0-9_-]+)\s*=\s*(["'])(.*?)\2/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(source))) {
    const [, name, , value] = match

    if (name) {
      attrs[name] = value || ''
    }
  }

  return attrs
}

export function escapeMarkdownTableCell(value: string) {
  return value.replace(/[\\|]/g, '\\$&').trim()
}

export function toRgbString(hex: string) {
  try {
    let hexOnly = hex.replace(/^#/, '')

    if (hexOnly.length === 3) {
      hexOnly = hexOnly
        .split('')
        .map((char) => char + char)
        .join('')
    }

    if (hexOnly.length !== 6) {
      return 'N/A'
    }

    const red = parseInt(hexOnly.slice(0, 2), 16)
    const green = parseInt(hexOnly.slice(2, 4), 16)
    const blue = parseInt(hexOnly.slice(4, 6), 16)

    return `${red} ${green} ${blue}`
  } catch {
    return 'N/A'
  }
}
