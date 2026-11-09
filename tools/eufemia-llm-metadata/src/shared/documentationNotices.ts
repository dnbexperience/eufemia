import path from 'node:path'
import fs from 'node:fs'

const notice = JSON.parse(
  fs.readFileSync(
    new URL(
      '../../../../packages/dnb-design-system-portal/src/docs/web/patterns-and-extensions/chat/experimentalNotice.json',
      import.meta.url
    ),
    'utf8'
  )
) as { text: string }

export function getDocumentationNotice(
  inputPath: string,
  docsRoot: string
) {
  const route = path
    .relative(docsRoot, inputPath)
    .split(path.sep)
    .join('/')
  return route === 'web/patterns-and-extensions/chat.mdx' ||
    route.startsWith('web/patterns-and-extensions/chat/')
    ? '**Experimental:** ' + notice.text
    : ''
}
