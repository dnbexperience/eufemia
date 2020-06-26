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
  Input,
  IconPrimary
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
          prerender
          // prevent_rerender
          single_container
          remember_state
          allow_close_all
        >
          <Accordion
            expanded={false}
            bottom
            id="remembered_state-1"
            title="Title1"
            description="Description1"
          >
            <Accordion.Header title="Title2" description="Description2">
              {/* Title 3 string */}
              <Accordion.Header.Title key="title">
                Title 3
              </Accordion.Header.Title>
              <Accordion.Header.Description>
                Description 3
              </Accordion.Header.Description>
              {/* <Accordion.Header.Icon key="icon" /> */}
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

          <Accordion
            // top="x-large"
            icon_position="right"
            id="remembered_state-2"
          >
            <Accordion.Header>
              <Accordion.Header.Container>
                <IconPrimary icon="bell" />
              </Accordion.Header.Container>
              <Accordion.Header.Title>
                Accordion title
              </Accordion.Header.Title>
            </Accordion.Header>
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
        <Accordion
          expanded
          title="Accordion title"
          icon="bell"
          icon_position="right"
        >
          Accordion content
        </Accordion>
      </Box>

      <Box>
        <Accordion.Group expanded>
          <Accordion expanded={false}>
            <Accordion.Header>Accordion title</Accordion.Header>
            <Accordion.Content top="x-large">
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion top>
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
        <Accordion
          group="unique-id"
          left_component={<IconPrimary icon="bell" />}
          disabled
        >
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
