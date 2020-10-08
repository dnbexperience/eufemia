/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import {
  ToggleButton,
  Accordion,
  Input,
  IconPrimary,
  Heading
} from '../../src/components'

import { P } from '../../src/elements'

const TestStyles = styled.div`
  .dnb-accordion-group--single-container {
    background-color: turquoise;
  }
`

function ChangingContent({ changeHeight }) {
  const [contentSize, changeContentSize] = React.useState(false)

  React.useEffect(() => {
    changeHeight.current.setContainerHeight()
  }, [contentSize])

  return (
    <>
      <ToggleButton
        checked={contentSize}
        on_change={() => {
          changeContentSize((s) => !s)
        }}
      >
        Toggle content size
      </ToggleButton>
      <P top>
        {contentSize ? (
          <>
            Sociis sapien sociosqu vel sollicitudin accumsan laoreet
            gravida himenaeos nostra mollis volutpat bibendum convallis cum
            condimentum dictumst blandit rutrum vehicula Placerat nascetur
            vestibulum ligula nunc fusce consectetur tortor tristique
            aptent nostra posuere ante suscipit mattis egestas praesent
            integer conubia dignissim Etiam dui rutrum quis facilisi
            suscipit ornare mus vestibulum nec cubilia platea in senectus
            curabitur leo dictum metus est lorem
          </>
        ) : (
          <>Small content</>
        )}
      </P>
    </>
  )
}

export const Accordions = () => {
  const changeHeight = React.useRef()
  return (
    <Wrapper>
      <Box>
        <Heading size="xx-large">Accordion</Heading>
        <TestStyles>
          <Accordion.Group
            variant="outlined"
            // expanded
            // prerender
            prevent_rerender
            single_container
            remember_state
            // allow_close_all
          >
            <Accordion
              expanded
              bottom
              id="remembered_state-1"
              title="Title1"
              description="Description1"
              // element="h2"
              // heading
              heading={Heading}
              // heading_level="3"
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
              <Accordion.Content
                instance={changeHeight}
                left="xx-large"
                top="medium"
              >
                <ChangingContent changeHeight={changeHeight} />
                <Input top="x-large" />
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
              <Accordion.Content left="xx-large">
                <P>
                  {/* {contentSize ? '1' : '0'} */}
                  Nec sit mattis natoque interdum sagittis cubilia nibh
                  nullam etiam
                </P>
                <Input top="x-large" />
              </Accordion.Content>
            </Accordion>
          </Accordion.Group>
        </TestStyles>
      </Box>

      <Box>
        <Accordion
          expanded
          remember_state
          id="single-accordion"
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
            <Accordion.Header>Accordion title 1</Accordion.Header>
            <Accordion.Content top="x-large">
              <P>
                Sociis sapien sociosqu vel sollicitudin accumsan laoreet
                gravida himenaeos nostra mollis volutpat bibendum convallis
                cum condimentum dictumst blandit rutrum vehicula
              </P>
            </Accordion.Content>
          </Accordion>
          <Accordion top>
            <Accordion.Header>Accordion title 2</Accordion.Header>
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
        <Provider accordion={{ expanded: true, disabled: true }}>
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
          <Accordion top>
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
        <Accordion top expanded={true} group="unique-id">
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
}
