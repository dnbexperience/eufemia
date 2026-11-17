import { Button, Dialog, Drawer, P } from '@dnb/eufemia/src'

const content = (
  <>
    {Array.from({ length: 24 }, (_, index) => (
      <P key={index}>
        This content should remain readable when the viewport is short or
        the text is enlarged. Scroll to the end to reach the final action.
      </P>
    ))}
    <Button data-testid="final-action">Final action</Button>
  </>
)

export default function ViewportExamples() {
  return (
    <>
      {(['auto', true, false] as const).map((fullscreen) => (
        <Dialog
          key={String(fullscreen)}
          title="Dialog viewport"
          fullscreen={fullscreen}
          noAnimation
          triggerProps={{ text: `Open dialog ${fullscreen}` }}
        >
          {content}
        </Dialog>
      ))}
      {(['auto', true] as const).map((fullscreen) => (
        <Dialog
          key={String(fullscreen)}
          title="Top aligned Dialog"
          verticalAlignment="top"
          fullscreen={fullscreen}
          noAnimation
          triggerProps={{ text: `Open top aligned dialog ${fullscreen}` }}
        >
          {content}
        </Dialog>
      ))}
      <Dialog
        title="Confirm your choice"
        variant="confirmation"
        noAnimation
        confirmText="Confirm choice"
        declineText="Cancel choice"
        triggerProps={{ text: 'Open confirmation' }}
      >
        {content}
      </Dialog>
      <Dialog
        title="Short Dialog"
        noAnimation
        triggerProps={{ text: 'Open short dialog' }}
      >
        <P>Short content should keep its natural height.</P>
      </Dialog>
      <Drawer
        title="Short Drawer"
        noAnimation
        triggerProps={{ text: 'Open short drawer' }}
      >
        <Drawer.Body>
          <P>The body background should fill the remaining height.</P>
        </Drawer.Body>
      </Drawer>
      <Drawer
        title="Drawer without automatic fullscreen"
        fullscreen={false}
        noAnimation
        triggerProps={{ text: 'Open drawer false' }}
      >
        {content}
      </Drawer>
      {(['right', 'left', 'top', 'bottom'] as const).map(
        (containerPlacement) => (
          <Drawer
            key={containerPlacement}
            title="Drawer viewport"
            containerPlacement={containerPlacement}
            noAnimation
            triggerProps={{ text: `Open drawer ${containerPlacement}` }}
          >
            {content}
          </Drawer>
        )
      )}
    </>
  )
}
