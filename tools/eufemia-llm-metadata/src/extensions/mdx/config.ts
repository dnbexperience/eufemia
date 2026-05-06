export const mdxExtensionConfig = {
  ignoredStandaloneComponents: [
    'CSSDiagram',
    'Card',
    'ChangeLocale',
    'InlineImg',
    'Intro',
    'IntroFooter',
    'License',
    'Logo',
    'PortalSkeleton',
    'Toc',
  ],
}

export const providedStandaloneMdxComponents = new Set([
  'Anchor',
  'Blockquote',
  'Details',
  'Hr',
  'Ul',
  'Li',
  'TypographyBox',
  'VisibleWhenNotVisualTest',
])

export const ignoredStandaloneImportSourcePatterns = [
  /^@dnb\/eufemia(?:\/|$)/,
  /^dnb-eufemia\/components(?:\/|$)/,
  /^dnb-ui-lib\/components(?:\/|$)/,
]

export const ignoredStandaloneMdxComponents = new Set(
  mdxExtensionConfig.ignoredStandaloneComponents
)
