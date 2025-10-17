/**
 * Web GlobalError Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context, { GetTranslationProps } from '../../shared/Context'
import {
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Anchor from '../anchor/Anchor'
import Skeleton, { SkeletonShow } from '../skeleton/Skeleton'
import { H1, P } from '../../elements'
import type { SpacingProps } from '../../shared/types'

export type GlobalErrorLink = {
  text: string
  url: string
}

export type GlobalErrorProps = {
  /**
   * When `404` or `500` is given, a predefined text will be shown.
   * Defaults to `404`.
   */
  statusCode?: '404' | '500' | string

  /**
   * Will overwrite the default title.
   */
  title?: React.ReactNode

  /**
   * Will overwrite the default text.
   */
  text?: React.ReactNode

  /**
   * Will overwrite the default error message code.
   */
  errorMessageCode?: React.ReactNode

  /**
   * Will overwrite the default additional help text.
   */
  help?: React.ReactNode

  /**
   * Provide an array with objects `{ text: 'Text', url: 'https://...' }` to display a list of anchor links.
   */
  links?: Array<GlobalErrorLink>

  /**
   * If true, it will use 80vh as the height and center its content.
   */
  center?: boolean

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow
}

export type GlobalErrorAllProps = GlobalErrorProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps &
  GetTranslationProps

export type GlobalErrorTranslationContent = {
  /**
   * Defining a `title` will overwrite the default provided by `status_content`.
   */
  title?: React.ReactNode

  /**
   * Defining a `text` will overwrite the default provided by `status_content`.
   */
  text?: React.ReactNode
}
export type GlobalErrorTranslation = {
  404?: GlobalErrorTranslationContent
  500?: GlobalErrorTranslationContent
}

const defaultProps = {
  statusCode: '404',
}

export default function GlobalError(localProps: GlobalErrorAllProps) {
  // Every component should have a context
  const context = React.useContext(Context)

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
  const textParams: React.HTMLAttributes<HTMLElement> = {
    children: text,
  }

  const params = {
    className: classnames(
      'dnb-global-error',
      `dnb-global-error--${statusCode}`,
      center && 'dnb-global-error--center',
      createSpacingClasses(attributes),
      className
    ),
    ...attributes,
  } as Record<string, unknown>

  const additionalContent = processChildren(allProps)

  return (
    <Skeleton {...params} show={skeleton} element="section">
      <div className="dnb-global-error__inner">
        <div className="dnb-global-error__inner__content">
          <H1 size="x-large" top bottom>
            {title}
          </H1>
          <P bottom {...textParams} />
          {errorMessageCode && (
            <P bottom className="dnb-global-error__status">
              {String(errorMessageCode).replace('%statusCode', statusCode)}
            </P>
          )}
          {help && links?.length && (
            <P top="medium" bottom>
              {help}
            </P>
          )}
          {help && links?.length && (
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

GlobalError._supportsSpacingProps = true
