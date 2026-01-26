import fs from 'fs'
import path from 'path'

type RobotsRules = {
  allow?: string[]
  disallow?: string[]
}

export function isAllowed(pathname: string, rules: RobotsRules = {}) {
  const { allow = [], disallow = [] } = rules || {}
  return prefLen(allow, pathname) >= prefLen(disallow, pathname)
}

export async function loadRobots(baseDir: string | null = null) {
  if (!baseDir) {
    throw new Error('baseDir is required to load robots.txt')
  }
  const content = await fs.promises.readFile(
    path.join(baseDir, 'robots.txt'),
    'utf-8'
  )
  return parseRobots(content)
}

function parseRobots(content: string) {
  const out: Required<RobotsRules> = { allow: [], disallow: [] }
  const regex = /^(Allow|Disallow):\s*(\S+)/i

  String(content)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .forEach((line) => {
      if (!line || line.startsWith('#')) {
        return
      }
      const match = regex.exec(line)
      if (match) {
        out[match[1].toLowerCase() as 'allow' | 'disallow'].push(match[2])
      }
    })

  return out
}

function prefLen(arr: string[], s: string) {
  return arr.reduce(
    (m, p) => (p && s.startsWith(p) && p.length > m ? p.length : m),
    0
  )
}
