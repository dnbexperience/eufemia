import { createAvailableCountriesTableExtension } from './availableCountriesTable.ts'
import { createCardProductsTableExtension } from './cardProductsTable.ts'
import { createColorTableExtension } from './colorTable.ts'
import { createListAllIconsExtension } from './listAllIcons.ts'
import { createListSummaryFromEdgesExtension } from './listSummaryFromEdges.ts'
import { createRadiusTokenTableExtension } from './radiusTokenTable.ts'
import { createTokenExampleExtension } from './tokenExample.ts'
import { createTokenSectionTableExtension } from './tokenSectionTable.ts'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'

export async function applySpecialMdxComponentRenderers(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  let output = content

  for (const renderer of createSpecialMdxExtensions(deps)) {
    output = await renderer.replace(output)
  }

  return output
}

function createSpecialMdxExtensions(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer[] {
  return [
    createTokenExampleExtension(),
    createTokenSectionTableExtension(deps),
    createRadiusTokenTableExtension(deps),
    createColorTableExtension(deps),
    createListSummaryFromEdgesExtension(deps),
    createListAllIconsExtension(deps),
    createAvailableCountriesTableExtension(deps),
    createCardProductsTableExtension(deps),
  ]
}
