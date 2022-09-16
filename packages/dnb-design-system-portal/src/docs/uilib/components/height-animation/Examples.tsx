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

  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }

  return (
    <>
      <ToggleButton checked={openState} onChange={onChangeHandler} bottom>
        Toggle me
      </ToggleButton>

      <Section style_type="lavender">
        <HeightAnimation
          open={openState}
        >
          <P className="content-element" top="large" bottom="large">
            Your content
          </P>
        </HeightAnimation>
      </Section>
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
  const [openState, setOpenState] = React.useState(false)

  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }

  return (
    <>
      <ToggleButton checked={openState} onChange={onChangeHandler} bottom>
        Toggle me
      </ToggleButton>

      <StyledSection style_type="lavender">
        <HeightAnimation
          open={openState}
          keepInDOM={true}
          duration={1000}
        >
          <P className="content-element" space={0}>
            Your content
          </P>
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
