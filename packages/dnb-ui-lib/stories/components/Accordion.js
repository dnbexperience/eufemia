/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import {
  Accordion,
  Input
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
        <Accordion.Provider
          expanded
          prevent_rerender
          single_container
          remember_state
        >
          <Accordion expanded={false} bottom id="remembered_state-1">
            <Accordion.Header description="Description">
              {/* Accordion title Duis platea quisque */}
              <Accordion.Header.Title>
                Accordion title Duis platea quisque
              </Accordion.Header.Title>
              <Accordion.Header.Description>
                Accordion description Duis platea quisque
              </Accordion.Header.Description>
              <Accordion.Header.Icon icon="bell" />
            </Accordion.Header>
            <Accordion.Content>
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
                <Input />
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion bottom id="remembered_state-2">
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content>
              <P>
                Nec sit mattis natoque interdum sagittis cubilia nibh
                nullam etiam
                <Input />
              </P>
            </Accordion.Content>
          </Accordion>
        </Accordion.Provider>
      </Box>

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
    </Wrapper>
  )
]
