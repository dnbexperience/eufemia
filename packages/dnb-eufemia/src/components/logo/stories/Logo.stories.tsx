/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Logo } from '../..'
import { Theme } from '../../../shared'

export default {
  title: 'Eufemia/Components/Logo',
}

export const LogoSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Logo size="80" style={{ color: 'var(--color-fire-red)' }} />
      </Box>
      <Box>
        <h1 className="dnb-h--xx-large">
          H1 with the DNB Logo <Logo />
        </h1>
        <p className="dnb-p">
          Text with the DNB Logo <Logo />
        </p>
        <div style={{ height: '1rem' }}>
          Text with the DNB Logo <Logo inheritSize />
        </div>
        <div style={{ height: '5rem' }}>
          Text with the DNB Logo <Logo inheritSize />
        </div>
      </Box>
      color property text value:
      <Box>
        <Logo color="blue" />
        <Logo color="green" />
        <Logo color="red" />
        <Logo color="orange" />
      </Box>
      color property hex value:
      <Box>
        <Logo color="#00343E" />
        <Logo color="#14555A" />
        <Logo color="#007272" />
        <Logo color="#A5E1D2" />
        <Logo color="#28B482" />
        <Logo color="#FDBB31" />
        <Logo color="#23195A" />
        <Logo color="#6E2382" />
      </Box>
      color property rgb value:
      <Box>
        <Logo color="rgb(0,52,62)" />
        <Logo color="rgb(20,85,90)" />
        <Logo color="rgb(0,114,114)" />
        <Logo color="rgb(165,225,210)" />
        <Logo color="rgb(40,180,130)" />
        <Logo color="rgb(253,187,49)" />
        <Logo color="rgb(35,25,90)" />
        <Logo color="rgb(110,35,130)" />
      </Box>
      color property CSS Custom Properties name:
      <Box>
        <Logo color="var(--color-ocean-green)" />
        <Logo color="var(--color-emerald-green)" />
        <Logo color="var(--color-sea-green)" />
        <Logo color="var(--color-mint-green)" />
        <Logo color="var(--color-summer-green)" />
        <Logo color="var(--color-accent-yellow)" />
        <Logo color="var(--color-indigo)" />
        <Logo color="var(--color-violet)" />
      </Box>
      <Box>
        <>
          {[...Array(2)].map((_, i) => {
            return <Logo key={i} height={`${(i + 1) * 1.2}rem`} />
          })}
        </>
        <br />
        <>
          {[...Array(2)].map((_, i) => {
            return <Logo key={i} width={`${(i + 1) * 1.2}rem`} />
          })}
        </>
      </Box>
    </Wrapper>
  )
}
