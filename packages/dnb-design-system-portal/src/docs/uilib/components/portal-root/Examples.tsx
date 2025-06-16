/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { P, PortalRoot } from '@dnb/eufemia/src'

export const PortalRootExample = () => (
  <ComponentBox>
    <PortalRoot>
      <div
        style={{
          position: 'fixed',
          top: '16rem',
          right: '1rem',
          width: '8rem',
          height: '8rem',
          placeContent: 'center',
          textAlign: 'center',
          backgroundColor: 'red',
          zIndex: 4000,
        }}
      >
        <P>My content</P>
      </div>
    </PortalRoot>
  </ComponentBox>
)
