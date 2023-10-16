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
import { H1, P, Code } from '../../elements'
import type { SpacingProps } from '../../shared/types'

export type GlobalErrorLink = {
  text: string
  url: string
}

export type GlobalErrorProps = {
  /**
   * When `404` or `500` is given, a predefined text will be shown.
   * Defaults to `400`.
   */
  status?: '404' | '500' | string

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
  code?: React.ReactNode

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
  status: '404',
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
    translation[localProps.status || defaultProps.status],
    { skeleton: context?.skeleton }
  )

  const {
    status,
    skeleton,
    center,
    className,

    title,
    help,
    code,
    links,
    text,

    ...attributes
  } = allProps

  const textParams: React.HTMLAttributes<HTMLElement> = {}
  if (typeof text === 'string') {
    textParams.dangerouslySetInnerHTML = { __html: text }
  } else {
    textParams.children = text
  }

  const spacingClasses = createSpacingClasses(attributes)

  const params = {
    className: classnames(
      'dnb-global-error',
      `dnb-global-error--${status}`,
      center && 'dnb-global-error--center',
      createSpacingClasses(attributes),
      className,
      spacingClasses
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
          {code && (
            <P bottom className="dnb-global-error__status">
              {code} <Code>{status}</Code>
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
