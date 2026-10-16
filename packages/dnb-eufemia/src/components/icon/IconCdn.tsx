import type { CSSProperties } from 'react'
import type { IconProps } from './Icon'
import type { ContextProps } from '../../shared/Context'
import { iconCase } from './IconHelpers'

const defaultDirectory = 'https://assets.eufemia.dnb.no/icons/dnb'

export function renderCdnIcon({
  icon,
  iconBaseUrl,
  size,
  inheritColor,
  iconParams,
}: IconProps & {
  icon: string
  iconParams: Record<string, unknown>
  iconBaseUrl?: ContextProps['iconBaseUrl']
}) {
  if (icon.startsWith('data:image/')) {
    return undefined
  }

  if (iconBaseUrl === false || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(icon)) {
    return null
  }

  const directory = iconBaseUrl ?? defaultDirectory
  let url: URL
  try {
    url = new URL(directory, 'https://eufemia.dnb.no')
  } catch {
    return null
  }
  if (
    !(directory.startsWith('/') && !directory.startsWith('//')) &&
    !directory.startsWith('https://')
  ) {
    return null
  }
  if (url.username || url.password || url.search || url.hash) {
    return null
  }

  let name = iconCase(icon)
  if (
    !name.endsWith('_medium') &&
    (['medium', 'large', 'x-large', 'xx-large'].includes(String(size)) ||
      parseFloat(String(size)) >= 24)
  ) {
    name += '_medium'
  }

  // URL serialization keeps the value safe for a quoted CSS URL.
  url.pathname = `${url.pathname.replace(/\/$/, '')}/${name}.svg`
  const src = directory.startsWith('/') ? url.pathname : url.href
  const style: CSSProperties = {
    width: (iconParams.width as CSSProperties['width']) ?? '1em',
    height: (iconParams.height as CSSProperties['height']) ?? '1em',
    color:
      typeof iconParams.color === 'string' ? iconParams.color : undefined,
  }

  const image = `url("${src}")`
  return (
    <span
      className={`dnb-icon__cdn${inheritColor === false ? '' : ' dnb-icon__cdn--mask'}`}
      style={{
        ...style,
        ...(inheritColor === false
          ? { backgroundImage: image }
          : { maskImage: image, WebkitMaskImage: image }),
      }}
    />
  )
}
