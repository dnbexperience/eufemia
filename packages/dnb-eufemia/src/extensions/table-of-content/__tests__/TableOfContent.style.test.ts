// @vitest-environment node

import path from 'node:path'
import postcss from 'postcss'
import { loadScss } from '../../../core/test-utils/testSetup'

it('keeps the current section visible in forced colors', () => {
  const css = postcss.parse(
    loadScss(path.resolve(__dirname, '../style/dnb-table-of-content.scss'))
  )
  const declarations: Record<string, string> = {}
  css.walkAtRules('media', (media) => {
    if (media.params === '(forced-colors: active)') {
      media.walkRules((rule) => {
        if (rule.selector.includes('[aria-current]')) {
          rule.walkDecls((decl) => {
            declarations[decl.prop] = decl.value
          })
        }
      })
    }
  })
  expect(declarations).toMatchObject({
    'forced-color-adjust': 'none',
    'background-color': 'Highlight',
    color: 'HighlightText',
  })
})
