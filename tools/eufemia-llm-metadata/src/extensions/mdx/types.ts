export type SpecialMdxRendererDeps = {
  loadModuleDefault: (modulePath: string) => Promise<unknown>
  findPackageRoot: (pkgName: string) => string | null
  toPascalCase: (value: string) => string
  inputDir: string
  docsRoot: string
  importsByFile: Map<string, string[]>
  toSlugAndDir: (
    relFilePath: string,
    slugBase: string
  ) => { slug: string; dirForExtras: string }
}

export type SpecialMdxComponentRenderer = {
  name: string
  replace: (content: string) => string | Promise<string>
}
