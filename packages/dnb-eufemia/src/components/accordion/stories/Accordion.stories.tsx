/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import Provider from '../../../shared/Provider'
import {
  ToggleButton,
  Accordion,
  Button,
  IconPrimary,
  Heading,
} from '../..'

import { P } from '../../..'

export default {
  title: 'Eufemia/Components/Accordion',
}

const TestStyles = styled.div`
  .dnb-accordion-group--single-container {
    background-color: turquoise;
  }
`

const DidRender = ({ message }) => {
  React.useEffect(() => {
    console.log('DidRender', message)
  }, [])
  return <></>
}

export const NestedAccordion = () => {
  return (
    <Wrapper>
      <Box>
        <Accordion id="nested-accordion" title="Accordion" expanded space>
          <P space={0}>Content A</P>
          <Accordion
            id="nested-accordion-1"
            title="Accordion nested 1"
            space
          >
            <P space={0}>I'm nested 1</P>
          </Accordion>
          <P space={0}>Content B</P>
          <Accordion
            id="nested-accordion-2"
            title="Accordion nested 2"
            space
          >
            <P space={0}>I'm nested 2</P>
          </Accordion>
        </Accordion>
      </Box>
    </Wrapper>
  )
}

export const AccordionSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Heading size="xx-large">Accordion</Heading>
        <TestStyles>
          <AccordionWithContainer />
        </TestStyles>
      </Box>

      <Box>
        <Accordion
          expanded
          rememberState
          id="single-accordion"
          title="Accordion title"
          icon="bell"
          iconPosition="right"
        >
          rememberState Accordion content
        </Accordion>
      </Box>

      <Box>
        <Accordion.Group expanded allowCloseAll>
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
              {() => {
                return (
                  <P>
                    Nec sit mattis natoque interdum sagittis cubilia nibh
                    nullam etiam
                  </P>
                )
              }}
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
          leftComponent={<IconPrimary icon="bell" />}
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

function AccordionWithContainer() {
  const ref1 = React.useRef()
  const ref2 = React.useRef()
  const ref3 = React.useRef()
  const [changeHeight] = React.useState(() => ({ ref1, ref2, ref3 }))
  const [flushCache, flushCacheNow] = React.useState(false)
  const [count, setCount] = React.useState(1)
  return (
    <>
      <Button
        bottom
        left
        size="small"
        variant="signal"
        onClick={() => setCount((s) => s + 1)}
      >
        Increment {count}
      </Button>
      <Accordion.Group
        noAnimation
        variant="outlined"
        singleContainer
        rememberState
        flushRememberedState={flushCache}
        id="group-id"
      >
        <Accordion
          bottom
          id="remembered-state-1"
          title="Title1"
          description="Description1"
          expanded={true}
        >
          <Accordion.Header title="Title2" description="Description2">
            <Accordion.Header.Title key="title">
              Title 3
            </Accordion.Header.Title>
            <Accordion.Header.Description>
              Description 3
            </Accordion.Header.Description>
          </Accordion.Header>
          <Accordion.Content
            left="xx-large"
            top="medium"
            instance={changeHeight.ref1}
          >
            <DidRender message="one" />
            <ChangingContent changeHeight={changeHeight.ref1}>
              <div
                style={{
                  height: '50rem',
                  background: 'var(--color-sea-green-30)',
                }}
              >
                <P top bottom="xx-large">
                  Simulation of content height
                </P>
              </div>
            </ChangingContent>
            <Button
              bottom
              left
              size="small"
              variant="signal"
              onClick={() => setCount((s) => s + 1)}
            >
              Increment {count}
            </Button>
          </Accordion.Content>
        </Accordion>
        <Accordion bottom iconPosition="right" id="remembered-state-2">
          <Accordion.Header>
            <Accordion.Header.Container>
              <IconPrimary icon="bell" />
            </Accordion.Header.Container>
            <Accordion.Header.Title>
              Accordion title
            </Accordion.Header.Title>
          </Accordion.Header>
          <Accordion.Content
            left="xx-large"
            top="medium"
            instance={changeHeight.ref2}
          >
            <DidRender message="two" />
            <Button
              onClick={() => {
                flushCacheNow(!flushCache)
                setTimeout(() => {
                  flushCacheNow(flushCache)
                }, 1e3)
              }}
            >
              Flush Remembered State
            </Button>
            <ChangingContent changeHeight={changeHeight.ref2}>
              <div
                style={{
                  height: '60rem',
                  background: 'var(--color-sand-yellow)',
                }}
              >
                <P top bottom="xx-large">
                  Simulation of content height
                </P>
              </div>
            </ChangingContent>
            <Button
              bottom
              left
              size="small"
              variant="signal"
              onClick={() => setCount((s) => s + 1)}
            >
              Increment {count}
            </Button>
          </Accordion.Content>
        </Accordion>
        <Accordion iconPosition="right" id="remembered-state-3">
          <Accordion.Header>
            <Accordion.Header.Container>
              <IconPrimary icon="bell" />
            </Accordion.Header.Container>
            <Accordion.Header.Title>
              Accordion three
            </Accordion.Header.Title>
          </Accordion.Header>
          <Accordion.Content
            left="xx-large"
            top="medium"
            instance={changeHeight.ref3}
          >
            <DidRender message="three" />
            <ChangingContent changeHeight={changeHeight.ref3}>
              <div
                style={{
                  height: '40rem',
                  background: 'var(--color-sand-yellow)',
                }}
              >
                <P top bottom="xx-large">
                  Simulation of content height
                </P>
              </div>
            </ChangingContent>
            <Button
              bottom
              left
              size="small"
              variant="signal"
              onClick={() => setCount((s) => s + 1)}
            >
              Increment {count}
            </Button>
          </Accordion.Content>
        </Accordion>
      </Accordion.Group>
    </>
  )
}

function ChangingContent({ changeHeight, children }) {
  const [contentSize, changeContentSize] = React.useState(false)
  React.useLayoutEffect(() => {
    changeHeight.current.setContainerHeight()
  }, [changeHeight, contentSize])
  return (
    <>
      <ToggleButton
        checked={contentSize}
        onChange={() => {
          changeContentSize((s) => !s)
        }}
        bottom
      >
        Toggle content size
      </ToggleButton>

      {String(contentSize)}

      {contentSize ? children : null}
    </>
  )
}
