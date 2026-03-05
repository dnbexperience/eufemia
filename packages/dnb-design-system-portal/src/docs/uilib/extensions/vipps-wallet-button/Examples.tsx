/**
 * UI lib Extension Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import VippsWalletButton from '@dnb/eufemia/src/extensions/vipps-wallet-button/VippsWalletButton'
import '@dnb/eufemia/src/extensions/vipps-wallet-button/style/dnb-vipps-wallet-button.scss'

export const VippsWalletButtonExample = () => (
  <ComponentBox scope={{ VippsWalletButton }}>
    <VippsWalletButton
      onClick={() => {
        console.log('VippsWalletButton clicked')
      }}
      data-visual-test="vipps-wallet-button"
    />
  </ComponentBox>
)

export const VippsWalletButtonPendingExample = () => (
  <ComponentBox scope={{ VippsWalletButton }}>
    <VippsWalletButton
    pending
      onClick={() => {
        console.log('VippsWalletButton clicked')
      }}
      data-visual-test="vipps-wallet-button-pending"
    />
  </ComponentBox>
)
