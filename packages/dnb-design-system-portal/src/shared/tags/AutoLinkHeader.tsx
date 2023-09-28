import React from 'react'
import classnames from 'classnames'
import Anchor from './Anchor'
import Heading, {
  HeadingAllProps,
} from '@dnb/eufemia/src/components/Heading'
import { makeSlug } from '../../uilib/utils/slug'
import { useLocation } from '@reach/router'
import { anchorLinkStyle } from './AutoLinkHeader.module.scss'

type AutoLinkHeaderProps = {
  element?: string
  useSlug?: string
  addToSearchIndex?: ({
    location,
    title,
    hash,
  }: {
    location?: Location
    title?: string | React.ReactNode
    hash?: string
  }) => void
} & Omit<HeadingAllProps, 'ref'>

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
      <>
        {clickHandler && id && (
          <Anchor
            className="anchor-hash"
            tooltip="Click to set an Anchor URL"
            id={id}
            href={`#${id}`}
            onClick={clickHandler}
            aria-hidden
          >
            #
          </Anchor>
        )}
        {typeof addToSearchIndex === 'function'
          ? addToSearchIndex({
              location,
              title: React.isValidElement(children) ? children : title,
              hash: id,
            })
          : children}
      </>
    </Heading>
  )
}

export default AutoLinkHeader
