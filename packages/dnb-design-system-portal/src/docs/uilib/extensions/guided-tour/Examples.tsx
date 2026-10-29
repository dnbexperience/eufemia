/**
 * UI lib Extension Example
 *
 */

import { useState } from 'react'
import { Accordion, Button, Card, Flex, P } from '@dnb/eufemia/src'
import GuidedTour from '@dnb/eufemia/src/extensions/guided-tour'
import '@dnb/eufemia/src/extensions/guided-tour/style'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export const GuidedTourBasicExample = () => (
  <ComponentBox scope={{ GuidedTour }}>
    {() => {
      const Demo = () => {
        const [open, setOpen] = useState(false)

        return (
          <>
            <Button text="Start tour" onClick={() => setOpen(true)} />

            <Card id="tour-basic-balance" top>
              <P>Balance: 12 345 kr</P>
            </Card>

            <Accordion
              expanded
              id="tour-basic-accordion"
              title="Accordion title"
              top
              space
            >
              <Flex.Horizontal>
                <P>Accordion content</P>
                <Button id="tour-basic-accordion-button">
                  Transfer money
                </Button>
              </Flex.Horizontal>
              <Accordion title="Click here to see more tour steps" top>
                <P id="tour-basic-accordion-nested-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Morbi cursus pharetra elit in bibendum.
                </P>
              </Accordion>
            </Accordion>

            <GuidedTour
              open={open}
              onOpenChange={setOpen}
              intro={{
                title: 'Welcome',
                content: 'This is the start of the Tour.',
              }}
              steps={[
                {
                  id: 'balance',
                  target: '#tour-basic-balance',
                  title: 'Spotlight',
                  content:
                    'The stepped tour will highlight the target item.',
                },
                {
                  id: 'history',
                  target: '#tour-basic-accordion',
                  placement: 'top',
                  title: 'Target any element',
                  content:
                    'Any element can be highlighted, not just components.',
                },
                {
                  id: 'transfer',
                  target: '#tour-basic-accordion-button',
                  placement: 'right',
                  title: 'Prevents Interaction',
                  content:
                    'While the tour is active, the overlay disallows any form of interaction other than the popover.',
                },
                {
                  id: 'nested',
                  target: '#tour-basic-accordion-nested-content',
                  placement: 'left',
                  title: 'Hidden elements',
                  content:
                    'If an element is hidden, the tour will not trigger until shown.',
                },
              ]}
              outro={{
                title: "That's it!",
                content: 'You can start the tour again at any time.',
              }}
              onComplete={() => console.log('onComplete')}
              onCancel={() => console.log('onCancel')}
            />
          </>
        )
      }

      return <Demo />
    }}
  </ComponentBox>
)

export const GuidedTourCenteredExample = () => (
  <ComponentBox scope={{ GuidedTour }}>
    {() => {
      const Demo = () => {
        const [open, setOpen] = useState(false)

        return (
          <>
            <Button text="Start tour" onClick={() => setOpen(true)} />

            <Flex.Horizontal top>
              <Card id="tour-centered-first">
                <P>First</P>
              </Card>
              <div id="tour-centered-hidden" hidden>
                Hidden
              </div>
              <Card id="tour-centered-last">
                <P>Last</P>
              </Card>
            </Flex.Horizontal>

            <GuidedTour
              open={open}
              onOpenChange={setOpen}
              steps={[
                {
                  id: 'first',
                  target: '#tour-centered-first',
                  title: 'First',
                  content: 'This step points at an element.',
                },
                {
                  id: 'hidden',
                  target: '#tour-centered-hidden',
                  title: 'Hidden',
                  content: 'This step is skipped.',
                },
                {
                  id: 'centered',
                  title: 'Centered',
                  content: 'This step has no target.',
                },
                {
                  id: 'last',
                  target: '#tour-centered-last',
                  title: 'Last',
                  content: 'Press Done to finish the tour.',
                },
              ]}
            />
          </>
        )
      }

      return <Demo />
    }}
  </ComponentBox>
)

export const GuidedTourOnBeforeShowExample = () => (
  <ComponentBox scope={{ GuidedTour }}>
    {() => {
      const Demo = () => {
        const [open, setOpen] = useState(false)
        const [expanded, setExpanded] = useState(false)

        return (
          <>
            <Button text="Start tour" onClick={() => setOpen(true)} />

            <Accordion
              id="tour-reveal-accordion"
              title="Show details"
              expanded={expanded}
              onChange={({ expanded }) => setExpanded(expanded)}
              top
            >
              <P id="tour-reveal-details">
                These details are only rendered while the accordion is
                open.
              </P>
            </Accordion>

            <GuidedTour
              open={open}
              onOpenChange={(open) => {
                setOpen(open)

                // Undo what onBeforeShow changed, once the tour ends
                if (!open) {
                  setExpanded(false)
                }
              }}
              steps={[
                {
                  id: 'accordion',
                  target: '#tour-reveal-accordion',
                  title: 'Collapsed section',
                  content: 'The details are hidden inside this accordion.',
                },
                {
                  id: 'details',
                  target: '#tour-reveal-details',
                  title: 'Revealed by onBeforeShow',
                  content:
                    'Before this step was shown, onBeforeShow opened the accordion, so the step can point at its content.',
                  onBeforeShow: () => setExpanded(true),
                },
              ]}
            />
          </>
        )
      }

      return <Demo />
    }}
  </ComponentBox>
)
