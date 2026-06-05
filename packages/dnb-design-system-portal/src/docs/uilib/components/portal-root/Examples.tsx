/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { P, PortalRoot, Dropdown } from '@dnb/eufemia/src'
import { GoogleTranslate } from '@dnb/eufemia/src/shared'

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
    <P>Do you see the red box?</P>
  </ComponentBox>
)

export const GoogleTranslateExample = () => (
  <ComponentBox scope={{ GoogleTranslate }}>
    <GoogleTranslate off>
      <Dropdown
        label="Velg farge"
        data={['Rød', 'Blå', 'Grønn', 'Gul', 'Hvit', 'Svart']}
      />
    </GoogleTranslate>
  </ComponentBox>
)
