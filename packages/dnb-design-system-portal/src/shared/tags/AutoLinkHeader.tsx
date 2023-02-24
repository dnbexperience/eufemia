import React from 'react'
import classnames from 'classnames'
import AnchorLink from './Anchor'
import { Heading } from '@dnb/eufemia/src'
import { makeSlug } from '../../uilib/utils/slug'
import { useLocation, WindowLocation } from '@reach/router'
import { anchorLinkStyle } from './AutoLinkHeader.module.scss'

type AutoLinkHeaderProps = {
  level?: number | string
  title?: string
  element?: string
  useSlug?: string
  className?: string
  children: React.ReactNode
  addToSearchIndex?: ({
    location,
    title,
    hash,
  }: {
    location?: WindowLocation
    title?: string | React.ReactNode
    hash?: string
  }) => void
}

const AutoLinkHeader = ({
  level = '1',
  element,
  useSlug,
  children,
  title,
  className,
  addToSearchIndex,
  ...props
}: AutoLinkHeaderProps) => {
  const location = useLocation()
  const id = makeSlug(children, useSlug)

  if (typeof children === 'string' && /\{#(.*)\}/.test(children)) {
    children = children.replace(/\{#(.*)\}/g, '').trim()
  }

  const clickHandler =
    className && /skip-anchor/g.test(String(className))
      ? null
      : () => {
          if (typeof window !== 'undefined' && id) {
            try {
              window.history.replaceState(undefined, undefined, `#${id}`)
            } catch (e) {
              console.log('Could not call replaceState:', e)
            }
          }
        }

  return (
    <Heading
      level={level}
      element={element}
      className={classnames(anchorLinkStyle, className)}
      {...props}
    >
      {clickHandler && id && (
        <AnchorLink
          className="anchor-hash"
          tooltip="Click to set an Anchor URL"
          id={id}
          href={`#${id}`}
          onClick={clickHandler}
          aria-hidden
        >
          #
        </AnchorLink>
      )}
      {typeof addToSearchIndex === 'function'
        ? addToSearchIndex({
            location,
            title: React.isValidElement(children) ? title : children,
            hash: id,
          })
        : children}
    </Heading>
  )
}

export default AutoLinkHeader
