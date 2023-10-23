import React from 'react'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
// import { Wrapper, Box } from 'storybook-utils/helpers'
import { Section, Flex } from '../..'
import { Heading, P } from '../../..'

export default {
  title: 'Eufemia/Components/SectionLayout',
}

// Section = ({ children, variant, ...rest }) => {
//   return (
//     <Section
//       // style_type="white"
//       variant={variant}
//       // responsive
//       {...rest}
//     >
//       <Flex.Stack top bottom>
//         {children}
//       </Flex.Stack>
//     </Section>
//   )
// }

function PageWrapper({ children }) {
  const PageWrapperStyles = styled(Flex.Stack)`
    max-width: calc(var(--layout-large) - 0rem);

    margin: auto;
    padding: 0 1rem;

    /* @media screen and (max-width: 40em) {
    } */
  `

  return <PageWrapperStyles>{children}</PageWrapperStyles>
}

export function SectionLayout() {
  return (
    <>
      <PageWrapper>
        <Section
          breakout={{
            small: true,
            medium: false,
            large: false,
          }}
          outline={{
            small: false,
            medium: true,
            large: 'fire-red',
          }}
          roundedCorner={{
            small: false,
            medium: true,
            large: true,
          }}
          innerSpace={{
            small: 'large',
            medium: true,
            large: { top: '1rem', bottom: 'large' },
          }}
          // spacing="medium"
          textColor={{
            small: 'white',
          }}
          backgroundColor={{
            small: 'fire-red',
          }}
          top
        >
          <Heading size="large">Heading</Heading>
          <P>
            Etiam suscipit risus eu sagittis lacinia. Donec volutpat,
            lectus ac ullamcorper tincidunt, enim orci varius erat, id
            fringilla lectus orci vitae felis. In rhoncus blandit
            ullamcorper. Duis non mi in ipsum tincidunt tincidunt id quis
            nisi. Donec luctus purus eget lorem convallis, sagittis ornare
            ligula interdum. Donec justo justo, convallis non nisi et,
            pretium tincidunt libero. Vivamus interdum id turpis sed
            pharetra. Duis maximus, massa non consectetur tristique, quam
            odio cursus metus, vel placerat ligula tellus sit amet eros.
          </P>
        </Section>

        {/* WIP */}
        {/* <Hr fullscreen responsive /> */}

        <Section spacing="medium">
          <Heading size="large">Heading</Heading>
          <P>
            Etiam suscipit risus eu sagittis lacinia. Donec volutpat,
            lectus ac ullamcorper tincidunt, enim orci varius erat, id
            fringilla lectus orci vitae felis. In rhoncus blandit
            ullamcorper. Duis non mi in ipsum tincidunt tincidunt id quis
            nisi. Donec luctus purus eget lorem convallis, sagittis ornare
            ligula interdum. Donec justo justo, convallis non nisi et,
            pretium tincidunt libero. Vivamus interdum id turpis sed
            pharetra. Duis maximus, massa non consectetur tristique, quam
            odio cursus metus, vel placerat ligula tellus sit amet eros.
          </P>
        </Section>
      </PageWrapper>

      <Global
        styles={`
        .sb-show-main.sb-main-padded {
          padding: 0;
        }
      `}
      />
    </>
  )
}
