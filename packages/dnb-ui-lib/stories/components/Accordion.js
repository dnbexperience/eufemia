/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import {
  Accordion
  // Button,
  // FormSet,
  // FormRow
} from '../../src/components'

import { P } from '../../src/elements'

export default [
  'Accordion',
  () => (
    <Wrapper>
      <Box>
        <Accordion expanded title="Accordion title" icon="bell">
          Accordion content
        </Accordion>
      </Box>

      <Box>
        <Accordion.Group expanded>
          <Accordion expanded={false}>
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content>
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content>
              <P>
                Nec sit mattis natoque interdum sagittis cubilia nibh
                nullam etiam
              </P>
            </Accordion.Content>
          </Accordion>
        </Accordion.Group>
      </Box>

      <Box>
        <Accordion.Provider expanded prerender>
          <Accordion expanded={false}>
            <Accordion.Header>
              Accordion title (prerender)
            </Accordion.Header>
            <Accordion.Content>
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Header>
              Accordion title (prerender)
            </Accordion.Header>
            <Accordion.Content>
              <P>
                Nec sit mattis natoque interdum sagittis cubilia nibh
                nullam etiam
              </P>
            </Accordion.Content>
          </Accordion>
        </Accordion.Provider>
      </Box>

      <Box>
        <Provider accordion={{ expanded: true }}>
          <Accordion expanded={false}>
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content>
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion>
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content>
              <P>
                Nec sit mattis natoque interdum sagittis cubilia nibh
                nullam etiam
              </P>
            </Accordion.Content>
          </Accordion>
        </Provider>
      </Box>

      <Box>
        <Accordion group="unique-id">
          <Accordion.Header>Accordion title</Accordion.Header>
          <Accordion.Content>
            <P>
              Sociis sapien sociosqu vel sollicitudin accumsan laoreet
              gravida himenaeos nostra mollis volutpat bibendum convallis
              cum condimentum dictumst blandit rutrum vehicula
            </P>
          </Accordion.Content>
        </Accordion>
        <Accordion expanded={true} group="unique-id">
          <Accordion.Header>Accordion title</Accordion.Header>
          <Accordion.Content>
            <P>
              Nec sit mattis natoque interdum sagittis cubilia nibh nullam
              etiam
            </P>
          </Accordion.Content>
        </Accordion>
      </Box>

      {/* <Box>
        <Provider formRow={{ vertical: true }}>
          <FormRow disabled>
            <Accordion.Group>
              <Accordion
                title="First"
                suffix="123"
                status="error message"
                disabled={false}
              />
              <Accordion title="Second"disabled={false} />
              <Accordion title="Third A"  />
              <Accordion title="Third B"  />
              <Accordion title="Third C"  />
              <Accordion title="Third D"  />
              <Accordion title="Third E"  />
              <Accordion title="Third F"  />
              <Accordion title="Third G"  />
              <Accordion title="Third H"  />
              <Accordion title="Third I"  />
              <Accordion title="Third J"  />
              <Accordion title="Third K"  />
              <Accordion title="Third L"  />
              <Accordion title="Third M"  />
              <Accordion title="Third N"  />
              <Accordion title="Last"  />
            </Accordion.Group>
          </FormRow>
        </Provider>
      </Box> */}
    </Wrapper>
  )
]
