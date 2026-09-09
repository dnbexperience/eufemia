/**
 * UI lib Component Example
 *
 */

import { useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Toaster, Button, Flex } from '@dnb/eufemia/src/components'
import { chevron_right as ChevronRight } from '@dnb/eufemia/src/icons'
import { ScrollView } from '@dnb/eufemia/src/fragments'

function useFloatingToggle() {
  const [floating, setFloating] = useState(false)
  const onToggle = () => setFloating((f) => !f)
  return { floating, onToggle }
}

function FloatingToggle({
  floating,
  onToggle,
}: {
  floating: boolean
  onToggle: () => void
}) {
  return (
    <Button variant="tertiary" onClick={onToggle}>
      {floating ? 'Switch to inline' : 'Switch to floating'}
    </Button>
  )
}

export const ToasterNotification = () => (
  <ComponentBox
    data-visual-test="toaster-notification"
    hideCode
    scope={{ FloatingToggle, useFloatingToggle }}
  >
    {() => {
      function NotificationDemo() {
        const { addMessage } = Toaster.useToaster('demo-notification')
        const { floating, onToggle } = useFloatingToggle()

        return (
          <Flex.Stack>
            <Flex.Horizontal>
              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    title: 'Draft saved',
                    text: 'Your changes were saved as a draft.',
                  })
                }
              >
                Add message
              </Button>

              <FloatingToggle floating={floating} onToggle={onToggle} />
            </Flex.Horizontal>

            <Toaster.Host id="demo-notification" />
            <Toaster.NotificationCenter.Button
              hostId="demo-notification"
              floating={floating}
            />
            <Toaster.NotificationCenter hostId="demo-notification" />
          </Flex.Stack>
        )
      }

      return <NotificationDemo />
    }}
  </ComponentBox>
)

export const ToasterNotificationWithAction = () => (
  <ComponentBox
    data-visual-test="toaster-notification-with-action"
    hideCode
    scope={{ ChevronRight, FloatingToggle, useFloatingToggle }}
  >
    {() => {
      function NotificationWithActionDemo() {
        const { addMessage } = Toaster.useToaster(
          'demo-notification-action'
        )
        const { floating, onToggle } = useFloatingToggle()

        return (
          <Flex.Stack>
            <Flex.Horizontal>
              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    title: 'DNB Bank ASA har nådd kursmålet',
                    text: 'Aksjen har steget til 230,50 kr, som er over kursmålet du satte på 225 kr.',
                    actions: (
                      <Button
                        href="/"
                        variant="tertiary"
                        icon={ChevronRight}
                        iconPosition="right"
                      >
                        Gå til aksjeside
                      </Button>
                    ),
                  })
                }
              >
                Add message with actions
              </Button>

              <FloatingToggle floating={floating} onToggle={onToggle} />
            </Flex.Horizontal>

            <Toaster.Host id="demo-notification-action" />
            <Toaster.NotificationCenter.Button
              hostId="demo-notification-action"
              floating={floating}
            />
            <Toaster.NotificationCenter hostId="demo-notification-action" />
          </Flex.Stack>
        )
      }

      return <NotificationWithActionDemo />
    }}
  </ComponentBox>
)

export const ToasterVariants = () => (
  <ComponentBox
    data-visual-test="toaster-variants"
    hideCode
    scope={{ FloatingToggle, useFloatingToggle }}
  >
    {() => {
      function VariantsDemo() {
        const { addMessage } = Toaster.useToaster('demo-variants')
        const { floating, onToggle } = useFloatingToggle()

        return (
          <Flex.Stack>
            <Flex.Horizontal>
              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    variant: 'info',
                    title: 'Information',
                    text: 'Here is some useful information.',
                  })
                }
              >
                Info
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    variant: 'success',
                    title: 'Success',
                    text: 'The operation completed successfully.',
                  })
                }
              >
                Success
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    variant: 'warning',
                    title: 'Warning',
                    text: 'Something might need your attention.',
                  })
                }
              >
                Warning
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    variant: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                  })
                }
              >
                Error
              </Button>

              <FloatingToggle floating={floating} onToggle={onToggle} />
            </Flex.Horizontal>

            <Toaster.Host id="demo-variants" />
            <Toaster.NotificationCenter.Button
              hostId="demo-variants"
              floating={floating}
            />
            <Toaster.NotificationCenter hostId="demo-variants" />
          </Flex.Stack>
        )
      }

      return <VariantsDemo />
    }}
  </ComponentBox>
)

export const ToasterActiveMessage = () => (
  <ComponentBox
    data-visual-test="toaster-active-message"
    hideCode
    scope={{ FloatingToggle, useFloatingToggle }}
  >
    {() => {
      function ActiveMessageDemo() {
        const { addMessage } = Toaster.useToaster('demo-active')
        const { floating, onToggle } = useFloatingToggle()

        return (
          <Flex.Stack>
            <Flex.Horizontal>
              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    id: 'session-timeout',
                    variant: 'warning',
                    title: 'Session expires soon',
                    text: 'You will be logged out in 5 minutes because of inactivity.',
                    priority: 'high',
                    actions: (
                      <Flex.Horizontal gap="small">
                        <Button
                          onClick={() => console.log('Session extended')}
                        >
                          Stay signed in
                        </Button>
                        <Button
                          variant="tertiary"
                          onClick={() => console.log('Logged out')}
                        >
                          Log out now
                        </Button>
                      </Flex.Horizontal>
                    ),
                  })
                }
              >
                Trigger session warning
              </Button>

              <FloatingToggle floating={floating} onToggle={onToggle} />
            </Flex.Horizontal>

            <Toaster.Host id="demo-active" />
            <Toaster.NotificationCenter.Button
              hostId="demo-active"
              floating={floating}
            />
            <Toaster.NotificationCenter hostId="demo-active" />
          </Flex.Stack>
        )
      }

      return <ActiveMessageDemo />
    }}
  </ComponentBox>
)

export const ToasterSensitiveMessage = () => (
  <ComponentBox
    data-visual-test="toaster-sensitive"
    hideCode
    scope={{ FloatingToggle, useFloatingToggle }}
  >
    {() => {
      function SensitiveMessageDemo() {
        const { addMessage } = Toaster.useToaster('demo-sensitive')
        const { floating, onToggle } = useFloatingToggle()

        return (
          <Flex.Stack>
            <Flex.Horizontal>
              <Button
                variant="secondary"
                onClick={() =>
                  addMessage({
                    id: 'secure-message',
                    variant: 'info',
                    title: 'Secure message',
                    text: 'Your account number ending in 1234 was updated.',
                    privacy: 'sensitive',
                    privacyFallbackText:
                      'Your account number ending in **** was updated.',
                  })
                }
              >
                Add sensitive message
              </Button>

              <FloatingToggle floating={floating} onToggle={onToggle} />
            </Flex.Horizontal>

            <Toaster.Host id="demo-sensitive" />
            <Toaster.NotificationCenter.Button
              hostId="demo-sensitive"
              floating={floating}
            />
            <Toaster.NotificationCenter hostId="demo-sensitive" />
          </Flex.Stack>
        )
      }

      return <SensitiveMessageDemo />
    }}
  </ComponentBox>
)

export const ToasterStandaloneList = () => (
  <ComponentBox data-visual-test="toaster-standalone-list" hideCode>
    {() => {
      function StandaloneListDemo() {
        const { addMessage } = Toaster.useToaster('demo-standalone-list')

        return (
          <Flex.Stack>
            <Button
              variant="secondary"
              onClick={() =>
                addMessage({
                  title: 'New notification',
                  text: 'This appears directly in the always-open list.',
                })
              }
            >
              Add message
            </Button>

            <Toaster.Host id="demo-standalone-list" />
            <ScrollView interactive style={{ maxHeight: '22rem' }}>
              <Toaster.NotificationCenterList
                hostId="demo-standalone-list"
                order="desc"
              />
            </ScrollView>
          </Flex.Stack>
        )
      }

      return <StandaloneListDemo />
    }}
  </ComponentBox>
)
