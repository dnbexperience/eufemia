/**
 * UI lib Component Example
 *
 */

import { useRef, useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styles from './Examples.module.scss'
import { createDrawerReveal } from '@dnb/eufemia/src/components/drawer/DrawerReveal'
import {
  Drawer,
  P,
  Button,
  FormStatus,
  Tabs,
  H2,
  Breadcrumb,
} from '@dnb/eufemia/src'

export function RevealDrawerExample() {
  return (
    <ComponentBox hideCode scope={{ createDrawerReveal, styles }}>
      {() => {
        const reveal = createDrawerReveal({
          target: '#drawer-reveal-page',
        })

        function Example() {
          const [open, setOpen] = useState(false)
          const triggerRef = useRef<HTMLButtonElement>(null)
          return (
            <div className={styles.revealShell}>
              <div
                id="drawer-reveal-page"
                style={{
                  minHeight: '24rem',
                  padding: '1rem',
                  background:
                    'var(--token-color-background-page-background)',
                }}
              >
                <H2>My application</H2>
                <P bottom>
                  Open the menu below, or drag this page to the right on a
                  touch screen.
                </P>
                <Button
                  ref={triggerRef}
                  text="Open reveal menu"
                  onClick={() => setOpen(true)}
                />
              </div>
              <Drawer
                directDomReturn
                className={styles.revealMenu}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                omitTriggerButton
                restoreFocusTo={triggerRef}
                renderDriver={reveal}
                containerPlacement="left"
                fullscreen={false}
                minWidth="min(85%, 20rem)"
                maxWidth="min(85%, 20rem)"
                title="Navigation"
              >
                <P top>
                  The menu stays still while the page moves. Close with the
                  button, Escape, a tap on the exposed page, or a swipe to
                  the left inside the menu or on that page.
                </P>
                <Button
                  text="Menu action"
                  top
                  onClick={() => setOpen(false)}
                />
              </Drawer>
            </div>
          )
        }
        return <Example />
      }}
    </ComponentBox>
  )
}

export const SimpleDrawerExample = () => (
  <ComponentBox data-visual-test="simple-drawer">
    <Drawer title="Drawer title" triggerProps={{ text: 'Open drawer' }}>
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet mus aptent luctus imperdiet
        netus natoque cubilia mattis nostra proin ornare scelerisque
        sodales faucibus placerat sem bibendum pretium rutrum vitae sociis
        ligula inceptos morbi quam mi sed pharetra fermentum tortor
        ullamcorper ipsum tellus eros euismod volutpat nisl dui lectus
        fames suscipit phasellus praesent justo mollis montes velit taciti
        gravida
      </P>
    </Drawer>
  </ComponentBox>
)

export const LargeContentExample = () => {
  return (
    <ComponentBox data-visual-test="large-content-drawer">
      {() => {
        const MockComponent = () => {
          const scrollRef = useRef(null)
          return (
            <Drawer
              title="Drawer title"
              scrollRef={scrollRef}
              onOpen={() => {
                scrollRef.current.scrollTop = 50
              }}
            >
              <P top>Some informational content</P>
              <P top>
                Elementum eu suspendisse sit platea elit porttitor magna
                laoreet ad ultrices tempus urna curae parturient conubia
                quisque viverra eget vestibulum neque pulvinar semper
                vulputate id dis varius pellentesque nunc egestas risus
                amet mus aptent luctus imperdiet netus natoque cubilia
                mattis nostra proin ornare scelerisque sodales faucibus
                placerat sem bibendum pretium rutrum vitae sociis ligula
                inceptos morbi quam mi sed pharetra fermentum tortor
                ullamcorper ipsum tellus eros euismod volutpat nisl dui
                lectus fames suscipit phasellus praesent justo mollis
                montes velit taciti gravida
              </P>
              <P top>
                Elementum eu suspendisse sit platea elit porttitor magna
                laoreet ad ultrices tempus urna curae parturient conubia
                quisque viverra eget vestibulum neque pulvinar semper
                vulputate id dis varius pellentesque nunc egestas risus
                amet mus aptent luctus imperdiet netus natoque cubilia
                mattis nostra proin ornare scelerisque sodales faucibus
                placerat sem bibendum pretium rutrum vitae sociis ligula
                inceptos morbi quam mi sed pharetra fermentum tortor
                ullamcorper ipsum tellus eros euismod volutpat nisl dui
                lectus fames suscipit phasellus praesent justo mollis
                montes velit taciti gravida
              </P>

              <P top>
                Elementum eu suspendisse sit platea elit porttitor magna
                laoreet ad ultrices tempus urna curae parturient conubia
                quisque viverra eget vestibulum neque pulvinar semper
                vulputate id dis varius pellentesque nunc egestas risus
                amet mus aptent luctus imperdiet netus natoque cubilia
                mattis nostra proin ornare scelerisque sodales faucibus
                placerat sem bibendum pretium rutrum vitae sociis ligula
                inceptos morbi quam mi sed pharetra fermentum tortor
                ullamcorper ipsum tellus eros euismod volutpat nisl dui
                lectus fames suscipit phasellus praesent justo mollis
                montes velit taciti gravida
              </P>
            </Drawer>
          )
        }

        return <MockComponent />
      }}
    </ComponentBox>
  )
}

export const LeftPlacementDrawerExample = () => (
  <ComponentBox data-visual-test="left-placement-drawer">
    <Drawer title="Drawer title" containerPlacement="left">
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet
      </P>
    </Drawer>
  </ComponentBox>
)

export const TopPlacementDrawerExample = () => (
  <ComponentBox data-visual-test="top-placement-drawer">
    <Drawer title="Drawer title" containerPlacement="top">
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet
      </P>
    </Drawer>
  </ComponentBox>
)

export const BottomPlacementDrawerExample = () => (
  <ComponentBox data-visual-test="bottom-placement-drawer">
    <Drawer title="Drawer title" containerPlacement="bottom">
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet
      </P>
    </Drawer>
  </ComponentBox>
)

export const FullscreenDrawerExample = () => (
  <ComponentBox data-visual-test="fullscreen-drawer">
    <Drawer
      fullscreen
      title="Drawer title"
      triggerProps={{ text: 'Open drawer' }}
    >
      <P top>Some informational content</P>
      <P top>
        Elementum eu suspendisse sit platea elit porttitor magna laoreet ad
        ultrices tempus urna curae parturient conubia quisque viverra eget
        vestibulum neque pulvinar semper vulputate id dis varius
        pellentesque nunc egestas risus amet
      </P>
    </Drawer>
  </ComponentBox>
)

const handleBack = () => {}

export const FullDrawerExample = () => (
  <ComponentBox data-visual-test="full-drawer" scope={{ handleBack }}>
    <Drawer title="Custom title">
      <Drawer.Navigation>
        <Breadcrumb onClick={handleBack} />
      </Drawer.Navigation>
      <Drawer.Header>
        <P bottom>This is a lorem ipsum dolor</P>
        <Button bottom size="large">
          Lorem ipsum
        </Button>
        <Button bottom size="large" variant="secondary">
          Dolor sit
        </Button>
        <FormStatus state="information">
          This is a lorem ipsum dolor
        </FormStatus>
        <Tabs
          id="unique-linked-id"
          data={[
            {
              title: 'One',
              key: 'one',
            },
            {
              title: 'Two',
              key: 'two',
            },
          ]}
        />
      </Drawer.Header>
      <Drawer.Body>
        <Tabs.Content id="unique-linked-id" key="contentKey">
          {({ title }) => {
            return (
              <>
                <H2>{title}</H2>
                <P top>This is a left aligned Drawer content.</P>
                <P top>
                  Elementum eu suspendisse sit platea elit porttitor magna
                  laoreet ad ultrices tempus urna curae parturient conubia
                  quisque viverra eget vestibulum neque pulvinar semper
                  vulputate id dis varius pellentesque nunc egestas risus
                  amet mus aptent luctus imperdiet netus natoque cubilia
                  mattis nostra proin ornare scelerisque sodales faucibus
                  placerat sem bibendum pretium rutrum vitae sociis ligula
                  inceptos morbi quam mi sed pharetra fermentum tortor
                  ullamcorper ipsum tellus eros euismod volutpat nisl dui
                  lectus fames suscipit phasellus praesent justo mollis
                  montes velit taciti gravida lacus commodo senectus
                  feugiat lorem etiam consequat penatibus cum hendrerit
                  accumsan orci potenti purus nulla
                </P>
              </>
            )
          }}
        </Tabs.Content>
      </Drawer.Body>
    </Drawer>
  </ComponentBox>
)

export const DrawerCustomTriggerExample = () => (
  <ComponentBox data-visual-test="drawer-custom-trigger">
    <Drawer
      title="Drawer with custom trigger"
      triggerProps={{
        text: 'Custom trigger',
        variant: 'primary',
        size: 'large',
        icon: 'loupe',
        iconPosition: 'left',
      }}
    >
      <Drawer.Body innerSpace={{ block: 'large' }}>
        <P>Opened a Drawer with a custom trigger button!</P>
      </Drawer.Body>
    </Drawer>
  </ComponentBox>
)

export const DrawerCallbackExample = () => (
  <ComponentBox data-visual-test="callback-drawer">
    <Drawer
      title="Drawer title"
      triggerProps={{ text: 'Open drawer' }}
      hideCloseButton
    >
      {/* @ts-expect-error -- strictFunctionTypes */}
      {({ close }) => (
        <>
          <Button text="Close by callback" onClick={close} />
        </>
      )}
    </Drawer>
  </ComponentBox>
)

export const DrawerNoAnimationNoSpacing = () => (
  <ComponentBox data-visual-test="drawer-no-animation">
    <Drawer
      title="No spacing or animation"
      noAnimation
      spacing={false}
      hideCloseButton
    >
      <Drawer.Body>
        <P top bottom>
          This is a lorem ipsum dolor
        </P>
        <Button bottom size="large">
          Lorem ipsum
        </Button>
        <Button bottom size="large" variant="secondary">
          Dolor sit
        </Button>
        <FormStatus state="information">
          This is a lorem ipsum dolor
        </FormStatus>
      </Drawer.Body>
    </Drawer>
  </ComponentBox>
)

export const DrawerScrollViewSetup = () => (
  <ComponentBox data-visual-test="drawer-scroll-view">
    {() => {
      const DrawerMock = () => {
        const scrollRef = useRef(null)
        const ref = useRef(null)
        const [errorMessage, setErrorMessage] = useState(null)

        const message = errorMessage
          ? errorMessage
          : 'Yes, the "dnb-scroll-view" is used!'

        return (
          <Drawer
            contentRef={ref}
            scrollRef={scrollRef}
            onOpen={() => {
              const innerOverflowY = window.getComputedStyle(
                ref.current
              ).overflowY

              const contentElem = scrollRef.current.querySelector(
                '.dnb-drawer__content'
              )
              const contentOverflowY =
                window.getComputedStyle(contentElem)?.overflowY

              const scrollOverflowY = window.getComputedStyle(
                scrollRef.current
              ).overflowY

              if (contentOverflowY !== 'visible') {
                setErrorMessage(
                  `.dnb-drawer__content was "${contentOverflowY}" and not "visible"`
                )
              } else if (innerOverflowY !== 'visible') {
                setErrorMessage(
                  `.dnb-drawer__inner was "${innerOverflowY}" and not "visible"`
                )
              } else if (scrollOverflowY !== 'auto') {
                setErrorMessage('.dnb-scroll-view was not "auto"')
              }
            }}
          >
            <Drawer.Body>
              <div style={{ height: '100rem' }}>
                <div className="drawer-scroll-view">
                  <P size="x-large">{message}</P>
                </div>
              </div>
            </Drawer.Body>
          </Drawer>
        )
      }
      return <DrawerMock />
    }}
  </ComponentBox>
)

export const UpdateNavigationHeaderExample = () => {
  return (
    <ComponentBox data-visual-test="update-navigation-header-example">
      {() => {
        const MockComponent = () => {
          const [showMe, setShowMe] = useState(false)

          const scrollRef = useRef(null)
          return (
            <Drawer
              title="Drawer title"
              scrollRef={scrollRef}
              onOpen={() => {
                setShowMe(!showMe)
                scrollRef.current.scrollTop = 50
              }}
            >
              <Drawer.Navigation>
                {showMe ? (
                  <>
                    <P bottom>This is a lorem ipsum dolor</P>
                    <P bottom>This is a lorem ipsum dolor</P>
                    <P bottom>This is a lorem ipsum dolor</P>
                    <P bottom>This is a lorem ipsum dolor</P>
                  </>
                ) : null}
              </Drawer.Navigation>
              <Drawer.Header>
                <P bottom>This is a lorem ipsum dolor</P>
                <Button bottom size="large">
                  Lorem ipsum
                </Button>
                <Button bottom size="large" variant="secondary">
                  Dolor sit
                </Button>
                <FormStatus state="information">
                  This is a lorem ipsum dolor
                </FormStatus>
                <Tabs
                  id="unique-linked-id-x"
                  data={[
                    {
                      title: 'One',
                      key: 'one',
                    },
                    {
                      title: 'Two',
                      key: 'two',
                    },
                  ]}
                />
              </Drawer.Header>
              <Drawer.Body>
                <Tabs.Content id="unique-linked-id-x" key="contentKey0">
                  {({ title }) => {
                    return (
                      <>
                        <H2>{title}</H2>

                        <P top>This is a left aligned Drawer content.</P>
                        <P top>
                          Elementum eu suspendisse sit platea elit
                          porttitor magna laoreet ad ultrices tempus urna
                          curae parturient conubia quisque viverra eget
                          vestibulum neque pulvinar semper vulputate id dis
                        </P>
                        <P top>
                          Elementum eu suspendisse sit platea elit
                          porttitor magna laoreet ad ultrices tempus urna
                          curae parturient conubia quisque viverra eget
                          vestibulum neque pulvinar semper vulputate id dis
                        </P>
                        <P top>
                          Elementum eu suspendisse sit platea elit
                          porttitor magna laoreet ad ultrices tempus urna
                          curae parturient conubia quisque viverra eget
                          vestibulum neque pulvinar semper vulputate id dis
                        </P>
                      </>
                    )
                  }}
                </Tabs.Content>
              </Drawer.Body>
            </Drawer>
          )
        }

        return <MockComponent />
      }}
    </ComponentBox>
  )
}
