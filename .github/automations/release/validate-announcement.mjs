import { readFileSync, writeFileSync } from 'node:fs'
import {
  announcementMarker,
  validateAnnouncement,
} from './release-utils.mjs'

const [announcementPath, contextPath, outputPath] = process.argv.slice(2)
const announcement = JSON.parse(readFileSync(announcementPath, 'utf8'))
const context = JSON.parse(readFileSync(contextPath, 'utf8'))
validateAnnouncement(announcement.body, context)
writeFileSync(
  outputPath,
  [
    announcementMarker(context.version),
    '## Slack-ready release announcement',
    '',
    'Copy the text below into Slack:',
    '',
    '```text',
    announcement.body.trim(),
    '```',
    '',
  ].join('\n')
)
