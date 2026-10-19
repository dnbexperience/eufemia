import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { IconProps } from './Icon'
import type { ContextProps } from '../../shared/Context'
import { iconCase } from './IconHelpers'
import { getVersion } from '../../shared/build-info/BuildInfo'
import { warn } from '../../shared/component-helper'

const assetBaseUrl = 'https://assets.eufemia.dnb.no'
const defaultDirectory = `${assetBaseUrl}/icons/dnb`
const warnedUrls = new Set<string>()

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

  const version = getVersion()
  const isRelease =
    /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version) &&
    version !== '0.0.0-development'
  const directory =
    iconBaseUrl ??
    (isRelease
      ? `${assetBaseUrl}/v${version}/icons/dnb`
      : defaultDirectory)
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
  const fallbackSrc =
    iconBaseUrl === undefined && isRelease
      ? `${defaultDirectory}/${name}.svg`
      : undefined

  return (
    <CdnIcon
      key={`${src}:${fallbackSrc ?? ''}`}
      src={src}
      fallbackSrc={fallbackSrc}
      inheritColor={inheritColor}
      style={style}
    />
  )
}

function CdnIcon({
  src,
  fallbackSrc,
  inheritColor,
  style,
}: {
  src: string
  fallbackSrc?: string
  inheritColor?: boolean
  style: CSSProperties
}) {
  const [failed, setFailed] = useState(false)
  const currentSrc = failed ? fallbackSrc : src
  const canFallBack = Boolean(fallbackSrc) && !failed

  useEffect(() => {
    const isDevelopment =
      typeof process !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    if (!canFallBack && !isDevelopment) {
      return undefined
    }

    // Versioned assets can become available shortly after the package release.
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onerror = () => {
      if (canFallBack) {
        setFailed(true)
      } else if (!warnedUrls.has(currentSrc)) {
        warnedUrls.add(currentSrc)
        warn(
          `Icon could not be loaded from ${currentSrc}. Check the icon name and the img-src rule of your Content Security Policy, or import the icon instead.`
        )
      }
    }
    image.src = currentSrc
    return () => {
      image.onerror = null
    }
  }, [currentSrc, canFallBack])

  const image = `url("${currentSrc}")`
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
