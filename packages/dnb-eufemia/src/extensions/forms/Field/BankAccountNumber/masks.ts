import type { BankAccountType } from '../../../../components/number-format/utils/formatBankAccountNumber'
import type { FieldBlockWidth } from '../../FieldBlock/FieldBlock'

type MaskEntry = Array<RegExp | string>

/**
 * Norwegian BBAN: XXXX XX XXXXX (11 digits)
 */
const norwegianBbanMask: MaskEntry = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const norwegianBbanMaskNoFormat: MaskEntry = Array.from(
  { length: 11 },
  () => /\d/,
)

/**
 * Swedish BBAN: XXXX-XXXXXXXXXX (clearing 4 + account up to 10)
 * Using a generous mask of 14 digits.
 */
const swedishBbanMask: MaskEntry = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const swedishBbanMaskNoFormat: MaskEntry = Array.from(
  { length: 14 },
  () => /\d/,
)

/**
 * Swedish Bankgiro: 7-8 digits.
 * When the value length is known, the mask includes a dash at the correct position
 * while still allowing up to 8 digits total.
 * Otherwise digit-only to avoid a premature dash during input.
 */
const swedishBankgiroMaskDigitsOnly: MaskEntry = Array.from(
  { length: 8 },
  () => /\d/,
)

function buildSwedishBankgiroMask(value?: string): MaskEntry {
  const digits = value?.replace(/[^0-9]/g, '') ?? ''

  if (digits.length === 7) {
    // XXX-XXXXX — 9-slot mask (3 digits + dash + 5 digits) so the user
    // can type an 8th digit. The dash stays after the 3rd digit until
    // blur, which repositions it to XXXX-XXXX via setMaskValue.
    return [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
  }

  if (digits.length === 8) {
    // XXXX-XXXX
    return [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  }

  return swedishBankgiroMaskDigitsOnly
}

/**
 * Swedish Plusgiro: 2-8 digits.
 * When the value length is known, the mask includes a dash before the check digit
 * while still allowing up to 8 digits total.
 * Otherwise digit-only to avoid a premature dash during input.
 */
const swedishPlusgiroMaskDigitsOnly: MaskEntry = Array.from(
  { length: 8 },
  () => /\d/,
)

function buildSwedishPlusgiroMask(value?: string): MaskEntry {
  const digits = value?.replace(/[^0-9]/g, '') ?? ''

  if (digits.length >= 2 && digits.length <= 8) {
    const maxDigits = 8
    const dashPosition = digits.length - 1
    const mask: MaskEntry = []

    for (let i = 0; i < maxDigits; i++) {
      if (i === dashPosition) {
        mask.push('-')
      }
      mask.push(/\d/)
    }

    return mask
  }

  return swedishPlusgiroMaskDigitsOnly
}

/**
 * IBAN: groups of 4 alphanumeric characters.
 * Max 34 characters. Country code (2 letters) + check digits (2) + BBAN (up to 30).
 */
const ibanMask: MaskEntry = buildIbanMask()

function buildIbanMask(): MaskEntry {
  const alphanumeric = /[A-Za-z0-9]/
  const mask: MaskEntry = []

  for (let i = 0; i < 34; i++) {
    if (i > 0 && i % 4 === 0) {
      mask.push(' ')
    }
    mask.push(alphanumeric)
  }

  return mask
}

const ibanMaskNoFormat: MaskEntry = Array.from(
  { length: 34 },
  () => /[A-Za-z0-9]/,
)

export function getMask(
  bankAccountType: BankAccountType,
  omitMask: boolean,
  value?: string,
): MaskEntry {
  if (omitMask) {
    switch (bankAccountType) {
      case 'swedishBban':
        return swedishBbanMaskNoFormat
      case 'swedishBankgiro':
        return swedishBankgiroMaskDigitsOnly
      case 'swedishPlusgiro':
        return swedishPlusgiroMaskDigitsOnly
      case 'iban':
        return ibanMaskNoFormat
      case 'norwegianBban':
      default:
        return norwegianBbanMaskNoFormat
    }
  }

  switch (bankAccountType) {
    case 'swedishBban':
      return swedishBbanMask
    case 'swedishBankgiro':
      return buildSwedishBankgiroMask(value)
    case 'swedishPlusgiro':
      return buildSwedishPlusgiroMask(value)
    case 'iban':
      return ibanMask
    case 'norwegianBban':
    default:
      return norwegianBbanMask
  }
}

export function getInputMode(
  bankAccountType: BankAccountType,
): 'numeric' | 'text' {
  if (bankAccountType === 'iban') {
    return 'text'
  }
  return 'numeric'
}

export function getWidth(
  bankAccountType: BankAccountType,
): FieldBlockWidth {
  switch (bankAccountType) {
    case 'iban':
      return 'large'
    default:
      return 'medium'
  }
}

export function hasVariableMask(
  bankAccountType: BankAccountType,
): boolean {
  return (
    bankAccountType === 'swedishBankgiro' ||
    bankAccountType === 'swedishPlusgiro'
  )
}
