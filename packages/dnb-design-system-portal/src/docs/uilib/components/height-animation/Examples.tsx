/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export function HeightAnimationDefault() {
  return (
    <ComponentBox useRender>
      {
        /* jsx */ `
const Example = () => {
  const [openState, setOpenState] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(openState)
  const [contentState, setContentState] = React.useState(false)

  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }

  return (
    <>
      <ToggleButton 
        checked={openState}
        onChange={({ checked }) => {
          setOpenState(checked)
        }}
        right
      >
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!isOpen}
        onChange={({ checked }) => {
          setContentState(checked)
        }}
        space={{ top: true, bottom: true }}
      >
        Change height inside
      </ToggleButton>

      <Section style_type="lavender" top>
        <HeightAnimation
          open={openState}
          onOpen={setIsOpen}
        >
        <Section spacing style_type="lavender">
          <P space={0}>Your content</P>
        </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </Section>

      <P top>Look at me 👀</P>
    </>
  )
}

render(<Example />)
    `
      }
    </ComponentBox>
  )
}

export function HeightAnimationAutosizing() {
  return (
    <ComponentBox useRender>
      {
        /* jsx */ `
const Example = () => {
  const [showMe, setShowMe] = React.useState(true)

  return (
    <>
      <HeightAnimation
        open
        showOverflow
      >
        {showMe ? <Button 
          onClick={() => {
            setShowMe(!showMe)
          }}
        >
          Click me!
        </Button>: <Anchor
          onClick={() => {
            setShowMe(!showMe)
          }}
        >
          No, click me!
        </Anchor>}
      </HeightAnimation>

      <P top>Look at me 👀</P>
    </>
  )
}

render(<Example />)
    `
      }
    </ComponentBox>
  )
}

export function HeightAnimationKeepInDOM() {
  return (
    <ComponentBox useRender>
      {
        /* jsx */ `
const Example = () => {
  const [openState, setOpenState] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(openState)
  const [contentState, setContentState] = React.useState(false)

  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }

  return (
    <>
      <ToggleButton 
        checked={openState}
        onChange={({ checked }) => {
          setOpenState(checked)
        }}
        right
      >
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!isOpen}
        onChange={({ checked }) => {
          setContentState(checked)
        }}
        space={{ top: true, bottom: true }}
      >
        Change height inside
      </ToggleButton>

      <StyledSection style_type="lavender" top>
        <HeightAnimation
          open={openState}
          keepInDOM={true}
          duration={1000}
          onOpen={setIsOpen}
        >
          <Section spacing style_type="lavender">
            <P space={0}>Your content</P>
          </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </StyledSection>
    </>
  )
}

const StyledSection = styled(Section)\`
  .content-element {
    transition: transform 1s var(--easing-default);
    transform: translateY(-2rem);

    padding: 4rem 0;
  }

  .dnb-height-animation--parallax .content-element {
    transform: translateY(0);
  }
\`

render(<Example />)
    `
      }
    </ComponentBox>
  )
}
