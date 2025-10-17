/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { P, Logo } from '@dnb/eufemia/src'
import { Theme } from '@dnb/eufemia/src/shared'

export const ThemeBasis = () => (
  <ComponentBox scope={{ Theme }} data-visual-test="theme-basis">
    {() => {
      return (
        <Theme name="sbanken">
          <Logo height="40" />
        </Theme>
      )
    }}
  </ComponentBox>
)

export const ThemeMapping = () => (
  <ComponentBox
    scope={{ P, Theme }}
    // data-visual-test="theme-basis"
  >
    {() => {
      const MyMapping = styled.div`
        .eufemia-theme__sbanken.eufemia-theme__prop-mapping--my-mapping {
          --color-sea-green: var(--sb-color-purple-alternative);
        }
      `
      const CustomComponent = styled(P)`
        color: var(--color-sea-green);
      `
      return (
        <MyMapping>
          <Theme name="sbanken">
            <Theme propMapping="my-mapping">
              <CustomComponent>Text with custom color</CustomComponent>
            </Theme>
          </Theme>
        </MyMapping>
      )
    }}
  </ComponentBox>
)
