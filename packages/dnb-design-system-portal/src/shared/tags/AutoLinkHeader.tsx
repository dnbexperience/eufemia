import { isValidElement, useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { clsx } from 'clsx'
import Anchor from './Anchor'
import Heading, {
  type HeadingAllProps,
} from '@dnb/eufemia/src/components/Heading'
import { makeSlug } from '../../uilib/utils/slug'
import { useLocation } from 'react-router'
import {
  anchorLinkStyle,
  headingContentStyle,
} from './AutoLinkHeader.module.scss'

type AutoLinkHeaderProps = {
  element?: string
  useSlug?: string
  addToSearchIndex?: ({
    location,
    title,
    hash,
  }: {
    location?: { pathname: string; search: string; hash: string }
    title?: string | ReactNode
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
  const [anchorUrlSet, setAnchorUrlSet] = useState(false)
  const tooltipTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => clearTimeout(tooltipTimeoutRef.current)
  }, [])

  if (typeof children === 'string' && /\{#(.*)\}/.test(children)) {
    children = children.replace(/\{#(.*)\}/g, '').trim()
  }

  const accessibleTitle =
    typeof children === 'string'
      ? children
      : typeof title === 'string'
        ? title
        : id

  const clickHandler =
    className && /skip-anchor/g.test(String(className))
      ? null
      : (event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault()

          if (typeof window !== 'undefined' && id) {
            try {
              window.history.replaceState(undefined, undefined, '#' + id)

              setAnchorUrlSet(true)
              clearTimeout(tooltipTimeoutRef.current)
              tooltipTimeoutRef.current = setTimeout(
                () => setAnchorUrlSet(false),
                2000
              )
            } catch (e) {
              console.error('Could not call replaceState:', e)
            }
          }
        }

  return (
    <Heading
      level={level}
      element={element}
      className={clsx(anchorLinkStyle, className)}
      aria-label={accessibleTitle}
      {...props}
    >
      <span className={headingContentStyle}>
        <>
          {typeof addToSearchIndex === 'function'
            ? addToSearchIndex({
                location,
                title: isValidElement(children) ? children : title,
                hash: id,
              })
            : children}
        </>
        {clickHandler && id && (
          <Anchor
            className="anchor-hash"
            tooltip={
              anchorUrlSet ? 'Copied' : 'Click to set an Anchor URL'
            }
            id={id}
            href={`#${id}`}
            onClick={clickHandler}
            aria-label={'Link to ' + accessibleTitle}
          >
            #
          </Anchor>
        )}
      </span>
    </Heading>
  )
}

export default AutoLinkHeader
