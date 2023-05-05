import type { LocaleProps, SpacingProps } from '../../shared/types'

export type ErrorCardProps = {
  /** Element title */
  title: React.ReactNode
  /** Element message */
  message: React.ReactNode
  /** function  */
  onTryAgainClick?: () => void
  /** custom style option for the root element of the component  */
  className?: string
  /** styling properties */
  variant?: 'default' | 'slim'
  isCentered?: boolean
  /** Option for adding additional buttons or other elements */
  customActions?: React.ReactNode
  /** try again button text */
  tryAgainButtonText?: React.ReactNode
  /** image alt text */
  connectionLostImageAlt?: string
}

export type ErrorCardAllProps = ErrorCardProps &
  SpacingProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>
