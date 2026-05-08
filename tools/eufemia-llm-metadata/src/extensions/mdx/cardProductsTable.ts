import fs from 'fs-extra'
import path from 'path'
import type {
  ArgumentPlaceholder,
  Expression,
  MemberExpression,
  ObjectExpression,
  ObjectProperty,
  SpreadElement,
} from '@babel/types'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import { escapeMarkdownTableCell } from './utils.ts'

type CardProductDesignVariant = {
  tag?: string
  color?: string
}

type CardProductEntry = {
  productCode: string
  productName: string
  displayName: string
  cardDesign: {
    name?: string
    bankLogo?: CardProductDesignVariant
    visa?: CardProductDesignVariant
    mastercard?: CardProductDesignVariant
    saga?: CardProductDesignVariant
    privateBanking?: CardProductDesignVariant
  }
  productType: {
    tag?: string
  }
  cardType: {
    tag?: string
  }
}

let cachedCardProducts: CardProductEntry[] | null = null

export function createCardProductsTableExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'CardProductsTable',
    replace: (content) => replaceCardProductsTables(content, deps),
  }
}

async function replaceCardProductsTables(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  const regex = /<CardProductsTable\b[^>]*\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const cardProducts = await loadCardProducts(deps)

  if (cardProducts.length === 0) {
    return content
  }

  return content.replace(regex, () => {
    return `\n${renderCardProductsMarkdown(cardProducts)}\n`
  })
}

async function loadCardProducts(deps: SpecialMdxRendererDeps) {
  if (cachedCardProducts) {
    return cachedCardProducts
  }

  const eufemiaRoot = deps.findPackageRoot('@dnb/eufemia')

  if (!eufemiaRoot) {
    return []
  }

  const cardProductsPath = path.join(
    eufemiaRoot,
    'src/extensions/payment-card/utils/cardProducts.ts'
  )
  const cardDesignsPath = path.join(
    eufemiaRoot,
    'src/extensions/payment-card/utils/CardDesigns.ts'
  )
  const properties = await deps.loadModuleDefault(
    '@dnb/eufemia/src/style/themes/ui/properties'
  )

  const designsByIdentifier = await loadCardProductDesigns({
    cardDesignsPath,
    properties:
      properties && typeof properties === 'object'
        ? (properties as Record<string, string>)
        : {},
  })

  cachedCardProducts = await parseCardProductsSource({
    cardProductsPath,
    designsByIdentifier,
  })

  return cachedCardProducts
}

async function loadCardProductDesigns({
  cardDesignsPath,
  properties,
}: {
  cardDesignsPath: string
  properties: Record<string, string>
}) {
  const parser = await import('@babel/parser')
  const source = await fs.readFile(cardDesignsPath, 'utf-8')
  const ast = parser.parse(source, {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  const designs: Record<string, CardProductEntry['cardDesign']> = {}

  for (const node of ast.program.body) {
    if (node.type !== 'VariableDeclaration') {
      continue
    }

    for (const declaration of node.declarations) {
      if (
        declaration.id.type !== 'Identifier' ||
        declaration.init?.type !== 'ObjectExpression'
      ) {
        continue
      }

      const design = extractCardProductDesign(declaration.init, properties)

      if (design.name) {
        designs[declaration.id.name] = design
      }
    }
  }

  return designs
}

function extractCardProductDesign(
  node: ObjectExpression,
  properties: Record<string, string>
) {
  return {
    name: readObjectStringProperty(node, 'name') || undefined,
    bankLogo: readCardProductDesignVariant(node, 'bankLogo', properties),
    visa: readCardProductDesignVariant(node, 'visa', properties),
    mastercard: readCardProductDesignVariant(
      node,
      'mastercard',
      properties
    ),
    saga: readCardProductDesignVariant(node, 'saga', properties),
    privateBanking: readCardProductDesignVariant(
      node,
      'privateBanking',
      properties
    ),
  }
}

function readCardProductDesignVariant(
  node: ObjectExpression,
  key: string,
  properties: Record<string, string>
) {
  const property = getObjectProperty(node, key)

  if (!property) {
    return undefined
  }

  if (property.value.type === 'MemberExpression') {
    return {
      tag: readMemberExpressionPropertyName(property.value),
    }
  }

  if (property.value.type === 'CallExpression') {
    const callee = property.value.callee

    if (callee.type !== 'MemberExpression') {
      return undefined
    }

    const firstArgument = property.value.arguments[0]

    return {
      tag: readMemberExpressionPropertyName(callee),
      color: readExpressionStringValue(firstArgument, properties),
    }
  }

  return undefined
}

async function parseCardProductsSource({
  cardProductsPath,
  designsByIdentifier,
}: {
  cardProductsPath: string
  designsByIdentifier: Record<string, CardProductEntry['cardDesign']>
}) {
  const parser = await import('@babel/parser')
  const source = await fs.readFile(cardProductsPath, 'utf-8')
  const ast = parser.parse(source, {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  const rows: CardProductEntry[] = []

  for (const node of ast.program.body) {
    if (node.type !== 'VariableDeclaration') {
      continue
    }

    for (const declaration of node.declarations) {
      if (
        declaration.id.type !== 'Identifier' ||
        declaration.id.name !== 'cardData' ||
        declaration.init?.type !== 'ArrayExpression'
      ) {
        continue
      }

      for (const element of declaration.init.elements) {
        if (!element || element.type !== 'ObjectExpression') {
          continue
        }

        const row = extractCardProductRow(element, designsByIdentifier)

        if (row) {
          rows.push(row)
        }
      }
    }
  }

  return rows
}

function extractCardProductRow(
  node: ObjectExpression,
  designsByIdentifier: Record<string, CardProductEntry['cardDesign']>
) {
  const productCode = readObjectStringProperty(node, 'productCode')
  const productName = readObjectStringProperty(node, 'productName')
  const displayName = readObjectStringProperty(node, 'displayName')
  const cardDesignIdentifier = readObjectIdentifierProperty(
    node,
    'cardDesign'
  )
  const productTypeTag = readObjectMemberPropertyTag(node, 'productType')
  const cardTypeTag = readObjectMemberPropertyTag(node, 'cardType')

  if (
    !productCode ||
    !productName ||
    !displayName ||
    !cardDesignIdentifier ||
    !productTypeTag ||
    !cardTypeTag
  ) {
    return null
  }

  return {
    productCode,
    productName,
    displayName,
    cardDesign: designsByIdentifier[cardDesignIdentifier] || {},
    productType: { tag: productTypeTag },
    cardType: { tag: cardTypeTag },
  }
}

function getObjectProperty(
  node: ObjectExpression,
  key: string
): ObjectProperty | undefined {
  for (const property of node.properties) {
    if (property.type !== 'ObjectProperty') {
      continue
    }

    if (property.key.type === 'Identifier') {
      if (property.key.name === key) {
        return property
      }

      continue
    }

    if (property.key.type === 'StringLiteral') {
      if (property.key.value === key) {
        return property
      }
    }

    continue
  }

  return undefined
}

function readObjectStringProperty(node: ObjectExpression, key: string) {
  const property = getObjectProperty(node, key)

  if (!property || property.value.type !== 'StringLiteral') {
    return null
  }

  return property.value.value
}

function readObjectIdentifierProperty(
  node: ObjectExpression,
  key: string
) {
  const property = getObjectProperty(node, key)

  if (!property || property.value.type !== 'Identifier') {
    return null
  }

  return property.value.name
}

function readObjectMemberPropertyTag(node: ObjectExpression, key: string) {
  const property = getObjectProperty(node, key)

  if (!property || property.value.type !== 'MemberExpression') {
    return null
  }

  return readMemberExpressionPropertyName(property.value)
}

function readMemberExpressionPropertyName(node: MemberExpression) {
  if (node.property.type === 'Identifier') {
    return node.property.name
  }

  if (node.property.type === 'StringLiteral') {
    return node.property.value
  }

  return undefined
}

function readExpressionStringValue(
  node:
    | ArgumentPlaceholder
    | Expression
    | SpreadElement
    | null
    | undefined,
  properties: Record<string, string>
) {
  if (!node || typeof node !== 'object') {
    return undefined
  }

  if (
    node.type === 'ArgumentPlaceholder' ||
    node.type === 'SpreadElement'
  ) {
    return undefined
  }

  if (node.type === 'StringLiteral') {
    return node.value
  }

  if (node.type === 'MemberExpression') {
    if (
      node.object.type === 'Identifier' &&
      node.object.name === 'properties' &&
      node.computed &&
      node.property.type === 'StringLiteral'
    ) {
      return properties[node.property.value] || node.property.value
    }
  }

  return undefined
}

function renderCardProductsMarkdown(cardProducts: CardProductEntry[]) {
  if (cardProducts.length === 0) {
    return 'No card products are available.'
  }

  const lines = [
    '| Product Id | Product name cards | Card name to show in app | Design | Bank Logo | Product Logo | Product Logo Variant | Type of Card | Type of Card Variant |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ]

  for (const card of cardProducts) {
    lines.push(
      `| ${[
        card.productCode,
        card.productName,
        card.displayName,
        card.cardDesign.name || '-',
        getCardProductLogo(card.cardDesign.bankLogo),
        getTagLabel(card.productType),
        getCardProductVariant(card.productType, card.cardDesign),
        getTagLabel(card.cardType),
        getCardTypeVariant(card.cardType, card.cardDesign),
      ]
        .map((value) => escapeMarkdownTableCell(value))
        .join(' | ')} |`
    )
  }

  return lines.join('\n')
}

function getTagLabel(value: { tag?: string } | undefined) {
  if (!value?.tag || value.tag === 'None') {
    return '-'
  }

  return value.tag
}

function getCardProductLogo(
  bankLogo: CardProductDesignVariant | undefined
) {
  switch (bankLogo?.tag) {
    case 'Colored':
    case 'Sbanken':
      return bankLogo.color || '-'
    default:
      return '-'
  }
}

function getCardProductVariant(
  type: { tag?: string },
  design: CardProductEntry['cardDesign']
) {
  switch (type.tag) {
    case 'Saga':
      return getTagLabel(design.saga)
    case 'PrivateBanking':
      return getTagLabel(design.privateBanking)
    default:
      return '-'
  }
}

function getCardTypeVariant(
  type: { tag?: string },
  design: CardProductEntry['cardDesign']
) {
  switch (type.tag) {
    case 'Visa':
      return getTagLabel(design.visa)
    case 'Mastercard':
      return getTagLabel(design.mastercard)
    default:
      return '-'
  }
}
