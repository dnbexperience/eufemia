/**
 * The `edges` each `List*` component passes to `ListSummaryFromEdges`.
 *
 * Page selection is kept here, apart from the components, so it can run
 * outside the app: the markdown generator for the LLM docs imports these
 * functions and calls them, instead of re-deriving the selection from the
 * component source. One definition of what each list contains, rendered two
 * ways.
 *
 * The pages are passed in rather than imported, because `regularMdxNodes`
 * comes from a Vite virtual module that only exists while the app is running.
 * Keep the selection here, and keep the rendering in the component.
 */

import {
  globPath,
  type MdxNode,
} from '../../../vite/client/plugins/portal-pages.shared.ts'
import { excludedSlugs } from './componentCategories'

/** The pages listed by `ListComponents`. */
export function getComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/components/**/*') &&
      !globPath(node, 'uilib/components/fragments/**') &&
      !excludedSlugs.has(node.fields.slug) &&
      node.frontmatter.hideInMenu !== true
  )
}

/** The pages listed by `ListElements`. */
export function getElements(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/elements/*') &&
      node.frontmatter.hideInMenu !== true
  )
}

/** The pages listed by `ListExtensions`. */
export function getExtensions(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/*') &&
      node.frontmatter.hideInMenu !== true
  )
}

/** The pages listed by `ListFragments`. */
export function getFragments(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/components/fragments/*') &&
      node.frontmatter.hideInMenu !== true
  )
}

/** The pages listed by `ListAllBlocks`. */
export function getAllBlocks(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/extensions/forms/blocks/*')
  )
}

/** The pages listed by `ListBaseFieldComponents`. */
export function getBaseFieldComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType?.includes('base')
  )
}

/** The pages listed by `ListFeatureFieldComponents`. */
export function getFeatureFieldComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/feature-fields/*') &&
      node.frontmatter.showTabs
  )
}

/** The pages listed by `ListBaseInputComponents`. */
export function getBaseInputComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType === 'base-input'
  )
}

/** The pages listed by `ListBaseSelectionComponents`. */
export function getBaseSelectionComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType === 'base-selection'
  )
}

/** The pages listed by `ListBaseToggleComponents`. */
export function getBaseToggleComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType === 'base-toggle'
  )
}

/** The pages listed by `ListBaseValueComponents`. */
export function getBaseValueComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/Value/**/*') &&
      node.frontmatter.componentType?.includes('base')
  )
}

/** The pages listed by `ListFeatureValueComponents`. */
export function getFeatureValueComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/Value/**/*') &&
      node.frontmatter.componentType?.includes('feature')
  )
}

/** The pages listed by `ListDataContextComponents`. */
export function getDataContextComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/extensions/forms/DataContext/**/*')
  )
}

/** The pages listed by `ListFormComponents`. */
export function getFormComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/Form/**/*') &&
      node.frontmatter.componentType !== 'docs'
  )
}

/** The pages listed by `ListIterateComponents`. */
export function getIterateComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/extensions/forms/Iterate/**/*')
  )
}

/** The pages listed by `ListWizardComponents`. */
export function getWizardComponents(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/extensions/forms/Wizard/**/*')
  )
}

/** The pages listed by `ListEufemiaVersions`. */
export function getEufemiaVersions(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/about-the-lib/releases/eufemia/**/*')
  )
}

/** The pages listed by `ListUiLibVersions`. */
export function getUiLibVersions(pages: MdxNode[]): MdxNode[] {
  return pages.filter((node) =>
    globPath(node, 'uilib/about-the-lib/releases/dnb-ui-lib/**/*')
  )
}
