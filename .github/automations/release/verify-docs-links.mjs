import { readFileSync } from 'node:fs'
import {
  validateAnnouncement,
  verifyAnnouncementDocsLinks,
} from './release-utils.mjs'

const [announcementPath, contextPath] = process.argv.slice(2)
const announcement = JSON.parse(readFileSync(announcementPath, 'utf8'))
const context = JSON.parse(readFileSync(contextPath, 'utf8'))

validateAnnouncement(announcement.body, context)
await verifyAnnouncementDocsLinks(announcement.body)
