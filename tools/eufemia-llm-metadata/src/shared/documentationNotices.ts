import path from 'node:path'
import fs from 'node:fs'

const notice = JSON.parse(
  fs.readFileSync(
    new URL(
      '../../../../packages/dnb-design-system-portal/src/docs/web/extensions/ai/experimentalNotice.json',
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
  return route === 'web/extensions/ai.mdx' ||
    route.startsWith('web/extensions/ai/')
    ? '**Experimental:** ' + notice.text
    : ''
}
