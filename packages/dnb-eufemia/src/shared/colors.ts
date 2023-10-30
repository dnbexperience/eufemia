/**
 * DNB UI / Sbanken / DNB Eiendom colors
 */

const ui = {
  oceanGreen: createColorEntry(
    'Ocean green',
    '#00343E',
    'rgb(0, 52, 62)',
    'var(--color-ocean-green)'
  ),
  emeraldGreen: createColorEntry(
    'Emerald green',
    '#14555A',
    'rgb(20, 85, 90)',
    'var(--color-emerald-green)'
  ),
  seaGreen: createColorEntry(
    'Sea green',
    '#007272',
    'rgb(0, 114, 114)',
    'var(--color-sea-green)'
  ),
  mintGreen: createColorEntry(
    'Mint green',
    '#A5E1D2',
    'rgb(165, 225, 210)',
    'var(--color-mint-green)'
  ),
  summerGreen: createColorEntry(
    'Summer green',
    '#28B482',
    'rgb(40, 180, 130)',
    'var(--color-summer-green)'
  ),
  accentYellow: createColorEntry(
    'Accent yellow',
    '#FDBB31',
    'rgb(253, 187, 49)',
    'var(--color-accent-yellow)'
  ),
  indigo: createColorEntry(
    'Indigo',
    '#23195A',
    'rgb(35, 25, 90)',
    'var(--color-indigo)'
  ),
  violet: createColorEntry(
    'Violet',
    '#6E2382',
    'rgb(110, 35, 130)',
    'var(--color-violet)'
  ),
  skyBlue: createColorEntry(
    'Sky blue',
    '#4BBED2',
    'rgb(75, 190, 210)',
    'var(--color-sky-blue)'
  ),
  lavender: createColorEntry(
    'Lavender',
    '#F2F2F5',
    'rgb(242, 242, 245)',
    'var(--color-lavender)'
  ),
  sandYellow: createColorEntry(
    'Sand yellow',
    '#FBF6EC',
    'rgb(251, 246, 236)',
    'var(--color-sand-yellow)'
  ),
  pistachio: createColorEntry(
    'Pistachio',
    '#F2F4EC',
    'rgb(242, 244, 236)',
    'var(--color-pistachio)'
  ),
  seaGreen30: createColorEntry(
    'Sea green 30%',
    '#B3D5D5',
    'rgb(179, 213, 213)',
    'var(--color-sea-green-30)'
  ),
  mintGreen50: createColorEntry(
    'Mint green 50%',
    '#D2F0E9',
    'rgb(210, 240, 233)',
    'var(--color-mint-green-50)'
  ),
  mintGreen25: createColorEntry(
    'Mint green 25%',
    '#E9F8F4',
    'rgb(233, 248, 244)',
    'var(--color-mint-green-25)'
  ),
  mintGreen12: createColorEntry(
    'Mint green 12%',
    '#F4FBF9',
    'rgb(244, 251, 249)',
    'var(--color-mint-green-12)'
  ),
  accentYellow30: createColorEntry(
    'Accent yellow 30%',
    '#FEEBC1',
    'rgb(254, 235, 193)',
    'var(--color-accent-yellow-30)'
  ),
  signalOrange: createColorEntry(
    'Signal orange',
    '#FF5400',
    'rgb(255, 84, 0)',
    'var(--color-signal-orange)'
  ),
  fireRed: createColorEntry(
    'Fire red',
    '#DC2A2A',
    'rgb(220, 42, 42)',
    'var(--color-fire-red)'
  ),
  fireRed8: createColorEntry(
    'Fire red 8%',
    '#FDEEEE',
    'rgb(253, 238, 238)',
    'var(--color-fire-red-8)'
  ),
  successGreen: createColorEntry(
    'Success green',
    '#007B5E',
    'rgb(0, 128, 0)',
    'var(--color-success-green)'
  ),
  black: createColorEntry(
    'Black',
    '#000000',
    'rgb(0, 0, 0)',
    'var(--color-black)'
  ),
  black80: createColorEntry(
    'Black 80%',
    '#333333',
    'rgb(51, 51, 51)',
    'var(--color-black-80)'
  ),
  black55: createColorEntry(
    'Black 55%',
    '#737373',
    'rgb(115, 115, 115)',
    'var(--color-black-55)'
  ),
  black20: createColorEntry(
    'Black 20%',
    '#CCCCCC',
    'rgb(204, 204, 204)',
    'var(--color-black-20)'
  ),
  black8: createColorEntry(
    'Black 8%',
    '#EBEBEB',
    'rgb(235, 235, 235)',
    'var(--color-black-8)'
  ),
  black3: createColorEntry(
    'Black 3%',
    '#F8F8F8',
    'rgb(248, 248, 248)',
    'var(--color-black-3)'
  ),
  white: createColorEntry(
    'White',
    '#FFFFFF',
    'rgb(255, 255, 255)',
    'var(--color-white)'
  ),
} satisfies Record<string, ColorEntry>

const sbanken = {
  profilePurple: createColorEntry(
    'Primary/Purple',
    '#1C1B4E',
    'rgb(18, 17, 78)',
    'var(--sb-color-purple)'
  ),
  profilePurpleAlternative: createColorEntry(
    'Primary/Purple alternative',
    '#222163',
    'rgb(34, 33, 99)',
    'var(--sb-color-purple-alternative)'
  ),
  profileGreen: createColorEntry(
    'Primary/Green',
    '#92EECD',
    'rgb(146, 238, 205)',
    'var(--sb-color-green)'
  ),
  profileRed: createColorEntry(
    'Secondary/Red',
    '#D8134B',
    'rgb(216, 19, 75)',
    'var(--sb-color-red)'
  ),
  profileMagenta: createColorEntry(
    'Secondary/Magenta',
    '#FF3C64',
    'rgb(255, 60, 100)',
    'var(--sb-color-magenta)'
  ),
  profileOrange: createColorEntry(
    'Secondary/Orange',
    '#FE5030',
    'rgb(254, 80, 56)',
    'var(--sb-color-orange)'
  ),
  profileYellowDark: createColorEntry(
    'Secondary/Yellow dark',
    '#F7BF16',
    'rgb(247, 191, 22)',
    'var(--sb-color-yellow-dark)'
  ),
  profileYellow: createColorEntry(
    'Secondary/Yellow',
    '#FFEF57',
    'rgb(255, 239, 87)',
    'var(--sb-color-yellow)'
  ),
  profileGreenDark3: createColorEntry(
    'Secondary/Green dark 3',
    '#00785B',
    'rgb(0, 120, 91)',
    'var(--sb-color-green-dark-3)'
  ),
  profileGreenDark2: createColorEntry(
    'Secondary/Green dark 2',
    '#009669',
    'rgb(0, 150, 105)',
    'var(--sb-color-green-dark-2)'
  ),
  profileViolet: createColorEntry(
    'Secondary/Violet',
    '#4E08BC',
    'rgb(78, 8, 188)',
    'var(--sb-color-violet)'
  ),
  profileVioletLight: createColorEntry(
    'Secondary/Violet light',
    '#7129E2',
    'rgb(113, 41, 226)',
    'var(--sb-color-violet-light)'
  ),
  profileBlueDark2: createColorEntry(
    'Secondary/Blue dark 2',
    '#044CCC',
    'rgb(4, 76, 204)',
    'var(--sb-color-blue-dark-2)'
  ),
  profileBlueDark: createColorEntry(
    'Secondary/Blue dark',
    '#005CFF',
    'rgb(0, 92, 255)',
    'var(--sb-color-blue-dark)'
  ),
  profileBlue: createColorEntry(
    'Secondary/Blue',
    '#008EFF',
    'rgb(0, 142, 255)',
    'var(--sb-color-blue)'
  ),
  uxBlack: createColorEntry(
    'UX/Black',
    '#000000',
    'rgb(0, 0, 0)',
    'var(--sb-color-black)'
  ),
  uxText: createColorEntry(
    'UX/Text',
    '#18172A',
    'rgb(24, 23, 42)',
    'var(--sb-color-text)'
  ),
  uxGrayDark3: createColorEntry(
    'UX/Gray dark 3',
    '#3A3970',
    'rgb(58, 57, 112)',
    'var(--sb-color-gray-dark-3)'
  ),
  uxGrayDark2: createColorEntry(
    'UX/Gray dark 2',
    '#62628E',
    'rgb(98, 98, 142)',
    'var(--sb-color-gray-dark-2)'
  ),
  uxGrayDark: createColorEntry(
    'UX/Gray dark',
    '#9292B0',
    'rgb(146, 146, 176)',
    'var(--sb-color-gray-dark)'
  ),
  uxGray: createColorEntry(
    'UX/Gray',
    '#BBBBCE',
    'rgb(187, 187, 206)',
    'var(--sb-color-gray)'
  ),
  uxGrayLight: createColorEntry(
    'UX/Gray light',
    '#D9D9E4',
    'rgb(217, 217, 228)',
    'var(--sb-color-gray-light)'
  ),
  uxGrayLight2: createColorEntry(
    'UX/Gray light 2',
    '#EBEBF2',
    'rgb(235, 235, 242)',
    'var(--sb-color-gray-light-2)'
  ),
  uxGrayLight3: createColorEntry(
    'UX/Gray light 3',
    '#F9F9FD',
    'rgb(249, 249, 253)',
    'var(--sb-color-gray-light-3)'
  ),
  uxGrayDark3Neutral: createColorEntry(
    'UX/Gray dark 3 neutral',
    '#3E3E4A',
    'rgb(62, 62, 74)',
    'var(--sb-color-gray-dark-3-neutral)'
  ),
  uxGrayDark2Neutral: createColorEntry(
    'UX/Gray dark 2 neutral',
    '#656472',
    'rgb(101, 100, 114)',
    'var(--sb-color-gray-dark-2-neutral)'
  ),
  uxGrayDarkNeutral: createColorEntry(
    'UX/Dark gray neutral',
    '#9494A3',
    'rgb(148, 148, 163)',
    'var(--sb-color-gray-dark-neutral)'
  ),
  uxGrayNeutral: createColorEntry(
    'UX/Gray neutral',
    '#BDBDC6',
    'rgb(189, 189, 198)',
    'var(--sb-color-gray-neutral)'
  ),
} satisfies Record<string, ColorEntry>

const eiendom = {
  emeraldGreen50: createColorEntry(
    'Emerald green 50%',
    '#89aaac',
    'rgb(137, 170, 172)',
    'var(--color-emerald-green-50)'
  ),
  emeraldGreen25: createColorEntry(
    'Emerald green 25%',
    '#c4d4d6',
    'rgb(196, 212, 214)',
    'var(--color-emerald-green-25)'
  ),
  emeraldGreen10: createColorEntry(
    'Emerald green 10%',
    '#e8eeef',
    'rgb(232, 238, 239)',
    'var(--color-emerald-green-10)'
  ),
  mintGreen12: createColorEntry(
    'Mint green 12%',
    '#f4fbf9',
    'rgb(244, 251, 249)',
    'var(--color-mint-green-12)'
  ),
} satisfies Record<string, ColorEntry>

export const colors = {
  ui,
  sbanken,
  eiendom,
}

function createColorEntry(
  name: string,
  hex: string,
  rgb: string,
  cssVariable: string
): ColorEntry {
  return { name, hex, rgb, cssVariable }
}

export type UiColor = typeof ui
export type SbankenColor = typeof sbanken
export type EiendomColor = typeof eiendom
export type ColorEntry = {
  name: string
  cssVariable: string
  hex: string
  rgb: string
}
