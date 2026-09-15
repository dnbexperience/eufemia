import { lstatSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const [contextPath, guardrailsPath] = process.argv.slice(2)
const contextRoot = resolve(contextPath)
const guardrails = JSON.parse(readFileSync(guardrailsPath, 'utf8'))
const { allowedExtensions, maxBytes, maxFiles } = guardrails.context
const files = []
let totalBytes = 0

const visit = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name)
    const relativePath = relative(contextRoot, absolutePath)

    if (
      entry.isSymbolicLink() ||
      lstatSync(absolutePath).isSymbolicLink()
    ) {
      throw new Error(`Context contains a symbolic link: ${relativePath}`)
    }

    if (entry.isDirectory()) {
      visit(absolutePath)
      continue
    }

    if (!entry.isFile()) {
      throw new Error(
        `Context contains an unsupported entry: ${relativePath}`
      )
    }

    if (!allowedExtensions.includes(extname(entry.name).toLowerCase())) {
      throw new Error(
        `Context contains an unsupported file: ${relativePath}`
      )
    }

    const size = lstatSync(absolutePath).size
    totalBytes += size
    files.push(relativePath)
  }
}

visit(contextRoot)

if (files.length > maxFiles) {
  throw new Error(`Context contains more than ${maxFiles} files`)
}

if (totalBytes > maxBytes) {
  throw new Error(`Context exceeds ${maxBytes} bytes`)
}

console.log(
  `Validated ${files.length} context files (${totalBytes} bytes)`
)
