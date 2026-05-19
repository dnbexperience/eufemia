import Anchor from '../../components/Anchor'
import Button from '../button/Button'
import Span from '../../elements/Span'
import type { SpacingProps } from '../../shared/types'
import { useSpacing } from '../space/SpacingUtils'

export type UploadFileLinkProps = UploadFileAnchorProps &
  UploadFileButtonProps

export const UploadFileLink = (props: UploadFileLinkProps) => {
  const { onClick, text, href, download, ...rest } = props

  if (!onClick && !href) {
    return (
      <Span className="dnb-p" {...rest}>
        {text}
      </Span>
    )
  }

  if (onClick) {
    return <UploadFileButton text={text} onClick={onClick} {...rest} />
  }

  return (
    <UploadFileAnchor
      text={text}
      href={href}
      download={download}
      {...rest}
    />
  )
}

export default UploadFileLink

type UploadFileButtonProps = {
  text: string
  onClick?: () => void
} & SpacingProps

const UploadFileButton = (props: UploadFileButtonProps) => {
  const { text, onClick } = props

  return (
    <Button
      size="small"
      icon={false}
      variant="tertiary"
      onClick={onClick}
      {...useSpacing(props, {})}
    >
      {text}
    </Button>
  )
}

type UploadFileAnchorProps = {
  text: string
  href: string
  download?: boolean
} & SpacingProps

const UploadFileAnchor = (props: UploadFileAnchorProps) => {
  const { text, href, download } = props

  return (
    <Anchor
      target="_blank"
      href={href}
      download={download ? text : null}
      {...useSpacing(props, {
        className: 'dnb-anchor--no-launch-icon',
      })}
      rel="noopener noreferrer"
    >
      {text}
    </Anchor>
  )
}
