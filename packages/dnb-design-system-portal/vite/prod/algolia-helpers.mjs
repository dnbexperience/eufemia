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
    const result = await temporary.saveObjects(records).wait()
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
