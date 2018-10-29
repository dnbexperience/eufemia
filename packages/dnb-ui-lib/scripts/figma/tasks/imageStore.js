/**
 * Node
 *
 */

import {
  getFigmaImages,
  safeFileToDisk,
  findNode
} from '../helpers/docHelpers'

export const FetchImages = async (
  figmaFile,
  figmaToken,
  figmaDoc,
  selectors
) => {
  let images = {},
    ids = []

  selectors.forEach(selector => {
    const { id } = findNode(figmaDoc.document, selector)
    ids.push({ id, selector })
  })

  await Promise.all(
    ids.map(async ({ id }) => {
      images = {
        ...images,
        ...(await getFigmaImages({ figmaFile, figmaToken, ids: [id] }))
      }
    })
  )

  Object.entries(images).forEach(([id, url]) => {
    safeFileToDisk({ file: `${id}.svg`, url })
  })

  return images
}
