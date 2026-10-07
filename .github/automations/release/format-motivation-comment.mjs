import { readFileSync, writeFileSync } from 'node:fs'
import { formatMotivationComment } from './release-utils.mjs'

const [contextPath, outputPath] = process.argv.slice(2)
const context = JSON.parse(readFileSync(contextPath, 'utf8'))
writeFileSync(outputPath, `${formatMotivationComment(context)}\n`)
