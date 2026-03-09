/**
 * VippsWalletButton Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Button, { type ButtonProps } from '../../components/button/Button'
import useTranslation from '../../shared/useTranslation'
import { SubmitIndicator } from '../forms/Form'

export type VippsWalletButtonProps = Omit<ButtonProps, 'variant'> & {
  pending?: boolean
}

const messages = {
  'nb-NO': {
    VippsWalletButton: {
      text: 'Legg til i',
    },
  },
  'en-GB': {
    VippsWalletButton: {
      text: 'Add to',
    },
  },
  'sv-SE': {
    VippsWalletButton: {
      text: 'Lägg till i',
    },
  },
  'da-DK': {
    VippsWalletButton: {
      text: 'Tilføj til',
    },
  },
}

export default function VippsWalletButton({
  className,
  pending,
  ...props
}: VippsWalletButtonProps) {
  const {
    VippsWalletButton: translation = messages['nb-NO'].VippsWalletButton,
  } = useTranslation({ messages })
  const buttonText = translation?.text

  const indicatorState = pending ? 'pending' : undefined

  return (
    <Button
      {...props}
      variant="primary"
      className={classnames('dnb-vipps-wallet-button', className, {
        pending: pending,
      })}
      disabled={props.disabled || indicatorState === 'pending'}
    >
      {buttonText} <VippsLogo />{' '}
      <SubmitIndicator
        state={indicatorState}
        className="dnb-vipps-wallet-button-submitindicator"
      />
    </Button>
  )
}

export function VippsLogo() {
  return (
    <svg
      width="64"
      height="16"
      viewBox="0 0 64 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vipps"
    >
      <path
        d="M34.088 0C36.392 0.0001 39.087 1.8991 39.087 5.96C39.087 10.2022 36.495 12.2627 33.841 12.2627C32.422 12.2627 31.167 11.717 30.2 10.4239V16H27.3V0.323299H30.2V1.919C31.003 0.828099 32.257 0 34.088 0ZM48.016 0C50.32 0.0003 53.014 1.8993 53.014 5.96C53.014 10.2021 50.422 12.2626 47.769 12.2627C46.349 12.2627 45.094 11.717 44.127 10.4239V16H41.227V0.323299H44.128V1.919C44.93 0.828099 46.185 0 48.016 0ZM12.24 6.586C12.796 6.2022 13.557 6.3635 14.051 7.0909C15.285 8.8685 16.869 10.0811 18.905 10.0811C20.901 10.081 22.032 9.1311 23.102 7.7579C23.677 7.0106 24.439 6.8683 24.953 7.2725C25.508 7.6968 25.529 8.4647 24.953 9.212C23.411 11.2322 21.436 12.4443 18.905 12.4444C16.149 12.4444 13.782 10.9495 12.075 8.3838C11.603 7.7171 11.726 6.9496 12.24 6.586ZM59.145 0C61.531 0 63.28 1.0912 64 3.8389L61.387 4.2422C61.346 2.8486 60.462 2.4249 59.207 2.4248C58.22 2.4248 57.499 2.8489 57.499 3.5157C57.499 4.0407 57.87 4.5862 58.98 4.7881L60.976 5.1514C62.93 5.5156 63.979 6.768 63.979 8.4854C63.979 11.0103 61.654 12.2627 59.474 12.2627C57.17 12.2627 54.619 11.0905 54.208 8.2422L56.82 7.8379C56.964 9.3128 57.89 9.8389 59.371 9.8389C60.502 9.8389 61.264 9.4346 61.264 8.7276C61.264 8.1013 60.914 7.6362 59.68 7.4141L57.869 7.0909C55.956 6.7472 54.784 5.4136 54.784 3.7168C54.784 1.0907 57.211 0.0001 59.145 0ZM5.925 8.1612L8.64 0.302799H11.828L7.097 11.959H4.731L0 0.302799H3.188L5.925 8.1612ZM33.183 2.5049C31.599 2.505 30.2 3.6161 30.2 6.1006C30.2 8.4845 31.599 9.7372 33.162 9.7373C34.643 9.7373 36.166 8.5654 36.166 6.1006C36.166 3.6764 34.643 2.5049 33.183 2.5049ZM47.11 2.5049C45.526 2.5049 44.127 3.616 44.127 6.1006C44.127 8.4846 45.526 9.7373 47.09 9.7373C48.571 9.7373 50.093 8.5654 50.093 6.1006C50.093 3.6765 48.571 2.505 47.11 2.5049ZM21.004 2.0606C21.868 2.0607 22.608 2.7074 22.608 3.6368C22.608 4.5657 21.868 5.2119 21.004 5.212C20.14 5.212 19.4 4.5658 19.399 3.6368C19.399 2.7074 20.14 2.0606 21.004 2.0606Z"
        fill="#ff5b24"
      />
    </svg>
  )
}
