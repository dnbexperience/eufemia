import ts from 'typescript'
import path from 'node:path'
import { log } from '../../lib'
import { normalizePath } from './context'
import type { RunnerContext } from './types'

/**
 * A pure re-export barrel: every top-level statement only forwards other
 * modules. Such files add no rendered output of their own, so they must be
 * transparent when tracing which tests a change impacts — otherwise a change to
 * one member would fan out to every consumer of the barrel.
 */
export function isReexportOnly(sourceFile: ts.SourceFile): boolean {
  const statements = sourceFile.statements
  if (statements.length === 0) {
    return false
  }

  return statements.every((statement) => {
    return (
      ts.isImportDeclaration(statement) ||
      ts.isExportDeclaration(statement) ||
      ts.isExportAssignment(statement)
    )
  })
}

function createProgramFromTsConfig(
  packageRoot: string
): ts.Program | null {
  const configPath = ts.findConfigFile(
    packageRoot,
    ts.sys.fileExists,
    'tsconfig.json'
  )
  if (!configPath) {
    return null
  }

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    packageRoot
  )

  return ts.createProgram(parsed.fileNames, {
    ...parsed.options,
    noEmit: true,
    skipLibCheck: true,
  })
}

/**
 * Builds a reverse-dependency map (module -> files that depend on it) from the
 * TypeScript program using symbol resolution. Named imports are resolved to the
 * symbol's defining module, so re-export barrels are followed transparently.
 * Type-only imports are ignored because they cannot change rendered output.
 */
export function buildReverseDependencyMap(
  program: ts.Program,
  packageRoot: string
): Map<string, string[]> {
  const checker = program.getTypeChecker()

  const toRelative = (absolutePath: string): string | null => {
    const relativePath = normalizePath(
      path.relative(packageRoot, absolutePath)
    )
    return relativePath.startsWith('src/') ? relativePath : null
  }

  const originOf = (symbol: ts.Symbol | undefined): string | undefined => {
    if (!symbol) {
      return undefined
    }

    let resolved = symbol
    if (resolved.flags & ts.SymbolFlags.Alias) {
      try {
        resolved = checker.getAliasedSymbol(resolved)
      } catch {
        // Keep the original symbol when the alias cannot be resolved.
      }
    }

    return resolved.declarations?.[0]?.getSourceFile().fileName
  }

  const forward = new Map<string, Set<string>>()
  const barrels = new Set<string>()

  const addEdge = (from: string, toAbsolute: string | undefined) => {
    if (!toAbsolute) {
      return
    }
    const to = toRelative(toAbsolute)
    if (!to || to === from) {
      return
    }
    let dependencies = forward.get(from)
    if (!dependencies) {
      dependencies = new Set<string>()
      forward.set(from, dependencies)
    }
    dependencies.add(to)
  }

  // Namespace/star/dynamic imports can reach any export, so depend on all of
  // them (their origins). Barrel members resolve to their real defining files.
  const addModuleExports = (
    from: string,
    moduleSpecifier: ts.Expression | undefined
  ) => {
    if (!moduleSpecifier) {
      return
    }
    const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier)
    if (!moduleSymbol) {
      return
    }
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      addEdge(from, originOf(exported))
    }
  }

  const collectDynamicImports = (node: ts.Node, from: string) => {
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length > 0 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      addModuleExports(from, node.arguments[0])
    }
    ts.forEachChild(node, (child) => collectDynamicImports(child, from))
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      continue
    }
    const from = toRelative(sourceFile.fileName)
    if (!from) {
      continue
    }

    if (isReexportOnly(sourceFile)) {
      barrels.add(from)
    }

    for (const statement of sourceFile.statements) {
      if (ts.isImportDeclaration(statement)) {
        const clause = statement.importClause
        if (!clause || clause.isTypeOnly) {
          continue
        }
        if (clause.name) {
          addEdge(from, originOf(checker.getSymbolAtLocation(clause.name)))
        }
        const bindings = clause.namedBindings
        if (bindings && ts.isNamespaceImport(bindings)) {
          addModuleExports(from, statement.moduleSpecifier)
        } else if (bindings && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) {
            if (element.isTypeOnly) {
              continue
            }
            addEdge(
              from,
              originOf(checker.getSymbolAtLocation(element.name))
            )
          }
        }
      } else if (ts.isExportDeclaration(statement)) {
        if (statement.isTypeOnly) {
          continue
        }
        const exportClause = statement.exportClause
        if (exportClause && ts.isNamedExports(exportClause)) {
          for (const element of exportClause.elements) {
            if (element.isTypeOnly) {
              continue
            }
            addEdge(
              from,
              originOf(checker.getSymbolAtLocation(element.name))
            )
          }
        } else if (!exportClause && statement.moduleSpecifier) {
          addModuleExports(from, statement.moduleSpecifier)
        }
      }
    }

    collectDynamicImports(sourceFile, from)
  }

  const reverse = new Map<string, string[]>()
  forward.forEach((dependencies, from) => {
    if (barrels.has(from)) {
      return
    }
    dependencies.forEach((to) => {
      if (barrels.has(to)) {
        return
      }
      let dependents = reverse.get(to)
      if (!dependents) {
        dependents = []
        reverse.set(to, dependents)
      }
      if (!dependents.includes(from)) {
        dependents.push(from)
      }
    })
  })

  return reverse
}

export function loadTsDependencyMap(
  context: RunnerContext
): Map<string, string[]> {
  try {
    const program = createProgramFromTsConfig(context.packageRoot)
    if (!program) {
      log.warn(
        'Warning: Could not locate tsconfig.json. Falling back to direct file matching.'
      )
      return new Map<string, string[]>()
    }
    return buildReverseDependencyMap(program, context.packageRoot)
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    log.warn(
      `Warning: Could not build TypeScript dependency map. Falling back to direct file matching. ${details}`
    )
    return new Map<string, string[]>()
  }
}
