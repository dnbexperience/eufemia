import { randomUUID } from 'node:crypto'

/**
 * Algolia record helpers for the portal search index.
 *
 * Kept as plain JS so Node can import it directly without a TypeScript
 * build step.
 */

export const excludedSlugPartials = [
  'web/releases-and-upgrades/versions/',
  'EUFEMIA_CHANGELOG',
]

export function shouldIncludeInAlgolia({
  slug,
  draft = undefined,
  route = undefined,
}) {
  return (
    !slug.includes('not_in_use') &&
    !slug.split('/').includes('visual-tests') &&
    !excludedSlugPartials.some((partial) => slug.includes(partial)) &&
    draft !== true &&
    route !== false
  )
}

export async function replaceAlgoliaRecords(
  client,
  indexName,
  records,
  settings
) {
  const temporaryName = `${indexName}_tmp_${randomUUID()}`
  const temporary = client.initIndex(temporaryName)
  try {
    await client
      .copyIndex(indexName, temporaryName, {
        scope: ['settings', 'synonyms', 'rules'],
      })
      .wait()
    await temporary.setSettings(settings).wait()
    // Algolia strips HTML-like text from snippets, including component names.
    const result = await temporary
      .saveObjects(
        records.map((record) => ({
          ...record,
          content: record.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;'),
        }))
      )
      .wait()
    await client.moveIndex(temporaryName, indexName).wait()
    return result
  } catch (error) {
    await temporary
      .delete()
      .wait()
      .catch(() => undefined)
    throw error
  }
}
