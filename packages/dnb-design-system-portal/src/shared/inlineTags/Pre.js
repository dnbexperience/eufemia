/**
 * Inline Tag
 *
 */

import system from 'system-components/emotion'

const Pre = system(
  {
    is: 'pre',
    // by commenting this out, we use the reset.scss styling of fonts
    // fontSize: 16,
    // fontFamily: 'monospace',
    m: 0
  }
  // {
  //   overflow: 'auto'
  // },
  // 'fontFamily',
  // 'space',
  // 'color'
)
Pre.displayName = 'Pre'

export default Pre
