/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { ScrollView } from '@dnb/eufemia/src/fragments'

export const ScrollViewInteractive = () => (
  <ComponentBox>
    <ScrollView interactive={true} style={{ maxHeight: '10rem' }}>
      <div
        style={{
          minHeight: 800,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background:
            'linear-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%) 0 0/100% 200%',
        }}
      >
        large content
      </div>
    </ScrollView>
  </ComponentBox>
)
