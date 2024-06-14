import { IconIcon } from './Icon'

// to replace icon names
export const iconCase = (name: IconIcon) =>
  String(name)
    .replace(/((?!^)[A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^[0-9]/g, '$1')
    .replace(/[^a-z0-9_]/gi, '_')
