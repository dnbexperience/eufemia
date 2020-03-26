/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Button } from '../../src/components'

export default [
  'Buttons',
  () => (
    <Wrapper>
      <Box>
        <span className="dnb-p">text</span>{' '}
        <Button text="Primary" icon="add" bounding />
      </Box>
      <Box>
        <Button text="Primary" icon="add" disabled />
      </Box>
      <Box>
        <Button
          text="Secondary"
          variant="secondary"
          icon="add"
          right="small"
        />
        <Button
          variant="secondary"
          text="Secondary button with href"
          href="?no-cache=1"
          icon="add"
          onClick={(e) => e.preventDefault()}
        />
      </Box>
      <Box>
        <Button
          variant="secondary"
          text="Secondary Button"
          icon="chevron_right_medium"
          size="large"
          right
        />
        <Button icon="chevron_right" size="large" />
      </Box>
      <Box>
        <Button
          variant="secondary"
          text="Secondary Button"
          icon="chevron_right_medium"
          right
        />
        <Button
          variant="secondary"
          text="Secondary Button"
          icon="chevron_right_medium"
          right
          disabled
        />
        <Button icon="chevron_right" icon_size="medium" size="default" />
        <Button
          icon="chevron_right"
          icon_size="medium"
          size="default"
          status="error"
          left
        />
      </Box>
      <Box>
        <Button
          icon="chevron_right"
          icon_size="medium"
          size="default"
          status="Hello"
          disabled
          // left
        />
      </Box>
      <Box>
        <Button text="Signal" variant="signal" icon="add" />
        <Button text="Signal" variant="signal" icon="add" disabled />
      </Box>
      <Box>
        <span className="dnb-p">text</span>{' '}
        <Button
          text="Button text"
          variant="tertiary"
          icon_position="left"
          icon="chevron_left"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon="chevron_right"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon_position="left"
          icon="chevron_left"
          icon_size="medium"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon="chevron_right"
          icon_size="medium"
        />
        <Button
          text="Button text"
          variant="tertiary"
          icon="chevron_right"
          icon_size="medium"
          disabled
        />
        <span className="dnb-p">text</span>
      </Box>
      <Box>
        <span className="dnb-p">text</span>
        <Button variant="tertiary" icon="calendar" />
        <Button variant="tertiary" icon="calendar" size="large" />
        <Button icon="calendar" size="large" />
        <span className="dnb-p">text</span>
      </Box>
    </Wrapper>
  )
]
