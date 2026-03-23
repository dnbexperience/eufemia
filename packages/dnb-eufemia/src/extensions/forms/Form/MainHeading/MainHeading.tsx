import React from 'react'
import clsx from 'clsx'
import useId from '../../../../shared/helpers/useId'
import Heading from '../../../../components/heading/Heading'
import type { HelpProps } from '../../../../components/help-button/HelpButtonInline'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../../../../components/help-button/HelpButtonInline'
import type { HeadingLevel } from '../../../../components/heading/Heading'
import type { ComponentProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FormMainHeadingProps = ComponentProps & {
  level?: HeadingLevel
  help?: HelpProps
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'size'>

function MainHeading({ level, ...props }: FormMainHeadingProps) {
  const { help, className, children, ...rest } = props
  const helpId = useId()
  const hasHelp = help?.title || help?.content

  return (
    <>
      <Heading
        className={clsx('dnb-forms-main-heading', className)}
        level={level || 2}
        skipCorrection
        size="large"
        {...rest}
      >
        {children}
        {hasHelp && (
          <HelpButtonInline
            left="x-small"
            contentId={helpId}
            help={help}
          />
        )}
      </Heading>

      {hasHelp && (
        <HelpButtonInlineContent
          top="x-small"
          contentId={helpId}
          help={help}
        />
      )}
    </>
  )
}

withComponentMarkers(MainHeading, {
  _supportsSpacingProps: true,
  _isHeadingElement: true,
})

export default MainHeading
