/**
 * Web GlobalError Component
 *
 */

import { useContext } from 'react'
import type { HTMLAttributes, HTMLProps, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { GetTranslationProps } from '../../shared/Context'
import Context from '../../shared/Context'
import {
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'
import Anchor from '../anchor/Anchor'
import type { SkeletonShow } from '../skeleton/Skeleton'
import Skeleton from '../skeleton/Skeleton'
import Heading from '../heading/Heading'
import { P } from '../../elements'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type GlobalErrorLink = {
  text: string
  url: string
}

export type GlobalErrorProps = {
  /**
   * Defines a status code as a string. When `404` or `500` is given, predefined `text` and `title` will be shown. Defaults to `404`.
   */
  statusCode?: '404' | '500' | string

  /**
   * Overwrites the default title for the provided `statusCode`.
   */
  title?: ReactNode

  /**
   * Overwrites the default text for the provided `statusCode`.
   */
  text?: ReactNode

  /**
   * Overwrites the default error message code text `Feilmeldings-kode: %statusCode`.
   */
  errorMessageCode?: ReactNode

  /**
   * Overwrites the default additional help text `Her er noen lenker som kanskje kan hjelpe:`. This text is only rendered when `links` are provided.
   */
  help?: ReactNode

  /**
   * Provide an array with objects `{ text: "Text", url: "https://..." }` to display a list of anchor links.
   */
  links?: Array<GlobalErrorLink>

  /**
   * If `true`, it will use `80vh` as the height and center its content.
   */
  center?: boolean

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
}

export type GlobalErrorAllProps = GlobalErrorProps &
  Omit<HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps &
  GetTranslationProps

export type GlobalErrorTranslationContent = {
  /**
   * Overwrites the default title for the provided `statusCode`.
   */
  title?: ReactNode

  /**
   * Overwrites the default text for the provided `statusCode`.
   */
  text?: ReactNode
}
export type GlobalErrorTranslation = {
  404?: GlobalErrorTranslationContent
  500?: GlobalErrorTranslationContent
}

const defaultProps: Partial<GlobalErrorAllProps> = {
  statusCode: '404',
}

export default function GlobalError(localProps: GlobalErrorAllProps) {
  // Every component should have a context
  const context = useContext(Context)

  const translation = context.getTranslation(localProps)
    .GlobalError as GlobalErrorTranslation

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.GlobalError,
    translation,
    translation[localProps.statusCode || defaultProps.statusCode],
    { skeleton: context?.skeleton }
  )

  const {
    statusCode,
    skeleton,
    center,
    className,

    title,
    help,
    errorMessageCode,
    links,
    text,

    ...attributes
  } = allProps

  // Security: Always render text as children to prevent XSS attacks.
  // If formatting is needed, pass ReactNode instead of HTML strings.
  const textParams: HTMLAttributes<HTMLElement> = {
    children: text,
  }

  const params = useSpacing(attributes, {
    className: clsx(
      'dnb-global-error',
      `dnb-global-error--${statusCode}`,
      center && 'dnb-global-error--center',
      className
    ),
  }) as Record<string, unknown>

  const additionalContent = processChildren(allProps)

  return (
    <Skeleton
      {...attributes}
      {...params}
      show={skeleton}
      element="section"
    >
      <div className="dnb-global-error__inner">
        <div className="dnb-global-error__inner__content">
          <Heading size="x-large" top bottom>
            {title}
          </Heading>
          <P bottom {...textParams} />
          {errorMessageCode && statusCode && (
            <P bottom className="dnb-global-error__status">
              {String(errorMessageCode).replace('%statusCode', statusCode)}
            </P>
          )}
          {help && links?.length > 0 && (
            <P top="medium" bottom>
              {help}
            </P>
          )}
          {help && links?.length > 0 && (
            <P bottom="large" className="dnb-global-error__links">
              {links.map(({ text, url }) => {
                return (
                  <Anchor key={text} href={url}>
                    {text}
                  </Anchor>
                )
              })}
            </P>
          )}
        </div>
        {additionalContent}
      </div>
    </Skeleton>
  )
}

withComponentMarkers(GlobalError, { _supportsSpacingProps: true })
