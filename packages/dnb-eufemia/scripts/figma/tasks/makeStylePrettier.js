/**
 * Figma Task
 *
 */

import prettier from 'prettier'

export const makeStylePrettier = (style) =>
  prettier.format(style, {
    filepath: `file.scss`,
    printWidth: 75,
    tabWidth: 2,
    singleQuote: true,
    bracketSpacing: true,
    useTabs: false,
    semi: false,
    jsxBracketSameLine: false,
    parser: 'babel',
    trailingComma: 'none',
  })
