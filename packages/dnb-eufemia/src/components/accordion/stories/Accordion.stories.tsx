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
  // Input,
  IconPrimary,
  Heading,
} from '../..'

import { P } from '../../../elements'

export default {
  title: 'Eufemia/Components/Accordion',
}

const TestStyles = styled.div`
  .dnb-accordion-group--single-container {
    background-color: turquoise;
  }
`

// Accordion.Group.Store('group-id').saveState(true, 'remembered-state-2')
// const getState = Accordion.Group.Store('group-id').getState(
//   'remembered-state-2'
// )
// console.log('getState', getState)
// /**
//  * "getState" returns
//  * - true if it is saved as expanded
//  * - false if it is saved as not expanded
//  * - null if it is not saved
//  */

// const getData = Accordion.Group.Store('group-id').getData()?.id
// console.log('getData', getData)
// /**
//  * "getData" returns
//  * - object with the "id" that is saved
//  * - null if it is not saved
//  */

// console.log(
//   'single-accordion',
//   Accordion.Store('single-accordion').getData()?.expanded
// )
// console.log(
//   'single-accordion',
//   Accordion.Store('single-accordion').getState()
// )

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
          remember_state
          id="single-accordion"
          title="Accordion title"
          icon="bell"
          icon_position="right"
        >
          remember_state Accordion content
        </Accordion>
      </Box>

      <Box>
        <Accordion.Group expanded allow_close_all>
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
        on_click={() => setCount((s) => s + 1)}
      >
        Increment {count}
      </Button>
      <Accordion.Group
        no_animation
        variant="outlined"
        // prerender
        // prevent_rerender
        // prevent_rerender_conditional
        single_container
        remember_state
        flush_remembered_state={flushCache}
        // allow_close_all
        id="group-id"
      >
        <Accordion
          bottom
          id="remembered-state-1"
          title="Title1"
          description="Description1"
          expanded={true}
          // element="h2"
          // heading
          // heading={Heading}
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
              on_click={() => setCount((s) => s + 1)}
            >
              Increment {count}
            </Button>
          </Accordion.Content>
        </Accordion>
        <Accordion
          bottom
          icon_position="right"
          id="remembered-state-2"
          // top="x-large"
        >
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
              on_click={() => {
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
              on_click={() => setCount((s) => s + 1)}
            >
              Increment {count}
            </Button>
          </Accordion.Content>
        </Accordion>
        <Accordion
          icon_position="right"
          id="remembered-state-3"
          // top="x-large"
        >
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
              on_click={() => setCount((s) => s + 1)}
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
        on_change={() => {
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
