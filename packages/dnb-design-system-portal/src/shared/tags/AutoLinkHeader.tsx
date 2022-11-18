import React from 'react'
import classnames from 'classnames'
import { AnchorLink } from './Anchor'
import { Heading } from '@dnb/eufemia/src'
import { makeSlug } from '../../uilib/utils/slug'
import { Location, WindowLocation } from '@reach/router'
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
          offset="100"
          className="dnb-anchor anchor"
          title="Click to set a Anchor URL"
          id={id}
          href={`#${id}`}
          onClick={clickHandler}
          aria-hidden
        >
          #
        </AnchorLink>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Location>
        {({ location }) => {
          if (typeof addToSearchIndex === 'function') {
            addToSearchIndex({
              location,
              title: React.isValidElement(children) ? title : children,
              hash: id,
            })
          }
          return children
        }}
      </Location>
    </Heading>
  )
}

export default AutoLinkHeader
