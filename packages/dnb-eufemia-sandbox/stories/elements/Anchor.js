/**
 * @dnb/eufemia Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import { Anchor, H1, P } from '@dnb/eufemia/src/elements'
import { IconPrimary } from '@dnb/eufemia/src'

export default {
  title: 'Eufemia/Elements/Anchor'
}

export const AnchorSandbox = () => {
  const ref = React.useRef()
  React.useEffect(() => {
    console.log('ref', ref.current)
  }, [])
  return (
    <Wrapper>
      <Box>
        <P>
          Quam vitae nisi at accumsan per vehicula montes nam hendrerit{' '}
          <Anchor ref={ref} href="http://dnb.no" target="_blank">
            Blank taget - tempor ut quam nascetur hendrerit
          </Anchor>{' '}
          porttitor feugiat fusce fringilla justo dui torquent potenti
          montes hendrerit
        </P>
        <H1>
          <Anchor href="http://dnb.no" target="_blank">
            Blank taget
          </Anchor>
        </H1>
        <Anchor
          className="dnb-anchor--no-icon"
          href="http://dnb.no"
          target="_blank"
        >
          <IconPrimary icon="add" />
        </Anchor>{' '}
        <Anchor href="http://dnb.no" target="_blank">
          x <IconPrimary icon="add" />
        </Anchor>
      </Box>
      <Box>
        <a className="dnb-anchor" href="http://dnb.no">
          <IconPrimary icon="chevron_left" /> Anchor
        </a>
      </Box>
      <Box>
        <a className="dnb-anchor" href="http://dnb.no">
          Anchor <IconPrimary icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor dnb-anchor--hover">
          Hover Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor dnb-anchor--active">
          Active Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor dnb-anchor--focus">
          Focus Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor dnb-anchor--animation">
          With a special Animation (is removed from the styles)
        </a>
      </Box>
      <Box>
        <a className="dnb-anchor" href="http://dnb.no">
          Default Anchor - Adipiscing per egestas duis feugiat dignissim
          quam cras eget non est ante purus taciti volutpat mi phasellus
          rhoncus ridiculus diam at proin fusce bibendum netus dapibus
          natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a
          href="http://dnb.no"
          className="dnb-anchor dnb-anchor--animation"
        >
          Anchor with Animation <IconPrimary icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a
          href="http://dnb.no"
          className="dnb-anchor dnb-anchor--animation"
        >
          Anchor with Animation - Adipiscing per egestas duis feugiat
          dignissim quam cras eget non est ante purus taciti volutpat mi
          phasellus rhoncus ridiculus diam at proin fusce bibendum netus
          dapibus natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a
          href="http://dnb.no"
          className="dnb-anchor dnb-anchor--animation"
          style={{ whiteSpace: 'normal' }}
        >
          Anchor with Animation and no `white-space: pre;` - Adipiscing per
          egestas duis feugiat dignissim quam cras eget non est ante purus
          taciti volutpat mi phasellus rhoncus ridiculus diam at proin
          fusce bibendum netus dapibus natoque varius eros litora
        </a>
      </Box>
    </Wrapper>
  )
}
