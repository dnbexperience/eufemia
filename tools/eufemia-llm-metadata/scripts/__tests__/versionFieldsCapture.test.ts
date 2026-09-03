import fs from 'fs'
import os from 'os'
import path from 'path'
import { extractTsDocs, mapToArray } from '../../src/convertHelpers.ts'

describe('version fields capture (extractTsDocs / addDocsFromExport)', () => {
  it('carries since/deprecatedIn/removedIn from *Docs.ts into entries and arrays', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'version-capture-'))
    fs.writeFileSync(
      path.join(dir, 'WidgetDocs.ts'),
      [
        'export const WidgetProperties = {',
        '  fresh: {',
        "    doc: 'A newer prop',",
        "    type: 'string',",
        "    status: 'optional',",
        "    since: '11.3.0',",
        '  },',
        '  legacy: {',
        "    doc: 'Old prop, use `fresh` instead',",
        "    type: 'string',",
        "    status: 'deprecated',",
        "    deprecatedIn: '11.4.0',",
        "    removedIn: '12.0.0',",
        '  },',
        '  plain: {',
        "    doc: 'No version info',",
        "    type: 'string',",
        "    status: 'optional',",
        '  },',
        '}',
      ].join('\n')
    )

    const docs = await extractTsDocs(dir)

    expect(docs.props.fresh.since).toBe('11.3.0')
    expect(docs.props.legacy.deprecatedIn).toBe('11.4.0')
    expect(docs.props.legacy.removedIn).toBe('12.0.0')
    // Absent fields are not fabricated.
    expect(docs.props.plain.since).toBeUndefined()

    const arr = mapToArray(docs.props)
    const fresh = arr.find((p) => p.name === 'fresh')
    expect(fresh?.since).toBe('11.3.0')

    fs.rmSync(dir, { recursive: true, force: true })
  })
})
