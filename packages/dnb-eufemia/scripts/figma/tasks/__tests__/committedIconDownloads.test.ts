import fs from 'fs-extra'
import path from 'node:path'
import { unzipSync } from 'fflate'

const iconsDir = path.resolve(__dirname, '../../../../assets/icons/dnb')

it('keeps the icon ZIP in sync with the committed SVGs', async () => {
  const zip = unzipSync(
    await fs.readFile(path.join(iconsDir, 'eufemia-icons.zip'))
  )
  const svgs = (await fs.readdir(iconsDir)).filter((file) =>
    file.endsWith('.svg')
  )

  const outdated: string[] = []
  for (const file of svgs) {
    const svg = await fs.readFile(path.join(iconsDir, file))
    if (!zip[`svg/${file}`] || !svg.equals(zip[`svg/${file}`])) {
      outdated.push(file)
    }
  }

  // Run `yarn workspace @dnb/eufemia icons:downloads` when this fails.
  expect(outdated).toEqual([])
  expect(Object.keys(zip).sort()).toEqual(
    svgs.map((file) => `svg/${file}`).sort()
  )
})
