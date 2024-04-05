import propertiesSbanken from '@dnb/eufemia/src/style/themes/theme-sbanken/properties'
import propertiesUi from '@dnb/eufemia/src/style/themes/theme-ui/properties'
import propertiesEiendom from '@dnb/eufemia/src/style/themes/theme-eiendom/properties'

import { ThemeNames } from '@dnb/eufemia/shared'
import { basicComponents } from '../../../shared/tags'

type ColorData = {
  name: string
  type: string
  brandName: string
  figmaName: string
}

const MDXCode = basicComponents.code
const MDXTable = basicComponents.table

const dataEiendom = [
  {
    name: '--color-emerald-green-50',
    type: 'Eiendom',
    brandName: 'Emerald green 50%',
    figmaName: 'Emerald green 50%',
  },
  {
    name: '--color-emerald-green-25',
    type: 'Eiendom',
    brandName: 'Emerald green 25%',
    figmaName: 'Emerald green 25%',
  },
  {
    name: '--color-emerald-green-10',
    type: 'Eiendom',
    brandName: 'Emerald green 10%',
    figmaName: 'Emerald green 10%',
  },
  {
    name: '--color-mint-green-12',
    type: 'Eiendom',
    brandName: 'Mint green 12%',
    figmaName: 'Mint green 12%',
  },
]

const dataSbanken = [
  {
    name: '--sb-color-purple',
    type: 'Profile',
    brandName: 'Purple',
    figmaName: 'Primary/Purple',
  },
  {
    name: '--sb-color-purple-alternative',
    type: 'Profile',
    brandName: 'Purple alternative',
    figmaName: 'Primary/Purple alternative',
  },
  {
    name: '--sb-color-green',
    type: 'Profile',
    brandName: 'Green',
    figmaName: 'Primary/Green',
  },
  {
    name: '--sb-color-red',
    type: 'Profile',
    brandName: 'Red',
    figmaName: 'Secondary/Red',
  },
  {
    name: '--sb-color-magenta',
    type: 'Profile',
    brandName: 'Magenta',
    figmaName: 'Secondary/Magenta',
  },
  {
    name: '--sb-color-orange',
    type: 'Profile',
    brandName: 'Orange',
    figmaName: 'Secondary/Orange',
  },
  {
    name: '--sb-color-yellow-dark',
    type: 'Profile',
    brandName: 'Yellow dark',
    figmaName: 'Secondary/Yellow dark',
  },
  {
    name: '--sb-color-yellow',
    type: 'Profile',
    brandName: 'Yellow',
    figmaName: 'Secondary/Yellow',
  },
  {
    name: '--sb-color-green-dark-3',
    type: 'Profile',
    brandName: 'Green dark 3',
    figmaName: 'Secondary/Green dark 3',
  },
  {
    name: '--sb-color-green-dark-2',
    type: 'Profile',
    brandName: 'Green dark 2',
    figmaName: 'Secondary/Green dark 2',
  },
  {
    name: '--sb-color-violet',
    type: 'Profile',
    brandName: 'Violet',
    figmaName: 'Secondary/Violet',
  },
  {
    name: '--sb-color-violet-light',
    type: 'Profile',
    brandName: 'Violet light',
    figmaName: 'Secondary/Violet light',
  },
  {
    name: '--sb-color-blue-dark-2',
    type: 'Profile',
    brandName: 'Blue dark 2',
    figmaName: 'Secondary/Blue dark 2',
  },
  {
    name: '--sb-color-blue-dark',
    type: 'Profile',
    brandName: 'Blue dark',
    figmaName: 'Secondary/Blue dark',
  },
  {
    name: '--sb-color-blue',
    type: 'Profile',
    brandName: 'Blue',
    figmaName: 'Secondary/Blue',
  },
  {
    name: '--sb-color-black',
    type: 'UX',
    brandName: 'Black',
    figmaName: 'UX/Black',
  },
  {
    name: '--sb-color-text',
    type: 'UX',
    brandName: 'Text',
    figmaName: 'UX/Text',
  },
  {
    name: '--sb-color-gray-dark-3',
    type: 'UX',
    brandName: 'Gray dark 3',
    figmaName: 'UX/Gray dark 3',
  },
  {
    name: '--sb-color-gray-dark-2',
    type: 'UX',
    brandName: 'Gray dark 2',
    figmaName: 'UX/Gray dark 2',
  },
  {
    name: '--sb-color-gray-dark',
    type: 'UX',
    brandName: 'Gray dark',
    figmaName: 'UX/Gray dark',
  },
  {
    name: '--sb-color-gray',
    type: 'UX',
    brandName: 'Gray',
    figmaName: 'UX/Gray',
  },
  {
    name: '--sb-color-gray-light',
    type: 'UX',
    brandName: 'Gray light',
    figmaName: 'UX/Gray light',
  },
  {
    name: '--sb-color-gray-light-2',
    type: 'UX',
    brandName: 'Gray light',
    figmaName: 'UX/Gray light 2',
  },
  {
    name: '--sb-color-gray-light-3',
    type: 'UX',
    brandName: 'Gray light 3',
    figmaName: 'UX/Gray light 3',
  },
  {
    name: '--sb-color-gray-dark-3-neutral',
    type: 'UX',
    brandName: 'Gray dark 3 neutral',
    figmaName: 'UX/Gray dark 3 neutral',
  },
  {
    name: '--sb-color-gray-dark-2-neutral',
    type: 'UX',
    brandName: 'Gray dark 2 neutral',
    figmaName: 'UX/Gray dark 2 neutral',
  },
  {
    name: '--sb-color-gray-dark-neutral',
    type: 'UX',
    brandName: 'Gray dark neutral',
    figmaName: 'UX/Dark gray neutral',
  },
  {
    name: '--sb-color-gray-neutral',
    type: 'UX',
    brandName: 'Gray neutral',
    figmaName: 'UX/Gray neutral',
  },
]

const dataUi = [
  {
    name: '--color-ocean-green',
    type: 'Profile',
    brandName: 'Ocean green',
    figmaName: 'Ocean green',
  },
  {
    name: '--color-emerald-green',
    type: 'Profile',
    brandName: 'Emerald green',
    figmaName: 'Emerald green',
  },
  {
    name: '--color-sea-green',
    type: 'Profile',
    brandName: 'Sea green',
    figmaName: 'Sea green',
  },
  {
    name: '--color-mint-green',
    type: 'Profile',
    brandName: 'Mint green',
    figmaName: 'Mint green',
  },
  {
    name: '--color-summer-green',
    type: 'Profile',
    brandName: 'Summer green',
    figmaName: 'Summer green',
  },
  {
    name: '--color-accent-yellow',
    type: 'Profile',
    brandName: 'Accent yellow',
    figmaName: 'Accent yellow',
  },
  {
    name: '--color-indigo',
    type: 'Profile',
    brandName: 'Indigo',
    figmaName: 'Indigo',
  },
  {
    name: '--color-violet',
    type: 'Profile',
    brandName: 'Violet',
    figmaName: 'Violet',
  },
  {
    name: '--color-sky-blue',
    type: 'Profile',
    brandName: 'Sky blue',
    figmaName: 'Sky blue',
  },
  {
    name: '--color-lavender',
    type: 'Profile',
    brandName: 'Lavender',
    figmaName: 'Lavender',
  },
  {
    name: '--color-sand-yellow',
    type: 'Profile',
    brandName: 'Sand yellow',
    figmaName: 'Sand yellow',
  },
  {
    name: '--color-pistachio',
    type: 'Profile',
    brandName: 'Pistachio',
    figmaName: 'Pistachio',
  },
  {
    name: '--color-sea-green-30',
    type: 'UX',
    brandName: 'Sea green 30%',
    figmaName: 'Sea green 30%',
  },
  {
    name: '--color-mint-green-50',
    type: 'UX',
    brandName: 'Mint green 50%',
    figmaName: 'Mint green 50%',
  },
  {
    name: '--color-mint-green-25',
    type: 'UX',
    brandName: 'Mint green 25%',
    figmaName: 'Mint green 25%',
  },
  {
    name: '--color-mint-green-12',
    type: 'UX',
    brandName: 'Mint green 12%',
    figmaName: 'Mint green 12%',
  },
  {
    name: '--color-accent-yellow-30',
    type: 'UX',
    brandName: 'Accent yellow 30%',
    figmaName: 'Accent yellow 30%',
  },
  {
    name: '--color-signal-orange',
    type: 'UX',
    brandName: 'Signal orange',
    figmaName: 'Signal orange',
  },
  {
    name: '--color-fire-red',
    type: 'UX',
    brandName: 'Fire red',
    figmaName: 'Fire red',
  },
  {
    name: '--color-fire-red-8',
    type: 'UX',
    brandName: 'Fire red 8%',
    figmaName: 'Fire red 8%',
  },
  {
    name: '--color-success-green',
    type: 'UX',
    brandName: 'Success green',
    figmaName: 'Success green',
  },
  {
    name: '--color-black',
    type: 'UX',
    brandName: 'Black',
    figmaName: 'Black',
  },
  {
    name: '--color-black-80',
    type: 'UX',
    brandName: 'Black 80%',
    figmaName: 'Black 80%',
  },
  {
    name: '--color-black-55',
    type: 'UX',
    brandName: 'Black 55%',
    figmaName: 'Black 55%',
  },
  {
    name: '--color-black-20',
    type: 'UX',
    brandName: 'Black 20%',
    figmaName: 'Black 20%',
  },
  {
    name: '--color-black-8',
    type: 'UX',
    brandName: 'Black 8%',
    figmaName: 'Black 8%',
  },
  {
    name: '--color-black-3',
    type: 'UX',
    brandName: 'Black 3%',
    figmaName: 'Black 3%',
  },
  {
    name: '--color-white',
    type: 'UX',
    brandName: 'White',
    figmaName: 'White',
  },
]

const themes = {
  eiendom: { data: dataEiendom, properties: propertiesEiendom },
  sbanken: { data: dataSbanken, properties: propertiesSbanken },
  ui: { data: dataUi, properties: propertiesUi },
}

/**
 * @param {string} hex html color hex string, "#XXX" or "#XXXXXX"
 * @returns RGB values as a string "RRR GGG BBB"
 * @throws Error if hex has wrong length
 */
const hexToRGB = (hex: string) => {
  let hexOnly = hex.slice(1)
  if (hexOnly.length === 3) {
    hexOnly =
      hexOnly[0] +
      hexOnly[0] +
      hexOnly[1] +
      hexOnly[1] +
      hexOnly[2] +
      hexOnly[2]
  } else if (hexOnly.length !== 6) {
    throw new Error('Invalid hex length: ' + hex)
  }

  const r = parseInt(hexOnly.slice(0, 2), 16),
    g = parseInt(hexOnly.slice(2, 4), 16),
    b = parseInt(hexOnly.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}

const getRow = (
  { name, type, brandName, figmaName }: ColorData,
  theme: ThemeNames,
) => {
  const color = themes[theme].properties[name]?.toUpperCase()

  if (!color) {
    return (
      <tr>
        <td colSpan={7}>
          Color <MDXCode>{name}</MDXCode> could not be found
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{color}</td>
      <td>{type || 'N/A'}</td>
      <td>{brandName || 'N/A'}</td>
      <td>
        <MDXCode>{color}</MDXCode>
      </td>
      <td>{hexToRGB(color)}</td>
      <td>{figmaName || 'N/A'}</td>
      <td>
        <MDXCode>{name}</MDXCode>
      </td>
    </tr>
  )
}

export const ColorTable = ({ theme }: { theme: ThemeNames }) => (
  <>
    <MDXTable>
      <thead>
        <tr>
          <th>Sample</th>
          <th>Type</th>
          <th>Brand name</th>
          <th>Hex</th>
          <th>RGB</th>
          <th>Figma Library name</th>
          <th>CSS Custom Properties name</th>
        </tr>
      </thead>
      <tbody>
        {themes[theme].data.map((color) => getRow(color, theme))}
      </tbody>
    </MDXTable>
  </>
)
