const fs = require('fs')
const path = require('path')

function isAllowed(pathname, rules = {}) {
  const { allow = [], disallow = [] } = rules || {}
  return prefLen(allow, pathname) >= prefLen(disallow, pathname)
}

async function loadRobots(baseDir = null) {
  const content = await fs.promises.readFile(
    path.join(baseDir, 'robots.txt'),
    'utf-8'
  )
  return parseRobots(content)
}

function parseRobots(content) {
  const out = { allow: [], disallow: [] }
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
        out[match[1].toLowerCase()].push(match[2])
      }
    })

  return out
}

function prefLen(arr, s) {
  return arr.reduce(
    (m, p) => (p && s.startsWith(p) && p.length > m ? p.length : m),
    0
  )
}

module.exports = { isAllowed, loadRobots }
