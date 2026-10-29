/**
 * Component Test
 *
 */

import fs from 'node:fs'
import path from 'node:path'
import { render } from '@testing-library/react'
import { axeComponent } from '../../core/test-utils/testSetup'
import Down from '../thumbs_down'
import Up from '../thumbs_up'

describe('Icons', () => {
  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <>
        <Down />
        <Up />
      </>
    )

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('SVG content', () => {
  // Icons and flags are synced automatically from Figma and flag-icons
  const unsafeContent =
    /<script|<foreignObject|<!ENTITY|\son[a-z]+\s*=|(?:xlink:)?href\s*=\s*["'](?!#)|xlinkHref=|url\(\s*["']?(?!#)/i

  const findUnsafeFiles = (dir: string, extension: string) => {
    const files = fs
      .readdirSync(dir, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(extension))

    expect(files.length).toBeGreaterThan(100)

    return files.filter((file) =>
      unsafeContent.test(fs.readFileSync(path.join(dir, file), 'utf8'))
    )
  }

  it('should not contain scripts or external references in the SVG assets', () => {
    const assetsDir = path.resolve(__dirname, '../../../assets')

    expect(findUnsafeFiles(assetsDir, '.svg')).toEqual([])
  })

  it('should not contain scripts or external references in the icon components', () => {
    const iconsDir = path.resolve(__dirname, '..')

    expect(
      findUnsafeFiles(iconsDir, '.tsx').filter(
        (file) => !file.includes('__tests__')
      )
    ).toEqual([])
  })
})
